'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  fallbackHref?: string;
}

/**
 * 🛸 ИНТЕЛЛЕКТУАЛЬНЫЙ КЛИЕНТСКИЙ КОМПОНЕНТ: Ссылка возврата с анализом истории
 * Семантически верный тег <a> с перехватом события для умной навигации.
 */
export const BackButton = ({ fallbackHref = '/' }: BackButtonProps) => {
  const router = useRouter();

  // Строгая типизация события клика по ссылке без использования any
  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 1. Блокируем стандартный жесткий переход по ссылке href
    e.preventDefault();

    try {
      // 2. Проверяем, есть ли в браузере история переходов (длина стека больше 1)
      if (typeof window !== 'undefined' && window.history.length > 1) {
        router.back(); // Возвращаем пользователя ровно туда, откуда он пришел
      } else {
        router.push(fallbackHref); // Если открыли вкладку напрямую — уводим на дефолтный роут
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
