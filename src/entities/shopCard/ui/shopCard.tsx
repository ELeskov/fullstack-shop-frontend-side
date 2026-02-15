import { useNavigate } from 'react-router'

import clsx from 'clsx'
import { Info, Link2, Package, Pencil, Star, UserRoundX } from 'lucide-react'
import { motion } from 'motion/react'

import { useSelectedShopId } from '@/shared/api'
import type { SchemaShopResponseDto } from '@/shared/api/api-endpoints'
import { ROUTES } from '@/shared/config'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/ui/components/ui/avatar'
import { Badge } from '@/shared/ui/components/ui/badge'
import { Button } from '@/shared/ui/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/shared/ui/components/ui/card'

import s from './shopCard.module.scss'

export function ShopCard({ data }: { data: SchemaShopResponseDto }) {
  const { title, createdAt, picture } = data
  const navigate = useNavigate()

  const { selectedShopId, setSelectedShopId } = useSelectedShopId()
  const isActive = selectedShopId === data.id

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={s['shop-card__animation-wrapper']}
    >
      <Card className={clsx(s['shop-card'])}>
        <div className={s['shop-card__body']}>
          <CardHeader className={s['shop-card__header']}>
            <div className={s['shop-card__title-block']}>
              <h2 className={s['shop-card__title']}>{title}</h2>
              {isActive ? (
                <Badge className={s['shop-card__status-badge']}>Выбран</Badge>
              ) : (
                <Badge
                  role="button"
                  tabIndex={0}
                  className={clsx(
                    s['shop-card__status-badge'],
                    s['shop-card__status-badge--unselected'],
                    'rich-btn',
                    'rich-btn--neutral',
                    'rich-btn--xs',
                  )}
                  onClick={() => setSelectedShopId(data.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedShopId(data.id)
                    }
                  }}
                  aria-label={`Выбрать магазин ${title}`}
                  title="Сделать активным"
                >
                  Выбрать
                </Badge>
              )}
            </div>

            <div className={s['shop-card__actions']}>
              <Button
                type="button"
                className={clsx('rich-btn', 'rich-btn--icon', 'rich-btn--blue')}
                aria-label="Скопировать ссылку"
                title="Скопировать ссылку"
                onClick={() => {
                  const url = `${window.location.origin}/shop/${data.id}`
                  navigator.clipboard.writeText(url)
                }}
              >
                <Link2 size={18} />
              </Button>

              <Button
                type="button"
                className={clsx('rich-btn', 'rich-btn--icon')}
                aria-label="Редактировать"
                title="Редактировать"
                onClick={() => navigate(ROUTES.profile.shops.edit.to(data.id))}
              >
                <Pencil size={18} />
              </Button>
            </div>
          </CardHeader>

          <CardContent className={s['shop-card__content']}>
            <Avatar className={s['shop-card__avatar']}>
              <AvatarImage
                src={picture}
                alt={`Логотип магазина ${title}`}
                className={s['shop-card__image']}
              />
              <AvatarFallback>
                <UserRoundX className="size-8! max-md:size-6!" />
              </AvatarFallback>
            </Avatar>
          </CardContent>

          <CardFooter className={s['shop-card__footer']}>
            <div className={s['shop-card__metrics']}>
              <Badge
                variant="secondary"
                className={s['shop-card__metric-badge']}
              >
                <div className={s['shop-card__metric']}>
                  <span
                    className={clsx(
                      'rich-btn',
                      'rich-btn--sm',
                      'rich-btn--emerald',
                    )}
                    aria-hidden="true"
                  >
                    <Package className="size-4.5! max-xl:size-4!" />
                  </span>

                  <span
                    className={clsx(
                      s['shop-card__metric-label'],
                      'hidden-mobile',
                    )}
                  >
                    Товаров
                  </span>
                </div>

                <span
                  className={clsx(
                    s['shop-card__metric-value'],
                    s['shop-card__metric-value--emerald'],
                  )}
                >
                  41
                </span>
              </Badge>

              <Badge
                variant="secondary"
                className={s['shop-card__metric-badge']}
              >
                <div className={s['shop-card__metric']}>
                  <span
                    className={clsx(
                      'rich-btn',
                      'rich-btn--sm',
                      'rich-btn--yellow',
                    )}
                    aria-hidden="true"
                  >
                    <Star
                      className={'size-4.5! max-xl:size-4! text-yellow-400'}
                    />
                  </span>

                  <span
                    className={clsx(
                      s['shop-card__metric-label'],
                      'hidden-mobile',
                    )}
                  >
                    Рейтинг
                  </span>
                </div>

                <span
                  className={clsx(
                    s['shop-card__metric-value'],
                    s['shop-card__metric-value--yellow'],
                  )}
                >
                  4,6
                </span>
              </Badge>
            </div>

            <div className={clsx(s['shop-card__meta'], 'hidden-mobile')}>
              <div className={s['shop-card__meta-row']}>
                <span className={s['shop-card__meta-label']}>Создан:</span>
                <time className={s['shop-card__meta-value']}>
                  {new Date(createdAt).toLocaleDateString()}
                </time>
              </div>
            </div>
            <span
              className={clsx(
                'rich-btn',
                'rich-btn--sm',
                'rich-btn--netural',
                'visible-mobile',
              )}
            >
              <Info size={16} />
            </span>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  )
}
