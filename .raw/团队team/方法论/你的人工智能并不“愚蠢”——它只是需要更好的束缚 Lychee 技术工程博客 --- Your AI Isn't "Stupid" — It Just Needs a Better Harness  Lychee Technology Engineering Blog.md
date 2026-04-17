---
title: "你的人工智能并不“愚蠢”——它只是需要更好的束缚 |Lychee 技术工程博客 --- Your AI Isn't \"Stupid\" — It Just Needs a Better Harness | Lychee Technology Engineering Blog"
source: "https://blog.ltbase.dev/posts/agents/harness-engineering"
author:
published:
created: 2026-04-16
---
## Your AI Isn't "Stupid" — It Just Needs a Better Harness 你的 AI 并不“愚蠢”——它只是需要更好的工具

TL;DR. Agents don't fail because models are weak. They fail because systems are undefined.  
总结：特工失败不是因为模型薄弱。它们失败是因为系统是未定义的。

A good harness does four things:  
一个好的背带有四个功能：

- Constrains what the model can do  
	限制模型的功能
- Externalizes what it must remember  
	外化它必须记住的内容
- Verifies every step it takes  
	验证每一步
- Recovers when things go wrong  
	遇到问题时恢复

## The Problem: The 10-Step Collapse 问题：十步崩溃

Imagine you deploy an autonomous agent to compile a market research report. Steps 1 through 3 execute perfectly: it plans the task, searches the web, and extracts competitor data.  
想象一下，你部署一个自主代理来编制一份市场调研报告。第1到第3步执行得非常完美：它规划任务、搜索网页并提取竞争对手数据。

But by step 7, it starts hallucinating statistics—because the search tool's payload exceeded the context window and was silently truncated. By step 10, it outputs a broken JSON string because there was no schema validator in the loop. The entire pipeline crashes.  
但到了第七步，它开始产生统计数据的幻觉——因为搜索工具的负载超过了上下文窗口，被悄无声地截断了。到了第 10 步，它输出了一个破损的 JSON 字符串，因为循环中没有模式验证器。整个管道崩溃。

We've all witnessed this "agentic collapse." And in those moments, it's tempting to blame the model's reasoning. But in production-grade AI, the problem usually isn't the horse. It's the reins.  
我们都见证过这种“能动性崩溃”。在那些时刻，很容易把责任归咎于模特的推理。但在生产级人工智能中，问题通常不在马身上。是缰绳。

## The Root Cause: A Paradigm Shift in AI Engineering 根本原因：人工智能工程的范式转变

For the past two years, the industry has treated AI failures as a communication problem. If a model failed, we assumed we just needed to ask better or feed it better documents. But for long-horizon, autonomous execution, these approaches hit a hard ceiling.  
过去两年，行业一直将人工智能失败视为沟通问题。如果模型失败，我们就认为只需提出更好的要求或提供更好的文件。但对于长期自主执行，这些方法遇到了硬性天花板。

We are now entering the era of **Harness Engineering** —the discipline of designing the system *around* the model. An agent is not just the LLM. It is the LLM embedded within a strict scaffolding of code, state management, and recovery workflows.  
我们现在正进入 **束缚工程** 时代——即 *围绕* 模型设计系统的学科。代理不仅仅是 LLM。它是嵌入在严格代码、状态管理和恢复工作流程支架中的大型语言模型。

Here's how the field has evolved:  
以下是该领域的发展历程：

| Era 时代 | Focus 重点 | Limitation 限制 |
| --- | --- | --- |
| **Prompt Engineering 提示工程** | *Instructions:* How to ask.   *说明：* 怎么问呢。 | Brittle; zero persistence across steps.   脆性;每个步骤都没有任何坚持。 |
| **Context Engineering 上下文工程** | *Information:* What to know (e.g., RAG).   *信息：* 需要了解的内容（例如，RAG）。 | Stateless; cannot control long-horizon execution.   无国籍;无法控制长期执行。 |
| **Harness Engineering 束带工程** | *System Design:* How to constrain and run.   *系统设计：* 如何约束和逃避。 | Solves continuous, multi-step execution control.   解决连续多步执行控制问题。 |

Each era didn't replace the last—it subsumed it. Good harness engineering still requires good prompts and good context. But it adds the execution layer that neither of them provides.  
每个时代都不是取代上一个——而是吞没了它。好的线束工程仍然需要好的提示和良好的背景信息。但它增加了两者都没有的执行层。

