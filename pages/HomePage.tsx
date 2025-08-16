
import React, { useState, useRef, useEffect } from 'react';
import { AnalysisResult, AnalysisMode } from '../types';
import ResultCard from '../components/ResultCard';
import { DownloadToDesktopIcon, PaperclipIcon, CloseIcon, ResetIcon } from '../components/icons';

interface HomePageProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
  handleSubmit: (data: { query: string; mode: AnalysisMode; file?: File }) => void;
  handleReset: () => void;
}

const ModeSwitcher: React.FC<{ mode: AnalysisMode; setMode: (mode: AnalysisMode) => void; disabled: boolean }> = ({ mode, setMode, disabled }) => {
    const baseClasses = "px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent";
    const activeClasses = "bg-neon-cyan/80 text-black shadow-lg";
    const inactiveClasses = "bg-white/10 hover:bg-white/20 text-white";

    return (
        <div className="flex justify-center p-1 rounded-full bg-black/20 backdrop-blur-sm">
            <button
                onClick={() => setMode('fact')}
                className={`${baseClasses} ${mode === 'fact' ? activeClasses : inactiveClasses}`}
                disabled={disabled}
                aria-pressed={mode === 'fact'}
            >
                Fact Checker
            </button>
            <button
                onClick={() => setMode('legal')}
                className={`${baseClasses} ${mode === 'legal' ? activeClasses : inactiveClasses}`}
                disabled={disabled}
                aria-pressed={mode === 'legal'}
            >
                Legal Checker
            </button>
        </div>
    );
};

const HomePage: React.FC<HomePageProps> = ({ result, isLoading, error, handleSubmit, handleReset }) => {
    const [query, setQuery] = useState('');
    const [mode, setMode] = useState<AnalysisMode>('fact');
    const [file, setFile] = useState<File | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const scrollHeight = textarea.scrollHeight;
            const maxHeight = 200;
            textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
        }
    }, [query]);
    
    useEffect(() => {
        // When switching to 'fact' mode, clear any selected file.
        if (mode === 'fact') {
            setFile(null);
        }
    }, [mode]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() || file) {
            handleSubmit({ query: query.trim(), mode, file: file ?? undefined });
            setQuery('');
            setFile(null);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
        e.target.value = ''; // Allow re-selecting the same file
    };

  return (
    <div className="flex-grow flex flex-col justify-center container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="w-full max-w-4xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 glass-card">
              <div className="w-12 h-12 border-4 border-t-transparent border-neon-cyan rounded-full animate-spin"></div>
              <p className="mt-4 text-lg font-semibold text-text-primary dark:text-gray-200">Analyzing your content...</p>
              <p className="mt-1 text-text-secondary dark:text-gray-400">This may take a moment.</p>
            </div>
          ) : error ? (
            <div className="p-6 glass-card border-red-500/50 border animate-fade-in text-center">
              <p className="mt-1 text-red-300 text-lg">⚠️ Service busy, try again.</p>
              <button
                onClick={handleReset}
                className="mt-6 flex items-center mx-auto space-x-2 px-6 py-2 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 focus:ring-4 focus:outline-none focus:ring-cyan-300/50 transition-all transform hover:scale-105 shadow-lg"
              >
                <ResetIcon className="w-5 h-5" />
                <span>Try Again</span>
              </button>
            </div>
          ) : result ? (
             <div className="animate-fade-in-scale flex flex-col items-center">
                <ResultCard result={result} />
                <button
                    onClick={handleReset}
                    className="mt-8 flex items-center space-x-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 focus:ring-4 focus:outline-none focus:ring-cyan-300/50 transition-all transform hover:scale-105 shadow-lg"
                >
                    <ResetIcon className="w-5 h-5" />
                    <span>New Analysis</span>
                </button>
            </div>
          ) : (
            <div className="w-full max-w-2xl mx-auto">
                <form onSubmit={handleFormSubmit}>
                    <ModeSwitcher mode={mode} setMode={setMode} disabled={isLoading} />
                    <div className="mt-6 glass-card p-2 sm:p-4">
                        <div className="relative">
                            <textarea
                              ref={textareaRef}
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              placeholder={mode === 'fact' ? "Enter a claim, question, or paste an article link..." : "Describe the legal document or ask a legal question..."}
                              className={`w-full p-3 text-base bg-transparent border-b border-white/20 focus:ring-0 focus:border-neon-cyan transition-all duration-300 text-text-primary dark:text-gray-200 placeholder-text-tertiary dark:placeholder-gray-500 resize-none overflow-y-auto ${mode === 'legal' ? 'pr-14' : ''}`}
                              style={{ minHeight: '50px' }}
                              rows={2}
                              disabled={isLoading}
                              aria-label="Text to analyze"
                            />
                            {mode === 'legal' && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => inputRef.current?.click()}
                                        disabled={isLoading}
                                        className="absolute top-1/2 right-3 -translate-y-1/2 p-2 rounded-full text-gray-400 hover:text-neon-cyan hover:bg-white/10 transition-all duration-300 animate-pulse-glow focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                                        aria-label="Upload file for legal check"
                                    >
                                        <DownloadToDesktopIcon className="w-6 h-6" />
                                    </button>
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept="image/*,video/*,application/pdf,.doc,.docx"
                                    />
                                </>
                            )}
                        </div>
                        {file && mode === 'legal' && (
                            <div className="mt-2 w-full flex justify-between items-center bg-black/20 px-3 py-2 rounded-lg text-sm animate-fade-in">
                                <div className="flex items-center space-x-2 truncate">
                                    <PaperclipIcon className="w-5 h-5 text-gray-300" />
                                    <span className="truncate text-gray-200" title={file.name}>{file.name}</span>
                                </div>
                                <button onClick={() => setFile(null)} disabled={isLoading} className="p-1 rounded-full hover:bg-white/20">
                                    <CloseIcon className="w-4 h-4 text-gray-300" />
                                </button>
                            </div>
                        )}
                    </div>
                     <div className="mt-6 flex justify-center">
                        <button
                            type="submit"
                            disabled={isLoading || (!query.trim() && !file)}
                            className="px-8 py-3 bg-gradient-to-r from-neon-cyan to-neon-magenta text-black font-bold rounded-full hover:shadow-glow-cyan focus:ring-4 focus:outline-none focus:ring-cyan-300/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
                        >
                            {isLoading ? 'Analyzing...' : 'Analyze'}
                        </button>
                    </div>
                </form>
            </div>
          )}
      </div>
    </div>
  );
};

export default HomePage;