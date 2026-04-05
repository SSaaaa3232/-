# Wiki 概念拆分与层级映射系统 — 设计文档

> 日期：2026-04-04
> 状态：已批准

---

## 一、系统定位

**一句话**：在现有 vault 流程（raw → summaries → concepts → indexes）内，新增 AI 自主决策层，负责把一篇 summary 中识别出的多个概念分别写卡、建立显式反向链接，并按需演进层级结构。

**与现有流程的关系**：

```
02-raw/       原始资料（只读）
    ↓
03-wiki/summaries/    摘要（镜像 raw 结构）
    ↓ 新增：AI 自主拆分
03-wiki/concepts/     概念卡片（按主题层级）
    ↓
03-wiki/indexes/      All-Concepts / All-Sources
```

这个系统不改变 raw 和 summaries 的位置，只在 **summaries → concepts** 这一步注入 AI 决策能力。

---

## 二、核心原则

1. **单一来源原则**：所有概念文件（`.md`）是唯一事实来源。AI Skill 读取它们、更新它们，不额外维护 JSON 或数据库。
2. **自主决策 + 审批挂起**：AI 自主处理单概念、单分类、单层内链接；跨领域链接、新建顶层分类、删除已有概念需审批。
3. **共现即链接**：同一篇 summary 的 `sources:` 里出现两个 concept，它们之间自动建立"共现"链接，无需推理。
4. **推理链接有类型**：AI 推理出的关联关系标注类型：`uses`（使用）、`derives`（派生）、`contrasts`（对比）、`context`（背景）、`parent`（上下位）。
5. **层级演进保守**：新建中间分类（如 `AI/Agent/架构`）需要审批；新建顶层分类（如 `量子计算`）也需要审批；删除节点需全部审批。

---

## 三、AI Skill 工作流

每次执行 `/compile [路径]` 或 `/compile [日期]`，AI 依次执行以下步骤：

### Step 1：读取与摘要
- 读取 `02-raw/` 下所有目标文件
- 生成 summary 写入 `03-wiki/summaries/YYYY/MM/文件名.md`
- summary 的 `sources:` frontmatter 指向原始文件

### Step 2：概念提取（自主）
- AI 从 summary 正文中识别所有可独立成卡的概念
- 每个概念决定：名称（从 summary 内容中提炼，不超过 8 字）、分类路径（如 `AI/Claude-Code/结构拆解`）
- 分类决策阈值：分类路径深度 ≤ 2 层且顶层分类已存在 → 自主；否则 → 审批

### Step 3：概念写卡（自主）
- 已有 concept 文件 → 追加到 `sources:` 和 `关联概念:`
- 无 concept 文件 → 按模板新建

### Step 4：共现链接（自动）
- 同一 summary 的 `sources:` 中有 N 个 concept → 它们两两之间建立"共现"链接
- 直接写入各 concept 文件的 `关联概念:` 段，无需审批

### Step 5：推理链接（自主 + 审批）
- AI 扫描所有 concept 文件，根据来源共性和语义判断关联类型
- `context` / `uses` 类型 → 自主写入
- `derives` / `parent` / `contrasts` 类型 → 审批后写入

### Step 6：索引更新（自主）
- 更新 `All-Sources.md` 和 `All-Concepts.md`
- 统计数字自动计算

---

## 四、概念文件模板（演进版）

在现有模板基础上，新增 `category` 和 `relations` 字段：

```markdown
---
tags:
  - AI
category: AI/Claude-Code/结构拆解   # 层级路径
sources:
  - [[02-raw/articles/2026/04/文章1]]
  - [[02-raw/articles/2026/04/文章2]]
relations:
  - [[../MCP]]           # 共现 / context → 自主写入
  - [[../Agent]]         # uses → 自主写入
  - [[../../投资理财/BTC]]  # derives → 审批后写入
---

# Agent Loop

## 定义
一句话说明是什么

## 详细解释
2-3 句展开

## 证据来源
1. [[02-raw/articles/.../文章1]] - 关键引用
2. [[02-raw/articles/.../文章2]] - 另一个角度

## 关联概念
- [[../MCP]] — context（共享同一篇架构文章）
- [[../Agent]] — uses（MCP 为 Agent 提供工具调用能力）
- [[../../投资理财/BTC]] — derives（其令牌机制与 DeFi 协议存在概念派生关系）⚠️审批

## 我的理解
（个人思考）

## 不确定性
（存疑点）
```

---

## 五、审批触发规则

当 AI 在编译过程中遇到以下情况，**暂停并向用户汇报**：

| 触发条件 | 汇报内容 |
|---------|---------|
| 发现新顶层分类（如"量子计算"） | 新分类名称 + 来自哪篇文章 + 首批概念候选 |
| 新建中间分类（如 `AI/Agent/架构`） | 分类路径 + 父分类 + 首批概念候选 |
| 跨领域推理链接（`derives` / `parent` / `contrasts`） | 源 concept、目标 concept、推理依据 |
| 概念合并（两个概念被判断为同一事物） | 两个概念名 + 合并建议（保留哪个、废弃哪个） |
| 概念删除 | 被删 concept 名 + 删除原因 + 受影响链接列表 |

---

## 六、与现有系统的集成

**Dataview 辅助层**（可选启用）：
- `03-wiki/indexes/` 中放 Dataview 查询文件（如 `by-source.md`），自动渲染"某篇文章被哪些 concept 引用"
- 不做推理，只做**已知关系的可视化**

**Skill 挂载点**：
- 复用现有 `/compile` 命令
- 触发词：`/compile [日期]` 或 `/compile [02-raw/路径]`
- 无需新插件

---

## 七、错误与边界处理

| 场景 | 处理方式 |
|------|---------|
| 同一概念被多次编译（不同文章） | 追加到 `sources:`，合并 `关联概念:`，不重复写文件 |
| 概念 A 链接 B，B 也链接 A | AI 写入时检查，已存在则跳过；Dataview 层去重显示 |
| 编译路径下无新内容 | AI 报告"已是最新"，不做任何写入 |
| 分类冲突（AI 两次编译给了不同分类） | 以最后一次为准，写入时覆盖 `category` 字段，保留原 `sources:` |
