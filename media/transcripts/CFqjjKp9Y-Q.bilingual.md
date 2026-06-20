# Bilingual Interview Transcript

## 00:00  Source / Source

**Original**: Andrew Mayne: Hello, I'm Andrew Mayne, and welcome to the OpenAI podcast.

**中文**：大家好，我是 Andrew Mayne，欢迎收听 Open AI 播客。

**Original**: Andrew Mayne: On today's episode, we're talking to the research lead, Andrew Mayne: Tejal Patwardhan, about the need to build frontier evals Andrew Mayne: as old benchmarks get saturated.

**中文**：在今天的节目中， 我们将与研究主管 Tej Jal Patwardhan 讨论 随着旧基准测试的饱和，构建更严格的评估的必要性 。

**Original**: Tejal Patwardhan: Generally bad.

**中文**：总体来说很糟糕。

**Original**: Benchmarking is bad.

**中文**：基准测试是不好的。

**Original**: Tejal Patwardhan: How can we make these models useful for people in their real work?

**中文**：如何 让这些模型对 人们的实际工作有所帮助？

**Original**: Tejal Patwardhan: We were really nervous because we were like, Tejal Patwardhan: this human baseline is kind of hard.

**中文**：我们当时真的很 紧张，因为我们觉得 人类的基准线很难确定。

**Original**: Tejal Patwardhan: We don't know if the model is going to beat it.

**中文**：我们不 知道该模型能否胜过它。

**Original**: Tejal Patwardhan: But we should never underestimate the model.

**中文**：但我们绝不应低估该 模型。

**Original**: Andrew Mayne: Tejal, I have a question.

**中文**：Tej Jal，我有个问题。

**Original**: Andrew Mayne: How did you end up where you were?

**中文**：你是怎么走到今天这一步的？

**Original**: Andrew Mayne: What brought you into OpenAI?

**中文**：是什么 让你加入OpenAI？

**Original**: Tejal Patwardhan: Oh, I thought we weren't going to start with this.

**中文**：哦，我还以为我们不会从

## 00:30  Source / Source

**Original**: Andrew Mayne: Tejal, I have a question for you.

**中文**：这个开始呢。

**Original**: Andrew Mayne: What would you like to start with?

**中文**：Tej Jal，我有个问题想问你。

**Original**: Tejal Patwardhan: Can we start with, like, tell us, like, what you did when you started OpenAI, and then you can, like, work backwards.

**中文**：你想从哪里开始？

**Original**: Andrew Mayne: Don't you want to talk about your early days?

**中文**：嗯，我们能不能先请你讲讲 你刚加入 OpenAI 时都做了些什么， 然后倒叙一下你的工作经历？

**Original**: Tejal Patwardhan: No.

**中文**：你现在想聊聊你的早期经历吗 ？

**Original**: Tejal Patwardhan: I grew up at OpenAI.

**中文**：不，我是在 OpenAI 长大的。

**Original**: Tejal Patwardhan: Okay.

**中文**：这就像是 自然而然的“ 好的”。

**Original**: Andrew Mayne: Tell me a bit about your journey here working inside artificial intelligence, inside OpenAI.

**中文**：[笑声] 嗯，跟我说说你在 人工智能领域，在 OpenAI 工作的经历吧。

**Original**: Tejal Patwardhan: So I joined OpenAI in fall 23, and it was right after ChatGPT had come out, GPT-4 was out, and OpenAI had started.

**中文**：所以，我在 2023 年秋季加入了 OpenAI，当时正值 ChatGPT 发布之后不久。

**Original**: Tejal Patwardhan: its Superalignment team.

**中文**：GPT-4 发布后，OpenAI 也成立了 超级对齐团队，我加入了这个

**Original**: Tejal Patwardhan: And I joined for the preparedness team that was getting started as we were starting to get a look at how capable these models were becoming and think about, you know, what would the next generation of models look like?

**中文**：GPT-4 发布后，OpenAI 也成立了 超级对齐团队，我加入了这个

## 01:00  Source / Source

**Original**: Tejal Patwardhan: And at the time, it was extremely exciting because right after I joined was when some of the early results for the reasoning models had started to pick up.

**中文**：准备团队，当时 我们开始 研究这些模型的能力 发展到什么程度，并思考 下一代模型 会是什么样子。

**Original**: Tejal Patwardhan: And we were thinking about, you know, if these models really take off, what will the future of capabilities look like and how can we be prepared for that future?

**中文**：当时这 非常令人兴奋，因为就在 我加入之后不久， 推理模型的一些早期成果 开始显现，我们当时就在 想，如果这些模型 真的发展起来，未来的 能力会是什么样子，我们该如何 为未来做好准备呢？

**Original**: Tejal Patwardhan: And so we did a whole bunch of work on like threat modeling and like what eval should we be running?

**中文**：因此，我们做了 很多关于威胁建模

## 01:30  Source / Source

**Original**: Tejal Patwardhan: How do we think about releasing a model like this?

**中文**：以及我们应该运行哪些评估等方面的工作 ？

**Original**: Tejal Patwardhan: It's a very exciting time to join.

**中文**：我们如何考虑发布 这样的模型？

**Original**: Andrew Mayne: What got you interested in this area?

**中文**：现在 加入正是绝佳时机。是什么让你对这个领域感兴趣？

**Original**: Tejal Patwardhan: Yeah, well, to me, evals are really exciting because they're a way to sort of measure and understand what our models can do and see progress, you know, sort of before it tends to happen.

**中文**：是的，对我来说，评估真的令人 兴奋，因为它们是一种 衡量和了解我们的 模型能做什么并看到进展的方法，你 知道，这往往是在进展发生之前。

**Original**: Tejal Patwardhan: Like there's this term called capability overhang, which is this idea that the models will be capable of things long before people actually adopt them and use them for those capabilities.

**中文**：比如有这样一个术语叫做能力 过剩，指的是 模型在 人们真正采用并 利用其功能之前很久就已经具备了某些能力。

**Original**: Tejal Patwardhan: There might be cultural or legal or regulatory barriers towards using a capability even before it's ready.

**中文**：比如 ，你知道，即使在某项能力尚未准备就绪之前，使用它也可能存在 文化、法律或监管方面的障碍

## 02:00  Source / Source

**Original**: Tejal Patwardhan: And so being someone who can help develop and measure our models via evals, Tejal Patwardhan: it helps you really understand what this technology can do and sort of see the future before it happens, Tejal Patwardhan: which is very interesting.

**中文**：。

**Original**: Tejal Patwardhan: And I also think it's important because it can help sort of ready the world for what's happening.

**中文**：因此，能够通过 评估来帮助开发和衡量我们的模型，可以帮助你真正 了解这项技术的功能， 并在未来发生之前预见未来 ，这非常 有趣。

**Original**: Tejal Patwardhan: When I originally started here, part of why I was really excited to work on some of the preparedness evals Tejal Patwardhan: was because I thought these models were getting very capable.

**中文**：而且我认为这也很 重要，因为它可以帮助 世界为正在发生的事情做好准备。

**Original**: Tejal Patwardhan: And it felt like a lot of my friends in my real life

**中文**：就像我最初 来这里的时候，我之所以对参与 一些 准备评估工作感到非常兴奋，部分原因是我认为 这些模型的能力越来越强， 而且我觉得我

## 02:30  Source / Source

**Original**: Tejal Patwardhan: didn't really understand how powerful these models would soon become Tejal Patwardhan: because they'd look at a ChatGPT output and be like, Tejal Patwardhan: yeah, it's hallucinating and it's kind of not that smart Tejal Patwardhan: and kind of reads like AI slop.

**中文**：现实生活中的很多朋友并不真正 理解这些模型 很快就会变得多么强大，因为他们会看看 聊天 GPT 的输出，然后说： “是啊，这简直是胡言乱语，一点 也不智能，读起来 就像人工智能的垃圾。

**Original**: Tejal Patwardhan: And it's like, well, that's now.

**中文**：” 这就好比是，“好吧， 这是现在的情况，但问题在于 斜率。

**Original**: Tejal Patwardhan: But the question is the slope.

**中文**：如果斜率非常高， 那么变化发生的速度可能 比人们预期的要快得多。

**Original**: Tejal Patwardhan: If the slope is very high, then change might be happening much faster Tejal Patwardhan: than one would expect.

**中文**：” 所以我认为我们能做的最伟大的服务之一 就是衡量并 与世界分享进步的模样， 尤其是因为在 人们

**Original**: Tejal Patwardhan: And so I think one of the greatest services that we can do Tejal Patwardhan: is sort of measure and share with the world what progress looks like, Tejal Patwardhan: especially because there's often this capability overhang

**中文**：” 所以我认为我们能做的最伟大的服务之一 就是衡量并 与世界分享进步的模样， 尤其是因为在 人们

## 03:00  Source / Source

**Original**: Tejal Patwardhan: before people really understand and feel that in the models themselves.

**中文**：真正理解和感受到进步之前，往往存在这种能力过剩的情况。

**Original**: Tejal Patwardhan: So that's part of why I think all of this is very important.

**中文**：嗯， 还有模型本身。

**Original**: Andrew Mayne: Reasoning was such an exciting moment.

**中文**：嗯， 所以我觉得 这一切都非常重要，部分原因就在于此。

**Original**: Andrew Mayne: And for most of the world, that didn't happen until a year later Andrew Mayne: that they found out about this.

**中文**：推理是一个激动人心的时刻， 但对世界上大多数人来说， 直到一年后 他们才发现这一点。

**Original**: Andrew Mayne: But what was that like for you to all of a sudden understand Andrew Mayne: that if you gave the models a longer time to think about things, Andrew Mayne: you got better results, even though the size hadn't gotten bigger.

**中文**：但 你突然 明白，即使尺寸没有变大，如果给模型 更长的时间思考，就能 得到更好的结果，这种感觉是怎样的呢？

**Original**: That was a really fun time.

**中文**：那段时间真的非常开心。

**Original**: Tejal Patwardhan: I mean, so in some of the early experiments, which we've talked about now, it's like the model is

**中文**：我的意思是，嗯， 在一些早期实验中（ 我们刚才也讨论过），

## 03:30  Source / Source

**Original**: Tejal Patwardhan: trained really just on math.

**中文**：模型似乎只是用 数学进行训练的。

**Original**: And I remember there was this set of experiments where Nat McAleese was Tejal Patwardhan: like, hey, the model is trained on math.

**中文**：我记得当时有一系列 实验，Nat McClees 说： “嘿，这个模型是用 数学训练的，但如果你用 GPQA 来评估它，GPQA 是一个包含生物、 化学和物理问题的基准测试，那么这个 模型表现得非常好。

**Original**: But if you eval it on GPQA, which was this benchmark with Tejal Patwardhan: biology and chemistry and physics problems, the model is doing really well.

**中文**：嗯， 这很有意思，更智能的 模型确实更智能。

**Original**: This is very interesting.

**中文**：” 他 当时做出了这样的预测： 如果国会 继续推进相关工作，6 个月内，仅通过数学训练，我们就能使人类 在科学方面达到人类水平 。

**Original**: Tejal Patwardhan: smarter models are much smarter.

**中文**：我们当时就想，

**Original**: And he had put together this forecast that at the time it said Tejal Patwardhan: that if, you know, progress kept going within six months, we'd have human level performance on Tejal Patwardhan: science from just training on math.

**中文**：我们当时就想，

**Original**: And we were like, oh my gosh, that's crazy.

**中文**：我们当时就想，

**Original**: And at the time,

**中文**：我们当时就想，

## 04:00  Source / Source

**Original**: Tejal Patwardhan: this was extremely locked down.

**中文**：“我的天哪，这太疯狂了。

**Original**: It was like, we kind of found our way to like curl to be able to Tejal Patwardhan: see some model outputs.

**中文**：” 当时这里处于极其严格的封锁状态。

**Original**: And we were like, wow, this is like one of the smartest things like I've Tejal Patwardhan: ever seen.

**中文**：感觉就像我们找到了一种方法， 可以坐下来仔细查看 模型的输出结果，然后我们惊叹道：“哇， 这简直是我见过的最智能的东西之一 。

**Original**: Like I've never seen a model reason like this before.

**中文**：我 以前从未见过这样的模型推理方式。

**Original**: It was just like, if this, Tejal Patwardhan: if this becomes a paradigm that continues to scale.

**中文**：” 就 好像如果这种模式发展成为 一种不断扩大规模的范式一样。但 后来我们回头一看，就觉得 ，你知道，GPQA 就像是，你 知道，博士级别的生物学、化学和 物理学。

**Original**: Tejal Patwardhan: But then we just looked back and we were like, Tejal Patwardhan: you know, GPQA was like, you know, Tejal Patwardhan: PhD level biology, chemistry, and physics.

**中文**：我们当时就想，“啊，那 是什么？

**Original**: Tejal Patwardhan: And we were like, ah, that's, what is that?

**中文**：我们真的需要 专业水平。

**Original**: Tejal Patwardhan: We really need professional level.

**中文**：” 我们似乎一直在 改变 衡量标准。

**Original**: Tejal Patwardhan: And we just like kept changing the stakes of what counted.

**中文**：是啊，那真是太棒了。

## 04:30  Source / Source

**Original**: Tejal Patwardhan: But yeah, it was very cool.

**中文**：我记得早期 AP 生物课只是用来 检验 模型是否能做到这一点的基准测试。

**Original**: Andrew Mayne: I remember early on when AP Bio was just, Andrew Mayne: that was the benchmark to try to see Andrew Mayne: if the model could do that.

**中文**：但 正如你提到的，有趣的是， OpenAI 发布的很多东西都以数学为重点。

**Original**: Andrew Mayne: But what's interesting as you brought this up Andrew Mayne: is that a lot of stuff that comes out from OpenAI Andrew Mayne: is math focused.

**中文**：数学之所以有用，是因为它 在某种程度上更容易客观验证。

**Original**: Tejal Patwardhan: Math has been useful because it's more objectively verifiable in some ways.

**中文**：因此，对于 我们早期训练的一些问题， 进行强化学习 和扩展数学推理范式会更容易 。

**Original**: Tejal Patwardhan: So some of the earlier problems that we trained on, it was just easier to do RL and scale up the reasoning paradigm on math.

**中文**：嗯，数学 在很多方面也很有用，你知道，它就 像是核心科学类型之一 。

**Original**: Tejal Patwardhan: And math is also useful in various ways.

**中文**：但从很多方面来看，这只是

**Original**: Tejal Patwardhan: You know, it's like one of the core types of science.

**中文**：但从很多方面来看，这只是

**Original**: Tejal Patwardhan: But also in many ways, it's just happened by coincidence to be a thing that we focused on.

**中文**：但从很多方面来看，这只是

## 05:00  Source / Source

**Original**: Tejal Patwardhan: But it's not necessarily the end product of what we even want to focus on in research.

**中文**：我们偶然关注到的一件事，但这并不 一定是我们 想要在研究中关注的最终结果。

**Original**: Tejal Patwardhan: Like we're now realizing, OK, if we can do this for math, can we scale this up for other types of science, Tejal Patwardhan: for professional work, for, you know, for capabilities that are useful to humans on a personal level.

