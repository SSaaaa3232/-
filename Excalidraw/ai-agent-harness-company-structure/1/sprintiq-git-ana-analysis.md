# SprintiQ git-ana 分析：对 AI Agent Harness 的可吸收点

## 项目一句话 + 方法论总结

SprintiQ 不是普通 PM 工具，而是一个放在 Claude Code 上方的“产品脑 / 计划层”：它负责把需求组织成任务、生成 Agent 可执行 prompt、通过本地 CLI 桥启动 AI 编码工具、持续监控执行状态，并要求 Agent 用结构化报告回传结果。证据：`analysis/repos/sprintiq/README.md:3`、`analysis/repos/sprintiq/README.md:5`、`analysis/repos/sprintiq/CLAUDE.md:12`。

对你的 Harness 来说，真正该学的是这条闭环：

```text
产品意图
  → 结构化任务包
  → 本地桥接启动外部 Agent
  → 会话监控 / heartbeat
  → 结构化完成报告
  → 状态同步 / 证据归档
```

但不能照搬成 Sprint 看板或单 Claude 工作流。你的方向应该保持为：

```text
人类老板
  → 入口 Commander Agent
  → 扫描用户已有 Agent / CLI / Skill / MCP
  → 大公司角色化编排
  → 跨生态 Agent 执行
  → evidence / report / Obsidian 归档
```

## 技术选型决策树

| Problem | Options | Choice | Evidence | Inference |
|---|---|---|---|---|
| Web 产品和 API 外壳 | Express / Remix / Next.js | Next.js App Router | `analysis/repos/sprintiq/README.md:89`、`analysis/repos/sprintiq/README.md:93` | 需要 UI + API + server actions 一体化，所以选 Next.js。作者意图为推断，置信度 MEDIUM。 |
| 数据和权限 | 本地 JSON / SQLite / Supabase | Supabase auth + Postgres + RLS + pgvector | `analysis/repos/sprintiq/README.md:89`、`analysis/repos/sprintiq/CLAUDE.md:18` | 任务、workspace、向量检索和权限隔离都需要数据库支持。置信度 HIGH。 |
| AI 任务生成 | OpenAI / Anthropic / 多 provider | Claude 强制承担复杂 planning | `analysis/repos/sprintiq/lib/ai-provider.ts:566`、`analysis/repos/sprintiq/lib/ai-provider.ts:599`、`analysis/repos/sprintiq/lib/ai-provider.ts:615` | 项目把故事生成、依赖分析视为复杂推理任务，优先交给 Claude。置信度 HIGH。 |
| 本地 Agent 接入 | 只生成提示词 / 浏览器复制 / CLI bridge | `sprintiq watch` 本地桥 | `analysis/repos/sprintiq/README.md:13`、`analysis/repos/sprintiq/packages/cli/src/commands/watch.ts:47` | 核心不是“提示词”，而是“本地运行时桥接”。这对 Harness 很关键。置信度 HIGH。 |
| Agent 完成验收 | 口头总结 / 命令输出 / 文件报告 | `.sprintiq/report.json` | `analysis/repos/sprintiq/packages/cli/src/lib/prompt-generator.ts:104`、`analysis/repos/sprintiq/packages/cli/src/lib/report-reader.ts:7` | 文件级 report contract 是防假完成的关键实现。置信度 HIGH。 |
| 长任务状态 | 等进程退出 / heartbeat / event stream | heartbeat + metrics + retry | `analysis/repos/sprintiq/packages/cli/src/lib/monitor/session-monitor.ts:205`、`analysis/repos/sprintiq/packages/cli/src/lib/monitor/heartbeat.ts:36` | 长任务必须从“对话”变成“可恢复运行状态”。置信度 HIGH。 |
| 对外 Agent 能力暴露 | REST only / CLI only / MCP | MCP tools + resources + prompts | `analysis/repos/sprintiq/lib/mcp/server.ts:65`、`:215`、`:244` | Harness 后续也应该把 registry/run/evidence 暴露成 MCP surface。置信度 MEDIUM。 |

