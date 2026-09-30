import React from 'react';
import Link from 'next/link';

// 🌟 НАШИ СТРОГИЕ ПЕРЕЧИСЛЕНИЯ ДИЗАЙН-СИСТЕМЫ (Без any для ESLint)
type ButtonVariant = 'base' | 'cyber' | 'amber' | 'yellow' | 'danger';
type ButtonSize = 'sm' | 'default' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize; // 🟢 ДОБАВЛЕНО: Свойство гибкого управления размером
  href?: string;
}

// 📏 СЛОВАРЬ РАЗМЕРОВ: Вынесли классы геометрии, высоты и шрифтов [0.2]
const sizeStyles: Record<ButtonSize, string> = {
  // Компактный размер для таблиц и мелких элементов
  sm: 'h-8 rounded-full px-3 text-xs',

  // Ваш исходный эталонный размер для форм и кнопок
  default: 'h-11 rounded-full px-5 text-sm',

  // Крупный размер для главных CTA-блоков и баннеров
  lg: 'h-14 rounded-full px-7 text-base tracking-wide font-bold',
};

export const Button = ({
  children,
  isLoading = false,
  loadingText,
  icon,
  variant = 'base',
  size = 'default', // По умолчанию кнопка имеет стандартный размер h-11
  className = '',
  disabled,
  href,
  ...props
}: ButtonProps) => {
  // Базовые интерактивные стили (убрали отсюда фиксированную высоту h-11 и округление)
  const baseStyles =
    'inline-flex cursor-pointer items-center justify-center gap-2 font-semibold tracking-tight transition-all duration-300 focus:outline-none disabled:pointer-events-none disabled:border-zinc-900 disabled:bg-zinc-900/40 disabled:text-zinc-600 select-none disabled:shadow-none';

  // 🎨 СТИЛИ КИБЕР-ПАЛИТРЫ (Стеклянный эффект в тон бейдж) [0.2]
  const variantStyles = {
    base: 'border border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white active:scale-[0.98]',

    cyber:
      'border border-cyan-500/10 bg-cyan-500/5 text-cyan-400 shadow-md shadow-cyan-500/[0.01] hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-cyan-500/[0.04] active:scale-[0.98]',

    amber:
      'border border-amber-500/10 bg-amber-500/5 text-amber-500 shadow-md shadow-amber-500/[0.01] hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-400 hover:shadow-amber-500/[0.04] active:scale-[0.98]',

    yellow:
      'border border-[oklch(var(--cyber-yellow))]/10 bg-[oklch(var(--cyber-yellow))]/5 text-[oklch(var(--cyber-yellow))] shadow-md shadow-yellow-500/[0.01] hover:border-[oklch(var(--cyber-yellow))]/30 hover:bg-[oklch(var(--cyber-yellow))]/10 hover:shadow-yellow-500/[0.04] active:scale-[0.98]',

    danger:
      'border border-red-500/10 bg-red-500/5 text-red-400 shadow-md shadow-red-500/[0.01] hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300 hover:shadow-red-500/[0.04] active:scale-[0.98]',
  };

  // ⚡ СКЛЕЙКА КЛАССОВ: Объединяем базу, цвет, выбранный размер и внешние классы
  const finalClassName = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  // Определение динамических габаритов спиннера в зависимости от размера кнопки [0.2]
  const spinnerSize =
    size === 'sm' ? 'h-3.5 w-3.5 border-2' : 'h-4 w-4 border-2';

  // Рендеринг контента внутри кнопки (с поддержкой лоадера-спиннера и иконок)
  // Рендеринг контента внутри кнопки (с поддержкой лоадера-спиннера и иконок)
  const content = (
    <>
      {isLoading ? (
        <>
          <span
            // 🟢 ИСПРАВЛЕНО: Заменили border-t-transparent на классический круговой спиннер с мягкой подложкой border-current/10
            className={`${spinnerSize} animate-spin rounded-full border-2 border-current/10 border-t-current`}
          />
          {size !== 'sm' && <span>{loadingText || children}</span>}
        </>
      ) : (
        <>
          {icon && (
            <span className="flex items-center justify-center text-current">
              {icon}
            </span>
          )}
          <span className="tracking-wide">{children}</span>
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
