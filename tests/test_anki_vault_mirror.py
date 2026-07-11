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

TEMPLATE_MARKERS = {
    "concept.md": (
        "## 正面",
        "这个概念是什么？它与最容易混淆的概念有什么边界？",
        "- 最小定义：",
        "- 关键边界：",
        "- 一个例子：",
        "- 来源：",
    ),
    "judgment.md": (
        "## 正面",
        "在这个具体条件下，结论成立还是不成立？",
        "- 结论：成立 / 不成立",
        "- 原因：",
        "- 改变结论的条件：",
        "- 来源：",
    ),
    "error.md": (
        "## 正面",
        "看到什么识别信号时，我应该避免哪种错误动作？",
        "- 错误动作：",
        "- 错误原因：",
        "- 识别信号：",
        "- 下次动作：",
        "- 错误来源：",
    ),
    "cloze.md": (
        "## 原句",
        "写成语义独立的完整句子，只保留一个稳定且唯一的主动召回字段。",
        "## Cloze",
        "{{c1::需要主动召回的字段}}",
        "## 来源",
    ),
    "image-occlusion.md": (
        "## 图片",
        "![[附件文件名]]",
        "## 遮挡目标",
        "- 需要识别的位置或结构：",
        "- 为什么必须记住：",
        "- 容易混淆的位置：",
        "## 来源",
    ),
    "steps.md": (
        "## 正面",
        "在什么触发条件下，必须按什么顺序执行？",
        "1.",
        "2.",
        "3.",
        "- 不能颠倒的原因：",
        "- 失败后的检查点：",
        "- 来源：",
    ),
}


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

    def test_every_template_contains_its_approved_semantic_markers(self):
        for deck_name in DECKS:
            for template_name, markers in TEMPLATE_MARKERS.items():
                template = ANKI_ROOT / deck_name / "templates" / template_name
                content = template.read_text(encoding="utf-8")
                with self.subTest(deck=deck_name, template=template_name):
                    for marker in markers:
                        self.assertIn(marker, content)


if __name__ == "__main__":
    unittest.main()
