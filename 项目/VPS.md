---
aliases:
---
# course

|     |                                                          |
| --- | -------------------------------------------------------- |
|     | https://www.imxbk.com/author/1<br>                       |
|     | https://github.com/awesome-selfhosted/awesome-selfhosted |

# list

## VPS

|                      | 配置只有 1 核 4g1M 带宽 |
| -------------------- | ---------------- |
| Dmit                 |                  |
| racknerd             |                  |
| 纯 pages/worker，hf，gh | 展示（免费）           |
| 海外腾讯云                |                  |

## website

|                     |     |                                               |                        |
| ------------------- | --- | --------------------------------------------- | ---------------------- |
| open-web-ui         |     | https://github.com/mahaonanStart/openai-proxy | 自用gpt（优于chat-next-web） |
| MC/farmine          |     | https://www.imxbk.com/2786.html               |                        |
| halo                |     | https://github.com/tw93/tw93.github.io        | 跟踪一下自己做的事情             |
| x                   |     |                                               |                        |
| 中转                  |     | relay sevices                                 |                        |
| VPN                 |     | https://github.com/masterking32/MasterDnsVPN  |                        |
| webdav              |     | rclone（平替）（云相册lmmich）                         | 网盘                     |
| unblockneteaseMusic |     |                                               | 可选                     |
| emby                |     | 影视资源（webdav/rclone）                           |                        |
| 远程桌面                |     | https://www.imxbk.com/3311.html               |                        |
| RSShub              |     | 如果搞不定每个月35算了，RSSHub + FreshRSS                | 已有folo                 |
| bitwarden           |     | 密码管理可以考虑                                      |                        |

| 技术栈     |                                 |                  |      |
| ------- | ------------------------------- | ---------------- | ---- |
| CDN     | cf                              |                  |      |
| stripe  | 美区和英区 stripe 可以用护照开，成本比较高（得有公司） |                  |      |
| dokploy | 一键部署管理面板（偏向于建站）                 | dockge（极简编排一堆容器） | 部署面板 |
| 前端      | next                            |                  |      |
| 后端      | next，go                         |                  |      |
| 数据库     | posgres，MySQL                   |                  |      |
| 访问统计    | plausible                       |                  |      |

## Docker

|                   |              |                      |                             |
| ----------------- | ------------ | -------------------- | --------------------------- |
| **三者类似**          |              |                      |                             |
| Tailscale         |              | 异地组网                 |                             |
| Cloudflare Tunnel |              | DDNS（动态域名解析）         |                             |
| lucky/zerotier    |              | frp                  | cf穿透                        |
| **以下**            |              |                      |                             |
| nginx             |              | 流量分发，反向代理，路径到子域名调用服务 | npm（图形化管理），与dokploy功能重叠，二选一 |
| **加速**            |              |                      |                             |
| redis             |              | 缓存跑临时任务              |                             |
| kspeeder<br>      |              | Docker 镜像加速池         |                             |
| aria2             |              | 下载                   | qBittorrent？                |
| beszel            | 监控VPS，docker |                      | 监控面板                        |
| wallos            |              |                      | 记账                          |
| dokploy           | 建站           | dockge（极简编排一堆容器）     | 部署面板                        |
| WatchYourPorts    |              | 端口监控                 |                             |
| webdav            | 网盘           |                      |                             |
## 青龙

| 定时，批量注册，爬虫     | https://github.com/whyour/qinglong                            |     |
| -------------- | ------------------------------------------------------------- | --- |
| subs-check<br> | 可用免费节点                                                        |     |
| alist（webdav）  | 网盘备份                                                          |     |
| aria2          |                                                               | 下载  |
| 定时维护网站         |                                                               |     |
| 签到             |                                                               |     |
| 微软E5续签         | https://github.com/hongyonghan/Docker_Microsoft365_E5_Renew_X | 全家桶 |
公共的E5续期服务上跑，炸号了一次，现在自部署稳定的很

### 基础服务：

- [pve](https://pve.proxmox.com/) ：虚拟机平台，下述所有服务基本都在这个宿主上
- [k3s](https://k3s.io/) ：一个小型的k8s发行版，非常容易搭建，我目前绝大部分服务都在用它跑
- [cert-manager](https://cert-manager.io/) ：一个自动申请/续期免费证书的服务，为我k8s里的服务自动管理HTTPS证书
- [k8s-cf-ns-sync](https://github.com/das6ng/k8s-cf-ns-sync) ：将配置在 Ingress 上的dns配置自动同步到cloudflare上。（夹个私货 ![[452d3caac9baafd422fddc38ca412c42_MD5.png]]

### [](https://linux.do/t/topic/592920/48#p-5413365-h-2)应用：

有了上面的基础，我就可以实现`kubectl apply -f xxx.yaml`一键部署我的服务，并且支持https内网域名访问，并且告别地址栏感叹号（并且不用折腾一些服务的不安全http访问配置）。

- [gitea](https://docs.gitea.com/) ：git托管服务，带gitea-runner，能基本兼容跑 github-actions 。（我的k8s部署清单、自己写的小工具代码都放在上面，还同步了一些仓库，以防以后找不到）
- [vaultwarden](https://github.com/dani-garcia/vaultwarden)：密码管理器
- [Jellyfin](https://jellyfin.org/)：本地影视剧媒体服务器，或者叫家庭影视中心？
- MP：一种NAS媒体管理平台
- [home-assistant](https://www.home-assistant.io/)：智能家居/IoT平台
- [postgresql](https://www.postgresql.org/)：PosgreSQL数据库
- [alist](https://github.com/AlistGo/alist) ：存储聚合服务，可以在一个网页上将本地NAS和各种网盘都管理起来
- [qbittorrent](https://www.qbittorrent.org/)：BT下崽器
- [cookiecloud](https://github.com/easychen/CookieCloud) ：CookieCloud是一个和自架服务器同步浏览器Cookie和LocalStorage的小工具。（给我的MP用的
- [any-reader](https://github.com/aooiuu/any-reader) ：小说阅读器
- [photoview](https://github.com/photoview/photoview)：照片管理器
- [victoria-metrics](https://victoriametrics.com/)：兼容替代Prometheus监控
- [grafana](https://grafana.com/)：配合Prometheus的监控看板
- [it-tools](https://it-tools.tech/)：清爽的开发小工具合集（base64,hash,uuid,timestamp,yaml,json,toml等等等，巨多
- [pve-exporter](https://github.com/prometheus-pve/prometheus-pve-exporter)：PVE监控数据接入prometheus