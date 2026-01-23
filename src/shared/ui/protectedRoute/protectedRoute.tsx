import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'

import { useGetMe } from '@/shared/api/auth/useGetMe'
import { ROUTES } from '@/shared/config'
import { type EnumUserRole } from '@/shared/constants'

interface ProtectedRouteProps {
  requiredRole?: EnumUserRole
  children: ReactNode
}

export function ProtectedRoute({
  requiredRole,
  children,
}: ProtectedRouteProps) {
  const location = useLocation()
  const { data } = useGetMe()

  if (!data) {
    return <Navigate to={ROUTES.login} state={{ from: location }} replace />
  }

  if (requiredRole && data?.role !== requiredRole) {
    console.log(data.role)

    return <Navigate to={ROUTES.home} replace />
  }

  return children
}
