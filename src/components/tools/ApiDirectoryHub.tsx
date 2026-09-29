import React, { useState } from 'react';
import { API_DIRECTORY, ApiIntegrationSpec } from '../../data/mockData';
import { Key, ExternalLink, ShieldCheck, Database, Terminal, CheckCircle2, Lock, Cpu } from 'lucide-react';

export const ApiDirectoryHub: React.FC = () => {
  const [apis, setApis] = useState<ApiIntegrationSpec[]>(API_DIRECTORY);
  const [selectedApi, setSelectedApi] = useState<ApiIntegrationSpec>(API_DIRECTORY[0]);
  const [apiKeys, setApiKeys] = useState<{ [key: string]: string }>({
    pagespeed: 'AIzaSyA89ExampleKeyPSI',
    semrush: 'sem_live_key_9941a8bc',
    'serp-api': 'serp_live_test_7749',
  });
  const [keySaved, setKeySaved] = useState(false);

  const handleSaveKey = (id: string, keyVal: string) => {
    setApiKeys({ ...apiKeys, [id]: keyVal });
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span>Dev Operations Directory</span>
            <span>·</span>
            <span>10 Integrated & Suggested SEO APIs</span>
            <span>·</span>
            <span className="text-slate-400">Auth, Endpoints & Reference Links</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Developer API & Integration Directory</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Reference repository of all external APIs and tools required to automate the SEO operations matrix.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
          <ShieldCheck className="w-4 h-4" />
          <span>OAuth 2.0 & API Key Standard Compliant</span>
        </div>
      </div>

      {/* Main Grid: API List on Left, Active API Details on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Available Provider Modules ({apis.length})
          </div>

          <div className="space-y-2">
            {apis.map((api) => {
              const isSelected = selectedApi.id === api.id;
              const hasKey = !!apiKeys[api.id];

              return (
                <div
                  key={api.id}
                  onClick={() => setSelectedApi(api)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500/50 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{api.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <span>{api.category}</span>
                      <span>·</span>
                      <span className="font-mono text-slate-500">{api.pricingModel}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-medium ${
                        api.status === 'Live in Portal'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : api.status === 'Ready to Connect'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : api.status === 'Needs Google Approval'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {api.status}
                    </span>
                    {hasKey && <span className="text-[10px] text-emerald-400 font-mono">Key set</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Details Panel */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="text-xs text-emerald-400 font-mono">{selectedApi.category}</div>
              <h3 className="text-lg font-bold text-white mt-0.5">{selectedApi.name}</h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">{selectedApi.baseUrl}</p>
            </div>

            <a
              href={selectedApi.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shrink-0"
            >
              <span>Official Docs</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Key specs */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="text-slate-400 block mb-1">Authentication Method</span>
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                {selectedApi.authMethod}
              </span>
            </div>
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="text-slate-400 block mb-1">Pricing / Cost Model</span>
              <span className="font-semibold text-white">{selectedApi.pricingModel}</span>
            </div>
          </div>

          {/* Use cases */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Primary Use Cases in Portal:
            </h4>
            <div className="space-y-1.5">
              {selectedApi.keyUseCases.map((uc, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{uc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Endpoint / CLI */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              Sample Request / CLI Command
            </h4>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>{selectedApi.sampleEndpoint}</code>
            </div>
          </div>

          {/* Key Sandbox */}
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-white flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-emerald-400" />
                Portal API Key / Bearer Token Sandbox
              </span>
              {keySaved && <span className="text-emerald-400 font-mono text-[11px]">Saved to browser!</span>}
            </div>

            <div className="flex gap-2">
              <input
                type="password"
                placeholder={`Enter ${selectedApi.name} key...`}
                value={apiKeys[selectedApi.id] || ''}
                onChange={(e) => setApiKeys({ ...apiKeys, [selectedApi.id]: e.target.value })}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => handleSaveKey(selectedApi.id, apiKeys[selectedApi.id] || '')}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors"
              >
                Save
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              API credentials are kept strictly in local memory and are never transmitted to external unauthorized endpoints.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
