export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Risk {
  id: string;
  category: 'Technical' | 'Compliance' | 'Operational' | 'Strategic';
  description: string;
  cause: string;
  probability: number; // 1-5
  impact: number; // 1-5
  status: 'Identified' | 'In Treatment' | 'Mitigated' | 'Accepted';
  owner: string;
  deadline?: string;
}

export interface ISOControl {
  code: string;
  name: string;
  applicable: boolean;
  status: 'Implementado' | 'Em andamento' | 'Parcial' | 'Não iniciado';
  evidence: string;
  owner: string;
}

export interface COBITProcess {
  code: string;
  name: string;
  description: string;
  status: 'Implementado' | 'Parcial' | 'Não iniciado';
  indicator: string;
  maturity: number;
}

export interface DataMapping {
  process: string;
  data: string;
  legalBase: string;
  sharing: string;
  retention: string;
  status: 'OK' | 'Revisar' | 'Ajustar';
}

export interface BIAEntry {
  process: string;
  system: string;
  rto: string;
  rpo: string;
  impact: string;
  priority: number;
}

export interface Decision {
  id: string;
  description: string;
  date: string;
  criteria: string;
  approver: string;
  result: 'Aprovado' | 'Rejeitado' | 'Negado';
}

export interface Training {
  name: string;
  target: string;
  hours: number;
  periodicity: string;
  status: 'Concluído' | 'Em andamento' | 'Não iniciado';
  progress: string;
}

export interface AuditEntry {
  id: string;
  scope: string;
  period: string;
  leader: string;
  status: 'Concluído' | 'Em andamento' | 'Agendado';
}

export interface CostEntry {
  category: string;
  budget: number;
  actual: number;
  percentage: number;
}

export interface Stakeholder {
  name: string;
  interest: string;
  influence: 'Alta' | 'Média' | 'Baixa';
  strategy: string;
  frequency: string;
}

export interface NonConformity {
  id: string;
  date: string;
  description: string;
  rootCause: string;
  action: string;
  deadline: string;
  status: 'Fechada' | 'Em andamento' | 'Pendente';
}

export interface KanbanTask {
  id: number;
  title: string;
  status: 'todo' | 'doing' | 'review' | 'done';
  priority: 'Alta' | 'Média' | 'Baixa';
  owner: string;
}

export interface KPI {
  id: string;
  name: string;
  value: number | string;
  unit: string;
  target: number | string;
  trend: 'up' | 'down' | 'stable';
}

export interface ProjectStep {
  id: string;
  title: string;
  summary: string;
  completed: boolean;
  tabId: string;
}

export interface Briefing {
  title: string;
  description: string;
  importance: string;
  frameworks: string;
  acronyms?: Record<string, string>;
}

export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

export interface ChecklistPhase {
  id: string;
  title: string;
  duration: string;
  status: 'CHECK' | 'EM ANDAMENTO' | 'PENDENTE';
  items: ChecklistItem[];
  briefing: Briefing;
}

export interface TabDefinition {
  id: string;
  label: string;
  icon: string;
  category: 'Executive' | 'Governance' | 'Operational' | 'Decision' | 'Strategic';
  briefing?: Briefing;
}
