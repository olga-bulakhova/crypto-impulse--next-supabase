'use client';

import Link from 'next/link';
import { DashboardIcon } from '@/shared/icons/DashboardIcon';
import { LogoutIcon } from '@/shared/icons/LogoutIcon';
import { ROUTES } from '@/shared/constants';

interface UserMenuProps {
  userName: string;
  onClose: () => void;
  onSignOut: () => Promise<void>;
}

const menuLinkStyles =
  'group flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-white focus:outline-none';

const menuIconStyles =
  'h-3.5 w-3.5 text-zinc-500 transition-colors group-hover:text-zinc-300';

export const UserMenu = ({ onClose, onSignOut }: UserMenuProps) => {
  return (
    <div className="absolute right-0 mt-2 w-48 origin-top-right animate-in rounded-xl border border-zinc-900 bg-zinc-950/95 p-1.5 shadow-2xl shadow-cyan-500/[0.03] backdrop-blur-xl transition-all duration-200 fade-in slide-in-from-top-2">
      <Link
        href={ROUTES.DASHBOARD}
        onClick={onClose}
        className={menuLinkStyles}
      >
        <DashboardIcon className={menuIconStyles} />
        <span>Личный кабинет</span>
      </Link>

      <button onClick={onSignOut} className={menuLinkStyles}>
        <LogoutIcon className={menuIconStyles} /> <span>Выйти из системы</span>
      </button>
    </div>
  );
};
