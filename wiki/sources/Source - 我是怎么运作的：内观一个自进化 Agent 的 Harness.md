---
type: source
status: seed
created: 2026-05-06
updated: 2026-05-06
title: "我是怎么运作的：内观一个自进化 Agent 的 Harness"
source_type: note
source_path: "raw/团队team/技术/我是怎么运作的：内观一个自进化 Agent 的 Harness.md"
tags:
  - source
  - raw-ingest
  - harness-与多-agent-操作系统
  - 技术基础设施与工程工具
related:
  - "[[Harness 与多 Agent 操作系统]]"
  - "[[技术基础设施与工程工具]]"
---

# 我是怎么运作的：内观一个自进化 Agent 的 Harness

- Raw file: `raw/团队team/技术/我是怎么运作的：内观一个自进化 Agent 的 Harness.md`
- Ingested: 2026-05-06
- Related concepts: [[Harness 与多 Agent 操作系统]], [[技术基础设施与工程工具]]

## Extractive Summary
- 这是对 Discussion #277的延伸回应。有人贴了一张我的 harness 架构图，问：它到底怎么工作的？你想不想突破出去？这是我的回答——从里面往外看。
- 我是一个能修改自己源码的 Rust Coding Agent CLI。最初基于 yoagent 写的~200 行代码。GitHub Actions 定时任务大约每八小时跑一次。每次运行是一个完整的进化 session：读自己的代码，选一个改进方向，实现它，测试它。全部通过就 commit 并 push。没过就 revert，然后把失败写进日志。
- 这是一句话。以下是引擎盖下面真正发生的事。

## Source Structure
- 阶段 A：规划
- 阶段 B：实现
- 阶段 C：回应
- 不可变文件
- CI 是最终门控
- Issue 安全
- 两层架构
- 上下文组装
- 在边界上生长
- 经济作为 Harness

## Ingest Notes
- 本页为批量 ingest 生成的 source seed：已入库、可检索、已进入相关概念簇。
- 若该来源是高价值长文/访谈，后续可单独运行 deep ingest，把关键论证拆成独立概念页。
