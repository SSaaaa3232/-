---
type: concept
title: "Wiki 为谁而建"
created: 2026-04-17
updated: 2026-04-17
tags:
  - concept
  - 知识管理
  - 哲学
status: mature
complexity: intermediate
domain: 知识管理
aliases:
  - "Wiki是为Agent还是为人脑"
related:
  - "[[Knowledge MEMO]]"
  - "[[LLM Wiki Pattern]]"
  - "[[人必须在 Loop 里]]"
sources:
  - "[[raw/团队team/方法论/Karpathy或许答错了一个根本问题wiki 是为谁准备的]]"
---

# Wiki 为谁而建

> Karpathy 的 llm-wiki.md 目标是让维护成本趋近于零——但如果你基本不碰它，这个 wiki 本质上是 Agent 的 context，不是你脑子里的东西。

## 核心矛盾

"LLM wiki" 这个词下面，实际上可能是**两种不同的东西**：

| 类型 | 设计目标 | 谁在用它 |
|------|---------|---------|
| **Agent Context** | 维护成本趋近于零，自动化摄入，持久化记忆 | Agent |
| **人脑脚手架** | 有一定摩擦，知识进入大脑，形成顿悟 | 人 |

碰巧都长成 wiki 的样子，但设计目标在某些地方**相反**。

## 押注 Agent Context 的风险

过去三年，context window 从 4K → 1M，memory 机制反复重构，检索方式从 RAG → agentic deep research——**每次大版本，喂入格式和最佳实践都要重写**。

→ 你 2023 年辛苦编译的 wiki，6 个月后大概率是一堆过时数据。

押注人脑则不同：**人脑版本号不变，慢、稳定、无法被外部强制升级**。你 5 岁背的乘法口诀 40 岁还在用。人脑是你可以做长期积累的唯一载体。

## 延伸问题

Agent 工作真的需要"wiki 形态"的上下文吗？还是说它要的是更贴合机器的东西——任务队列、事件日志、向量库、图数据库？Wiki 的标题/段落/wikilink/MOC 更多是给**人眼和手**设计的审美。

> [!gap] 这个问题没有确定答案
> wiki 也可能恰好是人机协同的最佳折中。但值得在抄方案之前先想清楚：你要解决的到底是"agent 工作环境"问题，还是"人在 AI 时代怎么求知"问题？

## 来源

(Source: [[raw/团队team/方法论/Karpathy或许答错了一个根本问题wiki 是为谁准备的]])，来自 @owenliang60，2026-04-13
