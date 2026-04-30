---
type: dashboard
---

# Habit Dashboard

## 最近 30 天

```dataview
TABLE WITHOUT ID
  file.link AS "笔记",
  date AS "日期",
  choice(exercise, "完成", "-") AS "运动",
  choice(x, "完成", "-") AS "X",
  choice(sleep_before_12, "完成", "-") AS "早睡",
  choice(喝水2L, "完成", "-") AS "喝水 2L",
  choice(早饭, "完成", "-") AS "早饭"
FROM "Daily Notes"
WHERE type = "daily" AND date
SORT date DESC
LIMIT 30
```

## 本月记录

```dataview
TABLE WITHOUT ID
  file.link AS "笔记",
  choice(exercise, "完成", "-") AS "运动",
  choice(x, "完成", "-") AS "X",
  choice(sleep_before_12, "完成", "-") AS "早睡",
  choice(喝水2L, "完成", "-") AS "喝水 2L",
  choice(早饭, "完成", "-") AS "早饭"
FROM "Daily Notes"
WHERE type = "daily" AND month = dateformat(date(today), "yyyy-MM")
SORT date ASC
```

## 最近未完成

```dataview
TABLE WITHOUT ID
  file.link AS "笔记",
  choice(!exercise, "运动", "") AS "未运动",
  choice(!x, "X", "") AS "未 X",
  choice(!sleep_before_12, "早睡", "") AS "未早睡",
  choice(!喝水2L, "喝水 2L", "") AS "未喝水 2L",
  choice(!早饭, "早饭", "") AS "未早饭"
FROM "Daily Notes"
WHERE type = "daily" AND date AND (!exercise OR !x OR !sleep_before_12 OR !喝水2L OR !早饭)
SORT date DESC
LIMIT 14
```
