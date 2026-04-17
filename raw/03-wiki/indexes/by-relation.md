---
created: 2026-04-05
modified: 2026-04-07
category: index
---

# Concepts by Relation Type

> 按关系类型查看所有概念笔记

---

## Dataview 查询

```dataview
TABLE category, relations, file.ctime AS created
FROM "03-wiki/concepts"
WHERE relations
FLATTEN relations
SORT file.ctime DESC
```

---

## 所有概念及其关系数量

```dataview
TABLE category, length(relations) AS 关联数, file.ctime AS created
FROM "03-wiki/concepts"
WHERE category
SORT length(relations) DESC
LIMIT 30
```

---

## 统计

- 有 relations 字段的概念笔记数：4
- 最后更新：2026-04-07
