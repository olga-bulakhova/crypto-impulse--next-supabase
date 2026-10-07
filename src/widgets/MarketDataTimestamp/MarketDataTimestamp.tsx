'use client';

import { useMemo, useState, useEffect } from 'react';
import { TrendBadge } from '@/shared/ui/TrendBadge';

interface MarketDataTimestampProps {
  isoTimestamp: string | null;
}

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

export const MarketDataTimestamp = ({
  isoTimestamp,
}: MarketDataTimestampProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    (async () => {
      setIsMounted(true);
    })();
  }, []);

  const formattedTime = useMemo(() => {
    if (!isMounted || !isoTimestamp) return '--:--:--';

    try {
      const date = new Date(isoTimestamp);
      return isNaN(date.getTime()) ? '--:--:--' : timeFormatter.format(date);
    } catch {
      return '--:--:--';
    }
  }, [isoTimestamp, isMounted]);

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
