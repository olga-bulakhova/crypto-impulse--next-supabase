import type { CoinItem } from '@/storage';
import { CACHE_TAGS } from '../constants';

export interface ApiCoinStatsResponse {
  result: CoinItem[];
}

const BASE_URL = 'https://api.coinstats.app/v1';

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
  if (response.status === 204) return {} as T;

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || `Ошибка сервера CoinStats: ${response.status}`,
    );
  }

  return data as T;
}

/**
 * 🛠️ СЛУЖЕБНАЯ ФУНКЦИЯ: Обёртка над нативным fetch с поддержкой Next.js Data Cache [5.2]
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
 * 📡 ГЛАВНЫЙ СЕРВИС: Методы сетевых запросов к крипто-шлюзу
 */
export const coinApi = {
  getAll: async (): Promise<ApiCoinStatsResponse> => {
    return apiFetch<ApiCoinStatsResponse>(API_ROUTES.COINS.BASE, {
      method: 'GET',
      next: {
        revalidate: 15 * 60, // 🟢 Ровно 15 минут кэширования на диске
        tags: [CACHE_TAGS.CRYPTO_COINS], // Системный тег для ручного сброса кэша
      },
    });
  },
};
