---
title: Top MCP Servers That Turn Claude Into a Productivity Machine顶级 MCP 服务器，将 Claude 变成一台高效的机器
source: https://x.com/zodchiii/status/2041804097628582294
author:
  - "[[@zodchiii]]"
published: 2026-04-08
created: 2026-04-08
dailynote: "[https://t.me/zodchixquant](https://t.me/zodchixquant)"
tags:
  - list
  - MCP
---

# MCP Servers 
## 爬虫

| Firecrawl   | https://github.com/firecrawl/firecrawl-mcp-server    |
| ----------- | ---------------------------------------------------- |
| Apify       | https://github.com/apify/actors-mcp-server           |
| Bright Data | https://github.com/nicholasgriffintn/bright-data-mcp |
| Crawl4AI    | https://github.com/unclecode/crawl4ai                |
|             |                                                      |

## websearch

| 序号  | 工具              | 备注                                                    |
| --- | --------------- | ----------------------------------------------------- |
| 1   | minimax         | cli+mcp                                               |
| 2   | step            |                                                       |
| 3   | baidu           |                                                       |
| 4   | baidu ai search |                                                       |
| 5   | tavily          |                                                       |
| 6   | doubao          |                                                       |
| 7   | bailian         |                                                       |
| 8   | exa             |                                                       |
| 9   | brave           |                                                       |
| 10  | linkup          |                                                       |
| 11  | serpapi         |                                                       |
| 12  | bocha           |                                                       |
| 13  | openai          |                                                       |
| 14  | grok            |                                                       |
| 15  | duckduckgo      | hermes agent 自带搜索工具                                   |
| 16  | gemini          |                                                       |
|     | Browserbase     | https://github.com/browserbase/mcp-server-browserbase |


把搜索工具分层，如果主 agent 需要搜索就派发任务给子 agent ，主agent只决定要查什么，然后子 agent 负责搜索和去重，反馈给主 agent ，最后返回带来源的摘要，然后主 agent 屏蔽自身的所有搜索功能。  否则工具越多，token 和噪音越多，模型还容易把不同来源的结论揉在一起。

grok+tavily+exa+brave 做成脚本聚合搜索+交叉验证，tavily+firecrawl 做内容抓取

我使用 exa 和 kimi search 。  
  
kimi 的搜索接口只要有 API KEY 就可以直接访问，我参考这个 [https://github.com/wys010812/Kimi-Search-MCP](https://github.com/wys010812/Kimi-Search-MCP) 项目自己搞了一个给其他工具使用，感觉中文搜索挺好的。


## 开发

|                       |                                                     |
| --------------------- | --------------------------------------------------- |
| GitHub                | https://github.com/github/github-mcp-server         |
| Linear                | https://github.com/linear/linear-mcp-server         |
| Sentry                | https://mcp.sentry.dev/                             |
| Vercel                | https://github.com/vercel/mcp-server-vercel         |
| Jira / Atlassian      | https://github.com/atlassian/mcp-server-atlassian   |
| Supabase              | https://github.com/supabase/mcp-server-supabase     |
| PostgreSQL            | https://github.com/anthropics/anthropic-quickstarts |
| MongoDB               | https://github.com/mongodb/mongodb-mcp-server       |
| Neo4j                 | https://github.com/neo4j/neo4j-mcp-server           |
| Pinecone              | https://github.com/pinecone-io/pinecone-mcp         |
| Qdrant                | https://github.com/qdrant/mcp-server-qdrant         |
| Chroma                | https://github.com/chroma-core/chroma-mcp           |
| Memory MCP            | https://github.com/anthropics/anthropic-quickstarts |
| Notion                | https://github.com/anthropics/anthropic-quickstarts |
| Slack                 | https://github.com/anthropics/anthropic-quickstarts |
| Todoist               | https://github.com/abhiz123/todoist-mcp-server      |
| Zapier                | https://github.com/zapier/zapier-mcp-server         |
| Stripe                | https://github.com/stripe/agent-toolkit             |
| HubSpot               | https://github.com/hubspot/mcp-server-hubspot       |
| Figma                 | https://github.com/nicholasgriffintn/figma-mcp      |
| Bannerbear            | https://github.com/bannerbear/bannerbear-mcp        |
| Cloudflare            | https://github.com/cloudflare/mcp-server-cloudflare |
| Docker                | https://github.com/docker/docker-mcp                |
| Grafana               | https://github.com/grafana/mcp-grafana              |
| qmd                   | 本地搜索引擎                                              |
| smart-connections-mcp | 连接                                                  |
| markdownify-mcp       | PDF/图片/音频转 Markdown                                 |
| MCPHub                | HTTP 管理多 MCP 服务器                                    |
| fastmcp               | 最简方式构建 MCP 服务器                                      |




## How to install any MCP server

**All servers use the same pattern:所有服务器使用相同的模式：**

```text
# Add a server to Claude Code
claude mcp add server-name -- npx -y @package/server

# Add with API key
claude mcp add server-name -e API_KEY=your-key -- npx -y @package/server

# Add globally (all projects)
claude mcp add --scope user server-name -- npx -y @package/server

# List installed servers
claude mcp list

# Remove a server
claude mcp remove server-name
```

**For Claude Desktop, add to your config file:

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@package/server"],
      "env": {
        "API_KEY": "your-key"
      }
    }
  }
}
```

## Where to start
You don't need all 35.

Start with 3-5 that solve problems you have right now:
```text
IF YOU ARE A DEVELOPER:
GitHub + Sentry + Context7 + Playwright

IF YOU DO RESEARCH:
Tavily + Firecrawl + Exa

IF YOU MANAGE PROJECTS:
Linear + Slack + Notion

IF YOU RUN A BUSINESS:
Stripe + HubSpot + Zapier

IF YOU WORK WITH DATA:
Supabase + Firecrawl + Apify
```

Each MCP server you add uses token context. 3-5 servers is the sweet spot. More than that and you're burning tokens on tool descriptions before you even ask a question. 你添加的每个 MCP 服务器都使用令牌上下文。3-5 个服务器是最佳选择。超过这个数额，你甚至还没提问就已经在工具描述上烧代币了。

Claude Code has a Tool Search feature that lazy-loads servers to reduce this, but keep it lean.Claude Code 有一个工具搜索功能，可以对服务器进行懒散加载以减少这种情况，但保持精简。

I
