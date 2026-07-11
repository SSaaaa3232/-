---
type: implementation-plan
status: ready
created: 2026-07-11
updated: 2026-07-11
tags:
  - anki
  - learning-system
  - skill-development
---

# Anki Vault Mirror Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build nine local Anki deck mirrors under the vault's `anki/` directory and create a reusable `anki` skill that turns approved learning material into candidate cards without importing them automatically.

**Architecture:** The Obsidian vault stores one directory per Anki deck, with identical project structure and card templates. The reusable skill discovers `anki/anki.md` in the active workspace, routes material into one deck, writes candidate cards into an existing or dated note, and only creates a TSV after explicit user confirmation. AnkiConnect write operations remain outside the first release.

**Tech Stack:** Markdown, Obsidian YAML/frontmatter, Python `unittest`, TSV, Codex skill conventions, existing `transcript` skill.

---

## File map

### Obsidian vault

- Modify: `/Users/saaaaa/Obsidian-Template/anki/anki.md` — preserve the user's rules and add links to the deck mirrors.
- Create: `/Users/saaaaa/Obsidian-Template/tests/test_anki_vault_mirror.py` — verify the nine decks, six templates, empty import areas, and unchanged task-list role.
- Create deck roots:
  - `/Users/saaaaa/Obsidian-Template/anki/网络安全/`
  - `/Users/saaaaa/Obsidian-Template/anki/AI/`
  - `/Users/saaaaa/Obsidian-Template/anki/投资/`
  - `/Users/saaaaa/Obsidian-Template/anki/英语/`
  - `/Users/saaaaa/Obsidian-Template/anki/政治/`
  - `/Users/saaaaa/Obsidian-Template/anki/人际交往/`
  - `/Users/saaaaa/Obsidian-Template/anki/无畏契约/`
  - `/Users/saaaaa/Obsidian-Template/anki/生物/`
  - `/Users/saaaaa/Obsidian-Template/anki/外在管理/`
- Create inside every deck root:
  - `README.md` — deck purpose and workflow.
  - `templates/concept.md` — concept-card schema.
  - `templates/judgment.md` — judgment-card schema.
  - `templates/error.md` — error-card schema.
  - `templates/cloze.md` — cloze-card schema.
  - `templates/image-occlusion.md` — image-occlusion schema.
  - `templates/steps.md` — ordered-process schema.
  - `notes/.gitkeep` — keep the empty notes directory.
  - `cards/.gitkeep` — keep the empty import directory without fabricating a TSV.

### Nezikk skill repository

- Create: `/Users/saaaaa/Desktop/Nezikk-s-skills/anki/SKILL.md` — trigger, boundaries, routing, workflow, and closure rules.
- Create: `/Users/saaaaa/Desktop/Nezikk-s-skills/anki/agents/openai.yaml` — display metadata and starter prompt.
- Create: `/Users/saaaaa/Desktop/Nezikk-s-skills/anki/references/workflow.md` — material-to-candidate-card workflow.
- Create: `/Users/saaaaa/Desktop/Nezikk-s-skills/anki/references/card-rules.md` — card selection and answer-button rules.
- Create: `/Users/saaaaa/Desktop/Nezikk-s-skills/anki/references/tsv-schema.md` — confirmed-export schema and escaping rules.
- Create: `/Users/saaaaa/Desktop/Nezikk-s-skills/anki/test-prompts.json` — representative text, image, video, revision, and export prompts.
- Create: `/Users/saaaaa/Desktop/Nezikk-s-skills/anki/training/athlete-log.jsonl` — empty append-only training log.
- Create: `/Users/saaaaa/Desktop/Nezikk-s-skills/tests/test_anki_skill.py` — contract tests.
- Modify: `/Users/saaaaa/Desktop/Nezikk-s-skills/README.md` — register and document the skill.
- Create symlinks through `/Users/saaaaa/Desktop/Nezikk-s-skills/nskill/scripts/link-skill.sh anki` — expose the canonical skill to Codex and Claude without duplicate copies.

## Task 1: Specify the vault mirror with a failing test

**Files:**

- Create: `/Users/saaaaa/Obsidian-Template/tests/test_anki_vault_mirror.py`

- [ ] **Step 1: Write the structural contract**

