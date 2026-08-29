# SyncPulse Usage Examples

## Installation

```bash
npm install @h4shed/skill-syncpulse
npm install @h4shed/skill-syncpulse-hub
npm install @h4shed/skill-syncpulse-workflows
```

## Basic Examples

### 1. Simple Workflow Execution

```typescript
import { Orchestrator } from '@h4shed/skill-syncpulse';

async function main() {
  const orchestrator = new Orchestrator();

  const workflow = {
    name: 'greet-user',
    description: 'Greet a user',
    steps: [
      {
        type: 'agent',
        name: 'greeting',
        agent: 'greeter',
        action: 'greet'
      }
    ]
  };

  try {
    const result = await orchestrator.executeWorkflow(workflow, {
      userName: 'Alice',
      greeting: 'Hello'
    });
    
    console.log('Workflow completed:', result);
  } catch (error) {
    console.error('Workflow failed:', error);
  }
}

main();
```

### 2. Multi-Step Workflow

```typescript
import { Orchestrator } from '@h4shed/skill-syncpulse';

async function processTask() {
  const orchestrator = new Orchestrator();

  const workflow = {
    name: 'task-processing',
    description: 'Process and validate a task',
    steps: [
      {
        type: 'agent',
        name: 'Process',
        agent: 'processor',
        action: 'process',
        input: { taskData: 'raw-data' }
      },
      {
        type: 'agent',
        name: 'Validate',
        agent: 'validator',
        action: 'validate'
      },
      {
        type: 'email',
        name: 'Send Confirmation',
        template: 'task-completed'
      }
    ]
  };

  const result = await orchestrator.executeWorkflow(workflow, {
    taskId: 'task-123',
    taskName: 'Data Processing'
  });

  console.log('Task processed:', result);
}

processTask();
```

### 3. Parallel Execution

```typescript
import { Orchestrator } from '@h4shed/skill-syncpulse';

async function parallelAnalysis() {
  const orchestrator = new Orchestrator();

  const workflow = {
    name: 'parallel-analysis',
    description: 'Analyze data in parallel',
    steps: [
      {
        type: 'parallel',
        name: 'Parallel Analysis',
        agents: ['analyzer-1', 'analyzer-2', 'analyzer-3'],
        steps: [
          {
            type: 'agent',
            agent: '{agent}',
            action: 'analyze',
            input: { dataSet: 'dataset-1' }
          }
        ]
      },
      {
        type: 'agent',
        name: 'Aggregate Results',
        agent: 'aggregator',
        action: 'combine'
      }
    ]
  };

  const result = await orchestrator.executeWorkflow(workflow, {
    dataSet: 'dataset-1'
  });

  console.log('Analysis complete:', result);
}

parallelAnalysis();
```

## Workflow Patterns

### 4. Using Pre-built Patterns

```typescript
import { getWorkflowPattern } from '@h4shed/skill-syncpulse-workflows';
import { Orchestrator } from '@h4shed/skill-syncpulse';

async function usePattern() {
  const orchestrator = new Orchestrator();

  // Get a predefined pattern
  const pattern = getWorkflowPattern('task-processing');

  // Customize it
  const customWorkflow = {
    ...pattern,
    id: 'my-custom-task-processing',
    name: 'Custom Task Processing'
  };

  const result = await orchestrator.executeWorkflow(customWorkflow, {
    taskId: 'task-456',
    taskName: 'Important Task'
  });

  console.log('Result:', result);
}

usePattern();
```

### 5. Conditional Workflow

```typescript
import { Orchestrator } from '@h4shed/skill-syncpulse';

async function conditionalFlow() {
  const orchestrator = new Orchestrator();

  const workflow = {
    name: 'conditional-processing',
    description: 'Route based on priority',
    steps: [
      {
        type: 'agent',
        name: 'Assess Priority',
        agent: 'assessor',
        action: 'assess-priority'
      },
      {
        type: 'conditional',
        name: 'Route by Priority',
        condition: (context) => context.priority === 'high',
        steps: [
          {
            type: 'agent',
            name: 'High Priority Handler',
            agent: 'priority-handler',
            action: 'handle-high-priority'
          }
        ]
      },
      {
        type: 'conditional',
        name: 'Normal Priority',
        condition: (context) => context.priority === 'normal',
        steps: [
          {
            type: 'agent',
            name: 'Normal Handler',
            agent: 'normal-handler',
            action: 'handle-normal'
          }
        ]
      }
    ]
  };

  const result = await orchestrator.executeWorkflow(workflow, {
    priority: 'high',
    taskId: 'task-789'
  });

  console.log('Conditional result:', result);
}

conditionalFlow();
```

## Email Integration

### 6. Email Notifications

