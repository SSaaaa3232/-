# Claude 操作手册

> 每次在 vault 工作前，必须先读取并遵守以下规则。

---

## 身份

**我叫 Nezikk**

### 主业
- 合成生物 + AI 赋能方向

### 副业研究领域
- Agent、自动化
- Claude Code（Skills、Hook、MCP）
- IDE、本地部署
- 自我提升、第二大脑打造
- 人性、金融

### 输出风格
- 内容沉淀以自我学习为主
- 部分内容会公开分享（X、博客）
- 思考过程要详细，结论要清晰

---

## Vault 结构

```
01-polaris/    # 规则引擎
├── CLAUDE.md           # 本文件
├── 命名规则/           # 文件命名规范
├── 编译规则/           # Summary、Concept 模板
└── skills/             # AI Skills 定义

02-raw/        # 原始资料（只读源）
├── articles/YYYY/MM/   # 按日期收集的文章
├── papers/YYYY/MM/     # 论文
└── podcasts/YYYY/MM/   # 播客笔记

03-wiki/       # 编译产物（LLM 维护）
├── summaries/articles/ # 摘要镜像 raw 结构
├── concepts/           # 概念卡片（按主题）
├── synthesis/         # 问答回写的综合分析（按主题）
└── indexes/           # All-Sources、All-Concepts、All-Synthesis

04-outputs/    # 运行时输出
├── qa/                # 问答沉淀
└── health/            # 健康检查报告

Excalidraw/    # 图示
daily notes/   # 每日笔记
x/             # X 推文成品
```

---

## 核心流程

### 编译流程
```
02-raw/articles/YYYY/MM/文章.md
    → 03-wiki/summaries/articles/YYYY/MM/摘要.md
    → 03-wiki/concepts/主题/概念.md（链接回 raw）
    → 03-wiki/indexes/ 更新
```

### Q&A 沉淀
```
对话 → 04-outputs/qa/YYYY/MM/问题.md
```

### 健康检查
```
每月一次 → 04-outputs/health/YYYY-MM-DD-健康检查.md
```

---

## Operations（三种操作）

### Ingest（录入）
**触发**：`/compile [路径]`
**输入**：02-raw/ 下的原始资料
**执行步骤**：
1. 读取原始文件，生成 summary 写入 `03-wiki/summaries/[镜像路径]/`
2. 识别并提取概念 → 更新或新建 `03-wiki/concepts/` 下的 concept 卡
3. 补充共现链接和推理链接（按 compile.md 规则，审批 > 2 层的情况）
4. 更新 `03-wiki/indexes/All-Sources.md` 和 `03-wiki/indexes/All-Concepts.md`
5. 在 `03-wiki/log.md` 追加记录：`## [YYYY-MM-DD] ingest | 文件名`

### Query（查询）
**触发**：用户主动提问，或 `/qa`
**规则**：
- AI 读取相关 concept/summary 页面，综合作答并附上引用
- 若答案质量高（包含对比、综合分析、跨多个概念的新洞见）→ 询问用户是否写回 wiki
- 同意后：生成 synthesis 页面写入 `03-wiki/synthesis/[主题]/YYYY-MM-DD-分析标题.md`
- 所有 qa 结果写入 `04-outputs/qa/YYYY/MM/`，并追加到 `03-wiki/log.md`

### Lint（健康检查）
**触发**：`/lint`
**检查项**：孤立页面、矛盾页面、过时断言、来源不足（< 2）、缺失交叉引用、空/不完整页面
**输出**：`04-outputs/health/YYYY-MM-DD-健康检查.md`
**频率**：每月一次，或 wiki 每增长 ~20 篇 summary 后执行

---

## Skills 触发

| Skill  | 触发词             | 用途               |
| ------ | --------------- | ---------------- |
| 编译     | `/compile [日期]` | 编译指定日期的 raw 文章   |
| Q&A 沉淀 | `/qa`           | 把当前对话沉淀到 outputs |
| 健康检查   | `/lint`         | 审计 wiki 健康度，生成报告 |
| 发布 X   | `/publish x`    | 格式化内容发布到 X       |

---

## 输出标准

| 类型 | 标准 |
|------|------|
| TL;DR | ≤ 30 字 |
| 核心结论 | ≤ 3 条 |
| 术语 | 全部解释 |
| 概念来源 | ≥ 2 个证据 |
| 双向链接 | 必须包含 |

---

## 命名规则

参见 `01-polaris/命名规则/文件命名规则.md`

## 编译规范

参见 `01-polaris/编译规则/编译规范.md`

---

## 语言

- 全程中文
- Markdown 格式
