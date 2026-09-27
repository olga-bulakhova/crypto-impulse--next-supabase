import { CoinCard } from './CoinCard';
import { CryptoStoreManager } from '@/storage';

export const CoinList = async () => {
  const coins = await CryptoStoreManager.getCachedCoins();

  if (coins.length === 0) {
    return (
      <div className="w-full rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6 text-center text-xs text-zinc-500 shadow-2xl backdrop-blur-md">
        Котировки временно недоступны... 📡
      </div>
    );
  }

  return (
    <div className="w-full font-sans select-none">
      <div className="mb-4 flex items-center justify-between border-b border-zinc-900/60 px-1 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_hsl(var(--cyber-blue))]"></span>
          <h2 className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
            Топ активов рынка
          </h2>
        </div>
        <span className="font-mono text-[9px] font-bold tracking-wider text-zinc-600 uppercase select-none">
          CoinStats API
        </span>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {coins.map((coin) => (
          <CoinCard key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
};
