import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6">
        <Skeleton className="h-8 w-8 rounded-full mr-2" />
        <Skeleton className="h-8 w-48" />
      </div>

      <Skeleton className="h-[600px] w-full rounded-md" />
    </div>
  )
}
