export interface Asset {
  id: string; // 🟢 Уникальный UUID самой транзакции (сделки покупки)
  coinId: string; // Идентификатор монеты в API CoinStats (например, 'bitcoin')
  amount: number; // Количество монет
  price: number; // Цена покупки актива
  date: Date; // Дата совершения операции
}
