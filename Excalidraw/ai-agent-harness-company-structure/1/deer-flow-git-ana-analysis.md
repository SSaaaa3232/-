# DeerFlow git-ana 分析：给 Harness 的长时间稳定运行借鉴

> 分析目标：学习 `https://github.com/bytedance/deer-flow` 里对长时间运行、状态恢复、事件流、子 Agent 调度、记忆、沙箱和防失控的工程做法，判断哪些能融入你的 AI Agent Harness。  
> 本次只做分析和设计内化建议，未改 `harness` 代码。

## 项目一句话 + 方法论总结

DeerFlow 2.0 是一个 LangGraph-based super agent harness：它不是只写一个 prompt，而是把 Agent 运行拆成 `RunManager`、`StreamBridge`、`Checkpointer/Store`、`RunEventStore/Journal`、`Subagent Executor`、`Sandbox`、`Middleware Chain` 这些运行时部件，来保证长任务可观察、可中断、可恢复、可隔离。

```text
入口 API / Channel
  → RunManager 建 run 状态机
  → run_agent 后台执行 agent graph
  → StreamBridge 持续推送事件
  → Checkpointer/Store 保存状态
  → Journal/EventStore 记录证据与 trace
  → Middleware 管沙箱/记忆/摘要/防循环/澄清
  → Subagent Executor 做受限并行委派
```

对你的 Harness 的核心启发：**不要把长任务稳定性寄托在“模型记得住”或“CLI 一次跑完”上，要把每个 mission/run/job 都变成有状态、有事件、有检查点、有取消策略、有证据的运行时对象。**

## 技术选型决策树

| Problem | Options | Choice | Evidence | Inference |
|---|---|---|---|---|
| Agent 编排底座 | 自写循环 / LangGraph / Temporal | LangGraph + Gateway runtime | `analysis/repos/deer-flow/backend/langgraph.json:8` 暴露 `lead_agent` graph；`analysis/repos/deer-flow/backend/CLAUDE.md:15` 说明 Gateway 内嵌运行时 | 作者优先复用 LangGraph 的状态图、checkpoint 和 stream 语义，自己补产品运行时 |
| 长任务生命周期 | 只跑 async task / 状态机 | `RunManager` 状态机 | `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/schemas.py:6` 定义 pending/running/success/error/timeout/interrupted | 长任务必须有显式 run status，不能只靠进程是否还活着 |
| 前端/调用方观察 | 轮询文件 / WebSocket / SSE | `StreamBridge` + SSE | `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/stream_bridge/base.py:3` 写明解耦 worker 和 SSE consumers | 对 Harness 可转成本地事件订阅/observe，未来再接 MCP/插件 UI |
| 状态恢复 | 纯内存 / 文件 / SQLite / Postgres | memory/sqlite/postgres checkpointer | `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/checkpointer/async_provider.py:6` 支持 memory/sqlite/postgres | MVP 可以 JSONL/SQLite，组织级再上 Postgres |
| 审计与证据 | 日志 / 单报告 / 事件存储 | `RunEventStore` + `RunJournal` | `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/events/store/base.py:20` 要求 thread 内 seq 严格递增 | 你的 evidence 应升级成统一事件流，而不是散落文件 |
| 子 Agent 并行 | prompt 约束 / 无限递归 / 受控并发 | task tool + hard concurrency middleware | `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/middlewares/subagent_limit_middleware.py:25` 截断超限 task calls | Harness 的跨生态 agent 编排也需要硬限制，不只靠 Commander 自觉 |
| 长上下文 | 全塞上下文 / 摘要 / 外部记忆 | Summarization + Memory queue | `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/middlewares/summarization_middleware.py:98` 扩展摘要中间件；`analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/memory/queue.py:28` 做记忆更新队列 | 你的大公司模式需要“每个角色自己的记忆/事实摘要”，不要共享一坨聊天历史 |
| 文件/工具隔离 | 直接操作主目录 / per-run workspace / 容器 | per-thread sandbox path mapping | `analysis/repos/deer-flow/backend/packages/harness/deerflow/sandbox/local/local_sandbox_provider.py:34` 说明 per-thread path scoping | Harness 应把每个 run/job 的工作区隔离，尤其跨 CLI 调 agent 时 |

