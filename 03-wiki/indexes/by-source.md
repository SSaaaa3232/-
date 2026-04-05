# Concepts by Source

> 自动生成 — 请勿手动编辑

---

## 按来源查看概念

```dataview
TABLE sources, category, file.ctime AS created
FROM "03-wiki/concepts"
FLATTEN file.etags AS sources
WHERE sources != ""
GROUP BY sources
```

---

## 最近新增的概念

```dataview
TABLE category, length(sources) AS 引用来源数
FROM "03-wiki/concepts"
SORT file.ctime DESC
LIMIT 20
```
