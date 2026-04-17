# WebSocket 技术全解

## 一、WebSocket 是什么

WebSocket 是一种在单个 TCP 连接上进行**全双工通信**的协议，由 IETF 于 2011 年标准化（RFC 6455）。

与传统 HTTP 请求-响应模式不同，WebSocket 建立连接后，客户端和服务端可以**随时互相主动发送数据**，不需要一方等待另一方先开口。

---

## 二、和 HTTP 的核心区别

| 维度     | HTTP           | WebSocket        |
| ------ | -------------- | ---------------- |
| 通信模式   | 请求-响应（单向触发）    | 全双工（双向随时收发）      |
| 连接生命周期 | 每次请求新建/复用后关闭   | 握手后**持久保持**      |
| 服务端推送  | 不支持（需客户端轮询）    | 原生支持             |
| 协议头开销  | 每次请求带完整 Header | 握手后帧头极小（2~10 字节） |
| 适用场景   | 文档、API 调用      | 实时通信、长连接控制       |

---

## 三、握手过程（HTTP Upgrade）

WebSocket 连接从一次普通 HTTP 请求开始，通过 `Upgrade` 头协商升级协议。

### 3.1 客户端发起握手

```http
GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```

关键字段：
- `Upgrade: websocket` — 请求升级协议
- `Sec-WebSocket-Key` — 随机 Base64 字符串，用于验证服务端
- `Sec-WebSocket-Version: 13` — 协议版本（固定为 13）

### 3.2 服务端响应

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

- 状态码 `101` = 协议切换成功
- `Sec-WebSocket-Accept` = 对 Key 的 SHA-1 哈希验证
- 此后该 TCP 连接不再走 HTTP，完全变成 WebSocket 帧通信

### 3.3 握手流程图

```
客户端                          服务端
  │                               │
  │  HTTP GET + Upgrade 头        │
  │ ─────────────────────────────→│
  │                               │
  │  101 Switching Protocols      │
  │ ←───────────────────────────  │
  │                               │
  │  [WebSocket 帧通信开始]        │
  │ ←════════════════════════════→│
  │       全双工，持续保持          │
```

---

## 四、数据帧结构

WebSocket 通信的最小单位是**帧（Frame）**，格式如下：

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-------+-+-------------+-------------------------------+
|F|R|R|R| opcode|M| Payload len |    Extended payload length    |
|I|S|S|S|  (4)  |A|     (7)     |            (16/64)            |
|N|V|V|V|       |S|             |                               |
| |1|2|3|       |K|             |                               |
+-+-+-+-+-------+-+-------------+-------------------------------+
|     Masking-key (32 bits, 客户端→服务端必须有)                  |
+---------------------------------------------------------------+
|                        Payload Data                           |
+---------------------------------------------------------------+
```

关键字段说明：

| 字段 | 说明 |
|------|------|
| FIN | 1 = 这是消息的最后一帧 |
| opcode | 0x1=文本, 0x2=二进制, 0x8=关闭, 0x9=Ping, 0xA=Pong |
| MASK | 客户端发送的帧必须掩码处理（安全要求） |
| Payload len | 7位，若=126则后16位是真实长度，若=127则后64位是真实长度 |

---

## 五、连接维持：心跳机制

TCP 连接在长时间无数据时，中间代理（如 Nginx、负载均衡器）可能自动断开。WebSocket 用 **Ping/Pong 帧**来保活：

```
客户端                          服务端
  │  Ping（opcode=0x9）           │
  │ ─────────────────────────────→│
  │  Pong（opcode=0xA）           │
  │ ←─────────────────────────────│
```

实现示例（JavaScript）：

```javascript
// 每 30 秒发一次心跳
const heartbeatInterval = setInterval(() => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "heartbeat" }));
  }
}, 30000);
```

---

## 六、断线重连：指数退避

网络波动时不应立即无限重连，标准做法是**指数退避（Exponential Backoff）**：

```javascript
let reconnectDelay = 1000;          // 初始 1 秒
const MAX_RECONNECT_DELAY = 30000;  // 最长 30 秒

function connect() {
  ws = new WebSocket(url);

  ws.onopen = () => {
    reconnectDelay = 1000; // 连接成功，重置延迟
  };

  ws.onclose = () => {
    setTimeout(connect, reconnectDelay);
    reconnectDelay = Math.min(reconnectDelay * 2, MAX_RECONNECT_DELAY);
    // 1s → 2s → 4s → 8s → 16s → 30s → 30s → ...
  };
}
```

---

## 七、URL 协议

| 协议 | 说明 | 默认端口 |
|------|------|----------|
| `ws://` | 明文 WebSocket | 80 |
| `wss://` | TLS 加密 WebSocket | 443 |

