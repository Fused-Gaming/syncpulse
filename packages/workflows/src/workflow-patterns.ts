/**
 * Common workflow patterns and orchestration utilities
 */

export interface WorkflowStep {
  type: 'agent' | 'email' | 'conditional' | 'parallel';
  name: string;
  action?: string;
  template?: string;
  condition?: (context: any) => boolean;
  steps?: WorkflowStep[];
  agents?: string[];
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  onError?: 'continue' | 'retry' | 'abort';
  retryCount?: number;
}

/**
 * Common workflow patterns
 */
export const workflowPatterns = {
  /**
   * Sequential task execution with email notification
   */
  taskProcessingWithNotification: (): WorkflowDefinition => ({
    id: 'task-processing',
    name: 'Task Processing with Notification',
    description: 'Process a task and send completion notification',
    steps: [
      {
        type: 'agent',
        name: 'Process Task',
        action: 'process'
      },
      {
        type: 'agent',
        name: 'Validate Result',
        action: 'validate'
      },
      {
        type: 'email',
        name: 'Send Notification',
        template: 'task-completed'
      }
    ],
    onError: 'abort',
    retryCount: 1
  }),

  /**
   * Parallel agent execution
   */
  parallelAnalysis: (): WorkflowDefinition => ({
    id: 'parallel-analysis',
    name: 'Parallel Analysis',
    description: 'Execute analysis in parallel across multiple agents',
    steps: [
      {
        type: 'parallel',
        name: 'Parallel Analysis',
        agents: ['analyzer1', 'analyzer2', 'analyzer3'],
        steps: [
          {
            type: 'agent',
            name: 'Analyze',
            action: 'analyze'
          }
        ]
      },
      {
        type: 'agent',
        name: 'Aggregate Results',
        action: 'aggregate'
      },
      {
        type: 'email',
        name: 'Send Summary',
        template: 'agent-summary'
      }
    ]
  }),

  /**
   * Error handling with retry
   */
  resilientExecution: (): WorkflowDefinition => ({
    id: 'resilient-execution',
    name: 'Resilient Execution',
    description: 'Execute with automatic retry on failure',
    steps: [
      {
        type: 'agent',
        name: 'Execute Task',
        action: 'execute'
      }
    ],
    onError: 'retry',
    retryCount: 3
  }),

  /**
   * Conditional workflow execution
   */
  conditionalProcessing: (): WorkflowDefinition => ({
    id: 'conditional-processing',
    name: 'Conditional Processing',
    description: 'Execute different steps based on conditions',
    steps: [
      {
        type: 'agent',
        name: 'Assess Condition',
        action: 'assess'
      },
      {
        type: 'conditional',
        name: 'Route Based on Condition',
        condition: (context) => context.priority === 'high',
        steps: [
          {
            type: 'agent',
            name: 'High Priority Handler',
            action: 'handle-high-priority'
          }
        ]
      }
    ]
  })
};

/**
 * Get a workflow pattern by ID
 */
export function getWorkflowPattern(patternId: string): WorkflowDefinition | undefined {
  const patterns: Record<string, () => WorkflowDefinition> = {
    'task-processing': workflowPatterns.taskProcessingWithNotification,
    'parallel-analysis': workflowPatterns.parallelAnalysis,
    'resilient-execution': workflowPatterns.resilientExecution,
    'conditional-processing': workflowPatterns.conditionalProcessing
  };

  const factory = patterns[patternId];
  return factory ? factory() : undefined;
}

/**
 * Create a custom workflow from steps
 */
export function createWorkflow(
  id: string,
  name: string,
  description: string,
  steps: WorkflowStep[],
  options?: {
    onError?: 'continue' | 'retry' | 'abort';
    retryCount?: number;
  }
): WorkflowDefinition {
  return {
    id,
    name,
    description,
    steps,
    onError: options?.onError || 'abort',
    retryCount: options?.retryCount || 1
  };
}
