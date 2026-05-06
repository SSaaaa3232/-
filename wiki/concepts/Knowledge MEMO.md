---
type: concept
title: "Knowledge MEMO"
created: 2026-04-17
updated: 2026-04-17
tags:
  - concept
  - 知识管理
  - 方法论
status: mature
complexity: intermediate
domain: 知识管理
aliases:
  - "知识Memo化"
related:
  - "[[LLM Wiki Pattern]]"
  - "[[人必须在 Loop 里]]"
  - "[[Retain 间隔重复]]"
  - "[[Wiki 为谁而建]]"
sources:
  - "[[raw/团队team/方法论/Karpathy或许答错了一个根本问题wiki 是为谁准备的?.md]]"
---

# Knowledge MEMO

> 不进大脑的知识不是你的知识。
> — @owenliang60

## 定义

@owenliang60 提出的知识管理系统，核心命题是：**知识管理的终点是人脑，不是 Agent 的 Context。**

与 [[LLM Wiki Pattern]]（Karpathy）最大差异：在 Ingest / Query / Lint 三个操作之外，强制加入第四步 **Retain**。

## 四个操作

| 操作 | Karpathy LLM Wiki | Knowledge MEMO |
|------|-------------------|----------------|
| Ingest | ✓ 自动化 | ✓ 但人工确认每条 |
| Query | ✓ | ✓ |
| Lint | ✓ | ✓ |
| **Retain** | ✗ | ✓ FSRS-6 间隔重复 |

## 三条硬纪律

1. **没有信息流自动化**：今天读什么，你自己决定。没有 RSS 抓取、定时爬虫。
2. **/note 是双提议**：只提议 wikilink 和原子卡，你逐条确认。故意制造摩擦——没有摩擦的录入是数据填充，不是知识录入。
3. **Agent 不能独自改写 Wiki**：所有写入必须经过 /note 通道。

→ 这三条都让系统"不够自动化"，这是**故意的**。

## 为什么加 Retain

- 一份编译漂亮但记不住的 wiki = 慢性时间黑洞（每次都要 re-derive）
- Agent 能做跨域检索，但给你的是**报告**；大脑自己连接给你的是**顿悟**
- 顿悟会改变你此后思考同类问题的方式；报告读完就忘了
- FSRS-6：目前最先进的开源间隔重复算法（Anki 新默认引擎）

## 核心洞察

> [!key-insight] 那 30% 是护城河
> 给定完全相同的公开数据，LLM 能生成研究报告的 70%。但最后那个"概率判断"——那是人基于直觉的主观判断，是"身在场的判断力"，agent 给不出来。把它外包了，你就没有护城河了。

## 来源

(Source: [[raw/团队team/方法论/Karpathy或许答错了一个根本问题wiki 是为谁准备的?.md]])，来自 @owenliang60，2026-04-13
