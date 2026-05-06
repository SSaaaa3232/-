---
type: source
status: seed
created: 2026-05-06
updated: 2026-05-06
title: "如何写出工业级 Skill"
source_type: note
source_path: "raw/团队team/skill/如何写出工业级 Skill.md"
tags:
  - source
  - raw-ingest
  - agent-skills-工业化
related:
  - "[[Agent Skills 工业化]]"
---

# 如何写出工业级 Skill

- Raw file: `raw/团队team/skill/如何写出工业级 Skill.md`
- Ingested: 2026-05-06
- Related concepts: [[Agent Skills 工业化]]

## Extractive Summary
- 很多人自己写 Skill，会把背景、规则、注意事项、示例，全都塞进一个 Skill 文件。
- 当用户提出某类需求时，Agent 能自动识别场景，加载对应流程，使用合适工具，并按固定方法完成任务。并且保证以后遇到类似任务，Agent 能够按照流程去稳定地完成。
- 1\. 遵守 Skill 的定义：按需加载

## Source Structure
- 1\. 遵守 Skill 的定义：按需加载
- 2\. 限制 Skill 的工具边界
- 3\. 给 Skill 配置最适合的模型
- 4\. 渐进式披露，限制 Skill.md 的大小
- 5\. 写完 Skill 之后还需要验证、打分、迭代
- 一个好 Skill 应该是什么样的？

## Ingest Notes
- 本页为批量 ingest 生成的 source seed：已入库、可检索、已进入相关概念簇。
- 若该来源是高价值长文/访谈，后续可单独运行 deep ingest，把关键论证拆成独立概念页。
