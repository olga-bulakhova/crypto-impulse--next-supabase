'use client';

import { Button } from '@/shared/ui/Button';
import { useAlertForm } from '../model/useAlertForm';
import { FormInput, FormSelect } from '@/shared/ui/form';

interface AlertFormProps {
  userId: string;
}

// Список опций для выпадающего меню
const POPULAR_COINS = [
  { value: 'all', label: 'Все монеты рынка (Глобальный радар)' },
  { value: 'bitcoin', label: 'Bitcoin (BTC)' },
  { value: 'ethereum', label: 'Ethereum (ETH)' },
  { value: 'solana', label: 'Solana (SOL)' },
  { value: 'ripple', label: 'Ripple (XRP)' },
  { value: 'toncoin', label: 'Toncoin (TON)' },
];

export const AlertForm = ({ userId }: AlertFormProps) => {
  const { form, onSubmit } = useAlertForm(userId);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4 font-sans text-sm"
    >
      {/* 🔮 ВЫБОР МОНЕТЫ ЧЕРЕЗ СТЕКЛЯННЫЙ FORMSELECT SHADCN */}
      <FormSelect
        name="coinId"
        control={form.control}
        label="Крипто-актив"
        options={POPULAR_COINS}
        placeholder="Выберите актив"
      />

      {/* 🔮 ВВОД ПРОЦЕНТА ЧЕРЕЗ ТИПИЗИРОВАННЫЙ FORMINPUT */}
      <FormInput
        name="minPercentage"
        control={form.control}
        label="Минимальный импульс (%)"
        type="number"
        placeholder="3.0"
      />

      {/* КНОПКА ОТПРАВКИ ФОРМЫ */}
      <Button
        variant="cyber"
        type="submit"
        isLoading={form.formState.isSubmitting} // Используем встроенный стейт загрузки прямо из RHF
        loadingText="Запись на радар..."
        className="mt-2 w-full rounded-xl"
      >
        Включить отслеживание
      </Button>
    </form>
  );
};
