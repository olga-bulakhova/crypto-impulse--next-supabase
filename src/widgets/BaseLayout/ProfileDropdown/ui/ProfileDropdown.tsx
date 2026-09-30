'use client';

import { UserMenu } from './UserMenu';
import { ChevronIcon } from '@/shared/icons';
import { Pill } from '@/shared/ui/Pill';
import { useProfileDropdown } from '../model/useProfileDropdown';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/kit/avatar';

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
        <Avatar className="h-5 w-5">
          {avatarUrl && <AvatarImage src={avatarUrl} alt={userName} />}
          <AvatarFallback>{userName.slice(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>
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
