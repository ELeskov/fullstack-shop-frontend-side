import { type ChangeEvent, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

import clsx from 'clsx'
import { Heart, Search, ShoppingCart } from 'lucide-react'

import { DropdownMenuProfile } from '@/widgets/dropdownMenuProfile'
import { CATALOG_SECTIONS } from '@/widgets/header/lib'

import { useGetMe } from '@/shared/api'
import { useGetAllProductWithFilters } from '@/shared/api/product'
import { ROUTES } from '@/shared/config'
import { Button } from '@/shared/ui/components/ui/button'
import { Input } from '@/shared/ui/components/ui/input'
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

const SEARCH_DEBOUNCE_MS = 250

export function Header() {
  const [searchValue, setSearchValue] = useState('')
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('')
  const [isSearchActive, setIsSearchActive] = useState(false)

  const searchRef = useRef<HTMLDivElement>(null)

  const { data } = useGetMe()
  const isAuthorization = Boolean(data)

  const trimmedSearchValue = searchValue.trim()
  const trimmedDebouncedSearchValue = debouncedSearchValue.trim()

  const { data: searchProducts } = useGetAllProductWithFilters(
    { search: trimmedDebouncedSearchValue },
    { enabled: trimmedDebouncedSearchValue.length > 0 },
  )

  useEffect(() => {
    if (!trimmedSearchValue) {
      setDebouncedSearchValue('')
      return
    }

    const timer = setTimeout(() => {
      setDebouncedSearchValue(trimmedSearchValue)
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      clearTimeout(timer)
    }
  }, [trimmedSearchValue])

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) {
        setIsSearchActive(false)
      }
    }

    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value

    setSearchValue(nextValue)

    if (!nextValue.trim()) {
      setDebouncedSearchValue('')
      setIsSearchActive(false)
      return
    }

    setIsSearchActive(true)
  }

  const shouldShowSearchDropdown =
    isSearchActive &&
    trimmedSearchValue.length > 0 &&
    trimmedDebouncedSearchValue === trimmedSearchValue &&
    Boolean(searchProducts?.length)

  return (
    <header className={s['header']}>
      <div className={s['header__body']}>
        <Logo className={clsx(s['header-logo'], 'hidden-tablet')} />

        <NavigationMenu
          viewport={false}
          aria-label="Меню навигации"
          className="hidden-tablet"
        >
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Каталог</NavigationMenuTrigger>
              <NavigationMenuContent className="z-50 border-white/10">
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
                      <ListItem
                        key={section.title}
                        href={section.href}
                        title={section.title}
                      >
                        {section.description}
                      </ListItem>
                    ))}
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div ref={searchRef} className={s['header__search']}>
          <Search className={s['header__search-icon']} size={18} aria-hidden />
          <Input
            type="search"
            value={searchValue}
            onChange={handleSearchChange}
            onFocus={() => setIsSearchActive(true)}
            placeholder="Поиск товаров"
            aria-label="Поиск товаров"
            className={s['header__search-input']}
          />

          {shouldShowSearchDropdown && (
            <div className={s['header__search-dropdown']}>
              <ul className={s['header__search-list']}>
                {searchProducts?.map(product => {
                  const image = product.images?.[0] ?? ''

                  return (
                    <li key={product.id}>
                      <Link
                        to={ROUTES.product.id(product.id)}
                        className={s['header__search-item']}
                        onClick={() => setIsSearchActive(false)}
                      >
                        {image ? (
                          <img
                            src={image}
                            alt={product.title}
                            loading="lazy"
                            className={s['header__search-thumb']}
                          />
                        ) : (
                          <span
                            className={s['header__search-thumb-placeholder']}
                            aria-hidden
                          />
                        )}

                        <span className={s['header__search-name']}>
                          {product.title}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>

        {isAuthorization ? (
          <div className={clsx(s['header__actions'], 'hidden-tablet')}>
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
          <div className={clsx(s['header__auth-btn'], 'hidden-tablet')}>
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
