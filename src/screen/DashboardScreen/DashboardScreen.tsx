import { revalidatePath } from 'next/cache';
import { getPortfolioData } from './model/getPortfolioData';
import { CyberHeading } from '@/shared/ui/CyberHeading';
import { Container } from '@/shared/ui/Container';
import { AssetsList } from './ui/AssetsList';
import { ResponsiveSidebar } from '@/shared/ui/ResponsiveSidebar';
import { Button } from '@/shared/ui/Button';
import { AddAssetsForm } from './ui/AddAssetsForm';
import { CryptoStoreManager } from '@/storage';
import { AssetsStorageManager } from '@/storage/assets/assetsStore';
import { EmptyAssetsState } from './ui/EmptyAssetsState';

/**
 * 🛸 СЕРВЕРНЫЙ ЭКРАН: Главная панель инвестора
 */
export const DashboardScreen = async () => {
  const [formattedAssets, coinOptions] = await Promise.all([
    getPortfolioData(),
    CryptoStoreManager.getCoinsForSelect(),
  ]);

  const handleDeleteAsset = async (transactionId: string) => {
    'use server';

    try {
      await AssetsStorageManager.deleteAssetById(transactionId);
      revalidatePath('/dashboard');
    } catch (error: unknown) {
      console.error('[SERVER_DELETE_ERROR] Сбой при удалении актива:', error);
    }
  };

  return (
    <Container maxWidth="7xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CyberHeading as="h1">
          Баланс и текущее состояние вашего крипто-портфеля
        </CyberHeading>

        <ResponsiveSidebar
          title="Добавить новый актив"
          description="Зафиксируйте объем и стоимость покупки монеты в вашем портфеле"
          trigger={
            <Button size="sm" variant="cyber">
              Добавить актив
            </Button>
          }
        >
          <div className="p-2">
            <AddAssetsForm coinOptions={coinOptions} />
          </div>
        </ResponsiveSidebar>
      </div>

      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-5">
        {/* Левая часть: Либо список активов, либо пустой экран-заглушка */}
        <div className="md:col-span-2">
          {formattedAssets.length > 0 ? (
            <AssetsList assets={formattedAssets} onDelete={handleDeleteAsset} />
          ) : (
            // 🟢 ИСПРАВЛЕНО: Выводим изолированный Empty State, если сделок нет!
            <EmptyAssetsState />
          )}
        </div>

        {/* Правая часть под будущие графики */}
        <div className="md:col-span-3"></div>
      </div>
    </Container>
  );
};
