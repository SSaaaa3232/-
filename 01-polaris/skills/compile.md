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
