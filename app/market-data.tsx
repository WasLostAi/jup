"use client"

import { useState } from "react"
import { BarChart2, ChevronDown, ChevronUp, Clock, Filter, Search, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "./dashboard-layout"

export default function MarketDataPage() {
  const [markets, setMarkets] = useState([
    { symbol: "SOL/USDC", price: "68.42", change: "+3.54%", volume: "24.5M", marketCap: "28.4B", favorite: true },
    { symbol: "JUP/USDC", price: "1.24", change: "+2.12%", volume: "12.8M", marketCap: "1.2B", favorite: true },
    { symbol: "BTC/USDC", price: "52,345.67", change: "-0.87%", volume: "1.2B", marketCap: "1.02T", favorite: false },
    { symbol: "ETH/USDC", price: "2,876.32", change: "+1.23%", volume: "845.2M", marketCap: "345.6B", favorite: false },
    { symbol: "BONK/USDC", price: "0.00002345", change: "+12.54%", volume: "8.7M", marketCap: "1.4B", favorite: false },
    { symbol: "RNDR/USDC", price: "7.82", change: "-2.34%", volume: "45.6M", marketCap: "2.8B", favorite: false },
    { symbol: "PYTH/USDC", price: "0.48", change: "+5.67%", volume: "18.2M", marketCap: "1.1B", favorite: false },
    { symbol: "MSOL/USDC", price: "72.15", change: "+3.21%", volume: "15.7M", marketCap: "1.5B", favorite: false },
  ])

  const toggleFavorite = (symbol: string) => {
    setMarkets(markets.map((market) => (market.symbol === symbol ? { ...market, favorite: !market.favorite } : market)))
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-syne text-jupiter-cloud flex items-center">
            <BarChart2 className="mr-2 h-6 w-6 text-jupiter-nebula-blue" />
            Market Data
          </h1>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
              <CardHeader className="pb-2 border-b border-jupiter-charcoal">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
                    <BarChart2 className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                    Market Overview
                  </CardTitle>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="relative w-full sm:w-auto">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-jupiter-steel" />
                      <Input
                        placeholder="Search markets..."
                        className="pl-9 h-9 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud w-full sm:w-64"
                      />
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite"
                    >
                      <Filter className="h-4 w-4 mr-2" /> Filter
                    </Button>

                    <Select defaultValue="all">
                      <SelectTrigger className="w-[130px] h-9 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                        <SelectValue placeholder="Market Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                        <SelectItem value="all">All Markets</SelectItem>
                        <SelectItem value="spot">Spot</SelectItem>
                        <SelectItem value="perp">Perpetuals</SelectItem>
                        <SelectItem value="favorites">Favorites</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <Tabs defaultValue="all" className="w-full">
                  <div className="border-b border-jupiter-charcoal">
                    <TabsList className="bg-transparent h-12 p-0 pl-4">
                      <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-jupiter-nebula-blue data-[state=active]:text-jupiter-nebula-blue rounded-none h-12 text-jupiter-cloud hover:text-jupiter-nebula-blue"
                      >
                        All
                      </TabsTrigger>
                      <TabsTrigger
                        value="favorites"
                        className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-jupiter-nebula-blue data-[state=active]:text-jupiter-nebula-blue rounded-none h-12 text-jupiter-cloud hover:text-jupiter-nebula-blue"
                      >
                        Favorites
                      </TabsTrigger>
                      <TabsTrigger
                        value="gainers"
                        className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-jupiter-nebula-blue data-[state=active]:text-jupiter-nebula-blue rounded-none h-12 text-jupiter-cloud hover:text-jupiter-nebula-blue"
                      >
                        Top Gainers
                      </TabsTrigger>
                      <TabsTrigger
                        value="losers"
                        className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-jupiter-nebula-blue data-[state=active]:text-jupiter-nebula-blue rounded-none h-12 text-jupiter-cloud hover:text-jupiter-nebula-blue"
                      >
                        Top Losers
                      </TabsTrigger>
                      <TabsTrigger
                        value="volume"
                        className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-jupiter-nebula-blue data-[state=active]:text-jupiter-nebula-blue rounded-none h-12 text-jupiter-cloud hover:text-jupiter-nebula-blue"
                      >
                        Volume Leaders
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="all" className="mt-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-jupiter-charcoal/50 text-jupiter-steel text-xs">
                            <th className="px-4 py-3 text-left w-10"></th>
                            <th className="px-4 py-3 text-left">Symbol</th>
                            <th className="px-4 py-3 text-right">Price</th>
                            <th className="px-4 py-3 text-right">
                              <div className="flex items-center justify-end">
                                24h Change
                                <ChevronDown className="h-4 w-4 ml-1" />
                              </div>
                            </th>
                            <th className="px-4 py-3 text-right">24h Volume</th>
                            <th className="px-4 py-3 text-right">Market Cap</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-jupiter-charcoal/30">
                          {markets.map((market) => (
                            <tr key={market.symbol} className="hover:bg-jupiter-charcoal/30">
                              <td className="px-4 py-3">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-transparent"
                                  onClick={() => toggleFavorite(market.symbol)}
                                >
                                  <Star
                                    className={`h-4 w-4 ${market.favorite ? "fill-jupiter-nebula-blue text-jupiter-nebula-blue" : ""}`}
                                  />
                                </Button>
                              </td>
                              <td className="px-4 py-3 font-medium text-jupiter-cloud">{market.symbol}</td>
                              <td className="px-4 py-3 text-right font-mono text-jupiter-cloud">${market.price}</td>
                              <td className="px-4 py-3 text-right">
                                <span
                                  className={
                                    market.change.startsWith("+") ? "text-jupiter-trifid-teal" : "text-red-500"
                                  }
                                >
                                  {market.change.startsWith("+") ? (
                                    <ChevronUp className="inline h-3 w-3 mr-1" />
                                  ) : (
                                    <ChevronDown className="inline h-3 w-3 mr-1" />
                                  )}
                                  {market.change}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-right text-jupiter-steel">${market.volume}</td>
                              <td className="px-4 py-3 text-right text-jupiter-steel">${market.marketCap}</td>
                              <td className="px-4 py-3 text-right">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite hover:text-jupiter-nebula-blue"
                                >
                                  Trade
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="p-4 border-t border-jupiter-charcoal flex items-center justify-between text-xs text-jupiter-steel">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> Last updated: {new Date().toLocaleTimeString()}
                      </div>
                      <div>Showing 1-8 of 250 markets</div>
                    </div>
                  </TabsContent>

                  <TabsContent value="favorites" className="mt-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-jupiter-charcoal/50 text-jupiter-steel text-xs">
                            <th className="px-4 py-3 text-left w-10"></th>
                            <th className="px-4 py-3 text-left">Symbol</th>
                            <th className="px-4 py-3 text-right">Price</th>
                            <th className="px-4 py-3 text-right">24h Change</th>
                            <th className="px-4 py-3 text-right">24h Volume</th>
                            <th className="px-4 py-3 text-right">Market Cap</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-jupiter-charcoal/30">
                          {markets
                            .filter((market) => market.favorite)
                            .map((market) => (
                              <tr key={market.symbol} className="hover:bg-jupiter-charcoal/30">
                                <td className="px-4 py-3">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-transparent"
                                    onClick={() => toggleFavorite(market.symbol)}
                                  >
                                    <Star className="h-4 w-4 fill-jupiter-nebula-blue text-jupiter-nebula-blue" />
                                  </Button>
                                </td>
                                <td className="px-4 py-3 font-medium text-jupiter-cloud">{market.symbol}</td>
                                <td className="px-4 py-3 text-right font-mono text-jupiter-cloud">${market.price}</td>
                                <td className="px-4 py-3 text-right">
                                  <span
                                    className={
                                      market.change.startsWith("+") ? "text-jupiter-trifid-teal" : "text-red-500"
                                    }
                                  >
                                    {market.change.startsWith("+") ? (
                                      <ChevronUp className="inline h-3 w-3 mr-1" />
                                    ) : (
                                      <ChevronDown className="inline h-3 w-3 mr-1" />
                                    )}
                                    {market.change}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-right text-jupiter-steel">${market.volume}</td>
                                <td className="px-4 py-3 text-right text-jupiter-steel">${market.marketCap}</td>
                                <td className="px-4 py-3 text-right">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite hover:text-jupiter-nebula-blue"
                                  >
                                    Trade
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>

                    {markets.filter((market) => market.favorite).length === 0 && (
                      <div className="p-12 text-center">
                        <Star className="h-12 w-12 text-jupiter-steel mx-auto mb-4" />
                        <p className="text-jupiter-steel">
                          No favorite markets yet. Click the star icon to add markets to your favorites.
                        </p>
                      </div>
                    )}
                  </TabsContent>

                  {/* Other tabs would have similar content */}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
