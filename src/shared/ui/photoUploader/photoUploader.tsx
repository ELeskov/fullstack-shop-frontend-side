import React, { useEffect, useMemo, useRef, useState } from 'react'

import clsx from 'clsx'
import { Upload } from 'lucide-react'

import { Card } from '../components/ui/card'
import { CustomButton } from '../customButton'

import s from './photoUploader.module.scss'

type AvatarUploaderProps = {
  value?: File | null
  defaultValue?: File | null
  onChange?: (file: File | null) => void

  accept?: string
  maxSizeMB?: number
  disabled?: boolean
  className?: string
}

export function PhotoUploader({
  value,
  defaultValue = null,
  onChange,
  accept = 'image/*',
  maxSizeMB = 5,
  disabled,
  className,
}: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const isControlled = typeof value !== 'undefined'

  const [inner, setInner] = useState<File | null>(defaultValue)
  const current = isControlled ? value : inner

  const [dragOver, setDragOver] = useState(false)

  const previewUrl = useMemo(() => {
    if (!current) {
      return null
    }
    return URL.createObjectURL(current)
  }, [current])

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const emit = (file: File | null) => {
    if (!isControlled) {
      setInner(file)
    }
    onChange?.(file)
  }

  const validateAndSet = (file: File | null) => {
    if (!file) {
      return emit(null)
    }

    if (typeof maxSizeMB === 'number') {
      const maxBytes = maxSizeMB * 1024 * 1024
      if (file.size > maxBytes) {
        return
      }
    }

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
    validateAndSet(file)
    e.target.value = ''
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (disabled) {
      return
    }
    setDragOver(false)
    const file = e.dataTransfer.files?.[0] ?? null
    validateAndSet(file)
  }

  return (
    <div className={`${s['root']} ${className ?? ''}`}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className={s['input']}
        onChange={onInputChange}
        disabled={disabled}
      />

      {current && previewUrl ? (
        <div className="flex flex-col gap-3.5">
          <div
            className={clsx(
              s['preview'],
              `cursor-${disabled ? 'not-allowed' : 'pointer'}`,
            )}
            onClick={openPicker}
            tabIndex={0}
          >
            <img
              className={s['preview__img']}
              src={previewUrl}
              alt="uploaded"
              width={155}
              height={155}
            />
          </div>

          <div className="flex gap-3">
            <CustomButton
              type="button"
              variant="outline"
              // size="sm"
              onClick={openPicker}
              disabled={disabled}
            >
              Заменить
            </CustomButton>

            <CustomButton
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => emit(null)}
              disabled={disabled}
            >
              Удалить
            </CustomButton>
          </div>
        </div>
      ) : (
        <Card
          className={[
            s['dropzone'],
            dragOver ? s['dropzone--dragOver'] : '',
            disabled ? s['dropzone--disabled'] : '',
          ].join(' ')}
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
          <Upload className="bg-muted p-2 size-9 rounded-sm text-zinc-400" />
          <div className={s['title']}>Загрузить фото</div>
          <div className={s['hint']}>
            Кликни или перетащи файл • до {maxSizeMB}MB
          </div>
        </Card>
      )}
    </div>
  )
}
