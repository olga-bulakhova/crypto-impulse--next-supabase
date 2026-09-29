'use client';

import * as React from 'react';
import { cn } from 'cn';
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
  type Locale,
} from 'react-day-picker';

import { Button, buttonVariants } from '@/shared/ui/kit/button';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from 'lucide-react';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',

  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      // 🟢 ИСПРАВЛЕНО: Сделали фон прозрачным bg-transparent, убрали дефолтные отступы подложки
      className={cn(
        'group/calendar bg-transparent p-1 [--cell-radius:var(--radius-xl)] [--cell-size:--spacing(9)]',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'relative flex flex-col gap-4 md:flex-row',
          defaultClassNames.months,
        ),
        month: cn('flex w-full flex-col gap-3', defaultClassNames.month),
        nav: cn(
          'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1 z-10',
          defaultClassNames.nav,
        ),
        // Кнопки навигации стрелочек (Влево / Вправо)
        button_previous: cn(
          buttonVariants({ variant: 'default' }), // Переключили на нашу фирменную темную базу кнопок!
          'size-7 p-0 select-none aria-disabled:opacity-30 border border-zinc-900 rounded-lg hover:text-white transition-colors duration-200',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: 'default' }),
          'size-7 p-0 select-none aria-disabled:opacity-30 border border-zinc-900 rounded-lg hover:text-white transition-colors duration-200',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'flex h-8 w-full items-center justify-center font-mono text-xs font-bold uppercase tracking-widest text-zinc-200 select-none',
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          'flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium font-mono text-zinc-300',
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          'relative rounded-(--cell-radius) border border-zinc-900 bg-zinc-950/40',
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          'absolute inset-0 bg-zinc-950 opacity-0',
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          'font-mono text-xs font-bold uppercase tracking-widest text-zinc-400 select-none',
          captionLayout === 'label'
            ? 'text-xs'
            : 'flex items-center gap-1 rounded-(--cell-radius) text-xs [&>svg]:size-3.5 [&>svg]:text-zinc-500',
          defaultClassNames.caption_label,
        ),
        month_grid: cn('w-full border-collapse', defaultClassNames.month_grid),
        weekdays: cn(
          'flex pb-1 border-b border-zinc-900/40',
          defaultClassNames.weekdays,
        ),
        weekday: cn(
          'flex-1 rounded-(--cell-radius) text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider text-center select-none',
          defaultClassNames.weekday,
        ),
        week: cn('mt-1.5 flex w-full', defaultClassNames.week),
        week_number_header: cn(
          'w-(--cell-size) select-none font-mono text-3xs text-zinc-600',
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          'text-[0.75rem] font-mono text-zinc-600 select-none',
          defaultClassNames.week_number,
        ),
        // 🟢 ИСПРАВЛЕНО: Глобальная ячейка дня — добавили поддержку состояний выбранного дня Vega
        day: cn(
          'group/day relative aspect-square h-full w-full rounded-xl p-0 text-center select-none text-xs font-mono font-medium text-zinc-400 [&:last-child[data-selected=true]_button]:rounded-r-xl',
          // Кастомизация активного выделенного дня (Бирюзовое свечение в тон кнопок и бейджей)
          'data-[selected=true]:bg-cyan-500/5 data-[selected=true]:text-cyan-400 data-[selected=true]:border data-[selected=true]:border-cyan-500/20 data-[selected=true]:shadow-lg data-[selected=true]:shadow-cyan-500/[0.02]',
          props.showWeekNumber
            ? '[&:nth-child(2)[data-selected=true]_button]:rounded-l-xl'
            : '[&:first-child[data-selected=true]_button]:rounded-l-xl',
          defaultClassNames.day,
        ),
        range_start: cn(
          'relative isolate z-0 rounded-l-xl bg-zinc-900/40 after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-zinc-900/40',
          defaultClassNames.range_start,
        ),
        range_middle: cn(
          'rounded-none bg-zinc-900/20 text-zinc-300',
          defaultClassNames.range_middle,
        ),
        range_end: cn(
          'relative isolate z-0 rounded-r-xl bg-zinc-900/40 after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-zinc-900/40',
          defaultClassNames.range_end,
        ),
        // Сегодняшний текущий день (аккуратный приглушенный бордер)
        today: cn(
          'rounded-xl border border-zinc-800 text-zinc-100 font-bold data-[selected=true]:border-transparent data-[selected=true]:bg-cyan-500/10',
          defaultClassNames.today,
        ),
        outside: cn(
          'text-zinc-700 opacity-40 aria-selected:text-cyan-600',
          defaultClassNames.outside,
        ),
        disabled: cn(
          'text-zinc-800 opacity-20 cursor-not-allowed lines-through',
          defaultClassNames.disabled,
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon
                className={cn(
                  'size-3.5 text-zinc-400 transition-colors hover:text-cyan-400',
                  className,
                )}
                {...props}
              />
            );
          }

          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn(
                  'size-3.5 text-zinc-400 transition-colors hover:text-cyan-400',
                  className,
                )}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon
              className={cn('size-3.5 text-zinc-500', className)}
              {...props}
            />
          );
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      // 🟢 ИСПРАВЛЕНО: Переписали все системные bg-primary на стеклянную неоновую палитру Vega
      className={cn(
        'relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 rounded-xl border-0 font-mono text-xs leading-none font-medium text-zinc-400 transition-all duration-200 select-none',
        // Мягкий ховер для обычных дней без прыжков цвета
        'hover:bg-zinc-900/50 hover:text-zinc-100',
        // Фокус клавиатуры (доступность) — аккуратное бирюзовое кольцо
        'group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-2 group-data-[focused=true]/day:ring-cyan-500/40 group-data-[focused=true]/day:outline-none',

        // 🔵 НАСТРОЙКА ДИАПАЗОНОВ (Если в будущем будем использовать Range-календарь):
        'data-[range-start=true]:rounded-l-xl data-[range-start=true]:border data-[range-start=true]:border-cyan-500/20 data-[range-start=true]:bg-cyan-500/10 data-[range-start=true]:text-cyan-400',
        'data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-zinc-900/30 data-[range-middle=true]:text-zinc-300',
        'data-[range-end=true]:rounded-r-xl data-[range-end=true]:border data-[range-end=true]:border-cyan-500/20 data-[range-end=true]:bg-cyan-500/10 data-[range-end=true]:text-cyan-400',

        // 🟢 НАСТРОЙКА ОДИНОЧНОГО ВЫБОРА ДНЯ (Наш текущий случай для FormDatePicker):
        // Заливаем аккуратным полупрозрачным бирюзовым стеклом со свечением и ярким текстом
        'data-[selected-single=true]:border data-[selected-single=true]:border-cyan-500/20 data-[selected-single=true]:bg-cyan-500/10 data-[selected-single=true]:font-black data-[selected-single=true]:text-cyan-400 data-[selected-single=true]:shadow-lg data-[selected-single=true]:shadow-cyan-500/[0.04]',

        'dark:hover:text-white [&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
