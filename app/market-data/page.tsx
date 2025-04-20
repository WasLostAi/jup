"use client"

import { useState } from "react"
import { Filter, Star, MoreHorizontal, Eye, EyeOff, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DashboardLayout from "../dashboard-layout"
import { TradingViewChart } from "../../tradingview-chart"
import { FinancialNewsSimple } from "../../components/financial-news-simple"
import { PortfolioHoldings } from "../../components/portfolio-holdings"

export default function MarketDataPage() {
  const [selectedSymbol, setSelectedSymbol] = useState("KRAKEN:SOLUSD")
  const [searchQuery, setSearchQuery] = useState("")
  const [timeframe, setTimeframe] = useState("1D")

  // Sample market data for the watchlist
  const [markets, setMarkets] = useState([
    {
      symbol: "KRAKEN:SOLUSD",
      name: "Solana",
      price: 86.43,
      change: -13.57,
      changePercent: -13.57,
      volume: "245.8M",
      favorite: true,
    },
    {
      symbol: "KRAKEN:BTCUSD",
      name: "Bitcoin",
      price: 67245.12,
      change: 1245.67,
      changePercent: 1.89,
      volume: "12.4B",
      favorite: true,
    },
    {
      symbol: "KRAKEN:ETHUSD",
      name: "Ethereum",
      price: 3456.78,
      change: -123.45,
      changePercent: -3.45,
      volume: "5.6B",
      favorite: true,
    },
    {
      symbol: "KRAKEN:JUPUSD",
      name: "Jupiter",
      price: 0.78,
      change: 0.05,
      changePercent: 6.84,
      volume: "124.5M",
      favorite: false,
    },
    {
      symbol: "KRAKEN:DOGEUSD",
      name: "Dogecoin",
      price: 0.12,
      change: -0.01,
      changePercent: -7.69,
      volume: "345.6M",
      favorite: false,
    },
    {
      symbol: "KRAKEN:AVAXUSD",
      name: "Avalanche",
      price: 34.56,
      change: 2.34,
      changePercent: 7.26,
      volume: "456.7M",
      favorite: false,
    },
    {
      symbol: "KRAKEN:LINKUSD",
      name: "Chainlink",
      price: 12.34,
      change: 0.56,
      changePercent: 4.76,
      volume: "234.5M",
      favorite: false,
    },
  ])

  // Filter markets based on search query
  const filteredMarkets = markets.filter(
    (market) =>
      searchQuery === "" ||
      market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.symbol.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Toggle favorite status
  const toggleFavorite = (symbol: string) => {
    setMarkets(markets.map((market) => (market.symbol === symbol ? { ...market, favorite: !market.favorite } : market)))
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 relative z-10">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content - Chart */}
          <div className="col-span-12 lg:col-span-9">
            <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
              <CardHeader className="pb-2 border-b border-jupiter-charcoal flex flex-row items-center justify-between">
                <CardTitle className="text-base font-syne" style={{ color: "#E8F9FF" }}>
                  {selectedSymbol.split(":")[1].replace("USD", "/USD")}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Tabs defaultValue={timeframe} className="w-auto">
                    <TabsList className="bg-jupiter-charcoal h-8">
                      {["5m", "15m", "1H", "4H", "1D", "1W", "1M"].map((tf) => (
                        <TabsTrigger
                          key={tf}
                          value={tf}
                          className="px-2 py-1 text-xs h-6"
                          onClick={() => setTimeframe(tf)}
                        >
                          {tf}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                  <Select defaultValue="indicators">
                    <SelectTrigger className="w-[130px] h-8 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud text-xs">
                      <SelectValue placeholder="Indicators" />
                    </SelectTrigger>
                    <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                      <SelectItem value="rsi">RSI</SelectItem>
                      <SelectItem value="macd">MACD</SelectItem>
                      <SelectItem value="bollinger">Bollinger Bands</SelectItem>
                      <SelectItem value="volume">Volume</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[600px] w-full">
                  <TradingViewChart symbol={selectedSymbol} />
                </div>
              </CardContent>
            </Card>

            {/* Financial News Section */}
            <div className="mt-6">
              <FinancialNewsSimple />
            </div>
          </div>

          {/* Right Sidebar - Watchlist and Portfolio */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            {/* Watchlist */}
            <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
              <CardHeader className="pb-2 border-b border-jupiter-charcoal">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-syne" style={{ color: "#E8F9FF" }}>
                    Watchlist
                  </CardTitle>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-jupiter-steel hover:text-jupiter-cloud hover:bg-jupiter-charcoal"
                    >
                      <Filter className="h-4 w-4" />
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
                        <DropdownMenuItem className="hover:bg-jupiter-gunmetal">
                          <Eye className="h-4 w-4 mr-2" /> Show All
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-jupiter-gunmetal">
                          <EyeOff className="h-4 w-4 mr-2" /> Hide All
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="relative mb-4">
                    <Input
                      placeholder="Search markets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-jupiter-charcoal border-jupiter-gunmetal pl-8"
                      style={{ color: "#E8F9FF" }}
                    />
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-jupiter-steel">
                      <Search className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
                    {filteredMarkets.map((market) => (
                      <div
                        key={market.symbol}
                        className={`flex items-center justify-between p-2 rounded-md hover:bg-jupiter-charcoal cursor-pointer border border-transparent hover:border-jupiter-gunmetal ${selectedSymbol === market.symbol ? "bg-jupiter-charcoal/50 border-jupiter-gunmetal" : ""}`}
                        onClick={() => setSelectedSymbol(market.symbol)}
                      >
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(market.symbol)
                            }}
                            className="h-6 w-6 mr-1 p-0"
                          >
                            <Star
                              className={`h-4 w-4 ${market.favorite ? "text-jupiter-cosmic-lime fill-jupiter-cosmic-lime" : "text-jupiter-steel"}`}
                            />
                          </Button>
                          <div>
                            <div className="text-sm font-medium" style={{ color: "#E8F9FF" }}>
                              {market.name}
                            </div>
                            <div className="text-xs text-jupiter-steel">Vol: {market.volume}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium" style={{ color: "#E8F9FF" }}>
                            ${market.price.toFixed(2)}
                          </div>
                          <div
                            className={`text-xs ${market.change >= 0 ? "text-jupiter-cosmic-lime" : "text-red-400"}`}
                          >
                            {market.change >= 0 ? "+" : ""}
                            {market.changePercent.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Holdings */}
            <PortfolioHoldings />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
