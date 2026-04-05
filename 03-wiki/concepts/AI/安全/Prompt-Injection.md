---
tags:
  - AI
  - 安全
category: AI/安全
sources:
  - [[02-raw/articles/2026/04/The Shorthand Guide to Everything Agentic Security.md]]
relations:
  - [[../Agentic-Security]]  # 共现（来源同一篇文章）
  - [[../MCP]]               # 共现（来源同一篇文章）
  - [[../Sandboxing]]        # 共现（来源同一篇文章）
  - [[../Sanitization]]     # 共现（来源同一篇文章）
  - [[../CVE]]              # 共现（来源同一篇文章）
---

# Prompt Injection

## 定义
通过在用户输入、文档、工具输出中植入恶意指令，操纵 LLM 执行非预期操作的技术。

## 详细解释
在 Agentic 系统中，Prompt Injection 可导致：shell 执行（通过工具调用）、secret 泄露、工作流滥用、横向移动。攻击向量包括：邮件附件（PDF）、网页截图（OCR）、GitHub PR 评论、隐藏 Unicode 字符、工具输出污染。

## 证据来源
1. [[02-raw/articles/2026/04/The Shorthand Guide to Everything Agentic Security.md]] - Good Rudi 儿童 AI 被 prompt 注入泄露敏感信息
2. Unit 42 "Fooling AI Agents: Web-Based Indirect Prompt Injection Observed in the Wild"（2026-03-03）

## 关联概念
- [[../Agentic-Security]] — 共现（来源同一篇文章）
- [[../MCP]] — 共现（来源同一篇文章）
- [[../Sandboxing]] — 共现（来源同一篇文章）
- [[../Sanitization]] — 共现（来源同一篇文章）
- [[../CVE]] — 共现（来源同一篇文章）

## 我的理解
Simon Willison 的 Lethal Trifecta 是关键洞察：private data + untrusted content + external communication 三者共存于同一运行时，Prompt Injection 就从有趣变得危险。防御不能只靠更好的 Prompt，必须是系统设计层面的隔离。

## 不确定性
- 自动化检测工具尚不成熟
- 攻击手法持续演进
