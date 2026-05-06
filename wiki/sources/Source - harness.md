---
type: source
status: seed
created: 2026-05-06
updated: 2026-05-06
title: "harness"
source_type: article
source_path: "raw/个人👤/行为/调研/分析/Claude code源码解析.md"
tags:
  - source
  - raw-ingest
  - claude-code-与-agentic-coding
  - harness-与多-agent-操作系统
related:
  - "[[Claude Code 与 Agentic Coding]]"
  - "[[Harness 与多 Agent 操作系统]]"
---

# harness

- Raw file: `raw/个人👤/行为/调研/分析/Claude code源码解析.md`
- Ingested: 2026-05-06
- Related concepts: [[Claude Code 与 Agentic Coding]], [[Harness 与多 Agent 操作系统]]

## Extractive Summary
- - 他们在更新Claude Code的npm包时，不小心把一个60MB的source map调试文件留在了发布包里。这个文件本来应该在打包时排除掉，结果没有。任何人都可以用它还原出Claude Code完整的TypeScript源码。1902个源文件，全部暴露。
- - !Claude code源码解析 2026-03-31 20.34.53.excalidraw
- - 分界线上面所有用户共享缓存，省钱省时间。

## Source Structure
- 缘由
- 问题
- system prompt
- 特点：
- 权限系统
- 记忆系统
- 上下文压缩
- 协作框架

## Ingest Notes
- 本页为批量 ingest 生成的 source seed：已入库、可检索、已进入相关概念簇。
- 若该来源是高价值长文/访谈，后续可单独运行 deep ingest，把关键论证拆成独立概念页。
