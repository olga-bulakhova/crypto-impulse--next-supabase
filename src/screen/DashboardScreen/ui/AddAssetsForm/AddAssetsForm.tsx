'use client';

import { FieldGroup } from '@/shared/ui/kit/field';
import { FormInput, FormSelect } from '@/shared/ui/form';
import { Button } from '@/shared/ui/Button';
import { FormDatePicker } from '@/shared/ui/form/FormDatePicker';
import { AddAssetSuccess } from './AddAssetSuccess';
import { useAddAssetsForm } from './hooks/useAddAssetsForm';

interface CoinOption {
  value: string;
  label: string;
  livePrice: number;
}

interface AddAssetsFormProps {
  coinOptions: CoinOption[];
  onSuccess?: () => void;
}

export const AddAssetsForm = ({ coinOptions }: AddAssetsFormProps) => {
  const { form, isSuccess, handleResetSuccess, handleFormSubmit } =
    useAddAssetsForm({
      coinOptions,
    });

  if (isSuccess) {
    return (
      <AddAssetSuccess
        onReset={() => {
          handleResetSuccess();
        }}
      />
    );
  }

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 font-sans">
      <FieldGroup className="gap-4">
        <FormSelect
          name="coinId"
          control={form.control}
          label="Криптовалюта"
          options={coinOptions}
          placeholder="Выберите монету"
        />

        <FormInput
          name="amount"
          type="number"
          step="any"
          control={form.control}
          label="Количество монет (Amount)"
          placeholder="Например: 0.025"
        />

        <FormInput
          name="price"
          type="number"
          step="any"
          control={form.control}
          label="Цена покупки ($ USD)"
          placeholder="Например: 75244"
        />

        <FormDatePicker
          name="date"
          control={form.control}
          label="Дата совершения сделки"
        />

        <FormInput
          name="total"
          type="number"
          control={form.control}
          label="Всего потрачено ($ USD)"
          placeholder="Рассчитывается автоматически"
          disabled={true}
        />
      </FieldGroup>

      <Button
        type="submit"
        variant="cyber"
        className="mt-2 w-full"
        isLoading={form.formState.isSubmitting}
        loadingText="Сохранение позиции..."
      >
        Зафиксировать актив
      </Button>
    </form>
  );
};
