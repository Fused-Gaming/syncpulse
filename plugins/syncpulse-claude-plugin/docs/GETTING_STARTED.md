# Getting Started with SyncPulse Claude Plugin

This guide will walk you through installing, configuring, and using the SyncPulse Claude plugin.

## Installation

### Prerequisites
- Node.js 20.0.0 or later
- npm 10.0.0 or later
- Claude AI access (Sonnet 5, Opus 5, or Haiku 4.5)

### Step 1: Install the Plugin

```bash
npm install @h4shed/claude-plugin-syncpulse
```

### Step 2: Import and Initialize

```typescript
import { initializeSyncPulsePlugin } from '@h4shed/claude-plugin-syncpulse';

const plugin = await initializeSyncPulsePlugin();
console.log('SyncPulse plugin initialized:', plugin.initialized);
```

### Step 3: Verify Installation

```bash
npm test
npm run typecheck
```

All tests should pass and type checking should report no errors.

## Basic Configuration

Create a configuration file to customize plugin behavior:

```typescript
// .syncpulse.config.ts
import { loadConfig } from '@h4shed/claude-plugin-syncpulse';

export default loadConfig({
  features: {
    orchestration: true,
    workflows: true,
    emailIntegration: true,
    hubDashboard: true,
  },
  orchestration: {
    maxConcurrentWorkflows: 50,
    maxAgentsPerWorkflow: 10,
    workflowTimeout: 3600000,
  },
  logging: {
    level: 'info',
    enableMetrics: true,
  },
});
```

## First Workflow

Create your first workflow to verify everything works:

```typescript
import { Orchestrator } from '@h4shed/claude-plugin-syncpulse';

// Initialize orchestrator
const orchestrator = new Orchestrator();

// Define a simple workflow
const workflow = {
  name: 'hello-world',
  steps: [
    {
      type: 'agent',
      agent: 'greeting-agent',
      action: 'greet',
      params: { name: 'Claude' }
    }
  ]
};

// Execute workflow
try {
  const result = await orchestrator.executeWorkflow(workflow, {
    name: 'Claude'
  });
  console.log('Workflow result:', result);
} catch (error) {
  console.error('Workflow failed:', error);
}
```

## Environment Setup

### Email Configuration (Optional)

To enable email functionality, set these environment variables:

```bash
# Gmail SMTP (recommended for testing)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # Use app password, not account password

# Or use your own SMTP server
SMTP_HOST=mail.example.com
SMTP_PORT=587
SMTP_USER=noreply@example.com
SMTP_PASS=your-password
```

### Logging Configuration

```bash
# Set logging level
LOG_LEVEL=debug    # debug, info, warn, error

# Set log format
LOG_FORMAT=json    # json, text

# Enable metrics collection
ENABLE_METRICS=true
```

## Common Use Cases

### 1. Simple Agent Task Execution

```typescript
const workflow = {
  name: 'analyze-text',
  steps: [
    {
      type: 'agent',
      agent: 'text-analyzer',
      action: 'analyze',
      params: { text: 'Input text to analyze' }
    }
  ]
};
```

### 2. Sequential Workflow

```typescript
const workflow = {
  name: 'sequential-processing',
  steps: [
    { type: 'agent', agent: 'parser', action: 'parse' },
    { type: 'agent', agent: 'validator', action: 'validate' },
    { type: 'agent', agent: 'formatter', action: 'format' }
  ]
};
```

### 3. Parallel Workflow

```typescript
const workflow = {
  name: 'parallel-analysis',
  steps: [
    {
      type: 'parallel',
      branches: [
        { agent: 'analyzer-1', action: 'analyze-aspect-1' },
        { agent: 'analyzer-2', action: 'analyze-aspect-2' },
        { agent: 'analyzer-3', action: 'analyze-aspect-3' }
      ]
    }
  ]
};
```

### 4. Email Integration

```typescript
const workflow = {
  name: 'email-notification',
  steps: [
    { type: 'agent', agent: 'processor', action: 'process' },
    {
      type: 'email',
      template: 'task-completed',
      params: {
        recipient: 'user@example.com',
        subject: 'Task Completed',
        variables: { taskName: 'Analysis' }
      }
    }
  ]
};
```

## Debugging

### Enable Debug Logging

```typescript
import { loadConfig } from '@h4shed/claude-plugin-syncpulse';

const config = loadConfig({
  logging: {
    level: 'debug',
    format: 'text',
    enableMetrics: true
  }
});
```

### Monitor Workflow Execution

```typescript
const orchestrator = new Orchestrator();

// Get workflow status
const status = await orchestrator.getWorkflowStatus(workflowId);
console.log('Workflow status:', status);

// List all workflows
const workflows = await orchestrator.listWorkflows();
console.log('Active workflows:', workflows);
```

### View Error Details

```typescript
try {
  await orchestrator.executeWorkflow(workflow, context);
} catch (error) {
  console.error('Error type:', error.constructor.name);
  console.error('Error message:', error.message);
  console.error('Error stack:', error.stack);
}
```

## Performance Tips

1. **Limit concurrent workflows** — Set reasonable limits in config
2. **Use appropriate timeouts** — Don't set timeouts too low
3. **Enable metrics** — Monitor performance in production
4. **Cache workflow definitions** — Avoid recreating workflows frequently
5. **Use parallel execution** — When agents are independent

## Troubleshooting

### Plugin fails to initialize

**Error:** "Cannot find module '@h4shed/skill-syncpulse'"

**Solution:** Ensure dependencies are installed:
```bash
npm install @h4shed/skill-syncpulse @h4shed/skill-syncpulse-hub @h4shed/skill-syncpulse-workflows
```

### Workflow timeout

**Error:** "Workflow execution timed out"

**Solution:** Increase workflow timeout in config:
```typescript
loadConfig({
  orchestration: {
    workflowTimeout: 7200000 // 2 hours
  }
});
```

### Email delivery fails

**Error:** "Failed to send email"

**Solution:** Verify SMTP settings:
```bash
# Test SMTP connection
npm run test -- email.test.ts

# Check environment variables
echo $SMTP_HOST
echo $SMTP_USER
```

### Type checking errors

**Error:** "Cannot find type definition for 'X'"

**Solution:** Install type definitions:
```bash
npm install --save-dev @types/node @types/jest
```

## Next Steps

- Read [API Reference](../README.md#api-reference)
- Check [Examples](../README.md#examples)
- Review [Performance Guidelines](../../PERFORMANCE-BASELINES.md)
- Explore [Configuration Options](../config/plugin.config.ts)

## Getting Help

- 📖 [Documentation](../README.md)
- 🐛 [Report Issues](https://github.com/fused-gaming/syncpulse/issues)
- 💬 [Ask Questions](https://github.com/fused-gaming/syncpulse/discussions)
- 📧 [Email Support](mailto:support@fused-gaming.com)

---

Happy orchestrating! 🚀
