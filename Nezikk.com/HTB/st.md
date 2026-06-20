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
