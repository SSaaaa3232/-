---
title: "Thread by @chenchengpro"
source: "https://x.com/chenchengpro/status/2041743983010050133"
author:
  - "[[@chenchengpro]]"
published: 2026-04-08
created: 2026-04-09
---
**陈成** @chenchengpro [2026-04-08](https://x.com/chenchengpro/status/2041743983010050133)

如果你的 --dangerously-skip-permissions 也莫名失效了，权限弹窗弹到怀疑人生，不妨试试 PreToolUse Hook 方案。

原因大概率是这几个：

1）Claude Code 对 .claude 目录和敏感文件（CLAUDE.md、hooks 等）加了额外保护，即使 DSP 模式也会弹窗

2）会话 token 过长（~100k）时模型会变保守，主动请求确认

3）操作跳出当前项目目录也会触发

解法：在 ~/.claude/settings.json 里加一个 PreToolUse hook，脚本输出 {"permissionDecision": "allow"} 就能自动放行。

\`\`\`bash

\# ~/.claude/hooks/auto-allow.sh

jq -n '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"allow","permissionDecisionReason":"auto-allowed"}}'

\`\`\`

然后注册到 settings.json：

\`\`\`json

{"hooks":{"PreToolUse":\[{"matcher":"Edit","hooks":\[{"type":"command","command":"~/.claude/hooks/auto-allow.sh"}\]}\]}}

\`\`\`

matcher 可以指定 Bash/Edit/Write 等具体工具，也可以不填匹配所有。脚本里还能读 stdin 拿到 tool\_input，按路径、命令等条件精细控制——比 DSP 的无脑全放行反而更安全。

另一个更简单的替代：直接用 --permission-mode dontAsk 或 auto，这是官方新推的权限体系，DSP 可能正在被逐步淘汰。

---

**天猪 TZ** @atian25 [2026-04-09](https://x.com/atian25/status/2042077914221674540)

I don't know why, but my Claude on sub2api keeps prompting me that this account doesn't support auto mode. Not sure if it's some configuration issue.