---
tags:
  - AI
  - ClaudeCode
  - Skills
  - 工具
阅读日期: 2026-02-04
source: https://x.com/ai_jacksaku/status/2034229454361276437
created: 2026-04-04
modified: 2026-04-04
---
> Skills 教 AI **如何**更好地做事
# skills
## browser

| skill                     | 说明                                          | 解决痛点                   |
| ------------------------- | ------------------------------------------- | ---------------------- |
| agent-browser             | 让AI替你操作网页，不需要配置环境、处理反爬、维护代码。                | 不想重复操作网页               |
| bb-browser                | 调用本地浏览器状态，已登录的直接用，不用每次扫码。                   | 不再扫码登录                 |
| OpenCLI                   | 把评论、关注、搜索等操作做成CLI，覆盖主流平台                    | joeseesun一键操作多平台       |
| `agent-reach`             | 互联网搜索和交互                                    |                        |
| `web-search`              | AI网页搜索                                      |                        |
| Deep Research Skill       | 8 阶段研究，自动继续                                 |                        |
| last30days-skill          | AI agent skill，研究任何主题并综合总结<br>              |                        |
| deep-research-synthesizer | 把**大量、杂乱、长篇的资料**自动**过滤噪音 → 提炼规律 → 合成高价值结论** | 从海量信息里提纯高价值洞察，而不只是简单缩句 |
| `octolens`                | 品牌提及追踪 - Twitter、Reddit、GitHub等             |                        |
| `reddit` / `reddit-fetch` | Reddit浏览和内容获取                               |                        |
| `xiaohongshu`             | 小红书搜索和浏览                                    |                        |

### 代码

- [[Deep Research Synthesizer]]
- 
---
## memory


| skill                | 说明                                    | 解决痛点            |
| -------------------- | ------------------------------------- | --------------- |
| memOS                |                                       |                 |
| lossless-claw        | 把对话持久化存到数据库，打包成树状结构摘要控制Token消耗。       | AI"失忆"问题        |
| control-center       | 查看每只Agent消耗多少Token、健康状态、修改记忆/人设/任务文档。 | 管理七八只Agent不知道状态 |
| openclaw-backup      | 定时备份整个Agent的配置文件和记忆库，一键回档             | 不小心把AI"养死"能恢复   |
| Context Optimization | 降低 token 成本，提高 KV-cache 效率            |                 |

---
## onchain

`

| skill                        | 说明                 |
| ---------------------------- | ------------------ |
| onchain-transaction-analyzer | 翻译区块链上的钱包、合约、代币转账记 |
|                              |                    |


### 代码

- [[onchain-transaction-analyzer]]
- 
---
## 安全审查


| skill                     | 说明                                       | 解决痛点  |
| ------------------------- | ---------------------------------------- | ----- |
| skill-vetter              | 安装技能前扫描风险：网络外发、敏感环境变量、系统目录写入、可疑base64解码。 | 安全扫描  |
| `openclaw-backup`         | OpenClaw备份 - 加密备份和恢复                     |       |
| `openclaw-control-center` | OpenClaw控制中心 - 仪表盘和token追踪               |       |
| Source Validation Skill   | 优先高质量来源，检测信息可靠性                          | 真相过滤器 |

## 代码

- [[Source Validation Skill]]
- 
---
## self-improve


| skill                | 说明                                     | 解决痛点            |
| -------------------- | -------------------------------------- | --------------- |
| self-improving-agent | 自动记录纠正过的错误、踩过的坑、反复提到的工作习惯，整理成知识卡片后续调用。 | 不再手动管理记忆，AI学会复盘 |
| `self-improvement`   | 自我改进 - 从错误中学习                          |                 |

---
## 创作


| 分类                                 | 说明                                         | 解决痛点          |
| ---------------------------------- | ------------------------------------------ | ------------- |
| 图片创作                               |                                            |               |
| `canvas-design`                    | 视觉艺术设计 - 海报、艺术作品、PDF文档                     |               |
| `generate-image`                   | AI图片生成                                     |               |
| PDF Processing                     | PDF 读取、提取表格、表单填写、合并拆分                      |               |
| `slack-gif-creator`                | Slack GIF制作                                |               |
| Flowchart Decision Builder         | 专门生成「带判断、带分支」的决策流程图                        | 复杂逻辑变成一目了然    |
| ```excalidraw-diagram-generator``` | 文字转架构图 / 流程图                               | Excalidraw    |
| infographic-builder                | 文字内容，整理成**适合做成信息图 / 数据图 / 海报**的结构          | 报告、PPT、科普材料   |
| baoyu-article-illustrator          | 自动分析你的文章结构，判断哪些位置需要插图，然后用「类型×风格」的二维组合来生成   |               |
| UI设计                               |                                            |               |
| UI/UX Layout Advisor               | **界面设计建议**，告诉你怎么排版、怎么布局更好看、更好用             | **设计思路和规范**   |
| `frontend-design`                  | 前端界面设计                                     |               |
| `frontend-slides`                  | HTML演示文稿                                   |               |
| `building-native-ui                | Expo原生UI构建                                 |               |
| 视频总结                               |                                            |               |
| video-summary-skill                | 用 AI 总结 YouTube 和 B站 视频                    |               |
| `youtube-video-analyzer`           | YouTube分析 - 字幕、评论、总结、情感分析                  |               |
| `video-summary-skill`              | 视频总结                                       |               |
| 视频创作                               |                                            |               |
| caption-subtitle-formatter         | 处理底部的字幕，格式化字幕                              | HeyGen        |
| `generate-video`                   | AI视频生成                                     |               |
| `remotion`                         | 视频创作                                       |               |
| `video-frames`                     | 视频帧提取                                      |               |
| Video Editing Planner              | 剪辑师，一套逻辑严密、节奏紧凑的指南                         |               |
| video-script-generator             | 总编剧，**有逻辑、有情绪、能留住观众的**语言脚本                 |               |
| 文案创作                               |                                            |               |
| hook-generator                     | 引人注目                                       |               |
| scqa-writing-framework             | 用于结构化沟通的框架                                 | 写作结构（骨架）      |
| Structured-Copywriting-Skill       | 专门写 “高转化、有结构” 文案                           | 文案风格（肌肉 + 包装） |
| 总结长文                               |                                            |               |
| long-form-summary-compresso        | “浓缩精华” ：把长文压短，只留干货，不丢重点                    | 长篇内容摘要压缩器     |
| content-repurposing-engine         | 让 AI 把长文自动改成推文、短视频脚本、摘要                    | 知识变现          |
| 一键发布                               |                                            |               |
| baoyu-post-to-x                    | 用的是真实 Chrome 浏览器自动化，支持文字、图片、视频、长文 Article。 |               |

