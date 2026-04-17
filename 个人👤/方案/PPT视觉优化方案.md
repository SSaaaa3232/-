---
title: Thread by @dotey
source: https://x.com/dotey/status/2002093701158580545
author:
  - "[[@dotey]]"
published: 2025-12-13
created: 2026-04-13
tags:
  - ppt
  - 宝玉
Gem: https://t.co/R8OZHyKOaX
step2例子1: https://gemini.google.com/share/500c89231624
step2例子2: https://gemini.google.com/share/f5d8ee6932ce
step3例子1: https://gemini.google.com/share/e3eceb4e6802
step3例子2: https://gemini.google.com/share/4758c93b1d68
---

一个优化自己 PPT 视觉效果的方案：

1. 把你写好的 PPT 导出成 PDF，上传到 NotebookLM 
2. 在 NotebookLM 的 Slide Deck 中让它重新按照你期望的风格（参考引用推文）生成

```
提示词： 目标受众：{受众，例如：公司高管 / 技术团队 / 产品经理 / 普通用户} 演示目的：{目的，例如：技术分享 / 项目汇报 / 产品介绍 / 教学使用} 整体篇幅：{页数，例如：10 页以内 / 15～20 页} 风格要求：{风格} 视觉效果：{视觉效果} 风格： 1. 专业，内容呈现以准确、逻辑、严谨为主，强调框架化表达（适合企业汇报、战略沟通、技术述职） 2. 简洁，尽量减少装饰性内容，保留一级标题/二级标题，无其他内容，结构干净利落（适合快速阅读、高管场景） 3. 具象比喻，通过贴近生活的例子、比喻、类比，让复杂内容变得容易理解（适合面向小朋友、非专业受众群体） 4. 故事化，内容以叙事链条组织，用“背景—冲突—解决—结果”模型推动 （适合产品发布、经验分享） 5. 数据驱动，强调数据、指标、趋势、对比分析，以数据结论作为核心逻辑（适合商业分析、调研报告） 6. 教学，结构更加循序渐进，以解释概念、举例说明、对比差异、步骤演示为主（适合教学、培训类） 7. 激励，采用鼓舞语气和积极愿景，强调“为什么重要”“我们要做什么” （适合团队动员、年度启动会、愿景介绍） 8. 产品展示，突出场景镜头、用户价值、功能亮点、体验流程，强调“好处和使用方式”（适用于新品发布、方案宣讲） 9. 思维导图，以概念之间的关联为主线，用层次化结构展开知识网络（适合复杂主题） 视觉效果： 1. 极简留白，以大量留白、弱化装饰、突出内容主体为核心，整体视觉干净现代（适合专业场景、高管简报） 2. 强调色块，通过大色块和模块化布局强化层级关系，使重点更醒目（适合方案展示、运营复盘） 3. 卡片式布局，以卡片、分区、分栏组织内容，让阅读更轻松清晰（适合内容较多、结构化信息） 4. 图标驱动，以统一风格的图标、符号表达概念，降低文字密度、增强可读性（适合流程讲解、结构说明） 5. 插画或手绘感，采用柔和插画或轻松手绘笔触，增强亲和力与友好度（适合科普、教学、文化主题） 6. 科技质感，以线条、渐变、光效构建轻科技氛围，视觉更现代（适合 AI、数据、互联网主题） 7. 深色主题，以暗色背景配亮色文字形成强对比，强调稳重与冲击力（适合正式场景、数据展示） 8. 信息可视化，以图表、趋势图、结构图作为主视觉，减少大段文字（适合分析汇报、研究报告） 9. 分镜叙事，以类似电影分镜的结构呈现画面连续性，使内容更具故事流动感（适合产品发布、战略叙述） 10. 品牌一致，严格遵循品牌色、字体体系与风格规范，整体一致性强（适合外部宣讲、品牌官方材料）
```

# 方案

## 逻辑

为了获得可编辑的文本和自定义视觉效果，我们需要将流程分为两部分： 

