import React, { useState } from 'react';
import { CheckSquare, Square, Mail, Copy, Check, FileText, ArrowRight, ShieldCheck, Download, Sparkles } from 'lucide-react';

interface ChecklistItem {
  id: string;
  task: string;
  category: 'Access Grant' | 'Technical Verification' | 'Tracking Configuration';
  completed: boolean;
  notes: string;
  docsSnippet?: string;
}

export const ClientOnboardingHub: React.FC = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<'access' | 'new-site'>('access');
  const [clientName, setClientName] = useState('Nexus Retail Corp');
  const [clientDomain, setClientDomain] = useState('https://nexusretail.example');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isGeneratingAudit, setIsGeneratingAudit] = useState(false);
  const [auditGenerated, setAuditGenerated] = useState(false);

  // Access checklist (Tasks #35-39)
  const [accessItems, setAccessItems] = useState<ChecklistItem[]>([
    {
      id: 'acc-1',
      task: 'Google Analytics 4 (GA4) Administrator / Editor Access',
      category: 'Access Grant',
      completed: true,
      notes: 'Agency service account added as Administrator under Admin > Property Access Management.',
      docsSnippet: 'Required email: analytics-agency@company.com with Editor permissions.',
    },
    {
      id: 'acc-2',
      task: 'Google Search Console (GSC) Full User / Owner Access',
      category: 'Access Grant',
      completed: true,
      notes: 'Allows querying Sitemaps API, submitting URLs, and reviewing indexation status.',
      docsSnippet: 'Settings > Users and permissions > Add user > Permission: Full.',
    },
    {
      id: 'acc-3',
      task: 'Google Tag Manager (GTM) Container Publish Permissions',
      category: 'Access Grant',
      completed: false,
      notes: 'Required to deploy GA4 event tags, Schema JSON-LD injectors, and conversion pixels.',
      docsSnippet: 'Admin > Container User Management > Publish & Approve permissions.',
    },
    {
      id: 'acc-4',
      task: 'Google Business Profile (GBP / GMB) Manager Access',
      category: 'Access Grant',
      completed: false,
      notes: 'Requires client to grant manager access in Google Business Profile manager console.',
      docsSnippet: 'Business profile settings > People and access > Add manager.',
    },
    {
      id: 'acc-5',
      task: 'Social Media Accounts (Meta Business Suite, LinkedIn Page)',
      category: 'Access Grant',
      completed: false,
      notes: 'Required for Meta Graph API automated scheduling and social post publication.',
      docsSnippet: 'Meta Business Manager > People > Assign Assets (Pages & Instagram).',
    },
  ]);

  // New site launchpad (Tasks #40-47)
  const [launchItems, setLaunchItems] = useState<ChecklistItem[]>([
    {
      id: 'lnc-1',
      task: 'GA4 Setup & Custom Goal / Event Conversion Streams',
      category: 'Tracking Configuration',
      completed: false,
      notes: 'Configured contact_form_submit, lead_booked, and ecommerce purchase events.',
    },
    {
      id: 'lnc-2',
      task: 'GSC DNS TXT / HTML Tag Verification',
      category: 'Technical Verification',
      completed: false,
      notes: 'Verification step requires client DNS access or header meta tag.',
    },
    {
      id: 'lnc-3',
      task: 'GTM Production Container Setup & Trigger Logic',
      category: 'Tracking Configuration',
      completed: false,
      notes: 'Container loaded in <head> and immediately after opening <body>.',
    },
    {
      id: 'lnc-4',
      task: 'XML Sitemap Creation & Submission (GSC Sitemaps API)',
      category: 'Technical Verification',
      completed: false,
      notes: 'Pushed via API: /sites/{site}/sitemaps/{path}',
    },
    {
      id: 'lnc-5',
      task: 'Robots.txt Standard Configuration Deployed',
      category: 'Technical Verification',
      completed: false,
      notes: 'Disallowing internal search queries and admin paths; sitemap directive linked.',
    },
    {
      id: 'lnc-6',
      task: 'Canonical Tag Implementation Across All Indexable Pages',
      category: 'Technical Verification',
      completed: false,
      notes: 'Prevent duplicate content indexing between staging, trailing slash, and HTTP/HTTPS.',
    },
    {
      id: 'lnc-7',
      task: 'JSON-LD Schema Markup Deployed (Article, LocalBusiness, FAQ)',
      category: 'Technical Verification',
      completed: false,
      notes: 'Validated against Schema.org and Google Rich Results guidelines.',
    },
  ]);

  const toggleAccessItem = (id: string) => {
    setAccessItems(accessItems.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)));
  };

  const toggleLaunchItem = (id: string) => {
    setLaunchItems(launchItems.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)));
  };

  const clientEmailTemplate = `Subject: Welcome to Apex SEO Ops - Essential Tool Access Checklist for ${clientName}

Hi ${clientName} Team,

To begin onboarding and configure our automated crawling, rank tracking, and Core Web Vitals monitors for ${clientDomain}, please grant our agency email (agency-team@example.com) access to the following 5 platforms:

1. Google Analytics 4 (GA4): Property Admin/Editor permissions
2. Google Search Console (GSC): Full User permissions
3. Google Tag Manager (GTM): Container Publish permissions
4. Google Business Profile: Manager permissions (for local SEO)
5. Meta Business Suite & LinkedIn Page: Content Creator permissions

Our engineering team will immediately link these properties into our automated technical audit pipeline once granted.

Best regards,
SEO Operations Engineering Team`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(clientEmailTemplate);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const generateOneClickAudit = () => {
    setIsGeneratingAudit(true);
    setTimeout(() => {
      setIsGeneratingAudit(false);
      setAuditGenerated(true);
    }, 1500);
  };

  const completedAccessCount = accessItems.filter((i) => i.completed).length;
  const completedLaunchCount = launchItems.filter((i) => i.completed).length;

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span>Tasks #33, #35-39 & #40-47</span>
            <span>·</span>
            <span>Client Onboarding & Launch Automation</span>
            <span>·</span>
            <span className="text-slate-400">Audit Generation & Access Verification</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Client Onboarding & New Site Setup Hub</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Standardizes manual client handoffs, access grant instructions, and automated 1-click initial audit reports.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={generateOneClickAudit}
            disabled={isGeneratingAudit}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors disabled:opacity-50 shadow-sm"
          >
            {isGeneratingAudit ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Aggregating PSI + GSC + Crawl...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>1-Click Generate Onboarding Audit (Task #33)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Audit Banner if Generated */}
      {auditGenerated && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-between gap-4 text-xs text-emerald-200">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="font-semibold text-white">
                Initial SEO Audit Successfully Assembled for {clientDomain}
              </div>
              <p className="text-emerald-300/80 mt-0.5">
                Combined PageSpeed Insights API + GSC API metrics + Screaming Frog crawl data into unified client presentation.
              </p>
            </div>
          </div>
          <button
            onClick={() => alert(`Downloaded onboarding audit PDF for ${clientDomain}`)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Audit PDF</span>
          </button>
        </div>
      )}

      {/* Workflow Tabs */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl w-fit">
        <button
          onClick={() => setActiveWorkflow('access')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            activeWorkflow === 'access' ? 'bg-slate-800 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Client Access Grant Checklist ({completedAccessCount}/{accessItems.length})
        </button>
        <button
          onClick={() => setActiveWorkflow('new-site')}
          className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
            activeWorkflow === 'new-site' ? 'bg-slate-800 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          New Website SEO Launchpad ({completedLaunchCount}/{launchItems.length})
        </button>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Checklist */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-semibold text-white">
              {activeWorkflow === 'access' ? 'Client Access Requests (Manual Work)' : 'Technical Site Launch Protocol'}
            </h3>
            <span className="text-xs font-mono text-emerald-400">
              {activeWorkflow === 'access'
                ? `${Math.round((completedAccessCount / accessItems.length) * 100)}% Complete`
                : `${Math.round((completedLaunchCount / launchItems.length) * 100)}% Complete`}
            </span>
          </div>

          <div className="space-y-2.5">
            {(activeWorkflow === 'access' ? accessItems : launchItems).map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  activeWorkflow === 'access' ? toggleAccessItem(item.id) : toggleLaunchItem(item.id)
                }
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  item.completed
                    ? 'bg-emerald-500/5 border-emerald-500/30'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <button className="mt-0.5 text-emerald-400 shrink-0">
                  {item.completed ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-600" />}
                </button>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${item.completed ? 'text-white line-through text-slate-400' : 'text-slate-200'}`}>
                      {item.task}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">{item.category}</span>
                  </div>
                  <p className="text-xs text-slate-400">{item.notes}</p>
                  {item.docsSnippet && (
                    <div className="text-[11px] text-emerald-400/90 font-mono mt-1 bg-slate-900/60 px-2 py-1 rounded">
                      {item.docsSnippet}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Email Template / Instructions Generator */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400" />
              Client Handshake Outreach Email
            </h3>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium rounded-lg hover:bg-emerald-500/20 transition-colors"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Copied!' : 'Copy Template'}</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Target Client Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Client Domain</label>
              <input
                type="text"
                value={clientDomain}
                onChange={(e) => setClientDomain(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto max-h-80">
            <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
              {clientEmailTemplate}
            </pre>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl text-xs text-slate-400">
            <p>
              Note from Matrix: "Requires client to manually grant access; cannot be automated. Provide clear copy-paste walkthroughs."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
