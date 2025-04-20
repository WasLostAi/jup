"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { ArrowDown, ArrowUp, Clock, Maximize2, Minimize2, RefreshCw, Search, Settings } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

declare global {
  interface Window {
    TradingView: any
  }
}

interface TradingViewChartProps {
  className?: string
  symbol?: string
  interval?: string
  theme?: "light" | "dark"
}

export const TradingViewChart: React.FC<TradingViewChartProps> = ({
  className = "",
  symbol = "KRAKEN:SOLUSD",
  interval = "D",
  theme = "dark",
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentPrice, setCurrentPrice] = useState(134.85)
  const [priceChange, setPriceChange] = useState(-2.02)
  const [priceChangePercent, setPriceChangePercent] = useState(-1.52)
  const [isPositive, setIsPositive] = useState(false)
  const [selectedSymbol, setSelectedSymbol] = useState(symbol)
  const [timeframe, setTimeframe] = useState(interval)
  const [volume, setVolume] = useState("245.8M")
  const [marketCap, setMarketCap] = useState("28.4B")
  const [high24h, setHigh24h] = useState(136.87)
  const [low24h, setLow24h] = useState(129.66)
  const [isLoading, setIsLoading] = useState(true)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [useAccountCredentials, setUseAccountCredentials] = useState(true)
  const [savedUsername, setSavedUsername] = useState("")
  const [savedPassword, setSavedPassword] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // Load TradingView script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/tv.js"
    script.async = true
    script.onload = () => {
      if (containerRef.current && window.TradingView) {
        initializeTradingViewWidget()
      }
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // Initialize or update the TradingView widget
  const initializeTradingViewWidget = () => {
    if (!containerRef.current || !window.TradingView) return

    // Clear the container
    containerRef.current.innerHTML = ""
    setIsLoading(true)

    // Map our interval format to TradingView's format
    const intervalMap: Record<string, string> = {
      "5m": "5",
      "15m": "15",
      "1H": "60",
      "4H": "240",
      "1D": "D",
      "1W": "W",
      "1M": "M",
    }

    const tvInterval = intervalMap[timeframe] || "D"

    // Create the widget with account credentials if available
    const widgetOptions: any = {
      container_id: containerRef.current.id,
      autosize: true,
      symbol: selectedSymbol,
      interval: tvInterval,
      timezone: "Etc/UTC",
      theme: theme,
      style: "1",
      locale: "en",
      toolbar_bg: "#1E1E24",
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: true,
      studies: ["MASimple@tv-basicstudies", "RSI@tv-basicstudies", "Volume@tv-basicstudies"],
      drawings_access: {
        type: "all",
        tools: {
          all: true,
        },
      },
      disabled_features: ["header_symbol_search", "header_compare"],
      enabled_features: ["use_localstorage_for_settings", "side_toolbar_in_fullscreen_mode"],
      overrides: {
        "mainSeriesProperties.candleStyle.upColor": "#2ED3B7",
        "mainSeriesProperties.candleStyle.downColor": "#FF4560",
        "mainSeriesProperties.candleStyle.wickUpColor": "#2ED3B7",
        "mainSeriesProperties.candleStyle.wickDownColor": "#FF4560",
        "paneProperties.background": "#1E1E24",
        "paneProperties.vertGridProperties.color": "#2A2E39",
        "paneProperties.horzGridProperties.color": "#2A2E39",
        "symbolWatermarkProperties.transparency": 90,
        "scalesProperties.textColor": "#AAA",
      },
      loading_screen: {
        backgroundColor: "#1E1E24",
        foregroundColor: "#2A2E39",
      },
      time_frames: [
        { text: "5m", resolution: "5", description: "5 Minutes" },
        { text: "15m", resolution: "15", description: "15 Minutes" },
        { text: "1h", resolution: "60", description: "1 Hour" },
        { text: "4h", resolution: "240", description: "4 Hours" },
        { text: "1d", resolution: "D", description: "1 Day" },
        { text: "1w", resolution: "W", description: "1 Week" },
        { text: "1m", resolution: "M", description: "1 Month" },
      ],
    }

    // Add account credentials if enabled and available
    if (useAccountCredentials && savedUsername && savedPassword) {
      widgetOptions.username = savedUsername
      widgetOptions.password = savedPassword
    }

    new window.TradingView.widget(widgetOptions)

    // Fetch market data for the price display
    fetchMarketData(selectedSymbol)

    // Set loading to false after a short delay
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  // Fetch market data for the selected symbol
  const fetchMarketData = async (symbol: string) => {
    try {
      // In a real implementation, you would fetch this data from your API
      // For now, we'll use hardcoded values based on the image
      if (symbol.includes("SOL")) {
        setCurrentPrice(134.85)
        setPriceChange(-2.02)
        setPriceChangePercent(-1.52)
        setIsPositive(false)
        setHigh24h(136.87)
        setLow24h(129.66)
        setVolume("34.6K")
        setMarketCap("28.4B")
      } else if (symbol.includes("BTC")) {
        setCurrentPrice(67245.12)
        setPriceChange(1245.67)
        setPriceChangePercent(1.89)
        setIsPositive(true)
        setHigh24h(68500.25)
        setLow24h(66789.45)
        setVolume("12.4B")
        setMarketCap("1.32T")
      } else if (symbol.includes("ETH")) {
        setCurrentPrice(3456.78)
        setPriceChange(-123.45)
        setPriceChangePercent(-3.45)
        setIsPositive(false)
        setHigh24h(3580.42)
        setLow24h(3420.15)
        setVolume("5.6B")
        setMarketCap("415.8B")
      }
    } catch (error) {
      console.error("Error fetching market data:", error)
    }
  }

  // Handle symbol change
  const handleSymbolChange = (newSymbol: string) => {
    setSelectedSymbol(newSymbol)
    if (window.TradingView) {
      initializeTradingViewWidget()
    }
  }

  // Handle timeframe change
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe)
    if (window.TradingView) {
      initializeTradingViewWidget()
    }
  }

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Save TradingView credentials
  const saveCredentials = () => {
    setSavedUsername(username)
    setSavedPassword(password)
    setIsSettingsOpen(false)

    // Reinitialize the widget with the new credentials
    if (window.TradingView) {
      initializeTradingViewWidget()
    }
  }

  // Generate a unique ID for the container
  const containerId = useRef(`tradingview_${Math.random().toString(36).substring(2, 9)}`)

  return (
    <>
      <Card
        className={`bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm ${isFullscreen ? "fixed inset-4 z-50" : ""} ${className}`}
      >
        <CardHeader className="border-b border-jupiter-charcoal pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 w-full max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-jupiter-steel" />
                <Input
                  placeholder="Search markets..."
                  value={selectedSymbol}
                  onChange={(e) => handleSymbolChange(e.target.value)}
                  className="pl-9 h-9 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud w-full"
                />
              </div>

              <div className="flex-shrink-0">
                <Badge className="bg-jupiter-charcoal text-jupiter-nebula-blue border-jupiter-nebula-blue/50">
                  {selectedSymbol}
                </Badge>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className="bg-jupiter-charcoal text-jupiter-nebula-blue border-jupiter-nebula-blue/50 text-xs"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-jupiter-nebula-blue mr-1 animate-pulse"></div>
                LIVE
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-jupiter-charcoal"
                onClick={() => setIsSettingsOpen(true)}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-jupiter-charcoal"
                onClick={() => initializeTradingViewWidget()}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-jupiter-charcoal"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="p-4 border-b border-jupiter-charcoal bg-jupiter-charcoal/30">
            <div className="flex flex-wrap items-center justify-between">
              <div>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-jupiter-cloud">${currentPrice.toFixed(2)}</span>
                  <span
                    className={`ml-2 text-sm font-medium ${isPositive ? "text-jupiter-trifid-teal" : "text-red-500"} flex items-center`}
                  >
                    {isPositive ? (
                      <>
                        <ArrowUp className="h-3 w-3 mr-1" />
                        +${priceChange.toFixed(2)} (+{priceChangePercent.toFixed(2)}%)
                      </>
                    ) : (
                      <>
                        <ArrowDown className="h-3 w-3 mr-1" />${Math.abs(priceChange).toFixed(2)} (
                        {priceChangePercent.toFixed(2)}%)
                      </>
                    )}
                  </span>
                </div>
                <div className="text-xs text-jupiter-steel mt-1 flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>

              <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                <div>
                  <div className="text-xs text-jupiter-steel">24h Volume</div>
                  <div className="text-sm text-jupiter-cloud">${volume}</div>
                </div>
                <div>
                  <div className="text-xs text-jupiter-steel">Market Cap</div>
                  <div className="text-sm text-jupiter-cloud">${marketCap}</div>
                </div>
                <div>
                  <div className="text-xs text-jupiter-steel">24h High</div>
                  <div className="text-sm text-jupiter-trifid-teal">${high24h}</div>
                </div>
                <div>
                  <div className="text-xs text-jupiter-steel">24h Low</div>
                  <div className="text-sm text-red-500">${low24h}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart Area */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">{/* TradingView handles chart types internally */}</div>

              <div className="flex items-center space-x-2">
                {["5m", "15m", "1H", "4H", "1D", "1W", "1M"].map((interval) => (
                  <Button
                    key={interval}
                    variant="ghost"
                    size="sm"
                    className={`h-7 px-2 ${timeframe === interval ? "text-jupiter-nebula-blue bg-jupiter-charcoal" : "text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-jupiter-charcoal"}`}
                    onClick={() => handleTimeframeChange(interval)}
                  >
                    {interval}
                  </Button>
                ))}
              </div>
            </div>

            <div className={`relative ${isFullscreen ? "h-[calc(100vh-320px)]" : "h-[500px]"}`}>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-jupiter-meteorite/50 z-10">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 border-4 border-t-jupiter-nebula-blue border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    <p className="mt-2 text-jupiter-cloud">Loading chart...</p>
                  </div>
                </div>
              )}
              <div id={containerId.current} ref={containerRef} className="w-full h-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* TradingView Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="bg-jupiter-meteorite border-jupiter-charcoal text-jupiter-cloud">
          <DialogHeader>
            <DialogTitle>TradingView Settings</DialogTitle>
            <DialogDescription className="text-jupiter-steel">
              Configure your TradingView account credentials
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="use-credentials" className="text-jupiter-cloud">
                Use Account Credentials
              </Label>
              <Switch
                id="use-credentials"
                checked={useAccountCredentials}
                onCheckedChange={setUseAccountCredentials}
                className="data-[state=checked]:bg-jupiter-nebula-blue"
              />
            </div>

            {useAccountCredentials && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-jupiter-cloud">
                    TradingView Username
                  </Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your TradingView username"
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-jupiter-cloud">
                    TradingView Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your TradingView password"
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                  />
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsSettingsOpen(false)}
              className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite"
            >
              Cancel
            </Button>
            <Button
              onClick={saveCredentials}
              className="bg-jupiter-nebula-blue hover:bg-jupiter-nebula-blue/80 text-white"
            >
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
