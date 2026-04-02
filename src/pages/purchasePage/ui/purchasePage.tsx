import { PurchaseProductList } from '@/widgets/purchaseProductList'

import s from './purchasePage.module.scss'

export function PurchasePage() {
  return (
    <div className={s['purchase-page']}>
      <div className={s['purchase-page__header']}></div>
      <div className={s['purchase-page__body']}>
        <PurchaseProductList />
      </div>
    </div>
  )
}