`wss://` 在 TCP 之上加了 TLS 层，防止中间人嗅探，等同于 HTTPS 对 HTTP 的关系。生产环境**必须使用 wss**。

---

## 八、与相似技术的对比

### 8.1 轮询（Polling）

```
客户端每隔 N 秒问：有新消息吗？
服务端：没有 / 有，给你
```

- 延迟高，资源浪费
- 实现最简单

### 8.2 长轮询（Long Polling）

```
客户端发请求，服务端不立即回复
等到有数据再回复，客户端收到后立刻再发下一个请求
```

- 延迟低于轮询，但仍有请求开销
- 兼容性好（HTTP/1.1 即可）

### 8.3 SSE（Server-Sent Events）

```
客户端发一次请求，服务端持续推送（单向）
```

- 只支持服务端 → 客户端
- 自动重连内置支持
- 适合：日志流、进度推送、股票行情

### 8.4 WebSocket

- 全双工，双向随时收发
- 适合：聊天、游戏、远程控制、协同编辑

```
场景选择：
只需服务端推送 → SSE
需要双向通信 → WebSocket
简单兼容性优先 → 长轮询
```

---

## 九、典型应用场景

| 场景             | 说明                               |
| -------------- | -------------------------------- |
| 实时聊天           | 消息双向即时传递                         |
| 在线游戏           | 玩家状态同步                           |
| 协同编辑           | 多人同时编辑文档（如 Figma、飞书）             |
| 金融行情           | 股票/加密货币价格推送                      |
| 远程终端           | 云 IDE、SSH Web 客户端                |
| **远程控制 Agent** | 云端 Agent 通过 WebSocket 下发指令控制本地机器 |
|                |                                  |

---

## 十、实战案例：HappyCapy Mac Bridge

这是一个真实的 WebSocket 应用：云端 AI Agent 通过 WebSocket 长连接控制本地 Mac 电脑。

### 10.1 架构

```
本地 Mac                      happycapy.ai                  云端 Agent
(bridge-client.js)         (Cloudflare Durable Object)
       │                             │                           │
       │  wss://happycapy.ai/ws/bridge?token=...                │
       │ ══════════════════════════ →│                           │
       │  [持久 WebSocket 长连接]     │                           │
       │                             │← RPC 指令（JSON）─────────│
       │← JSON 指令转发 ─────────────│                           │
       │                             │                           │
       │  本地执行（zsh / 文件读写）   │                           │
       │                             │                           │
       │─ 执行结果（JSON）───────────→│                           │
       │                             │─ 结果转发 ────────────────→│
```

### 10.2 连接建立

```javascript
const url = `wss://${WORKER_HOST}/ws/bridge?token=${BRIDGE_TOKEN}&hostname=${HOSTNAME}&arch=${ARCH}`;
ws = new WebSocket(url);
```

认证信息（token）通过 URL 查询参数传递，连接后即进入待命状态。

### 10.3 消息协议（RPC over WebSocket）

自定义了一套 JSON RPC 协议：

**云端下发指令（type: rpc）：**
```json
{
  "type": "rpc",
  "id": "req_001",
  "method": "terminal/exec",
  "body": {
    "command": "ls -la ~/Desktop",
    "cwd": "/Users/saaaaa",
    "timeout": 30
  }
}
```

**本地返回结果（type: rpc_response）：**
```json
{
  "type": "rpc_response",
  "id": "req_001",
  "status": 200,
  "body": {
    "stdout": "total 48\ndrwx------  ...",
    "stderr": "",
    "exitCode": 0
  }
}
```

### 10.4 支持的 RPC 方法

| 方法 | 功能 |
|------|------|
| `terminal/exec` | 执行 shell 命令（zsh） |
| `files/read` | 读取文件内容 |
| `files/write` | 写入/覆盖文件 |
| `files/list` | 列出目录内容 |
| `files/delete` | 删除文件或目录 |
| `system/info` | 获取系统信息 |

### 10.5 安全设计

- **路径沙箱**：只允许操作 `$HOME` 和 `/tmp`，其他路径拒绝
- **危险命令黑名单**：过滤 `rm -rf /`、`mkfs`、`dd if=` 等
- **Token 鉴权**：连接时验证 `BRIDGE_TOKEN`
- **TLS 加密**：使用 `wss://`，传输内容加密

