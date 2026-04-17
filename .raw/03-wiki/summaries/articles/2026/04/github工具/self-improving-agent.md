---
created: 2026-04-04
modified: 2026-04-04
tags:
  - github工具
category: github工具
---
# self-improving-agent

> ClawHub Skills 排名第一
> GitHub: peterskoett/self-improving-agent
> Stars: 259

---

## 概述

记录经验、总结错误，形成持久化的经验记忆，提取成 Skills，自我提升。

---

## 三层架构

### 1. 日志采集
在项目根目录建立 `.learnings/` 目录：

| 文件 | 用途 |
|------|------|
| `LEARNINGS.md` | 被用户纠正的错误认知、过时的知识、更优的做法 |
| `ERRORS.md` | 命令执行失败、异常堆栈、意外行为 |
| `FEATURE_REQUESTS.md` | 用户希望 Agent 具备但目前缺失的能力 |

### 2. 经验晋升
日志只是原始材料。当某条经验被验证为普遍适用时，"晋升"到更高层级：

| 晋升到 | 内容 |
|--------|------|
| `CLAUDE.md` | 项目级的事实和约定 |
| `AGENTS.md` | Multi Agents 协作的工作流规则 |
| `SOUL.md` | OpenClaw 行为准则和沟通风格 |
| `TOOLS.md` | 工具使用的注意事项和已知坑点 |

### 3. Skill 提取
当某条经验足够通用（不仅对当前项目有用），进一步提取为独立的 Skill。

---

## 自动化机制

- **activator.sh**：挂载在 UserPromptSubmit，每次用户发送消息后提醒评估是否需要记录经验
- **error-detector.sh**：挂载在 PostToolUse，监听 Bash 命令执行结果，检测到非零退出码时触发记录

---

## 循环模式检测

### 晋升规则（量化）

当满足以下条件时自动晋升：
- `Recurrence-Count >= 3`（出现3次以上）
- 跨 2 个以上任务
- 30 天内发生

### 避免两个极端
- 过早晋升 → 配置文件膨胀
- 过晚晋升 → 同样错误不断重复

---

## 日志格式

### 统一结构
```
唯一ID，时间戳、优先级、状态、涉及的代码区域、详细描述、建议修复方案、See Also 字段
```

### ID 格式
- `LRN-YYYYMMDD-XXX` - 学习
- `ERR-YYYYMMDD-XXX` - 错误
- `FEAT-YYYYMMDD-XXX` - 功能请求

---

## 推广示例

**原始记录**：
> 项目用 pnpm workspaces，我试了 npm install 结果失败了，锁文件是 pnpm-lock.yaml，必须用 pnpm install。

**晋升后写入 CLAUDE.md**：
```markdown
Package manager: pnpm (not npm) - use pnpm install
```

---

## 多 Agent 兼容性

| Agent | 激活方式 |
|-------|----------|
| Claude Code / Codex | Hook 脚本 |
| OpenClaw | Workspace 注入 + 会话间通信 |
| GitHub Copilot | 手动写入 instructions |

---

## 相关资源

- GitHub: https://github.com/peterskoett/self-improving-agent
- ClawHub: https://clawhub.ai/pskoett/self-improving-agent

---

## 关联

- [[x/未思考/AI逼你深度思考-牛津方法]]
- [[记忆库/强制规则/深度思考工作流]]
- [[browser-use]]