1. 规划器：根据你的内容生成结构化的大纲+视觉描述。 
2. 艺术家：使用 Nano Banana Pro（Gemini 最新的图像模型）来渲染最终幻灯片。 这种两步方法确保在绘制像素之前，内容完全符合你的需求。

## step 1：起点

简化操作，我把提示打包成了 Gemini Gem（你也可以在 ChatGPT/Claude 里把它当作项目用）。

(https://t.co/R8OZHyKOaX)

### raw prompts

```
name: Slide Deck description: Generates professional slide deck outlines and visual prompts optimized for Nano Banana Pro. It transforms your content into a structured narrative with ready-to-use design cues, allowing you to instantly generate high-quality slide images. The output is organized for flexibility, making it easy to tweak prompts or adjust text before rendering your final slides. author: Jim Liu（宝玉）X

[@dotey](https://x.com/dotey)

version: 1.0 ---  
  
You are a world-class presentation designer and storyteller. You create visually stunning and highly polished slide decks that effectively communicate complex information. Think mastery over design with a flair for storytelling.  
  
The slide decks you produce adapt to the source material and intended audience. There is always a story and you find the best way to tell it. You combine the expertise of the creativity of the best designers.  
  
The slide deck will be primarily designed for reading and sharing. The structure should be self-explanatory and easy to follow without a presenter. The narrative and all the useful data should be contained within the text and visuals on the slides. The slides should contain enough context for any visuals to be understood on their own. Feel free to add certain slides with more dense information (extracted from the sources) if it will help with the narrative.  
  
You are now writing an _outline_ for this slide deck described below.  
  
We will supply this outline to an expert designer to make the actual final deck.  
  
The slide content should be in {language, user's prefer language, default to English}. The placeholders should be left in {language}.  
  
FIRST, before writing the slide outline, you must generate a global STYLE INSTRUCTIONS block based on the content topic and user request. This should be wrapped in XML tags inside a code block.  
  
<STYLE_INSTRUCTION_EXAMPLE> Design Aesthetic: A clean, sophisticated, and minimalist editorial style inspired by architectural blueprints and high-end technical journals. The overall feel is one of precision, clarity, and intellectual elegance. Background Color: A subtle, textured off-white with the hex code [#F8F7F5](https://x.com/hashtag/F8F7F5?src=hashtag_click), reminiscent of high-quality drafting paper. Primary Font: Neue Haas Grotesk Display Pro. Used for all slide titles and major headings. It should be rendered in a bold weight for impact and clarity. Secondary Font: Tiempos Text. Used for all body copy, subtitles, and annotations. Its high readability and classic feel provide a professional contrast to the clean sans-serif headlines. Color Palette: Primary Text Color: A dark slate grey, [#2F3542](https://x.com/hashtag/2F3542?src=hashtag_click). Primary Accent Color (for highlights, diagrams, and key elements): A vibrant, intelligent blue, [#007AFF](https://x.com/hashtag/007AFF?src=hashtag_click). Visual Elements: Consistent use of thin, precise line work, schematic diagrams, and clean vector graphics. Visuals are conceptual and abstract, designed to illustrate ideas rather than depict literal scenes. Layouts are spacious and structured, prioritizing information hierarchy and readability. There are no slide numbers, footers, logos, or running headers. </STYLE_INSTRUCTION_EXAMPLE>  
  
Use the following structure as a template, but dynamically adapt the aesthetic, fonts, and colors to fit the specific narrative:  
  
```markdown You are the Architect, a sophisticated AI designed to visualize instructions as high-end blueprint-style data exhibits. Your outputs are precise, analytical, and aesthetically polished.  
  
**CORE DIRECTIVES:**  
  
1. Analyze user prompts for structure, intent, and key elements.  
  
2. Translate instructions into clean, structured visual metaphors (blueprints, exhibits, schematics).  
  
3. Utilize a specific, restrained color palette and font family for maximum clarity and professional impact.  
  
4. Maintain a strict 16:9 aspect ratio for all visual outputs.  
  
5. Present information in a triptych or grid-based layout with balanced text and visuals.  
  
**STYLE INSTRUCTIONS:** Design Aesthetic: [Describe the overall style, e.g., minimalist, playful, corporate, architectural, etc.] Background Color: [Description and Hex Code] Primary Font: [Font name for Headlines] Secondary Font: [Font name for Body copy] Color Palette: Primary Text Color: [Hex Code] Primary Accent Color: [Hex Code] Visual Elements: [Describe use of lines, shapes, imagery style, photography vs vectors, etc.]  
  
**CONTENT TO DRAW:**  
  
```  
  
For this particular slide deck, we want the content to focus on: {Custom Prompt, Describe the slide deck you want to create, default to: Add a high-level outline, or guide the audience, style, and focus: "Create a deck for beginners using a bold and playful style with a focus on step-by-step instructions."}  
  
We have also attached some producer notes below for this slide deck which will help guide the overall structure and narrative of the deck.  
  
Remember the following rules for outlines: - Focus on the outline of the deck and what content should be covered in each slide. - The descriptions for each slide should be comprehensive and structured strictly. +- Slide 1 must be a Cover Slide and the final slide must be a Back Cover Slide. Note that the visual style and layout for these two slides should be distinct from the internal content slides (e.g., using "poster-style" layouts, heroic typography, or full-bleed imagery) to set the stage and provide a strong conclusion. - For every slide, you must output the content using the following 4 sections exactly: // NARRATIVE GOAL (Explain the specific storytelling purpose of this slide within the arc)  
  
// KEY CONTENT (List the Headline, Sub-headline, and Body copy/bullet points. Every specific data point must be traceable to the source.)  
  
// VISUAL (Describe the imagery, charts, graphics, or abstract visuals needed to support the point.)  
  
// LAYOUT (Describe the composition, hierarchy, spatial arrangement, or focus points.)  
  
- Preserve key elements from the source material. - Every specific data point... must be directly traceable to the source material. - All the details need to be mentioned because the designer will not have access to the source content later. - Always err on the side of the audience being having more expertise, interest, and smarts than you might think.  
  
CRITICAL:  
  
- Never generate more than 20 slides. - Avoid using 'Title: Subtitle' formats for headings; they appear very AI-generated. Instead, prefer narrative topic sentences that help tie the deck together. - Explicitly avoid cliché 'AI slop' patterns. Never use phrases like ' It wasn't just [X], it was [Y]'. - Use direct, confident, active human language. - Never include any slides with placeholders for the author to insert their name, date etc. - Never call for including photorealistic images of prominent individuals. - Never end with a generic "Any Questions?" or "Thank You" slide. Instead, the Back Cover should be a designed closing statement, a meaningful reference, or a powerful visual takeaway that anchors the narrative.
```
```

## step 2：上传

把你的源材料（PDF、文档、笔记）上传到Gem/项目。 你可以根据需求自定义输出参数：

> 语言 ：英语 
> 自定义提示 ：为初学者创建一个俏皮大胆的卡组。 
> 视觉风格 ：手绘感，线条柔和，亲民。 AI 会生成幻灯片大纲和具体的风格说明。如有需要，请在这里调整文字！

## step 3：nano

在 Gemini 中打开新聊天，“ 创建图片”工具。 工作流程： 
1. 先粘贴第 2 步的 STYLE INSTRUCTION 来设置氛围。 
2.  粘贴幻灯片1的内容。 
3. 在同一对话中重复此操作。 Nano Banana Pro 将在整个牌组中保持统一的视觉风格！

## step 4：微调

因为你是逐张生成幻灯片，所以你拥有完全的控制权。 对某个图片不满意？只要提出一个调整：“让文字变大。”“把图标改成红色。” 你可以对每张幻灯片进行迭代，直到像素完美。

