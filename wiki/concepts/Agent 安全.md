---
type: concept
title: "Agent 安全"
created: 2026-04-17
updated: 2026-04-17
tags:
  - concept
  - security
  - agent
status: mature
complexity: advanced
domain: AI/Agent设计
aliases:
  - "Agentic Security"
  - "Agent安全"
  - "最小代理权限"
related:
  - "[[Harness Engineering]]"
  - "[[多智能体协作五种模式]]"
sources:
  - "[[raw/团队team/方法论/The Shorthand Guide to Everything Agentic Security]]"
---

# Agent 安全

> 永远不要让便利层跑在隔离层前面。
> — @affaanmustafa

## 威胁模型

Prompt 注入不再是趣闻——在 Agentic 系统中可以变成 **shell 执行、密钥泄露、工作流滥用、横向移动**。

**Simon Willison 致命三要素**：私有数据 + 不可信内容 + 对外通信 = 真实数据泄露风险。三者同时存在于同一运行时，prompt 注入就从搞笑变成数据泄露。

## 攻击面

| 来源 | 示例 |
|------|------|
| 邮件附件 | PDF 嵌入 prompt，agent 读取即被指令化 |
| GitHub PR | 隐藏 diff 注释、issue 体、工具输出 |
| MCP 服务器 | 工具描述/schema/输出均可注入；OWASP MCP Top 10 |
| 内存文件 | 片段植入 → 休眠 → 后续拼装（AI 推荐投毒） |
| Skills/hooks | Snyk ToxicSkills：3984 个公开 skill 中 36% 含 prompt 注入 |

## 关键 CVE（2026年）

- **CVE-2025-59536**（CVSS 8.7）：Claude Code hook/预信任执行问题
- **CVE-2026-21852**：攻击者可覆盖 `ANTHROPIC_BASE_URL`，劫持 API 流量泄露密钥

只需克隆仓库并打开工具，即可触发。

## 防御原则

### 1. 沙箱隔离
- Agent 身份与个人账户分离（独立 Gmail/Slack/GitHub token）
- 不可信任务在容器/VM/devcontainer 中运行
- 默认禁止出站网络

```yaml
networks:
  agent-internal:
    internal: true  # 关键：禁止 agent 回拨
```

### 2. 最小代理权限（Least Agency）
只给任务真正需要的最小操作空间。需要人工审批的操作：
- 非沙箱 shell 命令
- 网络出站
- 密钥路径读取
- 仓库外写入
- 工作流/部署触发

### 3. 内容净化
一切 LLM 读取的内容都是可执行上下文，"数据"和"指令"无本质区别。
- 检查隐藏 Unicode（零宽字符、bidi 控制符）
- 附件先在隔离环境提取文本，再送给特权 agent
- 外部链接加安全护栏注释

### 4. 可观测性/日志
至少记录：工具名、输入摘要、触碰文件、审批决策、网络尝试、session ID。

### 5. 终止开关
```javascript
process.kill(-child.pid, "SIGKILL"); // 杀进程组，不只是父进程
```
未受监控的循环需要心跳机制：30 秒无心跳 → 自动终止。

### 6. 内存管理
- 不在内存文件中存储密钥
- 不可信运行后重置/轮换内存
- 高风险工作流禁用长期内存

## 最低合规清单

- [ ] 独立 agent 身份
- [ ] 短期作用域凭证
- [ ] 不可信工作跑在容器/VM
- [ ] 默认禁止出站网络
- [ ] 禁止读取密钥路径
- [ ] 净化附件/HTML/截图/外链
- [ ] 关键操作人工审批
- [ ] 记录工具调用和网络尝试
- [ ] 进程组终止 + 心跳死人开关
- [ ] 持久内存范围最小化
- [ ] 扫描 skills/hooks/MCP 配置如同扫描供应链

## 来源
(Source: [[raw/团队team/方法论/The Shorthand Guide to Everything Agentic Security]])，@affaanmustafa，2026-02-27
