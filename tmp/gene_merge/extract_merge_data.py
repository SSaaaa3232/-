import csv
import json
import re
from pathlib import Path

import pdfplumber


PDF_PATH = Path("/Users/saaaaa/Desktop/Chrome/41587_2007_BFnbt1282_MOESM37_ESM.pdf")
XLS_PATH = Path("/Users/saaaaa/Desktop/Chrome/S575-de_vs_S575.gene_DE.addAnno.xls")
OUTPUT_PATH = Path("/Users/saaaaa/Obsidian-Template/tmp/gene_merge/merged_data.json")

GENE_PATTERN = re.compile(r"^An\d{2}g\d{5}$")
NUMERIC_COLUMNS = {
    "log2FoldChange",
    "pValue",
    "qValue",
    "TPM (S575-de-1)",
    "TPM (S575-de-2)",
    "TPM (S575-de-3)",
    "TPM (S575-1)",
    "TPM (S575-2)",
    "TPM (S575-3)",
}


def clean_cell(value):
    if value is None:
        return ""
    return re.sub(r"\s+", " ", str(value)).strip()


def extract_pdf_rows():
    records = []
    with pdfplumber.open(PDF_PATH) as pdf:
        for page_number, page in enumerate(pdf.pages, start=1):
            tables = page.extract_tables()
            if not tables:
                continue
            for row_number, row in enumerate(tables[0], start=1):
                cells = [clean_cell(value) for value in (row + ["", "", ""])[:3]]
                gene, function, protein = cells
                if GENE_PATTERN.fullmatch(gene):
                    records.append(
                        {
                            "Gene": gene,
                            "Function": function,
                            "Protein": protein,
                            "_pdf_page": page_number,
                            "_pdf_row": row_number,
                        }
                    )
                elif (
                    not gene
                    and not protein
                    and function
                    and records
                    and row_number == 1
                    and (function[0].islower() or function.startswith("("))
                ):
                    records[-1]["Function"] = clean_cell(
                        f"{records[-1]['Function']} {function}"
                    )
    return records


def parse_tsv():
    with XLS_PATH.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle, delimiter="\t")
        headers = [clean_cell(name) for name in (reader.fieldnames or [])]
        rows_by_gene = {}
        duplicate_gene_ids = []
        for raw_row in reader:
            normalized = {}
            for header in headers:
                value = clean_cell(raw_row.get(header, ""))
                if header in NUMERIC_COLUMNS and value:
                    value = float(value)
                normalized[header] = value
            gene = normalized.get("gene id", "")
            if gene in rows_by_gene:
                duplicate_gene_ids.append(gene)
            rows_by_gene[gene] = normalized
    return headers, rows_by_gene, duplicate_gene_ids


def main():
    pdf_rows = extract_pdf_rows()
    xls_headers, xls_rows, duplicate_gene_ids = parse_tsv()
    merged_headers = ["Gene", "Function", "Protein", *xls_headers]
    merged_rows = []
    unmatched = []

    for pdf_row in pdf_rows:
        gene = pdf_row["Gene"]
        match = xls_rows.get(gene)
        if match is None:
            unmatched.append(gene)
            appended = [""] * len(xls_headers)
        else:
            appended = [match.get(header, "") for header in xls_headers]
        merged_rows.append(
            [
                pdf_row["Gene"],
                pdf_row["Function"],
                pdf_row["Protein"],
                *appended,
            ]
        )

    payload = {
        "headers": merged_headers,
        "rows": merged_rows,
        "diagnostics": {
            "pdf_gene_rows": len(pdf_rows),
            "pdf_unique_genes": len({row["Gene"] for row in pdf_rows}),
            "xls_rows": len(xls_rows),
            "matched_rows": len(pdf_rows) - len(unmatched),
            "unmatched_rows": len(unmatched),
            "unmatched_genes": unmatched,
            "xls_duplicate_gene_ids": duplicate_gene_ids,
        },
    }
    OUTPUT_PATH.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps(payload["diagnostics"], ensure_ascii=False, indent=2))
    print("first_row=", json.dumps(merged_rows[0], ensure_ascii=False))
    print("last_row=", json.dumps(merged_rows[-1], ensure_ascii=False))


if __name__ == "__main__":
    main()
