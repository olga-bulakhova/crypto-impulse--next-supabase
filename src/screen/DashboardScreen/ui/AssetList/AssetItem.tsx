import { Card } from '@/shared/ui/Card';
import { TrendBadge } from '@/shared/ui/TrendBadge';
import type { FormattedAsset } from '../../model/getPortfolioData';
import { Table, TableBody, TableCell, TableRow } from '@/shared/ui/kit/table';
import { formatCryptoPrice } from '@/shared/lib';
import { Avatar, AvatarImage } from '@/shared/ui/kit/avatar';

interface AssetItemProps {
  asset: FormattedAsset;
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

export const AssetItem = ({ asset }: AssetItemProps) => {
  const badgeVariant =
    asset.growPercent === 0 ? 'neutral' : asset.grow ? 'up' : 'down';

  return (
    <Card padding="sm">
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
