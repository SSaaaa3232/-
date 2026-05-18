---
ingested: 2026-05-18
wiki_page: "[[wiki/sources/Source - Claude-code-workflow(CCW) 使用技巧分享]]"
raw_path: "raw/团队team/技术/Maestro/Claude-code-workflow(CCW) –使用技巧分享-自认为最工程化的harness workflow.md"
title: "【长期贴】 Claude-code-workflow(CCW) –使用技巧分享-自认为最工程化的harness workflow"
source: "https://linux.do/t/topic/1863021"
author:
  - "[[catlog22]]"
published: 2026-03-31
created: 2026-05-07
---

## 与常见工作流 Surperpower对比(两者最像)：

- claude-code-workflow 存在不同复杂度任务入口，可实现 半自动，全自动运行，精细化推进，覆盖软件开发各个环节
- **自认为 claude-code-workflow 中team skill 是现在所有工作流中最稳定的(包括codex)**
- cc和 codex的工作流单独维护，并针对codex特性设计wave pipeline 专用工作流
- 多cli协作，语义编排

## 项目地址：

[catlog22/Claude-Code-Workflow: JSON-driven multi-agent cadence-team development framework with intelligent CLI orchestration (Gemini/Qwen/Codex), context-first architecture, and automated workflow execution](https://github.com/catlog22/Claude-Code-Workflow)

## 注意事项

## codex 指令采用最新multi\_agent V2架构设计，需要更新到0.117，设置下述参数

```ini
[features]
enable_fanout = true
suppress_unstable_features_warning = true
default_mode_request_user_input = true
multi_agent_v2=true
```

## 安装使用:

```bash
npm install -g claude-code-workflow 
ccw install #安装工作流
ccw view #在工作空间启动看板
```

## 命令参考：

[@wuyan   ![[f62d928e66d2e16b3dff31e19b86bc16_MD5.png]]](https://linux.do/u/wuyan)   感谢佬的维护！！

![[dc5839a0c5eae99314d93ebdf8e93ade_MD5.svg]] [ccw-explorer.7841784.xyz](https://ccw-explorer.7841784.xyz/)

### [ccw-command-explorer](https://ccw-explorer.7841784.xyz/)

## 使用技巧介绍

下面按照软件开发过程中常见场景进行分类

## 一. 从1-100软件开发

### 1.1 软件开发:新增功能或者功能变更

> 与其他工作流不同，ccw将explore环节单独摘出来，放到analyze步骤中，一个完整功能新增流程如下：流程如下: analyze->plan->execute->review。

#### 1.1.2 使用方法：

#### 通过analyze-with-file 入口命令传递需求就行

**claude**

```bash
#路径1
/workflow:analyze-with-file  "需求,bug" ->（askuser后自动调用）/workflow-lite-plan->(自动)/workflow-lite-execute->(自动)/workflow-lite-test-review
#路径2
/team-lifecycleV4  "需求,bug"
#路径3 
语义调用Gemini codex进行分析，获取足够信息 ->(手动)/workflow-lite-plan->(自动)/workflow-lite-execute->(自动)/workflow-lite-test-review
#路径4 
语义调用Gemini codex进行分析，获取足够信息 ->直接执行 或 语义调用多agent执行
```

**codex**

```bash
#路径1
$analyze-with-file  "需求,bug" ->$csv-wave-pipeline
#路径2
$team-lifecycleV4
```

### 1.2 bug修复

> 简单强力的命令，自动打日志分析，解决bug

**claude**

```csharp
/workflow:debug-with-file "问题描述"
```

**codex**

```csharp
$debug-with-file "问题描述"
```

---

### 二. 从0-1开发

#### 2.1 只有想法，不知道怎么做

**claude**

```bash
#路径1
/brainstorm "想法" ->（可选）spec-generator->(手动，清除会话)workflow-plan->(compact或清除会话)workflow-execute
#路径2
brainstorm "想法" -> team-lifecycleV4 (需安装ui-pro-max skill)
#路径3
team-lifecycleV4
```

**codex**

```bash
#路径1
$brainstorm  "想法" ->（可选）$spec-generator->(手动，清除会话)$workflow-plan->(compact或清除会话)$workflow-execute
#路径2
brainstorm  "想法" -> team-lifecycleV4 (需安装ui-pro-max skill)
```

#### 2.2 想法明确，但是细节缺失

**claude**

```bash
#路径1
/spec-generator->(手动，清除会话)workflow-plan->(compact或清除会话)workflow-execute
#路径2
/spec-generator-> team-lifecycleV4 (需安装ui-pro-max skill)

#路径3
team-lifecycleV4
```

**codex**

```bash
#路径1 (详细的需求文档撰写)
$spec-generator->(手动，清除会话)$workflow-plan->(compact或清除会话)$workflow-execute
#路径2 (轻量快速)
$roadmap-with-file-> $csv-wave-pipeline
#路径3
$team-lifecycleV4
```

#### 2.3 需求文档明确

**claude**

```bash
需求文档->> /workflow-plan->(compact或清除会话)/workflow-execute
```

**codex**

```bash
需求文档->> $workflow-plan->(直接执行)$workflow-execute
```

---

### 三. 全自动交付

**claude**

```bash
/ccw-coordinate "复杂想法需求 0-1"
/ccw  "中等规模需求想法 0-1 或功能新增"
/team-lifecycleV4 "0-1 或功能新增"
```

**codex**

```bash
$team-lifecycleV4 "0-1 或功能新增"
```

---

### 四.其他需求

> 通过 team-coordinate 实现任务分解，角色生成及自动委派，中间产物自动流转，实现多种复杂任务。其次，也可以根据需求查找最相近的team skill。

**claude**

```bash
/team-coordinate "XXX"
```

**codex**

```bash
$team-coordinate "XXX"
```

### 五 .规范系统

通过spec 可以约束项目按照自定义风格。spec:add命令会根据规范要求，自动分配加载阶段，在使用工作流时自动加载。

```bash
/workflow:spec:setup                 # 完整初始化
/workflow:spec:add "Use async/await instead of callbacks"   # 添加规范
```
Claude code skill 预览

| 技能名 | 描述 | 角色 | 流程 |
| --- | --- | --- | --- |
| **brainstorm** | 双模式头脑风暴 (auto/single-role)，含框架生成 | 单角色 | Mode routing → Framework generation (auto) / Role analysis → Synthesis |
| **ccw-help** | CCW 命令帮助系统，支持搜索、推荐、浏览 | 单角色 | Detect mode (Search/Recommend/Doc/Onboard/Orchestration/Issue/Browsing) → Execute → Output |
| **delegation-check** | 检查工作流委派 prompt 与 agent 角色定义的冲突 | 单角色 | Determine scope → Discover pairs → Parse prompts → Parse definitions → 7-dimension conflict check |
| **investigate** | Iron Law 系统化调试 (无确认根因不修复) | 单角色 | Investigation → Pattern analysis → Hypothesis testing → Implementation (gated) → Verification |
| **issue-manage** | 交互式问题管理，菜单驱动 CRUD 操作 | 单角色 | Main menu → Select operation (List/View/Edit/Delete/History/Bulk) → Execute → Update state |
| **memory-capture** | 统一记忆捕获，路由到 compact 或 tips 模式 | 单角色 | Parse input → Detect mode → Read phase doc → Execute → Save via core\_memory |
| **memory-manage** | 统一记忆管理，CLAUDE.md 更新与文档生成 | 单角色 | Parse input → Interactive assessment → Select phase → Execute → Output artifacts |
| **prompt-generator** | 生成/转换 Claude Code prompt 文件，GSD 内容分离 | 单角色 | Determine type → Validate → Resolve path → Read spec → Generate → Quality validate |
| **review-code** | 多维度代码审查，6 个分析维度 | 单角色 | Read specs → Collect context → Quick scan → Deep review → Report → Complete |
| **review-cycle** | 统一代码审查编排器，session/module/fix 模式路由 | 单角色 | Detect mode → Read phase → Execute 5 phases → Generate report |
| **security-audit** | OWASP Top 10 + STRIDE 安全审计，含供应链分析 | 单角色 | Supply chain scan → OWASP review → Threat modeling → Report & tracking |
| **ship** | 结构化发布流水线：预检、审查、版本、变更日志、PR | 单角色 | Pre-flight → Code review → Version bump → Changelog → PR creation |
| **skill-generator** | 元技能：创建新 Claude Code 技能，可配置模式 | 单角色 | Spec analysis → Requirement gathering → Directory creation → Generation → Validation |
| **skill-tuning** | 通用技能诊断与优化，含 Gemini CLI 分析 | 单角色 | Read taxonomy → Orchestrator state-driven → 6 diagnosis types → Fix & verify |
| **spec-generator** | 7 阶段规格文档生成器，多 CLI 分析 | 单角色 | Discovery → Req expansion → Brief → PRD → Architecture → Epics → Readiness |
| **wf-composer** | 语义工作流编排：自然语言 → DAG → JSON 模板 | 单角色 | Parse → Resolve → Enrich → Confirm → Persist template |
| **wf-player** | 工作流模板播放器：加载 JSON、绑定变量、执行 DAG | 单角色 | Route → Load & bind → Instantiate → Execute → Complete |
| **workflow-execute** | 工作流任务执行协调，自动会话发现 | 单角色 | Discovery → Validation → TodoWrite gen → Execute tasks → Completion |
| **workflow-lite-execute** | 轻量执行引擎，多模式输入，批量执行 | 单角色 | Mode detection → Selection → Execution → Code review (optional) → Test-review chain |
| **workflow-lite-plan** | 轻量规划：探索、澄清、规划、确认 | 单角色 | Init → Exploration → Clarification → Planning → Confirmation → Execute handoff |
| **workflow-lite-test-review** | 执行后测试审查与修复，收敛验证 | 单角色 | Mode detection → Framework detection → Convergence verify → Tests & fixes → Report |
| **workflow-multi-cli-plan** | 多 CLI 协作规划，迭代交叉验证 | 单角色 | Context gathering → Multi-CLI discussion → Present options → User decision → Plan gen & execute |
| **workflow-plan** | 统一规划：4 阶段工作流，验证与重规划 | 单角色 | Mode detection (plan/verify/replan) → Phase 1-4 → Confirmation → Execution handoff |
| **workflow-skill-designer** | 元技能：设计 orchestrator+phases 结构化工作流技能 | 单角色 | Requirement analysis → Orchestrator design → Phase generation → Validation |
| **workflow-tdd-plan** | 统一 TDD 规划：6 阶段 Red-Green-Refactor 任务生成 | 单角色 | Session → Context → Test coverage → Task gen → Verification → Confirm & execute |
| **workflow-test-fix** | 统一测试修复：生成与迭代执行 | 单角色 | Session → Context → Analysis → Task gen → Execute cycle → Complete |
| **team-arch-opt** | 架构优化团队 | coordinator, analyzer, designer, refactorer, validator, reviewer | Analyze → Dispatch → Refactoring cycle → Validation → Complete |
| **team-brainstorm** | 头脑风暴团队 | coordinator, ideator, challenger, synthesizer, evaluator | Analyze → Dispatch → 4 worker roles → Callbacks → Complete |
| **team-coordinate** | 通用团队协调，动态角色生成 | coordinator (builtin), dynamic workers | Analyze → Generate role-specs → Init session → Spawn workers → Callbacks → Complete |
| **team-designer** | 元技能：生成遵循 v4 架构的团队技能 | 单角色 | Requirements analysis → Scaffold generation → Content generation → Validation |
| **team-executor** | 轻量会话执行，恢复已有 team-coordinate 会话 | 单角色 | Validate session → Reconcile state → Spawn workers → Callbacks → Complete |
| **team-frontend** | 前端开发团队，内置 ui-ux-pro-max 设计智能 | coordinator, analyst, architect, developer, qa | Analyze → Dispatch → 4 worker roles → GC loops → Complete |
| **team-frontend-debug** | 前端调试团队，Chrome DevTools MCP 双模式 | coordinator, tester, reproducer, analyzer, fixer, verifier | Analyze → Select pipeline (test/debug) → Dispatch → Execute → Complete |
| **team-interactive-craft** | 交互组件团队：研究-设计-构建-无障碍 | coordinator, researcher, interaction-designer, builder, a11y-tester | Research → Design → Build → A11y test → GC loops → Complete |
| **team-issue** | 问题解决流水线：探索-规划-审查-集成-实现 | coordinator, explorer, planner, reviewer, integrator, implementer | Clarify → Dispatch → Workers → Review-fix cycles → Complete |
| **team-lifecycle-v4** | 全生命周期团队：规划-开发-测试-审查 | coordinator, analyst, writer, planner, executor, tester, reviewer, supervisor | Analyze → Dispatch → Workers + supervisor → Checkpoints → Complete |
| **team-motion-design** | 动效设计团队：研究-编排-动画-测试 | coordinator, motion-researcher, choreographer, animator, motion-tester | Research → Choreography → Animation → Performance testing → Complete |
| **team-perf-opt** | 性能优化团队 | coordinator, profiler, strategist, optimizer, benchmarker, reviewer | Dispatch → Single/fan-out/independent modes → Optimization cycle → Complete |
| **team-planex** | 计划执行流水线，基于 issue 开发 | coordinator, planner, executor | Dispatch → Planner → Executor → Callbacks → Complete |
| **team-quality-assurance** | 质量保障团队，结合问题发现与测试 | coordinator, scout, strategist, generator, executor, analyst | Dispatch → Discovery/testing/full modes → Execute → Complete |
| **team-review** | 代码审查团队：扫描-审查-修复 | coordinator, scanner, reviewer, fixer | Dispatch → Scanner → Reviewer → Fixer → GC loops → Complete |
| **team-roadmap-dev** | 路线图驱动开发，分阶段执行 | coordinator, planner, executor, verifier | Roadmap discussion → Phase 1-N pipeline → Per-phase workers → Complete |
| **team-tech-debt** | 技术债识别与修复 | coordinator, scanner, assessor, planner, executor, validator | Scan → Assess → Plan → Execute → Validate → Complete |
| **team-testing** | 测试团队：策略-生成-执行-分析 | coordinator, strategist, generator, executor, analyst | Strategist → Generator → Executor → Analyst → GC loops → Complete |
| **team-ui-polish** | UI 打磨团队：扫描-诊断-优化-验证 | coordinator, scanner, diagnostician, optimizer, verifier | Scan → Diagnose → Optimize → Verify → GC loops → Complete |
| **team-uidesign** | UI 设计团队：研究-设计-实现 | coordinator, researcher, designer, implementer | Research → Design → Implement → Complete |
| **team-ultra-analyze** | 深度协作分析：探索-分析-讨论-综合 | coordinator, explorer, analyst, discussant, synthesizer | Explore → Analyze → Iterative discussion → Synthesize → Complete |
| **team-ux-improve** | UX 改进团队：扫描-诊断-设计-实现-测试 | coordinator, scanner, diagnoser, designer, implementer, tester | Scan → Diagnose → Design → Implement → Test → Complete |
| **team-visual-a11y** | 视觉无障碍团队：颜色/字体/焦点并行审计 | coordinator, color-auditor, typo-auditor, focus-auditor, remediation-planner, fix-implementer | 3 audits parallel → Plan remediation → Implement → Re-audit → Complete |
