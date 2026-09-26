import React from 'react';
import { createClient } from '@/utils/supabase/server'; // Наш серверный клиент [5.2]

// Заставляем Next.js всегда запрашивать свежие данные из базы при каждом открытии страницы
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // 1. Инициализируем серверное подключение к Supabase [5.2]
  const supabase = await createClient();

  // 2. Параллельно запрашиваем индикаторы рынка и живую ленту сигналов [5.2]
  const [intelResponse, signalsResponse] = await Promise.all([
    supabase.from('market_intel').select('*').eq('id', 1).maybeSingle(),
    supabase
      .from('signals')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20),
  ]);

  const intel = intelResponse.data;
  const signals = signalsResponse.data || [];

  // Функция для форматирования даты и времени сигнала
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 font-sans selection:bg-cyan-500/20">
      {/* 📊 СЕКЦИЯ ИНДИКАТОРОВ РЫНКА (МАRКЕТ INTEL) */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Индекс Страха и Жадности */}
        <div className="rounded-2xl border border-zinc-900 bg-zinc-900/10 p-5 shadow-lg backdrop-blur-sm">
          <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            Fear & Greed Index
          </h3>
          <p className="mt-2 font-mono text-2xl font-black text-amber-500">
            {intel ? intel.fear_greed_value : '--'}{' '}
            <span className="font-sans text-sm font-medium text-zinc-400">
              / {intel ? intel.fear_greed_status : 'Загрузка...'} 📈
            </span>
          </p>
        </div>

        {/* Доминация Биткоина */}
        <div className="rounded-2xl border border-zinc-900 bg-zinc-900/10 p-5 backdrop-blur-sm">
          <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            BTC Dominance
          </h3>
          <p className="mt-2 font-mono text-2xl font-black text-white">
            {intel ? `${intel.btc_dominance}%` : '--%'}{' '}
            <span className="font-sans text-sm font-medium font-normal text-zinc-400">
              👑
            </span>
          </p>
        </div>

        {/* Виджет активных радаров приложения */}
        <div className="rounded-2xl border border-cyan-900/30 bg-cyan-950/5 p-5 shadow-lg shadow-cyan-500/[0.01] backdrop-blur-sm">
          <h3 className="text-[10px] font-bold tracking-widest text-cyan-400/80 uppercase">
            Статус Сети
          </h3>
          <p className="mt-2 font-mono text-2xl font-black text-cyan-400">
            LIVE{' '}
            <span className="font-sans text-sm font-medium font-normal text-zinc-400">
              подключение активно 🌐
            </span>
          </p>
        </div>
      </div>

      {/* ⚡ ЖИВАЯ ЛЕНТА ИМПУЛЬСОВ */}
      <div className="border-t border-zinc-900/60 pt-6">
        <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-black tracking-tight text-white">
              Живой поток аномалий рынка
            </h2>
            <p className="mt-0.5 text-xs text-zinc-500">
              Импульсы и дельты резких скачков объемов и цен в реальном времени
            </p>
          </div>

          {/* Пульсирующий LIVE-маяк */}
          <div className="flex w-fit items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-[10px] font-semibold text-cyan-400 select-none">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
            </span>
            RADAR ACTIVE
          </div>
        </div>

        {/* СЕТКА СИГНАЛОВ ИЗ БАЗЫ ДАННЫХ */}
        {signals.length === 0 ? (
          // Сценарий А: Сигналов в базе данных пока вообще нет (база пустая)
          <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-900 p-8 text-center">
            <p className="max-w-sm text-xs leading-relaxed text-zinc-500">
              Лента сигналов пуста. В данный момент на рынке штиль, либо наш
              фоновый бот-сканер еще не совершил свой первый регулярный цикл
              проверки CoinStats API.
            </p>
          </div>
        ) : (
          // Сценарий Б: Выводим реальные сигналы из PostgreSQL
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {signals.map((signal) => {
              const isPump = signal.change_type === 'pump';

              return (
                <div
                  key={signal.id}
                  className={`relative flex flex-col justify-between rounded-2xl border p-4 transition-all duration-300 hover:scale-[1.01] ${
                    isPump
                      ? 'border-cyan-900/40 bg-gradient-to-br from-zinc-900/40 to-cyan-950/10 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/[0.04]'
                      : 'border-red-950/40 bg-gradient-to-br from-zinc-900/40 to-red-950/5 hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/[0.03]'
                  }`}
                >
                  {/* Верхняя часть карточки импульса */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base font-bold text-white uppercase">
                          {signal.coin_symbol}
                        </span>
                        <span className="max-w-[100px] truncate text-xs text-zinc-500">
                          {signal.coin_name}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-sm text-zinc-400">
                        \$
                        {Number(signal.price_at_signal).toLocaleString(
                          'en-US',
                          { maximumFractionDigits: 4 },
                        )}
                      </p>
                    </div>

                    {/* Бейдж процента изменения */}
                    <span
                      className={`rounded-lg border px-2 py-0.5 font-mono text-xs font-bold ${
                        isPump
                          ? 'border-cyan-500/20 bg-cyan-500/10 text-cyan-400'
                          : 'border-red-500/20 bg-red-500/10 text-red-400'
                      }`}
                    >
                      {isPump ? '⚡ +' : '🚨 '}
                      {signal.percentage}%
                    </span>
                  </div>

                  {/* Подвал карточки импульса */}
                  <div className="mt-5 flex items-center justify-between border-t border-zinc-900/40 pt-2 text-[10px] font-medium text-zinc-500">
                    <span
                      className={`font-bold tracking-wider uppercase ${isPump ? 'text-cyan-500/70' : 'text-red-500/70'}`}
                    >
                      {isPump ? '📡 импульсный памп' : '🚨 резкий дамп'}
                    </span>
                    <span className="font-mono">
                      {formatTime(signal.created_at)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
