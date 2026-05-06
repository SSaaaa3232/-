---
type: source
status: seed
created: 2026-05-06
updated: 2026-05-06
title: "WebSocket 技术全解"
source_type: note
source_path: "raw/团队team/技术/WebSocket 技术全解.md"
tags:
  - source
  - raw-ingest
  - 技术基础设施与工程工具
related:
  - "[[技术基础设施与工程工具]]"
---

# WebSocket 技术全解

- Raw file: `raw/团队team/技术/WebSocket 技术全解.md`
- Ingested: 2026-05-06
- Related concepts: [[技术基础设施与工程工具]]

## Extractive Summary
- WebSocket 是一种在单个 TCP 连接上进行全双工通信的协议，由 IETF 于 2011 年标准化（RFC 6455）。
- 与传统 HTTP 请求-响应模式不同，WebSocket 建立连接后，客户端和服务端可以随时互相主动发送数据，不需要一方等待另一方先开口。
- | 维度     | HTTP           | WebSocket        |

## Source Structure
- 一、WebSocket 是什么
- 二、和 HTTP 的核心区别
- 三、握手过程（HTTP Upgrade）
- 3.1 客户端发起握手
- 3.2 服务端响应
- 3.3 握手流程图
- 四、数据帧结构
- 五、连接维持：心跳机制
- 六、断线重连：指数退避
- 七、URL 协议

## Ingest Notes
- 本页为批量 ingest 生成的 source seed：已入库、可检索、已进入相关概念簇。
- 若该来源是高价值长文/访谈，后续可单独运行 deep ingest，把关键论证拆成独立概念页。
