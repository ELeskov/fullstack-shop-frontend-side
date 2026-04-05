import { Outlet } from 'react-router'

import clsx from 'clsx'

import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { MobileNavBar } from '@/widgets/mobileNavBar'
import { SidebarAdmin } from '@/widgets/sidebarAdmin'

import {
  SidebarInset,
  SidebarProvider,
} from '@/shared/ui/components/ui/sidebar'

import s from './adminLayout.module.scss'

export function AdminLayout() {
  return (
    <div className={clsx('layout', 'page-wrapper--profile flex')}>
      <Header />

      <main>
        <SidebarProvider>
          <section className={s['admin-layout']}>
            <aside className={s['admin-layout__aside']}>
              <SidebarAdmin />
            </aside>

            <SidebarInset>
              <Outlet />
            </SidebarInset>
          </section>
        </SidebarProvider>
      </main>

      <Footer />
      <MobileNavBar />
    </div>
  )
}