```python
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
ANKI_ROOT = ROOT / "anki"
DECKS = [
    "网络安全", "AI", "投资", "英语", "政治",
    "人际交往", "无畏契约", "生物", "外在管理",
]
TEMPLATES = [
    "concept.md", "judgment.md", "error.md",
    "cloze.md", "image-occlusion.md", "steps.md",
]


class AnkiVaultMirrorTests(unittest.TestCase):
    def test_each_default_deck_has_the_project_shape(self) -> None:
        for deck in DECKS:
            root = ANKI_ROOT / deck
            self.assertTrue((root / "README.md").is_file(), deck)
            self.assertTrue((root / "notes").is_dir(), deck)
            self.assertTrue((root / "cards").is_dir(), deck)
            for template in TEMPLATES:
                self.assertTrue((root / "templates" / template).is_file(), f"{deck}/{template}")

    def test_cards_start_without_unconfirmed_tsv_exports(self) -> None:
        for deck in DECKS:
            self.assertEqual([], list((ANKI_ROOT / deck / "cards").glob("*.tsv")), deck)

    def test_global_rules_preserve_user_control(self) -> None:
        rules = (ANKI_ROOT / "anki.md").read_text(encoding="utf-8")
        self.assertIn("修改，导入anki指挥权在我", rules)
        self.assertIn("不可擅自修改anki", rules)

    def test_task_list_is_context_not_card_material(self) -> None:
        for path in ANKI_ROOT.rglob("*.md"):
            if path.name == "anki.md":
                continue
            self.assertNotIn("task list.md 的内容作为制卡素材", path.read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run the test and verify it fails for missing decks**

Run:

```bash
python3 -m unittest tests/test_anki_vault_mirror.py -v
```

Expected: `test_each_default_deck_has_the_project_shape` fails because the deck directories do not exist yet; the global-rule test passes.

- [ ] **Step 3: Commit only the failing test**

```bash
git add tests/test_anki_vault_mirror.py
git commit -m "test: define Anki vault mirror contract"
```

## Task 2: Create the nine deck mirrors and six templates

**Files:**

- Create: the nine deck directory trees listed in the file map.
- Modify: `/Users/saaaaa/Obsidian-Template/anki/anki.md`

- [ ] **Step 1: Create all required directories**

For every deck in the exact `DECKS` list from Task 1, create `templates/`, `notes/`, and `cards/`. Add `.gitkeep` to `notes/` and `cards/` so empty directories remain tracked. Do not create a TSV.

- [ ] **Step 2: Add a concrete README to every deck**

Use the following identical content in each deck. The deck identity comes from its containing directory name, so the file does not need a placeholder:

```markdown
---
type: anki-deck
status: active
created: 2026-07-11
updated: 2026-07-11
tags:
  - anki
  - anki-deck
---

# 牌组说明

## 用途

这是当前目录所对应 Anki 牌组的本地镜像。这里只保存素材笔记、候选注意点卡、模板和经确认的导入文件。

## 工作流

1. 把文字、图片或视频素材整理到 `notes/` 中。
2. AI 在原笔记中生成候选粗卡。
3. 用户对照原素材筛选和修改。
4. AI 只在原文件中优化用户保留的卡片。
5. 用户明确确认后，才在 `cards/` 中生成唯一 TSV。
6. 用户自行决定是否导入 Anki。

## 制卡门槛

只记录以后必须主动召回的注意点，优先记录真实错题、卡壳点和混淆点。背景资料和可随时查询的信息留在笔记中，不强行制卡。
```

- [ ] **Step 3: Add the six concrete templates to every deck**

Each template starts with the common frontmatter below, with `card_type` set to its filename stem:

```markdown
---
type: anki-card-template
status: active
created: 2026-07-11
updated: 2026-07-11
tags:
  - anki
card_type: concept
---
```

Use these bodies:

```markdown
# 概念卡

## 正面
这个概念是什么？它与最容易混淆的概念有什么边界？

## 背面
- 最小定义：
- 关键边界：
- 一个例子：
- 来源：
```

```markdown
# 判断卡

## 正面
在这个具体条件下，结论是否成立？为什么？

## 背面
- 结论：成立 / 不成立
- 原因：
- 改变结论的条件：
- 来源：
```

```markdown
# 错误卡

## 正面
看到什么信号时，必须避免重复这个错误？

