import { useId } from 'react';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { Field, FieldError, FieldLabel } from '@/shared/ui/kit/field';
import { Input } from '@/shared/ui/kit/input';

interface FormInputProps<TFieldValues extends FieldValues> extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'name' | 'defaultValue'
> {
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
  disabled,
  ...props
}: FormInputProps<TFieldValues>) {
  const generatedId = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, name: fieldName, onBlur, ref },
        fieldState,
      }) => (
        <Field
          className="relative gap-2 pb-4"
          data-invalid={fieldState.invalid}
        >
          <FieldLabel htmlFor={generatedId}>{label}</FieldLabel>

          {type === 'number' ? (
            <NumericFormat
              id={generatedId}
              name={fieldName}
              onBlur={onBlur}
              getInputRef={ref}
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={disabled}
              value={value === 0 || value === '' ? '' : value}

              // Настройки маски:
              allowNegative={false} // Запрещаем ввод знака минус
              decimalScale={6} // Разрешаем до 6 знаков после запятой (для дешевых коинов)
              allowedDecimalSeparators={[',', '.']} // Разрешаем ввод и точки, и запятой (сама сконвертирует)

              // Самый важный проп: вытаскивает чистые данные для Zod и React Hook Form
              onValueChange={(values) => {
                // values.floatValue содержит чистое число (number), либо undefined если инпут пустой
                onChange(
                  values.floatValue === undefined ? '' : values.floatValue,
                );
              }}

              // Кастомизируем внешний вид, рендеря наш красивый базовый Input из UI-кита
              customInput={Input}
              aria-invalid={fieldState.invalid}
              {...(props as Record<string, unknown>)}
            />
          ) : (
            /* 🔵 СЦЕНАРИЙ 2: ОБЫЧНЫЙ ТЕКСТОВЫЙ ИНПУТ */
            <Input
              id={generatedId}
              name={fieldName}
              value={value ?? ''}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              type={type}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              autoComplete={autoComplete}
              disabled={disabled}
              {...props}
            />
          )}

          {fieldState.invalid && fieldState.error && (
            <FieldError
              className="absolute -bottom-1 left-0 animate-in text-xs text-brand-red duration-200 fade-in"
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
