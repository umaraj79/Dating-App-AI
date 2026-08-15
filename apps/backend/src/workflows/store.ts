import type { DeadLetterRecord, StepRun, WorkflowDefinition, WorkflowRun, WorkflowStage } from './types.js'

const now = () => new Date().toISOString()

let workflowIdSequence = 1
let runIdSequence = 1
let stepRunIdSequence = 1
let deadLetterIdSequence = 1

const workflows: WorkflowDefinition[] = []
const runs: WorkflowRun[] = []
const stepRuns: StepRun[] = []
const deadLetters: DeadLetterRecord[] = []

export const workflowStore = {
  createWorkflow(input: {
    name: string
    agentRole: WorkflowDefinition['agentRole']
    initiatingAgentId: number | null
    matchId: number | null
    steps: string[]
    maxRetries: number
    timeoutMs: number
    failAtStep: number | null
  }) {
    const timestamp = now()
    const workflow: WorkflowDefinition = {
      id: workflowIdSequence++,
      name: input.name,
      agentRole: input.agentRole,
      initiatingAgentId: input.initiatingAgentId,
      matchId: input.matchId,
      steps: input.steps,
      maxRetries: input.maxRetries,
      timeoutMs: input.timeoutMs,
      status: 'created',
      failAtStep: input.failAtStep,
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    workflows.push(workflow)
    return workflow
  },

  listWorkflows() {
    return workflows
  },

  getWorkflowById(id: number) {
    return workflows.find((workflow) => workflow.id === id) ?? null
  },

  updateWorkflowStatus(id: number, status: WorkflowStage) {
    const workflow = workflows.find((entry) => entry.id === id)
    if (!workflow) {
      return null
    }

    workflow.status = status
    workflow.updatedAt = now()
    return workflow
  },

  createRun(input: {
    workflowId: number
    idempotencyKey: string
    requestedByAgentId: number | null
    matchId: number | null
  }) {
    const timestamp = now()
    const run: WorkflowRun = {
      id: runIdSequence++,
      workflowId: input.workflowId,
      idempotencyKey: input.idempotencyKey,
      status: 'created',
      retryCount: 0,
      currentStep: -1,
      requestedByAgentId: input.requestedByAgentId,
      matchId: input.matchId,
      startedAt: null,
      completedAt: null,
      error: null,
      result: null,
      createdAt: timestamp,
      updatedAt: timestamp,
    }

    runs.push(run)
    return run
  },

  listRuns() {
    return runs
  },

  getRunById(id: number) {
    return runs.find((run) => run.id === id) ?? null
  },

  findRunByIdempotencyKey(workflowId: number, idempotencyKey: string) {
    return (
      runs.find((run) => run.workflowId === workflowId && run.idempotencyKey === idempotencyKey) ?? null
    )
  },

  hasActiveRunForWorkflow(workflowId: number) {
    return runs.some(
      (run) => run.workflowId === workflowId && ['queued', 'running', 'waiting'].includes(run.status),
    )
  },

  updateRun(runId: number, changes: Partial<WorkflowRun>) {
    const run = runs.find((entry) => entry.id === runId)
    if (!run) {
      return null
    }

    Object.assign(run, changes)
    run.updatedAt = now()
    return run
  },

  createStepRun(input: {
    workflowRunId: number
    stepName: string
    status: StepRun['status']
    attempt: number
    log: string
    completedAt?: string
  }) {
    const timestamp = now()
    const stepRun: StepRun = {
      id: stepRunIdSequence++,
      workflowRunId: input.workflowRunId,
      stepName: input.stepName,
      status: input.status,
      attempt: input.attempt,
      log: input.log,
      startedAt: timestamp,
      completedAt: input.completedAt ?? null,
    }

    stepRuns.push(stepRun)
    return stepRun
  },

  listStepRunsByWorkflowRunId(workflowRunId: number) {
    return stepRuns.filter((entry) => entry.workflowRunId === workflowRunId)
  },

  createDeadLetter(input: { workflowRunId: number; reason: string; payload: string }) {
    const record: DeadLetterRecord = {
      id: deadLetterIdSequence++,
      workflowRunId: input.workflowRunId,
      reason: input.reason,
      payload: input.payload,
      createdAt: now(),
    }

    deadLetters.push(record)
    return record
  },

  listDeadLetters() {
    return deadLetters
  },
}
