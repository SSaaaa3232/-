#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const DEFAULT_API_BASE = "https://api.x.com/2";
const DEFAULT_VAULT_ROOT = "/Users/saaaaa/Obsidian-Template";
const DEFAULT_USER_FIELDS = [
  "created_at",
  "description",
  "profile_image_url",
  "public_metrics",
  "url",
  "verified",
];

export function sanitizeSlug(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[^\x00-\x7F]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function formatDate(date) {
  return new Date(date).toISOString().slice(0, 10);
}

function formatTimestamp(date) {
  return new Date(date).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeCell(value) {
  return String(value ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ")
    .trim();
}

function quoteYaml(value) {
  return JSON.stringify(String(value ?? ""));
}

function numberOrDash(value) {
  return Number.isFinite(value) ? String(value) : "-";
}

async function xFetchJson(url, bearerToken) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
  });

  const body = await response.text();
  let parsed;
  try {
    parsed = body ? JSON.parse(body) : {};
  } catch {
    parsed = { raw: body };
  }

  if (!response.ok) {
    const error = new Error(`X API request failed with ${response.status}`);
    error.status = response.status;
    error.details = parsed;
    throw error;
  }

  return parsed;
}

export async function fetchAllFollowing({ userId, fetchPage }) {
  const users = [];
  let paginationToken;
  let pagesFetched = 0;
  let resultCountTotal = 0;

  do {
    const page = await fetchPage({ userId, paginationToken });
    const pageUsers = Array.isArray(page?.data) ? page.data : [];

    users.push(...pageUsers);
    pagesFetched += 1;
    resultCountTotal += Number(page?.meta?.result_count ?? pageUsers.length ?? 0);
    paginationToken = page?.meta?.next_token;
  } while (paginationToken);

  return {
    users,
    pagesFetched,
    resultCountTotal,
  };
}

export function buildMarkdownNote({
  owner,
  fetchedAt,
  sourceUrl,
  users,
  jsonFileName,
  meta,
}) {
  const day = formatDate(fetchedAt);
  const title = `X Following Export - @${owner.username} - ${day}`;
  const rows = users.map((user, index) => {
    const metrics = user.public_metrics ?? {};
    return [
      index + 1,
      escapeCell(user.name ?? ""),
      `@${escapeCell(user.username ?? "")}`,
      user.verified ? "yes" : "no",
      numberOrDash(metrics.followers_count),
      numberOrDash(metrics.following_count),
      escapeCell(user.description ?? ""),
    ];
  });

  const table = rows.length
    ? [
        "| # | Name | Username | Verified | Followers | Following | Bio |",
        "| --- | --- | --- | --- | --- | --- | --- |",
        ...rows.map((row) => `| ${row.join(" | ")} |`),
      ].join("\n")
    : "_No following accounts were returned by the API._";

  return [
    "---",
    'type: source',
    `title: ${quoteYaml(title)}`,
    "source_type: social",
    `author: ${quoteYaml(`@${owner.username}`)}`,
    `date_published: ${day}`,
    `url: ${quoteYaml(sourceUrl)}`,
    'confidence: high',
    "key_claims:",
    `  - ${quoteYaml(`Snapshot contains ${users.length} followed accounts exported via the X official API.`)}`,
    `created: ${day}`,
    `updated: ${day}`,
    "tags:",
    "  - source",
    "  - x",
    "  - following",
    "  - export",
    "status: seed",
    "related: []",
    "sources:",
    '  - "https://docs.x.com/x-api/users/get-following"',
    '  - "https://docs.x.com/fundamentals/authentication/guides/v2-authentication-mapping"',
    "---",
    "",
    `# ${title}`,
    "",
    "## Summary",
    "",
    `This note is a local snapshot of accounts followed by [@${owner.username}](${sourceUrl}).`,
    `It was exported on ${new Date(fetchedAt).toISOString()} via the X official API and includes ${users.length} accounts across ${meta.pages_fetched} page(s).`,
    "",
    "## Snapshot Metadata",
    "",
    `- Owner: ${owner.name ?? owner.username} (@${owner.username})`,
    `- Owner ID: ${owner.id}`,
    `- Exported accounts: ${meta.exported_count}`,
    `- API result count total: ${meta.result_count_total}`,
    `- Raw JSON: [[${jsonFileName}]]`,
    "",
    "## Following List",
    "",
    table,
    "",
  ].join("\n");
}

export async function writeArtifacts({
  vaultRoot,
  slug,
  markdown,
  payload,
}) {
  const markdownPath = path.join(vaultRoot, `${slug}.md`);
  const jsonPath = path.join(vaultRoot, `${slug}.json`);

  await fs.mkdir(vaultRoot, { recursive: true });
  await fs.writeFile(markdownPath, markdown, "utf8");
  await fs.writeFile(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  return {
    markdownPath,
    jsonPath,
  };
}

function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    index += 1;
  }

  return args;
}