## 架构构建推演

1. **先确定 super agent harness 定位**  
   README 直接说 DeerFlow 是 open-source super agent harness，负责 orchestrate sub-agents、memory、sandboxes、skills，见 `analysis/repos/deer-flow/README.md:12`。这说明它不是单点工具，而是运行时框架。

2. **把核心能力放进独立 Harness 包，把 App 作为外壳**  
   DeerFlow 明确分 `packages/harness/deerflow/` 和 `app/` 两层，App 可以 import harness，harness 不能 import app，见 `analysis/repos/deer-flow/backend/CLAUDE.md:110` 到 `analysis/repos/deer-flow/backend/CLAUDE.md:117`。这点对你的产品很重要：你的核心也应该是 plugin/CLI/MCP 共用的 harness core，而不是绑死某个平台。

3. **用 Gateway 承载运行时单例**  
   `langgraph_runtime()` 在启动时初始化 `stream_bridge`、`checkpointer`、`store`、`run_store`、`thread_store`、`run_event_store`、`run_manager`，见 `analysis/repos/deer-flow/backend/app/gateway/deps.py:41` 到 `analysis/repos/deer-flow/backend/app/gateway/deps.py:92`。这是一种“进程内运行时容器”模式。

4. **把用户请求变成 run，而不是直接调用模型**  
   `start_run()` 创建 `RunRecord`，合并 context，创建后台 `run_agent()` task，见 `analysis/repos/deer-flow/backend/app/gateway/services.py:248` 到 `analysis/repos/deer-flow/backend/app/gateway/services.py:353`。这和你的 `mission → run → delegate job` 方向一致，但 DeerFlow 更完整。

5. **通过事件流连接后台 worker 和消费者**  
   `thread_runs.py` 支持 create、stream、wait、list、cancel、join，见 `analysis/repos/deer-flow/backend/app/gateway/routers/thread_runs.py:116` 到 `analysis/repos/deer-flow/backend/app/gateway/routers/thread_runs.py:257`。这给你的 Harness 后续 `harness observe <run_id>` / MCP subscribe 提供了可参考 API 面。

6. **用中间件链把长期稳定性变成系统行为**  
   DeerFlow 的 lead agent middlewares 包括 ThreadData、Sandbox、ToolError、Summarization、Todo、TokenUsage、Title、Memory、SubagentLimit、LoopDetection、Clarification，见 `analysis/repos/deer-flow/backend/CLAUDE.md:154` 到 `analysis/repos/deer-flow/backend/CLAUDE.md:175`。这说明“防假完成、防循环、摘要、人工澄清”都不应只靠主 prompt。

7. **从提交历史看，它后期持续修长稳问题**  
   最近提交里有 `fix(runtime): avoid postgres aggregate row lock`、`fix(memory): isolate queued memory updates by agent`、`test: add blocking IO detector`、`fix(auth): persist auto-generated JWT secret to survive restarts`，见本地 `git log` 的 `45060a9`、`722c690`、`6e8e6a9`、`6d611c2`。这说明长稳问题不是一次设计完，而是靠事件、隔离、测试持续补齐。

## 关键实现分析

### 1. RunManager：长任务状态机

模式：**run registry + persistent store + atomic multitask strategy**。

证据：
- `RunManager` 明确是 in-memory run registry，同时可接 `RunStore` 持久化，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/manager.py:42` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/manager.py:48`。
- 所有 mutation 用 `asyncio.Lock` 保护，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/manager.py:50` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/manager.py:53`。
- `create_or_reject()` 在同一把锁里检查 inflight run 并创建新 run，避免 TOCTOU race，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/manager.py:179` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/manager.py:198`。
- concurrency strategy 目前支持 `reject/interrupt/rollback`，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/manager.py:202` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/manager.py:219`。

