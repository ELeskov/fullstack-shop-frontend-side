import { useEffect, useMemo, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'motion/react'
import { z } from 'zod'

import { useCreateMutation, useUploadLogoMutation } from '@/shared/api'
import { usePatchShopMutation } from '@/shared/api/shop/usePatchShopMutation'
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
import { PhotoUploader } from '@/shared/ui/photoUploader/photoUploader'

import s from './shopForm.module.scss'

const schema = z.object({
  title: z.string().trim().min(1, 'Название обязательно'),
  description: z.string().trim().min(1, 'Описание обязательно'),
})

export type ShopSchema = z.infer<typeof schema>

interface IShopForm {
  shopId?: string
  editData?: Partial<ShopSchema> | null
  pictureUrl?: string | null
}

export function ShopForm({ shopId, editData, pictureUrl }: IShopForm) {
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
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<ShopSchema>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onTouched',
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const isEditMode = Boolean(shopId)

  const { mutateAsync: createShopMutation, isPending: isCreating } =
    useCreateMutation()

  const { mutateAsync: updateShopMutation, isPending: isUpdating } =
    usePatchShopMutation()

  const { mutateAsync: uploadShopLogoMutation, isPending: isUploadingLogo } =
    useUploadLogoMutation()

  const isBusy = isSubmitting || isCreating || isUpdating || isUploadingLogo

  const onSubmit: SubmitHandler<ShopSchema> = async (values) => {
    const hasNewLogo = Boolean(logo)

    if (isEditMode && !isDirty && !hasNewLogo) {
      return
    }

    let resolvedShopId = shopId

    if (!resolvedShopId) {
      const created = await createShopMutation(values)
      resolvedShopId = created.id
    } else {
      if (isDirty) {
        await updateShopMutation({ ...values, shopId: resolvedShopId })
      }
    }

    if (hasNewLogo && resolvedShopId) {
      const formData = new FormData()
      formData.append('file', logo!)
      formData.append('shopId', resolvedShopId)

      await uploadShopLogoMutation(formData)
      setLogo(null)
    }

    if (!isEditMode) {
      reset({ title: '', description: '' })
    } else {
      reset(values)
    }
  }

  const submitLabel = isEditMode ? 'Сохранить изменения' : 'Создать магазин'
  const resetLabel = isEditMode ? 'Вернуть как было' : 'Сбросить'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={s['shop-form']}
    >
      <form
        id="shop-form"
        onSubmit={handleSubmit(onSubmit)}
        className={s['shop-form__card']}
      >
        <div className={s['shop-form__layout']}>
          <aside className={s['shop-form__aside']}>
            <div className={s['shop-form__section']}>
              <div className={s['shop-form__section-head']}>
                <h3 className={s['shop-form__section-title']}>
                  Логотип магазина
                </h3>
                <p className={s['shop-form__section-subtitle']}>
                  PNG/JPG/WebP до 5MB, лучше 512×512
                </p>
              </div>

              <PhotoUploader
                value={logo}
                onChange={setLogo}
                maxSizeMB={5}
                disabled={isBusy}
                defaultUrl={pictureUrl ?? null}
              />

              <FieldDescription className={s['shop-form__hint']}>
                Совет: квадратные лого лучше выглядят в карточках и на витрине.
              </FieldDescription>
            </div>
          </aside>
          <main className={s['shop-form__main']}>
            <FieldSet>
              <FieldGroup className={s['shop-form__fields']}>
                <Field className={s['shop-form__field']}>
                  <FieldLabel htmlFor="shop-title">Название</FieldLabel>
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

                <Field className={s['shop-form__field']}>
                  <FieldLabel htmlFor="shop-description">Описание</FieldLabel>
                  <Textarea
                    {...register('description')}
                    id="shop-description"
                    placeholder="Коротко опишите, что продаёте и чем отличаетесь"
                    aria-invalid={!!errors.description}
                    disabled={isBusy}
                    className={s['shop-form__textarea']}
                  />
                  <FieldDescription>
                    1–2 предложения: категория товаров, доставка, гарантия и
                    т.д.
                  </FieldDescription>
                  {errors.description?.message && (
                    <FieldError>{errors.description.message}</FieldError>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>
          </main>
        </div>

        <footer className={s['shop-form__footer']}>
          <div className={s['shop-form__footer-meta']}>
            {isEditMode && (
              <span className={s['shop-form__dirty']}>
                {isDirty ? 'Есть несохранённые изменения' : 'Изменений нет'}
              </span>
            )}
          </div>

          <div className={s['shop-form__actions']}>
            <CustomButton
              type="submit"
              disabled={isBusy || !isValid}
              className="rich-btn"
            >
              {submitLabel}
            </CustomButton>

            <CustomButton
              type="button"
              variant="destructive"
              onClick={() => reset(defaultValues)}
              disabled={isBusy}
              className="rich-btn rich-btn--danger"
            >
              {resetLabel}
            </CustomButton>
          </div>
        </footer>
      </form>
    </motion.div>
  )
}
