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
        const selectedOption = options.find((option) => option.value === value);
        const displayLabel = selectedOption
          ? selectedOption.label
          : placeholder;

        return (
          <Field
            className="relative flex flex-col gap-1.5 pb-4"
            data-invalid={fieldState.invalid}
          >
            <FieldLabel htmlFor={generatedId}>{label}</FieldLabel>

            <Select
              value={value ?? ''}
              onValueChange={(val) => onChange(val ?? '')}
            >
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

            {fieldState.invalid && fieldState.error && (
              <FieldError
                className="absolute -bottom-1 left-0 animate-in text-[11px] leading-tight font-medium duration-200 select-none fade-in"
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
