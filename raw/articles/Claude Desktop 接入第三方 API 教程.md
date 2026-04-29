---
title: "Claude Desktop 接入第三方 API 教程"
source: "https://x.com/Pluvio9yte/status/2049293145670836459"
author:
  - "[[@Pluvio9yte]]"
published: 2026-04-29
created: 2026-04-29
---
![[d52cba057b793bf97cc7722f533ee49a_MD5.jpg]]

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

**节约成本的方法2：使用OpenRouter免费模型**

最近发现OpenRouter上新了个模型，**Ling-2.6-1T。**

每天可以直接用：openrouter 免费模式 daily limit maxes out at 1,000 requests

我切换到 **Ling-2.6-1T**，开始真正生成页面。

这时候神奇的事情发生了——**因为有了前面Claude规划做好的 Skill 说明书，我只需要简单给出前端需求**，比如：

![[1deb48df17b25db69f775ff64cf3f0a9_MD5.jpg]]

**Ling-2.6-1T** 就能严格按照之前定义好的视觉风格、组件规范和代码要求，快速输出完整、可直接运行的单文件 HTML。生成的页面视觉风格高度一致，粒子背景光晕柔和，数字 countup 动画丝滑，看看效果：

![[9ec3a4709abc51a05164debd7272ff32_MD5.jpg]]

![[e24fd91d3d2f248444a0e7e2b6562795_MD5.jpg]]

![[92fac3d8be17c550ddabb51746dfb502_MD5.jpg]]

**如果你也预算不高，可以使用这种方式：Claude此类擅长规划的模型负责把复杂的事情想清楚、规则写扎实，低成本模型负责把事情干得又快又好**。有了 Skill 作为桥梁，我从原来每次都要长篇大论喂 Prompt，变成了现在“简单说一句需求就能出活”的状态，效率提升非常明显。