import { updateTag, unstable_cache } from 'next/cache';
import { coinApi } from '@/shared/api/coin-api';
import type { CoinItem } from './cryptoTypes';
import { CACHE_TAGS } from '@/shared/constants';

export interface SelectOption {
  label: string;
  value: string;
  livePrice: number;
}

// Создаем внутренний тип для сохраненного кэша
interface CachedCryptoData {
  coins: CoinItem[];
  savedAt: string; // Сюда запишем точное время запроса к API
}

const getCachedCryptoDataWithTime = unstable_cache(
  async (): Promise<CachedCryptoData> => {
    const response = await coinApi.getAll();
    return {
      coins: response.result || [],
      savedAt: new Date().toISOString(), // Фиксируем время, когда данные РЕАЛЬНО скачались с API
    };
  },
  ['crypto-coins-cache-key'], // Уникальный ключ кэша
  {
    revalidate: 3 * 60, // Кэшировать на 3 минуты
    tags: [CACHE_TAGS.CRYPTO_COINS], // Тот самый тег для сброса через revalidateTag
  },
);

export const CryptoStoreManager = {
  /**
   * Безопасное получение данных (берется из минутного кэша Next.js)
   */
  async getCachedCoins(): Promise<CoinItem[]> {
    try {
      const cache = await getCachedCryptoDataWithTime();
      return cache.coins;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        '[GLOBAL_STORE_FETCH_ERROR] Не удалось прочитать кэш:',
        errorMessage,
      );
      return [];
    }
  },

  /**
   * 🚀 Принудительное обновление кэша по запросу пользователя (через Server Action)
   */
  async updateData(): Promise<void> {
    console.log('[GLOBAL_STORE] Инициирован принудительный сброс кэша...');
    updateTag(CACHE_TAGS.CRYPTO_COINS); // Очистит кэш и сбросит savedAt при следующем вызове
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
  async getLastScanTime(): Promise<string> {
    try {
      const cache = await getCachedCryptoDataWithTime();
      return cache.savedAt; // Возвращает зафиксированное время из кэша
    } catch {
      return new Date().toISOString(); // Фолбэк на случай ошибки
    }
  },
};
