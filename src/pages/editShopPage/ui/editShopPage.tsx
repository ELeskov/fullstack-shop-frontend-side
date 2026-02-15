import { useMemo } from 'react'
import { useParams } from 'react-router'

import { ProfileHeader } from '@/widgets/profileHeader'
import { ShopForm } from '@/widgets/shopForm/ui/shopForm'

import { useGetShopById } from '@/shared/api/shop/useGetShopById'

import s from './editShopPage.module.scss'

export function EditShopPage() {
  const { shopId } = useParams<{ shopId: string }>()
  const { data, isLoading, isError, error } = useGetShopById(shopId)

  const editData = useMemo(
    () =>
      data
        ? {
            title: data.title,
            description: data.description ?? '',
          }
        : null,
    [data],
  )

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return (
      <span>{error instanceof Error ? error.message : 'Ошибка загрузки'}</span>
    )
  }

  return (
    <div className={s['edit-shop-page']}>
      <ProfileHeader title="Редактировать магазин" />
      <ShopForm
        shopId={shopId}
        editData={editData}
        pictureUrl={data?.picture}
      />
    </div>
  )
}
