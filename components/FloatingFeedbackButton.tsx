
import React from 'react';
import { FeedbackIcon } from './icons';

interface FloatingFeedbackButtonProps {
    onClick: () => void;
}

const FloatingFeedbackButton: React.FC<FloatingFeedbackButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 z-30 w-16 h-16 rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta text-black flex items-center justify-center shadow-lg hover:shadow-glow-cyan transition-all duration-300 transform hover:scale-110 animate-pulse"
            aria-label="Open feedback form"
        >
            <FeedbackIcon className="w-8 h-8" />
        </button>
    );
};

export default FloatingFeedbackButton;