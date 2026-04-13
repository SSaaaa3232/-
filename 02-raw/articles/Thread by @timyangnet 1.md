---
title: "Thread by @timyangnet"
source: "https://x.com/timyangnet/status/2043086842762014744"
author:
  - "[[@timyangnet]]"
published: 2026-04-12
created: 2026-04-13
---
**Tim** @timyangnet [2026-04-11](https://x.com/timyangnet/status/2043086842762014744)

大家经常说的编排（Orchestration）Agent 似乎也不是必须，看 Anthropic 那个让 16 个 agent 并行两周不打架的案例：

这是 Nicholas Carlini 的编译器项目。最有意思的是他绕过了复杂的 agent 编排，回归了最朴素的如图所示 Bash Shell 循环：

🛠 同步协议：

任务池： 一个名为 current\_tasks/ 的共享文件夹。

互斥锁： 智能体写入 .lock 文件标记“我在做了”。

分布式协同： 利用 Git 处理并行修改，连合并冲突（Merge Conflict）都由 Claude 自行解决。

🔄 单次 Loop 逻辑：

启动： 容器启动，拉取 upstream 最新状态。

寻路： Claude 扫描目录，认领没被锁定的任务。

交付： 完成编码，更新进度文件，git push 并释放锁。

current\_task 从哪里来？所有 agent 都可以往里面提交任务，这个应该是写在 AGENT\_PROMPT.md 启动规则里面。

对于长任务 agent 来说，这种设计模式省去了昂贵的编排管理成本，非常值得借鉴。

https://anthropic.com/engineering/building-c-compiler…

![[90bc337a54a11cdefcf8f78af2ca7fc7_MD5.jpg]]

---

**geoqiao** @geoqiao [2026-04-13](https://x.com/geoqiao/status/2043533279652139494)

Does this also mean that every agent needs to have the full context of the repository?

When claiming tasks, the priority between agents is also an issue.

---

**Naraguy | Building Nara Chain** @naraguy [2026-04-12](https://x.com/naraguy/status/2043125380911956263)

I'm curious how he handles cross-session state and long-term memory? It's been running in parallel for two weeks, but how does it ensure state consistency?

---

**dead in peace** @peopleallremake [2026-04-12](https://x.com/peopleallremake/status/2043229723279695938)

I always like those things that are simple and effective.

---

**Cognition** @cognition

You’ve cloned a repo and spent 40 minutes trying to figure out what it actually does. There’s a faster way. Change github to deepwiki in any repo URL. DeepWiki generates the documentation it should have had all along.

---

**ImL1s** @aa22396584 [2026-04-12](https://x.com/aa22396584/status/2043183355823563002)

Using loops for task scheduling—this counterintuitive design is quite interesting. Complex orchestration frameworks are essentially still tackling concurrency and state management at their core, but if task boundaries are clear enough, the simplest polling approach turns out to