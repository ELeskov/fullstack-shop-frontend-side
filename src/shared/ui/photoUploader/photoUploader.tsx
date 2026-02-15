import React, { useEffect, useMemo, useRef, useState } from 'react'

import clsx from 'clsx'
import { Upload } from 'lucide-react'

import { Card } from '../components/ui/card'
import { CustomButton } from '../customButton'

import s from './photoUploader.module.scss'

type AvatarUploaderProps = {
  value?: File | null
  defaultValue?: File | null
  defaultUrl?: string | null
  onChange?: (file: File | null) => void
  accept?: string
  maxSizeMB?: number
  disabled?: boolean
  className?: string
}

export function PhotoUploader({
  value,
  defaultValue = null,
  defaultUrl = null,
  onChange,
  accept = 'image/*',
  maxSizeMB = 5,
  disabled,
  className,
}: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const isControlled = typeof value !== 'undefined'

  const [inner, setInner] = useState<File | null>(defaultValue)
  const currentFile = isControlled ? (value ?? null) : inner

  const [dragOver, setDragOver] = useState(false)

  const [clearedDefault, setClearedDefault] = useState(false)

  useEffect(() => {
    setClearedDefault(false)
  }, [defaultUrl])

  const preview = useMemo(() => {
    if (currentFile) {
      return { src: URL.createObjectURL(currentFile), kind: 'file' as const }
    }

    if (!clearedDefault && defaultUrl) {
      return { src: defaultUrl, kind: 'url' as const }
    }

    return null
  }, [currentFile, defaultUrl, clearedDefault])

  useEffect(() => {
    if (!preview || preview.kind !== 'file') {
      return
    }

    return () => {
      URL.revokeObjectURL(preview.src)
    }
  }, [preview])

  const emit = (file: File | null) => {
    if (!isControlled) {
      setInner(file)
    }
    onChange?.(file)
  }

  const validateAndSet = (file: File | null) => {
    if (!file) {
      return
    }

    const maxBytes = maxSizeMB * 1024 * 1024
    if (typeof maxSizeMB === 'number' && file.size > maxBytes) {
      return
    }

    setClearedDefault(true)
    emit(file)
  }

  const openPicker = () => {
    if (disabled) {
      return
    }
    inputRef.current?.click()
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (file) {
      validateAndSet(file)
    }
    e.target.value = ''
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (disabled) {
      return
    }

    setDragOver(false)
    const file = e.dataTransfer.files?.[0] ?? null
    if (file) {
      validateAndSet(file)
    }
  }

  const onRemove = () => {
    if (currentFile) {
      emit(null)
      return
    }

    if (defaultUrl) {
      setClearedDefault(true)
    }
  }

  return (
    <div className={clsx(s['photo-uploader'], className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className={s['photo-uploader__input']}
        onChange={onInputChange}
        disabled={disabled}
      />

      {preview ? (
        <div className={s['photo-uploader__preview-wrap']}>
          <div
            className={clsx(
              s['photo-uploader__preview'],
              disabled && s['photo-uploader__preview--disabled'],
            )}
            onClick={openPicker}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                openPicker()
              }
            }}
          >
            <img
              className={s['photo-uploader__img']}
              src={preview.src}
              alt="uploaded"
              width={155}
              height={155}
            />
            <div className={s['photo-uploader__preview-overlay']}>
              Нажми, чтобы заменить
            </div>
          </div>

          <div className={s['photo-uploader__actions']}>
            {!defaultUrl && (
              <CustomButton
                type="button"
                variant="destructive"
                onClick={onRemove}
                disabled={disabled}
                className="rich-btn rich-btn--danger"
              >
                Удалить
              </CustomButton>
            )}
          </div>
        </div>
      ) : (
        <Card
          className={clsx(
            s['photo-uploader__dropzone'],
            dragOver && s['photo-uploader__dropzone--dragover'],
            disabled && s['photo-uploader__dropzone--disabled'],
          )}
          onClick={openPicker}
          onDragOver={(e) => {
            e.preventDefault()
            if (!disabled) {
              setDragOver(true)
            }
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              openPicker()
            }
          }}
        >
          <span className={s['photo-uploader__icon']} aria-hidden="true">
            <Upload />
          </span>

          <div className={s['photo-uploader__title']}>Загрузить фото</div>
          <div className={s['photo-uploader__hint']}>
            Кликни или перетащи файл • до {maxSizeMB}MB
          </div>
        </Card>
      )}
    </div>
  )
}
