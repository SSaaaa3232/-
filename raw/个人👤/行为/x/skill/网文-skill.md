---
ingested: 2026-05-06
wiki_page: "[[wiki/sources/Source - 失业一周写出 573 星 Skill，他用 Claude Code 写网文养家]]"
title: "失业一周写出 573 星 Skill，他用 Claude Code 写网文养家"
source: "https://x.com/GoSailGlobal/status/2049862449474740224"
author:
  - "[[@GoSailGlobal]]"
published: 2026-04-30
created: 2026-05-01
---

## 这是什么：8 个 skill 串起网文全链路

整个 repo 就是 8 个 skill 加一套引用知识库。安装一行命令 npx skills add worldwonderer/oh-story-claudecode -y，装完就能在 Claude Code 里直接 /story-long-write、/story-deslop 这种斜杠命令调用。

8 个 skill 按职能分两条线。长篇线 4 个（story-long-scan 扫榜、story-long-analyze 拆文、story-long-write 写作、story-deslop 去 AI 味），短篇线 3 个（story-short-scan、story-short-analyze、story-short-write），加一个公用的 browser-cdp 用来复用浏览器登录态抓平台数据。每个 skill 都能单独跑，也能按流程串起来。

最值得抄的设计是它把写作内容用文件系统管，不堆在对话里。一本书一个目录，下面分 设定/、大纲/、正文/、笔记.md，角色一人一个文件，势力一个组织一个文件。这个组织方式直接照搬就能用到任何长内容创作场景，不限网文。

![[e2bb28dc677afce7d6840791acbf7b85_MD5.jpg]]

## 真正的护城河是 16 个主题的知识库

每个 skill 都自带一个 references/ 知识库，按需加载，不占上下文。这个东西才是这套 skill 在 Top 1% 的真正原因。

打开一看，覆盖的 16 个主题全是网文圈最难外行学到的那部分内功。大纲排布有五步大纲法、八节点结构、节点设计法、升级感设计；钩子技法分章尾 13 式、章首 7 式、段落级钩子；情绪设计有 6 种弧形模板；反转工具箱按类型、时机、误导路径分；风格模块拆成对话、打斗、智斗、镜头式、装逼打脸、白描 6 种。还有专门的女频写作模块（女读者偏好、感情线四阶段）和 21 大题材写作公式。

![[7d47be3a8c1f7c422805a741c2d61185_MD5.jpg]]

去 AI 味这个 skill 单独拎出来说一下。它做了「预防 + 三遍去 AI 法 + 改写范例库 + 禁用词表」四件套。不只检测，给出可直接抄走的改写示范。这是市面上去 AI 味工具普遍缺的部分，大多数只标红不修。

## 跑通整个网文工业链：扫榜→拆文→写作→去 AI 味

完整流程是 4 步。先 story-long-scan 跑遍起点 / 番茄 / 晋江的实时榜单，给你目标平台当下哪些题材在涨；然后 story-long-analyze 拿一本对标书拆它的黄金三章、爽点设计、节奏曲线；接着 story-long-write 按拆出来的结构搭大纲、写人物、出正文；最后 story-deslop 把 AI 痕迹清掉。

每一步都有「跳过准备直接落笔」的入口。已经知道写什么的，可以从 story-long-write 直接进。这个分支设计很关键，让工具同时服务两种作者：完全新手（按流程一步步来）和老手（只用其中一两个工具）。

短篇线的逻辑一样，但平台数据和写作公式都换了。短篇专攻知乎盐言故事和番茄短篇，节奏更快、情绪曲线更陡，这套 skill 把短篇压缩三幕、感情线四阶段都内置好了。

## 传播逻辑

这个 repo 4 月 22 日才推出来，到现在刚好 8 天，573 颗星 167 个 fork。这种增速在 Claude Skill 生态里属于第一档。

第一个原因是它解决的是真问题。中文网文作者用 AI 写作的痛点早就存在：模型对中文网文的"爽点""毒点""卷标"这些黑话理解很弱，prompt engineering 又门槛高。把这些内功打包成 skill，作者只需要描述自己想写啥，剩下交给工具。

第二个原因是定位极准。它没去做"通用写作"那种大而泛的方向，直接卡死「中文网文」这个细分。Top 1% 的 Skill 几乎都是这种打法，挑一个被忽略的垂直场景做深。前一篇文章里那 0.983 基尼系数说的就是这件事，做大方向跟头部抢蛋糕没希望，做细分场景反而能直接进 Top 1%。

第三个原因藏在 README 末尾那句话。「这套 skill 现在能让我度过找工作的过渡期 :joy:」。一句话讲清楚了三件事：作者自己在用、有真实付费意愿、工具被生活压力打磨过。这种来自真实使用场景的工具，质量天然比"为开源而开源"的项目高一个数量级。

## 不只是网文人，所有长内容创作者都该看一眼

如果你不写网文，这套工具还有 3 个值得抄的地方。

文件系统管理长内容的目录结构。任何写书、写连载、写课程、写剧本的人，都能直接抄它的「设定/大纲/正文」三段式。比 Notion 数据库更轻、比 Markdown 单文件更结构化。

browser-cdp 这个 skill 的思路。复用真实浏览器的登录态抓数据，绕过 robots 和反爬虫，不用维护 cookie。任何需要从特定平台拉数据的场景都适用，不限网文。

references/ 按需加载知识库的设计模式。整个 skill 包的核心壁垒在那 16 个主题的知识库，但作者做成了「调用 skill 时才加载」，不占用户上下文。这是 Anthropic 推 Skill 的核心理念：知识做厚、上下文做轻。任何垂直行业的 skill 都该这样建知识库。

## 30 秒装上跑起来

安装命令一行：

**npx skills add worldwonderer/oh-story-claudecode -y**

装完进 Claude Code 直接 /story-long-scan 就能开始扫榜。如果你已经有想写的题材，直接 /story-long-write 跳到写作环节，工具会问你书名、题材、平台，然后自己搭大纲框架。

第一次用建议先跑 /story-deslop 把现有 AI 写的那段稿子丢给它，看看能改出什么样。这个 skill 的输出最直观，能让你快速判断这套工具是不是你的菜。

## 一句话抓重点

worldwonderer 这个项目证明了一件事：在 67,000 个 AI Agent 项目挤破头的市场里，Top 1% 的位置不靠规模和资源，靠精准卡位 + 真实使用场景。一个找工作的网文作者，把自己每天用的工具开源出来，8 天进了 Claude Skill 生态的第一档。

中文 AI Skill 生态在等的就是更多这样的项目。每个细分行业都缺一个 worldwonderer。

仓库地址 [github.com/worldwonderer/oh-story-claudecode](https://github.com/worldwonderer/oh-story-claudecode)，作者社区在 LINUX DO。如果你正在写网文或者准备写，今晚装上试一晚，比看十篇 prompt 教程都有用。