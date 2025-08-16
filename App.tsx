
import React, { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Modal from './components/Modal';
import FeedbackModal from './components/FeedbackModal';
import HistorySection from './components/HistorySection';
import FloatingFeedbackButton from './components/FloatingFeedbackButton';
import useLocalStorage from './hooks/useLocalStorage';
import { Theme, AnalysisResult, QueryHistoryItem, AnalysisMode } from './types';
import { getAnalysis, getLegalAnalysis } from './services/geminiService';

interface SubmitData {
  query: string;
  mode: AnalysisMode;
  file?: File;
}

const App: React.FC = () => {
  // UI State
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'dark');
  const [activeModal, setActiveModal] = useState<'info' | 'feedback' | null>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  // Core App State
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useLocalStorage<QueryHistoryItem[]>('queryHistory', []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const background = document.getElementById('background-wrap');
    if (background) {
      background.innerHTML = ''; // Clear existing particles on re-render
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = '0';
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        background.appendChild(particle);
      }
    }
  }, [theme]); // Re-generate particles if theme changes to ensure visibility

  const handleSubmit = async ({ query, mode, file }: SubmitData) => {
    if (!query.trim() && !file) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = mode === 'fact' 
        ? await getAnalysis(query) 
        : await getLegalAnalysis({ text: query, file });

      setResult(analysisResult);
      
      const newHistoryItem: QueryHistoryItem = {
        id: new Date().toISOString(),
        query: query,
        fileName: file?.name,
        result: analysisResult,
        mode,
        timestamp: Date.now(),
      };
      setHistory(prevHistory => [newHistoryItem, ...prevHistory].slice(0, 50));
    } catch (err) {
      const message = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  const handleSelectHistoryItem = (item: QueryHistoryItem) => {
    setResult(item.result);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const clearHistory = () => {
    setHistory([]);
  }
  
  const handleGoToHistory = () => {
    historyRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className={`flex flex-col min-h-screen text-text-primary dark:text-gray-100`}>
      <Header 
        theme={theme} 
        setTheme={setTheme}
        onOpenInfo={() => setActiveModal('info')}
        onOpenFeedback={() => setActiveModal('feedback')}
        onGoToHistory={handleGoToHistory}
      />
      <main className="flex-grow flex flex-col">
        <HomePage 
          result={result}
          isLoading={isLoading}
          error={error}
          handleSubmit={handleSubmit}
          handleReset={handleReset}
        />
        <HistorySection
            ref={historyRef}
            history={history}
            onSelect={handleSelectHistoryItem}
            clearHistory={clearHistory}
        />
      </main>
      <Footer />
      
      <FloatingFeedbackButton onClick={() => setActiveModal('feedback')} />
      
      {/* Modals */}
      <Modal isOpen={activeModal === 'info'} onClose={() => setActiveModal(null)} title="How Veritas AI Works">
        <div className="space-y-3">
            <p>Veritas AI uses an advanced AI model to analyze content for authenticity and factual accuracy. Here’s a simplified breakdown of the process:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
                <li><strong>Content Analysis:</strong> The AI reads the text, link, or document you provide, identifying the main claims and key points.</li>
                <li><strong>Cross-Referencing:</strong> It then scours a vast dataset of trusted sources, including news articles, academic papers, and fact-checking databases, to find corroborating or conflicting information.</li>
                <li><strong>Pattern Recognition:</strong> The model is trained to recognize patterns common in misinformation, such as emotionally charged language, logical fallacies, and signs of digital manipulation in media.</li>
                <li><strong>Confidence Scoring:</strong> Based on the evidence found, the AI calculates a confidence score, giving you a clear indication of how reliable the information is.</li>
            </ul>
            <p>Our goal is to provide a transparent, evidence-based verdict to help you distinguish fact from fiction in a complex digital world.</p>
        </div>
      </Modal>
      
      <FeedbackModal 
        isOpen={activeModal === 'feedback'} 
        onClose={() => setActiveModal(null)} 
      />

    </div>
  );
};

export default App;
