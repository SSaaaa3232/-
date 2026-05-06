---
ingested: 2026-05-06
wiki_page: "[[wiki/sources/Source - Prompt caching in LLMs, clearly explained 大型语言模型中的提示缓存，解释清楚]]"
title: "Prompt caching in LLMs, clearly explained 大型语言模型中的提示缓存，解释清楚"
source: "https://x.com/_avichawla/status/2044670188998803855"
author:
  - "[[@_avichawla]]"
published: 2026-04-16
created: 2026-04-20
---
![[8107a1f090bdfac7516968701bba279c_MD5.jpg]]

**A case study on how Claude achieves 92% cache hit-rateClaude 如何实现 92%缓存命中率的案例研究**

Every time an AI agent takes a step, it sends the entire conversation history back to the LLM.每当 AI 代理迈出一步，它就会将整个对话历史返回给 LLM。

That includes the system instructions, the tool definitions, and the project context it already processed three turns ago. All of it gets re-read, re-processed, and re-billed on every single turn.这包括系统说明、工具定义，以及三回合前已经处理过的项目上下文。所有这些数据每回合都会被重新读取、重新处理和重新计费。

![[7254aa49639163967917cbae5759f8dd_MD5.jpg]]

For long-running agentic workflows, this redundant computation is often the most expensive line item in your entire AI infrastructure.对于长期运行的代理式工作流来说，这种冗余的计算往往是整个人工智能基础设施中最昂贵的一项。

A system prompt with 20,000 tokens running over 50 turns means 1 million tokens of redundant computation billed at full price, producing zero new value. And that cost compounds across every user and every session.一个系统提示符包含2万个代币，运行50回合，意味着100万个冗余计算代币按全价计费，且不产生任何新价值。而且这种成本会在每个用户和每次会话中叠加。

The fix is prompt caching. But to use it well, you need to understand what’s actually happening under the hood.解决办法是提示缓存。但要好好使用它，你需要了解底层到底发生了什么。

## Static vs. Dynamic context静态上下文与动态上下文

Before you can optimize a prompt, you need to understand what changes and what doesn’t.在优化提示词之前，你需要了解哪些内容会改变，哪些不会。

Every agent request has two fundamentally different parts:每个客服请求都包含两个根本不同的部分：

![[40fca95f976d3df00810a7a0a705ba42_MD5.jpg]]

- The static prefix that stays identical across turns: system instructions, tool definitions, project context, and behavioral guidelines.各回合保持相同的静态前缀：系统指令、工具定义、项目上下文和行为指南。
- The dynamic suffix that grows with every turn: user messages, assistant responses, tool outputs, and terminal observations.随着每回合增长的动态后缀：用户消息、助理回复、工具输出和终端观察。

This split is what makes prompt caching possible. The infrastructure stores the mathematical state of the static prefix so that subsequent requests sharing that exact prefix can skip the computation entirely and read from memory.这种分拆正是促使缓存成为可能的原因。基础设施存储静态前缀的数学状态，以便后续共享该前缀的请求可以完全跳过计算，直接从内存读取。

Once you internalize this, every architectural decision in this article becomes obvious.一旦你内化了这一点，本文中的每一个架构决策都会变得显而易见。

## How does the KV Cache work?KV 缓存是如何工作的？

To understand why caching is so effective, you need to know what the transformer actually does when it processes your prompt.要理解缓存为何如此有效，你需要了解变换器处理提示时的实际操作。

Every LLM inference request has two phases:每个 LLM 推理请求包含两个阶段：

![[0bdcc7a4eaea17ed351a57ca2edd6bcd_MD5.jpg]]

- The prefill phase handles the entire input prompt. It runs dense matrix multiplications across all tokens in context to build the model’s internal representation. This is compute-bound and expensive.预填充阶段负责整个输入提示。它在上下文中对所有标记运行密集矩阵乘法，构建模型的内部表示。这需要计算且成本高昂。
- The decode phase generates tokens one at a time. Each new token gets added to the sequence, and the model predicts the next one. This phase is memory-bound because it mostly reads the historical state rather than doing heavy computation.解码阶段一次生成一个代币。每新增一个令牌加入序列，模型预测下一个。该阶段受内存限制，因为它主要读取历史状态，而非大量计算。

