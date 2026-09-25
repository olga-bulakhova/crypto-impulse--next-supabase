import Link from 'next/link';

export const Logo = () => {
  return (
    <Link
      href="/"
      className="animate-in fade-in flex items-center gap-2 font-bold tracking-tight text-white duration-300 hover:opacity-90"
    >
      <span className="text-[hsl(var(--cyber-blue))] text-cyan-400">
        Crypto
      </span>
      Impulse
    </Link>
  );
};
