---
type: concept
title: 达尔文 Skill 自优化系统
created: 2026-04-17
updated: 2026-04-17
tags:
  - concept
  - skill
  - 自优化
status: mature
complexity: intermediate
domain: AI/Skill设计
aliases:
  - darwin-skill
  - 棘轮优化
  - Skill自迭代
related:
  - "[[Thin Harness Fat Skills]]"
  - "[[AutoAgent 自优化代理]]"
sources:
  - "[[达尔文.skill]]"
---

# 达尔文 Skill 自优化系统

> 棘轮可能是人类发明过的最被低估的结构。

## 五条原则

1. **单一可编辑资产**：每次只改一个 Skill.md，避免无法判断哪个改动有效
2. **双重评估**：结构评分（写得对不对）+ 实测评分（用起来好不好）
3. **棘轮机制**：分数只能升不能降——改差了就 `git revert`，只保留成功改动
4. **独立评分**：修改 skill 的 agent ≠ 评分 agent（避免安然式自审）
5. **人在回路**：机器做初筛，人做终审

## 100分评分体系

**结构维度（60分）**
- Frontmatter 规范 8分
- 工作流步骤清晰 15分
- 异常情况处理 10分
- 关键决策用户确认 7分
- 指令可直接执行 15分
- 引用路径存在 5分

**效果维度（40分）**
- 整体架构合理 15分
- **真实测试 prompt 实测表现 25分**（权重最高！）

> 实际效果比纸面规范重要。

## 优化循环

```
Phase 0: 初始化环境
Phase 1: 为每个 skill 设计测试 prompt，跑基线评分
Phase 2（核心）: 找最低分维度 → 针对性修改 → 独立子 agent 重评分
         → 涨了保留，没涨 git revert，最多跑 3 轮
Phase 3: 输出 Before/After 分数表
```

## 棘轮示例

72 → 78（保留）→ 75（回滚，有效基线仍 78）→ 84（保留）→ 87（保留）
最终净提升 15 分，失败尝试干净回滚无残留。

## 常见 Skill 共性问题（自动检测）

- 缺少边界条件处理（用户给模糊输入时怎么办）
- frontmatter 描述太短（Claude 不知道何时触发）
- 引用了不存在的文件路径

## 安装

```bash
npx skills add alchaincyf/darwin-skill
```

GitHub: [darwin-skill](https://github.com/alchaincyf/darwin-skill)

## 来源
(Source: [[达尔文.skill]])，@AlchainHust，2026-04-13
