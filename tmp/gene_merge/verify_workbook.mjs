import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const dataPath =
  "/Users/saaaaa/Obsidian-Template/tmp/gene_merge/merged_data.json";
const workbookPath =
  "/Users/saaaaa/Obsidian-Template/outputs/20260706_gene_pdf_xls_merge/PDF基因与S575差异表达合并结果.xlsx";
const roundtripPreviewPath =
  "/Users/saaaaa/Obsidian-Template/outputs/20260706_gene_pdf_xls_merge/merged_roundtrip_preview.png";

const expected = JSON.parse(await fs.readFile(dataPath, "utf8"));
const input = await FileBlob.load(workbookPath);
const workbook = await SpreadsheetFile.importXlsx(input);
const sheet = workbook.worksheets.getItem("Merged");
const values = sheet.getUsedRange(true).values;

const assertions = [];
function check(name, condition, details) {
  assertions.push({ name, passed: Boolean(condition), details });
  if (!condition) {
    throw new Error(`${name}: ${JSON.stringify(details)}`);
  }
}

check("sheet_name", sheet.name === "Merged", { actual: sheet.name });
check("row_count", values.length === 125, {
  actual: values.length,
  expected: 125,
});
check("column_count", values[0].length === 18, {
  actual: values[0].length,
  expected: 18,
});
check(
  "headers",
  JSON.stringify(values[0]) === JSON.stringify(expected.headers),
  { actual: values[0] },
);
check(
  "first_row",
  JSON.stringify(values[1]) === JSON.stringify(expected.rows[0]),
  { gene: values[1][0] },
);
check(
  "last_row",
  JSON.stringify(values.at(-1)) === JSON.stringify(expected.rows.at(-1)),
  { gene: values.at(-1)[0] },
);
check(
  "all_rows_matched",
  values.slice(1).every((row) => row[0] === row[3]),
  { comparedColumns: "A and D" },
);

const geneCounts = new Map();
for (const row of values.slice(1)) {
  geneCounts.set(row[0], (geneCounts.get(row[0]) ?? 0) + 1);
}
const duplicates = [...geneCounts.entries()]
  .filter(([, count]) => count > 1)
  .sort(([a], [b]) => a.localeCompare(b));
check("unique_gene_count", geneCounts.size === 122, {
  actual: geneCounts.size,
  expected: 122,
});
check(
  "intentional_pdf_duplicates",
  JSON.stringify(duplicates) ===
    JSON.stringify([
      ["An16g04200", 2],
      ["An18g05980", 2],
    ]),
  { duplicates },
);

const formulaErrors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "round-trip formula error scan",
});
check("formula_error_scan", formulaErrors.ndjson.includes("matched 0 entries"), {
  result: formulaErrors.ndjson,
});

const preview = await workbook.render({
  sheetName: "Merged",
  range: "A1:R4",
  scale: 1,
  format: "png",
});
await fs.writeFile(
  roundtripPreviewPath,
  new Uint8Array(await preview.arrayBuffer()),
);

const stat = await fs.stat(workbookPath);
check("output_file_nonempty", stat.size > 0, { bytes: stat.size });

console.log(
  JSON.stringify(
    {
      workbookPath,
      fileBytes: stat.size,
      assertions,
      diagnostics: expected.diagnostics,
      roundtripPreviewPath,
    },
    null,
    2,
  ),
);
