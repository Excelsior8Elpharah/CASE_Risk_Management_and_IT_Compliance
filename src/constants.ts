import { Risk, KPI, TabDefinition, ISOControl, COBITProcess, DataMapping, BIAEntry, Decision, Training, AuditEntry, CostEntry, Stakeholder, NonConformity, Briefing, ProjectStep, ChecklistPhase, KanbanTask } from './types';

export const TABS: TabDefinition[] = [
  // Executive
  { 
    id: 'overview', 
    label: 'Visão Geral', 
    icon: 'LayoutDashboard', 
    category: 'Executive',
    briefing: {
      title: 'Visão Geral Executiva',
      description: 'Exibe o status consolidado da saúde de TI e governança.',
      importance: 'Permite uma tomada de decisão rápida baseada em dados reais.',
      frameworks: 'Alinhado ao EDM do COBIT (Avaliar, Dirigir e Monitorar).',
      acronyms: { 'EDM': 'Evaluate, Direct and Monitor' }
    }
  },
  { 
    id: 'kpis', 
    label: 'KPIs e Resultados', 
    icon: 'BarChart3', 
    category: 'Executive',
    briefing: {
      title: 'KPIs e Resultados',
      description: 'Monitora a eficiência operacional através de métricas de desempenho.',
      importance: 'Garante que os objetivos estratégicos de TI sejam atingidos.',
      frameworks: 'Baseado no domínio MEA do COBIT (Monitorar e Avaliar).',
      acronyms: { 'MEA': 'Monitor, Evaluate and Assess', 'MTTR': 'Tempo médio de recuperação' }
    }
  },
  { 
    id: 'risks_summary', 
    label: 'Gestão de Riscos', 
    icon: 'ShieldAlert', 
    category: 'Executive',
    briefing: {
      title: 'Gestão de Riscos',
      description: 'Identifica e analisa ameaças à continuidade do negócio.',
      importance: 'Essencial para proteger o valor e a resiliência organizacional.',
      frameworks: 'Segue as diretrizes da ISO 31000 e ISO 27001.',
      acronyms: { 'RTO': 'Tempo máximo de parada', 'RPO': 'Perda de dados aceitável' }
    }
  },
  
  // Governance
  { id: 'compliance_iso', label: 'Conformidade e ISO', icon: 'FileCheck', category: 'Governance' },
  { id: 'iso27001', label: 'Controles ISO 27001', icon: 'Lock', category: 'Governance' },
  { id: 'cobit', label: 'Governança COBIT', icon: 'Network', category: 'Governance' },
  { id: 'lgpd', label: 'LGPD e Privacidade', icon: 'ShieldCheck', category: 'Governance' },
  
  // Operational
  { id: '5w2h', label: 'Análise 5W2H', icon: 'ClipboardList', category: 'Operational' },
  { id: 'ishikawa', label: 'Ishikawa', icon: 'GitMerge', category: 'Operational' },
  { id: 'swot', label: 'SWOT', icon: 'Target', category: 'Operational' },
  { id: 'pdca', label: 'PDCA', icon: 'RotateCw', category: 'Operational' },
  { id: 'kanban', label: 'Kanban', icon: 'Trello', category: 'Operational' },
  { id: 'roadmap', label: 'Roadmap/Gantt', icon: 'Calendar', category: 'Operational' },
  
  // Decision & Control
  { id: 'decision_matrix', label: 'Matriz de Decisão', icon: 'Scale', category: 'Decision' },
  { id: 'continuity', label: 'Plano de Continuidade', icon: 'Activity', category: 'Decision' },
  { id: 'quality', label: 'Qualidade e NCs', icon: 'CheckCircle2', category: 'Decision' },
  { id: 'tech', label: 'Tecnologias', icon: 'Cpu', category: 'Decision' },
  { id: 'org', label: 'Organograma', icon: 'Users', category: 'Decision' },
  { id: 'costs', label: 'Custos e Investimentos', icon: 'DollarSign', category: 'Decision' },
  
  // Strategic & Cultural
  { id: 'ethics', label: 'Ética e ESG', icon: 'Leaf', category: 'Strategic' },
  { id: 'culture', label: 'Cultura e Capacitação', icon: 'GraduationCap', category: 'Strategic' },
  { id: 'stakeholders', label: 'Stakeholders', icon: 'MessageSquare', category: 'Strategic' },
  { id: 'audit', label: 'Auditoria', icon: 'Search', category: 'Strategic' },
  { id: 'project_chronology', label: 'Cronologia do Projeto', icon: 'ListTodo', category: 'Strategic' },
  { id: 'ai_chat', label: 'Chat IA Governança', icon: 'Bot', category: 'Strategic' },
  { id: 'checklist', label: 'Checklist Cronológico', icon: 'ListCheck', category: 'Strategic' },
];

