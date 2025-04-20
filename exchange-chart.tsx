"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
  ArrowDown,
  ArrowUp,
  Clock,
  Maximize2,
  Minimize2,
  RefreshCw,
  BarChart3,
  CandlestickChart,
  LineChart,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createChart, CrosshairMode } from "lightweight-charts"
import { pythDataService, DEFAULT_SYMBOLS } from "@/lib/pyth-service"

interface ExchangeChartProps {
  className?: string
}

export const ExchangeChart: React.FC<ExchangeChartProps> = ({ className = "" }) => {
  const [currentPrice, setCurrentPrice] = useState(68.42)
  const [priceChange, setPriceChange] = useState(2.34)
  const [priceChangePercent, setPriceChangePercent] = useState(3.54)
  const [isPositive, setIsPositive] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [timeframe, setTimeframe] = useState("1D")
  const [volume, setVolume] = useState("24.5M")
  const [marketCap, setMarketCap] = useState("1.2B")
  const [high24h, setHigh24h] = useState(69.87)
  const [low24h, setLow24h] = useState(65.21)
  const [selectedSymbol, setSelectedSymbol] = useState(DEFAULT_SYMBOLS[0])
  const [chartType, setChartType] = useState("candles")
  const canvasRef = useRef<HTMLDivElement>(null)

  // Create and manage the chart
  useEffect(() => {
    if (!canvasRef.current) return

    // Clear any existing chart
    canvasRef.current.innerHTML = ""

    // Create the chart
    const chartOptions = {
      layout: {
        background: { color: "rgba(22, 22, 26, 0.3)" },
        textColor: "#d1d4dc",
      },
      grid: {
        vertLines: { color: "rgba(42, 46, 57, 0.5)" },
        horzLines: { color: "rgba(42, 46, 57, 0.5)" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
        textColor: "#d1d4dc",
      },
      timeScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
        textColor: "#d1d4dc",
      },
      handleScroll: {
        vertTouchDrag: true,
      },
    }

    const chart = createChart(canvasRef.current, {
      width: canvasRef.current.clientWidth,
      height: canvasRef.current.clientHeight,
      ...chartOptions,
    })

    // Add a candlestick series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#2ED3B7",
      downColor: "#FF4560",
      borderVisible: false,
      wickUpColor: "#2ED3B7",
      wickDownColor: "#FF4560",
    })

    // Add a volume series
    const volumeSeries = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    })

    // Fetch real market data
    fetchMarketData(selectedSymbol, timeframe).then((data) => {
      if (data && data.candles && data.volumes) {
        candlestickSeries.setData(data.candles)
        volumeSeries.setData(data.volumes)

        // Update price information
        if (data.candles.length > 0) {
          const lastCandle = data.candles[data.candles.length - 1]
          const firstCandle = data.candles[0]

          setCurrentPrice(Number.parseFloat(lastCandle.close.toFixed(2)))
          const change = lastCandle.close - firstCandle.open
          setPriceChange(Number.parseFloat(change.toFixed(2)))
          const changePercent = (change / firstCandle.open) * 100
          setPriceChangePercent(Number.parseFloat(changePercent.toFixed(2)))
          setIsPositive(change >= 0)

          // Find high and low
          const allPrices = data.candles.flatMap((c) => [c.high, c.low])
          setHigh24h(Number.parseFloat(Math.max(...allPrices).toFixed(2)))
          setLow24h(Number.parseFloat(Math.min(...allPrices).toFixed(2)))
        }
      }
    })

    // Handle resize
    const handleResize = () => {
      chart.applyOptions({
        width: canvasRef.current?.clientWidth || 600,
        height: canvasRef.current?.clientHeight || 400,
      })
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
    }
  }, [timeframe, chartType, selectedSymbol])

  // Add this function to fetch real market data
  const fetchMarketData = async (symbol: string, timeframe: string) => {
    try {
      // Use Pyth data service to get historical data
      return await pythDataService.getHistoricalData(symbol, timeframe)
    } catch (error) {
      console.error("Error fetching market data:", error)
      // Return some fallback data or null
      return null
    }
  }

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice((prev) => {
        const change = (Math.random() - 0.48) * 0.2
        const newPrice = Number.parseFloat((prev + change).toFixed(2))

        // Update price change
        const newChange = Number.parseFloat((newPrice - 66.08).toFixed(2))
        setPriceChange(newChange)

        // Update percent change
        const newPercentChange = Number.parseFloat(((newChange / 66.08) * 100).toFixed(2))
        setPriceChangePercent(newPercentChange)

        // Update direction
        setIsPositive(newChange >= 0)

        return newPrice
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <Card
      className={`bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm ${isFullscreen ? "fixed inset-4 z-50" : ""} ${className}`}
    >
      <CardHeader className="border-b border-jupiter-charcoal pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 w-full max-w-md">
            <div className="relative w-full">
              <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                <SelectTrigger className="h-9 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud w-full">
                  <SelectValue placeholder="Select symbol" />
                </SelectTrigger>
                <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                  {DEFAULT_SYMBOLS.map((symbol) => (
                    <SelectItem key={symbol} value={symbol}>
                      {symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-shrink-0">
              <Badge className="bg-jupiter-charcoal text-jupiter-nebula-blue border-jupiter-nebula-blue/50">
                {selectedSymbol}
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-jupiter-charcoal text-purple-400 border-purple-500/50 text-xs">
              <div className="h-1.5 w-1.5 rounded-full bg-purple-500 mr-1 animate-pulse"></div>
              PYTH
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-jupiter-charcoal"
              onClick={() => {
                // Regenerate chart data
                const canvas = canvasRef.current
                if (canvas) {
                  setTimeframe(timeframe) // Trigger redraw
                }
              }}
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
                <span className="text-2xl font-bold text-jupiter-cloud">${currentPrice}</span>
                <span
                  className={`ml-2 text-sm font-medium ${isPositive ? "text-jupiter-trifid-teal" : "text-red-500"} flex items-center`}
                >
                  {isPositive ? (
                    <>
                      <ArrowUp className="h-3 w-3 mr-1" />
                      +${priceChange} (+{priceChangePercent}%)
                    </>
                  ) : (
                    <>
                      <ArrowDown className="h-3 w-3 mr-1" />${priceChange} ({priceChangePercent}%)
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
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 ${chartType === "candles" ? "text-jupiter-nebula-blue bg-jupiter-charcoal" : "text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-jupiter-charcoal"}`}
                onClick={() => setChartType("candles")}
              >
                <CandlestickChart className="h-4 w-4 mr-1" /> Candles
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 ${chartType === "line" ? "text-jupiter-nebula-blue bg-jupiter-charcoal" : "text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-jupiter-charcoal"}`}
                onClick={() => setChartType("line")}
              >
                <LineChart className="h-4 w-4 mr-1" /> Line
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 ${chartType === "depth" ? "text-jupiter-nebula-blue bg-jupiter-charcoal" : "text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-jupiter-charcoal"}`}
                onClick={() => setChartType("depth")}
              >
                <BarChart3 className="h-4 w-4 mr-1" /> Depth
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              {["5m", "15m", "1H", "4H", "1D", "1W", "1M"].map((interval) => (
                <Button
                  key={interval}
                  variant="ghost"
                  size="sm"
                  className={`h-7 px-2 ${timeframe === interval ? "text-jupiter-nebula-blue bg-jupiter-charcoal" : "text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-jupiter-charcoal"}`}
                  onClick={() => setTimeframe(interval)}
                >
                  {interval}
                </Button>
              ))}
            </div>
          </div>

          <div className={`relative ${isFullscreen ? "h-[calc(100vh-320px)]" : "h-[400px]"}`}>
            <div ref={canvasRef} className="w-full h-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
