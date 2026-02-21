export interface Post {
  id: string;
  content: string;
  date: Date;
  status: 'draft' | 'scheduled' | 'published';
  tags: string[];
  notes?: string;
}

export interface ProfileData {
  headline: string;
  about: string;
  experience: string;
  education: string;
  skills: string;
  accomplishments: string;
  targetAudience: string;
}

export interface OptimizationResult {
  score: number;
  critique: string;
  suggestions: string[];
  rewrittenVersion: string;
}

export enum NavView {
  DASHBOARD = 'dashboard',
  PLANNER = 'planner',
  OPTIMIZER = 'optimizer',
  HOOKS = 'hooks',
  SETTINGS = 'settings',
}

export interface HookIdea {
  id: string;
  type: string;
  content: string;
}

export interface AnalyticsData {
  name: string;
  impressions: number;
  engagement: number;
}

export interface GoalTemplate {
  id: string;
  label: string;
  goal: string;
}

export interface ResearchResult {
  topic: string;
  summary: string;
  sources: { title: string; uri: string }[];
  contentAngles: string[];
}