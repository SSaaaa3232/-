---
type: source
status: seed
created: 2026-05-06
updated: 2026-05-06
title: "Thread by @dotey"
source_type: note
source_path: "raw/团队team/技术/技术栈-指引.md"
tags:
  - source
  - raw-ingest
  - 技术基础设施与工程工具
related:
  - "[[技术基础设施与工程工具]]"
---

# Thread by @dotey

- Raw file: `raw/团队team/技术/技术栈-指引.md`
- Ingested: 2026-05-06
- Related concepts: [[技术基础设施与工程工具]]

## Extractive Summary
- 如果是 TypeScript 技术栈，做 Agent 开发首选 pi-mono，功能强，调用方便。其次是 vercel 的 aisdk 也还可以。
- claude agent sdk 不那么推荐了，主要是绑死了 claude，但目前还有一个不可替代的优势，就可以共享 Claude Max 订阅，开发阶段会比较方便，能用多久不清楚。
- 应用层的话，electron 还是首选，稳定可靠，AI 训练预料足够多，主要问题是应用程序体积略大。但刚开始写 Agent，建议从 cli 开始写，不需要一开始就做界面，这样可以聚焦在 Agent 本身，除非你核心就是 UI。

## Source Structure
- 无明显 Markdown 标题结构。

## Ingest Notes
- 本页为批量 ingest 生成的 source seed：已入库、可检索、已进入相关概念簇。
- 若该来源是高价值长文/访谈，后续可单独运行 deep ingest，把关键论证拆成独立概念页。
