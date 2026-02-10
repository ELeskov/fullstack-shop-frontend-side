import { useEffect, useMemo, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'motion/react'
import { z } from 'zod'

import { useCreateMutation } from '@/shared/api'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/shared/ui/components/ui/field'
import { Input } from '@/shared/ui/components/ui/input'
import { Textarea } from '@/shared/ui/components/ui/textarea'
import { CustomButton } from '@/shared/ui/customButton'
import { PhotoUploader } from '@/shared/ui/photoUploaded/photoUploaded'

const schema = z.object({
  title: z.string().trim().min(1, 'Название обязательно'),
  description: z.string().trim().min(1, 'Описание обязательно'),
})

type ShopSchema = z.infer<typeof schema>

interface ICreateShopForm {
  editData?: Partial<ShopSchema> | null
}

export function CreateShopForm({ editData }: ICreateShopForm) {
  const [logo, setLogo] = useState<File | null>(null)

  const defaultValues = useMemo<ShopSchema>(
    () => ({
      title: editData?.title ?? '',
      description: editData?.description ?? '',
    }),
    [editData],
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ShopSchema>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onBlur',
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const { mutateAsync, isPending } = useCreateMutation()
  const isBusy = isSubmitting || isPending

  const onSubmit: SubmitHandler<ShopSchema> = async (values) => {
    await mutateAsync(values)
    reset({ title: '', description: '' })
  }

  const submitLabel = editData ? 'Сохранить' : 'Создать магазин'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex flex-col gap-5"
    >
      <PhotoUploader value={logo} onChange={setLogo} maxSizeMB={5} />

      <form id="create-shop" onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup className="grid grid-cols-1 gap-5">
            <Field>
              <FieldLabel htmlFor="shop-title">Название магазина</FieldLabel>
              <Input
                {...register('title')}
                id="shop-title"
                autoComplete="off"
                placeholder="Например: TechZone"
                aria-invalid={!!errors.title}
                disabled={isBusy}
              />
              {errors.title?.message && (
                <FieldError>{errors.title.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="shop-description">Описание</FieldLabel>
              <Textarea
                {...register('description')}
                id="shop-description"
                placeholder="Коротко опишите, что продаёте и чем отличаетесь"
                aria-invalid={!!errors.description}
                disabled={isBusy}
                className="min-h-28"
              />
              <FieldDescription>
                1–2 предложения: категория товаров, доставка, гарантия и т.д.
              </FieldDescription>
              {errors.description?.message && (
                <FieldError>{errors.description.message}</FieldError>
              )}
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, delay: 0.12 }}
        className="flex flex-col gap-2 sm:flex-row sm:items-center"
      >
        <CustomButton
          type="submit"
          form="create-shop"
          disabled={isBusy || !isValid}
          className="w-full sm:w-auto"
        >
          {submitLabel}
        </CustomButton>

        <CustomButton
          type="button"
          variant="destructive"
          onClick={() => reset(defaultValues)}
          disabled={isBusy}
          className="w-full sm:w-auto"
        >
          Сбросить
        </CustomButton>
      </motion.div>
    </motion.div>
  )
}
