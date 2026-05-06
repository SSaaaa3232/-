---
type: source
status: seed
created: 2026-05-06
updated: 2026-05-06
title: "Prompt caching in LLMs, clearly explained 大型语言模型中的提示缓存，解释清楚"
source_type: note
source_path: "raw/团队team/技术/Prompt caching in LLMs, clearly explained 大型语言模型中的提示缓存，解释清楚.md"
tags:
  - source
  - raw-ingest
  - 技术基础设施与工程工具
  - ai-模型与前沿研究
related:
  - "[[技术基础设施与工程工具]]"
  - "[[AI 模型与前沿研究]]"
---

# Prompt caching in LLMs, clearly explained 大型语言模型中的提示缓存，解释清楚

- Raw file: `raw/团队team/技术/Prompt caching in LLMs, clearly explained 大型语言模型中的提示缓存，解释清楚.md`
- Ingested: 2026-05-06
- Related concepts: [[技术基础设施与工程工具]], [[AI 模型与前沿研究]]

## Extractive Summary
- A case study on how Claude achieves 92% cache hit-rateClaude 如何实现 92%缓存命中率的案例研究
- Every time an AI agent takes a step, it sends the entire conversation history back to the LLM.每当 AI 代理迈出一步，它就会将整个对话历史返回给 LLM。
- That includes the system instructions, the tool definitions, and the project context it already processed three turns ago. All of it gets re-read, re-processed, and re-billed on every single turn.这包括系统说明、工具定义，以及三回合前已经处理过的项目上下文。所有这些数据每回合都会被重新读取、重新处理和重新计费。

## Source Structure
- Static vs. Dynamic context静态上下文与动态上下文
- How does the KV Cache work?KV 缓存是如何工作的？
- The Economics经济学
- A 30-minute coding session with Claude Code与 Claude Code 的 30 分钟编程会话
- The fragility of hash-based caching基于哈希缓存的脆弱性
- Applying this to your own Agents将这些应用到您自己的代理人身上
- Key takeaways

## Ingest Notes
- 本页为批量 ingest 生成的 source seed：已入库、可检索、已进入相关概念簇。
- 若该来源是高价值长文/访谈，后续可单独运行 deep ingest，把关键论证拆成独立概念页。
