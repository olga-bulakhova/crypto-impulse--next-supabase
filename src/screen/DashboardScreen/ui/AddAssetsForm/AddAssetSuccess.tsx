import { CheckIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { CyberHeading } from '@/shared/ui/CyberHeading';
import { DrawerClose } from '@/shared/ui/kit/drawer';

interface AddAssetSuccessProps {
  onReset: () => void;
}

export const AddAssetSuccess = ({ onReset }: AddAssetSuccessProps) => {
  return (
    <div className="flex animate-in flex-col items-center justify-center px-4 py-12 text-center duration-300 fade-in">
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 shadow-xl shadow-cyan-500/[0.04]">
        <CheckIcon className="size-6 stroke-[3]" />
      </div>

      <CyberHeading as="h3" className="mb-1.5">
        Актив зафиксирован
      </CyberHeading>

      <p className="mb-8 max-w-[240px] text-xs leading-relaxed tracking-wide text-zinc-500">
        Транзакция успешно записана в защищенное хранилище портфеля.
      </p>

      <div className="flex w-full flex-col gap-2.5">
        <Button
          type="button"
          variant="cyber"
          size="sm"
          className="w-full"
          onClick={onReset}
        >
          <span className="flex items-center gap-1.5">
            <PlusIcon className="mr-1.5 size-4 stroke-[2.5]" />
            <span>Добавить еще актив</span>
          </span>
        </Button>

        <DrawerClose
          render={
            <Button type="button" variant="base" size="sm" className="w-full">
              Готово
            </Button>
          }
        />
      </div>
    </div>
  );
};
