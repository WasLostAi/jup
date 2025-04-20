"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Trade {
  price: string
  size: string
  time: string
  type: "buy" | "sell"
}

export const RecentTrades = () => {
  const [recentTrades, setRecentTrades] = useState<Trade[]>([
    { price: "1.24", size: "1,250", time: "12:45:32", type: "buy" },
    { price: "1.23", size: "850", time: "12:45:28", type: "sell" },
    { price: "1.24", size: "2,100", time: "12:45:15", type: "buy" },
    { price: "1.22", size: "1,500", time: "12:45:02", type: "sell" },
    { price: "1.23", size: "3,200", time: "12:44:58", type: "buy" },
    { price: "1.23", size: "950", time: "12:44:45", type: "buy" },
    { price: "1.22", size: "1,800", time: "12:44:32", type: "sell" },
  ])

  // Simulate new trades coming in
  useEffect(() => {
    const interval = setInterval(() => {
      const newTrade: Trade = {
        price: (1.2 + Math.random() * 0.05).toFixed(2),
        size: Math.floor(Math.random() * 5000).toLocaleString(),
        time: new Date().toLocaleTimeString(),
        type: Math.random() > 0.5 ? "buy" : "sell",
      }

      setRecentTrades((prev) => [newTrade, ...prev.slice(0, 9)])
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
      <CardHeader className="pb-2 border-b border-jupiter-charcoal">
        <div className="flex items-center justify-between">
          <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">Recent Trades</CardTitle>
          <div className="text-xs text-jupiter-steel flex items-center">
            <Clock className="h-3 w-3 mr-1" /> Updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="bg-jupiter-charcoal/30 rounded-md border border-jupiter-charcoal m-4">
          <div className="grid grid-cols-4 text-xs text-jupiter-steel p-2 border-b border-jupiter-charcoal">
            <div>Price</div>
            <div className="text-right">Size</div>
            <div className="text-right">Value</div>
            <div className="text-right">Time</div>
          </div>

          <div className="max-h-[200px] overflow-y-auto">
            {recentTrades.map((trade, index) => (
              <div
                key={index}
                className="grid grid-cols-4 text-xs p-2 border-b border-jupiter-charcoal/30 hover:bg-jupiter-charcoal/50"
              >
                <div className={trade.type === "buy" ? "text-jupiter-trifid-teal" : "text-red-500"}>${trade.price}</div>
                <div className="text-right text-jupiter-cloud">{trade.size}</div>
                <div className="text-right text-jupiter-steel">
                  ${(Number.parseFloat(trade.price) * Number.parseFloat(trade.size.replace(/,/g, ""))).toLocaleString()}
                </div>
                <div className="text-right text-jupiter-steel">{trade.time}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
