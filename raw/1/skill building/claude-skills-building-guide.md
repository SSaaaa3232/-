---
title: Claude 技能构建完整指南
source: "https://drive.google.com/file/d/1QR-Pq-KB_M6CRfo39D2g8Q6lEfNxNkxG/view"
type: pdf-cleaned-markdown
created_at: "2026-05-18T16:51:44+08:00"
pages: 33
language: zh-CN
extraction: pdftotext column-crop + manual cleanup
---

# Claude 技能构建完整指南

> 来源 PDF 为双语并排版式。本文档基于中文栏抽取并清洗，保留关键结构、概念、清单和示例；个别英文术语按原文保留。

## 目录

- [引言](#引言)
- [第一章：基础](#第一章基础)
- [第二章：规划与设计](#第二章规划与设计)
- [第三章：测试与迭代](#第三章测试与迭代)
- [第四章：分发与共享](#第四章分发与共享)
- [第五章：模式与故障排除](#第五章模式与故障排除)
- [第六章：资源与 references](#第六章资源与-references)

## 引言

技能是一组指令，打包成一个简单的文件夹，用于教导 Claude 如何处理特定任务或工作流。技能是定制 Claude 的重要方式：不需要在每次对话中重新解释偏好、流程和领域专业知识，而是把这些知识沉淀为一次性可复用的说明。

技能尤其适合可重复工作流，例如：

- 根据规格生成前端设计。
- 用一致的方法进行研究。
- 创建遵循团队风格指南的文档。
- 编排多步骤流程。

它们可以和 Claude 的内置能力（如代码执行和文档创建）配合使用。对于 MCP 集成，技能还能把原始工具访问转化为可靠、优化的工作流。

本指南覆盖构建有效技能所需的关键内容：规划与设计、测试、分发、常见模式和真实示例。目标读者包括：

- 希望 Claude 持续遵循特定工作流的开发者。
- 希望 Claude 遵循特定工作流的高级用户。
- 希望在组织内标准化 Claude 工作方式的团队。

### 本指南的两条路径

- 构建独立技能：重点关注基础、规划与设计，以及类别 1-2。
- 增强 MCP 集成：重点关注“Skills + MCP”与类别 3。

两条路径共享相同的技术要求，但可以根据自己的用例选择相关部分。

## 第一章：基础

### 什么是技能？

技能是一个文件夹，通常包含：

- `SKILL.md`（必需）：带 YAML frontmatter 的 Markdown 指令文件。
- `scripts/`（可选）：可执行代码，例如 Python、Bash 等。
- `references/`（可选）：按需加载的参考文档。
- `assets/`（可选）：输出中使用的模板、字体、图标等资源。

### 核心设计原则

#### 渐进式披露

技能采用三级系统：

1. **第一级：YAML frontmatter**。始终加载到 Claude 的系统提示词中，提供足够信息让 Claude 判断何时使用该技能，而不需要把完整内容加载进上下文。
2. **第二级：`SKILL.md` 正文**。当 Claude 判断技能相关时加载，包含完整说明和指导。
3. **第三级：关联文件**。技能目录内的额外文件，Claude 可以按需浏览和加载。

这种结构在保留专业能力的同时降低上下文占用。

#### 可组合性

Claude 可以同时加载多个技能。一个技能不应假设自己是唯一能力，应与其他技能协作良好。

#### 可移植性

技能在 Claude.ai、Claude Code 和 API 中以相同方式工作。只要运行环境支持技能所需依赖，创建一次即可跨平台使用。

### Skills + MCP

如果已经有可运行的 MCP server，难点通常已经完成。MCP 提供“连接性”，技能提供“知识层”：把已知工作流和最佳实践沉淀下来，让 Claude 能一致应用。

厨房类比：

- MCP 提供专业厨房：工具、食材和设备。
- 技能提供食谱：告诉 Claude 如何创造有价值的结果。

二者配合后，用户无需自行摸索每一步，也能完成复杂任务。

| MCP（连接性） | 技能（知识） |
| --- | --- |
| 连接 Claude 与 Notion、Asana、Linear 等服务 | 教导 Claude 如何有效使用这些服务 |
| 提供实时数据访问和工具调用 | 捕获工作流和最佳实践 |
| 定义 Claude 能做什么 | 定义 Claude 应该如何做 |

这对 MCP 用户很重要，因为同一组工具如果没有工作流说明，仍可能需要用户反复指导；技能能把连接器转化为更完整的产品体验。

## 第二章：规划与设计

### 从用例开始

在写任何代码之前，先确定技能应实现的 2-3 个具体用例。

一个好的用例定义包含：

```text
Use Case: Project Sprint Planning
Trigger: User says "help me plan this sprint" or "create sprint tasks"
Steps:
1. Fetch current project status from Linear (via MCP)
2. Analyze team velocity and capacity
3. Suggest task prioritization
4. Create tasks in Linear with proper labels and estimates
Result: Fully planned sprint with tasks created
```

设计时应询问：

- 用户想实现什么目标？
- 这需要哪些多步骤工作流？
- 需要哪些工具：内置工具还是 MCP？
- 应嵌入哪些领域知识或最佳实践？

### 常见技能用例类别

#### 类别 1：文档与资源创建

用途：创建一致、高质量的输出，包括文档、演示文稿、应用程序、设计、代码等。

示例：前端设计技能、DOCX、PPTX、XLSX、PPT 相关技能。

关键技术：

- 嵌入风格指南与品牌标准。
- 使用模板结构保证输出一致。
- 在最终确定前运行质量检查清单。
- 可只使用 Claude 内置能力，无需外部工具。

#### 类别 2：工作流自动化

用途：适用于受益于一致方法论的多步骤流程，包括跨多个 MCP server 的协调工作。

示例：`skill-creator` 技能。它以交互方式引导用户完成用例定义、frontmatter 生成、指令编写和验证。

关键技术：

- 带验证关卡的逐步工作流。
- 明确每个步骤的输入、输出和成功标准。
- 在流程中纳入澄清问题和错误处理。

#### 类别 3：MCP 增强

用途：为已有 MCP 集成增加可靠使用说明，把“可调用工具”变成“可执行工作流”。

关键技术：

- 描述何时调用哪些 MCP 工具。
- 约束参数、顺序、错误处理和回退策略。
- 把服务知识、团队规则和最佳实践写入技能。

### 定义成功标准

技能有效性的理想指标包括：

- 技能在约 90% 的相关查询中触发。
- 每个工作流失败的 API 调用尽可能少。
- 用户需要澄清或纠正的次数减少。
- Token 消耗可控。
- 输出质量稳定。

这些是粗略基准，不是精确阈值；评估中会有一定主观判断。

### 技术要求

典型文件结构：

```text
your-skill-name/
├── SKILL.md              # required, main skill file
├── scripts/              # optional executable code
│   ├── process_data.py
│   └── validate.sh
├── references/           # optional documentation
└── assets/               # optional templates or resources
```

### YAML frontmatter

YAML frontmatter 是 Claude 判断是否加载技能的依据，必须写清楚。

最小格式：

```yaml
---
name: your-skill-name
description: What it does. Use when user asks to [specific phrases].
---
```

可选字段包括：

- `license`：开源时常见为 MIT、Apache-2.0 等。
- `compatibility`：环境要求，例如目标产品、系统依赖、网络访问需求等。
- 自定义元数据键值对。

### 编写有效描述

描述字段是渐进式披露的第一层。它应说明：

```text
[What it does] + [When to use it] + [Key capabilities]
```

不良示例：

```yaml
# Too vague
description: Helps with projects.

# Missing triggers
description: Creates sophisticated multi-page documentation systems.

# Too technical, no user triggers
description: Implements the Project entity model with...
```

更好的描述应包含具体触发场景、任务边界和能力。

### 指令最佳实践

#### 具体且可操作

好的指令告诉 Claude 具体该做什么、如何验证，以及失败时如何处理。

```text
Run `python scripts/validate.py --input {filename}` to check data format.
If validation fails, common issues include:
- Missing required fields: add them to the CSV.
- Invalid date formats: use YYYY-MM-DD.
```

#### 明确引用捆绑资源

例如：

```text
Before writing queries, consult `references/api-patterns.md` for:
- Rate limiting guidance
- Pagination patterns
- Error codes and handling
```

#### 使用渐进式披露

保持 `SKILL.md` 聚焦核心说明，把详细文档移到 `references/` 并在需要时引用。

## 第三章：测试与迭代

技能可以按不同严谨程度测试：

- 在 Claude.ai 中手动测试：直接运行查询并观察行为，适合快速迭代。
- 在 Claude Code 中脚本化测试：自动化测试用例，便于在变更中重复验证。
- 通过 Skills API 做程序化测试：构建评估套件，针对定义好的测试集系统运行。

### 推荐测试方法

#### 1. 触发测试

目标：确保技能在正确时机加载。

测试用例：

- 明显任务应触发。
- 改写后的等价请求应触发。
- 无关主题不应触发。

#### 2. 功能测试

目标：验证技能能产生正确输出。

测试用例：

- 有效输出已生成。
- API 调用成功。
- 错误处理生效。
- 边缘情况已覆盖。

#### 3. 效率测试

比较未使用技能和使用技能时的差异。例如：

- 无技能：需要多轮解释、手动执行步骤、更多澄清和更高 token 消耗。
- 有技能：自动执行工作流、只问必要澄清问题、失败调用更少、token 消耗更低。

### 使用 skill-creator 技能

`skill-creator` 技能可以帮助构建和迭代技能。用法示例：

```text
Use the skill-creator skill to help me build a skill for [your use case]
```

注意：`skill-creator` 可以帮助设计和优化技能，但不会自动执行测试套件或生成定量评估结果。

### 基于反馈迭代

技能是动态文档，应基于反馈迭代。

触发不足的信号：

- 用户需要显式要求使用技能。
- 相关请求没有触发技能。
- 触发了错误技能。

执行问题的信号：

- 结果不一致。
- API 调用失败。
- 需要用户纠正。

解决方式通常是改进描述、收紧触发词、补充错误处理、拆分过大的说明，或把详细内容下沉到 `references/`。

## 第四章：分发与共享

技能能让 MCP 集成更完整。具备技能的连接器通常能提供更快的价值实现路径，相比只有 MCP 工具访问的替代方案更具优势。

### 当前分发模型（2026 年 1 月）

个人用户获取技能的典型流程：

1. 下载 Skill 文件夹。
2. 如有需要，压缩文件夹。
3. 在 Claude 中选择并启用技能。
4. 确保对应 MCP server 已连接。
5. 用真实请求测试，例如：“Set up a new project in [Your Service]”。

### 通过 API 使用技能

对于程序化用例，例如构建应用、agent 或自动化工作流，API 提供技能管理和执行控制。

关键能力：

- `/v1/skills`：列出和管理技能。
- `container.skills`：向 Messages API 请求添加技能。
- Claude 控制台：版本控制和管理。
- Claude Agent SDK：构建自定义 agent。

注意：API 中的技能需要代码执行工具测试版提供安全运行环境。

相关实现主题包括：

- Skills API 快速入门。
- 创建自定义技能。
- Agent SDK 中的技能。

### 当前推荐方法

优先将技能托管在 GitHub：

- 使用公开仓库。
- 写清晰的 README。
- 说明安装和启用方式。
- 提供示例请求。
- 解释技能适用边界。

### 定位技能价值

技能描述决定用户是否能理解其价值并尝试使用。好的定位应该说明：

- 解决什么具体问题。
- 适合哪些用户和场景。
- 与只使用 MCP 工具相比有什么改进。
- 如何快速验证它是否有用。

## 第五章：模式与故障排除

这些模式源自早期采用者和内部团队创建的技能，是常见有效方法，不是强制模板。

### 问题优先 vs 工具优先

可以把技能理解成商店里的导购：用户可能带着问题来，比如“我需要修理厨房橱柜”；也可能已经选中工具，再问如何完成具体工作。好的技能应从用户问题出发，而不是只罗列工具能力。

### 模式 1：顺序工作流编排

适用场景：用户需要按特定顺序执行多步骤流程。

示例结构：

```text
Workflow: Onboard New Customer
Step 1: Create Account
- Call MCP tool: create_customer
- Parameters: name, email, company

Step 2: Setup Payment
...
```

关键是明确步骤顺序、输入、输出和失败处理。

### 模式 2：多 MCP 协调

适用场景：工作流跨越多个服务。

示例：设计到开发交接。

```text
Phase 1: Design Export (Figma MCP)
1. Export design assets from Figma
2. Generate design specifications
3. Create asset manifest

Phase 2: Asset Storage (Drive MCP)
...
```

### 模式 3：迭代优化

适用场景：输出质量通过多轮迭代提升。

示例：报告生成。

```text
Iterative Report Creation
Initial Draft:
1. Fetch data via MCP
2. Generate first draft report
3. Save to temporary file

Review and improve:
...
```

### 模式 4：上下文感知工具选择

适用场景：目标相同，但根据上下文选择不同工具。

示例：智能文件存储。

```text
Decision Tree
1. Check file type and size
2. Determine best storage location:
   - Large files (>10MB): use cloud storage MCP
   - Small text files: use local/project storage
```

### 模式 5：领域特定智能

适用场景：技能提供超越工具访问的专业知识。

示例：金融合规。

```text
Before Processing
1. Fetch transaction details via MCP
2. Apply compliance rules
3. Check sanctions lists
4. Decide whether to proceed or escalate
```

### 故障排除

#### 技能无法上传

错误：“无法在上传的文件夹中找到 `SKILL.md`”。

原因：文件未精确命名为 `SKILL.md`。

解决方案：

- 重命名为 `SKILL.md`，注意大小写敏感。
- 用 `ls -la` 验证文件名。

#### 无效 frontmatter

常见错误：

```yaml
# Wrong
name: My Cool Skill

# Correct
name: my-cool-skill
```

`name` 应使用 kebab-case，避免空格和大写。

#### 技能未触发

症状：技能从未自动加载。

修复方式：

1. 修订 `description` 字段。
2. 写得更具体。

```yaml
# Too broad
description: Processes documents

# More specific
description: Processes PDF legal documents for contract review
```

3. 明确范围。

```yaml
description: PayFlow payment processing for e-commerce. Use specifically for online payment workflows, not for general accounting.
```

#### 未遵循指令

症状：技能已加载但 Claude 未按说明执行。

常见原因：

- 指令过长。
- 关键要求被埋在正文中。
- 说明存在冲突。
- 缺少验证步骤。

修复方式：

- 保持指令简洁。
- 使用要点和编号列表。
- 把详细参考资料移到单独文件。
- 把关键规则放在更靠前的位置。

#### 大型上下文问题

症状：技能运行缓慢或响应质量下降。

原因：

- 技能内容过大。
- 同时启用过多技能。
- 加载全部内容而不是采用渐进式披露。

解决方案：

1. 优化 `SKILL.md` 文件大小。
2. 把长文档拆到 `references/`。
3. 只在需要时引用详细材料。
4. 删除重复内容和不必要示例。

## 第六章：资源与 references

如果正在构建第一个技能，建议从最佳实践指南开始，然后根据需要参考 API 文档。

### 官方文档

Anthropic 相关资源包括：

- 最佳实践指南。
- 技能文档。
- Skills API 快速入门。
- 创建自定义技能。
- Agent SDK 中的技能。

### 工具与实用程序

`skill-creator` 技能：

- 内置于 Claude.ai，并可供 Claude Code 使用。
- 可根据描述生成技能。
- 可审查技能并提供建议。
- 用法示例：“帮我使用 skill-creator 构建一个技能”。

验证工具：

- `skill-creator` 可评估技能。
- 手动测试可以快速验证触发和输出。
- 自动化测试可用于持续回归。

### 参考 A：快速检查清单

上传前后可用此清单验证技能。

开始之前：

- 已确定 2-3 个具体用例。
- 已确定所需工具：内置能力或 MCP。
- 已定义成功标准。
- 已规划文件结构。

上传前：

- 测试明显任务上的触发。
- 测试改写请求上的触发。
- 验证不会在无关主题上触发。
- 功能测试通过。
- 工具集成正常工作（如适用）。
- 压缩为 `.zip` 文件。

上传后：

- 启用技能。
- 连接必要 MCP server。
- 运行端到端测试。
- 根据反馈迭代描述和说明。

### 参考 B：YAML frontmatter

必填字段：

```yaml
---
name: skill-name-in-kebab-case
description: What it does and when to use it. Include specific trigger phrases.
---
```

允许：

- 标准 YAML 类型：字符串、数字、布尔值、列表、对象。
- 自定义元数据字段。
- 长描述，但应保持清晰且不超过平台限制。

禁止或应避免：

- XML 尖括号 `< >`，因安全限制可能被拒绝。
- 在 YAML 中放置可执行代码。
- 使用模糊名称或缺少触发条件的描述。

### 参考 C：完整技能示例

可参考完整、可用于生产环境的技能示例：

- 文档技能：PDF、DOCX、PPTX、XLSX 创建。
- 示例技能：各种工作流模式。
- 合作伙伴技能目录：Asana、Atlassian、Canva、Figma、Sentry、Zapier 等。

这些仓库通常会持续更新，并包含本指南之外的额外示例。可以克隆它们，按自己的用例修改，并作为模板使用。

## 提炼摘要

构建有效技能的核心是：

1. 先定义具体用例和触发场景。
2. 用 YAML frontmatter 帮 Claude 准确判断何时加载技能。
3. 用 `SKILL.md` 描述清晰、可执行的工作流。
4. 用 `references/`、`scripts/`、`assets/` 支撑复杂场景，但避免一次性加载所有内容。
5. 用触发测试、功能测试和效率测试持续迭代。
6. 对 MCP 集成而言，技能不是替代连接器，而是让连接器变成可靠工作流的知识层。