可内化到 Harness：
- 你现在已经有 `.harness/runs/<run_id>/state.json` 和 delegate job，但需要补一个真正 `RunManager` 概念：一个 mission/thread 同时只能有受控的 active run。
- 对 Commander 入口要支持 `reject`、`interrupt`、`rollback` 三种策略：用户重复下达任务时，不应该生成两个互相踩文件的 run。

### 2. run_agent worker：后台执行、rollback、finally 清理

模式：**后台 worker + pre-run checkpoint snapshot + finally publish_end/cleanup**。

证据：
- `run_agent()` 是后台 agent 执行入口，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/worker.py:120` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/worker.py:134`。
- 运行前抓取 pre-run checkpoint snapshot，用于 rollback，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/worker.py:181` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/worker.py:197`。
- 流式执行 `agent.astream()`，边跑边 publish，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/worker.py:282` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/worker.py:309`。
- abort 时按 action 做 rollback 或 interrupted，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/worker.py:311` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/worker.py:350`。
- finally 中 flush journal、persist completion、sync thread status、publish_end、cleanup，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/worker.py:366` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/worker.py:403`。

可内化到 Harness：
- 每个 delegate job 不应只是 `child_process.spawn()` 结束就算完，要有 `try/catch/finally` 模板：写 `job.started`、流 stdout/stderr、写 `job.completed/failed/interrupted`、最后一定写 `end` 事件。
- 对外部 CLI agent，要先 snapshot `.harness/runs/<run_id>` 关键状态；失败或用户中断时至少能回滚 job 状态，不一定回滚整个项目文件。

### 3. StreamBridge：可重连事件流

模式：**producer/consumer 解耦 + event id + heartbeat + bounded replay**。

证据：
- `StreamBridge` 用于解耦 agent worker producers 和 SSE consumers，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/stream_bridge/base.py:1` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/stream_bridge/base.py:5`。
- `StreamEvent.id` 支持 SSE `Last-Event-ID` reconnect，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/stream_bridge/base.py:16` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/stream_bridge/base.py:24`。
- `subscribe()` 支持 `last_event_id`、heartbeat、end sentinel，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/stream_bridge/base.py:49` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/stream_bridge/base.py:60`。
- `MemoryStreamBridge` 保存 per-run bounded event log，支持 late subscribers/reconnect，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/stream_bridge/memory.py:25` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/stream_bridge/memory.py:30`。
- buffer 超限会 trim，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/stream_bridge/memory.py:68` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/stream_bridge/memory.py:77`。

可内化到 Harness：
- 你的 `.harness/runs/<run_id>/events.jsonl` 可以升级成 local stream bridge：`seq` 代替 SSE id，`observe --follow --after <seq>` 支持断线重连。
- 未来 plugin 接入 Codex/Claude/Claude Plugin 时，不要让模型等黑盒 CLI 完成；让入口 Commander 能持续读事件、看到每个角色进度。

### 4. Checkpointer/Store：状态恢复分层

模式：**短期运行态和长期状态分开，存储后端可替换**。

证据：
- checkpointer factory 支持 memory、sqlite、postgres，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/checkpointer/async_provider.py:1` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/checkpointer/async_provider.py:7`。
- SQLite/Postgres saver 会 setup，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/checkpointer/async_provider.py:51` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/checkpointer/async_provider.py:75`。
- `make_checkpointer()` 的优先级是 legacy config、database config、默认 InMemory，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/checkpointer/async_provider.py:125` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/checkpointer/async_provider.py:160`。
- store backend mirrors checkpointer backend，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/store/async_provider.py:1` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/store/async_provider.py:9`。

可内化到 Harness：
- MVP 先继续 JSONL/JSON 文件没问题，但接口上要预留 `StateStore`：`file`、`sqlite`、未来 `postgres`。
- 大公司模式下，`mission_state`、`run_state`、`delegate_job_state`、`artifact_state` 应该有统一 store 接口，而不是散落读写函数。

### 5. RunEventStore + Journal：证据和 trace 统一

模式：**append-only event store + seq + category + callback journal**。

