# SyncPulse Architecture

## System Overview

SyncPulse is a multi-agent orchestration platform designed for autonomous workflow execution and coordination. The system is organized into three main packages:

```
┌─────────────────────────────────────────┐
│         MCP Integration Layer            │
│  (Claude, Tool Registration, Events)    │
└──────────────┬──────────────────────────┘
               │
     ┌─────────┴─────────┬─────────┐
     │                   │         │
┌────▼─────────┐  ┌──────▼──────┐ │
│  Orchestrator │  │  Hub UI     │ │
│  (Core Logic) │  │  (Dashboard)│ │
└────┬─────────┘  └──────┬──────┘ │
     │                   │         │
     └─────────┬─────────┴────┬────┘
               │              │
         ┌─────▼──────┐  ┌────▼─────┐
         │ Workflows  │  │ Templates │
         │ & Patterns │  │ & Patterns│
         └─────┬──────┘  └────┬─────┘
               │              │
         ┌─────▼──────────────▼────┐
         │   Email & State         │
         │   Management Layer      │
         └─────┬──────────────┬────┘
               │              │
         ┌─────▼──────┐  ┌────▼──────┐
         │ Agent State│  │ Persistence│
         │ Management │  │ (Database) │
         └────────────┘  └───────────┘
```

## Package Responsibilities

### 1. Core Package (`@h4shed/skill-syncpulse`)

**Responsibility:** Multi-agent orchestration engine

**Key Components:**
- **Orchestrator** — Central coordination engine for workflows
- **Workflow** — Workflow definition, validation, and execution
- **Agent** — Agent interface and communication protocol
- **StateManager** — Manages agent state and persistence
- **WorkflowExecutor** — Executes steps sequentially or in parallel
- **MCP Adapter** — Integration with Anthropic MCP

**File Structure:**
```
packages/core/src/
├── orchestrator.ts       # Main orchestration engine
├── workflow.ts           # Workflow definitions and execution
├── agent.ts              # Agent protocol and communication
├── state-management.ts   # State persistence and recovery
├── executor.ts           # Step execution engine
├── mcp-adapter.ts        # MCP tool registration
├── types.ts              # TypeScript definitions
└── index.ts              # Public API exports
```

**Responsibility Matrix:**
- Creates and manages workflows
- Coordinates multi-agent execution
- Maintains workflow and agent state
- Provides MCP tool interface
- Handles errors and retries

### 2. Hub Package (`@h4shed/skill-syncpulse-hub`)

**Responsibility:** Centralized orchestration dashboard and management

**Key Components:**
- **SyncPulseHub** — Central hub for orchestration
- **OrchestrationEngine** — Multi-agent coordination engine
- **PackageRegistry** — Registry of available packages
- **DeploymentValidator** — Validates deployment readiness
- **UpdateChecker** — Checks for package updates

**File Structure:**
```
packages/hub/src/
├── index.ts                  # Hub initialization
├── hub.ts                    # Central hub implementation
├── orchestration/
│   └── OrchestrationEngine.ts
├── ecosystem/
│   └── PackageRegistry.ts
├── validation/
│   └── DeploymentValidator.ts
├── updates/
│   └── UpdateChecker.ts
└── public/                   # Web UI assets
```

**Responsibility Matrix:**
- Provides web dashboard UI
- Monitors workflow execution
- Manages package ecosystem
- Validates deployments
- Checks for updates

### 3. Workflows Package (`@h4shed/skill-syncpulse-workflows`)

**Responsibility:** Pre-built workflow templates and patterns

**Key Components:**
- **Email Templates** — Standard email notification templates
- **Workflow Patterns** — Common orchestration patterns
- **Template Rendering** — Variable substitution and formatting

**File Structure:**
```
packages/workflows/src/
├── email-templates.ts    # Email template library
├── workflow-patterns.ts  # Common workflow definitions
└── index.ts              # Public exports
```

**Pre-built Patterns:**
1. Task Processing with Notification
2. Parallel Analysis
3. Resilient Execution (with retry)
4. Conditional Processing
5. Email-triggered Workflows

**Responsibility Matrix:**
- Provides template library
- Defines common patterns
- Enables template rendering
- Facilitates workflow reuse

## Data Flow

### Workflow Execution Flow

```
User Request
    │
    ▼
┌─────────────────────────┐
│ Orchestrator.execute()  │
└────────┬────────────────┘
         │
         ▼
    ┌────────────┐
    │Validate WF │
    └────┬───────┘
         │
         ▼
    ┌────────────┐         ┌──────────────┐
    │Execute Step├────────▶│Agent Handler │
    │  (Seq/Par) │         └──────┬───────┘
    └────┬───────┘                │
         │◀───────────────────────┘
         │
         ▼
    ┌────────────────┐
    │Update State    │
    │& Persistence   │
    └────┬───────────┘
         │
         ▼
    ┌────────────────┐
    │On Step Error?  │
    └────┬───────────┘
         │
    ┌────┴────┐
    │          │
    ▼          ▼
  Retry   Continue/Abort
    │          │
    └────┬─────┘
         │
         ▼
    ┌────────────────┐
    │Return Result   │
    └────────────────┘
```

### State Management Flow

```
Workflow Execution
    │
    ├─▶ Agent State      ──▶ StateManager ──▶ Persistence Layer
    │
    ├─▶ Step Results     ──▶ StateManager ──▶ Persistence Layer
    │
    └─▶ Error Context    ──▶ StateManager ──▶ Persistence Layer
```

## Communication Patterns

### Agent-to-Agent Communication

Agents communicate through the orchestrator:

```
Agent A ──request──▶ Orchestrator ──route──▶ Agent B
Agent A ◀─response─ Orchestrator ◀─result─ Agent B
```

### Agent-to-MCP Communication

SyncPulse tools registered with MCP:

```
Claude ──tool call──▶ MCP ──dispatch──▶ SyncPulse Tool
Claude ◀─result────── MCP ◀──return── SyncPulse Tool
```

## Error Handling Strategy

```
Execution Error
    │
    ├─▶ Is Retriable?
    │       │
    │       ├─▶ Yes: Increment Retry Counter
    │       │       │
    │       │       ├─▶ Max Retries?
    │       │       │       │
    │       │       │       ├─▶ No: Retry Step
    │       │       │       └─▶ Yes: Handle as Failure
    │       │       │
    │       │       └─▶ Update State
    │       │
    │       └─▶ No: Immediate Failure
    │
    ├─▶ Send Error Notification (Email)
    │
    ├─▶ Update Workflow Status
    │
    └─▶ Log Error Details
```

## Concurrency Model

SyncPulse supports multiple execution models:

1. **Sequential** — Steps execute one after another
2. **Parallel** — Multiple steps execute concurrently
3. **Fan-out/Fan-in** — Distribute work to agents, collect results
4. **Conditional** — Different paths based on conditions

## Persistence Layer

State is persisted to support:

- **Resumption** — Resume failed workflows
- **Auditing** — Track all workflow executions
- **Analytics** — Analyze workflow performance
- **Compliance** — Maintain audit trail

Optional backends:
- In-memory (development)
- PostgreSQL (production)
- MongoDB (alternative)

## Security Considerations

1. **Agent Isolation** — Agents run in isolated contexts
2. **State Encryption** — Sensitive state encrypted at rest
3. **Access Control** — MCP tools require proper auth
4. **Audit Logging** — All actions logged
5. **Email Security** — Encrypted email credentials

---

For API details, see [API.md](API.md)
For integration, see [INTEGRATION.md](INTEGRATION.md)