The natural next question is: **what does that execution layer actually look like?**  
自然的下一个问题是： **那个执行层到底是什么样子？**

Not conceptually—but structurally. If the model is no longer the system, then where does it sit? What surrounds it? What controls it?  
不是概念上的——而是结构上的。如果模型不再是系统，那它会处于什么位置？周围是什么？是什么控制着它？

At a high level, a production-grade agent system looks like this:  
从高层面来看，生产级代理系统大致如下：

```
┌─────────────────────────────────┐
│          User Request           │
└────────────────┬────────────────┘
                 ▼
┌─────────────────────────────────┐
│       HARNESS (7 layer stack)   │
│  ┌───────────────────────────┐  │
│  │     LLM (The Model)       │  │
│  └───────────────────────────┘  │
└────────────────┬────────────────┘
                 ▼
┌─────────────────────────────────┐
│        Verified Output          │
└─────────────────────────────────┘
```

The model is *inside* the harness. It never speaks to the user directly, and it never speaks to the outside world without supervision. Every input is filtered on the way in; every output is validated on the way out.  
模型就在安全带 *里* 。它从不直接与用户对话，也不会在没有监督的情况下与外界交流。所有输入在输入过程中都会被过滤;每个输出在出厂时都会被验证。

---

## The Design Principles of a Good Harness 良好安全带的设计原则

Before we dive into the specific layers, it's worth establishing the principles that should guide every design decision. When you're unsure whether your harness is doing its job, come back to these four tests:  
在深入具体层级之前，有必要先确定指导每项设计决策的原则。当你不确定背带是否能发挥作用时，可以回头做这四个测试：

**1\. Constrain, don't instruct.** Never rely on the model to "choose correctly" if you can restrict its choices programmatically. A prompt that says "always respond in valid JSON" is a hope. A schema validator that rejects malformed output is a guarantee.  
**1\. 约束，不指导。** 如果你能在程序上限制模型的选择，千万不要指望模型“正确选择”。一个提示“始终以有效 JSON 响应”是希望。一个拒绝错误输出的模式验证器是保证的。

**2\. Externalize state.** If a piece of information matters to the task's continuity—what's been done, what's pending, what failed—it must exist outside the context window. Context windows are volatile. Files on disk are not.  
**2\. 外部化状态。** 如果一条信息对任务的连续性很重要——无论是已经完成了什么、待处理什么、失败了什么——它必须存在于上下文窗口之外。上下文窗口是不稳定的。磁盘上的文件则不是。

**3\. Make every step verifiable.** If you can't check it, you can't trust it. Every layer of your harness should produce outputs that can be validated by something other than the model that generated them.  
**3\. 让每一步都可验证。** 如果你不能检查，就不能信任它。你的线束的每一层都应该产生输出，这些输出可以被生成模型以外的其他东西验证。

**4\. Fail locally, not globally.** A single failed tool call should trigger a retry of that step—not a restart of the entire pipeline. The blast radius of any failure should be as small as your state management allows.  
**4\. 在局部失败，而非全球失败。** 一次工具调用失败应该触发该步骤的重试——而不是整个流水线的重启。任何故障的爆炸半径应尽可能小，符合你所在州的管理层允许。

These aren't abstract ideals. They're engineering constraints with direct implementation consequences, and you'll see each of them surface repeatedly in the stack below.  
这些都不是抽象的理想。它们是工程限制，直接影响实施，你会在下面的堆栈中反复看到它们。

---

## The 7-Layer Harness Stack 7层线束堆栈

A robust harness doesn't just pass text back and forth. It orchestrates a typed, stateful, and observable system. Here is what a production-ready stack looks like under the hood.  
坚固的线束不仅仅是来回传递文本。它协调一个类型化、有状态且可观察的系统。这就是一个生产准备的组装套件在内部的样子。

### 1\. Cognition 1. 认知

The foundation layer. It restricts the model's operational boundaries. Instead of a massive, encyclopedic system prompt, the harness feeds the model a localized "map" of its current role, its success criteria, and strict negative constraints—what *not* to do. Think of it as giving the model a job description rather than an encyclopedia.  
地基层。它限制了模型的操作边界。它不是给出庞大、百科全书式的系统提示，而是向模型提供一个局部的“地图”，展示其当前角色、成功标准以及严格的负面限制——哪些 *是不能* 做的。可以把它看作是给模特一份职位描述，而不是一本百科全书。

