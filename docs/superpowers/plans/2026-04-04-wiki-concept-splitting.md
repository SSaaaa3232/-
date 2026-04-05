# Wiki 概念拆分与层级映射系统 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在现有 vault 内实现 AI 驱动的概念拆分流程，涵盖 /compile Skill 升级、概念卡片模板演进、现有文件迁移、Dataview 辅助查询。

**Architecture:** 复用现有 `01-polaris/skills/` 目录挂载新 compile Skill；所有概念数据以 Markdown 文件为唯一事实来源；Dataview 仅负责可视化已知关系。

**Tech Stack:** Obsidian /compile Skill、Dataview 插件（可选）、Markdown frontmatter

---

## Task 1：创建新版 compile Skill

**Files:**
- Create: `01-polaris/skills/compile.md`

---

- [ ] **Step 1: 创建 skills 目录**

```bash
mkdir -p 01-polaris/skills
ls 01-polaris/skills/
```

Expected: 目录存在（skills.md 已在前面创建）

---

- [ ] **Step 2: 写入 compile.md Skill 文件**

```markdown
# Compile Skill

将 02-raw/ 下的原始资料编译为 wiki 结构：summary → concept → index。

## 执行入口

`/compile [日期]` 或 `/compile [02-raw/路径]`
例如：`/compile 2026/04/` 或 `/compile 02-raw/articles/2026/04/`

## 编译流程

### Step 1: 读取与摘要（自主）
1. 扫描目标路径下的所有 02-raw 文件
2. 对每个文件生成 summary，写入 `03-wiki/summaries/[镜像路径]/文件名.md`
3. summary frontmatter 必须包含：
   - `source: [[02-raw/实际路径]]`（指向原始文件）
   - `date: YYYY-MM-DD`
   - `tags:`（主题标签）

### Step 2: 概念提取（自主 ≤ 2 层，审批 > 2 层）
1. 从 summary 正文中识别所有可独立成卡的概念
2. 为每个概念决定：
   - **名称**：从内容提炼，不超过 8 字
   - **分类路径**：如 `AI/Claude-Code/结构拆解`
3. 分类决策规则：
   - 路径深度 ≤ 2 层且顶层分类已存在 → 自主决定
   - 路径深度 > 2 层 → 暂停汇报，等待审批
   - 新建顶层分类 → 暂停汇报，等待审批

### Step 3: 概念写卡（自主）
- 已存在 concept 文件 → 追加到 `sources:` 和 `关联概念:`，不覆盖已有内容
- 不存在 → 按 Concept 模板（见下方）新建

### Step 4: 共现链接（自动，无需审批）
同一 summary 的 `sources:` 中出现 N 个 concept → 两两之间在各方 `关联概念:` 中写入：
```
- [[../目标concept]] — 共现（来源同一篇文章）
```

### Step 5: 推理链接（context/uses 自主，derives/parent/contrasts 审批）
1. 扫描所有 concept 文件，根据来源共性和语义判断关联类型
2. 关系类型定义：
   - `context` — 背景关联，共享上下文
   - `uses` — 使用关系，A 使用 B 的能力
   - `derives` — 派生关系，A 从 B 派生
   - `parent` — 上下位关系，A 是 B 的上位概念
   - `contrasts` — 对比关系，A 与 B 相对立
3. 写入规则：
   - `context` / `uses` → 自主写入
   - `derives` / `parent` / `contrasts` → 暂停汇报审批，批准后写入

### Step 6: 索引更新（自主）
- 更新 `03-wiki/indexes/All-Sources.md` — 追加新来源
- 更新 `03-wiki/indexes/All-Concepts.md` — 追加新概念、更新统计数字

## 审批汇报格式

遇到需要审批的情况，按以下格式汇报：

```
⚠️ 需要审批：[类型]
- 操作：...
- 详情：...
- 候选方案：A / B / C
```

等待用户回复后再继续。

## Concept 模板

```markdown
---
tags:
  - AI
category: AI/Claude-Code/结构拆解
sources:
  - [[02-raw/articles/2026/04/原文件]]
relations:
  - [[../MCP]]          # 共现 / context → 自主
  - [[../Agent]]       # uses → 自主
---

# 概念名

## 定义
一句话说明

## 详细解释
2-3 句展开

## 证据来源
1. [[02-raw/.../文件]] - 关键引用

## 关联概念
- [[../目标]] — 关系类型（理由）

## 我的理解
（个人思考）

## 不确定性
（存疑点）
```

## 错误处理

| 场景 | 处理 |
|------|------|
| 同一概念被多次编译 | 追加到 sources:，合并关联概念，不重复写文件 |
| A↔B 双向链接 | 写入时检查，已存在则跳过 |
| 编译路径无新内容 | 报告"已是最新"，不做写入 |
| 分类冲突 | 以最新为准，覆盖 category，保留原 sources: |
```

---

- [ ] **Step 3: 验证文件格式正确**

```bash
head -20 01-polaris/skills/compile.md
```

Expected: 文件存在，内容包含 `# Compile Skill` 和 6 个 Step 标题

---

- [ ] **Step 4: 提交**

```bash
git add 01-polaris/skills/compile.md
git commit -m "$(cat <<'EOF'
feat(skills): add compile skill with 6-step wiki concept workflow

Implements AI-driven concept extraction, co-occurrence linking,
inference linking with approval gates, and index updates.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2：创建 Dataview 辅助查询

**Files:**
- Create: `03-wiki/indexes/by-source.md`
- Create: `03-wiki/indexes/by-relation.md`

---

- [ ] **Step 1: 写入 by-source.md（按来源查询所有引用它的 concept）**

```markdown
# Concepts by Source

