'use client';

import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card'; // 🚀 Импортируем универсальный Card
import { GithubIcon, GoogleIcon } from '@/shared/icons';
import { useOAuthLogin } from '../model/useOAuthLogin';

export const LoginScreen = () => {
  const { login, loadingProvider } = useOAuthLogin();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 font-sans text-zinc-100 selection:bg-cyan-500/20">
      <Card
        className="max-w-md shadow-cyan-500/[0.02]"
        title={
          <>
            Добро пожаловать на{' '}
            <span className="text-[hsl(var(--cyber-blue))] text-cyan-400">
              Радар
            </span>{' '}
            📡
          </>
        }
        description="Авторизуйтесь, чтобы настроить персональные алерты на крипто-импульсы"
      >
        <Button
          variant="base"
          onClick={() => login('github')}
          isLoading={loadingProvider === 'github'}
          loadingText="Подключение к GitHub..."
          icon={<GithubIcon className="h-4 w-4 text-white" />}
          className="w-full rounded-xl"
        >
          Войти через GitHub
        </Button>

        <Button
          variant="base"
          onClick={() => login('google')}
          isLoading={loadingProvider === 'google'}
          loadingText="Подключение к Google..."
          icon={<GoogleIcon className="h-4 w-4" />}
          className="w-full rounded-xl"
        >
          Войти через Google
        </Button>
      </Card>
    </div>
  );
};
