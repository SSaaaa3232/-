---
aliases:
---
# course

|     |                                                          |
| --- | -------------------------------------------------------- |
|     | https://www.imxbk.com/author/1<br>                       |
|     | https://github.com/awesome-selfhosted/awesome-selfhosted |
|     | https://linux.do/t/topic/225815                          |
|     | https://blog.lkwplus.com/posts/self-hosting#open-webui   |
|     | https://github.com/mikeroyal/Self-Hosting-Guide          |

# list

## VPS

|                      | 配置只有 1 核 4g1M 带宽   |     |
| -------------------- | ------------------ | --- |
| Dmit                 |                    |     |
| racknerd             |                    |     |
| 纯 pages/worker，hf，gh | 展示（免费）             |     |
| 海外腾讯云                |                    |     |
| vercel               | 免费                 |     |
| 纯净ISP                | 逆向API，养号，批量注册，逆向项目 |     |

## website

|              |                                                              |                        |
| ------------ | ------------------------------------------------------------ | ---------------------- |
| VPN          | https://github.com/masterking32/MasterDnsVPN                 |                        |
| bitwarden    | 密码管理可以考虑                                                     |                        |
| Linkwarden   | 感觉是刚需                                                        |                        |
| open-web-ui  | open-web-ui，免费，https://github.com/mahaonanStart/openai-proxy | 自用gpt（优于chat-next-web） |
| RustDesk自建中转 |                                                              |                        |

- WordPress
- hexo
- Typecho
- Ghost
- Halo（比较吃内存）
## 雷池

|               |                                          |
| ------------- | ---------------------------------------- |
| 搭雷池当 CDN 使    | 反向代理，流量清                                 |
| 逆向项目保护防官方封 IP |                                          |
| 青龙脚本拉黑恶意扫描IP  |                                          |
| 探针            |                                          |
| SSL 终结器       | **动态防护**：把你的网页 HTML/JS 加密                |
| 网站隐身衣         | 多个 VPS 节点，雷池可以作为统一的网关，保护你真正的业务源站 IP 不外泄。 |
| 哪吒探针          |                                          |


| 技术栈     |                                 |                  |      |
| ------- | ------------------------------- | ---------------- | ---- |
| CDN     | cf                              |                  |      |
| stripe  | 美区和英区 stripe 可以用护照开，成本比较高（得有公司） |                  |      |
| dokploy | 一键部署管理面板（偏向于建站）                 | dockge（极简编排一堆容器） | 部署面板 |
| 前端      | next                            |                  |      |
| 后端      | next，go                         |                  |      |
| 数据库     | posgres，MySQL                   |                  |      |
| 访问统计    | plausible                       |                  |      |
## 备份