export const CHECKLIST_DATA: ChecklistPhase[] = [
  {
    id: 'fase1',
    title: 'FASE 1: DIAGNÓSTICO',
    duration: '30 dias',
    status: 'CHECK',
    briefing: {
      title: 'Fase 1: Diagnóstico',
      description: 'Mapeamento inicial do contexto, KPIs e análise estratégica.',
      importance: 'ISO 31000 Passo 2: definir escopo e critérios de risco. Base para todo projeto.',
      frameworks: 'ISO 31000, SWOT, Ishikawa'
    },
    items: [
      { id: '1.1', label: '[Visão Geral] Mapear contexto empresa (450 func., ERP/CRM, objetivos +30%)', completed: false },
      { id: '1.2', label: '[KPIs] Estabelecer 6 KPIs críticos (Disponibilidade, MTBF, MTTR, Incidentes)', completed: false },
      { id: '1.3', label: '[SWOT] Análise estratégica (Forças: equipe | Fraquezas: acessos)', completed: false },
      { id: '1.4', label: '[Ishikawa] Identificar causas raiz (2 problemas principais)', completed: false },
      { id: '1.5', label: '[ISO 31000] Estabelecer contexto (Passo 2 oficial) - ESCOPO DEFINIDO', completed: true },
    ]
  },
  {
    id: 'fase2',
    title: 'FASE 2: IDENTIFICAÇÃO DE RISCOS',
    duration: '45 dias',
    status: 'CHECK',
    briefing: {
      title: 'Fase 2: Identificação de Riscos',
      description: 'Encontrar e analisar riscos prioritários.',
      importance: 'ISO 31000 Passos 3-4: encontrar e analisar riscos. R001/R003 são prioridades.',
      frameworks: 'ISO 31000, 5W2H'
    },
    items: [
      { id: '2.1', label: '[Gestão de Riscos] Mapear 10 riscos (R001 ERP P5/I5, R003 acessos P5/I5)', completed: false },
      { id: '2.2', label: '[ISO 31000] Identificação (Passo 3) - 10 RISCOS CRÍTICOS IDENTIFICADOS', completed: true },
      { id: '2.3', label: '[Matriz Calor] Classificar probabilidade x impacto (Crítico/Médio/Baixo)', completed: false },
      { id: '2.4', label: '[5W2H] Elaborar 2 planos ação (Acessos R$45k | Continuidade R$120k)', completed: false },
    ]
  },
  {
    id: 'fase3',
    title: 'FASE 3: PLANEJAMENTO ESTRATÉGICO',
    duration: '60 dias',
    status: 'CHECK',
    briefing: {
      title: 'Fase 3: Planejamento Estratégico',
      description: 'Priorização de riscos e alinhamento de governança.',
      importance: 'ISO 31000 Passo 5 + COBIT EDM01: priorizar riscos e alinhar governança.',
      frameworks: 'ISO 31000, ISO 27001, COBIT'
    },
    items: [
      { id: '3.1', label: '[ISO 31000] Avaliação (Passo 5) - RISCOS PRIORIZADOS POR CRITICIDADE', completed: true },
      { id: '3.2', label: '[ISO 27001] Mapear 93 controles Anexo A (A.9 acesso 15% ❌ CRÍTICO)', completed: false },
      { id: '3.3', label: '[COBIT] Avaliar 12 processos (EDM01 N2✅ | DSS05 N0❌)', completed: true },
      { id: '3.4', label: '[PDCA] Criar 2 ciclos específicos (Acessos + Continuidade)', completed: false },
      { id: '3.5', label: '[Roadmap/Gantt] Cronograma Q1-Q4 2026 (6 meses implementação)', completed: false },
    ]
  },
  {
    id: 'fase4',
    title: 'FASE 4: EXECUÇÃO OPERACIONAL',
    duration: '90-120 dias',
    status: 'EM ANDAMENTO',
    briefing: {
      title: 'Fase 4: Execução Operacional',
      description: 'Implementação de controles e planos de ação.',
      importance: 'ISO 31000 Passo 6: tratamento de riscos. Kanban garante visibilidade execução.',
      frameworks: 'ISO 27001, COBIT, Kanban'
    },
    items: [
      { id: '4.1', label: '[Kanban] Acompanhar 15 ações (3 A Fazer | 4 Andamento | 8 Concluído)', completed: false },
      { id: '4.2', label: '[5W2H] Executar planos (Política acessos 60 dias | PCN 90 dias)', completed: false },
      { id: '4.3', label: '[ISO 27001] Implementar A.9 Controle Acessos (IAM R$45k)', completed: false },
      { id: '4.4', label: '[ISO 27001] Validar backups A.12.3.1 (R$25k automação)', completed: false },
      { id: '4.5', label: '[COBIT APO12] Formalizar processo gestão riscos', completed: false },
    ]
  },
  {
    id: 'fase5',
    title: 'FASE 5: VERIFICAÇÃO E MONITORAMENTO',
    duration: 'Contínuo',
    status: 'PENDENTE',
    briefing: {
      title: 'Fase 5: Verificação e Monitoramento',
      description: 'Acompanhamento contínuo de KPIs e auditorias.',
      importance: 'ISO 31000 Passo 7 + COBIT MEA01: ciclo fechado de monitoramento.',
      frameworks: 'ISO 31000, COBIT, LGPD'
    },
    items: [
      { id: '5.1', label: '[KPIs] Monitorar 6 indicadores (Disponibilidade →99,5% | Incidentes <5)', completed: false },
      { id: '5.2', label: '[Qualidade NCs] Tratar 8 não-conformidades (NC-001 backup, NC-003 acessos)', completed: false },
      { id: '5.3', label: '[LGPD] Mapear 6 processos dados pessoais (Cadastro, Folha, Marketing)', completed: false },
      { id: '5.4', label: '[Auditoria] 4 auditorias planejadas (Acessos Mar26, Backups Abr26)', completed: false },
      { id: '5.5', label: '[ISO 31000] Monitoramento (Passo 7) - KPIs + PDCA EM FUNCIONAMENTO', completed: true },
    ]
  },
  {
    id: 'fase6',
    title: 'FASE 6: GOVERNANÇA E MELHORIA CONTÍNUA',
    duration: 'Q4 2026',
    status: 'PENDENTE',
    briefing: {
      title: 'Fase 6: Governança e Melhoria Contínua',
      description: 'Consolidação da governança e melhoria contínua.',
      importance: 'COBIT MEA01 + ISO 27001 cláusula 10: melhoria contínua certificada.',
      frameworks: 'COBIT, ISO 27001'
    },
    items: [
      { id: '6.1', label: '[COBIT EDM01] Comit Governança TI mensal', completed: false },
      { id: '6.2', label: '[Matriz Decisão] 3 decisões estruturadas (ROI, risco, compliance)', completed: false },
      { id: '6.3', label: '[Custos] Orçamento R$5,75M (Segurança 30% executado)', completed: false },
      { id: '6.4', label: '[Cultura] 100% treinamentos (Segurança + LGPD)', completed: false },
      { id: '6.5', label: '[ISO 27001] Certificação SGSI (meta Dez26)', completed: false },
      { id: '6.6', label: '[Chat IA] Simulações decisões (ex: IAM vs SIEM)', completed: true },
    ]
  },
  {
    id: 'fase7',
    title: 'FASE 7: RESULTADOS E CONSOLIDAÇÃO',
    duration: 'Dez 2026',
    status: 'PENDENTE',
    briefing: {
      title: 'Fase 7: Resultados e Consolidação',
      description: 'Encerramento e validação dos resultados alcançados.',
      importance: 'Validação final de metas e conformidade.',
      frameworks: 'ISO 27001, COBIT'
    },
    items: [
      { id: '7.1', label: '[Roadmap] 100% milestones concluídos', completed: false },
      { id: '7.2', label: '[KPIs] Metas alcançadas (Disponibilidade 99,5% | Incidentes <5)', completed: false },
      { id: '7.3', label: '[ISO 27001] Auditoria certificação externa', completed: false },
      { id: '7.4', label: '[COBIT] Nível capacidade 3+ nos 12 processos', completed: false },
      { id: '7.5', label: '[Stakeholders] NPS TI 80+ | 0 multas LGPD', completed: false },
      { id: '7.6', label: '[Checklist] 100% etapas marcadas ✅', completed: true },
    ]
  }
];


