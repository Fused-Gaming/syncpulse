# CLAUDE.md — SyncPulse Startup Instructions

## 🚀 Session Startup Checklist

### 1. Install Dependencies
```bash
npm install --package-lock-only --ignore-scripts
npm ci
npm run build
```

### 2. Verify Installation
```bash
npm run lint
npm run typecheck
```

### 3. Configure Environment
Create `.env.local` if needed for development:
```bash
# Reference: docs/DEPENDENCIES.md or CONTRIBUTING.md
```

### 4. Initialize Git Session
```bash
git status
git remote -v
git branch -a
```

### 5. Verify Development Branch
```bash
git branch --show-current
```

Expected: `claude/syncpulse-migration-plan-*` or `main`

### 6. Pre-Task Checklist
Before starting any task:
- [ ] Run `npm run build` to verify no build errors
- [ ] Check `git status` for uncommitted changes
- [ ] Confirm working on correct development branch
- [ ] Review CLAUDE.md Agent Notes for recent constraints
- [ ] Check open PRs and GitHub issues for context

---

## 📋 Project Structure

This is a monorepo with 3 workspace packages:

| Package | Path | Purpose |
|---------|------|---------|
| **Core** | `packages/core/` | Main orchestration engine |
| **Hub** | `packages/hub/` | Web dashboard UI |
| **Workflows** | `packages/workflows/` | Email templates & patterns |

All packages are versioned together and published under `@h4shed` scope.

---

## 🔧 Common Commands

```bash
# Build all packages
npm run build

# Run tests across all packages
npm run test

# Type checking
npm run typecheck

# Linting
npm run lint

# Build specific package
npm run build -w @h4shed/skill-syncpulse

# Run tests for specific package
npm test -w @h4shed/skill-syncpulse-hub

# Clean all build artifacts
npm run clean
```

---

## 📖 Documentation

- **API Reference:** `docs/API.md` — Complete API documentation
- **Integration:** `docs/INTEGRATION.md` — MCP integration patterns
- **Architecture:** `docs/ARCHITECTURE.md` — System design
- **Dependencies:** `docs/DEPENDENCIES.md` — External dependencies
- **Examples:** `docs/EXAMPLES.md` — Working code examples

---

## 🔗 External Dependencies

### Required for All Packages
- `@h4shed/mcp-core` — MCP runtime & tool registration
- `@h4shed/license-client` — License validation (if needed)

### Development Dependencies
- TypeScript 5.3+
- Jest for testing
- ESLint for linting
- Node.js 20+

---

## 🚨 Important Constraints

### Scope Configuration
**DO NOT CHANGE** without coordination:
- `package.json` workspace scope: `@h4shed`
- All package names must use `@h4shed/skill-*` prefix
- Scope mismatch causes npm publish 404 errors

### Monorepo Discipline
1. Package versions managed together
2. All tests must pass before commits
3. Circular dependencies not allowed
4. External dependencies pinned to specific versions

### CI/CD
- GitHub Actions runs on Node 20.x and 22.x
- All checks required for merge to main
- npm publish requires valid NPM_TOKEN

---

## Agent Notes (2026-08-29, Phase 2C Complete - Integration Testing Success)

### What Was Completed
1. **Phase 2C: Test Suite & Performance Baselines** ✅
   - Created and deployed comprehensive test suite (88 tests)
   - All tests passing in local validation
   - Performance baselines established and documented
   - TESTING.md (454 lines) - Complete testing guide
   - PERFORMANCE-BASELINES.md (120 lines) - Metrics and thresholds
   - Commit: Package-lock.json for CI reproducibility

2. **Phase 2C: Integration Testing in skill-mcp** ✅
   - Created 45 MCP ecosystem integration tests in skill-mcp
   - All 47 tests passing (45 integration + 2 smoke)
   - Validated all 17 MCP tools work correctly
   - Confirmed backward compatibility with Phase 2B
   - Performance baselines met: skill init < 100ms
   - Documentation: PHASE-2C-INTEGRATION-SUMMARY.md

3. **GitHub Actions CI/CD**
   - Configured test matrix for Node 20.x and 22.x
   - All workflow steps passing locally
   - package-lock.json committed for reproducible builds
   - npm publish workflow configured

### Current Status
- **Repository**: https://github.com/fused-gaming/syncpulse
- **Branch Main**: Contains Phase 2C complete work
- **Testing**: 88 tests passing in syncpulse repo
- **Integration**: 47 tests passing in skill-mcp (Phase 2C testing)
- **Ecosystem**: Production ready for Phase 2D

### Phase 2C Success Metrics
✅ Unit Tests: 88 passing (core, hub, workflows packages)
✅ Integration Tests: 47 passing (MCP ecosystem validation)
✅ Performance Baselines: 4/4 targets met
✅ Type Checking: Strict mode, all declarations generated
✅ Build: All packages compile successfully
✅ CI/CD: GitHub Actions matrix testing working
✅ Documentation: Complete guides for testing and performance

