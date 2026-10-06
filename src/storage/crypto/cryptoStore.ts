// import { coinApi } from '@/shared/api/coin-api';
// import type { CoinItem } from './cryptoTypes';
// import { CACHE_TAGS } from '@/shared/constants';

// export interface SelectOption {
//   label: string;
//   value: string;
//   livePrice: number;
// }

// let lastScanTime: string | null = null;

// export const CryptoStoreManager = {
//   async getCachedCoins(): Promise<CoinItem[]> {
//     try {
//       const response = await coinApi.getAll();
//       const data = response.result || [];

//       if (data.length > 0) {
//         lastScanTime = new Date().toISOString();
//       }

//       return data;
//     } catch (error: unknown) {
//       const errorMessage =
//         error instanceof Error ? error.message : String(error);
//       console.error(
//         '[GLOBAL_STORE_FETCH_ERROR] Не удалось прогреть Next.js кэш котировок:',
//         errorMessage,
//       );
//       return [];
//     }
//   },

//   async updateData(): Promise<CoinItem[]> {
//     console.log(
//       '[GLOBAL_STORE] Инициирован сброс Next.js Data Cache через revalidateTag...',
//     );
//     try {
//       const { revalidateTag } = await import('next/cache');

//       revalidateTag(CACHE_TAGS.CRYPTO_COINS, 'max');
//     } catch (error: unknown) {
//       const errorMessage =
//         error instanceof Error ? error.message : String(error);
//       console.error(
//         '[GLOBAL_STORE_UPDATE_ERROR] Не удалось принудительно инвалидировать тег кэша:',
//         errorMessage,
//       );
//     }
//     return this.getCachedCoins();
//   },

//   async getCoinById(id: string): Promise<CoinItem | null> {
//     if (!id) return null;

//     const allCoins = await this.getCachedCoins();
//     const searchId = id.toLowerCase();

//     return (
//       allCoins.find(
//         (coin) =>
//           coin.id.toLowerCase() === searchId ||
//           coin.symbol.toLowerCase() === searchId,
//       ) || null
//     );
//   },

//   async getCoinsForSelect(): Promise<SelectOption[]> {
//     const coins = await this.getCachedCoins();
//     return coins.map((coin) => ({
//       label: `${coin.name} (${coin.symbol.toUpperCase()})`,
//       value: coin.id.toLowerCase(),
//       livePrice: coin.price || 0,
//     }));
//   },

//   getLastScanTime(): string | null {
//     return lastScanTime;
//   },
// };

import { coinApi } from '@/shared/api/coin-api';
import type { CoinItem } from './cryptoTypes';

export interface SelectOption {
  label: string;
  value: string;
  livePrice: number;
}

export const CryptoStoreManager = {
  /**
   * Получает актуальный список монет (каждый раз выполняет новый запрос к API)
   */
  async getCachedCoins(): Promise<CoinItem[]> {
    try {
      const response = await coinApi.getAll();
      return response.result || [];
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        '[GLOBAL_STORE_FETCH_ERROR] Не удалось загрузить свежие котировки:',
        errorMessage,
      );
      return [];
    }
  },

  /**
   * Перенаправляет запрос на получение свежих данных (кэша больше нет)
   */
  async updateData(): Promise<CoinItem[]> {
    console.log('[GLOBAL_STORE] Прямой запрос свежих данных без кэша...');
    return this.getCachedCoins();
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
   * Возвращает метку времени совершения операции на сервере
   */
  getLastScanTime(): string {
    return new Date().toISOString();
  },
};

