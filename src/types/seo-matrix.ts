export type Category =
  | 'Blog Content'
  | 'Social Media'
  | 'Videos'
  | 'Onpage SEO'
  | 'Competitor Analysis'
  | 'Analytics & Reporting'
  | 'Local SEO'
  | 'Keyword Research'
  | 'Content QA'
  | 'Technical SEO'
  | 'Off-Page SEO'
  | 'Client Works'
  | 'Strategy'
  | 'Client Onboarding'
  | 'New Website SEO Setup';

export type AutomationType =
  | 'Live Interactive Tool'
  | 'API Background Pipeline'
  | 'Autonomous AI Agent'
  | 'Headless Webhook / CI/CD'
  | 'Delegated OAuth Portal';

export type TriggerMethod = 'Instant / On-Demand' | 'Scheduled Cron' | 'Webhook / Event-Driven';

export interface ReferenceLink {
  label: string;
  url: string;
}

export interface TaskItem {
  id: string;
  category: Category;
  task: string;
  originalStatus: 'Automated' | 'Manual';
  originalClassification: 'Automated' | 'Need to Automate' | 'Need to Check' | 'Manual Work';
  // Now 100% automated!
  automationStatus: 'Fully Automated';
  automationType: AutomationType;
  triggerMethod: TriggerMethod;
  existingModule: string;
  automatedSolution: string;
  suggestedTools: string;
  referenceLinks: ReferenceLink[];
  devNotes: string;
  automationSnippet?: string;
  executionToolId?:
    | 'schema-gen'
    | 'pagespeed-cwv'
    | 'robots-sitemap'
    | 'gap-analyzer'
    | 'rss-radar'
    | 'calendar-planner'
    | 'onboarding-wizard'
    | 'content-qa-bot'
    | 'deck-generator'
    | 'redirect-mapper'
    | 'api-directory';
  customNotes?: string;
  lastRunTimestamp?: string;
  runStatus?: 'idle' | 'running' | 'success' | 'queued';
}

export interface SEONewsItem {
  id: string;
  title: string;
  source: 'Google Search Central' | 'Search Engine Roundtable' | 'Search Engine Journal';
  date: string;
  summary: string;
  impactLevel: 'Critical / Core Update' | 'Moderate Impact' | 'Advisory / Routine';
  url: string;
  category: 'Algorithm Update' | 'Technical SEO' | 'SERP Features' | 'AI & Search';
}

export interface ContentCalendarItem {
  id: string;
  title: string;
  channel: 'Blog' | 'Instagram' | 'Facebook' | 'LinkedIn' | 'YouTube Shorts';
  client: string;
  scheduledDate: string;
  scheduledTime: string;
  status: 'Auto-Scheduled' | 'Auto-QA Passed' | 'Auto-Published' | 'Needs Human QA' | 'Approved' | 'Scheduled' | 'Published' | 'Draft';
  contentPreview: string;
  author: string;
}

export interface KeywordGapItem {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  intent: 'Informational' | 'Commercial' | 'Transactional' | 'Navigational';
  clientRank: number | null;
  comp1Rank: number | null;
  comp2Rank: number | null;
  comp3Rank: number | null;
  gapType: 'Missing' | 'Untapped' | 'Weak' | 'Shared';
  cpc: number;
}
