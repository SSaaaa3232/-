---
sources:
  - "[[02-raw/articles/2026/03/x-VibeDesign-Stitch.md]]"
category: AI/Vibe-Design
relations: []
---

# 什么是 Vibe Design？Stitch 一句话生成 UI

> 来源：https://x.com/IceBearMiner/status/2034529278625501627
> 作者：小八 @IceBearMiner
> 日期：2026-03-19

---

## 什么是 Stitch？

Google 的 AI 设计工具，**"你说，它画"**。

告诉它想要什么界面，直接出设计稿，还能导出到 Figma、AI Studio。

---

## 三大更新亮点

### 1. 语音交互
- 打开麦克风直接说话
- 一口气生成一系列设计图

### 2. 实时预览
- 生成的 UI 不再是死图
- 可以点击按钮、看交互
- 先体验再确定

### 3. 统一复用风格
- 读取现有网站配色，自动提取
- 导出为 DESIGN.md 文件
- 已有 DESIGN.md 可直接导入保持一致

---

## Vibe Design

Google 给这种 AI 生成设计的方式起的名字。

**一句话生成整个 App 流程**：
- 多个页面
- 多个主题

示例提示词：
```
Create a mobile e-commerce app with home, product detail, cart, and checkout screens
```

---

## Stitch SDK

Stitch 的 CLI 版本，给 Agent 调用的。

- 不需要手动去网页端对话
- Agent 根据项目需求自动调用
- API Key 在官网创建

---

## NotebookLM CLI

作者自己写的 CLI 工具，让 Agent 自动化操作 NotebookLM。

**应用场景：**
- 自动调研 + 生成播客
- 利用 whisper 转字幕实现自动推送
- 上传到 Vercel
- 音频自动推到 Cloudflare R2

**集成到 Agent：**
- 只需提供一个主题
- 剩下全程丢给 NotebookLM
- 节省 token，效果好

---

## 对我有什么用？

| 工具             | 用途           |
| -------------- | ------------ |
| Stitch         | 一句话生成 UI 设计  |
| Stitch SDK     | Agent 自动生成页面 |
| NotebookLM CLI | 自动生成播客/总结    |

---

## 关联概念

（待补充，编译时自动填充）
