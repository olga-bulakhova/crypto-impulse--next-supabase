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

export const coinApi = {
  // getAll: async (): Promise<ApiCoinStatsResponse> => {
  //   return apiFetch<ApiCoinStatsResponse>(API_ROUTES.COINS.BASE, {
  //     method: 'GET',
  //     next: {
  //       revalidate: 60,
  //       tags: [CACHE_TAGS.CRYPTO_COINS],
  //     },
  //   });
  // },

  getAll: async (): Promise<ApiCoinStatsResponse> => {
    return apiFetch<ApiCoinStatsResponse>(API_ROUTES.COINS.BASE, {
      method: 'GET',
      cache: 'no-store', // Отключаем стандартный кэш fetch, кэшировать будем уровнем выше
    });
  },
};
