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
3. 分类决策规则（**深度口径**：指 concept 文件所在目录的 category 层级，文件自身名称不计入）：
   - category 字段如 `AI/Claude-Code/Agent-Loop` → 目录层级为 `AI/Claude-Code`（depth=2）→ **自主**
   - category 字段如 `AI/Claude-Code/架构/Agent-Loop` → 目录层级为 `AI/Claude-Code/架构`（depth=3）→ 暂停汇报审批
   - 新建顶层分类（如 `量子计算`）→ 暂停汇报审批

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

---

## Synthesis 问答回写规范

### 触发条件

Query 过程中，当 AI 认为答案符合以下任一条件时，主动建议写回 wiki：

- **对比分析**：比较 ≥ 2 个来源或 ≥ 2 个概念的差异/共性
- **新洞见**：综合多个来源后产生的原文未直接表达的结论
- **Gap 发现**：识别出知识盲区或未被覆盖的主题
- **框架提炼**：把散落在多处的方法论提炼成统一框架

### 判断标准

| 条件 | 说明 |
|------|------|
| 跨 ≥ 2 个 concept 页面 | 涉及多个已有概念的交叉分析 |
| 引用 ≥ 3 个来源 | 有足够的证据支撑 |
| 非显而易见 | 不是简单的摘录或总结，而是新产生的洞察 |

### Synthesis 模板

```markdown
---
type: synthesis
tags:
  - 主题
created: YYYY-MM-DD
sources:
  - [[02-raw/articles/YYYY/MM/源1]]
  - [[02-raw/articles/YYYY/MM/源2]]
related-concepts:
  - [[../concepts/AI/Agent]]
  - [[../concepts/AI/MCP]]
---

# 分析标题

## 背景
这次分析解决的问题是什么？

## 关键发现
1. ...
2. ...
3. ...

## 来源证据
- [[02-raw/...]] — 关键引用或数据点
- [[02-raw/...]] — 另一个角度

## 分析过程
（AI 的推理路径：为什么得出这个结论）

## 我的理解
（基于个人上下文的应用思考）

## 开放问题
- 还有什么不确定的地方
- 下一步值得研究的方向
```

### 写入路径

```
03-wiki/synthesis/[顶层分类]/YYYY-MM-DD-分析标题.md
```

示例：
```
03-wiki/synthesis/AI/2026-04-07-Agent-vs-MCP对比分析.md
```

### 索引更新

写入 synthesis 后，更新 `03-wiki/indexes/All-Synthesis.md`：
- 在对应主题下追加一行带链接的条目
- 更新统计数字

### log 记录

写入 synthesis 后，追加到 `03-wiki/log.md`：
```
## [YYYY-MM-DD] synthesis | 分析标题
- 操作人: AI
- 涉及来源: [N] 个
- 涉及概念: [N] 个
- 路径: [[../synthesis/主题/YYYY-MM-DD-分析标题]]
```

### 回写时机

- **实时写回**：Query 结束后立即写回（适合对比分析、明确洞见）
- **批量写回**：每周整理一次本周的 qa 输出，批量生成 synthesis（适合积累式洞见）
