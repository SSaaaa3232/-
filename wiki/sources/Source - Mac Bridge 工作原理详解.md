---
type: source
status: seed
created: 2026-05-06
updated: 2026-05-06
title: "Mac Bridge 工作原理详解"
source_type: note
source_path: "raw/团队team/技术/Mac-Bridge工作原理详解.md"
tags:
  - source
  - raw-ingest
  - 技术基础设施与工程工具
related:
  - "[[技术基础设施与工程工具]]"
---

# Mac Bridge 工作原理详解

- Raw file: `raw/团队team/技术/Mac-Bridge工作原理详解.md`
- Ingested: 2026-05-06
- Related concepts: [[技术基础设施与工程工具]]

## Extractive Summary
- 核心原理：反向 WebSocket 隧道 — 你的 Mac 主动连接服务器，不是服务器连接你的 Mac
- - curl -fsSL <url — 从 HappyCapy 服务器下载 shell 脚本
- - | bash — 把下载的脚本直接交给 bash 执行

## Source Structure
- 安装命令
- 核心架构
- 为什么能穿透防火墙/NAT？
- 和 SSH 的对比
- 优势
- Token 的作用
- 相关笔记

## Ingest Notes
- 本页为批量 ingest 生成的 source seed：已入库、可检索、已进入相关概念簇。
- 若该来源是高价值长文/访谈，后续可单独运行 deep ingest，把关键论证拆成独立概念页。
