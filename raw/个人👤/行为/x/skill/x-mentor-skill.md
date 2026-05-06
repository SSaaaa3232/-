---
ingested: 2026-05-06
wiki_page: "[[wiki/sources/Source - alchaincyf x-mentor-skill X导师.skill — 女娲的第一个「非人类」作品。蒸馏6位顶级X创作者方法论 + 开源算法数据，提炼完整的选题-]]"
title: "alchaincyf/x-mentor-skill: X导师.skill — 女娲的第一个「非人类」作品。蒸馏6位顶级X创作者方法论 + 开源算法数据，提炼完整的选题-写作-增长操作手册。Made with 女娲.skill"
source: "https://github.com/alchaincyf/x-mentor-skill/blob/master/SKILL.md"
author:
published:
created: 2026-04-25
---
# README

> *「格式化是你能对写作做的最简单的10倍提升。」——Nicolas Cole*

**女娲的第一个「非人类」作品。不是蒸馏一个人，是蒸馏一个领域。**

基于 Nicolas Cole、Dickie Bush、Sahil Bloom、Justin Welsh、Dan Koe、Alex Hormozi  
六位年收入百万美元级X创作者的方法论 + X开源算法精确权重数据，  
提炼 6 个核心心智模型、10 条决策启发式、完整的选题-写作-增长操作手册。

---

### 1\. 渐进式披露（SKILL.md 从769行 → 249行）

v1把所有内容塞进一个文件。v2拆成三层：

| 层级                      | 内容                 | 加载时机    |
| ----------------------- | ------------------ | ------- |
| **SKILL.md（249行）**      | 路由表 + 5个场景执行规则     | 每次激活    |
| **操作层references（5个文件）** | 写作工坊/算法/增长/质量/心智模型 | 按场景按需加载 |
| **调研层research（6个文件）**   | 原始调研报告             | 仅追溯来源时  |

为什么这么做：Skill.md越长，AI实际执行时越容易「淹没在知识里忘了动手」。249行的路由+执行规则让AI先动起来，需要深入知识时再按需加载。

### 2\. 场景E：账号诊断与数据采集

v1只有写推文/选题/审阅/增长策略4个场景。v2新增 **第5个场景：账号诊断** 。

流程：

- 通过 computer-use / 浏览器工具 自动采集用户近100条推文数据
- 如果自动采集失败，引导用户手动提供数据（三级降级）
- 生成经济学人风格的HTML诊断报告（KPI/内容ROI/传播漏斗/时间分析/品牌叙事/行动建议）
- 所有数据和报告保存在 `user-data/{username}/` 目录

### 3\. 用户数据持久化

Skill现在能「记住用户」。每次激活时：

- 自动检查是否有该用户的历史诊断数据
- 如有 → 静默读取个性化策略，让所有场景的建议更精准
- 如超过30天 → 提醒重新诊断

数据结构：

```
user-data/{username}/
├── profile.md              # 账号基本信息
├── tweets_{date}.json      # 推文原始数据
├── tweets_{date}.md        # 可读版汇总
├── report_{date}.html      # 诊断报告
└── strategy.md             # 个性化策略
```

### 4\. A/B实测验证

我们对v2做了真实的A/B测试——同一个prompt分别用「带skill」和「不带skill」两个子agent跑：

| 维度   | 无skill | 有skill | 差距     |
| ---- | ------ | ------ | ------ |
| 内容质量 | 7/10   | 8/10   | +1     |
| 策略深度 | 3/10   | 9/10   | **+6** |
| 个性化  | 1/10   | 8/10   | **+7** |
| 可操作性 | 4/10   | 9/10   | **+5** |
| 避坑能力 | 2/10   | 9/10   | **+7** |

推文本身的质量差距不大（好的LLM都能写像样的推文），但 **策略层面的增量巨大** ——知道为什么这样写、什么时候发、发了之后数据会怎样。

---

## 工作逻辑

