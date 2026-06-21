---
aliases:
  - https://linux.do/t/topic/334063
relations: https://linux.do/t/topic/335796
list: https://linux.do/t/topic/427896
something:
---
- _`The secret to success lies in the quantity and quality of attention you bring to it.`_
## 教程

1. [进攻性网络安全相关证书考证经验分享](https://linux.do/t/topic/334063)
2. [可能是简中论坛第一张OSCE3证书](https://linux.do/t/topic/349878)
3. [AI红队工程师课程](https://linux.do/t/topic/400944)
4. [网络安全考证路径分享](https://linux.do/t/topic/335796)
5. [本帖长期无偿提供网络安全相关咨询](https://linux.do/t/topic/339258)
6. [记一次渗透取证诈骗网站](https://linux.do/t/topic/373945)


tools in infosec

- firewalls
- IDS/IPS
- SIEM
- vulnerability scanner
- peneration testing tools
- encryption tools
- access control systems

- Linux, Windows, MacOS
- Nmap: Network scanning and discovery
- Wireshark: Network protocol analysis
- Metasploit: Exploitation framework
- Burp Suite: Web application security testing
- John the Ripper: Password cracking

how to find bugs in web

- static and dynamic analysis tools
- fuzzing techniques
- manual code reviews

DDoS

- botnet

before perement

### ifconfig

configure network interfaces and display their current status

(using the `-a` flag will display all interfaces, including those that are currently down)

```
ifconfig -a
```

### loopback

loopback address:always associated to the IPv4 address `127.0.0.1`

- It's often used for testing, as a way to make sure an application is working as intended before going live on the network. 

- It is also used by servers to keep certain services hidden from outside users.

- Port forwarding

see if target machine use loopback address

```
netstat -tulnp4
```

### netstat

displays network connections, routing tables, and interface statistics

```
netstat -tulnp4

#IP:PORT

netstat -tulp4

#hostname:service
```

### tun0

```
ip route get <target ip>
```
display the route taken for any traffic sent from the Pwnbox to reach the target

### ping

```
ping -c 4 <target ip>
```

### nmap

determine the open ports on a remote machine

```
nmap <target IP>
```

focus

```
nmap -p21,80 -sC -sV <target ip>

#21 and 80 port
```

### netcat

look at the FTP service running on port 21

```
nc <target ip> 21
```

### channel(FTP)

- Control Channel

Port 21

- Data Channel

Dynamic Port (Varies by mode: Active or Passive)

(USER, PASS, LIST, RETR, etc.)

#### First terminal(CC)
```
USER anonymous[Ctrl+V][Enter][Enter] 
PASS anything[Ctrl+V][Enter][Enter] 
PASV[Ctrl+V][Enter][Enter]
```

#### Sec terminal(DC)

the last 2 numbers in the above output'. Then the real port is calculated 

as 'p1*256 + p2'.

```
nc -v <target ip> <dynamic port>
```

#### First terminal(CC)

list the available files in the FTP share

```
LIST[Ctrl+V][Enter][Enter]
```

#### Sec terminal(DC)
 
will see a list of the files available in the share!

#### First terminal(CC)

```
PASV[Ctrl + V][Enter][Enter]
```

#### Sec terminal(DC)
re-calculate

```
nc -v 10.129.233.197 49714(new dymatic)
```

#### First terminal(CC)

```
RETR Note-From-IT.txt[Ctrl+V][Enter][Enter]

#list in DC
```

#### Sec terminal(DC)

check the note

### HTTP

[HTTP headers](https://en.wikipedia.org/wiki/List_of_HTTP_header_fields).

```
nc -v <target ip> 80

nc -v 10.129.233.197 80/ 
```

```
GET / HTTP/1.1[enter] 
Host: <target ip>[enter] 
User-Agent: Server Administrator[enter][enter]
```
If there were a login page we wanted to access, our request might look like `GET /login.php`

### MAC

![[st 2026-06-18 23.14.47.excalidraw]]

### protocol

#### list

| Acronym    | Description                                                                                                                                                                                                                                                                                    | port          |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| WEP        | WEP is a type of security protocol that was commonly used to secure wireless networks.                                                                                                                                                                                                         |               |
| SSH        | A secure network protocol used to log into and execute commands on a remote system                                                                                                                                                                                                             | 22            |
| FTP        | A network protocol used to transfer files from one system to another                                                                                                                                                                                                                           | 20-21         |
| SMTP       | A protocol used to send and receive emails                                                                                                                                                                                                                                                     | 25            |
| HTTP       | A client-server protocol used to send and receive data over the internet                                                                                                                                                                                                                       |               |
| SMB        | A protocol used to share files, printers, and other resources in a network                                                                                                                                                                                                                     | 445           |
| NFS        | A protocol used to access files over a network                                                                                                                                                                                                                                                 |               |
| SNMP       | A protocol used to manage network devices                                                                                                                                                                                                                                                      | 161-162       |
| WPA        | WPA is a wireless security protocol that uses a password to protect wireless networks from unauthorized access.                                                                                                                                                                                |               |
| TKIP       | TKIP is also a security protocol used in wireless networks but less secure.                                                                                                                                                                                                                    |               |
| NTP        | It is used to synchronize the timing of computers on a network.                                                                                                                                                                                                                                | 123           |
| VLAN       | It is a way to segment a network into multiple logical networks.                                                                                                                                                                                                                               |               |
| VTP        | VTP is a Layer 2 protocol that is used to establish and maintain a virtual LAN (VLAN) spanning multiple switches.                                                                                                                                                                              |               |
| RIP        | RIP is a distance-vector routing protocol used in local area networks (LANs) and wide area networks (WANs).                                                                                                                                                                                    | 520           |
| OSPF       | It is an interior gateway protocol (IGP) for routing traffic within a single Autonomous System (AS) in an Internet Protocol (IP) network.                                                                                                                                                      | 89            |
| IGRP       | IGRP is a Cisco proprietary interior gateway protocol designed for routing within autonomous systems.                                                                                                                                                                                          |               |
| EIGRP      | It is an advanced distance-vector routing protocol that is used to route IP traffic within a network.                                                                                                                                                                                          |               |
| PGP        | PGP is an encryption program that is used to secure emails, files, and other types of data.                                                                                                                                                                                                    |               |
| NNTP       | NNTP is a protocol used for distributing and retrieving messages in newsgroups across the internet.                                                                                                                                                                                            | 119           |
| CDP        | It is a proprietary protocol developed by Cisco Systems that allows network administrators to discover and manage Cisco devices connected to the network.                                                                                                                                      |               |
| HSRP       | HSRP is a protocol used in Cisco routers to provide redundancy in the event of a router or other network device failure.                                                                                                                                                                       |               |
| VRRP       | It is a protocol used to provide automatic assignment of available Internet Protocol (IP) routers to participating hosts.                                                                                                                                                                      |               |
| STP        | STP is a network protocol used to ensure a loop-free topology in Layer 2 Ethernet networks.                                                                                                                                                                                                    |               |
| TACACS     | TACACS is a protocol that provides centralized authentication, authorization, and accounting for network access.                                                                                                                                                                               |               |
| SIP        | It is a signaling protocol used for establishing and terminating real-time voice, video and multimedia sessions over an IP network.                                                                                                                                                            | 5060          |
| VOIP       | VOIP is a technology that allows for telephone calls to be made over the internet.                                                                                                                                                                                                             |               |
| EAP        | EAP is a framework for authentication that supports multiple authentication methods, such as passwords, digital certificates, one-time passwords, and public-key authentication.                                                                                                               |               |
| LEAP       | LEAP is a proprietary wireless authentication protocol developed by Cisco Systems. It is based on the Extensible Authentication Protocol (EAP) used in the Point-to-Point Protocol (PPP).                                                                                                      |               |
| PEAP       | PEAP is a security protocol that provides an encrypted tunnel for wireless networks and other types of networks.                                                                                                                                                                               |               |
| SMS        | SMS is a systems management solution that helps organizations manage their networks, systems, and mobile devices.                                                                                                                                                                              |               |
| MBSA       | It is a free security tool from Microsoft that is used to detect potential security vulnerabilities in Windows computers, networks, and systems.                                                                                                                                               |               |
| SCADA      | It is a type of industrial control system that is used to monitor and control industrial processes, such as those in manufacturing, power generation, and water and waste treatment.                                                                                                           |               |
| VPN        | VPN is a technology that allows users to create a secure, encrypted connection to another network over the internet.                                                                                                                                                                           |               |
| IPsec      | IPsec is a protocol used to provide secure, encrypted communication over a network. It is commonly used in VPNs, or Virtual Private Networks, to create a secure tunnel between two devices.                                                                                                   | 500           |
| PPTP       | It is a protocol used to create a secure, encrypted tunnel for remote access.                                                                                                                                                                                                                  | 1723          |
| NAT        | NAT is a technology that allows multiple devices on a private network to connect to the internet using a single public IP address. NAT works by translating the private IP addresses of devices on the network into a single public IP address, which is then used to connect to the internet. |               |
| CRLF       | Combines two control characters to indicate the end of a line and a start of a new one for certain text file formats.                                                                                                                                                                          |               |
| AJAX       | Web development technique that allows creating dynamic web pages using JavaScript and XML/JSON.                                                                                                                                                                                                |               |
| ISAPI      | Allows to create performance-oriented web extensions for web servers using a set of APIs.                                                                                                                                                                                                      |               |
| URI        | It is a syntax used to identify a resource on the Internet.                                                                                                                                                                                                                                    |               |
| URL        | Subset of URI that identifies a web page or another resource on the Internet, including the protocol and the domain name.                                                                                                                                                                      |               |
| IKE        | IKE is a protocol used to set up a secure connection between two computers. It is used in virtual private networks (VPNs) to provide authentication and encryption for data transmission, protecting the data from outside eavesdropping and tampering.                                        | 11371/500     |
| GRE        | This protocol is used to encapsulate the data being transmitted within the VPN tunnel.                                                                                                                                                                                                         |               |
| RSH        | It is a program under Unix that allows executing commands and programs on a remote computer.                                                                                                                                                                                                   |               |
| Telnet     | Remote login service                                                                                                                                                                                                                                                                           | 23            |
| HTTPS      | Used to transfer secure webpages                                                                                                                                                                                                                                                               | 443           |
| DNS        | Lookup domain names                                                                                                                                                                                                                                                                            | 53            |
| TFTP       | Used to transfer files                                                                                                                                                                                                                                                                         | 69            |
| POP3       | Used to retrieve emails                                                                                                                                                                                                                                                                        | 110           |
| DB2        | RDBMS is designed to store, retrieve and manage data in a structured format for enterprise applications such as financial systems, customer relationship management (CRM) systems.                                                                                                             | 50000         |
| X11        | It is a computer software system and network protocol that provides a graphical user interface (GUI) for networked computers.                                                                                                                                                                  | 6000-6063     |
| XDMCP      | XDMCP is a network protocol that allows a user to remotely log in to a computer running the X11.                                                                                                                                                                                               | 177           |
| OpenPGP    | It is a protocol for encrypting and signing data and communications.                                                                                                                                                                                                                           | 11371         |
| IRC        | It is a real-time Internet text messaging (chat) or synchronous communication protocol.                                                                                                                                                                                                        | 194           |
| SYSLOG     | It is a standard protocol to collect and store log messages on a computer system.                                                                                                                                                                                                              | 514           |
| VNC        | It is a graphical desktop sharing system.                                                                                                                                                                                                                                                      | 5900          |
| PGSQL      | It is an object-relational database management system.                                                                                                                                                                                                                                         | 5432          |
| UPnP       | It is a protocol for devices to discover each other on the network and communicate.                                                                                                                                                                                                            | 1900          |
| ms-sql-m   | Used for the Microsoft SQL Server Browser service.                                                                                                                                                                                                                                             | 1433-1434     |
| netbios-ns | It is used in Windows operating systems to resolve NetBIOS names to IP addresses on a LAN.                                                                                                                                                                                                     | 137           |
| TS         | It is a remote access protocol used for Microsoft Windows Terminal Services by default.                                                                                                                                                                                                        | 3389          |
| MySQL      | It is an open-source database management system.                                                                                                                                                                                                                                               | 3306          |
| DHCP       | It is used to assign IP addresses to devices in a network dynamically.                                                                                                                                                                                                                         | 67.68         |
| BOOTP      | It is used to bootstrap hosts in a network.                                                                                                                                                                                                                                                    | 500,67, 68    |
| NTP        | It synchronizes computer clocks in a network                                                                                                                                                                                                                                                   | 123           |
| RLOGIN     | This protocol starts an interactive shell session on a remote computer.                                                                                                                                                                                                                        | 513           |
| REXEC      | This protocol is used to execute commands on remote computers and send the output of commands back to the local computer.                                                                                                                                                                      | 512           |
| KINK       | Used for authentication and authorization                                                                                                                                                                                                                                                      | 892           |
| ISAKMP     | Used for VPN connections                                                                                                                                                                                                                                                                       | 500           |
| TCPW       | Used for access control                                                                                                                                                                                                                                                                        | 113           |
| SSL        | Securely transfer files                                                                                                                                                                                                                                                                        | 443           |
| SOAP       | Used for web services                                                                                                                                                                                                                                                                          | 80, 443       |
| SCP        | Securely copy files between systems                                                                                                                                                                                                                                                            | 22            |
| http-proxy | Squid web proxy is a caching and forwarding HTTP web proxy used to speed up a web server by caching repeated requests.                                                                                                                                                                         | 3128          |
| ingreslock | Ingres database is commonly used for large commercial applications and as a backdoor that can execute commands remotely via RPC.                                                                                                                                                               | 1524          |
| oracle-tns | The Oracle database default/alternative listener is a service that runs on the database host and receives requests from Oracle clients.                                                                                                                                                        | 1521/1526     |
| IGMP       | Used for multicasting                                                                                                                                                                                                                                                                          | 0-255         |
| ICMP       | Used to troubleshoot network issues                                                                                                                                                                                                                                                            | 0-255         |
| Ident      | Used to identify user processes                                                                                                                                                                                                                                                                | 113           |
| RPC        | Used to call remote procedures                                                                                                                                                                                                                                                                 | 135, 137.139. |
| RDP        | Used for remote desktop access                                                                                                                                                                                                                                                                 | 3389          |
| RADIUS     | Used for authentication and authorization                                                                                                                                                                                                                                                      | 1812, 1813    |
| LDAP       | Used for directory services                                                                                                                                                                                                                                                                    | 389           |
| Kerberos   | Used for authentication and authorization                                                                                                                                                                                                                                                      | 88            |
| NFS        | Used to mount remote systems                                                                                                                                                                                                                                                                   | 111, 2049     |
### TCP/UDP
![[st 2026-06-19 12.38.28.excalidraw]]
### VoIP
![[st 2026-06-19 12.52.33.excalidraw]]

### ICMP(TTL)
![[st 2026-06-19 13.10.21.excalidraw]]
### Wireless Networks
#### WEP/WPA
![[st 2026-06-19 15.47.52.excalidraw]]
#### attack/defence
![[st 2026-06-19 16.19.32.excalidraw]]
### VPN
![[st 2026-06-19 16.56.38.excalidraw]]
### VLAN
![[st 2026-06-19 21.16.39.excalidraw]]

#### Assigning NICs a VLAN in Linux
creating a `VLAN` is done by creating an interface on top of another, called a `parent` interface

tools：

ip，nmcli，vconfig（deprecated）

```
sudo modprobe 8021q

##nsure that the Kernel has the [802.1Q] module loaded

lsmod | grep 8021

## use `lsmod` to make sure `8021q` was loaded successfully

ip a

##find the name of the physical `Ethernet` interface that we will create the `VLAN` interface on top of, which is `eth0`

sudo vconfig add eth0 20
sudo ip link add link eth0 name eth0.20 type vlan id 20

##use `vconfig` to create a new interface that is a member of the desired `VLAN`, `20`, for example, on top of `eth0`

##Either of these commands will make a new interface called `eth0.20@eth0`

ip a

sudo ip addr add 192.168.1.1/24 dev eth0.20、

sudo ip link set up eth0.20

##based on the `subnet` assigned to the addresses with `VLAN 20` within the local network, we need to assign the interface an IP address and then start it

ip a | grep eth0.20

##check whether the interface has changed states to up

```

#### Assigning NICs a VLAN in Windows

Device Manager## Security Implications and VLAN Attacksthis attack only works if the adversary is connected to a port residing in the same `VLAN` as the `native VLAN` of the trunk port

- GUI
PowerShell

```
Get-NetAdapter | Format-Table -AutoSize

Get-NetAdapterAdvancedProperty -DisplayName "vlan id"

Set-NetAdapter -Name "Ethernet 2" -VlanID 10
```
- this powerful Cmdlet can also be used to customize other properties of interfaces such as [MAC addresses]
## Cryptography
![[st 2026-06-20 20.25.21.excalidraw]]
### Key Exchange Mechanisms
![[st 2026-06-20 17.04.12.excalidraw]]

#### IKE
![[st 2026-06-20 19.01.20.excalidraw]]

# Linux

### structure
![[st 2026-06-20 20.55.08.excalidraw]]


### Getting Help

```
ls

##list the files and directories within the current folder or any specified directory
```

```
man <tool>

##displays the manual pages for commands and provides detailed information about their usage
```

```
<tool> --help

##quickly look

<tool> -h

##short version of help
```

```
apropos <keyword>

##Each manual page has a short description available within it. This tool searches the descriptions for instances of a given keyword.
```

https://explainshell.com/

### System Information
help gather system parameters

| **Command** | **Description**                                                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| whoami      | Displays current usernameid                                                                                                        |
| id          | Returns users identity                                                                                                             |
| hostname    | Sets or prints the name of current host system.                                                                                    |
| uname       | Prints basic information about the operating system name and system hardware.                                                      |
| pwd         | Returns working directory name                                                                                                     |
| ifconfig    | The ifconfig utility is used to assign or to view an address to a network interface and/or configure network interface parameters. |
| ip          | Ip is a utility to show or manipulate routing, network devices, interfaces and tunnels.                                            |
| netstat     | Shows network status                                                                                                               |
| ss          | Shows process status.                                                                                                              |
| who         | Displays who is logged in.                                                                                                         |
| env         | Prints environment or sets and executes comwhomand.                                                                                |
| lsblk       | Lists block devices.                                                                                                               |
| lsusb       | Lists USB devices                                                                                                                  |
| lsof        | Lists opened files.                                                                                                                |
| lspci       | Lists PCI devices.                                                                                                                 |
### login
```
ssh htb-student@[IP address]
```

SSH to with user "htb-student" and password "HTB_@cademy_stdnt!"
### navigation
#### pwd
```
pwd

##find out in which directory we are. We can find out where we are with the command `pwd`
```
#### ls
```

ls

ls -l

##display more information on those directories and files

ls -la

##`list all` files of a directory
(e.g., `.bashrc` or `.bash_history`).

ls -l /var/

##do not necessarily need to navigate there first.
```

#### cd
```
cd /dev/shm

##navigate to the directory

cd -

## quickly jump back to the directory we were last in

cd /dev/s [TAB 2x]

##will get all entries starting with the letter “`s`” in the directory of `/dev/`

cd ..

The first entry with a single dot (`.`) indicates the current directory we are currently in. The second entry with two dots (`..`) represents the parent directory `/dev`

clear

cry0l1t3@htb[/dev]$ cd shm && clear

##clean the shell
[Ctrl] + [L]：clean up our terminal

[Ctrl] + [R]：search through the command history and type some of the text that we are looking for
```
### Syntax
#### Create, Move, and Copy

```
touch <name>

## Create an Empty File

touch ./Storage/local/user/userinfo.txt

```

```
mkdir <name>

## Create a Directory

mkdir -p Storage/local/user/documents

##which allows you to create parent directories automatically

```

```
tree

tree .

##look at the whole structure after creating the parent directories with the tool

use the single dot (`.`) to indicate that you want to start from the current directory
```

```
mv <file/directory> <renamed file/directory>

##move and also rename files and directories

mv info.txt information.txt

## Rename File

mv information.txt readme.txt Storage/

## Move Files to Specific Directory

```

```
cp Storage/readme.txt Storage/local/

## Copy readme.txt
```

#### Editing Files

```
nano notes.txt

[CTRL + X]

##quit

cat notes.txt

##view the contents of the file

vim

vimtutor
```

#### Find Files and Directories

```
which python

##This tool returns the path to the file or link that should be executed
```

```
find <location> <options>

##Besides the function to find files and folders, this tool also contains the function to filter the results

find / -type f -name *.conf -user root -size +20k -newermt 2020-03-03 -exec ls -al {} \; 2>/dev/null

##look at an example of what such a command with multiple options would look like
```


| option              | discription                                                                                                                                                                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| -type f             | Hereby, we define the type of the searched object. In this case, '`f`' stands for '`file`'.                                                                                                                                                                                    |
| -name “*.conf”      | With '`-name`', we indicate the name of the file we are looking for. The asterisk (`*`) stands for 'all' files with the '`.conf`' extension.                                                                                                                                   |
| -user root          | This option filters all files whose owner is the root user.                                                                                                                                                                                                                    |
| -size +20k          | We can then filter all the located files and specify that we only want to see the files that are larger than 20 KiB.                                                                                                                                                           |
| -newermt 2020-03-03 | with this option, we set the date. Only files newer than the specified date will be presented.                                                                                                                                                                                 |
| -exec ls -al {} \;  | This option executes the specified command, using the curly brackets as placeholders for each result. The backslash escapes the next character from being interpreted by the shell because otherwise, the semicolon would terminate the command and not reach the redirection. |
| 2>/dev/null         | This is a `STDERR` redirection to the '`null device`', which we will come back to in the next section. This redirection ensures that no errors are displayed in the terminal. This redirection must `not` be an option of the 'find' command.                                  |

#### Locate
```
sudo updatedb

##update this database with the following command.

locate *.conf

##`locate` offers us a quicker way to search through the system

`locate` works with a local database that contains all information about existing files and folders

However, this tool does not have as many filter options that we can use.
```

#### File Descriptors and Redirections

how to use redirection to send the output of one program into another for further processing.

```
character (`>`)



sign (`<`)

FD 0 - STDIN
```

|                |                                                            |
| -------------- | ---------------------------------------------------------- |
| - `STDIN – 0`  | Data Stream for Input                                      |
| - `STDOUT – 1` | Data Stream for Output                                     |
| - `STDERR – 2` | Data Stream for Output that relates to an error occurring. |

```
find /etc/ -name passwd >> stdout.txt 2>/dev/null

##If this file exists, it will be overwritten without asking for confirmation. If we want to append `STDOUT` to our existing file, we can use the double greater-than sign (`>>`)
```

```
cat << EOF > stream.txt

##characters (`<<`) to add our standard input through a stream.、

`End-Of-File` (`EOF`) function of a Linux system file, which defines the input's end.
```

```
find /etc/ -name *.conf 2>/dev/null | grep systemd

##Another way to redirect `STDOUT` is to use pipes (`|`).

Using `grep`, we filter out the results and specify that only the lines containing the pattern "`systemd`" should be displayed.
```

```
find /etc/ -name *.conf 2>/dev/null | grep systemd | wc -l

##we will use the tool called `wc`, which should count the total number of obtained results.
```

```
dpkg -l | grep '^ii' | wc -l

## How many total packages are installed on the target system?
```

### Filter Contents

reading files directly from the command line, without needing to open a text editor

```
cat /etc/passwd | more

less /etc/passwd

##The presentation is almost the same as with `more`

When closing `less` with the `[Q]` key, we will notice that the output we have seen, unlike `more`, does not remain in the terminal.
```

```
head /etc/passwd

tail /etc/passwd

##By default, `head` prints the first ten lines of the given file or input, if not specified otherwise.

If we only want to see the last parts of a file or results, we can use the counterpart of `head` called `tail`, which returns the `last` ten lines.
```

```
cat /etc/passwd | sort

##Depending on which results and files are dealt with, they are rarely sorted.
```

```
cat /etc/passwd | grep "/bin/bash"

##earch for specific results that match patterns we define

cat /etc/passwd | grep -v "false\|nologin"

##to exclude specific results.
```

```
cat /etc/passwd | grep -v "false\|nologin" | cut -d":" -f1

##Therefore we use the option "`-d`" and set the delimiter to the colon character (`:`) and define with the option "`-f`" the position in the line we want to output.
```

```
cat /etc/passwd | grep -v "false\|nologin" | tr ":" " "

##replace certain characters from a line with characters defined by us is the tool `tr`
```

```
cat /etc/passwd | grep -v "false\|nologin" | tr ":" " " | column -t

##`column` is well suited to display such results in tabular form using the "`-t`."
```

```
cat /etc/passwd | grep -v "false\|nologin" | tr ":" " " | awk '{print $1, $NF}'

##which allows us to display the first (`$1`) and last (`$NF`) result of the line.
```

```
cat /etc/passwd | grep -v "false\|nologin" | tr ":" " " | awk '{print $1, $NF}' | sed 's/bin/HTB/g'

##The "`s`" flag at the beginning stands for the substitute command. Then we specify the pattern we want to replace. After the slash (`/`), we enter the pattern we want to use as a replacement in the third position. Finally, we use the "`g`" flag, which stands for replacing all matches.
```

```
cat /etc/passwd | grep -v "false\|nologin" | tr ":" " " | awk '{print $1, $NF}' | wc -l

##With the "`-l`" option, we specify that only the lines are counted.
```


| practice |                                                                                                                                                                |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1        | A line with the username `cry0l1t3`                                                                                                                            |
| 2        | The usernames.                                                                                                                                                 |
| 3        | The username `cry0l1t3` and his UID.                                                                                                                           |
| 4        | The username `cry0l1t3` and his UID separated by a comma (`,`)                                                                                                 |
| 5        | The username `cry0l1t3`, his UID, and the set shell separated by a comma (`,`)                                                                                 |
| 6        | All usernames with their UID and set shells separated by a comma (`,`)                                                                                         |
| 7        | All usernames with their UID and set shells separated by a comma (`,`) and exclude the ones that contain `nologin` or `false`.                                 |
| 8        | All usernames with their UID and set shells separated by a comma (`,`) and exclude the ones that contain `nologin` and count all lines of the filtered output. |
```
ss -tulnH | awk '$5 ~ /^0\.0\.0\.0:/ {print}'

## How many services are listening on the target system on all interfaces? (Not on localhost and IPv4 only)

```

```
ps aux | grep proftpd | grep -v grep

## Determine what user the ProFTPd server is running under. Submit the username as the answer. 
```

```
curl -s https://www.inlanefreight.com/ \
| grep -Eo "https://www\.inlanefreight\.com[^\"']*" \
| sort -u \
| wc -l

```

### Regular Expressions


|        |                                                                                                                                                                             |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (a)    | The round brackets are used to group parts of a regex. Within the brackets, you can define further patterns which should be processed together.                             |
| [a-z]  | The square brackets are used to define character classes. Inside the brackets, you can specify a list of characters to search for.                                          |
| {1,10} | The curly brackets are used to define quantifiers. Inside the brackets, you can specify a number or a range that indicates how often a previous pattern should be repeated. |
| \|     | Also called the OR operator and shows results when one of the two expressions matches                                                                                       |
| .*     | Operates similarly to an AND operator by displaying results only when both expressions are present and match in the specified order                                         |
```
grep -E "(my|false)" /etc/passwd

grep -E "(my.*false)" /etc/passwd

grep -E "my" /etc/passwd | grep -E "false"

```
#### practice
[[bdf946ef56f9406ff6cbb9ed39bc59c6_MD5.jpg|Open: Screenshot 2026-06-21 at 5.35.57 PM.png]]
![[bdf946ef56f9406ff6cbb9ed39bc59c6_MD5.jpg]]

### Permission Management
![[st 2026-06-21 17.46.37.excalidraw]]

[[ccd1dc624484fa52eee818d4fc5d4820_MD5.jpg|Open: Screenshot 2026-06-21 at 5.49.45 PM.png]]
![[ccd1dc624484fa52eee818d4fc5d4820_MD5.jpg]]

#### Change Permissions

| chmod |           |
| ----- | --------- |
| u     | owner     |
| g     | group     |
| o     | others    |
| a     | all users |
```
chmod a+r shell && ls -l shell

##apply `read` permissions for all users

chmod 754 shell && ls -l shell

##set the permissions for all other users to `read` only using the octal value assignment
```

[[385859a274ac0c2f519eae68ee20b918_MD5.jpg|Open: Screenshot 2026-06-21 at 5.54.34 PM.png]]
![[385859a274ac0c2f519eae68ee20b918_MD5.jpg]]

### Change Owner

To change the owner and/or the group assignments of a file or directory, we can use the `chown` command. 

```
chown <user>:<group> <file/directory>
```

### User Management

| command  | description                                                                                                                                                |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sudo     | Execute command as a different user.                                                                                                                       |
| su       | The `su` utility requests appropriate user credentials via PAM and switches to that user ID (the default user is the superuser). A shell is then executed. |
| useradd  | Creates a new user or update default new user information.                                                                                                 |
| userdel  | Deletes a user account and related files                                                                                                                   |
| usermod  | Modifies a user account.                                                                                                                                   |
| addgroup | Adds a group to the system.                                                                                                                                |
| delgroup | Removes a group from the system.                                                                                                                           |
| passwd   | Changes user password                                                                                                                                      |

### Package Management
#### tool

| command  | discription                                                                                                                                                                                                                                                                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dpkg     | The `dpkg` is a tool to install, build, remove, and manage Debian packages. The primary and more user-friendly front-end for `dpkg` is aptitude.                                                                                                                                                                                                        |
| apt      | Apt provides a high-level command-line interface for the package management system.                                                                                                                                                                                                                                                                     |
| aptitude | Aptitude is an alternative to apt and is a high-level interface to the package manager.                                                                                                                                                                                                                                                                 |
| snap     | Install, configure, refresh, and remove snap packages. Snaps enable the secure distribution of the latest apps and utilities for the cloud, servers, desktops, and the internet of things.                                                                                                                                                              |
| gem      | Gem is the front-end to RubyGems, the standard package manager for Ruby.                                                                                                                                                                                                                                                                                |
| pip      | Pip is a Python package installer recommended for installing Python packages that are not available in the Debian archive. It can work with version control repositories (currently only Git, Mercurial, and Bazaar repositories), logs output extensively, and prevents partial installs by downloading all requirements before starting installation. |
| git      | Git is a fast, scalable, distributed revision control system with an unusually rich command set that provides both high-level operations and full access to internals.                                                                                                                                                                                  |


