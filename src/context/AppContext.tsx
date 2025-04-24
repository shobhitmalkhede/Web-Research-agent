import React, { createContext, useState, useContext, ReactNode } from 'react';
import { 
  Query, 
  ResearchStage, 
  ResearchReport, 
  SearchResult, 
  WebContent, 
  NewsArticle 
} from '../types';
import { mockSearch } from '../services/searchService';
import { mockScrape } from '../services/scrapingService';
import { mockAnalyzeContent } from '../services/contentAnalysisService';
import { mockFetchNews } from '../services/newsService';

interface AppContextType {
  queries: Query[];
  activeQueryId: string | null;
  researchStage: ResearchStage;
  searchResults: SearchResult[];
  extractedContent: WebContent[];
  newsArticles: NewsArticle[];
  report: ResearchReport | null;
  isLoading: boolean;
  error: string | null;
  submitQuery: (queryText: string) => void;
  selectQuery: (queryId: string) => void;
  saveReport: () => void;
  retryResearch: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [queries, setQueries] = useState<Query[]>([]);
  const [activeQueryId, setActiveQueryId] = useState<string | null>(null);
  const [researchStage, setResearchStage] = useState<ResearchStage>(ResearchStage.Idle);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [extractedContent, setExtractedContent] = useState<WebContent[]>([]);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [report, setReport] = useState<ResearchReport | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const conductResearch = async (queryText: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Stage 1: Query Analysis
      setResearchStage(ResearchStage.QueryAnalysis);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Stage 2: Web Search
      setResearchStage(ResearchStage.WebSearch);
      const results = await mockSearch(queryText);
      setSearchResults(results);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Stage 3: Content Extraction
      setResearchStage(ResearchStage.ContentExtraction);
      const content = await Promise.all(
        results.slice(0, 3).map(result => mockScrape(result.url))
      );
      setExtractedContent(content);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Stage 4: News Aggregation
      setResearchStage(ResearchStage.NewsAggregation);
      const news = await mockFetchNews(queryText);
      setNewsArticles(news);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Stage 5: Information Synthesis
      setResearchStage(ResearchStage.InformationSynthesis);
      const analyzedContent = await mockAnalyzeContent(
        queryText, 
        content, 
        news
      );
      
      // Final Report
      setResearchStage(ResearchStage.Complete);
      setReport({
        id: Date.now().toString(),
        query: queryText,
        summary: analyzedContent.summary,
        keyFindings: analyzedContent.keyFindings,
        sources: [
          ...content.map(c => ({ 
            title: c.title, 
            url: c.url, 
            reliability: c.reliability 
          })),
          ...news.map(n => ({ 
            title: n.title, 
            url: n.url, 
            reliability: 0.8 
          }))
        ],
        createdAt: new Date().toISOString()
      });
      
    } catch (err) {
      setError('An error occurred during research. Please try again.');
      setResearchStage(ResearchStage.Error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitQuery = (queryText: string) => {
    const newQuery: Query = {
      id: Date.now().toString(),
      text: queryText,
      timestamp: new Date().toISOString()
    };
    
    setQueries(prev => [newQuery, ...prev]);
    setActiveQueryId(newQuery.id);
    conductResearch(queryText);
  };

  const selectQuery = (queryId: string) => {
    setActiveQueryId(queryId);
    const query = queries.find(q => q.id === queryId);
    if (query) {
      conductResearch(query.text);
    }
  };

  const saveReport = () => {
    // In a real app, this would save to database
    // For now we just display a notification
    alert('Report saved successfully!');
  };

  const retryResearch = () => {
    const query = queries.find(q => q.id === activeQueryId);
    if (query) {
      conductResearch(query.text);
    }
  };

  const value = {
    queries,
    activeQueryId,
    researchStage,
    searchResults,
    extractedContent,
    newsArticles,
    report,
    isLoading,
    error,
    submitQuery,
    selectQuery,
    saveReport,
    retryResearch
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};