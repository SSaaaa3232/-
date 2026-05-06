---
type: concept
status: developing
created: 2026-05-06
updated: 2026-05-06
title: "AI 安全与权限边界"
tags:
  - concept
  - raw-batch-2026-05-06
sources:
  - "[[wiki/sources/Source - Google Deepmind论文解读：如何给AI Agent 投毒]]"
  - "[[wiki/sources/Source - Claude Code]]"
  - "[[wiki/sources/Source - Thread by @chenchengpro]]"
  - "[[wiki/sources/Source - 微信收藏被加密锁死？我用frida逆向6轮迭代解密2000条数据，生成7种图表可视化报告]]"
  - "[[wiki/sources/Source - The Shorthand Guide to Everything Agentic Security]]"
---

# AI 安全与权限边界

> 权限、注入、投毒、PUA、危险参数、最小授权与 agent 安全边界。

## Synthesis
Agent 风险来自模型可行动后的权限放大：提示注入、投毒、危险参数、凭证与网络边界交织。安全策略应默认最小权限、可回滚、可审计，并把人放在高风险 loop 中。

## What to Watch
- 把来源继续拆成可复用概念、操作清单和开放问题。
- 对涉及新闻、市场、法规、模型版本的信息做日期标注和外部验证。

## Source Coverage
- [[wiki/sources/Source - Google Deepmind论文解读：如何给AI Agent 投毒]] — `raw/个人👤/行为/调研/分析/Google Deepmind论文解读：如何给AI Agent 投毒.md`
- [[wiki/sources/Source - Claude Code]] — `raw/团队team/skill/PUA-Skill.md`
- [[wiki/sources/Source - Thread by @chenchengpro]] — `raw/团队team/技术/claude --dangerously-skip-permissions.md`
- [[wiki/sources/Source - 微信收藏被加密锁死？我用frida逆向6轮迭代解密2000条数据，生成7种图表可视化报告]] — `raw/团队team/技术/微信收藏被加密锁死？我用frida逆向6轮迭代解密2000条数据，生成7种图表可视化报告.md`
- [[wiki/sources/Source - The Shorthand Guide to Everything Agentic Security]] — `raw/团队team/方法论/The Shorthand Guide to Everything Agentic Security 1.md`
