import { TrendBadge } from '@/shared/ui/TrendBadge';
import type { CoinItem } from '@/storage';

interface CoinHeaderProps {
  coin: CoinItem;
}

export const CoinHeader = ({ coin }: CoinHeaderProps) => {
  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/30 p-6 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Блок имени и логотипа */}
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coin.icon}
            alt={coin.name}
            className="h-12 w-12 rounded-full border border-zinc-800 bg-zinc-900 object-cover shadow-[0_0_20px_rgba(255,255,255,0.02)]"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1
                className="text-xl font-black tracking-wider uppercase"
                // 🟢 ИСПРАВЛЕНО: Динамически красим заголовок в фирменный цвет монеты из API.
                // Если цвета в API нет, подставляется наш красивый кибер-желтый бренд-цвет!
                style={{
                  color: coin.color
                    ? `#${coin.color}`
                    : 'var(--color-brand-yellow)',
                }}
              >
                {coin.name}
              </h1>

              <TrendBadge variant="up" size="md">
                {coin.symbol}
              </TrendBadge>
            </div>
            <span className="mt-1 font-mono text-sm font-bold tracking-wide text-zinc-500">
              Глобальный ранг на рынке:{' '}
              <span className="text-zinc-400">#{coin.rank}</span>
            </span>
          </div>
        </div>

        {/* Блок цены в USD и BTC */}
        <div className="flex flex-col sm:items-end">
          <span className="font-mono text-2xl font-black tracking-tight text-zinc-100">
            $
            {coin.price < 1
              ? coin.price.toFixed(6)
              : coin.price.toLocaleString('en-US', {
                  maximumFractionDigits: 2,
                })}
          </span>
          <span className="mt-1 font-mono text-sm font-bold tracking-wide text-zinc-500">
            Эквивалент в BTC:{' '}
            <span className="text-zinc-400">{coin.priceBtc ?? '1.00'} BTC</span>
          </span>
        </div>
      </div>
    </div>
  );
};
