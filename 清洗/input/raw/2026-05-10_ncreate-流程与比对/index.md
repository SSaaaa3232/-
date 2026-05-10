---
title: ncreate 流程讲解 × 21 个源 Skill 逐项比对
source: /Users/saaaaa/.claude/skills/ncreate/ 融合自 02-ncreate/references/ 下 21 个 skill
fetched_at: 2026-05-10
type: mindmap
---

# ncreate 流程讲解 × 21 个源 Skill 逐项比对

> 目的：把 `/ncreate` 的完整内部流程讲清楚，同时把它声称"吸收自"的 **21 个源 skill**（位于 `02-ncreate/references/` 的三个子文件夹）**逐个对照**，**标注每一条能力的继承状态**，防止融合过程中出现能力遗漏。
> 
> 图例：**✅ 完整继承** · **🟡 简化/有损继承** · **🟠 抽象掉名字但保留能力** · **🔴 遗漏/未落实** · **⚪ 不在 ncreate 职责边界**

---

## Part 1 — ncreate 自身流程（Mermaid Mindmap）

```mermaid
mindmap
  root((ncreate 单一skill))
    行为底板
      Think Before Coding 先问清素材+目标层
      Simplicity First 不做没要求的中间层
      Surgical Changes 只写 清洗/input 和 清洗/output
      Goal-Driven 每次交付 artifact+manifest+一句话报告
    总工作流 7 步
      1 Parse 解析材料+层
      2 Preflight 7天一探 非阻塞
      3 Intake 素材→md 落 清洗/input
      4 Branch 按层分派
      5 Per-layer preflight 阻塞式依赖检查
      6 Deliver artifact+manifest
      7 Report 一句话路径
    Intake 源判定 5 类
      file 本地文件 markitdown
      url 通用 trafilatura+html-to-markdown
      url 动态 baoyu-url-to-markdown CDP
      youtube baoyu-youtube-transcript
      x danger-x 需同意
      raw 直通 跳过抓取
      formatter baoyu-format-markdown 统一收口
    5 层交付
      Layer 1 归档 仅 md
      Layer 2 HTML pandoc 4 主题
      Layer 3 图文 cover+illustrator+compress
      Layer 4 PNG 9 子类型自动推荐
      Layer 5 PPTX/PSD 3 分支问一次
    PNG 9 子类型
      cover 封面 imagine
      infographic-AI 高密度AI海报 imagine
      infographic-template 模板无key
      infocard 编辑风单题卡 无key
      comic 知识漫画 imagine
      diagram SVG+@2x 无key
      architecture HTML分层 无key
      mindmap PlantUML 无key
      canvas Obsidian Canvas 无key
    路径约定
      根 仅 Obsidian-Template/清洗
      input 按 source 分目录 file/url/youtube/x/raw
      output 按 layer 分目录 html/article/png/deck
      slug {date}_{kebab-title} 60字以内
      collision -2 -3
      每目录必含 manifest.json
    Danger 链路
      仅 2 条 x-to-markdown gemini-web
      每次必念风险 + 查 consent.json
      无 consent 就停 不自建
      manifest 写 danger_use.consent_ref
      非 danger 失败 不静默切换
    Preflight 分层
      probe 轻 非阻塞 7 天 TTL
      per-layer check 重 阻塞 给 install 命令
    Output Style
      叙述中文 路径/命令英文
      每轮最多一个澄清问题
      不复述需求
    Verification
      artifact 存在
      manifest.json 合法 JSON 含 source/layer/artifacts
      Layer4 必须记 subtype
      danger 必须有 consent timestamp
    Task Closure
      AAR 五问 新模式/新坑/缺规则/旧规则/外部事实
      记录阈值 可重复+代价大+非显然
      写到 ncreate/training/athlete-log.jsonl
      不在运行期自改 SKILL
    边界
      不写 清洗 之外的路径
      未同意不跑 danger
      未点名不替用户挑 PNG 子类型
      不从非 danger 静默回落到 danger
      不跳过 manifest
      自我进化走 nskill 不自改
```

