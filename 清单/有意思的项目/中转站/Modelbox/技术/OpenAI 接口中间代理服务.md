---
aliases:
---
 **Node.js 写的“OpenAI 接口中间代理服务”**
核心作用：在 `/v1/*` 前面加一层，做**请求转发 + 抓包日志 + mock 返回 + 管理接口**。

**它主要干什么**
- 起一个 HTTP 服务（默认 `127.0.0.1:8787`）。
- 接收 `/v1/chat/completions`、`/v1/responses`、`/v1/models` 等请求。
- 两种模式：
  - `passthrough`（默认）：转发到上游 `MODELBOX_UPSTREAM_BASE_URL`
  - `mock`：不调上游，直接返回模拟结果（支持普通 JSON 和 SSE 流式）
- 把请求/响应写入 `logs/modelbox.jsonl`（可配置），用于后续分析（你上一个 `analyze-log.mjs` 就是吃这个日志的）。
- 提供管理接口：
  - `GET /healthz` 健康检查
  - `GET /admin/state` 查看当前配置
  - `POST /admin/state` 动态改模式/日志路径/上游地址等（可用 token 保护）

**你可以把它理解成**
- Python 世界里的：`FastAPI/Flask + 反向代理 + 中间件日志 + mock server`
- Node 世界里的同类工具。

**关键价值**
- 调试 LLM 请求非常方便（看 prompt 大小、tools、角色分布、图片数量等 summary）
- 不改业务代码就能切 mock / 真上游
- 能记录流式响应片段和哈希，便于排查问题与复现

整体定位**
- 你这段 `mjs` 本质是一个“AI 网关/sidecar”：
- 一头接你的应用（客户端）
- 一头接真正模型服务（OpenAI 或兼容 API）
- 中间做观测、控制、兜底（日志、鉴权、mock、转发）

等价到 Python 生态就是：`FastAPI/Flask + 反向代理 + 中间件日志 + mock server`。

---

**1) FastAPI/Flask 角色：提供 HTTP API 服务**
- 它用 Node 的 `createServer` 起服务，等价 Python 里 `uvicorn + FastAPI`。
- 暴露接口：
  - `/v1/*`：模型相关请求入口
  - `/admin/*`：管理接口
  - `/healthz`：健康检查
- 这层负责路由、解析请求体、返回 JSON/SSE。

Python 对照（概念）：
- `@app.post("/v1/responses")`
- `@app.get("/healthz")`

---

**2) 反向代理角色：把请求转发到上游**
- 在 `passthrough` 模式，它会把请求原样（尽量）转发到 `MODELBOX_UPSTREAM_BASE_URL`。
- 做了典型代理动作：
  - 移除 hop-by-hop headers（connection、transfer-encoding 等）
  - 复制其它 headers
  - 可强制注入上游 API key（`authorization: Bearer ...`）
  - 支持路径前缀裁剪（`upstreamStripPrefix`）
- 响应也流式回传给客户端（包括 SSE 场景）。

Python 对照：
- 用 `httpx.AsyncClient` 做“转发代理”
- `StreamingResponse(upstream.aiter_bytes())` 透传流

---

**3) 中间件日志角色：请求/响应全链路记录**
它做了比普通 access log 更细的采集，像“可观测中间件”。

记录内容包括：
- `traceId`（每次请求唯一 ID）
- 请求头（可脱敏 authorization）
- 请求体（JSON 或原文）
- 请求体哈希（SHA256）
- summary：模型名、是否 stream、message 数、tools 数、图片计数、prompt 字符/token 近似
- 响应状态、响应头、响应体（可截断）、响应哈希、耗时

用途：
- 性能分析：prompt 太大、tools 太多
- 故障排查：请求与响应对不上时按 traceId 回放
- 安全审计：保留脱敏后的调用轨迹

---

**4) Mock Server 角色：离线模拟上游模型**
`mode=mock` 时不访问上游，直接按 OpenAI 风格返回：
- `/v1/chat/completions`
- `/v1/responses`
- `/v1/models`
并且支持：
- 非流式 JSON 返回
- 流式 SSE chunk 返回（含 `[DONE]`）

这点非常实用：
- 没网/没 key 也能联调前端或业务流程
- 压测接口时不花模型费用
- 稳定复现 UI 的流式渲染逻辑

---

