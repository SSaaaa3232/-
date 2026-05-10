---
title: reverse Skill 完整工作流程
source: /Users/saaaaa/Desktop/Nezikk-s-skills/reverse/SKILL.md
fetched_at: 2026-05-10T18:00:00Z
type: raw
---

# reverse Skill 完整工作流程

## Phase 1.0: CDP 快速认证收集（NEW）

需要登录态的站点，在下载 JS 之前先用 CDP 抓 Cookie。

三层回退：
1. Tier 1: 读本地缓存 cookies.json → 验证 Session 有效 → 直接返回
2. Tier 2: 扫描已有 Chrome 调试端口 → CDP WebSocket 连接 → Network.getCookies → 轮询直到有效
3. Tier 3: 启动新 Chrome → 打开登录页 → 用户手动登录 → 轮询 Network.getCookies → 写入缓存

## Phase 1.1: 信息收集 & 防护等级评估

1. 获取目标 URL / HAR 文件
2. WebFetch 页面，记录 JS chunk URL 和 API 端点
3. 下载关键 JS chunk 并按用途分类（frm-/lib-/page-/biz-）
4. 评估防护等级 T0-T3
5. 观察登录页 JS，确定 auth type，调整搜索关键词
6. 对 HAR 中每个请求：描述 URL pattern / body / auth / 签名 → 匹配指纹库
7. 无匹配则用通用识别方法论自定义

## Phase 2: 核心发现提取

1. 按 search-strategy.md 搜索源码
2. 每个发现记录：discovery + evidence anchor + confidence (HIGH/MEDIUM/LOW)
3. 分类 auth type，提取对应核心发现：依赖、auth payload、硬编码密钥、session 持久化
4. 使用 FACTS/INFERENCES/UNKNOWNS 框架

## Phase 3: 调用链复现

1. 还原每个关键流的完整 HTTP 交互序列
2. 每步格式：METHOD /path + Headers + Body + Response（标注 token/cookie）
3. ACSII 箭头标注请求间数据流
4. 解码所有 token/session：结构、算法、格式

## Phase 4: PoC 重放测试

不等待 Phase 3，Phase 2 有核心发现即可开始。

- Layer 0: Bypass 测试（先发无效/缺失 auth，验证服务器是否校验）
- Layer 1: 单账号完整流程端到端验证
- Layer 2: 账号池轮换（per-account 限速时）
- Layer 3: 代理池轮换（IP 限速时）

## Phase 5: 报告

1. Reverse Report（9 章节）
2. Premium Bypass Report（如发现付费/内容门控）

## Phase 6: 批量自动化

三代演进，不可跳代：
- Gen 1: 单线程单账号，零配置
- Gen 2: 账号池轮换
- Gen 3: 账号 + 代理池轮换

按 auth type 适配：密码/Wallet/SMS/Token
