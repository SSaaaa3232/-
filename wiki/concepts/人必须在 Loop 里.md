---
type: concept
title: "人必须在 Loop 里"
created: 2026-04-17
updated: 2026-04-17
tags:
  - concept
  - 知识管理
  - AI协作
status: mature
complexity: basic
domain: 知识管理
aliases:
  - "Human in the Loop"
  - "人在Loop"
related:
  - "[[Knowledge MEMO]]"
  - "[[Wiki 为谁而建]]"
  - "[[Retain 间隔重复]]"
sources:
  - "[[raw/团队team/方法论/Karpathy或许答错了一个根本问题wiki 是为谁准备的?.md]]"
---

# 人必须在 Loop 里

> 三条纪律都让系统"不够自动化"——这是故意的。我们不是反对自动化，我们是在拒绝**给易耗品做积累**。

## 定义

Knowledge MEMO 的核心设计原则：知识系统的所有写入操作必须经过人的确认，绝不允许 Agent 绕过人独自改写。

## 为什么

**LLM 能做 70%，剩下 30% 是护城河。**

给定完全相同的公开数据，agent 能生成研究报告的大部分内容——历史复盘、情景框架、验证指标。但"身在场的判断力"——管理层措辞细节的微妙差异、跨周期的经验直觉——agent 给不出来。这一步需要真实的认知摩擦。

把这 30% 外包了，就没有护城河了。

## 三种落地方式

1. **今天读什么，你自己决定**：没有 RSS 抓取、定时爬虫、"早上起来 vault 多了 50 张新卡"
2. **双提议通道**：/note 只提议，你逐条确认——故意制造摩擦
3. **写入权限控制**：所有 Cards 写入必须经过 /note，没有 API 绕过

## 与 Thin Harness Fat Skills 的关系

两个框架从不同角度指向同一个真相：[[Thin Harness Fat Skills]] 说"把智能推进 Skill"，人必须在 Loop 里说"把判断留给人"。前者是工程架构原则，后者是知识积累原则。

## 来源

(Source: [[raw/团队team/方法论/Karpathy或许答错了一个根本问题wiki 是为谁准备的?.md]])，来自 @owenliang60，2026-04-13
