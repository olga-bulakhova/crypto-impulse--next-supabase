import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { ROUTES } from '@/shared/constants';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    // 🌟 ИСПРАВЛЕНО: Если параметра 'next' нет, берем дефолтный ROUTES.DASHBOARD из конфига
    const next = searchParams.get('next') ?? ROUTES.DASHBOARD;

    if (code) {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
      console.error('[SUPABASE_CALLBACK_ERROR]', error.message);
    }

    // 🌟 ИСПРАВЛЕНО: При ошибке отправляем на ROUTES.AUTH.LOGIN
    return NextResponse.redirect(
      `${origin}${ROUTES.AUTH.LOGIN}?error=auth-callback-failed`,
    );
  } catch (error) {
    console.error('[AUTH_CALLBACK_CRITICAL_ERROR]', error);
    return NextResponse.redirect(
      new URL(`${ROUTES.AUTH.LOGIN}?error=critical`, request.url),
    );
  }
}
