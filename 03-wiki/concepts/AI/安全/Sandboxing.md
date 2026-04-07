---
tags:
  - AI
  - 安全
category: AI/安全
sources:
  - [[02-raw/articles/2026/04/The Shorthand Guide to Everything Agentic Security.md]]
relations:
  - [[../Agentic-Security]]  # 共现（同一篇文章）
  - [[../Sanitization]]     # 共现（同一篇文章）
created: 2026-04-05
modified: 2026-04-05
---

# Sandboxing

## 定义
通过隔离运行环境限制被攻击后的影响范围的防御手段。

## 详细解释
核心原则：Agent 被攻陷后，blast radius（爆炸半径）必须最小化。具体措施包括：容器隔离（Docker）、权限最小化（不使用 root）、网络默认拒绝、身份分离（Agent 不使用个人账号）。Anthropic 明确推荐容器/devcontainer 进行隔离。

## 证据来源
1. [[02-raw/articles/The Shorthand Guide to Everything Agentic Security]] - GitHub Codex 使用 per-task sandbox，OpenAI 也有类似设计

## 关联概念
- [[../Agentic-Security]] — 共现（来源同一篇文章）
- [[../Sanitization]] — 共现（来源同一篇文章）
- [[../Approval-Boundaries]] — context（沙箱与权限审批共同构成防御）

## 我的理解
隔离是 Agent 安全的基石。再多的应用层防护也抵不过 Agent 直接用你的 Gmail 或 GitHub token。Docker Compose + `network: internal: true` 是最小化可行方案。

## 不确定性
- 容器逃逸风险存在，但比主机级别好得多
- 性能开销需要权衡
