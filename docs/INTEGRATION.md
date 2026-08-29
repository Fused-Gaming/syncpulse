# SyncPulse Integration Guide

## MCP Integration

SyncPulse integrates seamlessly with the Anthropic MCP (Model Context Protocol) ecosystem.

### Automatic Tool Registration

SyncPulse automatically registers tools with MCP when initialized:

```typescript
import { registerSyncPulseTools } from '@h4shed/skill-syncpulse';

// In your MCP server setup:
const server = new MCPServer();
registerSyncPulseTools();
```

### Available Tools

#### 1. `syncpulse_create_workflow`
Create and register a new workflow.

**Input:**
```typescript
{
  name: string;
  description: string;
  steps: WorkflowStep[];
}
```

**Output:**
```typescript
{
  workflowId: string;
  createdAt: string;
  status: 'active';
}
```

#### 2. `syncpulse_execute_workflow`
Execute a registered workflow.

**Input:**
```typescript
{
  workflowId: string;
  context: Record<string, any>;
  agents?: string[];
}
```

**Output:**
```typescript
{
  executionId: string;
  workflowId: string;
  status: 'running' | 'completed' | 'failed';
  result?: any;
}
```

#### 3. `syncpulse_get_workflow_status`
Get current status of a workflow execution.

**Input:**
```typescript
{
  executionId: string;
}
```

**Output:**
```typescript
{
  executionId: string;
  workflowId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number; // 0-100
  currentStep: string;
  error?: string;
}
```

#### 4. `syncpulse_list_workflows`
List all registered workflows.

**Output:**
```typescript
{
  workflows: WorkflowDefinition[];
  count: number;
}
```

### Integration Example

```typescript
// With Claude API
const client = new Anthropic();

const message = await client.messages.create({
  model: 'claude-opus-5',
  max_tokens: 1024,
  tools: [
    {
      name: 'syncpulse_execute_workflow',
      description: 'Execute a SyncPulse workflow',
      input_schema: {
        type: 'object',
        properties: {
          workflowId: { type: 'string' },
          context: { type: 'object' }
        }
      }
    }
  ],
  messages: [
    {
      role: 'user',
      content: 'Execute the parallel analysis workflow'
    }
  ]
});

// Handle tool use in the response
for (const block of message.content) {
  if (block.type === 'tool_use') {
    const result = await executeToolCall(block);
    // Continue conversation with result
  }
}
```

## Dependency Integration

### Core Dependencies

SyncPulse depends on:

- **@h4shed/mcp-core** — MCP runtime and tool registration framework
- **@h4shed/license-client** — License validation and compliance tracking

These are installed automatically as peer dependencies.

### Email Integration

To enable email notifications in workflows, install `nodemailer`:

```bash
npm install nodemailer
```

Configure email in your orchestrator:

```typescript
import { Orchestrator } from '@h4shed/skill-syncpulse';

const orchestrator = new Orchestrator({
  email: {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  }
});
```

## Workflow Integration

### Custom Steps

Extend SyncPulse with custom workflow steps:

```typescript
class CustomStep implements WorkflowStep {
  type: 'custom';
  name: string;
  async execute(context: ExecutionContext) {
    // Your custom logic
  }
}
```

### Agent Integration

Integrate external agents into workflows:

```typescript
orchestrator.registerAgent({
  id: 'external-agent',
  name: 'External Analysis Agent',
  execute: async (action, context) => {
    // Call external agent API
    const result = await externalAgentAPI.call(action, context);
    return result;
  }
});
```

### State Persistence

Persist workflow state to external storage:

```typescript
import { StateManager } from '@h4shed/skill-syncpulse';

const stateManager = new StateManager({
  backend: 'postgresql',
  connectionString: process.env.DATABASE_URL
});

orchestrator.setStateManager(stateManager);
```

## Hub Integration

The SyncPulse Hub provides a centralized interface for orchestration:

```typescript
import { SyncPulseHub } from '@h4shed/syncpulse-hub';

const hub = new SyncPulseHub({
  orchestrator,
  port: 3000
});

await hub.start();
// Now available at http://localhost:3000
```

## Monitoring and Analytics

Track workflow execution metrics:

```typescript
orchestrator.on('workflow-completed', (event) => {
  console.log(`Workflow ${event.workflowId} completed in ${event.duration}ms`);
  
  // Send to analytics service
  analytics.track('workflow_completed', {
    workflowId: event.workflowId,
    duration: event.duration,
    status: event.status
  });
});
```

## Testing

Use the test utilities to mock workflows:

```typescript
import { MockOrchestrator } from '@h4shed/skill-syncpulse/testing';

const orchestrator = new MockOrchestrator();
const result = await orchestrator.executeWorkflow(workflow, context);

expect(result.status).toBe('completed');
```

---

For API details, see [API.md](API.md)
For architecture, see [ARCHITECTURE.md](ARCHITECTURE.md)