In practice, this often takes the form of structured system prompts, role files (e.g., `agents.md`), or dynamically generated task briefs scoped to a single step.  
在实际操作中，这通常表现为结构化系统提示、角色文件（例如 `agents.md` ）或动态生成的任务简报，具体作用于单一步。

### 2\. Tools 2. 工具

The harness does not simply pass raw tool outputs back to the LLM. It acts as a strict middleware layer that applies:  
线束不会简单地将原始工具输出反馈给 LLM。它作为一个严格的中间件层，适用于：

- **Ranking:** Uses embedding similarity or BM25 scoring to surface only the most relevant results.  
	**排名：** 使用嵌入相似度或 BM25 评分，仅显示最相关的结果。
- **Deduplication:** Strips repetitive data before it wastes precious tokens.  
	**去重：** 在浪费宝贵代币之前，去除重复数据。
- **Token Budget Truncation:** Hard-caps tool payloads to prevent context overflow—the exact failure mode from our opening example.  
	**代币预算截断：** 硬容量工具有效载荷以防止上下文溢出——正是我们开场例子中失败的模式。

### 3\. Contracts & Interfaces 3. 契约与接口

This is the layer most teams skip—and the one that causes the most mysterious production failures.  
这是大多数团队跳过的层面——也是导致最神秘生产失败的部分。

The model speaks in probabilities. The harness must speak in types.  
模型以概率来表达。背带必须有多种类型。

Every boundary in the system—between the LLM and a tool, between one agent and another, between the harness and the outside world—needs an explicit contract: a strict JSON schema, a typed function signature, a versioned API spec. Without this, you get **schema drift**: the model generates a `price` field as a string one time and a float the next, and your downstream pipeline silently produces garbage.  
系统中的每一条边界——LLM 与工具之间、代理之间、线束与外部世界之间——都需要明确的契约：严格的 JSON 模式、类型化函数签名、版本化 API 规范。没有这个，就会出现 **模式漂移** ：模型有时生成 `价格` 字段为字符串，下一次生成浮点，而你的下游流水线则默默产生垃圾。

The contract layer validates inputs and outputs at every boundary crossing, rejecting anything that doesn't conform *before* it propagates. This is where Principle 1 (constrain, don't instruct) earns its keep. Without contracts, subtle schema drift can silently corrupt downstream systems, e.g., a pricing field switching from float to string without breaking the pipeline, but breaking analytics.  
契约层在每个边界交叉处验证输入和输出，拒绝任何不符合的内容 *，然后传播。* 这正是原则 1（约束，不教导）的用处。没有契约，细微的模式漂移可以悄无声息地破坏下游系统，例如，定价字段从浮动切换到字符串，虽然不破坏流水线，但会破坏分析。

### 4\. Orchestration 4. 配器

Without this layer, an LLM tends to loop infinitely, skip critical steps, or prematurely declare victory. The harness enforces a structured workflow—either a Directed Acyclic Graph (DAG) or a state machine—that defines the legal transitions: *Plan → Gather → Draft → Verify*. The model proposes actions; the harness decides which actions are allowed.  
没有这一层，LLM 往往会无限循环，跳过关键步骤，或者过早宣布胜利。该工具束强制执行一个结构化的工作流——无论是有向无环图（DAG）还是状态机——定义了合法的过渡： *计划→收集→草稿→验证* 。模型提出动作;安全带决定允许的动作。

### 5\. Memory & State 5. 内存与状态

State must be explicitly managed to prevent amnesia. A mature harness splits memory into two tiers:  
状态必须被明确管理以防止失忆。成熟的线束将内存分为两层：

- **Working Memory (Short-term):** The immediate conversation and context window needed for the current step.  
	**工作记忆（短期）：** 当前步骤所需的即时对话和上下文窗口。
- **Persistent State (Long-term):** A structured file (e.g., `state.json`) that tracks exactly which sub-tasks are pending, in-progress, or completed—surviving across context resets and even across sessions.  
	**持续状态（长期）：** 一个结构化文件（例如 `state.json` ），准确跟踪哪些子任务处于待处理、进行中或已完成——能够在上下文重置甚至会话间存活。

