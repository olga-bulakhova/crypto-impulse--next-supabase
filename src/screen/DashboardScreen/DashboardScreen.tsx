
import { createClient } from '@/utils/supabase/server'; // Наш серверный клиент [5.2]
import { Card } from '@/shared/ui/Card';
import { AlertForm } from './AlertForm';
import { DeleteAlertButton } from './DeleteAlertButton';

export const dynamic = 'force-dynamic';

export const DashboardScreen = async () => {
  // 1. Инициализируем серверный клиент и запрашиваем данные сессии [5.2]
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Защитная проверка безопасности (хотя наш прокси-пограничник и так не пустит сюда гостей) [5.2]
  if (!user)
    return (
      <div className="p-8 text-center text-xs text-zinc-500">
        Загрузка сессии...
      </div>
    );

  // 2. Делаем SELECT запрос в Supabase для извлечения подписок ТЕКУЩЕГО юзера [5.2]
  const { data: alerts, error } = await supabase
    .from('user_alerts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[SELECT_ALERTS_ERROR] Ошибка чтения базы:', error);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 font-sans text-zinc-100 select-none">
      {/* ШАПКА КАБИНЕТА */}
      <div className="mb-8">
        <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
          Ваш пульт управления алертами 
        </h1>
        <p className="mt-1 text-xs text-zinc-500">
          Настройте, при каком проценте отклонения цены бот сформирует
          импульсный сигнал в живой поток.
        </p>
      </div>

      {/* ДВУХКОЛОНОЧНЫЙ ИНТЕРФЕЙС НА БАЗЕ УНИВЕРСАЛЬНЫХ КАРТОЧЕХ CARD */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ЛЕВАЯ КОЛОНКА: ФОРМА ДОБАВЛЕНИЯ */}
        <div className="lg:col-span-1">
          <Card title="Добавить монету на радар">
            <AlertForm userId={user.id} />
          </Card>
        </div>

        {/* ПРАВАЯ КОЛОНКА: СПИСОК ТЕКУЩИХ ПОДПИСОК */}
        <div className="lg:col-span-2">
          <Card title="Ваши активные подписки">
            {!alerts || alerts.length === 0 ? (
              // Сценарий А: Подписок пока нет
              <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-900 p-6 text-center">
                <p className="max-w-[280px] text-xs leading-relaxed text-zinc-500">
                  Вы пока не отслеживаете ни одной конкретной монеты. Все
                  аномалии рынка будут отображаться на главной странице в общем
                  потоке.
                </p>
              </div>
            ) : (
              // Сценарий Б: Выводим список карточек подписок
              <div className="flex flex-col gap-3">
                {alerts.map((alertItem) => (
                  <div
                    key={alertItem.id}
                    className="flex items-center justify-between rounded-xl border border-zinc-900/60 bg-zinc-900/10 p-4 transition-colors hover:border-zinc-800/80"
                  >
                    <div>
                      <span className="mr-2 rounded-lg border border-zinc-800/60 bg-zinc-900 px-2 py-0.5 font-mono text-xs font-bold tracking-wider text-white uppercase">
                        {alertItem.coin_id === 'all'
                          ? 'GLOBAL'
                          : alertItem.coin_id}
                      </span>
                      <span className="text-xs text-zinc-400">
                        Порог триггера:{' '}
                        <span className="font-mono font-bold text-[hsl(var(--cyber-blue))] text-cyan-400">
                          {alertItem.min_percentage}%
                        </span>
                      </span>
                    </div>

                    {/* Компонент кнопки удаления */}
                    <DeleteAlertButton alertId={alertItem.id} />
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
