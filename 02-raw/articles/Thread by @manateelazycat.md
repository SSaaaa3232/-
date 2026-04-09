---
title: "Thread by @manateelazycat"
source: "https://x.com/manateelazycat/status/2041721391284941097"
author:
  - "[[@manateelazycat]]"
published: 2026-04-08
created: 2026-04-09
---
**Andy Stewart** @manateelazycat [2026-04-08](https://x.com/manateelazycat/status/2041721391284941097/history)

开源世界从不缺大牛，缺的是把事情做到极致的人

有一种黑魔法，能把大语言模型所有复杂技术打包成一个文件，在任何系统上双击运行；

有一位颜值又高、技术又强的开源高手，早早就把这件事做到了极致；

而你很可能还不知道这个最简单粗暴的本地部署方式

【1】从占领华尔街运动发起者到全职开源开发者 jart：

早年是 Occupy Wall Street（占领华尔街）运动的活跃组织者。那时候她才二十多岁，就已经在搞大型社会运动了。后来她转行做程序员，在 Google Brain 工作过，现在是全职开源开发者。

她的两个最牛项目：

Cosmopolitan Libc：让同一份程序能够在 Windows、macOS、Linux、FreeBSD 等六个主流操作系统上原生运行，真正做到一次编译、到处执行。

llamafile：把 llama.cpp 推理引擎、完整模型权重和跨平台运行时，全部打包进一个 .llamafile 文件。现在由 Mozilla AI 团队接手维护，但核心设计和黑魔法依然来自 jart。

不靠营销出名，而是真正沉下心写代码、动手优化的大牛。博客里她提到为了给 llamafile 写语法高亮器，一口气学了 42 种编程语言的词法……这种极致钻研的精神，真的让人佩服。

【2】顶级的优化手段与黑魔法手搓

jart 在 llamafile 上下了很多功夫，用各种优化手段和黑魔法手搓，把“黑魔法”用到了极致，每一处都是高手手动优化的结果：

任意端跨平台(APE): 这个技术抹平了不同平台的特殊性，在Windows眼里这个文件就是EXE，在Linux眼里是Shell，在macOS眼里是原生二进制

模型权重零拷贝：为了做到启动时做机制优化，打包时自动对权重进行分页，启动后内存直接正确映射，不需要复制拷贝，效率提升特别多

GPU支持也能跨平台？：最狠的一招。Cosmopolitan 是静态链接的，传统 CUDA/Metal 很难搞。她把 ggml-metal.m 和 http://ggml-cuda.cu 也塞进 ZIP，首次运行时自动调用 nvcc 或 Xcode 编译，然后 dlopen 动态加载。整个过程几毫秒完成，之后就和原生一样快。

优化CPU矩阵乘法：提前优化，自动针对CPU优化算法，自动挑选CPU指令集(AVX,AVX2,AVX512)并提前优化好，启动时利用Cosmopolitan Libc来动态切换优化好的matmul，性能自然就上去了。

这些优化全都是手工极致，没有一点偷懒。她写这些就是为了让本地模型用起来“像喝水一样顺滑”。

【3】Ollama VS llmafile 性能对比

在 CPU 场景下，llamafile 对比 Ollama 优势显著，很多情况下性能能达到 2~3 倍，跑起来明显更丝滑流畅。

你只需要一台性能足够好的机器，就能真正爽起来。

微服和算力舱非常合适运行，只需要下载一个Qwen3.5.llamafile 双击运行，就相当于自建中转站了

喜欢开源技术的老板，欢迎在评论区打「1」，我给你们安排专属开源开发者优惠。

![[cf1deb3b83d15da83f8fd4e7345d3224_MD5.jpg]]

---

**Ming(✸,✸)** @lam\_lee [2026-04-08](https://x.com/lam_lee/status/2041751733706297346)

Is it that llamafile can run purely on CPU?

---

**Andy Stewart** @manateelazycat [2026-04-08](https://x.com/manateelazycat/status/2041780804922323115)

Sure, you can use pure CPU, and it has special optimizations for instruction sets.

It's in there.

When building the llama file, it already organizes all the related stuff.

Then.

When running on your computer, it will automatically detect whether your CPU supports advanced

---

**John Song** @JJJOOOHN [2026-04-08](https://x.com/JJJOOOHN/status/2041725479972172238)

Compared to vLLM, can concurrency be better?

---

**Andy Stewart** @manateelazycat [2026-04-08](https://x.com/manateelazycat/status/2041732516571423058)

Compared to VLLM, it definitely can't match in terms of concurrency, but llama.cpp is pretty strong too.