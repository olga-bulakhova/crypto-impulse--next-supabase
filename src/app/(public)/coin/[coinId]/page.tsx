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
      title: 'Крипто-актив не найден | Crypto Analise',
      description:
        'Запрошенная криптовалюта отсутствует в оперативной памяти аналитического шлюза.',
    };
  }

  const formattedPrice = coin.price
    ? coin.price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
      })
    : '0.00';

  return {
    title: `${coin.name} (${coin.symbol.toUpperCase()}) | Курс: \$${formattedPrice} — Аналитика Crypto Analise`,
    description: `Глубокий математический анализ котировок, рыночной капитализации и волатильности ${coin.name} (${coin.symbol.toUpperCase()}). Инструменты моделирования структуры аллокации и аудита PnL-эффективности позиций.`,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CoinPage({ params }: CoinPageProps) {
  const resolvedParams = await params;

  return <CoinDetailsScreen coinId={resolvedParams.coinId} />;
}
