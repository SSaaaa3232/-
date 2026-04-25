---
title: "cclank/modelbox: ModelBox: OpenAI-protocol proxy for context debugging (mock/passthrough + payload capture)"
source: "https://github.com/cclank/modelbox/blob/main/README.md"
author:
published:
created: 2026-04-25
---
## ModelBox 

OpenAI-protocol proxy for context debugging, traffic capture, and safe mocking.  
ModelBox 是用于上下文调试、流量捕获和安全模拟的 OpenAI 协议代理。

## Why ModelBox 

ModelBox sits between your agent and model provider so you can inspect what is actually sent to the model.  
ModelBox 位于智能体与模型提供者之间，因此你可以查看实际发送给模型的内容。

- Capture full request/response payloads as JSONL with `traceId`  
	以 JSONL 格式捕获完整的请求/响应数据，使用 `traceId` 进行标记
- Switch between `mock` and `passthrough` without restarting  
	无需重启即可在这两个选项之间切换
- Keep OpenAI-compatible clients unchanged (`/v1/responses`, `/v1/chat/completions`)  
	保持与 OpenAI 兼容的客户端不变（ `/v1/responses` 、 `/v1/chat/completions` ）
- Debug context safely without polluting upstream model behavior  
	在不影响上游模型行为的情况下安全地进行调试

## Features 特性

| Capability 能力/实力                            | Description 描述                                                                                        |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| OpenAI-compatible endpoints   兼容 OpenAI 的端点 | `POST /v1/responses`, `POST /v1/chat/completions`, `GET /v1/models`                                   |
| Runtime control 运行时控制                       | `GET/POST /admin/state` to switch mode, capture, upstream   `GET/POST /admin/state` 切换模式：捕获、上行传输      |
| Structured logs 结构化日志                       | JSONL records for request/response with digest and summary   包含摘要和概要的请求/响应 JSONL 记录                   |
| Mock mode 模拟模式                              | Returns deterministic `DEBUG_CONTEXT_SUMMARY {...}` output   生成确定的 `DEBUG_CONTEXT_SUMMARY {...}` 输出结果 |
| Passthrough mode 直通模式                       | Relays traffic to your real upstream model provider   将流量中转至您真实的上游模型提供商                               |

## Architecture 

```
flowchart LR
  A[Agent / App] -->|OpenAI API| B[ModelBox]
  B -->|passthrough| C[Upstream Provider]
  B -->|JSONL capture| D[(logs/modelbox.jsonl)]
  E[Admin API] -->|/admin/state| B
```

## Quick Start 

### 1\. Start in mock mode1. 从模拟模式开始

```
MODELBOX_MODE=mock npm start
```

Default bind: `127.0.0.1:8787`.默认绑定： `127.0.0.1:8787` 。

### 2\. Start in passthrough mode2. 以透传模式启动

```
MODELBOX_MODE=passthrough \
MODELBOX_UPSTREAM_BASE_URL=https://api.openai.com \
MODELBOX_UPSTREAM_API_KEY="$OPENAI_API_KEY" \
npm start
```

Note: `MODELBOX_UPSTREAM_BASE_URL` should be provider root URL (for OpenAI use `https://api.openai.com`, not `/v1`).  
注意： `MODELBOX_UPSTREAM_BASE_URL` 应该是提供者根 URL（对于 OpenAI 使用 `https://api.openai.com` ，而不是 `/v1` ）。

### 3\. Gemini (OpenAI-compatible endpoint)3. Gemini（兼容 OpenAI 的端点）

Gemini's OpenAI-compatible endpoint usually expects `/chat/completions` (without local `/v1` prefix).  
Gemini 与 OpenAI 兼容的端点通常期望接收 `/chat/completions` 格式的输入（不带本地 `/v1` 前缀）。  
Use `MODELBOX_UPSTREAM_STRIP_PREFIX=/v1` so ModelBox rewrites `/v1/chat/completions` to `/chat/completions` upstream.  
使用 `MODELBOX_UPSTREAM_STRIP_PREFIX=/v1` ，这样 ModelBox 会在上游将 `/v1/chat/completions` 重写为 `/chat/completions` 。

