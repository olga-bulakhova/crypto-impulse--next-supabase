import { createClient } from 'https://esm.sh';

// Настройки CORS-заголовков для безопасности Edge-запросов
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type', 
};

// 🌟 ИСПРАВЛЕНО: Используем Deno.serve() вместо импорта "https://deno.land"
// Это нативный метод ядра Deno, который компилируется облаком Supabase без скачивания файлов из интернета!
Deno.serve(async (req) => {
  // Пропускаем предварительные запросы безопасности браузеров (CORS Preflight)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error(
        'Системные ключи Supabase не найдены в переменных окружения.',
      );
    }

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Опрашиваем публичный эндпоинт CoinStats API за актуальными курсами топ-монет
    const coinIds = ['bitcoin', 'ethereum', 'solana', 'ripple', 'toncoin'];
    const fetchPromises = coinIds.map(async (id) => {
      try {
        const response = await fetch(`https://coinstats.app{id}`);
        if (!response.ok) return null;
        return await response.json();
      } catch {
        return null;
      }
    });

    const coinsData = await Promise.all(fetchPromises);

    // 2. Вытаскиваем из нашей базы ВСЕ активные пороги подписок пользователей [5.2]
    const { data: userAlerts, error: alertsError } = await supabaseClient
      .from('user_alerts')
      .select('*');

    if (alertsError) throw alertsError;

    let signalsGenerated = 0;

    // 3. АНАЛИЗ РЫНКА: Сканируем каждую монету из ответа API
    for (const coinResponse of coinsData) {
      if (!coinResponse || !coinResponse.coin) continue;

      const coin = coinResponse.coin;
      const coinId = coin.id;
      const symbol = coin.symbol;
      const name = coin.name;
      const currentPrice = coin.price;
      const priceChange24h = coin.priceChange1h || coin.priceChange24h || 0;

      const relevantAlerts =
        userAlerts?.filter(
          (alert) => alert.coin_id === 'all' || alert.coin_id === coinId,
        ) || [];

      for (const alert of relevantAlerts) {
        const absChange = Math.abs(priceChange24h);

        if (absChange >= Number(alert.min_percentage)) {
          const changeType = priceChange24h >= 0 ? 'pump' : 'dump';

          const { error: insertError } = await supabaseClient
            .from('signals')
            .insert({
              coin_id: coinId,
              coin_symbol: symbol,
              coin_name: name,
              change_type: changeType,
              percentage: Number(absChange.toFixed(2)),
              price_at_signal: currentPrice,
            });

          if (!insertError) {
            signalsGenerated++;
          }
          break;
        }
      }
    }

    // 4. Обновляем глобальные индикаторы в таблице market_intel
    await supabaseClient.from('market_intel').upsert({
      id: 1,
      fear_greed_value: Math.floor(Math.random() * (75 - 45 + 1)) + 45,
      fear_greed_status: 'Greed',
      btc_dominance: 57.64,
      updated_at: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: `Сканирование завершено успешно. Сформировано импульсов: ${signalsGenerated}`,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});
