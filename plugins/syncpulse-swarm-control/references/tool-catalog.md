# Tool Catalog

This indexes the `@h4shed/tool-*` execution packages this plugin can route work to. Tools are concrete execution (compiling, rendering, testing, bundling, auditing) — the counterpart to skills, which carry domain instructions and workflow behavior (see `architecture.md` and the project's `SyncPulse Ecosystem Bootstrap` prompt: *"Prefer a skill package for domain instructions... Prefer a tool package for concrete execution"*).

Live, authoritative package data (versions, verified-maintainer status, dist-tags) always comes from `node scripts/discover-ecosystem.mjs` — the table below is a routing/grouping reference, not a version pin. Re-run discovery before trusting any version number.

**Canonical extensible source:** `registry/tools.registry.json`. Run `node scripts/sync-registries.mjs` to refresh it from live npm discovery — it upserts `verifiedH4shed`/`description`/`latestKnownVersion` on known entries and appends any newly published `@h4shed/tool-*` (or verified unscoped) package as `source: "discovered"`, `category: "uncategorized"`, ready for a human to categorize and assign a `workspace`/`agent`. Nothing here needs re-discovering by a model — the registry is the memory.

| Category | Tools | Typical workspace | Typical agent |
|---|---|---|---|
| Build & bundling | `tool-esbuild`, `tool-rollup`, `tool-tsup`, `tool-vite`, `tool-vitepress`, `tool-webpack`, `tool-docusaurus` | implementation | developer |
| Style & CSS | `tool-postcss`, `tool-sass`, `tool-less`, `tool-cssnano`, `tool-tailwindcss`, `tool-style-dictionary` | design / implementation | designer, developer |
| Testing & QA | `tool-jest`, `tool-vitest`, `tool-cypress`, `tool-playwright`, `tool-pa11y`, `tool-axe-core` | testing / review | tester, reviewer |
| Docs & components | `tool-storybook`, `tool-typedoc`, `tool-markdown-it`, `tool-husky` | implementation | developer |
| CLI & automation | `tool-commander`, `tool-inquirer`, `tool-ora` | implementation / agent-governance | developer, capability-scout |
| Analysis & reporting | `tool-istanbul`, `tool-release-manager` | testing / release | tester, release-manager |

Every tool name above is short for `@h4shed/<name>` (e.g. `tool-vite` = `@h4shed/tool-vite`).

## Package-hub additions (beyond `@h4shed/tool-*`)

Not everything in the `@h4shed` package hub is a `tool-*` wrapper — the four foundation packages and standalone products (e.g. `@h4shed/rock-hardened`, `dynagraph`) get the same registry treatment but carry extra fields in `registry/tools.registry.json`:

| Package | npmPublished | Bin (npx) | Workflow doc |
|---|---|---|---|
| `@h4shed/mcp-core` | ✅ | none (MCP server only) | `references/package-workflows.md#h4shedmcp-core` |
| `@h4shed/mcp-cli` | ✅ | `fused-gaming-mcp` | `references/package-workflows.md#h4shedmcp-cli` |
| `@h4shed/skill-syncpulse` | ✅ | none (MCP server only) | `references/package-workflows.md#h4shedskill-syncpulse` |
| `@h4shed/syncpulse-hub` | ✅ | none (MCP server only) | `references/package-workflows.md#h4shedsyncpulse-hub` |
| `@h4shed/rock-hardened` | ✅ | `hardened-changelogger` / `hc` | `references/package-workflows.md#h4shedrock-hardened` |
| `dynagraph` | ❌ (not yet published) | none exposed | `references/package-workflows.md#dynagraph` |

The four foundation packages are also already wired as MCP servers in `.mcp.json` at the plugin root — their registry `bin: null` reflects that they're MCP servers, not standalone CLIs (except `mcp-cli`, which is both a dependency of the others and its own CLI).

- `npmPublished: false` means documentation-only — never install or route to it (see `capability-policy.md` § *Pre-publish package-hub additions*).
- `bin: null` on a published package means it's library-only; route to it as an import, not a CLI.
- `bin` entries are real `npx <command>` invocations taken from the package's own `package.json`, never guessed.
- `workflow` is an anchor into `references/package-workflows.md`, which has the actual command sequence/usage per package.

## How a tool gets assigned

1. `scripts/route-intent.mjs` matches free-text intent to a rule in `config/routing-table.json`, which carries a `supportingTools` array.
2. The coordinator (or whichever agent owns the workspace) checks `syncpulse-package-inventory.json` (from `discover-ecosystem.mjs`) to confirm each tool is `verifiedH4shed: true` and already installed, or routes to the `expand-ecosystem` skill if not.
3. Per `references/capability-policy.md`, a tool is P1 (read-only skill/tool) or P2 (repository-write-capable) — check the tier before auto-installing.
4. The owning agent invokes the tool through its documented CLI/API — never an undocumented or guessed command.

## Skills vs. tools, briefly

A **skill** (`@h4shed/skill-*`) is domain instructions and workflow behavior a model reads and follows — e.g. `skill-frontend-design`, `skill-theme-factory`. A **tool** (`@h4shed/tool-*`) is something that actually runs — a bundler, a test runner, a linter. Most routing-table rules pair one primary skill with a small set of supporting tools: the skill tells the agent *how* to approach the work, the tools *do* the work. Don't substitute a tool for a skill when domain guidance is what's actually needed, and don't route pure execution (e.g. "minify this CSS") through a skill when a tool alone suffices.

## Adding a new tool

1. Confirm it's discoverable and verified: `node scripts/discover-ecosystem.mjs`, then check `compatibilityDecision: "include"` in the output.
2. Run `node scripts/sync-registries.mjs` — a newly published, verified tool is appended to `registry/tools.registry.json` automatically as `category: "uncategorized"`. Edit that entry's `category`, `workspace`, and `agent` fields by hand (this is the only manual step; re-running sync never overwrites them).
3. Add it to the relevant category row above (or a new row/category if it doesn't fit) for humans reading this file.
4. Add it to `supportingTools` on the matching rule(s) in `config/routing-table.json`.
5. Re-run `node scripts/route-intent.mjs "<sample intent>"` to confirm it now surfaces, and `node scripts/sync-registries.mjs` to confirm the routing-table validation reports no unresolved references.
