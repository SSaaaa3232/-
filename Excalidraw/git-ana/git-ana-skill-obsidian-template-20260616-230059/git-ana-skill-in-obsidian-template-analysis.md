# git-ana skill in Obsidian-Template

## One-line Summary

`git-ana` now works as a two-layer workflow in `Obsidian-Template`: it keeps the evidence-heavy Markdown analysis as the source of truth, then hands a compressed visual brief to `mindmap` so Obsidian gets an editable `.excalidraw.md` path diagram.

## Method Path

```text
Codex chat request
  -> git-ana skill contract
  -> evidence-backed report
  -> Phase 8 visual brief
  -> Excalidraw/git-ana/<slug>-<timestamp>/mindmap.json
  -> mindmap renderer with git-ana-path
  -> .excalidraw.md + .excalidraw + manifest.json
  -> Obsidian Excalidraw discussion and refinement
```

## Evidence Table

| # | Discovery | Evidence Anchor | Confidence |
|---|---|---|---|
| 1 | `git-ana` promises Markdown plus editable Obsidian Excalidraw output. | `/Users/saaaaa/Desktop/Nezikk-s-skills/git-ana/SKILL.md:10` | HIGH |
| 2 | The skill explicitly routes visual path diagrams into `/Users/saaaaa/Obsidian-Template/Excalidraw/git-ana/`. | `/Users/saaaaa/Desktop/Nezikk-s-skills/git-ana/SKILL.md:62-68` | HIGH |
| 3 | Phase 8 defines visual brief extraction, fresh folder creation, rendering, and artifact verification. | `/Users/saaaaa/Desktop/Nezikk-s-skills/git-ana/references/workflow.md:113-141` | HIGH |
| 4 | `mindmap.json` is the source of truth and supports `git-ana-path`. | `/Users/saaaaa/Desktop/Nezikk-s-skills/mindmap/references/schema.md:1-17` | HIGH |
| 5 | `git-ana-path` uses framed lanes, numbered route cards, arrows, and a right-side discussion lane. | `/Users/saaaaa/Desktop/Nezikk-s-skills/mindmap/references/layouts.md:32-48` | HIGH |
| 6 | The renderer writes raw `.excalidraw`, Obsidian `.excalidraw.md`, and `manifest.json`. | `/Users/saaaaa/Desktop/Nezikk-s-skills/mindmap/scripts/render_excalidraw.py:575-590` | HIGH |
| 7 | The vault convention keeps generated Excalidraw artifacts separate from manually classified `raw/` material. | `/Users/saaaaa/Obsidian-Template/AGENTS.md:88-94` | HIGH |

## Facts / Inferences / Unknowns

**FACTS**

- `git-ana` has a Phase 8 visual diagram step.
- `mindmap` owns the structured JSON-to-Excalidraw rendering path.
- The generated diagram belongs under `Excalidraw/git-ana/`, not under `raw/` or `.raw/`.

**INFERENCES**

- The practical working model is `git-ana = evidence and analysis`, `mindmap = editable visual rendering`.
- Future tuning should edit `mindmap.json` first, then rerender, because drawing-only edits can drift from the source structure.

**UNKNOWNS**

- Whether future `git-ana` diagrams should also be linked into `wiki/index.md`.
- Whether dense repo analyses need multiple visual lanes beyond the current main path plus discussion lane.

## Excalidraw Path Diagram

- JSON source: `/Users/saaaaa/Obsidian-Template/Excalidraw/git-ana/git-ana-skill-obsidian-template-20260616-230059/mindmap.json`
- Obsidian Excalidraw: `/Users/saaaaa/Obsidian-Template/Excalidraw/git-ana/git-ana-skill-obsidian-template-20260616-230059/git-ana-skill-in-obsidian-template.excalidraw.md`
- Raw Excalidraw: `/Users/saaaaa/Obsidian-Template/Excalidraw/git-ana/git-ana-skill-obsidian-template-20260616-230059/git-ana-skill-in-obsidian-template.excalidraw`
- Manifest: `/Users/saaaaa/Obsidian-Template/Excalidraw/git-ana/git-ana-skill-obsidian-template-20260616-230059/manifest.json`
