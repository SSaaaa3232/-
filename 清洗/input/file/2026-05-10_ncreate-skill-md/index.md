---
name: ncreate
description: >
  Use when the user enters /ncreate with any material (file, URL, YouTube link,
  X/Twitter link, .md, raw text) or asks to 清洗素材、归档、把这个转成 HTML、
  做成图文、画一张图、出一份 PPT/SVG/PSD、整理成 md 放到 obsidian. Triggers on
  "/ncreate", "清洗一下", "把这篇归档", "转成 HTML", "做成图文", "画张图",
  "做成 PPT", "reverse 成 SVG/PSD", "扔到 obsidian-template". Single skill that
  absorbs 21 source skills (file-to-md, url-to-md, youtube, X/Twitter, pandoc HTML,
  article illustration, 9 PNG subtypes: cover/infographic-AI/infographic-template/
  infocard/comic/diagram/architecture/mindmap/canvas, slide decks, image2ppt,
  image2svg, image2psd). Menu-driven — clean md first, then present options to
  the user. Output lands in /Users/saaaaa/Obsidian-Template/清洗/.
allowed-tools: Bash, Read, Write, Edit, Grep, Glob, WebFetch
model: opus
---

# ncreate

Absorb any material, clean it to `.md`, then **ask the user which output they want** from a three-level menu. All products land in `Obsidian-Template/清洗/`.

## Behavior 底板

1. **Think Before Coding** — confirm material type first. Clean md first; **then** present menu, even if user named a layer (let them confirm after seeing md).
2. **Menu-Driven** — clean md → 一级菜单（5 个方向）→ 二级菜单（子类型 / 主题 / 分支）→ 三级菜单（风格 / 色板 / 比例 / 参考图 / 语言）。每级都用 AskUserQuestion。
3. **Confirmation Mandatory** — 每个选择都要用户显式确认。不默认推进。用户说 "--quick" 也必须在生成前汇报假设值。
4. **Prompt 文件硬约束** — 所有生图路径（imagine / gemini-web），prompt 先落盘再调 backend。
5. **Reference Image 多轮锁定** — 用户的每轮要求必须追加到 `refs/requirements.md`，不得只留在对话里。
6. **Surgical Changes** — 只写 `清洗/input/` 和 `清洗/output/`，从不越界。
7. **Goal-Driven Execution** — 每次交付 (a) artifact + (b) 同目录 `manifest.json` + (c) 一句话报告。

## Always Read

1. `references/paths.md` — canonical 清洗 directory layout + slug/manifest rules
2. `references/menu.md` — **一级/二级/三级菜单的呈现规则**
3. `references/preflight.md` — dependency probe + per-layer blocking（含 `imagine_EXTEND` Step 0）
4. `references/gotchas.md` — accumulated pitfalls
5. `references/reference-image-flow.md` — 参考图多轮需求锁定

## Common Tasks

- **归档 (Layer 1)** → `references/intake.md` → `references/layer-archive.md`
- **HTML (Layer 2)** → intake → `references/layer-html.md` + `catalogs/html-themes.md`（4 主题）
- **图文 (Layer 3)** → intake → `references/layer-article.md` + `catalogs/article-illustrator.md` + `catalogs/cover.md`
- **PNG (Layer 4)** → intake → `references/layer-png.md` → `references/png-subtypes.md` → `catalogs/<subtype>.md`
- **版式 & 向量 (Layer 5)** → intake → `references/layer-deck.md`（slide-deck / image2ppt / **image2svg** / image2psd）
- **Danger 链路 (X / Gemini web)** → `references/danger.md`

## Workflow

1. **Parse** — read the text after `/ncreate`. Identify material source (file / URL / YouTube / X / md / raw text). If material missing, ask once.
2. **Preflight** — run `scripts/preflight.sh` on first invocation (or when `~/.ncreate/preflight.json` older than 7 days). Probe only; do NOT block yet.
3. **Intake** — route material to the right adapter (`references/intake.md`). Always run `baoyu-format-markdown` at the end. Land cleaned `.md` at `清洗/input/<source>/<slug>/index.md`.
4. **Present 一级菜单**（`references/menu.md`）— AskUserQuestion:
   ```
   清洗完成：<md path>
   接下来：
   A) 不改动 · Layer 1 归档（到此为止）
   B) HTML 发布 · Layer 2
   C) 图文文章 · Layer 3
   D) 单张图 / PNG · Layer 4
   E) 版式 & 向量 · Layer 5
   ```