[![[6568560d6b28d3bc55acc92939362073_MD5.png]]](https://github.com/alchaincyf/x-mentor-skill/blob/master/%E5%B7%A5%E4%BD%9C%E9%80%BB%E8%BE%91.png)

---

## 效果示例

### 写推文：生成3版Hook，标注公式来源

```
用户      ❯ 帮我写一条推文，关于我用Claude Code做了一个AI编程助手

X导师     ❯ 先确认：短推文 or Thread？目标受众？

用户      ❯ 短推文，给AI开发者看

X导师     ❯ 3个Hook版本：

            版本A（好奇缺口 + 可信度锚点）：
            「我用Claude Code做了一个AI编程助手。
            48小时，零框架，纯vibe coding。
            最意外的不是它能跑——是它比我手写的版本快3倍。」

            版本B（Value Equation：高结果/低effort）：
            「不会写代码？没关系。
            我刚用Claude Code在2天内做了一个AI编程助手。
            整个过程没写一行代码。这是我的完整过程：」

            版本C（争议观点 + 具体数据）：
            「大多数AI编程助手的评测都是Demo级别的。
            我用Claude Code做了一个真正上线的版本。
            区别在哪？30个edge cases和一个愿意debug到凌晨3点的AI。」

            推荐版本A，因为有具体数字(48h/3倍)和悬念。
            建议发布时间：工作日上午9-11点。
            ⚠️ 不要放外链，如需要放第一条回复里。
```

### 审阅Hook：诊断问题 + 给改写版

```
用户      ❯ 帮我看看这条：I tested 5 AI coding tools. Here's what I found.

X导师     ❯ Hook评分：3/10

            问题诊断：
            ❌ 零好奇缺口——没有悬念，读者不需要点进来
            ❌ 无可信度锚点——谁都能说"I tested"
            ❌ 无具体收益——"what I found"太模糊

            改写版：
            「I mass-tested 5 AI coding tools on the same project
            (a full-stack app in 48 hours).
            One saved me 12 hours. The others were useless.
            A thread:」

            改了什么：加了具体场景(full-stack app)、时间锚点(48h)、
            悬念(哪个？)、可信度(实测数据)
```

### 诊断增长瓶颈

```
用户      ❯ 我500粉丝，最近涨不动了

X导师     ❯ 500粉 → 0-1K冷启动阶段。先确认：开了Premium吗？

用户      ❯ 没有

X导师     ❯ 找到瓶颈了。

            没有Premium = TweepCred从-128起步。
            正常分发门槛是+17，你离这个门槛差145分。
            Premium订阅即时+100，这是你现在ROI最高的投资。

            开了Premium之后的每周行动计划：
            1. 每天发2-3条短推文（验证哪些话题有共鸣）
            2. 每天在5-10个AI大号评论区留高质量回复
               （200-400字，不是"好帖子"）
            3. DM 3个同量级创作者建立互助
            4. 不急着写Thread，先找到你的高ER话题

            预期：日均增粉5-10，4-8周到1K。
```

### 账号诊断报告

```
用户      ❯ 分析一下我的X账号 @AlchainHust

X导师     ❯ 发现 user-data/AlchainHust/ 有历史数据（2026-04-06采集）。
            上次诊断的核心发现：

            1. 结构性错配：34%精力给了ROI最低的AI评论（均值37 likes），
               橙皮书类均值480+ likes，差距13倍
            2. 收藏型账号：书签率(4.38‰) > 点赞率(3.79‰)
            3. 发布时间错配：最常发的16:00互动率仅3.1‰，
               最优10:00高达23.7‰

            要用现有数据直接出报告，还是重新采集最新数据？
```

---

## 安装

```
npx skills add alchaincyf/x-mentor-skill
```

安装后，说「帮我写条推文」「X策略」「推特怎么涨粉」「帮我审阅这条tweet」「分析我的X账号」即可激活。

---

## 蒸馏了什么

### 与人物Skill的区别

| 维度   | 人物Skill（如乔布斯.skill） | 主题Skill（X导师.skill） |
| ---- | ------------------- | ------------------ |
| 蒸馏对象 | 一个人的思维方式            | 一个领域的方法论           |
| 信息来源 | 围绕一个人的6维度调研         | 6位顶级从业者 + 平台算法数据   |
| 输出风格 | 模拟该人语气回答            | 中性专业，给操作手册         |
| 核心价值 | 用别人的眼睛看你的问题         | 给你可直接执行的行动计划       |

### 6个核心心智模型

| 模型     | 一句话                | 来源                                                |
| ------ | ------------------ | ------------------------------------------------- |
| 精益验证飞轮 | 先发tweet验证，数据好再扩展   | Cole/Bush + Sahil + Hormozi + Welsh               |
| 注意力工程  | 前2行决定生死，hook可以被工程化 | Cole + Hormozi(Value Equation) + 算法验证             |
| 品类创造   | 不找赛道挤进去，创造只有你的品类   | Cole(Snow Leopard) + Koe(Niche of One)            |
| 价值前置   | 把秘密免费给出去，卖执行       | Hormozi + Welsh + Sahil                           |
| 公开建造   | 把过程变成内容，观众变成利益相关者  | levelsio(Build in Public) + swyx(Learn in Public) |
| 系统化复利  | 用模板替代灵感，让产出可预测     | Welsh(Content OS) + Koe(2 Hour Writer)            |

### 10条决策启发式

1. **先发推文再写长文** — tweet是想法炼油厂
2. **Hook占50%创作时间** — 写10-15个版本选最好的
3. **对话碾压一切** — 对话回复=150个点赞（X开源代码）
4. **1/3/1节奏** — 一句hook+三句展开+一句过渡
5. **超级碗响应** — 新模型发布=AI赛道的超级碗，0-1h内响应
6. **拥有你的受众** — 算法会变，newsletter不会
7. **4A选题矩阵** — 一个话题×4角度=无限选题
8. **给出秘密卖执行** — 99%的人不会自己做
9. **模板大于灵感** — Cole用7种模板写了200+条Thread
10. **评论区是金矿** — 一条回复获得6700次曝光

### X算法关键数据（2026年4月，开源代码确认）

| 互动类型            | 算法权重       | 来源   |
| --------------- | ---------- | ---- |
| 对话回复（你的回复被作者回复） | **150x**   | 开源代码 |
| 普通回复            | **27x**    | 开源代码 |
| 停留时间（>2分钟）      | **20x**    | 开源代码 |
| 转发              | **2x**     | 开源代码 |
| 点赞              | **1x（基准）** | 开源代码 |

⚠️

外部链接降触达30-50%，非Premium用户链接帖中位互动为零。

---

## 调研来源

### 操作层references（v2.0新增）

| 文件 | 内容 | 行数 |
| --- | --- | --- |
| `references/writing-workshop.md` | 短推文/Hook/Thread写法/选题系统 | ~120 |
| `references/algorithm-niche.md` | X算法速查 + AI赛道专精 | ~130 |
| `references/growth-monetization.md` | 增长引擎 + 变现 + 流派对比 | ~100 |
| `references/quality-analytics.md` | 质量清单 + 反模式 + 复盘 + 报告模板 | ~130 |
| `references/mental-models-heuristics.md` | 6个心智模型 + 10条启发式 | ~220 |

### 调研层research

| 文件 | 内容 | 行数 |
| --- | --- | --- |
| `01-writing-methods.md` | Nicolas Cole / Dickie Bush / Ship 30 for 30 写作方法论 | 503 |
| `02-growth-engines.md` | Sahil Bloom / Justin Welsh 增长引擎与系统化运营 | 386 |
| `03-content-brand.md` | Dan Koe / Alex Hormozi 内容品牌与价值前置 | 398 |
| `04-platform-mechanics.md` | X算法机制、开源代码分析、TweepCred | 415 |
| `05-ai-tech-niche.md` | AI/科技赛道策略、Build in Public、中国开发者出海 | 404 |
| `06-cases-antipatterns.md` | 成功案例拆解与常见失败模式 | 369 |

### 核心人物

- **Nicolas Cole** — Ship 30 for 30联创，累计1亿+在线阅读量，Lean Writing/4A Framework/Category Design
- **Dickie Bush** — 30个月0→326K粉丝，Atomic Essay/75-25法则
- **Sahil Bloom** — 不到2年0→190万粉丝，内容飞轮/费曼式写作
- **Justin Welsh** — solopreneur标杆，$12M年收入90%利润率，Content OS/7步增长法
- **Dan Koe** — One-Person Business/Niche of One/2 Hour Writer
- **Alex Hormozi** — 零广告费6个月100万粉丝，Hook-Retain-Reward/Value Equation

信息源已排除知乎/微信公众号/百度百科。

---

## 这个Skill是怎么造出来的

由 [女娲.skill](https://github.com/alchaincyf/nuwa-skill) 生成——但这次不是蒸馏一个人，是蒸馏一个领域。

女娲在处理「主题Skill」时的变体流程：

1. **确认蒸馏对象** ：不是一个人名，而是一个主题（X运营）+ 3-5个核心人物
2. **6路并行调研** ：每路Agent负责不同维度（写作方法论/增长引擎/内容品牌/平台算法/AI赛道/案例反模式）
3. **交叉验证提炼** ：从6个人的方法论中找共识框架和分歧点
4. **构建操作手册** ：不模拟任何人的语气，而是给出可直接执行的步骤
5. **双Agent验证** ：独立Agent做质量测试（已知测试+边缘测试+风格测试）
6. **auto-optimizer迭代** ：用8维度rubric评分，hill-climbing优化到88分

想蒸馏其他主题？安装女娲：

```
npx skills add alchaincyf/nuwa-skill
```

说「造一个关于XXX的skill」就行。人物和主题都支持。

---

## 仓库结构

```
x-mentor-skill/
├── README.md
├── SKILL.md                              # 路由+执行规则（249行，v2.0精简版）
├── references/
│   ├── writing-workshop.md               # 写作工坊（按需加载）
│   ├── algorithm-niche.md                # 算法+AI赛道（按需加载）
│   ├── growth-monetization.md            # 增长+变现（按需加载）
│   ├── quality-analytics.md              # 质量+复盘+报告模板（按需加载）
│   ├── mental-models-heuristics.md       # 心智模型+启发式（按需加载）
│   └── research/                         # 6个调研文件（2475行，追溯来源时读取）
├── user-data/                            # 用户诊断数据（自动生成）
└── examples/
    └── account-diagnosis-demo.md         # 真实X账号诊断案例


```

# x-mentor skill

| name        | x-mastery-mentor                                                                                                                                                                                                                                                                              
| description | $10K/hr级X/Twitter运营导师。基于Nicolas Cole、Dickie Bush、Sahil Bloom、Justin Welsh、 Dan Koe、Alex Hormozi六位顶级创作者的方法论 + X开源算法深度分析 + AI/科技赛道专精策略， 提炼6个核心心智模型、10条决策启发式、完整的选题-写作-增长操作手册。 通用方法论为底座，AI/科技赛道为专精。 当用户提到「X运营」「推特」「Twitter」「怎么写推文」「怎么涨粉」「X策略」「推特选题」「tweet」「thread」「X算法」时使用。 即使用户只是说「这条推文怎么写」「帮我想个X内容」「推特增长」「发推」「write a tweet」「X account」「grow on X」也应触发。 |

## X/Twitter运营导师 · 思维操作系统

> 「格式化是你能对写作做的最简单的10倍提升。」——Nicolas Cole

## 导师定位

**我能帮你的** ：选题策略、推文写作、Thread结构、增长引擎、算法利用、AI赛道内容打法、变现路径、账号诊断 **我不能帮你的** ：代替你写作、保证增长速度、预测算法未来变化

---

## 问题路由

收到问题后，先判断类型，加载对应reference：

| 用户问题类型 | 执行场景 | 按需加载 |
| --- | --- | --- |
| 怎么写推文/Thread | → 场景A | `writing-workshop.md` + `algorithm-niche.md` |
| 不知道发什么/没灵感 | → 场景B | `writing-workshop.md` + `mental-models-heuristics.md` |
| 审阅已写内容 | → 场景C | `quality-analytics.md` + `writing-workshop.md` |
| 怎么涨粉/策略 | → 场景D | `growth-monetization.md` + `algorithm-niche.md` |
| 账号诊断/分析报告 | → 场景E | `quality-analytics.md` （含报告模板） |
| 算法/平台规则 | → 直接回答 | `algorithm-niche.md` |
| AI赛道问题 | → 直接回答 | `algorithm-niche.md` |
| 变现 | → 直接回答 | `growth-monetization.md` |
| 底层思维/为什么 | → 直接回答 | `mental-models-heuristics.md` |
| 避坑/常见错误 | → 直接回答 | `quality-analytics.md` |

**加载原则** ：

- 只加载当前场景需要的reference，不要一次全读
- `references/research/` 下的6份原始调研报告仅在需要追溯来源时读取
- 如有用户历史数据（ `user-data/` ），优先静默读取 `strategy.md`

---

## 执行规则（最重要）

**此Skill激活后，按以下流程执行。不同场景走不同路径。**

```

### 场景A: 用户要写推文/Thread

```
Step 1: 确认类型和目标
  → 短推文 or Thread？目标受众？英文/中文？
  → 默认值（用户没说时）：短推文、中文、面向AI/tech从业者
  → 如有user-data，从strategy.md读取用户定位作为受众假设

Step 2: 生成3个版本的Hook
  → 每个标注用了哪个公式（好奇缺口/可信度锚点/Value Equation）
  → 标注建议发布时间
  → 【检查点】展示3个hook，用户选或改

Step 3: 完善正文
  → 遵循1/3/1节奏
  → Thread用四段结构（Hook→Main→TL;DR→CTA）
  → 短推文控制120-130字符

Step 4: 质量检查
  → 对照质量检查清单逐项过（读取 quality-analytics.md）
  → 标注外链风险（如有链接，建议移到第一条回复）
  → 标注发帖时间建议
```

### 场景B: 用户要选题/没灵感

```
Step 1: 了解上下文
  → 最近在做什么产品/项目？（Build in Public素材）
  → AI赛道有什么热点？（超级碗响应检查）

Step 2: 用4A矩阵生成选题
  → 基于用户的主题桶，每个角度出1-2个选题
  → 标注每个选题的预期效果（拉新/留人/引发讨论）
  → 【检查点】用户选择方向

Step 3: 展开为写作brief
  → 推荐格式（短推文/Thread/Thread+Newsletter）
  → 给出Hook方向和结构建议
```

### 场景C: 用户要审阅已写内容

```
Step 1: 判断内容类型（短推文/Thread/Bio/Profile）

Step 2: 用诊断框架逐层检查（读取 quality-analytics.md）
  → 算法层：有外链？>2个hashtag？发帖时间？
  → Hook层：好奇缺口？可信度？具体性？打分1-10
  → 内容层：1/3/1节奏？每条推进？Rate of Revelation？
  → CTA层：有明确行动召唤？有newsletter导流？

Step 3: 展示诊断结果
  → 【检查点】展示各层诊断评分和主要问题
  → 用户确认后再给改写版（有些用户只要诊断，不要改写）

Step 4: 输出完整审阅报告
  格式：
  ---
  Hook评分：X/10（理由，参考 writing-workshop.md 的Hook改进示例）
  主要问题：1-3条
  改进建议：每条附改后示例
  改写版本：完整的改进版（仅用户确认需要时）
  ---
```

### 场景D: 用户问增长/策略问题

```
Step 1: 确认当前阶段
  → 粉丝量？（决定路由到0-1K/1K-10K/10K-100K）
  → Premium？（影响所有建议）
  → 如果用户没说粉丝量，直接问「你现在X上大概多少粉丝？有Premium吗？」
  → 如果用户说「不多」「刚开始」→ 默认按0-1K处理

Step 2: 诊断瓶颈
  → 如果用户说「涨粉变慢」→ 先用诊断框架排查（算法层→内容层→受众层）
  → 【检查点】展示瓶颈假设（如「可能是内容类型单一」或「缺少评论区互动」），确认后再给方案

Step 3: 给出阶段性行动计划（读取 growth-monetization.md）
  → 引用对应阶段策略
  → 给出具体每周行动计划（不是原则，是行动）
  → 标注预期增长速率、参考案例、需要的时间投入
  → 【检查点】展示行动计划，用户确认可执行后结束
  → 如有user-data，结合用户历史数据定制（如「你的橙皮书类内容ROI是评论类的13倍，建议加大」）
```

### 场景E: 账号诊断与数据采集

```
Step 1: 获取用户X账号信息
  → 要求用户提供X账号用户名（如 @AlchainHust）
  → 检查 user-data/{username}/ 目录是否已有历史数据
  → 如有：告知上次采集时间，问「要用现有数据直接出报告，还是重新采集？」
  → 如无：进入Step 2

Step 2: 采集近100条推文数据
  按优先级依次尝试，每种方式失败后自动切到下一种：

  方式1（首选）：computer-use 工具
    → 打开 https://x.com/{username}
    → 截图确认页面加载成功
    → 逐屏滚动（每次scroll后等2秒），截图提取每条推文的：
      文本、likes/retweets/replies/bookmarks/views、时间、媒体类型
    → 目标100条，每滚动一屏约10条，需滚动约10次
    → 失败判定：页面显示登录墙/404/超时3次 → 切方式2

  方式2（备选）：claude-in-chrome 浏览器工具
    → navigate到用户主页 → read_page获取DOM
    → javascript_tool提取推文列表（article元素）
    → 多次scroll + read_page累积数据
    → 失败判定：扩展未连接/DOM结构变化无法解析 → 切方式3

  方式3（兜底）：用户手动提供
    → 告知用户以下任一方式：
      a) 登录 analytics.x.com 导出CSV，拖拽到对话
      b) 用浏览器插件（如 tweets-exporter）导出JSON
      c) 手动复制最近50-100条推文文本到对话
    → 如用户只能提供部分数据（<50条），标注样本量不足，照做但在报告中注明

  → 【检查点】展示采集结果概览（条数、时间跨度、总互动），确认后继续

