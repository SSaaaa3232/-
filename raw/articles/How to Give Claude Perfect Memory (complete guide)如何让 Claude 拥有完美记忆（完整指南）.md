---
title: "How to Give Claude Perfect Memory (complete guide)如何让 Claude 拥有完美记忆（完整指南）"
source: "https://x.com/aiedge_/status/2046966170868486512"
author:
  - "[[@aiedge_]]"
published: 2026-04-08
created: 2026-04-26
---
![[77aeab0a2aeff7b24fd6e4a399681058_MD5.jpg]]

I don't care what anyone tells you - by default, Claude's memory is basically useless. 我不在乎别人怎么跟你说——默认情况下，Claude 的记忆力基本上毫无用处。

It frequently forgets context; you constantly have to re-explain yourself, and even after you do, it still often doesn't remember.它经常忘记上下文；你不得不不断重复解释，即便如此，它也常常记不住。

Sadly, most people have been living with these flaws for months, without knowing there is a better way. 遗憾的是，大多数人多年来一直忍受着这些缺陷，却不知道还有更好的解决办法。

I use Claude every single day. I literally have more Claude screen time than any other app on my Mac. 我每天都使用 Claude。我 Mac 上使用 Claude 的时间实际上比任何其他应用都要多。

Because I use Claude so often, I can't afford to have my most-used work tool randomly forget context and important data.因为我使用 Claude 如此频繁，我无法容忍我最常用的工作工具随机忘记上下文和重要数据。

In need of a Claude that is as sharp as possible, I went down the rabbit hole of looking for every possible memory solution.为了找到尽可能锋利的 Claude，我深入研究了各种可能的记忆解决方案。

Luckily, my research was successful.幸运的是，我的研究成功了。

I discovered three "layers" of memory systems, and they've made Claude significantly more powerful. 我发现了一种由三层构成的记忆系统，这些机制让 Claude 的能力得到了显著提升。

One that is easy and works well enough for 90%+ of Claude users.对 90%以上的 Claude 用户来说，这都是简单易用且效果不错的方案。

Another one that takes ~60 minutes to set up, but changes how Claude operates entirely.另一个需要约 60 分钟来设置，但却会彻底改变 Claude 的运作方式。

And the last one turns Claude into a self-evolving second brain, trained on all your data. 最后一个功能则将 Claude 转变为一个能够自我进化的“第二大脑”，它能利用你所有的数据来进行训练。

In today's article, I'm revealing all three of these systems and how I made my Claude way sharper.在今天的文章中，我将详细介绍这三个系统，以及我是如何让我的 Claude 性能更出色的。

Whether you've never touched Claude before or you're a power user, I'm confident that you'll find a system that fits your needs.无论您是第一次使用 Claude，还是经验丰富的资深用户，我都相信您一定能找到符合自身需求的系统。

## Layer one: Basic Memory (Beginner)第一层：基础记忆（初学者）

This is where everyone should start - four quick wins that take minutes to set up and immediately improve every conversation you have with Claude.这就是所有人都应该从这里开始的地方——四个简单易行的方法，只需几分钟即可设置完成，能立即提升你与 Claude 的每一次对话体验。

**1\. Memory Editing Tool1. 内存编辑工具**

Go to Settings → Memory right now.立即前往“设置”→“内存”。

This is the most overlooked page in all of Claude, and most people have never opened it. 这是整个 Claude 系统中最容易被忽视的页面，大多数人从未打开过它。

What you will find is everything Claude has stored about you (preferences, facts, habits, working styles, etc.) accumulated passively across every conversation you have ever had.你会发现，Claude 所存储的关于你的所有信息（偏好、事实、习惯、工作方式等等），都是通过你以往的每一次对话被动积累下来的。

Left unmanaged, your memory quickly fills up with garbage.如果不加以管理，内存很快就会充满垃圾数据。

**The fix is simple:** read through everything on this page. Delete anything outdated, inaccurate, or irrelevant. Then, manually add the context you actually want Claude to carry permanently.解决方法很简单：仔细阅读此页面上的所有内容。删除任何过时、不准确或无关的信息。然后，手动添加那些你希望 Claude 永久保留的上下文信息。

Stick to the basics here (your role and basic preferences) - we'll dive into building highly specific systems soon. 先从基础开始（你的角色和基本偏好）——我们很快会深入探讨如何构建高度定制化的系统。

