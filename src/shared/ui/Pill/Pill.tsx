import React from 'react';
import Link from 'next/link';

interface PillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string; // Если передан — рендерится как ссылка Next.js
  className?: string;
}

export const Pill = ({
  children,
  href,
  className = '',
  ...props
}: PillProps) => {
  // Наш фирменный закругленный стеклянный стиль из ProfileDropdown
  const baseStyles =
    'group inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-zinc-800 bg-zinc-900/50 py-1 pl-1 pr-3 text-xs font-semibold tracking-tight text-zinc-300 transition-all duration-300 hover:border-cyan-500/30 hover:text-white focus:outline-none select-none active:scale-[0.98]';

  const finalClassName = `${baseStyles} ${className}`;

  // Если есть ссылка, превращаем в компонент навигации Next.js
  if (href) {
    return (
      <Link href={href} className={finalClassName}>
        {children}
      </Link>
    );
  }

  // В противном случае оставляем стандартной HTML-кнопкой
  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
};