---

## Part 2 — ncreate 七步流程详解（文字展开）

### Step 1 · Parse
读 `/ncreate` 后面的文本 → 判别 **material**（文件 / URL / YouTube / X / md / 裸文本）+ **layer**（归档 / HTML / 图文 / PNG / PPTX-PSD）。任一缺失，问**一次**。

### Step 2 · Preflight（探，不拦）
- 首次跑 `scripts/preflight.sh`，结果写 `~/.ncreate/preflight.json`。
- 之后每 7 天重探一次。
- 探测是静默、非阻塞的 —— 环境哪怕没装 pandoc，这一步也绝不打断流程。

### Step 3 · Intake（素材 → 干净 md）
按 source 选适配器：

| source | 工具 | 落地 |
|---|---|---|
| file | `markitdown`（来自 huashu 能力 1） | `清洗/input/file/{date}_{slug}/` |
| url 通用 | `trafilatura` + `html-to-markdown` | `清洗/input/url/{domain}/{slug}/` |
| url 动态/登录 | `baoyu-url-to-markdown`（Chrome CDP） | 同上 |
| youtube | `baoyu-youtube-transcript` | `清洗/input/youtube/{channel}/{slug}/` |
| x | `baoyu-danger-x-to-markdown` + 同意门 | `清洗/input/x/{username}/{tweet-id}/` |
| raw | 直通 | `清洗/input/raw/{date}_{slug}/` |

**所有出站一律走 `baoyu-format-markdown` 收口**：frontmatter（title/source/fetched_at/type）、单 H1、去导航/广告/CTA、CJK 排版。

### Step 4 · Branch on Layer
- **Layer 1** 在此打止，只写 manifest。
- **Layer 2** → `pandoc` 4 主题（article / report / reading / interactive），来自 **huashu-md-html 能力 2**。
- **Layer 3** → cover + 多点插图 + 压缩三连（baoyu-cover-image / baoyu-article-illustrator / baoyu-compress-image）。
- **Layer 4** → 若用户点名子类型就直走；否则读 md 跑推荐器，**给 1–2 个候选 + 理由，等确认**。
- **Layer 5** → 问一次："新建 slide-deck / 反解 pptx / 拆 psd？"，再分派。

### Step 5 · Per-layer preflight（阻塞式）
只在用户选了某层后才真正检查那层需要的依赖。缺了就**停**，把 `install` 命令**原样**吐给用户。

### Step 6 · Deliver
artifact 落 `清洗/output/<type>/{date}_{slug}/`，manifest 与之同目录。manifest 必含：`source` / `layer` / `intake_chain` / `capabilities_used` / `image_backend` / `cost_estimate` / `artifacts[]`，发生 danger 时还有 `danger_use`。

### Step 7 · Report
一句话：层名 + artifact 路径 + manifest 路径。

---

## Part 3 — 21 个源 Skill 逐项比对表

> 这是这份文档的核心。ncreate description 里把这些 skill 描述成"吸收了"，这里**一条都不能漏**。

### 3.1 Conversion 类（6 个）

