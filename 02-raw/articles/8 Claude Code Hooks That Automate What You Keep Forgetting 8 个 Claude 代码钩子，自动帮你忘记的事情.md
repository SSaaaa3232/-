---
title: "8 Claude Code Hooks That Automate What You Keep Forgetting 8 个 Claude 代码钩子，自动帮你忘记的事情"
source: "https://x.com/zodchiii/status/2040000216456143002"
author:
  - "[[@zodchiii]]"
published: 2026-04-03
created: 2026-04-07
description: "Have you ever told Claude Code to do something and it just didn't?你有没有让 Claude Code 做某件事，但它就是没做？You said format the code - It didn't. You sa..."
---
Have you ever told Claude Code to do something and it just didn't?你有没有让 Claude Code 做某件事，但它就是没做？

You said format the code - It didn't. You said don't touch that file - It did. 你说格式化代码——其实没有。你说过别碰那个档案——确实碰了。

You said run tests before finishing - It forgot.你说完成前要做测试——它忘了。

**That's because CLAUDE.md is a suggestion.那是因为 CLAUDE.md 只是建议。**

Claude reads it and follows it about 80% of the time. Hooks are different. They're automatic actions that fire every time Claude edits a file, runs a command, or finishes a task.Claude 大约有 80%的时间会阅读并跟随它。钩子是不同的。它们是每次 Claude 编辑文件、执行命令或完成任务时自动触发的动作。

Below I will share 8 personal hooks you can copy straight into your settings.json and never think about again 👇下面我将分享 8 个你可以直接复制进你的 settings.json，永远不会再想起 👇 的个人引子

Before we dive in, I share daily notes on AI & vibe coding in my Telegram channel: [https://t.me/zodchixquant](https://t.me/zodchixquant)🧠在深入讨论之前，我会在我的 Telegram 频道分享关于 AI 和氛围编码的每日笔记：[https://t.me/zodchixquant](https://t.me/zodchixquant)🧠

![[6d993f99d0f6fff8035f3ff42c8d049e_MD5.jpg]]

## How hooks work (30-second version) What are hooks?钩子的工作原理（30秒版本） 什么是钩子？

Hooks are automatic actions that run every time Claude Code does something, like editing a file or running a command. 钩子是每次 Claude Code 执行某事时自动执行的动作，比如编辑文件或执行命令。

You set them up once and they work in the background without you thinking about it.你设置一次，它们就会在你不自觉地在后台运行。

The two you'll use most:你最常用的两个：

**PreToolUse** runs before Claude does something. You can inspect the action and block it by returning exit code 2. Think of it as a bouncer.**PreToolUse** 运行在 Claude 之前。你可以检查该动作并通过返回退出代码 2 来阻止它。把它当成保镖。

**PostToolUse** runs after Claude does something. You can run cleanup, formatting, tests, or logging. Think of it as quality control on the assembly line.Claude 做某事后，**PostToolUse** 会运行。你可以进行清理、格式化、测试或日志记录。可以把它看作是装配线上的质量控制。

```markdown
Where hooks live:

.claude/settings.json         project-level (shared via git)
~/.claude/settings.json       user-level (all your projects)
.claude/settings.local.json   local only (not committed)
```

You configure them in **.claude/settings.json** in your project root. That file gets committed to git, so your whole team gets the same hooks automatically.你在项目根目录里用 **.claude/settings.json** 配置它们 。这个文件会提交到 git，所以整个团队会自动获得相同的钩子。

Full documentation: [https://code.claude.com/docs/en/hooks](https://code.claude.com/docs/en/hooks)完整文档：[https://code.claude.com/docs/en/hooks](https://code.claude.com/docs/en/hooks)

![[fe9b158eafe9d0a0b8ce55ed1280b2a6_MD5.jpg]]

## 1\. Auto-format every file Claude touches1. 自动格式化 Claude 触碰的每个文件

**The problem:** Claude writes correct code that breaks your formatting rules. You add "always run Prettier" to CLAUDE.md and it works most of the time, but not always.**问题是：**Claude 写的代码是正确的，这会破坏你的格式规则。你把“总是跑得漂亮”加到 CLAUDE.md 里，大多数时候都能用，但不是总是这样。

**The hook:** Prettier runs automatically after every file write or edit.**钩子：** 每次写入或编辑文件后，Prettier 会自动运行。

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write 2>/dev/null; exit 0"
          }
        ]
      }
    ]
  }
}
```

Swap **npx prettier --write** for whatever formatter you use: **black** for Python, **gofmt** for Go, **rustfmt** for Rust. The pattern is the same.换个**更漂亮的 npx——** 写你用的格式化器：**Python 用 black** 写，**go 用 gofmt，rustfmt** 用 Rust。模式是一样的。

This was the first hook I set up and honestly it should be the default for every project. No more "Claude forgot to format" commits.这是我设置的第一个钩子，说实话它应该是每个项目的默认设置。不再出现“Claude 忘记格式化”的提交。

## 2\. Block dangerous commands2. 阻止危险指令

**The problem:** Claude is powerful enough to run rm -rf, git reset --hard, DROP TABLE, or curl to random URLs. It probably won't, but "probably" isn't good enough when it's your production database.**问题是：**Claude 足够强大，可以运行 rm -rf、git reset --hard、DROP TABLE，或者 curl 到随机的 URL。可能不会，但“可能”对你的生产数据库来说是不够的。

**The hook:** Block destructive commands before they execute.**卖点：** 在命令执行前阻止破坏性指令。

Create .claude/hooks/block-dangerous.sh:创建 .claude/hooks/block-dangerous.sh：

```bash
Create .claude/hooks/block-dangerous.sh:
#!/usr/bin/env bash
set -euo pipefail
cmd=$(jq -r '.tool_input.command // ""')