export const INITIAL_KANBAN_TASKS: KanbanTask[] = [
  { id: 1, title: 'Política de Acessos', status: 'todo', priority: 'Alta', owner: 'Ana' },
  { id: 2, title: 'Mapeamento de Riscos', status: 'doing', priority: 'Alta', owner: 'Carlos' },
  { id: 3, title: 'Análise de Impacto', status: 'review', priority: 'Média', owner: 'Mariana' },
  { id: 4, title: 'Inventário de Ativos', status: 'done', priority: 'Alta', owner: 'João' },
  { id: 5, title: 'Plano de Continuidade', status: 'todo', priority: 'Alta', owner: 'Pedro' },
  { id: 6, title: 'Treinamento LGPD', status: 'doing', priority: 'Média', owner: 'Carla' },
];


export const INITIAL_PROJECT_STEPS: ProjectStep[] = [
  { id: '1', title: 'Entender o cenário do problema', summary: 'Análise inicial de indisponibilidade, acessos e conformidade para definir o escopo do projeto.', completed: false, tabId: 'overview' },
  { id: '2', title: 'Configurar Visão Geral e KPIs', summary: 'Definição dos indicadores chave de desempenho para monitorar o sucesso da implementação.', completed: false, tabId: 'kpis' },
  { id: '3', title: 'Mapear riscos conforme ISO 31000', summary: 'Identificar e classificar os principais riscos de TI da empresa para priorizar ações.', completed: false, tabId: 'risks_summary' },
  { id: '4', title: 'Documentar controles ISO 27001', summary: 'Acompanhar a implementação de controles de segurança como acessos, backup e incidentes.', completed: false, tabId: 'iso27001' },
  { id: '5', title: 'Estruturar governança COBIT', summary: 'Definir processos de governança baseados nos domínios EDM, APO, DSS e MEA.', completed: false, tabId: 'cobit' },
  { id: '6', title: 'Definir planos de ação 5W2H', summary: 'Criar planos detalhados para Controle de Acessos e Plano de Continuidade.', completed: false, tabId: '5w2h' },
  { id: '7', title: 'Detalhar ciclos PDCA', summary: 'Estabelecer a melhoria contínua através de ciclos específicos para cada plano de ação.', completed: false, tabId: 'pdca' },
  { id: '8', title: 'Acompanhar execução via Kanban', summary: 'Gerenciar o fluxo de tarefas diárias e garantir a transparência da execução.', completed: false, tabId: 'kanban' },
  { id: '9', title: 'Registrar Qualidade e NCs', summary: 'Monitorar desvios e garantir que as ações corretivas sejam aplicadas.', completed: false, tabId: 'quality' },
  { id: '10', title: 'Monitorar Custos e ESG', summary: 'Garantir que o projeto esteja dentro do orçamento e alinhado com valores éticos.', completed: false, tabId: 'costs' },
  { id: '11', title: 'Utilizar Chat IA Governança', summary: 'Simular decisões e obter insights baseados em frameworks internacionais.', completed: false, tabId: 'ai_chat' },
];

export const INITIAL_RISKS: Risk[] = [
  { id: 'R001', category: 'Technical', description: 'Indisponibilidade do ERP', cause: 'Falta de redundância', probability: 5, impact: 5, status: 'In Treatment', owner: 'Gerente Infra', deadline: '2026-06-30' },
  { id: 'R002', category: 'Technical', description: 'Perda de dados', cause: 'Backup sem validação', probability: 3, impact: 5, status: 'In Treatment', owner: 'DBA', deadline: '2026-04-30' },
  { id: 'R003', category: 'Compliance', description: 'Acesso não autorizado', cause: 'Falta de controle de acessos', probability: 5, impact: 5, status: 'Identified', owner: 'Gerente Segurança', deadline: '2026-05-31' },
  { id: 'R004', category: 'Compliance', description: 'Não conformidade LGPD', cause: 'Tratamento inadequado de dados', probability: 3, impact: 5, status: 'In Treatment', owner: 'Analista Compliance', deadline: '2026-06-30' },
  { id: 'R005', category: 'Operational', description: 'Falta de responsabilidades', cause: 'Indefinição de papéis', probability: 5, impact: 3, status: 'Identified', owner: 'Diretor TI', deadline: '2026-04-15' },
  { id: 'R006', category: 'Technical', description: 'Ataque de ransomware', cause: 'Falta de proteção', probability: 2, impact: 5, status: 'Identified', owner: 'Gerente Segurança', deadline: '2026-07-31' },
  { id: 'R007', category: 'Compliance', description: 'Violação de contrato', cause: 'Quebra de SLA', probability: 3, impact: 3, status: 'Identified', owner: 'Jurídico', deadline: '2026-06-30' },
  { id: 'R008', category: 'Strategic', description: 'Decisões sem critérios', cause: 'Falta de governança', probability: 5, impact: 3, status: 'Identified', owner: 'Diretor TI', deadline: '2026-05-30' },
  { id: 'R009', category: 'Technical', description: 'Obsolescência tecnológica', cause: 'Falta de planejamento', probability: 3, impact: 3, status: 'Identified', owner: 'TI Ops', deadline: '2026-08-30' },
  { id: 'R010', category: 'Operational', description: 'Erro de operador', cause: 'Falta de treinamento', probability: 5, impact: 2, status: 'Identified', owner: 'TI Ops', deadline: '2026-04-30' },
];

