# SyncPulse Claude Plugin

**Multi-agent orchestration and workflow coordination for Claude AI**

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Claude Compatible](https://img.shields.io/badge/Claude-Compatible-00a87e.svg)](https://claude.ai)
[![npm version](https://img.shields.io/badge/npm-@h4shed/claude--plugin--syncpulse-blue)](https://www.npmjs.com/package/@h4shed/claude-plugin-syncpulse)

This Claude plugin enables seamless integration of SyncPulse's powerful multi-agent orchestration capabilities within Claude conversations.

## Features

✨ **Multi-Agent Orchestration**
- Coordinate multiple AI agents for complex tasks
- Define custom agent roles and responsibilities
- Monitor agent interactions and state

🔄 **Workflow Management**
- Create and execute sophisticated workflows
- Support for sequential and parallel execution
- Built-in error handling and retry logic

📧 **Email Integration**
- Template-based email workflows
- Dynamic content substitution
- Integration with production email services

📊 **Monitoring & Dashboards**
- Real-time workflow status tracking
- Agent performance metrics
- Historical execution logs

🔐 **State Management**
- Persistent workflow state
- Automatic state recovery on failure
- Type-safe state transitions

## Quick Start

### Installation

```bash
npm install @h4shed/claude-plugin-syncpulse
```

### Basic Usage

```typescript
import { initializeSyncPulsePlugin, Orchestrator } from '@h4shed/claude-plugin-syncpulse';

// Initialize the plugin
const plugin = await initializeSyncPulsePlugin();

// Create an orchestrator instance
const orchestrator = new plugin.Orchestrator();

// Define a workflow
const workflow = {
  name: 'customer-support',
  steps: [
    { type: 'agent', agent: 'classifier', action: 'classify-ticket' },
    { type: 'agent', agent: 'responder', action: 'generate-response' },
    { type: 'email', template: 'ticket-resolved' }
  ]
};

// Execute workflow
const result = await orchestrator.executeWorkflow(workflow, {
  ticketId: 'TICKET-123',
  customerEmail: 'user@example.com'
});

console.log('Workflow executed:', result);
```

## Architecture

The plugin provides three main components:

### 1. Orchestrator
Central engine for workflow execution and agent coordination.

```typescript
import { Orchestrator } from '@h4shed/claude-plugin-syncpulse';

const orchestrator = new Orchestrator();
await orchestrator.registerAgent('processor', processorAgent);
await orchestrator.executeWorkflow(workflow, context);
```

### 2. Hub Dashboard
Monitoring and management interface for orchestration.

```typescript
import { SyncPulseHub } from '@h4shed/claude-plugin-syncpulse';

const hub = new SyncPulseHub();
const status = await hub.getOrchestratorStatus();
const workflows = await hub.listActiveWorkflows();
```

### 3. Workflows
Pre-built workflow templates and patterns.

```typescript
import * as Workflows from '@h4shed/claude-plugin-syncpulse';

const emailWorkflow = Workflows.createEmailWorkflow({
  template: 'task-completed',
  recipients: ['user@example.com']
});
```

## API Reference

### Orchestrator

**Methods:**
- `registerAgent(name, agent)` — Register a new agent
- `executeWorkflow(workflow, context)` — Execute a workflow
- `getWorkflowStatus(workflowId)` — Get workflow status
- `listWorkflows()` — List all workflows
- `cancelWorkflow(workflowId)` — Cancel a running workflow

### SyncPulseHub

**Methods:**
- `initializeHub()` — Initialize hub services
- `getOrchestratorStatus()` — Get orchestrator health
- `listActiveWorkflows()` — List running workflows
- `getWorkflowMetrics()` — Get performance metrics
- `validateDeployment()` — Validate deployment readiness

### Workflows

**Functions:**
- `createEmailWorkflow(config)` — Create email workflow
- `createAgentChain(agents)` — Create agent coordination chain
- `createParallelWorkflow(branches)` — Create parallel execution
- `renderTemplate(name, variables)` — Render email template

## Configuration

Create a `.syncpulse.config.ts` file to customize plugin behavior:

```typescript
import { loadConfig } from '@h4shed/claude-plugin-syncpulse';

export default loadConfig({
  orchestration: {
    maxConcurrentWorkflows: 50,
    maxAgentsPerWorkflow: 5,
    workflowTimeout: 1800000, // 30 minutes
  },
  email: {
    enabled: true,
    provider: 'nodemailer',
  },
  logging: {
    level: 'info',
    enableMetrics: true,
  },
});
```

## Environment Variables

```bash
# Email configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Orchestrator settings
WORKFLOW_TIMEOUT=3600000
MAX_AGENTS=10
MAX_WORKFLOWS=100

# Logging
LOG_LEVEL=info
LOG_FORMAT=json
```

## Examples

### Example 1: Customer Support Automation

```typescript
const supportWorkflow = {
  name: 'support-automation',
  steps: [
    {
      type: 'agent',
      agent: 'classifier',
      action: 'classify-support-ticket',
      params: { ticketId: '{{ ticketId }}' }
    },
    {
      type: 'agent',
      agent: 'responder',
      action: 'generate-response',
      params: { classification: '{{ classification }}' }
    },
    {
      type: 'email',
      template: 'support-response',
      params: {
        recipient: '{{ customerEmail }}',
        response: '{{ generatedResponse }}'
      }
    }
  ]
};

await orchestrator.executeWorkflow(supportWorkflow, {
  ticketId: 'TICKET-001',
  customerEmail: 'support@example.com',
  issue: 'Cannot login to account'
});
```

### Example 2: Multi-Agent Content Generation

```typescript
const contentWorkflow = {
  name: 'content-generation',
  steps: [
    {
      type: 'parallel',
      branches: [
        { agent: 'planner', action: 'create-outline' },
        { agent: 'researcher', action: 'gather-data' },
        { agent: 'designer', action: 'create-visuals' }
      ]
    },
    {
      type: 'agent',
      agent: 'writer',
      action: 'write-content',
      params: {
        outline: '{{ outline }}',
        research: '{{ research }}',
        visuals: '{{ visuals }}'
      }
    }
  ]
};
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

## Performance

SyncPulse is optimized for high performance:

- ⚡ Skill initialization: ~50-75ms
- 🚀 Tool creation: ~200+ ops/sec
- ✅ Schema validation: ~1000+ ops/sec
- 💾 Memory usage: ~75-100MB active

See [PERFORMANCE-BASELINES.md](../../PERFORMANCE-BASELINES.md) for detailed metrics.

## Troubleshooting

### Plugin won't initialize
Ensure all dependencies are installed:
```bash
npm install @h4shed/skill-syncpulse @h4shed/skill-syncpulse-hub @h4shed/skill-syncpulse-workflows
```

### Workflows timeout
Adjust the workflow timeout in configuration:
```typescript
loadConfig({
  orchestration: {
    workflowTimeout: 5400000 // 90 minutes
  }
});
```

### Email delivery issues
Verify SMTP configuration in environment variables:
```bash
echo $SMTP_HOST
echo $SMTP_PORT
echo $SMTP_USER
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## Support

- 📖 [Full Documentation](https://github.com/fused-gaming/syncpulse#readme)
- 🐛 [Issue Tracker](https://github.com/fused-gaming/syncpulse/issues)
- 💬 [Discussions](https://github.com/fused-gaming/syncpulse/discussions)
- 📧 [Email Support](mailto:support@vln.gg)

## License

Licensed under the Apache License 2.0. See [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by Fused Gaming**  
[GitHub](https://github.com/fused-gaming/syncpulse) • [npm](https://www.npmjs.com/package/@h4shed/claude-plugin-syncpulse)
