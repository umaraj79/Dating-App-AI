export type WorkflowStage =
  | 'created'
  | 'queued'
  | 'running'
  | 'waiting'
  | 'completed'
  | 'failed'
  | 'cancelled'

export type AgentRole = 'profile-curator' | 'matchmaker' | 'conversation-starter'

export type StepStatus = 'started' | 'completed' | 'failed' | 'cancelled' | 'retrying' | 'waiting'

export interface AgentDefinition {
  role: AgentRole
  description: string
  inputs: string[]
  outputs: string[]
  trigger: string
  safetyLimits: string[]
}

export interface WorkflowDefinition {
  id: number
  name: string
  agentRole: AgentRole
  initiatingAgentId: number | null
  matchId: number | null
  steps: string[]
  maxRetries: number
  timeoutMs: number
  status: WorkflowStage
  failAtStep: number | null
  createdAt: string
  updatedAt: string
}

export interface WorkflowRun {
  id: number
  workflowId: number
  idempotencyKey: string
  status: WorkflowStage
  retryCount: number
  currentStep: number
  requestedByAgentId: number | null
  matchId: number | null
  startedAt: string | null
  completedAt: string | null
  error: string | null
  result: string | null
  createdAt: string
  updatedAt: string
}

export interface StepRun {
  id: number
  workflowRunId: number
  stepName: string
  status: StepStatus
  attempt: number
  log: string
  startedAt: string
  completedAt: string | null
}

export interface DeadLetterRecord {
  id: number
  workflowRunId: number
  reason: string
  payload: string
  createdAt: string
}
