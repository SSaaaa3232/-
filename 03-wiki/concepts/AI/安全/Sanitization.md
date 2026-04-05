---
tags:
  - AI
  - 安全
category: AI/安全
sources:
  - [[02-raw/articles/2026/04/The Shorthand Guide to Everything Agentic Security.md]]
relations:
  - [[../Agentic-Security]]  # 共现（同一篇文章）
  - [[../Sandboxing]]        # 共现（同一篇文章）
---

# Sanitization

## 定义
清理不可信输入中的隐藏恶意内容（Unicode 字符、HTML 注释、base64 编码等）的过程。

## 详细解释
Everything an LLM reads is executable context。没有"数据"与"指令"的本质区别。清理重点：零宽字符（\x200B 等）、Bidi 覆盖字符、HTML 注释、隐藏文本块、base64 编码载荷。外部链接/skills/rules 如果可被第三方修改，也需要视为注入源。

## 证据来源
1. [[02-raw/articles/2026/04/The Shorthand Guide to Everything Agentic Security.md]] - 提供了 `rg -nP '[\x{200B}\x{200C}\x{200D}]'` 等检测命令

## 关联概念
- [[../Agentic-Security]] — 共现（来源同一篇文章）
- [[../Sandboxing]] — 共现（来源同一篇文章）
- [[../Prompt-Injection]] — uses（清理减少注入成功率）

## 我的理解
Sanitization 是"纵深防御"的一层。不是银弹，但对于阻止隐藏字符级别的注入非常有效。Practical rule: extract only what you need, strip what you don't。

## 不确定性
- 复杂编码（如多层 base64）检测困难
- 清理可能影响正常用例（如用零宽字符做词边界标记）
