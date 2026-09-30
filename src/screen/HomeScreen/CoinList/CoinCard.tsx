import { Avatar, AvatarImage } from '@/shared/ui/kit/avatar';
import { TrendBadge } from '@/shared/ui/TrendBadge';
import type { CoinItem } from '@/storage';

interface CoinCardProps {
  coin: CoinItem;
}

export const CoinCard = ({ coin }: CoinCardProps) => {
  const changePercentage = coin.priceChange1h || 0;
  const isPositive = changePercentage >= 0;
  const isFlat = changePercentage === 0;
  const variant =
    changePercentage === 0 ? 'neutral' : changePercentage > 0 ? 'up' : 'down';

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
        <Avatar className="transition-transform duration-200 group-hover:rotate-[12deg]">
          <AvatarImage src={coin.icon} alt={coin.name} />
        </Avatar>
        <div className="flex min-w-0 flex-col">
          <span className="font-mono text-xs font-black tracking-widest text-white uppercase transition-colors">
            {coin.symbol}
          </span>
          <span className="max-w-[65px] truncate text-[10px] font-medium tracking-wider text-zinc-500">
            {coin.name}
          </span>
        </div>
      </div>

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

        <TrendBadge variant={variant} size="sm">
          {changePercentage !== 0 && (
            <span>{changePercentage > 0 ? '▲' : '▼'}</span>
          )}
          <span>{Math.abs(changePercentage).toFixed(2)}%</span>
        </TrendBadge>
      </div>
    </div>
  );
};
