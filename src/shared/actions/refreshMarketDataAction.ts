'use server';

import { CryptoStoreManager } from '@/storage';

/**
 * 🚀 SERVER ACTION: Принудительное обновление глобального кэша памяти на сервере
 */
export async function refreshMarketDataAction(): Promise<void> {
  return await CryptoStoreManager.updateData();
}
