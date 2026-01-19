import { Outlet } from 'react-router'

import clsx from 'clsx'

import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { Toaster } from '@/shared/ui/components/ui/sonner'

export function MainLayout() {
  return (
    <div className={clsx('layout', 'page-wrapper')}>
      <Header />

      <main>
        <Toaster position="top-center" />
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
