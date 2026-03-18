# Ralph Loop - AI 自动循环执行工具

> 让 AI 自动循环做事，直到完成目标

---

## 是什么

**Ralph** 是一个开源的 AI Agent 循环工具（12.4k stars）。

核心功能：
- 让 AI **自动循环执行**任务
- 每次循环用**全新上下文**，避免遗忘
- 直到所有任务完成 或 达到循环次数上限

---

## 工作原理

```
1. 创建一个任务清单 (PRD)
2. 运行 Ralph
3. AI 执行一个任务 → 检查结果
4. 如果没完成 → 继续下一个任务
5. 循环直到全部完成
```

---

## 解决的问题

**小模型的痛点：**
- 给一个答案 → 不再想其他方案
- 一条路走到黑

**Ralph Loop 强制 AI：**
- 做一个方案 → 检查行不行
- 不行 → 换方案再试
- 循环直到成功

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

---

## 相关资源

- [Ralph GitHub](https://github.com/snarktank/ralph)
- [Ralph 官方文档](https://ghuntley.com/ralph/)
- [Claude Code 文档](https://docs.anthropic.com/en/docs/claude-code)

---

## 简单替代

其实直接跟我说 "换个思路想想" 或 "试3次不行换方案" 就能实现类似效果。
