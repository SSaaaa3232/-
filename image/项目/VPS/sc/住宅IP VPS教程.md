---
ingested: 2026-05-06
wiki_page: "[[wiki/sources/Source - 住宅IP VPS教程]]"
title: 住宅IP VPS教程
source: https://x.com/AYi_AInotes/status/2041443477423374428
author:
  - "[[@AYi_AInotes]]"
published: 2026-04-07
created: 2026-04-09
description: |-
  一台住宅IP的VPS解决降智，
  一个**24小时在线的Claude Code远程开发环境**。
---
# 自测

- IP身份检查
- IP洗脸
# 判断你的IP是不是已经被平台标记了

怎么查？

- 打开 http://whoer.net 或者 http://ipinfo.io，

看两个字段就够了：

- 第一个，ASN type

买了静态住宅IP后，必须验证ASN显示residential/isp + 真实ISP名称（比如Comcast、AT&T等），才算真正干净

显示的是 hosting 或 data center：平台风控眼里，你是一个"代理用户"。

- 第二个，IP位置

如果显示的国家跟你选的节点对不上，说明这个IP的归属信息已经乱了，平台更不会信任你。

中转机场大部分都炸了... 还是回到直连吧

一个小细节，我切换之后第一次查IP，

看到ISP那一栏显示的是美国一个真实的住宅宽带运营商名字，不是什么"XXX Cloud"或者"XXX Hosting"。

那一刻才真正理解"住宅IP"这三个字到底什么意思😁

它不是模拟的，是真的来自一个物理位置上的家庭宽带通道。

看到这个结果就对了，这时候去开Claude，

功能应该是完整的：代码解释器、长输出、联网搜索都在。
# VPS选择

我个人用过的 vps,推荐三个

0\. 特别有钱选 DMIT 或者搬瓦工的 的香港区域,
都是40-80美元一个月的. 300-500G .

1\. 有钱选 DMIT 美西洛杉矶区域. 9.9美元一个月.

选Eyeball 那个套餐就够了,流量多一些,实测下来和Premium差别可以忽略不计. 
前者750G流量, 后者500G流量. (双向收费,所以做梯子流量要在页面上的数据除2)

用量少的可以找两个朋友平摊一下. 我主力用这个.

2\. 中产的情况. 电信用户, 可以考虑 腾讯云 轻量云 硅谷节点. 回程CN2线路, 99元一年, 丢包还行. 不限量. 缺点是限速30Mbps. 看Youtube 2K视频也够了.

2核心2GB内存. 拿来搭vps跑一些小脚本也不错. 这个价位基本没更便宜的了.

另外一个缺点是, 买了腾讯云后需要DD一下机子, 大概就是重装系统的意思, 
把腾讯云的监控软件都杀掉. 不然会因为你翻墙给你掐掉.

注意几个限制条件: 1.电信用户 2.一定只能硅谷节点,其他节点垃圾. 3.先DD机子再装翻墙脚本.

3.穷逼的选择..

0撸.

AWS 申请账户绑定双币信用卡, 会送100美元以上额度. 然后再用这个账号去开AWS lightrail, 类似轻量云. 选东京,或者新加坡节点都行. 弄好后记得锁卡,防止意外扣费.

大概可以免费用一年. 我的新加坡节点来备用. 因为很多defi网站限制美国ip.


# 爬墙协议:

用甬哥Github的脚本生成就行了, 生成两个

1\. Vless-tcp-reality-vision

2\. Hysteria2

两个都各有利弊. 前者是tcp的, 但是打开网页那一瞬间会略慢一点点,因为tcp三次握手. 如果你选了美西机房可以感受的到.

后者是基于udp的, 打开主流的西方网站, 现在大多支持QUIC协议了. 少两次握手, 页面加载会快一些. (但是推特不支持,所以还是慢)

其中还涉及你本地到vps是不是多路复用的, 技术问题这就不详说了.

总之你就安装这两个协议,切换一下, 哪个快就用哪个.

# 简要安装方法:

1\. 去网站上买vps

2\. 上传ssh-key或者生成ssh-key, 然后新建机器

3.本地ssh客户端连上vps.

4\. DD机器装一个干净的操作系统(如果是腾讯云的)

