import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import {
  buildMarkdownNote,
  fetchAllFollowing,
  sanitizeSlug,
  writeArtifacts,
} from "./sync-following.mjs";

test("sanitizeSlug normalizes mixed text into a filesystem-safe slug", () => {
  assert.equal(sanitizeSlug("  Hello, 世界 / X Following  "), "hello-x-following");
});

test("fetchAllFollowing paginates until next_token disappears", async () => {
  const seenTokens = [];
  const pages = [
    {
      data: [{ id: "1", username: "alice" }, { id: "2", username: "bob" }],
      meta: { result_count: 2, next_token: "page-2" },
    },
    {
      data: [{ id: "3", username: "carol" }],
      meta: { result_count: 1 },
    },
  ];

  const result = await fetchAllFollowing({
    userId: "42",
    fetchPage: async ({ paginationToken }) => {
      seenTokens.push(paginationToken ?? null);
      return pages.shift();
    },
  });

  assert.deepEqual(seenTokens, [null, "page-2"]);
  assert.equal(result.users.length, 3);
  assert.deepEqual(
    result.users.map((user) => user.username),
    ["alice", "bob", "carol"],
  );
  assert.equal(result.pagesFetched, 2);
});

test("buildMarkdownNote renders a summary and table for Obsidian", () => {
  const markdown = buildMarkdownNote({
    owner: {
      id: "42",
      name: "Example User",
      username: "example",
    },
    fetchedAt: new Date("2026-05-08T10:11:12Z"),
    sourceUrl: "https://x.com/example/following",
    users: [
      {
        id: "1",
        name: "Alice",
        username: "alice",
        verified: true,
        description: "Builds tools",
        public_metrics: {
          followers_count: 120,
          following_count: 34,
          tweet_count: 56,
        },
      },
    ],
    jsonFileName: "x-following-example-20260508T101112Z.json",
    meta: {
      pages_fetched: 1,
      exported_count: 1,
      result_count_total: 1,
    },
  });

  assert.match(markdown, /title: "X Following Export - @example - 2026-05-08"/);
  assert.match(markdown, /Snapshot contains 1 followed accounts exported via the X official API\./);
  assert.match(markdown, /\| 1 \| Alice \| @alice \| yes \| 120 \| 34 \| Builds tools \|/);
  assert.match(markdown, /\[\[x-following-example-20260508T101112Z\.json\]\]/);
});

test("writeArtifacts writes markdown and json into the vault root", async () => {
  const vaultRoot = await fs.mkdtemp(path.join(os.tmpdir(), "x-following-vault-"));
  const result = await writeArtifacts({
    vaultRoot,
    slug: "x-following-example-20260508T101112Z",
    markdown: "# Example\n",
    payload: { ok: true },
    fetchedAt: new Date("2026-05-08T10:11:12Z"),
  });

  const markdownContent = await fs.readFile(result.markdownPath, "utf8");
  const jsonContent = JSON.parse(await fs.readFile(result.jsonPath, "utf8"));

  assert.equal(markdownContent, "# Example\n");
  assert.deepEqual(jsonContent, { ok: true });
  assert.equal(
    path.relative(vaultRoot, result.markdownPath),
    "x-following-example-20260508T101112Z.md",
  );
  assert.equal(
    path.relative(vaultRoot, result.jsonPath),
    "x-following-example-20260508T101112Z.json",
  );
});