| # | 源 skill | 源能力（完整摘录） | 在 ncreate 的落点 | 状态 | 风险 / 遗漏点 |
|---|---|---|---|---|---|
| 1 | **baoyu-compress-image** | 自动选工具压图：sips → cwebp → ImageMagick → Sharp；输出 WebP/PNG；支持 EXTEND.md 配默认 format/quality/keep-original | Layer 3 步骤 4「Compress」，产 `imgs/*.webp` + `imgs/*-thumb.jpg` | **🟡 简化** | ncreate 没暴露工具降级链、也没提 EXTEND.md 配置路径。keep-original 只在"cover 情况下"保留。**PNG 层（Layer 4）和 Slide-deck 没有显式压缩步骤**，可能出大文件 |
| 2 | **baoyu-danger-x-to-markdown** | X/Twitter 推文/Article → md + YAML frontmatter；反向 API；需 consent.json；支持的 User Input Tools 批量提问 | `references/intake.md` 的 x 适配器 + `references/danger.md` | **✅ 完整** | 同意门、consent.json 路径、manifest.danger_use 都在 |
| 3 | **baoyu-format-markdown** | 格式化但不改内容；scripts: main/quotes/autocorrect；CJK emphasis 友好；仅改格式和明显 typo；支持 EXTEND.md | 所有 intake 适配器的统一出口 | **🟠 抽象化** | ncreate 只提"run formatter"，没传达"不改内容"的硬约束，也没提 quotes/autocorrect 两个独立子脚本。EXTEND 配置链丢失 |
| 4 | **baoyu-url-to-markdown** | `baoyu-fetch` CLI（Chrome CDP）+ 站点适配器（X/YouTube/HN/Defuddle 通用）；处理登录/CAPTCHA 的 interaction wait 模式 | `references/intake.md` 的 "url 动态" 分支 | **🟡 简化** | ncreate 只把它当"动态 URL 的备选"。它**内置的 HN 线程适配器、Defuddle 通用抽取、interaction wait 模式**没在 ncreate 里以可寻址的方式保留 |
| 5 | **baoyu-youtube-transcript** | InnerTube API 直取，失败回落 yt-dlp；cover + 字幕 + chapters + 多语言 + 翻译 + speaker ID；原始数据缓存 | `references/intake.md` 的 youtube 适配器 | **🟡 简化** | 只写了"transcript.md + cover.jpg + meta.json"。**多语言、翻译、说话人识别、chapters 切分、原始缓存**都没作为入参暴露给 `/ncreate` |
| 6 | **huashu-md-html**（3 合 1） | 能力1：万物→md（markitdown，也吃 URL）；能力2：md→4 主题精美 html（pandoc）；能力3：html→md（trafilatura + html-to-markdown）；URL 分流规则：结构化页走能力1、正文页走能力3 | 能力1 → Intake.file；能力2 → Layer 2；能力3 → Intake.url 通用 | **🟡 部分简化** | **URL 的"读/查"分流判断规则**（核心价值之一）在 ncreate 被隐掉：`intake.md` 默认给所有 URL 上 trafilatura，只在"动态/403"才降级到 CDP，**没有"结构化页用 markitdown"这一层决策**。huashu 原 skill 的"反 AI slop 审美底线"也没带过来 |

### 3.2 Export 类（3 个）

| # | 源 skill | 源能力（完整摘录） | 在 ncreate 的落点 | 状态 | 风险 / 遗漏点 |
|---|---|---|---|---|---|
| 7 | **baoyu-slide-deck** | 新建幻灯片；定位是"**阅读和分享**（自解释 + 社媒友好）"而非现场演讲；每页标题+1-3 要点；内置 Image Backend 解析（runtime-native → EXTEND → 单后端自动 → 问用户）；支持 AskUserQuestion 批量提问 | Layer 5 Branch A | **🟡 简化** | "阅读 vs 演讲"的定位假设、Image Backend 多级解析、Prompt 文件硬约束全部未在 `layer-deck.md` 体现 |
| 8 | **bggg-creator-image2ppt** | 图片/截图/HTML/SVG → 可编辑 PPTX；Codex 视觉理解版式，imagegen 清理/重建组件，再用 python-pptx 拼装；强制 `projects/YYYYMMDD_slug/`；文字尽量复原为 textbox；要求 python-pptx 能重开并记录图层/文本/图片数 | Layer 5 Branch B | **🟡 简化** | "Codex 视觉 + imagegen 组件清理"的默认策略未记入；**项目子目录 `imagegen_assets/` `component_images/`** 被 ncreate 统一路径覆盖；**验证步骤（能被 python-pptx 重开 + 记录图层数）** 没落到 Verification |
| 9 | **bggg-creator-image2psd** | 图片 → 分层 PSD；scripts/image2psd.py 不依赖 Photoshop/ImageMagick；Codex 视觉判分层 + imagegen 补背景/拆主体；要求同目录产 `layer_sources/` `psd_full_canvas_layers/` `output.preview.png` `process_notes.md` | Layer 5 Branch C | **🟡 简化** | ncreate 只提"Pillow + psd-tools"，**process_notes.md** 丢失；"不改相对位置/全画布透明 PNG"这一硬策略未说明 |

