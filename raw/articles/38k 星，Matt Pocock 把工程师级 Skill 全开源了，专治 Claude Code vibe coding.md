---
title: "38k 星，Matt Pocock 把工程师级 Skill 全开源了，专治 Claude Code vibe coding"
source: "https://x.com/GoSailGlobal/status/2049336319286063302"
author:
  - "[[@GoSailGlobal]]"
published: 2026-04-29
created: 2026-04-29
---
Total TypeScript 作者 Matt Pocock 把自己 .claude 目录里每天用的 Skill 全开源了，38,314 颗星，主张一句话很硬：「这是给真工程师用的，不是 vibe coding」。整套 16 个 Skill，反对 BMAD、Spec-Kit、GSD 那种"重流程夺控制权"的玩法，走"小、可改、可组合"的另一条路。

## 为什么这套 Skill 一上线就 38k 星

Matt 不是 Skill 圈的人，他是 TypeScript 圈的顶流（Total TypeScript 课程作者，[aihero.dev](https://aihero.dev/) 站长，邮件列表 60,000+ 工程师订阅）。他写 Skill 的视角是从一个每天写真实生产代码的人出发，不是从一个"想搭框架"的人出发。

他在 README 里直接点名了 BMAD 和 Spec-Kit：「这些方法试图通过接管整个流程来帮你，但代价是夺走你的控制权，让流程里的 bug 极难修复」。Matt 的 Skill 反过来，每一个都是独立小文件，你能看懂、能改、能拆开重组。

这种"工程师审美"在仓库里到处都是。Skill 的命名直白（/grill-me、/zoom-out、/diagnose），文档引用的全是 Pragmatic Programmer、DDD、Kent Beck、Ousterhout，没有一句"范式""革命""颠覆"。这是过去十年软件工程沉淀的常识被重新打包成了 Agent 时代的工具。

## Agent 翻车的 4 个模式，4 套对应 Skill

Matt 把所有 Agent 失败归到 4 个根因，每个根因配一套 Skill。这是整个仓库的骨架。

![[f8d66858a89e50eda0a482676745dff3_MD5.jpg]]

**第一个根因：Agent 没真正理解你想要什么**。Matt 引 Pragmatic Programmer 的话，「没人真正知道自己想要什么」。修复方式是 /grill-me 和 /grill-with-docs，逼 Agent 反过来拷问你，把决策树每一个分支都问到底。这两个 Skill 是仓库里最受欢迎的，Matt 自己的建议是每次开新任务前都跑一遍。

**第二个根因：Agent 太啰嗦**。这条引的是 Eric Evans 的 DDD，开发者和领域专家说不同的语言，浪费的全是 token 和耐心。修复是建一个 CONTEXT.md 文件作为项目共享语言。Matt 给了一个真实例子：原来要说"课程章节里某节课被赋予文件系统位置时出问题了"，有了 CONTEXT.md 之后变成"materialization cascade 出问题了"，每次会话省下来的 token 是肉眼可见的。

**第三个根因：代码跑不通**。这条引 Kent Beck 的 XP，强调反馈循环。修复是 /tdd（强制红绿重构）和 /diagnose（系统化调试，复现到最小、再假设、再插桩、再修、再加回归测试）。这两个 Skill 解决的是大多数人用 Claude Code 时最痛的「Agent 改了一遍又一遍还是不对」。

**第四个根因：代码变成屎山**。Matt 的原话是「Agent 在加速写代码的同时也在加速软件熵增」。修复有三件套：/to-prd 让 Agent 写 PRD 之前先盘清楚动了哪些模块，/zoom-out 强制 Agent 在解释代码时把它放回整个系统看，/improve-codebase-architecture 用来定期救一个已经烂了的代码库。Matt 自己的频率是「每几天跑一次」。

## 完整 Skill 清单：16 个能直接抄的工程实践

整个仓库分四类，每个 Skill 都是独立 SKILL.md 文件，可以单独抽出来。

![[6a406bee8b40e7390cddb28da5ba71d5_MD5.jpg]]

**Engineering（9 个，日常代码工作）**：diagnose、grill-with-docs、triage、improve-codebase-architecture、setup-matt-pocock-skills、tdd、to-issues、to-prd、zoom-out。其中 triage 用状态机管理 issue 流转，to-issues 把任何计划拆成可独立认领的 GitHub issue（按 vertical slice 切），这两个对小团队特别实用。

**Productivity（3 个，通用工作流）**：caveman 是个有意思的，它把 Agent 输出强行压缩到「穴居人模式」，砍掉所有填充语，token 消耗降 75% 但技术准确度不变；grill-me 是非代码版的拷问；write-a-skill 用来写新 Skill。

**Misc（4 个，偶尔用）**：git-guardrails-claude-code 配 hooks 拦截危险 git 命令（push、reset --hard、clean）；setup-pre-commit 配 Husky + lint-staged；migrate-to-shoehorn 把 TS 测试里的 as 断言换成 shoehorn；scaffold-exercises 用来搭练习题目录。

**Deprecated**：仓库里还有一个 deprecated 目录，Matt 把已经不用的 Skill 留在那里做考古，能看到他迭代思路。这个习惯值得抄。

## CONTEXT.md：整套里最反直觉的一招

如果非要从 16 个里挑一个最值得抄的，是 CONTEXT.md 这个想法。它不是一个 Skill，是 /grill-with-docs 的副产品。

每次 grill 完，Agent 会把这次对话里出现的关键术语沉淀到项目根的 CONTEXT.md。下次会话，Agent 读完这个文件就直接用项目的"行话"说话。Matt 强调它不只是省 token：变量名、函数名、文件名都开始按共享语言来命名，整个代码库的导航成本随之降低。

这个东西看起来像 README 的一个分支，但不一样。README 是给人看的，CONTEXT.md 是给 Agent 看的。它的目标读者是下一次开会话的那个空白 Agent，写法上就要更工程化、更精确，每个术语对应一个明确定义。Matt 的 course-video-manager 仓库里有一个真实的 CONTEXT.md 例子，建议直接去抄。

配套的还有 ADR（Architectural Decision Record）。每次有重大决策，Agent 会自动生成一个 ADR 文档存到 docs/adr/。这样下次 Agent 看到一段奇怪代码，不会又跑回来问你「为什么这么写」，它会先去翻 ADR。

## 跟 BMAD、Spec-Kit、GSD 的核心区别

Matt 在 README 里直接拉出来对比。这不是营销话术，理解这个区别能帮你判断哪种适合你。

![[3ae1dec0489c70b616bca3f9dba615d5_MD5.jpg]]

**BMAD 和 Spec-Kit 的逻辑是「我接管整个流程」**。它们提供 PM、Architect、Dev、QA 一整套角色和阶段，你按顺序走完就有产出。问题是流程一旦出 bug，你很难定位到底哪一环出了问题，因为每一环都被框架管着。

**Matt 的 Skill 反过来，每个都是单点工具**。你想用哪个用哪个，Skill 之间不强耦合。/tdd 不需要先跑 /to-prd，/grill-me 不需要先 setup 任何东西。这种"组合式"思路在 Unix 哲学里叫 do one thing well，在前端圈叫 unstyled component，在 Skill 圈现在没名字，但 Matt 这一波 38k 星算是把这条路打开了。

代价是它需要你自己有判断力，知道什么时候用什么。BMAD 适合不太懂工程的人按部就班出活，Matt 这套适合已经知道自己在做什么、只想要一把更顺手的工具的人。

## 30 秒装上跑起来

安装命令一行：

**npx skills@latest add mattpocock/skills**

执行完会让你勾选要装的 Skill 和目标 Agent（Claude Code、Codex、Cursor 都支持）。**记得勾上 /setup-matt-pocock-skills**，它是 Engineering 类那一坨 Skill 的前置依赖。

装完跑 /setup-matt-pocock-skills，它会问你三个问题：用什么 issue tracker（GitHub / Linear / 本地文件）、triage 用什么 label 词表、文档存哪里。回答完就能直接用了。

第一次用建议先跑 /grill-with-docs，把当前正在做的功能丢给它，让它拷问你 20 分钟。结束后看看 CONTEXT.md 长什么样，基本就理解了 Matt 这套的核心。

## 一句话抓重点

Matt Pocock 这套 Skill 之所以 38k 星，是因为它把过去十年软件工程沉淀的常识（DDD 共享语言、TDD 反馈循环、Pragmatic Programmer 小步迭代、Ousterhout 深度模块）按 Agent 时代的接口重新打包了一遍。它不教你新东西，它把你已经知道是对的东西，做成 Agent 也能照着做的小工具。

适合的人：已经写过几年代码、用过一段时间 Claude Code、被 Agent 的"vibe coding"坑过、知道工程基本功比模型聪明更重要。不适合的人：刚开始用 AI 写代码、需要一个完整流程帮你从 0 到 1 的，那种人去用 BMAD 更快。

仓库地址 [github.com/mattpocock/skills](https://github.com/mattpocock/skills)，配套邮件列表 [aihero.dev/s/skills-newsletter](https://aihero.dev/s/skills-newsletter)（60,000+ 工程师订阅，更新频率不高但每条都是干货）。