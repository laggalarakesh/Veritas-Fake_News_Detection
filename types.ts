
export interface QueryResult {
  result: 'Original' | 'Fake' | 'Insufficient data';
  confidence: 'High' | 'Medium' | 'Low' | 'N/A';
  detailedExplanation: string;
  accuracyScore: number;
}

export interface LegalQueryResult {
  verdict: 'Original' | 'Fake' | 'Needs Further Verification';
  reason: string;
  summary: string;
  accuracyScore: number;
}

export type AnalysisMode = 'fact' | 'legal';
export type AnalysisResult = QueryResult | LegalQueryResult;


export interface QueryHistoryItem {
  id: string;
  query: string; 
  fileName?: string;
  result: AnalysisResult;
  mode: AnalysisMode;
  timestamp: number;
}

export interface Feedback {
  rating: number; // 1-5
  comments: string;
  name?: string;
  email?: string;
  timestamp: number;
}

export type Theme = 'light' | 'dark';