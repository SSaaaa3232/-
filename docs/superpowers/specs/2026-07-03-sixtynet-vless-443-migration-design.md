---
type: design
status: approved
created: 2026-07-03
updated: 2026-07-03
tags:
  - sixtynet
  - xray
  - vless
  - operations
---

# SixtyNet VLESS 迁移至 443

## 目标

修复 Shadowrocket 中 `Sixtynet` VLESS/REALITY 节点只能通过延迟测试、但访问 X 与 YouTube 时 TLS 握手被重置的问题。

成功标准：

- 客户端出口 IP 为 SixtyNet 公网 IP。
- `https://x.com/` 返回 HTTP 200。
- `https://www.youtube.com/` 返回 HTTP 200，`generate_204` 返回 HTTP 204。
- SSH、Hysteria2、Tailscale 及其他现有服务保持正常。
- Shadowrocket 最终恢复为用户原先选中的日本节点，但修复后的 SixtyNet 节点可随时正常切换。

## 现状与根因假设

- Xray、服务器出站、UFW 和客户端 REALITY 参数均正常。
- 完整客户端链路在 TLS 阶段失败。
- Xray 明确警告 REALITY 监听非 443 端口可能受到 GFW 干扰。
- 当前 VLESS 使用 `8443/TCP`，服务器 `443/TCP` 空闲。

假设：`8443/TCP` 上的 REALITY 流量受到链路干扰；迁移到标准 `443/TCP` 可恢复完整代理链路。

## 实施设计

1. 记录 RED 基线：SixtyNet VLESS 下 X、YouTube 均为 HTTP 000/TLS reset。
2. 备份 Xray 配置并验证现有配置。
3. 从现有配置派生临时 `443/TCP` 配置，启动独立 Xray 测试进程，同时保留生产 `8443/TCP`。
4. 临时放行 UFW `443/TCP`。
5. 将 Shadowrocket 的 SixtyNet 端口临时改为 443，执行端到端测试。
6. 若测试通过，将生产配置端口改为 443，验证配置后重启 Xray；确认服务与端到端测试通过，再移除旧的 8443 防火墙规则。
7. 若测试失败，恢复客户端 8443、停止临时进程并撤销 443 防火墙规则，不触碰生产服务。

## 安全与回滚

- 不更改 UUID、REALITY 密钥、Short ID、SNI 或 Hysteria2 配置。
- 修改前保留带时间戳的服务器配置备份。
- 每次只改变端口这一项。
- 任一步验证失败立即停止并回滚到 8443。
- 不关闭当前 SSH 会话依赖的 22/TCP。

## 验证

- `xray run -test` 验证配置语法。
- `ss` 和 `systemctl` 验证监听与服务状态。
- UFW 验证 443 放行、8443 最终撤销。
- Shadowrocket 下实际请求 X、YouTube、YouTube 204 与出口 IP。
- 最终检查 Xray、Hysteria2、SSH、Tailscale 服务状态及近期严重日志。
