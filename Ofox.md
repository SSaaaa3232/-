---
aliases:
---
# Ofox


## API Key


Claude code cli
```
curl https://api.ofox.ai/anthropic/v1/messages \             

    -H "x-api-key: sk-of-GhzNgYQECWadncuCePQhoGPqKpbPtbZCPpfCDEjswnmgJrLcbQZVPEmtONexTKTj" \     

    -H "anthropic-version: 2023-06-01" \                                                         

    -H "Content-Type: application/json" \                                                        

    -d '{                                                                                        

      "model": "anthropic/claude-sonnet-4.6",                                                    

      "max_tokens": 1024,                                                                        

      "messages": [{"role": "user", "content": "生命的意义是什么？"}]                            

    }'```

