import type { AgentDefinition, AgentRole } from './types.js'

const registry: AgentDefinition[] = [
  {
    role: 'profile-curator',
    description: 'Normalizes profile attributes and preference completeness before matching.',
    inputs: ['agent profile', 'preference updates'],
    outputs: ['validated profile', 'profile quality score'],
    trigger: 'When an agent profile is created or edited.',
    safetyLimits: ['Reject unsafe profile content', 'Skip writes for missing required fields'],
  },
  {
    role: 'matchmaker',
    description: 'Calculates compatibility and creates or updates match proposals.',
    inputs: ['validated profile pair', 'recent interactions'],
    outputs: ['compatibility score', 'match decision'],
    trigger: 'When two compatible profiles are available.',
    safetyLimits: ['Prevent self-matching', 'Enforce max match attempts per pair'],
  },
  {
    role: 'conversation-starter',
    description: 'Generates opening messages for newly accepted matches.',
    inputs: ['accepted match', 'profile context'],
    outputs: ['first message draft'],
    trigger: 'When a match changes to accepted.',
    safetyLimits: ['Block unsafe prompts', 'Rate-limit message generation'],
  },
]

export const listAgentDefinitions = () => registry

export const isKnownAgentRole = (role: string): role is AgentRole =>
  registry.some((agent) => agent.role === role)
