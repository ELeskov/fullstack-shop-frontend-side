import { useState } from 'react'
import { Link } from 'react-router'

import clsx from 'clsx'
import { Check, ChevronsUpDown, Store } from 'lucide-react'

import { ProfileHeader } from '@/widgets/profileHeader'

import {
  useDeleteShopMutation,
  useGetMeShops,
  useSelectedShopId,
} from '@/shared/api'
import { ROUTES } from '@/shared/config'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/ui/components/ui/avatar'
import { Button } from '@/shared/ui/components/ui/button'
import { Input } from '@/shared/ui/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui/components/ui/popover'
import { ConfirmActionButton } from '@/shared/ui/confirmActionButton'
import { EmptyData } from '@/shared/ui/emptyData'
import { LoadingData } from '@/shared/ui/loadingData'

import s from './shopSettingsPage.module.scss'

export function ShopSettingsPage() {
  const { data: shops, isLoading } = useGetMeShops()
  const { selectedShopId, setSelectedShopId } = useSelectedShopId()
  const { mutateAsync: deleteShop, isPending } = useDeleteShopMutation()

  const [isShopSelectOpen, setIsShopSelectOpen] = useState(false)
  const [shopSearch, setShopSearch] = useState('')

  if (isLoading) {
    return <LoadingData />
  }

  if (!shops?.length) {
    return (
      <section className={s['shop-settings']}>
        <ProfileHeader title="Настройки магазина" />
        <EmptyData title="У вас пока нет магазина" />
      </section>
    )
  }

  const filteredShops = shops.filter(shop =>
    shop.title.toLowerCase().includes(shopSearch.toLowerCase()),
  )

  const selectedShop =
    shops.find(shop => shop.id === selectedShopId) ?? shops[0] ?? null

  const handleDeleteShop = async () => {
    if (!selectedShop) {
      return
    }

    await deleteShop({ shopId: selectedShop.id })
  }

  return (
    <section className={s['shop-settings']}>
      <ProfileHeader title="Настройки магазина" />

      <div className={s['shop-settings__section']}>
        <h2 className={s['shop-settings__title']}>Магазин</h2>

        <div className={s['shop-settings__box']}>
          <div className={s['shop-settings__toolbar']}>
            <Popover open={isShopSelectOpen} onOpenChange={setIsShopSelectOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={isShopSelectOpen}
                  className={s['shop-settings__combobox-trigger']}
                >
                  <span>
                    {selectedShop ? selectedShop.title : 'Выберите магазин'}
                  </span>
                  <ChevronsUpDown className={s['shop-settings__chevron']} />
                </Button>
              </PopoverTrigger>

              <PopoverContent
                className={s['shop-settings__combobox-content']}
                align="start"
              >
                <Input
                  placeholder="Поиск магазина..."
                  value={shopSearch}
                  onChange={event => setShopSearch(event.target.value)}
                  className={s['shop-settings__combobox-input']}
                />

                <div className={s['shop-settings__combobox-list']}>
                  {filteredShops.length ? (
                    filteredShops.map(shop => (
                      <button
                        key={shop.id}
                        type="button"
                        className={clsx(
                          s['shop-settings__combobox-item'],
                          shop.id === selectedShop?.id &&
                            s['shop-settings__combobox-item--active'],
                        )}
                        onClick={() => {
                          setSelectedShopId(shop.id)
                          setShopSearch('')
                          setIsShopSelectOpen(false)
                        }}
                      >
                        <span className={s['shop-settings__item-title']}>
                          {shop.title}
                        </span>

                        <span className={s['shop-settings__item-check']}>
                          {shop.id === selectedShop?.id ? (
                            <Check size={16} />
                          ) : null}
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className={s['shop-settings__combobox-empty']}>
                      Ничего не найдено
                    </p>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            <div className={s['shop-settings__controls']}>
              <Button
                asChild
                type="button"
                variant="outline"
                className={s['shop-settings__link-button']}
              >
                <Link to={ROUTES.profile.shops.root}>К списку магазинов</Link>
              </Button>
            </div>
          </div>

          {selectedShop ? (
            <div className={s['shop-settings__info']}>
              <div className={s['shop-settings__info-media']}>
                <Avatar className={s['shop-settings__info-avatar']}>
                  <AvatarImage
                    src={selectedShop.picture}
                    alt={selectedShop.title}
                  />
                  <AvatarFallback>
                    <Store size={18} />
                  </AvatarFallback>
                </Avatar>

                <div className={s['shop-settings__info-text']}>
                  <p className={s['shop-settings__info-name']}>
                    {selectedShop.title}
                  </p>
                  <p className={s['shop-settings__info-description']}>
                    {selectedShop.description || 'Описание не заполнено.'}
                  </p>
                </div>
              </div>

              <p className={s['shop-settings__meta']}>
                Создан:{' '}
                {new Date(selectedShop.createdAt).toLocaleDateString('ru-RU')}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div className={s['shop-settings__section']}>
        <h2 className={s['shop-settings__title']}>Действия</h2>

        <div className={s['shop-settings__box']}>
          <div className={s['shop-settings__danger-inline']}>
            <div className={s['shop-settings__danger-copy']}>
              <p className={s['shop-settings__danger-title']}>
                Удалить магазин
              </p>
              <p className={s['shop-settings__danger-description']}>
                Действие необратимо. Проверьте выбранный магазин.
              </p>
            </div>

            {selectedShop ? (
              <ConfirmActionButton
                triggerText="Удалить магазин"
                title="Удалить магазин?"
                description={`Вы удаляете "${selectedShop.title}". Это действие необратимо.`}
                confirmText="Удалить"
                cancelText="Отмена"
                isDanger
                isLoading={isPending}
                onConfirm={handleDeleteShop}
                triggerClassName={s['shop-settings__danger-button']}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
