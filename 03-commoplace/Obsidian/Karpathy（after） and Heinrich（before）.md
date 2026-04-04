---
tags:
  - AI
阅读日期: 2026-03-04
Heinrich: https://x.com/arscontexta/status/2013045749580259680?s=20
衍生1: https://x.com/yanhua1010/status/2039966047378583815?s=20
衍生2: https://x.com/yanhua1010/status/2020342019575673223?s=20
Karpathy:
---
>「每条笔记在某种意义上都是一种技能，经过策划的知识，在需要时被注入。」
# 概念

- Compile（编译）
- 别让人整理，让 LLM 整理

信息溃烂.      >>.     知识编译

# 结构

```
```*
软件工程          →  知识库工程
───────────────────────────────
src/             →  raw/（原始资料）
build/           →  wiki/（知识条目）
logs/            →  outputs/（问答归档）
编译器            →  LLM
IDE              →  Obsidian
Lint / CI        →  健康检查
增量编译          →  只处理新增/变更的 raw
```

```*
Vault/
├── raw/                    # 原始资料，不改
│   ├── articles/           # Web Clipper 剪藏
│   ├── podcasts/           # Podwise 导出
│   └── papers/             # 论文
│
├── wiki/                   # 编译产物，LLM 维护
│   ├── indexes/            # 索引（来源清单、概念清单、术语表）
│   ├── concepts/           # 概念条目
│   └── summaries/          # 逐篇摘要
│
├── outputs/                # 运行时输出
│   ├── qa/                 # 问答沉淀
│   └── health/             # 健康检查报告
│
├── x/                      # X 平台成品
├── 公众号/                  # 公众号成品
└── 小红书/                  # 小红书成品
````
# 插件

1.claudian：claude in obsidian
- 社区插件
- 需要手动安装。最简单的方式是通过 BRAT 插件：先在社区插件市场装好 BRAT，然后在 BRAT 设置里点「Add Beta plugin」，输入

[https://github.com/YishenTu/claudian](https://github.com/YishenTu/claudian)

，就自动装好了，还能自动更新。

2.Terminal
---

# 模型：

- Opus
- 权限：yolo
---
# CLAUDE.md

- 本质上是一份「操作手册」，告诉 AI：你是谁，你怎么工作，你要什么标准
工作习惯、质量标准、思维方式，全部文字化。这个过程逼你做了一次深度自我认知。
## 参考

- 身份定义。 「我是程序员，副业做多平台内容创作，前端和设计是短板。」这一条加上之后，Claude 再也不会给我推荐复杂的前端方案，而是主动简化、详细解释。

- Skills 使用手册。 16 个 Skills 的触发条件和使用场景。当我说「生成公众号封面」，Claude 知道该调用哪个 Skill；当我说「为文章配图」，它知道用另一个。

- 工作流模板。 公众号文章创作流程、X 内容发布流程、小红书内容流程，每种平台的完整步骤都写在里面。

- 迭代进化理念。 这份文件不是写完就不动了。Claude 犯了一个错，我就加一条规则。发现了更好的流程，我就更新模板。它是一份活的文档，记录着我跟 AI 协作的所有经验教训。
---
# skills

- 隔离terminal
- 存在obsidian/.claude/skills/ 目录

## 图示
![Image](https://pbs.twimg.com/media/HAkQtImbkAAkiVI?format=jpg&name=medium)
1. 发布：发公众号、发 X
    
2. 图像生成：根据内容自动生成匹配风格的图片
    
3. 内容转换 ：一键保存任何网页或推文为干净的 Markdown
    
4. 工具 ：图片压缩 ，自动压缩为 WebP 格式

# 博客到发布

## 图示

![Image](https://pbs.twimg.com/media/HAkQ8s6awAABKxk?format=jpg&name=medium)
## 步骤

第一步，信息源变文字。 
	用 Podwise 把这期播客转成了结构化的 Markdown 笔记，带时间戳、带章节分段、带关键观点提取。导入 Obsidian，成为原始素材。

第二步，Claude 写初稿。
	在 Obsidian 里打开这份播客笔记，用 Claudian 告诉 Claude：基于这份播客笔记，写一篇 X 长文，提炼最核心的洞察，用我的写作风格。Claude 读了播客内容，也读了我的 CLAUDE.md（里面编码了我的身份、读者定位、写作偏好），产出了一篇初稿。我审阅修改，调整了结构和措辞，定稿。

第三步，自动配图。 
	调用「文章智能配图」Skill，它自动分析文章结构，确定了 4 个插图位置，生成了 4 张风格匹配的插图：「AI 管家的温暖日常」「记忆系统的心跳」「Agent 电脑 vs 人类电脑」「将军与精灵军团」。

第四步，一键发布。
	调用「发布到 X」Skill，文章直接以 X Article 形式发布。（用不同的 Skill 分发到公众号和小红书，格式自动适配，封面图自动生成。一份素材，多平台分发。）