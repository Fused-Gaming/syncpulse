# SyncPulse API Reference

## Overview

SyncPulse provides a comprehensive API for orchestrating multi-agent workflows, managing agent coordination, and executing complex business processes.

## Core Exports

### From `@h4shed/skill-syncpulse`

#### Classes

- **Orchestrator** — Main orchestration engine for workflow execution
- **Workflow** — Workflow definition and execution manager
- **Agent** — Agent interface and coordination tools
- **StateManager** — Manages workflow and agent state
- **WorkflowExecutor** — Executes workflow steps sequentially or in parallel

#### Functions

- `registerSyncPulseTools()` — Registers MCP tools for Claude integration
- `createWorkflow(definition)` — Create a new workflow instance
- `executeWorkflow(workflow, context)` — Execute a workflow with given context

#### Types

- `WorkflowDefinition` — Workflow structure and configuration
- `WorkflowStep` — Individual step in a workflow
- `AgentState` — Agent status and state information
- `ExecutionContext` — Context passed through workflow execution

### From `@h4shed/skill-syncpulse-hub`

#### Classes

- **SyncPulseHub** — Central hub for orchestration management
- **OrchestrationEngine** — Multi-agent orchestration engine
- **PackageRegistry** — Registry of available packages and skills
- **DeploymentValidator** — Validates deployment readiness
- **UpdateChecker** — Checks for package updates

#### Functions

- `initializeHub()` — Initialize the SyncPulse hub
- `getOrchestratorStatus()` — Get current orchestrator status

### From `@h4shed/skill-syncpulse-workflows`

#### Functions

- `getTemplate(templateId)` — Retrieve email template by ID
- `renderTemplate(template, variables)` — Render template with variables
- `renderSubject(template, variables)` — Render email subject
- `getWorkflowPattern(patternId)` — Get predefined workflow pattern
- `createWorkflow(id, name, description, steps, options)` — Create custom workflow

#### Constants

- `emailTemplates` — All available email templates
- `workflowPatterns` — Common workflow patterns

## Usage Examples

### Basic Workflow Execution

```typescript
import { Orchestrator } from '@h4shed/skill-syncpulse';

const orchestrator = new Orchestrator();

const workflow = {
  name: 'simple-workflow',
  steps: [
    { type: 'agent', agent: 'processor', action: 'process' },
    { type: 'email', template: 'task-completed' }
  ]
};

await orchestrator.executeWorkflow(workflow, { taskId: '123' });
```

### Agent Coordination

```typescript
import { Agent } from '@h4shed/skill-syncpulse';

const agent = new Agent('task-processor');
agent.onMessage((message) => {
  console.log(`Received: ${message.type}`);
});

await agent.send({ type: 'process', data: { /* ... */ } });
```

### Email Workflows

```typescript
import { getTemplate, renderTemplate } from '@h4shed/skill-syncpulse-workflows';

const template = getTemplate('agent-summary');
const rendered = renderTemplate(template, {
  agentName: 'processor-1',
  taskCount: '42',
  successRate: '95'
});

console.log(rendered);
```

### Predefined Patterns

```typescript
import { getWorkflowPattern } from '@h4shed/skill-syncpulse-workflows';

// Get a predefined pattern
const pattern = getWorkflowPattern('parallel-analysis');

// Use it as base for custom workflow
const workflow = {
  ...pattern,
  id: 'custom-analysis'
};
```

## MCP Tool Registration

SyncPulse automatically registers tools with the MCP ecosystem:

```typescript
import { registerSyncPulseTools } from '@h4shed/skill-syncpulse';

// In your MCP server initialization:
registerSyncPulseTools();

// Tools now available to Claude:
// - syncpulse_create_workflow
// - syncpulse_execute_workflow
// - syncpulse_get_status
// - syncpulse_list_workflows
```

## Error Handling

All async operations throw errors that can be caught:

```typescript
try {
  await orchestrator.executeWorkflow(workflow, context);
} catch (error) {
  console.error('Workflow failed:', error.message);
  // Handle error based on workflow retry policy
}
```

## Type Definitions

See `packages/core/src/types.ts` for complete type definitions.

---

For integration patterns, see [INTEGRATION.md](INTEGRATION.md)
For architecture details, see [ARCHITECTURE.md](ARCHITECTURE.md)
