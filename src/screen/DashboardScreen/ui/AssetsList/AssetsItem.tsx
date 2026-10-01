'use client';

import { useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { TrendBadge } from '@/shared/ui/TrendBadge';
import type { FormattedAsset } from '../../model/getPortfolioData';
import { Table, TableBody, TableCell, TableRow } from '@/shared/ui/kit/table';
import { formatCryptoPrice } from '@/shared/lib';
import { Avatar, AvatarImage } from '@/shared/ui/kit/avatar';
import { DeleteAssetButton } from './DeleteAssetButton';
import { ChevronDownIcon } from 'lucide-react'; // 🌟 Импортируем стрелочку для индикации спойлера

interface AssetItemProps {
  asset: FormattedAsset;
  onDelete?: (id: string) => Promise<void> | void;
}

const TableItem = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <TableRow className="w-full">
      <TableCell className="w-1/3 text-zinc-400">{label}</TableCell>
      <TableCell className="w-2/3 text-right font-mono text-sm text-white">
        {children}
      </TableCell>
    </TableRow>
  );
};

export const AssetsItem = ({ asset, onDelete }: AssetItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const badgeVariant =
    asset.growPercent === 0 ? 'neutral' : asset.grow ? 'up' : 'down';

  return (
    <Card
      padding="sm"
      className="relative overflow-hidden transition-all duration-300"
    >
      <DeleteAssetButton
        assetId={asset.id}
        assetName={asset.name || asset.coinId}
        onDelete={onDelete}
      />

      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="group/header flex cursor-pointer items-center justify-between pt-1 pr-10 pl-2 select-none"
        style={{ color: `#${asset.color}` }}
        role="button"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <Avatar size="sm">
            <AvatarImage src={asset.icon} alt={asset.name} />
          </Avatar>

          <span className="text-sm font-bold transition-colors duration-200 group-hover/header:text-zinc-200">
            {asset.name}
          </span>
        </div>

        <ChevronDownIcon
          className={`size-5 text-zinc-500 transition-transform duration-300 ease-in-out ${
            isExpanded
              ? 'rotate-180 text-zinc-300'
              : 'group-hover/header:text-zinc-400'
          }`}
        />
      </div>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <Table>
            <TableBody>
              <TableItem label="Объем">{asset.amount}</TableItem>

              <TableItem label="Курс (Вход / Рынок)">
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <TrendBadge variant="neutral" size="sm">
                    {formatCryptoPrice(asset.price)}
                  </TrendBadge>

                  <TrendBadge variant={badgeVariant} size="sm">
                    <span>{formatCryptoPrice(asset.currentPrice)}</span>
                  </TrendBadge>
                </div>
              </TableItem>

              <TableItem label="Текущая стоимость">
                <TrendBadge variant="neutral" size="sm">
                  {formatCryptoPrice(asset.currentTotalAmount)}
                </TrendBadge>
              </TableItem>
              <TableItem label="Прибыль">
                <div className="flex items-center justify-end gap-2">
                  <span
                    className={
                      asset.totalProfit >= 0
                        ? 'font-bold text-brand-blue'
                        : 'font-bold text-brand-red'
                    }
                  >
                    {formatCryptoPrice(asset.totalProfit)}
                  </span>
                  <TrendBadge variant={badgeVariant} size="sm">
                    {asset.growPercent !== 0 && (
                      <span>{asset.grow ? '▲' : '▼'}</span>
                    )}
                    <span>{asset.growPercent}%</span>
                  </TrendBadge>
                </div>
              </TableItem>
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};