dangerous_patterns=(
  "rm -rf"
  "git reset --hard"
  "git push.*--force"
  "DROP TABLE"
  "DROP DATABASE"
  "curl.*|.*sh"
  "wget.*|.*bash"
)

for pattern in "${dangerous_patterns[@]}"; do
  if echo "$cmd" | grep -qiE "$pattern"; then
    echo "Blocked: '$cmd' matches dangerous pattern '$pattern'. Propose a safer alternative." >&2
    exit 2
  fi
done
exit 0
Then add to your settings.json:
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/block-dangerous.sh"
          }
        ]
      }
    ]
  }
}
```

Then add to your settings.json:然后在你的 settings.json 中补充：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/block-dangerous.sh"
          }
        ]
      }
    ]
  }
}
```

Exit code 2 is the key. It blocks the action and sends your error message back to Claude so it can try a safer approach. Exit code 0 means "go ahead." Anything else logs a warning but doesn't block.出口代码 2 是关键。它会阻止操作，并将你的错误信息发送回 Claude，以便尝试更安全的处理方式。出口代码 0 表示“请继续”。其他的都会有警告，但不会被阻挡。

## 3\. Protect sensitive files from edits3. 保护敏感文件免受编辑

**The problem:** Claude can read and edit any file in your project. That includes **.env, package-lock.json**, config files, and anything else you'd rather it didn't touch.**问题是：**Claude 可以读取和编辑你项目中的任何文件。这包括 **.env、package-lock.json**、配置文件，以及你不希望它碰到的其他文件。

**The hook:** Block edits to files that should be off-limits.**卖点：** 阻止对本应禁止的文件进行编辑。

Create **.claude/hooks/protect-files.sh:**创建 **.claude/hooks/protect-files.sh：**

```bash
#!/usr/bin/env bash
set -euo pipefail
file=$(jq -r '.tool_input.file_path // .tool_input.path // ""')

protected=(
  ".env*"
  ".git/*"
  "package-lock.json"
  "yarn.lock"
  "*.pem"
  "*.key"
  "secrets/*"
)

for pattern in "${protected[@]}"; do
  if echo "$file" | grep -qiE "^${pattern//\*/.*}$"; then
    echo "Blocked: '$file' is protected. Explain why this edit is necessary." >&2
    exit 2
  fi
done
exit 0
```

```bash
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/protect-files.sh"
          }
        ]
      }
    ]
  }
}
```

## 4\. Run tests after every edit4. 每次编辑后运行测试

**The problem:** Claude makes a change, says "done," and you discover the tests are broken 20 minutes later when you try to commit.**问题是：**Claude 做了修改，说“完成”，而你尝试承诺时，20 分钟后才发现测试出了问题。

