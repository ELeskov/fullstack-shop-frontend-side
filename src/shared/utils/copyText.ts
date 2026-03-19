import { toast } from 'sonner'

import { getErrorMessage } from './getErrorMessage'

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    toast.success('Текст скопирован')
  } catch (error) {
    toast.error(getErrorMessage(error))
  }
}
