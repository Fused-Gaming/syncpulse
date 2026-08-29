/**
 * Email template definitions for SyncPulse workflows
 * Used for notifications, summaries, and status reports
 */

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  html?: string;
  variables: string[];
}

export const emailTemplates: Record<string, EmailTemplate> = {
  agentSummary: {
    id: 'agent-summary',
    name: 'Agent Summary',
    subject: 'SyncPulse Agent Summary - {{date}}',
    body: 'Agent {{agentName}} completed {{taskCount}} tasks with {{successRate}}% success rate.',
    variables: ['agentName', 'taskCount', 'successRate', 'date']
  },

  syncNotification: {
    id: 'sync-notification',
    name: 'Sync Notification',
    subject: 'SyncPulse Sync Complete - {{workflowName}}',
    body: 'Workflow {{workflowName}} completed in {{duration}}ms with status: {{status}}',
    variables: ['workflowName', 'duration', 'status']
  },

  errorReport: {
    id: 'error-report',
    name: 'Error Report',
    subject: 'SyncPulse Error in {{workflowName}}',
    body: 'Workflow {{workflowName}} encountered error: {{errorMessage}}',
    variables: ['workflowName', 'errorMessage', 'timestamp']
  },

  taskCompleted: {
    id: 'task-completed',
    name: 'Task Completed',
    subject: 'Task {{taskId}} Completed',
    body: 'Task {{taskId}} has been completed successfully.',
    variables: ['taskId', 'taskName', 'completedAt']
  },

  workflowStarted: {
    id: 'workflow-started',
    name: 'Workflow Started',
    subject: 'Workflow {{workflowName}} Started',
    body: 'Workflow {{workflowName}} has been initiated.',
    variables: ['workflowName', 'startedAt', 'estimatedDuration']
  },

  workflowCompleted: {
    id: 'workflow-completed',
    name: 'Workflow Completed',
    subject: 'Workflow {{workflowName}} Completed',
    body: 'Workflow {{workflowName}} completed successfully.',
    variables: ['workflowName', 'completedAt', 'duration', 'resultsSummary']
  }
};

/**
 * Get a template by ID
 */
export function getTemplate(templateId: string): EmailTemplate | undefined {
  return emailTemplates[templateId];
}

/**
 * Render template with variables
 */
export function renderTemplate(template: EmailTemplate, variables: Record<string, string>): string {
  let rendered = template.body;

  for (const [key, value] of Object.entries(variables)) {
    rendered = rendered.replace(`{{${key}}}`, value);
  }

  return rendered;
}

/**
 * Render subject with variables
 */
export function renderSubject(template: EmailTemplate, variables: Record<string, string>): string {
  let rendered = template.subject;

  for (const [key, value] of Object.entries(variables)) {
    rendered = rendered.replace(`{{${key}}}`, value);
  }

  return rendered;
}
