---
title: "VIRCS AT&T+Frontier美国家宽测评：优质的美西家宽"
source: "https://linux.do/t/topic/2142360"
author:
  - "[[STALK]]"
published: 2026-05-09
created: 2026-05-10
---
[![[848884f3b12ce81a65abf2ae1b5345b3_MD5.jpg]]

image1698×464 160 KB

](https://cdn3.ldstatic.com/original/4X/8/0/a/80a818381f3b4f85bc08142662f31345efb62ee3.jpeg "image")

[VIRCS](https://www.vircs.com/)，又称威尔克斯，美西家宽头部商家，主营AT&T家宽产品，持有超过1万+家宽IP，家宽集中地点为加州，大部分产品为 独享带宽+独立IP+共享性能(VPS)+无限流量，IP质量优秀，机器性能中规中矩，4C8G的标配能满足绝大部分应用，高昂的售价搭配较低的带宽，滥用大户基本不会使用这类机器，也使得IP质量波动不大，整体而言是十分推荐的商家。

**注意事项**

1.零信任模式

服务商提供了三种安全防护模式，一般推荐使用`IP白名单模式`，对大部分人而言5个白名单IP足够使用，端口转发会造成额外的性能损失，可能加剧网络波动，所以不推荐这样做。

[![[9879bbb17ecfe5657c35f6200d079fbc_MD5.png]]

image1340×250 44.2 KB

](https://cdn3.ldstatic.com/original/4X/b/6/8/b687241f1c1d9475a76f4044fa7b20252d536b37.png "image")

2.付费更换IP

服务商还提供更换IP功能，可以`单独花10美元进行更换IP`或者`续费并+5美元更换IP`，在额外付费更换IP时，服务商会直接提供一大堆候选IP，可以挑选自己喜欢的，建议是选择连号的中的某一些，更大概率是新的IP。比如说候选IP为`222`、`223`、`224`、`225`、`226`、`227`、`228`、`229`、`230`、`167`、`182`、`53`，前面这些连号的更可能是没分配的新IP，而后面的单独的可能就是别人用过后释放的。

3.免费更换IP

申请免费更换 IP，您的 IP 必须存在以下问题之一：

- 在 **[Google.com](http://google.com/)** 搜索结果中出现明显的"非美国"地区提示；
- **Meta.ai** 明确提示"不支持当前国家/地区"；
- 无法访问 **ChatGPT** 或 **Google Gemini**。

在确认存在上述问题的前提下，还需符合以下任一条件方可申请：

- 新购 3 天内
- 服务使用期间且服务剩余有效期≥ 15天+距上次 IP 更换≥ 31天

4.退款政策

官网原文

> 本服务均为虚拟商品，一经售出**概不退款**，包括但不限于购买错误、不会使用、对第三方"查询结果/评分/显示地区"不满意、测速不理想等

5.严禁开放 80 端口或搭建网站

**推荐操作**

为了更好的保护IP，推荐关闭ping和修改SSH端口哦

下面两组命令适用于Debian12(如果有问题推荐问问AI修改适配自己的系统)

关闭ICMP答复报文

```bash
echo "net.ipv4.icmp_echo_ignore_all = 1" | sudo tee /etc/sysctl.d/99-disable-ping.conf
sudo sysctl --system
```

更改SSH端口为35432(你也可以修改为你喜欢的数字)

```bash
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak.$(date +%F-%H%M%S)
sudo sed -i 's/^[#[:space:]]*Port[[:space:]].*/Port 35432/' /etc/ssh/sshd_config
grep -q '^Port 35432' /etc/ssh/sshd_config || echo 'Port 35432' | sudo tee -a /etc/ssh/sshd_config
sudo sshd -t
sudo systemctl restart ssh
```

> 本文无AFF，更多家宽产品可见[原文](https://meowvps.com/blog/vircs/)

### AT&T产品

测试配置为

```css
CPU：4 核 vCore
内存：8GB DDR4
硬盘：50GB NVMe
IP：静态独享住宅IP地址
带宽：独享50Mbps[选配]
流量：独享专用IP无限流量
系统：Windows / Linux
交付：付款后自动开通
35.99刀/月
```

**网络质量**

三网勉强可以直连，推荐作为纯落地使用，搭配优质中转来提升稳定性和体验。绝大部分的洛杉矶线路机器中转延时在5-30ms左右，可以轻松跑满50Mbps带宽的，速度还是比较稳定的。

**IP质量**

IP质量优秀，数据完美家宽，流媒体完整解锁(包含MetaAI)，这个IP质量基本可以代表家宽质量的顶峰了，无可挑剔。

**机器性能**

机器性能较差，经典的E5+IO限制速度，不过本身4C8G的配置给的也比较足，运行大部分应用还是足够的，很吃CPU和IO的应用建议就不要放在这个机器上。

**产品评价**

这份测试结果可以很好的诠释美西头部家宽商家的产品表现上限，非常亮眼的一款的产品，无论是IP质量还是带宽都比较稳定。

但我还要说说这款产品的问题：

- 品控不稳定：这个问题也是老生长谈了，这个商家已经运营很久，避免不了一些老IP段的流出，比如说有些IP段被上一个人常年累月的使用后又释放重新放回到IP池子里，下一任机主买到手就发现是一个被“玩坏”的IP，甚至买到就是\[\[送中\]\]的，非常惨不忍睹，后续虽然商家更新了规则指明“送中”是可以免费更换IP的，但被数据库标记却是无法更换的，还必须要用户自行付费更换。总结的说就是**有的IP崭新出场，有的IP久经沙场**，运气不好的MJJ买到坏IP体验非常糟糕啊。尽管这种现象并不常见，但还是存在的，我的建议是可以等官方购置新宽带后再购买，大概率就是全新IP，或者直接做好准备花10刀付费选择连号的新IP，毕竟买这款产品都是运营长期使用的，开头一次性的10刀更换费用其实也还好。
- 部分段**国际方向丢包断流**严重：有些IP段频繁的断流丢包，有些买来用AI的MJJ就很苦恼”怎么用思考到一半就中断了又要重新来“。这个似乎是AT&T防火墙的问题，我接触的多个AT&T家宽商家都说"AT&T静态家宽IP有并发连接数限制，此为运营商光猫的限制无法解除和解决",但就我玩过的AT&T家宽来看，有些段完全没问题，有的段更疯狂丢包断流，我更倾向于可能是部分IP段的超售问题，当然这个也只是我的推测而已，对于这个情况用户本身也很难解决，只能说是减少高并发的连接来缓解这个状况。额外说明一下：这个丢包不是ICMP丢包，家宽ICMP丢包很正常的，这个丢包是指TCP丢包。

除去这两个问题，这款产品就没什么我要说的了，总体来说，还是非常不错的产品，有需求可以优先考虑购买。

#### 网络质量

**闲时IPV4回程测试**

[![[a2545a794d2431886567389d3cc86473_MD5.png]]

netcheck713×839 140 KB

](https://cdn3.ldstatic.com/original/4X/9/3/a/93a8ce2503577427b8d5f0f349d8a7e12981f737.png "netcheck")

**国际主流网站互联测试**

[![[b47c1f0f9a8e38fbd89082bc98fd0e02_MD5.png]]

cdn2400×4900 946 KB

](https://cdn3.ldstatic.com/original/4X/0/e/c/0ecbc2f329743484ee895460aa434477e1dae817.png "cdn")

**闲时广州电信(500Mbps)** → **目标机器 IPERF3单线程测试**

```
200 packets transmitted, 193 received, 3.5% packet loss, time 199360ms
rtt min/avg/max/mdev = 164.522/168.883/198.970/4.483 ms

[ ID] Interval           Transfer     Bitrate         Retr  Cwnd
[  5]   0.00-1.00   sec  3.26 MBytes  27.4 Mbits/sec    0    416 KBytes       
[  5]   1.00-2.00   sec  2.49 MBytes  20.9 Mbits/sec  1104   2.41 MBytes       
[  5]   2.00-3.00   sec  6.25 MBytes  52.4 Mbits/sec    5   1.96 MBytes       
[  5]   3.00-4.00   sec  6.25 MBytes  52.4 Mbits/sec  168   1.97 MBytes       
[  5]   4.00-5.00   sec  3.75 MBytes  31.4 Mbits/sec   73   1.04 MBytes       
[  5]   5.00-6.00   sec  7.50 MBytes  62.9 Mbits/sec    0   2.01 MBytes       
[  5]   6.00-7.00   sec  5.00 MBytes  41.9 Mbits/sec  106   2.00 MBytes       
[  5]   7.00-8.00   sec  6.25 MBytes  52.4 Mbits/sec   34   2.00 MBytes       
[  5]   8.00-9.00   sec  3.75 MBytes  31.4 Mbits/sec   21   1.39 MBytes       
[  5]   9.00-10.00  sec  5.00 MBytes  41.9 Mbits/sec   38   1.46 MBytes       
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-10.00  sec  49.5 MBytes  41.5 Mbits/sec  1549             sender
[  5]   0.00-10.17  sec  47.8 MBytes  39.4 Mbits/sec                  receiver

[ ID] Interval           Transfer     Bitrate
[  5]   0.00-1.00   sec   185 KBytes  1.52 Mbits/sec                  
[  5]   1.00-2.00   sec   725 KBytes  5.94 Mbits/sec                  
[  5]   2.00-3.00   sec  1.22 MBytes  10.2 Mbits/sec                  
[  5]   3.00-4.00   sec  1.50 MBytes  12.6 Mbits/sec                  
[  5]   4.00-5.00   sec  1.48 MBytes  12.5 Mbits/sec                  
[  5]   5.00-6.00   sec  1.37 MBytes  11.5 Mbits/sec                  
[  5]   6.00-7.00   sec  1.66 MBytes  13.9 Mbits/sec                  
[  5]   7.00-8.00   sec  2.49 MBytes  20.9 Mbits/sec                  
[  5]   8.00-9.00   sec  2.14 MBytes  17.9 Mbits/sec                  
[  5]   9.00-10.00  sec  2.22 MBytes  18.6 Mbits/sec                  
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-10.38  sec  18.0 MBytes  14.6 Mbits/sec  1037             sender
[  5]   0.00-10.00  sec  15.0 MBytes  12.6 Mbits/sec                  receiver
```

**闲时广州联通(500Mbps)** → **目标机器 IPERF3单线程测试**

```
200 packets transmitted, 159 received, 20.5% packet loss, time 199868ms
rtt min/avg/max/mdev = 163.462/164.697/174.160/1.522 ms

[ ID] Interval           Transfer     Bitrate         Retr  Cwnd
[  5]   0.00-1.00   sec  3.62 MBytes  30.4 Mbits/sec    0    431 KBytes       
[  5]   1.00-2.00   sec  2.50 MBytes  21.0 Mbits/sec  962   2.32 MBytes       
[  5]   2.00-3.00   sec  3.75 MBytes  31.5 Mbits/sec  1139   2.02 MBytes       
[  5]   3.00-4.00   sec  6.25 MBytes  52.4 Mbits/sec   14   1.91 MBytes       
[  5]   4.00-5.00   sec  3.75 MBytes  31.5 Mbits/sec  211   1.89 MBytes       
[  5]   5.00-6.00   sec  6.25 MBytes  52.4 Mbits/sec    1   1.90 MBytes       
[  5]   6.00-7.00   sec  3.75 MBytes  31.4 Mbits/sec    3   1.22 MBytes       
[  5]   7.00-8.00   sec  6.25 MBytes  52.4 Mbits/sec  103   1.94 MBytes       
[  5]   8.00-9.00   sec  5.00 MBytes  41.9 Mbits/sec  124   1.92 MBytes       
[  5]   9.00-10.00  sec  6.25 MBytes  52.4 Mbits/sec   71   1.99 MBytes       
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-10.00  sec  47.4 MBytes  39.7 Mbits/sec  2628             sender
[  5]   0.00-10.17  sec  45.2 MBytes  37.3 Mbits/sec                  receiver

[ ID] Interval           Transfer     Bitrate
[  5]   0.00-1.00   sec  80.6 KBytes   660 Kbits/sec                  
[  5]   1.00-2.00   sec   201 KBytes  1.64 Mbits/sec                  
[  5]   2.00-3.00   sec   437 KBytes  3.58 Mbits/sec                  
[  5]   3.00-4.00   sec   629 KBytes  5.15 Mbits/sec                  
[  5]   4.00-5.00   sec   980 KBytes  8.03 Mbits/sec                  
[  5]   5.00-6.00   sec   690 KBytes  5.65 Mbits/sec                  
[  5]   6.00-7.00   sec   584 KBytes  4.78 Mbits/sec                  
[  5]   7.00-8.00   sec   479 KBytes  3.93 Mbits/sec                  
[  5]   8.00-9.00   sec   697 KBytes  5.71 Mbits/sec                  
[  5]   9.00-10.00  sec   689 KBytes  5.64 Mbits/sec                  
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-10.17  sec  8.88 MBytes  7.32 Mbits/sec  1267             sender
[  5]   0.00-10.00  sec  5.34 MBytes  4.48 Mbits/sec                  receiver
```

**闲时广州移动(500Mbps)** → **目标机器 IPERF3单线程测试**

```
200 packets transmitted, 179 received, 10.5% packet loss, time 199396ms
rtt min/avg/max/mdev = 207.420/228.465/266.506/6.388 ms

[ ID] Interval           Transfer     Bitrate         Retr  Cwnd
[  5]   0.00-1.00   sec   976 KBytes  7.99 Mbits/sec    0    137 KBytes       
[  5]   1.00-2.00   sec  4.80 MBytes  40.2 Mbits/sec    0   2.34 MBytes       
[  5]   2.00-3.00   sec  3.75 MBytes  31.5 Mbits/sec  1349   1.65 MBytes       
[  5]   3.00-4.00   sec  3.75 MBytes  31.5 Mbits/sec  1516   1.48 MBytes       
[  5]   4.00-5.00   sec  3.75 MBytes  31.5 Mbits/sec  600   2.48 MBytes       
[  5]   5.00-6.00   sec  3.75 MBytes  31.4 Mbits/sec   24   1.33 MBytes       
[  5]   6.00-7.00   sec  6.25 MBytes  52.4 Mbits/sec    0   2.50 MBytes       
[  5]   7.00-8.00   sec  6.25 MBytes  52.4 Mbits/sec   58   2.50 MBytes       
[  5]   8.00-9.00   sec  3.75 MBytes  31.5 Mbits/sec    1   2.49 MBytes       
[  5]   9.00-10.00  sec  5.00 MBytes  41.9 Mbits/sec  125   2.50 MBytes       
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-10.00  sec  42.0 MBytes  35.2 Mbits/sec  3673             sender
[  5]   0.00-10.53  sec  38.6 MBytes  30.7 Mbits/sec                  receiver

[ ID] Interval           Transfer     Bitrate
[  5]   0.00-1.00   sec   103 KBytes   845 Kbits/sec                  
[  5]   1.00-2.00   sec   301 KBytes  2.47 Mbits/sec                  
[  5]   2.00-3.00   sec   327 KBytes  2.68 Mbits/sec                  
[  5]   3.00-4.00   sec   615 KBytes  5.04 Mbits/sec                  
[  5]   4.00-5.00   sec   867 KBytes  7.10 Mbits/sec                  
[  5]   5.00-6.00   sec   789 KBytes  6.46 Mbits/sec                  
[  5]   6.00-7.00   sec  1.55 MBytes  13.0 Mbits/sec                  
[  5]   7.00-8.00   sec  1.08 MBytes  9.08 Mbits/sec                  
[  5]   8.00-9.00   sec  1.79 MBytes  15.0 Mbits/sec                  
[  5]   9.00-10.00  sec  1.81 MBytes  15.2 Mbits/sec                  
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-10.54  sec  11.9 MBytes  9.45 Mbits/sec  900             sender
[  5]   0.00-10.00  sec  9.17 MBytes  7.69 Mbits/sec                  receiver
```

**DMIT.LAX.T1** → **目标机器 IPERF3单线程测试**

```
200 packets transmitted, 200 received, 0% packet loss, time 199292ms
rtt min/avg/max/mdev = 5.725/6.753/29.387/1.791 ms

[ ID] Interval           Transfer     Bitrate         Retr  Cwnd
[  5]   0.00-1.00   sec  16.2 MBytes   136 Mbits/sec    0   96.2 KBytes       
[  5]   1.00-2.00   sec  6.25 MBytes  52.4 Mbits/sec    0   96.2 KBytes       
[  5]   2.00-3.00   sec  5.00 MBytes  41.9 Mbits/sec    0   99.0 KBytes       
[  5]   3.00-4.00   sec  6.25 MBytes  52.4 Mbits/sec    0   96.2 KBytes       
[  5]   4.00-5.00   sec  5.00 MBytes  41.9 Mbits/sec    0   96.2 KBytes       
[  5]   5.00-6.00   sec  6.25 MBytes  52.4 Mbits/sec    0   96.2 KBytes       
[  5]   6.00-7.00   sec  5.00 MBytes  41.9 Mbits/sec    0    139 KBytes       
[  5]   7.00-8.00   sec  6.25 MBytes  52.4 Mbits/sec    0    105 KBytes       
[  5]   8.00-9.00   sec  5.00 MBytes  41.9 Mbits/sec    0   99.0 KBytes       
[  5]   9.00-10.00  sec  6.25 MBytes  52.4 Mbits/sec    0   96.2 KBytes       
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-10.00  sec  67.5 MBytes  56.6 Mbits/sec    0             sender
[  5]   0.00-10.01  sec  56.5 MBytes  47.4 Mbits/sec                  receiver

[ ID] Interval           Transfer     Bitrate
[  5]   0.00-1.00   sec  11.9 MBytes  99.4 Mbits/sec                  
[  5]   1.00-2.00   sec  5.93 MBytes  49.8 Mbits/sec                  
[  5]   2.00-3.00   sec  5.59 MBytes  46.9 Mbits/sec                  
[  5]   3.00-4.00   sec  6.08 MBytes  51.0 Mbits/sec                  
[  5]   4.00-5.00   sec  5.76 MBytes  48.3 Mbits/sec                  
[  5]   5.00-6.00   sec  5.86 MBytes  49.2 Mbits/sec                  
[  5]   6.00-7.00   sec  5.83 MBytes  48.9 Mbits/sec                  
[  5]   7.00-8.00   sec  5.70 MBytes  47.8 Mbits/sec                  
[  5]   8.00-9.00   sec  5.92 MBytes  49.7 Mbits/sec                  
[  5]   9.00-10.00  sec  5.76 MBytes  48.3 Mbits/sec                  
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-10.01  sec  67.0 MBytes  56.2 Mbits/sec  5342             sender
[  5]   0.00-10.00  sec  64.3 MBytes  53.9 Mbits/sec                  receiver
```

**BWH.DC1** → **目标机器 IPERF3单线程测试**

```
200 packets transmitted, 200 received, 0% packet loss, time 199239ms
rtt min/avg/max/mdev = 5.149/5.968/10.450/0.734 ms

[ ID] Interval           Transfer     Bitrate         Retr  Cwnd
[  5]   0.00-1.00   sec  6.46 MBytes  54.2 Mbits/sec    8   99.0 KBytes       
[  5]   1.00-2.00   sec  5.72 MBytes  48.0 Mbits/sec    0   99.0 KBytes       
[  5]   2.00-3.00   sec  5.59 MBytes  46.9 Mbits/sec   29    110 KBytes       
[  5]   3.00-4.00   sec  5.59 MBytes  46.9 Mbits/sec    0    124 KBytes       
[  5]   4.00-5.00   sec  5.59 MBytes  46.9 Mbits/sec    0   99.0 KBytes       
[  5]   5.00-6.00   sec  5.65 MBytes  47.4 Mbits/sec   17   93.3 KBytes       
[  5]   6.00-7.00   sec  5.59 MBytes  46.9 Mbits/sec   24   90.5 KBytes       
[  5]   7.00-8.00   sec  5.59 MBytes  46.9 Mbits/sec    0   96.2 KBytes       
[  5]   8.00-9.00   sec  5.59 MBytes  46.9 Mbits/sec    0   96.2 KBytes       
[  5]   9.00-10.00  sec  5.59 MBytes  46.9 Mbits/sec    0   93.3 KBytes       
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-10.00  sec  57.0 MBytes  47.8 Mbits/sec   78             sender
[  5]   0.00-10.01  sec  55.7 MBytes  46.7 Mbits/sec                  receiver

[ ID] Interval           Transfer     Bitrate
[  5]   0.00-1.00   sec  11.9 MBytes   100 Mbits/sec                  
[  5]   1.00-2.00   sec  5.85 MBytes  49.1 Mbits/sec                  
[  5]   2.00-3.00   sec  5.91 MBytes  49.6 Mbits/sec                  
[  5]   3.00-4.00   sec  5.85 MBytes  49.0 Mbits/sec                  
[  5]   4.00-5.00   sec  5.89 MBytes  49.4 Mbits/sec                  
[  5]   5.00-6.00   sec  5.86 MBytes  49.2 Mbits/sec                  
[  5]   6.00-7.00   sec  5.85 MBytes  49.0 Mbits/sec                  
[  5]   7.00-8.00   sec  5.72 MBytes  48.0 Mbits/sec                  
[  5]   8.00-9.00   sec  5.84 MBytes  49.0 Mbits/sec                  
[  5]   9.00-10.00  sec  5.91 MBytes  49.6 Mbits/sec                  
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-10.01  sec  68.0 MBytes  57.0 Mbits/sec  3851             sender
[  5]   0.00-10.00  sec  64.6 MBytes  54.2 Mbits/sec                  receiver
```

**VMISS.US.TRI** → **目标机器 IPERF3单线程测试**

```
200 packets transmitted, 200 received, 0% packet loss, time 199220ms
rtt min/avg/max/mdev = 5.144/5.860/14.506/1.001 ms

[ ID] Interval           Transfer     Bitrate         Retr  Cwnd
[  5]   0.00-1.00   sec  6.26 MBytes  52.5 Mbits/sec    0   93.3 KBytes       
[  5]   1.00-2.00   sec  5.47 MBytes  45.9 Mbits/sec    8   90.5 KBytes       
[  5]   2.00-3.00   sec  5.72 MBytes  48.0 Mbits/sec    1   90.5 KBytes       
[  5]   3.00-4.00   sec  5.53 MBytes  46.4 Mbits/sec    0   93.3 KBytes       
[  5]   4.00-5.00   sec  5.72 MBytes  48.0 Mbits/sec    0    105 KBytes       
[  5]   5.00-6.00   sec  4.78 MBytes  40.1 Mbits/sec   11    110 KBytes       
[  5]   6.00-7.00   sec  5.22 MBytes  43.8 Mbits/sec   53    110 KBytes       
[  5]   7.00-8.00   sec  4.04 MBytes  33.9 Mbits/sec   18    110 KBytes       
[  5]   8.00-9.00   sec  2.86 MBytes  24.0 Mbits/sec  108    105 KBytes       
[  5]   9.00-10.00  sec  2.80 MBytes  23.5 Mbits/sec  108   96.2 KBytes       
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-10.00  sec  48.4 MBytes  40.6 Mbits/sec  307             sender
[  5]   0.00-10.01  sec  48.0 MBytes  40.2 Mbits/sec                  receiver

[ ID] Interval           Transfer     Bitrate
[  5]   0.00-1.00   sec  11.9 MBytes  99.7 Mbits/sec                  
[  5]   1.00-2.00   sec  5.93 MBytes  49.7 Mbits/sec                  
[  5]   2.00-3.00   sec  5.92 MBytes  49.7 Mbits/sec                  
[  5]   3.00-4.00   sec  5.88 MBytes  49.3 Mbits/sec                  
[  5]   4.00-5.00   sec  5.89 MBytes  49.4 Mbits/sec                  
[  5]   5.00-6.00   sec  5.89 MBytes  49.4 Mbits/sec                  
[  5]   6.00-7.00   sec  5.90 MBytes  49.5 Mbits/sec                  
[  5]   7.00-8.00   sec  5.89 MBytes  49.4 Mbits/sec                  
[  5]   8.00-9.00   sec  5.89 MBytes  49.4 Mbits/sec                  
[  5]   9.00-10.00  sec  5.86 MBytes  49.2 Mbits/sec                  
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-10.01  sec  68.2 MBytes  57.2 Mbits/sec  3521             sender
[  5]   0.00-10.00  sec  64.9 MBytes  54.5 Mbits/sec                  receiver
```

**Flawlessnode** → **目标机器 IPERF3单线程测试**

```
200 packets transmitted, 200 received, 0% packet loss, time 199306ms
rtt min/avg/max/mdev = 33.642/34.173/37.640/0.584 ms

[ ID] Interval           Transfer     Bitrate         Retr  Cwnd
[  5]   0.00-1.00   sec  16.2 MBytes   136 Mbits/sec    0   82.0 KBytes       
[  5]   1.00-2.00   sec  6.25 MBytes  52.4 Mbits/sec    0   79.2 KBytes       
[  5]   2.00-3.00   sec  5.00 MBytes  41.9 Mbits/sec    0   82.0 KBytes       
[  5]   3.00-4.00   sec  6.25 MBytes  52.4 Mbits/sec    0   82.0 KBytes       
[  5]   4.00-5.00   sec  5.00 MBytes  41.9 Mbits/sec    0   82.0 KBytes       
[  5]   5.00-6.00   sec  6.25 MBytes  52.4 Mbits/sec    0   87.7 KBytes       
[  5]   6.00-7.00   sec  5.00 MBytes  41.9 Mbits/sec    4   99.0 KBytes       
[  5]   7.00-8.00   sec  6.25 MBytes  52.4 Mbits/sec    0   82.0 KBytes       
[  5]   8.00-9.00   sec  6.25 MBytes  52.4 Mbits/sec    0   82.0 KBytes       
[  5]   9.00-10.00  sec  5.00 MBytes  41.9 Mbits/sec    0   90.5 KBytes       
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-10.00  sec  67.5 MBytes  56.6 Mbits/sec    4             sender
[  5]   0.00-10.01  sec  56.6 MBytes  47.4 Mbits/sec                  receiver

[ ID] Interval           Transfer     Bitrate
[  5]   0.00-1.00   sec  11.7 MBytes  98.4 Mbits/sec                  
[  5]   1.00-2.00   sec  5.95 MBytes  49.9 Mbits/sec                  
[  5]   2.00-3.00   sec  5.90 MBytes  49.5 Mbits/sec                  
[  5]   3.00-4.00   sec  5.87 MBytes  49.3 Mbits/sec                  
[  5]   4.00-5.00   sec  5.88 MBytes  49.3 Mbits/sec                  
[  5]   5.00-6.00   sec  5.87 MBytes  49.2 Mbits/sec                  
[  5]   6.00-7.00   sec  5.86 MBytes  49.2 Mbits/sec                  
[  5]   7.00-8.00   sec  5.89 MBytes  49.4 Mbits/sec                  
[  5]   8.00-9.00   sec  5.79 MBytes  48.6 Mbits/sec                  
[  5]   9.00-10.00  sec  5.86 MBytes  49.2 Mbits/sec                  
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-10.03  sec  68.6 MBytes  57.4 Mbits/sec  4509             sender
[  5]   0.00-10.00  sec  64.6 MBytes  54.2 Mbits/sec                  receiver
```

#### ip质量

**IPV4质量**

[![[5b4d3a9fe5087c219d96235609ad3147_MD5.png]]

ipcheck661×819 38 KB

](https://cdn3.ldstatic.com/original/4X/0/d/d/0dd2043a25cd1249d8e59990f29f8291ffc50aa1.png "ipcheck")

[![[605465f660233ef3fd01716c886ff3b0_MD5.png]]

meowcheck2736×2636 269 KB

](https://cdn3.ldstatic.com/original/4X/d/0/c/d0c6ae62aba766f76d1ca573cd683a2f0f108534.png "meowcheck")

**IPlark测试结果**

[![[6a88df67ce021fa988986c176d006873_MD5.png]]

iplark1220×499 41.5 KB

](https://cdn3.ldstatic.com/original/4X/1/8/6/18637c949e658791f61642773046ab8809b51758.png "iplark")

**常见流媒体解锁**

```
测试时间:  2026-05-09 04:09:26
IPV4:
============[ 跨国平台 ]============
Apple                     YES (Region: USA)
BingSearch                YES (Region: US)
Claude                    YES
Dazn                      YES (Region: US)
Disney+                   YES (Region: US)
Gemini                    YES (Region: US)
GoogleSearch              YES
Google Play Store         YES (Region: US)
IQiYi                     YES (Region: US)
Instagram Licensed Audio  YES
KOCOWA                    YES
MetaAI                    YES
Netflix                   YES (Region: US)
Netflix CDN               US
OneTrust                  YES (Region: US CALIFORNIA)
ChatGPT                   YES (Region: US)
Paramount+                YES
Amazon Prime Video        YES (Region: US)
Reddit                    YES
SonyLiv                   YES (Region: IN)
Sora                      YES (Region: US)
Spotify Registration      NO
Steam Store               YES (Community Available) (Region: US)
TVBAnywhere+              YES (Region: US)
TikTok                    YES (Region: US)
Viu.com                   YES
Wikipedia Editability     YES
YouTube Region            YES
YouTube CDN               LAX
---------------------TikTok解锁--感谢lmc999的源脚本---------------------
 Tiktok Region:		【US】
```

**细分流媒体解锁**

```
** 正在测试 IPv4 解锁情况
--------------------------------
 ** 您的网络为: AT&T Internet (108.95.*.*)
============[ Multination ]============
 Dazn:					Yes (Region: US)
 Disney+:				Yes (Region: US)
 Netflix:				Yes (Region: US)
 YouTube Premium:			Yes (Region: US)
 Amazon Prime Video:			Yes (Region: US)
 TVBAnywhere+:				Yes
 Spotify Registration:			No
 OneTrust Region:			US [California]
 iQyi Oversea Region:			US
 Bing Region:				US (Risky)
 Apple Region:				US
 YouTube CDN:				Los Angeles, CA
 Netflix Preferred CDN:			Los Angeles, CA
 ChatGPT:				Yes
 Google Gemini:				Yes (Region: USA)
 Claude:				Yes
 Wikipedia Editability:			Yes
 Google Play Store:			United States 
 Google Search CAPTCHA Free:		Yes
 Steam Currency:			USD
 ---Forum---
 Reddit:				Yes
 ---Game---
 SD Gundam G Generation Eternal:	Yes
=======================================
===========[ North America ]===========
 Paramount+:				Yes (Region: US)
 Discovery+:				Yes (Region: US)
 Acorn TV:				Yes
 BritBox:				Yes
 SonyLiv:				No (Content not found)
 NBA TV:				Yes
 TLC GO:				Yes (Region: US)
 Shudder:				Yes
 Fubo TV:				Yes (Region:US)
 Tubi TV:				Yes
 Pluto TV:				Yes
 KOCOWA:				Yes
 AMC+:					Yes (Region: USA)
 MathsSpot Roblox:			Failed (Error: PAGE ERROR)
 ---US---
 FOX:					Yes
 Hulu:					Yes
 NFL+:					Yes
 ESPN+:[Sponsored by Jam]		Yes
 MGM+:					Failed (Error: PAGE ERROR)
 Starz:					Failed (Error: PAGE ERROR)
 Philo:					Yes
 FXNOW:					Yes
 HBO Max:				Yes (Region: US)
 Crackle:				Failed (Network Connection)
 CW TV:					Yes
 A&E TV:				Yes
 NBC TV:				Yes
 Sling TV:				Yes
 encoreTVB:				Yes
 Peacock TV:				Yes
 Popcornflix:				Failed (Network Connection)
 Crunchyroll:				Yes
 Directv Stream:			Yes
 Meta AI:				Failed (Error: PAGE ERROR)
```

**常见IP库结果**

```
数据仅作参考，不代表100%准确，如果和实际情况不一致请手动查询多个数据库比对
以下为各数据库编号，输出结果后将自带数据库来源对应的编号
ipinfo数据库  [0] | scamalytics数据库 [1] | virustotal数据库   [2] | abuseipdb数据库   [3] | ip2location数据库    [4]
ip-api数据库  [5] | ipwhois数据库     [6] | ipregistry数据库   [7] | ipdata数据库      [8] | db-ip数据库          [9]
ipapiis数据库 [A] | ipapicom数据库    [B] | bigdatacloud数据库 [C] | dkly数据库        [D] | ipqualityscore数据库 [E]
ipintel数据库 [F] | ipfighter数据库   [G] | fraudlogix数据库   [H] | cloudflare数据库  [I] |
IPV4:
安全得分:
信任得分(越高越好): 100 [8] 
VPN得分(越低越好): 0 [8] 
代理得分(越低越好): 0 [8]
社区投票-无害: 0 [2] 
社区投票-恶意: 0 [2] 
威胁得分(越低越好): 0 [8] 
欺诈得分(越低越好): 0 [E] 
滥用得分(越低越好): 0 [3] 
ASN滥用得分(越低越好): 0.0001 (Very Low) [A] 
公司滥用得分(越低越好): 0.0001 (Very Low) [A] 
威胁级别: low [9 B] 
流量占比: 真人(越高越好)90% [I] 机器人(越低越好)9% [I]
黑名单记录统计:(有多少黑名单网站有记录):
无害记录数: 0 [2]  恶意记录数: 0 [2]  可疑记录数: 0 [2]  无记录数: 92 [2] 
安全信息:
使用类型: unknown [C] isp [0 3 7 A] business [9] internet_backbone [8]
公司类型: isp [0 7 A] 
浏览器类型: 主流48% 其他51% [I] 
设备类型: 桌面50% 移动49% 其他0% [I] 
操作系统类型: 主流97% 其他2% [I] 
是否云提供商: No [7 D] 
是否数据中心: No [0 5 8 A C] 
是否移动设备: No [5 A C] Yes [E]
是否代理: No [0 4 5 7 8 9 A B C D E] 
是否VPN: No [0 7 A C D E] 
是否Tor: No [0 3 7 8 A B C D E] 
是否Tor出口: No [7 D] 
是否网络爬虫: No [9 A B E] 
是否匿名: No [7 8 D] 
是否攻击者: No [7 8 D] 
是否滥用者: No [7 8 A C D E] 
是否威胁: No [7 8 C D] 
是否中继: No [0 7 8 C D] 
是否Bogon: No [7 8 A C D] 
是否机器人: No [E] 
DNS-黑名单: 304(Total_Check) 0(Clean) 8(Blacklisted) 18(Other) 
Google搜索可行性：NO
------------邮件端口检测--基于oneclickvirt/portchecker开源------------
Platform  SMTP  SMTPS POP3  POP3S IMAP  IMAPS
LocalPort ✔     ✔     ✔     ✔     ✔     ✔    
QQ        ✘     ✔     ✔     ✘     ✔     ✘    
163       ✘     ✔     ✔     ✘     ✔     ✘    
Sohu      ✘     ✔     ✔     ✘     ✔     ✘    
Yandex    ✘     ✔     ✔     ✘     ✔     ✘    
Gmail     ✘     ✔     ✘     ✘     ✘     ✘    
Outlook   ✘     ✘     ✔     ✘     ✔     ✘    
Office365 ✘     ✘     ✔     ✘     ✔     ✘    
Yahoo     ✘     ✔     ✘     ✘     ✘     ✘    
MailCOM   ✘     ✔     ✔     ✘     ✔     ✘    
MailRU    ✘     ✔     ✘     ✘     ✔     ✘    
AOL       ✘     ✔     ✘     ✘     ✘     ✘    
GMX       ✘     ✔     ✔     ✘     ✔     ✘    
Sina      ✘     ✔     ✔     ✘     ✔     ✘    
Apple     ✘     ✔     ✘     ✘     ✘     ✘    
FastMail  ✘     ✔     ✘     ✘     ✘     ✘    
ProtonMail✘     ✘     ✘     ✘     ✘     ✘    
MXRoute   ✘     ✘     ✔     ✘     ✔     ✘    
Namecrane ✘     ✔     ✔     ✘     ✔     ✘    
XYAMail   ✘     ✘     ✘     ✘     ✘     ✘    
ZohoMail  ✘     ✔     ✘     ✘     ✘     ✘    
Inbox_eu  ✘     ✔     ✔     ✘     ✘     ✘    
Free_fr   ✘     ✔     ✔     ✘     ✔     ✘
```

#### 机器性能

```
---------------------基础信息查询--感谢所有开源项目----------------------
 CPU 型号          : Intel Xeon Processor (Skylake, IBRS)
 CPU 核心数        : 4
 CPU 频率          : 1995.311 MHz
 CPU 缓存          : L1: 128.00 KB / L2: 16.00 MB / L3: 64.00 MB
 AES-NI指令集      : ✔ Enabled
 VM-x/AMD-V支持    : ✔ Enabled
 内存              : 401.87 MiB / 7.72 GiB
 Swap              : [ no swap partition or swap file detected ]
 硬盘空间          : 14.00 GiB / 49.82 GiB
 启动盘路径        : /dev/sda3
 系统在线时间      : 19 days, 9 hour 26 min
 负载              : 0.46, 0.21, 0.30
 系统              : Debian GNU/Linux 12 (bookworm) (x86_64)
 架构              : x86_64 (64 Bit)
 内核              : 6.1.0-40-amd64
 TCP加速方式       : bbr
 虚拟化架构        : KVM
 NAT类型           : Port Restricted Cone
 IPV4 ASN          : AS7018 AT&T Enterprises, LLC
 IPV4 位置         : Irvine / California / US
------------------------CPU测试--通过sysbench测试-------------------------
 -> CPU 测试中 (Fast Mode, 1-Pass @ 5sec)
 1 线程测试(单核)得分: 		812 Scores
 4 线程测试(多核)得分: 		3295 Scores
--------------------内存测试--感谢lemonbench开源----------------------------
 -> 内存测试 Test (Fast Mode, 1-Pass @ 5sec)
 单线程读测试:		16651.66 MB/s
 单线程写测试:		13284.14 MB/s
--------------------磁盘dd读写测试--感谢lemonbench开源--------------------
 -> 磁盘IO测试中 (4K Block/1M Block, Direct Mode)
 测试操作		写速度					读速度
 100MB-4K Block		20.7 MB/s (5059 IOPS, 5.06s)		32.8 MB/s (8000 IOPS, 3.20s)
 1GB-1M Block		1.0 GB/s (961 IOPS, 1.04s)		472 MB/s (450 IOPS, 2.22s)
----------------------磁盘fio读写测试--感谢yabs开源-----------------------
Block Size | 4k            (IOPS) | 64k           (IOPS)
  ------   | ---            ----  | ----           ---- 
Read       | 94.08 MB/s   (23.5k) | 834.65 MB/s  (13.0k)
Write      | 94.33 MB/s   (23.5k) | 839.04 MB/s  (13.1k)
Total      | 188.41 MB/s  (47.1k) | 1.67 GB/s    (26.1k)
           |                      |                     
Block Size | 512k          (IOPS) | 1m            (IOPS)
  ------   | ---            ----  | ----           ---- 
Read       | 1.04 GB/s     (2.0k) | 925.89 MB/s    (904)
Write      | 1.09 GB/s     (2.1k) | 987.56 MB/s    (964)
Total      | 2.13 GB/s     (4.1k) | 1.91 GB/s     (1.8k)
```

[![[fb6be2a5a7aca7488903fd9d78448a17_MD5.png]]

image734×538 29.8 KB

](https://cdn3.ldstatic.com/original/4X/b/6/c/b6c3cf24e06e1b2df55d8c199f0a2187e7345a47.png "image")

[![[4a9991a4a00a49309a884c7ba277025e_MD5.png]]

image734×568 36.8 KB

](https://cdn3.ldstatic.com/original/4X/0/a/d/0ade4ebcbc4a2b606baec4c4970c3a01222c1226.png "image")

[![[3ca4725b5cc873417fb6c1932b5204e0_MD5.png]]

image1050×286 13 KB

](https://cdn3.ldstatic.com/original/4X/c/a/c/cacf335b98a2bad1424a37f0231e9d92abc5d8f4.png "image")

### Frontier 动态IP

这个产品比较特别，是直接以socks/reality形式交付的，并且也并非是独立IP产品，而是Frontier运营商的IP池子共享，目前共7个IP池，所以同一个账号最多也只能购买7个。这个产品作为美西非常罕见的动态家宽产品，IP质量优秀，北京每日凌晨3-4点换IP。

> 我对这个产品是有些迷惑的，35刀/月的售价+共享IP+socks交付的组合性价比属实一般，当然了如果你有强烈的动态IP需求，这款产品也是能考虑一下的，毕竟动态IP产品确实还是太少了。

测试配置为

```makefile
网络: 动态每日换
带宽: 50M独享带宽
IP: 1个IPV4
流量: 无限流量
周期: 月付$34.98
```

我们仅仅记录了多天的IP质量脚本报告，因为本身也没有机器交付，测试下来觉得IP质量还是相当不错的，作为NAT产品质量不错。

#### ip质量

**IPV4质量**

[![[8d706377247795397b1bd03703d59874_MD5.png]]

ipcheck656×820 38.1 KB

](https://cdn3.ldstatic.com/original/4X/1/3/a/13a370a52318b82bc8a0687c378762384844113c.png "ipcheck")

[![[66e0fc536267dee5182b4c1d0f971263_MD5.png]]

ipcheck657×819 37.9 KB

](https://cdn3.ldstatic.com/original/4X/f/f/5/ff5a3de9a56d6fd6e624568049ade2601c568064.png "ipcheck")

[![[7276bc1ac5eb50cf8235c86eb3e4fbce_MD5.png]]

meowcheck2736×2636 268 KB

](https://cdn3.ldstatic.com/original/4X/6/c/6/6c6b0ca6c8710051763d2151567ee78b2620f9dd.png "meowcheck")

**IPlark测试结果**

[![[0b8caca27b3cf9b915ce5d2ce3e01cd3_MD5.png]]

iplark1210×496 43.6 KB

](https://cdn3.ldstatic.com/original/4X/9/6/c/96c56ba9c4d3fdc921c3f3adbb6e3c5a1dff779f.png "iplark")