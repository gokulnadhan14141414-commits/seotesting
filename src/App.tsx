import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { MatrixDashboard } from './components/MatrixDashboard';
import { SchemaGenerator } from './components/tools/SchemaGenerator';
import { PageSpeedAuditor } from './components/tools/PageSpeedAuditor';
import { RobotsSitemapTool } from './components/tools/RobotsSitemapTool';
import { CompetitorGapLab } from './components/tools/CompetitorGapLab';
import { AlgorithmRadar } from './components/tools/AlgorithmRadar';
import { ContentCalendarTool } from './components/tools/ContentCalendarTool';
import { ClientOnboardingHub } from './components/tools/ClientOnboardingHub';
import { ApiDirectoryHub } from './components/tools/ApiDirectoryHub';
import { ContentQaBot } from './components/tools/ContentQaBot';
import { DeckGenerator } from './components/tools/DeckGenerator';
import { RedirectMapper } from './components/tools/RedirectMapper';
import { INITIAL_SEO_TASKS } from './data/initialTasks';
import { TaskItem } from './types/seo-matrix';
import { ArrowLeft, Sparkles, Layers, ShieldCheck, Database, Wrench } from 'lucide-react';

const STORAGE_KEY = 'apex_seo_ops_tasks_v2';

export default function App() {
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load tasks from localStorage', e);
    }
    return INITIAL_SEO_TASKS;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('matrix');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e);
    }
  }, [tasks]);

  const handleUpdateTasks = (updated: TaskItem[]) => {
    setTasks(updated);
  };

  const handleSelectTool = (toolId: TaskItem['executionToolId']) => {
    if (toolId) {
      setActiveTab(toolId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-400">
      {/* Top Bar Contract Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        tasksCount={tasks.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Context Breadcrumb when viewing an execution tool */}
        {activeTab !== 'matrix' && (
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
            <button
              onClick={() => setActiveTab('matrix')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to 100% Automation Matrix</span>
            </button>
            <div className="text-xs text-slate-500 font-mono">
              Autonomous Execution Module
            </div>
          </div>
        )}

        {/* View Switcher Routing */}
        {activeTab === 'matrix' && (
          <MatrixDashboard
            tasks={tasks}
            onUpdateTasks={handleUpdateTasks}
            onSelectTool={handleSelectTool}
          />
        )}

        {activeTab === 'content-qa-bot' && <ContentQaBot />}

        {activeTab === 'deck-generator' && <DeckGenerator />}

        {activeTab === 'redirect-mapper' && <RedirectMapper />}

        {activeTab === 'schema-gen' && <SchemaGenerator />}

        {activeTab === 'pagespeed-cwv' && <PageSpeedAuditor />}

        {activeTab === 'robots-sitemap' && <RobotsSitemapTool />}

        {activeTab === 'gap-analyzer' && <CompetitorGapLab />}

        {activeTab === 'rss-radar' && <AlgorithmRadar />}

        {activeTab === 'calendar-planner' && <ContentCalendarTool />}

        {activeTab === 'onboarding-wizard' && <ClientOnboardingHub />}

        {activeTab === 'api-directory' && <ApiDirectoryHub />}
      </main>

      {/* Quiet, compliant footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Apex SEO Operations & Full Automation Platform</span>
          <div className="flex items-center gap-3 font-mono text-[11px] text-emerald-400">
            <span>47/47 Requirements 100% Automated</span>
            <span>·</span>
            <span>Zero Human Bottlenecks</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
