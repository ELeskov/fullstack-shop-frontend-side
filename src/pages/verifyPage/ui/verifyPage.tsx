import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

import { useEmailVerify } from '@/shared/api'

export function VerifyPage() {
  const { mutateAsync } = useEmailVerify()
  const queryParams = useSearchParams()[0]
  const token = queryParams.get('token')

  useEffect(() => {
    const verifyEmail = async () => {
      if (token) {
        try {
          await mutateAsync(token)
        } catch (error) {
          console.error('Verify error:', error)
        }
      }
    }

    verifyEmail()
  }, [token, mutateAsync])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>Проверяем email...</div>
    </div>
  )
}
