---
aliases:
---
# 工具  
| 序号 | 工具 | 备注 |
| --- | --- | --- |
| 1 | minimax | cli+mcp |
| 2 | step |  |
| 3 | baidu |  |
| 4 | baidu ai search |  |
| 5 | tavily |  |
| 6 | doubao |  |
| 7 | bailian |  |
| 8 | exa |  |
| 9 | brave |  |
| 10 | linkup |  |
| 11 | serpapi |  |
| 12 | bocha |  |
| 13 | openai |  |
| 14 | grok |  |
| 15 | duckduckgo | hermes agent 自带搜索工具 |
| 16 | gemini |  |
目前这些都是免费的  

把搜索工具分层，如果主 agent 需要搜索就派发任务给子 agent ，主agent只决定要查什么，然后子 agent 负责搜索和去重，反馈给主 agent ，最后返回带来源的摘要，然后主 agent 屏蔽自身的所有搜索功能。  否则工具越多，token 和噪音越多，模型还容易把不同来源的结论揉在一起。

grok+tavily+exa+brave 做成脚本聚合搜索+交叉验证，tavily+firecrawl 做内容抓取

我使用 exa 和 kimi search 。  
  
kimi 的搜索接口只要有 API KEY 就可以直接访问，我参考这个 [https://github.com/wys010812/Kimi-Search-MCP](https://github.com/wys010812/Kimi-Search-MCP) 项目自己搞了一个给其他工具使用，感觉中文搜索挺好的。
