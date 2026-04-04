---
source: https://x.com/GoSailGlobal/status/2039500792202412094?s=20
MemOS: https://github.com/MemTensor/MemOS
---
# 参考架构
![Image](https://pbs.twimg.com/media/HEzNtxJbwAAfRyb?format=jpg&name=medium)

# gateway

- 🦞 小龙虾（main）
	- 用 claude-opus-4-6，负责协调调度，接飞书消息，拆任务分发。贵的模型给最需要判断力的环节

- 💻 码力（coder）
	- 用 gpt-5.3-codex，全栈工程师。编码任务对文笔没要求，能跑就行，走免费额度

- ✏️ 笔锋（writer）
	- 用 claude-opus，首席内容官。写作质量直接影响产出，这个不能省

- 🧠 谋士（strategist）
	- 用 gpt-5.4，策略顾问。审稿分析复盘，免费模型实测够用但响应慢

## 核心思路：贵的模型只给最需要质量的环节，其他尽量白嫖

# 定义Agent

- 赋予每个agent人格和能力
- 
- SOUL.md 和 AGENTS.md

# 打通通信

- agentToAgent: true 
	- 开启 Agent 间通信权限，相互调用发指令
- sessions.visibility: all 
	- 会话全局可见，上下文逻辑一致

- 飞书收到指令后，小龙虾判断该交给谁，直接 sessions_send 派活

## 原理

- 总agent分析任务，拆分任务配对对应的子agent

>你在飞书发了一个复杂任务 → 小龙虾（总调度）先开了「Agent 互聊 + 全局可见」的权限 → 小龙虾把任务拆成多个子任务 → 用 `sessions_send` 把活派给对应的子 Agent → 所有 Agent 共享上下文，协同完成任务，最后把结果汇总给你（飞书）

# MemOS

## 记忆系统三层模型

- Embedding 
	用本地离线的 Xenova，零成本不调 API。
- Summarizer 
	用 MiniMax-M2.5，便宜到几乎免费。
- Skill Evolution 
	偶尔触发时才调 Opus

- OpenClaw 记忆面板跑在 18799 端口，通过 Gateway 的本地 token 控制权限。
只需要 openclaw.json 里 gateway.auth.token 的后四位就行

## Team Sharing

MemOS Hub：
	一个 Hub 存共享数据，各 Agent 作为 Client，开启后有三个核心能力

- task_share 
	- 把某个任务的记忆共享给其他 Agent

- skill_publish 
	- 把自己学会的技能发布给团队

- MemOS Hub 让共享数据集中管理

>在记忆面板的设置功能下打开团队共享就行

# 注意点

- 免费模型响应慢，GPT-5.4 大概5分钟。
	- 解决方案是 fire-and-forget + 异步回传。小龙虾把任务派出去就不等了，谁先做完谁主动汇报

- 改 agentToAgent 必须重启 Gateway 才生效。
	- 不是 bug 是设计如此，第一次搞的时候排查了好一会儿

- 给码力的任务描述写得太短，出来的脚本就是最简版。
	- 多 Agent 协作不代表你可以偷懒写 prompt，每个 Agent 的输入质量决定输出质量

>你不需要先有团队。很多时候你只需要先有一个能分工的虾队