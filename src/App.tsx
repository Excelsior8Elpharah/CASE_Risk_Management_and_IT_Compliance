import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, BarChart3, ShieldAlert, FileCheck, Lock, Network, 
  ShieldCheck, ClipboardList, GitMerge, Target, RotateCw, Trello, 
  Calendar, Scale, Activity, CheckCircle2, Cpu, Users, 
  DollarSign, Leaf, GraduationCap, MessageSquare, Search, Bot,
  ChevronRight, Menu, X, AlertTriangle, CheckCircle, Info,
  Plus, Trash2, Edit2, ListTodo, ListCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, PieChart, Pie, Cell, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { 
  TABS, INITIAL_RISKS, INITIAL_KPIS, 
  ISO_CONTROLS, COBIT_PROCESSES, LGPD_MAPPING, 
  BIA_DATA, DECISIONS, TRAININGS, 
  AUDIT_PLAN, COSTS, STAKEHOLDERS, 
  NON_CONFORMITIES, BRIEFINGS, INITIAL_PROJECT_STEPS,
  ISO_31000_STEPS, CHECKLIST_DATA,
  SOLVED_RISKS, SOLVED_KPIS, SOLVED_ISO_CONTROLS,
  SOLVED_COBIT_PROCESSES, SOLVED_LGPD_MAPPING,
  SOLVED_KANBAN_TASKS, SOLVED_NON_CONFORMITIES,
  SOLVED_COSTS, SOLVED_CHECKLIST, SOLVED_PROJECT_STEPS,
  SOLVED_AUDIT_PLAN, SOLVED_STAKEHOLDERS, INITIAL_KANBAN_TASKS
} from './constants';
import { Card, StatCard, BriefingPopup, Modal } from './components/UI';
import { cn } from './lib/utils';
import { 
  Risk, KPI, ISOControl, COBITProcess, 
  DataMapping, BIAEntry, Decision, 
  Training, AuditEntry, CostEntry, 
  Stakeholder, NonConformity, TabDefinition, KanbanTask, ProjectStep,
  Briefing, ChecklistPhase
} from './types';

const ICON_MAP: Record<string, any> = {
  LayoutDashboard, BarChart3, ShieldAlert, FileCheck, Lock, Network, 
  ShieldCheck, ClipboardList, GitMerge, Target, RotateCw, Trello, 
  Calendar, Scale, Activity, CheckCircle2, Cpu, Users, 
  DollarSign, Leaf, GraduationCap, MessageSquare, Search, Bot,
  Plus, Trash2, Edit2, ListTodo, ListCheck
};

