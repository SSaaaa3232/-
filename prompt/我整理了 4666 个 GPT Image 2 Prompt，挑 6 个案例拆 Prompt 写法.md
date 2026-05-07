---
title: "我整理了 4666 个 GPT Image 2 Prompt，挑 6 个案例拆 Prompt 写法"
source: "https://www.v2ex.com/t/1210598"
author:
  - "[[charless123]]"
published: 2026-05-06
created: 2026-05-07
---
最近我在整理 GPT Image 2 的图片 Prompt 。

先看 3 张图：

| 产品图 Prompt | Prompt 结构 | 图到视频工作流 |
| --- | --- | --- |
| ![[8aae5e2dd229199d12d7d1792c5db74e_MD5.png]] | ![[09a3f346b7a8aa2e8baa6ea3e9634a1e_MD5.png]] | ![[b57f8b0629cf0e47ad1fa3930837b538_MD5.png]] |

很多人写 AI 图片 Prompt 时，会这样写：

```
生成一张高级感产品图，真实摄影，8K ，商业海报。
```

这类 Prompt 可以出图，但很难稳定复用。

因为模型不知道你真正要的是：

- 白底电商主图，还是品牌广告海报？
- 产品要居中，还是要留出文字区？
- 文字要不要可读？
- 是摄影图、3D 渲染、插画，还是 UI 截图？
- 是否需要保留参考图的形状、颜色、Logo 、比例？
- 成品用在小红书、独立站、亚马逊、电商详情页，还是 App 首屏？

我更倾向于把 GPT Image 2 Prompt 当成一份“视觉设计 Brief”，而不是一串形容词。

## 先给一个通用公式

多数可复用的图片 Prompt ，都可以拆成：

```
用途：这张图用在哪里
主体：画面主角是什么
版式：主体、文字、留白、模块怎么摆
风格：摄影、3D 、插画、UI 、信息图等
细节：材质、光线、背景、镜头、比例
文字：需要出现哪些精确文字，放在哪里
约束：不要乱码、不要变形、不要水印、不要多余 Logo
```

如果只写“高级感”，模型会自由发挥。

如果写清用途和版式，结果更像能交付的设计图。

## 案例 1：产品摄影图

![[8aae5e2dd229199d12d7d1792c5db74e_MD5.png]]

这张图适合拆产品摄影 Prompt 。

它不是单纯靠“高级感”，而是把产品图拆成了几个明确条件：

- 产品是什么
- 角度怎么拍
- 光线是什么
- 哪些细节必须保留
- 输出要适配哪些使用场景

可复用 Prompt：

```
生成一张 [产品类型] 商业摄影图。
产品以 [角度] 展示，位于 [干净背景 / 工作台 / 户外场景] 。
保持产品的形状、比例、颜色、材质和关键结构准确。
使用 [柔光 / 侧光 / 高反差光 / 自然光] 突出 [卖点] 。
画面用途是 [电商主图 / 品牌广告 / 详情页头图] 。
不要添加虚假 Logo 、乱码文字、额外按钮、变形结构或无关道具。
```

适合改成：

- 手表广告
- 耳机广告
- 鞋子详情页
- 饮料罐商业摄影
- 护肤品瓶身图

## 案例 2：Prompt 结构图

![[09a3f346b7a8aa2e8baa6ea3e9634a1e_MD5.png]]

这张图对应的是一个更通用的 Prompt 结构：

```
Prompt：一句话任务
Subject：主体
Composition：构图
Constraints：限制条件
```

很多失败的 AI 图片，不是模型不会画，而是 Prompt 没有把这四层写清楚。

一个更稳的写法：

```
任务：生成一张 [用途] 图片。
主体：画面主体是 [主体] ，必须保持 [关键外观] 。
构图：主体位于 [位置] ，画面保留 [文字区 / 留白区 / 模块区] 。
风格：整体为 [摄影 / 插画 / 3D / UI / 海报] 。
限制：不要乱码、不要水印、不要多余 Logo 、不要结构变形。
```

