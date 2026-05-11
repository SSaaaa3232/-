---
aliases:
---
# desktop

|        |                                    |
| ------ | ---------------------------------- |
| course | https://www.imxbk.com/author/1<br> |
|        |                                    |

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
| aria2             |              | 下载                   |                             |
| beszel            | 监控VPS，docker |                      | 监控面板                        |
| wallos            |              |                      | 记账                          |
| dokploy           | 建站           | dockge（极简编排一堆容器）     | 部署面板                        |
| WatchYourPorts    |              | 端口监控                 |                             |
| webdav            | 网盘           |                      |                             |
## 青龙

| 定时，批量注册，爬虫     |        |     |
| -------------- | ------ | --- |
| subs-check<br> | 可用免费节点 |     |
| alist（webdav）  | 网盘备份   |     |
| aria2          |        | 下载  |
| 定时维护网站         |        |     |