**中文**：就像 我们现在意识到的那样，“好吧，如果我们能把 这种方法应用到数学领域，我们能否将其扩展到 其他类型的科学领域、专业 工作领域，以及 对人类个人 层面有用的能力领域呢？

**Original**: Tejal Patwardhan: And so I think math is more like the proof point versus like the end goal.

**中文**：” 所以我觉得数学更像是 证明过程，而不是最终 目标。

**Original**: Andrew Mayne: But it does seem like you said, though, that if something is able to think for a long time, Andrew Mayne: break something down into steps and think through them as you have to do for really complex mathematical problems, Andrew Mayne: it does just carry over.

**中文**：但你似乎说过， 如果某种东西能够长时间思考 ，将事情分解成 步骤，并像解决非常 复杂的 数学问题那样逐一思考，那么这种能力确实可以

## 05:30  Source / Source

**Original**: Tejal Patwardhan: Well, this is a big debate.

**中文**：迁移过来。这的确是一个值得大肆讨论的话题。

**Original**: Tejal Patwardhan: So like some of it definitely carries over, like the general idea of reasoning can be useful, Tejal Patwardhan: But then also there could be some domain-specific skills or tools or types of reasoning that you would need in different domains.

**中文**：嗯。所以，其中一些肯定会延续 下去。

**Original**: Tejal Patwardhan: Like, for example, for coding, you need to be able to actually write and execute code and test code if you want to scale up a coding agent.

**中文**：推理的一般思路是 有用的。但是， 在不同的领域，你也可能需要一些特定领域的技能、工具或推理方式。

**Original**: Tejal Patwardhan: And so something we've thought about a lot in terms of both evals and then also training is how do we make sure we also give the model the skills and tools and affordances that it would need to reason in that particular domain.

**中文**：例如 ，对于编码来说，如果你想扩展编码代理，你需要能够 实际编写和执行代码以及 测试代码 。因此，我们 在 评估和训练方面一直在思考的一件事是， 我们如何确保赋予模型 在该特定领域进行推理所需的技能、工具和能力

## 06:00  Source / Source

**Original**: Tejal Patwardhan: And some of the benefits of math will translate.

**中文**：。

**Original**: Tejal Patwardhan: And then also you might need some domain-specific scaffolding to really pull out its full abilities, Tejal Patwardhan: like kind of, you know, like a general high school or liberal arts education, Tejal Patwardhan: and then like a specialized education.

**中文**：数学的一些优势是 可以转化应用的，但你可能还 需要一些特定领域的辅助工具才能 真正发挥其全部潜力。

**Original**: Andrew Mayne: Reasoning models were just a very interesting moment, Andrew Mayne: because I think it changed a lot of the ways we thought about what was possible, Andrew Mayne: even with just a certain amount of compute, if you let a model think longer, Andrew Mayne: and you gave the model the opportunity to just come up with more complex answers to this.

**中文**：就像是 ，你知道，先接受普通 高中或文科教育， 然后再接受专业教育。

**Original**: Andrew Mayne: Were there any interesting things that happened with o1 that surprised you?

**中文**：推理模型是一个非常 有趣的时刻，因为它 改变了我们对可能性的思考方式， 即使只有 一定量的计算能力，只要让 模型思考更长时间，并给 模型机会去提出 更复杂的答案，就能实现更多可能性。

## 06:30  Source / Source

**Original**: Tejal Patwardhan: So the o1 release process was very exciting.

**中文**：O1 期间有没有发生什么让你感到惊讶的有趣事情？

**Original**: Tejal Patwardhan: We were sort of thinking about the reasoning paradigm for a very long time.

**中文**：所以，O1 的发布过程非常令人 兴奋，因为我们已经思考 推理范式很 长时间了，而且有些人 担心我们 不要过早发布它，因为 它感觉像是一种范式转变。

**Original**: Tejal Patwardhan: And there were people that were worried about making sure we didn't release it too soon Tejal Patwardhan: just because it felt like a paradigm shift, possibly the thing that got us to AGI.

**中文**：就像 我一开始说的那样，我们 以为在6个月内就能实现AGI，当时 一些早期的运行已经进行了。

**Original**: Tejal Patwardhan: Like I said at the beginning, we thought we had AGI in six months Tejal Patwardhan: when some of the early runs were happening.

**中文**：所以，问题就变成了： “好吧，我们如何负责任地推出这项技术 ？

**Original**: Tejal Patwardhan: And so there was this question of, okay, how do we put this out responsibly?

**中文**：我们如何测试这项 技术？

**Original**: Tejal Patwardhan: How do we test this technology?

**中文**：” 在

## 07:00  Source / Source

**Original**: Tejal Patwardhan: And during the initial launch review for o1, during some of our cybersecurity tests, the model, it was like one of the first examples of the model breaking out of the sandbox.

**中文**：O1 的初始发布审查期间，我们在进行一些 网络安全测试时，该模型就像是 突破 沙箱的首批示例之一。

**Original**: Tejal Patwardhan: We published about this, where it was supposed to be in this Docker container during this capture the flag.

**中文**：我们曾就此事发表过文章。

**Original**: Tejal Patwardhan: And the model found this security vulnerability and how we had implemented the capture the flag scenario.

**中文**：嗯， 它原本应该在这个 Docker 容器中，在这次 夺旗战中，模型发现了 我们在 实现夺旗战 场景时存在的漏洞，然后它就爆发了。

**Original**: Tejal Patwardhan: And it broke out.

**中文**：我们当时 都想：“哦，不。

**Original**: Tejal Patwardhan: And we were all like, oh, no.

**中文**：[笑声] 如果这个模型能做到这些，那它还能做到什么呢 ？

**Original**: Tejal Patwardhan: What else has the model done if it did this?

**中文**：” 嗯，那感觉就像是感受到了通用人工智能（ AGI）的存在。

**Original**: Tejal Patwardhan: And it was kind of a feel the AGI moment.

**中文**：众多之一。

**Original**: Tejal Patwardhan: One of many.

**中文**：我觉得从那以后，又 出现了

**Original**: Tejal Patwardhan: I feel like ever since then, there have been many other such moments where the model has done something really surprising or intelligent or novel that we didn't even think of when we were doing the tests.

**中文**：我觉得从那以后，又 出现了

## 07:30  Source / Source

**Original**: Tejal Patwardhan: And then you would come back and look at the transcripts and results and be like, wow, these guys, they're clever.

**中文**：许多类似的时刻，该模型 做出了一些非常令人惊讶、 聪明或新颖的事情，而这些事情是 我们做测试时根本没有想到的 。

**Original**: Tejal Patwardhan: They're clever.

**中文**：然后你回来 查看成绩单和结果， 就会想：“哇，这些人 真聪明。

**Original**: Tejal Patwardhan: And then it was just very important that we published and made sure the world knew the models can do this sort of thing.

**中文**：他们真聪明。

**Original**: Tejal Patwardhan: Yeah.

**中文**：” 然后，我们认为非常重要的是要 发表这篇文章，并确保全世界都 知道这些模型可以做到这类 事情。

**Original**: Andrew Mayne: There was this period right before o1 it was announced.

**中文**：是的 。在 01 号公告发布前有一段时间 。

**Original**: Andrew Mayne: A lot of people were like, well, it looks like we've hit the wall.

**中文**：很多人都觉得， “唉，看来我们遇到瓶颈了。

**Original**: Andrew Mayne: It's been a few months since anything's happened.

**中文**：几个月来什么都没 发生。

**Original**: Andrew Mayne: then o1 came out and they're like, what's a wall?

**中文**：” 然后 01 出来了，他们就

## 08:00  Source / Source

**Original**: Tejal Patwardhan: Hitting the wall is just so not the right way to think about.

**中文**：问：“什么是墙？

**Original**: Tejal Patwardhan: Yeah, I get very frustrated when I see posts like that because I'm like, man, if you look Tejal Patwardhan: at, I feel like I've been looking at this model improvement and this progress for a Tejal Patwardhan: long time and it just keeps getting better.

**中文**：” 把“撞墙”当成一种 错误的思考方式，真的太让人沮丧了。

**Original**: Tejal Patwardhan: Like it just keeps getting better.

**中文**：我看到这样的帖子会很沮丧， 因为我会想：“伙计，如果你看看我们， 你会发现这个模型一直在改进，一直在 进步，而且还在不断 进步。它一直在 变得更好。

**Original**: Tejal Patwardhan: And if I look at our research roadmap now, I see no signs of stopping.

**中文**：看看 我们现在的研究路线图，我看不出任何 停止的迹象。

**Original**: Tejal Patwardhan: Like things are just going to keep getting better.

**中文**：一切都会越来越 好。

**Original**: Tejal Patwardhan: This is going to be a really crazy year.

**中文**：今年将会是 疯狂的一年。很多 很棒的研究成果将会发布。

**Original**: Tejal Patwardhan: A lot of really cool research is going to come out.

**中文**：我认为这在 整个行业都是如此。

**Original**: Tejal Patwardhan: And I think this is probably true across the whole industry.

**中文**：所以，是的，如果说有什么

## 08:30  Source / Source

**Original**: Tejal Patwardhan: So yeah, if anything, people are really under, they really under-expect from the models.

**中文**：问题的话，那就是人们 对模型的期望真的太低了 。

**Original**: Andrew Mayne: It seems like sometimes though that they're, OpenAI releases a lot.

**中文**：不过， OpenAI 似乎经常发布一些新东西， 告诉大家我们正在朝着什么方向发展， 说这看起来很有意思。

**Original**: Andrew Mayne: They tell people about where we're headed and say that this looks interesting.

**中文**：有时候人们会忘记这一点，或者你会听到一些 传言，比如“Q* Q*，伙计， 你们真有意思”。

**Original**: Andrew Mayne: Sometimes people forget this or you get rumors of stuff like Q*.

**中文**：但是， 人们并没有意识到这一点。

**Original**: Tejal Patwardhan: Q*, man.

**中文**：我不知道。

**Original**: Tejal Patwardhan: You're very interesting.

**中文**：我觉得我们一直努力保持开放的态度， 告诉大家：“嘿，伙计们，以下是……” 一些 情节。

**Original**: Tejal Patwardhan: But no, people don't realize.

**中文**：就像线条在向上延伸一样。

**Original**: Tejal Patwardhan: Like, I don't know.

**中文**：“ 它们真的非常强大。

**Original**: Tejal Patwardhan: I feel like we try to be very open and say like, hey guys, here are some plots.

**中文**：” 我觉得

**Original**: Tejal Patwardhan: Like the lines are going up.

**中文**：” 我觉得

**Original**: Things are really capable.

**中文**：” 我觉得

**Original**: I think maybe there's this there's like this like meme that, oh, the researchers, they they don't understand.

**中文**：” 我觉得

## 09:00  Source / Source

**Original**: Tejal Patwardhan: They like the models are only good at math and research, but not good at things in the real world.

**中文**：可能存在一种 误解，好像研究人员 不理解这些模型。

**Original**: Tejal Patwardhan: But I just don't think that's true.

**中文**：他们认为这些 模型只擅长数学和 研究，不擅长处理 现实世界的事情。

**Original**: I think people from even other occupations that have transitioned into OpenAI, like are starting to see our models are picking up at all sorts of things.

**中文**：但我并不 这么认为。

**Original**: Tejal Patwardhan: And I know it's like it might seem like the researchers are trying to overhype the model or something.

**中文**：我认为，即使是 其他行业的从业者，比如那些转型 到 OpenAI 的人，也开始看到我们的 模型能够处理各种各样的 事情。我知道这看起来好像 研究人员在过度 吹捧模型。

**Original**: Tejal Patwardhan: But if anything, I think we're underhyping the power of them.

**中文**：但 我觉得我们反而低估了 它们的威力。

**Original**: Andrew Mayne: You brought up AGI.

**中文**：你提到了通用人工智能（AGI）。

**Original**: Andrew Mayne: If I brought GPT-4 back from, you know, March 2023 back into, let's say, you know, 2020, I think people would have called it that.

**中文**：如果我把

## 09:30  Source / Source

**Original**: Andrew Mayne: And now we have this much more different idea of this.

**中文**：GPT-4 从 2023 年 3 月提前 到 2020 年，我想 人们会这么称呼它。

**Original**: Andrew Mayne: People talk to AI every day.

**中文**：而 现在我们对它有了截然不同的 看法。

**Original**: Andrew Mayne: They'll have long conversations with things.

**中文**：人们每天都在和人工智能对话 。

**Original**: Andrew Mayne: Nobody talks about the Turing test anymore as one.

**中文**：他们会进行长时间的交流， 比如现在没人再谈论 图灵测试了。

**Original**: Andrew Mayne: Nobody really understood what he was trying to explain, you know, but now we're well past that period.

**中文**：图灵测试曾经是一个没人 真正理解的概念。

**Original**: Andrew Mayne: Is there the eval for AGI?

**中文**：他当时试图 解释，你知道，但现在我们 早已过了那个时期。

**Original**: Tejal Patwardhan: Yeah.

**中文**：通用人工智能（AGI）有评估吗？

**Original**: Tejal Patwardhan: I mean, the models passed the Turing test and no one talked about it.

**中文**：是的，模型通过了图灵测试，

## 10:00  Source / Source

**Original**: Tejal Patwardhan: It's kind of crazy.

**中文**：却没人讨论。

**Original**: Tejal Patwardhan: Yeah.

**中文**：这有点 疯狂。

**Original**: Tejal Patwardhan: Like I think models are pretty much indistinguishable from humans in many, many situations.

**中文**：是的，我觉得 在很多情况下，模型几乎和人类无法区分。

**Original**: Tejal Patwardhan: In terms of the test for AGI, I mean, I think if a model can do like there's the classic most economically valuable work.

**中文**：嗯，就通用人工智能的测试而言，我的意思是， 我认为如果一个模型能够完成 经典的、最具经济价值的 工作，而且我认为人们越来越多地 将模型用于他们工作的大部分内容，我 认为关于 这种情况究竟何时 发生，将会存在很大的争议，但说实话，我感觉 Codex确实为我做了很多工作。

**Original**: Tejal Patwardhan: And I think people are increasingly using the model for large parts of their work.

**中文**：我很幸运能拥有

**Original**: Tejal Patwardhan: And I think there'll be like a big spectrum and debate of like when exactly this happened.

**中文**：我很幸运能拥有

**Original**: Tejal Patwardhan: But gosh, I certainly feel like Codex does a lot of work for me.

**中文**：我很幸运能拥有

**Original**: Tejal Patwardhan: And I feel very lucky to have unlimited tokens, you know.

**中文**：我很幸运能拥有

## 10:30  Source / Source

**Original**: Tejal Patwardhan: So that's certainly.

**中文**：无限的代币，你知道，所以这是我 来这里工作的唯一理由。

**Original**: Andrew Mayne: Another reason to come work here.

**中文**：[笑声] 请加入。

**Original**: Tejal Patwardhan: Please join.

**中文**：是的 。

**Original**: Andrew Mayne: Yeah.

**中文**：但是，我认为总有一天， 人们会意识到 他们正在将模型用于 他们工作的很多方面，以及 我们将看到的科学突破，或者 我认为 总有一天， 这些模型会变得无可辩驳，它们确实非常 强大。

