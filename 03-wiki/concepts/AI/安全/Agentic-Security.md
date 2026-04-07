---
tags:
  - AI
  - 安全
category: AI/安全
sources:
  - [[02-raw/articles/2026/04/The Shorthand Guide to Everything Agentic Security.md]]
relations:
  - [[../MCP]]              # context（MCP 是 Agent 安全的重要攻击面）
  - [[../Prompt-Injection]] # 共现（来源同一篇文章）
  - [[../Sandboxing]]       # 共现（来源同一篇文章）
  - [[../Sanitization]]    # 共现（来源同一篇文章）
  - [[../CVE]]             # 共现（来源同一篇文章）
---

# Agentic Security

## 定义
Agentic Security 是 AI 时代的安全基础设施，研究如何保护 Agentic 系统免受 Prompt Injection、工具投毒、记忆污染等攻击。

## 详细解释
在 Agentic 系统中，LLM 充当大脑连接各种工具和数据源。攻击面包括：恶意输入（文档/邮件/PR）、受污染的工具（MCP 服务器）、持久化后门（记忆系统）。防御核心是假设恶意内容终将进入上下文，通过隔离层、最小权限、输入清理来控制损失。

## 证据来源
1. [[02-raw/articles/The Shorthand Guide to Everything Agentic Security]] - Check Point Research 披露 Claude Code CVE，CVSS 8.7
2. Simon Willison 的 Lethal Trifecta 框架（private data + untrusted content + external communication）

## 关联概念
- [[../MCP]] — context（MCP 是 Agent 安全的重要攻击面）
- [[../Prompt-Injection]] — 共现（来源同一篇文章）
- [[../Sandboxing]] — 共现（来源同一篇文章）
- [[../Sanitization]] — 共现（来源同一篇文章）
- [[../CVE]] — 共现（来源同一篇文章）

## 我的理解
Agent 安全不再是纸上谈兵。2026 年已经有真实的 CVE 披露、供应链攻击（ToxicSkills 扫描 36% 公开 Skills 有问题）、记忆污染攻击。防御思维需要从"防止攻击"转向"假设被攻陷后如何限制损失"。

## 不确定性
- 各平台安全实现细节差异大，需要持续跟踪
