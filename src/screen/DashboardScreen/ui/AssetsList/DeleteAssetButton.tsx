'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { TrashIcon } from '@/shared/icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shared/ui/kit/alert-dialog'; // Корректный путь к вашему застилизованному окну

interface DeleteAssetButtonProps {
  assetId: string;
  assetName: string;
  onDelete?: (id: string) => Promise<void> | void;
}

export const DeleteAssetButton = ({
  assetId,
  assetName,
  onDelete,
}: DeleteAssetButtonProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!onDelete) return;
    try {
      setIsOpen(false);
      setIsDeleting(true);
      await onDelete(assetId);
    } catch (error: unknown) {
      console.error('[DELETE_ASSET_ERROR]', error);
      setIsDeleting(false);
    }
  };

  if (!onDelete) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="danger"
            size="sm"
            isLoading={isDeleting}
            className="absolute top-3 right-3 !size-7 rounded-lg !p-0 opacity-60 transition-all duration-200 hover:opacity-100"
            aria-label="Удалить транзакцию"
          >
            <TrashIcon className="size-3.5 stroke-[2.2]" />
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удалить транзакцию?</AlertDialogTitle>
          <AlertDialogDescription>
            Вы собираетесь безвозвратно удалить запись о покупке актива{' '}
            {assetName.toUpperCase()} из оперативной памяти вашего портфеля. Это
            действие нельзя будет отменить.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel />

          <AlertDialogAction onClick={handleDeleteConfirm}>
            Удалить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
