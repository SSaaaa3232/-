---
created: 2026-04-07
modified: 2026-04-07
category: uncategorized
---
# Log

> 03-wiki 的 append-only 操作记录。所有 ingest / query / lint 均追加于此。
> 格式：`## [YYYY-MM-DD] action | 详情`，便于 grep 解析。
> 最近记录置顶（新版式）或置底（旧型式），保持一致即可。

---

## 使用方式

```bash
# 最近 5 条记录
grep "^## \[" 03-wiki/log.md | tail -5

# 某月全部记录
grep "^## \[2026-04\]" 03-wiki/log.md
```

---

## 格式说明

| action | 含义 |
|--------|------|
| `ingest` | 录入新原始资料到 wiki |
| `query` | 问答输出已写回 wiki |
| `lint` | 健康检查完成 |
| `compile` | 批量编译完成 |
| `synthesis` | 综合分析写回 wiki |

每条记录格式：
```markdown
## [YYYY-MM-DD] action | 主体信息
- 操作人: AI / Human
- 涉及文件: [...]
- 关键变化: ...
```

---
