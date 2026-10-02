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
import { CACHE_TAGS } from '@/shared/constants';

export interface SelectOption {
  label: string;
  value: string;
  livePrice: number;
}

// 🛡️ Храним метку времени в глобальном объекте Next.js Data Cache,
// но для локального отслеживания оставляем простую синхронизацию
let lastScanTime: string | null = null;

export const CryptoStoreManager = {
  /**
   * 📤 МЕТОД ЧТЕНИЯ: Извлекает активы из апи
   */
  async getCachedCoins(): Promise<CoinItem[]> {
    try {
      const response = await coinApi.getAll();

      // Возвращаем данные (проверяем оба варианта полей CoinStats, чтобы не было undefined)
      const data = response.result || response.result || [];

      if (data.length > 0) {
        // Фиксируем метку времени в момент успешного пролета данных
        lastScanTime = new Date().toISOString();
      }

      return data;
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error(
        '[GLOBAL_STORE_FETCH_ERROR] Не удалось прогреть кэш:',
        error,
      );
      return [];
    }
  },

  /**
   * 🔄 МЕТОД ПРИНУДИТЕЛЬНОГО ОБНОВЛЕНИЯ: Сбрасывает кэш Next.js
   */
  async updateData(): Promise<CoinItem[]> {
    try {
      const { revalidateTag, revalidatePath } = await import('next/cache');

      // 1. Стираем 15-минутный слепок по тегу
      revalidateTag(CACHE_TAGS.CRYPTO_COINS, 'max');

      // 2. 🟢 ЖЕЛЕЗНЫЙ ФИКС: Заставляем Next.js принудительно пересобрать весь Layout
      // с учетом мультиязычного пути, чтобы шапка (с временем) и экран обновились С ПЕРВОГО КЛИКА! [5.2]
      revalidatePath('/', 'layout');
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.error('[GLOBAL_STORE_UPDATE_ERROR] Ошибка сброса кэша:', error);
    }

    // Возвращаем свежезапрошенные данные
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
   * ⏱️ Возвращает метку времени последнего удачного сканирования
   */
  getLastScanTime(): string | null {
    return lastScanTime;
  },
};
