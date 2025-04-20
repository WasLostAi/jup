"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Play,
  Pause,
  RefreshCw,
  Settings,
  Terminal,
  Database,
  Server,
  Eye,
  EyeOff,
  Check,
  AlertTriangle,
  X,
  Copy,
  Save,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
// Add this import at the top of the file
import { pythDataService } from "@/lib/pyth-service"

interface ScriptTestingEnvironmentProps {
  className?: string
}

// Add the PERPS With TSL script content as a constant at the top of the component, after the imports
const perpsWithTSLScript = `// PERPS With TSL - Perpetual Futures Trading with Trailing Stop Loss
// This script implements a strategy for trading perpetual futures with trailing stop losses

import { Connection, Keypair } from '@solana/web3.js';
import { MarketDataService, RiskCalculator, Draino } from './modules';

type Market = 'SOL' | 'ETH' | 'BTC';
type TimeFrame = '12H' | '24H';
type RiskLevel = 'low' | 'med' | 'high';
type PositionType = 'LONG' | 'SHORT' | 'HEDGE';

interface PositionConfig {
  amount: number;
  leverage: number;
  risk: RiskLevel;
  timeframe: TimeFrame;
  trailingStop: number;
}

export class TradingEngine {
  private activePositions = new Map();
  private volatilityCache = new Map();

  constructor(
    private connection: Connection,
    private marketData: MarketDataService,
    private risk: RiskCalculator
  ) {}

  async evaluateMarkets() {
    const markets: Market[] = ['SOL', 'ETH', 'BTC'];
    
    for (const market of markets) {
      const [price12h, price24h] = await Promise.all([
        this.marketData.getHistoricalData(market, '12H'),
        this.marketData.getHistoricalData(market, '24H')
      ]);

      const volatility = this.calculateVolatility(market);
      const currentPrice = await this.marketData.getCurrentPrice(market);
      
      this.checkEntrySignals(market, {
        '12H': price12h,
        '24H': price24h,
        currentPrice,
        volatility
      });
    }
  }

  private async checkEntrySignals(market: Market, data: any) {
    const strategyParams = {
      rsi: this.calculateRSI(market),
      obv: this.calculateOBV(market),
      macd: this.calculateMACD(market),
      volatility: data.volatility
    };

    const entrySignals = {
      LONG: data.currentPrice > data['12H'].high * 1.001,
      SHORT: data.currentPrice < data['12H'].low * 0.999
    };

    if (entrySignals.LONG && strategyParams.rsi < 70) {
      await this.openPosition(market, 'LONG');
    } else if (entrySignals.SHORT && strategyParams.rsi > 30) {
      await this.openPosition(market, 'SHORT');
    }
  }

  private calculateVolatility(market: Market): number {
    // Implementation using historical price data
    return 0.15; // Placeholder
  }

  private calculateRSI(market: Market): number {
    // RSI calculation implementation
    return 50; // Placeholder
  }

  private calculateOBV(market: Market): number {
    // On-Balance Volume calculation
    return 1000; // Placeholder
  }

  private calculateMACD(market: Market): {signal: number, histogram: number} {
    // MACD calculation
    return {signal: 0.5, histogram: 0.2}; // Placeholder
  }

  private async openPosition(market: Market, type: PositionType) {
    const config = this.risk.calculateParameters('med', market);
    this.activePositions.set(market, {
      type,
      ...config,
      entryPrice: await this.marketData.getCurrentPrice(market),
      timestamp: Date.now()
    });
    
    console.log(\`Opening \${type} position for \${market} with config:\`, config);
    // In real implementation, this would call the exchange API
  }
}

// Risk Calculator implementation
class RiskCalculator {
  private riskParams = {
    low: { maxDrawdown: 0.05, positionSize: 0.1 },
    med: { maxDrawdown: 0.1, positionSize: 0.3 },
    high: { maxDrawdown: 0.2, positionSize: 0.5 }
  };

  calculateParameters(riskLevel: RiskLevel, market: Market) {
    const params = this.riskParams[riskLevel];
    return {
      amount: params.positionSize * 12,
      leverage: 5,
      stop: this.calculateTrailingStop(market, params.maxDrawdown)
    };
  }

  private calculateTrailingStop(market: Market, maxDrawdown: number): number {
    // Volatility-adjusted stop calculation
    return maxDrawdown * 1.5; // Placeholder
  }
}

// MarketDataService implementation
class MarketDataService {
  constructor(private rpcEndpoint: string) {}
  
  async getCurrentPrice(market: Market): Promise<number> {
    // In real implementation, this would fetch from an API
    const prices = {
      'SOL': 150.25,
      'ETH': 3450.75,
      'BTC': 62150.50
    };
    return prices[market];
  }
  
  async getHistoricalData(market: Market, timeframe: TimeFrame): Promise<any> {
    // Placeholder implementation
    return {
      high: market === 'SOL' ? 155.50 : market === 'ETH' ? 3500.25 : 63000.00,
      low: market === 'SOL' ? 145.25 : market === 'ETH' ? 3400.50 : 61000.00,
      open: market === 'SOL' ? 148.75 : market === 'ETH' ? 3425.00 : 61500.00,
      close: market === 'SOL' ? 150.25 : market === 'ETH' ? 3450.75 : 62150.50,
    };
  }
  
  getVolatility(market: Market): number {
    const volatilities = {
      'SOL': 0.12,
      'ETH': 0.08,
      'BTC': 0.06
    };
    return volatilities[market];
  }
}

// Draino implementation for risk management
class Draino {
  constructor(private marketData: MarketDataService) {}
  
  private volatilityThresholds = {
    SOL: 0.15,
    ETH: 0.12,
    BTC: 0.1
  };

  monitorPositions(activePositions: Map<string, any>) {
    for (const [market, config] of activePositions.entries()) {
      const currentVolatility = this.marketData.getVolatility(market as Market);
      
      if (currentVolatility > this.volatilityThresholds[market as Market] * 1.5) {
        this.forceLiquidation(market as Market);
      }
    }
  }

  private async forceLiquidation(market: Market) {
    console.log(\`EMERGENCY: Force liquidating \${market} position due to excessive volatility\`);
    // In real implementation, this would call the exchange API
  }
}

// Main execution function
async function executeStrategy() {
  const rpcEndpoint = process.env.QUICKNODE_RPC || "https://api.mainnet-beta.solana.com";
  const marketData = new MarketDataService(rpcEndpoint);
  const riskCalculator = new RiskCalculator();
  
  const engine = new TradingEngine(
    new Connection(rpcEndpoint),
    marketData,
    riskCalculator
  );
  
  const draino = new Draino(marketData);
  
  console.log("Starting PERPS With TSL strategy execution...");
  await engine.evaluateMarkets();
  console.log("Market evaluation complete");
  
  // In a real implementation, this would run on a schedule
  setInterval(() => {
    draino.monitorPositions(engine.activePositions);
  }, 60000); // Check every minute
  
  return { success: true, message: "Strategy initialized successfully" };
}

// Execute the strategy
executeStrategy()
  .then(result => console.log("Strategy execution result:", result))
  .catch(error => console.error("Strategy execution failed:", error));`

