import { WebContent } from '../types';

export const mockScrape = async (url: string): Promise<WebContent> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Extract domain from URL
  const domain = new URL(url).hostname.replace('www.', '');
  
  // Generate content based on URL
  const urlPath = new URL(url).pathname;
  const topic = urlPath.split('/').pop()?.replace(/-/g, ' ') || 'research topic';
  
  const contentTemplates = [
    `${topic} has been the subject of extensive research in recent years. Studies have shown significant advancements in understanding the underlying mechanisms. Recent findings suggest that there are multiple factors contributing to ${topic}, including environmental, genetic, and social influences. Researchers are continuing to explore innovative approaches to address challenges related to ${topic}.`,
    
    `The field of ${topic} has evolved considerably over the past decade. Experts highlight the importance of interdisciplinary approaches when studying ${topic}. Several key frameworks have emerged to explain various aspects of ${topic}, each with its own strengths and limitations. Future research directions include exploring the intersection of ${topic} with emerging technologies and methodologies.`,
    
    `Understanding ${topic} requires consideration of both theoretical and practical perspectives. Current literature identifies several best practices for approaching ${topic}, though there remains debate about optimal methodologies. Case studies demonstrate successful implementation strategies across different contexts. The growing body of evidence suggests that ${topic} will continue to be an important area of focus for researchers and practitioners alike.`
  ];
  
  const randomIndex = Math.floor(Math.random() * contentTemplates.length);
  const text = contentTemplates[randomIndex];
  
  const authorNames = ['Sarah Johnson', 'Michael Chen', 'Emma Rodriguez', 'David Kim', 'Rachel Thompson'];
  const randomAuthor = authorNames[Math.floor(Math.random() * authorNames.length)];
  
  // Generate a random date within the last year
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 365));
  
  return {
    url,
    title: `${topic.charAt(0).toUpperCase() + topic.slice(1)}: Analysis and Insights`,
    text,
    metadata: {
      author: randomAuthor,
      publishDate: randomDate.toISOString(),
      domain,
      wordCount: text.split(' ').length
    },
    reliability: 0.7 + Math.random() * 0.3 // Random reliability score between 0.7 and 1.0
  };
};