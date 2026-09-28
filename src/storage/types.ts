export interface CoinItem {
  // 🟢 ОБЯЗАТЕЛЬНЫЕ ПОЛЯ (Используются в верстке, сортировке и логике базы данных)
  id: string; // 'bitcoin'
  icon: string; // Ссылка на изображение логотипа
  name: string; // 'Bitcoin'
  symbol: string; // 'BTC'
  rank: number; // Место в глобальном рейтинге капитализации
  price: number; // Текущая стоимость в USD
  priceBtc?: number; // Стоимость, выраженная в BTC (для Биткоина равна 1)
  volume?: number; // Суточный объем торгов в USD
  marketCap?: number; // Глобальная рыночная капитализация
  availableSupply?: number; // Количество монет в свободном обращении на рынке
  totalSupply?: number; // Общая эмиссия (максимальный выпуск монет)
  fullyDilutedValuation?: number; // Полностью разводненная оценка стоимости
  liquidityScore?: number; // Индекс ликвидности актива
  volatilityScore?: number; // Индекс волатильности (изменчивости цены)
  marketCapScore?: number; // Внутренний скоринг капитализации
  riskScore?: number; // Оценка уровня риска инвестиций
  avgChange?: number; // Средний процент изменения цены
  priceChange1h?: number;
  priceChange1d?: number; // Изменение стоимости за последний 1 час
  priceChange1w?: number; // Изменение стоимости за 1 неделю
  priceChange1m?: number; // Изменение стоимости за 1 месяц
  redditUrl?: string; // Ссылка на официальный сабреддит
  twitterUrl?: string; // Ссылка на аккаунт в X (Twitter)
  contractAddresses?: string[]; // Смарт-контракты (для токенов сетей ERC-20/SPL)
  explorers?: string[]; // Ссылки на блокчейн-обозреватели (например, Blockchair)
  color?: string; // Фирменный HEX-код цвета монеты ('FF9500')
  allTimeHigh?: number; // Максимальная цена за всю историю (ATH)
  allTimeLow?: number; // Минимальная цена за всю историю (ATL)
  slug?: string; // Уникальный текстовый идентификатор для URL
}
