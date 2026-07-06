import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const dataPath =
  "/Users/saaaaa/Obsidian-Template/tmp/gene_merge/merged_data.json";
const outputDir =
  "/Users/saaaaa/Obsidian-Template/outputs/20260706_gene_pdf_xls_merge";
const outputPath = `${outputDir}/PDF基因与S575差异表达合并结果.xlsx`;
const previewPath = `${outputDir}/merged_preview.png`;

const payload = JSON.parse(await fs.readFile(dataPath, "utf8"));
const matrix = [payload.headers, ...payload.rows];
const rowCount = matrix.length;
const lastRow = rowCount;

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("Merged");
sheet.showGridLines = false;
sheet.getRangeByIndexes(0, 0, rowCount, payload.headers.length).values = matrix;

const usedRange = sheet.getRange(`A1:R${lastRow}`);
usedRange.format = {
  font: { name: "Arial", size: 10, color: "#172033" },
  verticalAlignment: "top",
};

const header = sheet.getRange("A1:R1");
header.format = {
  fill: "#1F4E78",
  font: { name: "Arial", size: 10, bold: true, color: "#FFFFFF" },
  verticalAlignment: "center",
  horizontalAlignment: "center",
  wrapText: true,
  rowHeight: 32,
  borders: {
    bottom: { style: "medium", color: "#163A5C" },
  },
};

sheet.getRange(`A2:A${lastRow}`).format.horizontalAlignment = "left";
sheet.getRange(`C2:D${lastRow}`).format.horizontalAlignment = "left";
sheet.getRange(`H2:H${lastRow}`).format.horizontalAlignment = "center";
sheet.getRange(`E2:G${lastRow}`).format.horizontalAlignment = "right";
sheet.getRange(`I2:N${lastRow}`).format.horizontalAlignment = "right";

sheet.getRange(`B2:B${lastRow}`).format.wrapText = true;
sheet.getRange(`P2:R${lastRow}`).format.wrapText = true;
sheet.getRange(`E2:E${lastRow}`).format.numberFormat = "0.000";
sheet.getRange(`F2:G${lastRow}`).format.numberFormat = "0.000E+00";
sheet.getRange(`I2:N${lastRow}`).format.numberFormat = "0.00";

const widths = {
  A: 15,
  B: 68,
  C: 12,
  D: 15,
  E: 15,
  F: 14,
  G: 14,
  H: 10,
  I: 16,
  J: 16,
  K: 16,
  L: 14,
  M: 14,
  N: 14,
  O: 16,
  P: 40,
  Q: 54,
  R: 54,
};
for (const [column, width] of Object.entries(widths)) {
  sheet.getRange(`${column}:${column}`).format.columnWidth = width;
}

sheet.getRange(`A2:R${lastRow}`).format.borders = {
  insideHorizontal: { style: "thin", color: "#D9E2F3" },
};

sheet.freezePanes.freezeRows(1);
const table = sheet.tables.add(`A1:R${lastRow}`, true, "MergedGeneTable");
table.style = "TableStyleMedium2";
table.showBandedRows = true;
table.showFilterButton = true;

await fs.mkdir(outputDir, { recursive: true });

const inspection = await workbook.inspect({
  kind: "table",
  range: "Merged!A1:R8",
  include: "values,formulas",
  tableMaxRows: 8,
  tableMaxCols: 18,
  maxChars: 10000,
});
console.log("INSPECT");
console.log(inspection.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "final formula error scan",
});
console.log("FORMULA_ERRORS");
console.log(errors.ndjson);

const preview = await workbook.render({
  sheetName: "Merged",
  range: "A1:R10",
  scale: 1,
  format: "png",
});
await fs.writeFile(
  previewPath,
  new Uint8Array(await preview.arrayBuffer()),
);

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

console.log(
  JSON.stringify(
    {
      outputPath,
      previewPath,
      rows: payload.rows.length,
      columns: payload.headers.length,
      diagnostics: payload.diagnostics,
    },
    null,
    2,
  ),
);
