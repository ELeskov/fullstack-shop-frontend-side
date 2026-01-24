import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import activeIcon from '@/shared/assets/icons/favicon-bg-dark.svg'
import inactiveIcon from '@/shared/assets/icons/favicon-bg-white.svg'

import { useDynamicFavicon } from '@/app/hooks/useDynamicFavicon'
import { Providers } from '@/app/providers'
import { AppRouters } from '@/app/routes'

export default function App() {
  useDynamicFavicon(activeIcon, inactiveIcon)

  return (
    <Providers>
      <>
        <AppRouters />
        {import.meta.env.VITE_NODE_ENV === 'development' ? (
          <ReactQueryDevtools initialIsOpen={false} />
        ) : null}
      </>
    </Providers>
  )
}
