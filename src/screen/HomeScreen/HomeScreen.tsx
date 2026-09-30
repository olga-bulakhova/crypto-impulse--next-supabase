import { Container } from '@/shared/ui/Container';
import { CyberHeading } from '@/shared/ui/CyberHeading'; // Наш универсальный компонент заголовков
import { CoinList } from './CoinList';

export const HomeScreen = () => {
  return (
    <Container maxWidth="6xl">
      <div className="mb-10 max-w-3xl animate-in duration-500 fade-in slide-in-from-top-3">
        <CyberHeading
          as="h1"
          className="text-xl leading-tight font-black tracking-wider text-white md:text-2xl"
        >
          Анализ крипто-капитала
        </CyberHeading>

        <p className="text-2xs mt-2 font-mono leading-relaxed tracking-widest text-zinc-500 uppercase">
          Математический скоринг, аллокация активов и сквозной мониторинг PnL
        </p>
      </div>

      <CoinList />
    </Container>
  );
};
