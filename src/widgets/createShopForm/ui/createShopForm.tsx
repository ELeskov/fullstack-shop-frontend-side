import { useEffect, useMemo, useState } from 'react'
import {
  Controller,
  type SubmitHandler,
  useForm,
  useWatch,
} from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'motion/react'
import { z } from 'zod'

import { useCreateMutation } from '@/shared/api'
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/shared/ui/components/ui/dropzone'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from '@/shared/ui/components/ui/field'
import { ImageZoom } from '@/shared/ui/components/ui/image-zoom'
import { Input } from '@/shared/ui/components/ui/input'
import { Textarea } from '@/shared/ui/components/ui/textarea'
import { CustomButton } from '@/shared/ui/customButton'

const MAX_SIZE = 1024 * 1024 * 10
const MIN_SIZE = 1024

const schema = z.object({
  title: z.string().trim().min(1, 'Название обязательно'),
  description: z.string().trim().min(1, 'Описание обязательно'),
  file: z
    .instanceof(File, { message: 'Загрузите изображение' })
    .refine((f) => f.size >= MIN_SIZE, 'Файл слишком маленький')
    .refine((f) => f.size <= MAX_SIZE, 'Файл слишком большой (макс. 10MB)')
    .optional(),
})

type ShopSchema = z.infer<typeof schema>

interface ICreateShopForm {
  editData?: Partial<ShopSchema> | null
}

function formatFileSize(bytes: number) {
  const kb = bytes / 1024
  if (kb < 1024) {
    return `${Math.ceil(kb)} KB`
  }
  return `${(kb / 1024).toFixed(1)} MB`
}

export function CreateShopForm({ editData }: ICreateShopForm) {
  const defaultValues = useMemo(
    () => ({
      title: editData?.title ?? '',
      description: editData?.description ?? '',
      file: editData?.file ?? undefined,
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

  const file = useWatch({ control, name: 'file' })
  const previewUrl = useMemo(() => {
    if (!file) {
      return null
    }
    return URL.createObjectURL(file)
  }, [file])

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const [dropzoneKey, setDropzoneKey] = useState(0)

  const { mutateAsync } = useCreateMutation()

  const onSubmit: SubmitHandler<ShopSchema> = async ({
    file,
    title,
    description,
  }) => {
    await mutateAsync({
      file,
      title,
      description,
    })

    reset({
      title: '',
      description: '',
      file: undefined,
    })
    setDropzoneKey((k) => k + 1)
  }

  const submitLabel = editData ? 'Сохранить' : 'Создать магазин'

  const clearfile = () => {
    setValue('file', undefined, { shouldValidate: true, shouldDirty: true })
  }

  const replacefile = () => {
    clearfile()
    setDropzoneKey((k) => k + 1)
  }

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
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: 0.02 }}
              className="md:col-span-2"
            >
              <Controller
                name="file"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Логотип / обложка магазина</FieldLabel>

                    <AnimatePresence mode="wait">
                      {!file ? (
                        <motion.div
                          key="dropzone"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                        >
                          <Dropzone
                            key={dropzoneKey}
                            accept={{ 'image/*': [] }}
                            maxFiles={1}
                            maxSize={MAX_SIZE}
                            minSize={MIN_SIZE}
                            onDrop={(files) => field.onChange(files?.[0])}
                          >
                            <DropzoneEmptyState />
                            <DropzoneContent />
                          </Dropzone>

                          <FieldDescription>
                            Загрузите одно изображение (JPG/PNG/WebP), до 10MB.
                          </FieldDescription>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="preview"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="rounded-xl border p-3"
                        >
                          <div className="flex flex-col gap-3">
                            <div className="overflow-hidden rounded-lg border bg-muted/10 w-50 h-50">
                              <ImageZoom>
                                <img
                                  src={previewUrl ?? ''}
                                  alt={file.name}
                                  className="h-50 w-50 object-cover"
                                />
                              </ImageZoom>
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                              <div className="min-w-0">
                                <div className="truncate text-sm font-medium">
                                  {file.name}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {formatFileSize(file.size)}
                                </div>
                              </div>

                              <div className="flex flex-col gap-2 sm:flex-row">
                                <CustomButton
                                  type="button"
                                  variant="secondary"
                                  onClick={replacefile}
                                  disabled={isSubmitting}
                                >
                                  Заменить фото
                                </CustomButton>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {fieldState.invalid && fieldState.error?.message && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </motion.div>

            {/* -------- Title -------- */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: 0.05 }}
              className="md:col-span-2"
            >
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
                      disabled={isSubmitting}
                    />
                    {fieldState.invalid && fieldState.error?.message && (
                      <FieldError>{fieldState.error.message}</FieldError>
                    )}
                  </Field>
                )}
              />
            </motion.div>

            {/* -------- Description -------- */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: 0.08 }}
              className="md:col-span-2"
            >
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
                      disabled={isSubmitting}
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
            </motion.div>
          </FieldGroup>
        </FieldSet>
      </form>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, delay: 0.12 }}
        className="flex flex-col gap-2 sm:flex-row sm:items-center"
      >
        <CustomButton
          type="submit"
          form="create-shop"
          disabled={isSubmitting || !isValid}
          className="w-full sm:w-auto"
        >
          {submitLabel}
        </CustomButton>

        <CustomButton
          type="button"
          variant="destructive"
          onClick={() => {
            reset(defaultValues)
            setDropzoneKey((k) => k + 1)
          }}
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          Сбросить
        </CustomButton>
      </motion.div>
    </motion.div>
  )
}
