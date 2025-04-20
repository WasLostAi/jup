"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, FileCode, FolderOpen } from "lucide-react"
import ScriptEditorAndTester from "../../script-editor-and-tester"
import { Badge } from "@/components/ui/badge"

import { Textarea } from "@/components/ui/textarea"
import DashboardLayout from "../dashboard-layout"
import { PageTemplate } from "../components/page-template"

// Mock data for strategy templates
const strategyTemplates = [
  {
    id: "template-1",
    name: "Arbitrage Strategy",
    description: "Exploit price differences between exchanges",
    complexity: "medium",
    category: "arbitrage",
    prompt:
      "Create an arbitrage trading strategy that monitors price differences between Uniswap and Sushiswap for ETH/USDT pair. Execute trades when the price difference exceeds 0.5% after accounting for gas fees and slippage. Include risk management with maximum position size and stop-loss mechanisms.",
  },
  {
    id: "template-2",
    name: "Momentum Trading",
    description: "Follow market trends with technical indicators",
    complexity: "medium",
    category: "trend",
    prompt:
      "Develop a momentum trading strategy using the RSI and MACD indicators for ETH. Enter long positions when RSI crosses above 40 and MACD shows a bullish crossover. Exit positions when RSI exceeds 70 or drops below 30. Include position sizing based on volatility and implement trailing stop-loss.",
  },
  {
    id: "template-3",
    name: "Grid Trading Bot",
    description: "Place buy and sell orders at regular intervals",
    complexity: "easy",
    category: "range",
    prompt:
      "Create a grid trading bot for BTC that places buy and sell orders at 1% price intervals within a defined range. Automatically adjust the grid range based on recent volatility. Include parameters for grid size, order quantity, and range boundaries. Implement a mechanism to rebalance the grid when price moves outside the defined range.",
  },
  {
    id: "template-4",
    name: "Liquidity Provision Strategy",
    description: "Provide liquidity to DEX pools and manage impermanent loss",
    complexity: "hard",
    category: "yield",
    prompt:
      "Design a liquidity provision strategy for Uniswap V3 that optimizes fee collection while minimizing impermanent loss. Dynamically adjust position range based on historical volatility. Include mechanisms to rebalance positions when price approaches range boundaries. Implement IL hedging through options or other derivatives when available.",
  },
  {
    id: "template-5",
    name: "Volatility Breakout",
    description: "Capitalize on price breakouts after periods of low volatility",
    complexity: "medium",
    category: "volatility",
    prompt:
      "Create a volatility breakout strategy that identifies periods of low volatility using Bollinger Band Width or ATR. Enter positions in the direction of the breakout when volatility expands. Use volume confirmation for entry signals. Implement dynamic take-profit targets based on recent volatility and time-based exit if no significant movement occurs after entry.",
  },
  {
    id: "template-6",
    name: "Mean Reversion",
    description: "Trade on the assumption that prices will revert to the mean",
    complexity: "hard",
    category: "mean-reversion",
    prompt:
      "Develop a mean reversion strategy that identifies overbought and oversold conditions using statistical measures like z-score or deviation from moving averages. Enter counter-trend positions when assets are significantly overextended. Include adaptive parameters that adjust based on market regime detection. Implement strict risk management with position sizing proportional to deviation magnitude.",
  },
]

