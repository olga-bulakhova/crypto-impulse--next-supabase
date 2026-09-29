import type { FormattedAsset } from '../../model/getPortfolioData';
import { AssetsItem } from './AssetsItem';

interface AssetsListProps {
  assets: FormattedAsset[];
}

export const AssetsList = ({ assets }: AssetsListProps) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      {assets.map((asset: FormattedAsset, index: number) => {
        const uniqueKey = `${asset.id}-${asset.date instanceof Date ? asset.date.toISOString() : String(asset.date)}-${index}`;

        return <AssetsItem key={uniqueKey} asset={asset} />;
      })}
    </div>
  );
};
