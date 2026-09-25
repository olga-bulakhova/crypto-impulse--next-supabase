import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server'; // Наш серверный клиент с поддержкой cookies [5.2]

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    // Параметр next указывает, куда перенаправить пользователя после успешной авторизации
    const next = searchParams.get('next') ?? '/dashboard';

    if (code) {
      // Инициализируем серверный клиент Supabase, который умеет записывать куки в заголовки ответа [5.2]
      const supabase = await createClient();

      // 🚀 Магия Supabase: обмениваем временный код авторизации на постоянную сессию [5.2]
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        // Если обмен прошел успешно — куки уже записаны, редиректим пользователя в личный кабинет! [5.2]
        return NextResponse.redirect(`${origin}${next}`);
      }

      console.error(
        '[SUPABASE_CALLBACK_ERROR] Ошибка обмена кода на сессию:',
        error.message,
      );
    }

    // Если кода в URL нет или произошла ошибка — отправляем обратно на страницу логина с ошибкой
    return NextResponse.redirect(
      `${origin}/auth/login?error=auth-callback-failed`,
    );
  } catch (error) {
    console.error('[AUTH_CALLBACK_CRITICAL_ERROR]', error);
    return NextResponse.redirect(
      new URL('/auth/login?error=critical', request.url),
    );
  }
}
