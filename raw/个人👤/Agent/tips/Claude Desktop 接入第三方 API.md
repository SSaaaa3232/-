---
ingested: 2026-05-06
wiki_page: "[[wiki/sources/Source - Claude Desktop 接入第三方 API 教程]]"
title: "Claude Desktop 接入第三方 API 教程"
source: "https://x.com/Pluvio9yte/status/2049293145670836459"
author:
  - "[[@Pluvio9yte]]"
published: 2026-04-29
created: 2026-04-29
---

**Claude 桌面版的应用程序也能够接入第三方API了**，这意味着，无论你用的是中转站的 Claude 模型，或者是 DeepSeek、GLM 等国产模型，都能够接入 Claude Desktop 了。

下面是带图文的详细教程：

1. **正常安装** Claude Desktop，从官网下载对应版本安装好。

**2\. 首次打开，不要登录**。

左上角菜单有点小坑——没登录时鼠标可能点不到菜单栏，得把鼠标移到输入框附近，然后用键盘 **Tab** 键跳过去，回车打开菜单。进去后：**Help → Troubleshooting → Enable Developer Mode**。

![[21a64a3018c71a79edc8535f43786005_MD5.jpg]]

3.Developer Mode 启用后，菜单栏会出现 **Developer** 选项，点进去选 **Configure third-party inference**。

![[8e24c9d5bc0abb663289e113208e0675_MD5.jpg]]

4.在弹出的配置界面里，填入你的中转地址（Base URL）和 API Key，选择 **Apply locally**（本地应用），然后重启就好了。重启后选 “Continue with Gateway” 就能用第三方模型了。

![[c52923fb95a61848f0d6d2d8f8cef0f4_MD5.png]]

**节约成本的方法1：Claude 担任大脑：生成高质量skill**

完成配置后，我把设计文档喂给了 Claude，我直接告诉它：“请你完整吃透这份设计文档，为我制作一套高质量、可复用的前端页面生成 Skill，包括详细的 Skill 说明书和系统 Prompt 模板，把所有视觉规范、代码要求、动画标准、响应式规则都定义清楚。”

Claude 把 18000 多字节的文档一次性吃透后，给我输出了一份结构非常清晰、逻辑严密的 Skill 文档：把颜色体系、字体层级、渐变规范、卡片样式、动画实现方式、纯 CSS + SVG 图表要求等全部整理得井井有条，还定义了迭代时的修复原则。

拿到这份 Skill 文档后，我把它沉淀到了我的工具链里，在 Claude Desktop 中配置了该技能，后续使用时就不用每次都把整套规范重新说一遍了。

