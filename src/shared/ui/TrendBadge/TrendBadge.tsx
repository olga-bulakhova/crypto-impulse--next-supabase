// 📐 СТРОГИЕ ЛИТЕРАЛЬНЫЕ ТИПЫ ДЛЯ БЕЙДЖЕЙ (Без any для ESLint)
export type TrendBadgeVariant = 'up' | 'down' | 'warning' | 'neutral';
export type TrendBadgeSize = 'sm' | 'md';

interface TrendBadgeProps {
  variant: TrendBadgeVariant;
  size?: TrendBadgeSize;
  children: React.ReactNode;
}

// 🎨 СТИЛИ КИБЕР-ПАЛИТРЫ VEGA (0% any)
const variantStyles: Record<TrendBadgeVariant, string> = {
  // Бирюзовый неоновый лонг тренд
  up: 'border border-cyan-500/10 bg-cyan-500/5 text-cyan-400',

  // Алый неоновый шорт тренд
  down: 'border border-red-500/10 bg-red-500/5 text-red-400',

  // Янтарно-золотой для предупреждений и флэта (бывший neutral)
  warning: 'border border-amber-500/10 bg-amber-500/5 text-amber-500',

  // 🟢 ДОБАВЛЕНО: Чистый серый нейтральный Web3-бейдж для статичных или пустых метрик
  neutral: 'border border-zinc-800 bg-zinc-900/40 text-zinc-400',
};

const sizeStyles: Record<TrendBadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[11px]',
  md: 'px-3 py-1 text-[13px]',
};

/**
 * 🛸 UI КОМПОНЕНТ: Финтех-бейдж индикации рыночных трендов Vega
 */
export const TrendBadge = ({
  variant,
  size = 'sm',
  children,
}: TrendBadgeProps) => {
  return (
    <span
      className={`inline-flex w-fit min-w-[30px] items-center justify-center gap-1 rounded-full font-mono leading-none font-bold transition-colors duration-300 select-none ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </span>
  );
};
