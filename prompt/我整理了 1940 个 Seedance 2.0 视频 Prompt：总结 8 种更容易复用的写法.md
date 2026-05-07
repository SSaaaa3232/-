---
title: "我整理了 1940 个 Seedance 2.0 视频 Prompt：总结 8 种更容易复用的写法"
source: "https://www.v2ex.com/t/1210578"
author:
  - "[[charless123]]"
published: 2026-05-06
created: 2026-05-07
---
最近我在整理 Seedance 2.0 相关的视频 Prompt 。

一开始我以为重点是找“更炫的关键词”，比如电影感、大片质感、8K 、超写实、运镜高级。

但看了很多真实案例以后，我发现真正有复用价值的 Prompt ，通常不是靠堆风格词，而是靠更清楚的结构。

尤其是视频 Prompt ，和图片 Prompt 不太一样。

图片 Prompt 更关注主体、风格、构图和细节；视频 Prompt 还要额外交代：

- 画面里谁在动
- 怎么动
- 镜头怎么跟
- 每个时间段发生什么
- 声音、台词、口型要不要同步
- 人物、产品、服装是否要保持一致
- 哪些错误需要明确禁止

这篇文章主要分享我从一批 Seedance 2.0 Prompt 里总结出来的 8 类写法。

如果你也在做 AI 视频、短视频分镜、产品广告、图生视频或角色一致性测试，可以直接拿这些结构去改。

为了方便直观看，下面我会在每类写法里放一个案例缩略图和视频示例。建议先看结果，再看 Prompt 结构，这样更容易理解为什么某些写法会更稳定。

## 先说结论

整理完这些 Prompt 后，我有几个比较明确的感受：

- 视频 Prompt 最重要的不是“形容词”，而是“动作和时间结构”。
- 想要稳定，最好把一个视频拆成 2 到 4 个镜头段落。
- 图生视频要优先说明“保留什么”，再说明“让它怎么动”。
- 产品广告类 Prompt 要写材质、卖点、镜头和环境反应。
- 人物视频要写脸部一致性、服装一致性、动作幅度和口型要求。
- 动作戏不能只写“打斗很燃”，要写清空间关系、攻击方式和镜头节奏。
- 声音不是附加项，台词、环境声、音乐节奏都会影响视频理解。
- 发布或复用公开 Prompt 时，最好保留来源和作者信息，避免把别人的完整案例当成自己的原创。

下面按场景拆。

## 一、通用视频 Prompt：先把“镜头计划”写出来

很多人写视频 Prompt 时，会像写图片一样：

```
一个女孩在城市街头，电影感，超真实，8K ，高级光影。
```

这类描述不是完全没用，但它对视频来说太空了。

更稳的写法是把 Prompt 当成一个小分镜。

可复用结构：

```
主题：这个视频要表达什么
主体：人物 / 产品 / 动物 / 场景 / 角色
场景：时间、地点、天气、环境元素
动作：主体在几秒内做什么
镜头：推、拉、摇、移、跟拍、环绕、特写、俯拍
风格：写实、广告片、动漫、纪录片、MV 、电影短片
时间段：0-5 秒、5-10 秒、10-15 秒分别发生什么
声音：环境声、音乐、台词、音效
限制：不要字幕、水印、变脸、抖动、穿帮、畸形
```

一个简单模板：

```
生成一个 10 秒视频，主题是 [主题] 。
主体是 [主体] ，位于 [场景] 。
整体风格为 [风格] ，画面比例 [比例] 。

0-3 秒： [第一个动作和镜头] 
3-7 秒： [第二个动作和镜头] 
7-10 秒： [收尾动作和画面] 

要求保持 [需要稳定的元素] 一致。
避免 [常见错误] 。
```

这个模板不复杂，但比“高级电影感”可控很多。

案例预览：街头赛车镜头

![[d1f0149bf3362d34e42cd6d4afa0dd2c_MD5.jpg]]

<video controls width="100%" src=" [https://customer-qs6wnyfuv0gcybzj.cloudflarestream.com/3a7fb0a6d706b9f568479bb720ce1ad4/downloads/default.mp4](https://customer-qs6wnyfuv0gcybzj.cloudflarestream.com/3a7fb0a6d706b9f568479bb720ce1ad4/downloads/default.mp4) "></video>

