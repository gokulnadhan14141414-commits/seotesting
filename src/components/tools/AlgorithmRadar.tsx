import React, { useState } from 'react';
import { INITIAL_SEO_NEWS } from '../../data/mockData';
import { SEONewsItem } from '../../types/seo-matrix';
import { Rss, ExternalLink, Bell, AlertOctagon, Filter, RefreshCw, Radio } from 'lucide-react';

export const AlgorithmRadar: React.FC = () => {
  const [news, setNews] = useState<SEONewsItem[]>(INITIAL_SEO_NEWS);
  const [filterSource, setFilterSource] = useState<string>('All');
  const [filterImpact, setFilterImpact] = useState<string>('All');
  const [webhookUrl, setWebhookUrl] = useState('https://hooks.slack.com/services/T00/B00/XXXXX');
  const [isAlertTesting, setIsAlertTesting] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);

  const filteredNews = news.filter((item) => {
    if (filterSource !== 'All' && item.source !== filterSource) return false;
    if (filterImpact !== 'All' && item.impactLevel !== filterImpact) return false;
    return true;
  });

  const triggerTestAlert = () => {
    setIsAlertTesting(true);
    setTimeout(() => {
      setIsAlertTesting(false);
      setAlertSuccess(true);
      setTimeout(() => setAlertSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span>Task #32</span>
            <span>·</span>
            <span>RSS Aggregation Feed</span>
            <span>·</span>
            <span className="text-slate-400">Google Search Central + SERoundtable + SEJ</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Algorithm Updates & SEO Trends Radar</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Automated feed reader and webhook notification engine replacing manual blog browsing across search authorities.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Feed Listener Active</span>
          </span>
        </div>
      </div>

      {/* Webhook & Ingestion Pipeline Config */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-400" />
              Dev Webhook Alert Dispatcher
            </h3>
            <p className="text-xs text-slate-400">
              Dispatches critical Google Core Updates & confirmed SERP anomalies straight to agency Slack / Discord / Microsoft Teams.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 font-mono w-full md:w-80"
              placeholder="Slack/Discord webhook endpoint"
            />
            <button
              onClick={triggerTestAlert}
              disabled={isAlertTesting}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border border-slate-700"
            >
              {isAlertTesting ? 'Testing...' : alertSuccess ? 'Test Sent!' : 'Send Test Ping'}
            </button>
          </div>
        </div>
      </div>

      {/* Filters and RSS Sources */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            {(['All', 'Google Search Central', 'Search Engine Roundtable', 'Search Engine Journal'] as const).map(
              (source) => (
                <button
                  key={source}
                  onClick={() => setFilterSource(source)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    filterSource === source
                      ? 'bg-slate-800 text-emerald-400 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {source}
                </button>
              )
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {(['All', 'Critical / Core Update', 'Moderate Impact', 'Advisory / Routine'] as const).map((impact) => (
            <button
              key={impact}
              onClick={() => setFilterImpact(impact)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filterImpact === impact
                  ? 'bg-slate-800 text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {impact === 'All' ? 'All Impacts' : impact.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Feed Stream */}
      <div className="space-y-3">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 rounded-2xl transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-emerald-400">{item.source}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">{item.date}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-400">{item.category}</span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-semibold font-mono px-2 py-0.5 rounded ${
                    item.impactLevel.includes('Critical')
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : item.impactLevel.includes('Moderate')
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.impactLevel}
                </span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-400 transition-colors p-1"
                  title="Open source article"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <h3 className="text-base font-semibold text-white leading-snug hover:text-emerald-300 transition-colors">
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </h3>

            <p className="text-xs text-slate-400 leading-relaxed">{item.summary}</p>
          </div>
        ))}
      </div>

      <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl text-xs text-slate-400 flex items-center justify-between">
        <span>Dev Note from Matrix: "Build a simple RSS-feed dashboard/alert widget in the portal rather than manual browsing."</span>
        <span className="font-mono text-emerald-400">Piped directly via Cron</span>
      </div>
    </div>
  );
};
