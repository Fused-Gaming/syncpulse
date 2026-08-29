# SyncPulse Dependencies

## External Dependencies

### Required Packages

All SyncPulse packages require:

| Package | Version | Purpose | License |
|---------|---------|---------|---------|
| `@h4shed/mcp-core` | ^1.0.24 | MCP runtime & tool registration | Apache-2.0 |
| `node` | >=20.0.0 | Runtime environment | N/A |
| `npm` | >=10.0.0 | Package manager | N/A |

### Runtime Dependencies

#### Core Package (`@h4shed/skill-syncpulse`)

| Package | Version | Purpose | License |
|---------|---------|---------|---------|
| `nodemailer` | ^6.9.13 | Email sending | MIT |

#### Hub Package (`@h4shed/skill-syncpulse-hub`)

| Package | Version | Purpose | License |
|---------|---------|---------|---------|
| `@h4shed/skill-pre-deploy-validator` | ^1.0.24 | Deployment validation | Apache-2.0 |

#### Workflows Package (`@h4shed/skill-syncpulse-workflows`)

No external runtime dependencies (pure TypeScript)

### Development Dependencies

Used across all packages for development and testing:

| Package | Version | Purpose | License |
|---------|---------|---------|---------|
| `typescript` | ^5.3.2 | TypeScript compiler | Apache-2.0 |
| `jest` | ^29.7.0 | Testing framework | MIT |
| `ts-jest` | ^29.1.1 | TypeScript Jest transformer | MIT |
| `@types/node` | ^20.12.0 | Node.js type definitions | MIT |
| `@types/jest` | ^29.5.11 | Jest type definitions | MIT |
| `eslint` | ^8.56.0 | Linting | MIT |
| `@typescript-eslint/parser` | ^6.17.0 | TypeScript ESLint parser | BSD-2-Clause |
| `@typescript-eslint/eslint-plugin` | ^6.17.0 | TypeScript ESLint rules | MIT |
| `ts-node` | ^10.9.0 | TypeScript execution | MIT |

## Optional Dependencies

### Email Support

For enhanced email functionality, optionally install:

```bash
npm install nodemailer-html-to-text
npm install @types/nodemailer
```

### Database Support

For persistence beyond in-memory:

```bash
# PostgreSQL
npm install pg

# MongoDB
npm install mongodb
```

### Monitoring

For production monitoring:

```bash
npm install winston  # Logging
npm install @opentelemetry/api  # Distributed tracing
```

## Version Compatibility

### Node.js

- **Minimum:** 20.0.0 (Active LTS)
- **Recommended:** 22.x (Current LTS)
- **Tested:** 20.x, 22.x

### TypeScript

- **Minimum:** 5.3.x
- **Recommended:** 5.3.x or later
- **Configuration:** Strict mode enabled

### npm

- **Minimum:** 10.0.0
- **Recommended:** 10.x or later

## Monorepo Dependencies

Within the monorepo, workspace packages depend on each other:

```
@h4shed/skill-syncpulse (core)
  └── (no internal dependencies)

@h4shed/skill-syncpulse-hub (hub)
  └── @h4shed/skill-syncpulse ^^^^^^^^^ (workspace reference)

@h4shed/skill-syncpulse-workflows (workflows)
  └── @h4shed/skill-syncpulse ^^^^^^^^^ (workspace reference)
```

Workspace references use `file://` protocol locally and semantic version ranges on npm registry:
- Local development: `file:../../packages/core`
- Published npm: `^1.0.0`

## License Compliance

All dependencies are checked for license compatibility:

✅ **Apache-2.0 Compatible:**
- @h4shed/mcp-core
- typescript

✅ **MIT Compatible:**
- nodemailer
- jest
- ts-jest
- eslint
- @typescript-eslint/*
- ts-node

⚠️ **GPL/AGPL:** None (all permissive)

✅ **Commercial Use:** All dependencies permit commercial use

## Security Considerations

### Known Vulnerabilities

Run audits regularly:

```bash
npm audit
npm audit fix  # Only for non-breaking fixes
```

### Dependency Updates

Keep dependencies current:

```bash
npm update          # Update within version ranges
npm outdated        # See what can be updated
npm audit           # Check for vulnerabilities
```

### Locked Versions

Production deployments should use `package-lock.json`:

```bash
npm ci              # Clean install with exact versions
```

## Adding New Dependencies

Before adding external dependencies:

1. **Verify License** — Must be compatible with Apache-2.0
2. **Check Security** — Run `npm audit` for vulnerabilities
3. **Minimize Size** — Consider bundle impact
4. **Document Purpose** — Update this file
5. **Test Compatibility** — Verify with Node 20.x and 22.x

Adding a dependency:

```bash
npm install package-name -w @h4shed/skill-syncpulse
npm ci                       # Update lock file
npm run test --workspaces    # Verify compatibility
```

## Dependency Optimization

### Bundle Size

Core package is optimized for minimal bundle size:

```
@h4shed/skill-syncpulse: ~250KB (minified)
@h4shed/skill-syncpulse-hub: ~400KB (minified)
@h4shed/skill-syncpulse-workflows: ~50KB (minified)
```

### Tree-Shaking

All packages export ESM modules supporting tree-shaking:

```typescript
import { Orchestrator } from '@h4shed/skill-syncpulse';
// Only Orchestrator and its dependencies included in bundle
```

---

For MCP integration, see [INTEGRATION.md](INTEGRATION.md)
For development setup, see [CLAUDE.md](../CLAUDE.md)
