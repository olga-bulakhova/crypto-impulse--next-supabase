import { useId } from 'react';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/kit/select';
import { Field, FieldError, FieldLabel } from '@/shared/ui/kit/field';

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  options: SelectOption[];
  placeholder?: string;
}

export function FormSelect<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder = 'Выберите значение',
}: FormSelectProps<TFieldValues>) {
  const generatedId = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState }) => {
        // Находим активный label для отображения в триггеры
        const selectedOption = options.find((option) => option.value === value);
        const displayLabel = selectedOption
          ? selectedOption.label
          : placeholder;

        return (
          <Field
            // 🌟 ИСПРАВЛЕНО: Добавили relative и pb-4 для бронирования места под ошибку (форма больше не прыгает)
            className="relative flex flex-col gap-1.5 pb-4"
            data-invalid={fieldState.invalid}
          >
            <FieldLabel htmlFor={generatedId}>{label}</FieldLabel>

            <Select value={value ?? ''} onValueChange={onChange}>
              <SelectTrigger id={generatedId} aria-invalid={fieldState.invalid}>
                <SelectValue placeholder={placeholder}>
                  {displayLabel}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 🌟 ИСПРАВЛЕНО: Перевели ошибку в абсолютное позиционирование в самый низ контейнера */}
            {fieldState.invalid && fieldState.error && (
              <FieldError
                className="absolute top-15 left-0 animate-in text-[11px] leading-tight font-medium text-red-500 duration-200 select-none fade-in"
                errors={[fieldState.error]}
              >
                {fieldState.error.message}
              </FieldError>
            )}
          </Field>
        );
      }}
    />
  );
}
