export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 text-zinc-100">
      <h1 className="mb-2 text-xl font-bold text-white sm:text-2xl">
        Ваш пульт управления алертами 🛡️
      </h1>
      <p className="mb-6 text-xs text-zinc-500">
        Здесь вы можете настроить, при каком проценте отклонения цены бот
        пришлет уведомление
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Форма добавления новой подписки */}
        <div className="rounded-2xl border border-zinc-900 bg-zinc-900/10 p-5 backdrop-blur-sm lg:col-span-1">
          <h3 className="mb-4 text-sm font-bold text-white">
            Добавить монету на радар
          </h3>
          <div className="rounded-xl border border-dashed border-zinc-900 py-6 text-center text-xs text-zinc-500">
            Форма настройки фильтрации
          </div>
        </div>

        {/* Список текущих активных подписок пользователя */}
        <div className="rounded-2xl border border-zinc-900 bg-zinc-900/10 p-5 backdrop-blur-sm lg:col-span-2">
          <h3 className="mb-4 text-sm font-bold text-white">
            Ваши активные подписки
          </h3>
          <div className="rounded-xl border border-dashed border-zinc-900 py-12 text-center text-xs text-zinc-500">
            Вы пока не отслеживаете ни одной монеты. Все аномалии рынка будут
            отображаться на главной странице.
          </div>
        </div>
      </div>
    </div>
  );
}
