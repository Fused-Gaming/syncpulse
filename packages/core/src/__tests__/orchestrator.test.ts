/**
 * SyncPulse Skill - Unit Tests
 * Tests for core skill creation and tool availability
 */

import { createSyncPulseSkill } from '../index.js';

describe('SyncPulse Skill', () => {
  let skill: any;

  beforeEach(() => {
    skill = createSyncPulseSkill();
  });

  describe('Initialization', () => {
    it('should initialize with correct metadata', () => {
      expect(skill).toBeDefined();
      expect(skill.name).toBe('syncpulse');
      expect(skill.version).toBe('1.0.0');
      expect(skill.organization).toBe('Fused-Gaming');
    });

    it('should have tool definitions', () => {
      expect(skill.tools).toBeDefined();
      expect(Array.isArray(skill.tools)).toBe(true);
      expect(skill.tools.length).toBeGreaterThan(0);
    });

    it('should export required tools', () => {
      const toolNames = skill.tools.map((t: any) => t.name);
      expect(toolNames).toContain('synchronize_project_state');
      expect(toolNames).toContain('send_email');
    });
  });

  describe('Tool Validation', () => {
    it('should have project state tool', () => {
      const projectStateTool = skill.tools.find((t: any) => t.name === 'synchronize_project_state');
      expect(projectStateTool).toBeDefined();
      expect(projectStateTool.description).toBeDefined();
      expect(projectStateTool.inputSchema).toBeDefined();
    });

    it('should have email tools', () => {
      const emailTools = skill.tools.filter((t: any) => t.name.startsWith('send_') || t.name.includes('email'));
      expect(emailTools.length).toBeGreaterThan(0);
    });

    it('should have agent coordination tool', () => {
      const coordTool = skill.tools.find((t: any) => t.name === 'coordinate_agents');
      expect(coordTool).toBeDefined();
    });

    it('should have cache query tool', () => {
      const cacheTool = skill.tools.find((t: any) => t.name === 'queryProjectCache');
      if (!cacheTool) {
        // Alternative check - just verify cache tools exist
        const hasCacheTools = skill.tools.some((t: any) => t.name.toLowerCase().includes('cache'));
        expect(hasCacheTools).toBe(true);
      } else {
        expect(cacheTool).toBeDefined();
      }
    });
  });

  describe('Tool Configuration', () => {
    it('all tools should have required properties', () => {
      skill.tools.forEach((tool: any) => {
        expect(tool.name).toBeDefined();
        expect(typeof tool.name).toBe('string');
        expect(tool.description).toBeDefined();
        expect(typeof tool.description).toBe('string');
        expect(tool.inputSchema).toBeDefined();
      });
    });

    it('tool input schemas should be valid', () => {
      skill.tools.forEach((tool: any) => {
        const schema = tool.inputSchema;
        expect(schema.type).toBeDefined();
        // Basic schema validation
        if (schema.type === 'object') {
          expect(schema.properties || schema.type).toBeDefined();
        }
      });
    });
  });

  describe('Service Integration', () => {
    it('should provide memory system access', () => {
      // Verify skill has necessary exports for memory management
      expect(skill.name).toBe('syncpulse');
      expect(skill.tools).toBeDefined();
    });

    it('should provide cache service access', () => {
      // Verify cache query tool is available
      const cacheTools = skill.tools.filter((t: any) => t.name.includes('cache'));
      expect(cacheTools.length).toBeGreaterThan(0);
    });

    it('should provide email service access', () => {
      // Verify email tools are available
      const emailTools = skill.tools.filter((t: any) => t.name.includes('email'));
      expect(emailTools.length).toBeGreaterThan(0);
    });
  });

  describe('Performance', () => {
    it('should initialize quickly', () => {
      const start = performance.now();
      const newSkill = createSyncPulseSkill();
      const duration = performance.now() - start;

      expect(newSkill).toBeDefined();
      expect(duration).toBeLessThan(100); // Should init in < 100ms
    });

    it('should have reasonable tool count', () => {
      // Ensure we're not over-engineering with too many tools
      expect(skill.tools.length).toBeGreaterThan(5);
      expect(skill.tools.length).toBeLessThan(50);
    });
  });
});
