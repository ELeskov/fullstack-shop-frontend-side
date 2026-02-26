import {
  type Control,
  type FieldErrors,
  useFieldArray,
  type UseFormRegister,
} from 'react-hook-form'

import clsx from 'clsx'
import { Plus, Trash2, X } from 'lucide-react'

import {
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/shared/ui/components/ui/field'
import { Input } from '@/shared/ui/components/ui/input'
import { CustomButton } from '@/shared/ui/customButton'

import s from './productFormOptionsList.module.scss'

type OptionInput = {
  name: string
  value: string
}

export type GroupOptionInput = {
  groupName: string
  options: OptionInput[]
}

type Props<TForm extends { groupedOptions: GroupOptionInput[] }> = {
  control: Control<TForm>
  register: UseFormRegister<TForm>
  errors: FieldErrors<TForm>
  disabled?: boolean
  className?: string
}

function OptionsList<TForm extends { groupedOptions: GroupOptionInput[] }>({
  control,
  register,
  disabled,
  groupIndex,
  error,
}: {
  control: Control<TForm>
  register: UseFormRegister<TForm>
  disabled?: boolean
  groupIndex: number
  error?: any
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `groupedOptions.${groupIndex}.options` as const,
  })

  return (
    <div className={s['grouped-options__options']}>
      {fields.map((opt, optIndex) => (
        <div key={opt.id} className={s['grouped-options__option-row']}>
          <div className={s['grouped-options__dots']} aria-hidden="true" />

          <Input
            placeholder="Параметр (например, Диагональ экрана)"
            disabled={disabled}
            className={s['grouped-options__input']}
            {...register(
              `groupedOptions.${groupIndex}.options.${optIndex}.name` as const,
            )}
          />

          <Input
            placeholder="Значение (например, 6.9)"
            disabled={disabled}
            className={s['grouped-options__input']}
            {...register(
              `groupedOptions.${groupIndex}.options.${optIndex}.value` as const,
            )}
          />

          <button
            type="button"
            className={clsx(
              'rich-btn',
              'rich-btn--icon',
              'rich-btn--danger',
              s['grouped-options__remove-opt'],
            )}
            onClick={() => remove(optIndex)}
            disabled={disabled}
            aria-label="Удалить характеристику"
            title="Удалить"
          >
            <X size={16} />
          </button>

          {error?.[optIndex]?.name?.message && (
            <div className={s['grouped-options__row-error']}>
              <FieldError>{String(error[optIndex].name.message)}</FieldError>
            </div>
          )}

          {error?.[optIndex]?.value?.message && (
            <div className={s['grouped-options__row-error']}>
              <FieldError>{String(error[optIndex].value.message)}</FieldError>
            </div>
          )}
        </div>
      ))}

      <div className={s['grouped-options__options-actions']}>
        <CustomButton
          type="button"
          variant="secondary"
          onClick={() => append({ name: '', value: '' } as any)}
          disabled={disabled}
          className={s['grouped-options__add-btn']}
        >
          <Plus size={18} />
          Добавить характеристику
        </CustomButton>
      </div>
    </div>
  )
}

export function GroupedOptionsEditor<
  TForm extends { groupedOptions: GroupOptionInput[] },
>({ control, register, errors, disabled, className }: Props<TForm>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'groupedOptions' as const,
  })

  const groupsError: any = (errors as any)?.groupedOptions

  return (
    <div className={clsx(s['grouped-options'], className)}>
      <div className={s['grouped-options__head']}>
        <div>
          <FieldLabel>Характеристики и описание</FieldLabel>
          <FieldDescription>
            Добавь группы (например, “Экран”, “Память”) и характеристики внутри
            них.
          </FieldDescription>
        </div>

        <CustomButton
          type="button"
          variant="secondary"
          onClick={() =>
            append({ groupName: '', options: [{ name: '', value: '' }] } as any)
          }
          disabled={disabled}
          className={s['grouped-options__add-btn']}
        >
          <Plus size={18} />
          Добавить группу
        </CustomButton>
      </div>

      {typeof groupsError?.message === 'string' && (
        <FieldError>{groupsError.message}</FieldError>
      )}

      <div className={s['grouped-options__list']}>
        {fields.map((group, groupIndex) => {
          const groupErr = groupsError?.[groupIndex]
          return (
            <div key={group.id} className={s['grouped-options__group']}>
              <div className={s['grouped-options__group-head']}>
                <Input
                  placeholder="Название группы (например, Экран)"
                  disabled={disabled}
                  className={s['grouped-options__group-name']}
                  {...register(
                    `groupedOptions.${groupIndex}.groupName` as const,
                  )}
                />

                <CustomButton
                  type="button"
                  variant="destructive"
                  onClick={() => remove(groupIndex)}
                  disabled={disabled}
                  className={s['grouped-options__remove-group']}
                >
                  <Trash2 size={18} />
                  Удалить
                </CustomButton>
              </div>

              {groupErr?.groupName?.message && (
                <FieldError>{String(groupErr.groupName.message)}</FieldError>
              )}

              <OptionsList<TForm>
                control={control}
                register={register}
                disabled={disabled}
                groupIndex={groupIndex}
                error={groupErr?.options}
              />

              {groupErr?.options?.message && (
                <FieldError>{String(groupErr.options.message)}</FieldError>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
