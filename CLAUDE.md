---
aliases:
owner: Nezikk
Create: 2026-04-17
modified: 2026-05-18
purpose: 学习、研究与个人成长的复利知识库
---
# WIKI-LLM
---

## Structure

> 本 vault 的原始资料入口以用户现有的 `raw/` 人工分类为准。不要按 `WIKI.md` 的默认 `.raw/` 模式重排资料；不要自动移动用户已归类的 raw 文件。

```
vault/
├── raw/                              # 主用原始资料区：用户手动归类，ingest 时尊重现有路径
│   ├── 1/                            # 临时/待细分资料
│   │   └── skill building/
│   ├── TED/
│   ├── articles/                     # 通用文章剪藏
│   ├── paper/                        # 论文/学术资料原文
│   ├── 个人👤/                       # 个人第二大脑资料
│   │   ├── Agent/
│   │   │   ├── tips/
│   │   │   └── 模式/
│   │   ├── 行为/
│   │   │   ├── Study/
│   │   │   │   ├── prompt/
│   │   │   │   └── 方法论/
│   │   │   ├── memory/
│   │   │   ├── 投资理财/
│   │   │   ├── 旅游/
│   │   │   │   └── 日本🇯🇵/
│   │   │   ├── 读书/
│   │   │   │   └── prompt/
│   │   │   └── 调研/
│   │   │       ├── skill/
│   │   │       └── 分析/
│   │   │           ├── Skills-Analysis/
│   │   │           └── 人物/
│   │   │               └── Cat wu/
│   │   └── 认知/
│   └── 团队team/                     # 团队/工程/方法论资料
│       ├── cc/
│       ├── hermes/
│       ├── skill/
│       ├── 技术/
│       │   └── Maestro/
│       └── 方法论/
│           ├── LLM-wiki method/
│           └── 模式/
│
├── .raw/                             # 旧版/外部工具遗留入口；非主用，除非用户明确指定，否则不要写入
│
├── wiki/
│   ├── index.md                      # 主目录
│   ├── log.md                        # 操作日志（追加，新条目在顶部）
│   ├── hot.md                        # 热缓存（~500词近期摘要）
│   ├── overview.md                   # 全局概述
│   ├── goals/                        # [D] 目标管理
│   ├── areas/                        # [D] 生活领域
│   ├── people/                       # [D/F] 人物
│   ├── resources/                    # [D/F] 资源（书单/工具/课程推荐）
│   ├── papers/                       # [E] 论文摘要
│   ├── concepts/                     # [E/F] 概念
│   ├── thesis/                       # [E] 综述（演化中的综合观点）
│   ├── gaps/                         # [E] 开放问题 / 矛盾点
│   ├── books/                        # [F] 书籍笔记
│   ├── courses/                      # [F] 课程笔记
│   ├── themes/                       # [F] 跨书/课程主题线索
│   ├── synthesis/                    # [E/F] 个人提炼与应用
│   ├── sources/                      # 所有来源摘要页
│   ├── entities/                     # 人物、机构、产品
│   ├── domains/                      # 顶层领域
│   ├── comparisons/                  # 横向对比
│   ├── questions/                    # 存档问答
│   └── meta/                         # 仪表盘、lint 报告
│
├── _templates/                       # Templater 模板
├── image/                            # 图片统一目录（/image skill 维护）
├── _attachments/                     # 其他附件/PDF 引用
└── .obsidian/                        # Obsidian 配置（不要手动修改）
```

---

## Conventions

- 所有笔记使用 YAML frontmatter：type / status / created / updated / tags（最少字段）
- 链接使用 `[[Note Name]]` 格式，文件名唯一，无需路径
- `raw/` 是主用原始文件区，由用户手动归类；ingest 时**尊重现有目录结构**，不要自动搬运、重命名或改分类
- `.raw/` 仅视为旧版/外部工具遗留入口；除非用户明确指定，否则不要要求用户把资料放入 `.raw/`，也不要主动写入 `.raw/`
- `raw/` 中的原始资料原则上**永远不改正文内容**；**唯一例外**：ingest 完成后必须立即在文件头部追加 ingest 标记 frontmatter，用作防重复编译标签：
  ```yaml
  ---
  ingested: YYYY-MM-DD
  wiki_page: "[[Wiki Page Name]]"
  raw_path: "raw/现有分类/文件名.md"
  ---
  ```
  增量 ingest 前先检查文件是否已有 `ingested` 字段，有则跳过
- 防重复规则：批量或单篇 ingest 前必须先扫描 `raw/` 文件 frontmatter；只要存在 `ingested:` 字段就跳过，不再重复生成 source page 或重复编译。
- `wiki/index.md` 是主目录，每次 ingest 后更新
- `wiki/log.md` 只追加，新条目放在**顶部**，不编辑过去条目
- `wiki/hot.md` 每次操作后更新，保持 ~500 词

---

## Frontmatter 快速参考

| type | 专属字段 |
|------|---------|
| concept | complexity, domain, aliases |
| source | source_type, author, date_published, url, confidence, key_claims |
| entity | entity_type, role, first_mentioned |
| goal | area, priority, target_date, progress |
| paper | year, authors, venue, key_claim, methodology, contradicts, supports |
| book | author, year, progress, rating, key_themes |
| course | platform, instructor, progress, started, completed |
| comparison | subjects, dimensions, verdict |
| question | question, answer_quality |

---

## Operations

- **Ingest**：把源文件放入 `raw/` 下你自己的分类目录，然后说 `ingest raw/分类/文件名.md` 或 `ingest @文件名.md`
- **Ingest 原则**：不按 `.raw/` 默认模式重排；不移动原文；用 `raw_path` 记录来源路径；按内容生成/更新 `wiki/sources/`、`wiki/concepts/`、`wiki/entities/` 等页面
- **Query**：直接提问，Claude 先读 hot.md → index.md → 相关页
- **Lint**：说 "lint the wiki" 进行健康检查
- **Save**：说 "/save" 或 "save this" 把当前对话存档
- **Autoresearch**：说 "/autoresearch [主题]" 启动深度研究循环

---

## Callout 类型

| Callout | 含义 |
|---------|------|
| `> [!key-insight]` | 核心洞察 |
| `> [!contradiction]` | 矛盾点（同时标记另一个页面）|
| `> [!gap]` | 需要更多证据 |
| `> [!stale]` | 可能过时，需要验证 |
| `> [!action]` | 可以立即行动的要点 |
