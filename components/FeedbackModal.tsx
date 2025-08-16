
import React, { useState } from 'react';
import Modal from './Modal';
import { UserIcon, EmailIcon } from './icons';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      return;
    }

    const recipient = 'laggalarakesh8@gmail.com';
    const subject = 'Veritas AI Feedback';
    const body = `
      Rating: ${rating}/5
      Name: ${name || 'Not provided'}
      Email: ${email || 'Not provided'}
      
      Comments:
      ${comments}
    `;

    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.trim())}`;
    
    window.location.href = mailtoLink;

    setIsSubmitted(true);
    
    // Reset form after a delay, then close modal
    setTimeout(() => {
        setRating(0);
        setName('');
        setEmail('');
        setComments('');
        setIsSubmitted(false);
        onClose();
    }, 2000);
  };
  
  const InputWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => (
    <div className="relative">{children}</div>
  );
  
  const IconWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => (
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{children}</div>
  );


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Submit Feedback">
      {isSubmitted ? (
        <div className="text-center py-8">
          <svg className="w-16 h-16 text-neon-cyan mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold mt-4 text-gray-100">Thank you!</h3>
          <p className="mt-2 text-gray-300">Your feedback has been submitted successfully.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 text-center">How accurate was the analysis?</label>
            <div className="flex items-center justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className={`text-4xl transition-colors duration-200 ${(hoverRating || rating) >= star ? 'text-amber-400' : 'text-gray-600'}`}
                  aria-label={`Rate ${star} out of 5 stars`}
                >
                  &#9733;
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputWrapper>
                <IconWrapper><UserIcon className="h-5 w-5 text-gray-400" /></IconWrapper>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name (Optional)" className="w-full pl-10 p-2.5 bg-white/5 border border-white/20 rounded-lg focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan transition-all duration-300" />
            </InputWrapper>
            <InputWrapper>
                <IconWrapper><EmailIcon className="h-5 w-5 text-gray-400" /></IconWrapper>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email (Optional)" className="w-full pl-10 p-2.5 bg-white/5 border border-white/20 rounded-lg focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan transition-all duration-300" />
            </InputWrapper>
          </div>

          <div>
            <textarea
              id="comments"
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full p-2.5 bg-white/5 border border-white/20 rounded-lg focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan transition-all duration-300"
              placeholder="Tell us more about your experience..."
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-neon-cyan to-neon-magenta text-black font-bold rounded-full hover:shadow-glow-cyan focus:ring-4 focus:outline-none focus:ring-cyan-300/50 disabled:opacity-60 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
              disabled={rating === 0}
            >
              Submit Feedback
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default FeedbackModal;