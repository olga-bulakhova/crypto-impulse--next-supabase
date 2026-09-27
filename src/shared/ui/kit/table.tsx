'use client';

import * as React from 'react';
import { cn } from 'cn';

function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div
      data-slot="table-container"
      // 🟢 ИСПРАВЛЕНО: Добавлены кастомные классы для полной перекраски скроллбара в черный кибер-цвет
      className={cn(
        'relative w-full overflow-x-auto bg-zinc-950/40 shadow-2xl backdrop-blur-md',
        // Настройка ширины/высоты полосы прокрутки
        '[&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:w-1.5',
        // Полностью черный матовый ползунок (бегунок скролла)
        '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-950',
        // Граница вокруг ползунка для создания отступа (визуального объема)
        '[&::-webkit-scrollbar-thumb]:border [&::-webkit-scrollbar-thumb]:border-zinc-900/60',
        // Прозрачная или глубокая черная дорожка (фон скроллбара)
        '[&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-zinc-900/10',
        // Мягкая подсветка ползунка при наведении мыши
        'hover:[&::-webkit-scrollbar-thumb]:bg-zinc-900',
      )}
    >
      <table
        data-slot="table"
        className={cn(
          'w-full caption-bottom border-collapse font-sans text-sm text-zinc-200 select-none',
          className,
        )}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      // 🟢 ИСПРАВЛЕНО: Строгая темная граница под шапкой
      className={cn(
        'bg-zinc-900/20 [&_tr]:border-b [&_tr]:border-zinc-900/80',
        className,
      )}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      // 🟢 ИСПРАВЛЕНО: Моноширинный шрифт и темный фон для подвала таблицы
      className={cn(
        'border-t border-zinc-900 bg-zinc-950/80 font-mono font-medium text-zinc-400 [&>tr]:last:border-b-0',
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      // 🟢 ИСПРАВЛЕНО: Мягкий плавный ховер-эффект, перекрашивающий строку в дымчатый цвет
      className={cn(
        'border-b border-zinc-900/40 transition-colors duration-200 hover:bg-zinc-900/40 data-[state=selected]:bg-zinc-900/60',
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      // 🟢 ИСПРАВЛЕНО: Превратили заголовки в строгий биржевой стиль — мелкий моноширинный uppercase с трекингом самых широких букв
      className={cn(
        'h-10 px-4 text-left align-middle font-mono text-[10px] font-bold tracking-widest whitespace-nowrap text-zinc-500 uppercase [&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      // 🟢 ИСПРАВЛЕНО: Оптимальные отступы и поддержка моноширинных элементов
      className={cn(
        'p-3 px-4 align-middle text-xs font-medium tracking-wide whitespace-nowrap text-zinc-300 [&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        'text-2xs mt-4 font-mono tracking-wider text-zinc-600 uppercase',
        className,
      )}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
