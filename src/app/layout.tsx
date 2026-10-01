import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Mono, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const jakartaSans = Plus_Jakarta_Sans({
  variable: '--font-jakarta-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Crypto Analise | Профессиональный терминал аналитики крипто-активов',
  description:
    'Экосистема сквозного анализа волатильности, рыночной капитализации и детекции рыночных отклонений. Инструменты непрерывного аудита портфеля, структуры аллокации и расчетов чистой прибыли PnL в реальном времени.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={cn(
        'h-full',
        'antialiased',
        jakartaSans.variable,
        spaceMono.variable,
        'font-sans',
        inter.variable,
      )}
    >
      <body className="flex min-h-full flex-col bg-zinc-950 font-sans text-zinc-100">
        {children}
      </body>
    </html>
  );
}
