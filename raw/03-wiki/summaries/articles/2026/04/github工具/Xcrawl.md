---
source: https://x.com/RookieRicardoR/status/2034793001864872440
阅读日期: 2026-03-19
链接: https://www.xcrawl.com/?keyword=ut0qflxk
skill文档: https://docs.xcrawl.com/zh/doc/developer-guides/openclaw/
tags:
  - 工具
  - OpenClaw
  - Skill
  - 爬虫
created: 2026-04-04
modified: 2026-04-04
---

---

## 工具：XCrawl

- 目的：批量抓取（公开内容）

- 4个核心能力：
1. **Search**：搜索引擎查询，返回结构化结果，中英文检索不同
2. **Map**：扫描站点，列出所有URL，检索站点结构
3. **Scrape**：抓取指定URL，输出干净Markdown
4. **Crawl**：全站递归爬取

---
# example：批量抓取

- Simon Willison

- AI 工具链领域最活跃的独立开发者之一，博客[simonwillison.net](https://simonwillison.net/)
-  上有超过十年的技术文章，内容覆盖 Python、SQLite、LLM 应用、数据工程……信息密度极高。


## 案例：抓取Simon Willison博客

### 第一步：Map拿到所有文章URL
```
用 xcrawl-map 扫描 simonwillison.net，
列出所有路径中包含 "/2024/" 或 "/2025/" 或 "/2026/" 的 URL，上限 500 条。
```

### 第二步：Scrape逐篇抓取
```
用 xcrawl-scrape 批量抓取上面这些 URL 的正文内容，输出为干净的 Markdown 格式。
```

### 结果
- 233篇文章
- 耗时不到10分钟
- 全部干净的Markdown

### 第三步：让AI分析
```
基于 Simon Willison 的所有文章，总结他对 AI Agent 架构的核心观点，引用具体文章作为出处。
```

---

## 从零构建陌生领域知识库

### 1. Search 找方向
```
用 xcrawl-search 搜索 "WebAssembly practical guide 2025"
```

### 2. Map 探路
```
用 xcrawl-map 列出这个文档站 /docs/ 路径下的所有 URL，上限 200 条。
```

### 3. Scrape 抓取
```
用 xcrawl-scrape 抓取筛选出的这 80 个 URL 的内容，输出 Markdown，保存到本地文件夹。
```



---

## 对我有什么用？

| 应用 | 场景 |
|------|------|
| 抓取X高质量账号内容 | 想学某个领域 |
| 构建私人知识库 | 用AI分析 |
| 批量抓取网站 | 做自己的资料库 |

---

## 相关

- 标签：#AI #知识管理 #XCrawl