**The hook:** Run your test suite automatically after every code change. If tests fail, Claude sees the failure and can fix it immediately.**关键是：** 每次代码变更后自动运行测试套件。如果测试失败，Claude 会发现并立即修复。

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npm run test --silent 2>&1 | tail -5; exit 0"
          }
        ]
      }
    ]
  }
}
```

The **tail -5** keeps the output short so it doesn't flood Claude's context. You want Claude to see "3 tests failed" not the full 200-line test output. **尾部-5** 保持输出简短，避免淹没 Claude 的上下文。你希望 Claude 看到“3 次测试失败”，而不是完整的 200 行测试输出。

Boris Cherny, the creator of Claude Code, says giving Claude a feedback loop like this improves output quality by 2-3x. Instead of writing code and hoping it works, Claude writes code, sees the test results, and fixes failures on its own.Claude Code 的创始人 Boris Cherny 表示，给 Claude 提供这样的反馈回路可以提升输出质量 2-3 倍。Claude 不是写代码然后指望它能成功，而是自己写代码，查看测试结果，并自行修复故障。

## 5\. Require passing tests before creating a PR5. 要求通过测试后才能创建 PR

**The problem:** Claude finishes a feature and immediately creates a PR. Tests are failing. Your reviewer sees red CI and sends it back.**问题是：**Claude 完成一个功能后立即创建了 PR。测试失败了。你的审核员看到红色 CI 后会退回去。

**The hook:** Block PR creation unless all tests pass.**卖点：** 除非所有测试通过，否则阻止 PR 的创建。

Create **.claude/hooks/require-tests-for-pr.sh:**创建 **.claude/hooks/require-tests-for-pr.sh：**

```text
#!/usr/bin/env bash
set -euo pipefail

if npm run test --silent; then
  exit 0
else
  echo "Tests are failing. Fix all test failures before creating a PR." >&2
  exit 2
fi
```

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "mcp__github__create_pull_request",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/require-tests-for-pr.sh"
          }
        ]
      }
    ]
  }
}
```

This is a hard gate. No green tests, no PR. Claude will fix the failures first because exit code 2 tells it the action was blocked and why.这是一个硬门。没有绿色测试，没有 PR。Claude 会先修复失败，因为退出代码 2 告诉它动作被阻挡及其原因。

## 6\. Auto-lint and report errors6. 自动绒毛和报告错误

**The problem:** Claude writes code that works but violates your ESLint rules, style guide, or type checks. You catch it during review and send it back.**问题是：**Claude 写的代码虽然能用，但会违反你的 ESLint 规则、风格指南或类型检查。你在审查时发现并退回。

**The hook:** Lint after every edit. If lint fails, Claude sees the errors and fixes them before you ever look at the code.**卖点：** 每次编辑后都会有绒毛。如果绒毛失效，Claude 会先发现错误并修复，而不是你查看代码。

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npx eslint --fix $(jq -r '.tool_input.file_path') 2>&1 | tail -10; exit 0"
          }
        ]
      }
    ]
  }
}
```

You can chain this with the auto-format hook from #1. Prettier runs first, then ESLint. By the time you see the code, it's formatted and lint-clean.你可以把它和#1 的自动格式钩子串联起来。先跑漂亮，然后是 ESLint。等你看到代码时，已经格式化好，没有任何绒毛。

## 7\. Log every command Claude runs7. 记录 Claude 执行的每一个命令

**The problem:** Claude runs a lot of shell commands during a session. If something goes wrong, you want to know exactly what it did and when.**问题是：**Claude 在一个会话中运行了很多 shell 命令。如果出现问题，你要准确知道它发生了什么，什么时候发生的。

**The hook:** Append every Bash command to a log file with timestamps.**关键是：** 将每个 Bash 命令附加到带有时间戳的日志文件中。

Create **.claude/hooks/log-commands.sh:**创建 **.claude/hooks/log-commands.sh：**

```bash
#!/usr/bin/env bash
set -euo pipefail
cmd=$(jq -r '.tool_input.command // ""')
printf '%s %s\n' "$(date -Is)" "$cmd" >> .claude/command-log.txt
exit 0
```

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/log-commands.sh"
          }
        ]
      }
    ]
  }
}
```

Now you have a timestamped audit trail of every command Claude ran. Add **.claude/command-log.txt** to your .**gitignore** so it doesn't pollute your repo.现在你有了 Claude 执行的每个命令的时间戳审计轨迹。**command-log.txt** 在你的 .**gitignore**，这样就不会污染你的仓库。