### 10.6 心跳实现

```javascript
// 每 30 秒发送心跳，防止连接被中间代理断开
heartbeatInterval = setInterval(() => {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "bridge_event", event: "heartbeat" }));
  }
}, 30000);
```

### 10.7 为什么能穿透防火墙

```
本地 Mac 主动发起出站连接（Outbound）
↓
wss:// 走 443 端口，和普通 HTTPS 流量无异
↓
防火墙/NAT 放行出站 443，不阻断
↓
连接建立后，云端可通过这条通道反向下发指令
```

这是"反向控制通道"的核心思路：**客户端主动建立连接，服务端通过这条连接反向控制客户端**，无需客户端暴露任何端口。

---

## 十一、服务端实现要点（Node.js 示例）

```javascript
const { WebSocketServer } = require("ws");
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, req) => {
  console.log("新连接:", req.socket.remoteAddress);

  // 接收消息
  ws.on("message", (data) => {
    const msg = JSON.parse(data.toString());
    console.log("收到:", msg);

    // 回复
    ws.send(JSON.stringify({ type: "ack", received: msg }));
  });

  // 连接关闭
  ws.on("close", (code, reason) => {
    console.log(`断开: code=${code}, reason=${reason}`);
  });

  // 主动推送
  ws.send(JSON.stringify({ type: "welcome", message: "连接成功" }));
});
```

---

## 十二、常见问题

### Q: WebSocket 连接会超时吗？

会。大多数反向代理（Nginx、AWS ALB 等）有空闲超时（默认 60s），需要心跳保活。

### Q: 如何处理大量并发连接？

- Node.js 单进程可维持数万连接（事件驱动，不阻塞）
- Cloudflare Durable Objects（HappyCapy 用的）天然支持持久连接分布式管理
- 生产环境需要考虑连接状态管理、广播分发（如用 Redis Pub/Sub）

### Q: WebSocket 和 HTTP/2 的关系？

HTTP/2 支持服务端推送，但仍是请求-响应模型。WebSocket 是独立协议，在 HTTP/2 下也可以通过扩展（RFC 8441）使用，但兼容性较低，多数场景仍走 HTTP/1.1 升级。

### Q: 如何调试 WebSocket？

- Chrome DevTools → Network → 过滤 `WS` → 点击连接 → Messages 面板
- `wscat` 命令行工具：`npx wscat -c wss://example.com`
- Wireshark 抓包（TLS 下需要导入证书）

---

## 十三、readyState 状态机

浏览器/Node.js 的 WebSocket 对象有四个状态，写客户端代码时必须正确判断：

```
CONNECTING (0)
     │
     │  握手成功
     ↓
  OPEN (1)  ←──────────── 正常通信阶段
     │
     │  任一方发起关闭
     ↓
CLOSING (2)  ←─────────── 等待关闭握手完成
     │
     │  TCP 连接断开
     ↓
 CLOSED (3)
```

| 常量 | 值 | 说明 |
|------|----|------|
| `WebSocket.CONNECTING` | 0 | 正在握手，尚未建立 |
| `WebSocket.OPEN` | 1 | 连接正常，可收发数据 |
| `WebSocket.CLOSING` | 2 | 正在关闭，不应再发数据 |
| `WebSocket.CLOSED` | 3 | 已关闭 |

实际使用中，**发送前必须判断状态**：

```javascript
function safeSend(ws, data) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data));
  } else {
    console.warn("连接未就绪，当前状态:", ws.readyState);
  }
}
```

HappyCapy 中也是这样做的：
```javascript
if (ws && ws.readyState === WebSocket.OPEN) {
  ws.send(JSON.stringify({ type: "bridge_event", event: "heartbeat" }));
}
```

---

## 十四、关闭握手与关闭码

### 14.1 正常关闭流程

WebSocket 有明确的"挥手"协议，不能直接掐断 TCP：

```
客户端                          服务端
  │  Close Frame（code=1000）    │
  │ ────────────────────────────→│
  │  Close Frame（code=1000）    │
  │ ←────────────────────────────│
  │  [TCP 连接关闭]               │
```

### 14.2 关闭码速查表

