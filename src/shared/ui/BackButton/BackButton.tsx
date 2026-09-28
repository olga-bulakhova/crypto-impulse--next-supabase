'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  fallbackHref?: string;
}

export const BackButton = ({ fallbackHref = '/' }: BackButtonProps) => {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      if (typeof window !== 'undefined' && window.history.length > 1) {
        router.back();
      } else {
        router.push(fallbackHref);
      }
    } catch (error: unknown) {
      console.error('[NAVIGATION_ERROR] Сбой возврата по истории:', error);
      router.push(fallbackHref);
    }
  };

  return (
    <Link
      href={fallbackHref}
      onClick={handleBack}
      className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 transition-colors select-none hover:text-cyan-400"
    >
      <span>←</span>
      <span>Назад</span>
    </Link>
  );
};
