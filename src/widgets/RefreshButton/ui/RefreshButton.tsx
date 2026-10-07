'use client';

import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { refreshMarketDataAction } from '@/shared/actions';
import { RefreshIcon } from '@/shared/icons/RefreshIcon';

export const RefreshButton = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleRefresh = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isPending) return;

    startTransition(async () => {
      try {
        await refreshMarketDataAction();
        router.refresh();
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.error(
          '[REFRESH_BUTTON_ERROR] Сбой ручной синхронизации:',
          errorMessage,
        );
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleRefresh}
      disabled={isPending}

      className={`group flex min-w-[181px] items-center justify-center gap-2 rounded-xl bg-zinc-950/40 p-2.5 font-mono text-[11px] font-bold tracking-widest text-zinc-400 uppercase backdrop-blur-md transition-all duration-300 outline-none select-none sm:px-3.5 sm:py-1.5 ${
        isPending
          ? 'opacity-60'
          : 'cursor-pointer hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/[0.02]'
      }`}
    >
      <RefreshIcon isPending={isPending} className="h-4 w-4" />

      <span className="inline">
        {isPending ? 'Обновление...' : 'Обновить котировки'}
      </span>
    </button>
  );
};