This is especially useful for debugging: if Claude broke something three sessions ago, you can look at the log and find exactly when and what it ran.这对调试特别有用：如果 Claude 三次前出了问题，你可以查看日志，准确查出它何时运行了什么。

## 8\. Auto-commit after each completed task8. 完成任务后自动提交

**The problem:** Claude finishes a task and you forget to commit. Then it starts another task and now you have two unrelated changes mixed together in one commit.**问题是：** 克劳德完成任务时，你却忘了承诺。然后启动另一个任务，这样你就有两个无关的更改混在一个提交里。

**The hook:** Automatically commit all changes when Claude stops working on a task.**卖点：** 当 Claude 停止处理某个任务时，自动提交所有更改。

Create **.claude/hooks/auto-commit.sh:**创建 **.claude/hooks/auto-commit.sh：**

```bash
#!/usr/bin/env bash
set -euo pipefail
git add -A
if ! git diff --cached --quiet; then
  git commit -m "chore(ai): apply Claude edit"
fi
exit 0
```

```json
{
  "hooks": {
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/auto-commit.sh"
          }
        ]
      }
    ]
  }
}
```

Every time Claude finishes a response, changes get committed automatically. Your git history stays clean with atomic commits per task instead of one massive "Claude changes" blob at the end of the day.每次 Claude 完成回复后，更改都会自动提交。你的 git 历史记录保持干净，每个任务提交都是原子级的，而不是一天结束时变成一个庞大的“Claude 更改”大块。

Combine this with **claude -w feature-branch** (worktrees) and you get isolated, auto-committed feature branches for every task.结合 **claude -w feature-branch**（工作树），你就能获得每个任务的独立、自动提交的功能分支。

## The complete settings.json完整 settings.json

Here's everything combined into one file you can copy-paste:这里有所有内容合并成一个文件，你可以复制粘贴：

Screenshot-friendly:友好截图：

![[330ae37d590d7aa311997ea836332a44_MD5.jpg]]

Copy this file into **.claude/settings.json**, create the hook scripts in **.claude/hooks/,** make them executable with **chmod +x .claude/hooks/\*.sh**, and commit everything to git. Your whole team gets the same safety nets automatically.把这个文件复制到 **.claude/settings.json**，用 **.claude/hooks/** 创建钩子脚本 ，用 **chmod +x .claude/hooks/\*.sh** 让它们可执行 ， 然后把所有内容提交到 git。你的整个团队自动获得相同的安全网。

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": ".claude/hooks/block-dangerous.sh" },
          { "type": "command", "command": ".claude/hooks/log-commands.sh" }
        ]
      },
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": ".claude/hooks/protect-files.sh" }
        ]
      },
      {
        "matcher": "mcp__github__create_pull_request",
        "hooks": [
          { "type": "command", "command": ".claude/hooks/require-tests-for-pr.sh" }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          { "type": "command", "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write 2>/dev/null; exit 0" },
          { "type": "command", "command": "npx eslint --fix $(jq -r '.tool_input.file_path') 2>&1 | tail -10; exit 0" }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          { "type": "command", "command": ".claude/hooks/auto-commit.sh" }
        ]
      }
    ]
  }
}
```

The difference between a good Claude Code setup and a great one isn't the model or the prompts. It's the hooks. 一个好的 Claude Code 设置和一个优秀的区别不在于模型或提示词。是钩子。

They're the part that runs when you're not paying attention, catching the mistakes you'd otherwise find during code review or worse, in production.它们是你不注意时运行的部分，能发现你在代码审查甚至更糟的生产环境中可能发现的错误。

Set up hook #1 (auto-format) and #2 (block dangerous commands) today. That alone will save you from the most common Claude Code mistakes. Add the rest as you need them.今天就设置钩子#1（自动格式化）和#2（阻止危险命令）。仅凭这一点就能避免最常见的 Claude 代码错误。剩下的根据需要添加。

I share daily notes on AI, finance, and vibe coding in my Telegram channel: [https://t.me/zodchixquant](https://t.me/zodchixquant)我在我的 Telegram 频道分享关于人工智能、金融和氛围编码的每日笔记：[https://t.me/zodchixquant](https://t.me/zodchixquant)

Thanks for reading 🙏🏼感谢阅读 🙏🏼

![[df764e5fbd18fc3f239a6927f9ceb1fa_MD5.jpg]]