## 架构构建推演

1. 先建产品层：README 直接定义它是 Claude Code 上方的 agile planning & orchestration layer。证据：`analysis/repos/sprintiq/README.md:5`。
2. 再建数据层：项目层级从 user → workspaces → spaces → projects → sprints → tasks，并明确单用户/RLS 模式。证据：`analysis/repos/sprintiq/CLAUDE.md:24`、`analysis/repos/sprintiq/CLAUDE.md:37`。
3. 再建 AI 生成层：AI 根据 persona、team context、anti-pattern 等生成 user stories，并对依赖做分析。证据：`analysis/repos/sprintiq/README.md:14`、`analysis/repos/sprintiq/lib/ai-provider.ts:566`、`:599`。
4. 再建本地 CLI 桥：`sprintiq watch` 在本地开 HTTP server，接受浏览器/产品端的 launch 请求。证据：`analysis/repos/sprintiq/packages/cli/src/commands/watch.ts:47`、`:80`、`:102`。
5. 再建 Agent 执行协议：watch 拿到 task，生成 prompt，写 prompt 文件，启动 Claude Code 或 cursor-agent。证据：`analysis/repos/sprintiq/packages/cli/src/commands/watch.ts:126`、`:130`、`:136`、`:156`、`:261`。
6. 最后建监控和回传：SessionMonitor 追踪文件、git、测试、heartbeat、idle、report.json，并把 completion payload 发回 API。证据：`analysis/repos/sprintiq/packages/cli/src/lib/monitor/session-monitor.ts:166`、`:177`、`:195`、`:205`、`:228`、`:353`、`:416`。

## 关键实现分析

### 1. Prompt Packet：把任务变成可交接的执行包

SprintiQ 的 `generatePrompt` 不是简单拼一句“请实现功能”，而是分段生成：metadata、User Story、Acceptance Criteria、Dependencies、Subtasks、Technical Context、Instructions、完成报告要求。证据：`analysis/repos/sprintiq/packages/cli/src/lib/prompt-generator.ts:14`、`:20`、`:49`、`:58`、`:68`、`:84`、`:90`、`:101`。

对 Harness 的吸收方式：做 `HandoffPacket`。每个下级 Agent 收到的都应该是结构化交接包：

```json
{
  "mission": {},
  "role": "architect|coding|review|qa",
  "inputs": [],
  "dependencies": [],
  "acceptance_criteria": [],
  "allowed_tools": [],
  "report_contract": {}
}
```

### 2. Local Bridge：从“模型对话”走向“外部 Agent 调度”

`watch` 命令本质是本地运行时：开 HTTP server、校验 token、获取任务、生成 prompt、启动 Claude Code / cursor-agent。证据：`analysis/repos/sprintiq/packages/cli/src/commands/watch.ts:47`、`:117`、`:126`、`:130`、`:156`、`:188`、`:261`。

对 Harness 的吸收方式：做 `LocalAgentLauncher`。它不限定 Claude，而是扫描并调度 `codex`、`claude`、`opencode`、`gemini`、`aider`、本地 MCP、skills、甚至用户自己已有的 agents。

### 3. Session Monitor：上级 Agent 不靠信任，靠状态和证据

SprintiQ 监控文件变更、git commit、测试结果、heartbeat、idle、report.json。证据：`analysis/repos/sprintiq/packages/cli/src/lib/monitor/session-monitor.ts:166`、`:177`、`:195`、`:205`、`:228`、`:240`。

对 Harness 的吸收方式：做 `DelegatedJobMonitor`。每个被 Commander 或中层 Agent 派发的任务，都有状态机：`queued → running → blocked|needs_review|completed → verified|rejected`。

### 4. Report Contract：防假完成要文件化、机器可读

SprintiQ 要求 Claude 写 `.sprintiq/report.json`，里面至少有 status、summary，可选 `ac_results` 和 `issues`。证据：`analysis/repos/sprintiq/packages/cli/src/lib/prompt-generator.ts:104`、`:107`、`:109`、`analysis/repos/sprintiq/packages/cli/src/lib/report-reader.ts:7`、`:11`、`:62`、`:77`。

