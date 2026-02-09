import { useRef } from 'react'

import { Camera, Upload, UserRoundX } from 'lucide-react'

import { usePatchAvatar } from '@/shared/api'
import type { SchemaUserResponseDto } from '@/shared/api/api-endpoints'

import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'

import s from './userAvatarUpload.module.scss'

export const UserAvatarUpload = ({ user }: { user: SchemaUserResponseDto }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { mutateAsync } = usePatchAvatar()

  const handleFileSelect = async (file: File) => {
    if (!file) {
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    await mutateAsync(formData)
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="visually-hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            handleFileSelect(file)
          }
          e.target.value = ''
        }}
      />
      <div className={s['user-settings__image-wrapper']}>
        <Avatar
          onClick={() => fileInputRef.current?.click()}
          className={`${s['user-settings__image']} ${s['avatar-clickable']}`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              fileInputRef.current?.click()
            }
          }}
        >
          <AvatarImage
            src={user?.picture}
            className={`${s['user-settings__image']} ${s['avatar-clickable']}`}
          />
          <AvatarFallback>
            <UserRoundX size={20} />
          </AvatarFallback>

          <div className={s['upload-icon-overlay']}>
            <Upload size={16} />
            <span>Изменить</span>
          </div>
        </Avatar>
        <div className="absolute right-px bottom-px border-2 border-(--background) rounded-[50%] bg-blue-600">
          <Camera className="p-1" />
        </div>
      </div>
    </div>
  )
}
