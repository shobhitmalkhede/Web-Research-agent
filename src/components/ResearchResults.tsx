import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ResearchStage } from '../types';

export const ResearchResults: React.FC = () => {
  const { 
    researchStage, 
    report, 
    saveReport, 
    isLoading,
    searchResults,
    extractedContent,
    newsArticles
  } = useAppContext();
  
  const [activeTab, setActiveTab] = useState<'summary' | 'sources' | 'news'>('summary');
  
  if (researchStage !== ResearchStage.Complete || !report) {
    return (
      <div className="py-12 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m0 16v1m-9-9h1m16 0h1m-15.111 5.889l-.707.707M19.111 8.111l-.707.707M16.924 14.924a5 5 0 11-7.071-7.071 5 5 0 017.071 7.071z" />
        </svg>
        <h3 className="mt-4 text-slate-500 font-medium">Research in progress</h3>
        <p className="text-slate-400 text-sm mt-1">Results will appear here once the research is complete</p>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  const getReliabilityBadge = (score: number) => {
    if (score >= 0.8) {
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">High</span>;
    } else if (score >= 0.6) {
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">Medium</span>;
    } else {
      return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">Low</span>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-slate-800">{report.query}</h2>
        <p className="text-slate-500 text-sm mt-1">
          Research completed on {formatDate(report.createdAt)}
        </p>
        <div className="mt-4">
          <button
            onClick={() => saveReport()}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-medium transition-colors"
          >
            Save Report
          </button>
        </div>
      </div>
      
      <div className="border-b border-slate-200 pb-4">
        <nav className="flex space-x-6">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'summary'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Summary
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'sources'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            Sources
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'news'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            News
          </button>
        </nav>
      </div>
      
      {activeTab === 'summary' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Research Summary</h3>
            <div className="bg-white border border-slate-200 rounded-lg p-4 text-slate-700 leading-relaxed">
              {report.summary}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-slate-800 mb-3">Key Findings</h3>
            <ul className="bg-white border border-slate-200 rounded-lg p-4 space-y-3">
              {report.keyFindings.map((finding, index) => (
                <li key={index} className="flex">
                  <div className="flex-shrink-0 text-blue-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-slate-700">{finding}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {activeTab === 'sources' && (
        <div>
          <h3 className="text-lg font-medium text-slate-800 mb-3">Information Sources</h3>
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Reliability
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {report.sources.map((source, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {source.title}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getReliabilityBadge(source.reliability)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'news' && (
        <div>
          <h3 className="text-lg font-medium text-slate-800 mb-3">Recent News</h3>
          
          {newsArticles.length > 0 ? (
            <div className="space-y-4">
              {newsArticles.map((article, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-lg overflow-hidden flex">
                  {article.imageUrl && (
                    <div className="flex-shrink-0 w-24 h-24 bg-slate-100">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4 flex-1">
                    <p className="text-xs text-slate-500">{article.source} • {new Date(article.publishDate).toLocaleDateString()}</p>
                    <h4 className="font-medium text-slate-800 mt-1">
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 hover:underline"
                      >
                        {article.title}
                      </a>
                    </h4>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{article.snippet}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
              <p className="text-slate-500">No recent news articles found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};