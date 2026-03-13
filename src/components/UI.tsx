import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { Info, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefing } from '../types';

interface BriefingPopupProps {
  briefing: Briefing;
}

export const BriefingPopup: React.FC<BriefingPopupProps> = ({ briefing }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
        className="p-1 text-slate-400 hover:text-primary transition-colors rounded-full hover:bg-slate-100"
        title="Ver Briefing"
      >
        <Info size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden border border-slate-200"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{briefing.title}</h3>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Briefing de Governança</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    O que é?
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{briefing.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Por que é importante?
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{briefing.importance}</p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    Frameworks Relacionados
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">{briefing.frameworks}</p>
                </div>

                {briefing.acronyms && Object.keys(briefing.acronyms).length > 0 && (
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Glossário de Siglas</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(briefing.acronyms).map(([key, value]) => (
                        <div key={key} className="text-xs">
                          <span className="font-bold text-slate-700">{key}:</span> <span className="text-slate-500">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Entendido
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  briefing?: Briefing;
}

export const Card: React.FC<CardProps> = ({ children, title, className, briefing }) => (
  <div className={cn("bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 text-slate-900", className)}>
    {title && (
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {briefing && <BriefingPopup briefing={briefing} />}
      </div>
    )}
    <div className="p-4">
      {children}
    </div>
  </div>
);

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  target?: string | number;
  briefing?: Briefing;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, unit, trend, target, briefing }) => (
  <Card className="flex flex-col justify-between h-full" title={title} briefing={briefing}>
    <div className="mt-2 flex items-baseline gap-1">
      <span className="text-2xl font-bold text-slate-900">{value}</span>
      {unit && <span className="text-sm text-slate-500">{unit}</span>}
    </div>
    <div className="mt-4 flex items-center justify-between text-xs">
      {target && <span className="text-slate-400">Meta: {target}</span>}
      {trend && (
        <span className={cn(
          "px-1.5 py-0.5 rounded-full font-medium",
          trend === 'up' ? "bg-emerald-50 text-emerald-700" : 
          trend === 'down' ? "bg-rose-50 text-rose-700" : "bg-slate-50 text-slate-700"
        )}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
        </span>
      )}
    </div>
  </Card>
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => (
  <AnimatePresence>
    {isOpen && (
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
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden border border-slate-200"
        >
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);
