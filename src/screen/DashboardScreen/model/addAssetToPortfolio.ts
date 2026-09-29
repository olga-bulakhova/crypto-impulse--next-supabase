'use server';

import { AssetsStorageManager } from '@/storage/assets/assetsStore';
import type { Asset } from '@/storage/assets/assetsTypes';

interface AddAssetPayload {
  id: string;
  coinId: string;
  amount: number;
  price: number;
  date: Date | string;
}

export async function addAssetToPortfolioAction(
  payload: AddAssetPayload,
): Promise<Asset[]> {
  try {
    return await AssetsStorageManager.addAsset({
      coinId: payload.coinId.toLowerCase(),
      amount: payload.amount,
      price: payload.price,
      date:
        payload.date instanceof Date ? payload.date : new Date(payload.date),
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      '[SERVER_ACTION_ERROR] Сбой записи транзакции:',
      errorMessage,
    );
    throw new Error('Не удалось зафиксировать сделку в оперативной памяти');
  }
}