export const INITIAL_KPIS: KPI[] = [
  { id: '1', name: 'Disponibilidade ERP', value: 98.5, unit: '%', target: 99.5, trend: 'down' },
  { id: '2', name: 'MTBF', value: 7, unit: ' dias', target: 30, trend: 'down' },
  { id: '3', name: 'MTTR', value: 2, unit: 'h', target: 1, trend: 'up' },
  { id: '4', name: 'Incidentes de Segurança', value: 12, unit: '', target: 5, trend: 'up' },
  { id: '5', name: 'Acessos Revisados', value: 30, unit: '%', target: 100, trend: 'stable' },
  { id: '6', name: 'Treinamentos Realizados', value: 25, unit: '%', target: 100, trend: 'up' },
];

export const ISO_31000_STEPS = [
  {
    id: 'step1',
    title: 'Comunicação e Consulta',
    description: 'Engajar stakeholders. ISO 31000 exige diálogo contínuo com áreas de negócio para identificar riscos relevantes. No case, envolve diretoria, TI e compliance.',
    icon: 'MessageSquare'
  },
  {
    id: 'step2',
    title: 'Estabelecimento do Contexto',
    description: 'Definir escopo e critérios. No projeto, escopo = TI crítica (ERP, CRM). Critérios = impacto financeiro > R$25k/h e probabilidade >30%.',
    icon: 'Target'
  },
  {
    id: 'step3',
    title: 'Identificação de Riscos',
    description: 'Encontrar, reconhecer e descrever riscos. Dashboard usa aba \'Gestão de Riscos\' para isso. Exemplo: R001 ERP indisponível.',
    icon: 'Search'
  },
  {
    id: 'step4',
    title: 'Análise de Riscos',
    description: 'Compreender natureza e nível. Matriz calor usa probabilidade x impacto (1-5). Crítico = P5 x I5.',
    icon: 'BarChart3'
  },
  {
    id: 'step5',
    title: 'Avaliação de Riscos',
    description: 'Comparar com critérios estabelecidos. Riscos críticos (P4-5, I4-5) entram em plano tratamento imediato.',
    icon: 'Scale'
  },
  {
    id: 'step6',
    title: 'Tratamento de Riscos',
    description: 'Selecionar e implementar opções. 5W2H detalha ações, Kanban acompanha execução.',
    icon: 'GitMerge'
  },
  {
    id: 'step7',
    title: 'Monitoramento e Análise Crítica',
    description: 'Acompanhar e revisar continuamente. KPIs + PDCA + Auditoria garantem ciclo fechado.',
    icon: 'RotateCw'
  }
];

export const ISO_CONTROLS: ISOControl[] = [
  { code: 'A.5.1.1', name: 'Políticas de segurança', applicable: true, status: 'Em andamento', evidence: 'Minuta de política', owner: 'Gerente Segurança' },
  { code: 'A.6.1.1', name: 'Papéis e responsabilidades', applicable: true, status: 'Em andamento', evidence: 'Matriz RACI', owner: 'Diretor TI' },
  { code: 'A.7.2.2', name: 'Conscientização e treinamento', applicable: true, status: 'Não iniciado', evidence: 'Programa a criar', owner: 'RH/TI' },
  { code: 'A.8.1.1', name: 'Inventário de ativos', applicable: true, status: 'Implementado', evidence: 'Planilha atualizada', owner: 'Gerente Infra' },
  { code: 'A.8.2.3', name: 'Tratamento de mídias', applicable: true, status: 'Parcial', evidence: 'Política pendente', owner: 'Gerente Infra' },
  { code: 'A.9.1.2', name: 'Acesso à rede e serviços', applicable: true, status: 'Não iniciado', evidence: 'Projeto IAM', owner: 'Gerente Segurança' },
  { code: 'A.9.2.3', name: 'Gerenciamento de privilégios', applicable: true, status: 'Não iniciado', evidence: 'Projeto IAM', owner: 'Gerente Segurança' },
  { code: 'A.9.4.2', name: 'Procedimento de login seguro', applicable: true, status: 'Parcial', evidence: 'MFA em implantação', owner: 'Gerente Segurança' },
  { code: 'A.12.3.1', name: 'Backup de informações', applicable: true, status: 'Parcial', evidence: 'Backup sem validação', owner: 'DBA' },
  { code: 'A.12.4.1', name: 'Registro de eventos', applicable: true, status: 'Não iniciado', evidence: 'Sem logs centralizados', owner: 'Gerente Infra' },
  { code: 'A.12.6.1', name: 'Gestão de vulnerabilidades', applicable: true, status: 'Não iniciado', evidence: 'Ferramenta a adquirir', owner: 'Gerente Segurança' },
  { code: 'A.16.1.5', name: 'Resposta a incidentes', applicable: true, status: 'Não iniciado', evidence: 'Plano a criar', owner: 'Gerente Segurança' },
  { code: 'A.17.1.2', name: 'Disponibilidade de instalações', applicable: true, status: 'Parcial', evidence: 'Infraestrutura limitada', owner: 'Gerente Infra' },
  { code: 'A.18.1.1', name: 'Requisitos legais', applicable: true, status: 'Parcial', evidence: 'Mapeamento LGPD', owner: 'Compliance' },
];

