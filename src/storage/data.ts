import { CoinItem } from './types';

const data: CoinItem[] = [];

export async function getCoinStats(): Promise<CoinItem[]> {
  try {
    // 🟢 ВЫПОЛНЯЕТСЯ НА СЕРВЕРЕ: Ваш зафиксированный рабочий запрос (НЕ МЕНЯЕМ) [5.2]
    const response = await fetch('https://api.coinstats.app/v1/coins', {
      method: 'GET',
      headers: {
        'X-API-KEY': process.env.COINSTATS_API_KEY || '',
      },
      // Мягко кэшируем на 30 секунд, чтобы не спамить шлюз при параллельных вызовах
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      throw new Error(`CoinStats API шлюз вернул статус: ${response.status}`);
    }

    const data: CoinStatsResponse = await response.json();

    // Логируем результат на сервере, как в вашем исходном коде
    console.log(data.result);

    // Возвращаем строго массив из зафиксированного свойства data.result
    return data.result || [];
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      '[COIN_STATS_UTIL_ERROR] Ошибка выполнения запроса:',
      errorMessage,
    );

    // В случае сбоя сети возвращаем пустой массив, чтобы приложение не падало в аварийный режим
    return [];
  }
}