function getConfig(argv, env) {
  const args = parseArgs(argv);
  const userFields = (args["user-fields"] ?? env.X_USER_FIELDS ?? DEFAULT_USER_FIELDS.join(","))
    .split(",")
    .map((field) => field.trim())
    .filter(Boolean);

  return {
    apiBase: args["api-base"] ?? env.X_API_BASE ?? DEFAULT_API_BASE,
    bearerToken: args["bearer-token"] ?? env.X_BEARER_TOKEN,
    userId: args["user-id"] ?? env.X_USER_ID,
    username: args.username ?? env.X_USERNAME,
    vaultRoot: args["vault-root"] ?? env.OBSIDIAN_TEMPLATE_ROOT ?? DEFAULT_VAULT_ROOT,
    maxResults: Number(args["max-results"] ?? env.X_MAX_RESULTS ?? 100),
    outputPrefix: args["output-prefix"] ?? env.X_OUTPUT_PREFIX ?? "x-following",
    dryRun: Boolean(args["dry-run"]),
    help: Boolean(args.help),
    userFields,
  };
}

function buildHelpText() {
  return [
    "Sync an X following list into the local Obsidian-Template vault.",
    "",
    "Required auth:",
    "  X_BEARER_TOKEN=<token>",
    "",
    "Identity:",
    "  --user-id <id>        or X_USER_ID=<id>",
    "  --username <handle>   or X_USERNAME=<handle>",
    "",
    "Optional:",
    "  --vault-root <path>   default: /Users/saaaaa/Obsidian-Template",
    "                     output files are written directly into this folder",
    "  --max-results <n>     default: 100",
    "  --dry-run             print summary without writing files",
    "",
    "Examples:",
    "  node sync-following.mjs --username your_handle",
    "  X_BEARER_TOKEN=... X_USER_ID=123 node sync-following.mjs",
  ].join("\n");
}

async function resolveUser({ apiBase, bearerToken, userId, username }) {
  if (username && !userId) {
    const payload = await xFetchJson(
      `${apiBase}/users/by/username/${encodeURIComponent(username)}`,
      bearerToken,
    );
    return payload.data;
  }

  if (userId) {
    const payload = await xFetchJson(
      `${apiBase}/users/${encodeURIComponent(userId)}?user.fields=name,username`,
      bearerToken,
    );
    return payload.data;
  }

  throw new Error("Provide either --user-id/X_USER_ID or --username/X_USERNAME.");
}

function buildFollowingUrl(owner) {
  return `https://x.com/${owner.username}/following`;
}

async function fetchFollowingPage({
  apiBase,
  bearerToken,
  userId,
  paginationToken,
  maxResults,
  userFields,
}) {
  const url = new URL(`${apiBase}/users/${encodeURIComponent(userId)}/following`);
  url.searchParams.set("max_results", String(maxResults));
  if (paginationToken) {
    url.searchParams.set("pagination_token", paginationToken);
  }
  if (userFields.length > 0) {
    url.searchParams.set("user.fields", userFields.join(","));
  }

  return xFetchJson(url, bearerToken);
}

async function run(argv = process.argv.slice(2), env = process.env) {
  const config = getConfig(argv, env);

  if (config.help) {
    console.log(buildHelpText());
    return;
  }

  if (!config.bearerToken) {
    throw new Error("Missing X_BEARER_TOKEN or --bearer-token.");
  }

  const owner = await resolveUser(config);
  const fetchedAt = new Date();
  const following = await fetchAllFollowing({
    userId: owner.id,
    fetchPage: ({ paginationToken }) =>
      fetchFollowingPage({
        apiBase: config.apiBase,
        bearerToken: config.bearerToken,
        userId: owner.id,
        paginationToken,
        maxResults: config.maxResults,
        userFields: config.userFields,
      }),
  });

  const timestamp = formatTimestamp(fetchedAt);
  const slug = sanitizeSlug(
    `${config.outputPrefix}-${owner.username}-${timestamp}`,
  );
  const sourceUrl = buildFollowingUrl(owner);
  const payload = {
    owner,
    source_url: sourceUrl,
    fetched_at: fetchedAt.toISOString(),
    meta: {
      pages_fetched: following.pagesFetched,
      exported_count: following.users.length,
      result_count_total: following.resultCountTotal,
    },
    users: following.users,
  };

  const markdown = buildMarkdownNote({
    owner,
    fetchedAt,
    sourceUrl,
    users: following.users,
    jsonFileName: `${slug}.json`,
    meta: payload.meta,
  });

  if (config.dryRun) {
    console.log(
      JSON.stringify(
        {
          slug,
          owner,
          source_url: sourceUrl,
          exported_count: following.users.length,
          pages_fetched: following.pagesFetched,
        },
        null,
        2,
      ),
    );
    return;
  }

  const paths = await writeArtifacts({
    vaultRoot: config.vaultRoot,
    slug,
    markdown,
    payload,
  });

  console.log(
    JSON.stringify(
      {
        owner: `@${owner.username}`,
        exported_count: following.users.length,
        markdown_path: paths.markdownPath,
        json_path: paths.jsonPath,
      },
      null,
      2,
    ),
  );
}

const invokedPath = process.argv[1]
  ? pathToFileURL(path.resolve(process.argv[1])).href
  : null;

if (invokedPath && import.meta.url === invokedPath) {
  run().catch((error) => {
    console.error(
      JSON.stringify(
        {
          error: error.message,
          status: error.status ?? null,
          details: error.details ?? null,
        },
        null,
        2,
      ),
    );
    process.exitCode = 1;
  });
}

export { run };