// Mock data for saved strategies
const savedStrategies = [
  {
    id: "strategy-1",
    name: "ETH-BTC Correlation Arbitrage",
    description: "Exploits temporary decorrelation between ETH and BTC",
    category: "arbitrage",
    created: Date.now() - 604800000, // 7 days ago
    modified: Date.now() - 86400000, // 1 day ago
    favorite: true,
    prompt:
      "Create a strategy that monitors the correlation between ETH and BTC. When the correlation significantly deviates from the historical average, enter positions expecting reversion to the normal correlation. Include risk parameters and exit conditions.",
    code: `// ETH-BTC Correlation Arbitrage Strategy
const LOOKBACK_PERIOD = 30; // days
const DEVIATION_THRESHOLD = 2; // standard deviations
const POSITION_SIZE = 0.1; // 10% of available capital
const STOP_LOSS = 0.05; // 5%
const TAKE_PROFIT = 0.1; // 10%

async function calculateCorrelation(asset1, asset2, period) {
  const prices1 = await fetchHistoricalPrices(asset1, period);
  const prices2 = await fetchHistoricalPrices(asset2, period);
  
  // Calculate returns
  const returns1 = calculateReturns(prices1);
  const returns2 = calculateReturns(prices2);
  
  // Calculate correlation
  return pearsonCorrelation(returns1, returns2);
}

async function checkForOpportunity() {
  // Get historical correlation
  const historicalCorrelations = await getHistoricalCorrelations("ETH", "BTC", LOOKBACK_PERIOD);
  
  // Calculate mean and standard deviation
  const mean = calculateMean(historicalCorrelations);
  const stdDev = calculateStandardDeviation(historicalCorrelations);
  
  // Get current correlation
  const currentCorrelation = await calculateCorrelation("ETH", "BTC", 1);
  
  // Calculate z-score
  const zScore = (currentCorrelation - mean) / stdDev;
  
  if (Math.abs(zScore) > DEVIATION_THRESHOLD) {
    // Correlation has deviated significantly
    if (zScore > 0) {
      // Correlation is higher than normal, expect it to decrease
      // Short ETH, Long BTC
      return {
        action: "OPEN_POSITION",
        direction: "DECORRELATION",
        positionSize: POSITION_SIZE,
        stopLoss: STOP_LOSS,
        takeProfit: TAKE_PROFIT
      };
    } else {
      // Correlation is lower than normal, expect it to increase
      // Long ETH, Short BTC
      return {
        action: "OPEN_POSITION",
        direction: "CORRELATION",
        positionSize: POSITION_SIZE,
        stopLoss: STOP_LOSS,
        takeProfit: TAKE_PROFIT
      };
    }
  }
  
  return { action: "WAIT" };
}

// Main execution loop
async function executeStrategy() {
  const opportunity = await checkForOpportunity();
  
  if (opportunity.action === "OPEN_POSITION") {
    if (opportunity.direction === "DECORRELATION") {
      await openPosition("ETH", "SHORT", opportunity.positionSize);
      await openPosition("BTC", "LONG", opportunity.positionSize);
    } else {
      await openPosition("ETH", "LONG", opportunity.positionSize);
      await openPosition("BTC", "SHORT", opportunity.positionSize);
    }
    
    // Set stop loss and take profit
    await setStopLoss(opportunity.stopLoss);
    await setTakeProfit(opportunity.takeProfit);
    
    // Log the trade
    logTrade(opportunity);
  }
}

// Run strategy every hour
setInterval(executeStrategy, 60 * 60 * 1000);`,
  },
  {
    id: "strategy-2",
    name: "Volatility Expansion Breakout",
    description: "Enters positions when volatility expands after contraction",
    category: "volatility",
    created: Date.now() - 1209600000, // 14 days ago
    modified: Date.now() - 432000000, // 5 days ago
    favorite: false,
    prompt:
      "Create a strategy that identifies periods of low volatility using Bollinger Bands. When volatility expands (bands widen) and price breaks out of the bands, enter a position in the direction of the breakout. Include risk management and exit conditions.",
    code: `// Volatility Expansion Breakout Strategy
const SYMBOL = "ETH/USDT";
const TIMEFRAME = "1h";
const BB_PERIOD = 20;
const BB_STDDEV = 2;
const VOLUME_THRESHOLD = 1.5; // Volume must be 1.5x average
const POSITION_SIZE = 0.1; // 10% of available capital
const STOP_LOSS = 0.03; // 3%
const TAKE_PROFIT = 0.06; // 6%
const MAX_HOLDING_PERIODS = 48; // Exit after 48 periods if neither TP nor SL hit

async function calculateBollingerBands(symbol, timeframe, period, stdDev) {
  const candles = await fetchCandles(symbol, timeframe, period + 10);
  const closes = candles.map(candle => candle.close);
  
  const sma = calculateSMA(closes, period);
  const stdDevValue = calculateStdDev(closes, period, sma);
  
  const upperBand = sma + (stdDevValue * stdDev);
  const lowerBand = sma - (stdDevValue * stdDev);
  const bandwidth = (upperBand - lowerBand) / sma;
  
  return {
    sma,
    upperBand,
    lowerBand,
    bandwidth
  };
}

async function calculateVolume(symbol, timeframe, period) {
  const candles = await fetchCandles(symbol, timeframe, period + 10);
  const volumes = candles.map(candle => candle.volume);
  
  const avgVolume = calculateAverage(volumes.slice(0, period));
  const currentVolume = volumes[volumes.length - 1];
  
  return {
    avgVolume,
    currentVolume,
    volumeRatio: currentVolume / avgVolume
  };
}

async function checkForOpportunity() {
  // Get current and previous Bollinger Bands
  const currentBB = await calculateBollingerBands(SYMBOL, TIMEFRAME, BB_PERIOD, BB_STDDEV);
  const previousBB = await calculateBollingerBands(SYMBOL, TIMEFRAME, BB_PERIOD, BB_STDDEV, 1);
  
  // Check if bandwidth is expanding
  const isBandwidthExpanding = currentBB.bandwidth > previousBB.bandwidth;
  
  // Get current price
  const currentPrice = await getCurrentPrice(SYMBOL);
  
  // Check volume
  const volume = await calculateVolume(SYMBOL, TIMEFRAME, BB_PERIOD);
  const isVolumeHigh = volume.volumeRatio > VOLUME_THRESHOLD;
  
  // Check for breakouts
  const isUpperBreakout = currentPrice > currentBB.upperBand;
  const isLowerBreakout = currentPrice < currentBB.lowerBand;
  
  if (isBandwidthExpanding && isVolumeHigh) {
    if (isUpperBreakout) {
      return {
        action: "OPEN_POSITION",
        direction: "LONG",
        price: currentPrice,
        stopLoss: currentPrice * (1 - STOP_LOSS),
        takeProfit: currentPrice * (1 + TAKE_PROFIT),
        maxHoldingPeriods: MAX_HOLDING_PERIODS
      };
    } else if (isLowerBreakout) {
      return {
        action: "OPEN_POSITION",
        direction: "SHORT",
        price: currentPrice,
        stopLoss: currentPrice * (1 + STOP_LOSS),
        takeProfit: currentPrice * (1 - TAKE_PROFIT),
        maxHoldingPeriods: MAX_HOLDING_PERIODS
      };
    }
  }
  
  return { action: "WAIT" };
}

// Main execution loop
async function executeStrategy() {
  // Check if we already have an open position
  const openPosition = await getOpenPosition(SYMBOL);
  
  if (openPosition) {
    // Check if we need to exit based on time
    if (openPosition.periods >= openPosition.maxHoldingPeriods) {
      await closePosition(SYMBOL);
      logTrade("TIME_EXIT", openPosition);
      return;
    }
    
    // Update position periods
    await updatePositionPeriods(SYMBOL);
  } else {
    // Look for new opportunities
    const opportunity = await checkForOpportunity();
    
    if (opportunity.action === "OPEN_POSITION") {
      await openPosition(
        SYMBOL, 
        opportunity.direction, 
        POSITION_SIZE,
        opportunity.stopLoss,
        opportunity.takeProfit,
        opportunity.maxHoldingPeriods
      );
      
      logTrade("ENTRY", opportunity);
    }
  }
}

// Run strategy every hour
setInterval(executeStrategy, 60 * 60 * 1000);`,
  },
]

