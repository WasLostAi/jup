"use client"

import type React from "react"

import { useState } from "react"
import {
  Bot,
  ArrowRight,
  Loader2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function AgentOrderInterface() {
  const [prompt, setPrompt] = useState("")
  const [orderType, setOrderType] = useState("market")
  const [symbol, setSymbol] = useState("ETH/USDT")
  const [amount, setAmount] = useState("0.5")
  const [leverage, setLeverage] = useState(5)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<null | { success: boolean; message: string }>(null)
  const [orderHistory, setOrderHistory] = useState([
    {
      id: "order-1",
      symbol: "BTC/USDT",
      type: "market",
      side: "buy",
      amount: "0.05",
      price: "42350.75",
      status: "filled",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "order-2",
      symbol: "SOL/USDT",
      type: "limit",
      side: "sell",
      amount: "10",
      price: "125.50",
      status: "open",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setResult(null)

    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.2 // 80% success rate for demo

      if (success) {
        const newOrder = {
          id: `order-${Date.now()}`,
          symbol,
          type: orderType,
          side: prompt.toLowerCase().includes("sell") ? "sell" : "buy",
          amount,
          price: orderType === "market" ? "market" : (Math.random() * 1000 + 1000).toFixed(2),
          status: "filled",
          timestamp: new Date().toISOString(),
        }

        setOrderHistory([newOrder, ...orderHistory])
        setResult({
          success: true,
          message: `Successfully executed ${newOrder.side} order for ${amount} ${symbol.split("/")[0]} at ${orderType === "market" ? "market price" : newOrder.price}`,
        })
      } else {
        setResult({
          success: false,
          message: "Order execution failed. Please check your parameters and try again.",
        })
      }

      setIsProcessing(false)
    }, 2000)
  }

  const handleReset = () => {
    setPrompt("")
    setOrderType("market")
    setSymbol("ETH/USDT")
    setAmount("0.5")
    setLeverage(5)
    setResult(null)
  }

  return (
    <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
      <CardHeader className="pb-2 border-b border-jupiter-charcoal">
        <CardTitle className="flex items-center text-base font-syne" style={{ color: "#E8F9FF" }}>
          <Bot className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
          Agent Order Interface
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="prompt" className="text-jupiter-cloud mb-1 block">
                  Natural Language Order
                </Label>
                <Textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter your trading instruction in natural language (e.g., 'Buy 0.5 ETH at market price')"
                  className="h-20 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="order-type" className="text-jupiter-cloud mb-1 block">
                    Order Type
                  </Label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                      <SelectValue placeholder="Select order type" />
                    </SelectTrigger>
                    <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                      <SelectItem value="market">Market</SelectItem>
                      <SelectItem value="limit">Limit</SelectItem>
                      <SelectItem value="stop">Stop</SelectItem>
                      <SelectItem value="trailing-stop">Trailing Stop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="symbol" className="text-jupiter-cloud mb-1 block">
                    Symbol
                  </Label>
                  <Select value={symbol} onValueChange={setSymbol}>
                    <SelectTrigger className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                      <SelectValue placeholder="Select symbol" />
                    </SelectTrigger>
                    <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                      <SelectItem value="BTC/USDT">BTC/USDT</SelectItem>
                      <SelectItem value="ETH/USDT">ETH/USDT</SelectItem>
                      <SelectItem value="SOL/USDT">SOL/USDT</SelectItem>
                      <SelectItem value="JUP/USDT">JUP/USDT</SelectItem>
                      <SelectItem value="AVAX/USDT">AVAX/USDT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount" className="text-jupiter-cloud mb-1 block">
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                  />
                </div>

                <div>
                  <Label htmlFor="leverage" className="text-jupiter-cloud mb-1 block">
                    Leverage: {leverage}x
                  </Label>
                  <Slider
                    id="leverage"
                    min={1}
                    max={20}
                    step={1}
                    value={[leverage]}
                    onValueChange={(value) => setLeverage(value[0])}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  type="submit"
                  disabled={isProcessing || !prompt.trim()}
                  className="flex-1 bg-gradient-to-r from-jupiter-nebula-blue to-jupiter-cosmic-lime hover:from-jupiter-cosmic-lime hover:to-jupiter-nebula-blue text-jupiter-space-black font-medium"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ArrowRight className="mr-2 h-4 w-4" /> Execute Order
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  onClick={handleReset}
                  variant="outline"
                  className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-gunmetal"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {result && (
              <div
                className={`mt-4 p-3 rounded-md ${
                  result.success
                    ? "bg-jupiter-cosmic-lime/10 border border-jupiter-cosmic-lime/30"
                    : "bg-red-500/10 border border-red-500/30"
                }`}
              >
                <div className="flex items-start">
                  {result.success ? (
                    <CheckCircle className="h-5 w-5 text-jupiter-cosmic-lime mr-2 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                  )}
                  <div className={result.success ? "text-jupiter-cosmic-lime" : "text-red-500"}>{result.message}</div>
                </div>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-jupiter-cloud font-medium mb-3">Recent Orders</h3>
            <div className="bg-jupiter-charcoal rounded-md border border-jupiter-gunmetal overflow-hidden">
              <div className="max-h-[300px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-jupiter-charcoal">
                    <tr className="border-b border-jupiter-gunmetal">
                      <th className="text-left p-3 text-jupiter-steel">Symbol</th>
                      <th className="text-left p-3 text-jupiter-steel">Side</th>
                      <th className="text-left p-3 text-jupiter-steel">Amount</th>
                      <th className="text-left p-3 text-jupiter-steel">Price</th>
                      <th className="text-left p-3 text-jupiter-steel">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderHistory.map((order) => (
                      <tr key={order.id} className="border-b border-jupiter-gunmetal/50">
                        <td className="p-3 text-jupiter-cloud">{order.symbol}</td>
                        <td className="p-3">
                          <Badge
                            className={`${
                              order.side === "buy"
                                ? "bg-jupiter-cosmic-lime/20 text-jupiter-cosmic-lime border-jupiter-cosmic-lime/50"
                                : "bg-red-400/20 text-red-400 border-red-400/50"
                            }`}
                          >
                            {order.side === "buy" ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {order.side.toUpperCase()}
                          </Badge>
                        </td>
                        <td className="p-3 text-jupiter-cloud">{order.amount}</td>
                        <td className="p-3 text-jupiter-cloud">
                          {order.price === "market" ? "Market" : `$${order.price}`}
                        </td>
                        <td className="p-3">
                          <Badge
                            className={`${
                              order.status === "filled"
                                ? "bg-jupiter-trifid-teal/20 text-jupiter-trifid-teal border-jupiter-trifid-teal/50"
                                : order.status === "open"
                                  ? "bg-jupiter-nebula-blue/20 text-jupiter-nebula-blue border-jupiter-nebula-blue/50"
                                  : "bg-jupiter-gunmetal text-jupiter-steel border-jupiter-steel/50"
                            }`}
                          >
                            {order.status.toUpperCase()}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-jupiter-steel">Total Value</div>
                    <DollarSign className="h-4 w-4 text-jupiter-nebula-blue" />
                  </div>
                  <div className="text-xl font-bold text-jupiter-cloud mt-1">$12,450.75</div>
                </CardContent>
              </Card>

              <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-jupiter-steel">P&L (24h)</div>
                    <TrendingUp className="h-4 w-4 text-jupiter-cosmic-lime" />
                  </div>
                  <div className="text-xl font-bold text-jupiter-cosmic-lime mt-1">+$345.28</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
