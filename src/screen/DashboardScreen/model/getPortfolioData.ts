import { CryptoStoreManager } from '@/storage';
import type { CoinItem } from '@/storage';
import { AssetsStorageManager } from '@/storage/assets/assetsStore';
import type { Asset } from '@/storage/assets/assetsTypes';

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

export async function getPortfolioData(): Promise<FormattedAsset[]> {
  const [coins, liveAssets] = await Promise.all([
    CryptoStoreManager.getCachedCoins(),
    AssetsStorageManager.getAssets(),
  ]);

  const coinsMap = new Map<string, CoinItem>(
    coins.map((coin) => [coin.id.toLowerCase(), coin]),
  );

  return liveAssets.map((asset) => {
    const coin = coinsMap.get(asset.coinId.toLowerCase());

    const currentPrice = coin?.price ?? 0;

    const coinSymbol =
      coin?.symbol?.toUpperCase() || asset.coinId.toUpperCase();

    let isGrowing = false;
    let growPercent = 0;

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
      name: coin?.name || asset.coinId,
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

export async function getPortfolioTotalCost(): Promise<number> {
  try {
    const formattedAssets = await getPortfolioData();

    const totalCost = formattedAssets.reduce((accumulator, asset) => {
      return accumulator + (asset.currentTotalAmount || 0);
    }, 0);

    return Number(totalCost.toFixed(2));
  } catch (error: unknown) {
    console.error(
      '[GET_PORTFOLIO_TOTAL_COST_ERROR] Сбой расчета баланса:',
      error,
    );
    return 0;
  }
}
