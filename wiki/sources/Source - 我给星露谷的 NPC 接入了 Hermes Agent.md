---
type: source
status: seed
created: 2026-05-06
updated: 2026-05-06
title: "我给星露谷的 NPC 接入了 Hermes Agent"
source_type: note
source_path: "raw/团队team/hermes/星露谷.md"
tags:
  - source
  - raw-ingest
  - harness-与多-agent-操作系统
related:
  - "[[Harness 与多 Agent 操作系统]]"
---

# 我给星露谷的 NPC 接入了 Hermes Agent

- Raw file: `raw/团队team/hermes/星露谷.md`
- Ingested: 2026-05-06
- Related concepts: [[Harness 与多 Agent 操作系统]]

## Extractive Summary
- 29 个 NPC，每一个都变成有记忆、有判断、有主动性的「活人」。
- 先说技术层面怎么实现的吧。 星露谷是闭源商业游戏，源码不公开，编译完是个.dll 二进制文件，没法直接改。那怎么给游戏加东西？
- 需要一个中间层框架，叫 SMAPI（Stardew Modding API） 。它的作用是在游戏启动时注入进程，监听游戏事件，暴露 API，让 mod 安全地操作 NPC、玩家、物品等对象，同时管理多个 mod 不打架。

## Source Structure
- 无明显 Markdown 标题结构。

## Ingest Notes
- 本页为批量 ingest 生成的 source seed：已入库、可检索、已进入相关概念簇。
- 若该来源是高价值长文/访谈，后续可单独运行 deep ingest，把关键论证拆成独立概念页。