视频示例： [https://customer-qs6wnyfuv0gcybzj.cloudflarestream.com/3a7fb0a6d706b9f568479bb720ce1ad4/downloads/default.mp4](https://customer-qs6wnyfuv0gcybzj.cloudflarestream.com/3a7fb0a6d706b9f568479bb720ce1ad4/downloads/default.mp4)

这个案例适合观察“镜头计划”的价值。它不是只写一辆车很快，而是把车内特写、按钮、外部跟拍、低机位轮胎、街道追逐这些镜头串起来，所以画面更像一段剪辑好的短片。

## 二、电影短片类：氛围要写，动作更要写

电影短片 Prompt 常见问题是太依赖氛围词。

比如：

```
日系青春电影，暧昧，阳光，教室，纯爱，电影感。
```

这能给模型一个方向，但还不够。

如果想让结果更像一段视频，而不是一张会动的海报，需要写清人物关系、微表情、镜头推进和时间变化。

可复用结构：

```
故事氛围 + 场景细节 + 人物关系 + 微动作 + 分段镜头 + 声音设计 + 一致性要求
```

示例结构：

```
15 秒日系青春短片，空教室，下午金色阳光透过百叶窗，桌面有细小尘埃漂浮。

0-4 秒：中景缓慢推进到两人侧脸。女生低头写字，发丝被微风轻轻吹动，呼吸自然。
4-9 秒：切到男生近景。他偷偷看向女生，发现她停笔后慌忙移开视线，手指轻微发抖。
9-15 秒：两人视线相遇，女生短暂愣住后低头，轻声说一句台词，男生小声回应。

要求：脸部、发型、校服保持一致；口型自然；动作克制；不要字幕、水印和夸张表情。
声音：远处蝉鸣、笔尖划纸声、很轻的钢琴。
```

案例预览：日系青春短片

![[d7d3c63962d4cfd9236c672ffd1bc394_MD5.jpg]]

<video controls width="100%" src=" [https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/releases/download/videos/1402.mp4](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/releases/download/videos/1402.mp4) "></video>

视频示例： [https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/releases/download/videos/1402.mp4](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/releases/download/videos/1402.mp4)

这个案例里最值得学的不是“纯爱”“电影感”这些词，而是它把呼吸、眼神、手指发抖、短暂停顿、低声台词都写进去了。AI 视频里，微动作越具体，结果越容易像一段真实表演。

重点不是把故事写长，而是把“可拍出来的动作”写清楚。

## 三、产品广告类：不要只写产品外观，要写展示逻辑

产品广告 Prompt 如果只写“高级产品广告”，经常会出现两个问题：

- 产品很漂亮，但卖点不清楚。
- 镜头很好看，但产品形状容易变。

这类 Prompt 最好按广告片逻辑写：

```
产品主体 + 材质细节 + 核心卖点 + 镜头运动 + 环境反应 + 禁止变形
```

可复用结构：

```
生成一个 [产品] 广告短片。
产品位于 [场景] ，材质为 [材质] ，核心卖点是 [卖点] 。

0-3 秒：产品静态亮相，镜头 [推近 / 环绕 / 低角度] 。
3-7 秒：展示 [功能或材质变化] ，突出 [细节] 。
7-10 秒：产品完成最终姿态，背景光线和反射强调高级感。

要求产品结构稳定，不要多余文字，不要标签变形，不要出现不存在的按钮或接口。
```

如果是手表、耳机、鞋、饮料、护肤品这类产品，最好额外写：

- 表面材质
- 反光方式
- 是否有水滴、烟雾、灰尘、冰块
- 镜头距离
- 产品是否旋转
- 标签或 Logo 是否必须清晰

这里要特别注意：如果涉及真实品牌、参数、认证标识，生成后一定要人工复核。

案例预览：高定幻想广告

![[1aa4442a902430ff790d588e47a27ed7_MD5.jpg]]

<video controls width="100%" src=" [https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/releases/download/videos/594.mp4](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/releases/download/videos/594.mp4) "></video>

视频示例： [https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/releases/download/videos/594.mp4](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/releases/download/videos/594.mp4)

这个案例可以当成“材质驱动广告片”的参考。它不是简单写一条裙子很高级，而是写了液态青花瓷、镜面盐湖、低角度镜头、碎裂成水墨燕子、最后进入流体漩涡。产品、服装、艺术装置类视频都可以参考这种“材质变化 + 镜头段落 + 视觉结果”的写法。

## 四、图生视频：先固定首帧，再控制运动

图生视频的核心不是“让图片动起来”这么简单。

更准确地说，它是在一张参考图的基础上控制变化范围。

所以 Prompt 里要先写清楚保留项：

```
保持人物脸部、五官、发型、服装、产品形状、主色调、构图一致
```

然后再写运动项：

```
只让头发、衣摆、镜头、光线、背景粒子发生轻微变化
```

可复用结构：

```
基于参考图生成视频。
必须保持 [脸部 / 产品 / 服装 / 构图 / 颜色] 一致。
允许变化的是 [动作 / 镜头 / 光线 / 背景 / 特效] 。

0-4 秒： [轻微动作] 
4-8 秒： [镜头变化] 
8-10 秒： [收尾姿态] 

禁止改变五官、脸型、产品结构、服装颜色和主体身份。
```

图生视频里，限制条件非常重要。

如果你只写“让她跳舞”“让产品旋转”，模型可能会顺手改掉脸、衣服、产品结构或背景。

更稳的思路是：

```
先说明不能变的部分
再说明可以动的部分
最后说明不要出现的错误
```

案例预览：参考图角色一致性

![[3d6d281dd236f9297ea74e666c704baa_MD5.jpg]]

<video controls width="100%" src=" [https://customer-qs6wnyfuv0gcybzj.cloudflarestream.com/846845dc60598558687d67d6abcc1c3d/downloads/default.mp4](https://customer-qs6wnyfuv0gcybzj.cloudflarestream.com/846845dc60598558687d67d6abcc1c3d/downloads/default.mp4) "></video>

视频示例： [https://customer-qs6wnyfuv0gcybzj.cloudflarestream.com/846845dc60598558687d67d6abcc1c3d/downloads/default.mp4](https://customer-qs6wnyfuv0gcybzj.cloudflarestream.com/846845dc60598558687d67d6abcc1c3d/downloads/default.mp4)

这类案例里常见写法是 `exactly matching @img1` 、 `character consistency` 。它的重点不是把参考图重新描述一遍，而是告诉模型：参考图里的角色身份、脸、服装和整体气质必须保持，然后只让角色在新场景里运动。

## 五、变装和转场类：写清“转场机制”

变装类视频很容易出效果，但也很容易乱。

很多人只写：

```
古风美女连续变装，丝滑转场，抖音爆款。
```

这不够。

变装 Prompt 最关键的是转场机制。

常见转场方式包括：

- 袖子扫过镜头
- 团扇遮面
- 转身遮挡
- 披帛甩动
- 手掌靠近镜头
- 光效覆盖主体
- 裙摆扫过画面

可复用结构：

```
人物设定 + 初始造型 + 每秒服装变化 + 每次转场遮挡方式 + 镜头稳定要求 + 节奏要求
```

示例结构：

```
10 秒古风变装视频，中景跟拍，人物脸部保持一致。

0-1 秒：素色襦裙，站定垂手，暖调柔光。
1-2 秒：转身拂袖，衣袖扫过镜头完成变装，换成白色仙裙。
2-3 秒：团扇遮面，扇子移开后换成粉色襦裙。
3-4 秒：裙摆扫过画面，换成蓝绿色渐变古风裙。
...
9-10 秒：回到初始造型，镜头稳定收尾。

要求：转场自然，服装变化明确，脸部一致，不要生硬切镜，不要多余文字。
```

这类 Prompt 的重点是：每一次变化都要有“遮挡动作”。

没有遮挡动作，模型就很容易把变装做成跳帧。

案例预览：古风变装转场

![[a97fadd20d881bc5e23c8d80380ab5d9_MD5.jpg]]

<video controls width="100%" src=" [https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/releases/download/videos/1967.mp4](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/releases/download/videos/1967.mp4) "></video>

视频示例： [https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/releases/download/videos/1967.mp4](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/releases/download/videos/1967.mp4)

看这类案例时，建议重点观察每次变装前有没有“遮挡动作”。袖扫、转身、手掌、团扇、光效，本质上都是给模型一个合理的视觉过渡点。

## 六、动作和特效类：先写空间关系，再写打斗

动作戏最怕只写“打得很燃”。

因为模型不知道谁从哪里来，攻击谁，镜头站在哪里。

动作类 Prompt 可以这样拆：

```
场地 + 角色位置 + 攻击路线 + 防守动作 + 特效类型 + 镜头节奏 + 最终结果
```

例如真人动漫对战、武侠、机甲、怪兽、街头格斗，都适合这种结构。

可复用结构：

```
场景： [地点、天气、地面状态、背景元素] 
角色 A： [服装、武器、站位、能力] 
角色 B： [服装、武器、站位、能力] 

0-5 秒：角色 A 蓄力，特效如何出现，镜头如何靠近。
5-10 秒：角色 B 反击，移动路线和速度如何表现。
10-15 秒：双方碰撞，特效如何爆发，环境如何受到影响。

要求动作清晰，不要血腥，不要肢体畸形，不要镜头乱跳。
```

动作戏里的“环境反应”也很重要。

比如：

- 落叶被气流卷起
- 地面积水被震开
- 玻璃反射闪光
- 雾气被冲散
- 尘土被脚步带起

这些细节会让特效不只是贴在画面上，而是和场景产生关系。

案例预览：真人动漫对战

![[4021a12ae3f7f41185b7d3576a63d8ba_MD5.jpg]]

<video controls width="100%" src=" [https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/releases/download/videos/189.mp4](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/releases/download/videos/189.mp4) "></video>

视频示例： [https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/releases/download/videos/189.mp4](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/releases/download/videos/189.mp4)

这个案例把动作戏拆成“起式、突进、对撞”三段。每段都说明角色位置、能力效果和环境反应，所以特效不是随机闪光，而是围绕动作推进。

## 七、台词和声音类：口型、停顿和音效要分开写

如果视频里有台词，Prompt 不能只写一句对白。

最好把这些信息拆开：

- 谁说话
- 什么语气
- 什么时候说
- 口型是否同步
- 停顿多长
- 背景声是什么
- 音乐节奏是否配合动作

可复用结构：

```
台词： [具体台词] 
语气： [低声、紧张、兴奋、克制、冷幽默] 
口型： [自然、轻微、不要夸张] 
停顿： [短暂停顿、迟疑、打断] 
环境声： [风声、雨声、车声、脚步声、纸张声] 
音乐： [轻钢琴、电子鼓点、低频氛围、无音乐]
```

示例：

```
女生轻声说：“你在看什么？”
语气害羞，音量低，停顿自然，口型轻微变化，不要夸张张嘴。
男生停顿 0.4 秒后小声回答：“没什么。”
背景有远处蝉鸣和笔尖划纸声，最后进入很轻的钢琴。
```

如果台词很重要，建议不要把它藏在长段落里，单独列出来更清楚。

案例预览：动作喜剧台词

![[253614b8a4423f5af14edc5f46cf0b69_MD5.jpg]]

<video controls width="100%" src=" [https://customer-qs6wnyfuv0gcybzj.cloudflarestream.com/bb5d9aa4e44f9d44900e0a5781fa3e47/downloads/default.mp4](https://customer-qs6wnyfuv0gcybzj.cloudflarestream.com/bb5d9aa4e44f9d44900e0a5781fa3e47/downloads/default.mp4) "></video>

视频示例： [https://customer-qs6wnyfuv0gcybzj.cloudflarestream.com/bb5d9aa4e44f9d44900e0a5781fa3e47/downloads/default.mp4](https://customer-qs6wnyfuv0gcybzj.cloudflarestream.com/bb5d9aa4e44f9d44900e0a5781fa3e47/downloads/default.mp4)

这类 Prompt 很适合学习台词节奏。它把角色对白、反应、动作和音效放在同一个时间线上，读起来像短剧脚本。做 AI 短剧、广告口播、剧情反转时，这种格式比单独写一句台词更稳。

## 八、物理写实类：写清运动原因和环境反馈

有些视频看起来“不真实”，不是因为画质低，而是因为运动没有物理原因。

比如鹰飞行、赛车漂移、水滴飞溅、衣服摆动、人物落地，都需要交代力和反馈。

可复用结构：

```
主体运动 + 受力变化 + 环境反馈 + 镜头跟随 + 真实限制
```

示例结构：

```
一只金雕从悬崖起飞，翅膀展开时羽毛分离明显，气流阻力让初级飞羽独立弯曲。
镜头使用稳定航拍跟随，中距离平行移动。
金雕接近城市屋顶时逐渐减速，爪子前伸，落在金属招牌上。
落地瞬间招牌轻微震动，羽毛自然收拢，头部有微小观察动作。

要求真实鸟类解剖结构，真实重量转移，避免夸张慢动作和不自然插帧。
```

写实类 Prompt 里，最有用的不是“超真实”，而是：

```
什么力量导致了什么运动
运动又让环境产生了什么反馈
```

案例预览：金雕物理运动

![[f6051ae3b92ca00638dc8ac925104ba4_MD5.jpg]]

<video controls width="100%" src=" [https://customer-qs6wnyfuv0gcybzj.cloudflarestream.com/a6bdca94d1ce92fba822adab24159aa1/downloads/default.mp4](https://customer-qs6wnyfuv0gcybzj.cloudflarestream.com/a6bdca94d1ce92fba822adab24159aa1/downloads/default.mp4) "></video>

视频示例： [https://customer-qs6wnyfuv0gcybzj.cloudflarestream.com/a6bdca94d1ce92fba822adab24159aa1/downloads/default.mp4](https://customer-qs6wnyfuv0gcybzj.cloudflarestream.com/a6bdca94d1ce92fba822adab24159aa1/downloads/default.mp4)

这类写法尤其适合动物、飞行、赛车、液体、火焰、布料和机械装配。只写“真实”不够，要写清楚气流、重量、阻力、接触、震动和环境反馈。

## 我整理 Prompt 时保留的字段

如果你也想做自己的 Prompt 库，建议每条至少保留这些字段：

- 标题
- 原始 Prompt
- 模型
- 视频时长
- 画面比例
- 标签
- 视频结果
- 缩略图
- 作者或来源
- 适用场景
- 可复用结构

这样后续复盘会方便很多。

比如同样是“人物变身”，你可以对比：

- 哪些 Prompt 写了时间段
- 哪些 Prompt 写了参考图一致性
- 哪些 Prompt 写了声音
- 哪些 Prompt 写了禁止项
- 哪些 Prompt 写了环境反馈

看多了以后会发现，高质量 Prompt 往往不是“更长”，而是“更像一个可执行的拍摄计划”。

## 一个更稳的使用流程

我现在更推荐这个流程：

```
先选一个明确场景
-> 找一个相似 Prompt
-> 只替换主体、场景和风格
-> 保留镜头结构
-> 生成第一版
-> 只改一个变量
-> 保存有效版本
```

不要每次都从零写。

AI 视频 Prompt 最值得积累的，不是某一句神奇咒语，而是一套能反复改主题的结构。

## 写在最后

这次整理最大的收获是：视频 Prompt 本质上更接近“分镜脚本”，而不是普通描述词。

如果你只写风格，结果会很随机。

如果你写清主体、动作、镜头、时间段、声音、限制条件和一致性要求，结果通常更容易复盘，也更容易二次修改。

我把完整可检索版本整理到了这里，方便按案例查 Prompt：

Seedance 2.0 Prompt Library： [https://cdance.ai/prompts/seedance-2-0](https://cdance.ai/prompts/seedance-2-0)

站里也整理了 GPT Image 2 和 Nano Banana Pro 的 Prompt ，但我建议先不要贪多。先从一种模型、一类场景、一个可复用模板开始，慢慢建立自己的 Prompt 库。

希望这些结构对你写 AI 视频 Prompt 有帮助。