**Original**: Tejal Patwardhan: But yeah, I think there'll just be a moment when people are realizing that they're using the models for so much of their work.

**中文**：数学专家们在 讨论这些模型在 这方面的进步， 物理学家们也在讨论如何运用它们， 我认为我们开始看到一些 真正的成果，这真是令人

**Original**: Tejal Patwardhan: And also the scientific breakthroughs that we're going to see, or I think there'll be at some point, it'll be incontrovertible.

**中文**：数学专家们在 讨论这些模型在 这方面的进步， 物理学家们也在讨论如何运用它们， 我认为我们开始看到一些 真正的成果，这真是令人

**Original**: Tejal Patwardhan: Like these models are really, really powerful.

**中文**：数学专家们在 讨论这些模型在 这方面的进步， 物理学家们也在讨论如何运用它们， 我认为我们开始看到一些 真正的成果，这真是令人

**Original**: Andrew Mayne: We're getting mathematics experts talking about how good the models are getting at that.

**中文**：数学专家们在 讨论这些模型在 这方面的进步， 物理学家们也在讨论如何运用它们， 我认为我们开始看到一些 真正的成果，这真是令人

**Original**: Andrew Mayne: And we're getting physicists talking about doing that.

**中文**：数学专家们在 讨论这些模型在 这方面的进步， 物理学家们也在讨论如何运用它们， 我认为我们开始看到一些 真正的成果，这真是令人

**Original**: Andrew Mayne: And I think that we're starting to see some real work come out of it, which is just exciting.

**中文**：数学专家们在 讨论这些模型在 这方面的进步， 物理学家们也在讨论如何运用它们， 我认为我们开始看到一些 真正的成果，这真是令人

## 11:00  Source / Source

**Original**: Tejal Patwardhan: Yeah.

**中文**：兴奋。

**Original**: Andrew Mayne: So you brought up part of the problem with some of the earlier evals.

**中文**：是的。

**Original**: Andrew Mayne: Like a lot of them were inherited from older natural language processing methods and stuff.

**中文**：你提到了 早期一些评估存在的问题。

**Original**: Andrew Mayne: And then sort of when you're looking for ways, how do we measure the success of this?

**中文**：很多评估都沿用了旧的 自然语言处理方法 等等，当我们 寻找衡量 成功的方法时，会发现其中一些评估过于 简单，以至于模型勉强 通过了那些基准测试，然后我们 不得不寻找新的评估类别 。

**Original**: Andrew Mayne: Literally, some of these were just so simplistic that pretty much those benchmarks got passed.

**中文**：这些评估是如何演变的？

**Original**: Andrew Mayne: And then you had to figure out new categories of stuff.

**中文**：过去， 我们的模型甚至连一些学术基准测试都 无法通过。

**Original**: Andrew Mayne: How have these been evolving?

**中文**：比如， 高中或大学里常见的经典考试，或者一些

**Original**: Tejal Patwardhan: It used to be that, you know, even the academic benchmark, so to speak, our models couldn't pass.

**中文**：比如， 高中或大学里常见的经典考试，或者一些

**Original**: Tejal Patwardhan: Like, you know, classic tests that someone would take in high school or college or sort of more multiple choice types of questions.

**中文**：比如， 高中或大学里常见的经典考试，或者一些

## 11:30  Source / Source

**Original**: Tejal Patwardhan: And as the models got smarter, we had to make things more and more realistic.

**中文**：选择题。

**Original**: Tejal Patwardhan: So one of the first benchmarks that we put out more publicly was this benchmark called SWE-bench Verified, which was like testing how well the model could, you know, interact in real code bases in Python, like Django and like, you know, complete PRs and that sort of thing.

**中文**：随着模型变得越来越智能，我们必须 让测试越来越贴近现实。

**Original**: Tejal Patwardhan: And like pass unit tests.

**中文**：所以， 我们最初设定的基准之一是…… 我们 更公开地发布了一个 名为 Sweep Bench Verified 的基准测试，它测试 模型 在真实的 Python 代码库（例如 Django）中交互的能力，例如 完成 PR 等等，以及通过 单元测试。

**Original**: Tejal Patwardhan: And then those became even more advanced where we were like, OK, can the model take, you know, multi-step actions on like some complex environment, take actions on the computer, like take actions that link up to the real world with like some of our wet labs and biology work.

**中文**：之后，我们进一步测试了 模型 在复杂环境中执行多步骤操作的能力，例如 在计算机上执行操作，以及执行

## 12:00  Source / Source

**Original**: Tejal Patwardhan: So I think over time, as the models keep getting better, we have to be more ambitious with like how long horizon and how realistic our measurements are.

**中文**：与现实世界（例如我们的 湿实验室和生物学工作）相关的操作。

**Original**: Tejal Patwardhan: And doing that is very fun because you have to like sort of stay ahead of the pace of progress.

**中文**：因此，我认为 随着时间的推移，随着模型的不断 改进，我们必须在评估的 长期性和 真实性方面更具雄心。

**Original**: Andrew Mayne: So two terms I want you to unpack.

**中文**：而 这非常有趣，因为你必须始终 走在技术 进步的前沿。所以，在谈到基准测试时，我想请你解释两个术语。

**Original**: Andrew Mayne: When we talk about benchmarks, you often hear BenchMaxxing.

**中文**：你经常会 听到“ 基准测试”（benchmarking）。

**Original**: Tejal Patwardhan: Yeah, BenchMaxxing is, I would say, this idea that if someone training a model was just trying to look good on some evaluation or benchmark and not actually making the model generally useful.

**中文**：是的，[清嗓子] 基准测试，我 想说的是， 如果有人训练模型只是为了在

## 12:30  Source / Source

**Original**: Tejal Patwardhan: And I would say that's generally not super helpful because you want the model to be good at the real thing that the user might want to do.

**中文**：某些 评估或基准测试中看起来不错，而不是真正地提升 模型的性能，那么这种做法就行不通了。

**Original**: Tejal Patwardhan: And you don't just care about it looking good in some marketing copy because when a user uses it, they'll be like, hey, this is not quite what I signed up for.

**中文**：有用吗？我 觉得这通常没什么 帮助，因为你希望模型能够 胜任用户实际 想要做的事情。

**Original**: Tejal Patwardhan: And so generally bad.

**中文**：你不会只 关心它在 营销文案里看起来好不好，因为当用户 使用它时，他们会觉得，嘿，这跟 我预想的完全不一样。

**Original**: BenchMaxxing is bad.

**中文**：所以，基准测试通常不好。

**Original**: Andrew Mayne: Yeah, and I think the way they've heard it explained kind of makes sense is that you have X amount of compute budget, time, how much you're going to spend on it.

**中文**：基准测试 不好。是的 ，我觉得我 听到的解释有点道理 ：你有一定数量的计算 预算和时间，你打算花多少钱 。

**Original**: Andrew Mayne: And you can spend a large part of that making the model just overall very good.

**中文**：你可以把其中很大 一部分用来提升模型的

## 13:00  Source / Source

**Original**: Andrew Mayne: Or I can say, I'm going to spend 90% of it so my evals are going to look really good when I release it.

**中文**：整体性能，或者我可以把 90%的资源都投入进去。

**Original**: Andrew Mayne: And sometimes we've seen people just go literally use those evals for it.

**中文**：这样，我的评估结果 在发布时看起来会非常出色。有时我们看到有人 直接用这些评估结果。

**Original**: Andrew Mayne: It comes out like, oh, that's like a great model.

**中文**：结果 出来后，你会觉得，哦，这 看起来是个很棒的模型。

**Original**: Andrew Mayne: And then you find out, oh, it's only good at that.

**中文**：然后你 发现， 哦，它只擅长这个。

**Original**: Tejal Patwardhan: Yeah, that's not a great experience for the user.

**中文**：是的，这对用户来说体验很差。

**Original**: Tejal Patwardhan: So I think something that the OpenAI research program has done quite well is try to be very disciplined about making sure we are investing in general model improvements on the areas that really matter.

**中文**：用户。所以，我 认为OpenAI 研究项目做得相当不错的一点是，我们 非常注重严谨地 确保将资金投入到 真正重要的领域，用于通用模型的改进。

**Original**: Tejal Patwardhan: And then, you know, you'll run some evals at the end for comparison.

**中文**：然后，你知道，最后我们会进行 一些评估进行比较。

## 13:30  Source / Source

**Original**: Tejal Patwardhan: But the goal should not be, oh, we just want to look good on an eval.

**中文**：嗯，但我们的目标不应该是“哦，我们 只是想在评估中表现出色”。

**Original**: Tejal Patwardhan: We want to make a model that's useful to push forward the frontier of science or push forward the frontier of work or something like this.

**中文**：我们 想要打造的模型能够 推动科学前沿或 工作前沿的发展， 诸如此类。

**Original**: Tejal Patwardhan: And I think Jakob has done a really good job also, like enforcing throughout the research org.

**中文**：嗯，我认为 Yakov也做得非常好，他在 整个研究 机构中贯彻了“我们应该真正做到科学 和诚实”的原则。

**Original**: Tejal Patwardhan: Like we should be really scientific and honest.

**中文**：这包括，你 知道，我们曾经发表过一些 模型并非最佳的结果。

**Original**: Tejal Patwardhan: And that's included.

**中文**：我们只是 想公布 真实情况，确保我们能够 非常准确地描绘出 模型的能力，然后尽可能地让 它们 在现实世界中发挥作用

**Original**: Tejal Patwardhan: You know, we've published results where our models were not the best before.

**中文**：我们只是 想公布 真实情况，确保我们能够 非常准确地描绘出 模型的能力，然后尽可能地让 它们 在现实世界中发挥作用

**Original**: Tejal Patwardhan: We just want to publish the reality and make sure that we are painting a very accurate picture of what our models can do and then aim to make them useful in the real world as much as we can.

**中文**：我们只是 想公布 真实情况，确保我们能够 非常准确地描绘出 模型的能力，然后尽可能地让 它们 在现实世界中发挥作用

## 14:00  Source / Source

**Original**: Andrew Mayne: You mentioned the software engineering bench as a one of the metrics that's maybe not as useful now.

**中文**：。

**Original**: Andrew Mayne: And we hear the term saturated.

**中文**：你提到软件工程 基准测试是 现在可能不太有用的指标之一，我们经常听到“ 饱和”这个词。

**Original**: Andrew Mayne: Explain what it means in a benchmark saturated.

**中文**：请解释一下它的含义。

**Original**: Tejal Patwardhan: Saturated is when a model is close to passing all of the questions correctly, like getting close to 100% on the test.

**中文**：基准测试达到饱和状态时，就意味着 模型几乎能 正确通过所有题目，就像 在测试中接近100%的分数一样。

**Original**: Tejal Patwardhan: And once a benchmark is saturated, it's not super useful because you can't really tell models apart with that test.

**中文**：一旦基准测试达到饱和状态， 它的实用性就大打折扣，因为你无法 通过这个测试真正区分不同的模型。

**Original**: Tejal Patwardhan: It's like comparing two geniuses on like a high school math exam.

**中文**：这就像比较两个天才参加 高中数学考试一样。

**Original**: Tejal Patwardhan: Like they might just both pass, but that's not very useful as you're trying to separate really, really smart pieces of intelligence.

**中文**：他们可能都能 及格，但这没什么

## 14:30  Source / Source

**Original**: Tejal Patwardhan: So the challenge is always to make more and more difficult, realistic, unsaturated benchmarks that you can then measure models against over time and forecast sort of where progress is going.

**中文**：用，因为你试图区分的是 真正聪明的个体 。

**Original**: Andrew Mayne: How do you do that now?

**中文**：所以，挑战 始终在于如何制定越来越难、越来越 现实、越来越不饱和的基准测试，以便 随着时间的推移衡量模型， 并预测 未来的发展方向。

**Original**: How do you figure out what a good benchmark is going to be?

**中文**：那么， 现在该怎么做呢？如何 确定一个好的基准测试是什么 ？

**Original**: Tejal Patwardhan: Yeah, I mean, the best benchmarks, I think, are really realistic and measure something people actually care about.

**中文**：我认为最好的基准测试 是真正现实的，并且衡量的是 人们真正关心的东西。

**Original**: Tejal Patwardhan: So one of our first forays towards doing this, which, you know, it's been a while now, but that we published was called GDPval.

**中文**：我们最初尝试 做这件事，虽然已经过去一段时间了 ，但我们发表的论文 叫做GDP评估。

**Original**: Tejal Patwardhan: Like I was really excited that about the idea of having a measurement for how the models could interact with the real world.

**中文**：我当时对

## 15:00  Source / Source

**Original**: Tejal Patwardhan: And we were really having this crisis of evals where we kept training successively better models.

**中文**：这个想法感到非常兴奋。

**Original**: Tejal Patwardhan: And on SWE-bench, they looked about the same because they were just doing really well.

**中文**：我们当时面临的问题是，如何衡量模型与现实世界的交互能力。

**Original**: Tejal Patwardhan: And like we were reaching the top of what that benchmark could measure.

**中文**：我们不断训练出性能越来越好的 模型，但在 SweepBench 测试中，它们的表现却几乎 一样，因为它们都表现得 非常出色，仿佛我们已经 达到了该基准测试 所能衡量的极限。

**Original**: Tejal Patwardhan: And we were like, man, we have no idea how to measure what people actually want to use our models for.

**中文**：我们当时就想：“天哪， 我们根本不知道该如何衡量 人们实际想用我们的模型做什么 。

**Original**: Tejal Patwardhan: And so there was very much a, hey, like the Bureau of Labor Statistics has a list of all the top jobs and like all the top tasks per job.

**中文**：” 就像美国劳工统计局 列出了所有热门职业以及 每个职业的主要任务一样，比如 金融分析师进行

**Original**: Tejal Patwardhan: If you're a financial analyst, like doing an investment diligence or writing a legal memo or, you know, writing a paper based on a piece of research or something like this.

**中文**：” 就像美国劳工统计局 列出了所有热门职业以及 每个职业的主要任务一样，比如 金融分析师进行

## 15:30  Source / Source

**Original**: Tejal Patwardhan: And the idea was, can we actually ask the model those tasks that someone would want in real life with the context they would have at the time and then see how the model could solve those tasks?

**中文**：投资尽职调查、撰写法律 备忘录，或者 根据研究成果撰写论文等等 。

**Original**: Tejal Patwardhan: And at the time when we tested one of the earliest models on this benchmark, it got like, you know, less than 20 percent.

**中文**：我们的 想法是，能否让模型处理 人们在 现实生活中可能遇到的任务，并结合他们当时的具体情况， 看看模型如何 解决这些任务。当时， 当我们用 这个基准测试最早的模型之一时，它的准确率只有不到 20%。

**Original**: Tejal Patwardhan: Like if you compare how well a model would do on this well-specified work task compared to a human, like the model was way worse.

**中文**：与 人类相比，模型在工作任务上的表现要差得多。

## 16:00  Source / Source

**Original**: Tejal Patwardhan: I'm like really proud of the org for being like, actually, you know what, we should publish this new way to sort of measure and forecast progress on real world economic impacts.