## 背面
- 错误动作：
- 错误原因：
- 识别信号：
- 下次动作：
- 错误来源：
```

```markdown
# 填空卡

## 原句
保留完整且语义自足的句子，只遮挡一个稳定、唯一的关键字段。

## Cloze
{{c1::需要主动召回的字段}}

## 来源

```

```markdown
# 图片遮挡卡

## 图片
![[附件文件名]]

## 遮挡目标
- 需要识别的位置或结构：
- 为什么必须记住：
- 容易混淆的位置：

## 来源

```

```markdown
# 步骤卡

## 正面
在什么触发条件下，必须按什么顺序完成这个流程？

## 背面
1. 
2. 
3. 

- 不能颠倒的原因：
- 失败后的检查点：
- 来源：
```

- [ ] **Step 4: Add a deck index to the end of `anki/anki.md`**

Append a `## 默认牌组镜像` section containing nine Obsidian links such as `[[网络安全/README|网络安全]]`. Do not rewrite or remove the user's existing rules.

- [ ] **Step 5: Run the vault contract**

Run:

```bash
python3 -m unittest tests/test_anki_vault_mirror.py -v
```

Expected: four tests pass; no `*.tsv` exists under any deck's `cards/` directory.

- [ ] **Step 6: Verify protected files were not touched**

Run:

```bash
git diff --name-only HEAD -- .obsidian '清单/task list.md'
```

Expected: no new changes created by this task. Pre-existing user changes remain unstaged and unmodified.

- [ ] **Step 7: Commit only the mirror files**

Stage `anki/` and `tests/test_anki_vault_mirror.py`; exclude `.obsidian/` and `清单/task list.md`.

## Task 3: Define the reusable skill contract with failing tests

**Files:**

- Create: `/Users/saaaaa/Desktop/Nezikk-s-skills/tests/test_anki_skill.py`

- [ ] **Step 1: Read the complete `nskill` creation references before editing**

Read `nskill/references/shared-foundations.md`, `scoring-rubric.md`, `gotchas.md`, `athlete-training-log.md`, `evolution-memory-schema.md`, `create.md`, `skill-skeleton.md`, `design-principles.md`, and `test-template.md`.

- [ ] **Step 2: Write contract tests**

The test must assert:

```python
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / "anki"


class AnkiSkillTests(unittest.TestCase):
    def test_required_files_exist(self) -> None:
        for relative in [
            "SKILL.md", "agents/openai.yaml", "references/workflow.md",
            "references/card-rules.md", "references/tsv-schema.md",
            "test-prompts.json", "training/athlete-log.jsonl",
        ]:
            self.assertTrue((SKILL / relative).is_file(), relative)

    def test_skill_preserves_user_control(self) -> None:
        text = (SKILL / "SKILL.md").read_text(encoding="utf-8")
        self.assertIn("name: anki", text)
        self.assertIn("/anki", text)
        self.assertIn("候选粗卡", text)
        self.assertIn("明确确认", text)
        self.assertIn("不得调用 AnkiConnect 写入", text)

    def test_video_routes_to_transcript_without_modifying_it(self) -> None:
        text = (SKILL / "references/workflow.md").read_text(encoding="utf-8")
        self.assertIn("transcript", text)
        self.assertIn("不修改", text)

    def test_revision_is_in_place(self) -> None:
        text = (SKILL / "references/workflow.md").read_text(encoding="utf-8")
        self.assertIn("原文件", text)
        self.assertIn("不另建", text)

    def test_tsv_requires_confirmation_and_has_a_schema(self) -> None:
        text = (SKILL / "references/tsv-schema.md").read_text(encoding="utf-8")
        self.assertIn("deck\tnote_type\tfront\tback\ttags\tsource", text)
        self.assertIn("确认生成导入文件", text)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 3: Run and verify the missing-skill failure**

Run from `/Users/saaaaa/Desktop/Nezikk-s-skills`:

```bash
python3 -m unittest tests/test_anki_skill.py -v
```

Expected: failures because `anki/` does not exist.

## Task 4: Implement the `anki` skill and register it

**Files:** all skill-repository paths listed in the file map.

- [ ] **Step 1: Create `SKILL.md` using the nskill skeleton**

The finished skill must include:

- YAML fields `name`, `description`, `allowed-tools`, and `model`.
- Trigger examples for `/anki`, text, image, video URL, local video, in-place revision, and confirmed TSV generation.
- Behavior底板, workflow, validation, Task Closure Protocol, and boundaries.
- Workspace discovery using `anki/anki.md`, without hard-coding the user's home directory.
- A visible deck-selection step when the user did not specify a deck.
- A hard stop before TSV export unless the current request explicitly confirms it.
- A hard prohibition on AnkiConnect writes in v1.

- [ ] **Step 2: Create focused references**

`workflow.md` defines the exact state transition:

```text
material_received -> deck_selected -> source_preserved -> candidates_written
-> user_edited -> candidates_optimized_in_place -> export_confirmed -> tsv_written
```

`card-rules.md` defines card admission priority as `真实错误 > 卡壳点 > 混淆点 > 稳定概念`, plus the Again/Hard/Good/Easy rules copied semantically from `anki/anki.md`.

`tsv-schema.md` defines one UTF-8 TSV per deck with this header:

```text
deck\tnote_type\tfront\tback\ttags\tsource
```

Tabs and newlines inside fields must be escaped as `\\t` and `\\n`; no TSV is written before the exact confirmation phrase `确认生成导入文件` or an unambiguous equivalent in the current request.

- [ ] **Step 3: Add metadata, prompts, and the empty training log**

`agents/openai.yaml` describes the skill as a candidate-card workflow, not an auto-importer. `test-prompts.json` contains at least five cases: plain text, image, video, in-place revision, and confirmed TSV export. Initialize `training/athlete-log.jsonl` as an empty file.

- [ ] **Step 4: Register the skill in README**

Add an `anki` row to the main skill table, a dedicated `### 🧠 anki` section, and `tests/test_anki_skill.py` to the test list. Preserve all unrelated current README edits.

