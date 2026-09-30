'use client';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import type { FormattedAsset } from '../../model/getPortfolioData';
import { useMemo } from 'react';
import { formatCryptoPrice, hexToRgba } from '@/shared/lib';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PortfolioChartProps {
  assets: FormattedAsset[];
}

export const PortfolioChart = ({ assets }: PortfolioChartProps) => {
  const chartData = useMemo(() => {
    return {
      labels: assets.map((asset) => asset.symbol || asset.name || ''),
      datasets: [
        {
          label: 'Стоимость позиции',
          data: assets.map((asset) => asset.currentTotalAmount || 0),

          backgroundColor: assets.map((asset) =>
            asset.color
              ? hexToRgba(asset.color, 0.75)
              : 'rgba(39, 39, 42, 0.65)',
          ),

          hoverBackgroundColor: assets.map((asset) =>
            asset.color
              ? hexToRgba(asset.color, 0.85)
              : 'rgba(39, 39, 42, 0.85)',
          ),

          borderWidth: 0,
        },
      ],
    };
  }, [assets]);

  const chartOptions: ChartOptions<'pie'> = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom', // Переносим легенду вниз под круговую диаграмму [0.2]
          labels: {
            padding: 20,
            color: '#a1a1aa', // text-zinc-400 для идеального Web3-сочетания
            font: {
              family: 'monospace', // Переводим шрифты легенды в моноширинный формат [0.2]
              size: 11,
              weight: 'bold',
            },
            boxWidth: 10,
            boxHeight: 10,
            useBorderRadius: true,
            borderRadius: 3,
          },
        },
        tooltip: {
          backgroundColor: 'rgba(9, 9, 11, 0.85)',
          borderColor: 'rgba(39, 39, 42, 0.4)',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 12,
          bodyFont: {
            family: 'monospace',
            size: 11,
          },
          callbacks: {
            label: (context) => {
              const value = context.parsed || 0;
              return ` Доля: ${formatCryptoPrice(value)}`;
            },
          },
        },
      },
    };
  }, []);

  return <Pie data={chartData} options={chartOptions} />;
};
