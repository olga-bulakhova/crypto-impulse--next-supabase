import type { CoinItem } from '@/storage';
import { Table, TableBody, TableCell, TableRow } from '@/shared/ui/kit/table';
import { TrendBadge, type TrendBadgeVariant } from '@/shared/ui/TrendBadge';

interface CoinTimeframesProps {
  coin: CoinItem;
}

export const CoinTimeframes = ({ coin }: CoinTimeframesProps) => {
  const timeframes = [
    { label: 'За 1 час', value: coin.priceChange1h || 0 },
    { label: 'За 24 часа', value: coin.priceChange1d || 0 },
    { label: 'За 1 неделю', value: coin.priceChange1w || 0 },
    { label: 'За 1 месяц', value: coin.priceChange1m || 0 },
  ];

  const riskValue = coin.riskScore || 0;

  let riskLabel = 'Низкий риск';
  let riskVariant: TrendBadgeVariant = 'up'; // Бирюзовый цвет для безопасности

  if (riskValue > 60) {
    riskLabel = 'Высокий риск';
    riskVariant = 'down'; // Алый цвет для высокой опасности
  } else if (riskValue > 30) {
    riskLabel = 'Средний риск';
    riskVariant = 'neutral'; // Янтарный цвет для умеренного риска
  }

  return (
    <div className="rounded-xl border border-zinc-900 bg-zinc-950/20 px-1 py-5 backdrop-blur-md md:px-5">
      <h3 className="font-bolder mb-4 pb-2 pl-4 text-sm tracking-wider text-zinc-400 uppercase">
        Изменение стоимости по таймфреймам
      </h3>

      <Table>
        <TableBody>
          {timeframes.map((tf, index) => {
            const changeVal = tf.value || 0;
            const isFlat = changeVal === 0; // 🌟 Фиксируем состояние стабильного флэта (0.0%)
            const isPositive = changeVal > 0;

            return (
              <TableRow key={index} className="w-full">
                <TableCell className="w-1/2 text-zinc-400">
                  {tf.label}
                </TableCell>
                <TableCell
                  // 🟢 ИСПРАВЛЕНО: Раскладываем цвет текста на три независимых состояния палитры Vega
                  className={`w-1/2 items-center gap-0.5 text-right font-mono text-sm font-black ${
                    isFlat
                      ? 'text-brand-yellow' // Чистый желтый для флэта
                      : isPositive
                        ? 'text-brand-blue' // Бирюзовый для роста
                        : 'text-red-400' // Алый для падения
                  }`}
                >
                  {/* 🟢 ИСПРАВЛЕНО: Стрелочка отображается только тогда, когда цена изменилась (не равна 0) */}
                  {!isFlat && (
                    <span className="pr-2">{isPositive ? '▲' : '▼'}</span>
                  )}

                  <span>{Math.abs(changeVal).toFixed(2)}%</span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="mt-5 flex items-start justify-between gap-3 px-4 pt-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[11px] font-bold tracking-wider text-zinc-500 uppercase">
            Оценка безопасности актива{' '}
            <span className="text-white">[{riskValue.toFixed(1)}]</span>
          </span>
          <span className="font-sans text-[11px] tracking-wide text-zinc-600">
            Интегральный скоринг волатильности и ликвидности
          </span>
        </div>

        {/* Декларативно вызываем наш бейдж, передавая контент в children */}
        <TrendBadge variant={riskVariant} size="md">
          <div>
            <div className="font-sans text-xs font-extrabold tracking-wider whitespace-nowrap uppercase">
              <span>{riskLabel}</span>
            </div>
          </div>
        </TrendBadge>
      </div>
    </div>
  );
};
