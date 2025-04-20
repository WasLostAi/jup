import { Loader2 } from "lucide-react"

export default function DangerLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-jupiter-nebula-blue" />
        <p className="text-jupiter-cloud text-lg">Loading Danger Zone...</p>
      </div>
    </div>
  )
}
