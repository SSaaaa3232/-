---
type: concept
title: LLM Wiki Pattern
created: 2026-04-17
updated: 2026-04-17
tags:
  - concept
  - 知识管理
  - LLM
status: mature
complexity: basic
domain: 知识管理
aliases:
  - LLM Wiki
  - Karpathy Wiki模式
related:
  - "[[Knowledge MEMO]]"
  - "[[Wiki 为谁而建]]"
  - "[[深度研究两阶段法]]"
sources:
  - "[[llm-wiki]]"
---

# LLM Wiki Pattern

> The wiki is a persistent, compounding artifact. The cross-references are already there. The contradictions have already been flagged. The synthesis already reflects everything you've read.
> — Andrej Karpathy

## 核心思想

与 RAG 的区别：RAG 每次查询都从零重新检索和推导；LLM Wiki 是**已经编译好的持久知识库**，新来源不只是被索引，而是被集成进去——更新实体页、修订主题摘要、标注矛盾。知识像利息一样复利增长。

## 三层架构

| 层 | 内容 | 谁写 |
|---|------|------|
| **Raw Sources** | 原始来源（文章/论文/图片），不可修改 | 人类 |
| **Wiki** | LLM 生成的结构化 Markdown 文件 | LLM |
| **Schema（CLAUDE.md）** | 规定 wiki 结构、约定、操作流程 | 人类+LLM 共同演化 |

## 四个操作

- **Ingest**：新来源 → 摘要页 → 更新 10-15 个 wiki 页面 → 更新 index + log
- **Query**：问题 → 检索相关页 → 综合回答 → 好答案存回 wiki
- **Lint**：定期健康检查：矛盾、孤儿页、陈旧内容、空白
- **（Knowledge MEMO 加的）Retain**：FSRS 间隔重复，将知识推进大脑

## 适用场景

个人目标/健康/心理、研究（读论文/报告）、读书（章节笔记+人物主题）、商业/团队 wiki、竞品分析

## 工具

- Obsidian（Graph View 是最佳可视化方式）
- Obsidian Web Clipper（浏览器扩展，一键将网页转为 md 送入 raw/）
- qmd（本地 Markdown 搜索引擎，BM25+向量+LLM 重排）

## 与 Knowledge MEMO 的对比

见 [[Wiki 为谁而建]] — 关键分歧：wiki 是为 Agent 的 context 还是为人脑的脚手架？

## 来源
(Source: [[llm-wiki]])，Andrej Karpathy