### 3.3 Visual Generation 类（12 个）

#### 3.3.1 baoyu 系列（7 个）

| # | 源 skill | 源能力 | 在 ncreate 的落点 | 状态 | 风险 / 遗漏点 |
|---|---|---|---|---|---|
| 10 | **baoyu-article-illustrator** | 分析文章找插图位 → Type × Style × Palette 三维一致性；**Prompt 文件硬约束**：每张图必须先写 `prompts/NN-{type}-[slug].md`，backend 吃 prompt 文件；可重放/换后端 | Layer 3 步骤 3 | **🟠 关键约束丢失** | ncreate `layer-article.md` 只说"插入 2-5 点"，**Prompt 文件硬约束没保留** → 失去可重现性和换后端能力 |
| 11 | **baoyu-comic** | 多风格 × 多 tone；**角色设定图 characters.png**；顺序生图；合成 PDF；Image Backend 多级解析 | PNG 子类型 `comic` | **🟡 简化** | `png-subtypes.md` 只提"multi-page comic + characters.png + merged PDF"；**art style × tone 的选型对话、顺序一致性维持**未写入 |
| 12 | **baoyu-cover-image** | 5 维度：type × palette × rendering × text × mood；11 色板 × 7 渲染风格；cinematic(2.35:1)/widescreen(16:9)/square(1:1) 三比例；Prompt 文件硬约束 | Layer 3 步骤 2 + PNG.cover | **🟡 简化** | `layer-article.md` 只说"derive subject from title + first paragraph"，**11 色板 / 7 风格 / 3 aspect ratio / 5 维度表**在 ncreate 里**完全不可寻址** |
| 13 | **baoyu-danger-gemini-web** | 反向 Gemini Web：文本 + 生图 + 参考图（vision）+ 多轮对话；作为 baoyu-imagine 失败后的备选生图后端 | `references/danger.md` | **✅ 机制完整** | 同意门、manifest 记录都在；但"**支持参考图 + 多轮对话**"的能力上层没暴露 —— ncreate 调生图时只会当它是"有 key 就用 imagine，否则走 gemini"的二选一后端 |
| 14 | **baoyu-diagram** | 9 种图类型（Architecture/Flowchart/Sequence/Structural/Mindmap/Timeline/Illustrative/State Machine/Data Flow）；深色主题 SVG；**8 个语义色板**（Primary/Secondary/Tertiary/Accent/Alert/Connector/Neutral/Highlight）；单文件自包含 | PNG 子类型 `diagram` | **🟡 严重简化** | `png-subtypes.md` 只写"`source.svg` + `main.png` @2x"，**9 种图类型、8 色板、深色审美**全部被抹平。用户说"画流程图"和"画状态机"时，ncreate 不会走到这里面的类型分流 |
| 15 | **baoyu-imagine** | 10+ 生图后端（OpenAI GPT Image 2 / Azure / Google / OpenRouter / DashScope / Z.AI GLM / MiniMax / 即梦 / 豆包 / Replicate）；文生图 + 参考图 + aspect ratio + 批量并行；**Step 0 阻塞：必须先加载 EXTEND.md 偏好**；批量 vs 顺序策略 | 作为 Layer 3/4/5 的默认生图后端 | **🟠 抽象化** | ncreate 把它封装成 `image_backend` 字段。**10 个后端名字 / 各自优劣 / 批量并行开关**完全不可寻址。更关键：**"Step 0 EXTEND.md 阻塞" 没有前置到 ncreate preflight**，第一次跑就可能撞墙 |
| 16 | **baoyu-infographic** | **21 layout × 22 style** 的自由组合；分析内容后推荐 layout × style；出版级密度 | PNG 子类型 `infographic-AI` | **🔴 关键数字丢失** | `png-subtypes.md` 只写"high-density AI poster"。**21 layout + 22 style 的自由组合矩阵是这个 skill 的全部卖点**，在 ncreate 里完全没提，推荐器也不会按它来选 |