During the prefill phase, the transformer computes three vectors for each token: a Query, a Key, and a Value. The attention mechanism uses these to determine how each token relates to every other token. The Key and Value vectors for any given token depend only on the tokens before it, and once computed, they never change.在预填充阶段，变换器为每个标记计算三个向量：查询、键和值。注意力机制利用这些数据来确定每个代币与其他代币之间的关系。任何给定代币的键和值向量仅依赖于之前的标记，且一旦计算完成，它们永远不会改变。

<video preload="auto" tabindex="-1" playsinline="" aria-label="Embedded video" poster="https://pbs.twimg.com/tweet_video_thumb/HGAcO8VbMAAEtV_.jpg" src="https://video.twimg.com/tweet_video/HGAcO8VbMAAEtV_.mp4" type="video/mp4" style="width: 100%; height: 100%; position: absolute; background-color: black; top: 0%; left: 0%; transform: rotate(0deg) scale(1.005);"></video>

GIF

Without caching, these Key and Value tensors get thrown away after every request, and the next request recomputes them from scratch. For a 20,000-token prefix, that’s 20,000 tokens worth of attention computation that didn’t need to happen again.如果没有缓存，这些键和值张量在每次请求后都会被丢弃，下一个请求会从头重新计算它们。对于一个2万代币的前缀来说，这意味着相当于2万代币的注意力计算，而这些计算不需要再发生。

The KV cache fixes this by persisting those tensors on the inference servers, indexed by a cryptographic hash of the token sequence. When a new request comes in with the same prefix, the hash matches, the tensors are loaded from memory, and the prefill computation for those tokens is skipped entirely.KV 缓存通过在推理服务器上持久化这些张量，并通过令牌序列的密码学哈希进行索引来解决这个问题。当有新请求以相同前缀进入时，哈希值匹配，张量从内存加载，且对这些令牌的预填充计算完全跳过。

This drops computational complexity from O(n²) per generated token to O(n). And for a 20,000-token prefix repeated across 50 turns, that's an enormous reduction.这使计算复杂度从每个生成的令牌的 O（n²） 降至 O（n）。而且对于一个 2 万代币的前缀，重复使用 50 回合，这可是巨大的减少。

## The Economics经济学

The pricing structure is what makes this architectural decision so consequential.正是定价结构使这一架构决策如此深远。

Cache reads cost 0.1x the base input price, which is a 90% discount on every cached token. Cache writes cost 1.25x, a 25% premium to store the KV tensors. Extended one-hour caching costs 2.0x.缓存读取的成本是基础输入价格的 0.1 倍，相当于每个缓存令牌的 90%折扣。缓存写入成本为 1.25 倍，存储 KV 张量的费用高出 25%。延长一小时缓存的成本是 2.0 倍。

Here’s what this looks like across Anthropic’s Claude models:这是 Anthropic Claude 模型的具体情况：

![[65c13e3613ebc7c43e96c5adbfe2bb81_MD5.png]]

This math only works if the cache hit rate stays high. The best production example of what that looks like is Claude Code.这个数学只有在缓存命中率保持高时才有效。最好的生产示例是 Claude 代码。

## A 30-minute coding session with Claude Code与 Claude Code 的 30 分钟编程会话

Claude Code is built entirely around one objective: keep the cache hot.Claude Code 完全围绕一个目标构建：保持缓存热度。

Here’s what a real 30-minute coding session looks like from a billing perspective.从计费角度看，真正的30分钟编码会话是什么样的。

Minute 0: Claude Code loads its system prompt, tool definitions, and the project’s CLAUDE.md file. This payload exceeds 20,000 tokens, and since every token is new, this is the most expensive moment of the entire session. But you only pay this cost once.第 0 分钟：Claude Code 加载系统提示词、工具定义和项目 CLAUDE.md 文件。该有效载荷超过 20,000 个代币，且由于每个代币都是新币，这是整个会话中最昂贵的时刻。但你只付一次这个费用。

