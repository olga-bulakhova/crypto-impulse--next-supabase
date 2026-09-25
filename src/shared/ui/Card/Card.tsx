import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  description?: string;
  className?: string;
}

export const Card = ({
  children,
  title,
  description,
  className = '',
}: CardProps) => {
  return (
    <div
      className={`w-full rounded-3xl border border-zinc-900 bg-zinc-900/30 p-6 shadow-2xl shadow-cyan-500/[0.01] backdrop-blur-md transition-all duration-500 hover:border-cyan-500/20 hover:shadow-cyan-500/[0.03] sm:p-8 ${className}`}
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