![[358d0667d3887cbf7470c54626866ea4_MD5.jpg]]

Chat Memory 聊天记忆

2\. **Project Instructions**2\. 项目说明

If you use Claude Projects (you should), you need to fill in your Project Instructions field.如果您使用 Claude Projects（建议您这么做），则需要填写“项目说明”字段。

![[0ee822ca27e4b212aebc6f2799256170_MD5.jpg]]

Project Instructions项目说明

**My advice:** Create projects for all your most-used workflows, then voice-prompt all your context into a Google Doc and upload it as a PDF for each project.我的建议：为所有最常用的工作流程创建项目，然后将所有上下文通过语音提示输入到 Google 文档中，并作为 PDF 文件上传到每个项目中。

3\. **Tell Claude Directly**3\. 直接告诉 Claude

The simplest memory hack on this list. Mid-conversation, just tell Claude what you want it to remember.这个列表中最简单的记忆技巧。对话中，直接告诉 Claude 你想让它记住的内容。

Things like:例如：

```text
"Remember that I never want [x]"
"Remember that my role is [x]"
"Update your memory with [x]"
"Remember that I prefer responses under 400 words."
```

Claude will store these in your memory immediately. You can also tell it to forget things: "Forget that I mentioned \[x\]."Claude 将立即将这些信息存储到您的记忆中。您也可以指示它忘记某些事情：“忘记我提到 \[x\]。”

4\. **Memory Imports & Exports**4\. 记忆导入与导出

If you have been using ChatGPT (or another LLM) and have built up significant context there, you do not have to start from scratch in Claude; you have two effective options to transfer context:如果你一直在使用 ChatGPT（或其他 LLM）并且已经积累了大量上下文，你不必在 Claude 中从头开始；你有两种有效的方法来转移上下文：

a) You can tell ChatGPT you are switching platforms and ask it to generate a memory export document: "I'm switching this project to Claude, give me a summary document..."a) 你可以告诉 ChatGPT 你要切换平台，并请求它生成一个记忆导出文档：“我正在将这个项目切换到 Claude，给我一个摘要文档…”

b) You can use Import/Export in Claudeb) 你可以使用 Claude 中的导入/导出功能

In Settings → Memory, you can import full data from other LLMs 在设置 → 记忆中，你可以从其他 LLM 导入完整数据

![[6b0671b961b3f1aae0161a276a450582_MD5.jpg]]

Export/Import导出/导入

These four quick edits will suffice for 90%+ of you, and they make an immediate impact on how Claude responds. 这四个快速编辑足以满足 90%以上的用户，并且它们能立即影响 Claude 的响应方式。

However, the next section is for people who want a real system for taking Claude to the next level.然而，下一部分是为那些希望将 Claude 提升到更高水平的人准备的。

## Layer two: Context File System (Intermediate)第二层：上下文文件系统（中级）

Layer 1 fixes the basic memory problems. 第一层解决了基本的内存问题。

**Layer 2 builds something more powerful:** a file-based memory architecture that lives on your computer, loads automatically into Cowork and Claude Code.第二层构建了更强大的东西：一个基于文件的内存架构，它存在于您的计算机上，会自动加载到 Cowork 和 Claude Code 中。

**The concept is simple:** Instead of prompting Claude for context, you store all of that context in .MD desktop files that Claude has access to.概念很简单：您不必向 Claude 提供上下文，而是将所有上下文存储在 Claude 可以访问的 .MD 桌面文件中。

You can also attach these markdown files to any LLM or AI agent system.您还可以将这些 Markdown 文件附加到任何 LLM 或 AI 代理系统。

Start a new desktop folder, label it **"Claude Master Folder",** and build these four markdown files within it (Claude can help you do this):新建一个桌面文件夹，命名为“Claude Master Folder”，并在其中创建这四个 markdown 文件（Claude 可以帮助你完成这些）：

1. **Instructions.** **MD**说明.md

This file tells Claude all your rules & instructions:该文件包含所有你的规则和指令：

Example: ## Who you are ## What you do ## Rules ## What good outputs look like **Important to include:** "Update Memory. MD with my preferences over time."示例： ## 你是谁 ## 你做什么 ## 规则 ## 好输出的样子 重要包含："随时间更新 Memory. MD 以我的偏好。"

