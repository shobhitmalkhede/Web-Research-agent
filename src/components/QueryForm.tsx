import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ResearchStage } from '../types';

export const QueryForm: React.FC = () => {
  const [queryText, setQueryText] = useState('');
  const { submitQuery, isLoading, researchStage } = useAppContext();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (queryText.trim() && !isLoading) {
      submitQuery(queryText.trim());
      setQueryText('');
    }
  };
  
  const isResearching = researchStage !== ResearchStage.Idle && 
                       researchStage !== ResearchStage.Complete &&
                       researchStage !== ResearchStage.Error;
  
  const getPlaceholderText = () => {
    if (isResearching) {
      return "Research in progress...";
    }
    return "Enter your research query (e.g., 'Latest advancements in quantum computing')";
  };
  
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
      <h2 className="text-lg font-medium text-slate-800 mb-2">Research Query</h2>
      <p className="text-slate-500 text-sm mb-4">
        Enter a specific topic or question you want to research
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="query" className="sr-only">
            Research Query
          </label>
          <textarea
            id="query"
            rows={3}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder={getPlaceholderText()}
            value={queryText}
            onChange={e => setQueryText(e.target.value)}
            disabled={isResearching}
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!queryText.trim() || isResearching}
            className={`px-4 py-2 rounded-lg font-medium text-white
              ${!queryText.trim() || isResearching
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 transition-colors'}
            `}
          >
            {isResearching ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Researching...
              </span>
            ) : (
              'Start Research'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};