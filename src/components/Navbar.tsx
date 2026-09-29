import React from 'react';
import { Layers, Wrench, Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';

export type ActiveTab =
  | 'matrix'
  | 'pagespeed-cwv'
  | 'schema-gen'
  | 'robots-sitemap'
  | 'gap-analyzer'
  | 'content-qa-bot'
  | 'deck-generator'
  | 'redirect-mapper'
  | 'rss-radar'
  | 'calendar-planner'
  | 'onboarding-wizard'
  | 'api-directory';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  tasksCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  tasksCount,
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const mainTabs: { id: ActiveTab; label: string }[] = [
    { id: 'matrix', label: '100% Automation Matrix' },
    { id: 'content-qa-bot', label: 'Content QA Bot' },
    { id: 'deck-generator', label: 'Deck Generator' },
    { id: 'redirect-mapper', label: '301 Redirects' },
    { id: 'pagespeed-cwv', label: 'Speed & CWV' },
  ];

  const secondaryTabs: { id: ActiveTab; label: string; desc: string }[] = [
    { id: 'schema-gen', label: 'Schema Generator', desc: 'JSON-LD structured data builder' },
    { id: 'robots-sitemap', label: 'Robots & Sitemap Architect', desc: 'Auto-generates sitemaps & robots.txt' },
    { id: 'gap-analyzer', label: 'Competitor Gap Lab', desc: '3-competitor keyword gap analysis' },
    { id: 'rss-radar', label: 'Algorithm Radar (RSS)', desc: 'Search updates listener & Slack alerts' },
    { id: 'calendar-planner', label: 'Content Calendar', desc: 'Meta Graph API automated publisher' },
    { id: 'onboarding-wizard', label: 'OAuth Onboarding Hub', desc: '1-click client magic link authorization' },
    { id: 'api-directory', label: 'Developer API Hub', desc: 'Endpoints, credentials & specs' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('matrix');
            }}
            className="text-lg font-bold tracking-tight text-white hover:text-emerald-400 transition-colors shrink-0 flex items-center gap-2"
          >
            <span>Apex SEO Ops</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono font-semibold">
              100% Auto
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {mainTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-800 text-emerald-400 shadow-xs'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}

            {/* More Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  secondaryTabs.some((t) => t.id === activeTab)
                    ? 'bg-slate-800 text-emerald-400 shadow-xs'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                }`}
              >
                <span>More Modules</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl z-50 space-y-1"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {secondaryTabs.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition-colors ${
                        activeTab === item.id
                          ? 'bg-slate-800 text-emerald-400'
                          : 'hover:bg-slate-800/60 text-slate-300'
                      }`}
                    >
                      <div className="text-xs font-semibold">{item.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Primary Actions & Metric Badge */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1.5 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>47/47 Automated</span>
            </div>

            <button
              onClick={() => onSelectTab('matrix')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl transition-colors whitespace-nowrap"
            >
              Master Matrix
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
