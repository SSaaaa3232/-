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

| skill               | 说明                           | 解决痛点             |
| ------------------- | ---------------------------- | ---------------- |
| agent-browser       | 让AI替你操作网页，不需要配置环境、处理反爬、维护代码。 | 不想重复操作网页         |
| bb-browser          | 调用本地浏览器状态，已登录的直接用，不用每次扫码。    | 不再扫码登录           |
| OpenCLI             | 把评论、关注、搜索等操作做成CLI，覆盖主流平台     | joeseesun一键操作多平台 |
| `agent-reach`       | 互联网搜索和交互                     |                  |
| `web-search`        | AI网页搜索                       |                  |
| Deep Research Skill | 8 阶段研究，自动继续                  |                  |

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


| skill        | 说明                                       | 解决痛点 |
| ------------ | ---------------------------------------- | ---- |
| skill-vetter | 安装技能前扫描风险：网络外发、敏感环境变量、系统目录写入、可疑base64解码。 | 安全扫描 |
|              |                                          |      |

---
## self-improve


| skill                | 说明                                     | 解决痛点            |
| -------------------- | -------------------------------------- | --------------- |
| self-improving-agent | 自动记录纠正过的错误、踩过的坑、反复提到的工作习惯，整理成知识卡片后续调用。 | 不再手动管理记忆，AI学会复盘 |

---
## 创作


| skill                 | 说明                     | 解决痛点 |
| --------------------- | ---------------------- | ---- |
| `canvas-design`       | 视觉艺术设计 - 海报、艺术作品、PDF文档 |      |
| `generate-image`      | AI图片生成                 |      |
| `generate-video`      | AI视频生成                 |      |
| `slack-gif-creator`   | Slack GIF制作            |      |
| `video-frames`        | 视频帧提取                  |      |
| `video-summary-skill` | 视频总结                   |      |
| `frontend-design`     | 前端界面设计                 |      |
| `frontend-slides`     | HTML演示文稿               |      |
| `building-native-ui   | Expo原生UI构建             |      |
| PDF Processing        | PDF 读取、提取表格、表单填写、合并拆分  |      |

---
## 文档/文件类
| skill         | 用途                        |
| ------------- | ------------------------- |
| `docx`        | Word文档处理 - 创建、编辑、格式化      |
| `pdf`         | PDF处理 - 读取、合并、分割、水印、OCR   |
| `pptx`        | PPT处理 - 创建、编辑幻灯片          |
| `xlsx`        | Excel表格处理 - 读取、编辑、公式、图表   |
| `react-email` | React邮件模板 - 欢迎邮件、密码重置、通知等 |

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


| skill           | 说明                        |
| --------------- | ------------------------- |
| Obsidian Skills | Obsidian CEO 构建，自动标签、自动链接 |

---


---

## 七、信息获取与输出

| # | 工具 | 说明 |
|---|------|------|
| 41 | GPT Researcher | 自主研究 agent，生成完整报告 |
| 42 | Firecrawl | 网站转 LLM 可用数据 |
| 43 | Vanna AI | 自然语言转 SQL |
| 44 | Instructor | 从任意 LLM 获取结构化 JSON（Pydantic 模型） |
| 45 | Chroma | 开源向量数据库，语义搜索+长期记忆 |
| 46 | dlt | LLM 原生数据管道，5000+ 数据源 |
| 47 | ExtractThinker | 文档智能 ORM |

---

## 八、生产级基础设施

| #   | 工具                  | 说明                     |
| --- | ------------------- | ---------------------- |
| 48  | FastAPI             | Python Web 框架，服务 AI 应用 |
| 49  | Portkey Gateway     | 路由到 250+ LLM，单一 API    |
| 50  | OmniRoute           | 44+ AI 提供商的 API 代理     |
| 51  | lmnr                | trace 和评估 agent 行为     |
| 52  | Codebase Memory MCP | 代码库转持久知识图谱             |


---
