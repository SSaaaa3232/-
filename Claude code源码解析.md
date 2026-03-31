---
tags:
  - ClaudeCode
  - AI
  - Agent
source: https://x.com/AlchainHust/status/2038944798816505991?s=20
---
大纲：

[[Claude code源码解析 2026-03-31 20.24.55.excalidraw]]

---
# harness

## 缘由

- 他们在更新Claude Code的npm包时，不小心把一个60MB的source map调试文件留在了发布包里。这个文件本来应该在打包时排除掉，结果没有。任何人都可以用它还原出Claude Code完整的TypeScript源码。1902个源文件，全部暴露。
---

## 问题

- 这AI怎么就这么好用
- 背后到底是怎么实现的？

---

## system prompt

- 拼装
- ![[Claude code源码解析 2026-03-31 20.34.53.excalidraw]]

![Image](https://pbs.twimg.com/media/HEvJTZvW0AAty9x?format=jpg&name=medium)

### 特点：

- 一刀切成两段
- 分界线
	- 分界线上面所有用户共享缓存，省钱省时间。
	- 分界线下面每个用户独立加载，保证个性化。

---

## 权限系统

- AI作安全审查
- 四层

- 核心：
	- 你不只要告诉AI做什么，
	- 更要设计它在什么条件下不能做什么。
	- 安全边界不是限制，是信任的基础。
	- 因为你相信它有底线，所以才敢给它更大的权限。

![[Claude code源码解析 2026-03-31 20.42.50.excalidraw]]

![Image](https://pbs.twimg.com/media/HEvJXFhW8AAzCCM?format=jpg&name=medium)


## 记忆系统

- 只记偏好不记代码

![[Claude code源码解析 2026-03-31 20.50.45.excalidraw]]
## 上下文压缩

- 9段式结构化
	- 核心请求、
	- 关键概念、
	- 文件和代码、
	- 错误和修复、
	- 解决过程、
	- 所有用户消息、
	- 待办任务、
	- 当前工作、
	- 下一步行动

- 最关键的是所有用户消息必须完整保留​（关键🔥）
## 协作框架

- 真实公司运转
- 多agent协作

![[Claude code源码解析 2026-03-31 21.01.39.excalidraw]]
- Claude Code的Agent系统可能是整个源码中最复杂的部分。看完之后我理解了为什么它的多任务能力这么强。因为它实现了一套企业级的组织管理架构​
- 
utils/swarm/ 目录下有一个完整的多Agent协作框架。每个Team有Leader和多个Teammate，支持三种执行方式（同进程隔离、tmux窗口、iTerm2分割窗格）。每个Agent有自己的邮箱文件做异步通信。每个Agent可以在独立的Git Worktree中工作，互不干扰。

还有个权限冒泡机制：Teammate遇到需要确认的操作，权限请求会冒泡给Leader而不是直接弹给用户。Leader决定是否批准。

这跟管理真人团队一模一样。任务怎么拆分、信息怎么流转、冲突怎么解决、结果怎么合并。