const ICON_LIST = [
  'LayoutDashboard', 'BarChart3', 'ShieldAlert', 'FileCheck', 'Lock', 'Network', 
  'ShieldCheck', 'ClipboardList', 'GitMerge', 'Target', 'RotateCw', 'Trello', 
  'Calendar', 'Scale', 'Activity', 'CheckCircle2', 'Cpu', 'Users', 
  'DollarSign', 'Leaf', 'GraduationCap', 'MessageSquare', 'Search', 'Bot',
  'AlertTriangle', 'CheckCircle', 'Info', 'Plus', 'Trash2', 'Edit2', 'ListTodo'
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [themeColor, setThemeColor] = useState(() => localStorage.getItem('themeColor') || '#10b981');
  const [bgColor, setBgColor] = useState(() => localStorage.getItem('bgColor') || 'bg-slate-50');
  
  const [tabs, setTabs] = useState<TabDefinition[]>(() => {
    const saved = localStorage.getItem('tabs');
    const currentTabs = saved ? JSON.parse(saved) : TABS;
    // Ensure new tabs are added if they exist in TABS but not in saved
    const missingTabs = TABS.filter(t => !currentTabs.find((ct: any) => ct.id === t.id));
    if (missingTabs.length > 0) {
      return [...currentTabs, ...missingTabs];
    }
    return currentTabs;
  });

  const [isTabSettingsOpen, setIsTabSettingsOpen] = useState(false);
  const [isTransformed, setIsTransformed] = useState(() => localStorage.getItem('isTransformed') === 'true');

  useEffect(() => {
    localStorage.setItem('isTransformed', isTransformed.toString());
  }, [isTransformed]);

  const toggleTransformation = () => {
    const nextState = !isTransformed;
    setIsTransformed(nextState);
    
    if (nextState) {
      setRisks(SOLVED_RISKS);
      setKpis(SOLVED_KPIS);
      setIsoControls(SOLVED_ISO_CONTROLS);
      setCobitProcesses(SOLVED_COBIT_PROCESSES);
      setLgpdMapping(SOLVED_LGPD_MAPPING);
      setKanbanTasks(SOLVED_KANBAN_TASKS);
      setNonConformities(SOLVED_NON_CONFORMITIES);
      setCosts(SOLVED_COSTS);
      setChecklistPhases(SOLVED_CHECKLIST);
      setProjectSteps(SOLVED_PROJECT_STEPS);
      setAuditPlan(SOLVED_AUDIT_PLAN);
      setStakeholders(SOLVED_STAKEHOLDERS);
    } else {
      setRisks(INITIAL_RISKS);
      setKpis(INITIAL_KPIS);
      setIsoControls(ISO_CONTROLS);
      setCobitProcesses(COBIT_PROCESSES);
      setLgpdMapping(LGPD_MAPPING);
      setKanbanTasks(INITIAL_KANBAN_TASKS);
      setNonConformities(NON_CONFORMITIES);
      setCosts(COSTS);
      setChecklistPhases(CHECKLIST_DATA);
      setProjectSteps(INITIAL_PROJECT_STEPS);
      setAuditPlan(AUDIT_PLAN);
      setStakeholders(STAKEHOLDERS);
    }
  };

  const isDarkBg = bgColor.includes('900') || bgColor.includes('800') || bgColor.includes('700');

  // State for all data lists
  const [risks, setRisks] = useState<Risk[]>(() => {
    const saved = localStorage.getItem('risks');
    const isTransformedSaved = localStorage.getItem('isTransformed') === 'true';
    if (isTransformedSaved) return SOLVED_RISKS;
    return saved ? JSON.parse(saved) : INITIAL_RISKS;
  });
  const [kpis, setKpis] = useState<KPI[]>(() => {
    const saved = localStorage.getItem('kpis');
    const isTransformedSaved = localStorage.getItem('isTransformed') === 'true';
    if (isTransformedSaved) return SOLVED_KPIS;
    return saved ? JSON.parse(saved) : INITIAL_KPIS;
  });
  const [isoControls, setIsoControls] = useState<ISOControl[]>(() => {
    const saved = localStorage.getItem('isoControls');
    const isTransformedSaved = localStorage.getItem('isTransformed') === 'true';
    if (isTransformedSaved) return SOLVED_ISO_CONTROLS;
    return saved ? JSON.parse(saved) : ISO_CONTROLS;
  });
  const [cobitProcesses, setCobitProcesses] = useState<COBITProcess[]>(() => {
    const saved = localStorage.getItem('cobitProcesses');
    const isTransformedSaved = localStorage.getItem('isTransformed') === 'true';
    if (isTransformedSaved) return SOLVED_COBIT_PROCESSES;
    return saved ? JSON.parse(saved) : COBIT_PROCESSES;
  });
  const [lgpdMapping, setLgpdMapping] = useState<DataMapping[]>(() => {
    const saved = localStorage.getItem('lgpdMapping');
    const isTransformedSaved = localStorage.getItem('isTransformed') === 'true';
    if (isTransformedSaved) return SOLVED_LGPD_MAPPING;
    return saved ? JSON.parse(saved) : LGPD_MAPPING;
  });
  const [biaData, setBiaData] = useState<BIAEntry[]>(() => {
    const saved = localStorage.getItem('biaData');
    return saved ? JSON.parse(saved) : BIA_DATA;
  });
  const [decisions, setDecisions] = useState<Decision[]>(() => {
    const saved = localStorage.getItem('decisions');
    return saved ? JSON.parse(saved) : DECISIONS;
  });
  const [trainings, setTrainings] = useState<Training[]>(() => {
    const saved = localStorage.getItem('trainings');
    return saved ? JSON.parse(saved) : TRAININGS;
  });
  const [auditPlan, setAuditPlan] = useState<AuditEntry[]>(() => {
    const saved = localStorage.getItem('auditPlan');
    const isTransformedSaved = localStorage.getItem('isTransformed') === 'true';
    if (isTransformedSaved) return SOLVED_AUDIT_PLAN;
    return saved ? JSON.parse(saved) : AUDIT_PLAN;
  });
  const [costs, setCosts] = useState<CostEntry[]>(() => {
    const saved = localStorage.getItem('costs');
    const isTransformedSaved = localStorage.getItem('isTransformed') === 'true';
    if (isTransformedSaved) return SOLVED_COSTS;
    return saved ? JSON.parse(saved) : COSTS;
  });
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(() => {
    const saved = localStorage.getItem('stakeholders');
    const isTransformedSaved = localStorage.getItem('isTransformed') === 'true';
    if (isTransformedSaved) return SOLVED_STAKEHOLDERS;
    return saved ? JSON.parse(saved) : STAKEHOLDERS;
  });
  const [nonConformities, setNonConformities] = useState<NonConformity[]>(() => {
    const saved = localStorage.getItem('nonConformities');
    const isTransformedSaved = localStorage.getItem('isTransformed') === 'true';
    if (isTransformedSaved) return SOLVED_NON_CONFORMITIES;
    return saved ? JSON.parse(saved) : NON_CONFORMITIES;
  });
  const [kanbanTasks, setKanbanTasks] = useState<KanbanTask[]>(() => {
    const saved = localStorage.getItem('kanbanTasks');
    const isTransformedSaved = localStorage.getItem('isTransformed') === 'true';
    if (isTransformedSaved) return SOLVED_KANBAN_TASKS;
    return saved ? JSON.parse(saved) : INITIAL_KANBAN_TASKS;
  });

  const [projectSteps, setProjectSteps] = useState<ProjectStep[]>(() => {
    const saved = localStorage.getItem('projectSteps');
    const isTransformedSaved = localStorage.getItem('isTransformed') === 'true';
    if (isTransformedSaved) return SOLVED_PROJECT_STEPS;
    return saved ? JSON.parse(saved) : INITIAL_PROJECT_STEPS;
  });

  const [checklistPhases, setChecklistPhases] = useState<ChecklistPhase[]>(() => {
    const saved = localStorage.getItem('checklistPhases');
    const isTransformedSaved = localStorage.getItem('isTransformed') === 'true';
    if (isTransformedSaved) return SOLVED_CHECKLIST;
    return saved ? JSON.parse(saved) : CHECKLIST_DATA;
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', themeColor);
    localStorage.setItem('themeColor', themeColor);
  }, [themeColor]);

  useEffect(() => {
    localStorage.setItem('bgColor', bgColor);
  }, [bgColor]);

  // Persist all state
  useEffect(() => { localStorage.setItem('risks', JSON.stringify(risks)); }, [risks]);
  useEffect(() => { localStorage.setItem('kpis', JSON.stringify(kpis)); }, [kpis]);
  useEffect(() => { localStorage.setItem('isoControls', JSON.stringify(isoControls)); }, [isoControls]);
  useEffect(() => { localStorage.setItem('cobitProcesses', JSON.stringify(cobitProcesses)); }, [cobitProcesses]);
  useEffect(() => { localStorage.setItem('lgpdMapping', JSON.stringify(lgpdMapping)); }, [lgpdMapping]);
  useEffect(() => { localStorage.setItem('biaData', JSON.stringify(biaData)); }, [biaData]);
  useEffect(() => { localStorage.setItem('decisions', JSON.stringify(decisions)); }, [decisions]);
  useEffect(() => { localStorage.setItem('trainings', JSON.stringify(trainings)); }, [trainings]);
  useEffect(() => { localStorage.setItem('auditPlan', JSON.stringify(auditPlan)); }, [auditPlan]);
  useEffect(() => { localStorage.setItem('costs', JSON.stringify(costs)); }, [costs]);
  useEffect(() => { localStorage.setItem('stakeholders', JSON.stringify(stakeholders)); }, [stakeholders]);
  useEffect(() => { localStorage.setItem('nonConformities', JSON.stringify(nonConformities)); }, [nonConformities]);
  useEffect(() => { localStorage.setItem('kanbanTasks', JSON.stringify(kanbanTasks)); }, [kanbanTasks]);
  useEffect(() => { localStorage.setItem('projectSteps', JSON.stringify(projectSteps)); }, [projectSteps]);
  useEffect(() => { localStorage.setItem('checklistPhases', JSON.stringify(checklistPhases)); }, [checklistPhases]);
  useEffect(() => { localStorage.setItem('tabs', JSON.stringify(tabs)); }, [tabs]);

  const addRisk = (risk: Risk) => setRisks([...risks, risk]);
  const deleteRisk = (id: string) => setRisks(risks.filter(r => r.id !== id));
  
  const addKPI = (kpi: KPI) => setKpis([...kpis, kpi]);
  const deleteKPI = (id: string) => setKpis(kpis.filter(k => k.id !== id));
  const updateKPI = (id: string, updates: Partial<KPI>) => {
    setKpis(kpis.map(k => k.id === id ? { ...k, ...updates } : k));
  };

  const renderContent = () => {
    const currentTab = tabs.find(t => t.id === activeTab);
    const briefing = currentTab?.briefing;

    switch (activeTab) {
      case 'overview': return <OverviewTab kpis={kpis} risks={risks} />;
      case 'risks_summary': return <RisksTab risks={risks} onAdd={addRisk} onDelete={deleteRisk} />;
      case 'kpis': return <KPIsTab kpis={kpis} onUpdate={updateKPI} onAdd={addKPI} onDelete={deleteKPI} isTransformed={isTransformed} />;
      case 'compliance_iso': return <ComplianceISOTab />;
      case 'iso27001': return <ISO27001Tab isoControls={isoControls} setIsoControls={setIsoControls} />;
      case 'cobit': return <COBITTab cobitProcesses={cobitProcesses} setCobitProcesses={setCobitProcesses} />;
      case 'lgpd': return <LGPDTab lgpdMapping={lgpdMapping} setLgpdMapping={setLgpdMapping} />;
      case '5w2h': return <FiveWTwoHTab isTransformed={isTransformed} />;
      case 'ishikawa': return <IshikawaTab isTransformed={isTransformed} />;
      case 'swot': return <SWOTTab isTransformed={isTransformed} />;
      case 'pdca': return <PDCATab isTransformed={isTransformed} />;
      case 'kanban': return <KanbanTab tasks={kanbanTasks} setTasks={setKanbanTasks} isTransformed={isTransformed} />;
      case 'roadmap': return <RoadmapTab isTransformed={isTransformed} />;
      case 'decision_matrix': return (
        <div className="space-y-6">
          <DecisionMatrixTab />
          <DecisionsTab decisions={decisions} setDecisions={setDecisions} />
        </div>
      );
      case 'continuity': return <ContinuityTab biaData={biaData} setBiaData={setBiaData} />;
      case 'quality': return <QualityTab nonConformities={nonConformities} setNonConformities={setNonConformities} />;
      case 'tech': return <TechTab />;
      case 'org': return <OrgTab />;
      case 'costs': return <CostsTab costs={costs} setCosts={setCosts} />;
      case 'ethics': return <EthicsTab />;
      case 'culture': return <CultureTab trainings={trainings} setTrainings={setTrainings} />;
      case 'stakeholders': return <StakeholdersTab stakeholders={stakeholders} setStakeholders={setStakeholders} />;
      case 'audit': return <AuditTab auditPlan={auditPlan} setAuditPlan={setAuditPlan} />;
      case 'project_chronology': return <ProjectChronologyTab steps={projectSteps} setSteps={setProjectSteps} onNavigate={(tabId) => setActiveTab(tabId)} />;
      case 'checklist': return <ChecklistTab phases={checklistPhases} setPhases={setChecklistPhases} />;
      case 'ai_chat': return <AIChatTab />;
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-slate-400 py-20">
          <Info className="w-12 h-12 mb-4 opacity-20" />
          <p className="text-lg font-medium">Módulo em Desenvolvimento</p>
          <p className="text-sm">A aba "{currentTab?.label}" está sendo populada com dados do cenário.</p>
        </div>
      );
    }
  };

  return (
    <div className={cn(
      "flex h-screen font-sans overflow-hidden relative transition-colors duration-500", 
      bgColor, 
      isDarkBg ? "text-slate-100" : "text-slate-900"
    )}>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 ease-in-out border-r border-slate-800 fixed lg:relative z-50 h-full",
        isSidebarOpen ? "w-64" : "w-20",
        !isSidebarOpen && "lg:w-20",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0" style={{ backgroundColor: themeColor }}>
              <ShieldAlert size={20} />
            </div>
            {isSidebarOpen && <h1 className="font-bold text-white truncate">IT Risk & Compliance</h1>}
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
          {['Executive', 'Governance', 'Operational', 'Decision', 'Strategic'].map(category => (
            <div key={category} className="mb-6">
              {isSidebarOpen && (
                <p className="px-6 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {category}
                </p>
              )}
              {tabs.filter(t => t.category === category).map(tab => {
                const Icon = ICON_MAP[tab.icon] || Info;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      if (window.innerWidth < 1024) setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-6 py-2.5 text-sm transition-colors relative group",
                      activeTab === tab.id ? "text-white" : "hover:text-white hover:bg-slate-800"
                    )}
                    style={activeTab === tab.id ? { backgroundColor: `${themeColor}20` } : {}}
                  >
                    {activeTab === tab.id && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute left-0 w-1 h-full" 
                        style={{ backgroundColor: themeColor }}
                      />
                    )}
                    <Icon size={18} className={cn(activeTab === tab.id ? "" : "text-slate-400 group-hover:text-slate-200")} style={activeTab === tab.id ? { color: themeColor } : {}} />
                    {isSidebarOpen && <span className="truncate">{tab.label}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          {isSidebarOpen && (
            <div className="space-y-4 mb-4">
              <button 
                onClick={() => setIsTabSettingsOpen(true)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-slate-700/50"
              >
                <Edit2 size={14} />
                Configurar Abas
              </button>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Cor de Destaque</p>
                <div className="flex gap-2 flex-wrap">
                  {['#10b981', '#6366f1', '#f43f5e', '#f59e0b', '#8b5cf6'].map(color => (
                    <button
                      key={color}
                      onClick={() => setThemeColor(color)}
                      className={cn(
                        "w-6 h-6 rounded-full border-2 transition-transform hover:scale-110",
                        themeColor === color ? "border-white" : "border-transparent"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Fundo</p>
                <div className="flex gap-2 flex-wrap">
                  {[
                    // Vibrant
                    { id: 'bg-indigo-100', color: '#e0e7ff' },
                    { id: 'bg-teal-100', color: '#ccfbf1' },
                    { id: 'bg-cyan-100', color: '#cffafe' },
                    { id: 'bg-violet-100', color: '#ede9fe' },
                    // Dark
                    { id: 'bg-slate-900', color: '#0f172a' },
                    { id: 'bg-zinc-900', color: '#18181b' },
                    { id: 'bg-indigo-900', color: '#1e1b4b' },
                    { id: 'bg-emerald-900', color: '#064e3b' },
                    { id: 'bg-rose-900', color: '#4c0519' },
                  ].map(bg => (
                    <button
                      key={bg.id}
                      onClick={() => setBgColor(bg.id)}
                      className={cn(
                        "w-6 h-6 rounded-md border-2 transition-transform hover:scale-110",
                        bgColor === bg.id ? "border-white" : "border-slate-700"
                      )}
                      style={{ backgroundColor: bg.color }}
                      title={bg.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full p-2 flex items-center justify-center hover:bg-slate-800 transition-colors rounded-lg"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/50 flex items-center justify-between px-4 lg:px-8 shrink-0 sticky top-0 z-30 text-slate-900">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2 text-sm text-slate-500 overflow-hidden">
              <span className="hidden sm:inline">Dashboard</span>
              <ChevronRight size={14} className="hidden sm:inline" />
              <span className="font-medium text-slate-900 truncate">{tabs.find(t => t.id === activeTab)?.label}</span>
            </div>
            <button
              onClick={toggleTransformation}
              className={cn(
                "ml-4 px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-sm",
                isTransformed 
                  ? "bg-rose-600 text-white hover:bg-rose-700" 
                  : "bg-emerald-600 text-white hover:bg-emerald-700"
              )}
            >
              {isTransformed ? (
                <>
                  <RotateCw size={14} className="animate-spin-slow" />
                  <span>🔄 VOLTAR AO CENÁRIO ATUAL</span>
                </>
              ) : (
                <>
                  <CheckCircle size={14} />
                  <span>✅ SOLUÇÃO APLICADA</span>
                </>
              )}
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-full border border-rose-100">
              {risks.filter(r => r.impact >= 4).length} Riscos Críticos
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {isTabSettingsOpen && (
          <TabSettingsModal 
            tabs={tabs} 
            setTabs={setTabs} 
            onClose={() => setIsTabSettingsOpen(false)} 
            themeColor={themeColor}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function TabSettingsModal({ tabs, setTabs, onClose, themeColor }: { tabs: TabDefinition[], setTabs: (t: TabDefinition[]) => void, onClose: () => void, themeColor: string }) {
  const [editingTab, setEditingTab] = useState<TabDefinition | null>(null);
  const [newTabLabel, setNewTabLabel] = useState('');
  const [newTabIcon, setNewTabIcon] = useState('LayoutDashboard');
  const [newTabCategory, setNewTabCategory] = useState<'Executive' | 'Governance' | 'Operational' | 'Decision' | 'Strategic'>('Operational');

  const handleAddTab = () => {
    if (!newTabLabel) return;
    const newTab: TabDefinition = {
      id: `custom_${Date.now()}`,
      label: newTabLabel,
      icon: newTabIcon,
      category: newTabCategory,
      briefing: {
        title: newTabLabel,
        description: 'Módulo personalizado adicionado pelo usuário.',
        importance: 'Este módulo foi criado para atender necessidades específicas de governança da organização.',
        frameworks: 'Definido pelo usuário.'
      }
    };
    setTabs([...tabs, newTab]);
    setNewTabLabel('');
  };

  const handleDeleteTab = (id: string) => {
    if (id === 'overview') {
      alert('A aba "Visão Geral" é essencial e não pode ser removida.');
      return;
    }
    setTabs(tabs.filter(t => t.id !== id));
  };

  const handleUpdateTab = (id: string, updates: Partial<TabDefinition>) => {
    setTabs(tabs.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] relative z-10 overflow-hidden border border-slate-200 flex flex-col"
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Edit2 size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Configuração de Abas</h3>
              <p className="text-xs text-slate-500">Personalize o menu lateral e os ícones do sistema</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex">
          {/* List of Tabs */}
          <div className="w-1/2 border-r border-slate-100 overflow-y-auto p-6 space-y-6">
            {['Executive', 'Governance', 'Operational', 'Decision', 'Strategic'].map(category => (
              <div key={category}>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{category}</h4>
                <div className="space-y-2">
                  {tabs.filter(t => t.category === category).map(tab => {
                    const Icon = ICON_MAP[tab.icon] || Info;
                    return (
                      <div key={tab.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 group">
                        <div className="flex items-center gap-3">
                          <Icon size={18} className="text-slate-400" />
                          <span className="text-sm font-medium text-slate-700">{tab.label}</span>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => setEditingTab(tab)}
                            className="p-1.5 text-slate-400 hover:text-primary hover:bg-white rounded-lg transition-colors"
                          >
                            <Edit2 size={14} />
                          </button>
                          {tab.id !== 'overview' && (
                            <button 
                              onClick={() => handleDeleteTab(tab.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-white rounded-lg transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Edit / Add Panel */}
          <div className="w-1/2 p-6 bg-slate-50/50 overflow-y-auto">
            {editingTab ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900">Editar Aba</h4>
                  <button onClick={() => setEditingTab(null)} className="text-xs text-primary font-bold">Voltar para Adicionar</button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Nome da Aba</label>
                    <input 
                      type="text" 
                      value={editingTab.label}
                      onChange={(e) => setEditingTab({ ...editingTab, label: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Ícone</label>
                    <div className="grid grid-cols-6 gap-2">
                      {ICON_LIST.map(iconName => {
                        const Icon = ICON_MAP[iconName] || Info;
                        return (
                          <button
                            key={iconName}
                            onClick={() => setEditingTab({ ...editingTab, icon: iconName })}
                            className={cn(
                              "p-2 rounded-lg border transition-all flex items-center justify-center",
                              editingTab.icon === iconName ? "bg-primary text-white border-primary" : "bg-white text-slate-400 border-slate-200 hover:border-primary/50"
                            )}
                          >
                            <Icon size={18} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      handleUpdateTab(editingTab.id, editingTab);
                      setEditingTab(null);
                    }}
                    className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    Salvar Alterações
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h4 className="font-bold text-slate-900">Adicionar Nova Aba</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Nome da Aba</label>
                    <input 
                      type="text" 
                      placeholder="Ex: KPIs de TI"
                      value={newTabLabel}
                      onChange={(e) => setNewTabLabel(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Categoria</label>
                    <select 
                      value={newTabCategory}
                      onChange={(e) => setNewTabCategory(e.target.value as any)}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm bg-white"
                    >
                      <option value="Executive">Executive</option>
                      <option value="Governance">Governance</option>
                      <option value="Operational">Operational</option>
                      <option value="Decision">Decision</option>
                      <option value="Strategic">Strategic</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Ícone</label>
                    <div className="grid grid-cols-6 gap-2">
                      {ICON_LIST.map(iconName => {
                        const Icon = ICON_MAP[iconName] || Info;
                        return (
                          <button
                            key={iconName}
                            onClick={() => setNewTabIcon(iconName)}
                            className={cn(
                              "p-2 rounded-lg border transition-all flex items-center justify-center",
                              newTabIcon === iconName ? "bg-primary text-white border-primary" : "bg-white text-slate-400 border-slate-200 hover:border-primary/50"
                            )}
                          >
                            <Icon size={18} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button 
                    onClick={handleAddTab}
                    disabled={!newTabLabel}
                    className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Adicionar Aba
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-white border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Concluir
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function OverviewTab({ kpis, risks }: { kpis: KPI[], risks: Risk[] }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {kpis.slice(0, 4).map(kpi => (
          <StatCard 
            key={kpi.id} 
            title={kpi.name} 
            value={kpi.value} 
            unit={kpi.unit} 
            trend={kpi.trend} 
            target={kpi.target} 
            briefing={BRIEFINGS.kpis}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Contexto da Organização" className="lg:col-span-2" briefing={BRIEFINGS.overview}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Dados da Empresa</h4>
              <div className="space-y-2">
                {[
                  { label: 'Nome', val: 'Serviços Integrados S.A.' },
                  { label: 'Porte', val: 'Médio' },
                  { label: 'Setor', val: 'Serviços' },
                  { label: 'Funcionários', val: '450' },
                  { label: 'Sistemas Críticos', val: 'ERP, CRM, Portal, Financeiro' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between text-sm border-b border-slate-100 pb-1">
                    <span className="text-slate-500">{item.label}</span>
                    <span className="font-semibold text-slate-800">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Objetivos Estratégicos</h4>
              <ul className="space-y-2">
                {[
                  'Aumentar eficiência operacional em 30%',
                  'Melhorar NPS de 65 para 80',
                  'Ampliar participação de mercado em 15%',
                  'Digitalizar 100% dos processos internos',
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600 p-2 bg-slate-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <Card title="Status de Conformidade ISO 27001" briefing={BRIEFINGS.iso_radar}>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Implementado', value: 45 },
                    { name: 'Em Andamento', value: 30 },
                    { name: 'Não Iniciado', value: 25 },
                  ]}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="var(--primary-color)" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#e2e8f0" />
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Distribuição de Riscos por Categoria" briefing={BRIEFINGS.risk_distribution}>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Técnicos', value: risks.filter(r => r.category === 'Technical').length, critical: risks.filter(r => r.category === 'Technical' && r.impact >= 4).length },
                { name: 'Compliance', value: risks.filter(r => r.category === 'Compliance').length, critical: risks.filter(r => r.category === 'Compliance' && r.impact >= 4).length },
                { name: 'Operacionais', value: risks.filter(r => r.category === 'Operational').length, critical: risks.filter(r => r.category === 'Operational' && r.impact >= 4).length },
                { name: 'Estratégicos', value: risks.filter(r => r.category === 'Strategic').length, critical: risks.filter(r => r.category === 'Strategic' && r.impact >= 4).length },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Bar dataKey="value" name="Total" fill="var(--primary-color)" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="critical" name="Críticos" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Top Riscos Críticos" briefing={BRIEFINGS.critical_risks}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100">
                  <th className="pb-3 font-semibold px-2">Risco</th>
                  <th className="pb-3 font-semibold text-center px-2">Impacto</th>
                  <th className="pb-3 font-semibold px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {risks.filter(r => r.impact >= 4).slice(0, 5).map(risk => (
                  <tr key={risk.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 font-medium text-slate-900 px-2">{risk.description}</td>
                    <td className="py-3 text-center px-2">
                      <span className={cn(
                        "inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold text-white",
                        risk.impact >= 4 ? "bg-rose-500" : "bg-amber-500"
                      )}>
                        {risk.impact}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        risk.status === 'In Treatment' ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-slate-100 text-slate-600"
                      )}>
                        {risk.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

function RisksTab({ risks, onAdd, onDelete }: { risks: Risk[], onAdd: (r: Risk) => void, onDelete: (id: string) => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRisk, setNewRisk] = useState<Partial<Risk>>({
    category: 'Technical',
    probability: 3,
    impact: 3,
    status: 'Identified'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...newRisk,
      id: Math.random().toString(36).substr(2, 9),
      owner: 'Admin',
      deadline: new Date().toISOString().split('T')[0]
    } as Risk);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Mapeamento de Riscos</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-hover transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> Novo Risco
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Matriz de Calor (Probabilidade x Impacto)" briefing={BRIEFINGS.risk_matrix}>
          <div className="grid grid-cols-6 grid-rows-6 gap-1 h-[300px] sm:h-[400px] mt-4">
            <div className="col-start-1 row-start-1 row-span-5 flex items-center justify-center [writing-mode:vertical-lr] rotate-180 text-[10px] sm:text-xs font-bold text-slate-400">PROBABILIDADE</div>
            <div className="col-start-2 row-start-6 col-span-5 flex items-center justify-center text-[10px] sm:text-xs font-bold text-slate-400">IMPACTO</div>
            
            {[5, 4, 3, 2, 1].map((p) => (
              [1, 2, 3, 4, 5].map((i) => {
                const score = p * i;
                let color = "bg-emerald-50";
                if (score >= 20) color = "bg-rose-500";
                else if (score >= 12) color = "bg-rose-400";
                else if (score >= 8) color = "bg-amber-400";
                else if (score >= 4) color = "bg-amber-200";

                const risksInCell = risks.filter(r => r.probability === p && r.impact === i);

                return (
                  <div 
                    key={`${p}-${i}`} 
                    className={cn(
                      "relative flex items-center justify-center rounded-sm transition-transform hover:scale-105 cursor-help",
                      color
                    )}
                  >
                    {risksInCell.length > 0 && (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/30 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                        {risksInCell.length}
                      </div>
                    )}
                  </div>
                );
              })
            ))}
          </div>
        </Card>

        <Card title="Timeline de Eventos de Risco" briefing={BRIEFINGS.risk_timeline}>
          <div className="space-y-6 py-4">
            {[
              { date: '15 Mar 2026', event: 'Indisponibilidade ERP', type: 'Incidente', severity: 'Alta' },
              { date: '10 Mar 2026', event: 'Tentativa de Acesso Não Autorizado', type: 'Segurança', severity: 'Média' },
              { date: '05 Mar 2026', event: 'Falha no Backup Diário', type: 'Operacional', severity: 'Alta' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 relative">
                {idx !== 2 && <div className="absolute left-[7px] top-5 bottom-0 w-0.5 bg-slate-100" />}
                <div className={cn(
                  "w-4 h-4 rounded-full mt-1 shrink-0 z-10 border-2 border-white",
                  item.severity === 'Alta' ? "bg-rose-500" : 
                  item.severity === 'Média' ? "bg-amber-500" : "bg-emerald-500"
                )} />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.date}</p>
                  <p className="text-sm font-semibold text-slate-800">{item.event}</p>
                  <p className="text-xs text-slate-500">{item.type} • Severidade {item.severity}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Inventário de Riscos" briefing={BRIEFINGS.risk_inventory}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-slate-500 border-b border-slate-100">
                <th className="pb-3 font-semibold px-2">Risco</th>
                <th className="pb-3 font-semibold px-2">Categoria</th>
                <th className="pb-3 font-semibold px-2">Prob.</th>
                <th className="pb-3 font-semibold px-2">Imp.</th>
                <th className="pb-3 font-semibold px-2">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {risks.map(risk => (
                <tr key={risk.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-medium text-slate-900 px-2">{risk.description}</td>
                  <td className="py-4 text-slate-600 px-2">{risk.category}</td>
                  <td className="py-4 px-2">{risk.probability}</td>
                  <td className="py-4 px-2">{risk.impact}</td>
                  <td className="py-4 px-2">
                    <button onClick={() => onDelete(risk.id)} className="text-rose-500 hover:text-rose-700 p-1">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal Novo Risco */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl w-full max-w-md relative z-10 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900">Adicionar Novo Risco</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Descrição</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                    onChange={e => setNewRisk({...newRisk, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Probabilidade (1-5)</label>
                    <input 
                      type="number" min="1" max="5" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                      value={newRisk.probability}
                      onChange={e => setNewRisk({...newRisk, probability: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Impacto (1-5)</label>
                    <input 
                      type="number" min="1" max="5" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm"
                      value={newRisk.impact}
                      onChange={e => setNewRisk({...newRisk, impact: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-xl font-bold hover:bg-primary-hover transition-colors mt-4">
                  Salvar Risco
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ISO27001Tab({ isoControls, setIsoControls }: { isoControls: ISOControl[], setIsoControls: (controls: ISOControl[]) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Maturidade por Domínio" className="lg:col-span-2" briefing={BRIEFINGS.iso_radar}>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                { subject: 'Políticas', A: 4, fullMark: 5 },
                { subject: 'Ativos', A: 5, fullMark: 5 },
                { subject: 'Acesso', A: 1, fullMark: 5 },
                { subject: 'Operações', A: 2, fullMark: 5 },
                { subject: 'Incidentes', A: 1, fullMark: 5 },
                { subject: 'Continuidade', A: 2, fullMark: 5 },
                { subject: 'Compliance', A: 3, fullMark: 5 },
              ]}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{fontSize: 12, fill: '#64748b'}} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{fontSize: 10}} />
                <Radar name="Maturidade Atual" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Resumo de Conformidade" briefing={BRIEFINGS.iso_summary}>
          <div className="space-y-4 py-4">
            {[
              { label: 'Controles Aplicáveis', value: 93 },
              { label: 'Implementados', value: 42, color: 'text-emerald-600' },
              { label: 'Em Andamento', value: 38, color: 'text-amber-600' },
              { label: 'Não Iniciados', value: 13, color: 'text-slate-400' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-600">{item.label}</span>
                <span className={cn("text-lg font-bold", item.color || "text-slate-900")}>{item.value}</span>
              </div>
            ))}
            <div className="pt-4">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">Progresso Geral</p>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '45%' }} />
              </div>
              <p className="text-right text-xs font-bold text-emerald-600 mt-1">45%</p>
            </div>
          </div>
        </Card>
      </div>

        <Card title="Checklist de Controles do Anexo A (ISO 27001:2022)" briefing={BRIEFINGS.iso_summary}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-slate-500 border-b border-slate-100">
                <th className="pb-3 font-semibold px-2">Código</th>
                <th className="pb-3 font-semibold px-2">Controle</th>
                <th className="pb-3 font-semibold px-2">Status</th>
                <th className="pb-3 font-semibold px-2">Evidência</th>
                <th className="pb-3 font-semibold px-2 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isoControls.map((control, idx) => (
                <tr key={control.code}>
                  <td className="py-4 font-bold text-slate-400 px-2">{control.code}</td>
                  <td className="py-4 font-medium text-slate-900 px-2">{control.name}</td>
                  <td className="py-4 px-2">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      control.status === 'Implementado' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                      control.status === 'Em andamento' ? "bg-amber-50 text-amber-700 border border-amber-100" :
                      control.status === 'Parcial' ? "bg-blue-50 text-blue-700 border border-blue-100" :
                      "bg-slate-100 text-slate-600 border border-slate-200"
                    )}>
                      {control.status}
                    </span>
                  </td>
                  <td className="py-4 text-slate-500 text-xs px-2">{control.evidence}</td>
                  <td className="py-4 px-2 text-right">
                    <button 
                      onClick={() => {
                        const newStatus = control.status === 'Implementado' ? 'Em andamento' : 'Implementado';
                        const newData = [...isoControls];
                        newData[idx] = { ...control, status: newStatus };
                        setIsoControls(newData);
                      }}
                      className="text-primary hover:text-primary-hover p-1"
                    >
                      <RotateCw size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function KPIsTab({ kpis, onUpdate, onAdd, onDelete, isTransformed }: { 
  kpis: KPI[], 
  onUpdate: (id: string, updates: Partial<KPI>) => void,
  onAdd: (kpi: KPI) => void,
  onDelete: (id: string) => void,
  isTransformed: boolean
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKPI, setEditingKPI] = useState<KPI | null>(null);
  const [formData, setFormData] = useState<Partial<KPI>>({
    name: '',
    value: 0,
    target: 0,
    unit: '',
    trend: 'stable'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingKPI) {
      onUpdate(editingKPI.id, formData);
    } else {
      onAdd({
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      } as KPI);
    }
    setIsModalOpen(false);
    setEditingKPI(null);
    setFormData({ name: '', value: 0, target: 0, unit: '', trend: 'stable' });
  };

  const openEdit = (kpi: KPI) => {
    setEditingKPI(kpi);
    setFormData(kpi);
    setIsModalOpen(true);
  };

  const KPI_BRIEFINGS: Record<string, Briefing> = {
    'Disponibilidade ERP': BRIEFINGS.kpi_disponibilidade,
    'MTBF': BRIEFINGS.kpi_mtbf,
    'MTTR': BRIEFINGS.kpi_mttr,
    'Incidentes de Segurança': BRIEFINGS.kpi_incidentes,
    'Acessos Revisados': BRIEFINGS.kpi_acessos,
    'Treinamentos Realizados': BRIEFINGS.kpi_treinamentos,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {kpis.slice(0, 6).map(kpi => (
          <StatCard 
            key={kpi.id} 
            title={kpi.name} 
            value={kpi.value} 
            unit={kpi.unit} 
            trend={kpi.trend} 
            target={kpi.target} 
            briefing={KPI_BRIEFINGS[kpi.name] || BRIEFINGS.kpis}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Performance de Controles" briefing={BRIEFINGS.iso_radar}>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={kpis.map(k => ({
                subject: k.name.split(' ')[0],
                A: typeof k.value === 'number' ? k.value : 0,
                fullMark: typeof k.target === 'number' ? k.target : 100
              }))}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{fontSize: 10, fill: '#64748b'}} />
                <Radar name="Controles" dataKey="A" stroke="var(--primary-color)" fill="var(--primary-color)" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Evolução do Risco Residual" briefing={BRIEFINGS.risk_matrix}>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={isTransformed ? [
                { month: 'Jan', risk: 45 },
                { month: 'Fev', risk: 38 },
                { month: 'Mar', risk: 25 },
                { month: 'Abr', risk: 18 },
                { month: 'Mai', risk: 12 },
              ] : [
                { month: 'Jan', risk: 45 },
                { month: 'Fev', risk: 42 },
                { month: 'Mar', risk: 38 },
                { month: 'Abr', risk: 40 },
                { month: 'Mai', risk: 35 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip />
                <Line type="monotone" dataKey="risk" stroke="var(--primary-color)" strokeWidth={3} dot={{r: 4, fill: 'var(--primary-color)'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card title="Gestão de Indicadores (KPIs)" briefing={BRIEFINGS.kpi_table}>
        <div className="flex justify-end mb-4">
          <button 
            onClick={() => { setEditingKPI(null); setFormData({ name: '', value: 0, target: 0, unit: '', trend: 'stable' }); setIsModalOpen(true); }}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-hover transition-colors flex items-center gap-2"
          >
            <Plus size={18} /> Adicionar KPI
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-slate-500 border-b border-slate-100">
                <th className="pb-3 font-semibold px-2">Indicador</th>
                <th className="pb-3 font-semibold px-2">Valor Atual</th>
                <th className="pb-3 font-semibold px-2">Meta</th>
                <th className="pb-3 font-semibold px-2">Status</th>
                <th className="pb-3 font-semibold px-2">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {kpis.map(kpi => (
                <tr key={kpi.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-medium text-slate-900 px-2">{kpi.name}</td>
                  <td className="py-4 text-slate-600 px-2">{kpi.value}{kpi.unit}</td>
                  <td className="py-4 text-slate-600 px-2">{kpi.target}{kpi.unit}</td>
                  <td className="py-4 px-2">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                      Number(kpi.value) >= Number(kpi.target) ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                    )}>
                      {Number(kpi.value) >= Number(kpi.target) ? 'Dentro da Meta' : 'Abaixo da Meta'}
                    </span>
                  </td>
                  <td className="py-4 px-2 flex gap-2">
                    <button 
                      onClick={() => openEdit(kpi)}
                      className="text-primary hover:text-primary-hover p-1"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => onDelete(kpi.id)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingKPI ? "Editar KPI" : "Adicionar Novo KPI"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nome do Indicador</label>
            <input 
              required
              type="text" 
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Valor Atual</label>
              <input 
                required
                type="number" step="0.1"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                value={formData.value}
                onChange={e => setFormData({...formData, value: parseFloat(e.target.value)})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Meta</label>
              <input 
                required
                type="number" step="0.1"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                value={formData.target}
                onChange={e => setFormData({...formData, target: parseFloat(e.target.value)})}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Unidade (ex: %, h)</label>
              <input 
                type="text" 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                value={formData.unit}
                onChange={e => setFormData({...formData, unit: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tendência</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                value={formData.trend}
                onChange={e => setFormData({...formData, trend: e.target.value as any})}
              >
                <option value="up">Subindo</option>
                <option value="down">Descendo</option>
                <option value="stable">Estável</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full bg-primary text-white py-2.5 rounded-xl font-bold hover:bg-primary-hover transition-colors mt-4">
            {editingKPI ? "Salvar Alterações" : "Criar KPI"}
          </button>
        </form>
      </Modal>
    </div>
  );
}

function DecisionMatrixTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Árvore de Decisão: Investimento em Redundância" briefing={BRIEFINGS.decision_matrix}>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-lg shadow-sm text-center text-slate-900">
                <p className="text-xs font-bold text-slate-400 uppercase">Problema</p>
                <p className="font-bold">Indisponibilidade ERP</p>
              </div>
              <div className="w-px h-8 bg-slate-200" />
              <div className="flex gap-12">
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg text-center">
                    <p className="text-xs font-bold text-rose-400 uppercase">Não Investir</p>
                    <p className="text-sm font-semibold">Custo: R$ 150k/mês</p>
                  </div>
                  <div className="mt-2 text-[10px] text-rose-600 font-bold">ALTO RISCO</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-center">
                    <p className="text-xs font-bold text-emerald-400 uppercase">Investir (R$ 500k)</p>
                    <p className="text-sm font-semibold">Payback: 3.3 meses</p>
                  </div>
                  <div className="mt-2 text-[10px] text-emerald-600 font-bold">DECISÃO RECOMENDADA</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Scorecard de Decisões Tomadas" briefing={BRIEFINGS.decisions}>
          <div className="space-y-4">
            {DECISIONS.map((d, i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                <div>
                  <p className="text-sm font-bold text-slate-900">{d.description}</p>
                  <p className="text-xs text-slate-500">{d.date} • {d.criteria}</p>
                </div>
                <span className={cn(
                  "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                  d.result === 'Aprovado' ? "bg-emerald-50 text-emerald-700" :
                  d.result === 'Rejeitado' ? "bg-rose-50 text-rose-700" : "bg-blue-50 text-blue-700"
                )}>
                  {d.result}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Critérios de Aprovação de Mudanças" briefing={BRIEFINGS.decision_criteria}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Risco Técnico', weight: '40%', desc: 'Impacto na infraestrutura e segurança' },
            { label: 'Retorno Financeiro', weight: '30%', desc: 'ROI e Payback estimado' },
            { label: 'Compliance/Legal', weight: '30%', desc: 'Adesão à LGPD e normas internas' },
          ].map((c, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-800">{c.label}</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{c.weight}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function LGPDTab({ lgpdMapping, setLgpdMapping }: { lgpdMapping: DataMapping[], setLgpdMapping: (mapping: DataMapping[]) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Mapeamento de Dados Pessoais" className="lg:col-span-2" briefing={BRIEFINGS.lgpd_card}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100">
                  <th className="pb-3 font-semibold px-2">Processo</th>
                  <th className="pb-3 font-semibold px-2">Dados</th>
                  <th className="pb-3 font-semibold px-2">Base Legal</th>
                  <th className="pb-3 font-semibold px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {lgpdMapping.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-4 font-medium text-slate-900 px-2">{item.process}</td>
                    <td className="py-4 text-slate-600 text-xs px-2">{item.data}</td>
                    <td className="py-4 text-slate-600 px-2">{item.legalBase}</td>
                    <td className="py-4 px-2">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                        item.status === 'Ajustar' ? "bg-rose-50 text-rose-700" :
                        item.status === 'Revisar' ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"
                      )}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <button 
                        onClick={() => {
                          const newStatus = item.status === 'OK' ? 'Revisar' : 
                                           item.status === 'Revisar' ? 'Ajustar' : 'OK';
                          const newData = [...lgpdMapping];
                          newData[idx] = { ...item, status: newStatus };
                          setLgpdMapping(newData);
                        }}
                        className="text-primary hover:text-primary-hover p-1"
                      >
                        <RotateCw size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Exercício de Direitos (Titulares)" briefing={BRIEFINGS.lgpd_rights}>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Confirmação', value: 15 },
                    { name: 'Acesso', value: 8 },
                    { name: 'Correção', value: 10 },
                    { name: 'Eliminação', value: 3 },
                    { name: 'Portabilidade', value: 1 },
                  ]}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#6366f1" />
                  <Cell fill="#10b981" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#f43f5e" />
                  <Cell fill="#8b5cf6" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
            <p className="text-xs font-bold text-indigo-700">Tempo Médio de Resposta</p>
            <p className="text-xl font-bold text-indigo-900">4.2 dias</p>
            <p className="text-[10px] text-indigo-600">Limite Legal: 15 dias</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ChecklistTab({ phases, setPhases }: { phases: ChecklistPhase[], setPhases: (phases: ChecklistPhase[]) => void }) {
  const toggleItem = (phaseId: string, itemId: string) => {
    const newPhases = phases.map(phase => {
      if (phase.id === phaseId) {
        return {
          ...phase,
          items: phase.items.map(item => {
            if (item.id === itemId) {
              return { ...item, completed: !item.completed };
            }
            return item;
          })
        };
      }
      return phase;
    });
    setPhases(newPhases);
  };

  const calculateProgress = () => {
    const totalItems = phases.reduce((acc, phase) => acc + phase.items.length, 0);
    const completedItems = phases.reduce((acc, phase) => acc + phase.items.filter(i => i.completed).length, 0);
    return Math.round((completedItems / totalItems) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Checklist Cronológico</h2>
          <p className="text-slate-500 text-sm">Acompanhe a evolução do projeto passo a passo.</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 min-w-[200px]">
          <div className="flex-1">
            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase mb-1">
              <span>Progresso Total</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="bg-primary h-full"
              />
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-primary/20 flex items-center justify-center text-primary font-bold text-sm">
            {progress}%
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {phases.map((phase, phaseIdx) => (
          <motion.div 
            key={phase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: phaseIdx * 0.1 }}
          >
            <Card 
              title={`${phase.title} (${phase.duration})`} 
              briefing={phase.briefing}
              className={cn(
                "border-l-4",
                phase.status === 'CHECK' ? "border-l-emerald-500" :
                phase.status === 'EM ANDAMENTO' ? "border-l-amber-500" : "border-l-slate-300"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={cn(
                  "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                  phase.status === 'CHECK' ? "bg-emerald-50 text-emerald-700" :
                  phase.status === 'EM ANDAMENTO' ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-500"
                )}>
                  {phase.status === 'CHECK' ? '✅ Concluído' : phase.status === 'EM ANDAMENTO' ? '🔄 Em Andamento' : '⏳ Pendente'}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {phase.items.filter(i => i.completed).length} / {phase.items.length} Concluídos
                </span>
              </div>

              <div className="space-y-3">
                {phase.items.map((item) => (
                  <div 
                    key={item.id} 
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer group",
                      item.completed ? "bg-emerald-50/50" : "hover:bg-slate-50"
                    )}
                    onClick={() => toggleItem(phase.id, item.id)}
                  >
                    <div className={cn(
                      "w-5 h-5 rounded border-2 flex items-center justify-center transition-all mt-0.5",
                      item.completed ? "bg-primary border-primary text-white" : "border-slate-300 group-hover:border-primary"
                    )}>
                      {item.completed && <CheckCircle size={14} />}
                    </div>
                    <span className={cn(
                      "text-sm transition-all",
                      item.completed ? "text-slate-400 line-through" : "text-slate-700 font-medium"
                    )}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AIChatTab() {
  const [messages, setMessages] = useState<{ role: 'model' | 'user', text: string }[]>([
    { role: 'model', text: 'Olá! Sou seu assistente especialista em GRC. Como posso ajudar com o cenário de riscos, conformidade ISO 27001 ou LGPD hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    const newMessages = [...messages, { role: 'user' as const, text: userText }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `Você é um consultor especialista em GRC (Governança, Riscos e Compliance). 
          O contexto é uma empresa de médio porte do setor de serviços com 450 funcionários, buscando conformidade com ISO 27001 e LGPD.
          Responda de forma profissional, técnica e direta. Use Markdown para formatar a resposta se necessário.`,
        },
      });

      const response = await chat.sendMessage({ message: userText });
      const aiText = response.text || "Desculpe, não consegui processar sua solicitação.";
      
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Erro ao conectar com o assistente de IA. Verifique sua conexão ou tente novamente mais tarde." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="h-[calc(100vh-12rem)] flex flex-col p-0 overflow-hidden" briefing={BRIEFINGS.ai_chat_card}>
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
        <Bot className="text-primary" />
        <h3 className="font-bold text-slate-800">Assistente de GRC Inteligente</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
        {messages.map((m, i) => (
          <div key={i} className={cn(
            "flex",
            m.role === 'user' ? "justify-end" : "justify-start"
          )}>
            <div className={cn(
              "max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
              m.role === 'model' 
                ? "bg-white text-slate-800 rounded-tl-none border border-slate-100" 
                : "bg-primary text-white rounded-tr-none"
            )}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
              <div className="flex gap-1.5">
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-slate-100 bg-white flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Pergunte sobre riscos, compliance ou decisões de TI..."
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          disabled={isLoading}
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-primary text-white p-2.5 rounded-xl hover:bg-primary-hover transition-all disabled:opacity-50 shadow-sm"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </Card>
  );
}

function ComplianceISOTab() {
  const [selectedStep, setSelectedStep] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="ISO 31000 - Processo de Gestão de Riscos" briefing={BRIEFINGS.iso31000}>
          <div className="relative py-4">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-100" />
            <div className="space-y-6">
              {ISO_31000_STEPS.map((step, idx) => {
                const Icon = ICON_MAP[step.icon] || Info;
                return (
                  <motion.div 
                    key={step.id} 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-4 items-start relative cursor-pointer group"
                    onClick={() => setSelectedStep(step)}
                  >
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-primary z-10 group-hover:border-primary group-hover:text-primary transition-all">
                      <Icon size={20} />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">PASSO {idx + 1}</span>
                        <h4 className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">{step.title}</h4>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{step.description}</p>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-primary mt-4" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Card>

        <Card title="ISO 27001 - Domínios de Controle" briefing={BRIEFINGS.iso27001_domains}>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Organizacional', value: 37 },
                    { name: 'Pessoas', value: 8 },
                    { name: 'Físico', value: 14 },
                    { name: 'Tecnológico', value: 34 },
                  ]}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#10b981" />
                  <Cell fill="#6366f1" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#f43f5e" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Foco Crítico</p>
              <p className="text-xs font-bold text-slate-700">A.9 Controle de Acessos</p>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1">
                <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: '15%' }} />
              </div>
              <p className="text-[10px] text-rose-600 font-bold mt-1">15% Conformidade ❌</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Continuidade</p>
              <p className="text-xs font-bold text-slate-700">A.17 Disponibilidade</p>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1">
                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '30%' }} />
              </div>
              <p className="text-[10px] text-amber-600 font-bold mt-1">30% Conformidade ⚠️</p>
            </div>
          </div>
        </Card>
      </div>

      <Modal 
        isOpen={!!selectedStep} 
        onClose={() => setSelectedStep(null)} 
        title={selectedStep?.title || "Detalhes do Passo"}
      >
        <div className="space-y-4">
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedStep?.description}
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h5 className="text-xs font-bold text-slate-400 uppercase mb-2">Requisito ISO 31000</h5>
            <p className="text-xs text-slate-600 italic">
              "A organização deve estabelecer, implementar e manter um processo para a gestão de riscos que inclua este passo como fundamental para a governança corporativa."
            </p>
          </div>
          <button 
            onClick={() => setSelectedStep(null)}
            className="w-full bg-slate-900 text-white py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors"
          >
            Fechar
          </button>
        </div>
      </Modal>
    </div>
  );
}

function COBITTab({ cobitProcesses, setCobitProcesses }: { cobitProcesses: COBITProcess[], setCobitProcesses: (processes: COBITProcess[]) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Capacidade por Processo" briefing={BRIEFINGS.cobit_card}>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cobitProcesses} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 5]} hide />
                <YAxis dataKey="code" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} width={60} />
                <Tooltip />
                <Bar dataKey="maturity" name="Nível de Capacidade" fill="var(--primary-color)" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Domínios COBIT" briefing={BRIEFINGS.cobit_domains}>
          <div className="grid grid-cols-2 gap-4 py-4">
            {[
              { id: 'EDM', label: 'Avaliar, Dirigir e Monitorar', color: 'bg-indigo-50 text-indigo-700' },
              { id: 'APO', label: 'Alinhar, Planejar e Organizar', color: 'bg-emerald-50 text-emerald-700' },
              { id: 'BAI', label: 'Construir, Adquirir e Implementar', color: 'bg-amber-50 text-amber-700' },
              { id: 'DSS', label: 'Entregar, Servir e Suportar', color: 'bg-rose-50 text-rose-700' },
              { id: 'MEA', label: 'Monitorar, Avaliar e Analisar', color: 'bg-blue-50 text-blue-700' },
            ].map((d) => (
              <div key={d.id} className={cn("p-4 rounded-xl border border-transparent", d.color)}>
                <p className="text-xs font-bold uppercase mb-1">{d.id}</p>
                <p className="text-sm font-semibold leading-tight">{d.label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Alinhamento com Processos COBIT" briefing={BRIEFINGS.cobit_domains}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-slate-500 border-b border-slate-100">
                <th className="pb-3 font-semibold px-2">Processo</th>
                <th className="pb-3 font-semibold px-2">Status</th>
                <th className="pb-3 font-semibold px-2 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {cobitProcesses.map((p, idx) => (
                <tr key={p.code} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-bold text-slate-900 px-2">{p.code} - {p.name}</td>
                  <td className="py-4 px-2">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                      p.status === 'Implementado' ? "bg-emerald-50 text-emerald-700" :
                      p.status === 'Parcial' ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"
                    )}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right">
                    <button 
                      onClick={() => {
                        const newMaturity = prompt(`Novo nível de maturidade (0-5) para ${p.name}:`, p.maturity.toString());
                        if (newMaturity) {
                          const newData = [...cobitProcesses];
                          newData[idx] = { ...p, maturity: parseInt(newMaturity) };
                          setCobitProcesses(newData);
                        }
                      }}
                      className="text-primary hover:text-primary-hover p-1"
                    >
                      <Edit2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function FiveWTwoHTab({ isTransformed }: { isTransformed: boolean }) {
  const actionPlans = isTransformed ? [
    {
      title: "Plano de Acesso: IAM Implementado",
      items: [
        { q: 'What?', a: 'Política formal de controle de acessos implementada' },
        { q: 'Why?', a: 'Garantir conformidade ISO 27001 A.9' },
        { q: 'Where?', a: '100% dos sistemas críticos' },
        { q: 'When?', a: 'Concluído em Jan/2026' },
        { q: 'Who?', a: 'CISO / Equipe de Segurança' },
        { q: 'How?', a: 'Solução de IAM configurada e integrada' },
        { q: 'How much?', a: 'R$ 45.000 (Investimento realizado)' },
      ],
      status: 'Concluído'
    },
    {
      title: "Plano de Continuidade: PCN Validado",
      items: [
        { q: 'What?', a: 'Plano de Continuidade de Negócios (PCN) testado' },
        { q: 'Why?', a: 'Resiliência operacional comprovada' },
        { q: 'Where?', a: 'Data Center e Cloud' },
        { q: 'When?', a: 'Concluído em Fev/2026' },
        { q: 'Who?', a: 'Gerente de Infraestrutura' },
        { q: 'How?', a: 'Testes de failover realizados com sucesso' },
        { q: 'How much?', a: 'R$ 120.000 (Investimento realizado)' },
      ],
      status: 'Concluído'
    }
  ] : [
    {
      title: "Plano de Ação: Controle de Acessos",
      items: [
        { q: 'What?', a: 'Implementar política formal de controle de acessos' },
        { q: 'Why?', a: 'Garantir que apenas pessoas autorizadas acessem sistemas' },
        { q: 'Where?', a: 'Em todos os sistemas de TI da organização' },
        { q: 'When?', a: 'Conclusão em 60 dias' },
        { q: 'Who?', a: 'Coordenador de Segurança da Informação' },
        { q: 'How?', a: 'Elaborar política, aprovar, comunicar, implementar ferramentas' },
        { q: 'How much?', a: 'R$ 45.000 (ferramentas + horas)' },
      ],
      status: 'Pendente'
    },
    {
      title: "Plano de Ação: Plano de Continuidade",
      items: [
        { q: 'What?', a: 'Criar e testar Plano de Continuidade de Negócios (PCN)' },
        { q: 'Why?', a: 'Garantir recuperação rápida em caso de indisponibilidade' },
        { q: 'Where?', a: 'Infraestrutura crítica de TI' },
        { q: 'When?', a: 'Conclusão em 90 dias' },
        { q: 'Who?', a: 'Gerente de Infraestrutura' },
        { q: 'How?', a: 'Realizar BIA, definir RTO/RPO, implementar redundância' },
        { q: 'How much?', a: 'R$ 120.000 (infraestrutura redundante)' },
      ],
      status: 'Pendente'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {actionPlans.map((plan, idx) => (
          <Card key={idx} title={plan.title} briefing={BRIEFINGS.fivew2h_card}>
            <div className="flex items-center gap-2 mb-4">
              <span className={cn(
                "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                plan.status === 'Concluído' ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-amber-50 text-amber-700 border border-amber-100"
              )}>
                {plan.status}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
              {plan.items.map((item) => (
                <div key={item.q} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">{item.q}</p>
                  <p className="text-sm text-slate-800 font-medium">{item.a}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function IshikawaTab({ isTransformed }: { isTransformed: boolean }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title={isTransformed ? "Causas da Alta Disponibilidade (2026)" : "Causas da Indisponibilidade de Sistemas"} briefing={BRIEFINGS.ishikawa_card}>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
            <div className="relative h-[300px] flex items-center">
              <div className="absolute left-0 right-0 h-0.5 bg-slate-300 top-1/2 -translate-y-1/2" />
              <div className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 px-3 py-1 text-white text-xs font-bold rounded shadow-lg",
                isTransformed ? "bg-emerald-500" : "bg-rose-500"
              )}>
                {isTransformed ? "ALTA DISPONIBILIDADE" : "INDISPONIBILIDADE"}
              </div>
              
              <div className="flex-1 grid grid-cols-3 gap-8 relative h-full">
                {/* Top Causes */}
                <div className="flex flex-col justify-start gap-4 pt-4">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">MÉTODO</div>
                  <ul className="text-[10px] text-slate-600 space-y-1">
                    {isTransformed ? (
                      <>
                        <li>• Procedimentos claros</li>
                        <li>• Backup automatizado</li>
                      </>
                    ) : (
                      <>
                        <li>• Falta de procedimentos</li>
                        <li>• Ausência de backup</li>
                      </>
                    )}
                  </ul>
                </div>
                <div className="flex flex-col justify-start gap-4 pt-4">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">MÃO DE OBRA</div>
                  <ul className="text-[10px] text-slate-600 space-y-1">
                    {isTransformed ? (
                      <>
                        <li>• Equipe treinada</li>
                        <li>• Cultura de segurança</li>
                      </>
                    ) : (
                      <>
                        <li>• Equipe reduzida</li>
                        <li>• Falta de treinamento</li>
                      </>
                    )}
                  </ul>
                </div>
                <div className="flex flex-col justify-start gap-4 pt-4">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">MATERIAL</div>
                  <ul className="text-[10px] text-slate-600 space-y-1">
                    {isTransformed ? (
                      <>
                        <li>• Hardware moderno</li>
                        <li>• Licenciamento OK</li>
                      </>
                    ) : (
                      <>
                        <li>• Hardware defasado</li>
                        <li>• Sem licenças</li>
                      </>
                    )}
                  </ul>
                </div>
                
                {/* Bottom Causes */}
                <div className="flex flex-col justify-end gap-4 pb-4">
                  <ul className="text-[10px] text-slate-600 space-y-1">
                    {isTransformed ? (
                      <>
                        <li>• Servidores novos</li>
                        <li>• Redundância ativa</li>
                      </>
                    ) : (
                      <>
                        <li>• Servidores antigos</li>
                        <li>• Sem redundância</li>
                      </>
                    )}
                  </ul>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">MÁQUINA</div>
                </div>
                <div className="flex flex-col justify-end gap-4 pb-4">
                  <ul className="text-[10px] text-slate-600 space-y-1">
                    {isTransformed ? (
                      <>
                        <li>• Gestão de mudanças</li>
                        <li>• Monitoramento 24/7</li>
                      </>
                    ) : (
                      <>
                        <li>• Processo de mudanças</li>
                        <li>• Sem gestão incidentes</li>
                      </>
                    )}
                  </ul>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">MEDIÇÃO</div>
                </div>
                <div className="flex flex-col justify-end gap-4 pb-4">
                  <ul className="text-[10px] text-slate-600 space-y-1">
                    {isTransformed ? (
                      <>
                        <li>• Refrigeração OK</li>
                        <li>• Nobreak/Gerador</li>
                      </>
                    ) : (
                      <>
                        <li>• Falta refrigeração</li>
                        <li>• Energia instável</li>
                      </>
                    )}
                  </ul>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">AMBIENTE</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card title={isTransformed ? "Causas do Controle de Acessos Eficaz (2026)" : "Causas da Falta de Controle de Acessos"} briefing={BRIEFINGS.ishikawa_card}>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
            <div className="relative h-[300px] flex items-center">
              <div className="absolute left-0 right-0 h-0.5 bg-slate-300 top-1/2 -translate-y-1/2" />
              <div className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 px-3 py-1 text-white text-xs font-bold rounded shadow-lg",
                isTransformed ? "bg-emerald-500" : "bg-amber-500"
              )}>
                {isTransformed ? "ACESSOS PROTEGIDOS" : "ACESSOS INDEVIDOS"}
              </div>
              
              <div className="flex-1 grid grid-cols-3 gap-8 relative h-full">
                <div className="flex flex-col justify-start gap-4 pt-4">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">MÉTODO</div>
                  <ul className="text-[10px] text-slate-600 space-y-1">
                    {isTransformed ? (
                      <>
                        <li>• Política de acessos</li>
                        <li>• Processo via IAM</li>
                      </>
                    ) : (
                      <>
                        <li>• Sem política definida</li>
                        <li>• Processo manual</li>
                      </>
                    )}
                  </ul>
                </div>
                <div className="flex flex-col justify-start gap-4 pt-4">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">MÃO DE OBRA</div>
                  <ul className="text-[10px] text-slate-600 space-y-1">
                    {isTransformed ? (
                      <>
                        <li>• Treinamento contínuo</li>
                        <li>• Conscientização</li>
                      </>
                    ) : (
                      <>
                        <li>• Desconhecimento</li>
                        <li>• Cultura permissiva</li>
                      </>
                    )}
                  </ul>
                </div>
                <div className="flex flex-col justify-start gap-4 pt-4">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">MATERIAL</div>
                  <ul className="text-[10px] text-slate-600 space-y-1">
                    {isTransformed ? (
                      <>
                        <li>• Ferramenta IAM</li>
                        <li>• Logs centralizados</li>
                      </>
                    ) : (
                      <>
                        <li>• Sem ferramentas IAM</li>
                        <li>• Logs desabilitados</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div className="flex flex-col justify-end gap-4 pb-4">
                  <ul className="text-[10px] text-slate-600 space-y-1">
                    {isTransformed ? (
                      <>
                        <li>• Integração AD/Cloud</li>
                        <li>• Single Sign-On</li>
                      </>
                    ) : (
                      <>
                        <li>• Sistemas legados</li>
                        <li>• Múltiplos sistemas</li>
                      </>
                    )}
                  </ul>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">MÁQUINA</div>
                </div>
                <div className="flex flex-col justify-end gap-4 pb-4">
                  <ul className="text-[10px] text-slate-600 space-y-1">
                    {isTransformed ? (
                      <>
                        <li>• Auditoria mensal</li>
                        <li>• KPIs de acesso</li>
                      </>
                    ) : (
                      <>
                        <li>• Sem auditoria</li>
                        <li>• Sem métricas</li>
                      </>
                    )}
                  </ul>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">MEDIÇÃO</div>
                </div>
                <div className="flex flex-col justify-end gap-4 pb-4">
                  <ul className="text-[10px] text-slate-600 space-y-1">
                    {isTransformed ? (
                      <>
                        <li>• Aprovação formal</li>
                        <li>• Fluxo estruturado</li>
                      </>
                    ) : (
                      <>
                        <li>• Falta aprovação</li>
                        <li>• Urgência negócios</li>
                      </>
                    )}
                  </ul>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">AMBIENTE</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function SWOTTab({ isTransformed }: { isTransformed: boolean }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card title="Forças (Strengths)" className="border-l-4 border-l-emerald-500" briefing={BRIEFINGS.swot_card}>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Equipe técnica capacitada</li>
              <li>• Sistemas modernos (ERP em nuvem)</li>
              <li>• Patrocínio da alta gestão</li>
              {isTransformed ? (
                <>
                  <li>• Governança de TI consolidada</li>
                  <li>• Processos automatizados e auditáveis</li>
                </>
              ) : (
                <>
                  <li>• Orçamento disponível para investimentos</li>
                </>
              )}
            </ul>
          </Card>
          <Card title="Fraquezas (Weaknesses)" className="border-l-4 border-l-rose-500" briefing={BRIEFINGS.swot_card}>
            <ul className="space-y-2 text-sm text-slate-600">
              {isTransformed ? (
                <>
                  <li>• Dependência de fornecedores críticos</li>
                  <li>• Necessidade de atualização constante</li>
                </>
              ) : (
                <>
                  <li>• Falta de políticas e procedimentos formais</li>
                  <li>• Controle de acessos deficiente</li>
                  <li>• Ausência de plano de continuidade</li>
                  <li>• Processos manuais e não auditáveis</li>
                </>
              )}
            </ul>
          </Card>
        </div>
        <div className="space-y-6">
          <Card title="Oportunidades (Opportunities)" className="border-l-4 border-l-indigo-500" briefing={BRIEFINGS.swot_card}>
            <ul className="space-y-2 text-sm text-slate-600">
              {isTransformed ? (
                <>
                  <li>• Expansão para novos mercados com selo ISO</li>
                  <li>• Liderança em ESG e Ética Digital</li>
                  <li>• Uso de IA para predição de riscos</li>
                </>
              ) : (
                <>
                  <li>• Adoção de frameworks de governança (COBIT)</li>
                  <li>• Certificação ISO 27001</li>
                  <li>• Automação de controles de segurança</li>
                  <li>• Cloud computing com alta disponibilidade</li>
                </>
              )}
            </ul>
          </Card>
          <Card title="Ameaças (Threats)" className="border-l-4 border-l-amber-500" briefing={BRIEFINGS.swot_card}>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• Aumento de ataques cibernéticos</li>
              <li>• Regulamentações mais rigorosas (LGPD)</li>
              {isTransformed ? (
                <>
                  <li>• Geopolítica afetando cadeias de suprimentos</li>
                </>
              ) : (
                <>
                  <li>• Concorrentes mais maduros digitalmente</li>
                  <li>• Escassez de profissionais de segurança</li>
                </>
              )}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PDCATab({ isTransformed }: { isTransformed: boolean }) {
  const sections = [
    {
      id: 'ac',
      title: isTransformed ? 'PDCA – Controle de Acessos (Ciclo de Melhoria)' : 'PDCA – Controle de Acessos',
      steps: [
        { step: 'P', title: 'Planejar', color: 'bg-indigo-500', briefing: BRIEFINGS.pdca_ac_p, items: isTransformed ? ['Revisar política anual', 'Ajustar perfis conforme novos cargos', 'Planejar auditoria externa'] : ['Definir política de acessos e perfis', 'Princípio do menor privilégio (ISO 27001 A.9)', 'Mapear fluxos de aprovação'] },
        { step: 'D', title: 'Executar', color: 'bg-emerald-500', briefing: BRIEFINGS.pdca_ac_d, items: isTransformed ? ['Manter solução de IAM atualizada', 'Realizar recertificação de acessos', 'Treinar novos colaboradores'] : ['Implementar solução de IAM', 'Revisar perfis de acesso', 'Aplicar MFA em sistemas críticos', 'Registrar logs de acesso'] },
        { step: 'C', title: 'Verificar', color: 'bg-amber-500', briefing: BRIEFINGS.pdca_ac_c, items: isTransformed ? ['Analisar dashboards de IAM', 'Verificar 100% de conformidade A.9', 'Validar logs via SIEM'] : ['Auditar acessos privilegiados', 'Revisar relatórios de logs', 'Monitorar incidentes de acesso'] },
        { step: 'A', title: 'Agir', color: 'bg-rose-500', briefing: BRIEFINGS.pdca_ac_a, items: isTransformed ? ['Otimizar fluxos de aprovação', 'Refinar regras de MFA', 'Promover melhoria contínua'] : ['Corrigir não conformidades', 'Atualizar política de acessos', 'Ajustar configurações de IAM'] },
      ]
    },
    {
      id: 'pcn',
      title: isTransformed ? 'PDCA – Plano de Continuidade (Ciclo de Resiliência)' : 'PDCA – Plano de Continuidade',
      steps: [
        { step: 'P', title: 'Planejar', color: 'bg-indigo-500', briefing: BRIEFINGS.pdca_pcn_p, items: isTransformed ? ['Atualizar BIA com novos processos', 'Revisar metas de RTO/RPO', 'Planejar simulado semestral'] : ['Realizar BIA (Impacto no Negócio)', 'Definir RTO e RPO', 'Priorizar sistemas críticos (ISO 31000)'] },
        { step: 'D', title: 'Executar', color: 'bg-emerald-500', briefing: BRIEFINGS.pdca_pcn_d, items: isTransformed ? ['Manter redundâncias ativas', 'Executar testes de restauração', 'Atualizar contatos de emergência'] : ['Implementar redundâncias', 'Validar backups periodicamente', 'Estabelecer site de contingência'] },
        { step: 'C', title: 'Verificar', color: 'bg-amber-500', briefing: BRIEFINGS.pdca_pcn_c, items: isTransformed ? ['Analisar resultados de simulados', 'Verificar disponibilidade 99,9%', 'Auditar integridade de backups'] : ['Realizar testes simulados', 'Medir tempo de recuperação real', 'Comparar resultados vs RTO/RPO'] },
        { step: 'A', title: 'Agir', color: 'bg-rose-500', briefing: BRIEFINGS.pdca_pcn_a, items: isTransformed ? ['Refinar estratégias de recuperação', 'Ajustar infraestrutura de DR', 'Compartilhar lições aprendidas'] : ['Ajustar planos de continuidade', 'Atualizar BIA com novos processos', 'Registrar lições aprendidas'] },
      ]
    }
  ];

  return (
    <div className="space-y-12 pb-10">
      {sections.map(section => (
        <div key={section.id} className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-indigo-500 rounded-full" />
            <h2 className="text-xl font-bold text-slate-800">{section.title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {section.steps.map((item) => (
              <Card key={item.step} className="relative overflow-hidden pt-12" briefing={item.briefing}>
                <div className={cn("absolute top-0 left-0 right-0 h-1", item.color)} />
                <div className={cn("absolute top-4 left-4 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold", item.color)}>
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-4">{item.title}</h3>
                <ul className="space-y-2">
                  {item.items.map((li, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                      <span className="mt-1 w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                      {li}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectChronologyTab({ steps, setSteps, onNavigate }: { steps: ProjectStep[], setSteps: (steps: ProjectStep[]) => void, onNavigate: (tabId: string) => void }) {
  const toggleStep = (id: string) => {
    setSteps(steps.map(s => s.id === id ? { ...s, completed: !s.completed } : s));
  };

  const completedCount = steps.filter(s => s.completed).length;
  const progress = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col justify-center items-center text-center">
          <p className="text-xs font-bold text-slate-400 uppercase mb-2">Progresso Total</p>
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
              <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-primary" strokeDasharray={251.2} strokeDashoffset={251.2 - (251.2 * progress) / 100} strokeLinecap="round" />
            </svg>
            <span className="absolute text-xl font-bold text-slate-800">{progress}%</span>
          </div>
        </Card>
        <Card className="p-6 flex flex-col justify-center">
          <p className="text-xs font-bold text-slate-400 uppercase mb-1">Etapas Concluídas</p>
          <p className="text-3xl font-bold text-slate-800">{completedCount} <span className="text-sm text-slate-400 font-normal">de {steps.length}</span></p>
          <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </Card>
        <Card className="p-6 flex flex-col justify-center bg-primary/5 border-primary/20">
          <p className="text-xs font-bold text-primary uppercase mb-1">Próximo Passo</p>
          <p className="text-lg font-bold text-slate-800 truncate">
            {steps.find(s => !s.completed)?.title || 'Projeto Concluído!'}
          </p>
          <p className="text-xs text-slate-500 mt-1">Mantenha o foco na conformidade contínua.</p>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <h2 className="text-xl font-bold text-slate-800">Cronologia de Implementação</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {steps.map((step, idx) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={cn(
                "group flex items-center gap-6 p-5 rounded-2xl border transition-all duration-300",
                step.completed 
                  ? "bg-emerald-50/50 border-emerald-100" 
                  : "bg-white border-slate-200 hover:border-primary/30 hover:shadow-md"
              )}
            >
              <button 
                onClick={() => toggleStep(step.id)}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0",
                  step.completed 
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200" 
                    : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                )}
              >
                {step.completed ? <CheckCircle2 size={18} /> : <div className="w-2 h-2 rounded-full bg-slate-300" />}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className={cn("font-bold text-base truncate", step.completed ? "text-emerald-900" : "text-slate-800")}>
                    {step.title}
                  </h4>
                  {step.completed && (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-full">
                      Concluído
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 line-clamp-1">{step.summary}</p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                {step.tabId && (
                  <button 
                    onClick={() => onNavigate(step.tabId!)}
                    className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                    title="Ir para o Módulo"
                  >
                    <ChevronRight size={20} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KanbanTab({ tasks, setTasks, isTransformed }: { tasks: KanbanTask[], setTasks: (tasks: KanbanTask[]) => void, isTransformed: boolean }) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<KanbanTask>>({
    title: '',
    priority: 'Média',
    owner: 'Admin',
    status: 'todo'
  });

  const columns = [
    { id: 'todo', label: 'A Fazer', color: 'bg-slate-100 text-slate-600' },
    { id: 'doing', label: 'Em Andamento', color: 'bg-amber-50 text-amber-700' },
    { id: 'review', label: 'Em Revisão', color: 'bg-indigo-50 text-indigo-700' },
    { id: 'done', label: 'Concluído', color: 'bg-emerald-50 text-emerald-700' },
  ] as const;

  const onDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData('taskId', taskId.toString());
  };

  const onDrop = (e: React.DragEvent, status: KanbanTask['status']) => {
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status } : t));
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title) return;
    
    const task: KanbanTask = {
      id: Math.floor(Math.random() * 1000000),
      title: newTask.title,
      priority: newTask.priority as any,
      owner: newTask.owner || 'Admin',
      status: 'todo'
    };
    
    setTasks([...tasks, task]);
    setIsAddTaskOpen(false);
    setNewTask({ title: '', priority: 'Média', owner: 'Admin', status: 'todo' });
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const metrics = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'done').length,
    todo: tasks.filter(t => t.status === 'todo').length,
    doing: tasks.filter(t => t.status === 'doing').length,
    review: tasks.filter(t => t.status === 'review').length,
    percent: tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'done').length / tasks.length) * 100) : 0
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4" briefing={BRIEFINGS.kanban_briefing}>
          <p className="text-xs text-slate-500 uppercase font-bold mb-1">Total de Tarefas</p>
          <p className="text-2xl font-bold text-slate-800">{metrics.total}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 uppercase font-bold mb-1">Em Andamento</p>
          <p className="text-2xl font-bold text-amber-600">{metrics.doing + metrics.review}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 uppercase font-bold mb-1">Concluídas</p>
          <p className="text-2xl font-bold text-emerald-600">{metrics.completed}</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-500 uppercase font-bold mb-1">% de Conclusão</p>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold text-indigo-600">{metrics.percent}%</p>
            <div className="flex-1 h-2 bg-slate-100 rounded-full mb-2 overflow-hidden">
              <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${metrics.percent}%` }} />
            </div>
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">Quadro Kanban GRC</h3>
        <button 
          onClick={() => setIsAddTaskOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors"
        >
          <Plus size={18} />
          Adicionar Tarefa
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-320px)] overflow-hidden">
        {columns.map(col => (
          <div 
            key={col.id} 
            className="flex flex-col gap-4 bg-slate-200/40 p-4 rounded-2xl border border-slate-300/30"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, col.id)}
          >
            <div className="flex items-center justify-between">
              <div className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase w-fit", col.color)}>
                {col.label}
              </div>
              <span className="text-[10px] font-bold text-slate-400">{tasks.filter(t => t.status === col.id).length}</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
              {tasks.filter(t => t.status === col.id).map(task => (
                <div 
                  key={task.id} 
                  draggable
                  onDragStart={(e) => onDragStart(e, task.id)}
                  className="group bg-white p-4 rounded-xl shadow-sm border border-slate-200/50 hover:shadow-md transition-all cursor-grab active:cursor-grabbing text-slate-900"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={cn(
                      "text-[8px] font-bold uppercase px-1.5 py-0.5 rounded",
                      task.priority === 'Alta' ? "bg-rose-50 text-rose-600" : 
                      task.priority === 'Média' ? "bg-amber-50 text-amber-600" : "bg-blue-50 text-blue-600"
                    )}>
                      {task.priority}
                    </span>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => removeTask(task.id)}
                        className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-rose-500 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                      <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        {task.owner[0]}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{task.title}</p>
                </div>
              ))}
              {tasks.filter(t => t.status === col.id).length === 0 && (
                <div className="h-20 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center text-slate-400 text-[10px] font-bold uppercase">
                  Solte aqui
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {isAddTaskOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <h3 className="font-bold text-slate-900">Nova Tarefa Kanban</h3>
                <button onClick={() => setIsAddTaskOpen(false)} className="p-2 hover:bg-white rounded-xl transition-colors">
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              <form onSubmit={handleAddTask} className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Título da Tarefa</label>
                  <input 
                    type="text" 
                    required
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Ex: Revisar política de backup"
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Prioridade</label>
                    <select 
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm bg-white"
                    >
                      <option value="Baixa">Baixa</option>
                      <option value="Média">Média</option>
                      <option value="Alta">Alta</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Responsável</label>
                    <input 
                      type="text" 
                      value={newTask.owner}
                      onChange={(e) => setNewTask({ ...newTask, owner: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Criar Tarefa
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RoadmapTab({ isTransformed }: { isTransformed: boolean }) {
  return (
    <div className="space-y-6">
      <Card title={isTransformed ? "Status do Roadmap Estratégico (Concluído 2026)" : "Cronograma de Implementação (Roadmap 2026)"} briefing={BRIEFINGS.roadmap_card}>
        <div className="overflow-x-auto">
          <div className="min-w-[800px] space-y-8 py-4">
            {/* Months Header */}
            <div className="grid grid-cols-7 gap-4 border-b border-slate-100 pb-4">
              <div className="font-bold text-slate-400 text-xs uppercase">Atividade</div>
              {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'].map(m => (
                <div key={m} className="text-center font-bold text-slate-400 text-xs uppercase">{m}</div>
              ))}
            </div>
            
            {/* Rows */}
            {[
              { label: 'Inventário de Ativos', start: 1, end: 2, color: isTransformed ? 'bg-emerald-500' : 'bg-indigo-500' },
              { label: 'Mapeamento de Riscos', start: 1, end: 3, color: isTransformed ? 'bg-emerald-500' : 'bg-emerald-500' },
              { label: 'Política de Segurança', start: 2, end: 4, color: isTransformed ? 'bg-emerald-500' : 'bg-amber-500' },
              { label: 'Controle de Acessos', start: 3, end: 5, color: isTransformed ? 'bg-emerald-500' : 'bg-rose-500' },
              { label: 'Plano de Continuidade', start: 3, end: 6, color: isTransformed ? 'bg-emerald-500' : 'bg-blue-500' },
              { label: 'Auditoria Interna', start: 5, end: 6, color: isTransformed ? 'bg-emerald-500' : 'bg-violet-500' },
            ].map((item, idx) => (
              <div key={idx} className="grid grid-cols-7 gap-4 items-center">
                <div className="text-sm font-medium text-slate-700">{item.label}</div>
                <div className="col-span-6 relative h-6 bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className={cn("absolute h-full rounded-full opacity-80", item.color)}
                    style={{ 
                      left: isTransformed ? '0%' : `${((item.start - 1) / 6) * 100}%`, 
                      width: isTransformed ? '100%' : `${((item.end - item.start + 1) / 6) * 100}%` 
                    }}
                  />
                  {isTransformed && (
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                      Concluído
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

function ContinuityTab({ biaData, setBiaData }: { biaData: BIAEntry[], setBiaData: (data: BIAEntry[]) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="BIA: Análise de Impacto de Negócios" className="lg:col-span-2" briefing={BRIEFINGS.bia_card}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100">
                  <th className="pb-3 font-semibold px-2">Processo</th>
                  <th className="pb-3 font-semibold px-2">RTO</th>
                  <th className="pb-3 font-semibold px-2">RPO</th>
                  <th className="pb-3 font-semibold px-2">Impacto Financeiro</th>
                  <th className="pb-3 font-semibold px-2 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {biaData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-medium text-slate-900 px-2">{item.process}</td>
                    <td className="py-4 text-slate-600 px-2">{item.rto}</td>
                    <td className="py-4 text-slate-600 px-2">{item.rpo}</td>
                    <td className="py-4 text-rose-600 font-bold px-2">{item.impact}</td>
                    <td className="py-4 px-2 text-right">
                      <button 
                        onClick={() => {
                          const newRto = prompt(`Novo RTO para ${item.process}:`, item.rto);
                          if (newRto) {
                            const newData = [...biaData];
                            newData[idx] = { ...item, rto: newRto };
                            setBiaData(newData);
                          }
                        }}
                        className="text-primary hover:text-primary-hover p-1"
                      >
                        <Edit2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Status do Plano de Recuperação" briefing={BRIEFINGS.bia_card}>
          <div className="space-y-4 py-2">
            {[
              { label: 'Estratégia de Recuperação', status: 'Definido' },
              { label: 'Backup e Restauração', status: 'Testado' },
              { label: 'Site de Contingência', status: 'Em Negociação' },
              { label: 'Equipe de Resposta', status: 'Treinada' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-600">{item.label}</span>
                <span className="text-xs font-bold text-primary">{item.status}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function QualityTab({ nonConformities, setNonConformities }: { nonConformities: NonConformity[], setNonConformities: (data: NonConformity[]) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Gestão de Não Conformidades" briefing={BRIEFINGS.quality_card}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100">
                  <th className="pb-3 font-semibold px-2">Descrição</th>
                  <th className="pb-3 font-semibold px-2">Status</th>
                  <th className="pb-3 font-semibold px-2 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {nonConformities.map((nc, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-medium text-slate-900 px-2">{nc.description}</td>
                    <td className="py-4 px-2">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                        nc.status === 'Fechada' ? "bg-emerald-50 text-emerald-700" : 
                        nc.status === 'Em andamento' ? "bg-blue-50 text-blue-700" : "bg-rose-50 text-rose-700"
                      )}>
                        {nc.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <button 
                        onClick={() => {
                          const newStatus = nc.status === 'Fechada' ? 'Em andamento' : 
                                           nc.status === 'Em andamento' ? 'Pendente' : 'Fechada';
                          const newData = [...nonConformities];
                          newData[idx] = { ...nc, status: newStatus };
                          setNonConformities(newData);
                        }}
                        className="text-primary hover:text-primary-hover p-1"
                      >
                        <RotateCw size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Melhoria Contínua">
          <div className="space-y-4 py-2">
            <p className="text-sm text-slate-600">Ações preventivas e corretivas baseadas no ciclo PDCA e auditorias internas.</p>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="text-xs font-bold text-emerald-700 uppercase mb-1">Última Melhoria</p>
              <p className="text-sm font-semibold text-emerald-900">Automação do backup do banco de dados principal.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function TechTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Infraestrutura e Ativos" className="lg:col-span-2" briefing={BRIEFINGS.tech_card}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
            {[
              { label: 'Servidores em Nuvem', value: '12 ativos', status: 'OK' },
              { label: 'Endpoints (Laptops)', value: '85 unidades', status: 'OK' },
              { label: 'Dispositivos de Rede', value: '15 ativos', status: 'Revisar' },
              { label: 'Bancos de Dados', value: '4 instâncias', status: 'OK' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-slate-800">{item.label}</span>
                  <span className={cn(
                    "text-[10px] font-bold uppercase px-2 py-0.5 rounded-full",
                    item.status === 'OK' ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                  )}>
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{item.value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Vulnerabilidades Detectadas" briefing={BRIEFINGS.tech_card}>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Crítica', value: 2 },
                    { name: 'Alta', value: 8 },
                    { name: 'Média', value: 15 },
                    { name: 'Baixa', value: 24 },
                  ]}
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#f43f5e" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#6366f1" />
                  <Cell fill="#10b981" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

function OrgTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Estrutura de Governança" briefing={BRIEFINGS.org_card}>
          <div className="space-y-4 py-2">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <p className="text-xs font-bold text-slate-400 uppercase">Comitê de TI</p>
              <p className="font-bold text-slate-900">Diretoria Executiva</p>
            </div>
            <div className="flex justify-center">
              <div className="w-px h-8 bg-slate-200" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase">Gestão</p>
                <p className="font-bold text-slate-900">Gerente de TI</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase">Compliance</p>
                <p className="font-bold text-slate-900">DPO / CISO</p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Treinamentos Realizados" briefing={BRIEFINGS.culture_card}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100">
                  <th className="pb-3 font-semibold px-2">Tema</th>
                  <th className="pb-3 font-semibold px-2">Adesão</th>
                  <th className="pb-3 font-semibold px-2">Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {TRAININGS.map((t, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-medium text-slate-900 px-2">{t.name}</td>
                    <td className="py-4 text-slate-600 px-2">{t.progress}</td>
                    <td className="py-4 text-slate-500 px-2">{t.periodicity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

function CostsTab({ costs, setCosts }: { costs: CostEntry[], setCosts: (data: CostEntry[]) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Distribuição de Custos de TI" className="lg:col-span-2" briefing={BRIEFINGS.costs_card}>
          <div className="h-[300px] py-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costs}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="actual" fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100">
                  <th className="pb-2 font-semibold px-2">Categoria</th>
                  <th className="pb-2 font-semibold px-2">Valor (R$)</th>
                  <th className="pb-2 font-semibold px-2 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {costs.map((c, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-2">{c.category}</td>
                    <td className="py-2 px-2">{c.actual.toLocaleString('pt-BR')}</td>
                    <td className="py-2 px-2 text-right">
                      <button 
                        onClick={() => {
                          const newVal = prompt(`Novo valor para ${c.category}:`, c.actual.toString());
                          if (newVal) {
                            const newData = [...costs];
                            const actual = parseFloat(newVal);
                            const percentage = Math.round((actual / c.budget) * 100);
                            newData[idx] = { ...c, actual, percentage };
                            setCosts(newData);
                          }
                        }}
                        className="text-primary hover:text-primary-hover"
                      >
                        <Edit2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Resumo Financeiro" briefing={BRIEFINGS.costs_card}>
          <div className="space-y-6 py-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Orçado</p>
              <p className="text-2xl font-bold text-slate-900">R$ 450.000</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Executado</p>
              <p className="text-2xl font-bold text-emerald-600">R$ 385.000</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">Economia Gerada</p>
              <p className="text-lg font-bold text-primary">R$ 65.000 (14%)</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function EthicsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Código de Ética e Conduta" briefing={BRIEFINGS.ethics_card}>
          <div className="space-y-4 py-2">
            {[
              'Transparência nas decisões de TI.',
              'Uso responsável dos ativos da empresa.',
              'Privacidade e proteção de dados dos clientes.',
              'Respeito à propriedade intelectual.',
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                  {idx + 1}
                </div>
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Canal de Denúncias" briefing={BRIEFINGS.ethics_card}>
          <div className="space-y-4 py-2">
            <p className="text-sm text-slate-600">Relatos recebidos anonimamente sobre violações de políticas de TI.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <p className="text-2xl font-bold text-slate-900">0</p>
                <p className="text-xs font-bold text-slate-400 uppercase">Casos Abertos</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <p className="text-2xl font-bold text-emerald-600">12</p>
                <p className="text-xs font-bold text-slate-400 uppercase">Casos Resolvidos</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function CultureTab({ trainings, setTrainings }: { trainings: Training[], setTrainings: (data: Training[]) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Nível de Maturidade Cultural" className="lg:col-span-2" briefing={BRIEFINGS.culture_card}>
          <div className="h-[300px] py-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                { subject: 'Conscientização', A: 85 },
                { subject: 'Engajamento', A: 70 },
                { subject: 'Inovação', A: 65 },
                { subject: 'Segurança', A: 90 },
                { subject: 'Colaboração', A: 75 },
              ]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Maturidade" dataKey="A" stroke="var(--primary-color)" fill="var(--primary-color)" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Iniciativas de Cultura" briefing={BRIEFINGS.culture_card}>
          <div className="space-y-4 py-2">
            {[
              { label: 'Newsletter Semanal', status: 'Ativo' },
              { label: 'Workshop de Inovação', status: 'Próximo Mês' },
              { label: 'Gamificação de Segurança', status: 'Em Planejamento' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-sm font-bold text-slate-800">{item.label}</p>
                <p className="text-xs text-primary font-medium">{item.status}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function StakeholdersTab({ stakeholders, setStakeholders }: { stakeholders: Stakeholder[], setStakeholders: (data: Stakeholder[]) => void }) {
  return (
    <div className="space-y-6">
      <Card title="Matriz de Stakeholders" briefing={BRIEFINGS.stakeholders_card}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-slate-500 border-b border-slate-100">
                <th className="pb-3 font-semibold px-2">Nome</th>
                <th className="pb-3 font-semibold px-2">Papel</th>
                <th className="pb-3 font-semibold px-2 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {stakeholders.map((s, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-medium text-slate-900 px-2">{s.name}</td>
                  <td className="py-4 text-slate-600 px-2">{s.strategy}</td>
                  <td className="py-4 px-2 text-right">
                    <button 
                      onClick={() => {
                        const newStrategy = prompt(`Nova estratégia para ${s.name}:`, s.strategy);
                        if (newStrategy) {
                          const newData = [...stakeholders];
                          newData[idx] = { ...s, strategy: newStrategy };
                          setStakeholders(newData);
                        }
                      }}
                      className="text-primary hover:text-primary-hover p-1"
                    >
                      <Edit2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function AuditTab({ auditPlan, setAuditPlan }: { auditPlan: AuditEntry[], setAuditPlan: (data: AuditEntry[]) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Plano de Auditoria Interna" className="lg:col-span-2" briefing={BRIEFINGS.audit_card}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-slate-500 border-b border-slate-100">
                  <th className="pb-3 font-semibold px-2">Processo</th>
                  <th className="pb-3 font-semibold px-2">Status</th>
                  <th className="pb-3 font-semibold px-2 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {auditPlan.map((audit, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-medium text-slate-900 px-2">{audit.scope}</td>
                    <td className="py-4 px-2">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                        audit.status === 'Concluído' ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
                      )}>
                        {audit.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <button 
                        onClick={() => {
                          const newStatus = audit.status === 'Concluído' ? 'Em andamento' : 
                                           audit.status === 'Em andamento' ? 'Agendado' : 'Concluído';
                          const newData = [...auditPlan];
                          newData[idx] = { ...audit, status: newStatus };
                          setAuditPlan(newData);
                        }}
                        className="text-primary hover:text-primary-hover p-1"
                      >
                        <RotateCw size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Últimos Resultados" briefing={BRIEFINGS.audit_card}>
          <div className="space-y-4 py-2">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <p className="text-xs font-bold text-emerald-700 uppercase mb-1">Auditoria de Acessos</p>
              <p className="text-sm font-semibold text-emerald-900">98% de conformidade detectada.</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-xs font-bold text-amber-700 uppercase mb-1">Auditoria de Backup</p>
              <p className="text-sm font-semibold text-amber-900">Necessidade de revisão na retenção de logs.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function DecisionsTab({ decisions, setDecisions }: { decisions: Decision[], setDecisions: (data: Decision[]) => void }) {
  return (
    <div className="space-y-6">
      <Card title="Registro de Decisões Estratégicas" briefing={BRIEFINGS.decision_matrix_card}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-slate-500 border-b border-slate-100">
                <th className="pb-3 font-semibold px-2">Decisão</th>
                <th className="pb-3 font-semibold px-2">Responsável</th>
                <th className="pb-3 font-semibold px-2 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {decisions.map((d, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 font-medium text-slate-900 px-2">{d.description}</td>
                  <td className="py-4 text-slate-600 px-2">{d.approver}</td>
                  <td className="py-4 px-2 text-right">
                    <button 
                      onClick={() => {
                        const newRes = d.result === 'Aprovado' ? 'Rejeitado' : 'Aprovado';
                        const newData = [...decisions];
                        newData[idx] = { ...d, result: newRes };
                        setDecisions(newData);
                      }}
                      className="text-primary hover:text-primary-hover p-1"
                    >
                      <RotateCw size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
