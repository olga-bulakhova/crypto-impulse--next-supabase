import { FormattedAsset } from '../../model/getPortfolioData';
import { AssetsItem } from './AssetsItem';

interface AssetsListProps {
  assets: FormattedAsset[];
  onDelete: (id: string) => Promise<void>; // 🟢 ДОБАВЛЕНО: Строгий тип функции удаления для Server Action
}

/**
 * 🛸 UI КОМПОНЕНТ: Сетка карточек активов крипто-портфеля
 */
export const AssetsList = ({ assets, onDelete }: AssetsListProps) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      {assets.map((asset: FormattedAsset, index: number) => {
        const uniqueKey = `${asset.id}-${asset.date instanceof Date ? asset.date.toISOString() : String(asset.date)}-${index}`;

        return (
          <AssetsItem
            key={uniqueKey}
            asset={asset}
            onDelete={onDelete} // 🟢 ИСПРАВЛЕНО: Прокидываем колбэк удаления прямо в карточку с корзиной!
          />
        );
      })}
    </div>
  );
};
