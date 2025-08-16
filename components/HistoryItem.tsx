
import React from 'react';
import { QueryHistoryItem, LegalQueryResult, QueryResult } from '../types';
import { PaperclipIcon } from './icons';

interface HistoryCardProps {
  item: QueryHistoryItem;
  onSelect: (item: QueryHistoryItem) => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ item, onSelect }) => {
    const isLegalResult = item.mode === 'legal';

    const getVerdictInfo = () => {
        if (isLegalResult) {
            const result = item.result as LegalQueryResult;
            switch (result.verdict) {
                case 'Original': return { text: result.verdict, color: 'border-neon-cyan text-neon-cyan' };
                case 'Fake': return { text: result.verdict, color: 'border-neon-magenta text-neon-magenta' };
                case 'Needs Further Verification': return { text: 'Needs Verification', color: 'border-amber-500 text-amber-500' };
                default: return { text: 'Unknown', color: 'border-gray-500 text-gray-500' };
            }
        } else {
            const result = item.result as QueryResult;
            switch (result.result) {
                case 'True': return { text: 'True', color: 'border-neon-cyan text-neon-cyan' };
                case 'False': return { text: 'Fake', color: 'border-neon-magenta text-neon-magenta' };
                case 'Insufficient data': return { text: 'Insufficient Data', color: 'border-amber-500 text-amber-500' };
                default: return { text: 'Unknown', color: 'border-gray-500 text-gray-500' };
            }
        }
    };

    const { text: verdictText, color: verdictColor } = getVerdictInfo();


  return (
    <div
      onClick={() => onSelect(item)}
      className={`glass-card p-4 group cursor-pointer transition-all duration-300 border-t-2 ${verdictColor.split(' ')[0]} hover:border-white hover:scale-105 hover:shadow-2xl`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start space-x-2">
            {item.fileName && <PaperclipIcon className="w-4 h-4 mt-1 text-text-tertiary flex-shrink-0" />}
            <p className="font-semibold text-text-primary dark:text-gray-200 line-clamp-2" title={item.query}>{item.query}</p>
        </div>
        <div className="mt-auto pt-4 flex justify-between items-center">
            <p className={`text-sm font-bold ${verdictColor.split(' ')[1]}`}>{verdictText}</p>
            <p className="text-xs text-text-tertiary dark:text-gray-500">{new Date(item.timestamp).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;