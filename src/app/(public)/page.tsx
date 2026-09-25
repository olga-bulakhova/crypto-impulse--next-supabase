import React from 'react';

export default function HomePage() {
  // Те же фейковые сигналы, но адаптированные под кибер-синюю эстетику
  const mockSignals = [
    {
      id: '1',
      symbol: 'SOL',
      name: 'Solana',
      type: 'pump',
      percent: '+8.42%',
      price: '\$182.40',
      time: '1 мин. назад',
    },
    {
      id: '2',
      symbol: 'XRP',
      name: 'Ripple',
      type: 'dump',
      percent: '-5.14%',
      price: '\$1.12',
      time: '4 мин. назад',
    },
    {
      id: '3',
      symbol: 'AVAX',
      name: 'Avalanche',
      type: 'pump',
      percent: '+4.20%',
      price: '\$34.80',
      time: '12 мин. назад',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 font-sans">
      {/* 📊 СЕКЦИЯ ИНДИКАТОРОВ */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-900 bg-zinc-900/10 p-5 shadow-lg backdrop-blur-sm">
          <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            Fear & Greed Index
          </h3>
          <p className="mt-2 font-mono text-2xl font-black text-amber-500">
            65{' '}
            <span className="font-sans text-sm font-medium text-zinc-400">
              / Жадность 📈
            </span>
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-900 bg-zinc-900/10 p-5 backdrop-blur-sm">
          <h3 className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">
            BTC Dominance
          </h3>
          <p className="mt-2 font-mono text-2xl font-black text-white">
            58.4%{' '}
            <span className="font-sans text-sm font-medium text-zinc-400">
              👑
            </span>
          </p>
        </div>

        {/* 🌟 ОБНОВЛЕНО: Виджет активных радаров перекрашен в электрический кибер-синий */}
        <div className="rounded-2xl border border-cyan-900/30 bg-cyan-950/5 p-5 shadow-lg shadow-cyan-500/[0.02] backdrop-blur-sm">
          <h3 className="text-[10px] font-bold tracking-widest text-cyan-400/80 uppercase">
            Активные Импульсы
          </h3>
          <p className="mt-2 font-mono text-2xl font-black text-cyan-400">
            3{' '}
            <span className="font-sans text-sm font-medium text-zinc-400">
              живых радара 🌐
            </span>
          </p>
        </div>
      </div>

      {/* ⚡ ЛЕНТА СИГНАЛОВ */}
      <div className="border-t border-zinc-900/60 pt-6">
        <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-black tracking-tight text-white">
              Живой поток аномалий рынка
            </h2>
            <p className="mt-0.5 text-xs text-zinc-500">
              Импульсы обновляются в реальном времени без перезагрузки экрана
            </p>
          </div>
          {/* 🌟 ОБНОВЛЕНО: Пульсирующий индикатор живого подключения к Supabase стал кибер-синим */}
          <div className="flex w-fit items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 text-[10px] font-semibold text-cyan-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
            </span>
            LIVE CONNECTED
          </div>
        </div>

        {/* СЕТКА СИГНАЛОВ */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockSignals.map((signal) => {
            const isPump = signal.type === 'pump';

            return (
              <div
                key={signal.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-4 transition-all duration-300 hover:scale-[1.01] ${
                  isPump
                    ? // 🌟 Стили для Пампа: кибер-синие границы и мягкое неоновое синее свечение
                      'border-cyan-900/40 bg-gradient-to-br from-zinc-900/40 to-cyan-950/10 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/[0.04]'
                    : // Стили для Дампа: багрово-красные оттенки
                      'border-red-950/40 bg-gradient-to-br from-zinc-900/40 to-red-950/5 hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/[0.03]'
                }`}
              >
                {/* Верхняя часть карточки */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-bold text-white">
                        {signal.symbol}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {signal.name}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-sm text-zinc-400">
                      {signal.price}
                    </p>
                  </div>

                  {/* Процентный бейдж импульса */}
                  <span
                    className={`rounded-lg px-2 py-0.5 font-mono text-xs font-bold ${
                      isPump
                        ? 'border border-cyan-500/20 bg-cyan-500/10 text-cyan-400'
                        : 'border border-red-500/20 bg-red-500/10 text-red-400'
                    }`}
                  >
                    {isPump ? '⚡ ' : '🚨 '}
                    {signal.percent}
                  </span>
                </div>

                {/* Подвал карточки */}
                <div className="mt-4 flex items-center justify-between border-t border-zinc-900/40 pt-2 text-[10px] font-medium text-zinc-500">
                  <span
                    className={`font-bold tracking-wider uppercase ${isPump ? 'text-cyan-500/70' : 'text-red-500/70'}`}
                  >
                    {isPump ? '📡 импульсный памп' : '🚨 резкий дамп'}
                  </span>
                  <span>{signal.time}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
