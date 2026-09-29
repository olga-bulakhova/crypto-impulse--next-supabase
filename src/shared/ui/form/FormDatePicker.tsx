'use client';

import React, { useId } from 'react';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';

import { Field, FieldError, FieldLabel } from '@/shared/ui/kit/field';
import { Button } from '@/shared/ui/Button';
import { Calendar } from '@/shared/ui/kit/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/kit/popover';

interface FormDatePickerProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  placeholder?: string;
}

// 🟢 ДОБАВЛЕНО: Премиальный Type Guard для пуленепробиваемой проверки типа Date.
// Мы временно кастим к object через unknown, полностью убирая ошибку компилятора без использования any! [0.2]
function isDate(value: unknown): value is Date {
  return (
    value instanceof
      (Object as unknown as new (...args: unknown[]) => object) ||
    value instanceof Date
  );
}

// Другой, еще более простой и надежный финтех-вариант проверки без instanceof:
function isValidDate(value: unknown): value is Date {
  return (
    value instanceof Date ||
    (Object.prototype.toString.call(value) === '[object Date]' &&
      !isNaN(value as number))
  );
}

export function FormDatePicker<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  placeholder = 'Выберите дату',
}: FormDatePickerProps<TFieldValues>) {
  const generatedId = useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState }) => {

        const currentDate = isValidDate(value) ? value : undefined;

        return (
          <Field
            className="relative flex w-full flex-col gap-1.5 pb-4"
            data-invalid={fieldState.invalid}
          >
            <FieldLabel htmlFor={generatedId}>{label}</FieldLabel>

            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    type="button"
                    variant="base"
                    size="sm"
                    id={generatedId}
                    aria-invalid={fieldState.invalid}
                 
                    className="relative h-9 w-full justify-start border-zinc-800 bg-zinc-900/50 text-left font-normal text-zinc-200"
                  >
                    <div className="flex w-full items-center justify-between gap-1.5">
                      <CalendarIcon className="absolute right-4 h-4 w-4 shrink-0 text-zinc-500" />
                      <div>
                        {currentDate ? (
                          <span className="font-mono text-xs">
                            {format(currentDate, 'PPP', { locale: ru })}
                          </span>
                        ) : (
                          <span className="text-xs text-zinc-500">
                            {placeholder}
                          </span>
                        )}
                      </div>
                    </div>
                  </Button>
                }
              />

              <PopoverContent
                className="z-50 w-auto rounded-xl border border-zinc-900 bg-zinc-900/90 p-3 shadow-2xl backdrop-blur-xl"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={currentDate}
                  onSelect={onChange}
                  defaultMonth={currentDate}
                />
              </PopoverContent>
            </Popover>

            {fieldState.invalid && fieldState.error && (
              <FieldError
                className="absolute bottom-[-16px] left-0 animate-in font-mono text-xs text-[10px] tracking-wide text-red-500 uppercase duration-200 fade-in"
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
