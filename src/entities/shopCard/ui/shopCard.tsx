import clsx from 'clsx'
import { Link2, Package, Pencil, Star, Trash2 } from 'lucide-react'
import { motion } from 'motion/react'

import type { SchemaShopResponseDto } from '@/shared/api/api-endpoints'
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      <Card className={s['shop-card']}>
        <CardHeader className={s['shop-card__header']}>
          <div className={s['shop-card__title-block']}>
            <h2 className={s['shop-card__title']}>{title}</h2>

            <Badge className={s['shop-card__status-badge']}>Выбран</Badge>
          </div>

          <div className={s['shop-card__actions']}>
            <Button
              type="button"
              className={s['shop-card__action-btn']}
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
              className={s['shop-card__action-btn']}
              aria-label="Редактировать"
              title="Редактировать"
              onClick={() => {
                // navigate(...)
              }}
            >
              <Pencil size={18} />
            </Button>

            <Button
              type="button"
              className={clsx(
                s['shop-card__action-btn'],
                s['shop-card__action-btn--danger'],
              )}
              aria-label="Удалить"
              title="Удалить"
              onClick={() => {
                // confirm + mutation delete
              }}
            >
              <Trash2 size={18} />
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
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardContent>

        <CardFooter className={s['shop-card__footer']}>
          <div className={s['shop-card__metrics']}>
            <Badge
              variant="secondary"
              className={clsx(
                s['shop-card__metric-badge'],
                s['shop-card__metric-badge--emerald'],
              )}
            >
              <div className={s['shop-card__metric']}>
                <span className={s['shop-card__metric-icon']}>
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

              <span className={s['shop-card__metric-value']}>41</span>
            </Badge>

            <Badge
              variant="secondary"
              className={clsx(
                s['shop-card__metric-badge'],
                s['shop-card__metric-badge--yellow'],
              )}
            >
              <div className={s['shop-card__metric']}>
                <span className={s['shop-card__metric-icon']}>
                  <Star className="size-4.5! max-xl:size-4!" />
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

              <span className={s['shop-card__metric-value']}>4,6</span>
            </Badge>
          </div>

          <div className={s['shop-card__meta']}>
            <div className={s['shop-card__meta-row']}>
              <span className={s['shop-card__meta-label']}>Создан:</span>
              <time className={s['shop-card__meta-value']}>
                {new Date(createdAt).toLocaleDateString()}
              </time>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
