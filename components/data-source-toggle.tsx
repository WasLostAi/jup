"use client"

import { useDataSource } from "@/contexts/data-source-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function DataSourceToggle() {
  const { dataSource, setDataSource } = useDataSource()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setDataSource(dataSource === "pyth" ? "jupiter" : "pyth")}
      className="h-8 px-4 bg-jupiter-charcoal border-jupiter-gunmetal hover:bg-jupiter-charcoal/80 relative"
    >
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <div
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              dataSource === "pyth" ? "bg-purple-500 shadow-[0_0_6px_1px_rgba(168,85,247,0.7)]" : "bg-gray-600",
            )}
          />
          <span className={cn("text-xs font-medium", dataSource === "pyth" ? "text-purple-400" : "text-gray-500")}>
            PYTH
          </span>
        </div>
        <span className="text-gray-500 text-xs">|</span>
        <div className="flex items-center space-x-1">
          <div
            className={cn(
              "h-2 w-2 rounded-full transition-all duration-300",
              dataSource === "jupiter"
                ? "bg-jupiter-cosmic-lime shadow-[0_0_6px_1px_rgba(163,230,53,0.7)]"
                : "bg-gray-600",
            )}
          />
          <span
            className={cn(
              "text-xs font-medium",
              dataSource === "jupiter" ? "text-jupiter-cosmic-lime" : "text-gray-500",
            )}
          >
            JUP
          </span>
        </div>
      </div>
    </Button>
  )
}
