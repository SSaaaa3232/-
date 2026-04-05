---
source: [[02-raw/articles/2026/04/从零开始两天构建一个 Claude Code：带你拆解 AI CLI 的每一层.md]]
date: 2026-04-04
tags:
  - AI
  - Claude-Code
  - Agentic
  - 工程
---

# 从零开始两天构建一个 Claude Code

## TL;DR
构建 Agentic CLI 的核心难点是 Harness Engineering：工具调用反馈、流式输出、错误恢复；46 个文件、一万行 TypeScript 验证了 6 层架构的可行性。

## 核心结论

1. **6 层架构**：core（引擎）/ tools（工具）/ ui（渲染）/ plugins（扩展）/ skills（技能）/ commands（命令），单向依赖，core 不依赖 ui
2. **Agent Loop 是核心**：最大 25 次迭代状态机，工具执行管线 6 阶段（render → permission → preHook → checkpoint → execute → postHook）
3. **Prompt Caching 三层**：静态段缓存（身份/工具规范/安全规则）、工具定义缓存、tool_result 断点缓存；实际效果是大部分 tokens 走缓存价格

## 证据来源

1. IceBearMiner - 从零构建 Claude Code 实现（2026-03-15）
2. Anthropic 官方文档 - Prompt Caching、Trust Dialog、MCP 配置
3. Node.js 22 标准库 - fetch/ReadableStream/TextDecoder/Buffer 全部原生支持
4. ECC (Extended Chat Protocol) - OpenAI Codex 使用的 Agent 通信协议

## 术语

| 术语 | 解释 |
|------|------|
| Agent Loop | Agent 主循环，while 循环 + 状态机，迭代调用 LLM 直到结束 |
| SSE | Server-Sent Events，服务端流式推送协议 |
| Context Compact | 上下文压缩，超过 85% 时触发摘要替换 |
| Prompt Caching | Anthropic API 的 block 级别缓存，按前缀匹配 |
| MCP | Model Context Protocol，JSON-RPC over stdio 的工具发现协议 |
| Deferred Tools | 延迟加载的低频工具，按需查询 schema，降低 40% 开销 |
| LSP | Language Server Protocol，代码诊断集成 |
| Permission System | 权限系统，default/auto/plan 三种模式 + 两阶段分类器 |
| Plugin System | 插件系统，manifest 驱动的目录结构，6 类扩展点 |
