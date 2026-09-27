import React from 'react';
import Link from 'next/link';

interface CoinNotFoundProps {
  coinId: string;
}

/**
 * 🛸 АТОМАРНЫЙ КОМПОНЕНТ: Ошибка «Актив не найден»
 * Полностью изолированная верстка вашей фирменной заглушки.
 */
export const CoinNotFound = ({ coinId }: CoinNotFoundProps) => {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center font-sans">
      <div className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-8 shadow-2xl backdrop-blur-md">
        <span className="text-3xl">📡</span>
        <h1 className="mt-4 text-base font-bold tracking-wider text-white uppercase">
          Актив не найден
        </h1>
        <p className="mt-2 text-xs text-zinc-500">
          Монета с идентификатором «
          <span className="font-mono text-zinc-400">{coinId}</span>» не
          обнаружена в системе кэширования радара.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-xs font-bold text-zinc-300 transition-colors hover:bg-zinc-800"
        >
          ← Вернуться на главную
        </Link>
      </div>
    </div>
  );
};
