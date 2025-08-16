
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
  const [activeModal, setActiveModal] = useState<'about' | 'feedback' | null>(null);
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
        onOpenAbout={() => setActiveModal('about')}
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
      <Modal isOpen={activeModal === 'about'} onClose={() => setActiveModal(null)} title="About Veritas AI">
        <p>Veritas AI is an advanced assistant designed for detecting fake news and misinformation. Our goal is to provide clear, neutral, and evidence-based analysis to help you navigate the complex information landscape.</p>
        <p>By providing not just a verdict but also the reasoning behind it, Veritas AI aims to be a transparent and trustworthy tool for promoting media literacy.</p>
      </Modal>
      
      <FeedbackModal 
        isOpen={activeModal === 'feedback'} 
        onClose={() => setActiveModal(null)} 
      />

    </div>
  );
};

export default App;