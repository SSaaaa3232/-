---
ingested: 2026-05-06
wiki_page: "[[wiki/sources/Source - how i rebuilt our landing page in 4 hrs with Claude我如何用 Claude 在 4 小时内重建我们的登陆页]]"
title: "how i rebuilt our landing page in 4 hrs with Claude我如何用 Claude 在 4 小时内重建我们的登陆页"
source: "https://x.com/DhravyaShah/status/2044249709326573594"
author:
  - "[[@DhravyaShah]]"
published: 2026-04-15
created: 2026-04-15
---
![[8b8fc9f7196ad90bc15e7aa13bf66246_MD5.jpg]]

Iteration velocity is the most important thing for startups. The first version of our landing page was built by one of the top design agencies. Then, we rebuilt it again after a few months - different agency this time.迭代速度对初创企业来说是最重要的。我们首个登陆页面版本由顶级设计机构之一制作。几个月后，我们又重建了——这次换了不同的机构。

These big changes were all throughout different phases of supermemory's journey, as our product offering, branding, and other things kept evolving, we kept iterating on how we put it across in our marketing. 这些重大变化贯穿了超级记忆发展历程的不同阶段，随着我们的产品供应、品牌塑造和其他内容不断演变，我们不断迭代营销中如何表达这些内容。

The agencies were truly amazing at their work! They brought a lot of the branding and perception behind today's supermemory brand. I am really grateful to them for all the help so far. 这些机构的工作真的非常出色！他们带来了许多当今超级记忆品牌背后的品牌形象和认知。我非常感谢他们迄今为止的帮助。

However, I had one single problem.不过，我遇到了一个问题。

Iteration velocity.迭代速度。

Times have changed. Genuinely - If you're not AI native anymore, you're not gonna make it.时代变了。说真的——如果你不再是 AI 原生，你是做不到的。

![[7a0b835f978314a37ed621e298f79828_MD5.jpg]]

## The feedback loop反馈回路

One of these times, I asked the agency: What's the timeline on this project? I was expecting days - or a week. But, they came back with a big plan with a lot of tiers of work - 2 weeks for figuring out how it will look like, 1 week after that for implementation, etc. etc.有一次，我问经纪公司：这个项目的时间表是什么时候？ 我本以为会有几天——甚至一周。但他们带着一个大计划回来，分了很多层次的工作——两周时间确定效果，再过一周实施，等等。

The whole project would take us months, and then the landing page would be on framer. The other stuff? App, console designs - we had to actually implement their designs after they are done.整个项目需要几个月时间，然后着陆页会在装框器上。其他的？应用、控制台设计——我们必须在它们完成后实际实现它们的设计。

## The no code curse无代码诅咒

Before Claude Code became so good, our landing page was completely on framer - Fully maintained by the ones who actually did the design. They were tasteful, and obviously a lot of work and effort would go into it. But, any change would require people who know framer to do them. 在 Claude Code 变得如此优秀之前，我们的落地页完全依赖于 framer——由实际设计的人完全维护。它们很有品味，显然需要付出大量努力和努力。但任何改动都需要懂装框师的人来做。

It became a real curse. Adding marketing pages, blogs, etc. would be a pain. The website would load too much javascript or would not be good at SEO or the animations would completely throttle the browsers - And we just had to tell them to improve it.这成了真正的诅咒。添加营销页面、博客等会很麻烦。网站会加载过多的 JavaScript，或者 SEO 表现不好，或者动画会完全限制浏览器流量——我们只能让他们改进。

And we didn't really know how we can exactly improve it - It was hard for us (because everyone at supermemory was a developer at the time) to actually do A/B tests or figure out how we can convey our messaging in the best way, or improve the copy. On top of paying the designers, we were paying Framer thousands of dollars a year. For any change, I could not just prompt my agent to do it. I had to tell them, in good detail, how to do it. and then work with them iteratively until it makes sense for us. 我们其实也不太清楚具体怎么改进——当时 Supermemory 的每个人都是开发者，所以很难做 A/B 测试，或者找出如何以最佳方式传达信息，或者改进文案。除了支付设计师工资，我们还每年支付 Framer 数千美元。 任何变动，我不能直接让经纪人去做。我必须详细地告诉他们该怎么做。然后反复迭代，直到对我们来说有意义。

I decided to get rid of all of it. fuck it. I'll make the landing page myself.我决定把所有东西都处理掉。去他妈的。我自己做登陆页。

# Great design with Claude Code用 Claude Code 设计得很棒

