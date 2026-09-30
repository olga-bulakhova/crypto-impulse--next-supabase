import { createClient } from '@/utils/supabase/server';
import { ProfileDropdown } from '../ProfileDropdown';
import { Pill } from '@/shared/ui/Pill';
import { UserGuestIcon } from '@/shared/icons/UserGuestIcon';
import { Logo } from '@/shared/ui/Logo';
import { ROUTES } from '@/shared/constants';
import { RefreshButton } from '@/widgets/RefreshButton';

export const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userAvatar = user?.user_metadata?.avatar_url;
  const userName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.user_name ||
    'Трейдер';

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Logo />
        <div className="flex items-center gap-4">
          <RefreshButton />
          <nav className="flex items-center gap-4">
            {user ? (
              <ProfileDropdown avatarUrl={userAvatar} userName={userName} />
            ) : (
              <Pill href={ROUTES.AUTH.LOGIN}>
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-500 transition-colors group-hover:border-cyan-500/20 group-hover:text-cyan-400">
                  <UserGuestIcon className="h-3 w-3" />
                </div>
                <span className="text-zinc-400 transition-colors group-hover:text-white">
                  Войти
                </span>
              </Pill>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