export const COBIT_PROCESSES: COBITProcess[] = [
  { code: 'EDM01', name: 'Estrutura de governança', description: 'Assegurar definição e manutenção', status: 'Parcial', indicator: 'Comitê criado', maturity: 2 },
  { code: 'EDM03', name: 'Otimização de riscos', description: 'Assegurar otimização de riscos', status: 'Parcial', indicator: 'Riscos mapeados', maturity: 1 },
  { code: 'APO01', name: 'Estrutura de gestão de TI', description: 'Gerenciar estrutura de gestão', status: 'Parcial', indicator: 'RACI em desenvolvimento', maturity: 2 },
  { code: 'APO12', name: 'Gerenciar riscos', description: 'Processo de gestão de riscos', status: 'Não iniciado', indicator: 'Processo a definir', maturity: 0.5 },
  { code: 'APO13', name: 'Gerenciar segurança', description: 'Gestão de segurança', status: 'Não iniciado', indicator: 'SGSI em planejamento', maturity: 0.5 },
  { code: 'BAI04', name: 'Continuidade e capacidade', description: 'Gerenciar disponibilidade', status: 'Parcial', indicator: 'BIA realizada', maturity: 1.5 },
  { code: 'DSS01', name: 'Gerenciar operações', description: 'Operações de TI', status: 'Implementado', indicator: 'Monitoramento básico', maturity: 4 },
  { code: 'DSS02', name: 'Gerenciar incidentes', description: 'Service desk', status: 'Implementado', indicator: 'Sistema de chamados', maturity: 4 },
  { code: 'DSS03', name: 'Gerenciar problemas', description: 'Análise de causas', status: 'Parcial', indicator: 'Processo manual', maturity: 2 },
  { code: 'DSS04', name: 'Gerenciar continuidade', description: 'Plano de continuidade', status: 'Não iniciado', indicator: 'Plano a criar', maturity: 0.5 },
  { code: 'DSS05', name: 'Serviços de segurança', description: 'Controles de segurança', status: 'Não iniciado', indicator: 'Projetos em andamento', maturity: 0.5 },
  { code: 'MEA01', name: 'Monitorar desempenho', description: 'Monitorar, avaliar e analisar', status: 'Implementado', indicator: 'Dashboard atual', maturity: 4 },
];

export const LGPD_MAPPING: DataMapping[] = [
  { process: 'Cadastro de clientes', data: 'Nome, CPF, e-mail, telefone, endereço', legalBase: 'Execução de contrato', sharing: 'Sistemas de CRM', retention: '5 anos', status: 'OK' },
  { process: 'Folha de pagamento', data: 'Dados bancários, salário, dependentes', legalBase: 'Obrigação legal', sharing: 'Contabilidade, banco', retention: '30 anos', status: 'OK' },
  { process: 'Marketing', data: 'E-mail, histórico de compras', legalBase: 'Legítimo interesse', sharing: 'Ferramenta de e-mail', retention: '2 anos', status: 'Revisar' },
  { process: 'Recrutamento', data: 'Currículo, dados profissionais', legalBase: 'Consentimento', sharing: 'Não compartilha', retention: '6 meses', status: 'Ajustar' },
  { process: 'Câmeras de segurança', data: 'Imagens', legalBase: 'Legítimo interesse', sharing: 'Não compartilha', retention: '30 dias', status: 'OK' },
  { process: 'Portal do cliente', data: 'Dados de acesso, histórico', legalBase: 'Execução de contrato', sharing: 'Não compartilha', retention: 'Durante contrato', status: 'Revisar' },
];

export const BIA_DATA: BIAEntry[] = [
  { process: 'Vendas', system: 'CRM', rto: '4 horas', rpo: '1 hora', impact: 'R$ 25.000', priority: 5 },
  { process: 'Financeiro', system: 'ERP Financeiro', rto: '4 horas', rpo: '1 hora', impact: 'R$ 40.000', priority: 5 },
  { process: 'Atendimento', system: 'Portal Cliente', rto: '8 horas', rpo: '4 horas', impact: 'R$ 15.000', priority: 4 },
  { process: 'Produção', system: 'ERP Produção', rto: '12 horas', rpo: '4 horas', impact: 'R$ 30.000', priority: 4 },
  { process: 'RH', system: 'Sistema de RH', rto: '24 horas', rpo: '24 horas', impact: 'R$ 5.000', priority: 2 },
  { process: 'Compras', system: 'ERP Compras', rto: '24 horas', rpo: '24 horas', impact: 'R$ 8.000', priority: 2 },
];

export const DECISIONS: Decision[] = [
  { id: '1', description: 'Aquisição de IAM', date: '2026-02-15', criteria: 'ROI 24 meses, crítico', approver: 'Comitê Executivo', result: 'Aprovado' },
  { id: '2', description: 'Contratação de nuvem AWS', date: '2026-02-20', criteria: 'Conformidade verificada', approver: 'Diretor TI', result: 'Aprovado' },
  { id: '3', description: 'Novo sistema de RH', date: '2026-03-01', criteria: 'ROI 36 meses, baixa prioridade', approver: 'Diretor TI', result: 'Rejeitado' },
  { id: '4', description: 'Acesso de consultor a dados sensíveis', date: '2026-03-05', criteria: 'Sem justificativa formal', approver: 'DPO', result: 'Negado' },
];

export const TRAININGS: Training[] = [
  { name: 'Conscientização em Segurança', target: 'Todos funcionários', hours: 2, periodicity: 'Anual', status: 'Em andamento', progress: '120/450' },
  { name: 'LGPD para operações', target: 'Atendimento, vendas', hours: 4, periodicity: 'Anual', status: 'Em andamento', progress: '45/150' },
  { name: 'Uso seguro de e-mail', target: 'Todos', hours: 1, periodicity: 'Semestral', status: 'Não iniciado', progress: '0/450' },
  { name: 'Gestão de incidentes', target: 'TI', hours: 8, periodicity: 'Semestral', status: 'Não iniciado', progress: '0/25' },
  { name: 'Controle de acessos', target: 'Gestores', hours: 2, periodicity: 'Trimestral', status: 'Não iniciado', progress: '0/50' },
  { name: 'Backup e recuperação', target: 'Infraestrutura', hours: 4, periodicity: 'Semestral', status: 'Não iniciado', progress: '0/10' },
  { name: 'Ética e compliance', target: 'Todos', hours: 2, periodicity: 'Anual', status: 'Em andamento', progress: '80/450' },
];