**中文**：但我真的为我们机构感到骄傲，因为 我们意识到 应该发布这种新的方法来 衡量和预测现实 世界经济影响的进展。

**Original**: Tejal Patwardhan: And it's been like very useful to a lot of economists.

**中文**：这对 很多经济学家来说都非常有用， 而且我们现在的模型也是最好的。

**Original**: Tejal Patwardhan: And also our models now are the best.

**中文**：这很棒，因为我认为 当时 我们并没有在一些培训项目中真正投入到 现实世界的工作中，甚至 没有进行衡量 或跟踪。

**Original**: Tejal Patwardhan: And it's very cool because I think at the time we were like not really investing in real world work in some of our training programs and weren't even measuring or tracking it.

**中文**：而现在，我们更加 关注如何让 这些模型对人们的 实际工作有用，比如对真正的科学家来说。

**Original**: Tejal Patwardhan: And I think now there's a lot more focus on how can we make these models useful for people in their real work, like for real scientists.

**中文**：而现在，我们更加 关注如何让 这些模型对人们的 实际工作有用，比如对真正的科学家来说。

## 16:30  Source / Source

**Original**: Tejal Patwardhan: And this kind of helped catalyze a wake up call that, hey, maybe we should also think about how to measure how stuff is used in the real world.

**中文**：这就像一个 警钟，提醒我们或许也应该考虑 如何衡量事物 在现实世界中的使用情况。

**Original**: Tejal Patwardhan: So that was pretty cool.

**中文**：所以这 很棒。

**Original**: Tejal Patwardhan: But now we're like, OK, this benchmark's probably too easy because it's extremely well specified.

**中文**：但现在我们觉得，好吧，这个 基准可能太简单了，因为它 非常具体，每个 提示都长达数百 字，比如“我希望你打开这个 电子表格，做这个更改，做 这件事，然后……” 计算结果并记录在备忘录里。

**Original**: Tejal Patwardhan: Each of the prompts is hundreds of words of, I want you to go to this spreadsheet and make this change and do this thing and then take that calculation and put it in a memo.

**中文**：非常详细。

**Original**: Tejal Patwardhan: It's very detailed.

**中文**：我认为 下一步是如何让模型像现实世界 中的报告一样具有足够的模糊性。

**Original**: Tejal Patwardhan: And I think the next step is, how do we give the model as much ambiguity as you would give a report in the real world?

**中文**：比如， 如果 经理问：“嘿，你能帮我运行一下这个

**Original**: Tejal Patwardhan: If a manager asks, hey, can you run this analysis for me?

**中文**：比如， 如果 经理问：“嘿，你能帮我运行一下这个

## 17:00  Source / Source

**Original**: Tejal Patwardhan: They should go figure out what to do, put that together, run the analysis, and give you an output.

**中文**：分析吗？

**Original**: Tejal Patwardhan: And so I think we've been working a lot on like more realistic ways to measure real work in the real world, whether that's in like science, for personal use, or even for enterprise.

**中文**：”他们应该自己想办法，把所有信息整合起来， 运行 分析，然后给出输出结果。所以， 我们一直在努力寻找 更实际的方法来衡量 现实世界中的实际工作，无论是 个人科研还是 企业应用。

**Original**: Andrew Mayne: There seems to be something to the idea of instead of hiding a benchmark, putting it out there because internally as an org, you go like, okay, this can't stand.

**中文**：与其 隐藏基准，不如 把它公开出来，这似乎很有道理。

**Original**: Tejal Patwardhan: Yeah, it really motivates research also.

**中文**：因为在 组织内部，你会觉得“好吧，这 不行”。是的，这确实能激励研究 。

**Original**: Tejal Patwardhan: I think people want to know the truth and they want to know where we can be better and deliver a better model for our users.

**中文**：我认为人们想知道 真相，想知道我们有哪些地方可以 做得更好，并

## 17:30  Source / Source

**Original**: Tejal Patwardhan: And so knowing the gaps is quite useful.

**中文**：为用户提供更好的模型。

**Original**: Andrew Mayne: What do you think the current limitations are right now with the ways that we're doing evals?

**中文**：因此，了解差距非常有用。

**Original**: Tejal Patwardhan: I think the types of work that we're doing now with Codex and with our latest reasoning models, Tejal Patwardhan: like 5.5, it's just such a different level of capability than what we had even six months ago, Tejal Patwardhan: where a static benchmark just doesn't measure the nature of how long you can get work out of these Tejal Patwardhan: things.

**中文**：你认为我们 目前的评估方法有哪些局限性 ？

**Original**: These models can work for days or weeks for you.

**中文**：我认为工作类型…… 我们 现在与 Codex 合作，使用 最新的推理模型（例如 55），其 能力水平与 6 个 月前相比有了质的飞跃。

**Original**: And internally in research, we've had

**中文**：静态基准测试无法衡量 这些模型能够长时间高效运行的特性。

## 18:00  Source / Source

**Original**: Tejal Patwardhan: the models just like run for really long periods of time to do work.

**中文**：这些模型可以连续工作数天甚至数周 。

**Original**: And one of the problems with Tejal Patwardhan: an automated eval is you kind of need it to run within some amount of time and get results to be Tejal Patwardhan: able to look at them.

**中文**：在内部 研究方面，我们已经让模型 长时间运行以 完成任务。

**Original**: And a lot of the ways that we're measuring models now also just include Tejal Patwardhan: looking at production usage and looking at real world use by people and seeing what they're using Tejal Patwardhan: it for and what types of tasks they're able to get done because the time horizon of how much work Andrew Mayne: is done by the model is just getting so much longer.

**中文**：自动化评估的一个问题是，它需要 在一定时间内运行并产生 结果才能进行分析。

**Original**: It was interesting watching, for instance,

**中文**：我们现在衡量模型的许多方法 还包括观察 生产环境中的使用情况，以及 用户在实际应用中的使用情况，了解 他们如何使用模型以及能够完成哪些类型的 任务，因为 模型能够完成的工作量持续时间越来越

## 18:30  Source / Source

**Original**: Andrew Mayne: long context, there was kind of this early race for companies to say that, hey, our models can Andrew Mayne: take, you know, 100,000 tokens, a million tokens, whatever.

**中文**：长。

**Original**: But there wasn't a lot of evaluation on Andrew Mayne: how well that was.

**中文**：例如，观察 长上下文模型的发展很有意思。早期，各公司竞相宣称 “我们的模型可以运行很长时间”， 10万个词元，100万个词元， 随便什么数量。

**Original**: And then we got needle in the haystack, which is a method of seeing if it could Andrew Mayne: find a word or whatever.

**中文**：” 但当时并没有 对这种方法的效果进行充分的评估。

**Original**: And I think that people sort of assumed that that was a solved problem, Andrew Mayne: but it wasn't.

**中文**：后来我们又遇到了“大海捞针”的问题， 也就是判断模型能否 找到某个词或其他内容。

**Original**: It was just the benchmarks weren't really good.

**中文**：我觉得当时 人们都 以为这个问题已经解决了， 但其实并没有。

**Original**: And then we had to have better Andrew Mayne: benchmarks.

**中文**：问题在于之前的 基准测试不够完善。所以 我们需要更好的基准测试。

**Original**: And is that what kind of made it better was finally people could one, spend more attention

**中文**：而真正让模型有所 改进的，是不是因为

## 19:00  Source / Source

**Original**: Andrew Mayne: solving that problem when they understood where it was failing?

**中文**：人们终于能够更 专注于解决这个问题，因为他们 理解了模型失败的原因？

**Original**: Tejal Patwardhan: Yeah, we definitely have better Tejal Patwardhan: benchmarks for this sort of thing now.

**中文**：是的，现在我们确实有了更好的 基准测试。

**Original**: And then also sometimes these problems reveal gaps in how Tejal Patwardhan: we're thinking about training.

**中文**：而且，这些问题有时也会 暴露出我们在 训练思路上的不足。

**Original**: So one example is we used to think, oh, what matters is just how much Tejal Patwardhan: context you can stuff into the model at test time.

**中文**：举个例子，我们过去 认为，“重要的是在测试时 能往模型里塞多少上下文信息 。

**Original**: When now it seems that you can just dump a bunch Tejal Patwardhan: of files in a container and the model can kind of grep around and search for what it needs and when.

**中文**：” 但现在看来， 你只需要把一堆文件放到 一个容器里，模型就可以像 搜索一样，在需要的 时候自动查找所需的信息。

**Original**: Tejal Patwardhan: And this ability to have search or tools to figure out what context you should use can be more efficient than just stuffing everything in the context.

**中文**：这种 搜索功能或者说工具，可以帮助我们确定

## 19:30  Source / Source

**Original**: Tejal Patwardhan: And we wouldn't have really realized that without trying that out and then seeing how that performed on various benchmarks.

**中文**：应该使用哪些上下文信息。

**Original**: Tejal Patwardhan: So I think this makes the model a lot more useful because, for example, now the model can search over a whole repo and find the files that you need and understand the context of where you're making changes.

**中文**：这样做比简单地把 所有内容都塞进 上下文更高效。

**Original**: Tejal Patwardhan: And the same is true for many work contexts where folks in Codex can now upload their local file system.

**中文**：如果我们 不亲自尝试， 并观察它 在各种基准测试中的表现，我们可能根本不会意识到这一点。所以，我认为 这让模型变得 更加实用，例如， 现在模型可以搜索 整个代码库，找到 你需要的文件，并理解 你修改的上下文。

**Original**: Tejal Patwardhan: And you might have made PowerPoints before or sent Slacks that are relevant to the work that you're doing now.

**中文**：对于许多工作场景也是如此，比如 Codex 的用户现在可以 上传他们的本地文件系统，或者 你 之前可能制作过与当前工作相关的 PowerPoint 文件或发送过 Slack 消息，

## 20:00  Source / Source

**Original**: Tejal Patwardhan: And the model can sort of search over that context with tool calls.

**中文**：模型可以通过 工具调用来搜索这些上下文 。

**Original**: Tejal Patwardhan: And so we're not as limited by how much you can literally stuff into context because the model can search.

**中文**：因此，我们不再受限于 你能塞进 上下文的内容量，因为模型可以进行搜索。

**Original**: Andrew Mayne: Do you have any favorite evals?

**中文**：你有什么喜欢的评估吗？

**Original**: Tejal Patwardhan: My favorite eval?

**中文**：我最喜欢的评估？

**Original**: Tejal Patwardhan: I mean, GDPval is my favorite public eval.

**中文**：我的意思是，GDP 评估是我 最喜欢的公开评估。

**Original**: Tejal Patwardhan: But I have many internal evals.

**中文**：好的。

**Original**: Tejal Patwardhan: I will say the name of one of them.

**中文**：但我有很多内部评估。

**Original**: Tejal Patwardhan: It's called Houdini bench and I cannot explain further.

**中文**：我 可以透露其中一个的名字。

**Original**: Andrew Mayne: Oh my God.

**中文**：它 叫 Houdini 测试台，我没法 再多解释了。

**Original**: Andrew Mayne: You know, I was a magician, right?

**中文**：我的天，你知道我以前是 魔术师，对吧？

**Original**: Andrew Mayne: So.

**中文**：所以， 不。

**Original**: Tejal Patwardhan: No.

**中文**：是的，我是。

**Original**: Andrew Mayne: Yeah.

**中文**：是的，我知道。

**Original**: Tejal Patwardhan: Maybe.

**中文**：也许我不知道你能不能通过 Houdini 测试

**Original**: Tejal Patwardhan: I don't know if you'd pass Houdini bench.

**中文**：也许我不知道你能不能通过 Houdini 测试

## 20:30  Source / Source

**Original**: Andrew Mayne: No, I'd probably not pass Houdini bench.

**中文**：台。

**Original**: Andrew Mayne: That was actually one of the things I was played around with some of the early vision models Andrew Mayne: and stuff was, was using stuff, photographs and stuff of magic tricks and stuff and seeing Andrew Mayne: this.

**中文**：不，[嗤笑] 我可能通过不了 Houdini 测试 台。

**Original**: Tejal Patwardhan: That's very cool.

**中文**：实际上， 我以前玩 一些早期视觉模型的时候， 就是用 魔术表演之类的照片，然后 看到这个。

**Original**: Tejal Patwardhan: Yeah.

**中文**：这太酷了。

**Original**: Tejal Patwardhan: Multimodal brings a whole new element.

**中文**：是的，多模态 带来了一个全新的元素。

**Original**: Tejal Patwardhan: Like I remember when GPT-4o had first come out, there was a group of, there was a group of Tejal Patwardhan: us that was sitting on the roof of this building.

**中文**：嗯， 我记得 4.0 版本刚 发布的时候， 我们一群人坐在 楼顶， 实时语音模型的概念让我们大吃一惊。

**Original**: Tejal Patwardhan: that our minds were just so blown by the idea of a real-time voice model.

**中文**：然后我们 就想，“我们该怎么评估这玩意儿呢？

**Original**: Tejal Patwardhan: And then we were like, how do we even eval this thing?

**中文**：” 对吧？

**Original**: Tejal Patwardhan: Because the whole paradigm of doing things in text and code and on your computer

**中文**：因为如果能实时进行语音交互，那么

## 21:00  Source / Source

**Original**: Tejal Patwardhan: is just completely blown away if there's a voice interaction in real time.

**中文**：用文本和代码在 电脑上做事的整个范式就完全被 颠覆了 。

**Original**: Tejal Patwardhan: Something that was really interesting about that launch is, Tejal Patwardhan: and we said this publicly at the time, Tejal Patwardhan: is we actually delayed the public launch by six weeks Tejal Patwardhan: as we were figuring out how to make sure the model was safe.

**中文**：那次发布会最有趣的地方在于，我们 当时公开说过，为了确保模型的安全性，我们实际上将 公开发布推迟了六周。

**Original**: Andrew Mayne: This was GPT-4o?

**中文**：4.0 ？

**Original**: Tejal Patwardhan: Yeah, because this was before the elections, actually.

**中文**：是的，因为当时正值选举之前 。

**Original**: Tejal Patwardhan: And so there was like a lot of worry of, oh, if the model can in real time talk to you with a realistic sounding voice, could this be used for persuasive propaganda or this sort of thing?

**中文**：所以大家 非常担心，如果模型 能够用逼真的声音实时与你对话 ，这会不会被 用来进行说服性宣传之

## 21:30  Source / Source

**Original**: Tejal Patwardhan: And it was very cool.

**中文**：类的？

**Original**: Tejal Patwardhan: The company delayed the launch to make sure we could build out all of these tests and build in mitigations to make sure the models couldn't be used for this sort of thing.

**中文**：公司推迟发布以确保 我们能够完成所有测试并 内置缓解措施，从而确保 模型不会被用于此类 用途，这一点非常棒。

**Original**: Andrew Mayne: Well, it seems like that's a very complicating factor as these models became multimodal.

**中文**：随着这些模型变得多模态， 这似乎是一个非常 复杂的因素 。

**Original**: Andrew Mayne: I remember early on with GPT-4, would it be, you know, GPT-4 Vision back when it was that, was that you could, you could, I could, I had terrible handwriting.

