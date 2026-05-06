---
type: source
status: seed
created: 2026-05-06
updated: 2026-05-06
title: "Google Deepmind论文解读：如何给AI Agent 投毒"
source_type: article
source_path: "raw/个人👤/行为/调研/分析/Google Deepmind论文解读：如何给AI Agent 投毒.md"
tags:
  - source
  - raw-ingest
  - ai-安全与权限边界
  - ai-模型与前沿研究
related:
  - "[[AI 安全与权限边界]]"
  - "[[AI 模型与前沿研究]]"
---

# Google Deepmind论文解读：如何给AI Agent 投毒

- Raw file: `raw/个人👤/行为/调研/分析/Google Deepmind论文解读：如何给AI Agent 投毒.md`
- Ingested: 2026-05-06
- Related concepts: [[AI 安全与权限边界]], [[AI 模型与前沿研究]]

## Extractive Summary
- 2026 年 3 月，Google DeepMind 发布了一篇论文，题目叫《AI Agent Traps》。
- 五位研究者做了一件之前没人系统做过的事：把所有已知的、针对 AI Agent 的攻击方式，第一次完整地梳理成一套框架。
- 读完，学习了不少AI Agent攻防技巧，但也感觉这件事比大多数人意识到的要严重得多。

## Source Structure
- AI Agent 是什么，为什么它特别脆弱
- 六类陷阱的完整框架
- 第一类：内容注入陷阱（攻击感知层）
- 第二类：语义操控陷阱（攻击推理层）
- 第三类：认知状态陷阱（攻击记忆与学习层）
- 第四类：行为控制陷阱（攻击行动层）
- 第五类：系统性陷阱（攻击多 Agent 动态）
- 第六类：人在回路陷阱（攻击人类监督者）
- 这些陷阱可以叠加使用
- 防御：需要三个层面同时发力

## Ingest Notes
- 本页为批量 ingest 生成的 source seed：已入库、可检索、已进入相关概念簇。
- 若该来源是高价值长文/访谈，后续可单独运行 deep ingest，把关键论证拆成独立概念页。