export const AUDIT_PLAN: AuditEntry[] = [
  { id: '1', scope: 'Auditoria de acessos', period: 'Mar/26', leader: 'Auditoria Interna', status: 'Em andamento' },
  { id: '2', scope: 'Auditoria de backups', period: 'Abr/26', leader: 'Terceiros', status: 'Agendado' },
  { id: '3', scope: 'Auditoria LGPD', period: 'Mai/26', leader: 'DPO', status: 'Agendado' },
  { id: '4', scope: 'Auditoria de contratos', period: 'Jun/26', leader: 'Jurídico', status: 'Agendado' },
  { id: '5', scope: 'Auditoria de infraestrutura', period: 'Jul/26', leader: 'Terceiros', status: 'Agendado' },
];

export const COSTS: CostEntry[] = [
  { category: 'Infraestrutura', budget: 1200000, actual: 850000, percentage: 71 },
  { category: 'Software e licenças', budget: 800000, actual: 520000, percentage: 65 },
  { category: 'Segurança da Informação', budget: 600000, actual: 180000, percentage: 30 },
  { category: 'Pessoal', budget: 2500000, actual: 1900000, percentage: 76 },
  { category: 'Serviços terceiros', budget: 400000, actual: 220000, percentage: 55 },
  { category: 'Treinamentos', budget: 150000, actual: 450000, percentage: 30 },
  { category: 'Auditorias', budget: 100000, actual: 25000, percentage: 25 },
];

export const STAKEHOLDERS: Stakeholder[] = [
  { name: 'Alta Gestão', interest: 'Resultados, riscos, compliance', influence: 'Alta', strategy: 'Dashboard executivo', frequency: 'Mensal' },
  { name: 'Diretor de TI', interest: 'Implementação, orçamento, equipe', influence: 'Alta', strategy: 'Relatórios detalhados', frequency: 'Semanal' },
  { name: 'Gestores de área', interest: 'Disponibilidade, suporte', influence: 'Média', strategy: 'E-mails, reuniões', frequency: 'Quinzenal' },
  { name: 'Usuários', interest: 'Facilidade, sistemas funcionando', influence: 'Baixa', strategy: 'Comunicados, treinamentos', frequency: 'Conforme necessidade' },
  { name: 'Clientes', interest: 'Privacidade, segurança', influence: 'Média', strategy: 'Política de privacidade', frequency: 'Anual' },
  { name: 'Fornecedores', interest: 'Contratos, SLAs', influence: 'Média', strategy: 'Reuniões de acompanhamento', frequency: 'Trimestral' },
];

export const NON_CONFORMITIES: NonConformity[] = [
  { id: 'NC-001/2026', date: '2026-01-15', description: 'Indisponibilidade do ERP por 4 horas', rootCause: 'Falta de backup validado', action: 'Implementar backup com teste automático', deadline: '2026-02-28', status: 'Fechada' },
  { id: 'NC-002/2026', date: '2026-01-20', description: 'Ex-funcionário com acesso ao CRM', rootCause: 'Falta de processo de revogação', action: 'Criar workflow de desligamento', deadline: '2026-02-15', status: 'Fechada' },
  { id: 'NC-003/2026', date: '2026-02-05', description: 'Acesso de usuário sem autorização', rootCause: 'Ausência de política de acessos', action: 'Elaborar política e revisar perfis', deadline: '2026-03-30', status: 'Em andamento' },
  { id: 'NC-004/2026', date: '2026-02-10', description: 'Backup corrompido sem alerta', rootCause: 'Falta de monitoramento', action: 'Implementar alertas de falha', deadline: '2026-03-15', status: 'Em andamento' },
  { id: 'NC-005/2026', date: '2026-02-18', description: 'Dados de cliente expostos em teste', rootCause: 'Ambiente sem anonimização', action: 'Criar política de dados de teste', deadline: '2026-03-31', status: 'Em andamento' },
  { id: 'NC-006/2026', date: '2026-02-25', description: 'Atraso na resposta a incidente', rootCause: 'Falta de procedimento', action: 'Criar plano de resposta a incidentes', deadline: '2026-04-15', status: 'Pendente' },
  { id: 'NC-007/2026', date: '2026-03-01', description: 'Senha fraca em sistema crítico', rootCause: 'Ausência de política de senhas', action: 'Implementar política e MFA', deadline: '2026-04-30', status: 'Pendente' },
  { id: 'NC-008/2026', date: '2026-03-05', description: 'Falta de assinatura em contratos', rootCause: 'Processo manual', action: 'Digitalizar processo', deadline: '2026-05-15', status: 'Pendente' },
];

