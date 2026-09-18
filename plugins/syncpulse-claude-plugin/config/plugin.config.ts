/**
 * SyncPulse Claude Plugin Configuration
 *
 * Central configuration for plugin behavior, capabilities, and integration
 */

export interface PluginConfig {
  // Plugin metadata
  name: string;
  version: string;
  displayName: string;
  description: string;

  // Feature flags
  features: {
    orchestration: boolean;
    workflows: boolean;
    agentCoordination: boolean;
    emailIntegration: boolean;
    hubDashboard: boolean;
    stateManagement: boolean;
  };

  // Orchestration settings
  orchestration: {
    maxConcurrentWorkflows: number;
    maxAgentsPerWorkflow: number;
    workflowTimeout: number;
    retryAttempts: number;
  };

  // Email configuration
  email: {
    enabled: boolean;
    provider: 'nodemailer' | 'custom';
    templates: {
      taskCompleted: boolean;
      workflowError: boolean;
      agentUpdate: boolean;
    };
  };

  // API settings
  api: {
    rateLimit: number;
    timeout: number;
    retryPolicy: 'exponential' | 'linear';
  };

  // Logging configuration
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    format: 'json' | 'text';
    enableMetrics: boolean;
  };

  // Security settings
  security: {
    validateInput: boolean;
    sanitizeOutput: boolean;
    encryptState: boolean;
    requireAuth: boolean;
  };
}

/**
 * Default plugin configuration
 */
export const defaultConfig: PluginConfig = {
  name: 'syncpulse-orchestrator',
  version: '1.0.0',
  displayName: 'SyncPulse Orchestrator',
  description: 'Multi-agent orchestration and coordination for Claude',

  features: {
    orchestration: true,
    workflows: true,
    agentCoordination: true,
    emailIntegration: true,
    hubDashboard: true,
    stateManagement: true,
  },

  orchestration: {
    maxConcurrentWorkflows: 100,
    maxAgentsPerWorkflow: 10,
    workflowTimeout: 3600000, // 1 hour
    retryAttempts: 3,
  },

  email: {
    enabled: true,
    provider: 'nodemailer',
    templates: {
      taskCompleted: true,
      workflowError: true,
      agentUpdate: true,
    },
  },

  api: {
    rateLimit: 1000,
    timeout: 30000,
    retryPolicy: 'exponential',
  },

  logging: {
    level: 'info',
    format: 'json',
    enableMetrics: true,
  },

  security: {
    validateInput: true,
    sanitizeOutput: true,
    encryptState: false,
    requireAuth: false,
  },
};

/**
 * Load configuration from environment or use defaults
 */
export function loadConfig(overrides?: Partial<PluginConfig>): PluginConfig {
  return {
    ...defaultConfig,
    ...overrides,
  };
}

/**
 * Validate configuration
 */
export function validateConfig(config: PluginConfig): boolean {
  // Validate orchestration limits
  if (config.orchestration.maxConcurrentWorkflows < 1) {
    return false;
  }

  if (config.orchestration.maxAgentsPerWorkflow < 1) {
    return false;
  }

  // Validate timeouts
  if (config.orchestration.workflowTimeout < 1000) {
    return false;
  }

  if (config.api.timeout < 1000) {
    return false;
  }

  // Validate retry attempts
  if (config.orchestration.retryAttempts < 0) {
    return false;
  }

  return true;
}

export default defaultConfig;
