import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const firstPath = "/Users/saaaaa/Desktop/Chrome/PDF基因与S575差异表达合并结果.xlsx";
const secondPath = "/Users/saaaaa/Desktop/Chrome/S575-de_vs_S575_annotation.xlsx";
const outputDir = "/Users/saaaaa/Obsidian-Template/outputs/20260707_annotation_merge";
const outputPath = `${outputDir}/PDF基因与S575差异表达_annotation匹配合并结果.xlsx`;
const previewPath = `${outputDir}/annotation_merge_preview.png`;

function normalizeGene(value) {
  return String(value ?? "").trim();
}

function columnLetter(indexOneBased) {
  let n = indexOneBased;
  let s = "";
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

function getFirstSheetValues(workbook) {
  const sheet = workbook.worksheets.getItemAt(0);
  const used = sheet.getUsedRange(true);
  return { sheetName: sheet.name, values: used.values };
}

function findHeader(headers, candidates) {
  const normalized = headers.map((h) => String(h ?? "").trim().toLowerCase());
  for (const candidate of candidates) {
    const idx = normalized.indexOf(candidate.toLowerCase());
    if (idx !== -1) return idx;
  }
  throw new Error(`未找到列: ${candidates.join(" / ")}`);
}

const firstWb = await SpreadsheetFile.importXlsx(await FileBlob.load(firstPath));
const secondWb = await SpreadsheetFile.importXlsx(await FileBlob.load(secondPath));
const first = getFirstSheetValues(firstWb);
const second = getFirstSheetValues(secondWb);

const firstHeaders = first.values[0];
const secondHeaders = second.values[0];
const firstRows = first.values.slice(1);
const secondRows = second.values.slice(1);
const firstGeneIdx = findHeader(firstHeaders, ["Gene", "gene id"]);
const secondGeneIdx = findHeader(secondHeaders, ["Gene", "gene id"]);

const annotationByGene = new Map();
for (const row of secondRows) {
  const gene = normalizeGene(row[secondGeneIdx]);
  if (!gene) continue;
  if (!annotationByGene.has(gene)) annotationByGene.set(gene, []);
  annotationByGene.get(gene).push(row);
}

const mergedHeaders = [
  ...firstHeaders.map((h) => String(h ?? "")),
  ...secondHeaders.map((h) => `annotation_${String(h ?? "")}`),
  "annotation_match_status",
  "annotation_match_count",
];

const mergedRows = [];
const matchedRows = [];
const unmatched = [];
const duplicateAnnotationMatches = new Map();
for (const firstRow of firstRows) {
  const gene = normalizeGene(firstRow[firstGeneIdx]);
  const matches = annotationByGene.get(gene) ?? [];
  if (matches.length === 0) {
    unmatched.push(gene);
    mergedRows.push([
      ...firstRow,
      ...Array(secondHeaders.length).fill(null),
      "unmatched",
      0,
    ]);
  } else {
    if (matches.length > 1) duplicateAnnotationMatches.set(gene, matches.length);
    const annotationRow = matches[0];
    const mergedRow = [
      ...firstRow,
      ...annotationRow,
      matches.length === 1 ? "matched" : "matched_first_of_multiple",
      matches.length,
    ];
    mergedRows.push(mergedRow);
    matchedRows.push(mergedRow);
  }
}

const firstGeneCounts = new Map();
for (const row of firstRows) {
  const gene = normalizeGene(row[firstGeneIdx]);
  firstGeneCounts.set(gene, (firstGeneCounts.get(gene) ?? 0) + 1);
}
const repeatedFirstGenes = [...firstGeneCounts.entries()].filter(([, count]) => count > 1);

const workbook = Workbook.create();
const matchedSheet = workbook.worksheets.add("Matched_only");
const mergedSheet = workbook.worksheets.add("All_first_with_annotation");
const summarySheet = workbook.worksheets.add("Merge_QC");
matchedSheet.showGridLines = false;
mergedSheet.showGridLines = false;
summarySheet.showGridLines = false;

const colCount = mergedHeaders.length;
const lastCol = columnLetter(colCount);

const firstAnnotationCol = firstHeaders.length + 1;
const firstAnnotationLetter = columnLetter(firstAnnotationCol);
const lastAnnotationLetter = columnLetter(firstHeaders.length + secondHeaders.length);

const statusColLetter = columnLetter(colCount - 1);
const countColLetter = columnLetter(colCount);

function writeMergedSheet(sheet, bodyRows) {
  const allRows = [mergedHeaders, ...bodyRows];
  const rowCount = allRows.length;
  sheet.getRange(`A1:${lastCol}${rowCount}`).values = allRows;

  const header = sheet.getRange(`A1:${lastCol}1`);
  header.format.fill = { color: "#1F4E78" };
  header.format.font = { color: "#FFFFFF", bold: true };
  header.format.wrapText = true;
  header.format.borders = { preset: "bottom", style: "medium", color: "#B7C9D6" };

  const dataRange = sheet.getRange(`A1:${lastCol}${rowCount}`);
  dataRange.format.borders = {
    insideHorizontal: { style: "thin", color: "#E6EEF3" },
    insideVertical: { style: "thin", color: "#E6EEF3" },
    bottom: { style: "thin", color: "#B7C9D6" },
  };
  sheet.freezePanes.freezeRows(1);
  sheet.freezePanes.freezeColumns(3);

  const annotationHeader = sheet.getRange(`${firstAnnotationLetter}1:${lastAnnotationLetter}1`);
  annotationHeader.format.fill = { color: "#548235" };
  annotationHeader.format.font = { color: "#FFFFFF", bold: true };
  sheet.getRange(`${statusColLetter}1:${countColLetter}1`).format.fill = { color: "#7F6000" };
  sheet.getRange(`${statusColLetter}1:${countColLetter}${rowCount}`).format.wrapText = false;

  // Widths: keep identifier/sample columns compact and long annotation text readable.
  sheet.getRange("A:A").format.columnWidth = 14;
  sheet.getRange("B:B").format.columnWidth = 56;
  sheet.getRange("C:D").format.columnWidth = 14;
  sheet.getRange("E:N").format.columnWidth = 13;
  sheet.getRange("O:P").format.columnWidth = 24;
  sheet.getRange("Q:R").format.columnWidth = 36;
  sheet.getRange(`${firstAnnotationLetter}:${lastAnnotationLetter}`).format.columnWidth = 18;
  for (const headerName of ["annotation_Description", "annotation_Biological process", "annotation_Cellular component", "annotation_Molecular function", "annotation_KEGG_Pathways", "annotation_IPRs"]) {
    const idx = mergedHeaders.indexOf(headerName);
    if (idx !== -1) sheet.getRange(`${columnLetter(idx + 1)}:${columnLetter(idx + 1)}`).format.columnWidth = 42;
  }
  sheet.getRange(`A1:${lastCol}${rowCount}`).format.wrapText = true;
  if (rowCount > 1) sheet.getRange(`A2:${lastCol}${rowCount}`).format.rowHeight = 42;

  // Numeric formatting for key differential/annotation quantitative columns.
  for (const name of ["log2FoldChange", "pValue", "qValue", "annotation_FC", "annotation_P-value", "annotation_FDR"]) {
    const idx = mergedHeaders.indexOf(name);
    if (idx !== -1 && rowCount > 1) sheet.getRange(`${columnLetter(idx + 1)}2:${columnLetter(idx + 1)}${rowCount}`).format.numberFormat = [["0.0000"]];
  }
  for (const name of ["TPM (S575-de-1)", "TPM (S575-de-2)", "TPM (S575-de-3)", "TPM (S575-1)", "TPM (S575-2)", "TPM (S575-3)", "annotation_S575-1", "annotation_S575-2", "annotation_S575-3", "annotation_S575-de-1", "annotation_S575-de-2", "annotation_S575-de-3"]) {
    const idx = mergedHeaders.indexOf(name);
    if (idx !== -1 && rowCount > 1) sheet.getRange(`${columnLetter(idx + 1)}2:${columnLetter(idx + 1)}${rowCount}`).format.numberFormat = [["0.00"]];
  }
}

writeMergedSheet(matchedSheet, matchedRows);
writeMergedSheet(mergedSheet, mergedRows);

const summaryRows = [
  ["Item", "Value"],
  ["First workbook", firstPath],
  ["Second workbook", secondPath],
  ["First sheet", first.sheetName],
  ["Second sheet", second.sheetName],
  ["First data rows", firstRows.length],
  ["Second data rows", secondRows.length],
  ["Matched-only data rows", matchedRows.length],
  ["All-first merged data rows", mergedRows.length],
  ["Matched rows", matchedRows.length],
  ["Unmatched rows", unmatched.length],
  ["Unique genes in first", firstGeneCounts.size],
  ["Repeated genes in first", repeatedFirstGenes.map(([gene, count]) => `${gene}(${count})`).join(", ") || "-"],
  ["Annotation duplicate genes used as first match", [...duplicateAnnotationMatches.entries()].map(([gene, count]) => `${gene}(${count})`).join(", ") || "-"],
  ["Unmatched genes", unmatched.join(", ") || "-"],
];
summarySheet.getRange(`A1:B${summaryRows.length}`).values = summaryRows;
summarySheet.getRange("A1:B1").format.fill = { color: "#1F4E78" };
summarySheet.getRange("A1:B1").format.font = { color: "#FFFFFF", bold: true };
summarySheet.getRange(`A1:B${summaryRows.length}`).format.borders = { preset: "all", style: "thin", color: "#D9E2F3" };
summarySheet.getRange("A:A").format.columnWidth = 36;
summarySheet.getRange("B:B").format.columnWidth = 100;
summarySheet.getRange(`A1:B${summaryRows.length}`).format.wrapText = true;
summarySheet.freezePanes.freezeRows(1);

await fs.mkdir(outputDir, { recursive: true });

const inspect = await workbook.inspect({
  kind: "table,region",
  range: `Matched_only!A1:${lastCol}8`,
  tableMaxRows: 8,
  tableMaxCols: 16,
  tableMaxCellChars: 100,
  maxChars: 6000,
});
console.log(inspect.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "final formula error scan",
});
console.log(errors.ndjson);

const preview = await workbook.render({
  sheetName: "Matched_only",
  range: `A1:${lastCol}20`,
  scale: 1,
  format: "png",
});
await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));

const exported = await SpreadsheetFile.exportXlsx(workbook);
await exported.save(outputPath);

console.log(JSON.stringify({
  outputPath,
  previewPath,
  matchedRows: matchedRows.length,
  allFirstRows: mergedRows.length,
  columns: colCount,
  firstRows: firstRows.length,
  secondRows: secondRows.length,
  matched: mergedRows.length - unmatched.length,
  unmatched,
  repeatedFirstGenes,
  duplicateAnnotationMatches: [...duplicateAnnotationMatches.entries()],
}, null, 2));
