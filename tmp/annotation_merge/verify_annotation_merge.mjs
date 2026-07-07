import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const outputPath = "/Users/saaaaa/Obsidian-Template/outputs/20260707_annotation_merge/PDF基因与S575差异表达_annotation匹配合并结果.xlsx";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const stat = await fs.stat(outputPath);
assert(stat.size > 0, "输出文件为空");

const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(outputPath));
const matched = workbook.worksheets.getItem("Matched_only");
const all = workbook.worksheets.getItem("All_first_with_annotation");
const qc = workbook.worksheets.getItem("Merge_QC");

const matchedValues = matched.getUsedRange(true).values;
const allValues = all.getUsedRange(true).values;
const qcValues = qc.getUsedRange(true).values;

assert(matchedValues.length === 57, `Matched_only 行数错误: ${matchedValues.length}`);
assert(allValues.length === 125, `All_first_with_annotation 行数错误: ${allValues.length}`);
assert(matchedValues[0].length === 42, `Matched_only 列数错误: ${matchedValues[0].length}`);
assert(allValues[0].length === 42, `All_first_with_annotation 列数错误: ${allValues[0].length}`);

const headers = matchedValues[0];
const geneIdx = headers.indexOf("Gene");
const geneIdIdx = headers.indexOf("gene id");
const annotationGeneIdx = headers.indexOf("annotation_Gene");
const statusIdx = headers.indexOf("annotation_match_status");
const countIdx = headers.indexOf("annotation_match_count");
assert(geneIdx !== -1, "缺少 Gene 列");
assert(geneIdIdx !== -1, "缺少 gene id 列");
assert(annotationGeneIdx !== -1, "缺少 annotation_Gene 列");
assert(statusIdx !== -1, "缺少 annotation_match_status 列");
assert(countIdx !== -1, "缺少 annotation_match_count 列");

for (let i = 1; i < matchedValues.length; i++) {
  const row = matchedValues[i];
  assert(row[geneIdx] === row[geneIdIdx], `第 ${i + 1} 行 Gene 与 gene id 不一致`);
  assert(row[geneIdx] === row[annotationGeneIdx], `第 ${i + 1} 行 Gene 与 annotation_Gene 不一致`);
  assert(row[statusIdx] === "matched", `第 ${i + 1} 行状态不是 matched`);
  assert(row[countIdx] === 1, `第 ${i + 1} 行匹配数不是 1`);
}

const qcMap = new Map(qcValues.slice(1).map(([key, value]) => [key, value]));
assert(qcMap.get("Matched rows") === 56, `QC matched rows 错误: ${qcMap.get("Matched rows")}`);
assert(qcMap.get("Unmatched rows") === 68, `QC unmatched rows 错误: ${qcMap.get("Unmatched rows")}`);
assert(String(qcMap.get("Repeated genes in first")).includes("An18g05980(2)"), "QC 缺少重复基因 An18g05980");
assert(String(qcMap.get("Repeated genes in first")).includes("An16g04200(2)"), "QC 缺少重复基因 An16g04200");

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "verify exported formula error scan",
});
console.log(errors.ndjson);

console.log(JSON.stringify({
  outputPath,
  bytes: stat.size,
  sheets: ["Matched_only", "All_first_with_annotation", "Merge_QC"],
  matchedRows: matchedValues.length - 1,
  allFirstRows: allValues.length - 1,
  columns: matchedValues[0].length,
  unmatchedRows: qcMap.get("Unmatched rows"),
  firstMatchedGene: matchedValues[1][geneIdx],
  lastMatchedGene: matchedValues[matchedValues.length - 1][geneIdx],
}, null, 2));
