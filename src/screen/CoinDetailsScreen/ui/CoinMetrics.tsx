import type { CoinItem } from '@/storage';
import { Table, TableBody, TableCell, TableRow } from '@/shared/ui/kit/table';
import { Card } from '@/shared/ui/Card';
import { CyberHeading } from '@/shared/ui/CyberHeading';

interface CoinMetricsProps {
  coin: CoinItem;
}

export const CoinMetrics = ({ coin }: CoinMetricsProps) => {
  const metrics = [
    {
      label: 'Капитализация (Market Cap)',
      value: coin.marketCap
        ? `\$${coin.marketCap.toLocaleString('en-US')}`
        : '—',
    },
    {
      label: 'Объем торгов (24h Volume)',
      value: coin.volume ? `\$${coin.volume.toLocaleString('en-US')}` : '—',
    },
    {
      label: 'Доступная эмиссия',
      value: coin.availableSupply
        ? `${coin.availableSupply.toLocaleString('en-US')} ${coin.symbol}`
        : '—',
    },
    // 🟢 ДОБАВЛЕНО: Исторический максимум (All Time High) с умным округлением
    {
      label: 'Исторический максимум (ATH)',
      value: coin.allTimeHigh
        ? `\$${coin.allTimeHigh < 1 ? coin.allTimeHigh.toFixed(4) : coin.allTimeHigh.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
        : '—',
    },
    // 🟢 ДОБАВЛЕНО: Исторический минимум (All Time Low) с умным округлением
    {
      label: 'Исторический минимум (ATL)',
      value: coin.allTimeLow
        ? `\$${coin.allTimeLow < 1 ? coin.allTimeLow.toFixed(4) : coin.allTimeLow.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
        : '—',
    },
    // 🟢 ДОБАВЛЕНО: Среднее скользящее изменение цены (Average Change)
    {
      label: 'Среднее изменение цены',
      value: coin.avgChange
        ? `${coin.avgChange >= 0 ? '+' : ''}${coin.avgChange.toFixed(2)}%`
        : '—',
    },
    {
      label: 'Индекс ликвидности',
      value: coin.liquidityScore
        ? `${coin.liquidityScore.toFixed(1)} / 100`
        : '—',
    },
  ];

  return (
    <Card padding="md">
      <div>
        <CyberHeading className="mb-4 pb-2 pl-4">Рыночные метрики</CyberHeading>

        <Table>
          <TableBody>
            {metrics.map((metric, index) => {
              return (
                <TableRow key={index} className="w-full">
                  <TableCell className="w-1/2 text-zinc-400">
                    {metric.label}
                  </TableCell>
                  <TableCell className="w-1/2 text-right font-mono text-sm text-white">
                    {metric.value}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
