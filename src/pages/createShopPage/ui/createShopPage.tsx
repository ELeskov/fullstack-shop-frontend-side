import { CreateShopForm } from '@/widgets/createShopForm'
import { ProfileHeader } from '@/widgets/profileHeader'

import s from './createShopPage.module.scss'

export function CreateShopPage() {
  return (
    <div className={s['create-shop-page']}>
      <ProfileHeader title="Новый магазин" />
      <CreateShopForm />
    </div>
  )
}
