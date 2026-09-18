/**
 * SyncPulse Claude Plugin
 *
 * Main entry point for the SyncPulse Claude plugin, integrating
 * multi-agent orchestration capabilities with Claude AI.
 */

import { Orchestrator } from '@h4shed/skill-syncpulse';
import { SyncPulseHub } from '@h4shed/skill-syncpulse-hub';
import * as Workflows from '@h4shed/skill-syncpulse-workflows';

/**
 * Initialize the SyncPulse plugin for Claude
 * Registers all orchestration tools and capabilities
 */
export async function initializeSyncPulsePlugin() {
  try {
    // Initialize core orchestrator
    const orchestrator = new Orchestrator();

    // Initialize hub for dashboard and monitoring
    const hub = new SyncPulseHub();

    // Register all workflows
    const workflows = Workflows;

    return {
      orchestrator,
      hub,
      workflows,
      initialized: true,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    throw new Error(`Failed to initialize SyncPulse plugin: ${error}`);
  }
}

/**
 * Plugin metadata for marketplace registration
 */
export const pluginMetadata = {
  name: 'syncpulse-orchestrator',
  version: '1.0.0',
  description: 'Multi-agent orchestration and coordination for Claude',
  capabilities: {
    tools: 17,
    workflows: 'unlimited',
    agents: 'scalable',
  },
};

/**
 * Export core orchestrator class
 */
export { Orchestrator } from '@h4shed/skill-syncpulse';

/**
 * Export hub class for dashboard access
 */
export { SyncPulseHub } from '@h4shed/skill-syncpulse-hub';

/**
 * Export workflow utilities
 */
export * as Workflows from '@h4shed/skill-syncpulse-workflows';

// Default export
export default {
  initialize: initializeSyncPulsePlugin,
  metadata: pluginMetadata,
};