**为什么要四者合一**
如果只用 FastAPI/Flask，你有 API 但缺“转发控制”；
只做代理，你看不到业务语义；
只打日志，没法离线 mock；
只 mock，没法接真实上游。
你这份脚本把四件事整合成一个“可切换的开发网关”。

---

**典型工作流（你现在这套）**
- 应用把请求发到 `modelbox:8787/v1/...`
- modelbox 记录 request（含 summary）
- 根据 mode：
  - `mock`：生成模拟响应并记录 response
  - `passthrough`：转发上游并记录 response
- 日志进入 `logs/modelbox.jsonl`
- 再用你前一个 `analyze-log.mjs` 做 prompt 分析

---

**在 Python 里你会怎么实现**
- Web 框架：FastAPI
- 转发：httpx（同步/异步）
- 流式：`StreamingResponse`
- 中间件：自定义 middleware + request/response body capture
- 日志：JSONL append（或 structlog/loguru）
- mock：按 OpenAI schema 返回 + SSE 事件生成器
- 管理口：`/admin/state` 修改运行态配置（注意鉴权）


```
#!/usr/bin/env node

import { createHash, randomUUID } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { Readable } from "node:stream";

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "host",
]);

const parseBool = (value, fallback) => {
  if (typeof value !== "string") {
    return fallback;
  }
  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) {
    return true;
  }
  if (["0", "false", "no", "off"].includes(normalized)) {
    return false;
  }
  return fallback;
};

const parsePositiveInt = (value, fallback) => {
  if (typeof value !== "string") {
    return fallback;
  }
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n) || n <= 0) {
    return fallback;
  }
  return n;
};

const normalizeMode = (value) => {
  const mode = String(value || "").trim().toLowerCase();
  return mode === "mock" ? "mock" : "passthrough";
};

const resolvePath = (value, fallback) => {
  const raw = String(value || "").trim();
  const target = raw || fallback;
  return path.isAbsolute(target) ? target : path.resolve(process.cwd(), target);
};

const envValue = (primary, fallback = undefined) => {
  const first = process.env[primary];
  if (typeof first === "string" && first.trim() !== "") {
    return first;
  }
  if (!fallback) {
    return first;
  }
  return process.env[fallback];
};

const state = {
  mode: normalizeMode(envValue("MODELBOX_MODE", "SIDECAR_MODE")),
  capture: parseBool(envValue("MODELBOX_CAPTURE", "SIDECAR_CAPTURE"), true),
  upstreamBaseUrl: String(
    envValue("MODELBOX_UPSTREAM_BASE_URL", "SIDECAR_UPSTREAM_BASE_URL") || "",
  ).trim(),
  upstreamApiKey: String(envValue("MODELBOX_UPSTREAM_API_KEY", "SIDECAR_UPSTREAM_API_KEY") || "").trim(),
  upstreamStripPrefix: String(
    envValue("MODELBOX_UPSTREAM_STRIP_PREFIX", "SIDECAR_UPSTREAM_STRIP_PREFIX") || "",
  ).trim(),
  adminToken: String(envValue("MODELBOX_ADMIN_TOKEN", "SIDECAR_ADMIN_TOKEN") || "").trim(),
  redactAuthHeaders: parseBool(
    envValue("MODELBOX_REDACT_AUTH_HEADERS", "SIDECAR_REDACT_AUTH_HEADERS"),
    true,
  ),
  logFile: resolvePath(
    envValue("MODELBOX_LOG_FILE", "SIDECAR_LOG_FILE"),
    "./logs/modelbox.jsonl",
  ),
  maxCaptureBytes: parsePositiveInt(
    envValue("MODELBOX_MAX_CAPTURE_BYTES", "SIDECAR_MAX_CAPTURE_BYTES"),
    2 * 1024 * 1024,
  ),
};

let writer = createWriter(state.logFile);

function createWriter(filePath) {
  const normalized = resolvePath(filePath, "./logs/modelbox.jsonl");
  const ready = mkdir(path.dirname(normalized), { recursive: true }).catch(() => undefined);
  let queue = Promise.resolve();
  return {
    filePath: normalized,
    write: (line) => {
      queue = queue
        .then(() => ready)
        .then(() => appendFile(normalized, line, "utf8"))
        .catch(() => undefined);
      return queue;
    },
  };
}

function setLogFile(nextPath) {
  state.logFile = resolvePath(nextPath, "./logs/modelbox.jsonl");
  writer = createWriter(state.logFile);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function safeJsonStringify(value) {
  try {
    return JSON.stringify(value, (_k, v) => {
      if (typeof v === "bigint") {
        return v.toString();
      }
      if (v instanceof Error) {
        return { name: v.name, message: v.message, stack: v.stack };
      }
      return v;
    });
  } catch {
    return JSON.stringify({ error: "failed_to_serialize" });
  }
}

function sanitizeHeaders(headers) {
  const out = {};
  for (const [rawKey, rawValue] of Object.entries(headers || {})) {
    const key = rawKey.toLowerCase();
    if (typeof rawValue === "undefined") {
      continue;
    }
    const value = Array.isArray(rawValue) ? rawValue.join(",") : String(rawValue);
    if (
      state.redactAuthHeaders &&
      (key === "authorization" || key === "x-api-key" || key === "proxy-authorization")
    ) {
      out[key] = "[REDACTED]";
    } else {
      out[key] = value;
    }
  }
  return out;
}

function collectImageCount(value) {
  let count = 0;
  const walk = (node) => {
    if (!node || typeof node !== "object") {
      return;
    }
    if (Array.isArray(node)) {
      for (const item of node) {
        walk(item);
      }
      return;
    }

    const record = node;
    const typeValue = typeof record.type === "string" ? record.type.toLowerCase() : "";
    if (typeValue.includes("image") || Object.hasOwn(record, "image_url") || Object.hasOwn(record, "image")) {
      count += 1;
    }
    for (const valueOfKey of Object.values(record)) {
      walk(valueOfKey);
    }
  };
  walk(value);
  return count;
}

function collectRoleCounts(items) {
  const roles = {};
  if (!Array.isArray(items)) {
    return roles;
  }
  for (const item of items) {
    if (!item || typeof item !== "object") {
      continue;
    }
    const role = typeof item.role === "string" ? item.role : "unknown";
    roles[role] = (roles[role] || 0) + 1;
  }
  return roles;
}

function inferMessageItems(pathname, payload) {
  if (!payload || typeof payload !== "object") {
    return [];
  }
  if (pathname === "/v1/chat/completions" && Array.isArray(payload.messages)) {
    return payload.messages;
  }
  if (pathname === "/v1/responses") {
    if (Array.isArray(payload.input)) {
      return payload.input;
    }
    if (typeof payload.input === "string" && payload.input) {
      return [{ role: "user", content: [{ type: "input_text", text: payload.input }] }];
    }
  }
  return [];
}

function buildSummary({ traceId, pathname, payload, bodyText }) {
  const messageItems = inferMessageItems(pathname, payload);
  const toolsCount =
    payload && typeof payload === "object" && Array.isArray(payload.tools) ? payload.tools.length : 0;
  const promptSource =
    payload && typeof payload === "object" && Object.hasOwn(payload, "input")
      ? payload.input
      : payload && typeof payload === "object" && Array.isArray(payload.messages)
        ? payload.messages
        : bodyText;
  const promptSerialized = safeJsonStringify(promptSource) || "";
  const promptChars = promptSerialized.length;
  // Approximate token count without model-specific tokenizer dependency.
  const promptTokensApprox = promptSerialized ? Math.ceil(Buffer.byteLength(promptSerialized, "utf8") / 4) : 0;

  return {
    traceId,
    route: pathname,
    model: payload && typeof payload === "object" ? payload.model || null : null,
    stream: Boolean(payload && typeof payload === "object" && payload.stream === true),
    messageCount: Array.isArray(messageItems) ? messageItems.length : 0,
    roles: collectRoleCounts(messageItems),
    toolsCount,
    imagesCount: collectImageCount(payload),
    promptChars,
    promptTokensApprox,
  };
}

function buildDebugText(summary) {
  return `DEBUG_CONTEXT_SUMMARY ${safeJsonStringify(summary)}`;
}

function createTraceId() {
  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(now.getUTCDate()).padStart(2, "0")}_${String(now.getUTCHours()).padStart(2, "0")}${String(now.getUTCMinutes()).padStart(2, "0")}${String(now.getUTCSeconds()).padStart(2, "0")}`;
  return `ctx_${stamp}_${randomUUID().slice(0, 8)}`;
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

