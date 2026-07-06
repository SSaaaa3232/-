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

## [ERR-20260706-003] bundled-pdftoppm-wrapper

**Logged**: 2026-07-06T00:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: config

### Summary
The bundled `pdftoppm` wrapper returned no page images for a valid PDF.

### Error
```
zsh:1: no matches found: tmp/pdfs/page-*.png
```

### Context
- Operation: render the five-page source PDF for visual verification.
- `/opt/homebrew/bin/pdftoppm` rendered all five pages successfully with the same arguments.

### Suggested Fix
Use the system Poppler binary when the bundled wrapper produces no output, and verify generated files with `find`.

### Metadata
- Reproducible: unknown
- Related Files: /Users/saaaaa/Desktop/Chrome/41587_2007_BFnbt1282_MOESM37_ESM.pdf

### Resolution
- **Resolved**: 2026-07-06T00:00:00+08:00
- **Notes**: System `pdftoppm` generated five PNG pages.
---

## [ERR-20260706-002] bundled-pdftotext-path

**Logged**: 2026-07-06T00:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: config

### Summary
The bundled native-binary directory exposes `pdfinfo` and `pdftoppm` but not `pdftotext`.

### Error
```
zsh:1: no such file or directory: /Users/saaaaa/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/pdftotext
```

### Context
- Operation: extract a five-page PDF table with layout-preserving text.
- The system Homebrew installation provides `/opt/homebrew/bin/pdftotext`.

### Suggested Fix
Check the actual binary list or `command -v pdftotext` before assuming all Poppler tools share the bundled path.

### Metadata
- Reproducible: yes
- Related Files: /Users/saaaaa/Desktop/Chrome/41587_2007_BFnbt1282_MOESM37_ESM.pdf

### Resolution
- **Resolved**: 2026-07-06T00:00:00+08:00
- **Notes**: Switched to the available Homebrew `pdftotext` command.
---

## [ERR-20260706-001] spreadsheet-skill-reference-path

**Logged**: 2026-07-06T00:00:00+08:00
**Priority**: low
**Status**: resolved
**Area**: docs

### Summary
Spreadsheet skill companion files were looked up one directory above their actual location.

### Error
```
sed: /Users/saaaaa/.codex/plugins/cache/openai-primary-runtime/spreadsheets/26.630.12135/skills/style_guidelines.md: No such file or directory
```

### Context
- Operation: load the required spreadsheet style, API, and scientific-research guidance.
- The spreadsheet `SKILL.md` refers to companion files relative to its own nested `skills/spreadsheets/` directory.

### Suggested Fix
Resolve companion paths relative to the selected `SKILL.md` file before opening them.

### Metadata
- Reproducible: yes
- Related Files: /Users/saaaaa/.codex/plugins/cache/openai-primary-runtime/spreadsheets/26.630.12135/skills/spreadsheets/SKILL.md

### Resolution
- **Resolved**: 2026-07-06T00:00:00+08:00
- **Notes**: Located the files under `skills/spreadsheets/` and continued from the corrected paths.
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
