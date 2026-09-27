//import { CoinItem } from '@/shared/services/coin-service'; 

import type { CoinItem } from "@/storage";



// 📐 СТРОГИЕ ИНТЕРФЕЙСЫ ОТВЕТОВ СЕРВЕРА (Без any)
export interface ApiCoinStatsResponse {
  result: CoinItem[];
}

// Устанавливаем базовый домен для CoinStats API
const BASE_URL = 'https://api.coinstats.app/v1';

// Настраиваем объект путей для чистоты кода
const API_ROUTES = {
  COINS: {
    BASE: '/coins',
  },
};

/**
 * 🛠️ СЛУЖЕБНАЯ ФУНКЦИЯ: Создание заголовков запроса
 * Автоматически инжектирует секретный X-API-KEY на стороне сервера Next.js [5.2]
 */
export const createHeaders = (
  customHeaders?: HeadersInit,
  hasBody = false,
): HeadersInit => {
  const baseHeaders: Record<string, string> = {
    // 🌟 ИНТЕГРИРОВАНО: Автоматически прокидываем наш зафиксированный API-ключ в каждый запрос!
    'X-API-KEY': process.env.COINSTATS_API_KEY || '',
  };

  if (hasBody) {
    baseHeaders['Content-Type'] = 'application/json';
  }

  return { ...baseHeaders, ...customHeaders };
};

/**
 * 🛠️ СЛУЖЕБНАЯ ФУНКЦИЯ: Универсальный парсинг и обработка ошибок сервера
 */
export async function handleResponse<T>(response: Response): Promise<T> {
  // Защита от пустых ответов сервера
  if (response.status === 204) return {} as T;

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `Ошибка сервера: ${response.status}`);
  }

  return data as T;
}

/**
 * 🛠️ СЛУЖЕБНАЯ ФУНКЦИЯ: Обёртка над нативным fetch с поддержкой Next.js 16 кэширования [5.2]
 */
export const apiFetch = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;
  const hasBody = !!options.body;

  const config: RequestInit = {
    ...options,
    headers: createHeaders(options.headers, hasBody),
  };

  const response = await fetch(url, config);
  return handleResponse<T>(response);
};

/**
 * 📡 ГЛАВНЫЙ СЕРВИС: Экспортируем методы по вашему эталонному образцу
 */
export const coinApi = {
  /**
   * 📊 МЕТОД: Получение полного списка криптовалют с CoinStats шлюза
   * Мягко кэшируется на 30 секунд по вашему зафиксированному контракту Next.js 16 [5.2]
   */
  getAll: async (): Promise<ApiCoinStatsResponse> => {
    return apiFetch<ApiCoinStatsResponse>(API_ROUTES.COINS.BASE, {
      method: 'GET',
      // Настройка Next.js 16 кэширования — revalidate на 30 секунд
      next: { revalidate: 30 },
    });
  },
};
