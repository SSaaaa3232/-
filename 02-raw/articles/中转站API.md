---
title: Thread by @realNyarime
source: https://x.com/realNyarime/status/2043720020300333458
author:
  - "[[@realNyarime]]"
published: 2026-04-13
created: 2026-04-14
tags:
  - 中转站
  - 算力
  - API
  - AI
---

那些AI中转站的API价格是真的低，

大部分渠道来自

- 批量注册的账号、

- 2API逆向接口，

- 还有号商们的注册机加持

难度跟开机场差不多，我们可以对比一下两者的架构：

机场：V2Board（计费面板）+节点+XrayR（后端）

中转站：NewAPI（计费面板）+上游API（渠道）

换句话说，中转站更像是空手套白狼的活，就好比印钞，还能能比官方key还便宜的定价

先说渠道，除了官key外还有像GPT-Load、CLIProxyAPI(CPA)这类的2API神器。换言之，只需要我注册无数个NVIDIA开发者账号，我也能凑出MiniMax-M2.5池子供应OpenClaw使用，缺点就是Token有效期只有半年。此外CPA登录Google账号后，将自动把Antigravity（反重力）转化为API，再用于调用模型... 以上是这类来路不明渠道的基本转化途径，就点到为止

其次面板，市面上常见的是NewAPI，还有像veloera这类带有用户日志的程序。他们本质上是个LLM API管理、分发、计费系统，所有渠道分组、权重、重试等规划清楚。相当于是在渠道和用户之间架设的收费站，至于用户的余额跑完了AI服务也就停止了

最后说下风险，我知道用官key贵、官方服务如Anthropic易封号。不过那些免费的公益站更像是国产模型厂商用于蒸馏的提取地，对于开爬虫全网收集语料知识库还不如精确到用户群体，这些都是实打实额数据。

