import React from 'react';

export type ContainerMaxWidth = 'md' | 'xl' | '3xl' | '6xl' | '7xl' | 'full';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: ContainerMaxWidth;
  className?: string;
}

const maxWidthStyles: Record<ContainerMaxWidth, string> = {
  md: 'max-w-md',
  xl: 'max-w-xl',
  '3xl': 'max-w-3xl',
  '6xl': 'max-w-5xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

export const Container = ({
  children,
  maxWidth = '7xl',
  className = '',
}: ContainerProps) => {
  return (
    <div
      className={`mx-auto px-4 py-4 font-sans text-zinc-100 select-none ${maxWidthStyles[maxWidth]} ${className}`}
    >
      {children}
    </div>
  );
};