export const ScriptTestingEnvironment: React.FC<ScriptTestingEnvironmentProps> = ({ className = "" }) => {
  // State for script selection and content
  const [selectedScript, setSelectedScript] = useState("SOL/USDC Arbitrage")
  const [scriptContent, setScriptContent] = useState(`// Jupiter Trading Script Example
// This is a sample arbitrage script for SOL/USDC

async function executeArbitrageStrategy() {
  // Connect to Jupiter API
  const jupiterClient = await connectToJupiter();
  
  // Set trading parameters
  const inputToken = "SOL";
  const outputToken = "USDC";
  const amount = 1.0; // Amount to trade
  
  // Get prices from different DEXes
  const prices = await getPricesFromDEXes(inputToken, outputToken);
  
  // Find arbitrage opportunity
  const opportunity = findArbitrageOpportunity(prices);
  
  if (opportunity) {
    // Execute trades
    const result = await executeTrades(jupiterClient, opportunity);
    return {
      success: true,
      profit: result.profit,
      txIds: result.txIds
    };
  }
  
  return {
    success: false,
    reason: "No arbitrage opportunity found"
  };
}

// Execute the strategy
executeArbitrageStrategy()
  .then(result => console.log("Arbitrage result:", result))
  .catch(error => console.error("Arbitrage failed:", error));`)

  // Add a condition to load the PERPS With TSL script content when selected
  // Add this after the useState for scriptContent
  useEffect(() => {
    if (selectedScript === "PERPS With TSL") {
      setScriptContent(perpsWithTSLScript)
    }
  }, [selectedScript])

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

  // State for test configuration
  const [testConfig, setTestConfig] = useState({
    environment: "testnet",
    useSimulation: true,
    dataSource: "real", // Options: "real" or "simulated"
    maxGasFee: 0.001,
    timeout: 30,
    retryCount: 3,
    logLevel: "info",
  })

  // State for test execution
  const [isRunning, setIsRunning] = useState(false)
  const [testStatus, setTestStatus] = useState<"idle" | "running" | "success" | "warning" | "error">("idle")
  const [progress, setProgress] = useState(0)
  const [logs, setLogs] = useState<Array<{ level: string; message: string; timestamp: string }>>([])
  const [testResults, setTestResults] = useState<any>(null)
  const [expandedSection, setExpandedSection] = useState<string | null>("env-vars")

  // Update the availableScripts array to include the new PERPS With TSL script
  const availableScripts = [
    "PERPS With TSL",
    "SOL/USDC Arbitrage",
    "JUP Token Accumulator",
    "Market Volatility Trader",
    "Limit Order Bot",
    "DCA Strategy",
  ]

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

  // Add log entry
  const addLog = (level: string, message: string) => {
    const timestamp = new Date().toISOString().split("T")[1].split(".")[0]
    setLogs((prev) => [...prev, { level, message, timestamp }])
  }

  // Add this function to fetch real price data from Pyth
  const fetchPythPrice = async (symbol: string) => {
    try {
      // Convert symbol format if needed (e.g., "JUP/USDC" to "JUP/USD")
      const pythSymbol = symbol.replace("USDC", "USD")

      // Get current price from Pyth
      const price = await pythDataService.getCurrentPrice(pythSymbol)
      return price || null
    } catch (error) {
      console.error("Error fetching Pyth price:", error)
      return null
    }
  }

  // Run test
  const runTest = async () => {
    if (isRunning) return

    setIsRunning(true)
    setTestStatus("running")
    setProgress(0)
    setLogs([])
    setTestResults(null)

    // Simulate test execution with logs
    addLog("info", `Starting test execution for "${selectedScript}"`)
    addLog("info", `Environment: ${testConfig.environment}`)
    addLog("info", `Simulation mode: ${testConfig.useSimulation ? "enabled" : "disabled"}`)
    addLog("info", `Data source: ${testConfig.dataSource === "real" ? "Real market data" : "Simulated data"}`)

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
      addLog("info", "Establishing connections to required services...")

      setTimeout(() => {
        addLog("info", "Connected to Jupiter API")
      }, 500)

      setTimeout(() => {
        addLog("info", "Connected to Solana RPC endpoint")
      }, 1000)

      setTimeout(() => {
        addLog("info", "Connected to wallet")
      }, 1500)

      setTimeout(() => {
        addLog("info", "Connected to price oracle")
      }, 2000)
    }, 1000)

    // Script execution phase
    setTimeout(() => {
      addLog("info", "Executing script...")

      setTimeout(async () => {
        const selectedSymbol = "JUP/USDC" // Example symbol, replace with actual logic to determine the symbol

        if (testConfig.dataSource === "real") {
          // Fetch real price data from Pyth
          const price = await fetchPythPrice(selectedSymbol)
          if (price) {
            addLog("info", `Using real Pyth price data: $${price.toFixed(2)} for ${selectedSymbol}`)
          } else {
            addLog("warning", `Failed to fetch Pyth price data for ${selectedSymbol}, using simulated data instead`)
          }
        } else {
          addLog("info", "Generating simulated market prices")
        }
      }, 500)

      setTimeout(() => {
        addLog("info", "Analyzing price differences across DEXes")
      }, 1500)

      setTimeout(() => {
        const random = Math.random()
        if (random > 0.7) {
          addLog("warning", "Price spread below threshold (0.8%)")
          setTestStatus("warning")
        } else {
          addLog(
            "info",
            `Found arbitrage opportunity with 1.2% spread using ${testConfig.dataSource === "real" ? "real" : "simulated"} market data`,
          )
        }
      }, 2500)

      setTimeout(() => {
        if (testConfig.useSimulation) {
          if (testConfig.dataSource === "real") {
            addLog("info", "Using real market data with simulation mode - NO ACTUAL ORDERS WILL BE SENT")
          } else {
            addLog("info", "Running in simulation mode with simulated data, no actual trades will be executed")
          }

          setTimeout(() => {
            addLog("info", "Simulating trade execution...")

            setTimeout(() => {
              const random = Math.random()
              if (random > 0.9) {
                addLog("error", "Simulation failed: Insufficient liquidity")
                setTestStatus("error")
              } else {
                addLog("success", "Simulation successful")
                addLog("info", "Estimated profit: 0.023 SOL ($1.57)")
                setTestStatus("success")
              }

              // Complete the test
              setProgress(100)
              setIsRunning(false)

              // Set test results
              setTestResults({
                executionTime: "4.32s",
                gasUsed: "0.000342 SOL",
                profitability: testStatus === "success" ? "1.2%" : "N/A",
                transactions: testStatus === "success" ? 2 : 0,
                status: testStatus,
                dataSource: testConfig.dataSource === "real" ? "Real market data" : "Simulated data",
              })
            }, 2000)
          }, 1000)
        } else {
          addLog("info", "Executing real trades...")

          setTimeout(() => {
            const random = Math.random()
            if (random > 0.7) {
              addLog("error", "Transaction failed: Slippage tolerance exceeded")
              setTestStatus("error")
            } else {
              addLog("success", "Trades executed successfully")
              addLog("info", "Profit: 0.018 SOL ($1.23)")
              addLog("info", "Transaction hash: 5KtPn1LGuxhFLF2c7tEcqRfZNHZ7xKKNsZznW9AKRd7vVrw...")
              setTestStatus("success")
            }

            // Complete the test
            setProgress(100)
            setIsRunning(false)

            // Set test results
            setTestResults({
              executionTime: "6.78s",
              gasUsed: "0.000512 SOL",
              profitability: testStatus === "success" ? "0.9%" : "N/A",
              transactions: testStatus === "success" ? 2 : 0,
              status: testStatus,
              dataSource: testConfig.dataSource === "real" ? "Real market data" : "Simulated data",
            })
          }, 3000)
        }
      }, 3000)
    }, 4000)
  }

  // Stop test
  const stopTest = () => {
    setIsRunning(false)
    addLog("warning", "Test execution stopped by user")
    setTestStatus("idle")
  }

  // Reset test
  const resetTest = () => {
    setLogs([])
    setTestResults(null)
    setTestStatus("idle")
    setProgress(0)
  }

  // Toggle section expansion
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

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
    <Card className={`bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm ${className}`}>
      <CardHeader className="border-b border-jupiter-charcoal pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-jupiter-cloud flex items-center font-syne">
            <Terminal className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
            Script Testing Environment
          </CardTitle>
          <div className="flex items-center space-x-2">
            {isRunning && (
              <Button onClick={stopTest} className="bg-red-500/80 hover:bg-red-600 text-white mr-2">
                <Pause className="h-4 w-4 mr-1" /> Emergency Stop
              </Button>
            )}
            <Badge
              variant="outline"
              className={`${
                testStatus === "idle"
                  ? "bg-jupiter-gunmetal text-jupiter-cloud"
                  : testStatus === "running"
                    ? "bg-jupiter-helix-cyan/20 text-jupiter-helix-cyan border-jupiter-helix-cyan/50"
                    : testStatus === "success"
                      ? "bg-jupiter-cosmic-lime/20 text-jupiter-cosmic-lime border-jupiter-cosmic-lime/50"
                      : testStatus === "warning"
                        ? "bg-amber-500/20 text-amber-400 border-amber-500/50"
                        : "bg-red-500/20 text-red-400 border-red-500/50"
              } text-xs`}
            >
              <div
                className={`h-1.5 w-1.5 rounded-full mr-1 ${
                  testStatus === "idle"
                    ? "bg-jupiter-steel"
                    : testStatus === "running"
                      ? "bg-jupiter-helix-cyan animate-pulse"
                      : testStatus === "success"
                        ? "bg-jupiter-cosmic-lime"
                        : testStatus === "warning"
                          ? "bg-amber-400"
                          : "bg-red-500"
                }`}
              ></div>
              {testStatus === "idle"
                ? "READY"
                : testStatus === "running"
                  ? "RUNNING"
                  : testStatus === "success"
                    ? "SUCCESS"
                    : testStatus === "warning"
                      ? "WARNING"
                      : "ERROR"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Script Selection */}
          <div className="lg:col-span-2">
            <Label htmlFor="script-select" className="text-jupiter-cloud mb-1 block">
              Select Script to Test
            </Label>
            <Select value={selectedScript} onValueChange={setSelectedScript}>
              <SelectTrigger className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                <SelectValue placeholder="Select a script" />
              </SelectTrigger>
              <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                {availableScripts.map((script) => (
                  <SelectItem key={script} value={script}>
                    {script}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Environment Selection */}
          <div>
            <Label htmlFor="environment-select" className="text-jupiter-cloud mb-1 block">
              Test Environment
            </Label>
            <Select
              value={testConfig.environment}
              onValueChange={(value) => setTestConfig({ ...testConfig, environment: value })}
            >
              <SelectTrigger className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                <SelectValue placeholder="Select environment" />
              </SelectTrigger>
              <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                <SelectItem value="mainnet">Mainnet</SelectItem>
                <SelectItem value="testnet">Testnet</SelectItem>
                <SelectItem value="devnet">Devnet</SelectItem>
                <SelectItem value="localnet">Localnet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left Column - Configuration */}
          <div className="space-y-4">
            {/* Environment Variables */}
            <div
              className={`bg-jupiter-charcoal/30 rounded-md border border-jupiter-charcoal p-3 ${expandedSection === "env-vars" ? "mb-4" : ""}`}
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("env-vars")}
              >
                <div className="flex items-center text-jupiter-cloud font-medium">
                  <Database className="h-4 w-4 mr-2 text-jupiter-nebula-blue" />
                  Environment Variables
                </div>
                <div>
                  {expandedSection === "env-vars" ? (
                    <ChevronUp className="h-4 w-4 text-jupiter-steel" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-jupiter-steel" />
                  )}
                </div>
              </div>

              {expandedSection === "env-vars" && (
                <div className="mt-3 space-y-3">
                  {envVars.map((envVar, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Input
                          value={envVar.key}
                          onChange={(e) => updateEnvVar(index, e.target.value, envVar.value)}
                          className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud mr-2 flex-1"
                          placeholder="Variable name"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-jupiter-steel hover:text-red-400 hover:bg-jupiter-charcoal"
                          onClick={() => removeEnvVar(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center">
                        <div className="relative flex-1">
                          <Input
                            type={envVar.isVisible ? "text" : "password"}
                            value={envVar.value}
                            onChange={(e) => updateEnvVar(index, envVar.key, e.target.value)}
                            className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud pr-8"
                            placeholder="Variable value"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-transparent"
                            onClick={() => toggleEnvVarVisibility(index)}
                          >
                            {envVar.isVisible ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                          </Button>
                        </div>
                        <div className="ml-2 flex items-center">
                          <Switch
                            checked={envVar.isSecret}
                            onCheckedChange={(checked) => {
                              const newEnvVars = [...envVars]
                              newEnvVars[index].isSecret = checked
                              setEnvVars(newEnvVars)
                            }}
                            className="data-[state=checked]:bg-jupiter-trifid-teal"
                          />
                          <span className="ml-2 text-xs text-jupiter-steel">Secret</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite hover:text-jupiter-nebula-blue"
                    onClick={addEnvVar}
                  >
                    Add Variable
                  </Button>
                </div>
              )}
            </div>

            {/* Connections */}
            <div
              className={`bg-jupiter-charcoal/30 rounded-md border border-jupiter-charcoal p-3 ${expandedSection === "connections" ? "mb-4" : ""}`}
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("connections")}
              >
                <div className="flex items-center text-jupiter-cloud font-medium">
                  <Server className="h-4 w-4 mr-2 text-jupiter-nebula-blue" />
                  Connections
                </div>
                <div>
                  {expandedSection === "connections" ? (
                    <ChevronUp className="h-4 w-4 text-jupiter-steel" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-jupiter-steel" />
                  )}
                </div>
              </div>

              {expandedSection === "connections" && (
                <div className="mt-3 space-y-2">
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
              )}
            </div>

            {/* Test Configuration */}
            <div
              className={`bg-jupiter-charcoal/30 rounded-md border border-jupiter-charcoal p-3 ${expandedSection === "test-config" ? "mb-4" : ""}`}
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleSection("test-config")}
              >
                <div className="flex items-center text-jupiter-cloud font-medium">
                  <Settings className="h-4 w-4 mr-2 text-jupiter-nebula-blue" />
                  Test Configuration
                </div>
                <div>
                  {expandedSection === "test-config" ? (
                    <ChevronUp className="h-4 w-4 text-jupiter-steel" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-jupiter-steel" />
                  )}
                </div>
              </div>

              {expandedSection === "test-config" && (
                <div className="mt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-jupiter-cloud">Simulation Mode</span>
                    <Switch
                      checked={testConfig.useSimulation}
                      onCheckedChange={(checked) => setTestConfig({ ...testConfig, useSimulation: checked })}
                      className="data-[state=checked]:bg-jupiter-trifid-teal"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-jupiter-cloud">Data Source</span>
                    <Select
                      value={testConfig.dataSource}
                      onValueChange={(value) => setTestConfig({ ...testConfig, dataSource: value })}
                    >
                      <SelectTrigger className="w-32 bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud h-8">
                        <SelectValue placeholder="Select data source" />
                      </SelectTrigger>
                      <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                        <SelectItem value="real">Real Market</SelectItem>
                        <SelectItem value="simulated">Simulated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="max-gas" className="text-xs text-jupiter-steel mb-1 block">
                      Max Gas Fee (SOL)
                    </Label>
                    <Input
                      id="max-gas"
                      type="number"
                      value={testConfig.maxGasFee}
                      onChange={(e) => setTestConfig({ ...testConfig, maxGasFee: Number.parseFloat(e.target.value) })}
                      className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud h-8"
                    />
                  </div>

                  <div>
                    <Label htmlFor="timeout" className="text-xs text-jupiter-steel mb-1 block">
                      Timeout (seconds)
                    </Label>
                    <Input
                      id="timeout"
                      type="number"
                      value={testConfig.timeout}
                      onChange={(e) => setTestConfig({ ...testConfig, timeout: Number.parseInt(e.target.value) })}
                      className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud h-8"
                    />
                  </div>

                  <div>
                    <Label htmlFor="retry-count" className="text-xs text-jupiter-steel mb-1 block">
                      Retry Count
                    </Label>
                    <Input
                      id="retry-count"
                      type="number"
                      value={testConfig.retryCount}
                      onChange={(e) => setTestConfig({ ...testConfig, retryCount: Number.parseInt(e.target.value) })}
                      className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud h-8"
                    />
                  </div>

                  <div>
                    <Label htmlFor="log-level" className="text-xs text-jupiter-steel mb-1 block">
                      Log Level
                    </Label>
                    <Select
                      value={testConfig.logLevel}
                      onValueChange={(value) => setTestConfig({ ...testConfig, logLevel: value })}
                    >
                      <SelectTrigger
                        id="log-level"
                        className="bg-jupiter-space-black border-jupiter-gunmetal text-jupiter-cloud h-8"
                      >
                        <SelectValue placeholder="Select log level" />
                      </SelectTrigger>
                      <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Middle Column - Script Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="script" className="w-full">
              <TabsList className="bg-jupiter-charcoal p-1 mb-4">
                <TabsTrigger
                  value="script"
                  className="data-[state=active]:bg-jupiter-gunmetal data-[state=active]:text-jupiter-nebula-blue text-jupiter-cloud hover:bg-jupiter-meteorite"
                >
                  Script
                </TabsTrigger>
                <TabsTrigger
                  value="logs"
                  className="data-[state=active]:bg-jupiter-gunmetal data-[state=active]:text-jupiter-nebula-blue text-jupiter-cloud hover:bg-jupiter-meteorite"
                >
                  Execution Logs
                </TabsTrigger>
                <TabsTrigger
                  value="results"
                  className="data-[state=active]:bg-jupiter-gunmetal data-[state=active]:text-jupiter-nebula-blue text-jupiter-cloud hover:bg-jupiter-meteorite"
                >
                  Test Results
                </TabsTrigger>
              </TabsList>

              <TabsContent value="script" className="mt-0">
                <Textarea
                  value={scriptContent}
                  onChange={(e) => setScriptContent(e.target.value)}
                  className="font-mono text-sm h-[400px] bg-jupiter-space-black border-jupiter-charcoal text-jupiter-cloud"
                />
              </TabsContent>

              <TabsContent value="logs" className="mt-0">
                <div className="font-mono text-sm h-[400px] bg-jupiter-space-black border border-jupiter-charcoal rounded-md p-4 overflow-auto">
                  {logs.length === 0 ? (
                    <div className="text-jupiter-steel italic">No logs yet. Run the test to see execution logs.</div>
                  ) : (
                    logs.map((log, index) => (
                      <div
                        key={index}
                        className={`mb-1 ${
                          log.level === "error"
                            ? "text-red-400"
                            : log.level === "warning"
                              ? "text-amber-400"
                              : log.level === "success"
                                ? "text-jupiter-cosmic-lime"
                                : "text-jupiter-cloud"
                        }`}
                      >
                        [{log.timestamp}] {log.message}
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="results" className="mt-0">
                <div className="h-[400px] bg-jupiter-space-black border border-jupiter-charcoal rounded-md p-4 overflow-auto">
                  {!testResults ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <Terminal className="h-12 w-12 text-jupiter-steel mb-4" />
                      <p className="text-jupiter-steel text-center">
                        No test results available. Run a test to see results here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-center">
                        <div
                          className={`h-20 w-20 rounded-full flex items-center justify-center ${
                            testResults.status === "success"
                              ? "bg-jupiter-cosmic-lime/20 text-jupiter-cosmic-lime"
                              : testResults.status === "warning"
                                ? "bg-amber-500/20 text-amber-400"
                                : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {testResults.status === "success" ? (
                            <Check className="h-10 w-10" />
                          ) : testResults.status === "warning" ? (
                            <AlertTriangle className="h-10 w-10" />
                          ) : (
                            <X className="h-10 w-10" />
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-jupiter-charcoal/30 p-3 rounded-md border border-jupiter-gunmetal">
                          <div className="text-xs text-jupiter-steel mb-1">Execution Time</div>
                          <div className="text-lg font-mono text-jupiter-cloud">{testResults.executionTime}</div>
                        </div>
                        <div className="bg-jupiter-charcoal/30 p-3 rounded-md border border-jupiter-gunmetal">
                          <div className="text-xs text-jupiter-steel mb-1">Gas Used</div>
                          <div className="text-lg font-mono text-jupiter-cloud">{testResults.gasUsed}</div>
                        </div>
                        <div className="bg-jupiter-charcoal/30 p-3 rounded-md border border-jupiter-gunmetal">
                          <div className="text-xs text-jupiter-steel mb-1">Profitability</div>
                          <div className="text-lg font-mono text-jupiter-trifid-teal">{testResults.profitability}</div>
                        </div>
                        <div className="bg-jupiter-charcoal/30 p-3 rounded-md border border-jupiter-gunmetal">
                          <div className="text-xs text-jupiter-steel mb-1">Transactions</div>
                          <div className="text-lg font-mono text-jupiter-cloud">{testResults.transactions}</div>
                        </div>
                      </div>

                      <div className="bg-jupiter-charcoal/30 p-3 rounded-md border border-jupiter-gunmetal">
                        <div className="text-xs text-jupiter-steel mb-1">Test Summary</div>
                        <div className="text-sm text-jupiter-cloud">
                          {testResults.status === "success" ? (
                            <p>
                              The test completed successfully. The script executed as expected and found a profitable
                              arbitrage opportunity. All transactions were simulated correctly with no errors.
                            </p>
                          ) : testResults.status === "warning" ? (
                            <p>
                              The test completed with warnings. The script executed but the arbitrage opportunity was
                              below the threshold. Consider adjusting parameters for better results.
                            </p>
                          ) : (
                            <p>
                              The test failed. The script encountered errors during execution. Check the logs for more
                              details on what went wrong.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="bg-jupiter-charcoal/30 p-3 rounded-md border border-jupiter-gunmetal">
                        <div className="text-xs text-jupiter-steel mb-1">Data Source</div>
                        <div className="text-lg font-mono text-jupiter-cloud">{testResults.dataSource}</div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Progress bar for test execution */}
            {isRunning && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-jupiter-cloud">Test Execution Progress</div>
                  <div className="text-sm text-jupiter-nebula-blue">{progress}%</div>
                </div>
                <Progress value={progress} className="h-2 bg-jupiter-charcoal">
                  <div className="h-full bg-gradient-jupiter-2 rounded-full" style={{ width: `${progress}%` }} />
                </Progress>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(scriptContent)
                  }}
                  className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite hover:text-jupiter-nebula-blue hover:border-jupiter-nebula-blue/50"
                >
                  <Copy className="h-4 w-4 mr-1" /> Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
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
                <Button
                  onClick={stopTest}
                  disabled={!isRunning}
                  className={`${isRunning ? "bg-red-500/80 hover:bg-red-600" : "bg-red-500/30 cursor-not-allowed"} text-white`}
                >
                  <Pause className="h-4 w-4 mr-1" /> Stop
                </Button>
                {testStatus !== "idle" && (
                  <Button
                    variant="outline"
                    onClick={resetTest}
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" /> Reset
                  </Button>
                )}
                <Button
                  onClick={runTest}
                  disabled={isRunning}
                  className={`${isRunning ? "bg-gradient-jupiter-2/50 cursor-not-allowed" : "bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3"} text-jupiter-space-black font-medium`}
                >
                  <Play className="h-4 w-4 mr-1" /> Run Test
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
