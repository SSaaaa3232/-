---
tags:
  - AI
  - Claude-Code
category: AI/Claude-Code
sources:
  - [[02-raw/articles/2026/04/从零开始两天构建一个 Claude Code：带你拆解 AI CLI 的每一层.md]]
relations:
  - [[../Agent-Loop]]        # context（Compact 是 Agent Loop 的一部分）
  - [[../Prompt-Caching]]  # context（都是上下文管理机制）
---

# Context Compact

## 定义
上下文窗口溢出时的自动压缩机制，用摘要替换历史消息。

## 详细解释
每轮迭代开始时估算 messages 数组 token 数（总字符数 / 4），超过模型上下文限制 85% 时触发压缩。触发后：发起独立 API 调用生成摘要，用 `[summary, "Understood."]` 替换原有 messages 数组。这个过程对模型是透明的，模型看到的是正常的上下文继续。

## 证据来源
1. [[从零开始两天构建一个 Claude Code：带你拆解 AI CLI 的每一层]] - 自动 compact 机制详解

## 关联概念
- [[../Agent-Loop]] — context（Compact 是 Agent Loop 迭代检查的一部分）
- [[../Prompt-Caching]] — context（都是上下文管理，compact 是有损压缩，caching 是无损复用）

## 我的理解
Compact 和 Caching 是互补的：一个负责清理（当太大时），一个负责复用（避免重复计算）。85% 阈值是经验值，不同模型可能需要调整。

## 不确定性
- 摘要质量影响后续任务效果
- 某些任务（如长程依赖）可能不适合 compact
