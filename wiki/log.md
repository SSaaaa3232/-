---
type: meta
title: Operation Log
updated: 2026-05-18
tags:
  - meta
  - log
status: evergreen
related:
  - "[[index]]"
  - "[[hot]]"
  - "[[overview]]"
  - "[[wiki/sources/_index]]"
---


## [2026-05-18] ingest | raw/ incremental（21 文件）
- 来源：`raw/` 全目录；处理 21 个未带 `ingested` 标记的 Markdown，跳过所有已标记文件。
- Created source pages: 21 pages under [[wiki/sources/_index]].
- Updated concept/domain indexes: [[wiki/concepts/_index]], [[wiki/domains/_index]], [[wiki/index]].
- Synthesis: [[raw-incremental-ingest-2026-05-18]].
- 防重复：已给本轮所有 raw 原文 frontmatter 追加 `ingested: 2026-05-18`、`wiki_page`、`raw_path`；后续 ingest 必须先检查该字段并跳过。



## [2026-05-06] lint | Full vault health check + broken-link repair
- Scope: 511 Markdown files scanned across the vault, excluding `.git/`, `.obsidian/`, `.claude/`, and instruction docs.
- Result: dead links 0, ambiguous wikilink targets 0, frontmatter gaps 0.
- Auto-fixes: repaired all broken links, normalized source references, added 4 frontmatter blocks, and created alias notes for legacy paths.
- Report: [[lint-report-2026-05-06]]

# Operation Log

Navigation: [[index]] | [[hot]] | [[overview]]

Append-only. New entries go at the TOP. Never edit past entries.

Entry format: `## [YYYY-MM-DD] operation | Title`

Parse recent entries: `grep "^## \[" wiki/log.md | head -10`

---


## [2026-05-06] ingest | raw/ batch（161 文件）
- 来源：`raw/` 全目录；跳过 22 个已有 `ingested` 标记文件，处理 161 个未 ingest Markdown。
- Created/updated source pages: 161 pages under [[wiki/sources/_index]].
- Created/updated concept clusters: 15 pages under [[wiki/concepts/_index]].
- Created/updated domain pages: 6 pages under [[wiki/domains/_index]].
- Synthesis: [[raw-batch-synthesis-2026-05-06]].
- Notes: source pages are seed-level extractive ingests; high-value long sources should be deep-ingested individually.

## [2026-04-17] ingest | raw/团队team/方法论/ 第一批（22文件）
- 来源：`raw/团队team/方法论/`（22个文件，含 LLM-wiki method 子文件夹 5 个文件）
- Concept pages created (17):
  - [[Thin Harness Fat Skills]] — 三层AI架构（@Pluvio9yte）
  - [[wiki/concepts/横纵分析法]] — 纵横双轴研究框架（@ooxiao_）
  - [[Knowledge MEMO]] — LLM Wiki + FSRS-6间隔重复（@owenliang60）
  - [[Wiki 为谁而建]] — Agent上下文 vs 人类大脑（@owenliang60）
  - [[人必须在 Loop 里]] — 人类监督原则（@owenliang60）
  - [[多智能体协作五种模式]] — Anthropic 5种协作模式（Anthropic docs）
  - [[Harness Engineering]] — L0-L4能力阶梯（@Pluvio9yte）
  - [[Agent 安全]] — CVEs、最小权限、攻击面（@affaanmustafa）
  - [[LLM Wiki Pattern]] — Karpathy原始模式3层架构（@NickSpisak_/llm-wiki.md）
  - [[深度研究两阶段法]] — Web IO→本地挖掘（@hxiao）
  - [[苏格拉底-维特根斯坦-波兰尼思维清洁系统]] — 三层思维清洁（@Jaden_riku）
  - [[达尔文 Skill 自优化系统]] — 棘轮优化100分评分（@AlchainHust）
  - [[AutoAgent 自优化代理]] — meta/task分离，模型共情（@kevingu）
  - [[知识图谱]] — 节点/边/推断（@techwith_ram）
  - [[范式投资 vs 赢家模式]] — 8位范式投资人（@BTCdayu）
  - [[ASMR Agent 记忆系统]] — ~99% LongMemEval，主动检索（@DhravyaShah）
  - [[Codex 团队极简管理]] — 10要点Spec，近远规划（@dotey）
- Entity pages created (1): [[owenliang60]]
- Files skipped/low-signal: 纳瓦尔prompt参考（系统提示模板，无新概念）；LLM-wiki method子文件夹内容已并入[[LLM Wiki Pattern]]
- 质量评估：内容密度高，全部原始来源为一手推特/博客线程，框架完整可直接复用

## [2026-04-17] scaffold | DEF 混合模式初始化
- 模式：D（个人）+ E（研究）+ F（读书/课程）
- 新增目录：goals/ areas/ people/ resources/ papers/ thesis/ gaps/ books/ courses/ themes/ synthesis/
- 创建子索引：13 个 _index.md
- 新增模板：goal.md / paper.md / book.md / course.md
- 创建：.obsidian/snippets/vault-colors.css（DEF 配色方案）
- 创建：CLAUDE.md（vault 操作手册）
- 更新：wiki/index.md（DEF 三模式结构）

## [2026-04-08] save | claude-obsidian v1.4 Release Session
- Type: session
- Location: wiki/meta/claude-obsidian-v1.4-release-session.md
- From: full release cycle covering v1.1 (URL/vision/delta tracking, 3 new skills), v1.4.0 (audit response, multi-agent compat, Bases dashboard, em dash scrub, security history rewrite), and v1.4.1 (plugin install command hotfix)
- Key lessons: plugin install is 2-step (marketplace add then install), allowed-tools is not valid frontmatter, Bases uses filters/views/formulas not Dataview syntax, hook context does not survive compaction, git filter-repo needs 2 passes for full scrub

## [2026-04-08] ingest | Claude + Obsidian Ecosystem Research
- Type: research ingest
- Source: `.raw/claude-obsidian-ecosystem-research.md`
- Queries: 6 parallel web searches + 12 repo deep-reads
- Pages created: [[claude-obsidian-ecosystem]], [[cherry-picks]], [[claude-obsidian-ecosystem-research]], [[Ar9av-obsidian-wiki]], [[Nexus-claudesidian-mcp]], [[ballred-obsidian-claude-pkm]], [[rvk7895-llm-knowledge-bases]], [[kepano-obsidian-skills]], [[Claudian-YishenTu]]
- Key finding: 16+ active Claude+Obsidian projects; 13 cherry-pick features identified for v1.3.0+
- Top gap confirmed: no delta tracking, no URL ingestion, no auto-commit

## [2026-04-07] session | Full Audit, System Setup & Plugin Installation
- Type: session
- Location: wiki/meta/full-audit-and-system-setup-session.md
- From: 12-area repo audit, 3 fixes, plugin installed to local system, folder renamed

## [2026-04-07] session | claude-obsidian v1.2.0 Release Session
- Type: session
- Location: wiki/meta/claude-obsidian-v1.2.0-release-session.md
- From: full build session — v1.2.0 plan execution, cosmic-brain→claude-obsidian rename, legal/security audit, branded GIFs, PDF install guide, dual GitHub repos


- Source: `.raw/` (first ingest)
- Pages updated: [[index]], [[log]], [[hot]], [[overview]]
- Key insight: The wiki pattern turns ephemeral AI chat into compounding knowledge — one user dropped token usage by 95%.

## [2026-04-07] setup | Vault initialized

- Plugin: claude-obsidian v1.1.0
- Structure: seed files + first ingest complete
- Skills: wiki, wiki-ingest, wiki-query, wiki-lint, save, autoresearch
