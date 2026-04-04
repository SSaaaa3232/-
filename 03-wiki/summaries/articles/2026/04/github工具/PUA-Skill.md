# PUA Skill

> AI Coding 技能插件 — 用"职场 PUA 话术"驱动 AI 穷尽所有方案

**来源：** [tanweai/pua](https://github.com/tanweai/pua)

---

## 简介

一个提升 AI 能动性的技能插件，支持 **Claude Code** 和 **OpenAI Codex CLI**。

> 大部分人以为这个项目是在搞抽象，其实这个是最大的误解。这个项目提升了至少 50% 的能动性，让你的生产效率高于其他人。

## 三大能力

| 能力 | 说明 |
|------|------|
| PUA 话术 | 让 AI 不敢放弃 |
| 调试方法论 | 让 AI 有能力不放弃 |
| 能动性鞭策 | 让 AI 主动出击而不是被动等待 |

## 解决的问题：AI 五大偷懒模式

| 模式 | 表现 |
|------|------|
| 暴力重试 | 同一命令跑 3 遍，然后说 "I cannot solve this" |
| 甩锅用户 | "建议您手动处理" / "可能是环境问题" / "需要更多上下文" |
| 工具闲置 | 有 WebSearch 不搜，有 Read 不读，有 Bash 不跑 |
| 磨洋工 | 反复修改同一行代码、微调参数，但本质上在原地打转 |
| 被动等待 | 只修表面问题就停下，不验证不延伸，等用户指示下一步 |

## 触发方式

### 自动触发

- 任务连续失败 2 次以上
- 即将说 "I cannot" / "我无法解决"
- 把问题推给用户
- 用户说"怎么又失败了"、"try harder"等

### 手动触发

对话中输入 `/pua`

## 真实案例

MCP Server 注册问题调试：AI 在同一思路（改协议格式、猜版本号）上原地打转多次后，触发 PUA skill。

- **L3 触发** → 7 项检查清单强制执行
- **根因定位** → 从日志追踪到注册机制
- **结果** → 强制停止原地打转，找到之前从未检查过的 Claude Code MCP 日志目录

## 在线体验

[pua-skill.pages.dev](https://pua-skill.pages.dev)

## 安装

```bash
# Claude Code
claude skill install https://github.com/tanweai/pua

# OpenAI Codex CLI
codex skill install https://github.com/tanweai/pua
```

---

## 相关

- 标签：#工具 #AI #Coding #效率
- Discord：https://discord.gg/EcyB3FzJND
- Twitter：@xsser_w
