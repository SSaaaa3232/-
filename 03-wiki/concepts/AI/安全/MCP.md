---
tags:
  - AI
  - 安全
category: AI/安全
sources:
  - [[02-raw/articles/2026/04/The Shorthand Guide to Everything Agentic Security.md]]
relations:
  - [[../Agentic-Security]]  # 共现（同一篇文章）
  - [[../Prompt-Injection]]  # context（MCP 工具输出可被污染）
created: 2026-04-05
modified: 2026-04-05
---

# MCP（Model Context Protocol）

## 定义
Model Context Protocol，标准化的工具发现协议，允许 AI Agent 动态发现和调用外部工具。

## 详细解释
MCP 本质是 JSON-RPC 2.0 over stdio：启动 MCP server 进程，通过 stdin/stdout 交换消息。启动序列固定：initialize 握手 → tools/list 获取工具定义数组。OWASP 已发布 MCP Top 10，说明其安全风险已引起重视：工具投毒、Prompt 注入、命令注入、影子 MCP 服务器、secret 暴露。

## 证据来源
1. [[02-raw/articles/The Shorthand Guide to Everything Agentic Security]] - OWASP MCP Top 10 引用
2. Claude Code MCP 文档

## 关联概念
- [[../Agentic-Security]] — 共现（来源同一篇文章）
- [[../Prompt-Injection]] — context（MCP 工具输出可被污染）
- [[../Sandboxing]] — uses（沙箱限制 MCP 服务器被攻陷后的影响）

## 我的理解
MCP 是双刃剑：它让工具发现变得标准化，但一旦 MCP 服务器被攻陷，整个工具链都被污染。"信任但要验证"原则适用：验证工具来源、限制工具权限、监控工具调用。

## 不确定性
- MCP 生态还在成熟中，安全最佳实践尚未完全确立