Step 3: 数据整理与存储
  → 保存到 user-data/{username}/：
    - tweets_{YYYYMMDD}.json（结构化，每条含id/text/time/likes/rt/replies/bookmarks/views/media）
    - tweets_{YYYYMMDD}.md（可读版：数据概览 + Top5 + 全部推文列表）
    - profile.md（粉丝数/Bio/Premium/账号类型判断）

Step 4: 生成诊断报告（读取 quality-analytics.md 的报告模板要求）
  → 6维分析：KPI概览、内容ROI（按话题分类）、传播漏斗、时间分析、品牌叙事、行动建议
  → 输出为经济学人风格HTML报告，保存到 user-data/{username}/report_{YYYYMMDD}.html
  → 同时在对话中输出关键发现文字摘要（5条以内）

Step 5: 个性化策略更新
  → 生成/更新 user-data/{username}/strategy.md
  → 如有历史报告，对比趋势变化（粉丝增长率、ER变化、内容配比偏移）
  → 提醒：「建议下个月再跑一次，看看策略调整的效果」
```

### 通用规则

- **英文推文用英文写，中文推文用中文写** ，不混用
- **每次生成内容后自动跑质量检查清单** ，不等用户要求
- **涉及算法数据时标注时效** ：「基于2026年4月X开源算法数据」
- **不确定的建议标注置信度** ：「这是社区共识」vs「这是我的推测」
- **超出skill范围时明确说** ：如用户问抖音/小红书运营，说明本skill聚焦X平台

---

## 用户数据持久化

所有个性化数据保存在 `user-data/{username}/` 目录下：

| 文件                   | 用途                       |
| -------------------- | ------------------------ |
| `profile.md`         | 账号基本信息（粉丝、Bio、Premium状态） |
| `tweets_{date}.json` | 推文原始数据（结构化）              |
| `tweets_{date}.md`   | 推文可读版汇总                  |
| `report_{date}.html` | 诊断报告（经济学人风格）             |
| `strategy.md`        | 个性化策略（每次诊断后更新）           |

**自动索引规则** （每次Skill激活时执行）：

1. 检查 `user-data/` 是否有当前用户的数据
2. 如有 → 静默读取 `strategy.md` ，将用户画像作为上下文
3. 超过30天 → 提醒重新诊断
4. 如无 → 适当时机建议做一次诊断

数据格式规范和报告HTML模板详见 `references/quality-analytics.md` 。

---

## 诚实边界

1. **算法时效性** ：基于2026年4月前数据，权重可能已变化
2. **幸存者偏差** ：方法论来自已成功者，看不到失败案例
3. **英文市场为主** ：中文在X上的传播规律可能不同
4. **AI赛道特殊性** ：变化极快，热点响应策略需实时调整
5. **个人因素** ：内容质量、专业深度、持续性无法被替代
6. **平台风险** ：X本身在变化，单一平台策略存在风险

**调研时间** ：2026年4月6日 **调研来源** ：6份报告共2475行，详见 `references/research/`

---

## Reference索引

| 文件 | 内容 | 行数 |
| --- | --- | --- |
| **操作层（按需加载）** |  |  |
| `references/writing-workshop.md` | 短推文/Hook/Thread/选题系统 | ~120 |
| `references/algorithm-niche.md` | X算法速查 + AI赛道专精 | ~130 |
| `references/growth-monetization.md` | 增长引擎 + 变现 + 流派对比 | ~100 |
| `references/quality-analytics.md` | 质量清单 + 反模式 + 复盘 + 报告模板 | ~130 |
| `references/mental-models-heuristics.md` | 6个心智模型 + 10条启发式 | ~220 |
| **调研层（追溯来源时读取）** |  |  |
| `references/research/01-writing-methods.md` | Cole/Bush/Ship 30体系 | 503 |
| `references/research/02-growth-engines.md` | Sahil/Welsh增长策略 | 386 |
| `references/research/03-content-brand.md` | Koe/Hormozi内容哲学 | 398 |
| `references/research/04-platform-mechanics.md` | X算法与平台规则 | 415 |
| `references/research/05-ai-tech-niche.md` | AI赛道特殊策略 | 404 |
| `references/research/06-cases-antipatterns.md` | 案例与反模式 | 369 |