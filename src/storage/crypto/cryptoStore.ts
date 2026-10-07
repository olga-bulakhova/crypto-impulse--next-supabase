import { updateTag } from 'next/cache';
import { coinApi } from '@/shared/api/coin-api';
import type { CoinItem } from './cryptoTypes';
import { CACHE_TAGS } from '@/shared/constants';

export interface SelectOption {
  label: string;
  value: string;
  livePrice: number;
}

export const CryptoStoreManager = {
  /**
   * Безопасное получение данных (берется из минутного кэша Next.js)
   */
  async getCachedCoins(): Promise<CoinItem[]> {
    try {
      const response = await coinApi.getAll();

      return response.result || [];
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        '[GLOBAL_STORE_FETCH_ERROR] Не удалось прочитать кэш котировок:',
        errorMessage,
      );
      return [];
    }
  },

  /**
   * 🚀 Принудительное обновление кэша по запросу пользователя (через Server Action)
   */
  async updateData(): Promise<void> {
    console.log(
      '[GLOBAL_STORE] Инициирован принудительный сброс 1-минутного кэша...',
    );
    updateTag(CACHE_TAGS.CRYPTO_COINS);
  },

  async getCoinById(id: string): Promise<CoinItem | null> {
    if (!id) return null;

    const allCoins = await this.getCachedCoins();
    const searchId = id.toLowerCase();

    return (
      allCoins.find(
        (coin) =>
          coin.id.toLowerCase() === searchId ||
          coin.symbol.toLowerCase() === searchId,
      ) || null
    );
  },

  async getCoinsForSelect(): Promise<SelectOption[]> {
    const coins = await this.getCachedCoins();
    return coins.map((coin) => ({
      label: `${coin.name} (${coin.symbol.toUpperCase()})`,
      value: coin.id.toLowerCase(),
      livePrice: coin.price || 0,
    }));
  },

  /**
   * Возвращает метку времени сканирования на сервере
   */
  getLastScanTime(): string {
    return new Date().toISOString();
  },
};
