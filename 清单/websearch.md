---
aliases:
---
# 工具  
1.minimax （ cli+mcp ）  
2.step  
3.baidu  
4.baidu ai search  
5.tavily  
6.doubao  
7.bailian  
8.exa  
9.brave  
10.linkup  
11.serpapi  
12.bocha  
13.openai  
14.grok  
15.duckduckgo （ hermes agent 自带搜索工具）  
16.gemini  
目前这些都是免费的  


之前楼主都是全部写入我的 agent ，然后让自己的 agent 装上，然后一股脑全部调用，然后发现太耗费 token 了，  
然后就弄了个子 agent ，用 minimax-m2.7 ，专门用来提炼+总结，  
如果主 agent 需要搜索就派发任务给子 agent ，然后子 agent 反馈给主 agent ，然后主 agent 屏蔽自身的所有搜索功能。  
目前是这个玩法  


然后所有搜索工具，如果是原始搜索的，返回条目拉到最大。  如果是 ai 总结的，有挡位的调到最大  
mcp 用的是自己写的 mcp 工具，把所有搜索汇集在一起了

grok+tavily+exa+brave 做成脚本聚合搜索+交叉验证，tavily+firecrawl 做内容抓取

我会倾向把搜索工具分层，而不是全塞给主 agent 。主流程只决定要查什么，子流程负责搜索和去重，最后返回带来源的摘要。否则工具越多，token 和噪音越多，模型还容易把不同来源的结论揉在一起。

我使用 exa 和 kimi search 。  
  
kimi 的搜索接口只要有 API KEY 就可以直接访问，我参考这个 [https://github.com/wys010812/Kimi-Search-MCP](https://github.com/wys010812/Kimi-Search-MCP) 项目自己搞了一个给其他工具使用，感觉中文搜索挺好的。