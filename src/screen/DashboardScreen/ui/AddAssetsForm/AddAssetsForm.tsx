'use client';

import { useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { FieldGroup } from '@/shared/ui/kit/field';
import { FormInput, FormSelect } from '@/shared/ui/form';
import { Button } from '@/shared/ui/Button';
import { FormDatePicker } from '@/shared/ui/form/FormDatePicker';
import { useRouter } from 'next/navigation';
import { addAssetToPortfolioAction } from '../../model';

interface CoinOption {
  value: string;
  label: string;
  livePrice: number;
}

interface AddAssetsFormProps {
  coinOptions: CoinOption[];
  onSuccess?: () => void;
}

const schema = z.object({
  coinId: z.string().min(1, { message: 'Выберите криптовалюту' }),
  amount: z
    .number({ message: 'Введите число' })
    .min(0.000001, { message: 'Минимум 0.000001' }),
  price: z
    .number({ message: 'Введите число' })
    .min(0.01, { message: 'Минимум $0.01' }),
  date: z.date({ message: 'Выберите дату операции' }),
  total: z.number({ message: 'Введите число' }),
});

type Inputs = z.infer<typeof schema>;

const defaultValues: Inputs = {
  coinId: '',
  amount: 0,
  price: 0,
  date: new Date(),
  total: 0,
};

export const AddAssetsForm = ({
  coinOptions,
  onSuccess,
}: AddAssetsFormProps) => {
  const form = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const router = useRouter();

  const watchedCoinId = form.watch('coinId');
  const watchedAmount = form.watch('amount');
  const watchedPrice = form.watch('price');

  useEffect(() => {
    if (!watchedCoinId) return;

    // Ищем выбранную монету в переданных сверху опциях
    const selectedCoin = coinOptions.find(
      (coin) => coin.value === watchedCoinId,
    );

    if (selectedCoin) {
      // Автоматически устанавливаем живую цену в инпут price
      form.setValue('price', selectedCoin.livePrice, { shouldValidate: true });
    }
  }, [watchedCoinId, coinOptions, form]);

  // 🔄 2. АВТОМАТИЧЕСКИЙ ПЕРЕСЧЕТ: Total = Amount * Price
  useEffect(() => {
    const amount = Number(watchedAmount) || 0;
    const price = Number(watchedPrice) || 0;
    const calculatedTotal = Number((amount * price).toFixed(2));

    form.setValue('total', calculatedTotal, { shouldValidate: true });
  }, [watchedAmount, watchedPrice, form]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      console.log('📥 Клиент инициирует отправку формы:', data);

      // 🟢 ШАГ 1: Вызываем серверное действие для физической записи в globalThis [5.2]
      await addAssetToPortfolioAction({
        coinId: data.coinId,
        amount: data.amount,
        price: data.price,
        date: data.date,
      });

      console.log(
        '✅ Данные успешно запечатаны в UserAssetsStorage на сервере!',
      );

      // 🟢 ШАГ 2: Сообщаем роутеру Next.js, что серверные компоненты портфеля нужно перерендерить [5.2]
      router.refresh();

      // Очищаем форму, возвращая её в исходное чистое состояние
      form.reset(defaultValues);

      // Триггерим закрытие шторки сайдбара наружу
      if (onSuccess) onSuccess();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        '[FORM_SUBMIT_ERROR] Сбой добавления актива:',
        errorMessage,
      );
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-5 font-sans"
    >
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
