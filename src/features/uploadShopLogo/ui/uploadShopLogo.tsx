import { useEffect, useMemo, useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'
import { z } from 'zod'

import { useUploadLogoMutation } from '@/shared/api' // поправь путь если нужно
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/shared/ui/components/ui/dropzone'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/shared/ui/components/ui/field'
import { ImageZoom } from '@/shared/ui/components/ui/image-zoom'
import { CustomButton } from '@/shared/ui/customButton'

import s from './uploadShopLogo.module.scss'

const MAX_SIZE = 1024 * 1024 * 10
const MIN_SIZE = 1024

const fileSchema = z
  .instanceof(File, { message: 'Загрузите изображение' })
  .refine((f) => f.size >= MIN_SIZE, 'Файл слишком маленький')
  .refine((f) => f.size <= MAX_SIZE, 'Файл слишком большой (макс. 10MB)')

function formatFileSize(bytes: number) {
  const kb = bytes / 1024
  if (kb < 1024) {
    return `${Math.ceil(kb)} KB`
  }
  return `${(kb / 1024).toFixed(1)} MB`
}

type UploadShopLogoProps = {
  value?: string | null
  onUploaded: (path: string) => void
}

export function UploadShopLogo({ value, onUploaded }: UploadShopLogoProps) {
  const [file, setFile] = useState<File | null>(null)
  const [localError, setLocalError] = useState<string | null>(null)
  const [dropzoneKey, setDropzoneKey] = useState(0)

  const { mutateAsync, isPending } = useUploadLogoMutation()

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

  const uploadSelected = async (selected: File) => {
    const parsed = fileSchema.safeParse(selected)
    if (!parsed.success) {
      setLocalError(parsed.error.issues[0]?.message ?? 'Некорректный файл')
      return
    }

    setLocalError(null)
    setFile(selected)

    const file = new FormData()
    file.append('file', selected)

    const res = await mutateAsync({ file })

    const url = typeof res === 'string' ? res : res?.path

    if (typeof url === 'string' && url.length > 0) {
      onUploaded(url)
    } else {
      setLocalError('Сервер не вернул path изображения')
    }
  }

  const replaceFile = () => {
    setFile(null)
    setLocalError(null)
    setDropzoneKey((k) => k + 1)
  }

  return (
    <div className={s['upload-shop-logo']}>
      <Field>
        <FieldLabel>Логотип / обложка магазина</FieldLabel>

        <AnimatePresence mode="wait">
          {value ? (
            <motion.div
              key="uploaded"
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
                      src={value}
                      alt="Логотип магазина"
                      className="h-50 w-50 object-cover"
                    />
                  </ImageZoom>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-muted-foreground">
                    Логотип загружен
                  </div>

                  <CustomButton
                    type="button"
                    variant="secondary"
                    onClick={replaceFile}
                    disabled={isPending}
                  >
                    Заменить фото
                  </CustomButton>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="picker"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              {file ? (
                <div className="rounded-xl border p-3">
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
                          onClick={replaceFile}
                          disabled={isPending}
                        >
                          Заменить фото
                        </CustomButton>
                      </div>
                    </div>

                    {isPending && (
                      <div className="text-xs text-muted-foreground">
                        Загружаю изображение…
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Dropzone
                  key={dropzoneKey}
                  accept={{ 'image/*': [] }}
                  maxFiles={1}
                  maxSize={MAX_SIZE}
                  minSize={MIN_SIZE}
                  disabled={isPending}
                  onDrop={async (files) => {
                    const selected = files?.[0]
                    if (!selected) {
                      return
                    }
                    await uploadSelected(selected)
                  }}
                >
                  <DropzoneEmptyState />
                  <DropzoneContent />
                </Dropzone>
              )}

              <FieldDescription>
                Загрузите одно изображение (JPG/PNG/WebP), до 10MB.
              </FieldDescription>
            </motion.div>
          )}
        </AnimatePresence>

        {!!localError && <FieldError>{localError}</FieldError>}
      </Field>
    </div>
  )
}
