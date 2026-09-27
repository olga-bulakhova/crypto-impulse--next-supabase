import { Metadata } from 'next';
import { CryptoStoreManager } from '@/storage';
import { CoinDetailsScreen } from '@/screen/CoinDetailsScreen';

export const dynamic = 'force-dynamic';

interface CoinPageProps {
  params: Promise<{ coinId: string }>;
}

export async function generateMetadata({
  params,
}: CoinPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const coin = await CryptoStoreManager.getCoinById(resolvedParams.coinId);

  if (!coin) {
    return {
      title: 'Крипто-актив не найден | Crypto Impulse',
      description: 'Запрошенная криптовалюта отсутствует в кэше сканера.',
    };
  }

  return {
    title: `${coin.name} (${coin.symbol.toUpperCase()}) Живой курс: \$${coin.price.toLocaleString()} | Crypto Impulse`,
    description: `Детальная аналитика импульсов, капитализации и изменения цены ${coin.name} по таймфреймам на радаре аномалий Crypto Impulse.`,
  };
}

export default async function CoinPage({ params }: CoinPageProps) {
  const resolvedParams = await params;

  return <CoinDetailsScreen coinId={resolvedParams.coinId} />;
}
