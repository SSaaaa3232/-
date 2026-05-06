---
type: source
status: seed
created: 2026-05-06
updated: 2026-05-06
title: "微信收藏被加密锁死？我用frida逆向6轮迭代解密2000条数据，生成7种图表可视化报告"
source_type: note
source_path: "raw/团队team/技术/微信收藏被加密锁死？我用frida逆向6轮迭代解密2000条数据，生成7种图表可视化报告.md"
tags:
  - source
  - raw-ingest
  - ai-安全与权限边界
  - 技术基础设施与工程工具
related:
  - "[[AI 安全与权限边界]]"
  - "[[技术基础设施与工程工具]]"
---

# 微信收藏被加密锁死？我用frida逆向6轮迭代解密2000条数据，生成7种图表可视化报告

- Raw file: `raw/团队team/技术/微信收藏被加密锁死？我用frida逆向6轮迭代解密2000条数据，生成7种图表可视化报告.md`
- Ingested: 2026-05-06
- Related concepts: [[AI 安全与权限边界]], [[技术基础设施与工程工具]]

## Extractive Summary
- 微信收藏是很多人的数字仓库，十年积累下来几千条收藏，但这些数据被锁在加密数据库里，连导出都做不到。用 Claude Code 写了一个 Skill，从加密的微信 Mac 本地数据库端到端解密，最终生成一份包含 7 种图表的交互式可视化报告。光密钥提取这一步就迭代了 6 轮，踩了 8 个坑
- 微信 Mac 4.x 的收藏数据存在本地的 favorite.db 里，用的是 SQLCipher 4 加密。AES-256-CBC 加密，HMAC-SHA512 校验，PBKDF2 跑 256000 轮派生密钥。这套加密方案意味着即使拿到了数据库文件，没有密钥也完全打不开
- 更麻烦的是密钥不以明文存储在任何配置文件里。它在微信运行时由系统级函数 CCKeyDerivationPBKDF 动态派生，用完就留在内存里，不会写到磁盘上。想拿到密钥，只能在运行时拦截这个函数调用

## Source Structure
- 为什么微信收藏数据这么难拿
- 6 轮密钥提取迭代：从暴力扫描到精准 Hook
- 8 个关键踩坑点
- 可视化报告：7 种图表 + 交互浏览
- 做成 Claude Code Skill：一句话跑完全流程
- 技术选型和已知限制

## Ingest Notes
- 本页为批量 ingest 生成的 source seed：已入库、可检索、已进入相关概念簇。
- 若该来源是高价值长文/访谈，后续可单独运行 deep ingest，把关键论证拆成独立概念页。
