/**
 * 🛠️ УНИВЕРСАЛЬНАЯ ФИНТЕХ-УТИЛИТА: Профессиональное форматирование стоимости и профита
 * Спецификация: Поддержка отрицательных чисел, разделение тысяч запятыми + адаптивные копейки.
 *
 * @param price - Сырое число стоимости или прибыли/убытка (например: -3663.200000 или 84519.48)
 * @returns Отформатированная строка для вывода в UI (например: "-\$3,663.20" или "\$84,519.48")
 */
export const formatCryptoPrice = (price: number): string => {
  // Защита: если прилетело некорректное число или NaN, возвращаем заглушку
  if (typeof price !== 'number' || isNaN(price) || price === 0) {
    return '\$0.00';
  }

  // 🛡️ ФИКСАЦИЯ ЗНАКА: Проверяем, является ли число отрицательным (убыток)
  const isNegative = price < 0;

  // Для форматирования берем абсолютно чистое положительное число через Math.abs()
  const absolutePrice = Math.abs(price);

  let formattedString = '';

  // 🟢 СЦЕНАРИЙ 1: Тяжелые активы и крупные суммы (от \$1 и выше)
  if (absolutePrice >= 1) {
    formattedString = absolutePrice.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } else {
    // 🟢 СЦЕНАРИЙ 2: Микро-активы и центы (меньше \$1)
    const fractionDigits = absolutePrice < 0.01 ? 6 : 4;

    formattedString = absolutePrice.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    });
  }

  // 🟢 ВОЗВРАЩАЕМ МИНУС НА МЕСТО: Если исходное число было отрицательным,
  // принудительно дописываем минус перед знаком доллара без лишних нулей!
  return isNegative ? `-${formattedString}` : formattedString;
};
