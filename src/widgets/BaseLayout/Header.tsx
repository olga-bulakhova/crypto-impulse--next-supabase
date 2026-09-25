import Link from 'next/link';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
      {/* 📊 БЕГУЩАЯ СТРОКА КУРСОВ */}
      <div className="flex h-7 items-center overflow-hidden bg-zinc-900 text-[10px] font-medium text-zinc-400">
        <div className="flex animate-pulse gap-6 px-4">
          <span>🔥 BTC: $84,230 (+2.4%)</span>
          <span>⚡ ETH: $2,650 (-1.1%)</span>
          <span>💎 SOL: $182 (+5.4%)</span>
          <span>📊 TON: $5.40 (+0.8%)</span>
        </div>
      </div>

      {/* 🚀 ГЛАВНАЯ НАВИГАЦИОННАЯ ПАНЕЛЬ */}
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link
          href="/"
          className="animate-in fade-in flex items-center gap-2 font-bold tracking-tight text-white duration-300 hover:opacity-90"
        >
          {/* 🌟 ИСПРАВЛЕНО: Теперь цвет берется строго из нашей CSS-переменной кибер-синего цвета! */}
          <span className="text-[hsl(var(--cyber-blue))] text-cyan-400">
            Crypto
          </span>
          Impulse
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-zinc-400 transition-colors hover:text-white"
          >
            Личный кабинет
          </Link>
        </nav>
      </div>
    </header>
  );
};
