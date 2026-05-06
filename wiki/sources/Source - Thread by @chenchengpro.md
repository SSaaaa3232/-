---
type: source
status: seed
created: 2026-05-06
updated: 2026-05-06
title: "Thread by @chenchengpro"
source_type: note
source_path: "raw/团队team/技术/claude --dangerously-skip-permissions.md"
tags:
  - source
  - raw-ingest
  - ai-安全与权限边界
  - 技术基础设施与工程工具
related:
  - "[[AI 安全与权限边界]]"
  - "[[技术基础设施与工程工具]]"
---

# Thread by @chenchengpro

- Raw file: `raw/团队team/技术/claude --dangerously-skip-permissions.md`
- Ingested: 2026-05-06
- Related concepts: [[AI 安全与权限边界]], [[技术基础设施与工程工具]]

## Extractive Summary
- 如果你的 --dangerously-skip-permissions 也莫名失效了，权限弹窗弹到怀疑人生，不妨试试 PreToolUse Hook 方案。
- 1）Claude Code 对 .claude 目录和敏感文件（CLAUDE.md、hooks 等）加了额外保护，即使 DSP 模式也会弹窗
- 2）会话 token 过长（~100k）时模型会变保守，主动请求确认

## Source Structure
- 无明显 Markdown 标题结构。

## Ingest Notes
- 本页为批量 ingest 生成的 source seed：已入库、可检索、已进入相关概念簇。
- 若该来源是高价值长文/访谈，后续可单独运行 deep ingest，把关键论证拆成独立概念页。
