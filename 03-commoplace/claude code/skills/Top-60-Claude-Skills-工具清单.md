# Top 60 Claude Skills、Workflows 和 GitHub Repos

> 来源：[@eng_khairallah1](https://x.com/eng_khairallah1/status/2037816689665147355) | 2026

这是一份经过 100+ 小时测试的 AI 工具清单，按类别整理。

---

## 一、代码编写、审查与管理

| # | 工具 | 说明 |
|---|------|------|
| 01 | Claude Code | Anthropic 的命令行编码 agent，本地环境直接操作 |
| 02 | Cursor | AI-first 代码编辑器，基于 VS Code |
| 03 | Codex CLI | OpenAI 终端编码 agent |
| 04 | Windsurf | Codeium 的 AI IDE，Cascade agent |
| 05 | **Superpowers** | 20+ 战斗测试过的 Claude Code skills，TDD、调试、计划执行管道 |
| 06 | Spec Kit | 规范驱动开发，AI 从规格生成代码 |
| 07 | Aider | 终端 AI 结对编程，支持任意 LLM |

---

## 二、自主 Agent 系统

| # | 工具 | 说明 |
|---|------|------|
| 08 | **OpenClaw** | 开源 AI agent，多渠道支持（WhatsApp/Telegram/Discord），自写 skills |
| 09 | LangGraph | 多 agent 编排为代码，有分支逻辑、人机交互、持久状态 |
| 10 | CrewAI | 多 agent 框架，角色+目标+背景故事 |
| 11 | AutoGPT | 全自主 agent 平台，长任务运行 |
| 12 | Dify | 开源 LLM 应用构建器，工作流+RAG+agent+模型管理 |
| 13 | OWL | 多 agent 协作框架，GAIA 基准领先 |
| 14 | CopilotKit | React 应用内嵌 AI copilot |
| 15 | pydantic-ai | 基于 Pydantic 的类型安全 agent 框架 |

---

## 三、MCP（Model Context Protocol）

> MCP 给予 AI **访问**外部工具和数据的能力

| # | 工具 | 说明 |
|---|------|------|
| 16 | Tavily | AI 搜索引擎，为 agent 设计的结构化数据 |
| 17 | Context7 | 将最新库文档注入 LLM 上下文 |
| 18 | Task Master AI | AI 项目经理，PRD 转结构化任务 |
| 19 | MCP Playwright | 浏览器自动化 |
| 20 | fastmcp | 最简方式构建 MCP 服务器 |
| 21 | markdownify-mcp | PDF/图片/音频转 Markdown |
| 22 | MCPHub | HTTP 管理多 MCP 服务器 |

---

## 四、Skills（Claude Code）

> Skills 教 AI **如何**更好地做事

| # | 工具 | 说明 |
|---|------|------|
| 23 | PDF Processing | PDF 读取、提取表格、表单填写、合并拆分 |
| 24 | Frontend Design | 构建真实设计系统，生产级 UI |
| 25 | Skill Creator | 元 skill，描述工作流生成完整 skill |
| 26 | Marketing Skills | 20+ skills，CRO、文案、SEO、邮件序列 |
| 27 | Claude SEO | 全站审计、模式验证、关键词分析 |
| 28 | Obsidian Skills | Obsidian CEO 构建，自动标签、自动链接 |
| 29 | Context Optimization | 降低 token 成本，提高 KV-cache 效率 |
| 30 | Deep Research Skill | 8 阶段研究，自动继续 |

---

## 五、本地运行模型

> 隐私、速度、零 API 成本

| # | 工具 | 说明 |
|---|------|------|
| 31 | Ollama | 一条命令本地运行开源 LLM |
| 32 | Open WebUI | 自托管类 ChatGPT 界面 |
| 33 | LlamaFile | 单文件 LLM 包，零依赖 |
| 34 | Unsloth | 2x 更快的微调，70% 更少内存 |
| 35 | vLLM | 高吞吐量推理引擎 |

---

## 六、连接 AI 到现有工具

| #   | 工具       | 说明                             |
| --- | -------- | ------------------------------ |
| 36  | n8n      | 开源工作流自动化，400+ 集成               |
| 37  | Langflow | 可视化 drag-and-drop agent 管道     |
| 38  | Huginn   | 自托管 web agents，监控、告警、数据收集      |
| 39  | DSPy     | 斯坦福研究，编程而非提示 foundation models |
| 40  | Temporal | 持久化工作流引擎                       |

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

## 九、学习资源

| #   | 资源                                    | 说明                  |
| --- | ------------------------------------- | ------------------- |
| 53  | Awesome Claude Skills                 | 最佳 skill 列表         |
| 54  | Anthropic Skills Repo                 | 官方参考实现              |
| 55  | Awesome Agents                        | 100+ 开源 agent 工具列表  |
| 56  | PromptingGuide                        | 提示工程综合指南            |
| 57  | Anthropic Prompt Engineering Tutorial | 9 章实战练习             |
| 58  | SkillsMP                              | 80,000+ 社区 skill 市场 |
| 59  | MAGI//ARCHIVE                         | 每日新鲜 AI repos       |
| 60  | Anthropic Official Docs               | API、提示最佳实践、工具使用     |

---

## 推荐学习路径

### 开发者路线
Claude Code (01) → Superpowers (05) → Context7 (17) → Tavily (16)

### 创作者/知识工作者路线
OpenClaw (08) → Obsidian Skills (28) → PDF Processing (23) → Frontend Design (24)

### 产品构建路线
FastAPI (48) → Instructor (44) → Chroma (45) → LangGraph (09)

### 学习路线
Anthropic Tutorial (57) → PromptingGuide (56) → Anthropic Docs (60)

---

## 核心公式

> **Skills** = 教 AI **如何**做事
> **MCP** = 给予 AI **访问**外部工具和数据
> **Repos** = 驱动一切的开源引擎

---

tags: #AI工具 #Claude #MCP #Skills #LLM #开发效率
