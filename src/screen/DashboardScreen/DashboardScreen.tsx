import { getPortfolioData } from './model/getPortfolioData';
import { CyberHeading } from '@/shared/ui/CyberHeading';
import { Container } from '@/shared/ui/Container';
import { AssetsList } from './ui/AssetsList';
import { ResponsiveSidebar } from '@/shared/ui/ResponsiveSidebar';
import { Button } from '@/shared/ui/Button';
import { AddAssetsForm } from './ui/AddAssetsForm';

export const DashboardScreen = async () => {
  const formattedAssets = await getPortfolioData();

  return (
    <Container maxWidth="7xl">
      <div className="mb-8 flex items-center justify-between">
        <CyberHeading as="h1">
          Баланс и текущее состояние вашего крипто-портфеля
        </CyberHeading>
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
            <AddAssetsForm />
          </div>
        </ResponsiveSidebar>
      </div>
      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-5">
        <div className="md:col-span-2">
          <AssetsList assets={formattedAssets} />
        </div>

        <div className="md:col-span-3">
          <h1 className="text-xl font-black tracking-wider text-white uppercase">
            TEST
          </h1>
        </div>
      </div>
    </Container>
  );
};
