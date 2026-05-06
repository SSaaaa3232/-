---
type: source
status: seed
created: 2026-05-06
updated: 2026-05-06
title: "从零开始两天构建一个 Claude Code：带你拆解 AI CLI 的每一层"
source_type: note
source_path: "raw/团队team/技术/从零开始两天构建一个 Claude Code：带你拆解 AI CLI 的每一层.md"
tags:
  - source
  - raw-ingest
  - claude-code-与-agentic-coding
  - 技术基础设施与工程工具
related:
  - "[[Claude Code 与 Agentic Coding]]"
  - "[[技术基础设施与工程工具]]"
---

# 从零开始两天构建一个 Claude Code：带你拆解 AI CLI 的每一层

- Raw file: `raw/团队team/技术/从零开始两天构建一个 Claude Code：带你拆解 AI CLI 的每一层.md`
- Ingested: 2026-05-06
- Related concepts: [[Claude Code 与 Agentic Coding]], [[技术基础设施与工程工具]]

## Extractive Summary
- 前两天突发奇想：一个生产级的 agentic CLI 到底需要哪些组件？每一层的具体怎么实现？SSE 缓冲区怎么管理、system prompt 怎么分段、工具权限怎么拦截、上下文满了怎么压缩。这些问题靠读文档回答不了，靠逆向混淆代码效率极低。
- 所以选择了另一条路：以 Claude Code 为参照系，从零重建一个功能等价的实现——纯 TypeScript，零框架，唯一的依赖是 fast-glob（因为原生 glob 在跨平台路径处理上有已知缺陷）。
- 两天之后的结果是 46 个文件，一万行 TypeScript。这篇文章记录的是这个过程中每一层的技术决策和实现细节。

## Source Structure
- 整体架构
- 多平台LLM兼容
- System Prompt 分段架构与 Prompt Caching
- Agent Loop：while 循环背后的状态机
- 21 个内置工具
- 权限系统：三种模式与两阶段分类器
- MCP 动态工具与 LSP 集成
- 插件系统与 Skills
- 补上之前提到的Agent Teams：多 Agent 协作
- Auto Memory：跨会话记忆

## Ingest Notes
- 本页为批量 ingest 生成的 source seed：已入库、可检索、已进入相关概念簇。
- 若该来源是高价值长文/访谈，后续可单独运行 deep ingest，把关键论证拆成独立概念页。
