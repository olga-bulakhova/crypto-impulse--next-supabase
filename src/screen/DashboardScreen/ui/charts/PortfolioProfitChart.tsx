'use client';

import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { formatCryptoPrice } from '@/shared/lib/utils/formatCryptoPrice';
import type { FormattedAsset } from '../../model/getPortfolioData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface PortfolioProfitChartProps {
  assets: FormattedAsset[];
}

export const PortfolioProfitChart = ({ assets }: PortfolioProfitChartProps) => {
  const processedData = useMemo(() => {
    const profitMap = new Map<string, { symbol: string; profit: number }>();

    assets.forEach((asset) => {
      const key = asset.coinId.toLowerCase();
      const existing = profitMap.get(key);
      const currentProfit = asset.totalProfit || 0;

      if (existing) {
        existing.profit = Number((existing.profit + currentProfit).toFixed(2));
      } else {
        profitMap.set(key, {
          symbol: asset.symbol || asset.coinId.toUpperCase(),
          profit: currentProfit,
        });
      }
    });

    const items = Array.from(profitMap.values());

    return {
      labels: items.map((i) => i.symbol),

      backgroundColors: items.map((i) =>
        i.profit >= 0
          ? 'rgba(34, 211, 238, 0.15)'
          : 'rgba(248, 113, 113, 0.15)',
      ),
      borderColors: items.map((i) =>
        i.profit >= 0 ? 'rgba(34, 211, 238, 0.4)' : 'rgba(248, 113, 113, 0.4)',
      ),
      profits: items.map((i) => i.profit),
    };
  }, [assets]);

  const chartData = useMemo(() => {
    return {
      labels: processedData.labels,
      datasets: [
        {
          label: 'Чистая прибыль / Убыток (USD)',
          data: processedData.profits,
          backgroundColor: processedData.backgroundColors,
          borderColor: processedData.borderColors,
          borderWidth: 1,
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    };
  }, [processedData]);

  const chartOptions: ChartOptions<'bar'> = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(9, 9, 11, 0.9)',
          borderColor: 'rgba(39, 39, 42, 0.5)',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 12,
          titleFont: { family: 'monospace', size: 12, weight: 'bold' },
          bodyFont: { family: 'monospace', size: 11 },
          callbacks: {
            label: (context) => {
              const value = context.parsed.y ?? 0;
              return ` PnL: ${value >= 0 ? '+' : ''}${formatCryptoPrice(value)}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: '#71717a',
            font: { family: 'monospace', size: 10, weight: 'bold' },
          },
        },

        y: {
          grid: {
            color: 'rgba(39, 39, 42, 0.3)',
          },
          ticks: {
            color: '#71717a',
            font: { family: 'monospace', size: 10 },
            callback: (value) => {
              return `\$${value}`;
            },
          },
        },
      },
    };
  }, []);

  return (
    <div className="relative h-[240px] w-full animate-in duration-500 fade-in">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};
