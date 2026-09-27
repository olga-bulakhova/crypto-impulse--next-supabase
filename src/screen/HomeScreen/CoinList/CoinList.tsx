import React from 'react';
import { getCoinStats } from '@/shared/utils-server/coinStats';
import { CoinCard } from './CoinCard';

// 📐 СТРОГИЙ ИНТЕРФЕЙС ДАННЫХ ДЛЯ ТИПИЗАЦИИ
interface CoinItem {
  id: string;
  icon: string;
  name: string;
  symbol: string;
  rank: number;
  price: number;
  priceChange1d: number;
}

/**
 * 🛸 ДОЧЕРНИЙ КОМПОНЕНТ: Презентационная карточка актива
 * Полностью изолированная верстка без изменений ваших стилей и классов.


/**
 * 📊 ГЛАВНЫЙ СЕРВЕРНЫЙ КОМПОНЕНТ: Контейнер списка котировок
 */
export const CoinList = async () => {
  // Выполняется на сервере: получаем живые данные [5.2]
  const coinsData = await getCoinStats();

  console.log(coinsData);

  // Принудительно приводим к нашему строгому интерфейсу для безопасности типов
  const coins = (coinsData || []) as unknown as CoinItem[];

  // Защитный сценарий: если рынок вдруг пуст или утилита вернула пустой массив из-за сбоя API
  if (coins.length === 0) {
    return (
      <div className="w-full rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 text-center text-xs text-zinc-500 shadow-2xl backdrop-blur-md">
        Котировки временно недоступны... 📡
      </div>
    );
  }

  return (
    <div className="w-full font-sans select-none">
      {/* 📊 ШАПКА ВИДЖЕТА КОТИРОК */}
      <div className="mb-4 flex items-center justify-between border-b border-zinc-900/60 px-1 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_hsl(var(--cyber-blue))]"></span>
          <h2 className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
            Топ активов рынка
          </h2>
        </div>
        <span className="font-mono text-[9px] font-bold tracking-wider text-zinc-600 uppercase select-none">
          CoinStats API
        </span>
      </div>

      {/* 🛸 СЕТКА ИЗ КРАСИВЫХ ДЕКОМПОЗИРОВАННЫХ КАРТОЧЕК */}
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {coins.map((coin) => (
          // Декларативно вызываем наш новый атомарный компонент
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
};