这个结构特别适合做：

- 海报
- 产品图
- App UI
- 信息图
- 角色设定
- 社媒封面

## 案例 3：从单张图到视频工作流

![[b57f8b0629cf0e47ad1fa3930837b538_MD5.png]]

这张图不是单张图片生成，而是一个工作流：

```
首帧图
-> 参考图
-> 分镜
-> Motion Prompt
-> 视频结果
```

如果你后续要从图片进入视频生成，这个结构很有用。

图片 Prompt 不只是“生成一张图”，还可以为后续视频做准备：

```
生成一张视频首帧图。
主体是 [产品/角色/场景] 。
构图要适合后续动画，主体位于画面中心或三分线位置。
背景包含可运动元素，如水花、云层、灯光、风、布料。
光线和色调保持电影感。
不要添加复杂文字，不要让主体被遮挡。
```

首帧图要注意：

- 主体要清楚
- 背景不能太乱
- 光线方向要明确
- 适合后续运动
- 不要塞太多文字

## 再看 3 个视频工作流

CSDN 对外链视频的支持有时不稳定。如果编辑器里 `<video>` 不显示，可以删掉视频标签，只保留下面的视频链接。

### 产品广告工作流

<video controls width="100%" src=" [https://cdn.nano-banana-2-ai.com/uploads/workflows/gpt-image-2/product-ad/product-ad-result.webm](https://cdn.nano-banana-2-ai.com/uploads/workflows/gpt-image-2/product-ad/product-ad-result.webm) "></video>