// Mock data for AI models
const aiModels = [
  { id: "gpt-4o", name: "GPT-4o", description: "Most advanced model with trading expertise", speed: "fast" },
  { id: "claude-3", name: "Claude 3", description: "Specialized in code generation and explanation", speed: "medium" },
  { id: "gemini-pro", name: "Gemini Pro", description: "Balanced performance for strategy development", speed: "fast" },
  { id: "llama-3", name: "Llama 3", description: "Open source model with trading capabilities", speed: "medium" },
]

// New mock data for market insights
const marketInsights = [
  {
    id: "insight-1",
    title: "BTC Volatility Decreasing",
    description: "Bitcoin's 30-day volatility has dropped to 2.3%, suggesting a potential breakout soon.",
    source: "On-chain Analysis",
    timestamp: Date.now() - 3600000, // 1 hour ago
    sentiment: "neutral",
  },
  {
    id: "insight-2",
    title: "ETH Options Open Interest Rising",
    description:
      "Ethereum options open interest has increased by 15% in the past 24 hours, indicating growing market interest.",
    source: "Options Data",
    timestamp: Date.now() - 7200000, // 2 hours ago
    sentiment: "bullish",
  },
  {
    id: "insight-3",
    title: "SOL Funding Rate Negative",
    description:
      "Solana perpetual futures funding rate has turned negative, suggesting potential short-term bearish sentiment.",
    source: "Futures Data",
    timestamp: Date.now() - 10800000, // 3 hours ago
    sentiment: "bearish",
  },
]

