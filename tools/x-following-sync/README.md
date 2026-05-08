# X Following Sync

把指定 X 账号的关注列表通过官方 API 拉到本地 `Obsidian-Template` 根目录。

## 需要

- `X_BEARER_TOKEN`
- `X_USER_ID` 或 `X_USERNAME`

## 用法

```bash
cd /Users/saaaaa/Obsidian-Template/tools/x-following-sync
X_BEARER_TOKEN=... X_USERNAME=your_handle node sync-following.mjs
```

也可以先 dry-run：

```bash
X_BEARER_TOKEN=... X_USERNAME=your_handle node sync-following.mjs --dry-run
```

## 输出

- Markdown 笔记：`/Users/saaaaa/Obsidian-Template/*.md`
- 原始 JSON：`/Users/saaaaa/Obsidian-Template/*.json`
