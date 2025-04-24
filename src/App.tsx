import React from 'react';
import { ResearchDashboard } from './components/ResearchDashboard';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-blue-600 w-6 h-6"
              >
                <path d="M17.5 21H5a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h12.5"/>
                <path d="M20 8v13"/>
                <path d="M15 5V3"/>
                <path d="M12 5V2"/>
                <path d="M9 5V3"/>
                <path d="M3 13h18"/>
              </svg>
              <h1 className="text-xl font-semibold text-slate-800">Web Research Agent</h1>
            </div>
            <div className="text-sm text-slate-500">Powered by AI</div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6">
          <ResearchDashboard />
        </main>
        <footer className="bg-white border-t border-slate-200 py-4">
          <div className="container mx-auto px-4 text-center text-sm text-slate-500">
            © 2025 Web Research Agent - Masonry Project
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;