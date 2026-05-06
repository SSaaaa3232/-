---
ingested: 2026-05-06
wiki_page: "[[wiki/sources/Source - 创建带有新分支的工作树]]"
aliases:
tags:
  - ClaudeCode
  - Agent
  - tool
---
Claude Code 支持使用自然语言操作Git，如：

- `> 提交我的更改`
- `> 创建一个 pr`
- `> 哪个提交在去年十二月添加了 markdown 测试？`
- `> 在 main 分支上变基并解决任何合并冲突`
### 使用Git工作树 ​ ​

您可以使用工作树创建隔离的编码环境：

- 如果您需要同时处理多个任务，并在Claude Code实例之间完全隔离代码，您可以使用此功能
- Git工作树允许您从同一存储库中检出多个分支到单独的目录。每个工作树都有自己的工作目录，文件是隔离的，同时共享相同的Git历史
- 创建新工作树：

bash

```
# 创建带有新分支的工作树
git worktree add ../project-feature-a -b feature-a

# 或使用现有分支创建工作树
git worktree add ../project-bugfix bugfix-123
```

- 在每个工作树中运行Claude Code：

bash

```
# 导航到您的工作树
cd ../project-feature-a

# 在这个隔离环境中运行Claude Code
claude
```