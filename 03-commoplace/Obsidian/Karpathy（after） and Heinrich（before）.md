---
tags:
  - AI
阅读日期: 2026-03-04
Heinrich: https://x.com/arscontexta/status/2013045749580259680?s=20
衍生1: https://x.com/yanhua1010/status/2039966047378583815?s=20
衍生2: https://x.com/yanhua1010/status/2020342019575673223?s=20
Karpathy: https://x.com/karpathy/status/2039805659525644595?s=20
衍生3: https://x.com/yanhua1010/status/2033726054351966613?s=20
衍生4: https://x.com/yanhua1010/status/2029369274847072591?s=20
---
>「每条笔记在某种意义上都是一种技能，经过策划的知识，在需要时被注入。」
>逆耳的东西往往才是值得想的
# 概念

- Compile（编译）
- 别让人整理，让 LLM 整理

# 编译

- 跟 Claude 说：”读一下 raw/articles/ 里最近新增的文章，为每篇生成摘要，提取概念，更新索引。”

1:逐篇摘要。 
	每篇 raw 文档产出一份结构化摘要，包括核心结论、关键证据、疑点、术语。存到 wiki/summaries/。

2:概念抽取。 
	从摘要里提概念，映射到 wiki/concepts/。新概念就建条目，老概念就补新证据。

3:索引更新。 
	自动维护 All-Sources.md 和 All-Concepts.md。

质量怎么保证？
	靠 CLAUDE.md。
	在里面写了编译规范：摘要的结构模板、概念条目该有哪些字段、命名规则。Claude 每次启动都读，输出就稳了。

第一次编译可能要花半小时到一小时。但跑通一次之后，后面增量编译很快，因为只处理新增的 raw。

## 图示：

![Image](https://pbs.twimg.com/media/HE9lTKkakAAMu-A?format=jpg&name=medium)

![Image](https://pbs.twimg.com/media/HE8vV7SbMAAP-Bo?format=jpg&name=medium)
---

# Output落文件

- 让每次对话都变成库存
- 信息溃烂.      >>.     知识编译

>对知识库做复杂提问，结果以 Markdown 文件存到 outputs/qa/

- 本身就是知识条目，因为带推理过程和原始来源。下次遇到类似问题，Claude 直接读已有的 Q&A，不用重新推导

>每跟 AI 聊一次，知识库就增加一层。
### ps：

```markdown
---
question: "RAG 和轻量索引的适用边界？"
asked_at: 2026-04-03
sources:
  - [[S-001 MotherDuck Obsidian RAG]]
  - [[C-042 RAG]]
---

# RAG vs 轻量索引

## TL;DR
规模在万级 note 以下，轻量索引够了。
语义搜索需求强或规模更大，上 RAG。

## 结论
...

## 证据
（链接回原始来源）

## 不确定性
...
```

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
## 发布步骤

第一步，信息源变文字。 
	用 Podwise 加播客，有新内容自动拉取，把这期播客转成了结构化的 Markdown 笔记，带时间戳、带章节分段、带关键观点提取。导入 Obsidian，成为原始素材。

第二步，Claude 写初稿。
	在 Obsidian 里打开这份播客笔记，用 Claudian 告诉 Claude：基于这份播客笔记，写一篇 X 长文，提炼最核心的洞察，用我的写作风格。Claude 读了播客内容，也读了我的 CLAUDE.md（里面编码了我的身份、读者定位、写作偏好），产出了一篇初稿。我审阅修改，调整了结构和措辞，定稿。

第三步，自动配图。 
	调用「文章智能配图」Skill，它自动分析文章结构，确定了 4 个插图位置，生成了 4 张风格匹配的插图：「AI 管家的温暖日常」「记忆系统的心跳」「Agent 电脑 vs 人类电脑」「将军与精灵军团」。

第四步，一键发布。
	调用「发布到 X」Skill，文章直接以 X Article 形式发布。（用不同的 Skill 分发到公众号和小红书，格式自动适配，封面图自动生成。一份素材，多平台分发。）

## 阅读步骤

- 1、 订阅，而不是随缘刷

		在 Podwise 里加播客。加好之后不用管，有新内容会自动拉取。

- 2、每天早上 10 分钟扫摘要

		不是听，是浏览 AI 摘要。像看新闻标题一样，快速决定哪些值得深入，哪些跳过。

>大部分跳过。但这个「跳过」本身是有价值的，因为我知道自己跳过了什么。有意思的打个星，留着后面听。

- 3、通勤路上只听标记的片段

		不再试图把每期从头听到尾。英文播客开字幕，边听边跟读，顺便练英语。

>一段通勤路，能消化一两个真正有价值的内容，比漫无目的听完三期强太多。

- 4、 晚上打开obsidian，笔记已经在那了

		摘要和时间戳自动同步过来。我只需要加上自己的想法。

>「加自己的想法」才是真正消化的开始。

- 5、 需要时搜索，不是翻找

我现在积累了几百条播客笔记。想起某句话，输入关键词，几秒定位到原话，还带着时间戳，可以直接跳回原片段。

上周写一篇关于 AI 研究方向的东西，搜了一下，马上找到了三个月前 Lex 那期的相关内容，直接引用。
## 推荐播客

- 英文：Lex Fridman、Starter Story、Acquired，
- 中文：张小珺、纵横四海

# 健康检查

- 情况：
	- 同一个概念在三个地方定义不一样；
	- 某个条目只有标题没有正文；
	- 一堆笔记孤零零没有任何链接指向

## 检查三样东西：

1. 一致性。 wiki/concepts/ 里有没有定义冲突？比如"RAG"在一个地方叫"检索增强生成"，另一个地方变成了"向量数据库搜索"。
    
2. 完整性。 哪些概念条目缺定义、缺例子、缺来源？
    
3. 孤岛。 哪些笔记入链出链都少于 2？该连到哪？

- 报告存到 outputs/health/，每周一份。
---

# RAG

笔记真的过了一万条:选 Embedding 模型、搭向量数据库、调切片策略

## 资源

- MotherDuck 有篇博文讲了用 DuckDB 给 Obsidian 做向量检索的完整方案