```
MODELBOX_MODE=passthrough \
MODELBOX_UPSTREAM_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai \
MODELBOX_UPSTREAM_API_KEY="$GEMINI_API_KEY" \
MODELBOX_UPSTREAM_STRIP_PREFIX=/v1 \
npm start
```

## OpenClaw Integration OpenClaw 集成

### Configure provider 配置提供程序

```
openclaw config set models.providers.modelbox --json '{
  "baseUrl": "http://127.0.0.1:8787/v1",
  "api": "openai-responses",
  "apiKey": "modelbox-local",
  "models": [
    {
      "id": "debug-model",
      "name": "debug-model",
      "reasoning": false,
      "input": ["text", "image"],
      "cost": { "input": 0, "output": 0, "cacheRead": 0, "cacheWrite": 0 },
      "contextWindow": 1000000,
      "maxTokens": 131072
    }
  ]
}'
```

### Switch to ModelBox in current session在当前会话中切换到 ModelBox

```
/model modelbox/debug-model
# or
/new modelbox/debug-model
```

If you use `agents.defaults.models` allowlist, include `modelbox/debug-model` there so `/model` and session overrides can use it.  
如果你使用 `agents.defaults.models` 白名单，请包含 `modelbox/debug-model` 以便 `/model` 和会话覆盖可以使用它。

## Generic Integration (Any Agent)通用集成（任何代理）

1. Set base URL to `http://127.0.0.1:8787/v1`  
	将基础 URL 设置为 `http://127.0.0.1:8787/v1`
2. Keep your OpenAI-compatible SDK/client unchanged  
	保持你的 OpenAI 兼容的 SDK/客户端不变
3. Use `MODELBOX_MODE=mock` for local context debugging  
	使用 `MODELBOX_MODE=mock` 进行本地上下文调试
4. Use `MODELBOX_MODE=passthrough` for transparent relay  
	使用 `MODELBOX_MODE=passthrough` 进行透明中继

## Admin API 管理 API

### Read state 读取状态

```
curl -s http://127.0.0.1:8787/admin/state
```

### Update state at runtime 在运行时更新状态

```
curl -s -X POST http://127.0.0.1:8787/admin/state \
  -H 'Content-Type: application/json' \
  -d '{
    "mode": "passthrough",
    "capture": true,
    "upstreamBaseUrl": "https://api.openai.com",
    "upstreamStripPrefix": "",
    "maxCaptureBytes": 4194304
  }'
```

If `MODELBOX_ADMIN_TOKEN` is configured, pass:  
如果已配置 `MODELBOX_ADMIN_TOKEN` ，请传递：

```
-H 'Authorization: Bearer <token>'
```

## Environment Variables 环境变量

| Variable 变量 | Default 默认 | Description 描述 |
| --- | --- | --- |
| `MODELBOX_BIND` | `127.0.0.1` | Bind address 绑定地址 |
| `MODELBOX_PORT` | `8787` | Listen port 监听端口 |
| `MODELBOX_MODE` | `passthrough` | `mock` or `passthrough` `mock` 或 `passthrough` |
| `MODELBOX_CAPTURE` | `true` | Enable JSONL capture 启用 JSONL 捕获 |
| `MODELBOX_LOG_FILE` | `./logs/modelbox.jsonl` | Log output file 日志输出文件 |
| `MODELBOX_MAX_CAPTURE_BYTES` | `2097152` | Max captured response bytes   最大捕获响应字节数 |
| `MODELBOX_UPSTREAM_BASE_URL` | empty 空 | Upstream base URL (required in passthrough)   上游基础 URL（passthrough 中必需） |
| `MODELBOX_UPSTREAM_API_KEY` | empty 空 | Optional upstream API key override   可选的上游 API 密钥覆盖 |
| `MODELBOX_UPSTREAM_STRIP_PREFIX` | empty 空 | Optional path prefix stripped before forwarding (for example `/v1`)   转发前移除可选路径前缀（例如 `/v1` ） |
| `MODELBOX_ADMIN_TOKEN` | empty 空 | Optional admin API token   可选的管理员 API 令牌 |

