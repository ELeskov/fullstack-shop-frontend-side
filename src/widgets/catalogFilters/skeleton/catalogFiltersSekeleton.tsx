import { Skeleton } from '@/shared/ui/components/ui/skeleton'

export function CatalogFiltersSkeleton() {
  return (
    <div className="flex h-11.5 w-full max-w-360 items-center gap-4">
      <Skeleton className="h-9 w-43.25 rounded-xl" />
      <Skeleton className="h-9 w-29 rounded-xl" />
      <Skeleton className="h-9 w-34.5 rounded-xl" />
      <Skeleton className="h-9 w-26.75 rounded-xl" />
      <Skeleton className="h-9 w-24 rounded-xl" />
      <Skeleton className="h-9 flex-1 rounded-xl" />
    </div>
  )
}
