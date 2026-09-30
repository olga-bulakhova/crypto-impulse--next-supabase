import { createClient } from '@supabase/supabase-js'; // Убедитесь, что клиент Supabase настроен в проекте
import type { Asset } from './assetsTypes';

// Инициализируем клиент Supabase. Замените пути на ваши переменные окружения (.env.local) [5.2]
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * 🛸 СЕРВЕРНЫЙ МЕНЕДЖЕР ПОРТФЕЛЯ (Supabase Storage Manager)
 * Полностью заменяет globalThis оперативную память на персистентную базу данных PostgreSQL.
 */
export const AssetsStorageManager = {
  /**
   * 📤 МЕТОД ЧТЕНИЯ: Извлекает все транзакции напрямую из таблицы Supabase
   */
  async getAssets(): Promise<Asset[]> {
    const { data, error } = await supabase
      .from('user_portfolio_assets')
      .select('id, coin_id, amount, price, date')
      .order('date', { ascending: false });

    if (error) {
      console.error(
        '[SUPABASE_FETCH_ERROR] Не удалось извлечь активы:',
        error.message,
      );
      return [];
    }

    // Трансформируем snake_case бД в camelCase интерфейс нашего TypeScript приложения
    return (data || []).map((row) => ({
      id: row.id,
      coinId: row.coin_id,
      amount: Number(row.amount),
      price: Number(row.price),
      date: new Date(row.date),
    }));
  },

  /**
   * 📥 МЕТОД ДОБАВЛЕНИЯ: Физически записывает новый лот покупки в таблицу Supabase
   */
  async addAsset(newAssetData: Omit<Asset, 'id'>): Promise<Asset[]> {
    const { error } = await supabase.from('user_portfolio_assets').insert([
      {
        coin_id: newAssetData.coinId.toLowerCase(),
        amount: newAssetData.amount,
        price: newAssetData.price,
        date: newAssetData.date.toISOString(),
      },
    ]);

    if (error) {
      console.error(
        '[SUPABASE_INSERT_ERROR] Сбой записи транзакции:',
        error.message,
      );
      throw new Error(`Ошибка Supabase: ${error.message}`);
    }

    console.log(
      `[SUPABASE_STORE] Новая сделка по ${newAssetData.coinId} успешно зафиксирована в облаке!`,
    );

    // Возвращаем обновленный список активов для бесшовной совместимости
    return this.getAssets();
  },

  /**
   * 🗑️ МЕТОД УДАЛЕНИЯ: Вырезает сделку по её уникальному UUID из базы данных Supabase
   */
  async deleteAssetById(transactionId: string): Promise<Asset[]> {
    const { error } = await supabase
      .from('user_portfolio_assets')
      .delete()
      .eq('id', transactionId);

    if (error) {
      console.error(
        '[SUPABASE_DELETE_ERROR] Сбой при удалении транзакции:',
        error.message,
      );
      throw new Error(`Ошибка Supabase при удалении: ${error.message}`);
    }

    console.log(
      `[SUPABASE_STORE] Транзакция ${transactionId} успешно удалена из облака!`,
    );

    // Возвращаем свежий список активов
    return this.getAssets();
  },

  /**
   * Прямая перезапись массива (оставляем обертку для совместимости с моками)
   */
  async updateAssets(newAssets: Asset[]): Promise<Asset[]> {
    console.warn(
      '[SUPABASE_STORE] updateAssets вызван в режиме базы данных. Используйте addAsset или deleteAssetById.',
    );
    return this.getAssets();
  },
};
