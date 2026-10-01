import { Metadata } from 'next';
import { DashboardScreen } from '@/screen/DashboardScreen';

export const metadata: Metadata = {
  title: 'Портфель | Crypto Analise',
  description:
    'Интеллектуальная панель сквозного аудита цифровых активов, структуры аллокации и расчетов метрик PnL в реальном времени.',
  // Дополнительные финтех-теги для защиты от индексации приватных зон (опционально)
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  return <DashboardScreen />;
}
