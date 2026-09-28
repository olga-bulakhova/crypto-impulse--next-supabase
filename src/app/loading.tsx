import { Spinner } from '@/shared/ui/kit/spinner'; // Ваш компонент крутящегося индикатора

export default function Loading() {
  return (
    <div className="flex h-[70vh] w-full items-center justify-center bg-zinc-950/40 backdrop-blur-md">
      <Spinner className="size-8" />
    </div>
  );
}
