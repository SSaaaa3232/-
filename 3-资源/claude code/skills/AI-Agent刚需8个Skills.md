# AI Agent 最刚需的8个Skills

> 来源：https://x.com/ai_jacksaku/status/2034229454361276437
> 作者：阿川 | AI thinking
> 日期：2026-03-18
> 点赞：130K

---

## 核心理念

> 工具的价值不在于功能多全，在于解决你的什么痛点。

---

## 8个刚需Skills

### 1. agent-browser —— 操作网页

让AI替你操作网页，不需要配置环境、处理反爬、维护代码。

```
npx skills add vercel-labs/agent-browser@agent-browser
```

**解决痛点**：不想重复操作网页

---

### 2. bb-browser —— 免登录神器

调用本地浏览器状态，已登录的直接用，不用每次扫码。

```
npx skills add epiral/bb-browser@bb-browser
```

**解决痛点**：不再扫码登录

---

### 3. OpenCLI —— 18个平台一句话操作

把评论、关注、搜索等操作做成CLI，覆盖B站、小红书、X、Reddit、GitHub等18个平台。

```
npx skills add joeseesun/opencli-skill@opencli
```

**解决痛点**：一键操作多平台

---

### 4. skill-vetter —— 安装前安检

安装技能前扫描风险：网络外发、敏感环境变量、系统目录写入、可疑base64解码。

```
npx skills add useai-pro/openclaw-skills-security@skill-vetter
```

**解决痛点**：安全扫描

---

### 5. self-improving-agent —— 学会复盘

自动记录纠正过的错误、踩过的坑、反复提到的工作习惯，整理成知识卡片后续调用。

```
npx skills add charon-fan/agent-playbook@self-improving-agent
```

**解决痛点**：不再手动管理记忆，AI学会复盘

---

### 6. lossless-claw —— 长记忆

把对话持久化存到数据库，打包成树状结构摘要控制Token消耗。

```
npx skills add Martian-Engineering/lossless-claw
```

**解决痛点**：AI"失忆"问题

---

### 7. control-center —— 仪表盘

查看每只Agent消耗多少Token、健康状态、修改记忆/人设/任务文档。

```
npx skills add aradotso/trending-skills@openclaw-control-center
```

**解决痛点**：管理七八只Agent不知道状态

---

### 8. openclaw-backup —— 最后一道保险

定时备份整个Agent的配置文件和记忆库，一键回档。

```
npx skills add theagentservice/skills@openclaw-backup
```

**解决痛点**：不小心把AI"养死"能恢复

---

## 对我有什么用？

| Skill | 能否用到 | 原因 |
|-------|---------|------|
| agent-browser | ✅ | 读取X帖子用到 |
| bb-browser | ❌ | 暂不需要发小红书 |
| OpenCLI | ✅ | 多平台操作 |
| skill-vetter | ✅ | 安装新技能前安全检查 |
| self-improving-agent | ✅ | 记录错误和经验 |
| lossless-claw | ✅ | 长期记忆 |
| control-center | ❌ | 暂只养1只 |
| openclaw-backup | ✅ | 备份以防万一 |

---

## 行动清单

- [ ] 安装 skill-vetter（安全扫描）
- [ ] 安装 self-improving-agent（复盘学习）
- [ ] 安装 lossless-claw（长记忆）
- [ ] 安装 openclaw-backup（备份）

---

## 原文

> 来源：https://x.com/ai_jacksaku/status/2034229454361276437
> 日期：2026-03-18
> 点赞：130K

装了删，删了装，折腾半个月，最后发现最刚需的其实就这8个。不是它们功能最全，是它们解决了我最真实的痛苦：不再扫码登录、不再重复操作网页、不再担心龙虾失忆、不再手动管理七八只龙虾的状态。

---

## 相关

- 标签：#AI #Agent #ClaudeCode #OpenClaw #Skills
- 参考：[[GitHub工具]]
