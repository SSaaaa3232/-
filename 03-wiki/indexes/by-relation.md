# Concepts by Relation Type

> 自动生成 — 请勿手动编辑

---

## 所有概念及其关系数量

```dataview
TABLE category, length(relations) AS 关联数
FROM "03-wiki/concepts"
WHERE category
SORT length(relations) DESC
LIMIT 30
```