Minutes 1 to 5: You start giving instructions, and Claude Code dispatches its Explore Subagent to navigate the codebase, open files, and run grep commands. All of this gets appended to the dynamic suffix. But the 20,000-token static prefix is now reading from cache at $0.30/MTok instead of $3.00/MTok.第 1 到第 5 分钟：你开始下达指令，Claude Code 派遣其 Explore Subagent 来导航代码库、打开文件并执行 grep 命令。所有这些都会附加在动态后缀上。但现在，20,000 令牌的静态前缀从缓存读取的费用是 0.30 美元/百万吨，而不是 3.00 美元/百万吨。

Minutes 6 to 15: The Plan Subagent receives a summarized brief rather than the raw results, because passing raw output would bloat the dynamic suffix unnecessarily. It produces an implementation plan, you approve it, and Claude Code starts making changes. Every turn reads the static prefix from cache, the hit rate climbs past 90%, and each access resets the TTL to keep the cache warm.第 6 至 15 分钟：计划分代理收到摘要简报而非原始结果，因为传递原始输出会不必要地膨胀动态后缀。它生成实施计划，你批准后，Claude Code 开始进行修改。每回合读取缓存中的静态前缀，命中率会超过 90%，每次访问都会重置 TTL 以保持缓存温热。

Minutes 16 to 25: You request changes, which means more tool calls, more terminal output, and more context accumulating in the dynamic suffix. By now the session has processed hundreds of thousands of tokens, but every single turn has read the 20,000-token foundation from cache.第16到25分钟：你请求变更，这意味着更多的工具调用、更多的终端输出，以及更多动态后缀中积累的上下文。到目前为止，会话已经处理了数十万个令牌，但每一回合都从缓存中读取了2万个令牌的基础。

Minute 28: You run /cost in the terminal. Without caching, 2 million tokens at the Sonnet 4.5 rate would cost $6.00. With the cache running at 92% efficiency, 1.84 million tokens were cache reads, bringing the total cost to $1.15. That’s an 81% reduction on a single task.第 28 分钟：你在航站楼运行/成本。如果不缓存，按 Sonnet 4.5 的速率，200 万个代币的成本为 6.00 美元。缓存运行效率为 92%，缓存读取量达 184 万个，总成本达到 115 美元。这意味着单项任务的减少率是 81%。

![[b87bfaec3610fe1a6d014a6341330043_MD5.jpg]]

This is how a hot cache looks. You have to pay for the static foundation once, and then you can read it for free. The dynamic tail is the only thing that is ever charged.这就是热宝藏的样子。你只需付费一次静态基础，然后才能免费阅读。动态尾部是唯一充满电的部件。

## The fragility of hash-based caching基于哈希缓存的脆弱性

Here’s the most counterintuitive thing about prompt caching:关于提示缓存，这里有个最反直觉的地方：

“1 + 2 = 3” works but “2 + 1” is a cache miss.“1 + 2 = 3”可以，但“2 + 1”是缓存未命中。

The infrastructure hashes the full token sequence from the beginning. If anything in that sequence changes, even just the order of two elements, the hash changes and the entire prefix gets recomputed at full price.基础设施从一开始就对完整的令牌序列进行哈希。如果序列中有任何变化，甚至仅仅是两个元素的顺序，哈希值就会改变，整个前缀会以全价重新计算。

![[a4a8fe5a42419c3651bc283d9d0c8cfa_MD5.jpg]]

This isn’t a minor implementation detail. It’s the central constraint that every engineering decision in Claude Code is designed around.这可不是小的实现细节。这是 Claude Code 中每一个工程决策设计的核心约束。

Here are real examples of what has broken caches in production:以下是生产环境中导致缓存失效的真实例子：

