import { CryptoStoreManager } from '@/storage';
import { CoinHeader } from './ui/CoinHeader';
import { CoinTimeframes } from './ui/CoinTimeframes';
import { CoinMetrics } from './ui/CoinMetrics';
import { CoinNotFound } from './ui/CoinNotFound';
import { BackButton } from '@/shared/ui/BackButton';
import { Container } from '@/shared/ui/Container';

interface CoinDetailsScreenProps {
  coinId: string;
}

export const CoinDetailsScreen = async ({ coinId }: CoinDetailsScreenProps) => {
  const coin = await CryptoStoreManager.getCoinById(coinId);

  if (!coin) {
    return <CoinNotFound coinId={coinId} />;
  }
  return (
    <Container maxWidth="6xl">
      <div className="mb-6 px-1">
        <BackButton />
      </div>

      <CoinHeader coin={coin} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <CoinTimeframes coin={coin} />
        <CoinMetrics coin={coin} />
      </div>
    </Container>
  );
};
