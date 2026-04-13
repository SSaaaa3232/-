---
aliases:
---
# Ofox


## API Key

## winVPS

sk-of-yUUjdRXzCAmtfxKLPutqhiyrTUvOufSCOYPJKQWGAgnHiaGjeikWNbwnqhgDgflV

from anthropic import Anthropic

client = Anthropic(
    api_key="sk-of-yUUjdRXzCAmtfxKLPutqhiyrTUvOufSCOYPJKQWGAgnHiaGjeikWNbwnqhgDgflV",
    base_url="https://api.ofox.ai/anthropic",
)

message = client.messages.create(
    model="anthropic/claude-sonnet-4.6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "生命的意义是什么？"}],
)
print(message.content[0].text)

## Claude code cli

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
   