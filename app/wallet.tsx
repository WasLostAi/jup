"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Clock, Copy, ExternalLink, QrCode, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SendIcon, WalletIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DashboardLayout from "./dashboard-layout"

export default function WalletPage() {
  const [assets, setAssets] = useState([
    { symbol: "SOL", name: "Solana", balance: 12.45, value: 851.49, change: "+3.54%" },
    { symbol: "USDC", name: "USD Coin", balance: 1024.68, value: 1024.68, change: "0.00%" },
    { symbol: "JUP", name: "Jupiter", balance: 500, value: 620.0, change: "+2.12%" },
    { symbol: "BONK", name: "Bonk", balance: 1250000, value: 29.38, change: "+12.54%" },
    { symbol: "MSOL", name: "Marinade Staked SOL", balance: 3.2, value: 230.88, change: "+3.21%" },
  ])

  const [transactions, setTransactions] = useState([
    { type: "send", symbol: "SOL", amount: 1.2, destination: "Gq...7nV", time: "2 hours ago", status: "completed" },
    { type: "receive", symbol: "USDC", amount: 250, source: "4x...9fQ", time: "1 day ago", status: "completed" },
    {
      type: "swap",
      fromSymbol: "SOL",
      toSymbol: "USDC",
      fromAmount: 0.5,
      toAmount: 34.21,
      time: "2 days ago",
      status: "completed",
    },
    { type: "receive", symbol: "JUP", amount: 100, source: "Airdrop", time: "3 days ago", status: "completed" },
    { type: "send", symbol: "BONK", amount: 50000, destination: "7j...2kL", time: "5 days ago", status: "completed" },
  ])

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0)

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-syne text-jupiter-cloud flex items-center">
            <WalletIcon className="mr-2 h-6 w-6 text-jupiter-nebula-blue" />
            Wallet
          </h1>
          <div className="flex items-center space-x-3">
            <Button className="bg-jupiter-charcoal hover:bg-jupiter-meteorite text-jupiter-cloud">
              <RefreshCw className="h-4 w-4 mr-2" /> Refresh
            </Button>
            <Button className="bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black">
              <SendIcon className="h-4 w-4 mr-2" /> Send
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Wallet Overview */}
          <div className="col-span-12 lg:col-span-8">
            <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
              <CardHeader className="pb-2 border-b border-jupiter-charcoal">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
                    Wallet Overview
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-jupiter-charcoal text-jupiter-nebula-blue border-jupiter-nebula-blue/50"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-jupiter-nebula-blue mr-1 animate-pulse"></div>
                    CONNECTED
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-jupiter-charcoal/30 rounded-lg p-4 border border-jupiter-gunmetal">
                    <div className="text-xs text-jupiter-steel mb-1">Total Balance</div>
                    <div className="text-2xl font-bold text-jupiter-cloud">${totalValue.toFixed(2)}</div>
                    <div className="text-xs text-jupiter-trifid-teal mt-1 flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" /> +$124.56 (4.8%) past 24h
                    </div>
                  </div>

                  <div className="bg-jupiter-charcoal/30 rounded-lg p-4 border border-jupiter-gunmetal">
                    <div className="text-xs text-jupiter-steel mb-1">Wallet Address</div>
                    <div className="flex items-center">
                      <div className="text-sm font-mono text-jupiter-cloud truncate">
                        GqZF6ixr7nVEXFdxGpwVVv3XFMPnRKRfWPQ8YA9yZnV
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-1 text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-transparent"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-jupiter-nebula-blue">
                      <QrCode className="h-3 w-3 mr-1" /> Show QR Code
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-jupiter-cloud">Assets</div>
                    <div className="text-xs text-jupiter-steel">
                      <Clock className="inline h-3 w-3 mr-1" /> Updated: {new Date().toLocaleTimeString()}
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-xs text-jupiter-steel border-b border-jupiter-charcoal/50">
                          <th className="px-4 py-2 text-left">Asset</th>
                          <th className="px-4 py-2 text-right">Balance</th>
                          <th className="px-4 py-2 text-right">Value</th>
                          <th className="px-4 py-2 text-right">24h Change</th>
                          <th className="px-4 py-2 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assets.map((asset) => (
                          <tr
                            key={asset.symbol}
                            className="border-b border-jupiter-charcoal/30 hover:bg-jupiter-charcoal/20"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <div className="h-8 w-8 rounded-full bg-jupiter-charcoal flex items-center justify-center mr-2 text-xs font-bold">
                                  {asset.symbol}
                                </div>
                                <div>
                                  <div className="font-medium text-jupiter-cloud">{asset.name}</div>
                                  <div className="text-xs text-jupiter-steel">{asset.symbol}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="font-mono text-jupiter-cloud">{asset.balance.toLocaleString()}</div>
                              <div className="text-xs text-jupiter-steel">{asset.symbol}</div>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="font-mono text-jupiter-cloud">${asset.value.toFixed(2)}</div>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <span
                                className={
                                  asset.change.startsWith("+")
                                    ? "text-jupiter-trifid-teal"
                                    : asset.change === "0.00%"
                                      ? "text-jupiter-steel"
                                      : "text-red-500"
                                }
                              >
                                {asset.change}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 px-2 text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-jupiter-charcoal"
                                >
                                  <SendIcon className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 px-2 text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-jupiter-charcoal"
                                >
                                  <ArrowDown className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 px-2 text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-jupiter-charcoal"
                                >
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm mt-6">
              <CardHeader className="pb-2 border-b border-jupiter-charcoal">
                <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
                  Transaction History
                </CardTitle>
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
                        value="send"
                        className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-jupiter-nebula-blue data-[state=active]:text-jupiter-nebula-blue rounded-none h-12 text-jupiter-cloud hover:text-jupiter-nebula-blue"
                      >
                        Send
                      </TabsTrigger>
                      <TabsTrigger
                        value="receive"
                        className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-jupiter-nebula-blue data-[state=active]:text-jupiter-nebula-blue rounded-none h-12 text-jupiter-cloud hover:text-jupiter-nebula-blue"
                      >
                        Receive
                      </TabsTrigger>
                      <TabsTrigger
                        value="swap"
                        className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-jupiter-nebula-blue data-[state=active]:text-jupiter-nebula-blue rounded-none h-12 text-jupiter-cloud hover:text-jupiter-nebula-blue"
                      >
                        Swap
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="all" className="mt-0">
                    <div className="divide-y divide-jupiter-charcoal/30">
                      {transactions.map((tx, index) => (
                        <div key={index} className="p-4 hover:bg-jupiter-charcoal/20">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div
                                className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                                  tx.type === "send"
                                    ? "bg-red-500/20 text-red-500"
                                    : tx.type === "receive"
                                      ? "bg-jupiter-trifid-teal/20 text-jupiter-trifid-teal"
                                      : "bg-jupiter-nebula-blue/20 text-jupiter-nebula-blue"
                                }`}
                              >
                                {tx.type === "send" ? (
                                  <ArrowUp className="h-4 w-4" />
                                ) : tx.type === "receive" ? (
                                  <ArrowDown className="h-4 w-4" />
                                ) : (
                                  <RefreshCw className="h-4 w-4" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-jupiter-cloud capitalize">
                                  {tx.type === "swap"
                                    ? `Swap ${tx.fromSymbol} to ${tx.toSymbol}`
                                    : `${tx.type} ${tx.symbol}`}
                                </div>
                                <div className="text-xs text-jupiter-steel">
                                  {tx.type === "send"
                                    ? `To: ${tx.destination}`
                                    : tx.type === "receive"
                                      ? `From: ${tx.source}`
                                      : `${tx.fromAmount} ${tx.fromSymbol} → ${tx.toAmount} ${tx.toSymbol}`}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div
                                className={`font-mono ${
                                  tx.type === "send"
                                    ? "text-red-500"
                                    : tx.type === "receive"
                                      ? "text-jupiter-trifid-teal"
                                      : "text-jupiter-nebula-blue"
                                }`}
                              >
                                {tx.type === "send"
                                  ? `-${tx.amount}`
                                  : tx.type === "receive"
                                    ? `+${tx.amount}`
                                    : `${tx.toAmount} ${tx.toSymbol}`}
                              </div>
                              <div className="text-xs text-jupiter-steel">{tx.time}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 border-t border-jupiter-charcoal text-center">
                      <Button variant="ghost" className="text-jupiter-nebula-blue hover:bg-jupiter-charcoal">
                        View All Transactions
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Send & Receive */}
          <div className="col-span-12 lg:col-span-4">
            <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
              <CardHeader className="pb-2 border-b border-jupiter-charcoal">
                <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
                  <SendIcon className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                  Send Assets
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 space-y-4">
                <div>
                  <Label htmlFor="token" className="text-jupiter-cloud mb-1 block">
                    Token
                  </Label>
                  <Select defaultValue="sol">
                    <SelectTrigger className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                      <SelectItem value="sol">SOL (12.45)</SelectItem>
                      <SelectItem value="usdc">USDC (1024.68)</SelectItem>
                      <SelectItem value="jup">JUP (500)</SelectItem>
                      <SelectItem value="bonk">BONK (1,250,000)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="recipient" className="text-jupiter-cloud mb-1 block">
                    Recipient Address
                  </Label>
                  <Input
                    id="recipient"
                    placeholder="Enter Solana address"
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                  />
                </div>

                <div>
                  <Label htmlFor="amount" className="text-jupiter-cloud mb-1 block">
                    Amount
                  </Label>
                  <div className="relative">
                    <Input
                      id="amount"
                      placeholder="0.0"
                      className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud pr-16"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-jupiter-steel">SOL</div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-xs text-jupiter-steel">Available: 12.45 SOL</div>
                    <div className="text-xs text-jupiter-nebula-blue cursor-pointer">MAX</div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black">
                  <SendIcon className="h-4 w-4 mr-2" /> Send
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm mt-6">
              <CardHeader className="pb-2 border-b border-jupiter-charcoal">
                <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
                  <QrCode className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                  Receive
                </CardTitle>
              </CardHeader>

              <CardContent className="p-4 text-center">
                <div className="bg-white p-4 rounded-lg mb-4 inline-block">
                  <div className="h-48 w-48 bg-jupiter-charcoal/50 flex items-center justify-center">
                    <QrCode className="h-24 w-24 text-jupiter-steel" />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-xs text-jupiter-steel mb-1">Your Wallet Address</div>
                  <div className="flex items-center justify-center">
                    <div className="text-sm font-mono text-jupiter-cloud truncate max-w-[200px]">
                      GqZF6ixr7nVEXFdxGpwVVv3XFMPnRKRfWPQ8YA9yZnV
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 ml-1 text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-transparent"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite hover:text-jupiter-nebula-blue"
                >
                  <Copy className="h-4 w-4 mr-2" /> Copy Address
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
