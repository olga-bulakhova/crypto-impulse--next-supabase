import { getPortfolioData } from './model/getPortfolioData';
import { CyberHeading } from '@/shared/ui/CyberHeading';
import { Container } from '@/shared/ui/Container';
import { AssetList } from './ui/AssetList';

export const DashboardScreen = async () => {
  const formattedAssets = await getPortfolioData();

  return (
    <Container maxWidth="7xl">
      <CyberHeading as="h1" className="mb-8">
        Баланс и текущее состояние вашего крипто-портфеля
      </CyberHeading>

      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-5">
        <div className="md:col-span-2">
          <AssetList assets={formattedAssets} />
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
