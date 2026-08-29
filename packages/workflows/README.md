# SyncPulse Workflows

Pre-built workflow templates and email integration patterns for SyncPulse multi-agent orchestration.

## Features

- **Email Templates** — Standard templates for notifications and updates
- **Workflow Patterns** — Common orchestration patterns ready to use
- **Template Rendering** — Variable substitution and formatting utilities
- **Extensible** — Easy to create custom templates and patterns

## Installation

```bash
npm install @h4shed/skill-syncpulse-workflows
```

## Quick Start

### Using Email Templates

```typescript
import { getTemplate, renderTemplate } from '@h4shed/skill-syncpulse-workflows';

const template = getTemplate('task-completed');
const rendered = renderTemplate(template, {
  taskId: 'task-123',
  taskName: 'Data Processing',
  completedAt: new Date().toISOString()
});

console.log(rendered); // Rendered email body
```

### Using Workflow Patterns

```typescript
import { getWorkflowPattern } from '@h4shed/skill-syncpulse-workflows';

const pattern = getWorkflowPattern('parallel-analysis');
// Use pattern as base for your workflow
```

## Available Templates

### Email Templates

- **agent-summary** — Agent execution summary
- **sync-notification** — Workflow sync notification
- **error-report** — Error and failure reporting
- **task-completed** — Task completion notification
- **workflow-started** — Workflow initialization notice
- **workflow-completed** — Workflow completion summary

See [API.md](../../docs/API.md) for complete template details.

## Available Patterns

- **task-processing-with-notification** — Process task → Validate → Notify
- **parallel-analysis** — Execute analysis in parallel → Aggregate → Report
- **resilient-execution** — Execute with automatic retry
- **conditional-processing** — Route based on conditions

See [INTEGRATION.md](../../docs/INTEGRATION.md) for pattern usage.

## Usage Examples

### Render Email Template

```typescript
import { getTemplate, renderSubject, renderTemplate } from '@h4shed/skill-syncpulse-workflows';

const template = getTemplate('agent-summary');

const subject = renderSubject(template, {
  date: new Date().toLocaleDateString()
});

const body = renderTemplate(template, {
  agentName: 'processor-1',
  taskCount: '42',
  successRate: '95'
});

console.log('Subject:', subject);
console.log('Body:', body);
```

### Create Custom Workflow

```typescript
import { createWorkflow } from '@h4shed/skill-syncpulse-workflows';

const workflow = createWorkflow(
  'custom-workflow',
  'My Custom Workflow',
  'A workflow I created',
  [
    {
      type: 'agent',
      name: 'Process',
      action: 'process'
    },
    {
      type: 'email',
      name: 'Notify',
      template: 'task-completed'
    }
  ],
  {
    onError: 'retry',
    retryCount: 3
  }
);
```

## Development

### Build

```bash
npm run build -w @h4shed/skill-syncpulse-workflows
```

### Test

```bash
npm test -w @h4shed/skill-syncpulse-workflows
```

### Watch Mode

```bash
npm run dev -w @h4shed/skill-syncpulse-workflows
```

## API

See [API.md](../../docs/API.md) for complete API reference.

## License

Apache-2.0

## Related

- [@h4shed/skill-syncpulse](../core) — Core orchestration engine
- [@h4shed/skill-syncpulse-hub](../hub) — Hub dashboard
