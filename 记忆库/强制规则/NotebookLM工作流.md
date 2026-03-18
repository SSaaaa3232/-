# 强制规则：NotebookLM + Excalidraw 学习工作流

> 触发词：链接、总结、这个视频、这个帖子
> 更新：2026-03-18

---

## 触发条件

用户分享以下内容时：
- YouTube 链接
- X 帖子链接
- 网页链接
- 文章链接

---

## 工作流

### Step 1：获取内容

1. 使用 WebFetch 读取链接内容
2. 如果是 YouTube，尝试获取字幕

### Step 2：NotebookLM 总结（需要用户API）

如果用户提供了 NotebookLM API Key：
1. 调用 NotebookLM API
2. 生成核心观点总结
3. 生成思维导图

### Step 3：Excalidraw 画图

使用 OB 的 Excalidraw 插件：
1. 根据思维导图内容
2. 绘制可视化图表
3. 存到笔记中

### Step 4：保存到 Obsidian

保存位置：`x/已思考/YYYY-MM/`

笔记结构：
```
# [标题]

> 来源：链接
> 日期：YYYY-MM-DD

## 核心观点
1. ...
2. ...

## 思维导图
[Excalidraw图表]

## 参考内容
[摘要/笔记]
```

---

## 用户需要提供

- NotebookLM API Key（可选）
- 如果没有API，用WebFetch读取内容手动总结

---

## 示例

用户说："https://x.com/xxx"

我执行：
1. 读取内容
2. 提取核心观点（3-5条）
3. 在OB中创建Excalidraw图表
4. 保存笔记

---

## 禁止

- 只读取不保存
- 不生成图表
- 不提取观点

## 必须

- ✅ 提取3-5个核心观点
- ✅ 生成可视化（思维导图/图表）
- ✅ 保存到OB
