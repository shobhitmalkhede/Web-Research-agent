import { WebContent, NewsArticle, ContentAnalysisResult } from '../types';

export const mockAnalyzeContent = async (
  query: string,
  webContents: WebContent[],
  newsArticles: NewsArticle[]
): Promise<ContentAnalysisResult> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Extract main topic from query
  const mainTopic = query.split(' ').slice(0, 2).join(' ');
  
  // Generate mock summary based on available content
  const summary = `Research on ${query} reveals several important insights. 
    ${webContents.length > 0 ? `According to ${webContents[0].metadata.domain}, ${webContents[0].text.slice(0, 100)}...` : ''}
    ${webContents.length > 1 ? `Furthermore, ${webContents[1].metadata.domain} suggests that ${webContents[1].text.slice(0, 100)}...` : ''}
    ${newsArticles.length > 0 ? `Recent news from ${newsArticles[0].source} indicates ${newsArticles[0].snippet}` : ''}
    In conclusion, the research demonstrates significant developments in understanding ${mainTopic}, with potential implications for future studies and practical applications.`;
  
  // Generate key findings
  const keyFindings = [
    `${mainTopic} shows strong correlation with multiple variables across different contexts.`,
    `Recent developments have challenged previous assumptions about ${mainTopic}.`,
    `Interdisciplinary approaches yield the most comprehensive understanding of ${mainTopic}.`,
    `The practical applications of ${mainTopic} research span multiple fields and industries.`,
    `Future research should focus on addressing existing gaps in ${mainTopic} literature.`
  ];
  
  // Generate sentiment and factuality scores
  const sentimentScore = 0.3 + Math.random() * 0.7; // Random score between 0.3 and 1.0
  const factualityScore = 0.6 + Math.random() * 0.4; // Random score between 0.6 and 1.0
  
  // Generate topic distribution
  const topicDistribution: Record<string, number> = {
    [mainTopic]: 0.4 + Math.random() * 0.3,
    'methodology': 0.1 + Math.random() * 0.2,
    'applications': 0.1 + Math.random() * 0.2,
    'future directions': 0.05 + Math.random() * 0.15,
    'challenges': 0.05 + Math.random() * 0.15,
  };
  
  return {
    summary,
    keyFindings,
    sentimentScore,
    factualityScore,
    topicDistribution
  };
};