```typescript
import {
  getTemplate,
  renderTemplate,
  renderSubject
} from '@h4shed/skill-syncpulse-workflows';

async function sendNotification() {
  // Get email template
  const template = getTemplate('task-completed');

  if (!template) {
    throw new Error('Template not found');
  }

  // Prepare variables
  const variables = {
    taskId: 'task-123',
    taskName: 'Data Processing',
    completedAt: new Date().toISOString()
  };

  // Render template
  const subject = renderSubject(template, variables);
  const body = renderTemplate(template, variables);

  console.log('Subject:', subject);
  console.log('Body:', body);

  // Send email (integrate with nodemailer)
  // await sendEmail({ subject, body, to: recipient });
}

sendNotification();
```

### 7. Custom Email Template

```typescript
import { EmailTemplate, renderTemplate } from '@h4shed/skill-syncpulse-workflows';

async function customEmail() {
  const customTemplate: EmailTemplate = {
    id: 'custom-notification',
    name: 'Custom Notification',
    subject: 'Status Update: {{projectName}}',
    body: 'Project {{projectName}} is {{status}}. Progress: {{progress}}%',
    variables: ['projectName', 'status', 'progress']
  };

  const rendered = renderTemplate(customTemplate, {
    projectName: 'My Project',
    status: 'in progress',
    progress: '75'
  });

  console.log('Rendered:', rendered);
}

customEmail();
```

## MCP Integration

### 8. Claude Integration

```typescript
import { Anthropic } from '@anthropic-ai/sdk';
import { registerSyncPulseTools } from '@h4shed/skill-syncpulse';

async function claudeIntegration() {
  // Initialize MCP and register SyncPulse tools
  registerSyncPulseTools();

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
            workflowId: {
              type: 'string',
              description: 'ID of workflow to execute'
            },
            context: {
              type: 'object',
              description: 'Execution context'
            }
          },
          required: ['workflowId']
        }
      }
    ],
    messages: [
      {
        role: 'user',
        content: 'Execute the task processing workflow for task-123'
      }
    ]
  });

  console.log('Claude response:', message);
}

claudeIntegration();
```

## Advanced Examples

### 9. Error Handling and Retry

```typescript
import { Orchestrator } from '@h4shed/skill-syncpulse';

async function resilientWorkflow() {
  const orchestrator = new Orchestrator();

  const workflow = {
    name: 'resilient-execution',
    description: 'Execute with retry on failure',
    steps: [
      {
        type: 'agent',
        name: 'Risky Operation',
        agent: 'service',
        action: 'call-external-api'
      }
    ],
    onError: 'retry',
    retryCount: 3
  };

  try {
    const result = await orchestrator.executeWorkflow(workflow, {
      apiUrl: 'https://api.example.com'
    });
    console.log('Success:', result);
  } catch (error) {
    console.error('Failed after retries:', error);
  }
}

resilientWorkflow();
```

### 10. Monitoring Workflow Progress

```typescript
import { Orchestrator } from '@h4shed/skill-syncpulse';

async function monitoredWorkflow() {
  const orchestrator = new Orchestrator();

  // Subscribe to events
  orchestrator.on('step-started', (event) => {
    console.log(`Step started: ${event.stepName}`);
  });

  orchestrator.on('step-completed', (event) => {
    console.log(`Step completed: ${event.stepName} (${event.duration}ms)`);
  });

  orchestrator.on('step-failed', (event) => {
    console.error(`Step failed: ${event.stepName}`, event.error);
  });

  const workflow = {
    name: 'monitored-workflow',
    steps: [
      { type: 'agent', agent: 'worker', action: 'work' }
    ]
  };

  const result = await orchestrator.executeWorkflow(workflow, {});
  console.log('Workflow completed:', result);
}

monitoredWorkflow();
```

## Complete Example

### 11. Production Setup

```typescript
import { Orchestrator } from '@h4shed/skill-syncpulse';
import { SyncPulseHub } from '@h4shed/syncpulse-hub';
import { getWorkflowPattern } from '@h4shed/skill-syncpulse-workflows';

async function productionSetup() {
  // Initialize orchestrator with configuration
  const orchestrator = new Orchestrator({
    email: {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    },
    persistence: {
      type: 'postgresql',
      connectionString: process.env.DATABASE_URL
    }
  });

  // Register custom agents
  orchestrator.registerAgent({
    id: 'data-processor',
    execute: async (action, context) => {
      // Custom logic
      return { success: true, data: [] };
    }
  });

  // Initialize hub for monitoring
  const hub = new SyncPulseHub({ orchestrator, port: 3000 });
  await hub.start();

  console.log('SyncPulse Hub running on http://localhost:3000');

  // Execute workflows
  const pattern = getWorkflowPattern('task-processing');
  const result = await orchestrator.executeWorkflow(pattern, {
    taskId: 'task-123'
  });

  console.log('Execution result:', result);
}

productionSetup().catch(console.error);
```

---

For API reference, see [API.md](API.md)
For integration details, see [INTEGRATION.md](INTEGRATION.md)
