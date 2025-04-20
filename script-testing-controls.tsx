"use client"

import { useState } from "react"
import { Play, StopCircle, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface ScriptTestingControlsProps {
  onStart: () => void
  onStop: () => void
  onEmergencyStop: () => void
  isRunning: boolean
  scriptName?: string
}

export function ScriptTestingControls({
  onStart,
  onStop,
  onEmergencyStop,
  isRunning,
  scriptName = "Untitled Script",
}: ScriptTestingControlsProps) {
  const [market, setMarket] = useState("SOL/USD")
  const [exchange, setExchange] = useState("KRAKEN")
  const [timeframe, setTimeframe] = useState("5m")
  const [balance, setBalance] = useState(10000)
  const [leverage, setLeverage] = useState(1)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [useHistorical, setUseHistorical] = useState(false)
  const [historicalDate, setHistoricalDate] = useState("2023-01-01")

  // Test connection to exchange/data provider
  const testConnection = async () => {
    setIsConnecting(true)

    try {
      // In a real implementation, you would test the connection to your exchange or data provider
      // For now, we'll simulate a successful connection after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Check if QUICKNODE_RPC environment variable is available
      if (process.env.QUICKNODE_RPC) {
        setIsConnected(true)
      } else {
        // For demo purposes, we'll still set it to connected
        setIsConnected(true)
      }
    } catch (error) {
      console.error("Connection test failed:", error)
      setIsConnected(false)
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <Card className="bg-jupiter-meteorite border-jupiter-charcoal">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className="bg-jupiter-charcoal text-jupiter-nebula-blue border-jupiter-nebula-blue/50"
              >
                {scriptName}
              </Badge>
              <Badge
                variant="outline"
                className={`${
                  isConnected
                    ? "bg-jupiter-trifid-teal/10 text-jupiter-trifid-teal border-jupiter-trifid-teal/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20"
                }`}
              >
                {isConnected ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertTriangle className="h-3 w-3 mr-1" />}
                {isConnected ? "Connected" : "Not Connected"}
              </Badge>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={testConnection}
              disabled={isConnecting}
              className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite"
            >
              {isConnecting ? (
                <>
                  <RefreshCw className="h-3 w-3 mr-2 animate-spin" /> Connecting...
                </>
              ) : (
                <>
                  <RefreshCw className="h-3 w-3 mr-2" /> Test Connection
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="exchange" className="text-jupiter-steel text-xs">
                Exchange
              </Label>
              <Select value={exchange} onValueChange={setExchange}>
                <SelectTrigger
                  id="exchange"
                  className="mt-1 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                >
                  <SelectValue placeholder="Select Exchange" />
                </SelectTrigger>
                <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                  <SelectItem value="KRAKEN">Kraken</SelectItem>
                  <SelectItem value="COINBASE">Coinbase</SelectItem>
                  <SelectItem value="BINANCE">Binance</SelectItem>
                  <SelectItem value="FTX">FTX</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="market" className="text-jupiter-steel text-xs">
                Market
              </Label>
              <Select value={market} onValueChange={setMarket}>
                <SelectTrigger
                  id="market"
                  className="mt-1 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                >
                  <SelectValue placeholder="Select Market" />
                </SelectTrigger>
                <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                  <SelectItem value="SOL/USD">SOL/USD</SelectItem>
                  <SelectItem value="BTC/USD">BTC/USD</SelectItem>
                  <SelectItem value="ETH/USD">ETH/USD</SelectItem>
                  <SelectItem value="JUP/USD">JUP/USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="timeframe" className="text-jupiter-steel text-xs">
              Timeframe
            </Label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger
                id="timeframe"
                className="mt-1 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
              >
                <SelectValue placeholder="Select Timeframe" />
              </SelectTrigger>
              <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                <SelectItem value="1m">1 minute</SelectItem>
                <SelectItem value="5m">5 minutes</SelectItem>
                <SelectItem value="15m">15 minutes</SelectItem>
                <SelectItem value="1h">1 hour</SelectItem>
                <SelectItem value="4h">4 hours</SelectItem>
                <SelectItem value="1d">1 day</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="balance" className="text-jupiter-steel text-xs">
                Test Balance: ${balance.toLocaleString()}
              </Label>
            </div>
            <Slider
              id="balance"
              min={1000}
              max={100000}
              step={1000}
              value={[balance]}
              onValueChange={(value) => setBalance(value[0])}
              className="mt-1"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="leverage" className="text-jupiter-steel text-xs">
                Leverage: {leverage}x
              </Label>
            </div>
            <Slider
              id="leverage"
              min={1}
              max={20}
              step={1}
              value={[leverage]}
              onValueChange={(value) => setLeverage(value[0])}
              className="mt-1"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="historical"
              checked={useHistorical}
              onCheckedChange={setUseHistorical}
              className="data-[state=checked]:bg-jupiter-nebula-blue"
            />
            <Label htmlFor="historical" className="text-jupiter-steel text-xs cursor-pointer">
              Use Historical Data
            </Label>
            {useHistorical && (
              <input
                type="date"
                value={historicalDate}
                onChange={(e) => setHistoricalDate(e.target.value)}
                className="ml-2 bg-jupiter-charcoal border border-jupiter-gunmetal rounded px-2 py-1 text-xs text-jupiter-cloud"
              />
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onStart}
              disabled={isRunning || !isConnected}
              className="bg-jupiter-trifid-teal/20 border-jupiter-trifid-teal/30 text-jupiter-trifid-teal hover:bg-jupiter-trifid-teal/30"
            >
              <Play className="h-4 w-4 mr-2" /> Start Testing
            </Button>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onStop}
                disabled={!isRunning}
                className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite"
              >
                <StopCircle className="h-4 w-4 mr-2" /> Stop
              </Button>

              <Button
                variant="destructive"
                size="sm"
                onClick={onEmergencyStop}
                disabled={!isRunning}
                className="bg-red-500/80 hover:bg-red-600 text-white"
              >
                <AlertTriangle className="h-4 w-4 mr-2" /> Emergency Stop
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
