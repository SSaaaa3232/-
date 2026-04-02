---
source: https://x.com/GoSailGlobal/status/2039500792202412094?s=20
MemOS: https://github.com/MemTensor/MemOS
---
# 参考架构
![Image](https://pbs.twimg.com/media/HEzNtw-a4AA-wK6?format=jpg&name=medium)

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

- 通过 agentToAgent: true 和 sessions.visibility: all 开启互通。
- 飞书收到指令后，小龙虾判断该交给谁，直接 sessions_send 派活