import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * 🔒 СЕРВЕРНЫЙ ХЕЛПЕР SUPABASE
 * Используется в Server Components, Server Actions и API-роутах Next.js [5.2].
 * Автоматически синхронизирует куки авторизации между Vercel и базой данных [5.2].
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Чтение кук прямо во время серверного рендеринга [5.2]
        getAll() {
          return cookieStore.getAll();
        },
        // Запись кук при обновлении токенов авторизации [5.2]
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Игнорируем ошибку, если компонент рендерится на сервере
            // и куки в данный момент изменить физически нельзя [5.2]
          }
        },
      },
    },
  );
}
