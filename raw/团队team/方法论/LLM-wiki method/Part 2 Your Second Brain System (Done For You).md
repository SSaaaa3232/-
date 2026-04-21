---
ingested: 2026-04-17
wiki_page: "[[LLM Wiki Pattern]]"
title: "Part 2: Your Second Brain System (Done For You)"
source: "https://x.com/NickSpisak_/status/2041243686265090076"
author:
  - "[[@NickSpisak_]]"
published: 2026-04-07
created: 2026-04-07
description: "\"Part 1 showed you the folders. Part 2 gives you the system.\"Part 1 showed you the three folders. 12K people bookmarked the article. The fir..."
modified: 2026-04-07
---
**"Part 1 showed you the folders. Part 2 gives you the system."**

Part 1 showed you the three folders. 12K people bookmarked the article. The first version created one knowledge base, dumped everything in, and made it clear it felt like a junk drawer.

The problem isn't the pattern. The pattern is brilliant. The problem is that one general-purpose second brain tries to be everything and ends up being good at nothing. Dedicated second brains, one per domain, each compound independently. That's the system.

After Part 1, I built the open-source tooling that automates the entire setup. What took a weekend now takes minutes. Here's the complete guide. Every dependency, every step, every operation.

In under 7 minutes you'll learn:

1. The full setup chain from zero to working second brain (every dependency explained)
2. Why dedicated domain-specific vaults beat one giant knowledge base
3. The 4 operations that keep each second brain alive and compounding
4. 5 domain-specific second brains you can build today
5. The one command that scaffolds everything in 60 seconds

