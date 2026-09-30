import { Card } from '@/shared/ui/Card';
import { TrendBadge } from '@/shared/ui/TrendBadge';
import type { FormattedAsset } from '../../model/getPortfolioData';
import { Table, TableBody, TableCell, TableRow } from '@/shared/ui/kit/table';
import { formatCryptoPrice } from '@/shared/lib';
import { Avatar, AvatarImage } from '@/shared/ui/kit/avatar';
import { DeleteAssetButton } from './DeleteAssetButton'; // 🌟 Импортируем нашу кнопку с подтверждением

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
  const badgeVariant =
    asset.growPercent === 0 ? 'neutral' : asset.grow ? 'up' : 'down';

  return (
    <Card padding="sm" className="relative pr-2">
      <DeleteAssetButton
        assetId={asset.id}
        assetName={asset.name || asset.coinId}
        onDelete={onDelete}
      />

      <div
        className="flex items-center gap-3 pt-1 pl-4"
        style={{ color: `#${asset.color}` }}
      >
        <Avatar>
          <AvatarImage src={asset.icon} alt={asset.name} />
        </Avatar>

        <span className="text-lg font-bold">{asset.name}</span>
      </div>

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
    </Card>
  );
};
