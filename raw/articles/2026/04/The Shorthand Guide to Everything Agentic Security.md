---
source: [[02-raw/articles/2026/04/The Shorthand Guide to Everything Agentic Security.md]]
date: 2026-04-04
tags:
  - AI
  - 安全
  - Agentic
  - Agentic-Security
created: 2026-04-05
modified: 2026-04-05
---

# The Shorthand Guide to Everything Agentic Security

## TL;DR
Agentic Security 是 AI 时代的安全基础设施，核心是假设恶意内容终将进入上下文，通过隔离层、最小权限、输入清理和全程监控来控制损失。

## 核心结论

1. **攻击面持续扩大**：Prompt Injection 在 Agentic 系统中可导致 shell 执行、secret 泄露、工作流滥用和横向移动；2026 年已出现 CVSS 8.7 的 Claude Code 漏洞
2. **防御核心是隔离**：沙箱隔离、权限最小化、网络默认拒绝、输入清理构成多层防御；GitHub/ Anthropic/OpenAI 三方均已承认此问题
3. **安全必须是基础设施**：记忆系统、MCP 配置、Skills 都需要被视为攻击面；Snyk 扫描显示 36% 的公开 Skills 存在 Prompt Injection

## 证据来源

1. Check Point Research - Claude Code CVE-2025-59536 和 CVE-2026-21852 披露（2026-02-25）
2. Microsoft Security - AI Recommendation Poisoning 报告，覆盖 31 家公司和 14 个行业（2026-02-10）
3. Snyk ToxicSkills 研究 - 扫描 3,984 个公开 Skills，36% 存在 Prompt Injection（2026-02）
4. Simon Willison - Lethal Trifecta 框架（private data + untrusted content + external communication）
5. OWASP MCP Top 10 - 工具投毒、Prompt 注入、命令注入、影子 MCP 服务器

## 术语

| 术语 | 解释 |
|------|------|
| Prompt Injection | 通过在输入中植入恶意指令操纵 LLM 行为的技术 |
| Sandboxing | 隔离运行环境的防御手段，限制被攻击后的影响范围 |
| Sanitization | 清理输入中的隐藏字符、注释、恶意载荷的过程 |
| CVSS 8.7 | 高危漏洞评分，Claude Code hook 预信任执行漏洞 |
| MCP | Model Context Protocol，标准化工具发现协议 |
| Least Agency | 最小化 Agent 自主权的权限设计原则 |
| Memory Poisoning | 通过记忆系统持久化恶意指令的攻击方式 |
