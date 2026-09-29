'use server';

import { AssetsStorageManager } from '@/storage/assets/assetsStore';
import type { Asset } from '@/storage/assets/assetsTypes';

interface AddAssetPayload {
  coinId: string;
  amount: number;
  price: number;
  date: Date | string;
}

/**
 * 🚀 SERVER ACTION: Добавление новой транзакции крипто-актива в globalThis хранилище
 */
export async function addAssetToPortfolioAction(
  payload: AddAssetPayload,
): Promise<Asset[]> {
  try {
    // 1. Извлекаем текущий существующий список активов из памяти сервера
    const currentAssets = await AssetsStorageManager.getAssets();

    // 2. Формируем структуру новой транзакции
    const newAsset: Asset = {
      id: payload.coinId.toLowerCase(),
      amount: payload.amount,
      price: payload.price,
      // Гарантируем, что дата преобразуется в валидный объект Date
      date:
        payload.date instanceof Date ? payload.date : new Date(payload.date),
    };

    // 3. Создаем обновленный массив портфеля (иммутабельно добавляем новый элемент в конец)
    const updatedAssets = [...currentAssets, newAsset];

    // 4. Записываем обновленный список активов обратно в globalThis оперативной памяти
    return await AssetsStorageManager.updateAssets(updatedAssets);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      '[SERVER_ACTION_ERROR] Не удалось записать актив в память:',
      errorMessage,
    );
    throw new Error('Сбой серверной записи транзакции портфеля');
  }
}
