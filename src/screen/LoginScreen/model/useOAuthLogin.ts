import { useState } from 'react';
import { createClient } from '@/utils/supabase/client'; // Наш клиентский хелпер Supabase [5.2]

export const useOAuthLogin = () => {
  const supabase = createClient();
  const [loadingProvider, setLoadingProvider] = useState<
    'github' | 'google' | null
  >(null);

  /**
   * 🔑 Запуск процесса бесшовной OAuth-авторизации
   */
  const login = async (provider: 'github' | 'google') => {
    setLoadingProvider(provider);

    try {
      // Автоматически вычисляем домен (localhost в разработке или vercel в продакшене)
      const origin =
        typeof window !== 'undefined' ? window.location.origin : '';

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          // Точка возврата для перехвата сессии сервером [5.2]
          redirectTo: `${origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error(
        `[AUTH_HOOK_ERROR] Ошибка инициализации OAuth через ${provider}:`,
        error,
      );
      setLoadingProvider(null);
    }
  };

  return {
    login,
    loadingProvider,
    isPending: loadingProvider !== null,
  };
};