**中文**：我记得早期的 GPT-4，也就是 GPT-4 Vision 版本， 你可以……我可以……是的，我的 字迹很糟糕。

**Original**: Andrew Mayne: I could write a prompt and all of a sudden would solve for this.

**中文**：我可以写一个提示，它 突然就能给出答案。

**Original**: Andrew Mayne: And you realize, oh, it's not a text in prompt.

**中文**：然后你意识到，哦，提示里不是文本

## 22:00  Source / Source

**Original**: Andrew Mayne: It's a visual prompt.

**中文**：，而是一个…… 视觉提示。

**Original**: Andrew Mayne: And then with the audio models, when you're doing audio in, audio out, the model could emulate things and could do stuff in such different ways.

**中文**：然后， 对于音频模型，当你进行 音频输入和输出时，模型可以 模拟各种情况，并以 各种不同的方式执行操作。

**Original**: Andrew Mayne: And so it seems like that's really, where do you even begin trying to figure out how you're going to measure that?

**中文**：所以，这似乎真的让人头疼。

**Original**: Tejal Patwardhan: Yeah, I mean, it's just a lot of work.

**中文**：你到底该从哪里 开始思考如何 衡量这些呢？

**Original**: Tejal Patwardhan: Usually for any of these, we start with what would humans do in this case.

**中文**：是的，我的意思是，这需要大量的工作。通常，对于任何此类情况，我们都会先思考 人类在这种情况下会怎么做。

**Original**: Tejal Patwardhan: So like, you know, you would like have a set of inputs that you put into the model and a set of outputs you would evaluate.

**中文**：比如，你需要一 组输入到模型中的数据， 以及一组需要 评估的输出。

**Original**: Tejal Patwardhan: And then you can like build up, OK, can we like automate some of these?

**中文**：然后你可以逐步 构建，比如，我们能否自动化其中一些 步骤？

**Original**: Tejal Patwardhan: Can we build a new platform to measure this sort of thing at scale and sort of move from there?

**中文**：我们能否构建一个新的平台来

## 22:30  Source / Source

**Original**: Tejal Patwardhan: But for some of the natively multimodal, it's just like you have to like rip apart a bunch of your infra and make stuff work.

**中文**：大规模地测量这类数据？然后从 那里开始。

**Original**: Tejal Patwardhan: Like this was also true with Sora for, you know, we were interested in making sure the videos weren't overly realistic or could be used for the wrong thing.

**中文**：但对于一些 原生多模态模型， 你就像是必须拆解大量的现有 基础设施，并使其正常工作。Sora 也是如此， 你知道，我们想要 确保视频不会过于逼真， 或者可能被用于不正当的用途。

**Original**: Tejal Patwardhan: And that required like, especially from safety, building up a whole new stack of evals and mitigations, like including refusals at the model level, monitoring when this was being used in prod.

**中文**：这 尤其需要从 安全角度构建一整套全新的技术栈。

**Original**: Tejal Patwardhan: And yeah, it requires a whole new stack of thinking.

**中文**：评估和缓解措施，例如 在模型层面加入拒绝机制，以及监控 其在生产环境中的使用情况。是的，这需要一套全新的

## 23:00  Source / Source

**Original**: Andrew Mayne: Yeah.

**中文**：思维方式。

**Original**: Well, that's the thing, too, is that when you start to think about, OK, how do you prioritize one eval over another?

**中文**：没错，关键在于 ，当你开始思考如何确定评估的优先级时，何时才能判断某个评估方法是否有效， 或者只是简单地认为 某个评估方法已经饱和，需要进行下一个评估？

**Original**: Andrew Mayne: when do you decide that this isn't a, or do you just sort of go, look, this one's saturated, Andrew Mayne: we move on.

**中文**：因为即使你可能并非 旨在针对某些 公开基准进行优化，你仍然需要 弄清楚哪些因素 对我们现在来说才是重要的。

**Original**: And because there is, even though you may not be trying to optimize towards certain Andrew Mayne: public benchmarks, you still have to figure out like what we're, what, what's important to us now?

**中文**：曾经有一段 时间， OpenAI 在代码方面处于领先地位，但后来 并非如此。

**Original**: Andrew Mayne: Like there was a time when OpenAI was leading in code and then there was a time when it wasn't,

**中文**：现在它又重新领先

## 23:30  Source / Source

**Original**: Andrew Mayne: now there is a time it is, but there was a dark period where that happened.

**中文**：，但那段 时期确实很艰难。

**Original**: Tejal Patwardhan: Yeah, we try not to get distracted by public benchmarks too much because it can be kind of noisy.

**中文**：是的 ，我们尽量避免 过多地被公开基准所干扰，因为它们 可能会产生很多干扰。

**Original**: Tejal Patwardhan: I think internally we have this thing called AGI index, which is inspired by the idea of like CPI or inflation, where you have like some weighted basket of goods and you're tracking the price of those goods.

**中文**：我认为， 我们内部有一个叫做 AGI 指数的东西，它的灵感来源于 CPI 或通货膨胀的概念，它包含一 篮子加权商品。

**Original**: Tejal Patwardhan: The same thing for us.

**中文**：你们在追踪这些商品的价格 。

**Original**: Tejal Patwardhan: It's we have like this basket of evals that include measurements across all of the core areas we're interested in.

**中文**：对 我们来说，情况也一样，我们有 一系列评估指标，涵盖了 我们所有关注的核心领域，例如

**Original**: Tejal Patwardhan: That can include alignment, can include safety, can include capabilities.

**中文**：对 我们来说，情况也一样，我们有 一系列评估指标，涵盖了 我们所有关注的核心领域，例如

## 24:00  Source / Source

**Original**: Tejal Patwardhan: It's just sort of what you want from your model.

**中文**：对齐性、 安全性、功能等等。

**Original**: Tejal Patwardhan: And we just iterate, we keep updating that index to represent more and more sort of the difficult version of what we want our models to do.

**中文**：这基本上就是你希望 模型达到的目标，我们会不断 迭代更新这个指标，使其 更接近 我们希望模型实现的复杂版本。

**Original**: Tejal Patwardhan: And we sort of track that index internally and try not to be distracted by, you know, trying to benchmark some public benchmark or something like that.

**中文**：我们会在内部追踪这个指标，尽量避免被 一些公开的基准测试之类的东西分散注意力。

**Original**: Tejal Patwardhan: It's more having a blend of evals across different domains that we care about across science or work.

**中文**：我们 更注重的是将 不同领域的评估指标结合起来，这些领域涵盖了 我们关注的科学和 工作，以及安全性、对齐性， 并确保我们在 这个加权指标体系上不断取得进展。

**Original**: Tejal Patwardhan: And then also safety and alignment and making sure we keep making progress on that sort of weighted basket.

**中文**：嗯，尽量

## 24:30  Source / Source

**Original**: Tejal Patwardhan: Try to stay focused.

**中文**：保持专注。

**Original**: Andrew Mayne: We've watched this evolution of these evals.

**中文**：我们一直在关注 这些评估指标的演变，也一直在关注 模型的演变。

**Original**: Andrew Mayne: We've watched the evolution of the models.

**中文**：我和 这里从事科学研究的人交流过，他们都是 活跃在科学领域的，不仅仅是 喜欢科学或 计算机科学的研究人员，还有 生物学、数学等领域的人。

**Original**: Andrew Mayne: And I've talked to people here working in the sciences, like people who are active in the science, not just researchers who like science or like computer science, but people who are in biology, mathematics.

**中文**：你能告诉我吗？

**Original**: Andrew Mayne: Can you tell me what's going on with the evals in the scientific frontier?

**中文**：科学前沿评估的进展如何？

**Original**: Andrew Mayne: Because we're at this point now where it seems like we're going to see meaningful results.

**中文**：因为我们 现在似乎即将 看到一些有意义的成果。

**Original**: Tejal Patwardhan: Yeah, I think the work in some of our science evals is some of our most exciting.

**中文**：是的，我认为 我们的一些科学评估工作非常令人 兴奋。

**Original**: Tejal Patwardhan: So in the past few months, there's a few tiers of evals that we've made public.

**中文**：在过去的几个月里，

## 25:00  Source / Source

**Original**: Tejal Patwardhan: So the first tier was this eval called Frontier Science Olympiad, which was kind of the equivalent to the math Olympiad style evals that we had before, Tejal Patwardhan: where we were measuring how well the models could do on like high school Olympiad style problems in biology, chemistry and physics.

**中文**：我们公布了几项不同层级的评估结果 。

**Original**: Tejal Patwardhan: And they were sort of shorter answer, but still quite hard.

**中文**：第一层级是 名为“前沿科学奥林匹克”的评估， 它类似于 我们之前举办的数学奥林匹克式评估，旨在衡量 模型 在生物、化学和 物理等学科中，类似高中奥林匹克竞赛题目的表现。

**Original**: And the models weren't very good yet.

**中文**：这些题目的答案比较简短 ，但仍然…… 都相当困难，而且 模型还不太好。

**Original**: Tejal Patwardhan: And then the next phase we did was Frontier Science Research, which is also public and people can run this, Tejal Patwardhan: which measured how well models could help complete sort of unfinished biology, chemistry, and physics theses.

**中文**：接下来我们开展的下一阶段是 前沿科学研究，它也是 公开的，人们可以运行它， 它衡量模型在多大程度上可以 帮助完成一些未完成的

## 25:30  Source / Source

**Original**: Tejal Patwardhan: So we had people who were PhDs or professors in these fields that had some text that was not published, Tejal Patwardhan: like maybe part of their thesis, and just turned that into an evaluation where the model was given maybe some input data Tejal Patwardhan: or some initial starting point, and it had to sort of see how it'd fill out the rest of that paper Tejal Patwardhan: and judge against a rubric for how well it did.

**中文**：生物学、化学和物理学论文。

**Original**: Tejal Patwardhan: And that was starting to measure, like, OK, are the models starting to do research?

**中文**：所以，我们找了一些 这些领域的博士或教授，他们有一些 未发表的文本，比如 [清嗓子]他们论文的一部分， 然后把这些文本转换成评估模型， 给模型一些 输入数据或一些初始 起点，然后模型必须看看 它如何完成论文的其余部分，并根据 评分标准来判断它的表现如何 。

**Original**: Tejal Patwardhan: Are they using tools?

**中文**：你知道，这开始 真正地衡量，好吧，模型是否 开始进行研究了？他们是否 使用了工具？

**Original**: Tejal Patwardhan: This sort of thing.

**中文**：诸如此类的事情。

**Original**: Tejal Patwardhan: And then one of the final iterations of this was to see how well the model could do in the real world in a wet lab.

**中文**：最后，其中一项最终迭代

## 26:00  Source / Source

**Original**: Tejal Patwardhan: And so we worked with this company called Ginkgo Bioworks that has a bunch of really cool automated wet lab robots where the model had to optimize this protocol for protein synthesis.

**中文**：是检验该模型 在现实世界的湿实验室中的表现如何。

**Original**: Tejal Patwardhan: And the idea was the model would generate a protocol and then they would actually automatically test it in the wet lab or they would put in the reagents the model suggested.

**中文**：因此，我们与一家名为 Ginkgo Bioworks 的公司合作，该公司拥有许多 非常酷的自动化湿实验室机器人， 该模型必须优化 蛋白质合成方案。

**Original**: Tejal Patwardhan: and then see what protein yield they got.

**中文**：其 理念是，该模型将生成一个 方案，然后他们将 在湿实验室中自动测试该方案， 在那里他们将放入 模型建议的试剂，然后 查看他们获得了多少蛋白质产量。

**Original**: Tejal Patwardhan: And this was for a protein that's sort of related to this ovarian cancer drug,

**中文**：嗯， 这是针对一种 与卵巢癌药物相关的蛋白质，

## 26:30  Source / Source

**Original**: Tejal Patwardhan: or it's sort of a toy scenario for that.

**中文**：或者说，这是该药物的一种模拟实验 。

**Original**: Tejal Patwardhan: And the model, we were really nervous at first, Tejal Patwardhan: because we were like, this human baseline is kind of hard.

**中文**：一开始我们真的很 紧张，因为我们觉得 ，建立人类基线有点 困难。

**Original**: Tejal Patwardhan: We don't know if the model is going to beat it.

**中文**：我们不知道这个模型能否 胜过它。但我们永远不应该 低估这些模型，因为，你 知道，曲线非常 清晰。

**Original**: Tejal Patwardhan: But we should never underestimate the models, Tejal Patwardhan: because the curve is pretty clear.

**中文**：每一个循环都变得越来越 好，超越了人类的 基准，然后设定了该 模型以每单位产量成本 生成这种蛋白质的最先进水平。

**Original**: Tejal Patwardhan: Just every cycle got better and better, beat the human baseline, Tejal Patwardhan: and then set the state of the art on how efficiently the model could cost per yield, Tejal Patwardhan: generate this protein.

**中文**：我认为 这仅仅是个开始。

**Original**: And I think that's just the start of how if we give these models optimization Tejal Patwardhan: problems, like, you know, go try to figure out how inexpensive you can make this vaccine or,

**中文**：如果我们给 这些模型一些优化问题，比如， 如何 尽可能降低疫苗的生产成本，或者如何

## 27:00  Source / Source

**Original**: Tejal Patwardhan: you know, generate, synthesize this protein that's important for a drug, the model can just go and Tejal Patwardhan: keep optimizing these protocols with real world inputs.

**中文**：合成 对药物至关重要的蛋白质， 模型就可以不断地利用 现实世界的输入来优化这些方案。

**Original**: And it was one of our first time de-risking Tejal Patwardhan: an eval that's actually connected to the real world.

**中文**：这是我们第一次 降低与 现实世界相关的评估风险，就像 [嗤笑] 我们不用等待一段代码 运行一样。

**Original**: Like we weren't waiting for a piece of Tejal Patwardhan: code to run.

**中文**：我们当时正在等待机器人 完成实验，以便记录 合成了多少蛋白质。

**Original**: We were waiting for the robot to finish the experiment so we could record how Tejal Patwardhan: much protein was synthesized.

**中文**：是的 ，我认为这些模型将为 我们带来很多科学发现。

**Original**: And yeah, I just think the models are going to do so much science Tejal Patwardhan: for us.

**中文**：这将会 非常有趣。

**Original**: It's going to be really interesting.

**中文**：嗯，那很令人兴奋，因为 我觉得 GPT-5 就是这样，它还没有

**Original**: And that was exciting because that was just like, Andrew Mayne: I think, GPT-5 and it hadn't gone through any sort of, here's how to be a scientist.

**中文**：嗯，那很令人兴奋，因为 我觉得 GPT-5 就是这样，它还没有

**Original**: And now

**中文**：嗯，那很令人兴奋，因为 我觉得 GPT-5 就是这样，它还没有

## 27:30  Source / Source

**Original**: Andrew Mayne: these models have progressed a lot since then.

**中文**：经历过任何“如何 成为一名科学家”之类的过程。

**Original**: You have a lot more real world experience with this.

**中文**：现在这些模型已经有了 很大的进步，你也积累了 更多的实际经验 。

