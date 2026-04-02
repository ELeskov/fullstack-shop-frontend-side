import { ProfileHeader } from '@/widgets/profileHeader'
import { PurchaseProductList } from '@/widgets/purchaseProductList'

import s from './purchasePage.module.scss'

export function PurchasePage() {
  return (
    <section className={s['purchase-page']}>
      <ProfileHeader title="Покупки" />

      <div className={s['purchase-page__body']}>
        <PurchaseProductList />
      </div>
    </section>
  )
}