### 代码

- [[SCQA]]
- [[Content Repurposing Engine]]
- [[long-form-summary-compresso]]
- [[Structured Copywriting Skill]]
- [[Excalidraw Diagram Generator]]
- [[Infographic Builder]]
- [[Flowchart Decision Builder]]
- [[UX Layout Advisor]]
- [[caption-subtitle-formatter]]
- [[hook-generator]]
- [[Video Editing Planner]]
- [[video-script-generator]]
- 
---



---
## 文档

| skill         | 用途                        |
| ------------- | ------------------------- |
| `docx`        | Word文档处理 - 创建、编辑、格式化      |
| `pdf`         | PDF处理 - 读取、合并、分割、水印、OCR   |
| `pptx`        | PPT处理 - 创建、编辑幻灯片          |
| `xlsx`        | Excel表格处理 - 读取、编辑、公式、图表   |
| `react-email` | React邮件模板 - 欢迎邮件、密码重置、通知等 |
| `capymail`    | 邮件发送                      |

---
## 代码

| Skill                              | 用途                              | 人格         |
| ---------------------------------- | ------------------------------- | ---------- |
| `skill-creator`                    | 把你的需求（Goal）转化成 AI 能理解的**结构化指令** |            |
| `skill-vetter`                     | skill安全审查                       |            |
| `use-findskill`                    | 发现和安装skill                      |            |
| `find-skills`                      | 搜索skill                         |            |
| `supabase-postgres-best-practices` | Postgres性能优化和最佳实践               |            |
| workflow-automation-agent          | 根据任务属性分配最合适的工具逻辑                | 排兵布阵的指挥官   |
| Code Review Skill                  | 检查代码                            | 极其挑剔的资深架构师 |

## 代码

- [[Skill Creator]]
- [[Workflow Automation Agent]]
- [[Code Review Skill]]
- 

---
# 企业


| skill                          | 说明                             | 人格    |     |
| ------------------------------ | ------------------------------ | ----- | --- |
| Claude SEO                     | 全站审计、模式验证、关键词分析                |       |     |
| Marketing Skills               | 20+ skills，CRO、文案、SEO、邮件序列     |       |     |
| Superpowers                    | 20+ 测试过的  skills，TDD、调试、计划执行管道 |       |     |
| devops-assistant               | 确保你的开发和实验流程是**规范化、自动化且可追溯**的   | 数字管家  |     |
| competitive-intelligence-skill | 理性化作决策                         | 首席分析师 |     |
|                                |                                |       |     |
## 代码

- [[devops-assistant]]
- [[competitive-intelligence-skill]]
- 

---
# 知识管理


| skill                       | 说明                                            |        |
| --------------------------- | --------------------------------------------- | ------ |
| Obsidian Skills             | Obsidian CEO 构建，自动标签、自动链接                     |        |
| notebooklm-skill            | 与 Google NotebookLM 通信，查询你上传的文档，获取基于来源的答案     |        |
| obsidian-note-taker         | Claude Desktop Skill，用于生成格式化的 Obsidian 笔记<br> |        |
| knowledge-structuring-skill | 梳理成**结构化、可复用的精华笔记**，碎片化思考**变成**系统化文档**        | 首席整理官  |
| baoyu-url-to-markdown       | 转化纯净Markdown                                  | 素材收集利器 |
## 代码

- [[knowledge-structuring-skill]]
- 
---
