"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDataSource } from "@/contexts/data-source-context"

const DEFAULT_SYMBOLS = ["SOL/USD", "JUP/USD", "BTC/USD", "ETH/USD", "SPY/USD"]

interface MarketSymbolDropdownProps {
  onSymbolChange: (symbol: string) => void
  defaultSymbol?: string
}

export function MarketSymbolDropdown({
  onSymbolChange,
  defaultSymbol = DEFAULT_SYMBOLS[0],
}: MarketSymbolDropdownProps) {
  const [selectedSymbol, setSelectedSymbol] = useState(defaultSymbol)
  const { dataSource } = useDataSource()

  const handleSymbolChange = (value: string) => {
    setSelectedSymbol(value)
    onSymbolChange(value)
  }

  return (
    <div className="flex items-center space-x-2">
      <div
        className={`h-2 w-2 rounded-full ${
          dataSource === "pyth"
            ? "bg-purple-500 shadow-[0_0_6px_1px_rgba(168,85,247,0.7)]"
            : "bg-teal-400 shadow-[0_0_6px_1px_rgba(45,212,191,0.7)]"
        }`}
      />

      <Select value={selectedSymbol} onValueChange={handleSymbolChange}>
        <SelectTrigger className="w-[180px] bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
          <SelectValue placeholder="Select symbol" />
        </SelectTrigger>
        <SelectContent className="bg-jupiter-meteorite border-jupiter-gunmetal">
          {DEFAULT_SYMBOLS.map((symbol) => (
            <SelectItem key={symbol} value={symbol} className="text-jupiter-cloud hover:text-jupiter-nebula-blue">
              {symbol}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