5. **Branch on choice**
   - A → 写 manifest，报路径，结束。
   - B → `references/layer-html.md`（二级选 theme）
   - C → `references/layer-article.md`（二级选 preset/type + density + style + palette；封面 5 维度另问）
   - D → `references/layer-png.md`（二级选 9 子类型之一，或让推荐器给候选）→ 三级进对应 `catalogs/<subtype>.md`
   - E → `references/layer-deck.md`（二级选 4 分支之一：slide-deck / image2ppt / **image2svg** / image2psd）
6. **Per-layer preflight check** — 按所选层从 `references/preflight.md` 拉依赖清单，缺了就**停**，原样吐 install 命令。
7. **细节询问（三级菜单）** — 在选定的 catalog 文件里执行 AskUserQuestion 批量问：风格 / 色板 / 比例 / 参考图 / 语言 / 后端。
8. **（如有参考图）执行 `references/reference-image-flow.md`** — 落 `refs/`，写 `requirements.md`，用法分类。
9. **生成** — 用 imagine 的路径先落 prompt 文件，再调 backend。
10. **Deliver** — artifact + `manifest.json` 写到对应 `output/<type>/<slug>/`。
11. **定稿确认** — AskUserQuestion："再改还是定稿？" 改 → 追加 `refs/requirements.md`，回到步骤 9。定稿 → 步骤 12。
12. **Report** — 一句话：layer + 子类型/主题 + artifact path + manifest path。

## Output Style

- Language: Chinese for narration, English for paths/commands.
- AskUserQuestion 批量问（同级问题合并一次问）。
- 除 "/ncreate" 原语之外，不复述需求。

## Verification

1. Artifact 文件存在于 `Obsidian-Template/清洗/` 下文档化的路径
2. `manifest.json` 同目录，valid JSON，含 `source` / `layer` / `artifacts[]`
3. Layer 4 manifest 必有 `capabilities_used: ["png:<subtype>"]`
4. 所有用 imagine 的路径，`prompts/NN-*.md` 必须存在
5. 若用了参考图，manifest 必有 `reference_images`，`refs/requirements.md` 必存在
6. Danger 路径 manifest 必有 `danger_use` 含 consent timestamp

## Task Closure Protocol

AAR 扫描（5 问：新模式？新坑？缺规则？旧规则？外部事实？）。记录阈值 2/3（可重复 + 代价大 + 非显然）。对有意义的任务，把紧凑 JSONL 条目 append 到 `ncreate/training/athlete-log.jsonl`（遵循 `nskill/references/athlete-training-log.md`）；**运行期不自改 SKILL**。格式化 / 注释 / 依赖版本 / 行为保留重构 可跳过。

## Known Gotchas（见 `references/gotchas.md` 全集）

- Writing outside 清洗 root
- Skipping danger consent
- Blind PNG subtype pick → 必须 recommend + confirm
- imagine_EXTEND 未检查（Step 0 硬阻塞）
- Prompt 未落盘就调 backend
- 参考图不写 requirements.md
- URL 一律 trafilatura（错；结构化页要 markitdown）
- PSD 默认推荐（错；平面场景优先 SVG）

## Boundaries

- 从不写 `/Users/saaaaa/Obsidian-Template/清洗/` 之外。
- 从不在未记录 consent 的情况下跑 danger 链路。
- 从不在用户没点名且没推荐候选的情况下自选 PNG 子类型。
- 从不静默从非 danger 降级到 danger。
- 从不跳过 manifest.json。
- 从不跳过三级菜单（风格 / 色板 / 比例 / 参考图）—— 除非 `--quick`，且 `--quick` 也要在生成前汇报假设值。
- 从不假定用户满意 —— 每次生成后问"再改还是定稿"。
- `evolve-self` / `evolve-cross` 编辑走 nskill，不在运行期自改。
