---
type: meta
title: "Hot Cache"
updated: 2026-04-17
tags:
  - meta
  - hot-cache
status: evergreen
related:
  - "[[index]]"
  - "[[log]]"
---

# Recent Context

Navigation: [[index]] | [[log]] | [[overview]]

## Last Updated
2026-04-17: Wiki 全量重置，所有原始笔记搬入 `.raw/`，等待分批 ingest。

## 当前状态
Wiki 为空骨架，尚未 ingest 任何内容。

## .raw/ 目录内容（约 250 个 .md 文件）

| 分类 | 路径 | 大致内容 |
|---|---|---|
| 原版 concepts + summaries | `.raw/03-wiki/` | Claude Code 技术概念、80+ 篇文章摘要 |
| 个人笔记 | `.raw/个人👤/` | 认知、方法论、清单、经验、skill prompt |
| 团队知识 | `.raw/团队team/` | CC 技巧、方法论、技术、模式、Agent 设计 |
| 有意思的项目 | `.raw/有意思的项目/` | 项目收集、趋势分析 |
| 输出文件 | `.raw/04-outputs/` | 健康检查、QA 模板 |
| 编译规则 | `.raw/01-polaris/` | 命名规则、skill 编译规范 |

## 推荐 ingest 顺序
1. `ingest .raw/团队team/方法论/` — 核心方法论，建立概念骨架
2. `ingest .raw/03-wiki/concepts/AI/Claude-Code/` — Claude Code 技术概念
3. `ingest .raw/团队team/模式/` — Agent 设计模式
4. `ingest .raw/个人👤/认知/` — 认知框架
5. `ingest .raw/03-wiki/summaries/articles/2026/04/投资理财/` — 投资笔记
6. 其余分批按需触发