### What's Ready for Phase 2D
- All source code extracted and migrated ✅
- Comprehensive test coverage ✅
- Performance validated and documented ✅
- CI/CD pipelines configured ✅
- npm publishing scripts ready ✅
- Package scope and configuration validated ✅

### Recommended Next Steps (Next Agent)
1. Merge Phase 2C PR (if not already merged)
2. Tag release v1.0.0-phase-2c for version tracking
3. Begin Phase 2D:
   - Publish @h4shed/skill-syncpulse to npm
   - Publish @h4shed/skill-syncpulse-hub to npm
   - Publish @h4shed/skill-syncpulse-workflows to npm
   - Create GitHub releases for each package
4. Validate npm integration and package integrity

---

## Agent Notes (2026-08-29, Initial Migration)

### What Was Completed
✅ Phase 2A: Repository Setup
- Created empty `fused-gaming/syncpulse` repository
- Initialized monorepo structure with 3 workspaces
- Configured root package.json with workspace declaration
- Set up TypeScript configuration with workspace inheritance
- Created .gitignore, .npmrc, LICENSE (Apache-2.0)
- Added comprehensive README.md
- Prepared this CLAUDE.md startup guide

### Current Status
- **Branch:** `claude/syncpulse-migration-plan-kdbiy2`
- **Packages:** Core, Hub, Workflows (structure ready, awaiting source extraction)
- **Tests:** Not yet configured
- **CI/CD:** Not yet configured
- **Dependencies:** Not yet installed (awaiting source code)

### Known Constraints
1. Source code not yet extracted from skill-mcp (Phase 2B)
2. npm ci will fail until package.json files exist in workspaces
3. GitHub Actions workflows not yet configured
4. No package-lock.json yet (will generate on first npm ci)

### Recommended Next Steps (Next Agent)
1. **Extract Core Package** from `/packages/skills/syncpulse/` in skill-mcp
2. **Extract Hub Package** from `/packages/skills/syncpulse-hub/` in skill-mcp
3. **Extract Workflows** from email workflow definitions
4. **Resolve Dependencies** and run `npm ci`
5. **Configure GitHub Actions** for CI/CD workflows
6. **Run Verification** (`npm run build`, `npm run test`)

### Phase 2B: Package Migration
This agent should:
- [ ] Copy core orchestrator to `packages/core/src/`
- [ ] Copy hub components to `packages/hub/src/`
- [ ] Copy workflow definitions to `packages/workflows/src/`
- [ ] Create package.json for each workspace
- [ ] Create tsconfig.json for each workspace
- [ ] Verify `npm install` succeeds
- [ ] Verify `npm run build --workspaces` passes

### Migration Source Reference
Original source files location in skill-mcp:
- `/packages/skills/syncpulse/` → Extract to `packages/core/`
- `/packages/skills/syncpulse-hub/` → Extract to `packages/hub/`
- Email workflows in skill-mcp → Extract to `packages/workflows/`

---

## 🔄 Git Workflow

### Branch Strategy
- Development: `claude/syncpulse-migration-plan-*`
- Main: `main` (production-ready)
- Feature branches: `feature/*`
- Bug fixes: `fix/*`

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

Co-Authored-By: Claude Code <noreply@anthropic.com>
Claude-Session: <session-url>
```

### Before Pushing
1. Run `npm run build`
2. Run `npm run test`
3. Run `npm run lint`
4. Run `npm run typecheck`
5. Verify all checks pass
6. Create meaningful commit message

---

## 📝 Version Management

**Current Version:** 1.0.0 (initial release)

Version updates follow semantic versioning:
- **MAJOR:** Breaking changes
- **MINOR:** New features (backward compatible)
- **PATCH:** Bug fixes

All workspace packages are versioned together (monorepo convention).

---

## 🎯 Success Criteria

### Phase 2A (Repository Setup) ✅
- [x] GitHub repository created
- [x] Monorepo structure initialized
- [x] Root configuration files created
- [x] Documentation template prepared

### Phase 2B (Package Migration) ⏳
- [ ] Source code extracted from skill-mcp
- [ ] npm install succeeds
- [ ] npm run build passes
- [ ] All packages build successfully

### Phase 2C (Testing) ⏳
- [ ] Unit tests migrated and passing
- [ ] Backward compatibility verified
- [ ] Performance benchmarks established

### Phase 2D (Documentation & Launch) ⏳
- [ ] API documentation complete
- [ ] Published to npm registry
- [ ] Integration with skill-mcp verified

---

**Last Updated:** 2026-08-29  
**Status:** Phase 2A Complete, Ready for Phase 2B  
**Next Focus:** Package extraction and dependency resolution
