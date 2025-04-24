import { NewsArticle } from '../types';

export const mockFetchNews = async (query: string): Promise<NewsArticle[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Format query for URL
  const formattedQuery = query.replace(/\s+/g, '-').toLowerCase();
  
  // Generate current date and dates within last week
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);
  
  const randomDate = () => {
    const date = new Date();
    date.setDate(today.getDate() - Math.floor(Math.random() * 7));
    return date.toISOString();
  };
  
  // News sources
  const sources = ['Tech Daily', 'Science Report', 'Global News', 'Research Today', 'Industry Insights'];
  
  // Mock image URLs
  const imageUrls = [
    'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg',
    'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
    'https://images.pexels.com/photos/261579/pexels-photo-261579.jpeg',
    'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    'https://images.pexels.com/photos/669996/pexels-photo-669996.jpeg'
  ];
  
  // Generate mock news articles
  const newsArticles: NewsArticle[] = [
    {
      title: `New Research Breakthrough in ${query}`,
      url: `https://tech-daily.com/news/${formattedQuery}-breakthrough`,
      source: sources[0],
      publishDate: randomDate(),
      snippet: `Scientists have made a significant breakthrough in ${query}, potentially transforming the field and opening new possibilities for applications.`,
      imageUrl: imageUrls[0]
    },
    {
      title: `Industry Leaders Discuss Future of ${query}`,
      url: `https://industry-insights.com/trends/${formattedQuery}-future`,
      source: sources[4],
      publishDate: randomDate(),
      snippet: `A recent conference brought together industry leaders to discuss the future trajectory of ${query} and its impact on various sectors.`,
      imageUrl: imageUrls[1]
    },
    {
      title: `Government Announces Funding for ${query} Research`,
      url: `https://global-news.com/policy/${formattedQuery}-funding`,
      source: sources[2],
      publishDate: randomDate(),
      snippet: `The government has announced a new funding initiative to accelerate research in ${query}, recognizing its strategic importance.`,
      imageUrl: imageUrls[2]
    },
    {
      title: `Ethical Considerations in ${query} Development`,
      url: `https://science-report.com/ethics/${formattedQuery}-considerations`,
      source: sources[1],
      publishDate: randomDate(),
      snippet: `Experts are calling for careful consideration of ethical implications as ${query} continues to advance rapidly.`,
      imageUrl: imageUrls[3]
    }
  ];
  
  return newsArticles;
};