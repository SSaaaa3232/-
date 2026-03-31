---
tags:
---
![[Claude code源码解析 2026-03-31 20.24.55.excalidraw]]

---
# harness

## 缘由

- 他们在更新Claude Code的npm包时，不小心把一个60MB的source map调试文件留在了发布包里。这个文件本来应该在打包时排除掉，结果没有。任何人都可以用它还原出Claude Code完整的TypeScript源码。1902个源文件，全部暴露。

## 问题

- 这AI怎么就这么好用
- 背后到底是怎么实现的？

## system prompt

- 拼装
- ![[Claude code源码解析 2026-03-31 20.34.53.excalidraw]]

![Image](https://pbs.twimg.com/media/HEvJTZvW0AAty9x?format=jpg&name=medium)


## 权限系统

- AI作安全审查
- 四层
## 记忆系统

- 只记偏好不记代码
## 上下文压缩

- 9段式结构化
## 协作框架

- 真实公司运转
- 多agent协作