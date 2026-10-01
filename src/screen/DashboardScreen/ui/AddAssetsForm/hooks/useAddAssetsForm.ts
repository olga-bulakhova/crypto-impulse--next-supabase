import { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { addAssetToPortfolioAction } from '@/screen/DashboardScreen/model';


export const addAssetSchema = z.object({
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

export type AddAssetInputs = z.infer<typeof addAssetSchema>;

interface CoinOption {
  value: string;
  label: string;
  livePrice: number;
}

interface UseAddAssetsFormProps {
  coinOptions: CoinOption[];
}

const defaultValues: AddAssetInputs = {
  coinId: '',
  amount: 0,
  price: 0,
  date: new Date(),
  total: 0,
};


export const useAddAssetsForm = ({ coinOptions }: UseAddAssetsFormProps) => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<AddAssetInputs>({
    resolver: zodResolver(addAssetSchema),
    defaultValues,
  });

  const watchedCoinId = form.watch('coinId');
  const watchedAmount = form.watch('amount');
  const watchedPrice = form.watch('price');


  useEffect(() => {
    if (!watchedCoinId) return;

    const selectedCoin = coinOptions.find(
      (coin) => coin.value === watchedCoinId,
    );

    if (selectedCoin) {
      form.setValue('price', selectedCoin.livePrice, { shouldValidate: true });
    }
  }, [watchedCoinId, coinOptions, form]);


  useEffect(() => {
    const amount = Number(watchedAmount) || 0;
    const price = Number(watchedPrice) || 0;
    const calculatedTotal = Number((amount * price).toFixed(2));

    form.setValue('total', calculatedTotal, { shouldValidate: true });
  }, [watchedAmount, watchedPrice, form]);


  const handleFormSubmit = form.handleSubmit(async (data) => {
    try {
      await addAssetToPortfolioAction({
        coinId: data.coinId,
        amount: data.amount,
        price: data.price,
        date: data.date,
      } as Parameters<typeof addAssetToPortfolioAction>[0]);

      console.log(
        '✅ Данные успешно запечатаны в UserAssetsStorage на сервере!',
      );

      router.refresh();
      setIsSuccess(true);
      form.reset(defaultValues);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        '[FORM_SUBMIT_ERROR] Сбой добавления актива:',
        errorMessage,
      );
    }
  });

  const handleResetSuccess = () => {
    form.reset();
    setIsSuccess(false);
  };

  return {
    form,
    isSuccess,
    handleFormSubmit,
    handleResetSuccess,
  };
};
