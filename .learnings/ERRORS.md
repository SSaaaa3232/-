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

## [ERR-20260704-004] Node REPL verification state

**Logged**: 2026-07-04T20:20:00+08:00
**Priority**: low
**Status**: resolved
**Area**: config

### Summary
A final verification call referenced a temporary Node REPL binding that was no longer available.

### Error
```
fsP is not defined
```

### Context
- Operation: read the generated Markdown file and compare its titles with the previous 20-paper list.
- The persistent REPL had discarded or reset an earlier filesystem-module binding.

### Suggested Fix
Import required built-in modules inside verification calls rather than relying on old REPL bindings.

### Metadata
- Reproducible: unknown
- Related Files: wiki/resources/AI and Synthetic Biology Papers 2024-2026 - Additional 80.md

### Resolution
- **Resolved**: 2026-07-04T20:20:00+08:00
- **Notes**: Verification was rerun with a fresh filesystem import.
---

## [ERR-20260704-003] Crossref rate limit

**Logged**: 2026-07-04T20:05:00+08:00
**Priority**: low
**Status**: resolved
**Area**: config

### Summary
Parallel Crossref candidate-pool requests triggered HTTP 429 rate limiting.

### Error
```
Crossref 429
```

### Context
- Operation: query multiple AI/synthetic-biology topics for DOI prefixes `10.1038` and `10.1126`.
- Four requests were sent concurrently.

### Suggested Fix
Use Crossref's polite pool with a `mailto` parameter and issue requests sequentially with a short delay.

### Metadata
- Reproducible: yes
- Related Files: none

### Resolution
- **Resolved**: 2026-07-04T20:05:00+08:00
- **Notes**: Switched to sequential throttled requests.
---

## [ERR-20260704-002] Crossref works API

**Logged**: 2026-07-04T20:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: config

### Summary
The Crossref works API returned HTTP 400 for an unsupported `select` field combination.

### Error
```
Crossref 400
```

### Context
- Operation: build a 2024–2026 Cell/Nature/Science candidate pool.
- Request included `abstract` and `subtype` in the `select` parameter.

### Suggested Fix
Omit `select`, or restrict it to fields explicitly supported by the Crossref works endpoint.

### Metadata
- Reproducible: yes
- Related Files: none

### Resolution
- **Resolved**: 2026-07-04T20:00:00+08:00
- **Notes**: Candidate-pool requests were rerun without `select`.
---
