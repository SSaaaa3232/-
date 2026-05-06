---
ingested: 2026-05-06
wiki_page: "[[wiki/sources/Source - 8 Claude Code Hooks That Automate What You Keep Forgetting]]"
title: 8 Claude Code Hooks That Automate What You Keep Forgetting
source: https://x.com/zodchiii/status/2040000216456143002
author:
  - "[[@zodchiii]]"
published: 2026-04-03
created: 2026-04-07
description: Have you ever told Claude Code to do something and it just didn't?你有没有让 Claude Code 做某件事，但它就是没做？You said format the code - It didn't. You sa...
modified: 2026-04-13
telegram: https://t.me/zodchixquant
full docuemnt: https://code.claude.com/docs/en/hooks
tags:
  - automate
  - hooks
  - ClaudeCode
---
# Scene

- Have you ever told Claude Code to do something and it just didn't?

- You said format the code - It didn't. You said don't touch that file - It did. 

- You said run tests before finishing - It forgot.

>**That's because CLAUDE.md is a suggestion.

# difference between hooks and CLAUDE.md

- CLAUDE.md:
	- Claude reads it and follows it about 80% of the time. 

- hooks:
	- They're automatic actions that fire every time Claude edits a file, runs a command, or finishes a task.

# How hooks work (30-second version) What are hooks?

- Hooks are automatic actions that run every time Claude Code does something, like editing a file or running a command. 

- set them up once and they work in the background without you thinking about it.

# The two you'll use most:

**PreToolUse** 

1. Think of it as a bouncer.
2. runs before Claude does something. You can inspect the action and block it by returning exit code 

**PostToolUse** 

1. runs after Claude does something.
2. You can run cleanup, formatting, tests, or logging. 
3. Think of it as quality control on the assembly line.

```markdown
Where hooks live:

.claude/settings.json         project-level (shared via git)
~/.claude/settings.json       user-level (all your projects)
.claude/settings.local.json   local only (not committed)
```

![[fe9b158eafe9d0a0b8ce55ed1280b2a6_MD5.jpg]]

# 8 hooks
## 1\. Auto-format every file Claude touches1. 自动格式化 Claude 触碰的每个文件

**The problem:** 
	Claude writes correct code that breaks your formatting rules. You add "always run Prettier" to CLAUDE.md and it works most of the time, but not always.

**The hook:** 
	Prettier runs automatically after every file write or edit.

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

>This was the first hook I set up and honestly it should be the default for every project. No more "Claude forgot to format" commits.

## 2\. Block dangerous commands2. 阻止危险指令

**The problem:** Claude is powerful enough to run rm -rf, git reset --hard, DROP TABLE, or curl to random URLs. It probably won't, but "probably" isn't good enough when it's your production database.
**问题是：**Claude 足够强大，可以运行 rm -rf、git reset --hard、DROP TABLE，或者 curl 到随机的 URL。可能不会，但“可能”对你的生产数据库来说是不够的。

**The hook:** Block destructive commands before they execute.

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

**The problem:** Claude can read and edit any file in your project. That includes **.env, package-lock.json**, config files, and anything else you'd rather it didn't touch.
**问题是：**Claude 可以读取和编辑你项目中的任何文件。这包括 **.env、package-lock.json**、配置文件，以及你不希望它碰到的其他文件。

**The hook:** Block edits to files that should be off-limits. 阻止对本应禁止的文件进行编辑。

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

**The problem:** Claude makes a change, says "done," and you discover the tests are broken 20 minutes later when you try to commit.
**问题是：**Claude 做了修改，说“完成”，而你尝试承诺时，20 分钟后才发现测试出了问题。

**The hook:** 
	Run your test suite automatically after every code change.
	If tests fail, Claude sees the failure and can fix it immediately.

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

**The hook:** Block PR creation unless all tests pass.除非所有测试通过，否则阻止 PR 的创建。

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

## 6\. Auto-lint and report errors

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

Create **.claude/hooks/auto-commit.sh:

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


# Screenshot-friendly

![[330ae37d590d7aa311997ea836332a44_MD5.jpg]]

Copy this file into **.claude/settings.json**,
create the hook scripts in **.claude/hooks/,** 
make them executable with **chmod +x .claude/hooks/\*.sh**, and commit everything to git. Your whole team gets the same safety nets automatically.


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

# Last

The difference between a good Claude Code setup and a great one isn't the model or the prompts. ==>It's the hooks

They're the part that runs when you're not paying attention, catching the mistakes you'd otherwise find during code review or worse, in production.

Set up hook #1 (auto-format) and #2 (block dangerous commands) today. That alone will save you from the most common Claude Code mistakes. Add the rest as you need them.


![[df764e5fbd18fc3f239a6927f9ceb1fa_MD5.jpg]]