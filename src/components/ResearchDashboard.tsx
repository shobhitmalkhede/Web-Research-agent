import React, { useState } from 'react';
import { QueryForm } from './QueryForm';
import { QueryHistory } from './QueryHistory';
import { ResearchProcess } from './ResearchProcess';
import { ResearchResults } from './ResearchResults';
import { useAppContext } from '../context/AppContext';
import { ResearchStage } from '../types';

export const ResearchDashboard: React.FC = () => {
  const { 
    researchStage, 
    activeQueryId,
    error
  } = useAppContext();
  
  const [activeTab, setActiveTab] = useState<'process' | 'results'>(
    researchStage === ResearchStage.Complete ? 'results' : 'process'
  );
  
  React.useEffect(() => {
    if (researchStage === ResearchStage.Complete) {
      setActiveTab('results');
    } else if (researchStage !== ResearchStage.Idle && researchStage !== ResearchStage.Error) {
      setActiveTab('process');
    }
  }, [researchStage]);
  
  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <QueryForm />
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          {activeQueryId && (
            <div className="mt-6">
              <div className="border-b border-slate-200 mb-4">
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('process')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'process'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    Research Process
                  </button>
                  <button
                    onClick={() => setActiveTab('results')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === 'results'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    Research Results
                  </button>
                </nav>
              </div>
              
              <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                {activeTab === 'process' ? (
                  <ResearchProcess />
                ) : (
                  <ResearchResults />
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="col-span-1">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-medium text-slate-800 mb-4">Research History</h2>
            <QueryHistory />
          </div>
        </div>
      </div>
    </div>
  );
};