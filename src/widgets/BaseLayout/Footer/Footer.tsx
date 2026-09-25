import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/shared/constants';
import { Logo } from '@/shared/ui/Logo';

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}
const FooterSection = ({ title, children }: FooterSectionProps) => (
  <div>
    <h4 className="mb-3 text-[10px] font-bold tracking-widest text-zinc-400 uppercase">
      {title}
    </h4>
    <ul className="flex flex-col gap-2 text-xs">{children}</ul>
  </div>
);

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  isExternal?: boolean;
}
const FooterLink = ({
  href,
  children,
  isExternal = false,
}: FooterLinkProps) => {
  const linkStyles = 'transition-colors hover:text-zinc-300 focus:outline-none';

  if (isExternal) {
    return (
      <li>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkStyles}
        >
          {children}
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link href={href} className={linkStyles}>
        {children}
      </Link>
    </li>
  );
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-900 bg-zinc-950 font-sans text-zinc-500">
      <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* БЛОК ИНФОРМАЦИИ О БРЕНДЕ */}
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-zinc-600">
              Платформа автоматического сканирования и анализа аномальной
              активности криптовалютных рынков. Все данные предоставляются
              исключительно в информационных целях и не являются финансовым
              советом.
            </p>
          </div>

          {/* СЕКЦИЯ 1: НАВИГАЦИЯ (Используем новые компоненты) */}
          <FooterSection title="Навигация">
            <FooterLink href={ROUTES.HOME}>Живой радар</FooterLink>
            <FooterLink href={ROUTES.AUTH.LOGIN}>Личный кабинет</FooterLink>
          </FooterSection>

          {/* СЕКЦИЯ 2: ИНФРАСТРУКТУРА (Используем новые компоненты) */}
          <FooterSection title="Инфраструктура">
            <FooterLink href={ROUTES.EXTERNAL.COIN_STATS_API} isExternal>
              API сопряжение: CoinStats
            </FooterLink>

            {/* Пульсирующий живой маяк статуса систем */}
            <li className="flex items-center gap-2 text-[11px] text-emerald-400/90 select-none">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              </span>
              Системы в норме
            </li>
          </FooterSection>
        </div>

        {/* НИЖНЯЯ СТРОКА: КОПИРАЙТ */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-zinc-900/60 pt-6 text-[11px] text-zinc-600 sm:flex-row">
          <p>© {currentYear} Crypto Impulse. Все права защищены.</p>
          <p className="font-mono text-[10px] tracking-wider uppercase">
            Built with Next.js & Supabase
          </p>
        </div>
      </div>
    </footer>
  );
};
