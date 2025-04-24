import { SearchResult } from '../types';

export const mockSearch = async (query: string): Promise<SearchResult[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Generate mock search results based on the query
  const results: SearchResult[] = [
    {
      title: `Comprehensive guide to ${query}`,
      url: `https://example.com/guide/${query.replace(/\s+/g, '-').toLowerCase()}`,
      snippet: `A detailed exploration of ${query}, covering all the essential aspects that researchers and professionals need to know.`,
      source: 'Example Research',
      relevanceScore: 0.95
    },
    {
      title: `${query} - Latest research and findings`,
      url: `https://research-journal.com/articles/${query.replace(/\s+/g, '-').toLowerCase()}`,
      snippet: `Recent studies have revealed new insights into ${query}, challenging previous assumptions and opening new avenues for further investigation.`,
      source: 'Research Journal',
      relevanceScore: 0.92
    },
    {
      title: `Understanding ${query}: A complete overview`,
      url: `https://knowledge-base.org/topics/${query.replace(/\s+/g, '-').toLowerCase()}`,
      snippet: `This comprehensive overview explains the fundamental concepts of ${query}, its historical development, and current applications.`,
      source: 'Knowledge Base',
      relevanceScore: 0.88
    },
    {
      title: `The future of ${query}: Trends and predictions`,
      url: `https://future-insights.com/trends/${query.replace(/\s+/g, '-').toLowerCase()}`,
      snippet: `Experts predict significant developments in ${query} over the next decade, potentially revolutionizing how we approach related challenges.`,
      source: 'Future Insights',
      relevanceScore: 0.85
    },
    {
      title: `${query} explained for beginners`,
      url: `https://simplified-learning.com/${query.replace(/\s+/g, '-').toLowerCase()}-basics`,
      snippet: `A beginner-friendly introduction to ${query}, breaking down complex concepts into easily digestible information.`,
      source: 'Simplified Learning',
      relevanceScore: 0.78
    }
  ];
  
  return results;
};