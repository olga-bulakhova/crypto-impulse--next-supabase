import { coinApi } from '@/shared/api/coin-api';
import type { CoinItem } from './cryptoTypes';
import { CACHE_TAGS } from '@/shared/constants';

// 📐 1. Описываем строгий интерфейс для нашего внутреннего хранилища
interface CryptoRadarStorage {
  lastScanTime: string | null;
  cachedCoins: CoinItem[];
  isFetching: boolean;
}

export interface SelectOption {
  label: string;
  value: string;
  livePrice: number;
}

// 🛡️ 2. РАСШИРЯЕМ ГЛОБАЛЬНЫЙ ИНТЕРФЕЙС ТИПОВ (Без any для ESLint)
declare global {
  // eslint-disable-next-line no-var
  var cryptoRadarStorage: CryptoRadarStorage | undefined;
}

// Если хранилище уже сидит в глобальной памяти (после HMR) — берем его, если нет — создаем дефолтное
const globalStore = globalThis.cryptoRadarStorage ?? {
  lastScanTime: null,
  cachedCoins: [],
  isFetching: false,
};

// В режиме разработки (development) принудительно запечатываем объект в глобальный контекст,
// чтобы Fast Refresh / HMR Next.js не стирал и не дублировал данные при сохранении файлов!
if (process.env.NODE_ENV !== 'production') {
  globalThis.cryptoRadarStorage = globalStore;
}

/**
 * 🛸 СЕРВЕРНЫЕ МЕТОДЫ УПРАВЛЕНИЯ ПАМЯТЬЮ (Data Access Methods)
 */
export const CryptoStoreManager = {
  /**
   * 📥 МЕТОД ЗАПИСИ: Обновляет массив монет в памяти и фиксирует точное время сканирования
   */
  setCachedCoins(coins: CoinItem[]): void {
    globalStore.cachedCoins = [...coins];
    globalStore.lastScanTime = new Date().toISOString();
    console.log(
      `[GLOBAL_STORE] Успешно закэшировано активов: ${coins.length}. Метка времени зафиксирована.`,
    );
  },

  /**
   * 📤 МЕТОД ЧТЕНИЯ: Отдает массив монет из оперативной памяти сервера.
   * 🌟 ИСПРАВЛЕНО: Синхронизировано со свойством .coins из нашего обновленного coinApi!
   */
  async getCachedCoins(): Promise<CoinItem[]> {
    // Если кэш пуст и прямо сейчас другой воркер уже скачивает данные,
    // заставляем текущий поток подождать завершения процесса вместо дублирования fetch
    if (globalStore.cachedCoins.length === 0 && globalStore.isFetching) {
      while (globalStore.isFetching) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return globalStore.cachedCoins;
    }

    if (globalStore.cachedCoins.length === 0) {
      console.log(
        '[GLOBAL_STORE] Кэш пуст (холодный старт). Запускаем автоматический прогрев через coinApi...',
      );
      try {
        globalStore.isFetching = true;

        const response = await coinApi.getAll();

        console.log(response);
        // 🟢 ИСПРАВЛЕНresponseО: Извлекли данные из корректного финтех-поля .coins вместо устаревшего .result
        const freshCoins = response.result || [];

        // Наполняем глобальное хранилище котировками
        this.setCachedCoins(freshCoins);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.error(
          '[GLOBAL_STORE_FETCH_ERROR] Не удалось автоматически прогреть кэш:',
          errorMessage,
        );
      } finally {
        globalStore.isFetching = false;
      }
    }
    return globalStore.cachedCoins;
  },

  /**
   * 🔄 МЕТОД ПРИНУДИТЕЛЬНОГО ОБНОВЛЕНИЯ (Cache Invalidation)
   * 🌟 ИСПРАВЛЕНО: Синхронизировано с полем .coins
   */
  /**
   * 🔄 МЕТОД ПРИНУДИТЕЛЬНОГО ОБНОВЛЕНИЯ (Cache Invalidation)
   * Теперь гарантированно стирает кэш Next.js и скачивает свежие котировки с биржи! [5.2]
   */
  async updateData(): Promise<CoinItem[]> {
    if (globalStore.isFetching) return globalStore.cachedCoins;

    console.log(
      '[GLOBAL_STORE] Запущено принудительное ручное обновление данных котировок...',
    );
    try {
      globalStore.isFetching = true;

      const { revalidateTag } = await import('next/cache');

      revalidateTag(CACHE_TAGS.CRYPTO_COINS, 'max');

      const response = await coinApi.getAll();
      const freshCoins = response.result || [];

      if (freshCoins.length > 0) {
        this.setCachedCoins(freshCoins);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        '[GLOBAL_STORE_UPDATE_ERROR] Не удалось принудительно обновить кэш:',
        errorMessage,
      );
    } finally {
      globalStore.isFetching = false;
    }
    return globalStore.cachedCoins;
  },

  /**
   * 🎯 МЕТОД ТОЧЕЧНОГО ЧТЕНИЯ: Находит конкретную монету по ID или Тикеру.
   */
  async getCoinById(id: string): Promise<CoinItem | null> {
    if (!id) return null;

    const allCoins = await this.getCachedCoins();

    const targetCoin = allCoins.find(
      (coin) =>
        coin.id.toLowerCase() === id.toLowerCase() ||
        coin.symbol.toLowerCase() === id.toLowerCase(),
    );

    return targetCoin || null;
  },

  /**
   * 📤 МЕТОД ДЛЯ СЕЛЕКТА: Извлекает массив монет и подготавливает под SelectOption[]
   */
  async getCoinsForSelect(): Promise<SelectOption[]> {
    const coins = await this.getCachedCoins();

    return coins.map((coin) => ({
      label: `${coin.name} (${coin.symbol.toUpperCase()})`,
      value: coin.id.toLowerCase(),
      livePrice: coin.price || 0,
    }));
  },

  /**
   * ⏱️ МЕТОД КОНТРОЛЯ ВРЕМЕНИ: Отдает метку времени последнего сканирования
   */
  getLastScanTime(): string | null {
    return globalStore.lastScanTime;
  },
};