- A timestamp injected into the system prompt created a unique hash on every request.注入系统提示符的时间戳会在每个请求中创建一个独特的哈希值。
- A JSON serializer that sorted tool schema keys differently between requests invalidated the prefix.一个 JSON 串行器在不同请求之间对工具模式键进行不同排序，导致前缀失效。
- An AgentTool whose parameters were updated mid-session wiped the entire 20,000-token cache.一个在会话中更新参数的 AgentTool 会清除整个 2 万个令牌缓存。

Three rules follow from this:由此得出三条规则：

1. Don’t modify tools during a session. The tool definitions are part of the cached prefix, so adding or removing a tool invalidates everything downstream.不要在治疗过程中修改工具。工具定义是缓存前缀的一部分，因此添加或移除工具会使后续所有内容失效。
2. Never switch models mid-session. Caches are model-specific, which means switching to a cheaper model mid-conversation requires rebuilding the entire cache from scratch.绝不要在游戏中途切换模型。缓存是特定型号的，这意味着在对话中切换到更便宜的模型需要从头重建整个缓存。
3. Never mutate the prefix to update state. Instead of editing the system prompt, Claude Code appends a reminder tag to the next user message so that the prefix stays untouched.绝不要变异前缀以更新状态。Claude Code 不编辑系统提示符，而是在下一条用户消息后附加提醒标签，确保前缀保持不动。

## Applying this to your own Agents将这些应用到您自己的代理人身上

The same rules apply whether you’re using Claude Code or building your own agent from scratch.无论你是用 Claude 代码还是从零开始构建代理，规则都一样。

Structure your prompts in this order:请按以下顺序组织你的提示：

1. System instructions and behavioral rules at the top. Don’t change them mid-session.系统指令和行为规则在顶部。不要在游戏中途更改。
2. Load all tool definitions upfront. Don’t add or remove them.所有工具定义都要提前加载。不要添加或删除它们。
3. Retrieved context and reference documents next. Keep them stable for the session duration.接下来检索上下文和参考文献。在游戏过程中保持稳定。
4. Conversation history and tool outputs at the bottom. This is your dynamic suffix.对话历史和工具输出在底部。这是你的动态后缀。

![[bfe94ed79ae25af0416cc318ed60fc70_MD5.jpg]]

With auto-caching enabled on the Anthropic API, the cache breakpoint advances automatically as the conversation grows. Without it, you’d need to manually track token boundaries, and a wrong boundary means missing the cache entirely.

For context compaction when you’re approaching the context limit, use cache-safe forking. Keep the same system prompt, tools, and conversation history, then append the compaction instruction as a new message. The cached prefix gets reused, and the only new tokens billed are the compaction instruction itself.

![[038b8ef0ad288b9fe3e46ac15dfdcc3e_MD5.jpg]]

To verify your caching is working, monitor these three fields in every API response:

- cache\_creation\_input\_tokens are the tokens written to cache.
- cache\_read\_input\_tokens are the tokens served from cache.
- input\_tokens are the tokens processed without caching.

Your cache efficiency is cache\_read\_input\_tokens / (cache\_read\_input\_tokens + cache\_creation\_input\_tokens). Track it the same way you track uptime.

## Key takeaways

Prompt caching isn’t a feature you toggle on. It’s an architectural discipline you design around.

The core idea is simple: structure your prompts so the static content sits at the top and the dynamic content grows at the bottom. The infrastructure hashes the prefix, stores the KV tensors, and gives you a 90% discount on every subsequent read.

But the discipline is in the details. Don’t inject timestamps into system prompts, don’t shuffle tool definitions, don’t switch models mid-session, and don’t mutate anything upstream of the cache breakpoint.

Claude Code demonstrates what this looks like at scale, with a 92% cache hit rate and an 81% cost reduction. If you’re building agents and not designing around prompt caching, you’re leaving most of your margin on the table.[​](https://www.dailydoseofds.com/llmops-crash-course-part-1/)

That's a wrap!

If you enjoyed this tutorial:

Find me → [@\_avichawla](https://x.com/@_avichawla)

Every day, I share tutorials and insights on DS, ML, LLMs, and RAGs.