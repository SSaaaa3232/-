---
type: meta
title: "Hot Cache"
updated: 2026-05-18
tags:
  - meta
  - hot-cache
status: evergreen
related:
  - "[[index]]"
  - "[[log]]"
  - "[[overview]]"
  - "[[raw-incremental-ingest-2026-05-18]]"
---

# Recent Context

Navigation: [[index]] | [[log]] | [[overview]]

## Last Updated
2026-05-18. 完成 `raw/` 增量 ingest：处理 21 个未带 `ingested` 标记的 Markdown 来源，生成 source seed pages，并给原文 frontmatter 写入 `ingested` / `wiki_page` / `raw_path` 防重复标记。

## Key Recent Facts
- 新增综合摘要：[[raw-incremental-ingest-2026-05-18]]。
- 新增资料强化三条主线：[[Claude Code 与 Agentic Coding]]、[[Harness 与多 Agent 操作系统]]、[[AI 经济与组织重构]]。
- 新增/扩展外延：[[RAG]] 相关的 [[Agent 记忆与知识系统]]、HTML artifact 相关的 [[视觉表达与设计系统]]、以及新概念 [[合成生物学与生物设计]]。
- `CLAUDE.md` 已更新：以后 ingest `raw/` 后必须立即写入 `ingested` 标记；批量 ingest 先跳过已标记文件，避免重复编译。

## Active Threads
- 继续把 `raw/` 作为用户手动分类的原始资料区，不移动原文。
- 推荐 deep ingest：[[Source - Claude 技能构建完整指南]], [[Source - 深度拆解：AI Agent Harness 的构造【译】]], [[Source - Reiner Pope – The math behind how LLMs are trained and served]], Maestro/CCW 系列。
