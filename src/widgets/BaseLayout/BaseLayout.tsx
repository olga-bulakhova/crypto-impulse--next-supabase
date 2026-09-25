import { Header } from './Header';

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 selection:bg-emerald-500/20">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
};