视频链接： [https://cdn.nano-banana-2-ai.com/uploads/workflows/gpt-image-2/product-ad/product-ad-result.webm](https://cdn.nano-banana-2-ai.com/uploads/workflows/gpt-image-2/product-ad/product-ad-result.webm)

这个例子适合看“产品首帧图 -> 广告动态效果”的衔接。图片 Prompt 里要提前给后续运动留空间，比如水花、光线、背景层次和主体位置。

### 角色动作工作流

<video controls width="100%" src=" [https://cdn.nano-banana-2-ai.com/uploads/workflows/gpt-image-2/character/character-result.webm](https://cdn.nano-banana-2-ai.com/uploads/workflows/gpt-image-2/character/character-result.webm) "></video>

视频链接： [https://cdn.nano-banana-2-ai.com/uploads/workflows/gpt-image-2/character/character-result.webm](https://cdn.nano-banana-2-ai.com/uploads/workflows/gpt-image-2/character/character-result.webm)

角色类图片不要只追求单张好看，更重要的是身份一致：发型、服装、五官比例、道具、色彩要能在后续分镜里继续复用。

### Storyboard 工作流

<video controls width="100%" src=" [https://cdn.nano-banana-2-ai.com/uploads/workflows/gpt-image-2/storyboard/storyboard-result.webm](https://cdn.nano-banana-2-ai.com/uploads/workflows/gpt-image-2/storyboard/storyboard-result.webm) "></video>

视频链接： [https://cdn.nano-banana-2-ai.com/uploads/workflows/gpt-image-2/storyboard/storyboard-result.webm](https://cdn.nano-banana-2-ai.com/uploads/workflows/gpt-image-2/storyboard/storyboard-result.webm)

Storyboard 的重点不是“画得多炫”，而是让镜头顺序清楚。每一帧最好都写清主体、动作、景别、镜头方向和情绪。

## 案例 4：电商主图和场景图要分开写

产品图常见失败原因：一条 Prompt 同时想做主图、场景图、海报、详情页。

建议分开：

```
主图：产品清楚，背景干净，形状准确。
场景图：展示使用情境，允许道具和环境。
卖点图：需要文字区、箭头、局部放大或信息模块。
社媒广告：需要情绪、冲击力和标题区域。
```

主图模板：

```
生成一张 1:1 电商产品主图。
产品是 [产品] ，正面居中展示。
白色背景，柔和阴影，边缘清晰。
产品占画面 70%，完整可见。
不要道具，不要文字，不要虚假 Logo ，不要变形。
```

场景图模板：

```
生成一张 16:9 产品生活方式场景图。
产品是 [产品] ，放在 [场景] 中。
使用自然光和真实阴影。
右侧保留干净留白，方便后期加标题。
保持产品形状和材质准确，不要添加无关物品。
```

## 案例 5：海报文字要短、准、少

AI 图片里最容易翻车的是文字。

不要写：

```
加一些高级标题和说明文字
```

建议写：

```
生成一张竖版活动海报。
主标题只写： [精确标题] 。
副标题只写： [精确副标题] 。
文字放在顶部，使用粗体无衬线字体。
主视觉位于画面中央。
不要添加其他文字、乱码、伪 Logo 或多余标签。
```

经验：

- 主标题尽量 2 到 6 个字
- 副标题尽量一行
- 不要同时要求太多小字
- 如果文字重要，生成后一定人工检查

## 案例 6：角色设定要写成资产，不要只写美图

如果只是发社媒，一张漂亮角色图就够了。

但如果要做 IP 、游戏、短剧、贴纸包，就要写成角色设定表：

```
生成一张角色设定表。
角色身份是 [身份] ，年龄和气质是 [描述] 。
包含正面、侧面、背面、3 个表情、2 个动作姿势、核心道具和配色说明。
风格为 [动漫 / 3D / 写实 / Q 版 / 游戏概念设定] 。
所有视图保持同一个角色身份、服装、发型和比例。
不要改变五官，不要出现多余角色，不要乱码标注。
```

角色设定表的价值是复用，而不是单张图的视觉冲击。

## 最后给一个总模板

```
生成一张 [图片用途] 。
主体是 [主体] ，用于 [平台/场景] 。
画面比例为 [比例] 。
构图为 [主体位置 + 留白位置 + 文字区域] 。
风格为 [摄影 / 3D / 插画 / UI / 信息图 / 海报] 。
重点突出 [卖点或视觉重点] 。
必须保持 [产品形状 / 人物身份 / 品牌色 / 文字内容] 。
只允许出现以下文字： [精确文字] 。
不要添加乱码、水印、多余 Logo 、变形结构、无关元素。
```

建议不要收藏一堆“神奇咒语”，而是按用途保存模板：

- 产品主图模板
- 海报文字模板
- UI 截图模板
- 信息图模板
- 角色设定模板
- Storyboard 模板

这样下次只需要替换主体、比例、颜色、标题，就能快速得到新图。

## 完整 Prompt 库

![[08aa2f37371b552d1161a76a461a7e00_MD5.png]]

我把完整可检索版本整理在这里，方便按案例标题查 Prompt：

GPT Image 2 Prompt Library： [https://gptimg2.art/prompts/gpt-image-2](https://gptimg2.art/prompts/gpt-image-2)

建议先从一种用途开始，比如产品主图或 UI Mockup ，挑 10 条类似案例拆结构。比起一次性看几千条 Prompt ，这样更容易真正变成自己的能力。

**[About](https://www.v2ex.com/about) · [Help](https://www.v2ex.com/help) · [Advertise](https://www.v2ex.com/pro/about) · [Blog](https://blog.v2ex.com/) · [API](https://www.v2ex.com/help/api) · [FAQ](https://www.v2ex.com/faq) · [Solana](https://www.v2ex.com/solana) · 6056 Online** Highest 6679 · [Select Language](https://www.v2ex.com/select/language) 创意工作者们的社区 World is powered by solitude VERSION: 3.9.8.5 · 38ms · [UTC 01:43](https://www.v2ex.com/worldclock#utc) · [PVG 09:43](https://www.v2ex.com/worldclock#pvg) · [LAX 18:43](https://www.v2ex.com/worldclock#lax) · [JFK 21:43](https://www.v2ex.com/worldclock#jfk)  
♥ Do have faith in what you're doing.