export default function TradingScriptsPage() {
  // State for script selection
  const [selectedScript, setSelectedScript] = useState("PERPS With TSL")
  const [availableScripts, setAvailableScripts] = useState([
    "Jupiter Arbitrage",
    "SOL/USDC Grid Bot",
    "ETH/USDC TWAP",
    "BTC/USDC Momentum",
    "PERPS With TSL",
  ])

  // State for logs
  const [logs, setLogs] = useState<{ level: string; message: string; timestamp: string }[]>([])
  const logsContainerRef = useRef<HTMLDivElement>(null)

  // State for script status
  const [scriptStatus, setScriptStatus] = useState<"idle" | "running" | "success" | "warning" | "error">("idle")

  // State for console/toolkit view
  const [activeView, setActiveView] = useState<"console" | "toolkit">("console")

  // State for section expansion
  const [expandedSections, setExpandedSections] = useState({
    scriptLibrary: true,
    console: true,
    toolkit: true,
  })

  // Toggle section expansion
  const toggleSectionExpansion = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Add log entry
  const addLog = (level: string, message: string) => {
    const now = new Date()
    const timestamp = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(
        2,
        "0",
      )}:${now.getSeconds().toString().padStart(2, "0")}.${now.getMilliseconds().toString().padStart(3, "0")}`

    setLogs((prevLogs) => [...prevLogs, { level, message, timestamp }])

    // Scroll to bottom of logs
    setTimeout(() => {
      if (logsContainerRef.current) {
        logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight
      }
    }, 100)
  }

  // Create new script
  const createNewScript = (name: string, content: string) => {
    setAvailableScripts((prev) => [...prev, name])
    setSelectedScript(name)
    addLog("success", `Created new script: ${name}`)
  }

  // Rename script
  const renameScript = (oldName: string, newName: string) => {
    setAvailableScripts((prev) => prev.map((name) => (name === oldName ? newName : name)))
    setSelectedScript(newName)
  }

  // Handle script change
  const handleScriptChange = (script: string) => {
    // In a real app, this would save the script content to a database
    addLog("info", `Script content updated`)
  }

  // Fetch Pyth price
  const [pythPrice, setPythPrice] = useState<number | null>(null)
  const [pythLoading, setPythLoading] = useState(false)

  const fetchPythPrice = async () => {
    setPythLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const price = 99.75 + Math.random() * 2 - 1 // Random price around $99.75
      setPythPrice(price)
      addLog("info", `Fetched Pyth price: $${price.toFixed(2)}`)
    } catch (error) {
      addLog("error", "Failed to fetch Pyth price")
    } finally {
      setPythLoading(false)
    }
  }

  // Initialize with some logs
  useEffect(() => {
    addLog("info", "Trading Scripts environment initialized")
    addLog("info", "Connected to Jupiter API")
    addLog("info", "Ready to execute trading scripts")

    // Fetch initial Pyth price
    fetchPythPrice()
  }, [])

  // Render log entry with appropriate styling
  const renderLogEntry = (log: { level: string; message: string; timestamp: string }) => {
    let textColor = "text-jupiter-cloud"
    if (log.level === "error") textColor = "text-red-400"
    else if (log.level === "warning") textColor = "text-amber-400"
    else if (log.level === "success") textColor = "text-jupiter-cosmic-lime"

    return (
      <div className={`font-mono text-xs ${textColor}`}>
        <span className="text-jupiter-steel">{log.timestamp}</span> {log.message}
      </div>
    )
  }

  const [scripts, setScripts] = useState([
    { id: 0, name: "PERPS With TSL", lastModified: "Just now", status: "active", category: "perpetuals" },
    { id: 1, name: "SOL/USDC Arbitrage", lastModified: "2 hours ago", status: "active", category: "arbitrage" },
    { id: 2, name: "JUP Token Accumulator", lastModified: "1 day ago", status: "inactive", category: "accumulation" },
    { id: 3, name: "Market Volatility Trader", lastModified: "3 days ago", status: "active", category: "volatility" },
    { id: 4, name: "Limit Order Bot", lastModified: "5 days ago", status: "active", category: "orders" },
    { id: 5, name: "DCA Strategy", lastModified: "1 week ago", status: "inactive", category: "strategy" },
  ])

  const [testStatus, setTestStatus] = useState<"idle" | "running" | "success" | "warning" | "error">("idle")
  const [searchQuery, setSearchQuery] = useState("")

  // Strategy creator state
  const [activeTab, setActiveTab] = useState("scripts")
  const [strategyActiveTab, setStrategyActiveTab] = useState("editor")
  const [prompt, setPrompt] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState(aiModels[0].id)
  const [riskLevel, setRiskLevel] = useState(50)
  const [creativity, setCreativity] = useState(70)
  const [isStrategyGenerating, setIsStrategyGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generatedCode, setGeneratedCode] = useState("")
  const [generatedExplanation, setGeneratedExplanation] = useState("")

  // State for strategy library
  const [strategies, setStrategies] = useState(savedStrategies)
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null)
  const [strategySearchQuery, setStrategySearchQuery] = useState("")
  const [strategyName, setStrategyName] = useState("")
  const [strategyDescription, setStrategyDescription] = useState("")
  const [strategyCategory, setStrategyCategory] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  // State for template browser
  const [showTemplates, setShowTemplates] = useState(false)
  const [templateFilter, setTemplateFilter] = useState("all")
  const [templateSearch, setTemplateSearch] = useState("")
  const [filteredTemplates, setFilteredTemplates] = useState(strategyTemplates)

  // State for AI assistant
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([
    {
      role: "system",
      content: "Welcome to the Trading Strategy Assistant. How can I help you develop your trading strategy today?",
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isSendingMessage, setIsSendingMessage] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  // State for notes
  const [notes, setNotes] = useState<string[]>([])
  const [noteInput, setNoteInput] = useState("")

  // State for test results
  const [testResults, setTestResults] = useState<any>(null)

  // State for market insights
  const [insights, setInsights] = useState(marketInsights)
  const [showInsights, setShowInsights] = useState(true)

  // Function to organize scripts by category
  const organizeScriptsByCategory = () => {
    const categories: Record<string, typeof scripts> = {}

    // Filter scripts based on search query
    const filteredScripts = scripts.filter(
      (script) => searchQuery === "" || script.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    filteredScripts.forEach((script) => {
      if (!categories[script.category]) {
        categories[script.category] = []
      }
      categories[script.category].push(script)
    })

    return categories
  }

  // Filter templates based on search and category
  useEffect(() => {
    let filtered = strategyTemplates

    if (templateSearch) {
      const search = templateSearch.toLowerCase()
      filtered = filtered.filter(
        (template) =>
          template.name.toLowerCase().includes(search) || template.description.toLowerCase().includes(search),
      )
    }

    if (templateFilter !== "all") {
      filtered = filtered.filter(
        (template) => template.category === templateFilter || template.complexity === templateFilter,
      )
    }

    setFilteredTemplates(filtered)
  }, [templateSearch, templateFilter])

  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatMessages])

  // Format complexity badge
  const getComplexityBadge = (complexity: string) => {
    switch (complexity) {
      case "easy":
        return (
          <Badge className="bg-jupiter-trifid-teal/20 text-jupiter-trifid-teal border-jupiter-trifid-teal/50">
            Easy
          </Badge>
        )
      case "medium":
        return (
          <Badge className="bg-jupiter-nebula-blue/20 text-jupiter-nebula-blue border-jupiter-nebula-blue/50">
            Medium
          </Badge>
        )
      case "hard":
        return <Badge className="bg-red-400/20 text-red-400 border-red-400/50">Hard</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  // Format sentiment badge
  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return (
          <Badge className="bg-jupiter-cosmic-lime/20 text-jupiter-cosmic-lime border-jupiter-cosmic-lime/50">
            Bullish
          </Badge>
        )
      case "bearish":
        return <Badge className="bg-red-400/20 text-red-400 border-red-400/50">Bearish</Badge>
      case "neutral":
        return <Badge className="bg-jupiter-steel/20 text-jupiter-steel border-jupiter-steel/50">Neutral</Badge>
      default:
        return <Badge>Unknown</Badge>
    }
  }

  const scriptCategories = organizeScriptsByCategory()

  return (
    <DashboardLayout>
      <PageTemplate
        description="Develop, test, and deploy automated trading strategies"
        actions={
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="bg-jupiter-charcoal h-8">
              <TabsTrigger value="scripts" className="px-3 py-1 text-xs h-6">
                Scripts
              </TabsTrigger>
              <TabsTrigger value="strategies" className="px-3 py-1 text-xs h-6">
                Strategy Creator
              </TabsTrigger>
            </TabsList>
          </Tabs>
        }
      >
        <div className="grid grid-cols-12 gap-6">
          {activeTab === "scripts" && (
            <>
              {/* Main Content - Unified Script Editor and Tester */}
              <div className="col-span-12 lg:col-span-9">
                <ScriptEditorAndTester
                  selectedScript={selectedScript}
                  onScriptChange={handleScriptChange}
                  onAddLog={addLog}
                  onStatusChange={setTestStatus}
                  onCreateNewScript={createNewScript}
                  onRenameScript={renameScript}
                />
              </div>

              {/* Right Sidebar - Script Library */}
              <div className="col-span-12 lg:col-span-3">
                <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
                  <CardHeader className="pb-2 border-b border-jupiter-charcoal">
                    <CardTitle className="flex items-center text-base font-syne" style={{ color: "#E8F9FF" }}>
                      <FolderOpen className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                      Script Library
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="relative mb-4">
                        <Input
                          placeholder="Search scripts..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="bg-jupiter-charcoal border-jupiter-gunmetal pl-8"
                          style={{ color: "#E8F9FF" }}
                        />
                        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-jupiter-steel">
                          <Search className="h-4 w-4" />
                        </div>
                      </div>

                      {/* Organized by Category */}
                      <div className="space-y-4">
                        {Object.entries(scriptCategories).map(([category, categoryScripts]) => (
                          <div key={category} className="space-y-2">
                            <div className="text-xs text-jupiter-steel uppercase font-semibold">{category}</div>
                            {categoryScripts.map((script) => (
                              <div
                                key={script.id}
                                className={`flex items-center justify-between p-2 rounded-md hover:bg-jupiter-charcoal cursor-pointer border border-transparent hover:border-jupiter-gunmetal ${selectedScript === script.name ? "bg-jupiter-charcoal/50 border-jupiter-gunmetal" : ""}`}
                                onClick={() => setSelectedScript(script.name)}
                              >
                                <div className="flex items-center">
                                  <FileCode className="h-4 w-4 text-jupiter-nebula-blue mr-2" />
                                  <div>
                                    <div className="text-sm" style={{ color: "#E8F9FF" }}>
                                      {script.name}
                                    </div>
                                    <div className="text-xs text-jupiter-steel">Modified {script.lastModified}</div>
                                  </div>
                                </div>
                                <Badge
                                  variant="outline"
                                  className={`${
                                    script.status === "active"
                                      ? "bg-jupiter-trifid-teal/20 text-jupiter-trifid-teal border-jupiter-trifid-teal/50"
                                      : "bg-jupiter-gunmetal text-jupiter-steel border-jupiter-steel/50"
                                  } text-xs`}
                                >
                                  {script.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeTab === "strategies" && (
            <>
              {/* Main Content - Strategy Development */}
              <div className="col-span-12 lg:col-span-9">
                <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
                  <CardHeader className="pb-2 border-b border-jupiter-charcoal">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-syne" style={{ color: "#E8F9FF" }}>
                        Strategy Development
                      </CardTitle>
                      <Tabs value={strategyActiveTab} onValueChange={setStrategyActiveTab} className="w-auto">
                        <TabsList className="bg-jupiter-charcoal h-8">
                          <TabsTrigger value="editor" className="px-3 py-1 text-xs h-6">
                            Editor
                          </TabsTrigger>
                          <TabsTrigger value="test" className="px-3 py-1 text-xs h-6">
                            Test Results
                          </TabsTrigger>
                          <TabsTrigger value="chat" className="px-3 py-1 text-xs h-6">
                            AI Assistant
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4">
                    <div className="text-jupiter-cloud">
                      {strategyActiveTab === "editor" && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="strategy-description" className="text-jupiter-cloud mb-1 block">
                              Describe Your Strategy
                            </Label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowTemplates(!showTemplates)}
                              className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-gunmetal h-7"
                            >
                              <FileCode className="mr-2 h-4 w-4" /> {showTemplates ? "Hide Templates" : "Load Template"}
                            </Button>
                          </div>

                          <Textarea
                            id="strategy-description"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe the trading strategy you want to create in detail..."
                            className="h-64 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                          />
                        </div>
                      )}

                      {strategyActiveTab === "test" && (
                        <div className="flex flex-col items-center justify-center h-[400px]">
                          <div className="w-16 h-16 rounded-full border-4 border-jupiter-charcoal border-t-jupiter-nebula-blue animate-spin mb-4"></div>
                          <p className="text-jupiter-steel text-center">
                            Generate a strategy first to see test results
                          </p>
                        </div>
                      )}

                      {strategyActiveTab === "chat" && (
                        <div className="h-[400px] bg-jupiter-space-black flex flex-col">
                          <ScrollArea className="flex-1 p-3">
                            <div className="space-y-3">
                              {chatMessages.map((message, index) => (
                                <div
                                  key={index}
                                  className={`p-2 rounded-md ${
                                    message.role === "user"
                                      ? "bg-jupiter-charcoal/50 ml-6"
                                      : "bg-jupiter-gunmetal/30 mr-6"
                                  }`}
                                >
                                  <div className="text-xs text-jupiter-cloud">{message.content}</div>
                                </div>
                              ))}
                              <div ref={chatEndRef} />
                            </div>
                          </ScrollArea>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Sidebar - Strategy Library */}
              <div className="col-span-12 lg:col-span-3">
                <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
                  <CardHeader className="pb-2 border-b border-jupiter-charcoal">
                    <CardTitle className="flex items-center text-base font-syne" style={{ color: "#E8F9FF" }}>
                      <FolderOpen className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                      Strategy Library
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="relative mb-4">
                        <Input
                          placeholder="Search strategies..."
                          className="bg-jupiter-charcoal border-jupiter-gunmetal pl-8"
                          style={{ color: "#E8F9FF" }}
                        />
                        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-jupiter-steel">
                          <Search className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="text-jupiter-cloud">
                        Strategy library content goes here. This has been simplified for this example.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </PageTemplate>
    </DashboardLayout>
  )
}
