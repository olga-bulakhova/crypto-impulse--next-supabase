import { revalidatePath } from 'next/cache';
import {
  getPortfolioData,
  getPortfolioTotalCost,
} from './model/getPortfolioData';
import { CyberHeading } from '@/shared/ui/CyberHeading';
import { Container } from '@/shared/ui/Container';
import { AssetsList } from './ui/AssetsList';
import { ResponsiveSidebar } from '@/shared/ui/ResponsiveSidebar';
import { Button } from '@/shared/ui/Button';
import { AddAssetsForm } from './ui/AddAssetsForm';
import { CryptoStoreManager } from '@/storage';
import { AssetsStorageManager } from '@/storage/assets/assetsStore';
import { EmptyAssetsState } from './ui/EmptyAssetsState';
import { formatCryptoPrice } from '@/shared/lib';
import { DashboardCharts } from './ui/charts';

export const DashboardScreen = async () => {
  const [formattedAssets, coinOptions, totalPortfolioCost] = await Promise.all([
    getPortfolioData(),
    CryptoStoreManager.getCoinsForSelect(),
    getPortfolioTotalCost(),
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
    <Container maxWidth="6xl">
      <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
        <ResponsiveSidebar
          title="Добавить новый актив"
          description="Зафиксируйте объем и стоимость покупки монеты в вашем портфеле"
          trigger={
            <Button size="sm" variant="amber">
              Добавить актив
            </Button>
          }
        >
          <div className="p-2">
            <AddAssetsForm coinOptions={coinOptions} />
          </div>
        </ResponsiveSidebar>
      </div>

      {formattedAssets.length > 0 ? (
        <div className="flex flex-col gap-16 md:flex-row">
          <div className="w-full shrink-0 md:w-[394px]">
            <AssetsList assets={formattedAssets} onDelete={handleDeleteAsset} />
          </div>

          <div className="flex-1">
            <CyberHeading
              as="h2"
              className="mb-4 flex items-center gap-2 text-zinc-500"
            >
              <span>Общий баланс портфеля:</span>
              <span className="text-xl text-brand-blue">
                {formatCryptoPrice(totalPortfolioCost)}
              </span>
            </CyberHeading>

            <DashboardCharts assets={formattedAssets} />
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-6 w-full max-w-2xl">
          <EmptyAssetsState />
        </div>
      )}
    </Container>
  );
};