| 代码 | 名称 | 含义 |
|------|------|------|
| `1000` | Normal Closure | 正常关闭，任务完成 |
| `1001` | Going Away | 服务端重启 / 页面跳走 |
| `1002` | Protocol Error | 协议错误 |
| `1003` | Unsupported Data | 收到不支持的数据类型 |
| `1005` | No Status | 未收到关闭码（内部使用） |
| `1006` | Abnormal Closure | **异常断开**，没有 Close Frame（网络中断、进程崩溃）|
| `1007` | Invalid Frame Payload | 文本帧包含非 UTF-8 数据 |
| `1008` | Policy Violation | 违反策略（如 Token 失效） |
| `1009` | Message Too Big | 消息超过大小限制 |
| `1011` | Internal Error | 服务端内部错误 |
| `1012` | Service Restart | 服务端重启，客户端可重连 |
| `4000–4999` | 自定义 | 应用层自定义关闭原因 |

> **调试技巧**：收到 `1006` 说明连接被强制中断，不是正常关闭；收到 `1008`/`4xxx` 通常是鉴权或业务逻辑问题。

### 14.3 代码示例

```javascript
ws.onclose = (event) => {
  console.log(`关闭码: ${event.code}, 原因: ${event.reason}`);
  if (event.code === 1006) {
    console.warn("异常断开，尝试重连...");
  } else if (event.code === 1000) {
    console.log("正常关闭，无需重连");
  }
};

// 主动关闭
ws.close(1000, "任务完成");
```

---

## 十五、安全：Origin 验证与 CSRF

### 15.1 WebSocket 不走 CORS

普通 AJAX 请求受浏览器 CORS 策略保护，但 **WebSocket 握手不受 CORS 约束**。浏览器会在握手请求中自动附带 `Origin` 头，但是否拒绝完全取决于**服务端**：

```http
GET /ws HTTP/1.1
Host: api.example.com
Origin: https://evil.com        ← 浏览器自动加，但服务端必须自己验证
Upgrade: websocket
```

### 15.2 CSRF 攻击场景

```
攻击者的恶意网页 evil.com
  │
  │  用户浏览器打开 evil.com
  │  页面中执行：new WebSocket("wss://your-api.com/ws")
  │  浏览器自动带上用户的 Cookie
  │
  ↓
your-api.com 如果不验证 Origin → 被建立连接 → 攻击者可操控
```

### 15.3 服务端防御：验证 Origin

```javascript
const wss = new WebSocketServer({ port: 8080 });

const ALLOWED_ORIGINS = ["https://app.example.com", "https://www.example.com"];

wss.on("connection", (ws, req) => {
  const origin = req.headers["origin"];

  if (!ALLOWED_ORIGINS.includes(origin)) {
    console.warn(`拒绝来自 ${origin} 的连接`);
    ws.close(1008, "Origin not allowed");
    return;
  }

  // 正常处理...
});
```

### 15.4 Token 鉴权（HappyCapy 的方式）

更强的方式是**连接时验证 Token**，Origin 验证只是第一道门：

```javascript
// 客户端：Token 放在 URL 参数（或握手头）
const url = `wss://happycapy.ai/ws/bridge?token=${BRIDGE_TOKEN}`;

// 服务端：解析并验证 Token
wss.on("connection", (ws, req) => {
  const params = new URL(req.url, "http://localhost").searchParams;
  const token = params.get("token");

  if (!isValidToken(token)) {
    ws.close(1008, "Invalid token");
    return;
  }
});
```

> **注意**：Token 放 URL 会出现在服务器日志中。更安全的做法是连接建立后立即发送认证消息（auth handshake over WebSocket），而非放在 URL 里。

---

## 十六、子协议（Subprotocol）

### 16.1 概念

当应用层需要在 WebSocket 之上定义**具体的消息格式和通信规范**时，可以通过子协议声明来协商：

```http
// 客户端握手时声明支持的子协议
Sec-WebSocket-Protocol: graphql-ws, mqtt

// 服务端选择一个
Sec-WebSocket-Protocol: graphql-ws
```

### 16.2 常见子协议

| 子协议 | 用途 |
|--------|------|
| `graphql-ws` | GraphQL 订阅（实时查询） |
| `mqtt` | IoT 设备消息协议 |
| `stomp` | 消息中间件协议（ActiveMQ 等） |
| `chat` / 自定义 | 应用自己定义的协议名 |

### 16.3 代码示例

```javascript
// 客户端声明子协议
const ws = new WebSocket("wss://api.example.com/graphql", "graphql-ws");

