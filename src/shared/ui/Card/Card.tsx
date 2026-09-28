import React from 'react';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  description?: string;
  className?: string;
  padding?: CardPadding;
}

const paddingStyles: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-2',
  md: 'px-1 py-6 md:px-4',
  lg: 'p-6',
};

export const Card = ({
  children,
  title,
  description,
  className = '',
  padding = 'md',
}: CardProps) => {
  return (
    <div
      className={`w-full rounded-xl border border-zinc-900 bg-zinc-900/20 shadow-2xl shadow-cyan-500/[0.01] backdrop-blur-md transition-all duration-500 hover:border-cyan-500/20 hover:shadow-cyan-500/[0.03] ${paddingStyles[padding]} ${className}`}
    >
      {(title || description) && (
        <div className="mb-6 text-center last:mb-0">
          {title && (
            <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mx-auto mt-1.5 max-w-[280px] text-xs leading-relaxed text-zinc-500">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
};
