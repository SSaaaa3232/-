---
type: concept
status: developing
created: 2026-05-06
updated: 2026-05-18
title: "Claude Code 与 Agentic Coding"
tags:
  - concept
  - raw-batch-2026-05-06
sources:
  - "[[wiki/sources/Source - Boris Cherny：Claude Code 之后，写代码正在变成“管理 Agent”]]"
  - "[[wiki/sources/Source - How Anthropic’s product team moves faster than anyone else Cat Wu (Head of Product,]]"
  - "[[wiki/sources/Source - 失业一周写出 573 星 Skill，他用 Claude Code 写网文养家]]"
  - "[[wiki/sources/Source - Vibe Coding 带来的超级个体时代]]"
  - "[[wiki/sources/Source - Boris Cherny：Claude Code 之后，写代码正在变成“管理 Agent” - 6cd15e]]"
  - "[[wiki/sources/Source - Claude Code CLI 拆解]]"
  - "[[wiki/sources/Source - harness]]"
  - "[[wiki/sources/Source - Karpathy 最新访谈：Vibe Coding 只是开始，真正重要的是 Agentic Engineering]]"
  - "[[wiki/sources/Source - Cat Wu 面试了几百个 PM 候选人，几乎没人答对一个问题：AI 产品经理到底应该干什么？]]"
  - "[[wiki/sources/Source - Post by @chenchengpro on X]]"
  - "[[wiki/sources/Source - 从零开始两天构建一个 Claude Code]]"
  - "[[wiki/sources/Source - 实测Claude Opus 4.7，好好的模型也开始不说人话了。]]"
  - "[[wiki/sources/Source - 10 Lessons for Agentic Coding]]"
  - "[[wiki/sources/Source - 8 Claude Code Hooks That Automate What You Keep Forgetting]]"
  - "[[wiki/sources/Source - CC降智]]"
  - "[[wiki/sources/Source - Claude Code 插件集]]"
  - "[[wiki/sources/Source - 10大我希望早点知道的Claude code使用技巧]]"
  - "[[wiki/sources/Source - 153K+ Star！我把Anthropic黑客松冠军的Claude Code配置整理成了这份终极指南]]"
  - "[[wiki/sources/Source - 用好Agent最重要的技巧不是Skills，是这四个字。]]"
  - "[[wiki/sources/Source - 38k 星，Matt Pocock 把工程师级 Skill 全开源了，专治 Claude Code vibe coding]]"
  - "[[wiki/sources/Source - Claude Code]]"
  - "[[wiki/sources/Source - 从零开始两天构建一个 Claude Code：带你拆解 AI CLI 的每一层]]"
  - "[[wiki/sources/Source - Claude 技能构建完整指南]]"
  - "[[wiki/sources/Source - 创始人手册：打造 AI 原生初创公司]]"
  - "[[wiki/sources/Source - 为什么我不“凭感觉编程”]]"
  - "[[wiki/sources/Source - 高级工程师即将断档？由近期的 Vibe Coding 协作实践而发散开来的思考]]"
  - "[[wiki/sources/Source - Using Claude Code： The Unreasonable Effectiveness of HTML]]"
  - "[[wiki/sources/Source - Claude-code-workflow(CCW) 使用技巧分享]]"
  - "[[wiki/sources/Source - Maestro-FLow 工作流：Claude Code 与 Codex 自动推进闭环治理]]"
  - "[[wiki/sources/Source - CCW V7.X 与 Maestro-Flow 展望]]"
  - "[[wiki/sources/Source - Vibe coding 与传统软件工程流程]]"
  - "[[wiki/sources/Source - AI 时代到底该怎么管一个工程团队]]"
---

# Claude Code 与 Agentic Coding

> Claude Code、Codex、vibe coding、agentic coding、AI 产品经理与编码工作流。

## Synthesis
这批来源把 Claude Code 从“代码补全工具”推进到“管理 Agent 的工作台”：核心能力不只是生成代码，而是约束、规划、hooks、上下文管理、PM/工程协作与可审计执行。

