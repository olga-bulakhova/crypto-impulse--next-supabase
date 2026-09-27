import { CoinList } from './CoinList';

export const HomeScreen = () => {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 font-sans selection:bg-cyan-500/20">
      <CoinList />
    </div>
  );
};