This line is crucial; it's how you get Claude to create a running memory log of your data in the second markdown file.这一行至关重要；这是你让 Claude 在第二个 markdown 文件中创建你的数据运行记忆日志的方式。

2\. **Memory. MD** 2\. 内存。MD

This is the "brain" of Claude, and it gets continuously updated over time.这是 Claude 的"大脑"，它随着时间的推移不断更新。

Example: ## Preferences ## Corrections ## Patterns ## Decisions示例： ## 首选项 ## 更正内容 ## 模式/规律 ## 决策

Now, whenever you say something like "stop using em dashes," Claude will go into the memory file and update it. 现在，每当你说类似“停止使用 em dashes”的话，Claude 就会进入内存文件进行更新。

3\. **Context. MD** 3\. 上下文。MD

The specific context file for \[x\] project.\[x\]项目的特定上下文文件。

Obviously, what's in this markdown file will change depending on your specific project.显然，这个 markdown 文件中的内容会根据你的具体项目而变化。

You can also just create a general "business context" or "life context" markdown mega file. 你也可以直接创建一个通用的“业务背景”或“生活背景”的 markdown 超级文件。

4\. **Archive Copies**4\. 存档副本

This one is purely protective but worth doing.这一项纯粹是保护性的，但值得做。

Claude will update your memory files automatically as you work. Occasionally, it overwrites something incorrectly or makes a change you did not intend. Claude 会随着你的工作自动更新你的记忆文件。偶尔，它可能会错误地覆盖某些内容或做出你无意中的更改。

Without a backup system, that context is gone.没有备份系统，那个上下文就没了。

The fix is simple. Once a week, copy your entire master folder with Instructions, Memory, Context, and everything else into a separate archive folder that Claude cannot access, and label it with the date. 修复很简单。每周一次，将你的整个主文件夹连同说明、记忆、上下文以及其他所有内容复制到一个 Claude 无法访问的单独归档文件夹中，并标注日期。

If anything breaks or gets overwritten incorrectly, you can restore from the archive.如果 anything 出现故障或被错误覆盖，你可以从归档中恢复。

**This is what the final product should look like:这是最终产品的样子：**

<video preload="none" tabindex="-1" playsinline="" aria-label="Embedded video" poster="https://pbs.twimg.com/amplify_video_thumb/2044552580609806337/img/2gf3N_nE2N_me1LC.jpg" style="width: 100%; height: 100%; position: absolute; background-color: black; top: 0%; left: 0%; transform: rotate(0deg) scale(1.005);"><source type="video/mp4" src="blob:https://x.com/12d92168-2f24-4c42-9e13-4097841b4597"></video>

0:00 / 0:20

4 Markdown Files: Final Product4 个 Markdown 文件：最终产品

As I mentioned above, you can just get Claude to create this for you.如我上面所述，你只需让 Claude 来为你创建这个。

Just create a new folder called "Claude Master Folder," attach it to a new Cowork chat, and paste this prompt:只需创建一个名为"Claude Master Folder"的新文件夹，将其附加到一个新的 Cowork 聊天中，并粘贴此提示：

```text
Go into my "Claude Master Folder" in my connected workspace and build these four markdown files inside it:

Instructions.md — includes sections for: Who You Are, What You Do, Rules, What Good Outputs Look Like, and a line telling Claude to update Memory.md with my preferences over time.
Memory.md — includes sections for: Preferences, Corrections, Patterns, Decisions, and Personal Context. Pre-fill with placeholder examples so I know what to add.
Context.md — includes sections for: About This Project/Business, Audience, Key People & Collaborators, Active Projects & Priorities, Tools & Stack, and Important Background/History. Use a template format with placeholders I can fill in.
Archive-Guide.md — a step-by-step guide explaining why to archive, how to do it weekly (duplicate the folder, rename with the date, move it somewhere Claude can't access), what to include, how to restore if something breaks, and where to store the backups.
```

So you have the system built - now, how do you actually use it?所以你已经建好了系统——现在，你实际上是怎么使用它的？

Anytime you're working in Cowork/Claude Code, you can attach your Master Folder, and Claude will use this as a mini memory database.无论你在 Cowork/Claude Code 中工作，你都可以附加你的主文件夹，Claude 将使用它作为一个迷你记忆数据库。