> Follow [@NickSpisak\_](https://x.com/@NickSpisak_)for practitioner-level AI implementation and Claude Code architecture content. Want the link that builds this system for you? Grab the URL here: [https://return-my-time.kit.com/52c0115fe2](https://return-my-time.kit.com/52c0115fe2)

Alright let's get started...

## 1\. The Full Setup (Every Dependency, In Order)

Part 1 skipped this. Here's every piece you need and why.

**Install Obsidian (free):** Go to [obsidian.md](https://obsidian.md/) and download the app. Obsidian is a markdown editor that treats a folder of text files like a wiki, with backlinks between pages, a visual graph showing how everything connects, and fast search. You're not writing in it. You're reading what the AI writes. It's the viewer.

**Pick your AI coding agent:** You need an AI that can read and write files on your computer. Any of these work:

- Claude Code (what I use daily) - [claude.ai/code](https://claude.ai/code)
- OpenAI Codex
- Cursor
- Gemini CLI

The AI is the librarian. You give it rules via a config file, and it maintains your entire wiki. You never manually organize a single page.

**Install Node.js:** Go to [nodejs.org](https://nodejs.org/) and download the LTS version. You need this for one install command in the next step. Already have Node? Skip this.

**Install the second brain skills:** Open your terminal and run one command:

```text
npx skills add NicholasSpisak/second-brain
```

This installs four skills into whichever AI agent you're using:

- /second-brain - scaffolds a new vault (guided wizard)
- /second-brain-ingest - processes raw sources into wiki pages
- /second-brain-query - asks questions against your wiki
- /second-brain-lint - health-checks the wiki for errors

One install. Works across Claude Code, Codex, Cursor, and Gemini CLI.

**Install Obsidian Web Clipper:** Search "Obsidian Web Clipper" in the Chrome Web Store and install it. This browser extension saves any web article as a clean markdown file directly into your vault's raw/ folder.

This is how you feed your second brain. See an article worth keeping? One click. It's in raw/. No copy-pasting. No reformatting.

**Run the wizard:** Type /second-brain in your AI agent. It asks five questions: what to name the vault, where to create it, what domain it covers, which agents you want config files for, and which optional tools to install.

A few minutes later you have a fully scaffolded knowledge base. Open the vault folder in Obsidian and you're live. The folder structure looks like this:

```text
your-vault/
  raw/           <- your sources go here (articles, notes, transcripts)
  wiki/          <- the AI maintains this entirely
    sources/     <- one summary per ingested source
    entities/    <- people, tools, companies
    concepts/    <- ideas, frameworks, theories
    synthesis/   <- comparisons and analyses
    index.md     <- master catalog of every page
    log.md       <- timeline of everything the AI has done
  output/        <- reports and query results
  CLAUDE.md      <- the rules file that makes it all work
```

That config file at the bottom, CLAUDE.md, is the brain of the system. It tells the AI exactly how to behave as your librarian. The wizard generates it for you. (is this system perfect yet - no... that's not the point - its to show you what you can build for yourself but its further along than a couple days ago)

## 2\. The Four Operations

Every second brain runs on four operations. The wizard handles the first one. You use the other three regularly.

**Onboarding** - The one-time setup. Creates the folder structure, generates the config file, bootstraps the index and log. Done.

**Ingest** - Where it gets powerful. Drop a source into raw/, run /second-brain-ingest. The AI reads it, discusses the key takeaways with you, then: writes a summary page, creates or updates entity pages (people, tools, companies mentioned), updates concept pages, adds cross-references between related topics, and updates the master index. One source typically touches 10-15 wiki pages.

**Query** - Ask questions against your wiki. Run /second-brain-query and ask anything. "What are the biggest gaps in my understanding of X?" or "Compare what source A says versus source B. Where do they disagree?" The AI reads across your entire wiki and synthesizes answers with citations back to specific pages. Here's the key. Good answers get saved back into the wiki as synthesis pages. Your questions make the system smarter.

**Lint** - The monthly health check everyone skips. Run /second-brain-lint and the AI audits for broken links, orphan pages with no connections, contradictions between articles, stale claims that newer sources have superseded, and missing cross-references. Don't skip this. Errors compound just as fast as knowledge does.

## 3\. Why Dedicated Beats General

Here's the contrarian take: if you built one knowledge base after Part 1 and dumped health articles next to business docs next to AI research, you missed the point.

A general-purpose second brain with 200 pages across 15 topics is a filing cabinet the AI has to dig through every time. A dedicated second brain with 40 pages about one domain is a specialist that gets sharper with every source you add.

Each domain builds its own concept map. Its own entity network. Its own cross-references. When you query "what headline patterns get the most views?" against a content-specific vault, the AI pulls from months of your own performance data. Not your cooking recipes and fitness logs.

## 4\. Five Second Brains You Can Build Today

Each takes minutes to scaffold. Here's what goes in raw/ and what the wiki produces.

**Competitive Intelligence** - Market reports, competitor announcements, product launch pages, pricing screenshots. The wiki builds entity pages for every competitor and tracks their moves over time. Ask: "What has \[competitor\] shipped in the last 90 days and how does it compare to ours?"

**Personal Health** - Lab results, doctor visit notes, supplement research articles, workout logs. The wiki connects your bloodwork trends to lifestyle changes across months of data. Ask: "Based on my last 3 blood panels, what's improving and what should I focus on?"

**Client Knowledge** - Meeting transcripts from Fathom, onboarding questionnaires, project documents, email threads. One vault per major client. The wiki tracks every decision, every open item, every preference they've mentioned. Ask: "What did we agree on across the last 3 meetings and what's still unresolved?"

**Learning and Upskilling** - Course notes, tutorial transcripts, documentation pages, conference talks. The wiki cross-references concepts from different sources and flags where your understanding has gaps. Ask: "What concepts have I seen in 3+ sources but never synthesized into my own framework?"

**Content Pipeline** - This is the one I run daily. Article drafts, performance data, audience analytics, competitor content breakdowns. The wiki knows which topics perform, which formats get bookmarks, and which hooks drive replies. Ask: "Based on everything that's worked, what should I write about next?"

## 5\. The Compounding Trick

Every second brain gets smarter two ways.

First, each new source refines the existing wiki. The 50th competitive intel report doesn't just add a page. It updates every entity, strengthens cross-references, and surfaces patterns you couldn't see in the first 10 reports.

Second, your questions feed back in. When you ask "what's the trend across these 5 competitors?" and the AI writes a synthesis, that synthesis becomes a permanent wiki page. The next query builds on top of it. Your curiosity literally makes the system smarter.

This is the insight from Karpathy's original pattern that most people glossed over. The wiki isn't a destination you fill up. It's a compounding machine. The 100th source is exponentially more valuable than the first because it has 99 sources of context to connect to. That's the full system. Obsidian for viewing. An AI agent for maintaining. Four skills for daily operations. And as many dedicated second brains as you have domains worth tracking.

Part 1 showed you the folders. Part 2 gives you the system.

Pick your first domain. Type /second-brain. minutes later and you're live.

> Want the link that builds this system for you? Grab the URL here: [https://return-my-time.kit.com/52c0115fe2](https://return-my-time.kit.com/52c0115fe2)