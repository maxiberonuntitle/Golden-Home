interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-charcoal/5 rounded-sm ${className}`}
      aria-hidden="true"
    />
  )
}

export function PropertyCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden bg-warm-white border border-charcoal/5">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="p-5 sm:p-6 space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-4 pt-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  )
}
