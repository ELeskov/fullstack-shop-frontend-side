import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/shared/ui/components/ui/field'
import { Input } from '@/shared/ui/components/ui/input'
import { CustomButton } from '@/shared/ui/customButton'

const schema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  description: z.string().min(1, 'Описание обязательно'),
  picture: z.file(),
})

type ShopSchema = z.infer<typeof schema>

interface ICreateShopForm {
  editData?: ShopSchema | null
}

export function CreateShopForm({ editData }: ICreateShopForm) {
  const { handleSubmit, reset, control } = useForm<ShopSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: editData?.description ?? '',
      title: editData?.title ?? '',
    },
    mode: 'onTouched',
  })

  const onSubmit: SubmitHandler<ShopSchema> = (data) => {
    console.log(data)
    reset()
  }
  return (
    <div className="flex flex-col gap-5 ">
      <form id="create-shop" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="flex flex-row max-md:flex-col">
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="category-title">Название</FieldLabel>
                <Input
                  {...field}
                  autoComplete="off"
                  id="category-title"
                  placeholder="Бытовая техника"
                  aria-invalid={fieldState.invalid}
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
              <Field>
                <FieldLabel htmlFor="category-description">Описание</FieldLabel>
                <Input
                  {...field}
                  autoComplete="off"
                  id="category-description"
                  aria-invalid={fieldState.invalid}
                  placeholder="Техника для дома и кухни"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <Field orientation="horizontal">
        <CustomButton type="submit" form="create-shop">
          Создать
        </CustomButton>
        <CustomButton
          type="button"
          variant="destructive"
          onClick={() => reset()}
        >
          Сбросить
        </CustomButton>
      </Field>
    </div>
  )
}
