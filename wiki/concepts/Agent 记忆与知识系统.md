---
type: concept
status: developing
created: 2026-05-06
updated: 2026-05-18
title: "Agent 记忆与知识系统"
tags:
  - concept
  - raw-batch-2026-05-06
sources:
  - "[[wiki/sources/Source - How to Make Knowledge Graphs Blazing Fast如何快速制作知识图谱]]"
  - "[[wiki/sources/Source - 艾宾浩斯记忆曲线]]"
  - "[[wiki/sources/Source - Post by @dotey on X]]"
  - "[[wiki/sources/Source - Why Karpathy’s Second Brain Breaks at Agent Scale. How Mercury Solves It.为什么 Karpat]]"
  - "[[wiki/sources/Source - Post by @AYi_AInotes on X]]"
  - "[[wiki/sources/Source - 罗福莉访谈里那几句关于 memory 的话，被几乎所有人忽略了]]"
  - "[[wiki/sources/Source - MEMORY 高层规则（待整理）]]"
  - "[[wiki/sources/Source - 参考架构]]"
  - "[[wiki/sources/Source - Skill、Harness、记忆、安全：60篇文章和20个项目之后，我们画出了AI Agent的完整拼图]]"
  - "[[wiki/sources/Source - 深度拆解：AI Agent Harness 的构造【译】]]"
  - "[[wiki/sources/Source - Paper 待读清单]]"
  - "[[wiki/sources/Source - 两周浅学 RAG]]"
---

# Agent 记忆与知识系统

> Memory、MemOS、Second Brain、Wiki、知识图谱与长期上下文。

## Synthesis
长期记忆不是简单向量检索，而是“写入规范 + 主动检索 + 结构化知识 + 热缓存”的组合。Obsidian wiki 在这里承担可见、可编辑、可复利的外部脑。

## What to Watch
- 把来源继续拆成可复用概念、操作清单和开放问题。
- 对涉及新闻、市场、法规、模型版本的信息做日期标注和外部验证。

## Source Coverage
- [[wiki/sources/Source - How to Make Knowledge Graphs Blazing Fast如何快速制作知识图谱]] — `raw/个人👤/行为/Study/方法论/How to Make Knowledge Graphs Blazing Fast.md`
- [[wiki/sources/Source - 艾宾浩斯记忆曲线]] — `raw/个人👤/行为/Study/方法论/艾宾浩斯记忆曲线.md`
- [[wiki/sources/Source - Post by @dotey on X]] — `raw/个人👤/行为/memory/Harness in memory.md`
- [[wiki/sources/Source - Why Karpathy’s Second Brain Breaks at Agent Scale. How Mercury Solves It.为什么 Karpat]] — `raw/个人👤/行为/memory/Karpathy-Second Brain -Agent Scale-Mercury.md`
- [[wiki/sources/Source - Post by @AYi_AInotes on X]] — `raw/个人👤/行为/memory/Memory.md`
- [[wiki/sources/Source - 罗福莉访谈里那几句关于 memory 的话，被几乎所有人忽略了]] — `raw/个人👤/行为/memory/罗福莉访谈里那几句关于 memory 的话，被几乎所有人忽略了.md`
- [[wiki/sources/Source - MEMORY 高层规则（待整理）]] — `raw/团队team/方法论/MEMORY 高层规则（待整理）.md`
- [[wiki/sources/Source - 参考架构]] — `raw/团队team/方法论/模式/MemOS.md`
- [[wiki/sources/Source - Skill、Harness、记忆、安全：60篇文章和20个项目之后，我们画出了AI Agent的完整拼图]] — `raw/团队team/方法论/模式/Skill、Harness、记忆、安全.md`

## 2026-05-18 Incremental Ingest
- [[wiki/sources/Source - 深度拆解：AI Agent Harness 的构造【译】]] — `raw/1/深度拆解：AI Agent Harness 的构造【译】.md`；文章系统解释 AI Agent Harness：编排循环、工具、记忆、上下文管理、状态持久化、错误处理和护栏。
- [[wiki/sources/Source - Paper 待读清单]] — `raw/paper/paper.md`；论文链接清单，包含 Multi-agent LLM Agent Memory 与 DNA 引导 CRISPR-Cas12 细胞 RNA 靶向。
- [[wiki/sources/Source - 两周浅学 RAG]] — `raw/团队team/技术/RAG.md`；作者用两周学习快照解释 RAG，从“搜索 + LLM”的朴素理解进入语义检索、词袋模型、向量相似等基础。