|                                                                                                                                     |                                                                                                                                                        |              |                              |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ | ---------------------------- |
| Alist                                                                                                                               | 磁盘                                                                                                                                                     | 基础           |                              |
| openlist                                                                                                                            | 多网盘资源的整合、搜索与在线播放                                                                                                                                       | 进阶           | 资源索引化，对接 Aria2 或 qBittorrent |
| reclone                                                                                                                             | - rclone - 文件向对象存储备份                                                                                                                                   |              |                              |
| 下载                                                                                                                                  | Aria2 或 t[qbittorrent](https://www.qbittorrent.org/)：BT下崽器                                                                                             |              |                              |
| [gitea](https://docs.gitea.com/)                                                                                                    | git托管服务，带gitea-runner，能基本兼容跑 github-actions 。                                                                                                          |              |                              |
| PosgreSQL                                                                                                                           | - [postgresql](https://www.postgresql.org/)：PosgreSQL数据库                                                                                               |              |                              |
| [Github Runner](https://docs.github.com/zh/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners) | [Github Runner](https://docs.github.com/zh/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners) - Github Action自部署 |              |                              |
| MySQL - 数据库                                                                                                                         |                                                                                                                                                        |              |                              |
| Navicat Premium - 数据库查看编辑器                                                                                                          |                                                                                                                                                        |              |                              |
| **加速**                                                                                                                              |                                                                                                                                                        |              |                              |
| redis                                                                                                                               |                                                                                                                                                        | 缓存跑临时任务      |                              |
| kspeeder<br>                                                                                                                        |                                                                                                                                                        | Docker 镜像加速池 |                              |
| SFTPGo                                                                                                                              | 界面美观简洁的 WebUI 进行用户管理和文件操作                                                                                                                              |              |                              |

## Docker

|                                    |              |                                                                                                 |                             |
| ---------------------------------- | ------------ | ----------------------------------------------------------------------------------------------- | --------------------------- |
| **三者类似**                           |              |                                                                                                 |                             |
| Tailscale                          |              | 异地组网                                                                                            | zerotie，配合moonlight远程       |
| Cloudflare Tunnel                  |              | DDNS（动态域名解析）                                                                                    |                             |
| lucky/zerotier                     |              | frp（frps）                                                                                       | cf穿透                        |
| **反向代理**                           |              |                                                                                                 |                             |
| nginx                              |              | 流量分发，反向代理，路径到子域名调用服务                                                                            | npm（图形化管理），与dokploy功能重叠，二选一 |
| Caddy                              |              | 反向代理                                                                                            |                             |
| beszel                             | 监控VPS，docker |                                                                                                 | 监控面板                        |
| WatchYourPorts                     |              | 端口监控                                                                                            |                             |
| [it-tools](https://it-tools.tech/) |              | 清爽的开发小工具合集（base64,hash,uuid,timestamp,yaml,json,toml                                            |                             |
| 1panel/宝塔                          |              | Orbstack - Docker Desktop替代                                                                     |                             |
|                                    |              | - [RustDesk Server](https://github.com/rustdesk/rustdesk-server) - 远程桌面                         |                             |
|                                    |              | [Uptime Kuma](https://github.com/louislam/uptime-kuma) - 服务状态监控                                 |                             |
|                                    |              | - [pve-exporter](https://github.com/prometheus-pve/prometheus-pve-exporter)：PVE监控数据接入prometheus |                             |
|                                    |              | [grafana](https://grafana.com/)：配合Prometheus的监控看板                                               |                             |
|                                    |              | - [victoria-metrics](https://victoriametrics.com/)：兼容替代Prometheus监控                             |                             |
- [pve](https://pve.proxmox.com/) ：虚拟机平台，下述所有服务基本都在这个宿主上
- [k3s](https://k3s.io/) ：一个小型的k8s发行版，非常容易搭建，我目前绝大部分服务都在用它跑
- [k8s-cf-ns-sync](https://github.com/das6ng/k8s-cf-ns-sync) ：将配置在 Ingress 上的dns配置自动同步到cloudflare上。（夹个私货 ![[452d3caac9baafd422fddc38ca412c42_MD5.png]]

- [Jellyfin](https://jellyfin.org/)：本地影视剧媒体服务器，或者叫家庭影视中心？
- [cookiecloud](https://github.com/easychen/CookieCloud) ：CookieCloud是一个和自架服务器同步浏览器Cookie和LocalStorage的小工具。（给我的MP用的
-- [AdGuardHome](https://github.com/AdguardTeam/AdGuardHome) - 加密DNS解析
 [Cloudflare DDNS](https://github.com/favonia/cloudflare-ddns) - 动态公网IP
- [Tailscale Derper](https://github.com/tailscale/tailscale/tree/main/cmd/derper) - 自部署Tailscale中继服务器
- Sublime Text - 文本编辑器
- App Cleaner & Uninstaller - 应用卸载器
- Homerow - 键盘控制工具
- Lingon X - 登录项与计划任务管理
- Bartender 5 - 屏幕顶栏管理
- SwitchHosts - Host文件管理
- BetterDisplay - 虚拟显示器
- BetterTouchTool - 键盘快捷键
## 青龙：

| 定时，批量注册，爬虫                                                                                                 | https://github.com/whyour/qinglong                                                          |      |     |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---- | --- |
| subs-check<br>                                                                                             | 通过爬虫或 API，从公开的 GitHub 仓库、Telegram 频道、各类免费分享页面抓取原始订阅链接或 base64 节点点                           | 上游   |     |
| sub-store                                                                                                  | **搭配 Docker**：如果你有 VPS，建议使用 `sub-store` 配合 `sub-store-backend` 镜像，并使用反向代理挂载 SSL 证书，实现安全公网访问 | 下游   |     |
| 微软E5续签[Microsoft 365 E5 Renew X](https://github.com/hongyonghan/Docker_Microsoft365_E5_Renew_X) - 白嫖微软E5续期 | https://github.com/hongyonghan/Docker_Microsoft365_E5_Renew_X                               | 全家桶  |     |
| AnonAddy                                                                                                   | 批量注册邮箱（号池子）                                                                                 | 薅羊毛  |     |
| QD-Today                                                                                                   | 自动签到，抓包模拟，https://cnb.cool/i.o/workbuddy_checkin                                            | 薅羊毛  |     |
| - [cert-manager](https://cert-manager.io/)                                                                 | - [cert-manager](https://cert-manager.io/) ：一个自动申请/续期免费证书的服务，为我k8s里的服务自动管理HTTPS证书           |      |     |
| AnonAddy                                                                                                   |                                                                                             | 注册账号 |     |
公共的E5续期服务上跑，炸号了一次，现在自部署稳定的很

## 娱乐

|                     |                                                                         |        |
| ------------------- | ----------------------------------------------------------------------- | ------ |
| Minecraft           | [Velocity Proxy](https://papermc.io/software/velocity) - Minecraft 反向代理 |        |
|                     | - [Limbo Server](https://github.com/Nan1t/NanoLimbo) - 虚空服务器            |        |
|                     | 后端服务器*n                                                                 |        |
|                     | MCSManager - Minecraft服务器管理器                                            |        |
| MC/farmine          | https://www.imxbk.com/2786.html                                         |        |
| unblockneteaseMusic |                                                                         | 可选     |
| kali                | HTB                                                                     |        |
| SillyTavern         | Chub.ai下载角色卡（png）形式                                                     | 接APi   |
| RSShub              | 如果搞不定每个月35算了，RSSHub + FreshRSS（reader5）如果在六天之内搞定就行                      | 已有folo |
| emby                | 影视资源（webdav/rclone）                                                     |        |


## 开发

|            |             |      |
| ---------- | ----------- | ---- |
| PocketBase | 一小时搭出后端 API | 轻量后端 |
|            |             |      |

本次部署时尝试的方法优先级：`Docker Compose` → `Docker Run` → `Binary` - `Application` - `Virtual Machine`。我非常建议各位在自己的VPS或服务器上部署的时候也尝试类似的方案，个人认为这样有助于管理和下次迁移服务。

此外，强烈推荐在macOS上使用`OrbStack`来代替`Docker Desktop`，原因有很多。首先，`OrbStack`拥有比`Docker Desktop`更加小的占用（内存和储存）此外，`OrbStack`无须配置即可在macOS上使用`net=hosts`这个配置，并且在网络方面，自动接管容器内的流量走系统代理（docker pull等二进制操作依然需要增强模式）（关于不使用增强模式的原因将在排障部分讲解）并为每个容器分配一个自动分配HTTPS证书的`*.orb.local`的域名。

大部分服务都很快速的通过`Docker Compose`迁移上线，将原本在`Orange Pi`上通过.NET运行的`Microsoft 365 E5 Renew X`改为了Docker运行。

但是在部署`MCSManager`的时候遇到了阻碍，原因是因为官方没有对macOS进行适配，只能使用Linux或者Windows。官方建议使用Docker部署，但是我发现Docker容器内部的文件我难以管理，尤其是对于实例的文件管理更是难上加难。因此我退而求其次，选择由`OrbStack`提供的虚拟机功能实现。

OrbStack的虚拟机非常的神奇我称之为`msl(macOS Sub-system Linux)`，他会自动透传Mac的用户文件夹，并且在运行效率很高，对于我轻量供朋友们使用的Minecraft服务器来说不造成性能损失。

在先前的`Orange Pi`上，我是用宝塔面板内置的备份功能，将部分文件进行本地+OneDrive双重备份来保证文件安全。在macOS上我经过调研后选择了`rclone`这款软件来实现类似的操作。为此我写了如下的脚本来处理备份问题，可以实现文件上传，保留N个最新的备份，排除文件，使用`<script path> <source_path> <backup_dest_path> <retain_count> [exclude_file]`。其中`exclude_file`是一个纯文本文件，里面保存着一行一个不需要被备份的文件/文件夹路径（相对于`source_path`）。需要将里面的`onedrive:`替换为自己的config名称。

`#!/bin/bash  if [ "$#" -lt 3 ]; then     echo "Usage: $0 <source_path> <backup_dest_path> <retain_count> [exclude_file]"     exit 1 fi  SOURCE_PATH="$1" DEST_PATH="$2" RETAIN_COUNT="$3" EXCLUDE_FILE="$4"  SOURCE_DIR_NAME=$(basename "$SOURCE_PATH") BACKUP_FILE="/tmp/${SOURCE_DIR_NAME}_backup_$(date +%Y-%m-%d_%H-%M-%S).tar.gz"  EXCLUDE_OPTS="" if [ -n "$EXCLUDE_FILE" ]; then     if [ ! -f "$EXCLUDE_FILE" ]; then         echo "Error: Exclude file '$EXCLUDE_FILE' not found!"         exit 1     fi     while read -r line; do         EXCLUDE_OPTS="$EXCLUDE_OPTS --exclude=$SOURCE_PATH/$line"     done < "$EXCLUDE_FILE" fi  echo "Creating backup of $SOURCE_PATH..."  tar -czvf "$BACKUP_FILE" $EXCLUDE_OPTS "$SOURCE_PATH"  echo "Uploading $BACKUP_FILE to $DEST_PATH..." rclone copy "$BACKUP_FILE" "onedrive:$DEST_PATH"  echo "Cleaning up old backups, keeping only the latest $RETAIN_COUNT..." rclone lsl "onedrive:$DEST_PATH" | sort -n | tail -n +$((RETAIN_COUNT+1)) | awk '{print $NF}' | while read file; do     echo "Deleting old backup: $file"     rclone delete "onedrive:$DEST_PATH/$file" done  rm "$BACKUP_FILE"  echo "Backup process completed successfully."`

接着我使用`Lingon X`来将其添加为计划任务，不使用`crontab`的原因是因为在macOS上已经被`Launch Daemon`和`Launch Agent`替换掉了，因此使用新的总归没错。

## [](https://linux.do/t/topic/590211#p-5377262-h-4)问题排障

### [](https://linux.do/t/topic/590211#p-5377262-rustdesk-5)RustDesk提示`远程主机关闭了连接`

这个问题我先说结论，无论是手动编译的二进制文件还是Docker都存在这个问题，其核心原因是因为启用了代理软件的`增强模式`，我已测试了`mihomo party`和`Surge`均存在此问题，这也是使用`OrbStack`其中的一个重要原因，因为他会自动接管容器内的流量走系统代理。

此外，还会出现提示`ip/pk not match`，原因是你可能在尝试替换密钥对，但是没有替换成功，在替换的时候需要确保容器/二进制已经关机

在此处放上根据`1.1.14`版本构建的macOS arm64的编译文件：[点击下载](https://drive.createchstudio.com/Software/RustDesk%20Server%20macOS)

### [](https://linux.do/t/topic/590211#p-5377262-tailscale-derper-6)Tailscale Derper提示证书不匹配

由于我使用DDNS，因此我的域名类似于*.ddns.domain.com，每一个服务占用一个独立的三级域名，我在`Let's Encrypt`申请的是`\*.ddns.domain.com`，因此当使用`derper.ddns.domain.com`会显示证书不匹配，解决方案如下

找到`~/go/pkg/mod/tailscale.com@xxxxx/cmd/derper/cert.go`找到`func (m *manualCertManager) getCertificate`这段内容，把第一个if报错逻辑段注释掉，重新使用`go build -o /path/to/derper`构建即可，我这里同样放一个构建好的macOS arm64二进制：[点击下载](https://drive.createchstudio.com/Software/Tailscale%20Derper%20macOS)