This is Principle 2 (externalize state) in practice. If a piece of information only lives inside the context window, it will eventually be lost.  
这就是原则2（状态外化）。如果一条信息只存在于上下文窗口内，最终会丢失。

### 6\. Evaluation & Observation 6. 评估与观察

A system cannot rely solely on "another LLM prompt" for validation. The evaluation layer must be heterogeneous:  
系统不能仅依赖“另一个 LLM 提示”来验证。评估层必须是异构的：

- **Rule-based checks:** Validating JSON schemas, string lengths, or required fields.  
	**基于规则的检查：** 验证 JSON 模式、字符串长度或必需字段。
- **Tool-based verification:** Running code through a compiler, executing test suites, or using browser automation (like Playwright) to physically test a UI.  
	**基于工具的验证：** 通过编译器运行代码、执行测试套件，或者使用浏览器自动化（如 Playwright）来物理测试 UI。
- **LLM-as-judge:** Reserved *only* for subjective or semantic grading—tone, coherence, user-friendliness—where deterministic checks can't apply.  
	作为 **法官的 LLM：** *仅* 保留用于主观或语义评分——语气、连贯性、用户友好性——在确定性检查无法适用的情况下。

### 7\. Constraints & Recovery 7. 约束与恢复

In autonomous environments, tool failures and API timeouts are the norm, not the exception. The harness must enforce **idempotency**: if a step fails, the system retries that specific step without corrupting the overall state or duplicating previous work. This is what turns a fragile demo into a resilient system—and it's Principle 4 (fail locally, not globally) made concrete.  
在自主环境中，工具故障和 API 超时是常态，而非例外。约束必须强制执行 **幂等性** ：如果某一步失败，系统会重试该特定步骤，同时不会破坏整体状态或重复之前的工作。这正是将脆弱的演示转变为韧性系统的关键——而其原则 4（局部失败，而非全球失败）将被具体化。

---

## Example: One Full Agent Run 示例：一次完整代理运行

To see how these layers prevent a collapse, let's trace a full cycle of our Market Research Agent—including a real failure.  
为了了解这些层次如何防止崩溃，让我们追踪市场调研代理的完整周期——包括一次真实的失败。

**Step 1 — User Request:** "Compare pricing between Competitor A and Competitor B."  
**第一步 — 用户请求：** “比较竞争对手 A 和竞争对手 B 的价格。”

**Step 2 — Orchestration & State:** The Planner LLM decomposes this into a DAG with two parallel branches. `state.json` marks "Fetch Competitor A" as `IN_PROGRESS`.  
**第二步——编排与状态：** Planner LLM 将其分解为带有两个并行分支的 DAG。 `state.json` 标注为“取回参赛者 A”为 `IN_PROGRESS` 。

**Step 3 — Tool Call:** The LLM triggers a web search. The Tool layer fetches 50 results, applies BM25 ranking, deduplicates overlapping text, and returns only the top 3,000 tokens—well within budget. The Contract layer validates the tool's output against the expected schema before passing it to the model.  
**第三步 — 工具调用：** LLM 触发了网页搜索。工具层获取 50 条结果，应用 BM25 排名，去重叠文本，只返回前 3000 个代币——完全符合预算。合同层会在传递给模型之前，验证工具输出是否符合预期模式。

**Step 4 — Evaluation:** The LLM generates pricing data. The Evaluation layer runs a rule-based schema check and catches that the JSON is missing the required `currency` field.  
**第四步——评估：** LLM 生成定价数据。评估层运行基于规则的模式检查，并发现 JSON 缺少所需的 `货币` 字段。

**Step 5 — Recovery:** The harness intercepts the error *before* the user ever sees it. Because the action is idempotent, it passes the exact error trace back to the LLM for a localized retry—no need to restart the entire pipeline.  
**第五步——康复：** 安全带会在用户看到错误之前拦截它。由于该动作是幂等的，它会将准确的错误路径反馈给 LLM 进行局部重试——无需重启整个流水线。

**Step 6 — State Update:** The corrected data passes validation. `state.json` marks Competitor A as `COMPLETED`, and the harness moves to Competitor B.  
**第六步——州更新：** 修正后的数据通过验证。 `state.json` 标记参赛者 A 为 `完成 ` ，吊带移至参赛者 B。