Capture logs are written to `MODELBOX_LOG_FILE` (default `./logs/modelbox.jsonl`), resolved relative to the process working directory.  
捕获日志被写入到 `MODELBOX_LOG_FILE` (默认 `./logs/modelbox.jsonl` )，相对于进程工作目录解析。

Backward compatibility: legacy `SIDECAR_*` variables are still accepted.  
向后兼容性：遗留 `SIDECAR_*` 变量仍然被接受。

## Log Format 日志格式

Each JSONL line includes key fields such as:  
每行 JSONL 数据都包含以下关键字段：

- `traceId`
- `direction` (`request` or `response`)  
	`direction` ( `request` 或 `response` )
- `mode` (`mock` or `passthrough`)  
	`mode` ( `mock` 或 `passthrough` )
- `path`, `method`, `status`
- `summary` (`messageCount`, `roles`, `toolsCount`, `imagesCount`, `promptChars`, `promptTokensApprox`)
- `body` and `bodySha256` `body` 和 `bodySha256`

Mock output text is intentionally compact:  
模拟输出文本故意紧凑：

```
DEBUG_CONTEXT_SUMMARY {...}
```

## Prompt Breakdown Script 提示分解脚本

Use the built-in analyzer to split a captured request into major prompt blocks and estimate token cost per block.  
使用内置分析器将捕获的请求拆分为主要提示块并估计每个块的令牌成本。

```
npm run analyze:prompt -- --file logs/modelbox.jsonl
```

Useful options:实用选项：

- `--traceId <id>`: analyze one trace directly  
	`--traceId <id>` ：直接分析一条跟踪记录
- `--index <n>`: pick a request record by index (`-1` = latest)  
	`--index <n>` ：通过索引选择请求记录（ `-1` 表示最新记录）
- `--json`: machine-readable output  
	`--json`: 机器可读的输出

## Advanced Analyzer (Python)高级分析器（Python）

