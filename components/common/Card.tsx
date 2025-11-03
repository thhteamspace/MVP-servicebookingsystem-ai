
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-cyan-500/10 ${className}`}>
      {children}
    </div>
  );
};
