import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const files = [
  "/Users/saaaaa/Desktop/Chrome/PDF基因与S575差异表达合并结果.xlsx",
  "/Users/saaaaa/Desktop/Chrome/S575-de_vs_S575_annotation.xlsx",
];

for (const path of files) {
  console.log(`FILE\t${path}`);
  const input = await FileBlob.load(path);
  const workbook = await SpreadsheetFile.importXlsx(input);
  const summary = await workbook.inspect({
    kind: "workbook,sheet,table,region",
    maxChars: 9000,
    tableMaxRows: 8,
    tableMaxCols: 25,
    tableMaxCellChars: 120,
  });
  console.log(summary.ndjson);
  const sheet = workbook.worksheets.getItemAt(0);
  const used = sheet.getUsedRange(true);
  const values = used.values;
  console.log(`SHEET\t${sheet.name}\tROWS\t${values.length}\tCOLS\t${values[0]?.length ?? 0}`);
  console.log(`HEADERS\t${JSON.stringify(values[0] ?? [])}`);
  console.log(`ROW2\t${JSON.stringify(values[1] ?? [])}`);
}