For multi-record summary, tool-by-tool schema size breakdown, and cross-request diffing, use the Python analyzer under [`tools/`](https://github.com/cclank/modelbox/blob/main/tools/README.md):  
如需多条记录的汇总、各工具的 schema 大小明细以及跨请求的差异对比，请使用 `tools/` 下的 Python 分析工具：

```
python3 tools/analyze.py logs/modelbox.jsonl            # overview of every record
python3 tools/analyze.py logs/modelbox.jsonl tokens 0   # token distribution bar chart
python3 tools/analyze.py logs/modelbox.jsonl tools 0    # tools sorted by schema size + % of total
python3 tools/analyze.py logs/modelbox.jsonl diff 0 1   # compare two requests (prefix-cache check)
python3 tools/analyze.py logs/modelbox.jsonl extract 0  # dump system/messages/tools to files
```

Unlike `summary.promptTokensApprox` (which only counts `messages`), this analyzer also measures the `tools` field — in modern agents the tools schema often equals or exceeds the system prompt in size. See [`tools/README.md`](https://github.com/cclank/modelbox/blob/main/tools/README.md) for all commands and examples.  
与 `summary.promptTokensApprox` 不同（ `summary.promptTokensApprox` 仅统计 `messages` ），该分析工具还会统计 `tools` 字段。在现代智能体中，工具相关的 schema 在大小上通常与系统提示信息相当，甚至更大。有关所有命令和示例，请参见 `tools/README.md` 。

# 脚本-捕获日志

## ModelBox Tools 

Utility scripts for analyzing ModelBox capture logs.  
用于分析 ModelBox 捕获日志的实用脚本。

## analyze.py

Offline analyzer for `logs/modelbox.jsonl` (or any capture file in the same format). Breaks down each `/v1/chat/completions` request into its component sizes — **system prompt**, **conversation messages**, and **tools schema** — so you can see where your input tokens actually go.  
`logs/modelbox.jsonl` 的离线分析器（或任何相同格式的捕获文件）。将每个 `/v1/chat/completions` 请求分解为其组成部分的大小——系统提示、对话消息和工具架构——以便您可以看到您的输入标记实际上去了哪里。

### Why you need this 为什么需要这个

ModelBox's built-in `summary.promptTokensApprox` only counts `messages`. It does **not** include the `tools` field, which for modern agents often rivals or exceeds the system prompt in size. This script measures every part of the request, including tools.  
ModelBox 的内置 `summary.promptTokensApprox` 仅计算 `messages` 。它不包括 `tools` 字段，对于现代代理来说，该字段的大小往往与系统提示语相当或更大。此脚本测量请求的每个部分，包括工具。

### Quick start 快速入门

```
# 1. Capture some traffic via ModelBox
MODELBOX_MODE=mock npm start
# ... run your agent ...

# 2. Analyze the capture
python3 tools/analyze.py logs/modelbox.jsonl            # overview
python3 tools/analyze.py logs/modelbox.jsonl tokens 0   # token breakdown of first chat request
python3 tools/analyze.py logs/modelbox.jsonl tools 0    # tools sorted by schema size
```

Optional: `pip install tiktoken` for accurate `cl100k_base` token counts (without it the script falls back to `chars / 4`).  
可选： `pip install tiktoken` 用于准确的 `cl100k_base` token 计数（没有它，脚本会回退到 `chars / 4` ）。

### Commands

| Command | Description |
| --- | --- |
| `summary` (default) | Record type distribution + chat request list + error summary |
| `list` | Every record on one line with raw line index |
| `chats` | All `/v1/chat/completions` requests with basic stats |
| `record <N>` | Full per-message + tools breakdown of chat request #N |
| `tokens <N>` | Token distribution chart (sorted bars) for chat request #N |
| `tools <N>` | All tools sorted by schema byte size, with % of total |
| `messages <N>` | Per-message content preview (truncated for long content) |
| `extract <N> [dir]` | Dump `system_prompt.md`, `messages.json`, `tools/*.json`, `meta.json` to a directory |
| `diff <A> <B>` | Compare two chat requests: sizes, tools diff, system prompt hash |

`N` is the **0-based index into chat/completions requests**, not the raw file line number. Use `list` to see raw line indices.

### Example output

```
$ python3 tools/analyze.py logs/modelbox.jsonl tokens 1

=== Token distribution (chat request #1) ===

组件                               tokens      占比  图示
--------------------------------------------------------------------------------
tools_schema                       9712   51.3%  █████████████████████████
system_prompt                      9182   48.5%  ████████████████████████
msg[3].user                          36    0.2%
msg[2].assistant                     10    0.1%
msg[1].user                           3    0.0%
--------------------------------------------------------------------------------
TOTAL                             18943  100.0%
```

This shows the tools schema is actually slightly larger than the system prompt — information ModelBox's own summary field misses.

### Typical workflows

**Find out why a request is big**

```
python3 tools/analyze.py logs/modelbox.jsonl tokens 0
python3 tools/analyze.py logs/modelbox.jsonl tools 0   # drill down into tools
```

**Check if prefix cache should be hitting**

```
python3 tools/analyze.py logs/modelbox.jsonl diff 0 1
# Look for: tools identical + system prompt hash identical = cache-friendly
```

**Save a system prompt for manual inspection**

```
python3 tools/analyze.py logs/modelbox.jsonl extract 0 ./debug/
cat ./debug/system_prompt.md
ls ./debug/tools/
```