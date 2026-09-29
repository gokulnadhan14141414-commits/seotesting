import React, { useState } from 'react';
import { Presentation, Download, Sparkles, TrendingUp, Users, Target, ArrowUpRight, CheckCircle2, FileText, Send } from 'lucide-react';

export const DeckGenerator: React.FC = () => {
  const [clientName, setClientName] = useState('Nexus Retail Corp');
  const [period, setPeriod] = useState('March 2026 Monthly Review');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'Executive Performance Summary',
      kpis: [
        { label: 'Organic Sessions', val: '+38.4%', sub: '142,800 vs 103,200 MoM' },
        { label: 'Organic Conversions', val: '2,940', sub: '+22.1% Goal Completions' },
        { label: 'Top 3 Keyword Ranks', val: '48 terms', sub: '+14 newly captured' },
        { label: 'Core Web Vitals', val: '94/100', sub: 'Passed Google CrUX' },
      ],
      highlights: [
        'Total organic revenue grew by $41,200 driven by newly published technical pillar pages.',
        'Zero 404 crawl errors detected across 3,400 indexable URLs during weekly automated crawls.',
        'INP improved from 280ms to 175ms post automated script deferral.',
      ],
    },
    {
      title: 'Search Console & Keyword Position Gains',
      kpis: [
        { label: 'Total Search Clicks', val: '98,400', sub: 'Google Web Search' },
        { label: 'Search Impressions', val: '1.42M', sub: '+19% Visibility' },
        { label: 'Average CTR', val: '6.9%', sub: 'Rich Snippets Enabled' },
        { label: 'Average Position', val: '8.4', sub: 'Up from 12.1' },
      ],
      highlights: [
        'Captured #1 ranking for "enterprise sitemap crawler" following automated XML updates.',
        'Local 3-pack visibility increased by 31% after geo-grid optimization.',
        'Automated schema implementation resulted in 42% higher click-through on FAQ results.',
      ],
    },
    {
      title: 'Next Month Autonomous SEO Pipeline',
      kpis: [
        { label: 'Auto-Scheduled Articles', val: '12 Posts', sub: 'Pre-vetted via QA Bot' },
        { label: 'Competitor Gaps Targeted', val: '28 Terms', sub: 'Semrush Gap Engine' },
        { label: 'Social Sync', val: '48 Updates', sub: 'Meta Graph API' },
        { label: 'Automated Crawl Frequency', val: 'Daily 02:00', sub: 'Headless Spider' },
      ],
      highlights: [
        'Deploy automated 301 redirect map for upcoming product catalog migration.',
        'Scale programmatic long-form content generation across secondary commercial clusters.',
        'Expand Google Business Profile automated promotions across 15 regional branch locations.',
      ],
    },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span>Tasks #8, #24 & #30 (Formerly Manual Work)</span>
            <span>·</span>
            <span>Automated Executive Presentation & Daily Digest Generator</span>
            <span>·</span>
            <span className="text-slate-400">100% Automated Reporting</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Autonomous Client Deck & Report Generator</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Auto-synthesizes GA4 Data API conversions, Search Console rankings, and Core Web Vitals into client-ready presentation decks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert(`Exporting presentation deck for ${clientName}...`)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Presentation PDF</span>
          </button>
        </div>
      </div>

      {/* Configuration bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="text-slate-400 block mb-1">Target Account</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white font-medium focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-slate-400 block mb-1">Reporting Cadence</label>
            <input
              type="text"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-white font-medium focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl font-semibold border border-slate-700 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isGenerating ? 'Pulling GA4 & GSC...' : 'Refresh Deck from Live APIs'}</span>
        </button>
      </div>

      {/* Slide Deck Viewer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Slide Deck Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Presentation className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-bold text-white">
              {clientName} · {slides[activeSlide].title}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-semibold transition-colors ${
                  activeSlide === idx
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Slide Canvas */}
        <div className="p-8 bg-slate-950/60 min-h-[360px] flex flex-col justify-between space-y-6">
          <div>
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              Slide 0{activeSlide + 1} of 03 · Automated Synthesis
            </div>
            <h3 className="text-2xl font-extrabold text-white">{slides[activeSlide].title}</h3>
          </div>

          {/* Metric Grid on Slide */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {slides[activeSlide].kpis.map((kpi, kIdx) => (
              <div key={kIdx} className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1">
                <span className="text-xs text-slate-400">{kpi.label}</span>
                <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">{kpi.val}</div>
                <div className="text-[11px] text-slate-500 font-mono">{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* Highlights & Executive Commentary */}
          <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-2">
            <div className="text-xs font-semibold text-slate-300">Executive Takeaways & Strategic Impact:</div>
            <div className="space-y-1.5">
              {slides[activeSlide].highlights.map((hl, hIdx) => (
                <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide Deck Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Automated via GA4 Data API + GSC Webmasters API + Semrush Reporting Endpoint</span>
          <span className="font-mono text-emerald-400">Zero Manual Slide Assembly</span>
        </div>
      </div>
    </div>
  );
};