对 Harness 的吸收方式：让每个 Agent 写 `.harness/runs/<run_id>/delegates/<job_id>/report.json`。没有 report 或 evidence，不允许上级宣称完成。

### 5. Dependency Planning：从线性角色链升级为产物 DAG

SprintiQ 对 story 依赖建图、找关键路径、生成瓶颈建议。证据：`analysis/repos/sprintiq/lib/ai/dependency-analyzer.ts:66`、`:240`、`:486`。

对 Harness 的吸收方式：你的固定大公司角色仍保留，但执行顺序不必永远线性。正确模型是：角色固定，任务依赖是 DAG。例如 Research 和部分 Scanner 可并行；Architect 必须等 Research/Strategy 的关键产物；Review/QA 必须等 Coding patch。

### 6. MCP Surface：能力分成 tools/resources/prompts

SprintiQ 的 MCP server 明确分 `tools`、`resources`、`prompts`。证据：`analysis/repos/sprintiq/lib/mcp/server.ts:65`、`:215`、`:244`。

对 Harness 的吸收方式：

- Tools：`create_mission`、`plan_workflow`、`dispatch_agent`、`collect_evidence`、`verify_report`
- Resources：`harness://registry/agents`、`harness://runs/current`、`harness://evidence/current`
- Prompts：`commander_planning`、`agent_handoff`、`review_gate`、`delivery_report`

## 证据表

| # | Discovery | Evidence Anchor | Confidence |
|---|---|---|---|
| 1 | SprintiQ 定位是 Claude Code 上方的产品脑/编排层 | `analysis/repos/sprintiq/README.md:3`、`:5` | HIGH |
| 2 | 产品闭环包含 story generation、sprint planning、CLI bridge、heartbeat、dashboard completion | `analysis/repos/sprintiq/CLAUDE.md:12` | HIGH |
| 3 | CLI watch 是本地 bridge server | `analysis/repos/sprintiq/packages/cli/src/commands/watch.ts:47` | HIGH |
| 4 | watch 会生成 prompt 并启动 Claude Code | `analysis/repos/sprintiq/packages/cli/src/commands/watch.ts:130`、`:156` | HIGH |
| 5 | watch 也支持 cursor-agent，说明作者已考虑多入口 Agent | `analysis/repos/sprintiq/packages/cli/src/commands/watch.ts:188`、`:261` | HIGH |
| 6 | prompt 明确要求写 `.sprintiq/report.json` | `analysis/repos/sprintiq/packages/cli/src/lib/prompt-generator.ts:104` | HIGH |
| 7 | report-reader 校验 status、ac_results、issues | `analysis/repos/sprintiq/packages/cli/src/lib/report-reader.ts:11`、`:62`、`:77` | HIGH |
| 8 | SessionMonitor 追踪文件、git、测试、heartbeat、idle | `analysis/repos/sprintiq/packages/cli/src/lib/monitor/session-monitor.ts:166`、`:177`、`:195`、`:205`、`:228` | HIGH |
| 9 | completion 失败会保存 pending report 并下次重试 | `analysis/repos/sprintiq/packages/cli/src/lib/monitor/session-monitor.ts:416`、`:434`、`analysis/repos/sprintiq/packages/cli/src/lib/api-client.ts:146` | HIGH |
| 10 | MCP server 把能力分为 tools/resources/prompts | `analysis/repos/sprintiq/lib/mcp/server.ts:65`、`:215`、`:244` | HIGH |

## FACTS / INFERENCES / UNKNOWNS

### FACTS

- SprintiQ 明确绑定 Claude Code 工作流。证据：`analysis/repos/sprintiq/README.md:3`、`:5`。
- CLI 包名是 `@sprintiq/cli`，bin 是 `sprintiq`。证据：`analysis/repos/sprintiq/packages/cli/package.json:2`、`:5`。
- CLI 有 `auth`、`doctor`、`prompt`、`watch`、`session` 命令。证据：`analysis/repos/sprintiq/packages/cli/src/index.ts:9`、`:13`。
- `watch` 能启动 Claude Code 和 cursor-agent。证据：`analysis/repos/sprintiq/packages/cli/src/commands/watch.ts:156`、`:261`。
- 完成报告是文件协议 `.sprintiq/report.json`。证据：`analysis/repos/sprintiq/packages/cli/src/lib/report-reader.ts:7`。

