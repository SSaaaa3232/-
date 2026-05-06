---
ingested: 2026-05-06
wiki_page: "[[wiki/sources/Source - 反思为什么不行，换个方法]]"
created: 2026-04-04
modified: 2026-04-04
tags:
  - github工具
category: github工具
---


**来源：** claude-code-plugins
**功能：** Loop 自动化 - 让 AI 自动循环执行任务

### 安装
```bash
/plugin install ralph-loop
```

### 使用
```bash
/ralph-loop [任务描述]
```

---

-
## 工作原理

```
1. 创建一个任务清单 (PRD)
2. 运行 Ralph
3. AI 执行一个任务 → 检查结果
4. 如果没完成 → 继续下一个任务
5. 循环直到全部完成
```

---
## 核心代码逻辑

```python
while not done and attempts < max_attempts:
    result = ai.execute(task)

    if check(result):
        done = True
    else:
        # 反思为什么不行，换个方法
        task = ai.reflect(result)

    attempts += 1
```

---

## 安装使用

### 1. 安装
```bash
# 克隆仓库
git clone https://github.com/snarktank/ralph.git
cd ralph
```

### 2. 创建任务清单 (PRD)
用 `/prd` skill 生成需求文档

### 3. 运行
```bash
./scripts/ralph/ralph.sh [最大循环次数]
```

---

## 本地 DIY 版本

如果不想用复杂的 Ralph，可以自己写个简单脚本：

```bash
#!/bin/bash

# 简单循环执行脚本
for i in {1..3}; do
    echo "尝试 $i/3..."

    # 执行任务
    result=$(你的任务)

    # 检查结果
    if [ "$result" = "成功" ]; then
        echo "完成！"
        break
    else
        echo "失败，反思后重试..."
    fi
done
```