## What to Watch
- 把“能跑”与“可信”分开评估：代码生成只是第一步，验证、回滚、上下文纪律更重要。
- 沉淀 hooks、commands、skills，让重复工作进入工具层。

## Source Coverage
- [[wiki/sources/Source - Boris Cherny：Claude Code 之后，写代码正在变成“管理 Agent”]] — `raw/articles/DeepSeek发布多模态模型：深入解读这篇指哪打哪的视觉原语论文！.md`
- [[wiki/sources/Source - How Anthropic’s product team moves faster than anyone else Cat Wu (Head of Product,]] — `raw/podcast/How Anthropic’s product team moves faster than anyone else  Cat Wu (Head of Product, Claude Code).md`
- [[wiki/sources/Source - 失业一周写出 573 星 Skill，他用 Claude Code 写网文养家]] — `raw/个人👤/行为/x/skill/网文-skill.md`
- [[wiki/sources/Source - Vibe Coding 带来的超级个体时代]] — `raw/个人👤/行为/x/方法论/Vibe-Coding超级个体时代.md`
- [[wiki/sources/Source - Boris Cherny：Claude Code 之后，写代码正在变成“管理 Agent” - 6cd15e]] — `raw/个人👤/行为/调研/分析/Boris Cherny：Claude Code 之后，写代码正在变成“管理 Agent”.md`
- [[wiki/sources/Source - Claude Code CLI 拆解]] — `raw/个人👤/行为/调研/分析/Claude Code CLI 拆解.md`
- [[wiki/sources/Source - harness]] — `raw/个人👤/行为/调研/分析/Claude code源码解析.md`
- [[wiki/sources/Source - Karpathy 最新访谈：Vibe Coding 只是开始，真正重要的是 Agentic Engineering]] — `raw/个人👤/行为/调研/分析/Karpathy 访谈：Vibe Coding 只是开始，真正重要的是 Agentic Engineering.md`
- [[wiki/sources/Source - Cat Wu 面试了几百个 PM 候选人，几乎没人答对一个问题：AI 产品经理到底应该干什么？]] — `raw/个人👤/行为/调研/分析/人物/Cat wu/Cat Wu 面试了几百个 PM 候选人，几乎没人答对一个问题：AI 产品经理到底应该干什么？.md`
- [[wiki/sources/Source - Post by @chenchengpro on X]] — `raw/个人👤/行为/调研/分析/人物/Cat wu/Cat Wu-「Jobs are fake.」.md`
- [[wiki/sources/Source - 从零开始两天构建一个 Claude Code]] — `raw/个人👤/行为/调研/分析/从零开始两天构建一个ClaudeCode.md`
- [[wiki/sources/Source - 实测Claude Opus 4.7，好好的模型也开始不说人话了。]] — `raw/个人👤/行为/调研/分析/实测Claude Opus 4.7，好好的模型也开始不说人话了。.md`
- [[wiki/sources/Source - 10 Lessons for Agentic Coding]] — `raw/个人👤/认知/10 Lessons for Agentic Coding.md`
- [[wiki/sources/Source - 8 Claude Code Hooks That Automate What You Keep Forgetting]] — `raw/团队team/cc/8 Claude Code Hooks That Automate What You Keep Forgetting.md`
- [[wiki/sources/Source - CC降智]] — `raw/团队team/cc/CC降智.md`
- [[wiki/sources/Source - Claude Code 插件集]] — `raw/团队team/cc/Claude Code 插件.md`
- [[wiki/sources/Source - 10大我希望早点知道的Claude code使用技巧]] — `raw/团队team/cc/Claude code使用技巧.md`
- [[wiki/sources/Source - 153K+ Star！我把Anthropic黑客松冠军的Claude Code配置整理成了这份终极指南]] — `raw/团队team/cc/cc指南.md`
- [[wiki/sources/Source - 用好Agent最重要的技巧不是Skills，是这四个字。]] — `raw/团队team/cc/约束先行.md`
- [[wiki/sources/Source - 38k 星，Matt Pocock 把工程师级 Skill 全开源了，专治 Claude Code vibe coding]] — `raw/团队team/skill/Matt Pocock -工程师级 Skill -Claude Code vibe coding.md`
- [[wiki/sources/Source - Claude Code]] — `raw/团队team/skill/PUA-Skill.md`
- [[wiki/sources/Source - 从零开始两天构建一个 Claude Code：带你拆解 AI CLI 的每一层]] — `raw/团队team/技术/从零开始两天构建一个 Claude Code：带你拆解 AI CLI 的每一层.md`

## 2026-05-18 Incremental Ingest
- [[wiki/sources/Source - Claude 技能构建完整指南]] — `raw/1/skill building/claude-skills-building-guide.md`；一份 Claude Skills 构建指南，覆盖基础、规划设计、测试迭代、分发共享、模式和故障排除。
- [[wiki/sources/Source - 创始人手册：打造 AI 原生初创公司]] — `raw/1/创始人手册：打造 AI 原生初创公司.md`；文章重构 AI-native startup 的生命周期：构思、MVP、发布和扩展都被 AI 工具显著压缩。
- [[wiki/sources/Source - 为什么我不“凭感觉编程”]] — `raw/articles/为什么我不“凭感觉编程”.md`；文章是对 vibe coding 叙事的个人反思，强调 LLM 工具并不自动带来纯粹生产力天堂。
- [[wiki/sources/Source - 高级工程师即将断档？由近期的 Vibe Coding 协作实践而发散开来的思考]] — `raw/个人👤/行为/调研/分析/高级工程师即将断档？由近期的 Vibe Coding 协作实践而发散开来的思考.md`；文章从 PPTX Agent 项目的 Vibe Coding 协作实践出发，讨论架构约束、重构、hooks、测试和高级工程师成长断档。
- [[wiki/sources/Source - Using Claude Code： The Unreasonable Effectiveness of HTML]] — `raw/个人👤/认知/Using Claude Code The Unreasonable Effectiveness of HTML.md`；文章解释为什么在 Claude Code/Agent 输出中，HTML 有时比 Markdown 更有效。
- [[wiki/sources/Source - Claude-code-workflow(CCW) 使用技巧分享]] — `raw/团队team/技术/Maestro/Claude-code-workflow(CCW) –使用技巧分享-自认为最工程化的harness workflow.md`；CCW 是一个工程化 Claude Code workflow，强调不同复杂度任务入口、半自动/全自动运行、多 CLI 协作和语义编排。
- [[wiki/sources/Source - Maestro-FLow 工作流：Claude Code 与 Codex 自动推进闭环治理]] — `raw/团队team/技术/Maestro/Maestro-FLow 工作流-实现Claude code&&Codex 自动推进闭环治理知识复用团队协作worktree并行多cli调用.md`；Maestro-FLow 是面向复杂软件系统开发的工作流，覆盖 brainstorm、roadmap、analysis、plan、execute、test 的闭环。
- [[wiki/sources/Source - CCW V7.X 与 Maestro-Flow 展望]] — `raw/团队team/技术/Maestro/开源CCW(claude-code-workflow)V7.X版本新增Cadence team和 codex csv spawn 工作流&&下一代工作流(maestro-flow)展望.md`；文章介绍 CCW 7.X 新增 Spec 系统、Cadence team、Codex CSV spawn 工作流，并展望 Maestro-Flow。
- [[wiki/sources/Source - Vibe coding 与传统软件工程流程]] — `raw/团队team/技术/vibe coding.md`；短笔记强调在 agentic engineering 时代，确认需求、schema、API、后端、文档、前端和迭代流程只会更重要。
- [[wiki/sources/Source - AI 时代到底该怎么管一个工程团队]] — `raw/团队team/方法论/AI 时代到底该怎么管一个工程团队.md`；文章转述 Anthropic Fiona Fung 关于 AI-native engineering org 的演讲，讨论 AI 时代工程团队管理。
