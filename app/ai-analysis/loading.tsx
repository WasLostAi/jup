import { PageTemplate } from "@/components/page-template"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <PageTemplate title="AI Market Analysis">
      <div className="space-y-6">
        <Card className="backdrop-blur-sm bg-black/40 border-purple-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
              <Skeleton className="h-10 w-[180px]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-10 w-full max-w-md" />

              <div className="space-y-4">
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-5/6" />
                </div>

                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-11/12 mb-1" />
                  <Skeleton className="h-4 w-4/5 mb-1" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-2 w-full mt-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  )
}
