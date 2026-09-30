import { FolderOpenIcon } from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { CyberHeading } from '@/shared/ui/CyberHeading';

export const EmptyAssetsState = () => {
  return (
    <Card
      padding="lg"
      className="flex flex-col items-center justify-center py-12 text-center select-none"
    >
      <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/30 text-zinc-500 shadow-lg shadow-black/10">
        <FolderOpenIcon className="size-5 stroke-[1.8]" />
      </div>

      <CyberHeading as="h3">Портфель пуст</CyberHeading>

      <p className="max-w-[260px] text-xs tracking-wide text-zinc-600">
        Нет открытых позиций. Зафиксируйте первую сделку, чтобы начать
        мониторинг портфеля
      </p>
    </Card>
  );
};
