# Changelog

All notable changes to SyncPulse will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial monorepo setup with 3 workspace packages (core, hub, workflows)
- Repository structure and configuration
- Root documentation and startup guide
- GitHub Actions CI/CD pipeline configuration
- Apache 2.0 license

### Changed
- Extracted SyncPulse from Fused Gaming Skill MCP monorepo
- Converted to dedicated multi-workspace repository
- Aligned versioning strategy with monorepo conventions

### Fixed
- None yet

## [1.0.0] - 2026-08-29

### Added
- Initial release of SyncPulse as standalone repository
- Core orchestration engine (@h4shed/skill-syncpulse)
  - Multi-agent orchestration framework
  - Workflow definition and execution
  - State management and persistence
  - MCP tool registration
  
- Hub dashboard (@h4shed/skill-syncpulse-hub)
  - Web-based workflow monitoring
  - Agent status dashboard
  - Workflow management interface
  
- Workflows package (@h4shed/skill-syncpulse-workflows)
  - Email template library
  - Common workflow patterns
  - Agent coordination utilities

### Features
- Full TypeScript support with strict mode enabled
- Comprehensive test suite with Jest
- ESLint and TypeScript linting
- Monorepo workspace structure
- CI/CD workflows for Node 20.x and 22.x
- Apache 2.0 open source license
- Integration with MCP ecosystem

---

**Notes on Migration:**
- Separated from: `fused-gaming/fused-gaming-skill-mcp`
- Migration completed: 2026-08-29
- Original source: `packages/skills/syncpulse/*` from skill-mcp
- Integration: Maintains MCP compatibility through adapter pattern
