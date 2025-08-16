
import React from 'react';

// ThemeToggle Icons are kept as they are, not fitting the line-art style
export const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

export const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

// Neon Line Art Icons
const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  strokeWidth: 1.5,
  stroke: "currentColor"
};

export const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
);

export const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

export const XCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

export const QuestionMarkCircleIcon = ({ className }: { className?: string }) => (
    <svg className={className} {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>
);

export const UploadIcon = ({ className }: { className?: string }) => (
    <svg className={className} {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
);

export const ResetIcon = ({ className }: { className?: string }) => (
  <svg className={className} {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.18-3.185m-3.18-3.183l-3.182-3.182a8.25 8.25 0 00-11.664 0l-3.18 3.185" /></svg>
);

export const MenuIcon = ({ className }: { className?: string }) => (
  <svg className={className} {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
);

export const InfoIcon = ({ className }: { className?: string }) => (
  <svg className={className} {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
);

export const SwitchIcon = ({ className }: { className?: string }) => (
    <svg className={className} {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h18m-7.5-12L21 7.5m0 0L16.5 12M21 7.5H3" /></svg>
);

export const FeedbackIcon = ({ className }: { className?: string }) => (
  <svg className={className} {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.362 2.036a5.25 5.25 0 006.214 2.224l-1.14-1.14a1.5 1.5 0 01-.316-1.57 1.5 1.5 0 011.572-.316l1.14 1.14 1.14-1.14a1.5 1.5 0 012.122 0l1.14 1.14 1.14-1.14a1.5 1.5 0 012.122 0l.293.293m-9.362 2.036a5.25 5.25 0 01-6.214-2.224M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

export const HistoryIcon = ({ className }: { className?: string }) => (
  <svg className={className} {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0011.664 0l3.18-3.185M12 6.75h.008v.008H12V6.75z" /></svg>
);

export const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
);

export const EmailIcon = ({ className }: { className?: string }) => (
    <svg className={className} {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
);

export const ScaleIcon = ({ className }: { className?: string }) => (
    <svg className={className} {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.105 0-4.178.107-6.168.307M5.25 4.97A48.417 48.417 0 0112 4.5c2.105 0 4.178.107 6.168.307m0 0a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25m-13.5 0a2.25 2.25 0 01-2.25-2.25v-7.5a2.25 2.25 0 012.25-2.25" /></svg>
);

export const PaperclipIcon = ({ className }: { className?: string }) => (
    <svg className={className} {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.122 2.122l7.81-7.81" /></svg>
);

export const CheckIcon = ({ className }: { className?: string }) => (
    <svg className={className} {...iconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
);