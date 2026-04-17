---
tags:
  - AI
  - Claude-Code
category: AI/Claude-Code
sources:
  - [[02-raw/articles/2026/04/从零开始两天构建一个 Claude Code：带你拆解 AI CLI 的每一层.md]]
relations:
  - [[../Agent-Loop]]     # context（Tool Execute 是 Agent Loop 的工具执行阶段）
  - [[../MCP]]           # uses（Tool Execute 通过 MCP 调用外部工具）
created: 2026-04-05
modified: 2026-04-05
---

# Tool Execute

## 定义
Agent Loop 中执行工具调用的管线，共 6 阶段。

## 详细解释
工具执行管线 6 阶段：1) renderToolCall（终端展示将执行的工具名和参数）2) permissionCheck（决定是否需要用户确认）3) preHook（插件前置拦截）4) checkpoint（破坏性操作前快照文件状态）5) executeTool（调用实际工具函数）6) postHook（插件后置钩子）。核心工具包括：Read、Write、Edit、Bash、Grep、WebFetch/WebSearch。

## 证据来源
1. [[从零开始两天构建一个 Claude Code：带你拆解 AI CLI 的每一层]] - 工具执行管线 6 阶段详解

## 关联概念
- [[../Agent-Loop]] — context（Tool Execute 是 Agent Loop 的执行阶段）
- [[../MCP]] — uses（Tool Execute 通过 MCP 发现和调用外部工具）

## 我的理解
工具执行管线的设计体现了安全优先原则：preHook/checkpoint/postHook 构成了完整的安全审计和回滚能力。Deferred Tools 优化也很巧妙，低频工具不放入每次请求，开销降低约 40%。

## 不确定性
- 不同工具的安全性评估可能需要持续更新
- Hook 机制可能被恶意插件滥用
