---
title: "[开源]CCW(claude-code-workflow)V7.X版本新增Cadence team和 codex csv spawn 工作流&&下一代工作流(maestro-flow)展望"
source: "https://linux.do/t/topic/1806070"
author:
  - "[[catlog22]]"
published: 2026-03-24
created: 2026-05-07
---
---

**Claude Code Workflow (CCW)** 是一个 JSON 驱动的多智能体开发框架，具有智能 CLI 编排（Gemini/Qwen/Codex）、上下文优先架构和自动化工作流执行。

# 安装方式

```css
npm install -g claude-code-workflow

ccw install #安装工作流
```

---

# CCW (claude-code-workflow) 7.X 新增

## ▍Spec 系统

将整个 workflow 划分为六个阶段，基于各个阶段进行注入 spec 约束，无需 hook。

```bash
/workflow:spec:setup   # 初始化 spec
/workflow:spec:add     # 创建 spec
```

spec 内容可通过看板（ccw view启动）进行管理、查看。

---

## ▍Cadence Team

灵感来源于工厂流水线，用节拍图来描述 team 工作，并利用共享 skill 形式，为每个 team 成员智能路由 role、command，通过 `ccw-tools_team_msg` 工具实现 team 状态监测。

| 技能名 | 描述 | 角色 | 流程 |
| --- | --- | --- | --- |
| **team-coordinate** | 通用团队协调，动态角色生成 | coordinator + 动态 team-worker | 任务分析 → 角色生成 → 执行 |
| **team-executor** | 轻量会话执行，加载已有会话 | executor (从会话加载) | 纯执行模式 |
| **team-designer** | 生成完整 team 技能包，v4 架构 | orchestrator + phase agents | 需求 → 脚手架 → 内容 → 验证 |
| **team-lifecycle-v4** | 完整生命周期，beat model 驱动 | analyst, writer, planner, executor, tester, reviewer, supervisor | RESEARCH → DRAFT → PLAN → IMPL → TEST → REVIEW → CHECKPOINT |
| **team-arch-opt** | 架构优化，多代理分析-设计-重构 | analyzer, designer, refactorer, validator, reviewer | ANALYZE → DESIGN → REFACTOR → VALIDATE → REVIEW |
| **team-brainstorm** | 头脑风暴，Generator-Critic 循环 | ideator, challenger, synthesizer, evaluator | IDEA → CHALLENGE → SYNTH → EVAL |
| **team-ultra-analyze** | 深度协作分析，支持讨论循环 | explorer, analyst, discussant, synthesizer | EXPLORE → ANALYZE → DISCUSS → SYNTH |
| **team-planex** | 计划-执行管道，基于 issue 开发 | planner, executor | PLAN → EXEC (迭代) |
| **team-roadmap-dev** | 路线图驱动开发，分阶段执行 | planner, executor, verifier | PLAN-N → EXEC-N → VERIFY-N |
| **team-iterdev** | 迭代开发，GC 循环最多 3 轮 | architect, developer, tester, reviewer | DESIGN → DEV → VERIFY → REVIEW |
| **team-issue** | 问题解决，Quick/Full/Batch | explorer, planner, reviewer, integrator, implementer | EXPLORE → SOLVE → AUDIT → MARSHAL → BUILD |
| **team-frontend** | 前端开发，内置 ui-ux-pro-max | analyst, architect, developer, qa | ANALYZE → ARCH → DEV → QA |
| **team-frontend-debug** | 前端调试，Chrome DevTools MCP | tester, reproducer, analyzer, fixer, verifier | TEST/REPRODUCE → ANALYZE → FIX → VERIFY |
| **team-uidesign** | UI 设计，系统化设计令牌管理 | researcher, designer, reviewer, implementer | RESEARCH → DESIGN → AUDIT → BUILD |
| **team-ux-improve** | UX 改进，发现并修复交互问题 | scanner, diagnoser, designer, implementer, tester | SCAN → DIAG → DESIGN → IMPL → TEST |
| **team-review** | 代码审查，3 角色 review-fix 循环 | scanner, reviewer, fixer | SCAN → REV → FIX |
| **team-quality-assurance** | 质量保证，闭环 QA | scout, strategist, generator, executor, analyst | SCOUT → QASTRAT → QAGEN → QARUN → QAANA |
| **team-testing** | 渐进式测试覆盖，L1/L2/L3 分层 | strategist, generator, executor, analyst | STRATEGY → TESTGEN → TESTRUN → TESTANA |
| **team-perf-opt** | 性能优化，单/扇出/并行模式 | profiler, strategist, optimizer, benchmarker, reviewer | PROFILE → STRATEGY → IMPL → BENCH + REVIEW |
| **team-tech-debt** | 技术债识别与补救 | scanner, assessor, planner, executor, validator | TDSCAN → TDEVAL → TDPLAN → TDFIX → TDVAL |

