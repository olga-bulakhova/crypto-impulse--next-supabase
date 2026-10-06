import { Metadata } from 'next';
import { HomeScreen } from '@/screen/HomeScreen';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Crypto Analise | Терминал анализа волатильности и крипто-активов',
  description:
    'Интеллектуальная экосистема сквозного анализа волатильности и детекции аномалий на криптовалютных рынках. Комплексный аудит торговых импульсов, структуры аллокации и метрик PnL в реальном времени.',

  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return <HomeScreen />;
}
