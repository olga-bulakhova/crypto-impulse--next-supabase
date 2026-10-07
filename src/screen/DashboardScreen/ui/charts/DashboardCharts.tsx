'use client';

import dynamic from 'next/dynamic';
import { CyberHeading } from '@/shared/ui/CyberHeading';
import type { FormattedAsset } from '../../model/getPortfolioData';

const DynamicPortfolioChart = dynamic(
  () => import('./PortfolioChart').then((mod) => mod.PortfolioChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-[250px] w-full max-w-[450px] animate-pulse rounded-xl bg-zinc-900/50" />
    ),
  },
);

const DynamicPortfolioProfitChart = dynamic(
  () =>
    import('./PortfolioProfitChart').then((mod) => mod.PortfolioProfitChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-[300px] w-full animate-pulse rounded-xl bg-zinc-900/50" />
    ),
  },
);

interface DashboardChartsProps {
  assets: FormattedAsset[];
}

export const DashboardCharts = ({ assets }: DashboardChartsProps) => {
  return (
    <div className="mt-8 flex flex-col gap-10">
      <div className="max-w-[450px]">
        <CyberHeading as="h3" className="text-3xs mb-6 text-zinc-500">
          Аллокация активов
        </CyberHeading>
        <DynamicPortfolioChart assets={assets} />
      </div>

      <div>
        <CyberHeading as="h3" className="text-3xs mb-6 text-zinc-500">
          Чистый профит и убыток (PnL)
        </CyberHeading>
        <DynamicPortfolioProfitChart assets={assets} />
      </div>
    </div>
  );
};