5\. 安装甬哥Github自动翻墙脚本

6.把翻墙脚本对应的端口去vps网站上防火墙打开. Vless-tcp-reality-vision用的是tcp端口, Hysteria2用的是udp端口.

7\. 本机安装翻墙客户端. Windows就Clashverge, Android就Nekobox, iOS就 Surge/ShadowRocket

不会的话就把本文喂给ai, 然后把网页截图, 他会一步一步指导你的..

![[07700c5bbdb92ebf9c911d42904246f8_MD5.jpg]]![[79a705361c35ed7087ba0152d1a870cd_MD5.jpg]]

---
# 链接

Tencent Cloud: https://cloud.tencent.com/act/pro/featured-202604?fromSource=gwzcw.9837046.9837046.9837046&cps\_key=38be398bf5bea18e738b2f49157631a0&page=spring2026&s\_source=https%3A%2F%2Fcloud.tencent.com%2Fact%2Fpro%2Fdouble12-2025…

dmit: https://dmit.io

AWS Lightsail: https://lightsail.aws.amazon.com

VPN Script: https://yonggekkk.github.io/argosbx/

Clash Verge: https://github.com/clash-verge-rev/clash-verge-rev/releases…

# 降权的具体表现：

![[0c129566cd36ba8cd581d54a31d2549f_MD5.png]]


# **住宅IP VPS** 跟普通机场的区别：

1. IP来自真实住宅ISP，不是数据中心，风控通过率完全不在一个量级
2. IP是静态固定的，不会像机场一样频繁切换节点触发风控
3. 它是一台完整的远程服务器——不只是换IP，你可以在上面装软件、跑代码、部署开发环境，24小时在线

![[f6b4684a3b819266a33231c9a4af5238_MD5.png]]

# 详细

## 开通VPS

我用的是 **VoyraCloud** 的 Residential IP VPS

**第一步：注册账号**