证据：
- `RunEventStore` 规定同一 thread 内 `seq` strictly increasing，且 message 和 event 都走同一接口，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/events/store/base.py:17` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/events/store/base.py:26`。
- JSONL backend 每个 run 一个 `.jsonl`，轻量单节点可持久化，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/events/store/jsonl.py:1` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/events/store/jsonl.py:12`。
- DB backend 对 trace content 做 truncation，避免 DB 膨胀，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/events/store/db.py:1` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/events/store/db.py:4`。
- Postgres 下用 advisory lock 保证 seq，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/events/store/db.py:90` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/events/store/db.py:109`。
- `RunJournal` 通过 LangChain callbacks 捕获 events、token、caller，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/journal.py:1` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/journal.py:15`。
- Journal 有 buffer 和 flush threshold，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/journal.py:38` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/journal.py:49`。

可内化到 Harness：
- 把现有 `evidence.jsonl`、`events.jsonl`、delegate report 合并为一条逻辑 event stream：`category=message|trace|evidence|lifecycle|artifact|handoff`。
- `final-report-must-cite-evidence` 不应只检查报告文本，应检查 event store 是否存在对应 evidence event。

### 6. Subagent Executor：受控并行，不让 agent 无限套娃

模式：**task tool + role registry + isolated loop + hard limit + no nested subagent**。

证据：
- Subagent status 包含 pending/running/completed/failed/cancelled/timed_out，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/subagents/executor.py:40` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/subagents/executor.py:48`。
- 使用全局 background task storage 和 lock，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/subagents/executor.py:84` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/subagents/executor.py:89`。
- 用 persistent isolated event loop，避免每次执行创建/关闭 loop，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/subagents/executor.py:91` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/subagents/executor.py:99`。
- `task_tool` 说明什么时候用/不用 subagent，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/tools/builtins/task_tool.py:197` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/tools/builtins/task_tool.py:205`。
- subagent 获取 tools 时显式 `subagent_enabled: False`，防止递归嵌套，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/tools/builtins/task_tool.py:262` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/tools/builtins/task_tool.py:278`。
- `SubagentLimitMiddleware` 硬限制单次响应 task tool calls，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/middlewares/subagent_limit_middleware.py:25` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/middlewares/subagent_limit_middleware.py:35`。

可内化到 Harness：
- 你的差异化是“跨生态个性化 agent 编排”，所以不能直接照搬 DeerFlow 的内置 subagent，但要照搬状态模型和限制模型。
- 建议你的 delegate job 状态扩展到 `queued/running/completed/failed/cancelled/timed_out/interrupted`。
- `agent 管 agent 再管 agent` 不能默认无限开：建议只允许 `Commander → Role Agent → Tool/Skill`，Role Agent 如需再委派必须写 `delegation_request`，由 Commander 审批或策略放行。

### 7. Prompt + Middleware：统帅 Agent 不只是 prompt

模式：**prompt 讲规则，中间件强执行**。

证据：
- prompt 动态列出 available subagents，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/lead_agent/prompt.py:183` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/lead_agent/prompt.py:210`。
- subagent prompt 明确“DECOMPOSE, DELEGATE, SYNTHESIZE”，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/lead_agent/prompt.py:235` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/lead_agent/prompt.py:243`。
- prompt 写 hard concurrency limit 和 batching，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/lead_agent/prompt.py:245` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/lead_agent/prompt.py:255`。
- 但真正截断超限的是 `SubagentLimitMiddleware`，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/middlewares/subagent_limit_middleware.py:25` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/middlewares/subagent_limit_middleware.py:35`。
- LoopDetectionMiddleware 会检测重复 tool call 并硬停，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/middlewares/loop_detection_middleware.py:1` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/middlewares/loop_detection_middleware.py:14`。

可内化到 Harness：
- 你的 Commander prompt 需要学 DeerFlow：明确“你是统帅，不是员工；先分解，再派工，再综合”。
- 但更关键是 runtime guard：最大并发角色数、禁止重复派同一任务、禁止无 evidence 完成、失败后必须进入 Review/QA 修复环。

