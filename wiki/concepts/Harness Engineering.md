---
type: concept
title: Harness Engineering
created: 2026-04-17
updated: 2026-04-17
tags:
  - concept
  - agent
  - engineering
status: mature
complexity: intermediate
domain: AI/Agent设计
aliases:
  - 驾驭工程
  - Harness
related:
  - "[[Thin Harness Fat Skills]]"
  - "[[Agent 安全]]"
  - "[[多智能体协作五种模式]]"
sources:
  - "[[raw/团队team/方法论/Harness Engineering 驾驭工程 零基础入门教程.md]]"
---

# Harness Engineering（驾驭工程）

> Agent = Model + Harness
> Harness 是包裹在大模型外面的"执行与治理系统"。

## 比喻

如果模型是一匹马：
- **L0 提示词工程** = 站旁边喊话，喊一句跑一步
- **L1 上下文工程** = 喂地图，跑得更准但仍可能跑偏
- **L2+ Harness Engineering** = 建赛道：围栏、计时器、检查裁判、急救站——整个环境保证马不失控

## 能力层级 L0→L4

| 层级 | 核心动作 | 耗时 | 门槛 |
|------|---------|------|------|
| L0→L1 | 把 AI 变成日常工具 | 1-2 周 | 无 |
| L1→L2 | 学会"管理" AI：拆解任务、设边界、验结果、记错误日志 | 1-3 月 | 观察力 |
| L2→L3 | Vibe Coding：描述目标，让 AI 自主规划执行 | 3-6 月 | Claude Code 等工具 |
| L3→L4 | 搭建系统：自动化验证闭环、工具权限模型、跨会话状态管理 | 6 月+ | 系统架构思维 |

**L2→L3 是 Vibe Coding 和 Harness Engineering 的分水岭。**

## 为什么不能跳级

Harness 的每条规则背后都是一个真实失败经验：
- 不知道 AI 在哪里漂移 → 不知道在哪里加护栏
- 不知道"连续 50 步后开始偏" → 不知道在哪里设检查点

L2（深度使用）和 L3（Vibe Coding）的价值是**积累足够多的失败样本**，这些失败样本才是设计 Harness 的地基。一个从没骑过马的人设计的赛道，不可能实用。

## 与 Thin Harness 的关系

[[Thin Harness Fat Skills]] 说：Harness 应该越薄越好，把 90% 精力放进 Skills。Harness Engineering 说：先学会建好 Harness，再学会让它薄。两者不矛盾——要让 Harness 薄，必须先理解 Harness 是什么。

## 来源
(Source: [[raw/团队team/方法论/Harness Engineering 驾驭工程 零基础入门教程.md]])，@Pluvio9yte，2026-04-04
