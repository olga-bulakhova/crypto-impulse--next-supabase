'use client';

import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cn } from '@/lib/utils'; // Убедитесь, что путь к вашей функции cn указан верно

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      // 🌟 ИНТЕГРИРОВАНО: Стили Веги (высота h-9, скругление rounded-xl, фокус на кибер-синий неон)
      className={cn(
        'h-9 w-full min-w-0 rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 font-mono text-sm text-zinc-200 shadow-xs transition-colors outline-none placeholder:text-zinc-500 focus:border-cyan-500/30 focus:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-brand-red/50 data-placeholder:text-zinc-500 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=input]:flex',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
