
import React from 'react';
import { AnalysisMode } from '../types';
import { SwitchIcon } from './icons';

interface ModeToggleProps {
  mode: AnalysisMode;
  setMode: (mode: AnalysisMode) => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ mode, setMode }) => {
  const toggleMode = () => {
    setMode(mode === 'fact' ? 'legal' : 'fact');
  };

  return (
    <button
      onClick={toggleMode}
      className="flex items-center space-x-2 px-3 py-1.5 text-sm font-semibold rounded-full border border-white/20 hover:bg-white/10 transition-colors duration-200 text-text-secondary dark:text-gray-300"
      aria-label={`Switch to ${mode === 'fact' ? 'Legal' : 'Fact'} Check`}
    >
      <SwitchIcon className="w-5 h-5 text-neon-cyan" />
      <span>{mode === 'fact' ? 'Fact Check' : 'Legal Check'}</span>
    </button>
  );
};

export default ModeToggle;