import React, { useState } from 'react';
import { INITIAL_KEYWORD_GAP_DATA } from '../../data/mockData';
import { KeywordGapItem } from '../../types/seo-matrix';
import { Search, Filter, Download, ArrowUpRight, Sparkles, TrendingUp, Target, Layers } from 'lucide-react';

export const CompetitorGapLab: React.FC = () => {
  const [clientDomain, setClientDomain] = useState('client-saas.com');
  const [comp1, setComp1] = useState('competitor-alpha.com');
  const [comp2, setComp2] = useState('rival-beta.io');
  const [comp3, setComp3] = useState('market-gamma.com');

  const [gapFilter, setGapFilter] = useState<'All' | 'Missing' | 'Untapped' | 'Weak' | 'Shared'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [keywords, setKeywords] = useState<KeywordGapItem[]>(INITIAL_KEYWORD_GAP_DATA);

  const filtered = keywords.filter((item) => {
    if (gapFilter !== 'All' && item.gapType !== gapFilter) return false;
    if (searchQuery && !item.keyword.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const missingCount = keywords.filter((k) => k.gapType === 'Missing').length;
  const untappedCount = keywords.filter((k) => k.gapType === 'Untapped').length;
  const weakCount = keywords.filter((k) => k.gapType === 'Weak').length;

  const exportCsv = () => {
    const header = 'Keyword,Search Volume,Difficulty (KD%),Intent,Client Rank,Competitor 1,Competitor 2,Competitor 3,Gap Type,CPC ($)\n';
    const rows = filtered
      .map(
        (k) =>
          `"${k.keyword}",${k.searchVolume},${k.difficulty},${k.intent},${k.clientRank || 'None'},${k.comp1Rank || 'None'},${k.comp2Rank || 'None'},${k.comp3Rank || 'None'},${k.gapType},${k.cpc}`
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `competitor-gap-${clientDomain}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span>Tasks #5, #15, #26 & #34</span>
            <span>·</span>
            <span>Semrush & Ahrefs Content Gap API Integration</span>
            <span>·</span>
            <span className="text-slate-400">Scheduled 3-Competitor Ingestion</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Competitor Content Gap & Keyword Lab</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Pulls search volume, keyword difficulty, and intent gaps between client domain and top 3 organic competitors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-xs font-medium text-slate-200 hover:text-white"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Gap CSV</span>
          </button>
        </div>
      </div>

      {/* Domain Comparator Input Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span>Active Comparison Scope</span>
          <span className="text-slate-500 font-mono">Semrush API v3 & Ahrefs v3</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-emerald-400 font-medium mb-1">Your Domain (Client)</label>
            <input
              type="text"
              value={clientDomain}
              onChange={(e) => setClientDomain(e.target.value)}
              className="w-full bg-slate-950 border border-emerald-500/40 rounded-xl px-3 py-2 text-white font-mono"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Competitor 1</label>
            <input
              type="text"
              value={comp1}
              onChange={(e) => setComp1(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Competitor 2</label>
            <input
              type="text"
              value={comp2}
              onChange={(e) => setComp2(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Competitor 3</label>
            <input
              type="text"
              value={comp3}
              onChange={(e) => setComp3(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono"
            />
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Missing Keywords</span>
            <span className="text-rose-400 font-medium">Competitors Rank, You Don't</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2 tabular-nums">{missingCount} Opportunities</div>
          <p className="text-xs text-slate-500 mt-1">High-priority targets for new blog and service pages.</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Untapped Keywords</span>
            <span className="text-emerald-400 font-medium">None of You Rank</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2 tabular-nums">{untappedCount} First Mover</div>
          <p className="text-xs text-slate-500 mt-1">Low-KD terms with solid volume to dominate early.</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Weak Positions</span>
            <span className="text-amber-400 font-medium">Outranked by Rivals</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2 tabular-nums">{weakCount} Refresh Targets</div>
          <p className="text-xs text-slate-500 mt-1">Existing articles needing on-page content enhancement.</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Dev Job Status</span>
            <span className="text-emerald-400 font-mono">Task #15</span>
          </div>
          <div className="text-sm font-semibold text-slate-200 mt-2">Weekly Cron Sync</div>
          <p className="text-xs text-slate-500 mt-1">Pulls fresh gap delta automatically every Sunday 02:00 UTC.</p>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        {/* Table controls */}
        <div className="p-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl overflow-x-auto">
            {(['All', 'Missing', 'Untapped', 'Weak', 'Shared'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setGapFilter(filter)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  gapFilter === filter
                    ? 'bg-slate-800 text-emerald-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search keyword gap..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-medium">
                <th className="py-3 px-4">Keyword</th>
                <th className="py-3 px-4">Search Vol</th>
                <th className="py-3 px-4">KD %</th>
                <th className="py-3 px-4">Intent</th>
                <th className="py-3 px-4 text-emerald-400">Client Rank</th>
                <th className="py-3 px-4 text-slate-400">Comp 1</th>
                <th className="py-3 px-4 text-slate-400">Comp 2</th>
                <th className="py-3 px-4 text-slate-400">Comp 3</th>
                <th className="py-3 px-4">Gap Status</th>
                <th className="py-3 px-4">Est. CPC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filtered.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/25 transition-colors">
                  <td className="py-3 px-4 font-sans font-medium text-slate-200">{item.keyword}</td>
                  <td className="py-3 px-4 text-slate-300 tabular-nums">{item.searchVolume.toLocaleString()}</td>
                  <td className="py-3 px-4 tabular-nums">
                    <span
                      className={`font-semibold ${
                        item.difficulty < 40 ? 'text-emerald-400' : item.difficulty < 65 ? 'text-amber-400' : 'text-rose-400'
                      }`}
                    >
                      {item.difficulty}%
                    </span>
                  </td>
                  <td className="py-3 px-4 font-sans">
                    <span className="text-[11px] text-slate-400">{item.intent}</span>
                  </td>
                  <td className="py-3 px-4 tabular-nums font-bold text-emerald-400">
                    {item.clientRank ? `#${item.clientRank}` : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="py-3 px-4 tabular-nums text-slate-400">
                    {item.comp1Rank ? `#${item.comp1Rank}` : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="py-3 px-4 tabular-nums text-slate-400">
                    {item.comp2Rank ? `#${item.comp2Rank}` : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="py-3 px-4 tabular-nums text-slate-400">
                    {item.comp3Rank ? `#${item.comp3Rank}` : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="py-3 px-4 font-sans">
                    <span
                      className={`text-[11px] font-medium ${
                        item.gapType === 'Missing'
                          ? 'text-rose-400'
                          : item.gapType === 'Untapped'
                          ? 'text-emerald-400'
                          : item.gapType === 'Weak'
                          ? 'text-amber-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {item.gapType}
                    </span>
                  </td>
                  <td className="py-3 px-4 tabular-nums text-slate-300">${item.cpc.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-950/60 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>Dev Note from Matrix: "Auto-suggest blog topics by combining competitor content gaps with trending queries."</span>
          <span className="font-mono text-emerald-400">{filtered.length} Results Listed</span>
        </div>
      </div>
    </div>
  );
};
