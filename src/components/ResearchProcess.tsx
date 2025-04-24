import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ResearchStage } from '../types';

export const ResearchProcess: React.FC = () => {
  const { 
    researchStage, 
    searchResults, 
    extractedContent,
    newsArticles,
    isLoading 
  } = useAppContext();
  
  const stages = [
    { id: ResearchStage.QueryAnalysis, label: 'Query Analysis', description: 'Breaking down your research query into searchable components' },
    { id: ResearchStage.WebSearch, label: 'Web Search', description: 'Searching the web for relevant information' },
    { id: ResearchStage.ContentExtraction, label: 'Content Extraction', description: 'Extracting and analyzing content from web pages' },
    { id: ResearchStage.NewsAggregation, label: 'News Aggregation', description: 'Finding recent news articles on the topic' },
    { id: ResearchStage.InformationSynthesis, label: 'Information Synthesis', description: 'Combining information to create a comprehensive report' }
  ];
  
  const currentStageIndex = stages.findIndex(stage => stage.id === researchStage);
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-slate-800 mb-4">Research Workflow</h3>
        
        <div className="space-y-4">
          {stages.map((stage, index) => {
            // Determine state: upcoming, active, or completed
            const isActive = stage.id === researchStage;
            const isCompleted = currentStageIndex > index || researchStage === ResearchStage.Complete;
            const isUpcoming = currentStageIndex < index && researchStage !== ResearchStage.Complete;
            
            return (
              <div 
                key={stage.id}
                className={`flex items-start p-3 rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50' : 
                  isCompleted ? 'bg-green-50' : 
                  'bg-slate-50'
                }`}
              >
                {/* Status icon */}
                <div className={`flex-shrink-0 rounded-full p-1 ${
                  isActive ? 'bg-blue-100 text-blue-600' : 
                  isCompleted ? 'bg-green-100 text-green-600' : 
                  'bg-slate-200 text-slate-500'
                }`}>
                  {isCompleted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : isActive ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                
                <div className="ml-3 flex-1">
                  <h4 className={`font-medium ${
                    isActive ? 'text-blue-800' : 
                    isCompleted ? 'text-green-800' : 
                    'text-slate-700'
                  }`}>
                    {stage.label}
                  </h4>
                  <p className="text-sm text-slate-600 mt-1">{stage.description}</p>
                  
                  {/* Stage-specific content */}
                  {isActive && (
                    <div className="mt-3 animate-pulse text-slate-500 text-sm">
                      Processing...
                    </div>
                  )}
                  
                  {isCompleted && stage.id === ResearchStage.WebSearch && searchResults.length > 0 && (
                    <div className="mt-3 text-sm text-slate-600">
                      <p className="font-medium">Found {searchResults.length} results</p>
                      <ul className="mt-2 space-y-1 list-disc list-inside text-xs text-slate-500">
                        {searchResults.slice(0, 3).map((result, i) => (
                          <li key={i} className="truncate">{result.title}</li>
                        ))}
                        {searchResults.length > 3 && <li>+ {searchResults.length - 3} more</li>}
                      </ul>
                    </div>
                  )}
                  
                  {isCompleted && stage.id === ResearchStage.ContentExtraction && extractedContent.length > 0 && (
                    <div className="mt-3 text-sm text-slate-600">
                      <p className="font-medium">Extracted content from {extractedContent.length} sources</p>
                      <ul className="mt-2 space-y-1 list-disc list-inside text-xs text-slate-500">
                        {extractedContent.slice(0, 2).map((content, i) => (
                          <li key={i} className="truncate">{content.metadata.domain}</li>
                        ))}
                        {extractedContent.length > 2 && <li>+ {extractedContent.length - 2} more</li>}
                      </ul>
                    </div>
                  )}
                  
                  {isCompleted && stage.id === ResearchStage.NewsAggregation && newsArticles.length > 0 && (
                    <div className="mt-3 text-sm text-slate-600">
                      <p className="font-medium">Found {newsArticles.length} news articles</p>
                      <ul className="mt-2 space-y-1 list-disc list-inside text-xs text-slate-500">
                        {newsArticles.slice(0, 2).map((article, i) => (
                          <li key={i} className="truncate">{article.title}</li>
                        ))}
                        {newsArticles.length > 2 && <li>+ {newsArticles.length - 2} more</li>}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex items-start">
          <div className="flex-shrink-0 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blue-800">About the Research Process</h4>
            <p className="text-xs text-blue-600 mt-1">
              This visualization shows how the AI agent processes your query through multiple stages. Each stage builds on the previous one, with tools working together to find, extract, and synthesize information into a comprehensive report.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};