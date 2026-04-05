import { Box, Store, Users } from 'lucide-react'

import { ROUTES } from '@/shared/config'

export const adminNavData = [
  {
    title: 'Пользователи',
    url: ROUTES.admin.users,
    icon: <Users />,
  },
  {
    title: 'Магазины',
    url: ROUTES.admin.shops,
    icon: <Store />,
  },
  {
    title: 'Товары',
    url: ROUTES.admin.products,
    icon: <Box />,
  },
] as const
