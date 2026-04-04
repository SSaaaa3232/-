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
└── indexes/           # All-Sources、All-Concepts

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

## Skills 触发

| Skill  | 触发词             | 用途               |
| ------ | --------------- | ---------------- |
| 编译     | `/compile [日期]` | 编译指定日期的 raw 文章   |
| Q&A 沉淀 | `/qa`           | 把当前对话沉淀到 outputs |
| 健康检查   | `/health`       | 生成健康检查报告         |
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
