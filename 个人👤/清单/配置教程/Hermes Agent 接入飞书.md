---
title: Hermes Agent 接入飞书：小白教程
source: https://x.com/shynloc/status/2041881361448104242
author:
  - "[[@shynloc]]"
published: 2026-04-08
created: 2026-04-11
tags:
  - hermes
  - feishu
---
这篇文章记录给 Hermes Agent 配置飞书通道的完整过程。飞书的配置步骤比 Telegram 多，但只要按顺序来，不难。

\---

## 第一步：创建飞书自建应用

打开飞书开放平台 [open.feishu.cn](https://open.feishu.cn/)，登录后进入「开发者后台」，点击「创建应用」，选「自建应用」，填好名字和描述创建完成。

进入应用后找到「凭证与基础信息」，把 App ID 和 App Secret 复制下来备用。

\---

## 第二步：开启机器人能力

进入「应用功能」，找到「机器人」，把它开启。不开这个，用户无法给 bot 发消息。

\---

## 第三步：配置权限

进入「权限管理」，申请以下权限：

\- im:message（读写消息）

\- im:message:send\_as\_bot（以机器人身份发送消息）

\- im:message:readonly（读取消息）

\- im:[message.group](https://message.group/)\_msg（获取群组消息）

\- im:message.p2p\_msg（读取用户发给机器人的私聊消息）

\- im:resource（收发图片文件）

\- contact:[user.id](https://user.id/):readonly（获取用户信息）

\- admin:[app.info](https://app.info/):readonly（获取应用信息，用于群里精准识别 bot 名字，不开也能用）

\*\*注意 im:message.p2p\_msg 这条权限\*\*，它控制 bot 能否收到私聊消息，容易被漏掉。如果只开了群聊权限，bot 在群里能回消息，但私聊完全没反应。

\---

## 第四步：配置事件订阅

进入「事件订阅」，订阅方式选「使用长连接接收事件」。

这个模式不需要你有公网域名，也不需要配置加密，Hermes 默认就是 WebSocket 长连接，直接对上。另一种「将事件发送至开发者服务器」是 Webhook 模式，需要填公网地址，不选它。

然后点「添加事件」，搜索添加：

\- im.message.receive\_v1（接收消息）

\---

## 第五步：发布版本

权限和事件订阅配好之后，必须发布一个版本改动才生效。

进入「版本管理与发布」，点「创建版本」，选择发布为「内测版本」，把自己的飞书账号加入测试用户列表，发布。

\---

## 第六步：在 Hermes 里配置飞书

安装依赖：

pip install lark-oapi

在 ~/.hermes/.env 里加入：

FEISHU\_APP\_ID=你的App\_ID

FEISHU\_APP\_SECRET=你的App\_Secret

FEISHU\_CONNECTION\_MODE=websocket

重启 gateway：

hermes gateway restart

\---

## 第七步：配对用户

第一次给 bot 发消息，它会回复一个配对码：

Hi~ 我还不认识你！

配对码：XXXXXXXX

请运行：hermes pairing approve feishu XXXXXXXX

在运行 Hermes 的机器上执行：

hermes pairing approve feishu XXXXXXXX

批准后再发消息，bot 就能正常回复了。

\---

## 注意事项

私聊权限 im:message.p2p\_msg 容易漏配。飞书事件订阅页面上每个事件旁边会显示「已开通」或未开通，配完权限后可以到那里确认一下状态，确保私聊和群聊权限都亮了。

\---

## 附：和 Telegram 对比

Telegram 接入只需要一个 Bot Token，飞书要走完整的应用申请流程，步骤多一些。但好处是国内使用不需要代理，延迟低。两个平台可以同时运行，共用同一个 Hermes 实例，互不干扰。