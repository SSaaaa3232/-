---
type: meta
title: "Lint Report 2026-05-06"
created: 2026-05-06
updated: 2026-05-06
tags:
  - meta
  - lint
status: developing
related:
  - "[[index]]"
  - "[[hot]]"
  - "[[log]]"
---

# Lint Report: 2026-05-06

## Scope
- Scanned 511 Markdown files across the vault, excluding `.git/`, `.obsidian/`, `.claude/`, and the instruction docs `WIKI.md` / `CLAUDE.md`.
- Resolution rules: internal wikilinks only, with relative-path normalization and basename matching.

## Summary
- Dead link targets: 0
- Ambiguous wikilink targets: 0
- Frontmatter gaps: 0
- Empty-heading pages: 147
- Orphan-review pages: 51
- Auto-fixed this pass: broken links, ambiguous targets, and frontmatter gaps were all resolved.

## Auto-Fixes Applied

### Broken links
Fixed all dead wikilink targets by:
- Repointing generated concept pages to the exact existing raw source files.
- Converting the `Wiki vs RAG` reference to `[[LLM Wiki Pattern|Wiki vs RAG]]`.
- Repairing the `Anthropic` multi-agent reference in [[多智能体协作五种模式]].
- Adding lightweight alias notes for older relative-path references used by raw notes.

### Frontmatter
Added minimal frontmatter to:
- [[清单/GitHub Stars.md]]
- [[TrendRadar/Daily/2026-05-06.md]]
- [[TrendRadar/Daily/2026-05-05.md]]
- [[TrendRadar/x/宝玉/宝玉.md]]

### Alias notes added
Created alias/redirect notes to preserve old paths without modifying source content:
- [[阅读提问辅助流程]]
- [[任务卡片模板]]
- [[读书笔记模板]]
- [[每日安排]]
- [[纳瓦尔拉维坎特44个人性真相]]
- [[2026四大经济周期思维导图]]
- [[OpenClaw保险AI案例思维导图]]
- [[已思考/闲鱼陪伴经济-阅读笔记]]
- [[x/已思考/前置奖励法]]
- [[x/已思考/祛魅-快速致富的幻觉]]
- [[02-raw/articles/Inbox/书单/第一性原理]]
- [[读书/思维结构书单]]

## Remaining Review Items

### Empty headings
Most empty-heading pages are intentional scaffolds:
- `_templates/*`
- index / dashboard / placeholder pages
- some list-style notes in `清单/`
- a few generated alias notes

### Orphans to review
Mostly intentional standalone pages or stubs, including:
- `_templates/*`
- `清单/*`
- `Excalidraw/*`
- `读书/思维结构书单.md`

## Notes
- The vault now has no unresolved internal wikilinks under normalized resolution.
- The graph is still structurally “young” in some areas; orphan review is expected after large ingest and template scaffolding.
