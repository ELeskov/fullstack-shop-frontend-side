import { useEffect, useMemo } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'motion/react'
import { z } from 'zod'

import { UploadShopLogo } from '@/features/uploadShopLogo'

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

const schema = z.object({
  title: z.string().trim().min(1, 'Название обязательно'),
  description: z.string().trim().min(1, 'Описание обязательно'),
  picture: z.string().optional(),
})

type ShopSchema = z.infer<typeof schema>

interface ICreateShopForm {
  editData?: Partial<ShopSchema> | null
}

export function CreateShopForm({ editData }: ICreateShopForm) {
  const defaultValues = useMemo(
    () => ({
      title: editData?.title ?? '',
      description: editData?.description ?? '',
      picture: editData?.picture ?? '',
    }),
    [editData],
  )

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { isSubmitting, isValid },
  } = useForm<ShopSchema>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onTouched',
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const { mutateAsync, isPending } = useCreateMutation()
  const isBusy = isSubmitting || isPending

  const onSubmit: SubmitHandler<ShopSchema> = async (values) => {
    await mutateAsync({
      title: values.title,
      description: values.description,
    })

    reset({ title: '', description: '', picture: '' })
  }

  const submitLabel = editData ? 'Сохранить' : 'Создать магазин'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex flex-col gap-5"
    >
      <form id="create-shop" onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <FieldGroup className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <Controller
                name="picture"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <UploadShopLogo
                      value={field.value}
                      onUploaded={(url) => {
                        setValue('picture', url, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        })
                      }}
                    />
                    {fieldState.invalid && fieldState.error?.message && (
                      <div className="mt-2">
                        <FieldError>{fieldState.error.message}</FieldError>
                      </div>
                    )}
                  </>
                )}
              />
            </div>

            <div className="md:col-span-2">
              <Controller
                name="title"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="shop-title">
                      Название магазина
                    </FieldLabel>
                    <Input
                      {...field}
                      id="shop-title"
                      autoComplete="off"
                      placeholder="Например: TechZone"
                      aria-invalid={fieldState.invalid}
                      disabled={isBusy}
                    />
                    {fieldState.invalid && fieldState.error?.message && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="md:col-span-2">
              <Controller
                name="description"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="shop-description">Описание</FieldLabel>
                    <Textarea
                      {...field}
                      id="shop-description"
                      placeholder="Коротко опишите, что продаёте и чем отличаетесь"
                      aria-invalid={fieldState.invalid}
                      disabled={isBusy}
                      className="min-h-28"
                    />
                    <FieldDescription>
                      1–2 предложения: категория товаров, доставка, гарантия и
                      т.д.
                    </FieldDescription>
                    {fieldState.invalid && fieldState.error?.message && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </div>
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
