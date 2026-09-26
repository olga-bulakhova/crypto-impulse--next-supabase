import type { Metadata } from 'next';
// 🌟 Импортируем новые технологичные шрифты из Google Fonts
import { Plus_Jakarta_Sans, Space_Mono, Inter } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


// Настраиваем основной финтех-шрифт
const jakartaSans = Plus_Jakarta_Sans({
  variable: '--font-jakarta-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

// Настраиваем моноширинный шрифт для вывода хэшей, токенов и цен
const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Crypto Impulse 🚀 | Живой Радар Крипто-Аномалий',
  description:
    'Реактивный мониторинг пампов, дампов и резких всплесков объемов криптовалют в реальном времени на базе Supabase и CoinStats API.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru" // Изменили язык на русский
      className={cn("h-full", "antialiased", jakartaSans.variable, spaceMono.variable, "font-sans", inter.variable)}
    >
      <body className="flex min-h-full flex-col bg-zinc-950 font-sans text-zinc-100">
        {children}
      </body>
    </html>
  );
}