export const BRIEFINGS: Record<string, Briefing> = {
  'overview': TABS.find(t => t.id === 'overview')?.briefing!,
  'kpis': TABS.find(t => t.id === 'kpis')?.briefing!,
  'risks': TABS.find(t => t.id === 'risks_summary')?.briefing!,
  'kpi_disponibilidade': {
    title: 'Disponibilidade ERP',
    description: 'Mede o tempo que sistemas críticos como ERP ficam operacionais.',
    importance: 'ISO 27001 A.17 exige 99%+ para sistemas essenciais. Impacto: 1h parada = R$40k prejuízo.',
    frameworks: 'ISO 27001 A.17'
  },
  'kpi_mtbf': {
    title: 'MTBF (Mean Time Between Failures)',
    description: 'Tempo médio entre falhas do sistema.',
    importance: 'ISO 27001 A.12.3.1. Baixo MTBF indica necessidade urgente de manutenção preventiva.',
    frameworks: 'ISO 27001 A.12.3.1'
  },
  'kpi_mttr': {
    title: 'MTTR (Mean Time To Repair)',
    description: 'Tempo médio para recuperar serviço após falha.',
    importance: 'Reduzir MTTR é prioridade para continuidade de negócio.',
    frameworks: 'COBIT DSS01'
  },
  'kpi_incidentes': {
    title: 'Incidentes de Segurança',
    description: 'Número de incidentes de segurança por mês (ataques, acessos indevidos).',
    importance: 'ISO 27001 A.16.1.5 exige registro e análise. 60% dos incidentes atuais vêm de acessos mal geridos.',
    frameworks: 'ISO 27001 A.16.1.5'
  },
  'kpi_acessos': {
    title: 'Acessos Revisados',
    description: '% de acessos revisados trimestralmente (princípio menor privilégio).',
    importance: 'ISO 27001 A.9.2.5. Acessos indevidos causam 60% dos incidentes de segurança.',
    frameworks: 'ISO 27001 A.9.2.5'
  },
  'kpi_treinamentos': {
    title: 'Treinamentos Realizados',
    description: '% funcionários com treinamentos obrigatórios em segurança e LGPD.',
    importance: 'ISO 27001 A.7.2.2 exige conscientização. 80% dos incidentes são erro humano. Treinamento reduz phishing em 50%.',
    frameworks: 'ISO 27001 A.7.2.2'
  },
  'kpi_table': {
    title: 'Gestão de Indicadores (KPIs)',
    description: 'Permite customizar indicadores conforme necessidade da empresa.',
    importance: 'COBIT MEA01 exige monitoramento contínuo. Todos os KPIs afetam automaticamente os gráficos e análises do dashboard.',
    frameworks: 'COBIT MEA01'
  },
  'iso31000': {
    title: 'ISO 31000:2018',
    description: 'Define princípios e processo universal de gestão de riscos.',
    importance: 'O dashboard implementa os 7 passos completos, conectando identificação (riscos), tratamento (5W2H), monitoramento (KPIs) e revisão (PDCA). Essencial para qualquer empresa em transformação digital.',
    frameworks: 'ISO 31000:2018'
  },
  'iso27001_domains': {
    title: 'ISO 27001 - Domínios de Controle',
    description: 'ISO 27001 Anexo A: 93 controles divididos em 4 domínios.',
    importance: 'Dashboard foca em A.9 (acesso 15% ❌), A.12 (operações 30%), A.17 (continuidade 30%). Base para SGSI.',
    frameworks: 'ISO 27001 Anexo A'
  },
  'iso_radar': {
    title: 'Maturidade ISO 27001',
    description: 'Visualiza o nível de conformidade com os domínios de segurança.',
    importance: 'Identifica lacunas críticas na proteção da informação.',
    frameworks: 'Baseado no Anexo A da ISO 27001:2022.',
  },
  'risk_matrix': {
    title: 'Matriz de Calor',
    description: 'Prioriza riscos por probabilidade e impacto no negócio.',
    importance: 'Foca os recursos nos riscos que realmente importam.',
    frameworks: 'Alinhado ao processo de avaliação da ISO 31000.',
  },
  'bia_card': {
    title: 'Análise de Impacto (BIA)',
    description: 'Define tempos de recuperação para processos críticos.',
    importance: 'Base para o Plano de Continuidade de Negócios.',
    frameworks: 'ISO 22301 e ISO 27001 (Continuidade).',
    acronyms: { 'RTO': 'Tempo de recuperação', 'RPO': 'Ponto de recuperação' }
  },
  'cobit_card': {
    title: 'Governança COBIT',
    description: 'Mapeia a maturidade dos processos de gestão de TI.',
    importance: 'Garante que a TI entregue valor e alinhe-se ao negócio.',
    frameworks: 'Framework COBIT 2019.',
    acronyms: { 'EDM': 'Governança', 'APO': 'Planejamento', 'DSS': 'Operação' }
  },
  'quality_card': {
    title: 'Qualidade e NCs',
    description: 'Registra desvios e falhas nos processos estabelecidos.',
    importance: 'Promove a melhoria contínua e conformidade externa.',
    frameworks: 'ISO 9001 e COBIT MEA.',
  },
  'swot_card': {
    title: 'Análise SWOT',
    description: 'Identifica forças, fraquezas, oportunidades e ameaças.',
    importance: 'Auxilia no planejamento estratégico e análise de contexto.',
    frameworks: 'ISO 31000 (Contexto).',
  },
  'lgpd_card': {
    title: 'Privacidade (LGPD)',
    description: 'Mapeia o fluxo de dados pessoais e suas bases legais.',
    importance: 'Garante conformidade com a proteção de dados e direitos do titular.',
    frameworks: 'LGPD e ISO 27001 (Privacidade).',
  },
  'ai_chat_card': {
    title: 'Assistente GRC',
    description: 'IA para suporte à decisão em governança e riscos.',
    importance: 'Acelera a análise de conformidade com padrões internacionais.',
    frameworks: 'Gemini AI e Frameworks GRC.',
  },
  'iso_controls_card': {
    title: 'Controles ISO 27001',
    description: 'Lista de salvaguardas para segurança da informação.',
    importance: 'Protege a confidencialidade, integridade e disponibilidade.',
    frameworks: 'ISO 27001:2022.',
  },
  '5w2h_card': {
    title: 'Plano de Ação 5W2H',
    description: 'Metodologia para execução clara de iniciativas.',
    importance: 'Garante responsabilidade e prazos para cada ação.',
    frameworks: 'COBIT APO e Gestão de Projetos.',
  },
  'pdca_card': {
    title: 'Ciclo PDCA',
    description: 'Método para controle e melhoria contínua.',
    importance: 'Garante que os processos evoluam de forma sistemática.',
    frameworks: 'ISO 9001 e ISO 27001.',
  },
  'kanban_briefing': {
    title: 'Kanban',
    description: 'Gestão visual do fluxo de trabalho e tarefas.',
    importance: 'Aumenta a transparência e agilidade na execução.',
    frameworks: 'Gestão Ágil e COBIT MEA.',
  },
  'decision_matrix_card': {
    title: 'Matriz de Decisão',
    description: 'Compara alternativas com critérios objetivos.',
    importance: 'Torna as escolhas estratégicas auditáveis e lógicas.',
    frameworks: 'COBIT EDM (Dirigir).',
  },
  'continuity_card': {
    title: 'Continuidade (PCN)',
    description: 'Estratégias para manter o negócio operando em crises.',
    importance: 'Protege a viabilidade da empresa em cenários de desastre.',
    frameworks: 'ISO 22301 e ISO 27001.',
  },
  'costs_card': {
    title: 'Custos e Investimentos',
    description: 'Acompanha o orçamento vs. gasto real em TI.',
    importance: 'Garante eficiência financeira e entrega de valor.',
    frameworks: 'COBIT APO06.',
  },
  'audit_card': {
    title: 'Plano de Auditoria',
    description: 'Cronograma de verificações independentes.',
    importance: 'Valida a eficácia dos controles e conformidade.',
    frameworks: 'ISO 19011 e COBIT MEA.',
  },
  'stakeholders_card': {
    title: 'Stakeholders',
    description: 'Analisa as partes interessadas e sua influência.',
    importance: 'Garante que as necessidades de todos sejam ouvidas.',
    frameworks: 'COBIT e PMBOK.',
  },
  'ethics_card': {
    title: 'Ética e ESG',
    description: 'Indicadores de governança social e ambiental.',
    importance: 'Integra valores éticos à estratégia corporativa.',
    frameworks: 'ESG e Governança.',
  },
  'tech_card': {
    title: 'Tecnologias',
    description: 'Visão dos ativos e saúde da infraestrutura.',
    importance: 'Base para disponibilidade e segurança dos serviços.',
    frameworks: 'ISO 27001 e ITIL.',
  },
  'org_card': {
    title: 'Organograma',
    description: 'Define papéis e hierarquia de governança.',
    importance: 'Essencial para accountability e fluxo de decisão.',
    frameworks: 'COBIT APO01.',
  },
  'culture_card': {
    title: 'Cultura e Treinamento',
    description: 'Mede a maturidade e capacitação da equipe.',
    importance: 'Mitiga riscos humanos através da conscientização.',
    frameworks: 'ISO 27001 (Pessoas).',
  },
  'ishikawa_card': {
    title: 'Ishikawa',
    description: 'Analisa a causa raiz de problemas e falhas.',
    importance: 'Evita que o mesmo erro ocorra repetidamente.',
    frameworks: 'ISO 31000 e Qualidade.',
  },
  'roadmap_card': {
    title: 'Roadmap',
    description: 'Cronograma visual das iniciativas de GRC.',
    importance: 'Alinha prazos com as necessidades do negócio.',
    frameworks: 'Gestão de Projetos.',
  }
};

