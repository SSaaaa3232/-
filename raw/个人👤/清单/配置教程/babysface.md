---
title: 配置教程 副本 - 飞书云文档
source: https://tcn5lhyjit4a.feishu.cn/wiki/Di3Xw8XxLiHQwykFSCocEJkjnpI
author:
published:
created: 2026-04-10
tags:
  - 教程
  - API
  - 反代
  - 中转站
---
Codex 的配置文件位置（如果没有新建即可）

•

Mac/Linux

◦

~/.codex/config.toml

◦

~/.codex/auth.json

•

Windows

◦

C:\\users\\你的用户名\\.codex\\config.toml

◦

C:\\users\\你的用户名\\.codex\\auth.json

config.toml 然后粘贴配置

model\_provider = "fandai\_proxy"

model = "gpt-5.4"

model\_reasoning\_effort = "xhigh"

disable\_response\_storage = true

model\_verbosity = "high"

network\_access = true

web\_search = "live"

windows\_wsl\_setup\_acknowledged = true

\[model\_providers.fandai\_proxy\]

name = "fandai\_proxy"

base\_url = " [http://www.babysface.cn/dashboard/api/proxy/v1](http://www.babysface.cn/dashboard/api/proxy/v1) "

requires\_openai\_auth = true

\[features\]

fast\_model = true

auth.json，其中将 sk-xxx 替换成后台生成的密钥

{

"OPENAI\_API\_KEY": "sk-xxx"

}

Openclaw 配置教程

"models": {

"providers": {

"rayincode": {

"baseUrl": " [http://www.babysface.cn/dashboard/api/proxy/v1](http://www.babysface.cn/dashboard/api/proxy/v1) ",

"apiKey": "sk-XXXXXXXXXXXXXXXX",

"auth": "api-key",

"api": "openai-responses",

"models": \[

{

"id": "gpt-5.3-codex",

"name": "GPT-5.3 Codex",

"api": "openai-responses",

"reasoning": true,

"input": \[

"text",

"image"

\],

"cost": {

"input": 1.75,

"output": 14,

"cacheRead": 0.175,

"cacheWrite": 0.175

},

"contextWindow": 400000,

"maxTokens": 128000

},

{

"id": "gpt-5.4",

"name": "GPT-5.4",

"api": "openai-responses",

"reasoning": true,

"input": \[

"text",

"image"

\],

"cost": {

"input": 1.75,

"output": 14,

"cacheRead": 0.175,

"cacheWrite": 0.175

},

"contextWindow": 400000,

"maxTokens": 128000

}

\]

}

}

},

"agents": {

"defaults": {

"model": {

"primary": "rayincode/gpt-5.4"

},

"models": {

"rayincode/gpt-5.3-codex": {

"alias": "GPT-5.3 Codex"

},

"rayincode/gpt-5.4": {

"alias": "GPT-5.4"

}

},

"workspace": "/root/.openclaw/workspace",

"compaction": {

"mode": "safeguard"

},

"maxConcurrent": 4,

"subagents": {

"maxConcurrent": 8

}

},

评论（0）

跳转至首条评论

0 字

- 帮助中心

- 效率指南