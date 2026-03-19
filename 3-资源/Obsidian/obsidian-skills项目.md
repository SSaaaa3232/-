# obsidian-skills 项目

> 来源：https://github.com/kepano/obsidian-skills
> ⭐ 14.9k Stars

---

## 是什么

为 Obsidian 设计的 AI Agent 技能集合，帮助 AI 学习和使用 Obsidian 各种功能。

---

## 5个核心Skills

### 1. obsidian-markdown

创建和编辑 Obsidian 风味 Markdown（.md）

**支持**：
- wikilinks `[[链接]]`
- 嵌入 `![[嵌入]]`
- 标注块
- 属性（YAML frontmatter）

---

### 2. obsidian-bases

创建和编辑 Obsidian Bases（.base）数据库

**支持**：
- 视图
- 筛选器
- 公式
- 摘要

---

### 3. json-canvas

创建和编辑 JSON Canvas（.canvas）文件

**支持**：
- 节点
- 边
- 分组
- 连接

---

### 4. obsidian-cli

通过 Obsidian CLI 与 vaults 交互

**支持**：
- 插件开发
- 主题开发

---

### 5. defuddle

从网页提取干净 Markdown

**作用**：
- 去除广告、侧边栏等干扰内容
- 节省 Token
- 提取干净内容

---

## 对我有什么用？

| Skill | 用途 |
|-------|------|
| obsidian-markdown | 写笔记时正确使用OB语法 |
| defuddle | 读取网页时提取干净内容（可替代Jina）|
| json-canvas | 创建画布文件 |

---

## 安装

```bash
npx skills add kepano/obsidian-skills@obsidian-markdown
npx skills add kepano/obsidian-skills@obsidian-bases
npx skills add kepano/obsidian-skills@json-canvas
npx skills add kepano/obsidian-skills@obsidian-cli
npx skills add kepano/obsidian-skills@defuddle
```

---

## 相关

- 标签：#Obsidian #AI #Skills
- GitHub：https://github.com/kepano/obsidian-skills
