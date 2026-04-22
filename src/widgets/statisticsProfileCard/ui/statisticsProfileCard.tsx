import { BadgeRussianRuble, LayoutGrid, Package, Star } from 'lucide-react'
import { motion } from 'motion/react'

import { useGetProfileStatistics } from '@/shared/api/statistics'
import SpotlightCard from '@/shared/ui/components/SpotlightCard'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/components/ui/card'
import { EmptyData } from '@/shared/ui/emptyData'
import { LoadingData } from '@/shared/ui/loadingData'

import s from './statisticsProfileCard.module.scss'

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)

export function StatisticsProfileCard() {
  const { data, isLoading, isError } = useGetProfileStatistics('90d')

  if (isLoading) {
    return <LoadingData />
  }

  if (isError || !data) {
    return (
      <EmptyData
        title="Не удалось загрузить сводную статистику"
        description="Попробуйте обновить страницу."
      />
    )
  }

  return (
    <div className={s['statistics-profile-card']}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          delay: 0.2,
        }}
      >
        <SpotlightCard spotlightColor="rgba(34, 197, 94, 0.5)">
          <Card className="grow">
            <CardHeader>
              <CardDescription>Общая выручка</CardDescription>
              <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {formatCurrency(data.summary.totalRevenue)}
              </CardTitle>
              <CardAction>
                <BadgeRussianRuble />
              </CardAction>
            </CardHeader>

            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Доход магазина
              </div>
              <div className="text-muted-foreground">За последние 3 месяца</div>
            </CardFooter>
          </Card>
        </SpotlightCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          delay: 0.4,
        }}
      >
        <SpotlightCard spotlightColor="rgba(236, 72, 153, 0.5)">
          <Card className="grow">
            <CardHeader>
              <CardDescription>Товары</CardDescription>
              <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {data.summary.productsCount}
              </CardTitle>
              <CardAction>
                <Package />
              </CardAction>
            </CardHeader>

            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Товары в продаже
              </div>
              <div className="text-muted-foreground">
                Актуальный ассортимент
              </div>
            </CardFooter>
          </Card>
        </SpotlightCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          delay: 0.6,
        }}
      >
        <SpotlightCard spotlightColor="rgba(14, 165, 233, 0.5)">
          <Card className="grow">
            <CardHeader>
              <CardDescription>Категории</CardDescription>
              <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {data.summary.categoriesCount}
              </CardTitle>
              <CardAction>
                <LayoutGrid />
              </CardAction>
            </CardHeader>

            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Структура каталога
              </div>
              <div className="text-muted-foreground">Навигация по товарам</div>
            </CardFooter>
          </Card>
        </SpotlightCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          delay: 0.8,
        }}
      >
        <SpotlightCard spotlightColor="rgba(253, 224, 71, 0.5)">
          <Card className="grow">
            <CardHeader>
              <CardDescription>Рейтинг</CardDescription>
              <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {data.summary.averageRating.toFixed(1)}
              </CardTitle>
              <CardAction>
                <Star />
              </CardAction>
            </CardHeader>

            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Оценка покупателей
              </div>
              <div className="text-muted-foreground">
                Средний рейтинг магазина
              </div>
            </CardFooter>
          </Card>
        </SpotlightCard>
      </motion.div>
    </div>
  )
}