I am no designer. But you should check out [https://supermemory.ai](https://supermemory.ai/) - It was built in just 4 hours with claude code.我不是设计师。不过你应该看看 [https://supermemory.ai](https://supermemory.ai/)——它用 Claude 代码只用了 4 小时就建成了。

Yeah. That's right. I first started out by asking Claude what exactly we should convey to our users and figuring out the copy.是的。没错。我一开始问 Claude，我们到底应该向用户传达什么，并确定文案内容。

This entire thing was one single Claude Opus 4.6 1M session.整个过程就是一次 Claude Opus 4.6 100 万的录音。

## Prepare the skills.准备技能。

Based on my plan, I knew that I want Claude to do really good SVG animation. I scoured the internet for the best SVG animation courses, transcribed them, and made a skill out of the best learnings. The skill wasn't big, but it was just enough to make sure that the baseline is strong. 根据我的计划，我知道我希望 Claude 能做出非常出色的 SVG 动画。我在网上搜寻最好的 SVG 动画课程，转录下来，并将最好的学习变成了一项技能。这个技能不大，但足够确保基线稳固。

A subagent prepared this. [https://github.com/supermemoryai/skills/blob/main/svg-animations/SKILL.md](https://github.com/supermemoryai/skills/blob/main/svg-animations/SKILL.md)一个副代理人准备了这个。 [https://github.com/supermemoryai/skills/blob/main/svg-animations/SKILL.md](https://github.com/supermemoryai/skills/blob/main/svg-animations/SKILL.md)

Similarly, I prepared the basic skills necessary for all the things I knew I wanted a designer to know.同样，我准备了所有我希望设计师掌握的基本技能。

![[dda8baabf893fc78c26bc86236fcfa8a_MD5.jpg]]

This section, for example, is completely done using svg animations.例如，这一部分完全采用了 SVG 动画。

## Build the tooling.制作模具。

For many of the visuals, I knew that I would require some libraries - Namely for animated Ascii art and the pixelization effects. 对于许多视觉效果，我知道需要一些库——主要是动画 ASCII 艺术和像素化效果。

So, I sent two subagents to figure out how we can best do these animations on the web, in a performant way, and built a package out of it so as to not confuse the main design stuff with it.于是，我派了两个子代理去研究如何在网页上以性能最佳的方式完成这些动画，并基于它构建了一个包，以避免将主要设计内容与它混淆。

Claude automatically made a package, put it on my Github here - [https://github.com/dhravya/landing-effects](https://github.com/dhravya/landing-effects) and even recorded and added the GIFs to show how the animations would look like.Claude 自动制作了一个包，放到了我的 Github 上——[https://github.com/dhravya/landing-effects](https://github.com/dhravya/landing-effects)，甚至录制并添加了 GIF 来展示动画效果。

![[872ac80cc211ee30209dbffd74e15c1e_MD5.jpg]]

![[c1f609d7733452f0f958256cd32d927b_MD5.jpg]]

## Closing the loop with good memory

Throughout the session, I made sure that Claude is actually looking and thinking about how this looks like. It also knows all the business requirements, what our team cares about, and what our users are asking for, as I was using the Supermemory Claude code plugin.

We have been putting all of our customer recordings and team meetings inside our own team supermemory, and the coding sessions also get the same. Because Claude already knew everything about what we do and who are, it was able to come up with a design language and strategy that increased our conversions by 40%. [https://github.com/supermemoryai/claude-supermemory](https://github.com/supermemoryai/claude-supermemory)

The main part isn't just good memory for claude - supermemory does that very well. The main part was the fact that this memory and context is collected not only from coding sessions but from our daily lives, our [claude.ai](https://claude.ai/) chats, team's openclaw agents, and more.

## Completeness

I asked it to analyze the entire page for performance and SEO - and it did.

![[fb451934802d2ebdfd83c060acdb6cc8_MD5.jpg]]

It might look a bit vibe coded - And that's fine for me. I know that I can iterate my way to greatness instead of waiting months to ship anything.

## AI native - hook it up to a background agent

We are just 4 full time employees building supermemory. That's it. And that includes me - a solo founder.

One of them, who is non-technical, can do all the work on the landing pages, autonomously, with a background agent.

![[33dc3702350f98810e9ec28fc96b2ae1_MD5.jpg]]

Which means everyone on the team is now the designer, with just enough iteration cycles.

We're living in some insane times. Most of the design work can (and should) be done by the team when we're figuring things out.

Design is definitely important for product - But most people probably are overpaying for it.