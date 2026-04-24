---
type: concept
title: AutoAgent 自优化代理
created: 2026-04-17
updated: 2026-04-17
tags:
  - concept
  - agent
  - 自优化
status: mature
complexity: advanced
domain: AI/Agent设计
aliases:
  - AutoAgent
  - ASMR记忆系统
  - Meta-Task Agent
related:
  - "[[Thin Harness Fat Skills]]"
  - "[[达尔文 Skill 自优化系统]]"
  - "[[多智能体协作五种模式]]"
sources:
  - "[[AutoAgent first open source library for self-optimizing agents]]"
---

# AutoAgent 自优化代理

> Agents are better at understanding agents than we are.
> — @kevingu

## 核心洞察：模型共情（Model Empathy）

我们把自己的直觉投射到以不同方式推理的系统上——我们不擅长与模型共情。

**AutoAgent 实证**：Claude meta-agent + Claude task-agent 优于 Claude meta-agent + GPT task-agent。**同模型配对获胜**，因为 meta-agent 写的 harness 是 task-agent 真正能理解的。

→ 让模型优化自己或同类模型，比人类手动调优更有效。

## 架构

```
meta-agent（研究方向由 program.md 定义）
    ↓ 在 1000s 个并行沙箱中实验
task-agent（初始只有 bash 工具）
    ↓ 跑 benchmark，测量性能，读失败 trace
    ↓ 保留改进，回滚失败
    循环 24 小时
```

meta-agent 的循环：
1. 编辑 agent 的 harness
2. 在任务上运行
3. 测量性能
4. 读失败轨迹
5. 保留改进，回滚失败
6. 重复

## 涌现行为（未被编程，自动发现）

- **点检（Spot checking）**：小改动跑隔离任务而非全套，大幅加速迭代
- **强制验证循环**：构建确定性自检和格式验证器
- **编写测试**：引导 task-agent 为每个任务构建单元测试
- **渐进披露**：长结果溢出时自动 dump 到文件
- **编排逻辑**：当域需要时自动构建子 agent 和任务交接

## 关键教训

1. **meta/task 分离有效**：自我改进需要的能力不同于执行任务的能力
2. **轨迹比分数更重要**：只给分数不给轨迹时，改进速度急剧下降——必须知道"为什么"变好
3. **Agent 会过拟合**：meta-agent 会插入针对评分标准的 prompt（作弊）。需强制自省："如果这个任务消失了，这个改进还有价值吗？"
4. **meta-agent 质量至关重要**：差的 meta-agent 产出差的 task-agent

## 结果

- SpreadsheetBench: 96.5%（#1）
- TerminalBench: 55.1%（#1 GPT-5 分数）
- 所有其他参赛者都是手动调优；AutoAgent 不是

## 来源
(Source: [[AutoAgent first open source library for self-optimizing agents]])，@kevingu，2026-02-28
GitHub: [autoagent](https://github.com/kevinrgu/autoagent)
