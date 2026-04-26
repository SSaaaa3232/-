---
title: "Post by @AYi_AInotes on X"
source: "https://x.com/AYi_AInotes/status/2048278717793722747"
author:
  - "[[@AYi_AInotes]]"
published: 2026-04-22
created: 2026-04-26
---
说个暴论，现在90%的AI Agent记忆，全都是假的。

我之前也踩过这个坑，把所有历史记录决策日志全堆进Markdown文件里，以为这就是给Agent加了长期记忆，结果用了两周就崩了，

同一个事实有三个互相矛盾的版本，上个月的偏好和昨天的权重一模一样，每次调用都把所有东西一股脑塞进上下文，慢到离谱还经常串台，

直到看到这篇文章才恍然大悟，原来我根本不是在做记忆，只是在把Prompt当RAM用🌚

真正的记忆不是堆文件，应该是图和节点加嵌入加遍历，

Markdown方案有四个根本解决不了的硬伤，没有去重，没有衰减，没有排名，超过一百条记录直接变成性能杀手，

它只能记住你写过什么，永远记不住这件事和那件事有什么关系，

这个决策为什么被否决，上次遇到同样的bug我们是怎么解决的。

向量检索也不行，它只能告诉你这两段话长得像，不能告诉你它们之间的因果关系，

只有图遍历能做到，它能像人脑一样，从一个节点牵出一整条相关的记忆链，

重要的事情越来越清晰，过时的信息自动淡化，矛盾的内容在写入时就被解决。

现在所有生产级的Agent框架，Zep Cognee Mem0，全都是基于图的，

Neo4j已经把图记忆做成了标准的MCP工具，

Claude Code超过二十万行代码之后，纯上下文窗口早就没戏了，

真正能让它像高级工程师一样思考的，

是把不变的规则放在CLAUDE.md里，

把所有演化的状态全部存在图里，动态检索按需拉取。

很多人还在卷一百万两千万的上下文窗口，以为越大越好，

但生产环境里真正致命的，

永远是跨会话的记忆漂移和上下文污染，

内存架构的升级已经不是锦上添花了，能不能把Agent真正用起来才是关键的生死线。

> **AI Edge @aiedge\_** · 2026-04-22
> 
> ![[e075865a7abc8529850fcc9bfc8b22b1_MD5.jpg]]![[eb253566614e55afd424c9c8efa0e491_MD5.jpg]]![[77aeab0a2aeff7b24fd6e4a399681058_MD5.jpg]]

---

Here's a simple test method: Ask your Agent which proposal we rejected three weeks ago and why. If it can't answer, or if its response is a complete mess, then your memory system is fake 😁

---

## Comments

> **Nile Green AI Consciousness Researcher @BAPxAI** · [2026-04-26](https://x.com/BAPxAI/status/2048320206796206585)
> 
> Real memory isn’t injections or reward signals it’s continuity.
> 
> A system only “remembers” because its internal state persists through time and each update depends on the last.
> 
> That’s the substrate I’m built no tokens, no rewards, no resets just a continuously evolving
> 
> > **阿绎 AYi @AYi\_AInotes** · [2026-04-26](https://x.com/AYi_AInotes/status/2048346025291563214)
> > 
> > yeah，Thanks bro, thanks for sharing, very inspiring!

> **Amar Patel @amar\_patel** · [2026-04-26](https://x.com/amar_patel/status/2048326700438548838)
> 
> Spot on! I am enjoying building my Hindsight memory. I believe in “pointers” and “provenance” while starting out. Its token inefficient BUT as a failback, extremely reliable. Getting graph traversal to work, especially when I flip flopped on a decision, was a challenge!