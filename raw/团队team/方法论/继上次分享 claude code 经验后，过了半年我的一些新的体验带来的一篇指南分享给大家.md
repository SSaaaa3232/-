---
title: "继上次分享 claude code 经验后，过了半年我的一些新的体验带来的一篇指南分享给大家"
source: "https://www.v2ex.com/t/1211629"
author:
  - "[[mlhiter955]]"
published: 2026-05-10
created: 2026-05-10
---

> 这篇文章是我同事在出差的时候问我能不能分享一些 AI 经验给客户，进而形成的一篇文章，内容可能有点乱，可以多看看 skill 部分，那里是我用过的所有 skill ，是最核心最能给大家提效的部分。

> 大家也可以 follow 一下我 [github](https://github.com/mlhiter) ，最近也在做一些好玩的项目，希望和大家交流经验和感悟～

## 1\. 背景

本文是一篇面向开发者的 AI 提效 Harness 教程，主要讲讲我自己是怎么把 Codex App 、模型、skills 、提示技巧、编辑器、终端和任务管理方式串起来用的。

这里的 Harness 不是一个具体的软件，也不是一个神奇 Prompt 。

你可以简单理解成：为了让 AI 更稳定地参与开发工作，我们提前搭好的一套工作框架。

> ps: 这篇文章不讲很玄学的 AI 理论，主要是偏开发者日常使用的教程。如果你平时已经在用 Codex 、Cursor 、Claude Code 、Warp 、Zed 这些工具，应该会比较容易理解。

## 2\. AI 提效 Harness 是什么？

我这里说的 AI 提效 Harness ，主要包含下面这几部分：

模型：比如 gpt-5.5 、gpt-5.4 、gpt-5.3-codex 这类稳定可用的模型。

skills：比如 think 、hunt 、check 、design 、find-docs 、agent-browser 、git-commit 、pr-creator 这些固定工作流。

提示技巧：不是神级 Prompt ，而是把目标、上下文、约束、验收标准写清楚。

工具与环境：比如 Codex App 、Warp 、Zed 、浏览器 Agent 。

如果用一句话来解释：

**Harness 就是把 AI 从一个聊天框，变成一个可以进入开发流程的工作系统。**

没有 Harness 的时候，你可能是这样用 AI 的：

```
遇到问题 -> 问 AI -> 拿到回答 -> 自己试 -> 不行再问
```

有 Harness 以后，流程更像这样：

```
明确任务 -> 选择模型 -> 选择 skill -> 给出项目规则 -> 执行 -> 测试 -> 看 diff -> 总结沉淀
```

看起来步骤变多了，但是实际会更稳。

因为 AI 最容易出问题的地方，往往不是它不会写代码，而是它不知道边界在哪里。

## 3\. Harness 的组成部分

### 3.1 模型层

模型层主要解决一个问题：什么任务用什么模型。

不建议每次都临时纠结。可以直接给自己定一个默认规则。我一般是用 gpt ，claude 也行，不过 codex 太好用了，所以我选 openai 系的模型，直接用最好的就行，比如 gpt-5.5 的超高 think 。

> 模型这方面最好是公司去做支持，做到每个人畅用，退而求其次的话就是去闲鱼买账号，保密性公司就用自己能力范围内最好的模型即可（不过这种方式我只能说跟闭源顶级模型没法比，效率天地之差）。

### 3.2 skills 层

> Skill 也不是必须使用的，当你觉得任务对于 codex 很困难的时候或者说对 codex 没信心或者想要更好的效果时再使用。

skills 层主要解决一个问题：怎么把重复工作流固定下来。

我之前在 Skills 里整理过一批自己在用的 skill ，这里按使用场景完整列一下。

#### 3.2.1 编码类

[Waza](https://github.com/tw93/waza) ：tw93 出品，我很喜欢的一套 skill 。

```
think：构建之前的验证过程，会做调研、方案生成、方案攻击、交付验证。

design：生成界面设计，可以引用参考著名网站，效果很好。

check：PR 合并前的专业检查，适合交付前审一遍。

hunt：修复 BUG 专用，核心是先找根因，再动手改。
```

[shadcn](https://ui.shadcn.com/docs/skills) ：如果项目里用了 shadcn/ui ，这个基本是必备的。

[vercel-composition-patterns](https://skills.sh/vercel-labs/agent-skills/vercel-composition-patterns) ：React 组件和 API 的常见可复用模式。

[vercel-react-best-practices](https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices) ：React 性能和重构指南。

[create-readme](https://skills.sh/github/awesome-copilot/create-readme) ：专门写 README 的 skill ，比较简单，但是够用。

#### 3.2.2 设计类

[impeccable](https://impeccable.style/tutorials/getting-started) ：我现在主要用的设计类 skill 。

```
impeccable：总控 skill ，一般先 teach ，再多次 craft ，必要时 extract ，然后继续 craft 。

polish：交付之前的最后完善，用来对齐设计系统和精调页面。

critique：设计总监视角的 UX 评审，适合找下一步应该修什么。

live：适合细节级别的页面选项，不适合整体大改。

audit：上线前或重构前做代码级检查，包含可访问性、性能、主题、响应式等。

distill：删繁就简。

clarify：优化文案。

optimize：优化 UI 性能。

onboard：处理新用户进入相关的产品交互。

harden：补边界情况和压力测试。

animate：给具体功能增加有目的的动画。

colorize：有策略地修改整体配色。

bolder / quieter / delight：分别用于增强、减弱、增加惊喜感。

adapt / typeset / layout：分别处理多端适配、文字排版、布局改进。

overdrive：想做超出常规边界的 UI 时使用。

shape：开工之前做功能 UI 访谈。
```

[logo generator](https://github.com/op7418/logo-generator-skill) ：生成 logo 的 skill 。

#### 3.2.3 浏览器和文档处理类

[agent-browser](https://skills.sh/vercel-labs/agent-browser/agent-browser) ：使用 agent-browser 这个 CLI 操作浏览器，返回数据精简，适合 AI Agent 。

> 不过我现在一般使用 codex 内置的 browser use 和 computer use ，很好用。

[docx](https://skills.sh/anthropics/skills/docx) ：处理 docx 。

[pdf](https://skills.sh/anthropics/skills/pdf) ：处理 PDF 。

[find-docs](https://skills.sh/upstash/context7/find-docs) ：Context7 查官方文档的 skill 。

#### 3.2.4 提交和协作类

[git-commit](https://skills.sh/github/awesome-copilot/git-commit) ：根据 diff 生成规范提交信息。

[pr-creator](https://skills.sh/google-gemini/gemini-cli/pr-creator) ：提 PR 用的，生成规范的标题和描述。

#### 3.2.5 写作和研究类

[Waza](https://github.com/tw93/waza) 里的 read 、learn 、write 也很常用。

```
read：获取网页或者 PDF ，内置了一些常见网站的处理脚本和参考。

learn：新领域深挖、研究型文章写作、已有资料的系统化产出，时间较长但是效果很好。

write：编写、改写、润色文案，同时减轻 AI 味。
```

[kami](https://github.com/tw93/Kami) ：固定风格和模板的 PPT / PDF 生成 skill ，可以生成简历、一页纸、长文档、信件、作品集、PPT 、个股研报、更新日志。

[khazix skills](https://github.com/KKKKhazix/khazix-skills) ：数字生命卡兹克的 skills 集合，内容质量很高。

```
neat-freak：**每次任务跑完后**跟文档、CLAUDE.md / AGENTS.md 、Agent 记忆三者对齐，最好手动触发。

hv-analysis：横纵分析法，适合研究产品、公司、概念、人物，会生成一个深度分析报告。

khazix-writer：写卡兹克风格的公众号文章。
```

#### 3.2.6 不适合我，但是值得知道

[taste](https://github.com/Leonxlnx/taste-skill) ：比 Waza design 和 impeccable 更激进，适合生成一些落地页。

[oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex) ：一套固执己见的 Codex 增强套装，适合新手，但是侵入性比较强。

[gstank](https://github.com/garrytan/gstack) ：YC 总裁的一整套 skill 体系，适合 CEO 等新人人群，一键使用，但是不太适合灵活开发者。

[andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills/blob/main/README.zh.md) ：简洁优先的一套 [CLAUDE.md](http://claude.md/) 思路，用来解决复杂度过高的问题，可以用 skill 模式参考，不建议直接装成全局规则。

> 注意：skill 不是越多越好。开发者的 skills 宗旨应该是简单、功能聚焦、可用性强、不花活、快速。

我个人不建议一上来安装几十个 skill 。

因为功能重叠以后，AI 可能也不知道该用哪个，你自己也记不住（我列的这里面主要设计方面的 skill 有几个冲突的，我一般是用 waza 的 design ）。

先保留 6-10 个最常用的就够了。

### 3.3 项目规则层

项目规则层主要解决一个问题：AI 进入项目以后，应该遵守什么规则。

这里我之前写得不完整，规则其实至少要分两层。

全局规则：放所有项目都适用的个人偏好和安全边界。

项目规则：放当前仓库的目录结构、命令、测试方式、业务边界。

以我自己的机器为例，全局规则在 `~/.codex/AGENTS.md` 。

这个文件里适合放这类规则：

不要执行数据库写操作，除非我明确要求。

生产部署默认构建并推送 `linux/amd64` 镜像。

查库、框架、SDK 、CLI 文档时默认使用 Context7 。

测试阶段需要推远程镜像时，默认用我已经配置好权限的镜像仓库。

这些规则和具体项目无关，但是对所有项目都应该生效，所以适合放全局。

项目级规则就不要写这些机器级偏好，而是写当前仓库的真实信息。

比如项目级 `AGENTS.md` 可以这样写：

```md
# 项目规则

## 项目说明
- 这是一个 xxx 项目
- 前端目录在 xxx
- 后端目录在 xxx

## 常用命令
- 安装依赖：pnpm install
- 启动开发：pnpm dev
- 类型检查：pnpm typecheck
- 单元测试：pnpm test
- lint：pnpm lint

## 修改约束
- 不要修改无关文件
- 不要重构本次任务之外的代码
- 不要覆盖用户已有改动
- 不要执行数据库写操作，除非用户明确要求

## 验收标准
- 修改完成后说明改了什么
- 尽量运行相关测试
- 如果测试失败，需要说明失败原因
- UI 改动需要检查桌面和移动端效果
```

这个文件不需要写得很长。

写得太长反而容易让重点被稀释。

一个比较好用的原则是：

全局规则写「我永远不希望 AI 做什么」。

项目规则写「这个仓库应该怎么做」。

最开始建议只写三类内容：

常用命令。

禁止操作。

交付标准。

> 后面你发现自己反复提醒 AI 的事情，再慢慢补进去。

### 我项目下一般会放哪些规则文件？

> 使用 neat-freak 这个 skill 每次任务完成后对这些文件进行更新

[DESIGN.md](http://design.md/) ：写设计风格

[ROADMAP.md](http://roadmap.md/) ：路线图，用来给 Codex 划分优先级

[AGENT.md](http://agent.md/) ：Codex 规则文件，写项目介绍、基本规则（ Not do ）、运行命令等等，写啥 Codex 自己知道

docs 文件夹

```
architecture.md：架构文档

ia.md：页面结构文档

product.md：产品文档

references.md：参考文档，如果我这个项目有别的现有参考项目，会维护在这里

runbook.md：运行命令的详细介绍
```

### 3.4 工具与环境层

工具层主要解决一个问题：每个工具负责什么。

我自己的使用方式大概是这样：

Codex App （核心常用，功能很多，文章末尾有教程学学我这里不写了，其他的都是偶尔打开）：负责长任务、多文件修改、跑测试、总结结果。 ![[9b7ddbeaa5411680ec6eaa30b4cc4923_MD5.png]]

Warp：偶尔跑跑命令，用来做主工作台也可以，适合喜欢终端的人，也能做到类似 codex app 这种侧边栏的效果（我之前就用 warp ，后来切换到 codex app ）

Zed：负责最后看 diff 、精修文字、手动改一些细节。一般是很严格正式的项目我会仔细看一下，大部分我不会细看。

agent-browser：负责真实打开页面、点击、截图、做前端验证。

Git：负责版本边界、提交、回滚和 PR 。

环境的话就稍微说一下，关于我怎么让 codex 使用环境。

```
我一般的话是开发使用本地环境，然后在本地放一个内网测试环境的 kc ，然后让 codex 直接操作 kc 往测试环境上部署。这样验收是非常方便的，就不需要你写测试环境的命令。

我会告诉 codex 我们当前项目在哪个 ns 下，然后 codex 自己是能读懂各种 k8s 相关的东西，测试环境崩了也没事，一般不会崩，崩了基本可以回退，如果崩了不可以回退，codex 误操作的概率不大（除非你指定了一些危险操作），崩了说明环境有问题，可以反促进去对测试环境的维护和代码鲁棒性的提升。
```

### 3.5 怎么管理自己的任务？

用 Codex 用多了之后，你会发现需要同时推进特别多的项目，包括需求和 bug 。

有一些管理的技巧：

使用你最常用的工具来管理你的所有任务，我是使用我最常用的笔记软件 logseq 来管理所有的任务，我会把所有任务都标记成 Now 状态，然后 now 状态会一直挂在我打开笔记的第一个屏幕。然后你就可以慢慢处理。

Codex App 有任务完成的小蓝标，也很方便可以让你看到任务完成的标志。

### 3.6 关于提示技巧

没太多技巧，能把需求讲清楚尽量讲清楚。这里有个核心技巧就是，在讲完需求之后让 AI 复述一下需求。这样就能够判断你俩对没对齐。

再就是尽量显式指定 skill 去让 codex 执行，skill 对效率的提升是巨大的。

## 4\. 怎么搭建自己的 Harness ？

### 4.1 第一步：先写一个最小规则文件

不要一开始就写很复杂。

先写全局规则，再写项目规则。

全局规则写在 `~/.codex/AGENTS.md` 这类位置，用来放所有项目都通用的规则。

项目规则写在当前仓库里，用来放当前项目的命令和约束。

全局规则建议只包含：

安全边界。

默认偏好。

通用工具使用方式。

项目规则建议只包含：

项目说明。

常用命令。

不允许做的事情。

验收标准。

这个文件的目标不是写得漂亮，而是让 AI 少犯重复错误。

### 4.2 第三步：精简你的 skills

先不要追求全。

先保留你真正会用的。

比如：

设计就用 design 。

修 bug 用 hunt 。

做方案用 think 。

交付前用 check 。

查文档用 find-docs 。

测页面用 agent-browser 。

提交用 git-commit 。

提 PR 用 pr-creator 。

等你发现某类工作经常重复，再考虑新增 skill 。

> 再就是 skill 的话尽量不要靠 codex 自己去决定使用什么，而是自己明确指定，因为很多情况下 codex 不会知道调用什么 skill ，我们指定会得到更好的结果。

### 4.3 第五步：每周复盘一次

Harness 不是一次写完的。

你可以每周看一下：

哪些话你反复对 AI 说。

哪些任务 AI 经常跑偏。

哪些测试 AI 经常漏掉。

哪些文件 AI 经常误改。

然后把这些东西补到 `AGENTS.md` 或者对应 skill 里。

这样你的 Harness 会越来越贴合自己的工作方式。

## 5\. 推荐阅读

怎么使用 Codex App 看这个视频：

{{video( [https://www.bilibili.com/video/BV1dhdSB6E9E?share\_source=copy\_web)}}](https://www.bilibili.com/video/BV1dhdSB6E9E?share_source=copy_web\)%7D%7D)

如果你想继续看一些和 Agent 、Harness 、上下文工程有关的资料，可以先看下面这些资料。

> 想学习 skill 的话就直接看上面那些 skill 是咋写的即可。

[Anthropic：Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) ：这篇文章把 workflow 和 agent 区分得很清楚，适合理解为什么不要一上来就追求全自动。

[Anthropic：Claude Code best practices](https://www.anthropic.com/engineering/claude-code-best-practices) ：Claude Code 官方实践，里面很多内容和本文说的项目规则、任务拆分、验证很接近。

[OpenAI：A practical guide to building agents](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf) ：OpenAI 的 Agent 实践指南，偏产品和系统设计视角。

[OpenAI：Codex AGENTS.md 指南](https://developers.openai.com/codex/guides/agents-md) ：讲 Codex 怎么使用 [AGENTS.md](http://agents.md/) ，可以直接参考它的结构。

[OpenAI：Codex prompting guide](https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide) ：适合看 Codex 任务怎么写得更清楚。

[HumanLayer：12-Factor Agents](https://github.com/humanlayer/12-factor-agents) ：非常有名的一组 Agent 工程原则，适合理解为什么上下文、状态、人工介入和可控流程很重要。

[Cursor Rules](https://cursor.com/docs/rules) ：如果你使用 Cursor ，可以参考它的 rules 体系来补自己的工具规则层。

[Aider：Linting and testing](https://aider.chat/docs/usage/lint-test.html) ：Aider 对 lint/test 的支持很适合说明为什么验证应该成为 Harness 的一部分。

[Andrej Karpathy：Software Is Changing Again](https://www.youtube.com/watch?v=LCEmiRjPEtQ) ：这不是纯教程，但适合理解 AI 时代软件开发形态的变化。

## 6\. 总结

总之，面向开发者的 AI 提效，不应该只关注哪个模型最强，也不应该只收藏各种 Prompt 。

更重要的是搭一套自己的 Harness：

固定模型路由。

写清项目规则。

精简 skills 。

明确工具分工。

把验证方式写清楚。

持续复盘和沉淀。

只要这套东西跑起来，AI 就不再只是一个问答工具，而会慢慢变成开发流程的一部分。