**Original**: Tejal Patwardhan: Yeah, that wasn't even with one of our best models.

**中文**：是的，那甚至还不是我们 最好的型号之一。

**Original**: It was like just an early reasoning model.

**中文**：它就像一个早期的 推理模型。

**Original**: Tejal Patwardhan: And so I think, yeah, all of these things stack.

**中文**：嗯，所以我觉得是的， 所有这些因素都会叠加起来，比如我们 会有更好的预训练、更好的 强化学习和后训练，而且我们会 在测试时更好地使用这些模型，从而真正发挥它们的 能力。

**Original**: Like we'll have better pre-training, Tejal Patwardhan: we have better RL and post-training, and we're going to get a lot better at using these models Tejal Patwardhan: time to really elicit their capabilities.

**中文**：我认为下一代 评估的真正意义在于，如何让 这些模型在现实世界中采取行动，

**Original**: And I think the next generation of evals is really about Tejal Patwardhan: how can we have these models take actions in the real world and solve sort of unsolved problems for

**中文**：我认为下一代 评估的真正意义在于，如何让 这些模型在现实世界中采取行动，

## 28:00  Source / Source

**Original**: Tejal Patwardhan: us that would take humans a long time.

**中文**：为我们解决一些 人类需要很长时间才能解决的未解难题，比如 我们一直 未能投入足够精力去 攻克的一些科学难题。

**Original**: You know, some of these scientific problems that we haven't Tejal Patwardhan: been able to put enough effort against.

**中文**：这就好比，现在我们有了这么多 可以消耗计算资源来 为我们解决问题的代理，我们要努力 引导它们朝着有用的方向发展。

**Original**: It's like, well, now we have all of these agents that can Tejal Patwardhan: spend compute to solve problems for us and try to steer them towards what would be useful.

**中文**：但这似乎也 带来了 新的挑战。

**Original**: Andrew Mayne: It does seem like that brings in a new challenge though.

**中文**：你认为 评估会变得更加 复杂吗？

**Original**: Do you think that evals are going to Andrew Mayne: be a lot more complex.

**中文**：是的 ，我们队里有句谚语： 痛苦是护城河。

**Original**: Tejal Patwardhan: Yeah, I mean, we have the saying on our team that pain is the moat.

**中文**：我真的 认为现实世界中的很多操作（笑） 将会成为 衡量模型性能的瓶颈，

**Original**: Tejal Patwardhan: I really think a lot of operations in the physical world will become part of the bottlenecks

**中文**：我真的 认为现实世界中的很多操作（笑） 将会成为 衡量模型性能的瓶颈，

## 28:30  Source / Source

**Original**: Tejal Patwardhan: and being able to measure what the models can do.

**中文**：因为 即使只是从数字领域开始， 我们也需要做很多搭建脚手架和基础设施的工作来运行 这些模型，比如现在如果你想测试 Codex 的性能如何，就会发现 模型正在调用 API。

**Original**: Tejal Patwardhan: Because even just starting with digital, there's so much more scaffolding and infrastructure Tejal Patwardhan: work we need to do to run these.

**中文**：这就像 在你的电脑和 浏览器中进行操作一样。

**Original**: Tejal Patwardhan: Like now, if we want to test how well Codex does, it's like, well, the model is calling Tejal Patwardhan: APIs.

**中文**：它正在为你制作工艺品。

**Original**: Tejal Patwardhan: It's like taking actions on your computer and in your browser.

**中文**：它负责编写、运行和执行 那段代码。

**Original**: Tejal Patwardhan: It's making artifacts for you.

**中文**：嗯， 测量这个模型要复杂得多，而且这还 只是数字模型。

**Original**: Tejal Patwardhan: It's writing and running and executing that code.

**中文**：现在，如果你想让他们 衡量模型如何 与物理世界互动，你需要 各种各样的操作和物流，你需要

**Original**: Tejal Patwardhan: It's just so much more complex to measure that model, and that's only digital.

**中文**：现在，如果你想让他们 衡量模型如何 与物理世界互动，你需要 各种各样的操作和物流，你需要

**Original**: Tejal Patwardhan: Now, if you want to measure how the model could interact with the physical world, Tejal Patwardhan: there's all sorts of ops and logistics that you need to have a really smooth process for

**中文**：现在，如果你想让他们 衡量模型如何 与物理世界互动，你需要 各种各样的操作和物流，你需要

## 29:00  Source / Source

**Original**: Tejal Patwardhan: to see how you can deploy these things at scale.

**中文**：一个非常流畅的流程来 了解如何大规模部署这些东西， 嗯，是的，我认为很多 工作实际上正在从 理论、数学甚至编程转向其他方面。

**Original**: Tejal Patwardhan: And yeah, I think a lot of the work is actually shifting from being like theory or math or even programming.

**中文**：我觉得现在人们不太会编程了 。

**Original**: Tejal Patwardhan: Like I feel like people don't program that much.

**中文**：他们只是询问 Codex，而且工作重心更多地转向 规划、 运营、实体事务，或者 至少我的工作已经朝着这个方向发生了很大的变化 。

**Original**: Tejal Patwardhan: They just ask Codex and more shifting towards like planning, operations, physical stuff, or at least at least my job has shifted a lot that way.

**中文**：嗯， 那些事情都很难。

**Original**: Tejal Patwardhan: And those things are very hard.

**中文**：其实很容易，就像 在角落里写点什么一样。

**Original**: Tejal Patwardhan: It's actually kind of easy to just like write something like in a corner.

**中文**：嗯， 当你需要管理所有

**Original**: Tejal Patwardhan: It's a lot harder when you have to manage all of these operations and logistics.

**中文**：嗯， 当你需要管理所有

## 29:30  Source / Source

**Original**: Andrew Mayne: It's exciting, but it seems like part of the challenge is these aren't just simple evals anymore.

**中文**：这些运营和物流时，那就难多了。

**Original**: Andrew Mayne: They take more compute.

**中文**：这令人兴奋，但 挑战之一似乎在于，这些不再只是 简单的评估了。

**Original**: Andrew Mayne: They take more time.

**中文**：它们需要更多的 计算资源，需要更多的时间。

**Original**: Andrew Mayne: When you're trying to do a long horizon eval, you know, it's long.

**中文**：当 你尝试进行长期评估时， 你知道，评估周期很长。

**Original**: Andrew Mayne: You have to wait a long time to get the outcome on that.

**中文**：你需要等待很 长时间才能得到结果。

**Original**: Tejal Patwardhan: Yeah, definitely.

**中文**：是的 ，当然。

**Original**: Tejal Patwardhan: So it's both a lot more work to come up with the evals and run them at scale.

**中文**：所以， 提出评估方案并 大规模运行它们需要更多的工作，而且，你 知道，这项工作需要更长的 时间，我们就无法快速获得信号。

**Original**: Tejal Patwardhan: And also if the, you know, the work takes a longer amount of time, we don't get the signal as fast.

**中文**：所以，我们必须加大对尺度 定律的投入，这样我们就可以预测，好吧， 如果某一天模型看起来是这样的，

**Original**: Tejal Patwardhan: So we have to invest more in scaling laws where we can predict, okay, well, if by one day the model looks like this, then we can forecast that at seven days it would look like this and sort of come up with trends that we can, so that we can get signal faster.

**中文**：所以，我们必须加大对尺度 定律的投入，这样我们就可以预测，好吧， 如果某一天模型看起来是这样的，

## 30:00  Source / Source

**Original**: Tejal Patwardhan: Otherwise, we're just like stuck there waiting for a week to get an update, which is not the most productive way to spend time.

**中文**：那么我们就可以预测7天后它 会变成这样，并得出一些 趋势，以便我们能够 更快地获得信号。否则，我们就只能 被困在那里等待一周才能 得到更新，这并不是 最有效率地利用时间的方式。

**Original**: Andrew Mayne: I have certain benchmarks and things I use to test every time a new model comes out to find out how it's personally useful to me.

**中文**：每次有新型号 上市，我都会设定一些基准和测试方法，以了解它对 我个人的实用性。

**Original**: Andrew Mayne: And it's one thing I tell people who run businesses or other things is think about your own evals, things that will tell you where something is.

**中文**：这也是 我告诉那些经营 企业或其他事务的人的一件事：要 考虑自己的评估，评估结果会 告诉你事情的进展情况，因为 有时人们可能会尝试一些东西， 比如他们可能在 6 个月前尝试了聊天 GPT， 然后说： “啊，它不好。

**Original**: Andrew Mayne: Because sometimes people might try something, they might try ChatGPT six months ago and go, eh, it wasn't good, it didn't do this.

**中文**：它没有做到这一点。”

## 30:30  Source / Source

**Original**: Andrew Mayne: They don't realize how fast things move.

**中文**：他们没有意识到事物变化有多快。

**Original**: Andrew Mayne: Do you have any advice for people on how to figure out how to come up with a benchmark?

**中文**：对于如何制定基准，您有什么建议 ？

**Original**: Tejal Patwardhan: Yeah, I mean, if things move really fast, things change every couple of weeks.

**中文**：是的，我的意思是，如果事物发展得非常 快，每隔几周就会发生变化， 我觉得人们对这些变化的认识还不够 深入。

**Original**: Tejal Patwardhan: And I feel like people are not as awake about, in my job, I'm one of the first people in the world to see some of the most powerful models.

**中文**：在我的工作中，我是 世界上最早接触到一些 最强大模型的人之一，所以我对通用人工智能（ AGI）非常了解，我认为 进步的速度要快得多。

**Original**: Tejal Patwardhan: So I'm extremely AGI-pilled.

**中文**：我看到了什么？

**Original**: Tejal Patwardhan: And I think progress is happening a lot faster.

**中文**：[笑声] 我见过不少好模特，伙计。

**Original**: Andrew Mayne: What have you seen?

**中文**：是的 ，但进展速度 比人们想象的要快得多。

**Original**: Tejal Patwardhan: What have I seen?

**中文**：是的 ，但进展速度 比人们想象的要快得多。

**Original**: Tejal Patwardhan: I've seen good models, man.

**中文**：是的 ，但进展速度 比人们想象的要快得多。

**Original**: Tejal Patwardhan: Yeah, but progress is happening a lot faster than people would think.

**中文**：是的 ，但进展速度 比人们想象的要快得多。

**Original**: Tejal Patwardhan: And I think the best eval, honestly, is just to dog food or use the model.

**中文**：是的 ，但进展速度 比人们想象的要快得多。

## 31:00  Source / Source

**Original**: Tejal Patwardhan: Like people should just try to use the models as much as they can.

**中文**：老实说，我认为最好的评估方法就是 给狗粮做实验或者用模型来检验。

**Original**: Tejal Patwardhan: And even if there are things that they think the model didn't do well one week, they should just try it again the next week.

**中文**：人们应该尽可能多地使用这些模型 。即使 他们认为模型 在某一周的表现不佳，他们也应该在 下周再次尝试。

**Original**: Tejal Patwardhan: It'll probably work.

**中文**：这 大概会奏效。

**Original**: Andrew Mayne: I think that's one of the things that should be obvious to people kind of outside AI is how really good frontier AI companies are using these tools internally.

**中文**：我认为，对于 人工智能领域之外的人来说，显而易见的一点是，优秀的 尖端人工智能公司是如何在内部使用这些 工具的，这也是为什么人工智能的发展速度越来越快、 能力越来越强的原因。

**Original**: Andrew Mayne: And that's why things are speeding up and getting more capable.

**中文**：是的，我基本上是想让模型先对所有东西进行一次初步 测试。

**Original**: Tejal Patwardhan: Yeah, I basically try to have the model take a first pass of everything that I do.

**中文**：嗯。是的， 我同意。

**Original**: Tejal Patwardhan: Like whether it's, you know, sending a Slack message, like understanding what experiment to perform next, like any management stuff, ops, logistics.

**中文**：比如，你知道，

## 31:30  Source / Source

**Original**: Tejal Patwardhan: like you have the model take a first pass and then if the model is not good we like figure out how to Tejal Patwardhan: put that in the eval.

**中文**：发送 Slack 消息， 了解接下来要进行什么实验 ，以及任何管理方面的事情，运营、 物流，比如让模型进行 第一次测试。如果模型 不好，我们就想办法把 它纳入评估中。我对计算机使用 评估功能感到兴奋。

**Original**: Andrew Mayne: I'm excited about the computer use evals, like just watching the performance of Andrew Mayne: Codex.

**中文**：仅仅观看 Codex 在计算机应用方面的表现，就 比八个月前的情况有了光年的提升。而且这些方面似乎只会越来越好，越来越快 。我的 预测是，到 今年年底，它使用我的电脑的速度 和效率可能会超过我。

**Original**: The computer use is just light years over where it was just, you know, maybe eight months ago Andrew Mayne: and it seems like those things are just going to get faster and better my prediction is like Andrew Mayne: probably by the end of the year it'll use my computer better and faster than i do yeah yes i

**中文**：是的 。是的，我也这么认为。这些模特

## 32:00  Source / Source

**Original**: Tejal Patwardhan: think so the models have some advantages over you right like they can call a connector or plugin Tejal Patwardhan: which is a much faster mode of communication than you on your computer having to go click into a service Tejal Patwardhan: and understand every page and then copy some data back and forth, Tejal Patwardhan: or even writing some service to call that API or MCP or whatever.

**中文**：比你有一些优势，对吧？就像 他们可以调用 连接器或插件一样，这是一种比 你在 电脑上点击 进入服务、了解每个 页面、然后来回复制数据快得多的通信方式 。

**Original**: Tejal Patwardhan: It's more work for the human than for the model.

**中文**：或者甚至可以编写一些 服务来调用该 API 或 MCP 或 其他任何东西。这就像是 人类比模型付出了更多努力。

**Original**: Tejal Patwardhan: The model has that advantage, and the models can just be faster if it's trained to navigate a browser or desktop, Tejal Patwardhan: whether it's through accessibility tree or through code.

**中文**：所以这种 模型具有这种优势。而且， 如果经过训练，模型可以更快地 导航浏览器或 桌面，无论是

## 32:30  Source / Source

**Original**: Tejal Patwardhan: So the models have an advantage over us.

**中文**：通过辅助功能树还是通过 代码。

**Original**: Tejal Patwardhan: And I think for a long time, there was really no product deployment that was very effective.

**中文**：所以模型比我们更有优势。

**Original**: Tejal Patwardhan: We launched Operator and ChatGPT agent a while ago, and those were really useful for showing this could be possible.

**中文**：而且我认为，很长一段时间以来，都 没有什么 真正有效的产品部署。

**Original**: Tejal Patwardhan: But the latency on those models was just too high.

**中文**：然而，就像我们 前段时间推出的操作员和 ChatGPT 代理一样， 它们对于展示 这种可能性确实很有用，但 这些模型的延迟实在 太高了。

**Original**: Tejal Patwardhan: They were just super slow.

**中文**：他们动作超级慢。

**Original**: Tejal Patwardhan: And I don't think people use them at a super high scale yet.

**中文**：我不认为人们 现在会大规模地使用它们，但我们现在已经 达到了一个临界点，让 模型帮

**Original**: Tejal Patwardhan: But we've now reached sort of a tipping point.

