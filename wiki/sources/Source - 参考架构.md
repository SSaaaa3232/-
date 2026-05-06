---
type: source
status: seed
created: 2026-05-06
updated: 2026-05-06
title: "参考架构"
source_type: note
source_path: "raw/团队team/方法论/模式/MemOS.md"
tags:
  - source
  - raw-ingest
  - agent-记忆与知识系统
related:
  - "[[Agent 记忆与知识系统]]"
---

# 参考架构

- Raw file: `raw/团队team/方法论/模式/MemOS.md`
- Ingested: 2026-05-06
- Related concepts: [[Agent 记忆与知识系统]]

## Extractive Summary
- - 用 claude-opus-4-6，负责协调调度，接飞书消息，拆任务分发。贵的模型给最需要判断力的环节
- - 用 gpt-5.3-codex，全栈工程师。编码任务对文笔没要求，能跑就行，走免费额度
- - 用 claude-opus，首席内容官。写作质量直接影响产出，这个不能省

## Source Structure
- 核心思路：贵的模型只给最需要质量的环节，其他尽量白嫖
- 原理
- 记忆系统三层模型
- Team Sharing

## Ingest Notes
- 本页为批量 ingest 生成的 source seed：已入库、可检索、已进入相关概念簇。
- 若该来源是高价值长文/访谈，后续可单独运行 deep ingest，把关键论证拆成独立概念页。
