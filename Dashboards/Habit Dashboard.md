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
  choice(reading, "完成", "-") AS "阅读",
  choice(writing, "完成", "-") AS "写作",
  choice(sleep_before_12, "完成", "-") AS "早睡",
  mood AS "心情",
  energy AS "精力"
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
  choice(reading, "完成", "-") AS "阅读",
  choice(writing, "完成", "-") AS "写作",
  choice(sleep_before_12, "完成", "-") AS "早睡",
  mood AS "心情",
  energy AS "精力"
FROM "Daily Notes"
WHERE type = "daily" AND month = dateformat(date(today), "yyyy-MM")
SORT date ASC
```

## 最近未完成

```dataview
TABLE WITHOUT ID
  file.link AS "笔记",
  choice(!exercise, "运动", "") AS "未运动",
  choice(!reading, "阅读", "") AS "未阅读",
  choice(!writing, "写作", "") AS "未写作",
  choice(!sleep_before_12, "早睡", "") AS "未早睡"
FROM "Daily Notes"
WHERE type = "daily" AND date AND (!exercise OR !reading OR !writing OR !sleep_before_12)
SORT date DESC
LIMIT 14
```
