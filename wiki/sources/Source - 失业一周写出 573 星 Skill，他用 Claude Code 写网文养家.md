---
type: source
status: seed
created: 2026-05-06
updated: 2026-05-06
title: "失业一周写出 573 星 Skill，他用 Claude Code 写网文养家"
source_type: note
source_path: "raw/个人👤/行为/x/skill/网文-skill.md"
tags:
  - source
  - raw-ingest
  - claude-code-与-agentic-coding
  - agent-skills-工业化
related:
  - "[[Claude Code 与 Agentic Coding]]"
  - "[[Agent Skills 工业化]]"
  - "[[内容创作与个人 IP]]"
---

# 失业一周写出 573 星 Skill，他用 Claude Code 写网文养家

- Raw file: `raw/个人👤/行为/x/skill/网文-skill.md`
- Ingested: 2026-05-06
- Related concepts: [[Claude Code 与 Agentic Coding]], [[Agent Skills 工业化]], [[内容创作与个人 IP]]

## Extractive Summary
- 这是什么：8 个 skill 串起网文全链路
- 整个 repo 就是 8 个 skill 加一套引用知识库。安装一行命令 npx skills add worldwonderer/oh-story-claudecode -y，装完就能在 Claude Code 里直接 /story-long-write、/story-deslop 这种斜杠命令调用。
- 8 个 skill 按职能分两条线。长篇线 4 个（story-long-scan 扫榜、story-long-analyze 拆文、story-long-write 写作、story-deslop 去 AI 味），短篇线 3 个（story-short-scan、story-short-analyze、story-short-write），加一个公用的 browser-cdp 用来复用浏览器登录态抓平台数据。每个 skill 都能单独跑，也能按流程串起来。

## Source Structure
- 这是什么：8 个 skill 串起网文全链路
- 真正的护城河是 16 个主题的知识库
- 跑通整个网文工业链：扫榜→拆文→写作→去 AI 味
- 传播逻辑
- 不只是网文人，所有长内容创作者都该看一眼
- 30 秒装上跑起来
- 一句话抓重点

## Ingest Notes
- 本页为批量 ingest 生成的 source seed：已入库、可检索、已进入相关概念簇。
- 若该来源是高价值长文/访谈，后续可单独运行 deep ingest，把关键论证拆成独立概念页。
