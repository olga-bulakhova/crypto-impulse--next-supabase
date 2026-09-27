'use server';

import { CryptoStoreManager, type CoinItem } from '@/storage';

/**
 * 🚀 SERVER ACTION: Принудительное обновление глобального кэша памяти на сервере
 */
export async function refreshMarketDataAction(): Promise<CoinItem[]> {
  // Вызываем наш новый агрессивный метод зачистки и прогрева кэша [5.2]
  return await CryptoStoreManager.updateData();
}
