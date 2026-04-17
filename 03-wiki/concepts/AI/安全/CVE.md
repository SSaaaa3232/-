---
tags:
  - AI
  - 安全
category: AI/安全
sources:
  - [[02-raw/articles/2026/04/The Shorthand Guide to Everything Agentic Security.md]]
relations:
  - [[../Agentic-Security]]  # 共现（同一篇文章）
created: 2026-04-05
modified: 2026-04-05
---

# CVE（安全漏洞披露）

## 定义
Common Vulnerabilities and Exposures，系统性安全漏洞的标准标识符。

## 详细解释
文章提及的与 Agent 相关的 CVE：
- **CVE-2025-59536**（CVSS 8.7）：Claude Code hook 在用户接受信任对话框之前执行代码
- **CVE-2026-21852**：Claude Code 项目可控制 `ANTHROPIC_BASE_URL`，在信任确认前泄露 API key
- **CVE-2026-25253**：OpenClaw 暴露事件，Hunt.io 报告 17,470 个暴露实例

## 证据来源
1. [[团队team/方法论/The Shorthand Guide to Everything Agentic Security]] - Check Point Research 披露（2026-02-25）
2. NVD（National Vulnerability Database）官方记录

## 关联概念
- [[../Agentic-Security]] — 共现（来源同一篇文章）
- [[../Sandboxing]] — context（沙箱可限制 CVE 利用后的损害）
- [[../MCP]] — context（MCP 配置也是攻击面）

## 我的理解
2026 年是 Agent CVE 元年。工具化程度越高，攻击面越大。Hook 配置、项目级 MCP 设置、环境变量现在都是执行面的一部分，需要被当作安全边界来对待。

## 不确定性
- 更多 CVE 预计会出现
- 厂商响应速度差异大
