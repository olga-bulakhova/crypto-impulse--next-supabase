import { cn } from 'cn'; // Ваша утилита объединения классов

interface RefreshIconProps {
  isPending: boolean;
  className?: string; // 🟢 ДОБАВЛЕНО: Возможность передавать адаптивные классы размеров
}

/**
 * 🛸 АТОМАРНЫЙ UI КОМПОНЕНТ: Интерактивная круговая SVG-иконка обновления
 */
export const RefreshIcon = ({ isPending, className }: RefreshIconProps) => {
  return (
    <svg
      xmlns="http://w3.org"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      // Применяем переданный className для гибкого изменения размеров на мобилках
      className={cn(
        `transition-transform duration-500`,
        isPending
          ? 'animate-spin text-cyan-400'
          : 'group-hover:rotate-[180deg]',
        className,
      )}
    >
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <polyline points="21 3 21 8 16 8" />
    </svg>
  );
};
