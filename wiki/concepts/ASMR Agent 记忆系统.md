---
type: concept
title: ASMR Agent 记忆系统
created: 2026-04-17
updated: 2026-04-17
tags:
  - concept
  - agent
  - 记忆
  - RAG
status: mature
complexity: advanced
domain: AI/Agent设计
aliases:
  - ASMR
  - Agentic Search and Memory Retrieval
  - Supermemory
related:
  - "[[AutoAgent 自优化代理]]"
  - "[[多智能体协作五种模式]]"
sources:
  - "[[We broke the frontier in agent memory Introducing ~99% SOTA memory system.]]"
---

# ASMR Agent 记忆系统

> Agent memory might be completely solved now.
> — @DhravyaShah

## 核心问题

大多数记忆系统失分不在**推理**，在**检索**。
向量检索的致命弱点：**无法可靠区分旧事实和新更正**。
语义相似度匹配在时序密集、多会话、矛盾信息环境下系统性失败。

## ASMR 架构（三层多 Agent 管道）

### 第一层：并行摄入（Observer Agents）

不做 chunking + embedding，改用 **3 个并行 Reader Agent**（Gemini 2.0 Flash）并发读取原始会话：
- Agent 1 读第 1、3、5 场会话
- Agent 2 读第 2、4、6 场会话
- Agent 3 读剩余会话

提取六类结构化知识：
1. 个人信息
2. 偏好
3. 事件
4. 时序数据
5. 更新（旧事实被覆盖）
6. 助手信息

结果按来源会话原生存储（非向量索引）。

### 第二层：主动检索（Search Agents）

问题到来时，**不查向量库**，改用 3 个并行 Search Agent 主动推理：

| Agent | 专注方向 |
|-------|---------|
| Agent 1 | 直接事实与明确陈述 |
| Agent 2 | 相关背景、社交线索、隐含含义 |
| Agent 3 | 时序时间线重构 + 关系映射 |

Orchestrator 汇总三路结果，附带原始会话逐字摘录供核实。

### 第三层：回答集成（Answering Ensembles）

**Run 1：8变体集成（98.60% 准确率）**
- 8 种专业化 prompt 变体并行运行（精确计数器、时间专家、上下文深挖等）
- 任意一条路径命中 = 计题正确
- 效果：**98.60%**

**Run 2：12变体决策森林（97.20% 准确率）**
- 12 个专业 Agent 独立作答
- Aggregator LLM 做多数投票 + 领域置信度 + 冲突解决 → 单一权威答案
- 效果：**97.20%**

## 基准测试结果

**LongMemEval-s**（115k+ token 对话历史，矛盾信息，跨会话事件，时序推理）：

| 系统 | 准确率 |
|------|------|
| 传统 RAG（行业平均） | ~60-70% |
| Supermemory 生产引擎（v1） | ~85% |
| ASMR 8变体集成（实验） | **98.60%** |
| ASMR 12变体决策森林（实验） | **97.20%** |

## 三条工程教训

1. **主动检索胜向量搜索**：Agent 主动推理消除了传统 RAG 的"语义相似度陷阱"，尤其在时序更新场景
2. **并行分工是关键**：摄入和检索各拆成 3 个专职 Agent，既提速又提精度，每个 Agent 专注单一维度避免冲突
3. **专门化胜通用化**：专业 prompt 变体（Counter、Time Specialist、Detail Extractor）远优于单一主 prompt

## 与传统 RAG 的根本差异

| 维度 | 传统 RAG | ASMR |
|------|---------|------|
| 存储格式 | 向量嵌入 | 结构化原生存储 |
| 检索方式 | 数学相似度 | Agent 主动推理 |
| 时序更新 | 旧新混淆 | Agent 3 专职时序重构 |
| 基础设施 | 向量数据库必需 | 完全 in-memory，可嵌入机器人等系统 |

## 局限

- 这是**实验架构**，非 Supermemory 生产引擎
- 延迟高于传统 RAG（但比预期低）
- 代码计划开源（已于 2026 年 4 月发布）

## 来源
(Source: [[We broke the frontier in agent memory Introducing ~99% SOTA memory system.]])，@DhravyaShah，2026-03-24
GitHub: [supermemoryai](https://github.com/supermemoryai)
