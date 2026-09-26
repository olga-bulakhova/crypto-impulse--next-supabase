import React from 'react';
import Link from 'next/link';

// 🌟 НАШИ НОВЫЕ КИБЕР-ВАРИАНТЫ КНОПОК
type ButtonVariant = 'base' | 'cyber' | 'amber' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
}

export const Button = ({
  children,
  isLoading = false,
  loadingText,
  icon,
  variant = 'base',
  className = '',
  disabled,
  href,
  ...props
}: ButtonProps) => {
  // Базовые интерактивные стили для всех типов кнопок
  const baseStyles =
    'inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl text-sm font-semibold tracking-tight transition-all duration-300 focus:outline-none disabled:pointer-events-none disabled:border-zinc-900 disabled:bg-zinc-900 disabled:text-zinc-600 select-none disabled:shadow-none';

  // 🎨 СТИЛИ КИБЕР-ПАЛИТРЫ (Идеальное сочетание с globals.css)
  const variantStyles = {
    // Второстепенная темная кнопка
    base: 'border border-zinc-800 bg-zinc-900 px-4 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white active:scale-[0.98]',

    // 🔵 ГЛАВНАЯ: Электрический кибер-синий со свечением
    cyber:
      'border-transparent bg-cyan-400 px-5 text-zinc-950 shadow-lg shadow-cyan-500/10 hover:bg-cyan-300 hover:shadow-cyan-500/20  active:scale-[0.98]',

    // 🟡 АКЦЕНТНАЯ: Янтарно-золотая для настроек и индикаторов
    amber:
      'border-transparent bg-amber-500 px-5 text-zinc-950 shadow-lg shadow-amber-500/10 hover:bg-amber-400 hover:shadow-amber-500/20 active:scale-[0.98]',

    // 🔴 ОПАСНАЯ: Багровая для удаления алертов и дампов
    danger:
      'border border-red-950/40 bg-red-950/10 px-4 text-red-400 hover:border-red-500/40 hover:bg-red-500/10 active:scale-[0.98]',
  };

  const finalClassName = `${baseStyles} ${variantStyles[variant]} ${className}`;

  // Рендеринг контента внутри кнопки (с поддержкой лоадера-спиннера и иконок)
  const content = (
    <>
      {isLoading ? (
        <>
          <span
            className={`h-4 w-4 animate-spin rounded-full border-2 border-t-transparent ${
              variant === 'base' || variant === 'danger'
                ? 'border-zinc-400'
                : 'border-zinc-950'
            }`}
          />
          <span>{loadingText || children}</span>
        </>
      ) : (
        <>
          {icon && (
            <span className="flex items-center justify-center">{icon}</span>
          )}
          <span>{children}</span>
        </>
      )}
    </>
  );

  // Если передан проп href — кнопка автоматически превращается в оптимизированную ссылку Next.js
  if (href) {
    return (
      <Link href={href} className={finalClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled || isLoading}
      className={finalClassName}
      {...props}
    >
      {content}
    </button>
  );
};
