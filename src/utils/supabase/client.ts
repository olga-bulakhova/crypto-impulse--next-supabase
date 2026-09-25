import { createBrowserClient } from '@supabase/ssr';

/**
 * 🌐 КЛИЕНТСКИЙ ХЕЛПЕР SUPABASE
 * Используется строго в браузерных ('use client') компонентах [5.2].
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