It will edit the memory markdown file, leaving you with something you can attach to any LLM, new chat, or AI agent.它将编辑内存中的 Markdown 文件，让你得到可以附加到任何 LLM、新聊天或 AI 代理的东西。

You can also manually update the .MD files and create new folders for specific projects within your Master Folder.你也可以手动更新 .MD 文件，并在你的主文件夹中为特定项目创建新文件夹。

This system is a complete game-changer, but what I'm about to show you in **Layer three** takes this system even further.这个系统是一个彻底的变革者，但我在三层要向你展示的内容更是将这个系统提升到了新的高度。

## Layer three: AI Second Brain (Advanced)三层：AI 第二大脑（高级）

This is the deepest level, and frankly, it is not for everyone.这是最深的层次，坦白说，它并不适合每个人。

It does require some initial setup and ongoing maintenance, but for those of you who build it, it truly is the best option for an advanced, detailed memory system with Claude.它确实需要一些初始设置和持续维护，但对于那些搭建它的人来说，它确实是使用 Claude 构建高级、详细记忆系统的最佳选项。

There are two options depending on how you work. 根据你的工作方式，有两种选择。

The first option is easier, and I included it for those of you who want a "simple" AI second brain.第一个选项更简单，我把它包含在内，是为了那些想要一个“简单”的 AI 第二大脑的人。

The second option is more advanced (but better overall), and requires 1-2 hours of dedicated building (don't worry, I'll guide you through it all).第二种选项更高级（但总体更好），需要 1-2 小时的专注搭建（别担心，我会一步步指导你）。

Keep in mind that for your AI second brain memory vault to be effective, you actually have to spend time maintaining it and updating your databases.请记住，为了让你的 AI 第二大脑记忆库有效，你实际上需要花时间维护它和更新你的数据库。

**Option 1: Claude x Notion选项 1：Claude x Notion**

Connecting Claude to Notion is the highest-leverage thing you can do in 5 minutes.在 5 分钟内，将 Claude 连接到 Notion 是你能做的最有杠杆效应的事情。

Go to Claude → Settings → Connectors, then enable the Notion connector. 前往 Claude → 设置 → 连接器，然后启用 Notion 连接器。

![[87ca86c873748f4a58d517e216bbff5c_MD5.png]]

Notion ConnectorNotion 连接器

Once connected, Claude can read your Notion workspace directly inside any chat.连接成功后，Claude 可以直接在任何聊天中读取你的 Notion 工作区内容。

Now all your tasks, CRMs, notes, tables, etc., are accessible and editable for Claude.现在，您的所有任务、CRM 数据、笔记、表格等， Claude 都能访问和编辑。

I recommend creating a new **"Memory Database"** where you store all your AI preferences, rules, and important AI context.我建议创建一个新的“记忆数据库”，将所有与 AI 相关的偏好设置、规则以及重要信息都存储其中。

As you're working with Claude, you can say: "Send this to my Notion Memory Database." 在使用 Claude 时，你可以说：“发送这个到我的 Notion 记忆数据库。”

You can then export this Notion data to other LLMs or AI platforms via a CSV file or by using the Notion MCP connector.然后你可以通过 CSV 文件或使用 Notion MCP 连接器将此 Notion 数据导出到其他 LLM 或 AI 平台。

This setup is similar to what I covered in Layer Two, except you now have nice visuals with Notion's built-in board views, to-do lists, and more, and you unlock additional functionality. 这个设置与我在 Layer Two 中介绍的内容类似，但现在你可以使用 Notion 内置的看板视图、待办事项列表等功能，并解锁更多功能。

I personally don't use this setup often (Option two below is just better), but I do occasionally use it to send and store valuable mega prompts I use in Claude:我本人不常用这个设置（下面的选项二更好），但偶尔会用它来发送和存储我在 Claude 中使用的有价值的大提示：

![[d96046fb19c8f36d1a3f08a93d1fa36a_MD5.jpg]]

Claude x Notion: Final ProductClaude x Notion：最终产品

**Option 2: Claude x Obsidian选项 2：Claude x Obsidian**

Obsidian is a tool that stores everything as plain Markdown files on your computer, making it a solid way to connect with Claude and build a second brain.Obsidian 是一款将所有内容存储为计算机上的纯 Markdown 文件的工具，使其成为与 Claude 连接并构建第二大脑的可靠方式。

