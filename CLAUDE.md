# Personal Wiki — LLM Wiki

Mode: D + E + F（个人第二大脑 · 学术研究 · 读书/课程）
Purpose: 学习、研究与个人成长的复利知识库
Owner: Anonymous
Created: 2026-04-17

---

## Structure

```
vault/
├── .raw/
│   ├── articles/       # 文章剪藏
│   ├── papers/         # 论文 PDF / 转换 md
│   ├── highlights/     # 书摘、划线
│   ├── transcripts/    # 视频/播客转录
│   └── assets/         # 附件
│
├── wiki/
│   │
│   ├── index.md        # 主目录
│   ├── log.md          # 操作日志（追加，新条目在顶部）
│   ├── hot.md          # 热缓存（~500词近期摘要）
│   ├── overview.md     # 全局概述
│   │
│   ├── goals/          # [D] 目标管理
│   ├── areas/          # [D] 生活领域
│   ├── people/         # [D/F] 人物
│   ├── resources/      # [D/F] 资源（书单/工具/课程推荐）
│   │
│   ├── papers/         # [E] 论文摘要
│   ├── concepts/       # [E/F] 概念
│   ├── thesis/         # [E] 综述（演化中的综合观点）
│   ├── gaps/           # [E] 开放问题 / 矛盾点
│   │
│   ├── books/          # [F] 书籍笔记
│   ├── courses/        # [F] 课程笔记
│   ├── themes/         # [F] 跨书/课程主题线索
│   ├── synthesis/      # [E/F] 个人提炼与应用
│   │
│   ├── sources/        # 所有来源摘要页
│   ├── entities/       # 人物、机构、产品
│   ├── domains/        # 顶层领域
│   ├── comparisons/    # 横向对比
│   ├── questions/      # 存档问答
│   └── meta/           # 仪表盘、lint 报告
│
├── _templates/         # Templater 模板
├── _attachments/       # 图片、PDF 引用
└── .obsidian/          # Obsidian 配置（不要手动修改）
```

---

## Conventions

- 所有笔记使用 YAML frontmatter：type / status / created / updated / tags（最少字段）
- 链接使用 `[[Note Name]]` 格式，文件名唯一，无需路径
- `.raw/` 存放原始文件，**永远不修改内容**；**唯一例外**：ingest 完成后在文件头部追加 ingest 标记 frontmatter：
  ```yaml
  ---
  ingested: YYYY-MM-DD
  wiki_page: "[[Wiki Page Name]]"
  ---
  ```
  增量 ingest 前先检查文件是否已有 `ingested` 字段，有则跳过
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

- **Ingest**：把源文件放入 `.raw/`，说 "ingest [文件名]"
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
