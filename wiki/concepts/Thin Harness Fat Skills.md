---
type: concept
title: "Thin Harness, Fat Skills"
created: 2026-04-17
updated: 2026-04-17
tags:
  - concept
  - agent
  - architecture
status: mature
complexity: basic
domain: AI/Agent设计
aliases:
  - "薄Harness厚Skills"
  - "Thin Harness"
related:
  - "[[Harness Engineering]]"
  - "[[Skill 作为永久资产]]"
sources:
  - "[[raw/团队team/方法论/Thin Harness, Fat Skills]]"
---

# Thin Harness, Fat Skills

> 把智能推到 Skills 里。把执行推到确定性工具里。中间的 Harness 越薄越好。
> — Garry Tan（YC）

## 定义

AI 工作系统的三层架构原则：**价值的 90% 在 Skills，Harness 只是管道。**

## 三层结构

| 层级 | 内容 | 原则 |
|------|------|------|
| **Skills（顶层）** | 操作手册、流程、判断标准、领域知识 | 尽量厚，这是价值所在 |
| **Harness（中间层）** | 运行 AI 的环境：调用模型、管理上下文、读写文件 | 尽量薄，只做管道 |
| **确定性工具（底层）** | 数据库查询、代码编译、数学计算 | 输入→输出固定，不需要智能 |

## 核心推论

**模型不失败因为不够聪明，而是因为不理解你的具体情况。** Skill 解决的就是这个问题——你的规范、你的惯例、你的问题的特殊形状。

**Skill 是永久资产。** 当下一个更强的模型发布时，所有 Skill 自动变得更好。Skill 定义流程和标准，底层判断力提升让流程执行更精准，无需重写。

## 反模式

**厚 Harness、薄 Skills**：花大量时间调试工具链、配置插件、优化 API 调用，但没有教给 AI"怎么做好这件事"。

> 结果：工具链漂亮，但 AI 产出质量跟裸聊无本质区别。因为优化了管道，但管道里流的还是自来水。

## 应用

- 写 Skill prompt 时：优先写操作手册（判断标准、领域知识），而非调用细节
- 评估工具投入时：先问"这是在加厚 Skill 还是在加厚 Harness？"
- 模型升级时：Skill 自动受益，Harness 可能需要适配

## 来源

(Source: [[raw/团队team/方法论/Thin Harness, Fat Skills]])，来自 @KKaWSB，2026-04-16
