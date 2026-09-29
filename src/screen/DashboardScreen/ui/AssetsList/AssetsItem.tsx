'use client';

import { useState } from 'react';
import { Card } from '@/shared/ui/Card';
import { TrendBadge } from '@/shared/ui/TrendBadge';
import type { FormattedAsset } from '../../model/getPortfolioData';
import { Table, TableBody, TableCell, TableRow } from '@/shared/ui/kit/table';
import { formatCryptoPrice } from '@/shared/lib';
import { Avatar, AvatarImage } from '@/shared/ui/kit/avatar';
import { Button } from '@/shared/ui/Button'; // Используем нашу готовую стеклянную кнопку
import { TrashIcon } from '@/shared/icons';

interface AssetItemProps {
  asset: FormattedAsset;
  onDelete?: (id: string) => Promise<void> | void; // 🟢 ДОБАВЛЕНО: Строго типизированный колбэк удаления
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
      <TableCell className="w-1/2 text-zinc-400">{label}</TableCell>
      <TableCell className="w-1/2 text-right font-mono text-sm text-white">
        {children}
      </TableCell>
    </TableRow>
  );
};

export const AssetsItem = ({ asset, onDelete }: AssetItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const badgeVariant =
    asset.growPercent === 0 ? 'neutral' : asset.grow ? 'up' : 'down';

  const handleDeleteClick = async () => {
    if (!onDelete) return;
    try {
      setIsDeleting(true);
      await onDelete(asset.id); // Вызываем колбэк с UUID транзакции
    } catch (error: unknown) {
      console.error('[DELETE_ASSET_ERROR]', error);
      setIsDeleting(false); // Сбрасываем лоадер в случае сбоя
    }
  };

  return (
    /* 🟢 ИСПРАВЛЕНО: Добавлен исключительно класс relative для привязки угла, ваши исходные паддинги сохранены */
    <Card padding="sm" className="relative pr-2">
      {/* 🟢 ДОБАВЛЕНО: Стеклянная кнопка-корзина в правом верхнем углу.
          Она идеально отцентрирована абсолютно, не ломает текущие строки и содержит асинхронный лоадер-спиннер! */}

      <Button
        type="button"
        variant="danger"
        size="sm"
        onClick={handleDeleteClick}
        isLoading={isDeleting}
        className="absolute top-3 right-3 !size-7 rounded-lg !p-0 opacity-60 transition-all duration-200 hover:opacity-100"
        aria-label="Удалить транзакцию"
      >
        <TrashIcon className="size-3.5 stroke-[2.2]" />
      </Button>

      {/* Ваша исходная нетронутая верстка шапки монеты */}
      <div
        className="flex items-center gap-3 pt-1 pl-4"
        style={{ color: `#${asset.color}` }}
      >
        <Avatar>
          <AvatarImage src={asset.icon} alt={asset.name} />
        </Avatar>

        <span className="text-lg font-bold">{asset.name}</span>
      </div>

      {/* Ваша исходная нетронутая таблица с метриками */}
      <Table>
        <TableBody>
          <TableItem label="Объем">{asset.amount}</TableItem>
          <TableItem label="Цена покупки">
            {formatCryptoPrice(asset.price)}
          </TableItem>
          <TableItem label="Текущий курс">
            {formatCryptoPrice(asset.currentPrice)}
          </TableItem>
          <TableItem label="Текущая стоимость">
            {formatCryptoPrice(asset.currentTotalAmount)}
          </TableItem>
          <TableItem label="Прибыль">
            <div className="flex items-center justify-end gap-2">
              <TrendBadge variant={badgeVariant} size="md">
                {asset.growPercent !== 0 && (
                  <span>{asset.grow ? '▲' : '▼'}</span>
                )}
                <span>{asset.growPercent}%</span>
              </TrendBadge>
              <span
                className={
                  asset.totalProfit >= 0
                    ? 'font-bold text-brand-blue'
                    : 'font-bold text-brand-red'
                }
              >
                {formatCryptoPrice(asset.totalProfit)}
              </span>
            </div>
          </TableItem>
        </TableBody>
      </Table>
    </Card>
  );
};
