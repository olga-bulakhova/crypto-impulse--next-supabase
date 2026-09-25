import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';

export const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 selection:bg-cyan-500/20">
      {/* 🟢 ВЕРХНЯЯ ШАПКА ПЛАТФОРМЫ */}
      <Header />

      {/* 🧱 ОСНОВНОЙ КОНТЕНТ СТРАНИЦЫ */}
      <main className="flex-1">{children}</main>

      {/* 🔴 НАШ НОВЫЙ СТИЛЬНЫЙ ПОДВАЛ */}
      <Footer />
    </div>
  );
};
