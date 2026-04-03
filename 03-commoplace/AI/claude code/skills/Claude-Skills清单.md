---
tags:
  - AI
  - ClaudeCode
  - Skills
  - 工具
阅读日期: 2026-02-04
source: https://x.com/ai_jacksaku/status/2034229454361276437
---
> Skills 教 AI **如何**更好地做事
# skills
## browser

| skill               | 说明                             | 解决痛点             |
| ------------------- | ------------------------------ | ---------------- |
| agent-browser       | 让AI替你操作网页，不需要配置环境、处理反爬、维护代码。   | 不想重复操作网页         |
| bb-browser          | 调用本地浏览器状态，已登录的直接用，不用每次扫码。      | 不再扫码登录           |
| OpenCLI             | 把评论、关注、搜索等操作做成CLI，覆盖主流平台       | joeseesun一键操作多平台 |
| `agent-reach`       | 互联网搜索和交互                       |                  |
| `web-search`        | AI网页搜索                         |                  |
| Deep Research Skill | 8 阶段研究，自动继续                    |                  |
| last30days-skill    | AI agent skill，研究任何主题并综合总结<br> |                  |

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
## 安全审查


| skill                     | 说明                                       | 解决痛点 |
| ------------------------- | ---------------------------------------- | ---- |
| skill-vetter              | 安装技能前扫描风险：网络外发、敏感环境变量、系统目录写入、可疑base64解码。 | 安全扫描 |
| `openclaw-backup`         | OpenClaw备份 - 加密备份和恢复                     |      |
| `openclaw-control-center` | OpenClaw控制中心 - 仪表盘和token追踪               |      |

---
## self-improve


| skill                | 说明                                     | 解决痛点            |
| -------------------- | -------------------------------------- | --------------- |
| self-improving-agent | 自动记录纠正过的错误、踩过的坑、反复提到的工作习惯，整理成知识卡片后续调用。 | 不再手动管理记忆，AI学会复盘 |
| `self-improvement`   | 自我改进 - 从错误中学习                          |                 |

---
## 创作


| 分类                                 | 说明                                | 解决痛点          |
| ---------------------------------- | --------------------------------- | ------------- |
| 图片创作                               |                                   |               |
| `canvas-design`                    | 视觉艺术设计 - 海报、艺术作品、PDF文档            |               |
| `generate-image`                   | AI图片生成                            |               |
| PDF Processing                     | PDF 读取、提取表格、表单填写、合并拆分             |               |
| `slack-gif-creator`                | Slack GIF制作                       |               |
| Flowchart Decision Builder         | 专门生成「带判断、带分支」的决策流程图               | 复杂逻辑变成一目了然    |
| ```excalidraw-diagram-generator``` | 文字转架构图 / 流程图                      | Excalidraw    |
| infographic-builder                | 文字内容，整理成**适合做成信息图 / 数据图 / 海报**的结构 | 报告、PPT、科普材料   |
| UI设计                               |                                   |               |
| UI/UX Layout Advisor               | **界面设计建议**，告诉你怎么排版、怎么布局更好看、更好用    |               |
| `frontend-design`                  | 前端界面设计                            |               |
| `frontend-slides`                  | HTML演示文稿                          |               |
| `building-native-ui                | Expo原生UI构建                        |               |
| 视频总结                               |                                   |               |
| video-summary-skill                | 用 AI 总结 YouTube 和 B站 视频           |               |
| `youtube-video-analyzer`           | YouTube分析 - 字幕、评论、总结、情感分析         |               |
| `video-summary-skill`              | 视频总结                              |               |
| 视频创作                               |                                   |               |
| `generate-video`                   | AI视频生成                            |               |
| `remotion`                         | 视频创作                              |               |
| `video-frames`                     | 视频帧提取                             |               |
| `octolens`                         | 品牌提及追踪 - Twitter、Reddit、GitHub等   |               |
| `reddit` / `reddit-fetch`          | Reddit浏览和内容获取                     |               |
| `xiaohongshu`                      | 小红书搜索和浏览                          |               |
| 文案创作                               |                                   |               |
| scqa-writing-framework             | 用于结构化沟通的框架                        | 写作结构（骨架）      |
| Structured-Copywriting-Skill       | 专门写 “高转化、有结构” 文案                  | 文案风格（肌肉 + 包装） |
| 总结长文                               |                                   |               |
| long-form-summary-compresso        | “浓缩精华” ：把长文压短，只留干货，不丢重点           | 长篇内容摘要压缩器     |
| content-repurposing-engine         | 让 AI 把长文自动改成推文、短视频脚本、摘要           | 知识变现          |

### 代码

- [[SCQA]]
- [[Content Repurposing Engine]]
- [[long-form-summary-compresso]]
- [[Structured Copywriting Skill]]
- [[Excalidraw Diagram Generator]]
- [[Infographic Builder]]
- [[Flowchart Decision Builder]]
- [[UI/UX Layout Advisor]]
- 
---

# Excalidraw Diagram Generator

## Overview

Transforms ideas into diagram structures for visualization, learning, and planning.

**Keywords**: diagrams, visualization, excalidraw, workflows, mapping

## Features

- Node and connector generation
- Logical hierarchy
- Clear labels

## Output Format

- Diagram title
- Nodes and connections
- Layout suggestion

## Instructions

- Identify main elements
- Create nodes
- Connect logically
- Suggest layout

## Constraints

- Avoid clutter
- Maintain clarity
```
---
# 论文


| skill                      | 说明                    |     |
| -------------------------- | --------------------- | --- |
| paper-craft-skills         | 论文工艺：深度解读、漫画生成、速览总结   |     |
| ai-paper-reader-skill      | 帮助 Claude 更好地理解 AI 论文 |     |
| `comprehensive-researcher` | 综合研究 - 多源交叉验证         |     |
| `deep-thinking`            | 深度思考 - 批判性分析          |     |

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

| Skill                              | 用途                               |
| ---------------------------------- | -------------------------------- |
| `skill-creator`                    | 创建新skill，元 skill，描述工作流生成完整 skill |
| `skill-vetter`                     | skill安全审查                        |
| `use-findskill`                    | 发现和安装skill                       |
| `find-skills`                      | 搜索skill                          |
| `supabase-postgres-best-practices` | Postgres性能优化和最佳实践                |


---
# 企业


| skill            | 说明                             |
| ---------------- | ------------------------------ |
| Claude SEO       | 全站审计、模式验证、关键词分析                |
| Marketing Skills | 20+ skills，CRO、文案、SEO、邮件序列     |
| Superpowers      | 20+ 测试过的  skills，TDD、调试、计划执行管道 |

---
# 知识管理


| skill               | 说明                                            |
| ------------------- | --------------------------------------------- |
| Obsidian Skills     | Obsidian CEO 构建，自动标签、自动链接                     |
| notebooklm-skill    | 与 Google NotebookLM 通信，查询你上传的文档，获取基于来源的答案     |
| obsidian-note-taker | Claude Desktop Skill，用于生成格式化的 Obsidian 笔记<br> |
| `notion`            | Notion API - 创建、搜索、更新页面                       |

---