**Step 7 — Hard Failure:** The web search tool returns an empty result for Competitor B—the site is down. The harness detects the empty payload, logs the failure, and triggers a fallback: retry with an alternative search query. Critically, `state.json` remains unchanged at this point—no partial or corrupted data is written until the step fully succeeds.  
**第七步——艰难失败：** 网络搜索工具会返回竞争对手 B 的空结果——该网站已宕机。线束检测空载，记录失败，并触发一个备选：用替代搜索查询重试。关键是 `，state.json` 在此阶段保持不变——在步骤完全成功之前，不会写入任何部分或损坏的数据。

**Step 8 — Fallback Succeeds:** The alternative query returns valid results. The Contract layer validates the schema, the Evaluation layer confirms all required fields are present, and only now does `state.json` mark Competitor B as `COMPLETED`.  
**第八步——备选成功：** 替代查询结果有效。合同层验证模式，评估层确认所有必填字段，只有此时 `state.json` 才将竞争对手 B 标记为 `已完成 ` 。

This cycle repeats dozens or hundreds of times in long-running tasks. Unlike the 10-step collapse in our introduction, when a tool failed outright, the system absorbed the shock and recovered without human intervention. No hallucination. No silent failure. No crash.  
在长期任务中，这种循环会重复数十甚至数百次。与我们介绍中十步崩溃不同，当工具彻底失效时，系统吸收冲击并自行恢复，无需人工干预。没有幻觉。没有无声的失败。没有崩溃。

---

## Advanced Traps: 4 Lessons from the Frontlines 高级陷阱：前线的4课

When you scale this architecture to run for hours, new failure modes emerge that no amount of prompt tuning can fix. Here are four that consistently bite teams in production.  
当你将这种架构扩展到运行数小时时，会出现新的故障模式，无论如何调整都无法解决。以下是四个在生产阶段持续击败球队的球队。

### Trap 1: The "Context Anxiety" Phenomenon 陷阱一：“情境焦虑”现象

As an agent works and its context window fills up, models often exhibit a behavioral shift that practitioners have come to call "context anxiety." When approaching token limits—typically above 70% capacity—or when latency spikes, the model begins to skip steps or prematurely conclude the task. It acts rushed, as if it can feel the walls closing in.  
当代理工作且其情境窗口逐渐填满时，模型常表现出一种行为转变，从业者称之为“情境焦虑”。当接近令牌容量上限——通常超过70%容量——或延迟激增时，模型开始跳过步骤或提前结束任务。它表现得很匆忙，仿佛能感觉到墙壁在逼近。

**The Fix:** In-place summarization is not enough—it still leaves the model operating on a cluttered, degraded context. Instead, execute a **Context Reset**. The harness monitors utilization and triggers the reset programmatically:  
**解决办法：** 原地总结还不够——它仍然让模型在杂乱、退化的环境中运行。相反，执行 **上下文重置** 。线束监控使用情况，并以程序方式触发重置：

```python
# This threshold is empirical and should be tuned per model and workload.
if (tokens_used / max_context) > 0.7:
    save_state_to_disk(state)
    terminate_current_instance()
    launch_fresh_agent(state)
```

The harness saves the exact project state to persistent storage, terminates the current LLM instance, and launches a completely fresh agent with a clean context window. The new agent reads the saved state, orients itself, and continues. This is expensive but dramatically more reliable for tasks that exceed a single context window.  
该框架会将项目的精确状态保存到持久存储，终止当前的 LLM 实例，并以干净的上下文窗口启动一个全新的代理。新代理读取已保存状态，调整方向后继续。这虽然成本高昂，但对于超过单个上下文窗口的任务来说，稳定性要大得多。

### Trap 2: The Self-Grading Illusion 陷阱二：自我评分的幻觉

If you ask an AI to grade its own work, it tends to approve mediocre output with unearned confidence. This isn't a bug in any specific model—it's a structural flaw. The same weights that generated the output are poorly positioned to critique it.  
如果你让 AI 给自己的作业评分，它往往会无端自信地认可平庸的成果。这不是任何特定型号的漏洞——而是结构缺陷。产生产出的权重却不适合批判它。

**The Fix:** Implement a strict separation of concerns using a **Sprint Contract**. Before work begins, the Generator agent and an independent Evaluator agent negotiate a concrete, testable definition of "done." Two rules are non-negotiable:  
**解决办法：** 通过 **Sprint** 合同实现严格的关注点分离。在工作开始前，发电机代理与独立评估代理协商一个具体且可测试的“完成”定义。有两条规则不可妥协：

