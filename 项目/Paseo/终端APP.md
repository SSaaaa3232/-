---
aliases:
---
| 远程终端app | mosh+tailscale | 临时demo：relay service |
| ------- | -------------- | -------------------- |
https://github.com/bytedance/UI-TARS-desktop

paseo

Redock 主要做了如下工作：

1.面向开发周期设计的，引入了 Project ，Action 的概念

- Project 把开发机器、工作目录、常用代码片段等组织为结构化的上下文。
- Action 把 agent 启动、测试部署、脚本执行变成可点击任务。
- 最终减少在手机上来回敲命令，也减少手动找回上下文的消耗。

2.终端对 agent 的 TUI 适配

- 屏幕手势支持，对话历史可拖拽回滚，支持中文输入。
- 待输入区、语音转写让 prompt 先组织好再发送。

3.对 tmux 的原生支持

- tmux 用于会话保活，手机断联后工作任务仍然可以继续。
- 无需手动输入 tmux 命令，Redock 把 tmux 内置到开发流程中，可快速新建、进入会话。
- 可使用 tmux 运行后台长任务，执行打包上传发布等耗时任务。

为什么不用类似 Happy 那样的远程 agent 遥控器方案？

- 不够灵活，只能操作某些 agent ，无法执行更深入的验证工作
- 需要一个中继服务来中转命令，用公共的卡顿，自己搭浪费钱