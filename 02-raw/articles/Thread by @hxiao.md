---
title: "Thread by @hxiao"
source: "https://x.com/hxiao/status/2044765001370701981"
author:
  - "[[@hxiao]]"
published: 2026-04-16
created: 2026-04-17
---
**Han Xiao** @hxiao [2026-04-16](https://x.com/hxiao/status/2044765001370701981)

seeing a pattern shift in how I use agents for long-horizon tasks in 2026 vs. how i do deep research in 2025. 2025's DR: search → read → reason → repeat until done. Everything hits the web on every loop.  
2026 年我发现，我使用代理进行长期任务的方式与 2025 年进行深度研究的方式发生了变化。2025 年的 DR：搜索→阅读→理由→重复直到完成。每循环时所有内容都会上传到网络。  
  
but 2026 long-horizon tasks have two distinct phases.

\- Phase 1: Web IO for research & planning. Search, read, reason. but the goal isn't to produce an answer directly. It's to materialize web knowledge into local files (.md/.json/.csv).

\- Phase 2: Agent "mounts" the files and starts the loop. The agent reads, runs, writes against those local files only. No more web calls for grounding.  
但2026年的远景任务分为两个明显阶段。

\- 第一阶段：用于研究与规划的 Web IO。搜索、阅读、推理。但目标不是直接给出答案。它是为了将网络知识具体化到本地文件（.md/.json/.csv）。

\- 第二阶段：代理“挂载”文件并开始循环。代理只对这些本地文件进行读取、运行和写入。不再有网络电话要求接地。  
  
Why I cut web grounding IO in Phase 2?

• Determinism: local files are immutable snapshots. Web content shifts, 404s, hits paywalls

• Speed: filesystem reads are ms, web fetches are seconds. Agent loops need tight iteration

• Consistency: cross-checking requires operating on the same knowledge base, not fetching different versions each time

• Cost: web IO burns tokens parsing HTML noise. Local files are already clean  
为什么我在第二阶段切断了网络接地的 IO？

• 确定性：本地文件是不可变的快照。网页内容转移、404表格、付费墙

• 速度：文件系统读取为毫秒，网页取用为秒。代理循环需要严格的迭代

• 一致性：交叉核对需要在同一知识库上操作，而不是每次都取不同版本

• 成本：Web IO 会刻录解析 HTML 噪声的令牌。本地文件已经是干净的

![[751db894c848666ec0062e181522f349_MD5.jpg]]

---

**Han Xiao** @hxiao [2026-04-16](https://x.com/hxiao/status/2044768080619036793)

The two-phase is really exploration-exploitation decoupling. Phase 1 is pure exploration: cast a wide net, gather signal, build a local knowledge base. Phase 2 mounts those files and enters pure exploitation: tight iteration on clean, stable data. And bc of phase 2 takes much  
这两阶段实际上是探索与开发的分离。第一阶段纯粹是探索：广撒网，收集信号，建立本地知识库。第二阶段挂载这些文件，进入纯粹的利用阶段：对干净稳定数据进行严格迭代。而且因为第二阶段需要很多

---

**Han Xiao** @hxiao [2026-04-16](https://x.com/hxiao/status/2044820076306763785)

i found "data room" is an accurate term here, borrowed from VC bros when they do LDD & TDD. as a founder, in phase 1 u prepare the dataroom, handover that dataroom to VC bros and they later do due diligence in phase 2 with a fixed data room.  
我发现“数据室”这个词在这里很准确，借用了 VC 兄弟做 LDD 和 TDD 时的用法。作为创始人，第一阶段你准备数据室，把数据室交给风险投资兄弟，第二阶段他们会用固定数据室进行尽职调查。

---

**LatentMaximus** @Zork\_42 [2026-04-16](https://x.com/Zork_42/status/2044770288148131884)

Seems like a natural emergence of what typical research execution looks like of divergent and convergent states. Always have to balance the two and this phased system makes it explicit. Guess the third iteration is looping that entire thing again when phase 2 becomes degenerate  
这似乎是典型研究执行中发散态与趋同态的自然表现。必须始终平衡两者，而这个分阶段系统让这一点变得明确。看来第三次迭代又要循环那个过程，第二阶段变得退化了

---

**Han Xiao** @hxiao [2026-04-16](https://x.com/hxiao/status/2044772807272443937)

it somehow reminds those offline browser in early 1995-2000. dump the website, read'em later. i found keeping p1's "knowledge dump" deterministic is important for p2 to reliably run, trace and cross-check  
这让人想起了 1995-2000 年初的离线浏览器。把网站扔掉，之后再看。我发现保持 P1 的“知识倾倒”确定性对于 P2 的可靠运行、追踪和交叉核对非常重要

![[ee23cc3aac63450ec6387bcc947590ba_MD5.png]]

---

**KShivendu** @KShivendu\_ [2026-04-16](https://x.com/KShivendu_/status/2044778256134734041)

Hey Han.

The exploration-exploitation framing is neat! Though I don't understand how phase 2 would reliably work without going back into phase 1. Agents can discover mid-task that they need something they didn't know to fetch upfront.

\> filesystem reads are ms, web fetches  
嘿，韩。

探索与剥削的框架很有意思！ 不过我不明白第二阶段怎么能可靠地运作而不回到第一阶段。特工可能会在任务中途发现需要提前取用他们不知道的东西。

\>文件系统读取是 ms，web 取用

---

**Han Xiao** @hxiao [2026-04-16](https://x.com/hxiao/status/2044780105025925348)

what u say is conceptually fair. but in practice, the agents give up so quickly. it has all the knowledge dump and try some thinking and just 🤷‍♂️ and say "nope, no idea, im done." no, u r not done, u didn't read & think the knowledge I gave u carefully enough. try harder, run

![[a833b8b0c522de5f3823fb250682ff28_MD5.png]]