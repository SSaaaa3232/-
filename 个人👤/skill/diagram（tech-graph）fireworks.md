---
title: Thread by @brad_zhang2024
source: https://x.com/brad_zhang2024/status/2042984441644224919
author:
  - "[[@brad_zhang2024]]"
published: 2026-04-10
created: 2026-04-13
tags:
  - diagram
  - tech-graph
  - tool
  - AI
  - ClaudeCode
  - 技术图表
Github:
---
专门用来生成技术图表

“绘制多智能体协作图：Orchestrator 调度 3 个子代理，分别负责搜索、计算和代码执行，最终汇聚至聚合器以实现输出结果，采用玻璃形态风格”  
  
然后它将：

（1） 识别图类型 → 代理架构图

（2） 分配语义形状→编排器使用六边形，代理使用六边形，存储使用圆柱体

（3） 箭头使用语义颜色编码 → 蓝色表示主流程，橙色表示控制流程，绿色表示读写

（4） 自动导出 SVG + 1920px PNG  

整个过程无需编写 DSL，无需打开任何工具——只需一句话描述，图表即可完成。  
  
目前支持 8 种图表类型、5 种视觉样式，以及 AI/代理领域的常见模式，全部内置（RAG、Mem0、代理搜索、多代理、工具调用等）。  
  
科技图表从5种风格扩展到7种：

1 新增 Claude 和 OpenAI 样式

2 从 8 种图型到支持 14 种样式的完整 UML 标准

3 新增脚本，将探索陷阱转化为驾驭体验  
  

🎨 新增了 2 种官方品牌风格

\- 风格 6：Claude Official — 暖奶油色背景，Anthropic 品牌颜色，非常适合 Anthropic 生态系统中的科技纪录片和建筑展示  
  
\- 风格 7：OpenAI 官方 — 纯白背景，OpenAI 品牌调色板，干净利落的现代极简风格

结合最初的五种样式，现在涵盖了从撰写博客文章、制作 GitHub README、绘制架构文档到构建主题演讲——全场景支持  
  
📊 Diagram Types 8 → 14, Full UML Support

Previously only common types like architecture and sequence diagrams; now we've filled out all 14 standard UML diagrams:

Class Diagram, Component Diagram, Deployment Diagram, Package Diagram, Composite Structure Diagram, Object Diagram, Use Case Diagram, Activity Diagram, State Machine Diagram, Sequence Diagram, Communication Diagram, Timing Diagram, Interaction Overview Diagram, ER Diagram  
📊 图型类型 8→14，完全支持 UML


用一套技能进行钉子系统设计审查、技术提案答辩和架构文档归档  
  
🛠 新增自动化脚本

新增了三个脚本，使生成过程更加精致：

自动验证 SVG 语法，批量测试所有样式，一键导出 PNG。不再需要手动检查图表是否正确渲染——脚本会支持你。SVG 调试会疯狂消耗代币，所以我今天测试花了 100 多美元;帮你省点钱，哈哈 💰  
  

#ClaudeCode #SVG #UML #TechDiagram #AI #DiagramAsCode


> 
> ![[5488b8350215835ecd344e44dcf7a9ab_MD5.jpg]]![[c4331d90f8286077c19740df9fd24d26_MD5.jpg]]![[36aa982ec9c9fd5b8cabde3b21c2b1ea_MD5.jpg]]

![[bd00a267807960cca429dfcc33f9f2f6_MD5.jpg]]

---
