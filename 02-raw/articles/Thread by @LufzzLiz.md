---
title: "Thread by @LufzzLiz"
source: "https://x.com/LufzzLiz/status/2043839678252761117"
author:
  - "[[@LufzzLiz]]"
published: 2026-04-14
created: 2026-04-14
---
**岚叔** @LufzzLiz [2026-04-13](https://x.com/LufzzLiz/status/2043839678252761117)

Anthropic 出了一篇多 Agent 协作模式指南，总结了 5 种架构和适用场景。

总之不要让协调复杂度超过任务本身的复杂度，干货很足，分享总结如下：

1\. Generator-Verifier（生成-验证）

一个 Agent 出活，另一个 Agent 审核。审不过就打回重写，循环直到通过。

适用：代码生成+测试、事实核查、合规检查。

陷阱：验证标准不明确，就是自欺欺人。

2\. Orchestrator-Subagent（编排-子代理）

一个主 Agent 当组长，拆任务、派活、汇总。Claude Code 用的就是这个。

适用：任务边界清晰，子任务之间不太依赖。

陷阱：组长是信息瓶颈，信息传递之间容易丢失。

3\. Agent Teams（团队模式）

每个 Agent 是长期存在的"同事"，持续积累领域上下文，不是用完就丢。

适用：大型代码库迁移，每个 Agent 负责一块独立服务。

陷阱：Agent 之间如果共享资源，可能会冲突。

4\. Message Bus（消息总线）

Agent 通过发布/订阅事件交互，不是直接调用。新 Agent 插进来不用改已有连线。

适用：安全告警流水线，事件类型越来越多。

陷阱：调试难，一个告警经过 5 个 Agent，出事了追链路很痛苦。

5\. Shared State（共享状态）

没有中央协调者。所有 Agent 读写同一个数据库/文件系统，靠共享信息间接协作。

适用：多 Agent 联合研究，一个人的发现另一个人直接用。

陷阱：反应式循环——A 写了，B 读了再写，A 又读又写，无限烧 token。

核心建议： 从最简单的开始，看哪里卡住了再升级。不要一上来就选最复杂的。

这篇值得每个做 Agent 架构的人收藏。

🔗

---

**JasonLiu** @jsyqrt [2026-04-14](https://x.com/jsyqrt/status/2043870457439597034)

Markus uses a framework that can support all of these patterns

https://markus.global

---

**lifcc** @mylifcc [2026-04-14](https://x.com/mylifcc/status/2043875416876929516)

"The coordination complexity doesn't exceed the task itself"—this one's the most practical. Before, I tried having agents review each other's code, but just synchronizing the context took up most of the time, and we went around in circles for ages. Later, I slashed it down to a

---

**ImL1s** @aa22396584 [2026-04-14](https://x.com/aa22396584/status/2043874966580670552)

Generator-Verifier This pattern is particularly useful in code generation scenarios—one writes the code, the other runs tests for repeated verification—which is much more effective than a single Agent relying on self-review. Among the 5 architectures, the hardest part is actually