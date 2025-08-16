
import React from 'react';
import HistoryCard from './HistoryItem';
import { QueryHistoryItem } from '../types';

interface HistorySectionProps {
  history: QueryHistoryItem[];
  onSelect: (item: QueryHistoryItem) => void;
  clearHistory: () => void;
}

const HistorySection = React.forwardRef<HTMLDivElement, HistorySectionProps>(({ history, onSelect, clearHistory }, ref) => {
  return (
    <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Search History</h2>
            {history.length > 0 && (
                 <button
                    onClick={clearHistory}
                    className="mt-4 md:mt-0 px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/30 text-sm font-semibold rounded-full hover:bg-red-500/40 hover:text-white transition-colors"
                >
                    Clear History
                </button>
            )}
        </div>
        
      {history.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {history.map((item) => (
            <HistoryCard key={item.id} item={item} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 glass-card">
          <h3 className="text-xl font-semibold text-gray-200">Your History is Empty</h3>
          <p className="mt-2 text-gray-400">
            Perform an analysis to see your history here.
          </p>
        </div>
      )}
    </div>
  );
});

export default HistorySection;