// 服务端（ws 库）
const wss = new WebSocketServer({
  port: 8080,
  handleProtocols: (protocols, req) => {
    if (protocols.has("graphql-ws")) return "graphql-ws";
    return false; // 拒绝连接
  },
});
```

> HappyCapy 没有使用子协议声明，而是自定义了 JSON 消息格式（`type: "rpc"` / `type: "rpc_response"`），这是另一种常见做法：**不声明子协议，靠消息体中的字段区分类型**。

---

## 十七、二进制帧传输

### 17.1 两种数据类型

WebSocket 支持两种 Payload 类型，由帧的 opcode 决定：

| opcode | 类型 | 说明 |
|--------|------|------|
| `0x1` | 文本帧 | UTF-8 字符串（JSON 通常走这里）|
| `0x2` | 二进制帧 | ArrayBuffer / Blob（文件、音视频流）|

### 17.2 浏览器端发送/接收二进制

```javascript
// 发送 ArrayBuffer
const buffer = new ArrayBuffer(8);
const view = new DataView(buffer);
view.setFloat64(0, 3.14);
ws.send(buffer);

// 发送 Blob（如文件）
const file = document.querySelector("input").files[0];
ws.send(file);

// 接收时指定期望类型
ws.binaryType = "arraybuffer"; // 或 "blob"（默认）

ws.onmessage = (event) => {
  if (event.data instanceof ArrayBuffer) {
    const view = new DataView(event.data);
    console.log("收到浮点数:", view.getFloat64(0));
  }
};
```

### 17.3 典型用途

- **文件传输**：将文件切片，逐块发送二进制帧，比 Base64 节省约 33% 体积
- **音视频流**：WebRTC 信令之外的媒体数据通道
- **游戏**：二进制协议（如 Protocol Buffers）编码的游戏状态

> HappyCapy 的 `files/read` 接口处理文件时使用了 Base64 编码（在 JSON 文本帧中传输），这是一种简化做法；若需传输大文件，改用二进制帧效率更高。

---

## 十八、多节点广播：Redis Pub/Sub 模式

### 18.1 问题：单机局限

单台服务器时，广播很简单：

```javascript
// 给所有连接的客户端广播
wss.clients.forEach((client) => {
  if (client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(msg));
  }
});
```

但当服务扩展为**多台服务器**时：

```
客户端 A ──→ 服务器 1
客户端 B ──→ 服务器 2
客户端 C ──→ 服务器 2

服务器 1 收到消息，想广播给 B 和 C → 跨服务器，无法直接访问
```

### 18.2 解决方案：Redis Pub/Sub

```
客户端 A ──→ 服务器 1 ──→ Redis PUBLISH "channel" msg
                                    │
                         ┌──────────┴──────────┐
                         ↓                     ↓
                      服务器 1               服务器 2
                    (SUBSCRIBE)            (SUBSCRIBE)
                         │                     │
                    推送给 A               推送给 B、C
```

### 18.3 代码示例

```javascript
const { createClient } = require("redis");
const { WebSocketServer } = require("ws");

const pub = createClient();  // 发布者
const sub = createClient();  // 订阅者（独立连接）
await pub.connect();
await sub.connect();

const wss = new WebSocketServer({ port: 8080 });
const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  ws.on("close", () => clients.delete(ws));

  ws.on("message", async (data) => {
    // 收到消息，发布到 Redis
    await pub.publish("broadcast", data.toString());
  });
});

// 订阅 Redis，收到消息后推送给本节点所有客户端
await sub.subscribe("broadcast", (message) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
});
```

### 18.4 其他方案

| 方案 | 适用场景 |
|------|----------|
| Redis Pub/Sub | 最常用，简单高效 |
| Redis Streams | 需要消息持久化/回放 |
| Kafka | 超大规模，消息不能丢 |
| Cloudflare Durable Objects | 边缘节点，天然解决分布式问题（HappyCapy 用此方案）|

---

## 十九、permessage-deflate 压缩扩展

### 19.1 握手协商

客户端在握手时声明支持压缩：

```http
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
```

服务端确认后，双方的消息 Payload 会用 deflate 算法压缩：

```http
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits=15
```

### 19.2 效果

- JSON 等文本数据压缩率通常可达 **60%~80%**
- 二进制数据（已压缩的图片/视频）压缩收益极低，建议关闭

### 19.3 Node.js（ws 库）开启

```javascript
const wss = new WebSocketServer({
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: { level: 6 },  // 压缩级别 1-9
    threshold: 1024,                    // 小于 1KB 的消息不压缩
  },
});
```

### 19.4 注意事项

- 压缩/解压消耗 CPU，高并发场景需要权衡
- 移动端弱设备建议仅服务端压缩，客户端不压缩
- HappyCapy 的 bridge 传输的多为短 JSON 指令，压缩收益有限，未启用此扩展
