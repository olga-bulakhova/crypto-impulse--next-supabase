import type { Asset } from "./assetsTypes";


// 📐 1. ОПИСЫВАЕМ СТРОГИЙ ИНТЕРФЕЙС ХРАНИЛИЩА АКТИВОВ
interface UserAssetsStorage {
  userPortfolio: Asset[];
}

// 🛡️ 2. РАСШИРЯЕМ ГЛОБАЛЬНЫЙ ИНТЕРФЕЙС ТИПОВ ДЛЯ globalThis (Без any)
declare global {
  // eslint-disable-next-line no-var
  var userAssetsStorage: UserAssetsStorage | undefined;
}

// Переменные-моки для самого первого холодного старта сервера
const initialMockAssets: Asset[] = [
  {
    id: 'bitcoin',
    amount: 0.02,
    price: 75244,
    date: new Date(),
  },
  {
    id: 'ethereum',
    amount: 5,
    price: 2700,
    date: new Date(),
  },
];

// Если хранилище уже сидит в глобальной памяти (после HMR / Fast Refresh) — берем его,
// если сервер только запустился — инициализируем базовыми моками
const globalAssetsStore = globalThis.userAssetsStorage ?? {
  userPortfolio: initialMockAssets,
};

// В режиме разработки (development) принудительно запечатываем объект в глобальный контекст,
// чтобы изменения кода Next.js не стирали и не сбрасывали текущий портфель в памяти! [5.2]
if (process.env.NODE_ENV !== 'production') {
  globalThis.userAssetsStorage = globalAssetsStore;
}

/**
 * 🛸 СЕРВЕРНЫЙ МЕНЕДЖЕР ПОРТФЕЛЯ (Assets Storage Manager)
 * Централизованно управляет позициями инвестора в памяти сервера Node.js.
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
   * 📥 МЕТОД ОБНОВЛЕНИЯ: Перезаписывает активы в памяти (задел под будущую запись в базу данных)
   */
  async updateAssets(newAssets: Asset[]): Promise<Asset[]> {
    // Делаем глубокую копию массива для безопасности иммутабельности данных
    globalAssetsStore.userPortfolio = [...newAssets];

    console.log(
      `[ASSETS_STORE] Портфель успешно обновлен в памяти сервера! Новое количество активов: ${newAssets.length}`,
    );

    // Возвращаем обновленный массив
    return globalAssetsStore.userPortfolio;
  },
};
