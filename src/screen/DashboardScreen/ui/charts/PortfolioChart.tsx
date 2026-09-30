'use client';

import { useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import type { FormattedAsset } from '../../model/getPortfolioData';
import { formatCryptoPrice, hexToRgba } from '@/shared/lib';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PortfolioChartProps {
  assets: FormattedAsset[];
}

export const PortfolioChart = ({ assets }: PortfolioChartProps) => {
  const chartData = useMemo(() => {
    const groupedMap = new Map<
      string,
      {
        symbol: string;
        name: string;
        color: string | undefined;
        totalAmount: number;
      }
    >();

    assets.forEach((asset) => {
      const key = asset.coinId.toLowerCase();
      const existing = groupedMap.get(key);
      const amount = asset.currentTotalAmount || 0;

      if (existing) {
        existing.totalAmount = Number(
          (existing.totalAmount + amount).toFixed(2),
        );
      } else {
        groupedMap.set(key, {
          symbol: asset.symbol || asset.coinId.toUpperCase(),
          name: asset.name || asset.coinId,
          color: asset.color,
          totalAmount: amount,
        });
      }
    });

    const uniqueAssets = Array.from(groupedMap.values());

    return {
      labels: uniqueAssets.map((asset) => asset.symbol || asset.name || ''),
      datasets: [
        {
          label: 'Стоимость позиции',
          data: uniqueAssets.map((asset) => asset.totalAmount),

          backgroundColor: uniqueAssets.map((asset) =>
            asset.color
              ? hexToRgba(asset.color, 0.75)
              : 'rgba(39, 39, 42, 0.65)',
          ),

          hoverBackgroundColor: uniqueAssets.map((asset) =>
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
          position: 'bottom',
          labels: {
            padding: 20,
            color: '#a1a1aa',
            font: {
              family: 'monospace',
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
