import { Container } from '@/shared/ui/Container';
import { CoinList } from './CoinList';

export const HomeScreen = () => {
  return (
    <Container maxWidth="6xl">
      <CoinList />
    </Container>
  );
};
