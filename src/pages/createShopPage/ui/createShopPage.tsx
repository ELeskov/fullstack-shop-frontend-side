import { ProfileHeader } from '@/widgets/profileHeader'
import { ShopForm } from '@/widgets/shopForm'

import s from './createShopPage.module.scss'

export function CreateShopPage() {
  return (
    <div className={s['create-shop-page']}>
      <ProfileHeader title="Новый магазин" />
      <ShopForm />
    </div>
  )
}