---

## ▍Codex 工作模式

ccw codex工作流中 尽管移植了 team（可以尝试 **team-lifecycle** 一步梭哈），但这里推荐 **CSV Wave 工作模式**（更常用）：

1. `analyze-with-file` → `csv-wave-pipeline` 分析 → 规划执行
2. `roadmap-with-file` → `csv-wave-pipeline` 需求分解 → 规划执行
3. `workflow-lite-plan`

Codex 需要进行额外配置：

```ini
[features]
enable_fanout = true
```

## ▍更多命令探索（感谢某位佬友做的命令图解）

![[96f0aae42f9640de9ac91626ef319872_MD5.png]][ccw-command-explorer](https://ccw-command-explorer.vercel.app/)

## ▍项目地址

![[e71a5970780dfc5fb1db5c1b81fef35e_MD5.png]][catlog22/Claude-Code-Workflow](https://github.com/catlog22/Claude-Code-Workflow)

---

# Maestro Flow 介绍

## ▍背景

CCW 7.0 版本半个月前就已发布，但总觉得缺了点什么，迟迟没有发帖介绍。期间尝试设计了不同形式的工作流（DDD、IDAW 等，最新版本已移除），但直觉告诉我那不是最终答案。直到最近学习了 GSD 工作流，想明白 CCW 缺了什么——重新梳理了 CCW 的定位以及下一代工作流的构想。

## ▍思考

在我看来，当前 CCW 与 Superpowers 很像：依靠 ACE、CodexLens 等向量搜索能力，以 **代码为唯一真理源** 进行即时规划，执行。定位是——适合 **中小型项目和科研场景**，所开发代码前后依赖较少。

对比 GSD，CCW 主要缺少两样东西：**规范化的产物复用** 和 **严格的步骤执行**。GSD 以路线图和代码为双重真相源进行设计，从理论上讲，这套规范更适合 **大型项目和团队协作**，但实际上体验还有待优化。

## ▍对比体验

- **Superpower**：前期有关注过，并没有深入体验，最近发现 5.0 版本也采用多 agent 规划执行，可能是殊途同归吧（CCW 在三个月前就这样设计了）。CCW 在不同复杂度开发都有灵活入口以及在 Codex 命令设计、Team 设计上还有优势。体验过 Superpower 的佬们，可以对比尝试 CCW 中的 `analyze-with-file` → `workflow-lite-plan` 进行模块化开发，体验更佳。
- **GSD**：深入体验了 GSD，从架构设计来说，很完美，是我理想的架构。深入体验后发现几个问题，导致实际体验并不好：起手入口太单一，导致往往杀鸡用牛刀，这也是许多工作流设计的问题所在。文档拆分过细，我认为写文档其实跟写代码差不多，文档拆分过细也会导致后续执行偏差，这里的平衡还需要进行优化。

---

## ▍融合：Maestro Flow

工作流命名为 **Maestro Flow**，名称灵感来源于音乐的演奏，有快有慢，类似软件开发流程。 **灵活**、**规范**是Maestro的设计宗旨，我希望Maestro可以应对不同复杂度的任务。

Maestro Flow 专注于 **Claude 与 Codex** 工作流设计（目前它俩比较好用），融合了：

- **GSD** 的路线图驱动 + 阶段管线
- **CCW** 的多阶段 Spec 规范约束、头脑风暴、Issue 闭环工作流、全自动推进命令

其中 Codex 工作流进行了针对性的重新设计，采用csv wave模式 更稳定的使用多agent系统。

> 新增了 **Supervisor 控制 agent**——你可以将 Supervisor 理解为一个特异化的 OpenClaw，用于控制工作流自动推进，具备长期记忆和自学习能力。

**当前工作流已设计完毕，等待看板优化完毕后即可正式发布。**

![[20a62201170e924fc5af6c7bc63948ec_MD5.png]]命令全景图：[Maestro-Flow Command Usage Guide](https://github.com/catlog22/Maestro-Flow/blob/master/guide/command-usage-guide.md)

![[e71a5970780dfc5fb1db5c1b81fef35e_MD5.png]]项目地址：[catlog22/Maestro-Flow](https://github.com/catlog22/Maestro-Flow)
