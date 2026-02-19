import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import { useCreateCategoryMutation } from '@/shared/api'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/ui/components/ui/field'
import { Input } from '@/shared/ui/components/ui/input'
import { CustomButton } from '@/shared/ui/customButton'

import s from './createCategoryForm.module.scss'

const schema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  description: z.string().min(1, 'Описание обязательно'),
})

type CategorySchema = z.infer<typeof schema>

interface ICreateCategoryForm {
  editData?: CategorySchema | null
}

export function CreateCategoryForm({ editData }: ICreateCategoryForm) {
  const { mutateAsync } = useCreateCategoryMutation()

  const { handleSubmit, reset, control } = useForm<CategorySchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: editData?.description ?? '',
      title: editData?.title ?? '',
    },
    mode: 'onTouched',
  })

  const onSubmit: SubmitHandler<CategorySchema> = async (data) => {
    await mutateAsync(data)
    reset()
  }

  const submitText = editData ? 'Сохранить' : 'Создать'

  return (
    <div className={s['category-form']}>
      <form
        id="create-category"
        onSubmit={handleSubmit(onSubmit)}
        className={s['category-form__card']}
      >
        <div className={s['category-form__head']}>
          <div className={s['category-form__title-block']}>
            <h3 className={s['category-form__title']}>
              {editData ? 'Редактирование категории' : 'Новая категория'}
            </h3>
            <p className={s['category-form__subtitle']}>
              Название и описание будут видны покупателям.
            </p>
          </div>
        </div>

        <FieldGroup className={s['category-form__grid']}>
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Field className={s['category-form__field']}>
                <FieldLabel htmlFor="category-title">Название</FieldLabel>
                <Input
                  {...field}
                  autoComplete="off"
                  id="category-title"
                  placeholder="Бытовая техника"
                  aria-invalid={fieldState.invalid}
                  className={s['category-form__input']}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <Field className={s['category-form__field']}>
                <FieldLabel htmlFor="category-description">Описание</FieldLabel>
                <Input
                  {...field}
                  autoComplete="off"
                  id="category-description"
                  aria-invalid={fieldState.invalid}
                  placeholder="Техника для дома и кухни"
                  className={s['category-form__input']}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      <div className={s['category-form__actions']}>
        <CustomButton type="submit" form="create-category" className="rich-btn">
          {submitText}
        </CustomButton>

        <CustomButton
          type="button"
          variant="destructive"
          onClick={() => reset()}
          className="rich-btn rich-btn--danger"
        >
          Сбросить
        </CustomButton>
      </div>
    </div>
  )
}
