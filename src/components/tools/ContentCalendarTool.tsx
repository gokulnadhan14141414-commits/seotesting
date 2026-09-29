import React, { useState } from 'react';
import { INITIAL_CALENDAR_ITEMS } from '../../data/mockData';
import { ContentCalendarItem } from '../../types/seo-matrix';
import { Calendar as CalendarIcon, Plus, CheckCircle, Clock, ShieldCheck, Share2, Filter, AlertCircle } from 'lucide-react';

export const ContentCalendarTool: React.FC = () => {
  const [items, setItems] = useState<ContentCalendarItem[]>(INITIAL_CALENDAR_ITEMS);
  const [channelFilter, setChannelFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New post modal state
  const [newTitle, setNewTitle] = useState('');
  const [newChannel, setNewChannel] = useState<'Blog' | 'Instagram' | 'Facebook' | 'LinkedIn' | 'YouTube Shorts'>('Blog');
  const [newClient, setNewClient] = useState('Acme Health Tech');
  const [newDate, setNewDate] = useState('2026-04-05');
  const [newPreview, setNewPreview] = useState('');

  const filteredItems = items.filter((item) => {
    if (channelFilter !== 'All' && item.channel !== channelFilter) return false;
    if (statusFilter !== 'All' && item.status !== statusFilter) return false;
    return true;
  });

  const handleStatusChange = (id: string, newStatus: ContentCalendarItem['status']) => {
    setItems(items.map((i) => (i.id === id ? { ...i, status: newStatus } : i)));
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newItem: ContentCalendarItem = {
      id: `cal-${Date.now()}`,
      title: newTitle,
      channel: newChannel,
      client: newClient,
      scheduledDate: newDate,
      scheduledTime: '10:00 AM',
      status: 'Needs Human QA',
      contentPreview: newPreview || 'Scheduled editorial content piece...',
      author: 'Content Team',
    };

    setItems([newItem, ...items]);
    setNewTitle('');
    setNewPreview('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span>Tasks #1, #2, #11, #12, #25 & #29</span>
            <span>·</span>
            <span>Cross-Channel Scheduler & Meta Graph API</span>
            <span>·</span>
            <span className="text-slate-400">Editorial QA & Publishing Engine</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Omni-Channel Content Calendar</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            Manages synchronized publishing across Blog, Meta, LinkedIn, and Video with human QA approval checkpoints.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule New Post</span>
          </button>
        </div>
      </div>

      {/* Meta Graph API Automation Banner (Task 25 Dev Notes) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 shrink-0">
            <Share2 className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-slate-200">Meta Graph API Auto-Publish Pipeline Active</div>
            <div className="text-slate-400">
              "Extend existing Post module to auto-publish/schedule instead of manual posting per client."
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Queue Synced with Portal DB</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          {(['All', 'Blog', 'Instagram', 'Facebook', 'LinkedIn', 'YouTube Shorts'] as const).map((channel) => (
            <button
              key={channel}
              onClick={() => setChannelFilter(channel)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                channelFilter === channel
                  ? 'bg-slate-800 text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {channel}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto">
          {(['All', 'Needs Human QA', 'Approved', 'Scheduled', 'Published', 'Draft'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-slate-800 text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Post Queue Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-3 hover:border-slate-700 transition-all"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-emerald-400">{item.channel}</span>
                <span className="text-slate-400 font-mono text-[11px]">{item.scheduledDate} · {item.scheduledTime}</span>
              </div>

              <div className="text-[11px] text-slate-400 mb-1 font-mono">{item.client}</div>
              <h4 className="text-sm font-semibold text-white leading-snug line-clamp-2">{item.title}</h4>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">{item.contentPreview}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
              <span
                className={`font-semibold font-mono text-[11px] px-2 py-0.5 rounded ${
                  item.status === 'Approved' || item.status === 'Published'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : item.status === 'Needs Human QA'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {item.status}
              </span>

              <select
                value={item.status}
                onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                className="bg-slate-950 border border-slate-800 text-[11px] text-slate-300 rounded-lg px-2 py-1 focus:outline-none focus:border-emerald-500"
              >
                <option value="Draft">Draft</option>
                <option value="Needs Human QA">Needs Human QA</option>
                <option value="Approved">Approved</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Published">Published</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-semibold text-white">Schedule New Content Item</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                ×
              </button>
            </div>

            <form onSubmit={handleAddPost} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Post / Article Headline</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Master Guide to Schema & Core Web Vitals"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Publishing Channel</label>
                  <select
                    value={newChannel}
                    onChange={(e: any) => setNewChannel(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  >
                    <option value="Blog">Blog (WordPress / CMS)</option>
                    <option value="Instagram">Instagram (Meta Graph API)</option>
                    <option value="Facebook">Facebook (Meta Graph API)</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="YouTube Shorts">YouTube Shorts</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Client Domain</label>
                  <input
                    type="text"
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Scheduled Date</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Content Preview / Copy Excerpt</label>
                <textarea
                  rows={3}
                  value={newPreview}
                  onChange={(e) => setNewPreview(e.target.value)}
                  placeholder="Paste brief or generated caption..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium"
                >
                  Add to Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
