"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp, RefreshCw } from "lucide-react"
import { pythDataService } from "@/lib/pyth-service"

interface PythPriceFeedsProps {
  className?: string
}

interface PriceData {
  symbol: string
  price: number
  change: number
  changePercent: number
  timestamp: number
}

export function PythPriceFeeds({ className = "" }: PythPriceFeedsProps) {
  const [priceData, setPriceData] = useState<Record<string, PriceData>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const symbols = ["SOL/USD", "BTC/USD", "ETH/USD", "JUP/USD"]

  const fetchPrices = async () => {
    setIsLoading(true)
    try {
      const data = await pythDataService.getMarketData(symbols)
      setPriceData(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error fetching Pyth prices:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPrices()

    // Set up interval to refresh prices
    const interval = setInterval(fetchPrices, 10000) // Refresh every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className={`bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm ${className}`}>
      <CardHeader className="pb-2 border-b border-jupiter-charcoal">
        <div className="flex items-center justify-between">
          <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">Pyth Price Feeds</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className="bg-jupiter-charcoal text-jupiter-nebula-blue border-jupiter-nebula-blue/50 text-xs"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-jupiter-nebula-blue mr-1 animate-pulse"></div>
              LIVE
            </Badge>
            <button
              onClick={fetchPrices}
              className="text-jupiter-steel hover:text-jupiter-nebula-blue"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {symbols.map((symbol) => {
            const data = priceData[symbol]
            const isPositive = data?.change >= 0

            return (
              <div key={symbol} className="p-4 border-b border-r border-jupiter-charcoal">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium text-jupiter-cloud">{symbol}</div>
                  {data && (
                    <Badge
                      className={`${
                        isPositive
                          ? "bg-jupiter-cosmic-lime/20 text-jupiter-cosmic-lime border-jupiter-cosmic-lime/50"
                          : "bg-red-400/20 text-red-400 border-red-400/50"
                      }`}
                    >
                      {isPositive ? "↑" : "↓"}
                    </Badge>
                  )}
                </div>

                {data ? (
                  <>
                    <div className="text-xl font-bold text-jupiter-cloud">${data.price.toFixed(2)}</div>
                    <div className="flex items-center mt-1">
                      <span
                        className={`text-xs font-medium ${
                          isPositive ? "text-jupiter-cosmic-lime" : "text-red-400"
                        } flex items-center`}
                      >
                        {isPositive ? (
                          <>
                            <ArrowUp className="h-3 w-3 mr-1" />
                            +${data.change.toFixed(2)} (+{data.changePercent.toFixed(2)}%)
                          </>
                        ) : (
                          <>
                            <ArrowDown className="h-3 w-3 mr-1" />${Math.abs(data.change).toFixed(2)} (
                            {data.changePercent.toFixed(2)}%)
                          </>
                        )}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="h-14 flex items-center justify-center">
                    <div className="h-4 w-4 border-2 border-jupiter-nebula-blue border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <div className="p-2 text-xs text-jupiter-steel text-right">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  )
}
