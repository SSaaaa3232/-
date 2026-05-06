---
ingested: 2026-05-06
wiki_page: "[[wiki/sources/Source - 10大我希望早点知道的Claude code使用技巧]]"
title: "10大我希望早点知道的Claude code使用技巧"
source: "https://x.com/lxfater/status/2041448785516343592"
author:
  - "[[@lxfater]]"
published: 2026-04-07
created: 2026-04-09
---


# 启动方式

我们使用Claude code的过程中，经常碰到需要重启的情况，每当重启，就需要回复之前的上下文： 我之前我总是使用

```bash
# 启动
claude
# 恢复
/resume
```

但是官方其实给了很不多不错的启动命令：

```text
# 直接启动最近会话(-p自动化启动)
claude -c
# 会话命名
claude -n "page"
# 直接启动特定会话
claude -r "page"
# 启动直接带提示词
claude "你好"
# 以无头方式启动，特别适合自动化（无UI的方式启动）
claude -p "分析input.cvs..." --output-format json

```

# Claude code运行

## **终止和回退任务**

刚使用claude code的时候，大家还是喜欢使用Ctrl+C关闭当前对话，谁知道直接把Claude都关闭了。 正确的做法是按一次 Ese按键，就能来立马打断对话，避免事情恶化。

假如Claude突然失智，我们就可以按两下Ese+Ese，接下面就会弹出一个列表

![[5fb47540f3093b5c86a5790bb1e135d0_MD5.jpg]]

你可以使用这个功能，回到任意一个检查点，避免Claude code将代码搞乱。

# **不离开Claude执行命令**

有时候我们会想自己运行一个测试命令, 但是为了不断当前Claude，不得不开启另外一个命令窗口

其实我们可以使用！语法

```text
# 这样子就可以不离开Claude，运行命令
!npm run lint
# 按下crtb+b，就可以将命令后置
```



# **上下文管理**

随着对话的继续，我们积累的聊天记录越多，单次消耗的token也就变多，这个时候Claude code会运行越来越冷慢。

你有两个选择，

- 新开窗口或者使用 **/clear 命令**

- 使用 **/compact，压缩一下。**

# **Superpowers**（成熟的编程方法论）

普通人Vibecoding的时候是没有啥章法的，想到哪就干到哪
这个Skills是一位老程序员总结的编程工作流。

他把顶级软件工程最佳实践打包成一键 Skills。

- 从需求梳理、Spec 确认、详细计划，到 TDD 测试驱动 + 自动 Code Review，全程强制结构化工作流，让 AI 像成熟工程师团队一样输出高质量、可维护代码，一次通过率大幅提升，再也不用反复救火。

# **语音输入软件**

## 豆包输入法：
	快，然后中英文识别还不错，最重要是免费。有点像安卓系统，我也在用。

## typeless
	除了需要付费外，没有太多缺点了，但能试用了（好像是我的）。


# 同时运用多个Claude code

- Cmux：

- 基于 Ghostty 全新打造的 macOS 原生终端，
- 专为同时跑多个 coding agent 而生

>垂直标签 + 智能侧边栏、灵活分屏、智能通知高亮、浏览器内置分屏 + Socket API。
