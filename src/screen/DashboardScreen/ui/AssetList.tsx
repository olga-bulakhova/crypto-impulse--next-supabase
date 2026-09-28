import type { FormattedAsset } from '../model/getPortfolioData';
import { AssetItem } from './AssetItem';

interface AssetListProps {
  assets: FormattedAsset[];
}

export const AssetList = ({ assets }: AssetListProps) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      {assets.map((asset: FormattedAsset) => (
        <AssetItem key={asset.id} asset={asset} />
      ))}
    </div>
  );
};
