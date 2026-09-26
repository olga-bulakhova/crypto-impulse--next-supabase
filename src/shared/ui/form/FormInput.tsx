import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { useId } from 'react'; // Встроенный хук React для генерации уникальных ID

import { Input } from '@/shared/ui/kit/input';
import { Field, FieldError, FieldLabel } from '@/shared/ui/kit/field';

interface FormInputProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}

export function FormInput<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  autoComplete = 'off',
}: FormInputProps<TFieldValues>) {
  const generatedId = useId(); // Гарантирует уникальный ID для связки Label и Input

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field }, fieldState }) => (
        <Field
          // 🌟 ИСПРАВЛЕНО: Сделали контейнер relative и заложили pb-4 (отступ снизу),
          // чтобы забронировать место под ошибку и форма никогда не прыгала!
          className="relative flex flex-col gap-1.5 pb-4"
          data-invalid={fieldState.invalid}
        >
          <FieldLabel htmlFor={generatedId}>{label}</FieldLabel>

          <div className="relative w-full">
            <Input
              {...field}
              value={value ?? ''} // Защита от undefined: гарантирует, что инпут никогда не станет неуправляемым
              id={generatedId}
              type={type}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              autoComplete={autoComplete}
              // Если это число, принудительно отдаем в RHF число, а не строку!
              onChange={(e) => {
                const val = e.target.value;
                onChange(
                  type === 'number' ? (val === '' ? '' : Number(val)) : val,
                );
              }}
            />
          </div>

        
          {fieldState.invalid && fieldState.error && (
            <FieldError
              className="absolute top-15 left-0 animate-in text-[11px] font-medium text-red-500 duration-200 select-none fade-in"
              errors={[fieldState.error]}
            >
              {fieldState.error.message}
            </FieldError>
          )}
        </Field>
      )}
    />
  );
}
