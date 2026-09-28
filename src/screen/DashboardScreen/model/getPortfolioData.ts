import { CryptoStoreManager } from '@/storage';
import type { CoinItem } from '@/storage';

export interface Asset {
  id: string;
  amount: number;
  price: number; // Цена покупки актива
  date: Date;
}

export interface FormattedAsset extends Asset {
  name: string | undefined;
  color: string | undefined;
  symbol: string;
  grow: boolean;
  growPercent: number;
  currentPrice: number;
  totalAmount: number;
  currentTotalAmount: number;
  totalProfit: number;
  icon: string;
}

// Временный мок данных активов
const assets: Asset[] = [
  {
    id: 'bitcoin',
    amount: 0.02,
    price: 75244,
    date: new Date(),
  },
  {
    id: 'ethereum',
    amount: 5,
    price: 2700,
    date: new Date(),
  },
];

const getAssets = (): Promise<Asset[]> => Promise.resolve(assets);

/**
 * 🤖 СЕРВЕРНАЯ ФУНКЦИЯ ТРАНСФОРМАЦИИ: Полный расчет доходности портфеля
 * Спецификация: Чистая серверная утилита бизнес-логики (БЕЗ использования use...) [5.2].
 */
export async function getPortfolioData(): Promise<FormattedAsset[]> {
  // 1. Параллельно извлекаем кэшированные монеты и список активов пользователя [5.2]
  const [coins, liveAssets] = await Promise.all([
    CryptoStoreManager.getCachedCoins(),
    getAssets(),
  ]);

  // Переводим массив монет в Map для мгновенного поиска за O(1)
  const coinsMap = new Map<string, CoinItem>(
    coins.map((coin) => [coin.id.toLowerCase(), coin]),
  );

  // 📊 2. Трансформируем активы с расчетом доходности
  return liveAssets.map((asset) => {
    const coin = coinsMap.get(asset.id.toLowerCase());
    const currentPrice = coin?.price ?? 0;
    const coinSymbol = coin?.symbol?.toUpperCase() || asset.id.toUpperCase();

    let isGrowing = false;
    let growPercent = 0;

    // Защита от деления на ноль и пустых значений
    if (currentPrice > 0 && asset.price > 0) {
      isGrowing = currentPrice > asset.price;
      growPercent = Math.abs(
        ((currentPrice - asset.price) / asset.price) * 100,
      );
    }

    const totalAmount = Number((asset.amount * asset.price).toFixed(2));
    const currentTotalAmount = Number((asset.amount * currentPrice).toFixed(2));

    return {
      ...asset,
      name: coin?.name || asset.id,
      icon: coin?.icon || '',
      color: coin?.color || 'ffffff',
      symbol: coinSymbol,
      grow: isGrowing,
      growPercent: Number(growPercent.toFixed(2)),
      currentPrice,
      totalAmount,
      currentTotalAmount,
      totalProfit: Number((currentTotalAmount - totalAmount).toFixed(2)),
    };
  });
}