**中文**：我不认为人们 现在会大规模地使用它们，但我们现在已经 达到了一个临界点，让 模型帮

**Original**: Tejal Patwardhan: doing things like asking the model to read my Slack for me or like go schedule a bunch of calendar

**中文**：我不认为人们 现在会大规模地使用它们，但我们现在已经 达到了一个临界点，让 模型帮

## 33:00  Source / Source

**Original**: Tejal Patwardhan: invites and like optimize the rooms is faster for me than it would have been um to do it myself Tejal Patwardhan: and i think yeah people are not ready also a lot of people haven't tried this stuff out because Tejal Patwardhan: it's all launched so recently but everyone should go get the computer use plugins and like use those Tejal Patwardhan: and like install all the plugins and all the good connectors that will make things faster Andrew Mayne: then you'll be mind blown let's talk about uh frontier evals yeah so the goal of the frontier Tejal Patwardhan: team is really to measure and forecast progress of the frontier models at OpenAI to better

**中文**：我读取 Slack 消息，或者安排 一堆日历邀请，以及 优化会议室，这些操作比我 自己做要快得多。我觉得是的，人们还没有做好 准备。此外，很多人还没有 尝试过这些东西，因为它们都是 最近才推出的，但是每个人都 应该去买一台电脑，使用插件， 安装所有能 加快速度的插件和连接器。到那时你一定会大吃一惊。我们来谈谈前沿评估吧。是的 。因此，前沿评估团队的目标 是衡量和预测

## 33:30  Source / Source

**Original**: Tejal Patwardhan: understand where we are, where we're going, and sort of try to share that with the world.

**中文**：OpenAI 前沿模型的进展，以便更好地了解我们目前所处的位置、未来的发展方向 ，并尝试 与世界分享这些信息。

**Original**: Tejal Patwardhan: And one of the things I think the team has tried to do is to help publish and open source as much Tejal Patwardhan: that we can.

**中文**：我认为团队一直努力的方向之一就是 尽可能多地发布和开源项目。

**Original**: So, you know, some evals that we've helped open source include like Tejal Patwardhan: SWE-bench Verified, which helped measure progress on coding, MLE-bench, which was a way to measure Tejal Patwardhan: how well models could train other models and sort of track the progress of machine learning, Tejal Patwardhan: engineering skills in our models.

**中文**：所以，你知道， 我们帮助开源的一些评估工具 包括 SweetBench Verified，它 帮助衡量编码方面的进展；MLE Bench，它衡量 模型训练其他模型的能力，并 跟踪 我们模型中机器学习工程技能的进展； PaperBench，它衡量

**Original**: PaperBench, which was a way to measure how well models could

**中文**：所以，你知道， 我们帮助开源的一些评估工具 包括 SweetBench Verified，它 帮助衡量编码方面的进展；MLE Bench，它衡量 模型训练其他模型的能力，并 跟踪 我们模型中机器学习工程技能的进展； PaperBench，它衡量

## 34:00  Source / Source

**Original**: Tejal Patwardhan: replicate real top machine learning papers from like ICML or ICLR and GDPval, which, you know, Tejal Patwardhan: helped measure how well models could perform on real world tasks across, you know, over 40 occupations.

**中文**：模型 复现 ICML 或 ICLR 等顶级机器学习论文的能力； 以及 GDP eval，它帮助 衡量模型在 40 多个职业的实际任务中的表现。所有这些的目标都是， 你知道，这些模型现在可能看起来不太好 ，但如果你绘制出它们如何 随着每一代模型而增长的图表，你会发现 结果随着每一代模型的迭代而改善 ，而人们常常会说， “哦，我预计这需要 一年左右的时间。

**Original**: Tejal Patwardhan: And the goal for all of these has been, you know, the models might not seem good now, but if you just Tejal Patwardhan: plot how they increase with each, you know, the results that improve with each model generation, Tejal Patwardhan: Often when people say like, oh, well, I expect this will take like a year or whatever, they like over, they over expect in terms of how much time it will take to saturate a benchmark.

**中文**：” 他们喜欢“

## 34:30  Source / Source

**Original**: Tejal Patwardhan: And like even my own or people on my team's predictions are often like not ambitious enough for how fast things will change.

**中文**：嗯”。他们 预计 达到基准饱和所需的时间会更长。

**Original**: Tejal Patwardhan: And so I just think we're trying to do our service and helping inform the world about what is possible.

**中文**：甚至我自己或我团队成员的 预测也常常不够乐观，无法应对 事物变化如此之快的速度。

**Original**: Tejal Patwardhan: I think some of these research acceleration evals in particular are quite interesting.

**中文**：所以我觉得我们只是在努力为 世界做贡献，帮助人们了解什么 是可能的。

**Original**: Tejal Patwardhan: Like when we first started, we had this eval called the OpenAI Research Interview eval, which was just taking the researcher questions that we asked people applying to OpenAI and putting those in an eval.

**中文**：我认为其中一些 研究加速评估报告 尤其有趣。就像我们刚开始的时候，我们进行了一项 名为 OpenAI 研究 面试评估的评估，它只是把

## 35:00  Source / Source

**Original**: Tejal Patwardhan: And the model blasted through that like pretty, pretty quickly.

**中文**：我们向申请加入 OpenAI 的人提出的研究人员问题整理 成一个评估。该模型 很快就完成了测试。

**Original**: Tejal Patwardhan: It's like definitely can pass our interviews right now, which I think has caused a whole other slew of downstream questions on like, how do we make sure people don't cheat on the interviews?

**中文**：感觉她 现在肯定能通过我们的面试。

**Original**: Tejal Patwardhan: And like, how do we actually measure research talent?

**中文**：嗯，我认为这 引发了一系列 后续问题，比如我们如何 确保人们在面试中不作弊， 以及我们如何真正 衡量研究人才？

**Original**: Tejal Patwardhan: But I think all of this is very useful because measuring internal progress, it's like kind of a way to measure the lever by which the models will keep getting better, faster, like sort of the acceleration of the slope of improvement, so to speak.

**中文**：但我认为所有这些都非常有用， 因为衡量内部进展就像是衡量 模型不断 改进速度的杠杆作用的一种方式。就像是

## 35:30  Source / Source

**Original**: Tejal Patwardhan: And yeah, I think having ways to measure model progress is just good information.

**中文**：进步速度加快了一样。嗯，我 认为有办法衡量模型的 进展是非常 有用的信息。

**Original**: Andrew Mayne: I've heard that in some of the evals that were out there for a while that it turned out that there were actually errors in the questions, that that was an issue with some of the evals, that that was some of the publicly available ones where actually you couldn't score above a certain level.

**中文**：我听说，之前流传的一些评估报告中 ，有些 题目实际上存在错误。那确实是 某些评估中存在的问题。其中 一些公开的 题目 实际上无法达到 一定的分数上限。

**Original**: Andrew Mayne: And if you did, it was actually because you were training on the data and people looked at that and found out like, oh, there's actually this is not the right answer.

**中文**：如果你真的这么做了，那 实际上是因为你正在用这些 数据进行训练。人们看了之后 发现，“哦，

## 36:00  Source / Source

**Original**: Tejal Patwardhan: Yeah, this is a problem with a lot of public benchmarks.

**中文**：这其实并不是正确答案。

**Original**: Tejal Patwardhan: I think like so the original reason for SWE-bench Verified was because we wanted to run SWE-bench and it was half the problems were either broken or underspecified.

**中文**：” 是的， 我认为这是很多公开基准测试都存在的问题。就像这样， 最初进行 SWE 基准测试验证的原因 是，我们想运行 SWE 基准测试，结果发现 一半的问题要么是程序 损坏，要么是规格不符。

**Original**: Tejal Patwardhan: And, you know, people in the industry were publishing results on this as some metric of how well you did.

**中文**：你知道，业内人士会 公布这方面的数据，以此作为衡量业绩 好坏的指标之一。

**Original**: Tejal Patwardhan: And we were like, well, we should at least try to fix it and then like share that so we can have a better yardstick.

**中文**：我们当时 就想，“好吧，我们至少应该尝试去 解决这个问题。” 然后分享出去，这样我们 就能有更好的衡量标准。

**Original**: Tejal Patwardhan: But I think one of the reasons that public benchmarks maybe aren't always as battle-tested as we'd like is that they tend to be like someone in a lab, like an academic lab, had a good idea and wanted to write a paper.

**中文**：嗯，但我 认为公开的 基准测试可能并不总是像我们希望的那样经过

## 36:30  Source / Source

**Original**: Tejal Patwardhan: But they never had to run that eval at scale in production, training run or production level eval sweep for a launch.

**中文**：实战检验，原因之一是， 它们往往像是 实验室里的某个人（比如学术实验室里的某个人）想出了 一个好主意， 想写篇论文，但他们从未在 大规模环境下运行过评估，比如生产环境的 训练运行或发布前的全面 评估。

**Original**: Tejal Patwardhan: And just when you run some of this stuff at scale, it breaks or falls over and you catch all of these bugs.

**中文**：而当 你在大规模环境下运行这些测试时，它们就会 崩溃或失效，你才能 发现所有这些漏洞。

**Original**: Tejal Patwardhan: And so I kind of think sitting in a lab and being closer to product is a forcing function for making sure the quality of your measurements is really high.

**中文**：所以我认为，在实验室里，更 接近产品，这本身就是一种强制 机制，可以确保 你的测量质量非常高。

## 37:00  Source / Source

**Original**: Tejal Patwardhan: Because, like, we're not doing this to, like, look good in a paper.

**中文**：因为我们做这些测试不是为了 在论文里看起来漂亮，而是为了确保它能够有效 运行，因为它必须在 大规模环境下对我们的系统有效运行，所以这在某种程度上 迫使我们追求高质量。

**Original**: Tejal Patwardhan: We're, like, doing this.

**中文**：似乎可能会 出现的情况之一是，这些模型 有时能力非常强， 有时它们非常擅长解决问题，但 它们会选择最懒惰的方式，直接 给出 记忆中的答案，而不是解决问题。

**Original**: Tejal Patwardhan: Like, it has to work.

**中文**：我们看到，比如计算 一个字符或单词有多少个字母，或者一个单词有多少个单词 等等，通常情况下，如果 你用正确的方式提示模型，它就能给出

**Original**: Tejal Patwardhan: Because it has to work for our systems at scale.

**中文**：我们看到，比如计算 一个字符或单词有多少个字母，或者一个单词有多少个单词 等等，通常情况下，如果 你用正确的方式提示模型，它就能给出

**Original**: Tejal Patwardhan: So it kind of forces the quality to be high.

**中文**：我们看到，比如计算 一个字符或单词有多少个字母，或者一个单词有多少个单词 等等，通常情况下，如果 你用正确的方式提示模型，它就能给出

**Original**: Andrew Mayne: And it seems like kind of one of the things that can happen is these models become incredibly capable.

**中文**：我们看到，比如计算 一个字符或单词有多少个字母，或者一个单词有多少个单词 等等，通常情况下，如果 你用正确的方式提示模型，它就能给出

**Original**: Andrew Mayne: Sometimes they're very good at, sometimes they can solve a problem that they'll take sort of the laziest path.

**中文**：我们看到，比如计算 一个字符或单词有多少个字母，或者一个单词有多少个单词 等等，通常情况下，如果 你用正确的方式提示模型，它就能给出

**Original**: Andrew Mayne: and kind of they can they can give you the memorized answer instead of solving it.

**中文**：我们看到，比如计算 一个字符或单词有多少个字母，或者一个单词有多少个单词 等等，通常情况下，如果 你用正确的方式提示模型，它就能给出

**Original**: Andrew Mayne: And we saw that with like counting and like how many words are in it, Andrew Mayne: how many letters in a character in a word or whatever.

**中文**：我们看到，比如计算 一个字符或单词有多少个字母，或者一个单词有多少个单词 等等，通常情况下，如果 你用正确的方式提示模型，它就能给出

**Original**: Andrew Mayne: And it was often the model.

**中文**：我们看到，比如计算 一个字符或单词有多少个字母，或者一个单词有多少个单词 等等，通常情况下，如果 你用正确的方式提示模型，它就能给出

**Original**: Andrew Mayne: If you prompt it right, it would get the answer right.

**中文**：我们看到，比如计算 一个字符或单词有多少个字母，或者一个单词有多少个单词 等等，通常情况下，如果 你用正确的方式提示模型，它就能给出

## 37:30  Source / Source

**Original**: Andrew Mayne: But if you didn't prompt it the right way, it would just sort of throw you an answer.

**中文**：正确的答案，但如果你没有用 正确的方式提示，它就会直接 给出一个答案。

**Original**: Tejal Patwardhan: Yeah, that brings up all sorts of interesting concepts.

**中文**：是的，这引出了各种各样 有趣的 概念。

**Original**: Tejal Patwardhan: I mean, so there's this one concept of memorization, Tejal Patwardhan: which is the idea that the model literally knows the answer Tejal Patwardhan: and doesn't have to really think or reason to solve.

**中文**：比如，其中一个 概念就是记忆，它指的是 模型实际上知道 答案，不需要思考 或推理就能解决问题，就像 复述它已经知道的东西一样。

**Original**: Tejal Patwardhan: It's just like regurgitating something it already knows.

**中文**：这 使得测量结果不太 有用，因为你只是在衡量 你是否恰好用 大量数据进行过训练，而不是衡量 模型是否真正学习了你想要衡量的技能、 工具或能力。

**Original**: Tejal Patwardhan: And that makes the measurement not super useful Tejal Patwardhan: because you're just measuring whether you happen to have trained on that data a ton Tejal Patwardhan: versus whether the model learned the skill or tool or capability you were trying to measure.

**中文**：避免这种情况的一种方法是，尽量保持

**Original**: Tejal Patwardhan: So that's one way to avoid that is to try to be really clean and disciplined about your data,

**中文**：避免这种情况的一种方法是，尽量保持

## 38:00  Source / Source

**Original**: Tejal Patwardhan: not including any benchmarks or any evals that you want to measure.

**中文**：数据的干净和规范，不 包含任何基准测试或 你想要衡量的评估。

**Original**: Tejal Patwardhan: And that helps solve sort of the first problem that you laid out.

**中文**：这有助于 解决你提出的第一个问题。

**Original**: Tejal Patwardhan: So that's one thing.

**中文**：这 是一方面。另一方面， 模型可能会通过 奖励机制或作弊来 解决评估问题。

**Original**: Tejal Patwardhan: And then there's this other thing where like the model can kind of like reward hack Tejal Patwardhan: or sometimes like cheat to solve an eval.

**中文**：这很大程度上取决于 评估设计的规范性， 你需要大规模地测试这些模型， 看看是否存在任何作弊行为，并 确保你 测试的环境不存在这些作弊行为。

**Original**: Tejal Patwardhan: And that's very much a question of having clean eval design where you like sort of test these at scale, see if there's any hacks, make sure those environments that you're testing don't have the hacks as something that's possible for the model to do.

**中文**：模型可以 做到这一点。

**Original**: Tejal Patwardhan: And that just requires a lot of quality control to make sure like the eval is not overly hackable.

**中文**：这就需要大量的

