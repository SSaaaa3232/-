import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ANKI_ROOT = ROOT / "anki"
DECKS = (
    "网络安全",
    "AI",
    "投资",
    "英语",
    "政治",
    "人际交往",
    "无畏契约",
    "生物",
    "外在管理",
)
TEMPLATES = (
    "concept.md",
    "judgment.md",
    "error.md",
    "cloze.md",
    "image-occlusion.md",
    "steps.md",
)


class AnkiVaultMirrorContractTest(unittest.TestCase):
    def test_every_deck_has_the_required_empty_structure(self):
        for deck_name in DECKS:
            with self.subTest(deck=deck_name):
                deck = ANKI_ROOT / deck_name
                self.assertTrue((deck / "README.md").is_file())
                self.assertTrue((deck / "notes").is_dir())
                self.assertTrue((deck / "cards").is_dir())
                self.assertTrue((deck / "notes" / ".gitkeep").is_file())
                self.assertTrue((deck / "cards" / ".gitkeep").is_file())

                for template_name in TEMPLATES:
                    self.assertTrue(
                        (deck / "templates" / template_name).is_file(),
                        f"{deck_name} is missing template {template_name}",
                    )

                self.assertEqual(
                    [],
                    list((deck / "cards").glob("*.tsv")),
                    f"{deck_name}/cards must not contain TSV exports initially",
                )

    def test_global_rules_preserve_user_authority_and_exclude_task_list(self):
        rules = (ANKI_ROOT / "anki.md").read_text(encoding="utf-8")
        self.assertIn("修改，导入anki指挥权在我", rules)
        self.assertIn("不可擅自修改anki", rules)

        task_list = ROOT / "清单" / "task list.md"
        self.assertTrue(task_list.is_file(), "schedule context must remain in its source location")
        self.assertEqual(
            [],
            list(ANKI_ROOT.rglob("task list.md")),
            "the source task list must not be copied into the Anki mirror",
        )

        forbidden_directive = "task list.md 的内容作为制卡素材"
        global_rules = ANKI_ROOT / "anki.md"
        for markdown_file in ANKI_ROOT.rglob("*.md"):
            if markdown_file == global_rules:
                continue
            with self.subTest(card_material=markdown_file.relative_to(ROOT)):
                self.assertNotIn(
                    forbidden_directive,
                    markdown_file.read_text(encoding="utf-8"),
                    f"{markdown_file.relative_to(ROOT)} incorrectly treats task list.md as card material",
                )


if __name__ == "__main__":
    unittest.main()