### 8. Memory / Dynamic Context / Summarization：长会话不要靠聊天窗口硬撑

模式：**静态 system prompt + 动态 reminder + 记忆异步更新 + 摘要前 hook**。

证据：
- DynamicContextMiddleware 把 memory 和 current date 注入为 `<system-reminder>`，并保持 system prompt 静态以利于 prefix-cache，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/middlewares/dynamic_context_middleware.py:1` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/middlewares/dynamic_context_middleware.py:12`。
- MemoryMiddleware 只保留 user inputs 和 final assistant responses，忽略 tool calls，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/middlewares/memory_middleware.py:28` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/middlewares/memory_middleware.py:36`。
- MemoryUpdateQueue 用 debounce batch 多次更新，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/memory/queue.py:28` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/memory/queue.py:34`。
- queue key 包含 `thread_id/user_id/agent_name`，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/memory/queue.py:43` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/memory/queue.py:50`。
- SummarizationMiddleware 在压缩前触发 hook，并保护 skill 内容，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/middlewares/summarization_middleware.py:98` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/middlewares/summarization_middleware.py:119`。

可内化到 Harness：
- 每个公司角色应该有自己的 `role_memory.md/json` 或 `memory namespace`：Research 记来源，Architect 记架构决策，QA 记失败案例。
- Commander 生成 handoff 时不应该塞全量历史，只塞：mission、角色目标、依赖产物、最近事件摘要、acceptance criteria。

### 9. Sandbox / ThreadData：每个任务要有工作区边界

模式：**per-thread/user workspace + static skill mounts + LRU sandbox cache**。

