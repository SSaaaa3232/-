---
tags:
  - AI
  - Claude-Code
category: AI/Claude-Code
sources:
  - [[02-raw/articles/2026/04/从零开始两天构建一个 Claude Code：带你拆解 AI CLI 的每一层.md]]
relations:
  - [[../Prompt-Caching]]    # 共现（同一篇文章）
  - [[../Context-Compact]]  # 共现（同一篇文章）
  - [[../Tool-Execute]]     # 共现（同一篇文章）
---

# Agent Loop

## 定义
Agent 主循环，while 循环 + 状态机，迭代调用 LLM 直到任务完成或达到上限。

## 详细解释
骨架是有上限的 while 循环，最大迭代 25 次。每次迭代：检查是否需要 compact → 构建 prompt → 流式请求 → 实时处理事件流 → 检查 stop_reason（tool_use 则执行工具，end_turn 则结束）。工具执行管线 6 阶段：render → permission → preHook → checkpoint → execute → postHook。

## 证据来源
1. [[02-raw/articles/2026/04/从零开始两天构建一个 Claude Code：带你拆解 AI CLI 的每一层.md]] - IceBearMiner 从零实现

## 关联概念
- [[../Prompt-Caching]] — 共现（来源同一篇文章）
- [[../Context-Compact]] — 共现（来源同一篇文章）
- [[../Tool-Execute]] — 共现（来源同一篇文章）
- [[../MCP]] — uses（Agent Loop 通过 MCP 发现工具）

## 我的理解
Agent Loop 是整个系统的"引擎"，其他所有机制（缓存、compact、权限）都服务于它。最大 25 次迭代的硬限制很重要，防止 runaway loop 耗尽 API 额度。

## 不确定性
- 不同场景的最优迭代次数可能不同
