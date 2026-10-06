'use client';

import { useMemo } from 'react';
import { TrendBadge } from '@/shared/ui/TrendBadge';

interface MarketDataTimestampProps {
  isoTimestamp: string | null;
}

// Добавлен флаг hour12: false для принудительного 24-часового формата
const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

export const MarketDataTimestamp = ({
  isoTimestamp,
}: MarketDataTimestampProps) => {
  
  const formattedTime = useMemo(() => {
    console.log('timestamp', isoTimestamp);
    if (!isoTimestamp) return '--:--:--';

    try {
      const date = new Date(isoTimestamp);
      return isNaN(date.getTime()) ? '--:--:--' : timeFormatter.format(date);
    } catch {
      return '--:--:--';
    }
  }, [isoTimestamp]);

  return (
    <div className="flex animate-in items-center gap-1.5 duration-300 select-none fade-in">
      <span className="font-mono text-[11px] font-bold tracking-wider text-zinc-400 uppercase">
        Срез цен:
      </span>
      <TrendBadge variant="neutral" size="sm" suppressHydrationWarning>
        {formattedTime}
      </TrendBadge>
    </div>
  );
};