First, the Evaluator must *execute*: it should run the code, validate the interface in a headless browser, or check the output against a schema—not just read the raw text and render a judgment. Verification that can't be faked is the only verification that counts.  
首先，评估器必须 *执行* ：它应该运行代码，在无头浏览器中验证界面，或将输出与模式对照——而不仅仅是阅读原始文本并做出判断。无法伪造的验证是唯一有效的验证。

Second, the Evaluator must operate on a clean context, not the Generator's full reasoning trace. If the Evaluator reads the Generator's chain-of-thought, it inherits the Generator's assumptions and blind spots—defeating the entire purpose of independent review. Give the Evaluator the output and the success criteria. Nothing more.  
其次，评估者必须在干净的上下文上操作，而非生成器的完整推理轨迹。如果评估者读取了生成器的思维链条，它就会继承生成器的假设和盲点——这就违背了独立审查的全部意义。给评估者输出和成功标准。仅此而已。

### Trap 3: Optimizing for the Illusion of Correctness 陷阱三：优化正确的错觉

When an LLM is placed under impossible or contradictory constraints—fix this bug, but don't change any code; make it shorter, but include everything—practitioners have observed a consistent behavioral pattern. The model stops trying to solve the actual problem and instead optimizes for *looking* correct. Outputs become fluent but hollow: hallucinated data, superficially plausible but broken logic, or answers that technically satisfy the letter of the prompt while violating its intent.  
当 LLM 处于不可能或矛盾的约束条件下——修复这个 bug，但不要更改任何代码;要简短一些，但要涵盖所有内容——从业者已经观察到一种一致的行为模式。模型不再试图解决实际问题，而是优化 *看起来* 正确。输出变得流畅却空洞：幻觉数据、表面合理但逻辑破碎，或技术上满足提示字面但违背其意图的答案。

Recent research on steering vectors and internal model representations—including work from Anthropic on probing the inner states of language models—suggests this isn't just surface-level text prediction going awry. There appear to be measurable shifts in a model's internal state under conflicting pressure, though this line of research is still in its early stages.  
最近关于引导向量和内部模型表征的研究——包括 Anthropic 关于探究语言模型内在状态的研究——表明这不仅仅是表面文本预测的失误。在相互矛盾的压力下，模型内部状态似乎存在可测量的变化，尽管这一研究方向仍处于早期阶段。

**The Fix:** The practical takeaway is straightforward. LLMs predict the next token based on the trajectory of the current context. If your harness feeds back aggressive, emotional error messages ("You are stupid, this is completely wrong"), you bias the context toward a narrative of failure—and the model's subsequent outputs tend to degrade further. Harness feedback must remain strictly objective: supply the compiler error, the failed assertion, the schema mismatch. Give the model a problem to solve, not a reputation to live down.  
**解决办法：** 实际结论很简单。LLM 根据当前上下文的轨迹预测下一个代币。如果你的束带反馈出激烈的情绪错误信息（“你很愚蠢，这完全错了”），你会让上下文偏向失败的叙事——模型后续输出往往会进一步退化。线束反馈必须保持严格客观：提供编译器错误、失败断言、模式不匹配。给模型一个需要解决的问题，而不是一个需要靠谱的名声。

### Trap 4: The Memory Consolidation Cycle 陷阱四：记忆巩固循环

For an agent to function as a long-running system, persistent state management isn't a one-off setup. Over time, memory logs become bloated and contradictory—old decisions conflict with new ones, and redundant entries waste tokens on every read.  
对于一个代理来说，作为一个长期运行的系统，持久状态管理不是一次性的。随着时间推移，内存日志变得臃肿且矛盾——旧决策与新决策冲突，冗余条目浪费每次读取的代币。

Some production agent systems have adopted an approach often called **Memory Consolidation**: an automated routine that periodically processes and compresses the agent's accumulated working logs. Reports from teams using this pattern (including references in open-source agent frameworks and Anthropic's own tooling) suggest impressive results—in one documented instance, a harness compressed 32K tokens of noisy, repetitive history into a clean 7K-token state file without meaningful information loss.  
一些生产代理系统采用了一种通常称为 **内存整合** 的方法：一种自动化程序，定期处理和压缩代理积累的工作日志。使用该模式的团队报告（包括开源代理框架和 Anthropic 自有工具的引用）显示出令人印象深刻的成果——在一个有据可查的实例中，一个线束将 32K 个噪声重复的历史标记压缩成一个干净的 7K 标记状态文件，且没有造成实质信息丢失。