证据：
- LocalSandboxProvider 说明 per-thread path scoping，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/sandbox/local/local_sandbox_provider.py:34` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/sandbox/local/local_sandbox_provider.py:63`。
- skills directory 是 read-only mapping，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/sandbox/local/local_sandbox_provider.py:96` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/sandbox/local/local_sandbox_provider.py:111`。
- custom mounts 会校验 absolute path、reserved prefix、host existence，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/sandbox/local/local_sandbox_provider.py:114` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/sandbox/local/local_sandbox_provider.py:166`。
- per-thread mappings 包括 workspace/uploads/outputs/acp-workspace，见 `analysis/repos/deer-flow/backend/packages/harness/deerflow/sandbox/local/local_sandbox_provider.py:170` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/sandbox/local/local_sandbox_provider.py:215`。

可内化到 Harness：
- 你现在是本地项目优先，不要一上来做容器，但要有 `run workspace`、`delegate workspace`、`outputs`、`reports` 的硬边界。
- 外部 CLI agent 执行时，默认只给它当前 job 的 handoff 和允许路径，不要把整套 `.harness` 和用户全局目录裸给它。

## 证据表

| # | Discovery | Evidence Anchor | Confidence |
|---|---|---|---|
| 1 | DeerFlow 定位为 super agent harness，核心包括 sub-agents、memory、sandboxes、skills | `analysis/repos/deer-flow/README.md:12` | HIGH |
| 2 | Backend 是 LangGraph-based super agent system，强调 per-thread isolated environments | `analysis/repos/deer-flow/backend/CLAUDE.md:7` | HIGH |
| 3 | Gateway 内运行 agent runtime，核心是 `RunManager + run_agent() + StreamBridge` | `analysis/repos/deer-flow/backend/CLAUDE.md:15` | HIGH |
| 4 | Harness/App 有强边界，App import harness，harness 禁止 import App | `analysis/repos/deer-flow/backend/CLAUDE.md:110` 到 `analysis/repos/deer-flow/backend/CLAUDE.md:117` | HIGH |
| 5 | RunManager 支持持久 RunStore，使 run history survives restarts | `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/manager.py:42` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/manager.py:48` | HIGH |
| 6 | RunManager 用锁原子处理并发 run，支持 reject/interrupt/rollback | `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/manager.py:179` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/manager.py:219` | HIGH |
| 7 | Worker 运行前抓 checkpoint snapshot，rollback 时恢复 | `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/worker.py:181` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/worker.py:197` | HIGH |
| 8 | Worker finally 必定 flush journal、publish_end、cleanup | `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/worker.py:366` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/runs/worker.py:403` | HIGH |
| 9 | StreamBridge 支持 Last-Event-ID reconnect、heartbeat、end sentinel | `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/stream_bridge/base.py:16` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/stream_bridge/base.py:60` | HIGH |
| 10 | Checkpointer 支持 memory/sqlite/postgres | `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/checkpointer/async_provider.py:1` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/checkpointer/async_provider.py:7` | HIGH |
| 11 | RunEventStore 要求 thread 内 seq 严格递增 | `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/events/store/base.py:17` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/runtime/events/store/base.py:26` | HIGH |
| 12 | Subagent tool 明确适用/不适用场景，避免把简单任务也委派 | `analysis/repos/deer-flow/backend/packages/harness/deerflow/tools/builtins/task_tool.py:197` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/tools/builtins/task_tool.py:205` | HIGH |
| 13 | Subagent 不允许再启用 subagent tool，防止递归套娃 | `analysis/repos/deer-flow/backend/packages/harness/deerflow/tools/builtins/task_tool.py:262` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/tools/builtins/task_tool.py:278` | HIGH |
| 14 | SubagentLimitMiddleware 是硬限制，不只是 prompt 限制 | `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/middlewares/subagent_limit_middleware.py:25` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/middlewares/subagent_limit_middleware.py:35` | HIGH |
| 15 | Memory queue 以 thread/user/agent 分离，避免不同 agent 记忆混在一起 | `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/memory/queue.py:43` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/agents/memory/queue.py:50` | HIGH |
| 16 | Local sandbox 是 per-thread/user path scoping，不是全局共享工作区 | `analysis/repos/deer-flow/backend/packages/harness/deerflow/sandbox/local/local_sandbox_provider.py:34` 到 `analysis/repos/deer-flow/backend/packages/harness/deerflow/sandbox/local/local_sandbox_provider.py:63` | HIGH |
| 17 | 测试覆盖 run status、cancel、persistence、stream replay、rollback、blocking IO、memory queue、subagent limit | `analysis/repos/deer-flow/backend/tests/test_run_manager.py:18`、`analysis/repos/deer-flow/backend/tests/test_stream_bridge.py:143`、`analysis/repos/deer-flow/backend/tests/test_run_worker_rollback.py:96`、`analysis/repos/deer-flow/backend/tests/test_blocking_io_detector.py:29`、`analysis/repos/deer-flow/backend/tests/test_memory_queue.py:169`、`analysis/repos/deer-flow/backend/tests/test_subagent_limit_middleware.py:93` | HIGH |

## FACTS / INFERENCES / UNKNOWNS

### FACTS

- DeerFlow 自称 open-source super agent harness，编排 sub-agents、memory、sandboxes、skills。
- DeerFlow 用 LangGraph，并在 Gateway 中内嵌运行时。
- DeerFlow 把 run 生命周期、stream、checkpoint、store、event store 都做成独立 runtime 模块。
- DeerFlow 有 subagent tool，但同时限制并发，并禁止子 agent 再开子 agent。
- DeerFlow 有多层中间件处理摘要、记忆、工具错误、防循环、人工澄清。
- DeerFlow 有测试覆盖 run、stream、rollback、memory、subagent limit、blocking IO。

### INFERENCES

- DeerFlow 的长稳思路不是“让模型更聪明”，而是“让运行时更像任务系统”。推理链：RunManager 状态机 + StreamBridge + Checkpointer + EventStore + finally cleanup 都是运行时系统组件。
- DeerFlow 后期在修数据库锁、记忆隔离、blocking IO、auth secret persistence，说明长任务稳定性主要问题会出在并发、隔离、持久化、事件循环阻塞，而不是 prompt 文案。推理链：近期提交集中在 runtime/memory/tests/auth/sandbox。
- 对你的 Harness，最值得吸收的是 runtime pattern，不是 DeerFlow 的产品形态。推理链：你的目标是跨生态个性化 agent 编排，而 DeerFlow 更偏自身 super agent app；两者可共享 run/event/checkpoint/subagent guard 这类底层机制。

