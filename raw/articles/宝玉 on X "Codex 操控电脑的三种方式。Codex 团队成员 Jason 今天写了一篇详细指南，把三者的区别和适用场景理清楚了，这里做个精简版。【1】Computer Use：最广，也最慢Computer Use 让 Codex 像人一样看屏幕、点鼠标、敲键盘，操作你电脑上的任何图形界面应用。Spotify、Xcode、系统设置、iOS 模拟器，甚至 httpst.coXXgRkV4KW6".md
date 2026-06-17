---
title: "宝玉 on X: \"Codex 操控电脑的三种方式。Codex 团队成员 Jason 今天写了一篇详细指南，把三者的区别和适用场景理清楚了，这里做个精简版。【1】Computer Use：最广，也最慢Computer Use 让 Codex 像人一样看屏幕、点鼠标、敲键盘，操作你电脑上的任何图形界面应用。Spotify、Xcode、系统设置、iOS 模拟器，甚至 https://t.co/XXgRkV4KW6\""
source: "https://x.com/dotey/status/2067033481142509588"
author:
published: 2026-06-17
created: 2026-06-17
---
## Post

## Conversation

Codex 操控电脑的三种方式。Codex 团队成员 Jason 今天写了一篇详细指南，把三者的区别和适用场景理清楚了，这里做个精简版。 【1】Computer Use：最广，也最慢 Computer Use 让 Codex 像人一样看屏幕、点鼠标、敲键盘，操作你电脑上的任何图形界面应用。Spotify、Xcode、系统设置、iOS 模拟器，甚至 iPhone Mirroring 都能控制。 代价是慢。结构化插件可以直接调 API，Computer Use 得一步步看界面、找按钮、等响应、再检查结果。但它能搞定没有 API 的应用，这是其他方式做不到的。 Mac 和 Windows 的体验差距很大：Mac 上 Codex 可以在后台静悄悄地操作，你继续用自己的电脑不受影响；Windows 上它必须占据前台，操作期间你没法用那台机器。 Jason 举了个例子：有次他的快递被偷了，Amazon 说要等 25 分钟才能接通客服。他让 Codex 每五分钟检查一次聊天窗口，客服出现后改为每分钟一次，自动完成退款流程。他去洗了个澡，回来退款已经办好了。 【2】Chrome 扩展：带着你的登录状态 Chrome 扩展让 Codex 使用你已登录的浏览器会话，包括 cookies、账号状态和已有标签页。Gmail、LinkedIn、Salesforce、公司内部后台，这些需要登录才能用的工具，Chrome 扩展是对的选择。 它还能同时控制多个标签页，在一个标签里读信息，到另一个标签里对比，再到第三个标签完成操作。Computer Use 也能操作浏览器，但它只认屏幕坐标，Chrome 扩展理解的是浏览器层面的上下文。 Jason 用它跑了一个长期任务：每天让 Codex 通过 Chrome 检查他的 Twitter 私信、浏览相关新闻、收集反馈，把有价值的内容存到本地文件，但不发任何消息。 要注意的是，网站会把 Codex 的点击和表单提交当作你本人的操作。研究、浏览、起草可以自动化，但发送、发布、付款这类操作最好留给自己确认。 【3】内置浏览器：给开发者的沙盒 内置浏览器住在 Codex 的对话线程里，你和 Codex 共享同一个渲染页面。它不带任何登录状态和 cookies，是个完全隔离的环境。 这反而成了开发场景的优势。它的主场是本地开发服务器、文件预览、公共网页、响应式布局检查和视觉 bug 复现。Codex 可以改代码、操作页面、截图、再跑一遍，形成紧密的反馈循环。 Jason 最喜欢的功能是标注：你可以直接在页面上点击某个元素留评论，比如"这个层级反了""这个按钮间距不够"，Codex 会拿着截图和元素上下文去改代码，改完重新打开同一个页面等你下一轮标注。比来回传截图和文字描述高效得多。 【选哪个？】 简单记：任务需要登录状态用 Chrome，需要操作桌面应用用 Computer Use，在做前端开发用内置浏览器。如果有现成的插件或 MCP 能完成任务，优先用结构化工具，视觉控制是最后手段。

Quote

jason

@jxnlco

9h

Three Ways Codex Can Use a Computer

Update: Computer Use is now Available in the EU/UK;) Enjoy! There are three ways for Codex to use a computer: Computer Use, the Chrome extension, and the in-app browser. They overlap just enough to...

[View quotes](https://x.com/dotey/status/2067033481142509588/quotes)

Post your reply[lin](https://x.com/linonly1214)[@linonly1214](https://x.com/linonly1214)

[5h](https://x.com/linonly1214/status/2067034561356452307)

Translated from Chinese

Under the Windows system, the built-in browser running in a sandbox environment keeps failing to start. Compatibility is very poor.[1K](https://x.com/linonly1214/status/2067034561356452307/analytics)[Duke\_Runsen](https://x.com/Duke_Runsen)[@Duke\_Runsen](https://x.com/Duke_Runsen)

[3h](https://x.com/Duke_Runsen/status/2067060689542529281)

Translated from Chinese

Codex's ability to control computers is getting stronger and stronger. But after doing half a year of Reddit needs reconnaissance, I've discovered that what truly stumps independent developers isn't "how to build," but "what to build." No matter how powerful the tools are, stuff

Codex的浏览器控制可能是目前所有浏览器Agent里面控制得最好的。我很多数据分析都是让codex去浏览器里面获取数据，我只需要登录一下就好了。

洗澡回来退款已办好理想生活了也是 25 分钟客服排队，我没耐心但 Codex 可以不在乎

在做电商二手转卖货源商品的时候，我浅浅测试了claude 和Codex的这个computer use的功能：claude会很容易被某个检测到异常访问；导致任务没办法完成，只完成了一个品的标题、详情文案、详情图和用户评价实拍图。codex就