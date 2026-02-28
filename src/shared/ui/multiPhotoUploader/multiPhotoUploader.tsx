import React, { useEffect, useMemo, useRef, useState } from 'react'

import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { RefreshCcw, Trash2, Upload } from 'lucide-react'

import { Card } from '../components/ui/card'
import { CustomButton } from '../customButton'

import s from './multiPhotoUploader.module.scss'

type MultiPhotoUploaderProps = {
  value?: File[]
  defaultValue?: File[]
  onChange?: (files: File[]) => void

  accept?: string
  maxSizeMB?: number
  maxFiles?: number
  maxCount?: number

  disabled?: boolean
  error?: boolean
  className?: string

  onClearAll?: () => void
}

type PreviewItem = {
  id: string
  file: File
  url: string
}

const fileKey = (f: File) => `${f.name}__${f.size}__${f.lastModified}`

const makeId = () => {
  const uuid = globalThis.crypto?.randomUUID?.()
  return uuid ?? `${Date.now()}_${Math.random().toString(16).slice(2)}`
}

export function MultiPhotoUploader({
  value,
  defaultValue = [],
  onChange,

  accept = 'image/*',
  maxSizeMB = 5,
  maxFiles,
  maxCount,

  disabled,
  error,
  className,
  onClearAll,
}: MultiPhotoUploaderProps) {
  const resolvedMax = maxFiles ?? maxCount ?? 10

  const addInputRef = useRef<HTMLInputElement | null>(null)
  const replaceInputRef = useRef<HTMLInputElement | null>(null)

  const isControlled = typeof value !== 'undefined'
  const [inner, setInner] = useState<File[]>(defaultValue)
  const files = isControlled ? (value ?? []) : inner

  const [replaceIndex, setReplaceIndex] = useState<number | null>(null)
  const [dragOver, setDragOver] = useState(false)

  const idMapRef = useRef<WeakMap<File, string>>(new WeakMap())

  const getId = (file: File) => {
    const map = idMapRef.current
    const existing = map.get(file)
    if (existing) {
      return existing
    }
    const next = makeId()
    map.set(file, next)
    return next
  }

  const dragCounterRef = useRef(0)

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (disabled) {
      return
    }

    dragCounterRef.current += 1
    setDragOver(true)
  }

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (disabled) {
      return
    }
  }

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (disabled) {
      return
    }

    dragCounterRef.current -= 1
    if (dragCounterRef.current <= 0) {
      dragCounterRef.current = 0
      setDragOver(false)
    }
  }

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (disabled) {
      return
    }

    dragCounterRef.current = 0
    setDragOver(false)

    const dropped = Array.from(e.dataTransfer.files ?? [])
    addMany(dropped)

    e.dataTransfer.clearData()
  }

  const emit = (next: File[]) => {
    if (!isControlled) {
      setInner(next)
    }
    onChange?.(next)
  }

  const validateOne = (file: File) => {
    const maxBytes = maxSizeMB * 1024 * 1024
    if (typeof maxSizeMB === 'number' && file.size > maxBytes) {
      return false
    }
    if (accept.includes('image') && !file.type.startsWith('image/')) {
      return false
    }
    return true
  }

  const addMany = (incoming: File[]) => {
    if (disabled) {
      return
    }
    if (!incoming.length) {
      return
    }

    const currentKeys = new Set(files.map(fileKey))
    const prepared = incoming
      .filter(validateOne)
      .filter((f) => !currentKeys.has(fileKey(f)))

    const capacity = Math.max(0, resolvedMax - files.length)
    if (capacity === 0) {
      return
    }

    emit([...files, ...prepared.slice(0, capacity)])
  }

  const removeAt = (idx: number) => {
    if (disabled) {
      return
    }
    const next = files.slice()
    next.splice(idx, 1)
    emit(next)
  }

  const openAddPicker = () => {
    if (disabled) {
      return
    }
    addInputRef.current?.click()
  }

  const openReplacePicker = (idx: number) => {
    if (disabled) {
      return
    }
    setReplaceIndex(idx)
    replaceInputRef.current?.click()
  }

  const onAddInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addMany(Array.from(e.target.files ?? []))
    e.target.value = ''
  }

  const onReplaceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const idx = replaceIndex
    if (!file || typeof idx !== 'number') {
      setReplaceIndex(null)
      e.target.value = ''
      return
    }

    if (!validateOne(file)) {
      setReplaceIndex(null)
      e.target.value = ''
      return
    }

    const keyNew = fileKey(file)
    const dupeIndex = files.findIndex(
      (f, i) => i !== idx && fileKey(f) === keyNew,
    )

    if (dupeIndex !== -1) {
      const next = files.slice()
      next.splice(dupeIndex, 1)
      const targetIdx = dupeIndex < idx ? idx - 1 : idx
      next[targetIdx] = file
      emit(next)
    } else {
      const next = files.slice()
      next[idx] = file
      emit(next)
    }

    setReplaceIndex(null)
    e.target.value = ''
  }

  const previews: PreviewItem[] = useMemo(() => {
    return files.map((file) => ({
      id: getId(file),
      file,
      url: URL.createObjectURL(file),
    }))
  }, [files])

  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url))
    }
  }, [previews])

  const canAddMore = files.length < resolvedMax

  return (
    <div className={clsx(s['multi-photo-uploader'], className)}>
      <input
        ref={addInputRef}
        type="file"
        accept={accept}
        multiple
        className={s['multi-photo-uploader__input']}
        onChange={onAddInputChange}
        disabled={disabled}
      />

      <input
        ref={replaceInputRef}
        type="file"
        accept={accept}
        className={s['multi-photo-uploader__input']}
        onChange={onReplaceInputChange}
        disabled={disabled}
      />

      <div className={s['multi-photo-uploader__head']}>
        <div className={s['multi-photo-uploader__meta']}>
          <div className={s['multi-photo-uploader__title']}>Фото товара</div>
          <div className={s['multi-photo-uploader__hint']}>
            {files.length}/{resolvedMax} • клик или drag&drop • до {maxSizeMB}MB
          </div>
        </div>

        <div className={s['multi-photo-uploader__head-actions']}>
          {onClearAll && files.length > 0 && (
            <CustomButton
              type="button"
              variant="destructive"
              onClick={onClearAll}
              disabled={disabled}
              className={clsx(
                'rich-btn',
                'rich-btn--danger',
                s['multi-photo-uploader__clear-btn'],
              )}
            >
              <Trash2 size={18} />
              Очистить
            </CustomButton>
          )}
        </div>
      </div>

      <motion.div
        layout
        className={clsx(
          s['multi-photo-uploader__grid'],
          dragOver && s['multi-photo-uploader__grid--dragover'],
          disabled && s['multi-photo-uploader__grid--disabled'],
          error && s['multi-photo-uploader__grid--error'],
        )}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <AnimatePresence mode="popLayout">
          {previews.map((p, idx) => (
            <motion.div
              layout
              key={p.id}
              className={s['multi-photo-uploader__item']}
              initial={{ opacity: 0, scale: 0.98, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 6 }}
              transition={{
                type: 'spring',
                stiffness: 420,
                damping: 34,
                mass: 0.8,
              }}
            >
              <div
                className={clsx(
                  s['multi-photo-uploader__thumb'],
                  disabled && s['multi-photo-uploader__thumb--disabled'],
                )}
              >
                <img
                  src={p.url}
                  alt={`uploaded-${idx + 1}`}
                  className={s['multi-photo-uploader__img']}
                />

                <CustomButton
                  type="button"
                  className={clsx(
                    'rich-btn',
                    'rich-btn--icon',
                    'rich-btn--danger',
                    s['multi-photo-uploader__btn-delete'],
                  )}
                  onClick={() => removeAt(idx)}
                  disabled={disabled}
                  aria-label="Удалить фото"
                  title="Удалить"
                >
                  <Trash2 size={16} />
                </CustomButton>

                <CustomButton
                  type="button"
                  className={clsx(
                    'rich-btn',
                    'rich-btn--neutral',
                    s['multi-photo-uploader__btn-replace'],
                  )}
                  onClick={() => openReplacePicker(idx)}
                  disabled={disabled}
                  aria-label="Заменить фото"
                  title="Заменить"
                >
                  <RefreshCcw size={16} />
                  Заменить
                </CustomButton>

                <div className={s['multi-photo-uploader__badge']}>
                  {idx + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {canAddMore && (
          <motion.div
            layout
            className={s['multi-photo-uploader__add']}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
          >
            <Card
              className={clsx(
                s['multi-photo-uploader__dropzone'],
                dragOver && s['multi-photo-uploader__dropzone--dragover'],
                disabled && s['multi-photo-uploader__dropzone--disabled'],
                error && s['multi-photo-uploader__dropzone--error'],
              )}
              onClick={openAddPicker}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  openAddPicker()
                }
              }}
            >
              <span
                className={s['multi-photo-uploader__icon']}
                aria-hidden="true"
              >
                <Upload />
              </span>
              <div className={s['multi-photo-uploader__dz-title']}>
                Добавить фото
              </div>
              <div className={s['multi-photo-uploader__dz-hint']}>
                Осталось: {resolvedMax - files.length}
              </div>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
