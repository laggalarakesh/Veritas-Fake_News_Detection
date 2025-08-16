
import React from 'react';
import { AnalysisResult, QueryResult, LegalQueryResult, AnalysisMode } from '../types';
import { CheckCircleIcon, XCircleIcon, QuestionMarkCircleIcon, ScaleIcon, CheckIcon } from './icons';

interface ResultCardProps {
  result: AnalysisResult;
}

const CircularProgress = ({ score, mode }: { score: number, mode: AnalysisMode }) => {
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    let strokeColor = 'text-amber-500';
    if (score >= 75) strokeColor = 'text-emerald-green-500';
    else if (score < 40) strokeColor = 'text-crimson-red-500';

    return (
        <div className="relative w-20 h-20">
            <svg className="w-full h-full" viewBox="0 0 80 80">
                <circle className="text-black/20 dark:text-white/10" strokeWidth="8" stroke="currentColor" fill="transparent" r={radius} cx="40" cy="40" />
                <circle
                    className={`transform -rotate-90 origin-center transition-all duration-1000 ease-out ${strokeColor}`}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="40"
                    cy="40"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                {mode === 'legal' ? <ScaleIcon className="w-5 h-5 mb-0.5 text-text-secondary" /> : <CheckIcon className="w-5 h-5 mb-0.5 text-text-secondary" />}
                <span className="text-xl font-bold text-text-primary dark:text-white">
                    {score}
                </span>
            </div>
        </div>
    );
};


const FactCheckResult: React.FC<{ result: QueryResult }> = ({ result }) => {
  const { result: verdict, confidence, detailedExplanation, accuracyScore } = result;

  const displayVerdict = verdict === 'False' ? 'Fake' : verdict;

  const verdictConfig = {
    'True': {
      icon: <CheckCircleIcon className="w-8 h-8 text-emerald-green-500" />,
      color: 'text-emerald-green-500',
      borderColor: 'border-emerald-green-500/30',
    },
    'False': {
      icon: <XCircleIcon className="w-8 h-8 text-crimson-red-500" />,
      color: 'text-crimson-red-500',
      borderColor: 'border-crimson-red-500/30',
    },
    'Insufficient data': {
      icon: <QuestionMarkCircleIcon className="w-8 h-8 text-amber-500" />,
      color: 'text-amber-500',
      borderColor: 'border-amber-500/30',
    },
  }[verdict];

  return (
    <div className="w-full p-6 md:p-8 glass-card space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className={`flex-grow p-4 rounded-xl border-l-4 ${verdictConfig.borderColor} bg-black/5 dark:bg-white/5`}>
                <div className="flex items-center">
                    {verdictConfig.icon}
                    <h2 className={`ml-3 text-2xl font-bold ${verdictConfig.color}`}>{displayVerdict}</h2>
                </div>
                 <div className="mt-2 text-text-secondary dark:text-gray-300">
                    <span className="text-sm font-medium opacity-80">Confidence Level: </span>
                    <span className="font-semibold text-lg">{confidence}</span>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <CircularProgress score={accuracyScore} mode="fact" />
                <h3 className="mt-1 text-sm font-medium text-text-secondary">Confidence: {accuracyScore}%</h3>
            </div>
        </div>
      
        <div>
            <h3 className="text-xl font-bold text-text-primary dark:text-white mb-2">Detailed Explanation</h3>
            <p className="text-text-secondary dark:text-gray-300 whitespace-pre-wrap">{detailedExplanation}</p>
        </div>
    </div>
  );
};

const LegalCheckResult: React.FC<{ result: LegalQueryResult }> = ({ result }) => {
    const { verdict, reason, summary, accuracyScore } = result;
  
    const verdictConfig = {
      'Original': {
        icon: <CheckCircleIcon className="w-8 h-8 text-emerald-green-500" />,
        color: 'text-emerald-green-500',
        borderColor: 'border-emerald-green-500/30',
      },
      'Fake': {
        icon: <XCircleIcon className="w-8 h-8 text-crimson-red-500" />,
        color: 'text-crimson-red-500',
        borderColor: 'border-crimson-red-500/30',
      },
      'Needs Further Verification': {
        icon: <QuestionMarkCircleIcon className="w-8 h-8 text-amber-500" />,
        color: 'text-amber-500',
        borderColor: 'border-amber-500/30',
      },
    }[verdict];
  
    return (
      <div className="w-full p-6 md:p-8 glass-card space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className={`flex-grow p-4 rounded-xl border-l-4 ${verdictConfig.borderColor} bg-black/5 dark:bg-white/5`}>
              <div className="flex items-center">
                  {verdictConfig.icon}
                  <h2 className={`ml-3 text-2xl font-bold ${verdictConfig.color}`}>{verdict}</h2>
              </div>
          </div>
          <div className="flex flex-col items-center">
              <CircularProgress score={accuracyScore} mode="legal" />
              <h3 className="mt-1 text-sm font-medium text-text-secondary">Confidence: {accuracyScore}%</h3>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-text-primary dark:text-white mb-2">Summary</h3>
          <p className="text-text-secondary dark:text-gray-300">{summary}</p>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-text-primary dark:text-white mb-2">Reason</h3>
          <p className="text-text-secondary dark:text-gray-300 whitespace-pre-wrap">{reason}</p>
        </div>
      </div>
    );
  };


const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
    const isLegalResult = 'verdict' in result;

    return (
        <>
            {isLegalResult ? <LegalCheckResult result={result as LegalQueryResult} /> : <FactCheckResult result={result as QueryResult} />}
        </>
    );
};

export default ResultCard;