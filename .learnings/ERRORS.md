## [ERR-20260704-001] research_mcp.search_bundle

**Logged**: 2026-07-04T00:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: config

### Summary
The research search API rejected `maxResults: 25`; its maximum is 20.

### Error
```
Invalid arguments: maxResults must be less than or equal to 20.
```

### Context
- Operation: search official Cell Press papers about AI and synthetic biology.
- Parameters: `maxResults: 25`.

### Suggested Fix
Use `maxResults: 20` and split broad searches into multiple focused queries when more coverage is needed.

### Metadata
- Reproducible: yes
- Related Files: none

### Resolution
- **Resolved**: 2026-07-04T00:00:00+08:00
- **Notes**: Subsequent searches use the supported maximum of 20.
---
