import {
  Album,
  ChartNoAxesColumnIncreasing,
  CircleUserRound,
  GalleryHorizontalEnd,
  PaintBucket,
  Settings,
  ShoppingBag,
  Store,
  UserStar,
} from 'lucide-react'

import { ROUTES } from '@/shared/config'

export const profileNavData = {
  navMain: [
    {
      title: 'Аккаунт',
      items: [
        {
          title: 'Аккаунт',
          url: ROUTES.profile.root,
          icon: <CircleUserRound />,
        },
        {
          title: 'Покупки',
          url: ROUTES.profile.purchase,
          icon: <ShoppingBag />,
        },
      ],
    },
    {
      title: 'Магазин',
      items: [
        {
          title: 'Мои магазины',
          url: ROUTES.profile.shops.root,
          icon: <Store />,
          isCreated: true,
          createPath: ROUTES.profile.shops.create,
        },
        {
          title: 'Статистика',
          url: ROUTES.profile.shops.statistics,
          icon: <ChartNoAxesColumnIncreasing />,
        },
        {
          title: 'Мои товары',
          url: ROUTES.profile.shops.products.root,
          icon: <GalleryHorizontalEnd />,
          isCreated: true,
          createPath: ROUTES.profile.shops.products.create,
        },
        {
          title: 'Цвета',
          url: ROUTES.profile.shops.colors.root,
          icon: <PaintBucket />,
          isCreated: true,
          createPath: ROUTES.profile.shops.colors.create,
        },
        {
          title: 'Категории',
          url: ROUTES.profile.shops.categories.root,
          createPath: ROUTES.profile.shops.categories.create,
          icon: <Album />,
          isCreated: true,
        },
        {
          title: 'Отзывы',
          url: ROUTES.profile.shops.reviews,
          icon: <UserStar />,
        },
        {
          title: 'Настройки',
          url: ROUTES.profile.shops.settings,
          icon: <Settings />,
        },
      ],
    },
  ],
}
