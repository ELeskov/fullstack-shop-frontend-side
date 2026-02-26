import type { PropsWithChildren } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { FallBack } from '@/shared/ui/fallback'

export function Providers({ children }: PropsWithChildren) {
  return <ErrorBoundary FallbackComponent={FallBack}>{children}</ErrorBoundary>
}
