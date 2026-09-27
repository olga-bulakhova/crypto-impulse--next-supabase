
import { coinApi } from '@/shared/api/coin-api'; // 🌟 Импортируем наш зафиксированный API-сервис
import type { CoinItem } from './types';

// 📐 1. Описываем строгий интерфейс для нашего внутреннего хранилища
interface CryptoRadarStorage {
  lastScanTime: string | null;
  cachedCoins: CoinItem[];
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
};

// В режиме разработки (development) принудительно запечатываем объект в глобальный контекст,
// чтобы Fast Refresh / HMR Next.js не стирал и не дублировал данные при сохранении файлов! [5.2]
if (process.env.NODE_ENV !== 'production') {
  globalThis.cryptoRadarStorage = globalStore;
}

/**
 * 🛸 СЕРВЕРНЫЕ МЕТОДЫ УПРАВЛЕНИЯ ПАМЯТЬЮ (Data Access Methods)
 * Вызываются в любой точке серверного окружения приложения Next.js.
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
   * 🌟 ИСПРАВЛЕНО: Если кэш пуст, автоматически прогревает его через coinApi! [5.2]
   */
  async getCachedCoins(): Promise<CoinItem[]> {
    if (globalStore.cachedCoins.length === 0) {
      console.log(
        '[GLOBAL_STORE] Кэш пуст (холодный старт). Запускаем автоматический прогрев через coinApi...',
      );
      try {
        const response = await coinApi.getAll();
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
      }
    }
    return globalStore.cachedCoins;
  },

  /**
   * 🔄 МЕТОД ПРИНУДИТЕЛЬНОГО ОБНОВЛЕНИЯ (Cache Invalidation)
   * Игнорирует старый кэш, скачивает свежие данные и перезаписывает оперативную память.
   */
  async updateData(): Promise<CoinItem[]> {
    console.log(
      '[GLOBAL_STORE] Запущено принудительное ручное обновление данных котировок...',
    );
    try {
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
    }
    return globalStore.cachedCoins;
  },

  /**
   * 🎯 МЕТОД ТОЧЕЧНОГО ЧТЕНИЯ: Находит конкретную монету по ID или Тикеру.
   * 🌟 ИСПРАВЛЕНО: Теперь вызывает асинхронный getCachedCoins(), гарантируя наличие данных! [5.2]
   */
  async getCoinById(id: string): Promise<CoinItem | null> {
    if (!id) return null;

    // Получаем массив коинов (если его нет, метод выше сам заполнит память) [5.2]
    const allCoins = await this.getCachedCoins();

    // Ищем монету в массиве кэша (принудительно в нижнем регистре для защиты от опечаток API)
    const targetCoin = allCoins.find(
      (coin) =>
        coin.id.toLowerCase() === id.toLowerCase() ||
        coin.symbol.toLowerCase() === id.toLowerCase(),
    );

    return targetCoin || null;
  },

  /**
   * ⏱️ МЕТОД КОНТРОЛЯ ВРЕМЕНИ: Отдает метку времени последнего сканирования
   */
  getLastScanTime(): string | null {
    return globalStore.lastScanTime;
  },
};
