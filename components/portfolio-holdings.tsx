"use client"

import { useState } from "react"
import { ArrowUpRight, ArrowDownRight, MoreHorizontal, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Holding {
  symbol: string
  name: string
  amount: number
  price: number
  value: number
  costBasis: number
  pnl: number
  pnlPercent: number
}

export function PortfolioHoldings() {
  const [isLoading, setIsLoading] = useState(false)

  // Sample portfolio data
  const [holdings, setHoldings] = useState<Holding[]>([
    {
      symbol: "SOL",
      name: "Solana",
      amount: 12.5,
      price: 134.85,
      value: 1685.63,
      costBasis: 1450.0,
      pnl: 235.63,
      pnlPercent: 16.25,
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      amount: 0.025,
      price: 67245.12,
      value: 1681.13,
      costBasis: 1550.0,
      pnl: 131.13,
      pnlPercent: 8.46,
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      amount: 0.45,
      price: 3456.78,
      value: 1555.55,
      costBasis: 1600.0,
      pnl: -44.45,
      pnlPercent: -2.78,
    },
    {
      symbol: "JUP",
      name: "Jupiter",
      amount: 1250,
      price: 0.78,
      value: 975.0,
      costBasis: 850.0,
      pnl: 125.0,
      pnlPercent: 14.71,
    },
    {
      symbol: "AVAX",
      name: "Avalanche",
      amount: 15.5,
      price: 34.56,
      value: 535.68,
      costBasis: 490.0,
      pnl: 45.68,
      pnlPercent: 9.32,
    },
  ])

  // Calculate total portfolio value and P/L
  const totalValue = holdings.reduce((sum, holding) => sum + holding.value, 0)
  const totalCostBasis = holdings.reduce((sum, holding) => sum + holding.costBasis, 0)
  const totalPnl = totalValue - totalCostBasis
  const totalPnlPercent = (totalPnl / totalCostBasis) * 100

  const refreshData = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm h-full">
      <CardHeader className="pb-2 border-b border-jupiter-charcoal">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-syne" style={{ color: "#E8F9FF" }}>
            Portfolio
          </CardTitle>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={refreshData}
              disabled={isLoading}
              className="h-7 w-7 text-jupiter-steel hover:text-jupiter-cloud hover:bg-jupiter-charcoal"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-jupiter-steel hover:text-jupiter-cloud hover:bg-jupiter-charcoal"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                <DropdownMenuItem className="hover:bg-jupiter-gunmetal">Sort by Value</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-jupiter-gunmetal">Sort by P/L</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-jupiter-gunmetal">Hide Small Balances</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4 border-b border-jupiter-charcoal pb-3">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs text-jupiter-steel">Total Value</div>
              <div className="text-lg font-medium" style={{ color: "#E8F9FF" }}>
                ${totalValue.toFixed(2)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-jupiter-steel">Total P/L</div>
              <div
                className={`flex items-center text-lg font-medium ${totalPnl >= 0 ? "text-jupiter-cosmic-lime" : "text-red-400"}`}
              >
                {totalPnl >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                ${Math.abs(totalPnl).toFixed(2)} ({totalPnlPercent.toFixed(2)}%)
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
          {holdings.map((holding) => (
            <div
              key={holding.symbol}
              className="flex items-center justify-between p-2 rounded-md hover:bg-jupiter-charcoal cursor-pointer border border-transparent hover:border-jupiter-gunmetal"
            >
              <div>
                <div className="flex items-center">
                  <div className="text-sm font-medium" style={{ color: "#E8F9FF" }}>
                    {holding.symbol}
                  </div>
                  <div className="text-xs text-jupiter-steel ml-2">
                    {holding.amount.toFixed(holding.amount < 1 ? 4 : 2)} {holding.symbol}
                  </div>
                </div>
                <div className="text-xs text-jupiter-steel">${holding.price.toFixed(2)}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium" style={{ color: "#E8F9FF" }}>
                  ${holding.value.toFixed(2)}
                </div>
                <div
                  className={`text-xs flex items-center justify-end ${holding.pnl >= 0 ? "text-jupiter-cosmic-lime" : "text-red-400"}`}
                >
                  {holding.pnl >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  ${Math.abs(holding.pnl).toFixed(2)} ({Math.abs(holding.pnlPercent).toFixed(2)}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
