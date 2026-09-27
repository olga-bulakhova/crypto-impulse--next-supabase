import type { CoinItem } from '@/storage';

interface CoinCardProps {
  coin: CoinItem;
}

export const CoinCard = ({ coin }: CoinCardProps) => {
  const changePercentage = coin.priceChange1d || 0;
  const isPositive = changePercentage >= 0;
  const isFlat = changePercentage === 0;

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-lg border bg-zinc-900/20 p-3 tracking-wider backdrop-blur-md transition-all duration-300 ${
        isFlat
          ? 'border-zinc-900 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/[0.02]'
          : isPositive
            ? 'border-zinc-900 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/[0.02]'
            : 'border-zinc-900 hover:border-red-500/20 hover:shadow-lg hover:shadow-red-500/[0.02]'
      }`}
    >
      <span className="absolute top-2 right-2.5 font-mono text-[12px] font-bold text-zinc-700 transition-colors group-hover:text-zinc-500">
        #{coin.rank}
      </span>

      <div className="flex items-center gap-2.5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coin.icon}
          alt={coin.name}
          className="h-8 w-8 rounded-full border border-zinc-800/60 bg-zinc-900 object-cover transition-transform duration-300 group-hover:rotate-[12deg]"
          loading="lazy"
        />
        <div className="flex min-w-0 flex-col">
          <span className="font-mono text-xs font-black tracking-widest text-white uppercase transition-colors group-hover:text-cyan-400">
            {coin.symbol}
          </span>
          <span className="max-w-[65px] truncate text-[10px] font-medium tracking-wider text-zinc-500">
            {coin.name}
          </span>
        </div>
      </div>

      {/* НИЖНИЙ БЛОК: Стоимость + Живой процент изменения */}
      <div className="mt-4 flex items-end justify-between border-t border-zinc-900/40 pt-2">
        {/* Цена */}
        <span className="text-xs font-bold tracking-wider text-zinc-200">
          $
          {coin.price < 1
            ? coin.price.toFixed(4)
            : coin.price.toLocaleString('en-US', {
                maximumFractionDigits: 2,
              })}
        </span>

        {/* Изменение за 24 часа */}
        <span
          className={`flex items-center gap-1 rounded-md p-2 py-0.5 font-mono text-[11px] leading-none font-bold ${
            changePercentage === 0
              ? 'border border-amber-500/10 bg-amber-500/5 text-amber-500'
              : isPositive
                ? 'border border-cyan-500/10 bg-cyan-500/5 text-cyan-400'
                : 'border border-red-500/10 bg-red-500/5 text-red-400'
          }`}
        >
          {changePercentage !== 0 && (
            <span className="text-[11px]">{isPositive ? '▲' : '▼'}</span>
          )}
          <span>{Math.abs(changePercentage).toFixed(2)}%</span>
        </span>
      </div>
    </div>
  );
};
