---
title: "Orchestration skills - Paseo Docs"
source: "https://paseo.sh/docs/skills"
author:
published:
created: 2026-05-06
---
## Orchestration skills 编排技巧

Paseo ships orchestration skills that teach coding agents (Claude Code, Codex) how to use the Paseo CLI to spawn, coordinate, and manage other agents. Skills are slash commands your agent can invoke — they provide the prompts, context, and workflows so agents know how to orchestrate without you writing boilerplate. Install them from the desktop app's Integrations settings or via the CLI.  
Paseo 提供编排技能，教导编码代理（Claude Code、Codex）如何使用 Paseo CLI 来生成、协调和管理其他代理。这些技能是您的代理可以调用的斜杠命令——它们提供提示、上下文和工作流程，以便代理知道如何编排，而无需您编写样板代码。您可以从桌面应用程序的集成设置中安装它们，也可以通过 CLI 安装。

## Installation 安装

Two ways to install:  
安装方式有两种：

- **Desktop app:** Settings → Integrations → Install  
	桌面应用程序：设置 → 集成 → 安装
- **Manual:** `npx skills add getpaseo/paseo` — this installs to `~/.agents/skills/` and sets up symlinks for each agent.  
	手册： `npx skills add getpaseo/paseo` — 这将安装到 `~/.agents/skills/` 并设置每个代理的符号链接。

## /paseo — CLI Reference /paseo — CLI 参考

The foundational skill. Loaded automatically by other skills. Contains the full Paseo CLI command reference so agents know how to run commands.  
基础技能。由其他技能自动加载。包含完整的 Paseo CLI 命令参考，以便代理知道如何运行命令。

Not typically invoked directly by users — it's a reference that other skills depend on.  
通常不直接由用户调用 — 它是其他技能所依赖的参考。

## /paseo-handoff — Task Handoff /paseo-handoff — 任务交接

Hands off your current task to another agent with full context. The receiving agent gets a comprehensive prompt with: task description, relevant files, what's been tried, decisions made, and acceptance criteria.  
将当前任务交给另一位代理，并提供完整上下文。接收任务的代理会收到一个包含任务描述、相关文件、已尝试的方法、已做决策以及验收标准的全面提示。

Default provider is Codex. Can specify Claude (sonnet/opus). Supports `--worktree` for isolated git branches.  
默认提供者为 Codex。可以指定 Claude（sonnet/opus）。支持 `--worktree` 用于隔离的 git 分支。

```
/paseo-handoff hand off the auth fix to codex in a worktree
/paseo-handoff hand this to claude opus for review
```

## /paseo-loop — Iterative Loops /paseo-loop — 迭代循环

Runs an agent in a loop with automatic verification until an exit condition is met. Worker runs, verifier checks, repeat until done or max iterations. Supports different providers for worker vs verifier (e.g., Codex implements, Claude verifies).  
在循环中运行一个代理，并进行自动验证，直到满足退出条件。工作者运行，验证器检查，重复此过程，直到完成或达到最大迭代次数。支持为工作者和验证器使用不同的提供商（例如，Codex 实现，Claude 验证）。

Stop conditions: `--max-iterations`, `--max-time`, or verification passes.  
停止条件： `--max-iterations` 、 `--max-time` 或验证通过。

```
/paseo-loop fix the failing tests, verify with npm test, max 5 iterations
/paseo-loop use codex to implement, claude sonnet to verify, loop until tests pass
```

## /paseo-orchestrator — Team Orchestration /paseo-orchestrator — 团队编排

Builds and manages a team of agents coordinating through a shared chat room. You describe the work, it sets up roles, launches agents, and coordinates through chat. Uses a heartbeat schedule to check progress.  
构建和管理一个通过共享聊天室协调的代理团队。你描述工作内容，它会设置角色、启动代理，并通过聊天进行协调。使用心跳计划来检查进度。

Cross-provider: typically Codex for implementation, Claude for review.  
跨提供商：通常使用 Codex 进行实现，Claude 进行审查。

```
/paseo-orchestrator spin up a team to implement the database migration, codex implements, claude reviews
```

## /paseo-chat — Chat Rooms /paseo-chat — 聊天室

Use persistent chat rooms for asynchronous agent coordination. Create rooms, post messages, read history, wait for replies. Supports @mentions for specific agents or @everyone.  
使用持久性聊天室进行异步代理协调。创建房间、发布消息、阅读历史记录、等待回复。支持 @mentions 特定代理或 @everyone。

Typically used by the orchestrator skill, but can be used directly.  
通常由编排器技能使用，但也可以直接使用。

```
/paseo-chat create a room called "backend-refactor" for coordinating the API changes
/paseo-chat post to backend-refactor: "API endpoints are done, ready for review"
```

## /paseo-committee — Committee Planning

Forms a committee of two high-reasoning agents (Claude Opus + GPT 5.4) to analyze a problem before implementing. Both agents reason in parallel, then plans are merged. Useful when stuck, looping, or facing a hard architectural decision.

Agents are prevented from editing code — they only produce a plan.

```
/paseo-committee why are the websocket connections dropping under load?
/paseo-committee plan the auth system migration
```