#### 3.3.2 skills-main 系列（4 个，无 API key 的模板/声明式）

| # | 源 skill | 源能力 | 在 ncreate 的落点 | 状态 | 风险 / 遗漏点 |
|---|---|---|---|---|---|
| 17 | **skills-main:architecture** | HTML/CSS 分层架构图；**单/双/三栏布局**（左栏=监控运维，右栏=安全治理）；**5 条 Critical Rules**（直接嵌 HTML 不加 fence / 禁空行 / 增量创建 / 灵活布局 / 分层组织）；语义色编码 | PNG 子类型 `architecture` | **🟠 抽象化** | ncreate 只提"HTML template → render → main.png"。**5 条 Critical Rules**（尤其"禁 fence"和"禁空行"会影响 Markdown Viewer 渲染）没有落到 gotchas/检查点。**三栏布局的语义（左=ops 右=安全）**是这个 skill 的结构级约定，也丢了 |
| 18 | **skills-main:canvas** | JSON Canvas 节点自由定位（x/y/width/height）；4 种节点 type（text/file/link/group）；6 色预设；100px 网格规划；**Obsidian Canvas 原生兼容**（`canvas.json` 可直接丢进 vault） | PNG 子类型 `canvas` | **✅ 关键点保留** | 输出契约 `canvas.json (+ 可选 rendered PNG)` 保留了可入 Obsidian 的特性。但**100px 网格、颜色预设枚举、node.type 分类**需要运行时去看原 skill |
| 19 | **skills-main:infocard** | HTML/CSS 内嵌 Markdown；**分析三维度**（Density 密度 / Structure 结构 / Mood 情绪）→ 选 palette；5 条 Critical Rules；从 ≤50 字"big-character"到 200+ 字"多列不等分"都有对应 layout | PNG 子类型 `infocard` | **🟡 简化** | ncreate 仅描述"editorial single-topic card"。**Density×Structure×Mood 三维分析模型**（这个 skill 的核心推荐器逻辑）没进 ncreate 的自动推荐器 |
| 20 | **skills-main:infographic** | **基于模板**（注意：空格分隔 key-value，**不是 YAML**）；**50+ 模板**覆盖 list-grid / timeline / sequence / funnel / compare / SWOT / quadrant / hierarchy / pie / bar / line / wordcloud / relation 等 | PNG 子类型 `infographic-template` | **🔴 严重丢失** | `png-subtypes.md` 只说"KPI/timeline/SWOT/funnel templates"，**50+ 模板名字一个都没落到 ncreate**。推荐器"dense numbers → infographic-template"这条触发了之后，ncreate **不知道应该在 50+ 模板中选哪个**，得回到原 skill 重查 |
| 21 | **skills-main:mindmap** | PlantUML `@startmindmap`；两种标记风格（`*` 或 `+/-` 左右分支）；方向关键字（`top to bottom` / `right to left`）；多行节点块；`*[#Orange]` 内联颜色 / `<style>`+stereotype 重用主题；Creole 富文本 + 图标 | PNG 子类型 `mindmap` | **🟡 简化** | ncreate 只说"`source.puml` → `main.png`"。**两种标记风格 / 左右分支 / 方向关键字 / 内联着色**都得回到原 skill 翻文档 |

