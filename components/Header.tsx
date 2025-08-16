
import React, { useState, useEffect } from 'react';
import { APP_NAME } from '../constants';
import { Theme } from '../types';
import { MenuIcon, CloseIcon, InfoIcon, FeedbackIcon, HistoryIcon } from './icons';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onOpenAbout: () => void;
  onOpenFeedback: () => void;
  onGoToHistory: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, setTheme, onOpenAbout, onOpenFeedback, onGoToHistory }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinkClass = 'flex items-center px-3 py-2 rounded-lg text-sm font-medium text-text-secondary dark:text-gray-300 hover:text-neon-cyan dark:hover:text-neon-cyan hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neon-cyan';

  const navLinks = (
    <>
      <button onClick={() => { onOpenAbout(); setMenuOpen(false); }} className={navLinkClass}><InfoIcon className="w-5 h-5 mr-2" />About</button>
      <button onClick={() => { onOpenFeedback(); setMenuOpen(false); }} className={navLinkClass}><FeedbackIcon className="w-5 h-5 mr-2" />Feedback</button>
      <button onClick={() => { onGoToHistory(); setMenuOpen(false); }} className={navLinkClass}><HistoryIcon className="w-5 h-5 mr-2" />History</button>
    </>
  );

  return (
    <header className="header-glass sticky top-0 z-40 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
             <svg className="w-8 h-8 text-neon-cyan" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.004 9.004 0 0112 21" />
            </svg>
            <span className="text-xl font-bold text-text-primary">{APP_NAME}</span>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {navLinks}
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>

          <div className="md:hidden flex items-center">
              <ThemeToggle theme={theme} setTheme={setTheme} />
              <button onClick={() => setMenuOpen(!isMenuOpen)} className="ml-2 p-2 rounded-md text-text-secondary hover:text-text-primary dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10">
                  {isMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
          <div className="md:hidden header-glass">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-start">
                  {navLinks}
              </div>
          </div>
      )}
    </header>
  );
};

export default Header;