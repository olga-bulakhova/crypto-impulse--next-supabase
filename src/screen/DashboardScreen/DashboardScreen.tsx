import { revalidatePath } from 'next/cache'; // 🌟 Импортируем утилиту мгновенного обновления кэша страниц
import { getPortfolioData } from './model/getPortfolioData';
import { CyberHeading } from '@/shared/ui/CyberHeading';
import { Container } from '@/shared/ui/Container';
import { AssetsList } from './ui/AssetsList';
import { ResponsiveSidebar } from '@/shared/ui/ResponsiveSidebar';
import { Button } from '@/shared/ui/Button';
import { AddAssetsForm } from './ui/AddAssetsForm';
import { CryptoStoreManager } from '@/storage';
import { AssetsStorageManager } from '@/storage/assets/assetsStore';

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
        <div className="md:col-span-2">
          <AssetsList assets={formattedAssets} onDelete={handleDeleteAsset} />
        </div>

        <div className="md:col-span-3"></div>
      </div>
    </Container>
  );
};