> 自动生成 — 请勿手动编辑

---

## 按来源查看概念

```dataview
TABLE sources, category, file.ctime AS created
FROM "03-wiki/concepts"
FLATTEN file.etags AS sources
WHERE sources != ""
GROUP BY sources
```

---

## 最近新增的概念

```dataview
TABLE category, length(sources) AS 引用来源数
FROM "03-wiki/concepts"
SORT file.ctime DESC
LIMIT 20
```
```

---

- [ ] **Step 2: 写入 by-relation.md（按关系类型查看概念网络）**

```markdown
# Concepts by Relation Type

> 自动生成 — 请勿手动编辑

---

## 所有概念及其关系数量

```dataview
TABLE category, length(relations) AS 关联数
FROM "03-wiki/concepts"
WHERE category
SORT length(relations) DESC
LIMIT 30
```
```

---

- [ ] **Step 3: 验证文件创建成功**

```bash
ls 03-wiki/indexes/
```

Expected: 包含 by-source.md 和 by-relation.md

---

- [ ] **Step 4: 提交**

```bash
git add 03-wiki/indexes/by-source.md 03-wiki/indexes/by-relation.md
git commit -m "$(cat <<'EOF'
feat(wiki): add Dataview queries for by-source and by-relation views

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3：迁移现有 concept 文件到新模板

**Files:**
- Modify: `03-wiki/concepts/AI/Claude-Code/Agent.md`
- Modify: `03-wiki/concepts/AI/Claude-Code/MCP.md`
- Modify: `03-wiki/concepts/AI/Claude-Code/REPO.md`
- Modify: `03-wiki/concepts/AI/Vibe-Design-Stitch.md`
- Modify: `03-wiki/concepts/AI/本地部署.md`
- Modify: `03-wiki/concepts/AI/学习路径.md`

---

对每个文件执行以下迁移步骤（以 Agent.md 为例，其他文件同理）：

### Agent.md 迁移

- [ ] **Step 1: 读取 Agent.md 当前内容**

```bash
cat 03-wiki/concepts/AI/Claude-Code/Agent.md
```

---

- [ ] **Step 2: 补充 frontmatter**

如果缺少 `category` 字段，添加：
```yaml
category: AI/Claude-Code/Agent
```

如果缺少 `relations` 字段，添加空数组（后续编译时填充）：
```yaml
relations: []
```

---

- [ ] **Step 3: 在"关联概念"部分补充关系类型标注**

将无类型的链接：
```markdown
## 关联概念
- [[../MCP]]
```

改为带类型的：
```markdown
## 关联概念
- [[../MCP]] — uses（MCP 为 Agent 提供工具调用能力）
```

---

- [ ] **Step 4: 提交**

```bash
git add 03-wiki/concepts/AI/Claude-Code/Agent.md
git commit -m "refactor(concepts): migrate Agent.md to new template with category and relations"
```

### MCP.md、REPO.md、Vibe-Design-Stitch.md、本地部署.md、学习路径.md

对每个文件重复 Step 1-4，commit message 改为对应文件名。

---

## Task 4：更新 All-Concepts.md 格式

**Files:**
- Modify: `03-wiki/indexes/All-Concepts.md`

---

- [ ] **Step 1: 读取当前内容**

```bash
cat 03-wiki/indexes/All-Concepts.md
```

---

- [ ] **Step 2: 更新格式，在每个概念链接旁加上 category 标注**

当前格式：
```markdown
## 🤖 AI
- [[../concepts/AI/Claude-Code/Agent]]
- [[../concepts/AI/Claude-Code/MCP]]
```

更新为：
```markdown
## 🤖 AI

### Claude Code
- [[../concepts/AI/Claude-Code/Agent]] — `AI/Claude-Code/Agent`
- [[../concepts/AI/Claude-Code/MCP]] — `AI/Claude-Code/MCP`

### 其他
- [[../concepts/AI/Vibe-Design-Stitch]] — `AI/Vibe-Design-Stitch`
```

---

- [ ] **Step 3: 提交**

```bash
git add 03-wiki/indexes/All-Concepts.md
git commit -m "refactor(indexes): update All-Concepts format with category paths"
```

---

## Task 5：端到端验证

---

- [ ] **Step 1: 执行一次完整编译测试**

```bash
# 在 Claude Code 中执行（假设当前已在 vault 目录）
# 触发 compile skill，编译一个已有 summary 的文章
/compile 2026/04/
```

---

- [ ] **Step 2: 验证输出**

检查以下文件是否正确生成/更新：

1. `03-wiki/summaries/articles/2026/04/从零开始两天构建一个ClaudeCode.md`
   - 包含 `source:` frontmatter 指向 raw 文件
   - 包含 TL;DR 和核心结论
2. `03-wiki/concepts/` 下是否有新增 concept 文件（AI 根据文章内容自主提取）
3. `03-wiki/indexes/All-Concepts.md` 统计数字是否更新

---

- [ ] **Step 3: 如有审批触发，验证汇报格式**

如果 AI 触发了审批，验证汇报包含：
- ⚠️ 标记
- 操作类型
- 详情
- 候选方案

---

- [ ] **Step 4: 最终提交**

```bash
git status
git log --oneline -5
```

---

## 自我检查清单

- [ ] 所有文件路径为相对路径（vault 根为基准）
- [ ] compile Skill 包含全部 6 个 Step 的完整描述
- [ ] Concept 模板包含 `category` 和 `relations` 字段
- [ ] 审批触发规则覆盖 5 种场景
- [ ] Dataview 查询语法正确（table + from + where）
- [ ] 所有现有 concept 文件已迁移到新模板
- [ ] commit message 符合规范（feat/refactor/chore 前缀）
