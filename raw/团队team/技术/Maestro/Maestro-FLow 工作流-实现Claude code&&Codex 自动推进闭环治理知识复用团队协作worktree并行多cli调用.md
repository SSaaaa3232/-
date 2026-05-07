---
title: "【开源自荐】Maestro-FLow 工作流-实现Claude code&&Codex 自动推进/闭环治理/知识复用/团队协作/worktree并行/多cli调用"
source: "https://linux.do/t/topic/2102464"
author:
  - "[[catlog22]]"
published: 2026-05-03
created: 2026-05-07
---

---

### 项目介绍

- Maestro-FLow 是我对复杂软件系统开发的思考产物，项目开发借鉴了gsd的里程碑思想，同时将CCW中主要命令循环抽离出来，重新设计了产物体系及命令，深度优化每个命令流程衔接，形成从头脑风暴-路线图-分析-规划-执行-测试整个环境的闭环。此外，Maestro-FLow还包含wiki，spec，知识管理(学习，复盘),完整hook系统。
- 
- 前期介绍：  
	[\[开源\]CCW(claude-code-workflow)V7.X版本新增Cadence team和 codex csv spawn 工作流&&下一代工作流(maestro-flow)展望 - 开发调优 - LINUX DO](https://linux.do/t/topic/1806070)  
	[【长期贴】 Claude-code-workflow(CCW) --使用技巧分享-自认为最工程化的harness workflow - 开发调优 - LINUX DO](https://linux.do/t/topic/1863021)

### 核心功能介绍

#### 闭环自动推进

Maestro 的闭环推进系统是本项目的核心及特点。在项目开发前，我对每个命令衔接流程深入进行优化设计。

**创新采用结对skill设计**，实现workflow，局部chain稳定推进（支持codex和claude，codex单独优化），具体内容参考下述文档： 

[Maestro](https://github.com/catlog22/maestro-flow/blob/master/guide/maestro-coordinator) 协调器 — 意图解析 → 静态命令链选择 → 分发执行，40+ 预定义链。

[Maestro-Ralph](https://github.com/catlog22/maestro-flow/blob/master/guide/maestro-ralph-guide.md) — 闭环自适应推进，decision 节点动态扩展收缩，失败自动 debug → fix→ 重试，Passed Gates 跨重试跳过已通过质量门，full/standard/quick 三级质量管线。

|             | Maestro   | Maestro Ralph                                    |
| ----------- | --------- | ------------------------------------------------ |
| 链类型         | 静态链，确定后不变 | 活链，decision 节点动态扩展                               |
| 循环          | 无         | 闭环（失败 → debug → fix → 重试）                        |
| Decision 节点 | 无         | post-verify、post-review、post-test、post-milestone |
| 适用场景        | 单次任务、明确意图 | 完整 milestone 生命周期推进                              |

#### 知识规范管理

Maestro 的知识管理分四层，spec，wiki，knowhow，learn。

- spec 区别现有其他工作流，采用工作流及关键词双路径注入。主流程无需hook，基于Maestro 闭环工作流调用方式注入，按照coding/arch/quality/debug/test/review/learning阶段划分。关键词模式基于hook和subagent hook触发。
- spec规范系统支持渐进式补充，在workflow推进流程下，各个环节命令针对分析，探讨结果，渐进式完善注入规范。
- Wiki是将Maestro知识碎片（工作流产物）串成图谱，用 BM25做全文检索，能自动发现孤立节点和潜在关联，通过命令清理产物文件并生成摘要。
- Knowhow偏实操经验，记录的是 session压缩、小贴士、可复用模板、操作配方、外部参考和关键决策等。
- learn-\*是一系列command，通过cc或codex调用，复盘看做过什么、跟读看AI怎么写、模式拆解看代码背后的设计意图、探究带着假设去验证。

**针对双规注入设计了spec格式，spec中每个条目使用 闭合标签格式，keywords定义hook触发关键词：**

```sql
<spec-entry category="coding" keywords="auth,token,rotation" date="2026-04-21">

### Token rotation needs email carried through refresh flow

Revoked column must be set rather than deleting tokens.
Refresh token generation must carry email from stored user data.

</spec-entry>
```

#### 多cli协作

相较于CCW，Maestro的命令流中的多cli调用采用基于角色形式嵌入方式，类似前述spec系统。调用分配固定角色并嵌入analyze，plan，execute等命令中，用户可以针对角色分配不同tool。支持通过绑定settings配置文件实现新工具注册，将workflow各个阶段映射到不同模型中。

```csharp
maestro delegate-config        # 启动 TUI
maestro dc                     # 短别名

# 子命令（非交互）
maestro delegate-config show          # 文本输出当前配置
maestro delegate-config show --json   # JSON 格式
maestro delegate-config roles         # 查看角色映射
```

| Workflow | 环节 | 角色 | 功能 |
| --- | --- | --- | --- |
| review.md | Step 6.5 | review | critical/high 发现交叉验证，检测遗漏 |
| debug.md | Step 5.5 | explore | debug agent 前广域证据收集 |
| verify.md | V0.8 | analyze | 结构验证前反模式/完整性预扫描 |
| plan.md | P1 Step 5b | explore | 与并行探索同步，收集模式/依赖/冲突 |
| test-gen.md | Step 3.5 | analyze | 测试计划前边界条件和边缘场景分析 |
| execute.md | E2.5 Check 4 | analyze | wave 后语义验证（循环依赖/死代码/破坏性变更） |
| milestone-audit.md | Step 5.5 | analyze | 跨阶段导入一致性和类型匹配检查 |

#### 其他功能介绍

- [Overlay 扩展](https://github.com/catlog22/maestro-flow/blob/master/guide/overlay-guide.md) 提供非侵入式的命令扩展机制 —— 在不修改原始 命令或者skill文件的前提下，注入自定义步骤、阅读要求、质量门禁等内容，Maestro升级后仍然可以保留。此外，Maestro 提供更自由工作流定义以及元skill（workflow-designer-skill），通过 Composer + Player 组合，可将自然语言描述转化为可复用，定制化的工作流模板，借助Maestro Ralph能力反复执行。
- [Worktree 里程碑级分支并行开发](https://github.com/catlog22/maestro-flow/blob/master/guide/worktree-guide.md)
- [Statusline](https://github.com/catlog22/maestro-flow/blob/master/guide/statusline-guide.md) 状态栏,行实时显示（模型/协调器进度/任务/团队/Git/Tokens/上下文），工作流时间线按artifact 类型着色（9 种）
- [Team Lite 协作](https://github.com/catlog22/maestro-flow/blob/master/guide/team-lite-guide.md)2-8 人 Git-native 协作，心跳记录 + preflight 冲突预扫描 + 快速 sync，Spec三层加载（baseline + team + personal），Overlay 团队共享。
- [Hooks 系统](https://github.com/catlog22/maestro-flow/blob/master/guide/hooks-guide.md) 9 个 Hook，minimal/standard/full 三级累积安装。含上下文监控（四级 budget策略）、规范注入（按 agent-type 匹配）、Delegate监控、团队心跳及遥测采集、会话状态注入、Skill上下文注入、协调器追踪、关键文件保护

### 快速入门

```bash
CLaude：
/maestro-ralph -y [复杂系统的完整描述,推荐使用文档形式引用]

codex：
$maestro-ralph -y [复杂系统的完整描述,推荐使用文档形式引用]
```

注意：codex 必须设置以下参数：

```ini
[features]
enable_fanout = true
multi_agent_v2=true
default_mode_request_user_input = true
```

## 项目地址：

[catlog22/maestro-flow: Workflow orchestration CLI with MCP endpoint support and multi-agent dashboard](https://github.com/catlog22/maestro-flow)

## 文档站：

[Maestro Documentation](https://catlog22.github.io/maestro-flow/guides/quick-start)

## 命令介绍

### 核心协调

| 命令 | 说明 |
| --- | --- |
| `/maestro` | 智能协调器，解析意图 → 选链 → 分发执行 |
| `/maestro-ralph` | 闭环决策引擎，自适应构建动态命令链 |
| `/maestro-ralph-execute` | 统一单步执行器，按类型（skill/cli/decision）逐步推进 |
| `/maestro-link-coordinate` | 步进模式图协调器，逐节点执行带会话跟踪 |
| `/maestro-composer` | 自然语言 → DAG 工作流模板，自动注入检查点 |
| `/maestro-player` | 加载 DAG 模板按拓扑执行，支持检查点恢复 |

### 项目生命周期

| 命令 | 说明 |
| --- | --- |
| `/maestro-init` | 项目初始化，自动检测空/代码/已有三种状态 |
| `/maestro-roadmap` | 路线图生成，轻量或完整双模式 |
| `/maestro-analyze` | 多维分析，CLI 探索 + 决策提取 + 意图跟踪 |
| `/maestro-brainstorm` | 双模式头脑风暴，自动管道或单角色分析 |
| `/maestro-plan` | 5 阶段管道：探索 → 澄清 → 规划 → 检查 → 确认 |
| `/maestro-execute` | 波形并行执行计划，原子提交 |
| `/maestro-verify` | 目标反向验证，3 层检查 + 反模式扫描 + 覆盖率校验 |
| `/maestro-quick` | 快速任务执行，跳过可选代理 |

### 里程碑与并行

| 命令 | 说明 |
| --- | --- |
| `/maestro-fork` | 创建里程碑级 worktree 或同步已有分支 |
| `/maestro-merge` | 两阶段合并：git merge → artifact 同步 |
| `/maestro-milestone-audit` | 审计当前里程碑的跨阶段集成差距 |
| `/maestro-milestone-complete` | 归档已完成里程碑，准备下一个 |
| `/maestro-milestone-release` | 版本号提升 + changelog 生成 + git tag |

### 扩展与维护

| 命令 | 说明 |
| --- | --- |
| `/maestro-overlay` | 自然语言生成非侵入式命令补丁 |
| `/maestro-amend` | 收集缺陷信号，生成 overlay 修补工作流 |
| `/maestro-update` | 交互式工作流版本迁移 |
| `/maestro-ui-design` | 多风格 UI 原型生成，选优后固化为代码 |
| `/maestro-learn` | 学习协调器，路由意图到学习子命令 |

### 质量保障

| 命令 | 说明 |
| --- | --- |
| `/quality-review` | 分层代码审查（quick/standard/deep） |
| `/quality-debug` | 并行假设驱动调试，结构化根因收集 |
| `/quality-test` | 对话式 UAT，会话持久化 + 自动诊断 |
| `/quality-test-gen` | 生成缺失测试，TDD/E2E 分类 + RED-GREEN 方法 |
| `/quality-business-test` | PRD 正向业务测试，需求可追踪 |
| `/quality-integration-test` | 自迭代集成测试，反思驱动 + L0-L3 渐进层 |
| `/quality-refactor` | 反思驱动技术债务消减 |
| `/quality-retrospective` | 多透镜复盘，洞察路由到 spec/issue/学习库 |
| `/quality-sync` | 代码变更后沿影响链增量同步文档 |

### 项目管理

| 命令 | 说明 |
| --- | --- |
| `/manage-status` | 项目仪表板：阶段进度 + 活跃任务 + 下一步 |
| `/manage-issue` | Issue CRUD：创建、查询、更新、关闭、关联 |
| `/manage-issue-discover` | 多视角自动问题发现 |
| `/manage-harvest` | 从工作流产物提取知识，路由到 wiki/spec/issue |
| `/manage-codebase-rebuild` | 全量重建代码库文档 |
| `/manage-codebase-refresh` | 基于 git diff 增量刷新文档 |

### 知识体系

| 命令 | 说明 |
| --- | --- |
| `/spec-setup` | 扫描项目结构，初始化规范骨架 |
| `/spec-load` | 按关键词加载当前上下文相关规范 |
| `/spec-add` | 按类别添加规范条目 |
| `/spec-remove` | 按 ID 删除规范条目 |
| `/manage-knowhow` | 管理工作流记忆和系统记忆 |
| `/manage-knowhow-capture` | 捕获可复用知识（6 种类型） |
| `/manage-learn` | 原子学习洞察捕获到 lessons.jsonl |
| `/manage-wiki` | Wiki 图谱管理：健康检查 + 孤立清理 + 搜索 |
| `/wiki-connect` | 发现图谱隐藏关联，建议或应用新链接 |
| `/wiki-digest` | 知识摘要生成：主题聚类 + 差距分析 + 覆盖热力图 |

### 学习系统

| 命令 | 说明 |
| --- | --- |
| `/learn-retro` | 复盘：git 活动指标 + 决策质量评估 |
| `/learn-follow` | 引导式跟读代码或 wiki，提取模式建立理解 |
| `/learn-decompose` | 拆解代码为设计模式，存入 spec 和 wiki |
| `/learn-investigate` | 假设驱动探究，证据记录 + 3 次打击上升 |
| `/learn-second-opinion` | 多视角分析：审查、挑战、咨询三种模式 |

---

## Skills

在 Claude Code 会话内以技能形式调用，支持多 Agent 协作。

### 团队协作

| 命令 | 说明 |
| --- | --- |
| `team-coordinate` | 通用团队协调，运行时动态生成角色 + 节拍编排 |
| `team-executor` | 轻量会话恢复，纯执行无分析 |
| `team-lifecycle-v4` | 完整生命周期：规划 → 开发 → 测试 → 审查 |
| `team-quality-assurance` | 闭环 QA：问题发现 + 软件测试 + GC 循环 |
| `team-review` | 3 角色代码审查：扫描 → 深度分析 → 自动修复 |
| `team-tech-debt` | 技术债务扫描、评估、修复、验证全流程 |
| `team-testing` | 渐进式测试覆盖，生成器-评论者循环 |

### 工具与元技能

| 命令 | 说明 |
| --- | --- |
| `skill-iter-tune` | 迭代技能调优：执行 → 评估 → 改进反馈循环 |
| `workflow-skill-designer` | 元技能：设计编排器 + 阶段结构的工作流技能包 |

---

## 安装方式：

```css
npm install -g maestro-flow

maestro install ## 安装工作流

maestro view
```

## 下面以图片介绍主要内容，具体的环节，命令可以参考文档站：

### 项目总体介绍

[![[68a2b55ef71c725ab571322c134f09af_MD5.jpg]]

image1672×941 366 KB

](https://cdn3.ldstatic.com/original/4X/9/5/d/95d88b0c94c40d45cc3bc0b563242970b0d96b40.jpeg "image")

### workflow执行链

[![[3a34a23e65e11c87c573c4242200cf71_MD5.jpg]]

image1672×941 432 KB

](https://cdn3.ldstatic.com/original/4X/9/6/7/96749b160810c24e1c3fd68f51f43981fc000ded.jpeg "image")

### 知识管理体系

[![[0497a0ba1e909caedef4826c758097c5_MD5.jpg]]

image1672×941 430 KB

](https://cdn3.ldstatic.com/original/4X/d/5/5/d5544738f2f1945fda8e7a21933f8907b583f652.jpeg "image")

### worktree 并行开发

[![[4f32f4a70ca65a8faee3cafa493d738b_MD5.jpg]]

image1672×941 435 KB

](https://cdn3.ldstatic.com/original/4X/9/f/8/9f827ce8d87e6abe0f40c6669e87cc6bf1d6f7e7.jpeg "image")

### Maestro 智能路由详解

[![[795cd7f09718250403b123501cb2feb2_MD5.jpg]]

image1672×941 431 KB

](https://cdn3.ldstatic.com/original/4X/d/0/5/d05061c8b6bfa4aabb2f2b5e072dab7a3aef3f86.jpeg "image")

## 借助这个one skill，邀请佬友们品尝一下，认识Maestro-flow，助我迭代

### 项目介绍：

- only one skill ，打包Maestro-flow，
- **关键词：全自动推进、0-1、1-100、头脑风暴、路线图、行动规划、多agent开发、测试、debug、知识规范管理。**
- claude：采用结对，循环迭代skill设计，稳步推进。
- codex：采用spawn\_agent\_on\_csv机制，稳定挂起，子agent再也不会开小差。

### 安装

```css
npm install -g maestro-flow #需要使用Maestro delegate 多cli功能

npm install -g maestro-flow-one 

maestro-flow install #默认安装到全局
```

### codex配置

```ini
[features]
enable_fanout = true
multi_agent_v2=true
default_mode_request_user_input = true
goals = true
```

### 项目结构

```bash
+-- codex/maestro-flow/            # Codex variant -> .codex/skills/
|   +-- SKILL.md                   # spawn_agents_on_csv executor
|   +-- commands/ (49)
|   +-- chains/templates.json
+-- claude/maestro-flow/           # Claude variant -> .claude/skills/
|   +-- SKILL.md                   # Skill() + delegate executor
|   +-- commands/ (49)
|   +-- chains/templates.json
```

### 如何使用

**很简单,only one skill，支持单步command路由和多步command跟踪执行**

```bash
/maestro-flow "XXXXXXXXXXXXX"
```

### 配合以下焚诀以及Maestro flow全面介绍 食用

[Maestro-FLow codex 焚诀~~~配合/goal 闭环长时多agent推进 - 开发调优 - LINUX DO](https://linux.do/t/topic/2109656)

[【开源自荐】Maestro-FLow 工作流-实现Claude code&&Codex 自动推进/闭环治理/知识复用/团队协作/worktree并行/多cli调用 - 开发调优 - LINUX DO](https://linux.do/t/topic/2102464)

## 项目地址：

[catlog22/maestro-flow: Workflow orchestration CLI with MCP endpoint support and multi-agent dashboard](https://github.com/catlog22/maestro-flow)

[catlog22/maestro-flow-one: All Maestro workflow commands packaged as a single Claude Code skill — intent routing, decision gates, minimal closed-loop chains](https://github.com/catlog22/maestro-flow-one)

