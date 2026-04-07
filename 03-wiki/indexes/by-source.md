---
created: 2026-04-05
modified: 2026-04-07
category: index
---

# Concepts by Source

> 按原始资料来源查看所有概念笔记

---

## Dataview 查询

```dataview
TABLE category, sources, file.ctime AS created
FROM "03-wiki/concepts"
WHERE sources
FLATTEN sources
SORT file.ctime DESC
```

---

## 按来源查看

### 02-raw/articles

概念笔记对应的原始来源文章。

---

## 最近新增的概念

```dataview
TABLE category, file.ctime AS created
FROM "03-wiki/concepts"
SORT file.mtime DESC
LIMIT 20
```

---

## 统计

- 有 sources 字段的概念笔记数：4
- 最后更新：2026-04-07