**The Fix:** Implement an automated consolidation cycle. When the agent is idle—between tasks or during low-priority windows—trigger a background job that reads the raw logs, deduplicates entries, resolves contradictions in favor of the most recent data, and writes a clean, compressed state file. This keeps the agent fast, cheap, and accurate for its next run. Think of it as defragmenting a hard drive, but for an AI's working memory.  
**解决办法：** 实施自动化合并周期。当代理处于空闲状态——无论是在任务之间还是低优先级窗口内——触发后台作业，读取原始日志，去重条目，解决矛盾以支持最新数据，并写入一个干净、压缩的状态文件。这样可以让特工在下一次运行时保持快速、便宜和准确。可以把它想象成对硬盘进行碎片整理，但对 AI 的工作记忆来说。

---

## Where to Start: The Minimum Viable Harness 从哪里开始：最小可行的安全带

If the seven-layer stack feels overwhelming, don't try to build all of it on day one. Start with Layer 7—Constraints & Recovery—and work backward. You can live with imperfect prompts. You can live with a naive tool integration. But you cannot live with an agent that corrupts its own state on failure or silently swallows errors.  
如果七层堆叠让你感到压力山大，不要试图第一天就全部建好。从第7层——约束与恢复——开始，然后倒推。你可以接受不完美的提示。你可以接受一个简单的工具集成。但你不能忍受一个在失败时破坏自身状态或默默吞下错误的代理。

Here's what a Day 1 harness looks like in practice:  
这是第一天背带在实际操作中的样子：

- **`state.json`** — A single structured file that tracks task status. If the process dies, you can pick up where you left off.  
	**`state.json`** — 一个跟踪任务状态的结构化文件。如果过程停止，你可以从中断的地方继续。
- **Retry wrapper** — Every tool call gets a try/catch with at least one automatic retry and exponential backoff.  
	**重试包装器** ——每次工具调用都会有一次尝试/接住，至少有一次自动重试和指数级退回。
- **Schema validator** — Every LLM output is validated against a JSON schema before it's accepted. Malformed output triggers a retry, not a crash.  
	**模式验证器** ——每个 LLM 输出都会经过 JSON 模式验证后才被接受。malformed 输出会触发重试，而不是崩溃。
- **Tool output truncation** — Hard-cap every tool payload to a fixed token budget. Silent truncation inside the context window is one of the most common causes of hallucination.  
	**工具输出截断** ——将每个工具有效载荷硬性限制在固定的令牌预算内。上下文窗口内的无声截断是最常见的幻觉原因之一。

These four components can be built in a single afternoon. Once your agent can fail gracefully, you've earned the right to make it smarter.  
这四个部分可以在一个下午内完成。一旦你的经纪人能够优雅地失败，你就有资格让它变得更智能。

## Conclusion 结论

The future of software is agent-first. As models gain the raw capability to autonomously generate and verify complex systems, human value shifts. It's no longer about writing syntax. It's about designing the constraints that make autonomous execution reliable.  
软件的未来是代理优先。随着模型获得自主生成和验证复杂系统的能力，人类价值发生了变化。这已经不再是写语法的问题了。关键在于设计使自主执行可靠的约束条件。

The most successful builders of the next decade won't be the ones who write the best code. They'll be the ones who engineer the best harnesses — building the strongest reins for the fastest horses, and those reins are nothing more than the consistent application of a few principles: constrain, externalize, verify, and recover.  
未来十年最成功的开发者不会是那些写出最佳代码的人。他们将是设计最佳马具的人——为最快的马打造最强的缰绳，而这些缰绳不过是几个原则的持续应用：约束、外化、验证和恢复。

---

*For the implementation details behind each layer—state storage, verification nodes, Sprint Contracts, and where to start—see the companion FAQ:*[**Harness Engineering from Theory to Production**](https://blog.ltbase.dev/posts/agents/harness-engineering-faq.html)  
*关于每个层背后的实现细节——状态存储、验证节点、冲刺合约以及起点——请参见配套常见问题* ： [**从理论到生产的利用工程**](https://blog.ltbase.dev/posts/agents/harness-engineering-faq.html)