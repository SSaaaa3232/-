---
title: "Thread by @brad_zhang2024"
source: "https://x.com/brad_zhang2024/status/2042628758264517098"
author:
  - "[[@brad_zhang2024]]"
published: 2026-04-10
created: 2026-04-13
---
**烟花老师** @brad\_zhang2024 [2026-04-10](https://x.com/brad_zhang2024/status/2042628758264517098)

One of the most annoying things about writing technical articles: drawing diagrams.  
写技术文章最让人头疼的事情之一就是画图表。  
  
A crystal-clear architecture in your mind always ends up misaligned, with ugly colors, and blurry exports on http://draw.io.  
你脑海中清晰的建筑总会错位，颜色丑陋，输出模糊 http://draw.io 。  
  
So I made fireworks-tech-graph, a Claude Code Skill specifically for generating technical diagrams.  
于是我做了 fireworks-tech-graph，这是专门用来生成技术图表的 Claude 代码技能。  
  
Usage is super simple—  
使用非常简单——  
  
"Draw a Multi-Agent collaboration diagram: Orchestrator schedules 3 SubAgents, responsible for search, computation, and code execution respectively, finally converging to Aggregator for output results, in glassmorphism style"  
“绘制多智能体协作图：Orchestrator 调度 3 个子代理，分别负责搜索、计算和代码执行，最终汇聚至聚合器以实现输出结果，采用玻璃形态风格”  
  
Then it will:

① Identify diagram type → Agent architecture diagram

② Assign semantic shapes → Orchestrator uses hexagon, Agent uses hexagon, storage uses cylinder

③ Use semantic color coding for arrows → Blue for main flow, orange for control flow, green for read/write

④ Automatically export SVG + 1920px PNG  
然后它将：

（1） 识别图类型 → 代理架构图

（2） 分配语义形状→编排器使用六边形，代理使用六边形，存储使用圆柱体

（3） 箭头使用语义颜色编码 → 蓝色表示主流程，橙色表示控制流程，绿色表示读写

（4） 自动导出 SVG + 1920px PNG  
  
The whole process requires no DSL writing, no opening any tools—just one sentence description, and the diagram is done.  
整个过程无需编写 DSL，无需打开任何工具——只需一句话描述，图表即可完成。  
  
Currently supports 8 diagram types, 5 visual styles, and common patterns in the AI/Agent field all built-in (RAG, Mem0, Agentic Search, Multi-Agent, Tool Call, etc.).  
目前支持 8 种图表类型、5 种视觉样式，以及 AI/代理领域的常见模式，全部内置（RAG、Mem0、代理搜索、多代理、工具调用等）。  
  
Open source, welcome to star and fork 👇  
开源，欢迎来到 star and fork 👇

![[36aa982ec9c9fd5b8cabde3b21c2b1ea_MD5.jpg]]

---

**jimi@PaperInsights.io** @paperinsights [2026-04-11](https://x.com/paperinsights/status/2042800066629714131)

不支持windows。。

---

**烟花老师** @brad\_zhang2024 [2026-04-11](https://x.com/brad_zhang2024/status/2042803925519339665)

I'll update you today. I didn't notice this, haha. I just finished it last night.  
我今天会更新给你。我之前没注意到，哈哈。我昨晚刚读完。

---

**RleeAI** @LILL988419581 [2026-04-12](https://x.com/LILL988419581/status/2043129123519000853)

Holy crap, this is awesome. Lately, I've been struggling with drawing flowcharts—doing it myself is just too slow. On the Claudoco website, I tried describing my process to it and having it visualize it, but none of them come close to the effect of yours, teacher.  
天哪，太棒了。最近，我在画流程图时一直很挣扎——自己画太慢了。在 Claudoco 网站上，我试着用它描述我的创作过程并让它可视化，但没有一个能比得上你的效果，老师。

---

**烟花老师** @brad\_zhang2024 [2026-04-12](https://x.com/brad_zhang2024/status/2043130609284096479)

Thanks for the recognition, still iterating and optimizing Let's play together! 😄  
感谢认可，我还在不断迭代和优化，让我们一起玩吧！ 😄

---

**Liz** @Liz\_LizLi [2026-04-12](https://x.com/Liz_LizLi/status/2043204008693899502)

Is it possible to draw an infra diagram that drawio can edit?  
有没有可能画一个 Drawio 可以编辑的基础设施图？

---

**烟花老师** @brad\_zhang2024 [2026-04-12](https://x.com/brad_zhang2024/status/2043204617069342722)

Teacher Xiangma has already made it and open-sourced it, so you can go ahead and use it. drawio itself has also launched a similar AI editing feature.  
向马老师已经做了并开源了，你可以直接用。Drawio 本身也推出了类似的 AI 编辑功能。

---

**NormanMises** @NormanMises\_ [2026-04-11](https://x.com/NormanMises_/status/2042877729000034746)

Can this be used to have Codex read my code repository and then draw a flowchart of the code's execution flow? For the paper.

---

**烟花老师** @brad\_zhang2024 [2026-04-11](https://x.com/brad_zhang2024/status/2042891010783744002)

Alright, let me verify it. I haven't verified Codex yet.