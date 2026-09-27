import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getCoinStats } from '@/shared/utils-server/coinStats'; // Наша зафиксированная утилита

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secretToken = searchParams.get('secret');

    // 🔒 1. Проверяем токен безопасности
    if (secretToken !== process.env.SCANNER_SECRET_TOKEN) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 },
      );
    }

    // 🪙 2. Получаем свежие данные из CoinStats через нашу утилиту
    const currentCoins = await getCoinStats();
    if (!currentCoins || currentCoins.length === 0) {
      return NextResponse.json(
        { success: false, error: 'CoinStats API returned no data' },
        { status: 502 },
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    );

    // 📊 3. Загружаем из базы предыдущие снимки цен и пороги подписок пользователей [5.2]
    const [historyResponse, alertsResponse] = await Promise.all([
      supabase.from('coin_prices_history').select('*'),
      supabase.from('user_alerts').select('*'),
    ]);

    const historyPrices = historyResponse.data || [];
    const userAlerts = alertsResponse.data || [];

    let signalsGenerated = 0;

    console.log(
      `--- 🤖 СКАНИРОВАНИЕ РЫНКА (Всего подписок в базе: ${userAlerts.length}) ---`,
    );

    // 🚀 4. ЦИКЛ АНАЛИЗА ИМПУЛЬСОВ
    for (const coin of currentCoins) {
      // Принудительно используем короткий символ монеты (btc, eth) в качестве ключа
      const coinId = String(coin.symbol || coin.id || '').toLowerCase();
      const currentPrice = parseFloat(coin.price) || 0;

      // Ищем старую цену в загруженной истории
      const prevRecord = historyPrices.find(
        (h) => String(h.coin_id).toLowerCase() === coinId,
      );

      // Если старой цены в базе нет вообще — создаем снимок и переходим к следующему коину
      if (!prevRecord) {
        console.log(
          `[NEW_COIN] Монета ${coinId.toUpperCase()} впервые сохранена в базу по цене \$${currentPrice}`,
        );

        // Передаем плоский объект, строго соответствующий колонкам в PostgreSQL
        await supabase.from('coin_prices_history').upsert({
          coin_id: coinId,
          price: currentPrice,
          updated_at: new Date().toISOString(),
        });
        continue;
      }

      const oldPrice = parseFloat(prevRecord.price) || currentPrice;

      // ВЫЧИСЛЯЕМ ЧИСТЫЙ ИМПУЛЬС ЗА 15 МИНУТ В ПРОЦЕНТАХ!
      const priceChangePercent =
        oldPrice === 0 ? 0 : ((currentPrice - oldPrice) / oldPrice) * 100;
      const absChange = Math.abs(priceChangePercent);

      // Выводим расчет дельты в терминал VS Code для наглядного контроля!
      console.log(
        `> 🪙 ${coinId.toUpperCase()}: Старая \$${oldPrice} | Новая \$${currentPrice} | Дельта: ${priceChangePercent.toFixed(4)}%`,
      );

      // Сверяем полученный импульс с порогами алертов пользователей
      const relevantAlerts = userAlerts.filter(
        (alert) =>
          String(alert.coin_id).toLowerCase() === 'all' ||
          String(alert.coin_id).toLowerCase() === coinId,
      );

      for (const alert of relevantAlerts) {
        // Если реальный импульс рынка превысил настройку трейдера — зажигаем аномалию!
        if (absChange >= Number(alert.min_percentage)) {
          const changeType = priceChangePercent >= 0 ? 'pump' : 'dump';

          console.log(
            `🔥 [ИМПУЛЬС ЗАФИКСИРОВАН!] ${coinId.toUpperCase()} изменился на ${absChange.toFixed(2)}% (Порог пользователя: ${alert.min_percentage}%)`,
          );

          // Пишем сигнал аномалии в таблицу signals [5.2]
          await supabase.from('signals').insert({
            coin_id: coinId,
            coin_symbol: coinId.toUpperCase(),
            coin_name: coin.name,
            change_type: changeType,
            percentage: Number(absChange.toFixed(2)),
            price_at_signal: currentPrice,
          });

          signalsGenerated++;
          break; // Один сигнал на монету за цикл
        }
      }

      // 🔄 5. ОБНОВЛЯЕМ ИСТОРИЮ: Записываем текущую цену для следующего 15-минутного цикла [5.2]
      await supabase.from('coin_prices_history').upsert({
        coin_id: coinId,
        price: currentPrice,
        updated_at: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: `Сканирование 15-минутных импульсов завершено. Сгенерировано сигналов: ${signalsGenerated}`,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[CRITICAL_SCANNER_ERROR]', errorMessage);
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