## 38:30  Source / Source

**Original**: Tejal Patwardhan: Yeah.

**中文**：质量控制，以确保 评估过程不会过于容易被破解。

**Original**: Andrew Mayne: Yeah, because it seems like there were some very simple ones like grade school math and whatnot that models, if you just change it a little bit, some of the early models would get confused and give you the wrong answer that was actually capable of solving it.

**中文**：嗯，是的。

**Original**: Andrew Mayne: But it just goes, oh, this one, I got it.

**中文**：是的，因为似乎有些 非常简单的模型，比如小学数学之类的， 如果你 稍微改变一下，一些 早期的模型就会出错，给出 错误的答案，而 实际上它们有能力解决这个问题。但它 却说：“哦，这个我搞定了。

**Original**: Andrew Mayne: And then, you know, that's happened to like, you know, should I drive my car to the car wash?

**中文**：” 然后，你知道，这种情况就发生在了， 比如，我应该开车去 洗车吗？

**Original**: Andrew Mayne: You problem.

**中文**：你遇到问题了。

**Original**: Tejal Patwardhan: Yeah.

**中文**：是 啊，是啊，是啊。所以模型可能会 被欺骗。

**Original**: Tejal Patwardhan: So like the models can get tricked to me, like the model does like if it didn't get to do well on that, like it, it should have been smarter.

**中文**：我觉得这个模型好像 不喜欢它没能取得好成绩，就 好像它应该更 聪明一些。

**Original**: Tejal Patwardhan: Like we should also have the models be a bit more robust to being tricked.

**中文**：就像我们希望 模型能够更稳健地抵御

## 39:00  Source / Source

**Original**: Tejal Patwardhan: But this also relates to this idea of capability elicitation or like trying to measure the models in the best way, which is especially important for our safety testing.

**中文**：欺骗一样。但这与 能力获取的概念， 或者说以 最佳方式衡量模型的概念也有关联，这 对于我们的安全测试来说尤其重要。

**Original**: Tejal Patwardhan: Like, for example, if you want to measure how well the model can, you know, find vulnerabilities or, you know, do some of the cybersecurity stuff, you want to make sure the model is not just getting tricked by the problem like that.

**中文**：例如，如果你想衡量 该模型在发现 漏洞或 执行一些网络安全 任务方面的能力。

**Original**: Tejal Patwardhan: You really measured the true capability.

**中文**：你要确保模型 不是被问题本身所迷惑。

**Original**: Tejal Patwardhan: And so there's a lot of like prompt tuning and like changing the harness and sometimes like even doing like a fine tune to get the model maximally ready to solve that challenge that we do to make sure if we say, oh, the model is not good at some like very risky capability, we can be a bit more sure before we say that.

**中文**：这样才能真正衡量出真正的 能力。因此，我们需要进行大量的 快速调整，例如更换 线束，有时甚至需要进行 微调，以使模型能够

## 39:30  Source / Source

**Original**: Andrew Mayne: When I was a kid, I loved reading these Encyclopedia Brown stories, these little mysteries, and you had to solve them.

**中文**：最大限度地应对挑战， 以确保， 如果我们发现“哦，这个模型 在某些非常危险的能力方面表现不佳”。

**Original**: Andrew Mayne: And with GPT-4, I would write custom ones for it just in case somebody had like tipped all these answers to it out there.

**中文**：在 我们得出这个结论之前，还需要一些时间来进一步确认 。我小时候很喜欢读《 布朗侦探百科全书》的故事，那些 小小的谜题需要你自己去解开 。

**Original**: Andrew Mayne: But that was a pain to kind of do that.

**中文**：至于 GPT-4，我会编写一些 自定义的答案，以防有人 已经把所有这些答案都泄露出去了 。

**Original**: Andrew Mayne: And it's exciting to think now I can have a model write something and come up with some new eval.

**中文**：但那样 做很麻烦。想到 现在我可以给模型生成一些东西 或者提出一些新的评估方法，就令人兴奋不已。

**Original**: Andrew Mayne: So how helpful have the models been now for?

**中文**：那么 这些模型现在对我们有多大帮助呢？

## 40:00  Source / Source

**Original**: Tejal Patwardhan: Yeah, they're semi-useful.

**中文**：嗯， 它们有点用处。

**Original**: Andrew Mayne: Yeah, okay.

**中文**：好的。

**Original**: Tejal Patwardhan: I think we're in this like phase of model development where sometimes the outputs are still kind of sloppy.

**中文**：嗯，我认为我们正处于 模型开发的这个阶段， 有时候 输出结果还不够完善。

**Original**: Andrew Mayne: Yeah.

**中文**：是的 。

**Original**: Tejal Patwardhan: And they require like human QC or like oversight to make sure the quality is still high and like we're not getting tricked.

**中文**：他们需要人工质检或 监督，以确保质量 仍然很高，并且我们不会被 欺骗。

**Original**: Tejal Patwardhan: So I would say people sometimes are surprised that we still have a lot of human intervention and involvement in the evals just because that's something, you know, evals can be a lower N than training data.

**中文**：所以，我认为人们 有时会惊讶于我们在评估中仍然 有大量的人工干预和 参与，因为 你知道，评估数据的水平可能 低于训练数据，而你

## 40:30  Source / Source

**Original**: Tejal Patwardhan: And you want to make sure every single point that you're testing, every data point is very high quality.

**中文**：想确保 你测试的每一个点，每一个数据点， 都是非常高质量的。

**Original**: Tejal Patwardhan: And so this is one of the areas where like a human touch can be quite nice.

**中文**：嗯， 所以，在某些方面， 人情味会显得格外美好。

**Original**: Andrew Mayne: We're seeing some interesting trends where jobs that actually touch AI seem to be more in demand because it's made people more productive.

**中文**：我们看到一些有趣的趋势，即与 人工智能真正相关的工作似乎 更受欢迎，因为人工智能 提高了人们的生产力。

**Original**: Andrew Mayne: How are you tracking this?

**中文**：你们是如何 追踪这些数据的？

**Original**: Andrew Mayne: How do you look for areas where you think this is going to have an impact?

**中文**：你如何寻找 你认为会受到 影响的领域？

**Original**: Tejal Patwardhan: Yeah, these are very difficult questions.

**中文**：是的 ，这些都是非常棘手的 问题。

**Original**: Tejal Patwardhan: I think that I think people are not calibrated to how much work our models will be able to do and how quickly like across a wide variety of jobs.

**中文**：嗯， 我 认为人们还没有意识到 我们的模型能够完成多少工作，

## 41:00  Source / Source

**Original**: Tejal Patwardhan: And right now the models are still mostly just good at tasks versus a job.

**中文**：以及它们在各种工作中能够以多快的速度完成工作 。

**Original**: Tejal Patwardhan: Like there's a lot more to a job than a task.

**中文**：嗯， 目前这些模型大多还只能胜任 任务，而不能胜任工作。

**Original**: Tejal Patwardhan: Right.

**中文**：一份 工作包含的内容远不止一项任务。

**Original**: Like you have to figure out what you want to work on, navigate like ambiguity.

**中文**：正确的？

**Original**: Tejal Patwardhan: Like you might have coworkers that you're collaborating with and like communicating with.

**中文**：就像你必须弄清楚 你想做什么工作，应对各种 不确定性，就像你可能要和 同事合作 并进行沟通一样。

**Original**: Tejal Patwardhan: And then you might like figure out what task you want to do and then give that to a model.

**中文**：然后，你可以先确定 你想完成的任务，然后把这个任务交给一个 模型。

**Original**: Tejal Patwardhan: And that's kind of the phase we're at now where it's a lot of, I mean, even in my job, the model is like doing individual tasks for me, but I'm still doing a lot of the thinking and planning and that sort of thing.

**中文**：而 我们现在就处于这样一个阶段，我的意思是， 即使在我的工作中，模式是

## 41:30  Source / Source

**Original**: Tejal Patwardhan: And I think people aren't even calibrated to that.

**中文**：为我完成单个任务，但我 仍然要进行大量的思考和 计划等等。

**Original**: Tejal Patwardhan: Like I feel like people in software and research are a lot more calibrated or by calibrated.

**中文**：而且 我认为人们甚至都没有意识到这一点 。

**Original**: Tejal Patwardhan: I mean, like realize how capable the models are compared to some of my friends in other industries.

**中文**：我觉得 软件和研究领域的人比我其他行业的一些朋友更了解 模型的运作能力，或者说，他们更清楚模型的强大之处 。

**Original**: Tejal Patwardhan: And I like wish people just tried the models more and saw because the people who try and see first, like they'll start to really get it.

**中文**：我希望人们能 多尝试一下这些模型，看看效果如何，因为 那些先尝试一下的人， 会开始真正理解它们。

**Original**: Tejal Patwardhan: But I also think the models are going to start to be able to do the stuff like the delegating part at some point to maybe not too far from now.

**中文**：嗯，但我 认为这些模型

## 42:00  Source / Source

**Original**: Tejal Patwardhan: The figuring out what to work on, navigating ambiguity, like writing the spec that the model then executes on.

**中文**：在某个时候也将能够做到像委托这样的事情。嗯， 或许不会太远了。

**Original**: Tejal Patwardhan: And people should really start to think about, okay, what happens in the maximally AGI-pilled world where even just for digital work, the model can come up with what to do, do it, execute it on it, like interact with the real world.

**中文**：嗯，就是 弄清楚要做什么，应对各种 模糊不清的情况，比如编写 模型执行所需的规范。人们 真的应该开始思考， 在 人工智能高度发达的世界中发生了什么？

**Original**: Tejal Patwardhan: Like, you know, if it's, you know, there's entire businesses that now like you see like stories of like unicorns that where it was like mostly AI and a few employees that were like able to drive all of this value.

**中文**：即使只是对于 数字 工作，模型也能想出 要做什么，执行它，就像 与现实世界互动一样。你知道， 现在有很多企业，比如 独角兽公司，它们 主要依靠人工智能和少数员工来

## 42:30  Source / Source

**Original**: Tejal Patwardhan: And so I do think there's this question of, you know, are we realizing how big this might be?

**中文**：创造所有 价值。

**Original**: Andrew Mayne: Personally, I think the opportunity space is getting bigger.

**中文**：嗯， 所以我觉得这里有个问题 ，那就是，我们是否意识到 这件事的规模有多大？

**Original**: Andrew Mayne: Everybody I know, the most AGI-pilled people I know, Andrew Mayne: the people who are using tools like Codex all the time are doing way more now.

**中文**：我个人认为，机会 空间正在扩大。

**Original**: Andrew Mayne: They're more productive now because they don't have to do the tasks and the jobs.

**中文**：我认识的每个人 ，尤其是那些最擅长使用 AGI 的人 ，那些一直使用 Codex 等工具的人， 现在都做得更多了。

**Original**: Andrew Mayne: As the AI gets better at handling certain jobs, they're like, cool, Andrew Mayne: there are five jobs I need done now because I can do more.

**中文**：他们现在效率更高了， 因为他们不必再亲自完成那些任务 和工作，因为人工智能越来越擅长 处理某些工作，比如，太好了， 现在我需要完成五项工作，因为我可以 做更多。

**Original**: Andrew Mayne: And I think that we just think about the light cone of the potential where we can be

**中文**：我认为我们应该意识到，我们

## 43:00  Source / Source

**Original**: Andrew Mayne: is bigger than we can imagine.

**中文**：所能达到的潜在范围比 我们想象的要大得多。

**Original**: Andrew Mayne: And I think these tools just help us get there faster, not narrow it.

**中文**：我认为这些工具 只是帮助我们更快地达到目标，而不是 缩小目标范围。

**Original**: Tejal Patwardhan: I think it's probably some mix of things.

**中文**：我认为可能是多种 因素混合造成的。

**Original**: Tejal Patwardhan: Even if you have models that can speed up paperwork, like think about like a clinical trial for a drug, right?

**中文**：是的 。

**Original**: Tejal Patwardhan: It's like people spend months putting together all this paperwork, like hundreds of pages of like why they should be able to do the trial.

**中文**：即使你有一些可以 加快文书工作的模型，想想看，就像 药物的临床试验一样，对吧？感觉你们花了几个月的时间 收集整理这些 文件，比如几百页的文件， 说明他们为什么应该能够进行 审判。

**Original**: Tejal Patwardhan: And they like submit it to the FDA.

**中文**：他们喜欢把申请提交给美国食品药品监督 管理局（FDA）。

**Original**: Tejal Patwardhan: And then there's like a 35% chance it got rejected because they like made a mistake or forgot something.

**中文**：还有大约 35% 的几率 因为 出错或遗漏某些东西而被拒绝。

**Original**: Tejal Patwardhan: They revise.

**中文**：他们会 进行修改。

**Original**: Tejal Patwardhan: And finally, you can do the trial.

**中文**：最后你就可以进行

## 43:30  Source / Source

**Original**: Tejal Patwardhan: And, you know, these processes are good, but it just takes a long time.

**中文**：审判了。

**Original**: Tejal Patwardhan: And then the trial is, you know, you have a case and a control or whatever, and you're like documenting symptoms.

**中文**：你知道，这些流程虽然 很好，但就是耗时太长。

**Original**: Tejal Patwardhan: and tracking these for like just documenting what happens for a long time and then doing a bunch of Tejal Patwardhan: data analysis.

**中文**：然后试验就是，你知道，你 有一个病例组和一个对照组之类的， 然后你记录症状， 跟踪这些症状，就像 长时间记录发生的事情， 然后进行大量的数据分析。

**Original**: Like a lot of this is just documentation or data analysis or sort of like Tejal Patwardhan: very classically digital work.

**中文**：很多工作只是文档记录 、数据分析或者非常 传统的数字工作。

**Original**: And I think if models can help accelerate all parts of this, Tejal Patwardhan: you know, for health, for energy, manufacturing, policy research, education, this will be very Tejal Patwardhan: accelerative.

**中文**：我认为，如果 模型能够帮助加速各个方面的发展 ，例如医疗、能源、 制造业、政策研究、 教育等等，这将极大地 促进各个领域的进步。

**Original**: We will have hopefully, you know, faster, cheaper, better goods.

**中文**：希望我们能拥有

**Original**: And that's really

**中文**：希望我们能拥有

## 44:00  Source / Source

**Original**: Tejal Patwardhan: good for people.

**中文**：更快、更便宜、更好的商品。

**Original**: It's like very good for the individual consumer.

**中文**：这对人们来说真的很有好处。

**Original**: So I think that is like Tejal Patwardhan: something people should be excited about.

**中文**：这 对个人消费者来说非常好 。

**Original**: But we should be very thoughtful about how to navigate Tejal Patwardhan: the transition to that world in a way that's thoughtful and like responsible.

**中文**：所以，我认为这是一件值得 人们感到兴奋的事情 。但是，我们应该认真思考 如何以一种深思熟虑且负责任的方式来应对向 那个世界的过渡 。

**Original**: Andrew Mayne: Excellent.

**中文**：出色的。

**Original**: Thank you, Tejal.

**中文**：谢谢你，奇吉纳。

**Original**: Tejal Patwardhan: Thank you for having me.

**中文**：谢谢邀请。
