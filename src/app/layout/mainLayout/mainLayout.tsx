import { Outlet } from 'react-router'

import clsx from 'clsx'

import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { MobileNavBar } from '@/widgets/mobileNavBar'

export function MainLayout() {
  return (
    <div className={clsx('layout', 'page-wrapper')}>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
      <MobileNavBar />
    </div>
  )
}
