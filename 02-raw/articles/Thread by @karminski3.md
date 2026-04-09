---
title: "Thread by @karminski3"
source: "https://x.com/karminski3/status/2030795715484729829"
author:
  - "[[@karminski3]]"
published: 2026-03-09
created: 2026-04-09
---
**karminski-牙医** @karminski3 [2026-03-09](https://x.com/karminski3/status/2030795715484729829)

给Mac用户的一毛不拔使用openclaw教程

大家玩了一段时间龙虾 (openclaw) 都抱怨太烧 token 了, 于是给大家来一篇 openclaw 使用本地模型的教程.

本教程最大的好处是, 我写了个给AI看的教程文章, 对的, 不需要你自己看, 你只需要在 Mac 本地先部署一个 claude code, 然后把教程地址给它, 然后跟他说你想用哪个模型, 让它照做部署就行了.

(琢磨了半天的好方法, 与其让很多不会写代码的朋友硬是学写代码, 不如给大家用的AI写一篇教程, 总结我的最佳实践然后让它照做就行了)

这里重点说一下我测了几个模型的优缺点:

GLM-4.7-flash (30B-A3B) — 综合最推荐. 全能型选手, Agent 能力在这几个模型里最强, 连续工具调用的场景表现稳定, 特别适合搭配 OpenClaw 使用. 缺点是长文本召回能力比 kimi-linear 差一些.

kimi-linear (48B-A3B) — 长文本场景首选. 线性注意力架构, prefill 和推理速度都巨快, 而且长文本召回能力很强, 特别适合处理大量文本的工作. 缺点是 Agent 能力比 GLM-4.7-flash 弱一些, 复杂的连续工具调用场景不如 GLM.

Qwen3.5-35B-A3B — 速度和多模态兼顾. 支持多模态输入 (图片), 而且是 MoE 架构激活参数量只有 3B, 推理速度快. 缺点是 Agent 能力只能说适中, 另外目前只能用 mlx\_vlm 跑, 它的 prefill 速度很慢, mlx 官方没有提供 mlx\_lm 可以直接用的版本.

上面这三个建议 8bit 量化, 不要低于 4bit.

Qwen3.5-27B — 多模态里 Agent 能力最好的. 支持多模态输入, Agent 能力体感比 35B-A3B 还好一些. 缺点是 dense 模型, 27B 全激活所以会慢一些, 同样只能用 mlx\_vlm 跑, prefill 慢. 建议 5bit 量化.

Qwen3.5-9B — 内存不够就选它. 支持多模态输入, 显存/统一内存占用最小, 小内存 Mac 也能跑. 缺点是 Agent 能力在这几个里面垫底, 复杂任务容易翻车, 同样 mlx\_vlm 的 prefill 速度很慢. 不要低于 5bit量化.

4B 那个就不太行了哈, 不推荐.

另外写给AI看的部署教程在这里: http://github.com/karminski/one-small-step/blob/main/20260308-Run-OpenClaw-with-9B-Model-on-Mac/Run-OpenClaw-with-9B-Model-on-Mac.md…

#OpenClaw

![[7e92ca2ffa6d1758e2a48f1f23124f35_MD5.jpg]]![[6c1dc82cd14c66f3fbe32bd2c5db67ea_MD5.png]]![[df6692f9326e83721341d76bd00253d1_MD5.png]]

---

**madao0O** @madao0O [2026-03-09](https://x.com/madao0O/status/2031144614690959450)

写了一个路由插件，用本地模型和云端模型混跑，降低龙虾开销

---

**watice** @watice555 [2026-03-09](https://x.com/watice555/status/2030844310007226658)

和GPT讨论了文中模型所需内存，供参考

GLM-4.7-Flash

8bit：权重约 31.8GB，建议看 48GB

4bit：权重约 18.5GB，建议看 24GB

kimi-linear

8bit：权重约 52.3GB，建议看 64GB

4bit：权重约 30.1GB，建议至少看 48GB

下接↓

---

**Will Cheng** @wangpuv [2026-03-09](https://x.com/wangpuv/status/2030819274353471908)

9B 至少需要 24G 内存吧？9G 模型+4G Context，还要留够 OpenClaw 和系统的

---

**AImaster** @CeoSpaceY [2026-03-10](https://x.com/CeoSpaceY/status/2031160572918771780)

大量m2,studio现货。欲购从速！养虾设备

![[7f75f705e7bacdc477970b056c05e730_MD5.jpg]]![[27c2cba23d365bacf8cb267afd5bf161_MD5.jpg]]![[ef0d99733486213fd5bcea612a629f2a_MD5.jpg]]![[4302d0f0b298ace19908903e1bddd06a_MD5.jpg]]

---

**nick** @hsinhungpan [2026-03-09](https://x.com/hsinhungpan/status/2031118997635346693)

@grok MacBook Pro m4可以用嗎

---

**Jerry** @lijieisme [2026-03-10](https://x.com/lijieisme/status/2031293457650823600)

32G Macmini4给大家做实验了。9b模型输出 21tops，27b模型 6.6tops

---

**Hades** @Hades56192588 [2026-03-09](https://x.com/Hades56192588/status/2030820653499338775)

能解决cron job不能使用本地模型执行的问题嘛？

---

**ejsk** @ejsk33382 [2026-03-09](https://x.com/ejsk33382/status/2030822399424581820)

16G适合什么模型呢？

---

**人妖百鬼夜行** @wuzhongkang [2026-03-09](https://x.com/wuzhongkang/status/2031139234728583526)

Mac下怎么能解决prefill慢的问题？有招没有。

---

**玩客笔记 #Web3 #BTC #AI** @xin79690860 [2026-03-10](https://x.com/xin79690860/status/2031208183885344822)

教程似乎详细写了如何部署Qwen3.5-9B的方法，部署GLM-4.7-flash (30B-A3B) 本地大模型和Qwen3.5-9B还是有很大区别的吧？