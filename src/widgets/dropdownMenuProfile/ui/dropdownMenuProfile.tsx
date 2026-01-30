import { Link } from 'react-router'

import {
  BadgePlus,
  ChartNoAxesColumnIncreasing,
  CircleUserRound,
  GalleryHorizontalEnd,
  Heart,
  LogOut,
  Settings,
  ShoppingBag,
  ShoppingBasket,
  User,
  UserStar,
} from 'lucide-react'

import { useLogoutMutation } from '@/shared/api/auth'
import { ROUTES } from '@/shared/config'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/shared/ui/components/ui/dropdown-menu'
import { Separator } from '@/shared/ui/components/ui/separator'

export function DropdownMenuProfile() {
  const { mutateAsync } = useLogoutMutation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CircleUserRound
          size={24}
          className="transition hover:transition hover:text-white"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mx-2.5" align="start">
        <DropdownMenuGroup>
          <Link to={ROUTES.profile.root}>
            <DropdownMenuItem className="hover:text-blue-400!">
              <User />
              Профиль
            </DropdownMenuItem>
          </Link>
          <Link to={ROUTES.profile.like}>
            <DropdownMenuItem className="hover:text-pink-400!">
              <Heart />
              Избранные
            </DropdownMenuItem>
          </Link>
          <Link to={ROUTES.profile.orders}>
            <DropdownMenuItem className="hover:text-green-400!">
              <ShoppingBag />
              Покупки
            </DropdownMenuItem>
          </Link>
          <Link to={ROUTES.profile.basket}>
            <DropdownMenuItem className="hover:text-orange-400!">
              <ShoppingBasket />
              Корзина
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer">
              Магазины
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className="flex flex-col gap-y-1">
                <Link to={ROUTES.profile.shops.root}>
                  <DropdownMenuItem className="cursor-pointer">
                    Магазины
                  </DropdownMenuItem>
                </Link>
                <Separator />
                <Link to={ROUTES.profile.shops.create}>
                  <DropdownMenuItem className="hover:text-green-400!">
                    <BadgePlus />
                    Создать
                  </DropdownMenuItem>
                </Link>
                <Link to={ROUTES.profile.shops.reviews}>
                  <DropdownMenuItem className="hover:text-yellow-300!">
                    <UserStar />
                    Отзывы
                  </DropdownMenuItem>
                </Link>
                <Link to={ROUTES.profile.shops.statistics}>
                  <DropdownMenuItem className="hover:text-teal-500!">
                    <ChartNoAxesColumnIncreasing />
                    Статистика
                  </DropdownMenuItem>
                </Link>
                <Link to={ROUTES.profile.shops.products.root}>
                  <DropdownMenuItem className="hover:text-emerald-500!">
                    <GalleryHorizontalEnd />
                    Мои товары
                  </DropdownMenuItem>
                </Link>
                <Link to={ROUTES.profile.shops.settings}>
                  <DropdownMenuItem>
                    <Settings />
                    Настройки
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link to={ROUTES.profile.settings}>
          <DropdownMenuItem>
            Настройки
            <DropdownMenuShortcut>
              <Settings />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          className="hover:text-red-400!"
          onClick={() => mutateAsync()}
        >
          Выйти
          <DropdownMenuShortcut>
            <LogOut />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
