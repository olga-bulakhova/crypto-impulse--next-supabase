'use client';

import { UserMenu } from './UserMenu';
import { ChevronIcon } from '@/shared/icons';
import { Pill } from '@/shared/ui/Pill';
import { useProfileDropdown } from '../model/useProfileDropdown';

interface ProfileDropdownProps {
  avatarUrl?: string;
  userName: string;
}

export const ProfileDropdown = ({
  avatarUrl,
  userName,
}: ProfileDropdownProps) => {
  const { isOpen, dropdownRef, handleSignOut, toggle, close } =
    useProfileDropdown();

  return (
    <div className="relative font-sans" ref={dropdownRef}>
      <Pill
        onClick={toggle}
        className={isOpen ? 'border-cyan-500/30 text-white' : ''}
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={userName}
            referrerPolicy="no-referrer"
            className="h-6 w-6 rounded-full border border-zinc-700 bg-zinc-800 object-cover transition-colors group-hover:border-cyan-400/50"
          />
        ) : (
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-[10px] font-bold text-cyan-400">
            {userName.toUpperCase()}
          </div>
        )}
        <span className="max-w-[90px] truncate text-xs font-medium text-zinc-300 group-hover:text-white">
          {userName}
        </span>
        <ChevronIcon isOpen={isOpen} />
      </Pill>

      {isOpen && (
        <UserMenu
          userName={userName}
          onClose={close}
          onSignOut={handleSignOut}
        />
      )}
    </div>
  );
};
