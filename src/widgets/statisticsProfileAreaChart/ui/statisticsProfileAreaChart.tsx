import { useEffect, useState } from 'react'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { useIsMobile } from '@/app/hooksUI/use-mobile'

import { type StatisticsPeriod, useGetProfileStatistics } from '@/shared/api'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/ui/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/components/ui/select'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shared/ui/components/ui/toggle-group'
import { EmptyData } from '@/shared/ui/emptyData'
import { LoadingData } from '@/shared/ui/loadingData'

const chartConfig = {
  revenue: {
    label: 'Выручка',
    color: 'var(--chart-1)',
  },
  ordersCount: {
    label: 'Заказы',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export function StatisticsProfileAreaChart() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = useState<StatisticsPeriod>('90d')

  useEffect(() => {
    if (isMobile) {
      setTimeRange('7d')
    }
  }, [isMobile])

  const { data, isLoading, isError } = useGetProfileStatistics(timeRange)

  if (isLoading) {
    return <LoadingData />
  }

  if (isError || !data) {
    return (
      <EmptyData
        title="Не удалось загрузить статистику"
        description="Попробуйте обновить страницу."
      />
    )
  }

  return (
    <Card className="@container/card">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Статистика дохода</CardTitle>

        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={value => {
              if (value) {
                setTimeRange(value as StatisticsPeriod)
              }
            }}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">За 3 месяца</ToggleGroupItem>
            <ToggleGroupItem value="30d">За месяц</ToggleGroupItem>
            <ToggleGroupItem value="7d">За неделю</ToggleGroupItem>
          </ToggleGroup>

          <Select
            value={timeRange}
            onValueChange={value => setTimeRange(value as StatisticsPeriod)}
          >
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Выберите период"
            >
              <SelectValue placeholder="Период" />
            </SelectTrigger>

            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                За 3 месяца
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                За месяц
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                За неделю
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-75 w-full"
        >
          <AreaChart data={data.chart}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={1}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.1}
                />
              </linearGradient>

              <linearGradient id="fillOrdersCount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-ordersCount)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-ordersCount)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeOpacity={0.04} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={value => {
                const date = new Date(value)

                return date.toLocaleDateString('ru-RU', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={value => {
                    return new Date(value).toLocaleDateString('ru-RU', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }}
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="ordersCount"
              type="monotone"
              fill="url(#fillOrdersCount)"
              stroke="var(--color-ordersCount)"
              stackId="a"
            />

            <Area
              dataKey="revenue"
              type="monotone"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
