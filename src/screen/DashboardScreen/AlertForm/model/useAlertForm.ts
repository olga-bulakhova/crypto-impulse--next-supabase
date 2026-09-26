import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClient } from '@/utils/supabase/client';

// 📐 СХЕМА ВАЛИДАЦИИ ZOD
const alertFormSchema = z.object({
  coinId: z.string().min(1, 'Выберите актив из списка'),
  minPercentage: z.coerce
    .number({ message: 'Введите корректное число' })
    .min(0.1, 'Минимальный импульс не может быть меньше 0.1%')
    .max(100, 'Максимальный импульс не может превышать 100%'),
});

type AlertFormInput = z.input<typeof alertFormSchema>;
type AlertFormOutput = z.output<typeof alertFormSchema>;

// Базовые значения: для minPercentage используем строку, чтобы HTML-инпут сбрасывался чисто
const DEFAULT_VALUES: AlertFormInput = {
  coinId: '',
  minPercentage: '' as unknown as number,
};

export const useAlertForm = (userId: string) => {
  const router = useRouter();
  const supabase = createClient();

  // Инициализируем форму с явным указанием типов <Вход, Контекст, Выход>
  const form = useForm<AlertFormInput, undefined, AlertFormOutput>({
    resolver: zodResolver(alertFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { setError, clearErrors, reset } = form;

  /**
   * 🚀 ОБРАБОТЧИК УСПЕШНОЙ ОТПРАВКИ ФОРМЫ (Submit Handler)
   */
  const onSubmit: SubmitHandler<AlertFormOutput> = async (data) => {
    clearErrors();

    console.log(data);

    try {
      // 🔍 Проверяем, отслеживает ли уже юзер эту монету
      const { data: existingAlert, error: checkError } = await supabase
        .from('user_alerts')
        .select('id')
        .eq('user_id', userId)
        .eq('coin_id', data.coinId)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingAlert) {
        setError('coinId', {
          type: 'validate',
          message:
            'Этот актив уже добавлен на ваш радар. Удалите старый, чтобы изменить процент.',
        });
        return;
      }

      // Делаем нативный INSERT запрос в Supabase PostgreSQL [5.2]
      const { error } = await supabase.from('user_alerts').insert({
        user_id: userId,
        coin_id: data.coinId,
        min_percentage: data.minPercentage,
      });

      if (error) throw error;

      // Принудительно сбрасываем форму к начальному состоянию капсулы
      reset(DEFAULT_VALUES);

      // Синхронизируем состояние сервера [5.2]
      router.refresh();
    } catch (error) {
      console.error(
        '[INSERT_ALERT_ERROR] Не удалось сохранить подписку:',
        error,
      );
      setError('minPercentage', {
        type: 'server',
        message: 'Ошибка при сохранении. Проверьте политики RLS.',
      });
    }
  };

  return {
    form,
    onSubmit,
  };
};
