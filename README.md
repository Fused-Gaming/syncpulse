# SyncPulse

**Multi-agent orchestration and coordination platform for autonomous workflows.**

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js->=20.0.0-green.svg)](package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue.svg)](#)

SyncPulse is a sophisticated framework for orchestrating, coordinating, and managing multi-agent workflows. It provides tools for:

- **Agent Coordination** — Manage interactions between multiple autonomous agents
- **Workflow Orchestration** — Define and execute complex business workflows
- **State Management** — Track agent state and workflow progress
- **Email Integration** — Template-driven email workflows and notifications
- **MCP Integration** — Native integration with the Anthropic MCP ecosystem

## Quick Start

### Installation

```bash
npm install @h4shed/skill-syncpulse
```

### Basic Usage

```typescript
import { Orchestrator } from '@h4shed/skill-syncpulse';

const orchestrator = new Orchestrator();

// Define a workflow
const workflow = {
  name: 'task-processing',
  steps: [
    { type: 'agent', agent: 'processor', action: 'analyze' },
    { type: 'agent', agent: 'validator', action: 'validate' },
    { type: 'email', template: 'task-completed' }
  ]
};

// Execute workflow
await orchestrator.executeWorkflow(workflow, { taskId: '123' });
```

## Workspace Packages

This monorepo contains three main packages:

### 1. Core Orchestrator (`@h4shed/skill-syncpulse`)

The core orchestration engine with agent coordination, workflow execution, and state management.

**Features:**
- Multi-agent orchestration
- Workflow definition and execution
- State persistence and recovery
- Agent communication patterns
- MCP tool registration

**Location:** [`packages/core`](packages/core)

### 2. Hub Dashboard (`@h4shed/skill-syncpulse-hub`)

Web-based dashboard for monitoring orchestration and managing workflows.

**Features:**
- Real-time workflow monitoring
- Agent status dashboard
- Workflow management UI
- Historical analytics
- Configuration management

**Location:** [`packages/hub`](packages/hub)

### 3. Workflows (`@h4shed/skill-syncpulse-workflows`)

Pre-built workflow templates and email integration patterns.

**Features:**
- Email template library
- Agent coordination patterns
- Common workflow definitions
- Integration patterns

**Location:** [`packages/workflows`](packages/workflows)

## Development

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Setup

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm run test

# Run linting and type checking
npm run lint
npm run typecheck
```

### Project Structure

```
syncpulse/
├── packages/
│   ├── core/              # Main orchestration engine
│   │   ├── src/
│   │   ├── __tests__/
│   │   ├── package.json
│   │   └── README.md
│   ├── hub/               # Web dashboard
│   │   ├── src/
│   │   ├── __tests__/
│   │   ├── package.json
│   │   └── README.md
│   └── workflows/         # Workflow templates
│       ├── src/
│       ├── __tests__/
│       ├── package.json
│       └── README.md
├── examples/              # Working examples
├── docs/                  # Documentation
│   ├── API.md
│   ├── INTEGRATION.md
│   ├── ARCHITECTURE.md
│   ├── DEPENDENCIES.md
│   └── EXAMPLES.md
├── scripts/               # Build and automation scripts
├── .github/workflows/     # CI/CD workflows
├── package.json           # Root workspace config
├── tsconfig.json          # TypeScript configuration
├── README.md              # This file
└── LICENSE                # Apache 2.0 license
```

## Documentation

- [API Reference](docs/API.md) — Complete API documentation
- [Integration Guide](docs/INTEGRATION.md) — MCP integration patterns
- [Architecture](docs/ARCHITECTURE.md) — System design overview
- [Examples](docs/EXAMPLES.md) — Working code examples
- [Dependencies](docs/DEPENDENCIES.md) — External dependencies

## Key Dependencies

### External Packages
- `@h4shed/mcp-core` — MCP runtime and tool registration
- `@h4shed/license-client` — License validation

### Development Dependencies
- TypeScript 5.3+
- Jest for testing
- ESLint for linting

See [DEPENDENCIES.md](docs/DEPENDENCIES.md) for complete details.

## Architecture

SyncPulse follows a modular monorepo structure:

1. **Core Package** — Pure orchestration logic, agent coordination, workflow execution
2. **Hub Package** — Dashboard and monitoring UI, depends on core
3. **Workflows Package** — Template library and patterns, depends on core
4. **MCP Integration** — Automatic tool registration for Claude ecosystem

All packages are independently versioned and published to npm under the `@h4shed` scope.

## MCP Integration

SyncPulse automatically registers tools with the MCP ecosystem:

```typescript
import * as syncpulse from '@h4shed/skill-syncpulse';

// In your MCP server initialization:
syncpulse.registerSyncPulseTools();

// Tools now available:
// - syncpulse_create_workflow
// - syncpulse_execute_workflow
// - syncpulse_get_workflow_status
// - syncpulse_list_workflows
// - ... more tools
```

## Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the **Apache License 2.0**. See [LICENSE](LICENSE) file for details.

## Support

- 📖 [Documentation](docs/)
- 🐛 [Issue Tracker](https://github.com/fused-gaming/syncpulse/issues)
- 💬 [Discussions](https://github.com/fused-gaming/syncpulse/discussions)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

---

**Built with ❤️ by the Fused Gaming team**
