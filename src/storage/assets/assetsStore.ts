import crypto from 'node:crypto'; // 🌟 Нативный криптографический модуль Node.js для генерации UUID [2.1]
import type { Asset } from './assetsTypes';

// 📐 1. ОПИСЫВАЕМ СТРОГИЙ ИНТЕРФЕЙС ХРАНИЛИЩА АКТИВОВ
interface UserAssetsStorage {
  userPortfolio: Asset[];
}

// 🛡️ 2. РАСШИРЯЕМ ГЛОБАЛЬНЫЙ ИНТЕРФЕЙС ТИПОВ ДЛЯ globalThis (Без any)
declare global {
  // eslint-disable-next-line no-var
  var userAssetsStorage: UserAssetsStorage | undefined;
}

// Переменные-моки для самого первого холодного старта сервера с уникальными UUID транзакций [2.1]
const initialMockAssets: Asset[] = [
  {
    id: 'tx-btc-mock-001',
    coinId: 'bitcoin',
    amount: 0.02,
    price: 75244,
    date: new Date(),
  },
  {
    id: 'tx-eth-mock-002',
    coinId: 'ethereum',
    amount: 5,
    price: 2700,
    date: new Date(),
  },
];

// Если хранилище уже сидит в глобальной памяти — берем его, если сервер запущен с нуля — инициализируем моками
const globalAssetsStore = globalThis.userAssetsStorage ?? {
  userPortfolio: initialMockAssets,
};

if (process.env.NODE_ENV !== 'production') {
  globalThis.userAssetsStorage = globalAssetsStore;
}

/**
 * 🛸 СЕРВЕРНЫЙ МЕНЕДЖЕР ПОРТФЕЛЯ (Assets Storage Manager)
 */
export const AssetsStorageManager = {
  /**
   * 📤 МЕТОД ЧТЕНИЯ: Моментально возвращает текущий список активов из памяти сервера
   */
  async getAssets(): Promise<Asset[]> {
    console.log(
      `[ASSETS_STORE] Извлечено позиций из памяти сервера: ${globalAssetsStore.userPortfolio.length}`,
    );
    return globalAssetsStore.userPortfolio;
  },

  /**
   * 📥 МЕТОД ОБНОВЛЕНИЯ / ДОБАВЛЕНИЯ: Генерирует уникальный UUID и пушит сделку в массив [2.1]
   */
  async addAsset(newAssetData: Omit<Asset, 'id'>): Promise<Asset[]> {
    // 🟢 ГЕНЕРАЦИЯ UUID: Создаем криптографически стойкий уникальный ключ транзакции [2.1]
    const transactionAsset: Asset = {
      id: crypto.randomUUID(),
      ...newAssetData,
    };

    globalAssetsStore.userPortfolio = [
      ...globalAssetsStore.userPortfolio,
      transactionAsset,
    ];

    console.log(
      `[ASSETS_STORE] Новая сделка зафиксирована! UUID транзакции: ${transactionAsset.id}`,
    );

    return globalAssetsStore.userPortfolio;
  },

  /**
   * 🗑️ МЕТОД УДАЛЕНИЯ ПО ID ТРАНСАКЦИИ: Вырезает сделку из глобальной памяти сервера [2.1]
   */
  async deleteAssetById(transactionId: string): Promise<Asset[]> {
    const previousLength = globalAssetsStore.userPortfolio.length;

    // Иммутабельно фильтруем массив, исключая элемент с переданным UUID
    globalAssetsStore.userPortfolio = globalAssetsStore.userPortfolio.filter(
      (asset) => asset.id !== transactionId,
    );

    console.log(
      `[ASSETS_STORE] Операция удаления: было ${previousLength} позиций, стало ${globalAssetsStore.userPortfolio.length}`,
    );

    return globalAssetsStore.userPortfolio;
  },

  /**
   * Прямая перезапись массива (оставляем для обратной совместимости утилит)
   */
  async updateAssets(newAssets: Asset[]): Promise<Asset[]> {
    globalAssetsStore.userPortfolio = [...newAssets];
    return globalAssetsStore.userPortfolio;
  },
};
