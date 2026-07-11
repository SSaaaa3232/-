---
type: design
status: approved
created: 2026-07-11
updated: 2026-07-11
tags:
  - anki
  - learning-system
  - skill-design
---

# Anki 本地牌组镜像设计

## 目标

在 Obsidian vault 的 `anki/` 目录中建立与 Anki 软件牌组对应的本地文件夹镜像。该目录负责保存学习素材、候选注意点卡、模板和最终导入文件；Anki 软件仍然是复习与调度工具。

`清单/task list.md` 只提供日程、学习领域和复盘时间等运行约束，不作为制卡素材，也不由本项目修改。

## 核心边界

- Anki 是注意力训练器，不是资料仓库。
- AI 只能生成候选粗卡；用户拥有筛选、修改、优化确认和导入决定权。
- 未经用户明确指令，不生成或覆盖最终导入 TSV，不调用 AnkiConnect，不修改 Anki 软件。
- 视频素材由上层 `anki` skill 调用现有 `transcript` skill；不修改 `transcript`。
- 用户修改候选卡后，后续优化直接在原笔记中进行，不另建重复文件。
- 每晚新增卡以少而精为原则；存在旧卡 backlog 时优先停止新增并清理旧卡。

## 目录结构

`anki/anki.md` 保留为全局规则文件。默认建立以下牌组镜像目录：

1. 网络安全
2. AI
3. 投资
4. 英语
5. 政治
6. 人际交往
7. 无畏契约
8. 生物
9. 外在管理

每个牌组目录采用相同结构：

```text
牌组名/
  README.md
  templates/
    concept.md
    judgment.md
    error.md
    cloze.md
    image-occlusion.md
    steps.md
  notes/
  cards/
```

虽然原始规则中写有“五种模板”，实际列出了六种文件；本设计以明确列出的六种模板为准。

## 文件职责

### README.md

记录牌组学习范围、目标、素材入口、制卡标准和复盘规则。初始化时只提供统一骨架，不擅自填写具体学习目标。

### templates/

- `concept.md`：召回概念的最小必要定义、边界和例子。
- `judgment.md`：判断结论并说明原因；只有结论没有理由视为不完整。
- `error.md`：记录真实踩坑、错误原因、识别信号和下次动作。
- `cloze.md`：用于稳定、唯一、适合主动回忆的关键字段。
- `image-occlusion.md`：用于图像结构、界面位置、图表与场景识别。
- `steps.md`：用于必须按顺序执行且顺序本身重要的流程。

### notes/

每次素材处理生成或更新一份日期笔记。视频笔记开头保留 transcript，随后放置候选注意点卡，供用户直接编辑。

### cards/

只保存该牌组最终确认后的一个 TSV 导入文件。初始化阶段保持为空；用户明确确认导入内容后才生成。

## 数据流

```text
文字、图片或视频
  -> AI 粗筛注意点
  -> notes/ 日期笔记中的候选卡
  -> 用户对照原素材筛选和修改
  -> AI 在原文件中优化
  -> 用户确认生成 TSV
  -> 用户决定是否导入 Anki
  -> 复习与实践暴露新问题
  -> 追加错误卡、判断卡或其他必要卡片
```

## Skill 范围

在 `~/Desktop/Nezikk-s-skills/anki/` 创建 `nskill` 规范的 `anki` skill：

- 接受文字、图片、视频或本地文件路径。
- 要求先指定或判断目标牌组，但判断结果必须让用户可见。
- 视频调用 `transcript`，把转写保存在对应笔记开头。
- 生成候选粗卡，不自动生成最终 TSV。
- 只有收到明确的“确认生成导入文件”指令后才生成 TSV。
- AnkiConnect 量化分析作为后续独立能力，不在首版自动启用。

## 验证标准

- 九个牌组目录及其统一子目录全部存在。
- 六种模板在所有牌组中存在且内容一致。
- `cards/` 初始化时没有伪造或未确认的导入数据。
- `task list.md`、`.obsidian/` 和现有用户文件不被修改。
- `anki` skill 通过 `Nezikk-s-skills` 仓库的注册、结构与测试检查。
- 任何自动导入或 AnkiConnect 写操作都必须有用户当次明确授权。
