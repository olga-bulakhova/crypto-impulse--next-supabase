import React from 'react';

export type TrendBadgeVariant = 'up' | 'down' | 'neutral';
export type TrendBadgeSize = 'sm' | 'md';

interface TrendBadgeProps {
  variant: TrendBadgeVariant;
  size?: TrendBadgeSize;
  children: React.ReactNode;
}

const variantStyles: Record<TrendBadgeVariant, string> = {
  up: 'border border-cyan-500/10 bg-cyan-500/5 text-cyan-400',
  down: 'border border-red-500/10 bg-red-500/5 text-red-400',
  neutral: 'border border-amber-500/10 bg-amber-500/5 text-amber-500',
};

const sizeStyles: Record<TrendBadgeSize, string> = {
  sm: 'p-2 py-0.5 text-[11px]',
  md: 'px-3 py-1 text-[13px] rounded-lg',
};

export const TrendBadge = ({
  variant,
  size = 'sm',
  children,
}: TrendBadgeProps) => {
  return (
    <span
      className={`flex items-center gap-1 rounded-md font-mono leading-none font-bold transition-colors duration-300 select-none ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </span>
  );
};
