export const ROUTES = {
  HOME: '/',
  COIN: (coinId: string) => `/coin/${coinId}`,

  DASHBOARD: '/dashboard',

  AUTH: {
    LOGIN: '/auth/login',
    CALLBACK: '/auth/callback',
  },

  EXTERNAL: {
    COIN_STATS_API: 'https://coinstats.app',
    GITHUB_DEVELOPER: 'https://github.com',
    GOOGLE_CLOUD_CONSOLE: 'https://google.com',
  },
} as const;

export type RoutesType = typeof ROUTES;