- [ ] **Step 5: Link the canonical skill**

Run:

```bash
./nskill/scripts/link-skill.sh anki
```

Expected: `~/.codex/skills/anki` and `~/.claude/skills/anki` resolve to `/Users/saaaaa/Desktop/Nezikk-s-skills/anki`.

- [ ] **Step 6: Run focused tests**

```bash
python3 -m unittest tests/test_anki_skill.py -v
```

Expected: all tests pass.

- [ ] **Step 7: Commit only Anki skill files**

Because the skill repository already contains unrelated user changes, stage only `anki/`, `tests/test_anki_skill.py`, and the exact README hunks belonging to Anki. Do not stage or modify other skills.

## Task 5: Run repository and safety verification

**Files:** no new files unless a verified test requires a narrowly scoped correction.

- [ ] **Step 1: Run focused tests in both repositories**

```bash
cd /Users/saaaaa/Obsidian-Template
python3 -m unittest tests/test_anki_vault_mirror.py -v

cd /Users/saaaaa/Desktop/Nezikk-s-skills
python3 -m unittest tests/test_anki_skill.py -v
```

Expected: all focused tests pass.

- [ ] **Step 2: Run the Nezikk repository-wide test suite**

```bash
cd /Users/saaaaa/Desktop/Nezikk-s-skills
python3 -m unittest discover -s tests -p 'test_*.py'
```

Expected: all tests pass. If unrelated pre-existing tests fail, record their exact names and do not modify unrelated files.

- [ ] **Step 3: Verify no unconfirmed exports or Anki writes occurred**

```bash
find /Users/saaaaa/Obsidian-Template/anki -path '*/cards/*.tsv' -print
rg -n '127\.0\.0\.1:8765|AnkiConnect' /Users/saaaaa/Obsidian-Template/anki /Users/saaaaa/Desktop/Nezikk-s-skills/anki
```

Expected: the first command returns nothing. AnkiConnect may appear only in documentation that explicitly prohibits v1 writes or defers analysis.

- [ ] **Step 4: Verify protected workspace changes remain separate**

Check both `git status --short` outputs. Confirm `.obsidian/workspace.json`, `清单/task list.md`, and all unrelated changes in `Nezikk-s-skills` remain unstaged and retain their pre-task state.

- [ ] **Step 5: Perform the nskill closure checks**

Run the required create verification, self-evaluation, README registration check, symlink check, and 30-second AAR scan. Record only repeatable, costly, non-obvious findings that meet the nskill recording threshold.
