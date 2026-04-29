---
title: "1"
source: https://x.com/alin_zone/status/2049092355949838729
author:
  - "[[@alin_zone]]"
published: 2026-02-09
created: 2026-04-29
---

## CLI 路径

终端跑:

> where claude

会输出一行路径:

![[fd8307b999938ab64b2dac032001d07e_MD5.jpg]]

你的输出会和我不一样(路径长得像不像没关系),**完整复制这一行**,待会要粘到 Claudian 设置里。

> ⚠️ **没输出?** 重开终端再试一次;Linux 上 where 找不到的话改用 which claude。

## Step 4:填到 Claudian 设置

回到 Obsidian → 左下角齿轮 ⚙️ → 左侧菜单滑到底找到 **Claudian** → 点进去。

进入 Claudian 设置后,先把语言切成中文,然后**留意顶部有 3 个 tab**:「**通用**」「**Claude**」「**Codex**」。**先切到「Claude」tab**。

![[3f1f60ad881142f9c83477dd4e3fe0e0_MD5.jpg]]

**「设置」区域第一栏「Claude CLI 路径」**,把刚才 Step 3 复制的路径**完整粘进去**。

页面下面还有「安全」「模型」「命令与技能」几个区域,**全部保持默认即可**。下面这几项只针对特定用户:

- **「加载用户 Claude 设置」**:已经在终端配过 ~/.claude/settings.json 的用户打开
- **「模型」区域**(截图红框):**Max / Team / Enterprise 套餐用户**按需调整 1M 上下文 / Custom models,普通用户全部忽略


## Openrouter- Ling 跑 Claude Code


![[a7740098ee989e7f8bd18b578c3cc081_MD5.jpg]]

> ⚠️ API Key 只显示一次,务必保存好。丢了得重新生成。

**Step 2:找到免费模型 Ling-2.6-1T 并复制模型 ID**

❶ OpenRouter 顶部菜单点进 **Models** 页面 ❷ 搜索框输入 ling → 第一个结果就是 **inclusionAI: Ling-2.6-1T (free)**(标记 **Free**,输入输出都不计费) ❸ 点模型名右边的 **复制图标** → 复制下来的模型 ID 就是:

> inclusionai/ling-2.6-1t:free

> 💡 OpenRouter 上有不少免费模型,Ling-2.6-1T 是其中表现不错的一个。就算免费期结束,按当前公开价格看也属于很便宜的一档。

![[e44076ae5bc6190b63ab0ff7c7020145_MD5.jpg]]


❷ **API Key** 字段 → 粘上一步复制的 OpenRouter Key。

❸ **把模型名 inclusionai/ling-2.6-1t:free 填到下面这 5 个字段里**(每个都填同一个):

- **主模型**
- **推理模型 (Thinking)**
- **Haiku 默认模型**
- **Sonnet 默认模型**
- **Opus 默认模型**

> ⚠️ **这一步是关键**:CC Switch 把 Claude Code 内部用的所有模型角色都映射给底层 provider 处理,所以 Haiku / Sonnet / Opus 三档全部得指向 Ling 这一个模型。少填一个,对应那档调用就会失败。

❹ 点右下角蓝色「**添加**」按钮。

![[119b74b8219d5c38747b89e2cb4051cc_MD5.jpg]]

**Step 5:启用 OpenRouter**

回到 CC Switch 主界面,能看到刚加的 **OpenRouter** provider 卡片,右边有蓝色「**▶** **启用**」按钮,**点它**。

![[dbaf379a4d8b9fa80438fc164333f4ef_MD5.jpg]]

> 💡 **Claude Code 切换提供商后不需要重启**,直接生效。也可以从系统托盘右键直接切换。

**Step 6:★ 验证白嫖通道**

回 Claudian 主面板 → 用 Claude 组的任意模型(Opus / Sonnet / Haiku 都行,反正底下都走 Ling)→ 发一句"**你好**"。

只要 AI 回复就说明**白嫖通道打通**。此时你跑的就是 Ling-2.6-1T,**完全不产生费用**。

![[ad31d4eaf4354562c5182f2352680674_MD5.jpg]]

## 四、通道二:配 Codex(本文核心增量)

不管你走的是主线官方登录,还是番外白嫖路线,到这一步 Claude Code 都能用了。如果你只想用 Claude,到这就可以收工。

但 Claudian 还有一手玩法:**再挂一条 Codex 通道,两边随时切换**。这一节官方 README 几乎没写、网上也搜不到完整教程。下面是我实测可跑的全流程。


##  CLI 路径

终端跑:

> where codex

输出一行路径:

![[8fa529367a315d9d49d6a6b50acd40aa_MD5.jpg]]

我这里是 /Users/rongshi/.local/bin/codex,和 Claude 一样,你看到的具体路径会和我不同,**完整复制下来**就行。

## Step 4:填到 Claudian 设置(关键)

回到 Obsidian → Claudian 设置 → 顶部 tab **切到「Codex」**。

![[eab9ad817cc588d6dd98e6922e6bf1c9_MD5.jpg]]

这一步**有两个动作必须都做,少一个 Codex 都不会出现在切换菜单里**:

❶ **打开「Enable Codex provider」开关**(截图里红框 ❶)

> ⚠️ 这是 Codex 通道的总闸,**默认是关的**。打开之后 Codex 模型才会出现在 Claudian 的模型选择器里。这一步全网教程没人提到,是真正的"踩坑陷阱"。如果你最后切换菜单里看不到 Codex,99% 是这个开关没打开。

❷ **在「Codex CLI path」字段**,把刚才 Step 3 复制的 codex 路径**完整粘进去**(截图里红框 ❷)

## Step 5:★ 验证能跑

回到 Claudian 主面板 → **切换到 Codex**→ 发一句"**你好**"。

只要 AI 回复了,就是**Codex 通道打通**。

> ⚠️ **切换菜单里看不到 Codex?** 1️⃣ 检查 Step 4 那个 Enable Codex provider 开关是不是打开了 2️⃣关闭 Obsidian 之后重新启动 3️⃣在 claudian 中新建一个对话框即可

## 五、双模型切换:左下角一键选

两条通道都配好之后,切换位置是 **Claudian 对话框左下角的模型选择器**。点一下弹出下拉菜单,里面**分两组**:

![[80b22a77e42b7d01316a639de69d257a_MD5.jpg]]

- **CLAUDE 组**:Opus / Sonnet / Haiku
- **CODEX 组**:GPT-5.4 / GPT-5.4 Mini

> ⚠️ **下拉菜单里只看到 CLAUDE 组,没 CODEX 组?** 1️⃣检查 Step 4 ❶ 那个 Enable Codex provider 开关是不是打开了 2️⃣关闭 Obsidian 之后重新启动 3️⃣在 claudian 中新建一个对话框即可

