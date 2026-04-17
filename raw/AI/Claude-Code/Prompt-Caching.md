---
tags:
  - AI
  - Claude-Code
category: AI/Claude-Code
sources:
  - [[02-raw/articles/2026/04/从零开始两天构建一个 Claude Code：带你拆解 AI CLI 的每一层.md]]
relations:
  - [[../Agent-Loop]]       # context（Prompt Caching 是 Agent Loop 的优化）
  - [[../Context-Compact]] # context（两者都是上下文管理机制）
created: 2026-04-05
modified: 2026-04-05
---

# Prompt Caching

## 定义
Anthropic API 的 block 级别缓存机制，按前缀匹配实现降费加速。

## 详细解释
将 system 参数设为 block 数组，每个 block 可独立设置 cache_control。静态段（身份声明、工具规范、安全规则）打缓存，动态段（工作目录、Git 状态、CLAUDE.md）不打。三层叠加：system prompt blocks + tools 数组 + 最后一条 tool_result message。效果：大部分 tokens 走缓存价格（约正常价格的 10%）。

## 证据来源
1. [[从零开始两天构建一个 Claude Code：带你拆解 AI CLI 的每一层]] - 三层缓存设计详解

## 关联概念
- [[../Agent-Loop]] — context（Prompt Caching 是 Agent Loop 的优化机制）
- [[../Context-Compact]] — context（两者都是上下文管理，compact 是清理，caching 是复用）

## 我的理解
Prompt Caching 的粒度意识在大多数 LLM 应用里是缺失的。这个三层设计（静态/工具/断点）值得借鉴。排在前面的内容越稳定，缓存命中率越高，所以顺序设计也很重要。

## 不确定性
- 中转站的缓存命中率一般不高
- 不同 API 提供商实现可能不同