**The setup配置**

1. **Download Obsidian下载 Obsidian**

Go to obsidian.md and download the app. 前往 obsidian.md 下载应用程序。

Create a new Vault (think of this as a simple desktop folder where Claude Code will store and access your data).创建一个新的 Vault（可以将其视为一个简单的桌面文件夹，Claude Code 将在此存储和访问您的数据）。

**2\. Select Vault in Claude Cowork/Claude Code2. 在 Claude Cowork/Claude Code 中选择 Vault**

Open the Claude desktop app and click 'Select Folder.' 打开 Claude 桌面应用程序并点击“选择文件夹。”

Point it at your Obsidian Vault folder. Claude now has direct read and write access to everything inside it.指向你的 Obsidian Vault 文件夹。Claude 现在可以直接读写其内部的所有内容。

**3\. Inject mega prompt3. 注入超级提示**

Paste Andrej Karpathy's LLM Knowledge Base system prompt into the chatbox. 将 Andrej Karpathy 的 LLM 知识库系统提示语粘贴到聊天框中。

This is the instruction set that tells Claude Code how to build, maintain, and evolve your wiki over time. 这就是告诉 Claude Code 如何随着时间推移来构建、维护和演进你的维基的指令集。

The prompt is available here: 提示信息请点击此处查看：

[gist.github.com/karpathy/442a6bf555914893e9891c11519de94f](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)

**4\. Feed it your data4. 将数据输入其中**

Drop in any existing notes, CSV files, article exports, or Notion exports to start populating your second brain. 只需将现有的笔记、CSV 文件、文章导出内容或 Notion 导出内容添加进来，即可开始充实你的“第二大脑”。

Claude then ingests each source, extracts the key information, and integrates it into an evolving memory wiki.Claude 随后会处理每个信息源，提取其中的关键信息，并将其整合到一个不断更新的记忆型维基中。

**Final Product最终产品**

The final product is an AI second brain knowledge wiki that links ideas, notes, remembers ALL your data, and looks like this:最终成果是一个人工智能“第二大脑”知识百科全书：它能将各种想法和笔记联系起来，记住你所有的数据，其界面如下所示：

![[6efd89bcd0a2be7f134c6383ba7e830a_MD5.jpg]]

Claude x Obsidian: Final ProductClaude x Obsidian：最终产品

**Which one should you choose?你应该选择哪一个？**

Notion = fast, simple optionNotion = 快速、简单的选择

Obsidian = local storage, and you want Claude to have a deep understanding (this is the most advanced memory system I've personally found).Obsidian 相当于本地存储，你需要让 Claude 对其有深入的理解（这是我个人所见最先进的记忆系统）。

If you're going to build the Claude x Obsidian second brain, I recommend reading this first (more details):如果你打算打造 Claude x Obsidian 这款“第二大脑”，我建议先阅读这篇文章（详情请见下文）：

> Apr 8

## Final Thoughts最终思考

So, there you have it, my three layers to building memory systems inside Claude that make it way sharper.所以，这就是我的三层构建 Claude 内部记忆系统的方法，使其变得更加敏锐。

Again, layer one is the basic setup that yields immediate results (enough for most people).再次，第一层是基本设置，能立即看到效果（对大多数人来说足够了）。

Layer two requires some setup, but is extremely valuable.第二层需要一些设置，但非常有价值。

And lastly, layer three will completely change how you use Claude.最后，第三层功能将彻底改变你使用 Claude 的方式。

I hope you found this article helpful. I post AI articles 2-3x/week, and all my content is hand-written, based on how I'm actually using AI (no AI slop).希望您觉得这篇文章有用。我每周会发布 2 到 3 篇关于 AI 的文章，所有内容都是我亲自撰写的，基于我实际使用 AI 的经验（绝非用 AI 生成的垃圾内容）。

If that's the style of content you like to see, follow me [@aiedge\_](https://x.com/@aiedge_) and more will be on your feed soon!如果你喜欢这种内容风格，请关注我 @aiedge\_，很快就会有更多内容出现在你的动态中！

Lastly, if you can, please Like/Repost this article so others can see it💙最后，如果可以的话，请点赞/转发这篇文章，让更多人能看到💙