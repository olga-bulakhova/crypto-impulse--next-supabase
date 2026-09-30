import { Avatar, AvatarImage } from '@/shared/ui/kit/avatar';
import { TrendBadge } from '@/shared/ui/TrendBadge';
import type { CoinItem } from '@/storage';

interface CoinHeaderProps {
  coin: CoinItem;
}

export const CoinHeader = ({ coin }: CoinHeaderProps) => {
  return (
    <div className="mb-7 flex flex-col gap-4 px-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={coin.icon} alt={coin.name} />
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1
              className="text-xl font-black tracking-wider uppercase"
              style={{
                color: coin.color
                  ? `#${coin.color}`
                  : 'var(--color-brand-yellow)',
              }}
            >
              {coin.name}
            </h1>

            <TrendBadge variant="neutral" size="md">
              {coin.symbol}
            </TrendBadge>
          </div>
          <span className="mt-1 font-mono text-sm font-bold tracking-wide text-zinc-500">
            Глобальный ранг на рынке:{' '}
            <span className="text-zinc-400">#{coin.rank}</span>
          </span>
        </div>
      </div>

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
  );
};
