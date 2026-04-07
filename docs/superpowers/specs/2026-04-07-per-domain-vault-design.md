---
created: 2026-04-07
modified: 2026-04-07
category: uncategorized
---
# Per-Domain Vault 设计方案

> 日期：2026-04-07
> 状态：设计方案，待审批
> 背景：当前 vault 为统一架构，所有领域（AI/Agent、个人成长、金融）共用一个 wiki；参考 Nick Spisak Part 2 的"专用第二大脑"理念，设计分域策略。

---

## 现状分析

当前单一 vault 的问题（Nick Spisak 称之为"junk drawer"）：

| 问题 | 说明 |
|------|------|
| 概念稀释 | 20 个领域混在一个 concept/ 下，AI 查询时噪声大 |
| 积累稀释 | 复利效果被分散，每个领域只有零星积累 |
| 领域交叉 | AI vs 金融 几乎无关，放一起浪费上下文 |
| 增长瓶颈 | 单 vault 超过 ~100 篇 summary 后，lint 和维护成本陡增 |

---

## 设计原则

1. **不提前拆分**：先用当前统一 vault 跑通 Ingest/Query/Lint/Synthesis 完整闭环，验证体系稳定后再拆分
2. **拆分阈值**：单一领域积累 ≥ 30 篇 summary **或** 领域内 concept ≥ 20 个时，考虑独立 vault
3. **迁移优先复制，不优先移动**：拆分时 concept/summary 留在原 vault，新增内容走新 vault
4. **跨域链接保留**：使用 Obsidian 的外部 vault 链接（`vault://vault-name/path`）维护跨 vault 关系

---

## 候选领域评估

| 领域 | 当前规模 | 独立收益 | 拆分优先级 |
|------|---------|---------|-----------|
| AI / Agent / Claude Code | ★★★ 高 | 极高（迭代快，需高频 lint） | P1 |
| 合成生物 + AI 赋能 | ★★ 中 | 高（主业，专业性强） | P2 |
| 投资理财 | ★★ 中 | 高（与 AI 领域完全正交） | P2 |
| 个人成长 / 自我提升 | ★ 低 | 中（与主副业均有交叉） | P3 |
| X 内容创作 | ★ 低 | 中（输出导向，适合独立） | P3 |

**推荐优先拆分：AI/Agent 领域**

理由：该领域积累最快、迭代最频繁、与其他领域交叉最少，拆分后复利效果最显著。

---

## 独立 Vault 模板

每个领域 vault 的标准结构（与当前 vault 一致，减少认知负担）：

```
vault-[domain]/
├── 02-raw/
│   └── articles/YYYY/MM/
├── 03-wiki/
│   ├── summaries/
│   ├── concepts/
│   ├── synthesis/
│   ├── indexes/
│   └── log.md
├── 04-outputs/
│   ├── qa/
│   └── health/
└── CLAUDE.md          # 领域专属 schema
```

### CLAUDE.md 领域化改造

在通用 CLAUDE.md 基础上，替换以下字段为领域特定内容：

```markdown
# 替换为领域专属描述
## 身份
- 领域：[AI/Agent 专家]
- 主业：[具体领域]

# 替换为领域相关主题
## 我的研究重点
- Agent 架构
- Claude Code 最佳实践
- ...

# 替换为领域输出风格
## 输出标准
- 术语优先使用英文原词
- 结论需附 GitHub/论文来源
```

---

## 跨 Vault 关系维护

### 外部链接语法

Obsidian 支持跨 vault 链接：
```
[[vault-ai:03-wiki/concepts/AI/Agent]]
```

当 Query 需要引用其他 vault 的内容时，通过外部 vault 链接跳转。

### 中心 hub（推荐）

在当前 `Obsidian-Template` vault 中维护一个 `00-hub/` 目录：

```
00-hub/
├── index.md              # 所有 vault 总览
├── vault-ai.md           # AI/Agent vault 概览
├── vault-bio.md          # 合成生物 vault 概览
└── cross-vault-log.md    # 跨 vault 重要决策记录
```

每个 hub 页面内容：
```markdown
# AI/Agent Vault

- 状态：活跃
- 规模：N 篇 summary，N 个 concept
- 最新 synthesis：[[vault-ai:03-wiki/synthesis/...]]
- 与主 vault 交叉引用：[[...]]
```

---

## 拆分时机与步骤

### 触发条件（满足任一即可）

- AI/Agent 领域 ≥ 30 篇 summary
- AI/Agent 领域 concept ≥ 20 个
- 发现 AI 领域的 lint 报告经常被其他领域干扰

### 拆分步骤

```
1. 创建 vault-ai/ 目录（按模板结构）
2. 迁移 AI 相关 concept → vault-ai/03-wiki/concepts/
   （使用 Obsidian 的"移动文件"而非复制，避免双向链接断裂）
3. 迁移 AI 相关 summaries → vault-ai/03-wiki/summaries/
4. 生成 vault-ai/CLAUDE.md（领域专属 schema）
5. 在原 vault 创建 00-hub/ 并添加 vault-ai 概览
6. 更新原 vault 的 All-Concepts/All-Sources → 标注"已迁移至 vault-ai"
7. 后续所有 AI 领域新增内容 → 直接写入 vault-ai/
```

### 不拆分的情况

如果某个领域始终 ≤ 15 篇 summary，维持在主 vault 内，用 `03-wiki/concepts/[领域]/` 隔离即可，不单独建 vault。

---

## 风险与备选

| 风险 | 缓解方案 |
|------|---------|
| 跨 vault 查询困难 | 维持 00-hub 作为全局入口，用外部链接串联 |
| 迁移时链接断裂 | 使用 Obsidian 内置"移动"而非复制，保持 wikilink 有效 |
| 领域边界模糊（如 AI+生物） | 边界领域留在主 vault 直到规模足够大再拆 |
| 多 vault 维护负担增加 | 每增加一个 vault 需确认确实有独立复利需求，不人为制造 |

---

## 结论与建议

**当前阶段**：维持单一 vault，将 Phase 1-3 的改动跑通并稳定使用 1-2 个月后，再评估是否拆分。

**推荐时间节点**：
- 2026-06-01：首次 lint + review，检查哪些领域规模已达标
- 届时如 AI/Agent 领域 ≥ 30 summary → 启动 vault-ai 拆分

**第一步行动**：在 `docs/superpowers/specs/` 下补充一份 `2026-Q2-vault-review.md`，作为届时回顾的 Checklist。

---

## 审批

- [ ] 是否认可"先跑通再拆分"的策略？
- [ ] 是否同意 AI/Agent 作为第一个拆分候选领域？
- [ ] 对 00-hub 跨 vault 维护方案是否有调整意见？
