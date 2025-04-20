"use client"

import type React from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Copy,
  Save,
  Download,
  Pause,
  Play,
  Zap,
  RefreshCw,
  Eye,
  EyeOff,
  X,
  Settings,
  Server,
  Terminal,
  Bot,
  Cpu,
  Loader2,
  DatabaseIcon,
  ShieldIcon,
  Target,
} from "lucide-react"
import { Code, Plus, Database } from "lucide-react"
import { useState, useEffect } from "react"

interface ScriptEditorAndTesterProps {
  selectedScript: string
  onScriptChange: (script: string) => void
  onAddLog: (level: string, message: string) => void
  onStatusChange: (status: "idle" | "running" | "success" | "warning" | "error") => void
  onCreateNewScript: (name: string, content: string) => void
  onRenameScript: (oldName: string, newName: string) => void
}

const perpsWithTSLScript = `// Example Perps with TSL Script
// This is a sample script for trading perpetuals with trailing stop loss

async function executePerpsStrategy() {
  // Your trading logic here
  return {
    success: true,
    message: "Perps strategy executed successfully"
  };
}

// Execute the strategy
executePerpsStrategy()
.then(result => console.log("Strategy result:", result))
.catch(error => console.error("Strategy failed:", error));`

const ScriptEditorAndTester: React.FC<ScriptEditorAndTesterProps> = ({
  selectedScript,
  onScriptChange,
  onAddLog,
  onStatusChange,
  onCreateNewScript,
  onRenameScript,
}) => {
  // Script content state
  const [scriptContent, setScriptContent] = useState(`// Jupiter Trading Script Example
// This is a sample arbitrage script for SOL/USDC

async function executeArbitrageStrategy() {
  // Connect to Jupiter API
  const jupiterClient = await connectToJupiter()

  // Set trading parameters
  const inputToken = "SOL"
  const outputToken = "USDC"
  const amount = 1.0 // Amount to trade

  // Get prices from different DEXes
  const prices = await getPricesFromDEXes(inputToken, outputToken)

  // Find arbitrage opportunity
  const opportunity = findArbitrageOpportunity(prices)

  if (opportunity) {
    // Execute trades
    const result = await executeTrades(jupiterClient, opportunity)
    return {
      success: true,
      profit: result.profit,
      txIds: result.txIds,
    }
  }

  return {
    success: false,
    reason: "No arbitrage opportunity found",
  }
}

// Execute the strategy
executeArbitrageStrategy()
  .then((result) => console.log("Arbitrage result:", result))
  .catch((error) => console.error("Arbitrage failed:", error))
;`)

  // State for environment variables
  const [envVars, setEnvVars] = useState([
    { key: "JUPITER_API_KEY", value: "jup_dev_1234567890abcdef", isSecret: true, isVisible: false },
    { key: "RPC_ENDPOINT", value: "https://api.mainnet-beta.solana.com", isSecret: false, isVisible: true },
    {
      key: "WALLET_PRIVATE_KEY",
      value: "5KtPn1LGuxhFLF2c7tEcqRfZNHZ7xKKNsZznW9AKRd7vVrw...",
      isSecret: true,
      isVisible: false,
    },
    { key: "SLIPPAGE_BPS", value: "50", isSecret: false, isVisible: true },
  ])

  // State for connections
  const [connections, setConnections] = useState([
    { name: "Jupiter API", status: "connected", latency: "42ms" },
    { name: "Solana RPC", status: "connected", latency: "78ms" },
    { name: "Wallet", status: "connected", latency: "12ms" },
    { name: "Price Oracle", status: "connected", latency: "56ms" },
  ])

  // State for test mode
  const [testMode, setTestMode] = useState<"test" | "demo" | "live">("test")
  const [dataSource, setDataSource] = useState<"real" | "simulated">("real")

  // State for test execution
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  // State for new script dialog
  const [newScriptName, setNewScriptName] = useState("")
  const [isNewScriptDialogOpen, setIsNewScriptDialogOpen] = useState(false)

  // State for script name editing
  const [isEditingName, setIsEditingName] = useState(false)
  const [editedScriptName, setEditedScriptName] = useState(selectedScript)

  // State for quant analysis
  const [activeTab, setActiveTab] = useState("editor")
  const [backtestResults, setBacktestResults] = useState<any>(null)
  const [optimizationResults, setOptimizationResults] = useState<any>(null)
  const [riskParams, setRiskParams] = useState({
    maxDrawdown: 20,
    maxLoss: 10,
    positionSize: 5,
    leverageLimit: 2,
  })

  // Order state for Agent Execution
  const [orderType, setOrderType] = useState("limit")
  const [marketPair, setMarketPair] = useState("SOL/USDC")
  const [orderSize, setOrderSize] = useState("1.0")
  const [limitPrice, setLimitPrice] = useState("100.00")
  const [slippage, setSlippage] = useState(0.5)
  const [timeInForce, setTimeInForce] = useState("gtc")
  const [isAgentEnabled, setIsAgentEnabled] = useState(true)
  const [agentStrategy, setAgentStrategy] = useState("smart")
  const [agentPrompt, setAgentPrompt] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [executionSpeed, setExecutionSpeed] = useState(50)
  const [riskLevel, setRiskLevel] = useState(30)
  const [agentLogs, setAgentLogs] = useState<string[]>([])
  const [agentStatus, setAgentStatus] = useState<"idle" | "analyzing" | "executing" | "completed" | "error">("idle")

  // Advanced order settings (always visible now)
  const [postOnly, setPostOnly] = useState(false)
  const [reduceOnly, setReduceOnly] = useState(false)
  const [trailingStop, setTrailingStop] = useState(false)
  const [trailingStopPercent, setTrailingStopPercent] = useState(5)
  const [takeProfitPrice, setTakeProfitPrice] = useState("")
  const [stopLossPrice, setStopLossPrice] = useState("")

  // Market data
  const [currentPrice, setCurrentPrice] = useState(99.75)
  const [priceChange24h, setPriceChange24h] = useState(2.35)
  const [bidPrice, setBidPrice] = useState(99.7)
  const [askPrice, setAskPrice] = useState(99.8)
  const [volume24h, setVolume24h] = useState(1250000)

  // Toggle environment variable visibility
  const toggleEnvVarVisibility = (index: number) => {
    const newEnvVars = [...envVars]
    newEnvVars[index].isVisible = !newEnvVars[index].isVisible
    setEnvVars(newEnvVars)
  }

  // Update environment variable
  const updateEnvVar = (index: number, key: string, value: string) => {
    const newEnvVars = [...envVars]
    newEnvVars[index].key = key
    newEnvVars[index].value = value
    setEnvVars(newEnvVars)
  }

  // Add new environment variable
  const addEnvVar = () => {
    setEnvVars([...envVars, { key: "", value: "", isSecret: false, isVisible: true }])
  }

  // Remove environment variable
  const removeEnvVar = (index: number) => {
    const newEnvVars = [...envVars]
    newEnvVars.splice(index, 1)
    setEnvVars(newEnvVars)
  }

  // Run test or backtest
  const runTest = () => {
    if (isRunning) return

    setIsRunning(true)
    onStatusChange("running")
    setProgress(0)

    // Simulate test execution with logs
    onAddLog(
      "info",
      `Starting ${testMode === "test" ? "test" : testMode === "demo" ? "demo" : "live"} execution for "${selectedScript}"`,
    )
    onAddLog(
      "info",
      `Mode: ${testMode === "test" ? "Testing" : testMode === "demo" ? "Demo" : "Live"} with ${dataSource === "real" ? "real market data" : "simulated data"}`,
    )

    if (dataSource === "real" && testMode !== "live") {
      onAddLog("info", "IMPORTANT: Using real market data but NO ACTUAL ORDERS WILL BE SENT")
    }

    if (testMode === "live") {
      onAddLog("warning", "LIVE MODE: This will execute real trades with real assets")
    }

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 5
      })
    }, 300)

    // Connection phase
    setTimeout(() => {
      onAddLog("info", "Establishing connections to required services...")

      setTimeout(() => {
        onAddLog("info", "Connected to Jupiter API")
      }, 500)

      setTimeout(() => {
        onAddLog("info", "Connected to Solana RPC endpoint")
      }, 1000)

      setTimeout(() => {
        onAddLog("info", "Connected to wallet")
      }, 1500)

      setTimeout(() => {
        onAddLog("info", "Connected to price oracle")
      }, 2000)
    }, 1000)

    // Script execution phase
    setTimeout(() => {
      onAddLog("info", "Executing script...")

      setTimeout(() => {
        if (dataSource === "real") {
          onAddLog("info", "Fetching current real-time market data")
        } else {
          onAddLog("info", "Loading simulated market data")
        }
      }, 500)

      setTimeout(() => {
        onAddLog("info", "Analyzing price patterns")
      }, 1500)

      setTimeout(() => {
        const random = Math.random()
        if (random > 0.7) {
          onAddLog("warning", "Price spread below threshold (0.8%)")
          onStatusChange("warning")
        } else {
          onAddLog("info", "Found trading opportunity with 1.2% potential profit")
        }
      }, 2500)

      setTimeout(() => {
        if (testMode === "test") {
          onAddLog("info", "Running in test mode with historical data")

          setTimeout(() => {
            onAddLog("info", "Simulating trade execution...")

            setTimeout(() => {
              const random = Math.random()
              if (random > 0.9) {
                onAddLog("error", "Test failed: Insufficient liquidity in historical data")
                onStatusChange("error")
              } else {
                onAddLog("success", "Test completed successfully")
                onAddLog("info", "Estimated profit: 0.023 SOL ($1.57) over 7 day period")
                onStatusChange("success")
              }

              // Complete the test
              setProgress(100)
              setIsRunning(false)
            }, 2000)
          }, 1000)
        } else if (testMode === "demo") {
          onAddLog("info", "Running in demo mode with simulated market conditions")

          setTimeout(() => {
            const random = Math.random()
            if (random > 0.7) {
              onAddLog("error", "Demo failed: Strategy not profitable in current market")
              onStatusChange("error")
            } else {
              onAddLog("success", "Demo completed successfully")
              onAddLog("info", "Projected profit: 0.018 SOL ($1.23) per day")
              onStatusChange("success")
            }

            // Complete the demo
            setProgress(100)
            setIsRunning(false)
          }, 3000)
        } else {
          // Live mode
          onAddLog("info", "EXECUTING LIVE TRADES - REAL ASSETS WILL BE USED")

          setTimeout(() => {
            onAddLog("info", "Verifying wallet balance...")
            onAddLog("info", "Sufficient balance found")
            onAddLog("info", "Calculating optimal trade size...")
            onAddLog("info", "Sending transaction to blockchain...")

            setTimeout(() => {
              const random = Math.random()
              if (random > 0.8) {
                onAddLog("error", "Transaction failed: Blockchain congestion detected")
                onStatusChange("error")
              } else {
                onAddLog("success", "Trade executed successfully")
                onAddLog("info", "Transaction ID: 4x5nsT8h2DfVSLZqJj9UYXkLdKFE3nRqUDnACnx7UzwK")
                onAddLog("success", "Actual profit: 0.015 SOL ($1.02)")
                onStatusChange("success")
              }

              setProgress(100)
              setIsRunning(false)
            }, 3000)
          }, 2000)
        }
      }, 3000)
    }, 4000)

    // If it's the backtest tab, simulate backtest results
    if (activeTab === "backtest" && !backtestResults) {
      setTimeout(() => {
        setBacktestResults({
          performance: {
            netProfit: 1243.25,
            profitFactor: 2.34,
            winRate: 64.8,
            maxDrawdown: 18.6,
            sharpeRatio: 1.76,
            totalTrades: 248,
            averageTradeLength: "4.2 hours",
          },
          trades: [
            { id: 1, market: "SOL/USDC", side: "LONG", entry: 99.75, exit: 105.25, profit: 5.51, date: "2023-04-15" },
            {
              id: 2,
              market: "ETH/USDC",
              side: "SHORT",
              entry: 3450.25,
              exit: 3325.5,
              profit: 3.62,
              date: "2023-04-16",
            },
            { id: 3, market: "SOL/USDC", side: "LONG", entry: 104.5, exit: 102.25, profit: -2.15, date: "2023-04-17" },
            {
              id: 4,
              market: "BTC/USDC",
              side: "SHORT",
              entry: 62450.75,
              exit: 60125.5,
              profit: 3.72,
              date: "2023-04-18",
            },
            { id: 5, market: "SOL/USDC", side: "SHORT", entry: 101.25, exit: 95.5, profit: 5.68, date: "2023-04-19" },
          ],
          metrics: {
            daily: [
              { date: "2023-04-15", profit: 152.45, drawdown: 3.2 },
              { date: "2023-04-16", profit: 87.62, drawdown: 5.1 },
              { date: "2023-04-17", profit: -43.25, drawdown: 12.4 },
              { date: "2023-04-18", profit: 215.33, drawdown: 8.6 },
              { date: "2023-04-19", profit: 187.5, drawdown: 4.3 },
              { date: "2023-04-20", profit: 105.75, drawdown: 7.8 },
              { date: "2023-04-21", profit: 162.4, drawdown: 2.5 },
            ],
          },
        })
      }, 5000)
    }

    // If it's the optimization tab, simulate optimization results
    if (activeTab === "optimize" && !optimizationResults) {
      setTimeout(() => {
        setOptimizationResults({
          parameters: [
            { name: "EMA Fast", optimal: 12, tested: [8, 10, 12, 14, 16], metric: "profit" },
            { name: "EMA Slow", optimal: 26, tested: [20, 23, 26, 29, 32], metric: "profit" },
            { name: "RSI Period", optimal: 14, tested: [7, 10, 14, 21, 28], metric: "profit" },
            { name: "Stop Loss %", optimal: 4.5, tested: [2, 3, 4.5, 6, 7.5], metric: "drawdown" },
            { name: "Take Profit %", optimal: 8.2, tested: [5, 6.5, 8.2, 10, 12], metric: "profit" },
          ],
          results: [
            { rank: 1, profit: 1523.45, drawdown: 18.6, winRate: 64.8, paramSet: "12/26/14/4.5/8.2" },
            { rank: 2, profit: 1487.32, drawdown: 16.2, winRate: 62.5, paramSet: "12/26/14/6/8.2" },
            { rank: 3, profit: 1435.67, drawdown: 17.4, winRate: 63.2, paramSet: "14/26/14/4.5/8.2" },
            { rank: 4, profit: 1402.45, drawdown: 15.8, winRate: 61.7, paramSet: "12/29/14/4.5/8.2" },
            { rank: 5, profit: 1385.12, drawdown: 19.2, winRate: 60.4, paramSet: "12/26/10/4.5/8.2" },
          ],
        })
      }, 5000)
    }
  }

  // Stop test
  const stopTest = () => {
    setIsRunning(false)
    onAddLog("warning", "Execution stopped by user")
    onStatusChange("idle")
  }

  // Copy script
  const copyScript = () => {
    navigator.clipboard.writeText(scriptContent)
  }

  // Save script
  const saveScript = () => {
    // If we're editing the name, save the new name
    if (isEditingName && editedScriptName !== selectedScript) {
      onRenameScript(selectedScript, editedScriptName)
      setIsEditingName(false)
      onAddLog("success", `Renamed script to: ${editedScriptName}`)
    } else {
      onAddLog("success", `Script "${selectedScript}" saved successfully`)
    }
  }

  // Create new script
  const handleCreateNewScript = () => {
    const templateContent = `// New Trading Script: ${newScriptName}
// Created: ${new Date().toISOString()}

async function executeStrategy() {
  // Your trading logic here

  return {
    success: true,
    message: "Strategy executed successfully",
  }
}

// Execute the strategy
executeStrategy()
  .then((result) => console.log("Strategy result:", result))
  .catch((error) => console.error("Strategy failed:", error))
;`

    onCreateNewScript(newScriptName, templateContent)
    setNewScriptName("")
    setIsNewScriptDialogOpen(false)
  }

  // Handle script name edit
  const handleScriptNameClick = () => {
    setEditedScriptName(selectedScript)
    setIsEditingName(true)
  }

  // Handle order submission from agent
  const handleSubmitOrder = () => {
    if (isSubmitting) return

    setIsSubmitting(true)
    setAgentStatus("analyzing")
    setAgentLogs([])

    // Add initial logs
    addAgentLog("Initializing Jupiter trading agent...")
    addAgentLog(`Order type: ${orderType.toUpperCase()}`)
    addAgentLog(`Market pair: ${marketPair}`)
    addAgentLog(`Order size: ${orderSize} ${marketPair.split("/")[0]}`)

    if (orderType === "limit") {
      addAgentLog(`Limit price: ${limitPrice} ${marketPair.split("/")[1]}`)
    }

    // Simulate agent analysis
    setTimeout(() => {
      addAgentLog("Analyzing current market conditions...")
    }, 1000)

    setTimeout(() => {
      addAgentLog(`Current price: ${currentPrice} ${marketPair.split("/")[1]}`)
      addAgentLog(`24h price change: ${priceChange24h}%`)
      addAgentLog(`24h volume: ${volume24h.toLocaleString()} ${marketPair.split("/")[1]}`)
    }, 2000)

    setTimeout(() => {
      if (agentStrategy === "smart") {
        addAgentLog("Applying smart execution strategy...")
        addAgentLog("Analyzing order book depth and liquidity...")
      } else if (agentStrategy === "aggressive") {
        addAgentLog("Applying aggressive execution strategy...")
        addAgentLog("Prioritizing execution speed over price improvement...")
      } else if (agentStrategy === "passive") {
        addAgentLog("Applying passive execution strategy...")
        addAgentLog("Prioritizing price improvement over execution speed...")
      } else if (agentStrategy === "custom") {
        addAgentLog("Applying custom execution strategy based on prompt...")
        addAgentLog(`Custom instructions: ${agentPrompt}`)
      }
    }, 3000)

    setTimeout(() => {
      setAgentStatus("executing")
      addAgentLog("Preparing order execution...")

      if (orderType === "market") {
        addAgentLog(`Estimated execution price: ${askPrice} ${marketPair.split("/")[1]}`)
        addAgentLog(`Maximum slippage: ${slippage}%`)
      }
    }, 4000)

    setTimeout(() => {
      // Simulate success or failure
      const random = Math.random()

      if (random > 0.1) {
        // 90% success rate
        addAgentLog("Order routed to Jupiter Network...")

        setTimeout(() => {
          addAgentLog("Transaction confirmed on blockchain")
          addAgentLog(`Order executed successfully at ${askPrice} ${marketPair.split("/")[1]}`)
          addAgentLog(
            `Total value: ${(Number.parseFloat(orderSize) * askPrice).toFixed(2)} ${marketPair.split("/")[1]}`,
          )
          setAgentStatus("completed")
          setIsSubmitting(false)
        }, 2000)
      } else {
        addAgentLog("ERROR: Transaction failed")
        addAgentLog("Possible reasons: insufficient funds, high slippage, or network error")
        setAgentStatus("error")
        setIsSubmitting(false)
      }
    }, 6000)
  }

  // Add a log entry to agent logs
  const addAgentLog = (message: string) => {
    setAgentLogs((prev) => [...prev, message])
  }

  // Get status badge color for agent
  const getStatusBadge = () => {
    switch (agentStatus) {
      case "idle":
        return "bg-jupiter-gunmetal text-jupiter-cloud"
      case "analyzing":
        return "bg-jupiter-helix-cyan/20 text-jupiter-helix-cyan border-jupiter-helix-cyan/50"
      case "executing":
        return "bg-jupiter-nebula-blue/20 text-jupiter-nebula-blue border-jupiter-nebula-blue/50"
      case "completed":
        return "bg-jupiter-cosmic-lime/20 text-jupiter-cosmic-lime border-jupiter-cosmic-lime/50"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/50"
    }
  }

  // Update script content when selected script changes
  useEffect(() => {
    // In a real app, this would fetch the script content from a database
    if (selectedScript === "PERPS With TSL") {
      setScriptContent(perpsWithTSLScript)
    } else {
      // For other scripts, keep the existing behavior
      setScriptContent((prev) => {
        const lines = prev.split("\n")
        lines[0] = `// Jupiter Trading Script: ${selectedScript}`
        return lines.join("\n")
      })
    }

    // Update the edited script name when selected script changes
    setEditedScriptName(selectedScript)
    setIsEditingName(false)
  }, [selectedScript])

  // Simulated market data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate small price movements
      const priceDelta = (Math.random() - 0.5) * 0.2
      const newPrice = Number.parseFloat((currentPrice + priceDelta).toFixed(2))
      setCurrentPrice(newPrice)
      setBidPrice(Number.parseFloat((newPrice - 0.05).toFixed(2)))
      setAskPrice(Number.parseFloat((newPrice + 0.05).toFixed(2)))

      // Occasionally update 24h stats
      if (Math.random() > 0.8) {
        setPriceChange24h(Number.parseFloat((priceChange24h + (Math.random() - 0.5) * 0.3).toFixed(2)))
        setVolume24h(Math.floor(volume24h + (Math.random() - 0.5) * 50000))
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [currentPrice, priceChange24h, volume24h])

  // Simulate connection status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setConnections((prev) => {
        return prev.map((conn) => ({
          ...conn,
          latency: `${Math.floor(Math.random() * 100) + 10}ms`,
        }))
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
        <CardHeader className="border-b border-jupiter-charcoal pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Code className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
              {isEditingName ? (
                <Input
                  value={editedScriptName}
                  onChange={(e) => setEditedScriptName(e.target.value)}
                  className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud w-64"
                  autoFocus
                  onBlur={() => setIsEditingName(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveScript()
                    } else if (e.key === "Escape") {
                      setIsEditingName(false)
                      setEditedScriptName(selectedScript)
                    }
                  }}
                />
              ) : (
                <CardTitle
                  className="text-jupiter-cloud font-syne cursor-pointer hover:text-jupiter-nebula-blue"
                  onClick={handleScriptNameClick}
                >
                  {selectedScript}
                </CardTitle>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mr-4">
                <TabsList className="bg-jupiter-charcoal h-8">
                  <TabsTrigger value="editor" className="h-7 px-3 text-xs">
                    Editor
                  </TabsTrigger>
                  <TabsTrigger value="execute" className="h-7 px-3 text-xs">
                    Execute
                  </TabsTrigger>
                  <TabsTrigger value="backtest" className="h-7 px-3 text-xs">
                    Backtest
                  </TabsTrigger>
                  <TabsTrigger value="optimize" className="h-7 px-3 text-xs">
                    Optimize
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Badge
                variant="outline"
                className={`${
                  isRunning
                    ? "bg-jupiter-helix-cyan/20 text-jupiter-helix-cyan border-jupiter-helix-cyan/50"
                    : "bg-jupiter-charcoal text-jupiter-nebula-blue border-jupiter-nebula-blue/50"
                } text-xs`}
              >
                <div
                  className={`h-1.5 w-1.5 rounded-full bg-jupiter-nebula-blue mr-1 ${isRunning ? "animate-pulse" : ""}`}
                ></div>
                {isRunning ? "RUNNING" : "READY"}
              </Badge>

              <Dialog open={isNewScriptDialogOpen} onOpenChange={setIsNewScriptDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black">
                    <Plus className="h-4 w-4 mr-2" /> New Script
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-jupiter-meteorite border-jupiter-charcoal text-jupiter-cloud">
                  <DialogHeader>
                    <DialogTitle className="text-jupiter-cloud">Create New Script</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="script-name">Script Name</Label>
                      <Input
                        id="script-name"
                        placeholder="Enter script name"
                        value={newScriptName}
                        onChange={(e) => setNewScriptName(e.target.value)}
                        className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                        autoFocus
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleCreateNewScript}
                      disabled={!newScriptName.trim()}
                      className="bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black"
                    >
                      Create Script
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          {activeTab === "editor" && (
            <div className="grid grid-cols-1 gap-4">
              {/* Script Editor */}
              <Textarea
                value={scriptContent}
                onChange={(e) => setScriptContent(e.target.value)}
                className="font-mono text-sm h-[400px] bg-jupiter-space-black border-jupiter-charcoal text-jupiter-cloud"
              />

              {/* Environment Panel */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                  <CardHeader className="p-3 border-b border-jupiter-gunmetal pb-2">
                    <CardTitle className="text-sm font-medium text-jupiter-cloud flex items-center">
                      <Database className="h-4 w-4 mr-2 text-jupiter-nebula-blue" /> Environment Variables
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {envVars.map((envVar, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={envVar.key}
                            onChange={(e) => updateEnvVar(index, e.target.value, envVar.value)}
                            className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud h-8 text-xs"
                            placeholder="Variable name"
                          />
                          <div className="relative flex-1">
                            <Input
                              type={envVar.isVisible ? "text" : "password"}
                              value={envVar.value}
                              onChange={(e) => updateEnvVar(index, envVar.key, e.target.value)}
                              className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud h-8 text-xs pr-8"
                              placeholder="Value"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-transparent"
                              onClick={() => toggleEnvVarVisibility(index)}
                            >
                              {envVar.isVisible ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-jupiter-steel hover:text-red-400 hover:bg-jupiter-space-black"
                            onClick={() => removeEnvVar(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2 bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite hover:text-jupiter-nebula-blue"
                        onClick={addEnvVar}
                      >
                        Add Variable
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                  <CardHeader className="p-3 border-b border-jupiter-gunmetal pb-2">
                    <CardTitle className="text-sm font-medium text-jupiter-cloud flex items-center">
                      <Server className="h-4 w-4 mr-2 text-jupiter-nebula-blue" /> Connections
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-2 max-h-[200px] overflow-y-auto">
                      {connections.map((connection, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-jupiter-space-black/50 rounded-md"
                        >
                          <div className="flex items-center">
                            <div
                              className={`h-2 w-2 rounded-full mr-2 ${
                                connection.status === "connected" ? "bg-jupiter-cosmic-lime" : "bg-red-500"
                              }`}
                            ></div>
                            <span className="text-jupiter-cloud text-sm">{connection.name}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-jupiter-steel mr-2">{connection.latency}</span>
                            <RefreshCw className="h-3.5 w-3.5 text-jupiter-steel" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                  <CardHeader className="p-3 border-b border-jupiter-gunmetal pb-2">
                    <CardTitle className="text-sm font-medium text-jupiter-cloud flex items-center">
                      <Settings className="h-4 w-4 mr-2 text-jupiter-nebula-blue" /> Test Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="test-mode" className="text-jupiter-cloud text-sm">
                          Mode:
                        </Label>
                        <Select
                          value={testMode}
                          onValueChange={(value: "test" | "demo" | "live") => setTestMode(value)}
                        >
                          <SelectTrigger
                            id="test-mode"
                            className="w-28 h-8 bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud"
                          >
                            <SelectValue placeholder="Select mode" />
                          </SelectTrigger>
                          <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectItem value="test">Test Mode</SelectItem>
                            <SelectItem value="demo">Demo Mode</SelectItem>
                            <SelectItem value="live">Live Trading</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="data-source" className="text-jupiter-cloud text-sm">
                          Data:
                        </Label>
                        <Select
                          value={dataSource}
                          onValueChange={(value: "real" | "simulated") => setDataSource(value)}
                        >
                          <SelectTrigger
                            id="data-source"
                            className="w-28 h-8 bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud"
                          >
                            <SelectValue placeholder="Select data" />
                          </SelectTrigger>
                          <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectItem value="real">Real Data</SelectItem>
                            <SelectItem value="simulated">Simulated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {testMode === "live" && (
                        <div className="mt-2 p-2 bg-red-900/30 border border-red-500/30 rounded-md text-xs text-red-300">
                          Warning: Live mode executes actual trades with real assets. Use caution.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Logs Panel */}
              <div className="bg-jupiter-space-black rounded-md border border-jupiter-charcoal">
                <div className="flex items-center justify-between p-2 border-b border-jupiter-charcoal">
                  <div className="flex items-center text-jupiter-cloud font-medium">
                    <Terminal className="h-4 w-4 mr-2 text-jupiter-nebula-blue" />
                    Execution Logs
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-jupiter-charcoal"
                    onClick={() => onAddLog("info", "Logs cleared")}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                <div id="logs-container" className="font-mono text-xs h-[150px] p-3 overflow-auto">
                  {/* Logs will be injected here by the parent component */}
                </div>
              </div>
            </div>
          )}

          {activeTab === "execute" && (
            <div className="grid grid-cols-1 gap-4">
              {/* Agent Trading Interface */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Order Form */}
                <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                  <CardHeader className="p-3 border-b border-jupiter-gunmetal">
                    <CardTitle className="text-sm font-medium text-jupiter-cloud flex items-center">
                      <Bot className="h-4 w-4 mr-2 text-jupiter-nebula-blue" />
                      Order Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="market-pair" className="text-xs text-jupiter-steel mb-1 block">
                          Market Pair
                        </Label>
                        <Select value={marketPair} onValueChange={setMarketPair}>
                          <SelectTrigger className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectValue placeholder="Select market pair" />
                          </SelectTrigger>
                          <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectItem value="SOL/USDC">SOL/USDC</SelectItem>
                            <SelectItem value="ETH/USDC">ETH/USDC</SelectItem>
                            <SelectItem value="BTC/USDC">BTC/USDC</SelectItem>
                            <SelectItem value="JUP/USDC">JUP/USDC</SelectItem>
                            <SelectItem value="BONK/USDC">BONK/USDC</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="order-type" className="text-xs text-jupiter-steel mb-1 block">
                          Order Type
                        </Label>
                        <Select value={orderType} onValueChange={setOrderType}>
                          <SelectTrigger className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectValue placeholder="Select order type" />
                          </SelectTrigger>
                          <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectItem value="market">Market</SelectItem>
                            <SelectItem value="limit">Limit</SelectItem>
                            <SelectItem value="stop">Stop</SelectItem>
                            <SelectItem value="stop-limit">Stop Limit</SelectItem>
                            <SelectItem value="twap">TWAP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="order-size" className="text-xs text-jupiter-steel mb-1 block">
                          Order Size ({marketPair.split("/")[0]})
                        </Label>
                        <Input
                          id="order-size"
                          value={orderSize}
                          onChange={(e) => setOrderSize(e.target.value)}
                          className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud"
                        />
                      </div>

                      {orderType !== "market" && (
                        <div>
                          <Label htmlFor="limit-price" className="text-xs text-jupiter-steel mb-1 block">
                            Limit Price ({marketPair.split("/")[1]})
                          </Label>
                          <Input
                            id="limit-price"
                            value={limitPrice}
                            onChange={(e) => setLimitPrice(e.target.value)}
                            className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud"
                          />
                        </div>
                      )}

                      {orderType === "market" && (
                        <div>
                          <Label htmlFor="slippage" className="text-xs text-jupiter-steel mb-1 block">
                            Max Slippage: {slippage}%
                          </Label>
                          <Slider
                            id="slippage"
                            min={0.1}
                            max={5}
                            step={0.1}
                            value={[slippage]}
                            onValueChange={(value) => setSlippage(value[0])}
                            className="mt-2"
                          />
                        </div>
                      )}
                    </div>

                    {/* Advanced Order Settings - Always Visible */}
                    <div className="mt-3 space-y-3">
                      <h3 className="text-sm font-medium text-jupiter-cloud">Advanced Order Settings</h3>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="post-only"
                            checked={postOnly}
                            onCheckedChange={setPostOnly}
                            className="data-[state=checked]:bg-jupiter-nebula-blue"
                          />
                          <Label htmlFor="post-only" className="text-sm text-jupiter-cloud">
                            Post Only
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="reduce-only"
                            checked={reduceOnly}
                            onCheckedChange={setReduceOnly}
                            className="data-[state=checked]:bg-jupiter-nebula-blue"
                          />
                          <Label htmlFor="reduce-only" className="text-sm text-jupiter-cloud">
                            Reduce Only
                          </Label>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="time-in-force" className="text-xs text-jupiter-steel mb-1 block">
                            Time In Force
                          </Label>
                          <Select value={timeInForce} onValueChange={setTimeInForce}>
                            <SelectTrigger className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud">
                              <SelectValue placeholder="Select time in force" />
                            </SelectTrigger>
                            <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                              <SelectItem value="gtc">Good Till Cancelled</SelectItem>
                              <SelectItem value="ioc">Immediate or Cancel</SelectItem>
                              <SelectItem value="fok">Fill or Kill</SelectItem>
                              <SelectItem value="day">Day Order</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="trailing-stop"
                            checked={trailingStop}
                            onCheckedChange={setTrailingStop}
                            className="data-[state=checked]:bg-jupiter-nebula-blue"
                          />
                          <Label htmlFor="trailing-stop" className="text-sm text-jupiter-cloud">
                            Trailing Stop
                          </Label>
                        </div>
                      </div>

                      {trailingStop && (
                        <div>
                          <Label htmlFor="trailing-stop-percent" className="text-xs text-jupiter-steel mb-1 block">
                            Trailing Stop Percent: {trailingStopPercent}%
                          </Label>
                          <Slider
                            id="trailing-stop-percent"
                            min={0.5}
                            max={20}
                            step={0.5}
                            value={[trailingStopPercent]}
                            onValueChange={(value) => setTrailingStopPercent(value[0])}
                            className="mt-2"
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="take-profit" className="text-xs text-jupiter-steel mb-1 block">
                            Take Profit Price ({marketPair.split("/")[1]})
                          </Label>
                          <Input
                            id="take-profit"
                            value={takeProfitPrice}
                            onChange={(e) => setTakeProfitPrice(e.target.value)}
                            placeholder="Optional"
                            className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud"
                          />
                        </div>

                        <div>
                          <Label htmlFor="stop-loss" className="text-xs text-jupiter-steel mb-1 block">
                            Stop Loss Price ({marketPair.split("/")[1]})
                          </Label>
                          <Input
                            id="stop-loss"
                            value={stopLossPrice}
                            onChange={(e) => setStopLossPrice(e.target.value)}
                            placeholder="Optional"
                            className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Market Conditions */}
                    <div className="mt-3">
                      <h3 className="text-sm font-medium text-jupiter-cloud mb-2">Market Conditions</h3>
                      <div className="grid grid-cols-2 gap-4 bg-jupiter-space-black/50 p-3 rounded-md border border-jupiter-gunmetal">
                        <div className="space-y-1">
                          <div className="text-xs text-jupiter-steel">Current Price</div>
                          <div className="text-lg font-mono font-medium text-jupiter-cloud">
                            {currentPrice.toFixed(2)} {marketPair.split("/")[1]}
                            <span className={`ml-2 text-sm ${priceChange24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                              {priceChange24h >= 0 ? "+" : ""}
                              {priceChange24h}%
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs text-jupiter-steel">24h Volume</div>
                          <div className="text-lg font-mono font-medium text-jupiter-cloud">
                            {volume24h.toLocaleString()} {marketPair.split("/")[1]}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs text-jupiter-steel">Bid Price</div>
                          <div className="text-lg font-mono font-medium text-green-500">
                            {bidPrice.toFixed(2)} {marketPair.split("/")[1]}
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="text-xs text-jupiter-steel">Ask Price</div>
                          <div className="text-lg font-mono font-medium text-red-500">
                            {askPrice.toFixed(2)} {marketPair.split("/")[1]}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Agent Configuration */}
                <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                  <CardHeader className="p-3 border-b border-jupiter-gunmetal">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-jupiter-cloud flex items-center">
                        <Cpu className="h-4 w-4 mr-2 text-jupiter-nebula-blue" />
                        AI Trading Agent
                      </CardTitle>
                      <Badge variant="outline" className={`${getStatusBadge()} text-xs`}>
                        <div
                          className={`h-1.5 w-1.5 rounded-full mr-1 ${
                            agentStatus === "idle"
                              ? "bg-jupiter-steel"
                              : agentStatus === "analyzing" || agentStatus === "executing"
                                ? "bg-jupiter-helix-cyan animate-pulse"
                                : agentStatus === "completed"
                                  ? "bg-jupiter-cosmic-lime"
                                  : "bg-red-500"
                          }`}
                        ></div>
                        {agentStatus === "idle"
                          ? "READY"
                          : agentStatus === "analyzing"
                            ? "ANALYZING"
                            : agentStatus === "executing"
                              ? "EXECUTING"
                              : agentStatus === "completed"
                                ? "COMPLETED"
                                : "ERROR"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="agent-enabled"
                          checked={isAgentEnabled}
                          onCheckedChange={setIsAgentEnabled}
                          className="data-[state=checked]:bg-jupiter-nebula-blue"
                        />
                        <Label htmlFor="agent-enabled" className="text-sm text-jupiter-cloud">
                          Enable Trading Agent
                        </Label>
                      </div>
                    </div>

                    {isAgentEnabled && (
                      <>
                        <div>
                          <Label htmlFor="agent-strategy" className="text-xs text-jupiter-steel mb-1 block">
                            Agent Strategy
                          </Label>
                          <Select value={agentStrategy} onValueChange={setAgentStrategy}>
                            <SelectTrigger className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud">
                              <SelectValue placeholder="Select agent strategy" />
                            </SelectTrigger>
                            <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                              <SelectItem value="smart">Smart (Balanced)</SelectItem>
                              <SelectItem value="aggressive">Aggressive (Speed)</SelectItem>
                              <SelectItem value="passive">Passive (Price)</SelectItem>
                              <SelectItem value="custom">Custom (Prompt)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {agentStrategy === "custom" && (
                          <div className="mt-3">
                            <Label htmlFor="agent-prompt" className="text-xs text-jupiter-steel mb-1 block">
                              Custom Instructions
                            </Label>
                            <Textarea
                              id="agent-prompt"
                              value={agentPrompt}
                              onChange={(e) => setAgentPrompt(e.target.value)}
                              placeholder="Describe your custom execution strategy..."
                              className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud min-h-[100px]"
                            />
                          </div>
                        )}

                        {/* Agent Configuration - Always Visible */}
                        <div className="mt-3">
                          <h3 className="text-sm font-medium text-jupiter-cloud mb-2">Agent Configuration</h3>
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="execution-speed" className="text-xs text-jupiter-steel mb-1 block">
                                Execution Speed vs. Price Priority: {executionSpeed}%
                              </Label>
                              <Slider
                                id="execution-speed"
                                min={0}
                                max={100}
                                step={5}
                                value={[executionSpeed]}
                                onValueChange={(value) => setExecutionSpeed(value[0])}
                                className="mt-2"
                              />
                              <div className="flex justify-between text-xs mt-1">
                                <span className="text-jupiter-trifid-teal">Price Priority</span>
                                <span className="text-jupiter-cosmic-lime">Speed Priority</span>
                              </div>
                            </div>

                            <div>
                              <Label htmlFor="risk-level" className="text-xs text-jupiter-steel mb-1 block">
                                Risk Level: {riskLevel}%
                              </Label>
                              <Slider
                                id="risk-level"
                                min={0}
                                max={100}
                                step={5}
                                value={[riskLevel]}
                                onValueChange={(value) => setRiskLevel(value[0])}
                                className="mt-2"
                              />
                              <div className="flex justify-between text-xs mt-1">
                                <span className="text-jupiter-trifid-teal">Conservative</span>
                                <span className="text-jupiter-cosmic-lime">Aggressive</span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="auto-retry"
                                  defaultChecked={true}
                                  className="data-[state=checked]:bg-jupiter-nebula-blue"
                                />
                                <Label htmlFor="auto-retry" className="text-sm text-jupiter-cloud">
                                  Auto-retry Failed Orders
                                </Label>
                              </div>

                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="dynamic-sizing"
                                  defaultChecked={false}
                                  className="data-[state=checked]:bg-jupiter-nebula-blue"
                                />
                                <Label htmlFor="dynamic-sizing" className="text-sm text-jupiter-cloud">
                                  Dynamic Order Sizing
                                </Label>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="price-improvement"
                                  defaultChecked={true}
                                  className="data-[state=checked]:bg-jupiter-nebula-blue"
                                />
                                <Label htmlFor="price-improvement" className="text-sm text-jupiter-cloud">
                                  Seek Price Improvement
                                </Label>
                              </div>

                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="anti-frontrun"
                                  defaultChecked={true}
                                  className="data-[state=checked]:bg-jupiter-nebula-blue"
                                />
                                <Label htmlFor="anti-frontrun" className="text-sm text-jupiter-cloud">
                                  Anti-Frontrunning Protection
                                </Label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Agent Execution Logs */}
              <div className="bg-jupiter-space-black rounded-md border border-jupiter-charcoal">
                <div className="flex items-center justify-between p-2 border-b border-jupiter-charcoal">
                  <div className="flex items-center text-jupiter-cloud font-medium">
                    <Terminal className="h-4 w-4 mr-2 text-jupiter-nebula-blue" />
                    Agent Execution Logs
                  </div>
                </div>
                <div className="font-mono text-xs h-[200px] p-3 overflow-auto">
                  {agentLogs.length === 0 ? (
                    <div className="text-jupiter-steel italic">No logs yet. Execute an order to see agent logs.</div>
                  ) : (
                    agentLogs.map((log, index) => (
                      <div
                        key={index}
                        className={`mb-1 ${
                          log.includes("ERROR")
                            ? "text-red-400"
                            : log.includes("WARNING")
                              ? "text-amber-400"
                              : log.includes("SUCCESS") || log.includes("successfully")
                                ? "text-jupiter-cosmic-lime"
                                : "text-jupiter-cloud"
                        }`}
                      >
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Progress bar for test execution */}
              {isSubmitting && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-jupiter-cloud">Execution Progress</div>
                    <div className="text-sm text-jupiter-nebula-blue">{progress}%</div>
                  </div>
                  <Progress value={progress} className="h-2 bg-jupiter-charcoal">
                    <div className="h-full bg-gradient-jupiter-2 rounded-full" style={{ width: `${progress}%` }} />
                  </Progress>
                </div>
              )}
            </div>
          )}

          {activeTab === "backtest" && (
            <div className="grid grid-cols-1 gap-4">
              {/* Backtest Configuration */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                  <CardHeader className="p-3 border-b border-jupiter-gunmetal">
                    <CardTitle className="text-sm font-medium text-jupiter-cloud flex items-center">
                      <Settings className="h-4 w-4 mr-2 text-jupiter-nebula-blue" />
                      Backtest Parameters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="backtest-period" className="text-xs text-jupiter-steel mb-1 block">
                          Test Period
                        </Label>
                        <Select defaultValue="30d">
                          <SelectTrigger className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectItem value="7d">Past 7 Days</SelectItem>
                            <SelectItem value="30d">Past 30 Days</SelectItem>
                            <SelectItem value="90d">Past 90 Days</SelectItem>
                            <SelectItem value="1y">Past Year</SelectItem>
                            <SelectItem value="custom">Custom Period</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="backtest-market" className="text-xs text-jupiter-steel mb-1 block">
                          Market
                        </Label>
                        <Select defaultValue="SOL-USDC">
                          <SelectTrigger className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectValue placeholder="Select market" />
                          </SelectTrigger>
                          <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectItem value="SOL-USDC">SOL/USDC</SelectItem>
                            <SelectItem value="ETH-USDC">ETH/USDC</SelectItem>
                            <SelectItem value="BTC-USDC">BTC/USDC</SelectItem>
                            <SelectItem value="JUP-USDC">JUP/USDC</SelectItem>
                            <SelectItem value="MULTI">Multiple Markets</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="backtest-capital" className="text-xs text-jupiter-steel mb-1 block">
                          Initial Capital (USDC)
                        </Label>
                        <Input
                          id="backtest-capital"
                          defaultValue="10000"
                          className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud"
                        />
                      </div>

                      <div>
                        <Label htmlFor="backtest-fee" className="text-xs text-jupiter-steel mb-1 block">
                          Trading Fee (%)
                        </Label>
                        <Input
                          id="backtest-fee"
                          defaultValue="0.35"
                          className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud"
                        />
                      </div>

                      <div>
                        <Label htmlFor="backtest-slippage" className="text-xs text-jupiter-steel mb-1 block">
                          Slippage (%)
                        </Label>
                        <Input
                          id="backtest-slippage"
                          defaultValue="1.0"
                          className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                  <CardHeader className="p-3 border-b border-jupiter-gunmetal">
                    <CardTitle className="text-sm font-medium text-jupiter-cloud flex items-center">
                      <DatabaseIcon className="h-4 w-4 mr-2 text-jupiter-nebula-blue" />
                      Data Sources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="data-resolution" className="text-xs text-jupiter-steel mb-1 block">
                          Resolution
                        </Label>
                        <Select defaultValue="1h">
                          <SelectTrigger className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectValue placeholder="Select resolution" />
                          </SelectTrigger>
                          <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectItem value="1m">1 Minute</SelectItem>
                            <SelectItem value="5m">5 Minutes</SelectItem>
                            <SelectItem value="15m">15 Minutes</SelectItem>
                            <SelectItem value="1h">1 Hour</SelectItem>
                            <SelectItem value="4h">4 Hours</SelectItem>
                            <SelectItem value="1d">1 Day</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="data-provider" className="text-xs text-jupiter-steel mb-1 block">
                          Data Provider
                        </Label>
                        <Select defaultValue="jupiter">
                          <SelectTrigger className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectItem value="jupiter">Jupiter Exchange</SelectItem>
                            <SelectItem value="pyth">Pyth Network</SelectItem>
                            <SelectItem value="switchboard">Switchboard</SelectItem>
                            <SelectItem value="coingecko">CoinGecko</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="include-volume"
                          defaultChecked={true}
                          className="data-[state=checked]:bg-jupiter-nebula-blue"
                        />
                        <Label htmlFor="include-volume" className="text-sm text-jupiter-cloud">
                          Include Volume Data
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="include-liquidity"
                          defaultChecked={true}
                          className="data-[state=checked]:bg-jupiter-nebula-blue"
                        />
                        <Label htmlFor="include-liquidity" className="text-sm text-jupiter-cloud">
                          Include Liquidity Data
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="include-orderbook"
                          defaultChecked={false}
                          className="data-[state=checked]:bg-jupiter-nebula-blue"
                        />
                        <Label htmlFor="include-orderbook" className="text-sm text-jupiter-cloud">
                          Include Order Book Data
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                  <CardHeader className="p-3 border-b border-jupiter-gunmetal">
                    <CardTitle className="text-sm font-medium text-jupiter-cloud flex items-center">
                      <ShieldIcon className="h-4 w-4 mr-2 text-jupiter-nebula-blue" />
                      Risk Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="max-drawdown" className="text-xs text-jupiter-steel mb-1 block">
                          Max Drawdown: {riskParams.maxDrawdown}%
                        </Label>
                        <Slider
                          id="max-drawdown"
                          min={5}
                          max={50}
                          step={5}
                          value={[riskParams.maxDrawdown]}
                          onValueChange={(value) => setRiskParams({ ...riskParams, maxDrawdown: value[0] })}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="max-loss" className="text-xs text-jupiter-steel mb-1 block">
                          Max Loss Per Trade: {riskParams.maxLoss}%
                        </Label>
                        <Slider
                          id="max-loss"
                          min={1}
                          max={20}
                          step={1}
                          value={[riskParams.maxLoss]}
                          onValueChange={(value) => setRiskParams({ ...riskParams, maxLoss: value[0] })}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="position-size" className="text-xs text-jupiter-steel mb-1 block">
                          Position Size: {riskParams.positionSize}%
                        </Label>
                        <Slider
                          id="position-size"
                          min={1}
                          max={25}
                          step={1}
                          value={[riskParams.positionSize]}
                          onValueChange={(value) => setRiskParams({ ...riskParams, positionSize: value[0] })}
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="leverage-limit" className="text-xs text-jupiter-steel mb-1 block">
                          Leverage Limit: {riskParams.leverageLimit}x
                        </Label>
                        <Slider
                          id="leverage-limit"
                          min={1}
                          max={10}
                          step={1}
                          value={[riskParams.leverageLimit]}
                          onValueChange={(value) => setRiskParams({ ...riskParams, leverageLimit: value[0] })}
                          className="mt-2"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="auto-exit"
                          defaultChecked={true}
                          className="data-[state=checked]:bg-jupiter-nebula-blue"
                        />
                        <Label htmlFor="auto-exit" className="text-sm text-jupiter-cloud">
                          Auto Exit After Time Period
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results Display */}
              {backtestResults ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                      <CardContent className="p-3">
                        <div className="text-xs text-jupiter-steel mb-1">Net Profit</div>
                        <div className="text-2xl font-bold text-jupiter-cosmic-lime">
                          ${backtestResults.performance.netProfit.toFixed(2)}
                        </div>
                        <div className="text-xs text-jupiter-steel mt-1">
                          {backtestResults.performance.profitFactor.toFixed(2)} profit factor
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                      <CardContent className="p-3">
                        <div className="text-xs text-jupiter-steel mb-1">Win Rate</div>
                        <div className="text-2xl font-bold text-jupiter-nebula-blue">
                          {backtestResults.performance.winRate}%
                        </div>
                        <div className="text-xs text-jupiter-steel mt-1">
                          {backtestResults.performance.totalTrades} total trades
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                      <CardContent className="p-3">
                        <div className="text-xs text-jupiter-steel mb-1">Max Drawdown</div>
                        <div className="text-2xl font-bold text-red-400">
                          {backtestResults.performance.maxDrawdown}%
                        </div>
                        <div className="text-xs text-jupiter-steel mt-1">
                          Sharpe Ratio: {backtestResults.performance.sharpeRatio}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                      <CardContent className="p-3">
                        <div className="text-xs text-jupiter-steel mb-1">Average Trade</div>
                        <div className="text-2xl font-bold text-jupiter-helix-cyan">
                          {backtestResults.performance.averageTradeLength}
                        </div>
                        <div className="text-xs text-jupiter-steel mt-1">
                          $
                          {(backtestResults.performance.netProfit / backtestResults.performance.totalTrades).toFixed(2)}{" "}
                          per trade
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                    <CardHeader className="p-3 border-b border-jupiter-gunmetal">
                      <CardTitle className="text-sm font-medium text-jupiter-cloud">Recent Trades</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-jupiter-gunmetal bg-jupiter-space-black/40">
                              <th className="text-left p-3 text-jupiter-steel font-medium">ID</th>
                              <th className="text-left p-3 text-jupiter-steel font-medium">Market</th>
                              <th className="text-left p-3 text-jupiter-steel font-medium">Side</th>
                              <th className="text-left p-3 text-jupiter-steel font-medium">Entry</th>
                              <th className="text-left p-3 text-jupiter-steel font-medium">Exit</th>
                              <th className="text-left p-3 text-jupiter-steel font-medium">Profit %</th>
                              <th className="text-left p-3 text-jupiter-steel font-medium">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {backtestResults.trades.map((trade) => (
                              <tr key={trade.id} className="border-b border-jupiter-gunmetal/30">
                                <td className="p-3 text-jupiter-cloud">{trade.id}</td>
                                <td className="p-3 text-jupiter-cloud">{trade.market}</td>
                                <td className="p-3">
                                  <Badge
                                    className={`${
                                      trade.side === "LONG"
                                        ? "bg-jupiter-cosmic-lime/20 text-jupiter-cosmic-lime border-jupiter-cosmic-lime/50"
                                        : "bg-red-400/20 text-red-400 border-red-400/50"
                                    }`}
                                  >
                                    {trade.side}
                                  </Badge>
                                </td>
                                <td className="p-3 text-jupiter-cloud">${trade.entry.toFixed(2)}</td>
                                <td className="p-3 text-jupiter-cloud">${trade.exit.toFixed(2)}</td>
                                <td
                                  className={`p-3 ${trade.profit >= 0 ? "text-jupiter-cosmic-lime" : "text-red-400"}`}
                                >
                                  {trade.profit >= 0 ? "+" : ""}
                                  {trade.profit.toFixed(2)}%
                                </td>
                                <td className="p-3 text-jupiter-cloud">{trade.date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="flex justify-center py-6">
                  <Button
                    onClick={runTest}
                    disabled={isRunning}
                    className="bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black font-medium"
                  >
                    {isRunning ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Running Backtest...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-1" /> Run Backtest
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}

          {activeTab === "optimize" && (
            <div className="grid grid-cols-1 gap-4">
              {/* Optimization Configuration */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                  <CardHeader className="p-3 border-b border-jupiter-gunmetal">
                    <CardTitle className="text-sm font-medium text-jupiter-cloud flex items-center">
                      <Settings className="h-4 w-4 mr-2 text-jupiter-nebula-blue" />
                      Parameters to Optimize
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="optimize-ema-fast"
                          defaultChecked={true}
                          className="data-[state=checked]:bg-jupiter-nebula-blue"
                        />
                        <div className="flex-1">
                          <Label htmlFor="optimize-ema-fast" className="text-sm text-jupiter-cloud">
                            EMA Fast Period
                          </Label>
                          <div className="flex items-center text-xs text-jupiter-steel mt-1">
                            <span>Range: 8-16</span>
                            <span className="mx-1">|</span>
                            <span>Step: 2</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="optimize-ema-slow"
                          defaultChecked={true}
                          className="data-[state=checked]:bg-jupiter-nebula-blue"
                        />
                        <div className="flex-1">
                          <Label htmlFor="optimize-ema-slow" className="text-sm text-jupiter-cloud">
                            EMA Slow Period
                          </Label>
                          <div className="flex items-center text-xs text-jupiter-steel mt-1">
                            <span>Range: 20-32</span>
                            <span className="mx-1">|</span>
                            <span>Step: 3</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="optimize-rsi"
                          defaultChecked={true}
                          className="data-[state=checked]:bg-jupiter-nebula-blue"
                        />
                        <div className="flex-1">
                          <Label htmlFor="optimize-rsi" className="text-sm text-jupiter-cloud">
                            RSI Period
                          </Label>
                          <div className="flex items-center text-xs text-jupiter-steel mt-1">
                            <span>Range: 7-28</span>
                            <span className="mx-1">|</span>
                            <span>Step: 7</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="optimize-stop"
                          defaultChecked={true}
                          className="data-[state=checked]:bg-jupiter-nebula-blue"
                        />
                        <div className="flex-1">
                          <Label htmlFor="optimize-stop" className="text-sm text-jupiter-cloud">
                            Stop Loss %
                          </Label>
                          <div className="flex items-center text-xs text-jupiter-steel mt-1">
                            <span>Range: 2-7.5%</span>
                            <span className="mx-1">|</span>
                            <span>Step: 1.5%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="optimize-profit"
                          defaultChecked={true}
                          className="data-[state=checked]:bg-jupiter-nebula-blue"
                        />
                        <div className="flex-1">
                          <Label htmlFor="optimize-profit" className="text-sm text-jupiter-cloud">
                            Take Profit %
                          </Label>
                          <div className="flex items-center text-xs text-jupiter-steel mt-1">
                            <span>Range: 5-12%</span>
                            <span className="mx-1">|</span>
                            <span>Step: 1.5%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                  <CardHeader className="p-3 border-b border-jupiter-gunmetal">
                    <CardTitle className="text-sm font-medium text-jupiter-cloud flex items-center">
                      <Target className="h-4 w-4 mr-2 text-jupiter-nebula-blue" />
                      Optimization Targets
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="primary-goal" className="text-xs text-jupiter-steel mb-1 block">
                          Primary Goal
                        </Label>
                        <Select defaultValue="profit">
                          <SelectTrigger className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectValue placeholder="Select goal" />
                          </SelectTrigger>
                          <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectItem value="profit">Maximum Profit</SelectItem>
                            <SelectItem value="sharpe">Best Sharpe Ratio</SelectItem>
                            <SelectItem value="drawdown">Minimize Drawdown</SelectItem>
                            <SelectItem value="win-rate">Highest Win Rate</SelectItem>
                            <SelectItem value="profit-factor">Best Profit Factor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="constraint-1" className="text-xs text-jupiter-steel mb-1 block">
                          Constraint 1
                        </Label>
                        <Select defaultValue="drawdown-20">
                          <SelectTrigger className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectValue placeholder="Select constraint" />
                          </SelectTrigger>
                          <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectItem value="drawdown-20">Max Drawdown &lt; 20%</SelectItem>
                            <SelectItem value="win-rate-50">Win Rate &gt; 50%</SelectItem>
                            <SelectItem value="trades-100">Min 100 Trades</SelectItem>
                            <SelectItem value="profit-factor-1.5">Profit Factor &gt; 1.5</SelectItem>
                            <SelectItem value="none">No Constraint</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="constraint-2" className="text-xs text-jupiter-steel mb-1 block">
                          Constraint 2
                        </Label>
                        <Select defaultValue="win-rate-50">
                          <SelectTrigger className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectValue placeholder="Select constraint" />
                          </SelectTrigger>
                          <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectItem value="drawdown-20">Max Drawdown &lt; 20%</SelectItem>
                            <SelectItem value="win-rate-50">Win Rate &gt; 50%</SelectItem>
                            <SelectItem value="trades-100">Min 100 Trades</SelectItem>
                            <SelectItem value="profit-factor-1.5">Profit Factor &gt; 1.5</SelectItem>
                            <SelectItem value="none">No Constraint</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="walk-forward"
                          defaultChecked={true}
                          className="data-[state=checked]:bg-jupiter-nebula-blue"
                        />
                        <Label htmlFor="walk-forward" className="text-sm text-jupiter-cloud">
                          Walk-Forward Optimization
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="monte-carlo"
                          defaultChecked={false}
                          className="data-[state=checked]:bg-jupiter-nebula-blue"
                        />
                        <Label htmlFor="monte-carlo" className="text-sm text-jupiter-cloud">
                          Monte Carlo Simulation
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                  <CardHeader className="p-3 border-b border-jupiter-gunmetal">
                    <CardTitle className="text-sm font-medium text-jupiter-cloud flex items-center">
                      <Cpu className="h-4 w-4 mr-2 text-jupiter-nebula-blue" />
                      Optimization Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="optimization-method" className="text-xs text-jupiter-steel mb-1 block">
                          Method
                        </Label>
                        <Select defaultValue="grid">
                          <SelectTrigger className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectItem value="grid">Grid Search</SelectItem>
                            <SelectItem value="genetic">Genetic Algorithm</SelectItem>
                            <SelectItem value="bayesian">Bayesian Optimization</SelectItem>
                            <SelectItem value="random">Random Search</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="iterations" className="text-xs text-jupiter-steel mb-1 block">
                          Max Iterations
                        </Label>
                        <Input
                          id="iterations"
                          defaultValue="100"
                          className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud"
                        />
                      </div>

                      <div>
                        <Label htmlFor="parallel-jobs" className="text-xs text-jupiter-steel mb-1 block">
                          Parallel Jobs
                        </Label>
                        <Select defaultValue="4">
                          <SelectTrigger className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectValue placeholder="Select parallel jobs" />
                          </SelectTrigger>
                          <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                            <SelectItem value="1">1 Job</SelectItem>
                            <SelectItem value="2">2 Jobs</SelectItem>
                            <SelectItem value="4">4 Jobs</SelectItem>
                            <SelectItem value="8">8 Jobs</SelectItem>
                            <SelectItem value="auto">Auto (Based on CPU)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="early-stopping"
                          defaultChecked={true}
                          className="data-[state=checked]:bg-jupiter-nebula-blue"
                        />
                        <Label htmlFor="early-stopping" className="text-sm text-jupiter-cloud">
                          Early Stopping
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="save-results"
                          defaultChecked={true}
                          className="data-[state=checked]:bg-jupiter-nebula-blue"
                        />
                        <Label htmlFor="save-results" className="text-sm text-jupiter-cloud">
                          Save All Results
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Results Display */}
              {optimizationResults ? (
                <div className="space-y-4">
                  <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                    <CardHeader className="p-3 border-b border-jupiter-gunmetal">
                      <CardTitle className="text-sm font-medium text-jupiter-cloud">Optimal Parameters</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-jupiter-gunmetal bg-jupiter-space-black/40">
                              <th className="text-left p-3 text-jupiter-steel font-medium">Parameter</th>
                              <th className="text-left p-3 text-jupiter-steel font-medium">Optimal Value</th>
                              <th className="text-left p-3 text-jupiter-steel font-medium">Tested Values</th>
                              <th className="text-left p-3 text-jupiter-steel font-medium">Optimization Metric</th>
                            </tr>
                          </thead>
                          <tbody>
                            {optimizationResults.parameters.map((param, idx) => (
                              <tr key={idx} className="border-b border-jupiter-gunmetal/30">
                                <td className="p-3 text-jupiter-cloud">{param.name}</td>
                                <td className="p-3 text-jupiter-nebula-blue font-medium">{param.optimal}</td>
                                <td className="p-3 text-jupiter-cloud">{param.tested.join(", ")}</td>
                                <td className="p-3 text-jupiter-cloud">{param.metric}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-jupiter-charcoal border-jupiter-gunmetal">
                    <CardHeader className="p-3 border-b border-jupiter-gunmetal">
                      <CardTitle className="text-sm font-medium text-jupiter-cloud">Top Parameter Sets</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-jupiter-gunmetal bg-jupiter-space-black/40">
                              <th className="text-left p-3 text-jupiter-steel font-medium">Rank</th>
                              <th className="text-left p-3 text-jupiter-steel font-medium">Profit</th>
                              <th className="text-left p-3 text-jupiter-steel font-medium">Drawdown</th>
                              <th className="text-left p-3 text-jupiter-steel font-medium">Win Rate</th>
                              <th className="text-left p-3 text-jupiter-steel font-medium">Parameter Set</th>
                            </tr>
                          </thead>
                          <tbody>
                            {optimizationResults.results.map((result) => (
                              <tr key={result.rank} className="border-b border-jupiter-gunmetal/30">
                                <td className="p-3 text-jupiter-cloud">{result.rank}</td>
                                <td className="p-3 text-jupiter-cosmic-lime">${result.profit.toFixed(2)}</td>
                                <td className="p-3 text-red-400">{result.drawdown}%</td>
                                <td className="p-3 text-jupiter-cloud">{result.winRate}%</td>
                                <td className="p-3 text-jupiter-cloud font-mono text-xs">{result.paramSet}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="flex justify-center py-6">
                  <Button
                    onClick={runTest}
                    disabled={isRunning}
                    className="bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black font-medium"
                  >
                    {isRunning ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Running Optimization...
                      </>
                    ) : (
                      <>
                        <Cpu className="h-4 w-4 mr-1" /> Start Optimization
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Progress bar for test execution */}
          {isRunning && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm text-jupiter-cloud">Execution Progress</div>
                <div className="text-sm text-jupiter-nebula-blue">{progress}%</div>
              </div>
              <Progress value={progress} className="h-2 bg-jupiter-charcoal">
                <div className="h-full bg-gradient-jupiter-2 rounded-full" style={{ width: `${progress}%` }} />
              </Progress>
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t border-jupiter-charcoal pt-4 flex justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyScript}
              className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite hover:text-jupiter-nebula-blue hover:border-jupiter-nebula-blue/50"
            >
              <Copy className="h-4 w-4 mr-1" /> Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={saveScript}
              className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite hover:text-jupiter-nebula-blue hover:border-jupiter-nebula-blue/50"
            >
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite hover:text-jupiter-nebula-blue hover:border-jupiter-nebula-blue/50"
            >
              <Download className="h-4 w-4 mr-1" /> Export
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            {isRunning ? (
              <Button onClick={stopTest} className="bg-red-500/80 hover:bg-red-600 text-white">
                <Pause className="h-4 w-4 mr-1" /> Stop
              </Button>
            ) : activeTab === "execute" ? (
              <Button
                onClick={handleSubmitOrder}
                disabled={isSubmitting}
                className={`${
                  isSubmitting
                    ? "bg-jupiter-gunmetal text-jupiter-steel cursor-not-allowed"
                    : "bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black font-medium"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="animate-spin -ml-1 mr-2 h-4 w-4 text-jupiter-cloud" />
                    Executing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-1" /> Execute Order
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={runTest}
                className="bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black font-medium"
              >
                <Play className="h-4 w-4 mr-1" /> Run{" "}
                {testMode === "test" ? "Test" : testMode === "demo" ? "Demo" : "Live Trading"}
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export default ScriptEditorAndTester
