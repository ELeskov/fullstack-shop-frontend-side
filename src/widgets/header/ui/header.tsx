import { Link } from 'react-router'

import clsx from 'clsx'
import { Heart, ShoppingCart } from 'lucide-react'

import { DropdownMenuProfile } from '@/widgets/dropdownMenuProfile'

import { useGetMe } from '@/shared/api'
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

const CATALOG_SECTIONS = [
  {
    title: 'Рабочее место',
    href: `${ROUTES.catalog}?category=workspace`,
    description: 'Лампы, держатели, органайзеры и аксессуары для стола.',
  },
  {
    title: 'Гаджеты',
    href: `${ROUTES.catalog}?category=gadgets`,
    description: 'Смарт-устройства и полезная электроника на каждый день.',
  },
  {
    title: 'Для дома',
    href: `${ROUTES.catalog}?category=home`,
    description: 'Практичные товары для уюта, порядка и хранения.',
  },
  {
    title: 'Подарки',
    href: `${ROUTES.catalog}?category=gifts`,
    description: 'Идеи подарков для коллег, друзей и близких.',
  },
  {
    title: 'Новинки',
    href: `${ROUTES.catalog}?sort=new`,
    description: 'Свежие позиции, которые только появились в магазине.',
  },
  {
    title: 'Популярное',
    href: `${ROUTES.catalog}?sort=popular`,
    description: 'Самые востребованные товары по выбору покупателей.',
  },
]

export function Header() {
  const { data } = useGetMe()
  const isAuthorization = Boolean(data)

  return (
    <header className={s['header']}>
      <div className={s['header__body']}>
        <Logo className={clsx(s['header-logo'], 'hidden-mobile')} />

        <NavigationMenu
          viewport={false}
          aria-label="Меню навигации"
          className="hidden-mobile"
        >
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Каталог</NavigationMenuTrigger>
              <NavigationMenuContent className="border-white/10 z-50">
                <div className={s['header__catalog-menu']}>
                  <div className={s['header__catalog-lead']}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={ROUTES.catalog}
                        className={s['header__catalog-lead-link']}
                      >
                        <p className={s['header__catalog-overline']}>
                          Подборка недели
                        </p>
                        <div className={s['header__catalog-title']}>
                          Каталог
                        </div>
                        <p className={s['header__catalog-description']}>
                          Смотрите новинки, популярные товары и тематические
                          подборки для дома, работы и подарков.
                        </p>
                        <div className={s['header__catalog-chips']}>
                          <span className={s['header__catalog-chip']}>
                            Новинки
                          </span>
                          <span className={s['header__catalog-chip']}>
                            Хиты продаж
                          </span>
                          <span className={s['header__catalog-chip']}>
                            Скидки
                          </span>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </div>

                  <ul className={s['header__catalog-list']}>
                    {CATALOG_SECTIONS.map(section => (
                      <ListItem key={section.title} href={section.href} title={section.title}>
                        {section.description}
                      </ListItem>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {isAuthorization ? (
          <div className="visible-mobile">
            <DropdownMenuProfile />
          </div>
        ) : null}

        {isAuthorization ? (
          <div className={clsx(s['header__actions'], 'hidden-mobile')}>
            <ul className={clsx(s['header__actions-list'], s['header-list'])}>
              <li className={s['header__actions-item']}>
                <Link
                  className={s['header__actions-link']}
                  aria-label="Избранные товары"
                  to={ROUTES.profile.favorites}
                >
                  <Heart className={s['header__actions-icon']} size={24} />
                </Link>
              </li>
              <li className={s['header__actions-item']}>
                <Link
                  className={s['header__actions-link']}
                  aria-label="Корзина товаров"
                  to={ROUTES.profile.basket}
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
