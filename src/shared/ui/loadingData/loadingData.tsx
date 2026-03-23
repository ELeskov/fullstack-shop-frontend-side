import { Loader2 } from 'lucide-react'
import s from './loadingData.module.scss'

export function LoadingData() {
  return (
    <div className={s['loading-data']}>
      <Loader2 className="animate-spin" size={48} strokeWidth={2} />
    </div>
  )
}
