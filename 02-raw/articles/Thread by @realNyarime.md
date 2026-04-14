---
title: "Thread by @realNyarime"
source: "https://x.com/realNyarime/status/2043720020300333458"
author:
  - "[[@realNyarime]]"
published: 2026-04-13
created: 2026-04-14
---
**奶昔** @realNyarime [2026-04-13](https://x.com/realNyarime/status/2043720020300333458)

那些AI中转站的API价格是真的低，大部分渠道来自批量注册的账号、2API逆向接口，还有号商们的注册机加持

难度跟开机场差不多，我们可以对比一下两者的架构：

机场：V2Board（计费面板）+节点+XrayR（后端）

中转站：NewAPI（计费面板）+上游API（渠道）

换句话说，中转站更像是空手套白狼的活，就好比印钞，还能能比官方key还便宜的定价

先说渠道，除了官key外还有像GPT-Load、CLIProxyAPI(CPA)这类的2API神器。换言之，只需要我注册无数个NVIDIA开发者账号，我也能凑出MiniMax-M2.5池子供应OpenClaw使用，缺点就是Token有效期只有半年。此外CPA登录Google账号后，将自动把Antigravity（反重力）转化为API，再用于调用模型... 以上是这类来路不明渠道的基本转化途径，就点到为止

其次面板，市面上常见的是NewAPI，还有像veloera这类带有用户日志的程序。他们本质上是个LLM API管理、分发、计费系统，所有渠道分组、权重、重试等规划清楚。相当于是在渠道和用户之间架设的收费站，至于用户的余额跑完了AI服务也就停止了

最后说下风险，我知道用官key贵、官方服务如Anthropic易封号。不过那些免费的公益站更像是国产模型厂商用于蒸馏的提取地，对于开爬虫全网收集语料知识库还不如精确到用户群体，这些都是实打实额数据。但还有付费中转站也在干这件事，至于有没有我口说无凭也望各位听个乐，没必要为这事而争吵

![[1bb26763706bb870f5bdf7530371ebd8_MD5.png]]![[abf95b7113f142af9002d041aa04074f_MD5.jpg]]![[8e60bea75ddc497144144c8b777fdb91_MD5.jpg]]

---

**哈哈的风** @beicanword [2026-04-13](https://x.com/beicanword/status/2043722018940723290)

Does NVIDIA only have a six-month validity period? I'm still getting decent results with Kimi 2.5.

---

**奶昔** @realNyarime [2026-04-13](https://x.com/realNyarime/status/2043723114560012294)

His token expires in at most half a year

which means it has to be updated by yourself once every 6 months

---

**Developers** @XDevelopers

The X API is more accessible than ever with new consumption-based billing designed to scale with your success.

---

**klwawzz** @klwazdjyq [2026-04-13](https://x.com/klwazdjyq/status/2043740050576601188)

不管怎么说，还是有执行力的，为了赚钱，挖空心思去批量注册或者用蒸馏方法获取便宜空子

---

**奶昔** @realNyarime [2026-04-13](https://x.com/realNyarime/status/2043792653154988260)

就跟维护机场那样需要不断维护节点/渠道

---

**来** @ooobsess [2026-04-14](https://x.com/ooobsess/status/2043892591205269746)

I've always had this question: they give me a long string of letters, and when I open their website, it directly recharges to my account! How does it directly recharge to my account?

---

**奶昔** @realNyarime [2026-04-14](https://x.com/realNyarime/status/2043912250587787616)

He probably gave you something with a gift code, and then after you enter it on their website, you redeem it successfully. However, whether you can actually use it still depends on the upstream quota.

He's just like a second landlord—besides having to pay rent to the upstream