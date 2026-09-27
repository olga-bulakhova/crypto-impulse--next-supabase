import Link from 'next/link';

export const Logo = () => {
  return (
    <Link
      href="/"
      className="flex animate-in items-center gap-2 font-bold tracking-tight text-white duration-300 fade-in hover:opacity-90"
    >
      <span className="text-[hsl(var(--cyber-blue))] text-cyan-400">
        Crypto
      </span>
      Analysis
    </Link>
  );
};