### UNKNOWNS

- 本次没有运行 DeerFlow，因此没有验证它在真实 10 小时任务、100+ subagent、Postgres/Redis 部署下的表现。
- Redis StreamBridge 在代码中标注 planned，但未实现，不能作为可复用成熟方案。
- DeerFlow 内部 subagent 是同一 harness 内的 agent，不等于你的跨生态 agent 扫描/调度，所以执行适配层仍需要你单独设计。

## 对你的 Harness：可吸收点

### P0：马上该内化

1. **RunManager 化**  
   当前 Harness 已有 run 文件，但需要统一状态机：`pending/running/success/error/interrupted/cancelled/timed_out`。同一 mission/thread 的并发策略必须是 `reject/interrupt/rollback`。

2. **EventStore 统一化**  
   把 `.harness/runs/<run_id>/events.jsonl` 作为主事实源；`evidence.jsonl` 可以变成 `category=evidence` 的 event，不再单独割裂。

3. **Delegate job stream 化**  
   每个 `job_<role>` 执行时持续写：`job.queued`、`job.started`、`job.stdout`、`job.stderr`、`job.report_written`、`job.completed/failed`。

4. **硬并发限制**  
   不管 Commander prompt 怎么写，runtime 必须限制一次最多启动几个 external agent。建议 MVP 默认 `max_parallel_delegate_jobs=3`。

5. **防递归套娃**  
   保留“agent 管 agent”的产品目标，但 runtime 上要限制深度：MVP 只允许 `Commander → Role Agent`。Role Agent 需要再委派时，写回 `delegation_request`，由 Commander 下一轮处理。

6. **角色记忆隔离**  
   学 DeerFlow 的 queue key：`mission_id + user_id + role_id + assigned_agent_id`。Research 的记忆不能污染 QA，Review 的失败经验也不能直接覆盖 Coding 的上下文。

7. **Workflow finally contract**  
   每个 run/job 不管成功失败，都必须写 end event 和 final state。否则入口模型会误以为还在跑，或者假完成。

### P1：下一阶段做

1. **Checkpoint backend 接口**  
   先文件，后 SQLite。把 mission/run/job/artifact 状态抽象成 store。

2. **Observe follow/reconnect**  
   `harness observe <run_id> --follow --after <seq>`。这就是本地版 `Last-Event-ID`。

3. **Rollback / interrupt**  
   先实现 job-level rollback：中断外部 CLI 时 job 标记 interrupted，未完成产物不进入 artifact DAG。

4. **Middleware chain**  
   把现在 policy/evidence/status protocol 变成 pipeline：`context inject → assignment guard → run guard → evidence guard → loop guard → report guard`。

5. **Blocking IO / hang detector 测试**  
   你的 TypeScript runtime 后续如果用 child_process，需要测 stdout 长输出、进程超时、取消、死锁。

### P2：组织级再做

1. SQLite/Postgres 状态库。  
2. Redis/IPC stream bridge。  
3. 多用户隔离。  
4. Web UI 或 dashboard。  
5. 真正跨机器 agent pool。

## 不该照搬的点

- **不要照搬 DeerFlow 的单一 super agent app 形态。** 你的核心差异是扫描用户已有 Codex/Claude/OpenCode/Gemini/Aider/Facebook 内置 agent 等，做跨生态个性化编排。
- **不要照搬无限 subagent。** DeerFlow 自己也限制 2-4 个并发并禁止嵌套；你的外部 agent 更不可控，更要限制。
- **不要一开始上 FastAPI/LangGraph 全栈。** 你的当前 MVP 是本地 CLI/plugin projection，先把文件事件、job state、adapter contract 做扎实。
- **不要把 UI 当核心。** DeerFlow 有完整前端，但你的产品最初判断是 plugin-first，不先做独立 UI。

