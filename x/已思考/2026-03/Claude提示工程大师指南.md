# Claude 提示工程大师指南

> 来源：https://x.com/aiedge_/status/2033546384172056751
> 日期：2026-03-18

---

## 核心观点

1. **提示工程是第一AI技能** - 95%的人没有正确学习与AI沟通，导致大量价值流失。正确使用提示词可以获得7x24任何信息、策略、想法

2. **三大常见错误**：
   - 缺乏背景：不给背景就像让顶级顾问"给建议"，没有具体问题
   - 过于模糊：模糊提问=模糊回答，Claude不是搜索引擎
   - 不迭代：好输出很少来自单次提示，需要不断 refine

3. **优秀提示的5个必备要素**：
   - 任务背景：设定角色和任务
   - 背景数据：提供相关文档/文件
   - 详细任务描述：具体约束和指南
   - 示例：用 `<example>` 标签展示格式
   - 输出格式：明确定义输出结构

4. **5个高级技巧**：
   - 结构化提示：使用 XML/JSON 标签
   - 反向提示：让 Claude 问你问题来获取背景
   - 深度思考触发器：添加 "Think deeply before responding"
   - 链式提示：把大任务拆成小步骤
   - 反馈循环：不断批判改进直到满意

5. **Anthropic官方建议**：
   - 清晰直接
   - 背景是关键
   - 用示例（3-5个理想）
   - 使用XML标签（Claude训练用了XML）
   - 长文本放在顶部

---

## 思维导图

[[Claude提示工程思维导图]]

---

## 关键技巧详解

### 结构化提示示例

```
<role>你是营销策略专家</role>
<context>我运营B2B SaaS公司，目标HR经理</context>
<task>写90天市场进入策略</task>
<format>编号列表，每步简要说明</format>
```

### 链式提示示例

```
Prompt 1: "分析[行业]最大挑战"
Prompt 2: "基于挑战识别前3机会"
Prompt 3: "制定90天行动计划"
Prompt 4: "转为执行摘要"
```

### 深度思考触发器

- "Think deeply before responding"
- "Take your time and reason through this step by step"
- "Consider multiple angles before giving me your answer"

---

## 相关资源

- Anthropic Prompting Guide: https://docs.anthropic.com/en/docs/claude-code/prompt-engineering
- Interactive Prompting Guide (GitHub)
- Prompt Generator Tool

---

## 我的行动

- [ ] 在日常使用中应用5要素提示法
- [ ] 对复杂问题使用链式提示
- [ ] 添加深度思考触发器
