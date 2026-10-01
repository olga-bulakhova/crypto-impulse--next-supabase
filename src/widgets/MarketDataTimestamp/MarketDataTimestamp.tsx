import { TrendBadge } from '@/shared/ui/TrendBadge';

interface MarketDataTimestampProps {
  isoTimestamp: string | null;
}

export const MarketDataTimestamp = ({
  isoTimestamp,
}: MarketDataTimestampProps) => {
  const formattedTime = isoTimestamp
    ? new Date(isoTimestamp).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : '--:--:--';

  return (
    <div className="flex animate-in items-center gap-1.5 duration-300 select-none fade-in">
      <span className="font-mono text-[11px] font-bold tracking-wider text-zinc-400 uppercase">
        Срез цен:
      </span>
      <TrendBadge variant="neutral" size="sm">
        {formattedTime}
      </TrendBadge>
    </div>
  );
};