function sendJson(res, statusCode, payload, headers = {}) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
    ...headers,
  });
  res.end(body);
}

function setSseHeaders(res) {
  res.writeHead(200, {
    "content-type": "text/event-stream",
    "cache-control": "no-cache, no-transform",
    connection: "keep-alive",
  });
}

function writeSse(res, data) {
  const body = typeof data === "string" ? data : JSON.stringify(data);
  res.write(`data: ${body}\n\n`);
}

function writeDone(res) {
  res.write("data: [DONE]\n\n");
}

function createResponseResource({ responseId, outputItemId, model, text, createdAt }) {
  return {
    id: responseId,
    object: "response",
    created_at: createdAt,
    status: "completed",
    error: null,
    model,
    output: [
      {
        id: outputItemId,
        type: "message",
        role: "assistant",
        status: "completed",
        content: [{ type: "output_text", text, annotations: [] }],
      },
    ],
    output_text: text,
    usage: {
      input_tokens: 0,
      output_tokens: 0,
      total_tokens: 0,
      input_tokens_details: { cached_tokens: 0 },
      output_tokens_details: { reasoning_tokens: 0 },
    },
  };
}

function createChatCompletionResource({ completionId, model, text, createdAt }) {
  return {
    id: completionId,
    object: "chat.completion",
    created: createdAt,
    model,
    choices: [
      {
        index: 0,
        message: { role: "assistant", content: text },
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0,
    },
  };
}

function applyForwardHeaders(reqHeaders) {
  const headers = new Headers();
  for (const [keyRaw, valueRaw] of Object.entries(reqHeaders || {})) {
    const key = keyRaw.toLowerCase();
    if (HOP_BY_HOP_HEADERS.has(key) || key === "content-length") {
      continue;
    }
    if (typeof valueRaw === "undefined") {
      continue;
    }
    if (Array.isArray(valueRaw)) {
      headers.set(keyRaw, valueRaw.join(","));
    } else {
      headers.set(keyRaw, String(valueRaw));
    }
  }
  if (state.upstreamApiKey) {
    headers.set("authorization", `Bearer ${state.upstreamApiKey}`);
  }
  return headers;
}

function mergeUrl(baseUrl, incomingPathAndQuery) {
  const base = new URL(baseUrl);
  const incoming = new URL(incomingPathAndQuery, "http://modelbox.local");
  let incomingPathname = incoming.pathname;
  const stripPrefixRaw = state.upstreamStripPrefix;
  if (stripPrefixRaw) {
    const stripPrefix = stripPrefixRaw.startsWith("/") ? stripPrefixRaw : `/${stripPrefixRaw}`;
    if (incomingPathname === stripPrefix) {
      incomingPathname = "/";
    } else if (incomingPathname.startsWith(`${stripPrefix}/`)) {
      incomingPathname = incomingPathname.slice(stripPrefix.length);
    }
  }
  const basePath = base.pathname.replace(/\/+$/, "");
  const incomingPath = incomingPathname.replace(/^\/+/, "");
  const pathname = `${basePath}/${incomingPath}`.replace(/\/+/g, "/");
  return `${base.origin}${pathname}${incoming.search}`;
}

function getPublicState() {
  return {
    mode: state.mode,
    capture: state.capture,
    upstreamBaseUrl: state.upstreamBaseUrl || null,
    hasUpstreamApiKey: Boolean(state.upstreamApiKey),
    upstreamStripPrefix: state.upstreamStripPrefix || null,
    logFile: state.logFile,
    maxCaptureBytes: state.maxCaptureBytes,
  };
}

function adminAuthorized(req) {
  if (!state.adminToken) {
    return true;
  }
  const auth = req.headers.authorization;
  const bearer = typeof auth === "string" ? auth.replace(/^Bearer\s+/i, "").trim() : "";
  const token =
    bearer ||
    (typeof req.headers["x-modelbox-token"] === "string"
      ? req.headers["x-modelbox-token"]
      : typeof req.headers["x-sidecar-token"] === "string"
        ? req.headers["x-sidecar-token"]
        : "");
  return token === state.adminToken;
}

function eventBase({ traceId, req, pathname, method }) {
  return {
    ts: new Date().toISOString(),
    traceId,
    mode: state.mode,
    method,
    path: pathname,
    query: (() => {
      const url = new URL(req.url || pathname, "http://modelbox.local");
      return Object.fromEntries(url.searchParams.entries());
    })(),
  };
}

function captureEvent(event) {
  if (!state.capture) {
    return;
  }
  const line = safeJsonStringify(event);
  if (!line) {
    return;
  }
  void writer.write(`${line}\n`);
}

function respondMock({ req, res, pathname, bodyJson, traceId, summary }) {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const model =
    bodyJson && typeof bodyJson === "object" && typeof bodyJson.model === "string"
      ? bodyJson.model
      : "mock-model";
  const text = buildDebugText(summary);

  if (pathname === "/v1/chat/completions") {
    if (bodyJson?.stream === true) {
      const chunkId = `chatcmpl_${randomUUID()}`;
      setSseHeaders(res);
      writeSse(res, {
        id: chunkId,
        object: "chat.completion.chunk",
        created: nowSeconds,
        model,
        choices: [{ index: 0, delta: { role: "assistant" }, finish_reason: null }],
      });
      writeSse(res, {
        id: chunkId,
        object: "chat.completion.chunk",
        created: nowSeconds,
        model,
        choices: [{ index: 0, delta: { content: text }, finish_reason: null }],
      });
      writeSse(res, {
        id: chunkId,
        object: "chat.completion.chunk",
        created: nowSeconds,
        model,
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      });
      writeDone(res);
      res.end();

      captureEvent({
        ...eventBase({ traceId, req, pathname, method: req.method || "POST" }),
        direction: "response",
        source: "mock",
        status: 200,
        stream: true,
        responsePreview: text,
      });
      return;
    }

    const completionId = `chatcmpl_${randomUUID()}`;
    const payload = createChatCompletionResource({
      completionId,
      model,
      text,
      createdAt: nowSeconds,
    });
    sendJson(res, 200, payload);
    captureEvent({
      ...eventBase({ traceId, req, pathname, method: req.method || "POST" }),
      direction: "response",
      source: "mock",
      status: 200,
      stream: false,
      response: payload,
      responseSha256: sha256(JSON.stringify(payload)),
    });
    return;
  }

  if (pathname === "/v1/models") {
    const payload = {
      object: "list",
      data: [{ id: model, object: "model", created: nowSeconds, owned_by: "modelbox" }],
    };
    sendJson(res, 200, payload);
    captureEvent({
      ...eventBase({ traceId, req, pathname, method: req.method || "GET" }),
      direction: "response",
      source: "mock",
      status: 200,
      response: payload,
      responseSha256: sha256(JSON.stringify(payload)),
    });
    return;
  }

  if (pathname === "/v1/responses") {
    const responseId = `resp_${randomUUID()}`;
    const outputItemId = `msg_${randomUUID()}`;

    if (bodyJson?.stream === true) {
      setSseHeaders(res);
      const initialResponse = {
        id: responseId,
        object: "response",
        created_at: nowSeconds,
        status: "in_progress",
        error: null,
        model,
        output: [],
      };
      writeSse(res, { type: "response.created", response: initialResponse });
      writeSse(res, { type: "response.in_progress", response: initialResponse });
      writeSse(res, {
        type: "response.output_item.added",
        output_index: 0,
        item: {
          id: outputItemId,
          type: "message",
          role: "assistant",
          status: "in_progress",
          content: [],
        },
      });
      writeSse(res, {
        type: "response.content_part.added",
        item_id: outputItemId,
        output_index: 0,
        content_index: 0,
        part: { type: "output_text", text: "" },
      });
      writeSse(res, {
        type: "response.output_text.delta",
        item_id: outputItemId,
        output_index: 0,
        content_index: 0,
        delta: text,
      });
      writeSse(res, {
        type: "response.output_text.done",
        item_id: outputItemId,
        output_index: 0,
        content_index: 0,
        text,
      });
      writeSse(res, {
        type: "response.content_part.done",
        item_id: outputItemId,
        output_index: 0,
        content_index: 0,
        part: { type: "output_text", text },
      });

      const completed = createResponseResource({
        responseId,
        outputItemId,
        model,
        text,
        createdAt: nowSeconds,
      });
      writeSse(res, { type: "response.output_item.done", output_index: 0, item: completed.output[0] });
      writeSse(res, { type: "response.completed", response: completed });
      writeDone(res);
      res.end();

      captureEvent({
        ...eventBase({ traceId, req, pathname, method: req.method || "POST" }),
        direction: "response",
        source: "mock",
        status: 200,
        stream: true,
        responsePreview: text,
      });
      return;
    }

    const payload = createResponseResource({
      responseId,
      outputItemId,
      model,
      text,
      createdAt: nowSeconds,
    });
    sendJson(res, 200, payload);
    captureEvent({
      ...eventBase({ traceId, req, pathname, method: req.method || "POST" }),
      direction: "response",
      source: "mock",
      status: 200,
      stream: false,
      response: payload,
      responseSha256: sha256(JSON.stringify(payload)),
    });
    return;
  }

  sendJson(res, 404, {
    error: {
      type: "not_found",
      message: `mock mode does not implement ${pathname}`,
    },
  });
}

async function respondPassthrough({ req, res, traceId, pathname, bodyBuffer }) {
  if (!state.upstreamBaseUrl) {
    sendJson(res, 502, {
      error: {
        type: "misconfigured_modelbox",
        message: "MODELBOX_UPSTREAM_BASE_URL is required in passthrough mode",
      },
    });
    captureEvent({
      ...eventBase({ traceId, req, pathname, method: req.method || "GET" }),
      direction: "response",
      source: "passthrough",
      status: 502,
      error: "missing_upstream_base_url",
    });
    return;
  }

  const targetUrl = mergeUrl(state.upstreamBaseUrl, req.url || pathname);
  const method = req.method || "GET";
  const headers = applyForwardHeaders(req.headers);
  const startedAt = Date.now();

  let upstreamRes;
  try {
    upstreamRes = await fetch(targetUrl, {
      method,
      headers,
      body: ["GET", "HEAD"].includes(method) ? undefined : bodyBuffer,
      redirect: "manual",
    });
  } catch (error) {
    sendJson(res, 502, {
      error: {
        type: "upstream_error",
        message: error instanceof Error ? error.message : String(error),
      },
    });
    captureEvent({
      ...eventBase({ traceId, req, pathname, method }),
      direction: "response",
      source: "passthrough",
      status: 502,
      upstreamUrl: targetUrl,
      durationMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : String(error),
    });
    return;
  }

  const responseHeaders = {};
  for (const [key, value] of upstreamRes.headers.entries()) {
    const lower = key.toLowerCase();
    if (HOP_BY_HOP_HEADERS.has(lower) || lower === "content-length") {
      continue;
    }
    responseHeaders[key] = value;
  }

  res.writeHead(upstreamRes.status, responseHeaders);

  if (!upstreamRes.body) {
    res.end();
    captureEvent({
      ...eventBase({ traceId, req, pathname, method }),
      direction: "response",
      source: "passthrough",
      status: upstreamRes.status,
      upstreamUrl: targetUrl,
      durationMs: Date.now() - startedAt,
      headers: sanitizeHeaders(responseHeaders),
    });
    return;
  }

  const stream = Readable.fromWeb(upstreamRes.body);
  const captured = [];
  let capturedBytes = 0;
  let totalBytes = 0;
  let truncated = false;

  stream.on("data", (chunk) => {
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    totalBytes += buf.length;

    if (!state.capture || state.maxCaptureBytes <= 0) {
      return;
    }

    const remaining = state.maxCaptureBytes - capturedBytes;
    if (remaining <= 0) {
      truncated = true;
      return;
    }

    if (buf.length <= remaining) {
      captured.push(buf);
      capturedBytes += buf.length;
      return;
    }

    captured.push(buf.subarray(0, remaining));
    capturedBytes += remaining;
    truncated = true;
  });

  stream.on("end", () => {
    const capturedBody = Buffer.concat(captured);
    const responseText = capturedBody.toString("utf8");
    captureEvent({
      ...eventBase({ traceId, req, pathname, method }),
      direction: "response",
      source: "passthrough",
      status: upstreamRes.status,
      upstreamUrl: targetUrl,
      durationMs: Date.now() - startedAt,
      headers: sanitizeHeaders(responseHeaders),
      body: state.capture ? responseText : undefined,
      bodySha256: state.capture ? sha256(capturedBody) : undefined,
      bodyBytes: totalBytes,
      bodyTruncated: truncated,
    });
  });

  stream.on("error", (error) => {
    captureEvent({
      ...eventBase({ traceId, req, pathname, method }),
      direction: "response",
      source: "passthrough",
      status: upstreamRes.status,
      upstreamUrl: targetUrl,
      durationMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : String(error),
    });
    if (!res.writableEnded) {
      res.end();
    }
  });

  stream.pipe(res);
}

async function handleAdmin(req, res, pathname) {
  if (!adminAuthorized(req)) {
    sendJson(res, 401, { error: "unauthorized" });
    return;
  }

  if (req.method === "GET" && pathname === "/admin/state") {
    sendJson(res, 200, getPublicState());
    return;
  }

  if (req.method === "POST" && pathname === "/admin/state") {
    const bodyBuffer = await readBody(req);
    const bodyText = bodyBuffer.toString("utf8");
    const bodyJson = safeJsonParse(bodyText);
    if (!bodyJson || typeof bodyJson !== "object") {
      sendJson(res, 400, { error: "invalid_json" });
      return;
    }

    if (Object.hasOwn(bodyJson, "mode")) {
      state.mode = normalizeMode(bodyJson.mode);
    }
    if (Object.hasOwn(bodyJson, "capture")) {
      state.capture = Boolean(bodyJson.capture);
    }
    if (typeof bodyJson.upstreamBaseUrl === "string") {
      state.upstreamBaseUrl = bodyJson.upstreamBaseUrl.trim();
    }
    if (typeof bodyJson.upstreamApiKey === "string") {
      state.upstreamApiKey = bodyJson.upstreamApiKey.trim();
    }
    if (typeof bodyJson.upstreamStripPrefix === "string") {
      state.upstreamStripPrefix = bodyJson.upstreamStripPrefix.trim();
    }
    if (typeof bodyJson.maxCaptureBytes === "number" && bodyJson.maxCaptureBytes > 0) {
      state.maxCaptureBytes = Math.floor(bodyJson.maxCaptureBytes);
    }
    if (typeof bodyJson.logFile === "string" && bodyJson.logFile.trim()) {
      setLogFile(bodyJson.logFile.trim());
    }

    sendJson(res, 200, getPublicState());
    return;
  }

  sendJson(res, 404, { error: "not_found" });
}

const server = createServer(async (req, res) => {
  try {
    const host = req.headers.host || "127.0.0.1";
    const url = new URL(req.url || "/", `http://${host}`);
    const pathname = url.pathname;

    if (req.method === "GET" && pathname === "/healthz") {
      sendJson(res, 200, {
        ok: true,
        service: "modelbox",
        mode: state.mode,
        capture: state.capture,
      });
      return;
    }

    if (pathname.startsWith("/admin/")) {
      await handleAdmin(req, res, pathname);
      return;
    }

    if (!pathname.startsWith("/v1/")) {
      sendJson(res, 404, {
        error: {
          type: "not_found",
          message: `unknown path: ${pathname}`,
        },
      });
      return;
    }

    const traceId = createTraceId();
    const method = req.method || "GET";
    const bodyBuffer = ["GET", "HEAD"].includes(method) ? Buffer.alloc(0) : await readBody(req);
    const bodyText = bodyBuffer.toString("utf8");
    const bodyJson = bodyText ? safeJsonParse(bodyText) : null;
    const summary = buildSummary({
      traceId,
      pathname,
      payload: bodyJson,
      bodyText,
    });

    captureEvent({
      ...eventBase({ traceId, req, pathname, method }),
      direction: "request",
      headers: sanitizeHeaders(req.headers),
      body: bodyJson ?? bodyText,
      bodySha256: sha256(bodyBuffer),
      summary,
    });

    if (state.mode === "mock") {
      respondMock({ req, res, pathname, bodyJson, traceId, summary });
      return;
    }

    await respondPassthrough({ req, res, traceId, pathname, bodyBuffer });
  } catch (error) {
    sendJson(res, 500, {
      error: {
        type: "modelbox_error",
        message: error instanceof Error ? error.message : String(error),
      },
    });
  }
});

const bind = String(envValue("MODELBOX_BIND", "SIDECAR_BIND") || "127.0.0.1").trim() || "127.0.0.1";
const port = parsePositiveInt(envValue("MODELBOX_PORT", "SIDECAR_PORT"), 8787);

server.listen(port, bind, () => {
  const startup = {
    service: "modelbox",
    bind,
    port,
    mode: state.mode,
    capture: state.capture,
    upstreamBaseUrl: state.upstreamBaseUrl || null,
    hasUpstreamApiKey: Boolean(state.upstreamApiKey),
    logFile: state.logFile,
    maxCaptureBytes: state.maxCaptureBytes,
  };
  process.stdout.write(`${JSON.stringify(startup)}\n`);
});
```