import {
  type ArrayPath,
  type Control,
  type FieldArray,
  type FieldValues,
  type Path,
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

export type GroupOptionItem = {
  groupName: string
  options: { name: string; value: string }[]
}

type OptionsListProps<TForm extends FieldValues> = {
  control: Control<TForm, any, TForm>
  register: UseFormRegister<TForm>
  optionsPath: ArrayPath<TForm>
  disabled?: boolean
  error?: any
}

function OptionsList<TForm extends FieldValues>({
  control,
  register,
  optionsPath,
  disabled,
  error,
}: OptionsListProps<TForm>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: optionsPath,
  })

  return (
    <div className={s['grouped-options__options']}>
      {fields.map((opt, optIndex) => {
        const namePath = `${optionsPath}.${optIndex}.name` as Path<TForm>
        const valuePath = `${optionsPath}.${optIndex}.value` as Path<TForm>

        return (
          <div key={opt.id} className={s['grouped-options__option-row']}>
            <div className={s['grouped-options__dots']} aria-hidden="true" />

            <Input
              placeholder="Параметр (например, Диагональ экрана)"
              disabled={disabled}
              className={s['grouped-options__input']}
              {...register(namePath)}
            />

            <Input
              placeholder='Значение (например, 6.9")'
              disabled={disabled}
              className={s['grouped-options__input']}
              {...register(valuePath)}
            />

            <CustomButton
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
            </CustomButton>

            {(error?.[optIndex]?.name?.message ||
              error?.[optIndex]?.value?.message) && (
              <div className={s['grouped-options__row-error']}>
                {error?.[optIndex]?.name?.message && (
                  <FieldError>
                    {String(error[optIndex].name.message)}
                  </FieldError>
                )}
                {error?.[optIndex]?.value?.message && (
                  <FieldError>
                    {String(error[optIndex].value.message)}
                  </FieldError>
                )}
              </div>
            )}
          </div>
        )
      })}

      <div className={s['grouped-options__options-actions']}>
        <CustomButton
          type="button"
          variant="secondary"
          onClick={() =>
            append({ name: '', value: '' } as FieldArray<
              TForm,
              ArrayPath<TForm>
            >)
          }
          disabled={disabled}
          className={clsx('rich-btn', s['grouped-options__add-btn'])}
        >
          <Plus size={18} />
          Добавить характеристику
        </CustomButton>
      </div>
    </div>
  )
}

type GroupedOptionsEditorProps<TForm extends FieldValues> = {
  control: Control<TForm, any, TForm>
  register: UseFormRegister<TForm>
  name: ArrayPath<TForm>
  error?: any
  disabled?: boolean
  className?: string
}

export function GroupedOptionsEditor<TForm extends FieldValues>({
  control,
  register,
  name,
  error,
  disabled,
  className,
}: GroupedOptionsEditorProps<TForm>) {
  const { fields, append, remove } = useFieldArray({ control, name })

  return (
    <div className={clsx(s['grouped-options'], className)}>
      <div className={s['grouped-options__head']}>
        <div>
          <FieldLabel>Характеристики и описание</FieldLabel>
          <FieldDescription>
            Добавь группы (например, "Экран", "Память") и характеристики внутри
            них.
          </FieldDescription>
        </div>

        <CustomButton
          type="button"
          variant="secondary"
          onClick={() =>
            append({
              groupName: '',
              options: [{ name: '', value: '' }],
            } as FieldArray<TForm, ArrayPath<TForm>>)
          }
          disabled={disabled}
          className={clsx('rich-btn', s['grouped-options__add-btn'])}
        >
          <Plus size={18} />
          Добавить группу
        </CustomButton>
      </div>

      {typeof error?.message === 'string' && (
        <FieldError>{error.message}</FieldError>
      )}

      <div className={s['grouped-options__list']}>
        {fields.map((group, groupIndex) => {
          const groupErr = error?.[groupIndex]
          const groupNamePath = `${name}.${groupIndex}.groupName` as Path<TForm>
          const optionsPath =
            `${name}.${groupIndex}.options` as ArrayPath<TForm>

          return (
            <div key={group.id} className={s['grouped-options__group']}>
              <div className={s['grouped-options__group-head']}>
                <Input
                  placeholder="Название группы (например, Экран)"
                  disabled={disabled}
                  className={s['grouped-options__group-name']}
                  {...register(groupNamePath)}
                />

                <CustomButton
                  type="button"
                  variant="destructive"
                  onClick={() => remove(groupIndex)}
                  disabled={disabled}
                  className={clsx('rich-btn', 'rich-btn--danger')}
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
                optionsPath={optionsPath}
                disabled={disabled}
                error={groupErr?.options}
              />

              {typeof groupErr?.options?.message === 'string' && (
                <FieldError>{String(groupErr.options.message)}</FieldError>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
