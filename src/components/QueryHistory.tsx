import React from 'react';
import { useAppContext } from '../context/AppContext';

export const QueryHistory: React.FC = () => {
  const { queries, selectQuery, activeQueryId } = useAppContext();
  
  if (queries.length === 0) {
    return (
      <div className="text-center py-4 text-slate-500">
        <p>No research history yet</p>
        <p className="text-sm mt-1">Your research queries will appear here</p>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="space-y-3">
      {queries.map(query => (
        <button
          key={query.id}
          onClick={() => selectQuery(query.id)}
          className={`w-full text-left p-3 rounded-lg border transition-colors ${
            query.id === activeQueryId
              ? 'bg-blue-50 border-blue-200'
              : 'bg-white border-slate-200 hover:bg-slate-50'
          }`}
        >
          <p className={`truncate font-medium ${
            query.id === activeQueryId ? 'text-blue-800' : 'text-slate-800'
          }`}>
            {query.text}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {formatDate(query.timestamp)}
          </p>
        </button>
      ))}
    </div>
  );
};