## 复现路径：如果重写一个适合你的 Harness 长稳运行层

1. 定义核心状态模型：`Mission`、`Run`、`DelegateJob`、`Artifact`、`Event`。
2. 让入口 `orchestrate` 只做一件事：创建 mission，创建 run，进入 Commander-led workflow。
3. 增加 `RunManager`：同一 mission active run 检查；支持 `reject/interrupt/rollback`。
4. 增加 `EventStore`：append-only JSONL，thread/run 内递增 seq。
5. 改造 delegate runtime：spawn 外部 CLI 时实时写 stdout/stderr event；finally 写 end event。
6. 给每个角色 job 增加 timeout、cancel、max output bytes、report contract。
7. Commander prompt 只负责分解/派工/综合；runtime 负责硬限制、证据门禁、状态门禁。
8. 增加 `observe --follow --after <seq>`，让入口插件能持续看进度。
9. 加测试矩阵：run manager、stream replay、cancel、timeout、job report missing、evidence missing、QA fail retry。
10. 等本地文件版跑稳，再把 store 升级成 SQLite。

## 映射到你当前 Harness 的具体任务表

| 优先级 | DeerFlow 机制 | Harness 当前位置 | 建议改造 | 验收现象 |
|---|---|---|---|---|
| P0 | RunManager | `harness/src/core/workflow.ts`, `harness/src/core/runtime.ts` | 新增 `run-manager.ts`，统一 run 状态和并发策略 | 重复执行同一 mission 时会 reject 或 interrupt，而不是生成混乱 run |
| P0 | EventStore | `harness/src/core/evidence.ts`, `harness/src/core/runtime.ts` | 新增 `event-store.ts`，evidence/status/delegate output 全部写 event | `events.jsonl` 能完整复盘一次 run |
| P0 | StreamBridge 本地化 | `harness/src/core/observability.ts` | `observe --follow --after <seq>` | 运行中可以持续看到 role/job 事件 |
| P0 | Subagent hard limit | `harness/src/core/commander.ts`, `harness/src/core/delegate-runtime.ts` | 增加 `max_parallel_delegate_jobs` 和 job depth | Commander 不能一次启动 7 个外部 agent |
| P0 | no nested subagent | `harness/src/types/schema.ts` | 加 `delegation_depth` / `parent_job_id` | Role Agent 请求二次委派会被记录为 request，不会直接执行 |
| P1 | Checkpointer/Store | `harness/src/utils/fs.ts` | 抽象 `StateStore`，默认 file，预留 sqlite | 状态读写不散落在各模块 |
| P1 | Memory queue per agent | `harness/src/core/commander.ts` | 加 role memory namespace | Handoff 只带该角色相关记忆摘要 |
| P1 | Middleware chain | `harness/src/core/policy.ts`, `harness/src/core/status-protocol.ts` | 把 policy/evidence/status/loop 统一为 runtime middleware | 完成检查不靠 prompt 自觉 |
| P1 | Test matrix | `harness/tests/*` | 增加 cancel/timeout/stream/retry/recursive delegation tests | 长稳机制有回归测试 |

## 对产品方向的明确结论

DeerFlow 对你有用的不是“也做一个 DeerFlow”，而是它证明了：

- 长时间稳定运行必须有 **run 状态机**。
- 多 agent 编排必须有 **受控并发和防递归**。
- 任务进展必须有 **事件流和可重连观察**。
- 产物可信必须有 **append-only evidence/event store**。
- 长上下文必须有 **摘要和角色记忆隔离**。
- 外部工具必须有 **沙箱/工作区边界**。

这正好补你当前 Harness 的短板：你已经有大公司角色、Commander、agent discovery、handoff、delegate job、evidence gate；下一步不是扩角色，而是把 **RunManager + EventStore + Delegate Stream + Cancel/Timeout + Role Memory** 做实。

## 参考链接

- GitHub: https://github.com/bytedance/deer-flow
- 本地源码：`analysis/repos/deer-flow`
- 本地分析证据：`analysis/evidence/deer-flow.md`
