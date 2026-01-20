import { Link } from 'react-router'

import clsx from 'clsx'
import { Heart, ShoppingCart } from 'lucide-react'

import { DropdownMenuProfile } from '@/widgets/dropdownMenuProfile'
import { useGetMe } from '@/shared/api/auth/useGetMe'
import { ROUTES } from '@/shared/config'
import { Button } from '@/shared/ui/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/shared/ui/components/ui/navigation-menu'
import { ListItem } from '@/shared/ui/listItem'
import { Logo } from '@/shared/ui/logo'

import s from './header.module.scss'

export function Header() {
  const { data } = useGetMe()
  const isAuthorization = Boolean(data)

  return (
    <header className={s['header']}>
      <div className={s['header__body']}>
        <Logo className={s['header-logo']} />

        <NavigationMenu
          viewport={false}
          aria-label="Меню навигации"
          className="hidden-mobile"
        >
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Каталог</NavigationMenuTrigger>
              <NavigationMenuContent className="border-white/10 z-50">
                <ul
                  className="grid gap-2 md:w-100 lg:w-150
            lg:grid-cols-[1fr_1fr_1fr]"
                >
                  <li className="row-span-4">
                    <NavigationMenuLink asChild>
                      <Link
                        to="/catalog"
                        className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      >
                        <div className="mt-4 mb-2 text-lg font-medium">
                          Каталог
                        </div>
                        <p className="text-muted-foreground text-sm leading-tight">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/catalog/laptop" title="Laptop">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </ListItem>
                  <ListItem href="/catalog/watch" title="Watch">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </ListItem>
                  <ListItem href="/catalog/phone" title="Phone">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </ListItem>
                  <ListItem href="/catalog/Tablet" title="Tablet">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="visible-mobile">
          <DropdownMenuProfile />
        </div>

        {isAuthorization ? (
          <div className={clsx(s['header__actions'], 'hidden-mobile')}>
            <ul className={clsx(s['header__actions-list'], s['header-list'])}>
              <li className={s['header__actions-item']}>
                <Link
                  className={s['header__actions-link']}
                  aria-label="Избранные товары"
                  to={ROUTES.profile.like}
                >
                  <Heart className={s['header__actions-icon']} size={24} />
                </Link>
              </li>
              <li className={s['header__actions-item']}>
                <Link
                  className={s['header__actions-link']}
                  aria-label="Корзина товаров"
                  to={ROUTES.profile.cart}
                >
                  <ShoppingCart
                    className={s['header__actions-icon']}
                    size={24}
                  />
                </Link>
              </li>
              <li className={s['header__actions-item']}>
                <Link
                  className={s['header__actions-link']}
                  aria-label="Профиль пользователя"
                  to={ROUTES.profile.root}
                >
                  <DropdownMenuProfile />
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className={clsx(s['header__auth-btn'], 'hidden-mobile')}>
            <Link to={ROUTES.login}>
              <Button
                type="button"
                className={s['header__auth-btn-login']}
                variant="outline"
              >
                Войти
              </Button>
            </Link>
            <Link to={ROUTES.signup}>
              <Button type="button" className={s['header__auth-btn-signup']}>
                Регистрация
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