// --- SOLVED STATES FOR SIMULATION ---

export const SOLVED_RISKS: Risk[] = INITIAL_RISKS.map(r => {
  if (r.id === 'R001') return { ...r, probability: 2, impact: 2, status: 'Mitigated' };
  if (r.id === 'R003') return { ...r, probability: 1, impact: 1, status: 'Mitigated' };
  return { ...r, probability: Math.max(1, r.probability - 2), impact: Math.max(1, r.impact - 2), status: 'Mitigated' };
});

export const SOLVED_KPIS: KPI[] = [
  { id: 'kpi1', name: 'Disponibilidade ERP', value: 99.7, target: 99.5, unit: '%', trend: 'up' },
  { id: 'kpi2', name: 'MTBF (Infra)', value: 42, target: 30, unit: 'dias', trend: 'up' },
  { id: 'kpi3', name: 'MTTR (Incidentes)', value: 38, target: 60, unit: 'min', trend: 'down' },
  { id: 'kpi4', name: 'Incidentes Segurança', value: 3, target: 5, unit: '/mês', trend: 'down' },
  { id: 'kpi5', name: 'Acessos Revisados', value: 98, target: 100, unit: '%', trend: 'up' },
  { id: 'kpi6', name: 'Treinamentos Concluídos', value: 100, target: 100, unit: '%', trend: 'up' },
];

export const SOLVED_ISO_CONTROLS: ISOControl[] = ISO_CONTROLS.map(c => {
  if (c.code === 'A.9') return { ...c, status: 'Implementado' };
  if (c.code === 'A.12') return { ...c, status: 'Implementado' };
  return { ...c, status: 'Implementado' };
});

export const SOLVED_COBIT_PROCESSES: COBITProcess[] = COBIT_PROCESSES.map(p => {
  if (p.code === 'EDM01') return { ...p, maturity: 4, status: 'Implementado' };
  if (p.code === 'DSS05') return { ...p, maturity: 3, status: 'Implementado' };
  return { ...p, maturity: Math.min(5, p.maturity + 2), status: 'Implementado' };
});

export const SOLVED_LGPD_MAPPING: DataMapping[] = LGPD_MAPPING.map(m => ({ ...m, status: 'OK' }));

export const SOLVED_KANBAN_TASKS: KanbanTask[] = [
  ...Array(14).fill(null).map((_, i) => ({ id: i + 1, title: `Tarefa Concluída ${i + 1}`, status: 'done' as const, priority: 'Média' as const, owner: 'Equipe TI' })),
  { id: 15, title: 'Tarefa em Ajuste Final', status: 'doing' as const, priority: 'Baixa' as const, owner: 'Equipe TI' },
  { id: 16, title: 'Monitoramento Pós-Go-Live', status: 'doing' as const, priority: 'Baixa' as const, owner: 'Equipe TI' },
];

export const SOLVED_NON_CONFORMITIES: NonConformity[] = [
  { id: 'NC-009', date: '2026-03-10', description: 'Ajuste menor em política de senhas', rootCause: 'Melhoria contínua', action: 'Revisar documento', deadline: '2026-04-10', status: 'Em andamento' }
];

export const SOLVED_COSTS: CostEntry[] = COSTS.map(c => {
  const actual = c.category === 'Segurança' ? 580000 : (c.category === 'Infraestrutura' ? 1180000 : Math.round(c.budget * 0.98));
  return { ...c, actual, percentage: Math.round((actual / c.budget) * 100) };
});

export const SOLVED_CHECKLIST: ChecklistPhase[] = CHECKLIST_DATA.map(p => ({
  ...p,
  status: 'CHECK',
  items: p.items.map(i => ({ ...i, completed: true }))
}));

export const SOLVED_PROJECT_STEPS: ProjectStep[] = INITIAL_PROJECT_STEPS.map(s => ({ ...s, completed: true }));

export const SOLVED_AUDIT_PLAN: AuditEntry[] = AUDIT_PLAN.map(a => ({ ...a, status: 'Concluído' }));

export const SOLVED_STAKEHOLDERS: Stakeholder[] = STAKEHOLDERS.map(s => ({ ...s, influence: 'Alta' }));