打开 [voyracloud.com](https://voyracloud.com/)，邮箱注册

**第二步：选配置**

进Residential IP VPS产品页，选三个东西：

**节点位置**：

- **洛杉矶**（推荐）：美区AI服务最全，OpenAI/Anthropic/Google主要服务器都在美西，延迟最低
- **华盛顿**：美东节点，部分服务响应快
- **法兰克福**：欧洲节点
- **东京**：亚洲节点，延迟低但部分AI服务不在日本区

大部分人选洛杉矶就对了

**系统选择**：

- 主要用浏览器访问AI服务 → 选 **Windows Server**
- 主要跑命令行（Claude Code、自动化脚本）→ 选 **Ubuntu/Debian**
- 两样都要 → 选Windows，命令行用PowerShell或装WSL

**硬件配置**：

- 基础款（1 vCPU / 1GB RAM / 20GB SSD / 1TB流量）：浏览器访问AI服务够用
- 跑Claude Code + 其他AI工具：建议2 vCPU / 2GB RAM起

**第三步：付款下单**

正好赶上Spring Sale，到4月20号之前年付6折、半年付7折，价格页自动生效不用填码

下单后几分钟VPS开通，邮件收到：

- VPS的IP地址
- 用户名（root或Administrator）
- 初始密码

## 连接VPS

Windows VPS（图形界面）

**从Windows电脑连**：

按 Win + R → 输入 mstsc → 回车 → 输入VPS的IP地址 → 输入用户名密码 → 连接成功

**从Mac电脑连**：

App Store下载 **Microsoft Remote Desktop** → Add PC → 输入IP和账号密码 → 双击连接

**从iPad/手机连**：

下载 RD Client，输入IP和账号密码

Linux VPS（命令行）

打开本地终端：

```text
ssh root@你的VPS_IP地址
```

首次连接输入 yes 确认指纹，然后输入密码

**第一件事：改密码 + 配SSH密钥**

```text
# 改密码
passwd

# 在本地电脑生成SSH密钥（不是VPS上）
ssh-keygen -t ed25519 -C "你的邮箱"

# 把公钥传到VPS
ssh-copy-id root@你的VPS_IP地址

# 之后免密码登录
ssh root@你的VPS_IP地址
```

## 验证IP纯净度（重要，别跳过）

![[cc09f8674b5492b4b2433c91aa240dd3_MD5.jpg]]

连上VPS之后，先确认IP确实是干净的住宅IP。这步决定了后面所有操作是否有效

浏览器查询（Windows VPS）

在VPS里打开Chrome，访问 [whoer.net](https://whoer.net/) 或 [ipinfo.io](https://ipinfo.io/)

看三个字段：

![[b5e9361d6a3b0116fffa462fb07e335e_MD5.png]]

命令行查询（Linux VPS）

```text
# 查出口IP
curl ifconfig.me

# 查IP详细信息
curl -s ipinfo.io | grep -E '"ip"|"city"|"region"|"country"|"org"'
```

输出应该类似：

```text
"ip": "xxx.xxx.xxx.xxx",
"city": "Los Angeles",
"region": "California",
"country": "US",
"org": "AS xxxxx 某个住宅ISP运营商"
```

**ASN type显示residential或ISP就是干净的。** 后面所有操作都基于这个干净环境

写个一键检查脚本，以后随时用：

```text
cat > ~/check_ip.sh << 'EOF'
#!/bin/bash
echo "=== IP纯净度检查 ==="
echo ""
echo "出口IP:"
curl -s ifconfig.me
echo ""
echo ""
echo "IP详情:"
curl -s ipinfo.io | grep -E '"ip"|"city"|"region"|"country"|"org"'
echo ""
echo "=== 检查完毕 ==="
EOF
chmod +x ~/check_ip.sh

# 运行
~/check_ip.sh
```

##  配置稳定的AI访问环境

IP确认干净了，现在配置你的日常AI使用环境

方式一：直接在VPS浏览器里用（最简单）

Windows VPS远程桌面连进去，打开Chrome，直接访问：

- [claude.ai](https://claude.ai/)
- [chat.openai.com](https://chat.openai.com/)
- [midjourney.com](https://midjourney.com/)

因为IP是住宅IP，所有服务完整功能开放。你会明显感受到跟之前的区别——Claude代码解释器回来了，长输出正常了，ChatGPT响应速度恢复了

方式二：让本地电脑也走VPS的住宅IP（更方便日常使用）

如果你不想每次都远程桌面连VPS，可以用SSH隧道把本地流量通过VPS转发出去：

```text
# 在本地电脑执行（不是VPS上）
ssh -D 1080 -C -N root@你的VPS_IP地址
```

这条命令会在本地开一个 localhost:1080 的SOCKS5代理入口，所有走这个代理的流量都通过VPS的住宅IP出去

**浏览器配置代理**：

推荐用Chrome扩展 **SwitchyOmega** 配置规则代理：

- AI相关域名（[claude.ai](https://claude.ai/)、[chat.openai.com](https://chat.openai.com/)、[openai.com](https://openai.com/)等）走VPS代理
- 其余域名直连
- 这样既不影响日常上网速度，AI服务又走干净的住宅IP

或者用Clash等代理工具，在规则里添加：

![[fba74cc37a5d4461da090caf79e55d04_MD5.png]]

```text
# 示例规则（加在你的Clash配置里）
rules:
  - DOMAIN-SUFFIX,claude.ai,VPS代理
  - DOMAIN-SUFFIX,anthropic.com,VPS代理
  - DOMAIN-SUFFIX,openai.com,VPS代理
  - DOMAIN-SUFFIX,chat.openai.com,VPS代理
  - DOMAIN-SUFFIX,midjourney.com,VPS代理
  - MATCH,DIRECT
```

这套配置的好处：平时正常上网不受影响，只有访问AI服务时自动走VPS住宅IP，一次配好，长期省心。

配完之后验证一下，

本地浏览器开代理状态下访问 [ipinfo.io](https://ipinfo.io/)，确认显示的IP和你VPS的出口IP一致、ASN type是residential

然后打开Claude，跑一个稍微复杂的任务试试——代码解释器在不在、输出长度正不正常、联网搜索能不能用。和之前用机场时的体验对比一下，差异会很明显。

## 搭建Claude Code远程开发环境

![[ce15a251e47d1a8e7cb04cffc2e72224_MD5.png]]

这是住宅IP VPS的进阶用法——把Claude Code搬到VPS上跑

## **为什么不在本地跑Claude Code？**

两个问题：

1. 本地挂机场，节点一切换、连接一断，正在执行的Claude Code任务就废了。跑了半小时的代码生成白费
2. Claude Code调Anthropic API也走你本地的机场IP出去。数据中心IP触发风控，API调用被限速甚至拒绝

放在VPS上：24小时在线不断连，住宅IP不触发风控，Claude Code挂着跑长任务，人关机了它还在执行。

第一步：系统环境准备

```text
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装基础工具
sudo apt install -y curl wget git build-essential

# 安装Node.js 20.x（Claude Code需要Node 18+）
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 验证
node -v  # v20.x.x
npm -v   # 10.x.x
```

第二步：安装Claude Code

```text
npm install -g @anthropic-ai/claude-code

# 验证
claude --version
```

第三步：配置API密钥

```text
# 设置Anthropic API Key
export ANTHROPIC_API_KEY="你的密钥"

# 写入环境变量（永久生效）
echo 'export ANTHROPIC_API_KEY="你的密钥"' >> ~/.bashrc
source ~/.bashrc
```

API Key从 [console.anthropic.com](https://console.anthropic.com/) 获取

第四步：用tmux挂后台（核心）

tmux让你断开SSH之后任务继续跑，重新连上随时恢复

```text
# 安装tmux
sudo apt install -y tmux

# 新建session
tmux new -s claude

# 在tmux里启动Claude Code
claude

# 要断开SSH时：按 Ctrl+B 然后按 D（detach）
# 任务在后台继续跑

# 重新连上VPS后恢复
tmux attach -t claude
```

tmux常用操作速查：

```text
Ctrl+B D        → 脱离session（任务继续跑）
Ctrl+B C        → 新建窗口
Ctrl+B N        → 切换到下一个窗口
Ctrl+B P        → 切换到上一个窗口
tmux ls          → 列出所有session
tmux kill-session -t 名字  → 关闭指定session
```

第五步：配置MCP（让Claude Code调用外部工具）

MCP（Model Context Protocol）是让Claude Code连接外部能力的桥梁——数据采集、文件操作、API调用都通过它。

```text
# 创建配置目录
mkdir -p ~/.claude

# 编辑MCP配置文件
nano ~/.claude/mcp_config.json
```

配置文件模板：

```text
{
  "mcpServers": {
    "工具名称": {
      "command": "启动命令",
      "args": ["参数1", "参数2"],
      "env": {
        "API_KEY": "对应密钥"
      }
    }
  }
}
```

保存后重启Claude Code生效。配好MCP之后，Claude Code就从"只能聊天"进化到"能执行真实任务"——通过自然语言让它调用各种外部工具完成数据采集、代码部署、自动化流程。

# 日常维护

系统更新（每周一次）

sudo apt update && sudo apt upgrade -y

资源监控

\# 安装htop sudo apt install -y htop # 查看CPU和内存 htop # 查看磁盘 df -h # 查看流量 sudo apt install -y vnstat vnstat

定期检查IP

~/check\_ip.sh

如果哪天发现ASN type变了，联系VoyraCloud客服更换IP

# 顺带解决的其他问题

住宅IP VPS配好之后，这些事顺手就能搞定：

**注册海外账号**：Google、ChatGPT、Claude、Midjourney、X——住宅IP环境下注册成功率很高。以前卡在手机验证过不去，大概率就是IP被风控了。在VPS的浏览器里操作，一次过。

**X账号防风控**：如果你在X上做内容，数据中心IP登录很容易触发风控警告。通过VPS住宅IP访问X，平台看你是正常的美国用户，不会乱标记。

**远程办公**：从手机、iPad、任何设备远程桌面连VPS，走到哪都是同一个干净的网络环境。

# 选择建议

VoyraCloud Residential IP VPS节点：洛杉矶、华盛顿、法兰克福、东京


![[1b2edef90491317d1c0b54253e3a58ba_MD5.png]]


这个方案适合的是对IP纯净度有刚需的人：Claude/ChatGPT降智受不了、X账号需要稳定、跑Claude Code需要24小时不断连、不想每隔几天就折腾一次网络问题。

一台VPS搞定AI访问+账号安全+远程开发