---

## Part 4 — 遗漏风险总结（TL;DR）

### 🔴 必须补（影响产出正确性）
1. **baoyu-infographic 的 21×22 矩阵** — 推荐器选到 `infographic-AI` 后，没有足够信息挑组合。
2. **skills-main:infographic 的 50+ 模板清单** — 推荐器选到 `infographic-template` 后，模板名不可寻址。
3. **baoyu-article-illustrator 的 Prompt 文件硬约束** — 丢了就丢了可重现性，也失去换后端能力。
4. **baoyu-imagine 的 "Step 0 EXTEND.md 阻塞"** — 应该前置到 preflight.md 的 Layer 3/4/5 依赖项，否则第一次跑生图必撞。

### 🟠 建议补（影响调度质量）
5. **huashu 的"URL 读 vs 查"分流规则** — 结构化页走 markitdown、正文页走 trafilatura，现在 ncreate 只分"静态 vs 动态"。
6. **baoyu-cover-image 的 11 色板 × 7 风格 × 3 比例 × 5 维度表** — 现在 layer-article.md 只会"从标题+首段派生"，自由度完全丢了。
7. **baoyu-diagram 的 9 类图 × 8 色板** — `png-subtypes.md` 的 diagram 行应该能按"流程/时序/状态机"再细分。
8. **skills-main:architecture 的 5 条 Critical Rules** — 至少"禁 fence"和"禁空行"要进 gotchas.md，否则产出的 HTML 渲不出来。

### 🟡 可不补（信息仍可通过 layer ref 拿到，但不够显眼）
9. baoyu-compress-image 工具降级链。
10. baoyu-youtube-transcript 多语言/翻译/说话人识别/chapters。
11. baoyu-url-to-markdown 的 HN / Defuddle / interaction-wait 三个模式。
12. baoyu-format-markdown 的 quotes / autocorrect 子脚本、"不改内容"硬约束。
13. baoyu-slide-deck 的"阅读而非演讲"定位假设。
14. bggg-creator-image2ppt/psd 的 process_notes.md + 验证步骤（PPTX 能被 python-pptx 重开）。
15. baoyu-comic 的 art style × tone 选型对话。
16. skills-main:canvas 的 100px 网格 / 颜色预设 / node.type 枚举。
17. skills-main:infocard 的 Density × Structure × Mood 三维推荐模型。
18. skills-main:mindmap 的两种标记风格 / 方向关键字 / 内联色。

### ✅ 完整继承
19. baoyu-danger-x-to-markdown（consent 机制、manifest.danger_use）。
20. baoyu-danger-gemini-web 的**同意机制**（但能力面只剩"备用生图"，vision/多轮能力没暴露）。
21. skills-main:canvas 的 Obsidian 原生兼容属性。

---

## Part 5 — 一句话评价

ncreate 把 **21 个零散 skill 的"调度层"统一了**（路径、manifest、consent、preflight、五层模型清晰），代价是**"参数层"大幅压扁**：21 × 22 模板、5 维 cover、9 图类 × 8 色板、3 aspect ratio、Prompt 文件硬约束、EXTEND.md 偏好、URL 读/查分流 —— 这些**决定产出质量的枚举和硬规则**在 ncreate 的 references 里不可寻址，第一次触发时 agent 会落到"默认值"上。

建议优先把 **🔴 4 条** 补进 `references/png-subtypes.md` 和 `references/preflight.md`，然后把 **🟠 4 条** 补进 `layer-article.md` / `layer-html.md` / `gotchas.md`。其他 🟡 条目可以作为"按需回查原 skill 文件"的脚注。

---

_本文档由 `/repeat` 语境下的比对任务生成；源 skill 副本位于 `/Users/saaaaa/Desktop/项目/skill-plans/02-ncreate/references/`；ncreate 本体位于 `/Users/saaaaa/.claude/skills/ncreate/`。_
