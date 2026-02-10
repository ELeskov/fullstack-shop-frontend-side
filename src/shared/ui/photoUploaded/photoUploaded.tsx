import React, { useEffect, useMemo, useRef, useState } from 'react'

import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'

import s from './photoUploaded.module.scss'

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
  const [hovered, setHovered] = useState(false)

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

  const hoverHandlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
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
        <div className={s['previewWrap']} {...hoverHandlers}>
          <div
            className={s['preview']}
            onClick={openPicker}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                openPicker()
              }
            }}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
          >
            <img
              className={s['preview__img']}
              src={previewUrl}
              alt="uploaded"
            />
          </div>

          <div
            className={[
              s['sidePanel'],
              hovered && !disabled ? s['sidePanel--open'] : '',
            ].join(' ')}
          >
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={openPicker}
              disabled={disabled}
              className={s['sidePanel__btn']}
            >
              Заменить
            </Button>

            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => emit(null)}
              disabled={disabled}
              className={s['sidePanel__btn']}
            >
              Удалить
            </Button>
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
          <div className={s['title']}>Загрузить фото</div>
          <div className={s['hint']}>
            Кликни или перетащи файл • до {maxSizeMB}MB
          </div>
        </Card>
      )}
    </div>
  )
}
