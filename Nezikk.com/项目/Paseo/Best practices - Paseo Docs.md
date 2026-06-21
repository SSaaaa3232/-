---
title: "Best practices - Paseo Docs"
source: "https://paseo.sh/docs/best-practices"
author:
published:
created: 2026-05-06
---
## Best practices 最佳实践

What I've learned from using Paseo daily. Not rules, just patterns that have worked for me.  
我从每天使用 Paseo 中学到的东西。不是规则，只是对我有用的一些模式。

## Agents replace typing, not thinking代理取代打字，而不是思考

Your role has changed. You're no longer the one writing code line by line. You're the one making decisions: what to build, how it should work, what the architecture looks like. The agent executes, but you direct.  
你的角色已经改变了。你不再是逐行编写代码的人。你是做决策的人：构建什么，它应该如何工作，架构是什么样子。代理执行，但你指导。

You can't just say "implement feature X" and walk away. You still have to do the hard part: deciding what to build, how it fits into the system, what trade-offs to make. Thinking is not optional. At least for now, agents replace the typing, not the thinking.  
你不能简单地说“实现功能 X”然后就走开。你仍然需要完成困难的部分：决定要构建什么，它如何融入系统，以及要做出哪些权衡。思考不是可选的。至少目前为止，代理可以代替打字，但不能代替思考。

## Verification loops 验证循环

The agent needs a way to verify its work. TDD is one implementation of this pattern: get the agent to write a failing test, verify it fails for the right reasons, then tell it to make the test pass. The agent can loop on its own because it knows what "done" means.  
代理需要一种验证其工作的方法。TDD 是这种模式的一种实现方式：让代理编写一个失败的测试，验证它失败的原因是否正确，然后让它使测试通过。代理可以自行循环，因为它知道“完成”的含义。

## Invest in tooling 投资于工具

It's not just test runners. For web apps, something like Playwright MCP lets the agent take screenshots and verify UI changes. For a SaaS app I built a CLI that wraps all the business logic so the agent could launch jobs, check statuses, and scrape data without going through the UI.  
这不仅仅是测试运行器。对于 Web 应用，类似 Playwright MCP 的东西可以让代理截取屏幕截图并验证 UI 变化。对于一个 SaaS 应用，我构建了一个 CLI，将所有业务逻辑封装起来，这样代理就可以启动作业、检查状态和抓取数据，而无需通过 UI。

Code is cheap with coding agents. I would have never written that CLI before because it felt like wasted effort. Now I bootstrap tooling first. It pays off exponentially.  
有了编码代理，代码就很便宜。在那之前，我永远不会写那个 CLI，因为它感觉像是在浪费精力。现在我首先构建工具。这会带来指数级的回报。

## Agents are cheap 代理很便宜

Don't be shy about running multiple agents. Paseo lets you launch agents in isolated worktrees. Kick one off with voice while walking, then kick off another. They work independently. You get a notification when they're done.  
不要害怕运行多个代理。Paseo 允许你在隔离的工作树中启动代理。你可以一边走路一边用语音启动一个，然后再启动另一个。它们各自独立工作。它们完成工作时你会收到通知。

## Use voice extensively 广泛使用语音

It's much more natural to use voice to communicate ideas and pull them out of your brain. The agent will parse and organize your thoughts better than if you try to write the perfect prompt. You don't need to organize anything. Just talk.  
使用语音交流想法并将其从大脑中提取出来要自然得多。代理将比你尝试编写完美的提示更好地解析和组织你的想法。你不需要组织任何东西，只需交谈即可。

Current speech-to-text models are really good. They catch accents, acronyms, technical terms. And even when they don't, the LLM will infer what you meant.  
当前的语音转文本模型非常好。它们能捕捉口音、首字母缩略词和技术术语。即使它们没有捕捉到，LLM 也会推断出你的意思。

## Understand the type of work了解工作类型

Sometimes you need to plan: design a spec, verify it, get the agent to follow through. Maybe it takes a couple of agents to work through it. Other times it's conversational: kick off a single agent and start talking, asking questions. Match your approach to the task.  
有时候你需要规划：设计一个规范，验证它，让代理执行。可能需要几个代理来完成。其他时候则是对话式的：启动一个代理并开始交谈，提出问题。根据任务选择合适的方法。

## Iterate and refactor often经常迭代和重构

Don't expect perfect. Expect working. Make it work, make it correct, make it beautiful. Each iteration gets you closer. With tests, refactoring is cheap.  
不要期望完美。期望它能工作。让它工作，让它正确，让它美观。每次迭代都会让你更接近。有了测试，重构就很便宜。

I don't let myself add too many features before stopping to refactor. Sometimes I kick off an agent and have it trace code paths, explain dependencies, show me how modules connect. I make mental notes during code review and circle back.  
我不会在停止重构之前添加太多功能。有时我启动一个代理，让它跟踪代码路径，解释依赖关系，向我展示模块如何连接。在代码审查期间我会做笔记，然后回顾。

## Use agents to check agents使用代理来检查代理

If an agent implements something and you ask it to review its own work, it will never find issues. Launch a separate agent with a fresh context to review the first agent's code. It will catch things the first agent missed or glossed over. An agent might say it's done when it's not. Another agent can detect that.  
如果一个代理实现了某些功能，然后你要求它审查自己的工作，它永远不会发现问题。启动一个独立的代理，使用全新的上下文来审查第一个代理的代码。它会发现第一个代理遗漏或忽略的问题。一个代理可能会说它完成了，但实际上没有。另一个代理可以检测到这一点。

## Learn your agents' quirks了解你的代理的怪癖

People argue about which model is better. That's the wrong question. Each model has strengths and weaknesses. Knowing them is more useful than chasing benchmarks. Benchmarks don't mean anything. You need to try the models yourself to form an opinion.  
人们争论哪个模型更好。这是错误的问题。每个模型都有优点和缺点。了解它们比追求基准更有用。基准毫无意义。你需要自己尝试这些模型来形成自己的观点。

I use Claude Code as my main driver because it's quick and uses tools well. But sometimes it jumps to conclusions and gives up too easily. Codex is frustratingly slow but goes deep, doesn't stop, and is methodical. It's also stubborn and too serious. These aren't good or bad traits, just differences you learn to work around. Use the right model for the job.  
我使用 Claude Code 作为主要驱动，因为它速度快且善于使用工具。但有时它会过早得出结论并轻易放弃。Codex 令人沮丧地缓慢，但深入、不停止且有条不紊。它也固执且过于严肃。这些特质并非好坏之分，只是你需要学习如何应对的差异。根据任务选择合适的模型。