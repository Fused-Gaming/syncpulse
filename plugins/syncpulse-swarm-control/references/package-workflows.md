# Package workflows

Per-package usage docs for `@h4shed` package-hub entries whose `registry/tools.registry.json` entry carries a `bin`/`workflow` field. Each entry here mirrors what its registry row claims — if you change one, change the other in the same commit. This file exists so `capability-scout`/`expand-ecosystem` (and any operator) can see how to actually invoke a package without re-deriving it from source each time.

## Foundation packages

These four are the `FOUNDATION_ORDER` list in `scripts/discover-ecosystem.mjs` and must be present, in this exact order, before any other `@h4shed` package is treated as installed (see `skills/expand-ecosystem/SKILL.md` Step 2). All four are already wired as MCP servers in `.mcp.json` at the plugin root — the `npx` commands below are what that config runs, and are also how to invoke them standalone (e.g. for a smoke test outside Claude).

### `@h4shed/mcp-core`

- **npm:** published, `bin: null` — pure MCP server library, no standalone CLI.
- **Run as an MCP server:** `npx --no-install -y @h4shed/mcp-core` (already wired as `h4shed-mcp-core` in `.mcp.json`).
- Role: registry/loading layer — registers and serves every other installed `@h4shed` skill/tool/agent to Claude. Nothing else in the ecosystem functions without this being installed first.

### `@h4shed/mcp-cli`

- **npm:** published, exposes `bin: fused-gaming-mcp`.
- **Workflow:**
  ```bash
  npx fused-gaming-mcp --help     # see available subcommands
  npx fused-gaming-mcp <command>  # manage skill/config install and status
  ```
- Depends on `@h4shed/mcp-core` (declared dependency) — install/verify core first.

### `@h4shed/skill-syncpulse`

- **npm:** published, `bin: null` — runs as an MCP server, not a standalone CLI.
- **Run as an MCP server:** `npx --no-install -y @h4shed/skill-syncpulse` (wired as `h4shed-syncpulse` in `.mcp.json`, with `SYNCPULSE_EMAIL_ENABLED`/`SYNCPULSE_TELEMETRY_ENABLED` env toggles — both default `false` in this plugin's config).
- Role: coordination state — task graph, workspace ownership, verification gates, swarm memory.

### `@h4shed/syncpulse-hub`

- **npm:** published, `bin: null` — runs as an MCP server, not a standalone CLI.
- **Run as an MCP server:** `npx --no-install -y @h4shed/syncpulse-hub` (wired as `h4shed-syncpulse-hub` in `.mcp.json`, with `SYNCPULSE_HUB_MUTATIONS_ENABLED=false` by default in this plugin's config — flip only with an explicit human decision gate per `capability-policy.md`, since mutations are P2+).
- Role: ecosystem-wide discovery/update/orchestration dashboard for installed `@h4shed` packages.

## `@h4shed/rock-hardened`

- **npm:** `@h4shed/rock-hardened` (published, `npmPublished: true`)
- **Repo:** https://github.com/fused-gaming/rock-hardened
- **Bin:** `hardened-changelogger` (alias `hc`) — exposed via the package's `bin` field, callable with `npx` without a local install.

### Workflow

```bash
# One-off, no local install needed:
npx hardened-changelogger init       # scaffold release-contract.config.json
npx hardened-changelogger validate   # enforce the [Unreleased] changelog contract
npx hardened-changelogger manifest   # build the deterministic release manifest
npx hardened-changelogger render     # generate the HTML/PNG release card
npx hardened-changelogger attest     # SHA-256 (+ optional Ed25519) attestation

# Or the full pipeline in one call:
npx hardened-changelogger ci
```

Routes through the `release-manager` agent in the `release` workspace. Human approval remains the publication gate — this tool produces evidence and assets, it does not publish on its own. Treat any commit/tag/publish trigger built on top of `hc ci` as P2+ (repository-write-capable) even though the read/validate/render/attest steps are P1.

## `dynagraph`

- **npm:** not yet published (`npmPublished: false`) — do not `npm install`/`npx` this package until that flips to `true`.
- **Repo:** https://github.com/fused-gaming/dynagraph
- **Bin:** none exposed. It ships as a library SDK (`main`/`exports` only, no `bin` field) — there is no CLI to route to today.

### Workflow (once published)

Until it has a published version and/or a `bin` entry, the only supported integration path is the library import already declared in its own `package.json` (`@h4shed/mcp-core` as a peer):

```ts
import { /* renderer API, TBD at publish */ } from "dynagraph";
```

When it publishes:
1. Run `node scripts/discover-ecosystem.mjs` to pick it up from the live npm registry (it will only appear once `dynagraph` — or a rescoped `@h4shed/dynagraph` — actually resolves).
2. Flip `npmPublished` to `true` in `registry/tools.registry.json` and fill in `latestKnownVersion` and `verifiedH4shed` from that discovery result.
3. If it ships a `bin` at that point, add it here and to the registry entry's `bin` field; if it stays library-only, keep `bin: null` and document the import shape instead.

Do not pre-guess a CLI surface for an unpublished package — this section gets filled in from the real `package.json` at publish time, not from expectation.
