/**
 * SyncPulse Claude Plugin
 *
 * Main entry point for the SyncPulse Claude plugin, integrating
 * multi-agent orchestration capabilities with Claude AI.
 *
 * This plugin provides lazy-loaded access to orchestration, hub,
 * and workflow capabilities to minimize startup overhead.
 */

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
 * Initialize the SyncPulse plugin for Claude
 * Registers all orchestration tools and capabilities
 */
export async function initializeSyncPulsePlugin() {
  try {
    // Lazy load packages to avoid import issues during build
    const { Orchestrator } = await import('@h4shed/skill-syncpulse');
    const { SyncPulseHub } = await import('@h4shed/skill-syncpulse-hub');
    const Workflows = await import('@h4shed/skill-syncpulse-workflows');

    // Initialize core orchestrator
    const orchestrator = new Orchestrator();

    // Initialize hub for dashboard and monitoring
    const hub = new SyncPulseHub();

    return {
      orchestrator,
      hub,
      workflows: Workflows,
      initialized: true,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    throw new Error(`Failed to initialize SyncPulse plugin: ${error}`);
  }
}

/**
 * Type-safe re-exports for development
 */
export type { Orchestrator } from '@h4shed/skill-syncpulse';
export type { SyncPulseHub } from '@h4shed/skill-syncpulse-hub';

// Default export
export default {
  initialize: initializeSyncPulsePlugin,
  metadata: pluginMetadata,
};