### INFERENCES

- SprintiQ 的最核心工程价值不是 UI，而是“任务模型 → prompt → 本地 Agent → monitor → report”闭环。推理链：README 定位为 orchestration layer；CLI watch 本地桥；SessionMonitor 监控；report contract 验收。置信度 HIGH。
- 对 Harness 最有价值的是 Local Bridge + Report Contract + Session Monitor，而不是 sprint board。推理链：你的产品目标是跨生态 Agent 编排；SprintiQ 的 web/sprint 部分服务 Claude Code agile workflow，容易把 Harness 带偏。置信度 HIGH。
- Harness 下一步应该先实现 `HandoffPacket` 和 `DelegatedJobMonitor`，再做更完整的 UI。推理链：当前 Harness 已有扫描/注册/投影/mission/workflow/report 思路，缺真实调度和运行态。置信度 MEDIUM。

### UNKNOWNS

- SprintiQ 的 commit 历史只有 3 条公开提交，无法可靠还原完整早期演进。证据：`git log --oneline --max-count=30` 只显示 `Initial OSS release`、README 更新和描述更新。
- 没有执行 SprintiQ 安装、测试或 self-host 流程，所以运行质量不在本次结论范围。
- 没有证据表明 SprintiQ 已经做了真正的多 Agent 公司式层级编排；它更像产品任务系统 + AI coding session bridge。

## 复现路径：如果把 SprintiQ 方法论内化到 Harness

1. 定义 Harness 的任务对象：`MissionSpec`、`WorkflowSpec`、`AgentSpec`、`HandoffPacket`。
2. 生成平台无关交接包：每个角色 Agent 拿到同一种结构化任务，不直接吃用户原话。
3. 做本地桥：`harness watch` 或 `harness daemon`，负责接收 Commander 的 dispatch 请求。
4. 做 Agent launcher：按 registry 调用 `codex`、`claude`、`opencode`、`cursor-agent`、`aider` 等命令。
5. 做 delegate report：每个子 Agent 必须写机器可读报告和 evidence。
6. 做 monitor：追踪进程、文件、git、测试、heartbeat、idle、report。
7. 做 gate：Review/QA/Delivery 只能基于 report 和 evidence 晋级，不能只听 Agent 自述。
8. 做 MCP surface：让入口模型通过 MCP 读 registry、创建 mission、派发任务、查询 run 状态。

## 不该照搬的地方

- 不照搬 Sprint 看板、velocity、capacity management；你的 Harness 不是 PM SaaS。
- 不照搬单 Claude Code 中心；你的差异化是跨 Codex / Claude / opencode / 本地 agents / MCP / skills。
- 不照搬单用户 workspace 模型；你的“大公司模式”是角色和组织结构，不是 SaaS 多用户权限系统。
- 不先做复杂 UI；你当前路线里 Obsidian report/mindmap 更符合最小观察面。

## 对当前 Harness 的下一步建议

优先做四个模块：

1. `HandoffPacket`：替代一句话派活。
2. `.harness/delegate-report.json`：防假完成。
3. `LocalAgentLauncher`：真正调外部 Agent。
4. `DelegatedJobMonitor`：让 Agent 管 Agent 有状态、有证据、有恢复能力。

这四个做完，你的 Harness 才从“配置投影工具”变成“多 Agent 公司编排运行时”。

## 参考链接

- https://github.com/SprintiQ-Incorporated/sprintiq
- 本地分析仓库：`analysis/repos/sprintiq`
- 脑图：`/Users/saaaaa/Obsidian-Template/Excalidraw/sprintiq-harness-commander-learnings/sprintiq-harness-commander-learnings.excalidraw.md`
