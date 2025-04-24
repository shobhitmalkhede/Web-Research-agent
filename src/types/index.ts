export enum ResearchStage {
  Idle = 'idle',
  QueryAnalysis = 'query-analysis',
  WebSearch = 'web-search',
  ContentExtraction = 'content-extraction',
  NewsAggregation = 'news-aggregation',
  InformationSynthesis = 'information-synthesis',
  Complete = 'complete',
  Error = 'error'
}

export interface Query {
  id: string;
  text: string;
  timestamp: string;
}

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  source: string;
  relevanceScore: number;
}

export interface WebContent {
  url: string;
  title: string;
  text: string;
  metadata: {
    author?: string;
    publishDate?: string;
    domain: string;
    wordCount: number;
  };
  reliability: number;
}

export interface NewsArticle {
  title: string;
  url: string;
  source: string;
  publishDate: string;
  snippet: string;
  imageUrl?: string;
}

export interface ResearchReport {
  id: string;
  query: string;
  summary: string;
  keyFindings: string[];
  sources: {
    title: string;
    url: string;
    reliability: number;
  }[];
  createdAt: string;
}

export interface ContentAnalysisResult {
  summary: string;
  keyFindings: string[];
  sentimentScore: number;
  factualityScore: number;
  topicDistribution: Record<string, number>;
}

export interface AgentEvent {
  timestamp: string;
  stage: ResearchStage;
  message: string;
  details?: any;
}