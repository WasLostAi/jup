"use client"
import { useState } from "react"
import type React from "react"

import DashboardLayout from "../dashboard-layout"
import { PageTemplate } from "../components/page-template"
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Zap,
  Rocket,
  Shield,
  Layers,
  PieChart,
  Clock,
  Copy,
  Check,
  Coins,
  ArrowRight,
  AlertTriangle,
  Target,
  Crosshair,
  FishIcon as Whale,
  LineChart,
  BarChart3,
  TrendingUp,
  Shuffle,
  Gauge,
  Settings,
  Activity,
  LayoutDashboard,
  Bell,
  Wallet,
  ShieldAlert,
  Repeat,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Import capabilities
import { capabilities, systemRequirements, apiEndpoints } from "@/lib/capabilities"

// Mock data for token history
const mockTokenHistory = [
  {
    name: "Jupiter Governance",
    symbol: "JUPGOV",
    supply: "100000000",
    address: "0x7a58c0be72be218b41c608b7fe7c5bb630736c71",
    created: "2023-06-15",
  },
  {
    name: "Solana Yield",
    symbol: "SYLD",
    supply: "500000000",
    address: "0x3e5c63644e683549055b9be8653de26e0b4cd36e",
    created: "2023-08-22",
  },
]

// Mock data for sniper targets
const mockSniperTargets = [
  {
    name: "SOL Ecosystem Fund",
    symbol: "SOLEF",
    targetPrice: 0.00012,
    maxBuy: 5,
    status: "active",
    created: "2023-09-05",
  },
  {
    name: "Jupiter Meme",
    symbol: "JUPM",
    targetPrice: 0.00045,
    maxBuy: 2.5,
    status: "active",
    created: "2023-09-10",
  },
  {
    name: "Solana DeFi Index",
    symbol: "SOLDI",
    targetPrice: 0.00078,
    maxBuy: 3.2,
    status: "paused",
    created: "2023-09-15",
  },
]

// Mock data for recent snipes
const mockRecentSnipes = [
  {
    name: "Solana Meme",
    symbol: "SOLM",
    buyPrice: 0.00023,
    currentPrice: 0.00045,
    profit: 95.65,
    time: "2h ago",
    status: "success",
  },
  {
    name: "Jupiter Ecosystem",
    symbol: "JUPE",
    buyPrice: 0.00056,
    currentPrice: 0.00042,
    profit: -25.0,
    time: "5h ago",
    status: "loss",
  },
  {
    name: "Solana Gaming",
    symbol: "SOLG",
    buyPrice: 0.00018,
    currentPrice: 0.00067,
    profit: 272.22,
    time: "1d ago",
    status: "success",
  },
]

export default function DangerPage() {
  const [activeTab, setActiveTab] = useState("tokens")

  // Token creation state
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [tokenSupply, setTokenSupply] = useState("1000000")
  const [tokenDecimals, setTokenDecimals] = useState("9")
  const [tokenDescription, setTokenDescription] = useState("")
  const [tokenPrompt, setTokenPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [generatedTokenAddress, setGeneratedTokenAddress] = useState("")
  const [copySuccess, setCopySuccess] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>("basic")

  // Tokenomics state
  const [teamAllocation, setTeamAllocation] = useState(15)
  const [publicSale, setPublicSale] = useState(40)
  const [liquidity, setLiquidity] = useState(20)
  const [marketing, setMarketing] = useState(10)
  const [ecosystem, setEcosystem] = useState(15)

  // Token features state
  const [hasBurning, setHasBurning] = useState(false)
  const [hasStaking, setHasStaking] = useState(false)
  const [hasFees, setHasFees] = useState(false)
  const [hasAntiBot, setHasAntiBot] = useState(false)
  const [hasVesting, setHasVesting] = useState(false)

  // Token history
  const [tokenHistory, setTokenHistory] = useState(mockTokenHistory)

  // Sniper state
  const [sniperTargets, setSniperTargets] = useState(mockSniperTargets)
  const [recentSnipes, setRecentSnipes] = useState(mockRecentSnipes)
  const [targetTokenAddress, setTargetTokenAddress] = useState("")
  const [targetPrice, setTargetPrice] = useState("")
  const [maxBuyAmount, setMaxBuyAmount] = useState("1")
  const [slippageTolerance, setSlippageTolerance] = useState(1)
  const [priorityFee, setPriorityFee] = useState(5)
  const [skipPreflight, setSkipPreflight] = useState(false)
  const [isSnipeLoading, setIsSnipeLoading] = useState(false)
  const [selectedStrategy, setSelectedStrategy] = useState("tokenSnipe")

  // Generate token from prompt
  const generateFromPrompt = async () => {
    if (!tokenPrompt) return

    setIsGenerating(true)

    try {
      // Simulate API call to generate token details from prompt
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Example generated values
      setTokenName("Quantum Finance")
      setTokenSymbol("QFIN")
      setTokenSupply("1000000000")
      setTokenDecimals("18")
      setTokenDescription(
        "Quantum Finance is a next-generation DeFi protocol leveraging quantum computing principles to optimize yield strategies and provide unparalleled security for digital assets.",
      )

      // Example tokenomics
      setTeamAllocation(12)
      setPublicSale(45)
      setLiquidity(25)
      setMarketing(8)
      setEcosystem(10)

      // Example features
      setHasBurning(true)
      setHasStaking(true)
      setHasFees(true)
      setHasAntiBot(false)
      setHasVesting(true)
    } catch (error) {
      console.error("Error generating token:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  // Create token with current settings
  const createToken = async () => {
    if (!tokenName || !tokenSymbol || !tokenSupply) return

    setIsCreating(true)

    try {
      // Simulate API call to create token
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Generate a random address for demo
      const randomAddress = `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`
      setGeneratedTokenAddress(randomAddress)

      // Add to history
      setTokenHistory([
        {
          name: tokenName,
          symbol: tokenSymbol,
          supply: tokenSupply,
          address: randomAddress,
          created: new Date().toISOString().split("T")[0],
        },
        ...tokenHistory,
      ])

      // Reset form after successful creation
      setTimeout(() => {
        setTokenName("")
        setTokenSymbol("")
        setTokenSupply("1000000")
        setTokenDecimals("9")
        setTokenDescription("")
        setGeneratedTokenAddress("")
      }, 5000)
    } catch (error) {
      console.error("Error creating token:", error)
    } finally {
      setIsCreating(false)
    }
  }

  // Copy token address to clipboard
  const copyAddress = () => {
    navigator.clipboard.writeText(generatedTokenAddress)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  // Calculate remaining allocation percentage
  const remainingAllocation = 100 - (teamAllocation + publicSale + liquidity + marketing + ecosystem)

  // Execute snipe
  const executeSnipe = async () => {
    if (!targetTokenAddress) return

    setIsSnipeLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Add to recent snipes
      const newSnipe = {
        name: `Token ${targetTokenAddress.substring(0, 4)}...${targetTokenAddress.substring(targetTokenAddress.length - 4)}`,
        symbol: "???",
        buyPrice: Number.parseFloat(targetPrice) || 0.0001,
        currentPrice: Number.parseFloat(targetPrice) || 0.0001,
        profit: 0,
        time: "Just now",
        status: "pending",
      }

      setRecentSnipes([newSnipe, ...recentSnipes])

      // Reset form
      setTargetTokenAddress("")
      setTargetPrice("")
    } catch (error) {
      console.error("Error executing snipe:", error)
    } finally {
      setIsSnipeLoading(false)
    }
  }

  // Add target
  const addTarget = () => {
    if (!targetTokenAddress || !targetPrice || !maxBuyAmount) return

    const newTarget = {
      name: `Token ${targetTokenAddress.substring(0, 4)}...${targetTokenAddress.substring(targetTokenAddress.length - 4)}`,
      symbol: "???",
      targetPrice: Number.parseFloat(targetPrice),
      maxBuy: Number.parseFloat(maxBuyAmount),
      status: "active",
      created: new Date().toISOString().split("T")[0],
    }

    setSniperTargets([newTarget, ...sniperTargets])

    // Reset form
    setTargetTokenAddress("")
    setTargetPrice("")
    setMaxBuyAmount("1")
  }

  // Render capability card
  const renderCapabilityCard = (
    title: string,
    description: string,
    features: string[],
    icon: React.ReactNode,
    color: string,
  ) => {
    return (
      <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-base font-syne" style={{ color: "#E8F9FF" }}>
            <div className={`mr-2 h-8 w-8 rounded-md flex items-center justify-center ${color}`}>{icon}</div>
            {title}
          </CardTitle>
          <CardDescription className="text-jupiter-steel">{description}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="text-sm text-jupiter-cloud flex items-start">
                <div className="mr-2 mt-1">•</div>
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    )
  }

  return (
    <DashboardLayout>
      <PageTemplate description="Advanced tools and experimental features. Use with caution.">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto mb-6">
          <TabsList className="bg-jupiter-charcoal h-8">
            <TabsTrigger value="tokens" className="px-3 py-1 text-xs h-6">
              Tokens
            </TabsTrigger>
            <TabsTrigger value="sniper" className="px-3 py-1 text-xs h-6">
              Sniper
            </TabsTrigger>
            <TabsTrigger value="capabilities" className="px-3 py-1 text-xs h-6">
              Capabilities
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {activeTab === "tokens" && (
          <div className="space-y-6">
            <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
              <CardHeader className="border-b border-jupiter-charcoal">
                <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
                  <Sparkles className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                  Create New Token
                </CardTitle>
                <CardDescription className="text-jupiter-steel">
                  Configure your token parameters or generate from a prompt
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6">
                {/* AI Prompt Section */}
                <div className="mb-6 p-4 bg-jupiter-charcoal/30 rounded-lg border border-jupiter-charcoal">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <Label htmlFor="token-prompt" className="text-jupiter-cloud mb-2 block">
                        Generate from Prompt
                      </Label>
                      <Textarea
                        id="token-prompt"
                        placeholder="Describe your token (e.g., 'Create a governance token for a DeFi protocol with staking and burning mechanisms')"
                        value={tokenPrompt}
                        onChange={(e) => setTokenPrompt(e.target.value)}
                        className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud min-h-[80px]"
                      />
                    </div>
                    <Button
                      onClick={generateFromPrompt}
                      disabled={isGenerating || !tokenPrompt}
                      className="mt-8 bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black font-medium"
                    >
                      {isGenerating ? (
                        <>
                          <Sparkles className="mr-2 h-4 w-4 animate-pulse" /> Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" /> Generate
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Basic Info Section */}
                <div className="mb-6">
                  <div
                    className="flex items-center justify-between p-3 bg-jupiter-charcoal rounded-t-lg cursor-pointer"
                    onClick={() => setActiveSection(activeSection === "basic" ? null : "basic")}
                  >
                    <h3 className="text-jupiter-cloud font-medium">Basic Info</h3>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      {activeSection === "basic" ? (
                        <ChevronUp className="h-5 w-5 text-jupiter-cloud" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-jupiter-cloud" />
                      )}
                    </Button>
                  </div>

                  {activeSection === "basic" && (
                    <div className="p-4 border border-jupiter-charcoal rounded-b-lg bg-jupiter-meteorite/50">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="token-name" className="text-jupiter-cloud">
                              Token Name
                            </Label>
                            <Input
                              id="token-name"
                              placeholder="e.g., Jupiter Token"
                              value={tokenName}
                              onChange={(e) => setTokenName(e.target.value)}
                              className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="token-symbol" className="text-jupiter-cloud">
                              Token Symbol
                            </Label>
                            <Input
                              id="token-symbol"
                              placeholder="e.g., JUP"
                              value={tokenSymbol}
                              onChange={(e) => setTokenSymbol(e.target.value)}
                              className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="token-supply" className="text-jupiter-cloud">
                              Total Supply
                            </Label>
                            <Input
                              id="token-supply"
                              placeholder="e.g., 1000000"
                              value={tokenSupply}
                              onChange={(e) => setTokenSupply(e.target.value)}
                              className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="token-decimals" className="text-jupiter-cloud">
                              Decimals
                            </Label>
                            <Input
                              id="token-decimals"
                              placeholder="e.g., 9"
                              value={tokenDecimals}
                              onChange={(e) => setTokenDecimals(e.target.value)}
                              className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="token-description" className="text-jupiter-cloud">
                            Description
                          </Label>
                          <Textarea
                            id="token-description"
                            placeholder="Describe your token's purpose and utility"
                            value={tokenDescription}
                            onChange={(e) => setTokenDescription(e.target.value)}
                            className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud min-h-[100px]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tokenomics Section */}
                <div className="mb-6">
                  <div
                    className="flex items-center justify-between p-3 bg-jupiter-charcoal rounded-t-lg cursor-pointer"
                    onClick={() => setActiveSection(activeSection === "tokenomics" ? null : "tokenomics")}
                  >
                    <h3 className="text-jupiter-cloud font-medium">Tokenomics</h3>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      {activeSection === "tokenomics" ? (
                        <ChevronUp className="h-5 w-5 text-jupiter-cloud" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-jupiter-cloud" />
                      )}
                    </Button>
                  </div>

                  {activeSection === "tokenomics" && (
                    <div className="p-4 border border-jupiter-charcoal rounded-b-lg bg-jupiter-meteorite/50">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-jupiter-cloud font-medium">Token Allocation</h3>
                          <Badge
                            variant="outline"
                            className={`${
                              remainingAllocation === 0
                                ? "bg-jupiter-trifid-teal/10 text-jupiter-trifid-teal border-jupiter-trifid-teal/20"
                                : "bg-red-500/10 text-red-400 border-red-500/20"
                            }`}
                          >
                            {remainingAllocation === 0 ? "Balanced (100%)" : `${remainingAllocation}% Remaining`}
                          </Badge>
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="team-allocation" className="text-jupiter-cloud">
                                Team & Advisors
                              </Label>
                              <span className="text-jupiter-steel">{teamAllocation}%</span>
                            </div>
                            <Slider
                              id="team-allocation"
                              min={0}
                              max={100}
                              step={1}
                              value={[teamAllocation]}
                              onValueChange={(value) => setTeamAllocation(value[0])}
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="public-sale" className="text-jupiter-cloud">
                                Public Sale
                              </Label>
                              <span className="text-jupiter-steel">{publicSale}%</span>
                            </div>
                            <Slider
                              id="public-sale"
                              min={0}
                              max={100}
                              step={1}
                              value={[publicSale]}
                              onValueChange={(value) => setPublicSale(value[0])}
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="liquidity" className="text-jupiter-cloud">
                                Liquidity Pool
                              </Label>
                              <span className="text-jupiter-steel">{liquidity}%</span>
                            </div>
                            <Slider
                              id="liquidity"
                              min={0}
                              max={100}
                              step={1}
                              value={[liquidity]}
                              onValueChange={(value) => setLiquidity(value[0])}
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="marketing" className="text-jupiter-cloud">
                                Marketing
                              </Label>
                              <span className="text-jupiter-steel">{marketing}%</span>
                            </div>
                            <Slider
                              id="marketing"
                              min={0}
                              max={100}
                              step={1}
                              value={[marketing]}
                              onValueChange={(value) => setMarketing(value[0])}
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="ecosystem" className="text-jupiter-cloud">
                                Ecosystem Growth
                              </Label>
                              <span className="text-jupiter-steel">{ecosystem}%</span>
                            </div>
                            <Slider
                              id="ecosystem"
                              min={0}
                              max={100}
                              step={1}
                              value={[ecosystem]}
                              onValueChange={(value) => setEcosystem(value[0])}
                            />
                          </div>
                        </div>

                        <div className="pt-4">
                          <div className="h-16 bg-jupiter-charcoal rounded-lg overflow-hidden flex">
                            <div
                              className="h-full bg-blue-500"
                              style={{ width: `${teamAllocation}%` }}
                              title={`Team & Advisors: ${teamAllocation}%`}
                            ></div>
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${publicSale}%` }}
                              title={`Public Sale: ${publicSale}%`}
                            ></div>
                            <div
                              className="h-full bg-purple-500"
                              style={{ width: `${liquidity}%` }}
                              title={`Liquidity Pool: ${liquidity}%`}
                            ></div>
                            <div
                              className="h-full bg-yellow-500"
                              style={{ width: `${marketing}%` }}
                              title={`Marketing: ${marketing}%`}
                            ></div>
                            <div
                              className="h-full bg-red-500"
                              style={{ width: `${ecosystem}%` }}
                              title={`Ecosystem Growth: ${ecosystem}%`}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-2 text-xs text-jupiter-steel">
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                              Team
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                              Public
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
                              Liquidity
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                              Marketing
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                              Ecosystem
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Features Section */}
                <div className="mb-6">
                  <div
                    className="flex items-center justify-between p-3 bg-jupiter-charcoal rounded-t-lg cursor-pointer"
                    onClick={() => setActiveSection(activeSection === "features" ? null : "features")}
                  >
                    <h3 className="text-jupiter-cloud font-medium">Features</h3>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      {activeSection === "features" ? (
                        <ChevronUp className="h-5 w-5 text-jupiter-cloud" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-jupiter-cloud" />
                      )}
                    </Button>
                  </div>

                  {activeSection === "features" && (
                    <div className="p-4 border border-jupiter-charcoal rounded-b-lg bg-jupiter-meteorite/50">
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="p-4 bg-jupiter-charcoal/30 rounded-lg border border-jupiter-charcoal">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <div className="bg-jupiter-charcoal p-2 rounded-full">
                                  <Zap className="h-5 w-5 text-jupiter-nebula-blue" />
                                </div>
                                <div>
                                  <h3 className="text-jupiter-cloud font-medium">Token Burning</h3>
                                  <p className="text-jupiter-steel text-sm mt-1">
                                    Automatically burn tokens to reduce supply over time
                                  </p>
                                </div>
                              </div>
                              <Switch
                                checked={hasBurning}
                                onCheckedChange={setHasBurning}
                                className="data-[state=checked]:bg-jupiter-nebula-blue"
                              />
                            </div>
                          </div>

                          <div className="p-4 bg-jupiter-charcoal/30 rounded-lg border border-jupiter-charcoal">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <div className="bg-jupiter-charcoal p-2 rounded-full">
                                  <Layers className="h-5 w-5 text-jupiter-helix-cyan" />
                                </div>
                                <div>
                                  <h3 className="text-jupiter-cloud font-medium">Staking Rewards</h3>
                                  <p className="text-jupiter-steel text-sm mt-1">
                                    Allow token holders to stake and earn rewards
                                  </p>
                                </div>
                              </div>
                              <Switch
                                checked={hasStaking}
                                onCheckedChange={setHasStaking}
                                className="data-[state=checked]:bg-jupiter-nebula-blue"
                              />
                            </div>
                          </div>

                          <div className="p-4 bg-jupiter-charcoal/30 rounded-lg border border-jupiter-charcoal">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <div className="bg-jupiter-charcoal p-2 rounded-full">
                                  <PieChart className="h-5 w-5 text-jupiter-cosmic-lime" />
                                </div>
                                <div>
                                  <h3 className="text-jupiter-cloud font-medium">Transaction Fees</h3>
                                  <p className="text-jupiter-steel text-sm mt-1">
                                    Apply fees on transfers to fund development
                                  </p>
                                </div>
                              </div>
                              <Switch
                                checked={hasFees}
                                onCheckedChange={setHasFees}
                                className="data-[state=checked]:bg-jupiter-nebula-blue"
                              />
                            </div>
                          </div>

                          <div className="p-4 bg-jupiter-charcoal/30 rounded-lg border border-jupiter-charcoal">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <div className="bg-jupiter-charcoal p-2 rounded-full">
                                  <Shield className="h-5 w-5 text-jupiter-aurora-green" />
                                </div>
                                <div>
                                  <h3 className="text-jupiter-cloud font-medium">Anti-Bot Measures</h3>
                                  <p className="text-jupiter-steel text-sm mt-1">
                                    Prevent bots from manipulating token price
                                  </p>
                                </div>
                              </div>
                              <Switch
                                checked={hasAntiBot}
                                onCheckedChange={setHasAntiBot}
                                className="data-[state=checked]:bg-jupiter-nebula-blue"
                              />
                            </div>
                          </div>

                          <div className="p-4 bg-jupiter-charcoal/30 rounded-lg border border-jupiter-charcoal">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <div className="bg-jupiter-charcoal p-2 rounded-full">
                                  <Clock className="h-5 w-5 text-jupiter-nebula-blue" />
                                </div>
                                <div>
                                  <h3 className="text-jupiter-cloud font-medium">Vesting Schedule</h3>
                                  <p className="text-jupiter-steel text-sm mt-1">
                                    Implement vesting for team and investor tokens
                                  </p>
                                </div>
                              </div>
                              <Switch
                                checked={hasVesting}
                                onCheckedChange={setHasVesting}
                                className="data-[state=checked]:bg-jupiter-nebula-blue"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <div>
                    {generatedTokenAddress && (
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-jupiter-steel">Token Address:</span>
                        <code className="bg-jupiter-charcoal px-2 py-1 rounded text-jupiter-cloud">
                          {generatedTokenAddress.substring(0, 8)}...
                          {generatedTokenAddress.substring(generatedTokenAddress.length - 8)}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-jupiter-steel hover:text-jupiter-nebula-blue"
                          onClick={copyAddress}
                        >
                          {copySuccess ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={createToken}
                    disabled={isCreating || !tokenName || !tokenSymbol || !tokenSupply || remainingAllocation !== 0}
                    className="bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black font-medium"
                  >
                    {isCreating ? (
                      <>
                        <Rocket className="mr-2 h-4 w-4 animate-pulse" /> Creating Token...
                      </>
                    ) : (
                      <>
                        <Rocket className="mr-2 h-4 w-4" /> Create Token
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm h-full">
              <CardHeader className="border-b border-jupiter-charcoal">
                <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
                  <Coins className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                  Token History
                </CardTitle>
                <CardDescription className="text-jupiter-steel">Previously created tokens</CardDescription>
              </CardHeader>

              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  <div className="p-4 space-y-4">
                    {tokenHistory.map((token, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border border-jupiter-charcoal hover:border-jupiter-nebula-blue/50 transition-all"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-jupiter-cloud">{token.name}</h3>
                            <div className="flex items-center mt-1">
                              <Badge
                                variant="outline"
                                className="bg-jupiter-charcoal text-jupiter-nebula-blue border-jupiter-nebula-blue/50 mr-2"
                              >
                                {token.symbol}
                              </Badge>
                              <span className="text-xs text-jupiter-steel">Created: {token.created}</span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-jupiter-steel hover:text-jupiter-nebula-blue"
                            onClick={() => {
                              navigator.clipboard.writeText(token.address)
                            }}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="mt-3 flex justify-between items-center">
                          <div className="text-sm text-jupiter-steel">
                            Supply: {Number.parseInt(token.supply).toLocaleString()}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite"
                          >
                            <ArrowRight className="h-3 w-3 mr-1" /> View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "sniper" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sniper Configuration */}
              <div className="lg:col-span-2">
                <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
                  <CardHeader className="border-b border-jupiter-charcoal">
                    <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
                      <Target className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                      Token Sniper
                    </CardTitle>
                    <CardDescription className="text-jupiter-steel">
                      Configure and execute token snipes with precision
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-jupiter-cloud font-medium">Strategy Selection</h3>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant={selectedStrategy === "tokenSnipe" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedStrategy("tokenSnipe")}
                            className={
                              selectedStrategy === "tokenSnipe"
                                ? "bg-jupiter-nebula-blue text-jupiter-space-black"
                                : "bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                            }
                          >
                            <Crosshair className="mr-2 h-4 w-4" />
                            Token Snipe
                          </Button>
                          <Button
                            variant={selectedStrategy === "targetedSnipe" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedStrategy("targetedSnipe")}
                            className={
                              selectedStrategy === "targetedSnipe"
                                ? "bg-jupiter-nebula-blue text-jupiter-space-black"
                                : "bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                            }
                          >
                            <Target className="mr-2 h-4 w-4" />
                            Targeted Snipe
                          </Button>
                          <Button
                            variant={selectedStrategy === "whaleTracking" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedStrategy("whaleTracking")}
                            className={
                              selectedStrategy === "whaleTracking"
                                ? "bg-jupiter-nebula-blue text-jupiter-space-black"
                                : "bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                            }
                          >
                            <Whale className="mr-2 h-4 w-4" />
                            Whale Tracking
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-jupiter-charcoal/30 rounded-lg border border-jupiter-charcoal">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="token-address" className="text-jupiter-cloud">
                              Token Address
                            </Label>
                            <Input
                              id="token-address"
                              placeholder="Enter token address"
                              value={targetTokenAddress}
                              onChange={(e) => setTargetTokenAddress(e.target.value)}
                              className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="target-price" className="text-jupiter-cloud">
                                {selectedStrategy === "targetedSnipe" ? "Target Price" : "Max Buy Price"}
                              </Label>
                              <Input
                                id="target-price"
                                placeholder="e.g., 0.0001"
                                value={targetPrice}
                                onChange={(e) => setTargetPrice(e.target.value)}
                                className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="max-buy" className="text-jupiter-cloud">
                                Max Buy Amount (SOL)
                              </Label>
                              <Input
                                id="max-buy"
                                placeholder="e.g., 1"
                                value={maxBuyAmount}
                                onChange={(e) => setMaxBuyAmount(e.target.value)}
                                className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="slippage" className="text-jupiter-cloud">
                                Slippage Tolerance
                              </Label>
                              <span className="text-jupiter-steel">{slippageTolerance}%</span>
                            </div>
                            <Slider
                              id="slippage"
                              min={0.1}
                              max={10}
                              step={0.1}
                              value={[slippageTolerance]}
                              onValueChange={(value) => setSlippageTolerance(value[0])}
                            />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <Label htmlFor="priority-fee" className="text-jupiter-cloud">
                                Priority Fee (SOL)
                              </Label>
                              <span className="text-jupiter-steel">{priorityFee} SOL</span>
                            </div>
                            <Slider
                              id="priority-fee"
                              min={0}
                              max={20}
                              step={1}
                              value={[priorityFee]}
                              onValueChange={(value) => setPriorityFee(value[0])}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Switch
                                id="skip-preflight"
                                checked={skipPreflight}
                                onCheckedChange={setSkipPreflight}
                                className="data-[state=checked]:bg-jupiter-nebula-blue"
                              />
                              <Label htmlFor="skip-preflight" className="text-jupiter-cloud">
                                Skip Preflight Checks
                              </Label>
                            </div>
                            <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/20">
                              Advanced
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite"
                          onClick={addTarget}
                          disabled={!targetTokenAddress || !targetPrice || !maxBuyAmount}
                        >
                          Add to Targets
                        </Button>
                        <Button
                          onClick={executeSnipe}
                          disabled={isSnipeLoading || !targetTokenAddress}
                          className="bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black font-medium"
                        >
                          {isSnipeLoading ? (
                            <>
                              <Target className="mr-2 h-4 w-4 animate-pulse" /> Executing Snipe...
                            </>
                          ) : (
                            <>
                              <Target className="mr-2 h-4 w-4" /> Execute Snipe
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sniper Targets */}
              <div>
                <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
                  <CardHeader className="border-b border-jupiter-charcoal">
                    <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
                      <Crosshair className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                      Sniper Targets
                    </CardTitle>
                    <CardDescription className="text-jupiter-steel">Active token targets</CardDescription>
                  </CardHeader>

                  <CardContent className="p-0">
                    <ScrollArea className="h-[300px]">
                      <div className="p-4 space-y-3">
                        {sniperTargets.map((target, index) => (
                          <div
                            key={index}
                            className="p-3 rounded-lg border border-jupiter-charcoal hover:border-jupiter-nebula-blue/50 transition-all"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-jupiter-cloud">{target.name}</h3>
                                <div className="flex items-center mt-1">
                                  <Badge
                                    variant="outline"
                                    className="bg-jupiter-charcoal text-jupiter-nebula-blue border-jupiter-nebula-blue/50 mr-2"
                                  >
                                    {target.symbol}
                                  </Badge>
                                  <span className="text-xs text-jupiter-steel">Added: {target.created}</span>
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className={
                                  target.status === "active"
                                    ? "bg-jupiter-trifid-teal/20 text-jupiter-trifid-teal border-jupiter-trifid-teal/50"
                                    : "bg-jupiter-gunmetal text-jupiter-steel border-jupiter-steel/50"
                                }
                              >
                                {target.status}
                              </Badge>
                            </div>

                            <div className="mt-2 flex justify-between items-center">
                              <div className="text-sm text-jupiter-steel">
                                Target: {target.targetPrice} | Max: {target.maxBuy} SOL
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite"
                              >
                                <Target className="h-3 w-3 mr-1" /> Snipe
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Snipes */}
            <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
              <CardHeader className="border-b border-jupiter-charcoal">
                <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
                  <Activity className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                  Recent Snipes
                </CardTitle>
                <CardDescription className="text-jupiter-steel">Recent token snipe activity</CardDescription>
              </CardHeader>

              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-jupiter-charcoal">
                        <th className="text-left p-4 text-jupiter-steel font-medium">Token</th>
                        <th className="text-left p-4 text-jupiter-steel font-medium">Buy Price</th>
                        <th className="text-left p-4 text-jupiter-steel font-medium">Current Price</th>
                        <th className="text-left p-4 text-jupiter-steel font-medium">Profit/Loss</th>
                        <th className="text-left p-4 text-jupiter-steel font-medium">Time</th>
                        <th className="text-left p-4 text-jupiter-steel font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentSnipes.map((snipe, index) => (
                        <tr key={index} className="border-b border-jupiter-charcoal/50">
                          <td className="p-4">
                            <div>
                              <div className="font-medium text-jupiter-cloud">{snipe.name}</div>
                              <div className="text-xs text-jupiter-steel">{snipe.symbol}</div>
                            </div>
                          </td>
                          <td className="p-4 text-jupiter-cloud">{snipe.buyPrice}</td>
                          <td className="p-4 text-jupiter-cloud">{snipe.currentPrice}</td>
                          <td className="p-4">
                            <div
                              className={
                                snipe.profit > 0
                                  ? "text-jupiter-cosmic-lime"
                                  : snipe.profit < 0
                                    ? "text-red-400"
                                    : "text-jupiter-steel"
                              }
                            >
                              {snipe.profit > 0 ? "+" : ""}
                              {snipe.profit}%
                            </div>
                          </td>
                          <td className="p-4 text-jupiter-steel">{snipe.time}</td>
                          <td className="p-4">
                            <Badge
                              variant="outline"
                              className={
                                snipe.status === "success"
                                  ? "bg-jupiter-trifid-teal/20 text-jupiter-trifid-teal border-jupiter-trifid-teal/50"
                                  : snipe.status === "loss"
                                    ? "bg-red-500/20 text-red-400 border-red-500/30"
                                    : "bg-jupiter-steel/20 text-jupiter-steel border-jupiter-steel/30"
                              }
                            >
                              {snipe.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "capabilities" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
                <CardHeader className="border-b border-jupiter-charcoal">
                  <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
                    <AlertTriangle className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                    System Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-jupiter-nebula-blue">•</div>
                      <div className="text-jupiter-cloud">
                        <span className="font-medium">Browser:</span> {systemRequirements.browser}
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-jupiter-nebula-blue">•</div>
                      <div className="text-jupiter-cloud">
                        <span className="font-medium">Wallet:</span> {systemRequirements.wallet}
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-jupiter-nebula-blue">•</div>
                      <div className="text-jupiter-cloud">
                        <span className="font-medium">Network:</span> {systemRequirements.network}
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-jupiter-nebula-blue">•</div>
                      <div className="text-jupiter-cloud">
                        <span className="font-medium">RPC:</span> {systemRequirements.rpc}
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
                <CardHeader className="border-b border-jupiter-charcoal">
                  <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
                    <Repeat className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                    API Endpoints
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-jupiter-nebula-blue">•</div>
                      <div className="text-jupiter-cloud">
                        <span className="font-medium">Jupiter:</span> {apiEndpoints.jupiter}
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-jupiter-nebula-blue">•</div>
                      <div className="text-jupiter-cloud">
                        <span className="font-medium">Jito:</span> {apiEndpoints.jito}
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-2 mt-1 text-jupiter-nebula-blue">•</div>
                      <div className="text-jupiter-cloud">
                        <span className="font-medium">QuickNode:</span> {apiEndpoints.quicknode}
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="trading" className="border-jupiter-charcoal">
                <AccordionTrigger className="text-jupiter-cloud hover:text-jupiter-nebula-blue">
                  <div className="flex items-center">
                    <Target className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                    Core Trading Features
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {renderCapabilityCard(
                      "Token Snipe",
                      capabilities.trading.tokenSnipe.description,
                      capabilities.trading.tokenSnipe.features,
                      <Crosshair className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-1",
                    )}
                    {renderCapabilityCard(
                      "Targeted Snipe",
                      capabilities.trading.targetedSnipe.description,
                      capabilities.trading.targetedSnipe.features,
                      <Target className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-2",
                    )}
                    {renderCapabilityCard(
                      "Whale Tracking",
                      capabilities.trading.whaleTracking.description,
                      capabilities.trading.whaleTracking.features,
                      <Whale className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-3",
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="market" className="border-jupiter-charcoal">
                <AccordionTrigger className="text-jupiter-cloud hover:text-jupiter-nebula-blue">
                  <div className="flex items-center">
                    <LineChart className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                    Market Analysis
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {renderCapabilityCard(
                      "Pool Monitoring",
                      capabilities.marketAnalysis.poolMonitoring.description,
                      capabilities.marketAnalysis.poolMonitoring.features,
                      <Activity className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-1",
                    )}
                    {renderCapabilityCard(
                      "Price Charts",
                      capabilities.marketAnalysis.priceCharts.description,
                      capabilities.marketAnalysis.priceCharts.features,
                      <LineChart className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-2",
                    )}
                    {renderCapabilityCard(
                      "Token Analytics",
                      capabilities.marketAnalysis.tokenAnalytics.description,
                      capabilities.marketAnalysis.tokenAnalytics.features,
                      <BarChart3 className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-3",
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="strategies" className="border-jupiter-charcoal">
                <AccordionTrigger className="text-jupiter-cloud hover:text-jupiter-nebula-blue">
                  <div className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                    Advanced Trading Strategies
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {renderCapabilityCard(
                      "Breakout Strategy",
                      capabilities.tradingStrategies.breakoutStrategy.description,
                      capabilities.tradingStrategies.breakoutStrategy.features,
                      <TrendingUp className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-1",
                    )}
                    {renderCapabilityCard(
                      "Bollinger Bands",
                      capabilities.tradingStrategies.bollingerBands.description,
                      capabilities.tradingStrategies.bollingerBands.features,
                      <LineChart className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-2",
                    )}
                    {renderCapabilityCard(
                      "Bootstrap Strategy",
                      capabilities.tradingStrategies.bootstrapStrategy.description,
                      capabilities.tradingStrategies.bootstrapStrategy.features,
                      <Rocket className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-3",
                    )}
                    {renderCapabilityCard(
                      "Creation Aware Trader",
                      capabilities.tradingStrategies.creationAwareTrader.description,
                      capabilities.tradingStrategies.creationAwareTrader.features,
                      <Zap className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-1",
                    )}
                    {renderCapabilityCard(
                      "Perpetual Arbitrage",
                      capabilities.tradingStrategies.perpetualArbitrage.description,
                      capabilities.tradingStrategies.perpetualArbitrage.features,
                      <Shuffle className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-2",
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="transaction" className="border-jupiter-charcoal">
                <AccordionTrigger className="text-jupiter-cloud hover:text-jupiter-nebula-blue">
                  <div className="flex items-center">
                    <Activity className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                    Transaction Management
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {renderCapabilityCard(
                      "Bundle Engine",
                      capabilities.transactionManagement.bundleEngine.description,
                      capabilities.transactionManagement.bundleEngine.features,
                      <Zap className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-1",
                    )}
                    {renderCapabilityCard(
                      "Transaction Monitor",
                      capabilities.transactionManagement.transactionMonitor.description,
                      capabilities.transactionManagement.transactionMonitor.features,
                      <Activity className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-2",
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="configuration" className="border-jupiter-charcoal">
                <AccordionTrigger className="text-jupiter-cloud hover:text-jupiter-nebula-blue">
                  <div className="flex items-center">
                    <Settings className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                    Configuration and Settings
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {renderCapabilityCard(
                      "Target Management",
                      capabilities.configuration.targetManagement.description,
                      capabilities.configuration.targetManagement.features,
                      <Target className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-1",
                    )}
                    {renderCapabilityCard(
                      "QuickNode Config",
                      capabilities.configuration.quickNodeConfig.description,
                      capabilities.configuration.quickNodeConfig.features,
                      <Settings className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-2",
                    )}
                    {renderCapabilityCard(
                      "Jito Config",
                      capabilities.configuration.jitoConfig.description,
                      capabilities.configuration.jitoConfig.features,
                      <Settings className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-3",
                    )}
                    {renderCapabilityCard(
                      "Environment Settings",
                      capabilities.configuration.environmentSettings.description,
                      capabilities.configuration.environmentSettings.features,
                      <Settings className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-1",
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="performance" className="border-jupiter-charcoal">
                <AccordionTrigger className="text-jupiter-cloud hover:text-jupiter-nebula-blue">
                  <div className="flex items-center">
                    <Gauge className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                    Performance Monitoring
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                    {renderCapabilityCard(
                      "Trading Metrics",
                      capabilities.performanceMonitoring.tradingMetrics.description,
                      capabilities.performanceMonitoring.tradingMetrics.features,
                      <Activity className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-1",
                    )}
                    {renderCapabilityCard(
                      "Circuit Breakers",
                      capabilities.performanceMonitoring.circuitBreakers.description,
                      capabilities.performanceMonitoring.circuitBreakers.features,
                      <AlertTriangle className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-2",
                    )}
                    {renderCapabilityCard(
                      "Strategy Monitor",
                      capabilities.performanceMonitoring.strategyMonitor.description,
                      capabilities.performanceMonitoring.strategyMonitor.features,
                      <Gauge className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-3",
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ui" className="border-jupiter-charcoal">
                <AccordionTrigger className="text-jupiter-cloud hover:text-jupiter-nebula-blue">
                  <div className="flex items-center">
                    <LayoutDashboard className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                    UI and Experience
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {renderCapabilityCard(
                      "Dashboard",
                      capabilities.userInterface.dashboard.description,
                      capabilities.userInterface.dashboard.features,
                      <LayoutDashboard className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-1",
                    )}
                    {renderCapabilityCard(
                      "Customizable Dashboard",
                      capabilities.userInterface.customizableDashboard.description,
                      capabilities.userInterface.customizableDashboard.features,
                      <LayoutDashboard className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-2",
                    )}
                    {renderCapabilityCard(
                      "Notifications",
                      capabilities.userInterface.notifications.description,
                      capabilities.userInterface.notifications.features,
                      <Bell className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-3",
                    )}
                    {renderCapabilityCard(
                      "Wallet Connect",
                      capabilities.userInterface.walletConnect.description,
                      capabilities.userInterface.walletConnect.features,
                      <Wallet className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-1",
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="security" className="border-jupiter-charcoal">
                <AccordionTrigger className="text-jupiter-cloud hover:text-jupiter-nebula-blue">
                  <div className="flex items-center">
                    <ShieldAlert className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                    Security and Safety
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {renderCapabilityCard(
                      "Token Safety",
                      capabilities.security.tokenSafety.description,
                      capabilities.security.tokenSafety.features,
                      <Shield className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-1",
                    )}
                    {renderCapabilityCard(
                      "Transaction Simulation",
                      capabilities.security.transactionSimulation.description,
                      capabilities.security.transactionSimulation.features,
                      <ShieldAlert className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-2",
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="integrations" className="border-jupiter-charcoal">
                <AccordionTrigger className="text-jupiter-cloud hover:text-jupiter-nebula-blue">
                  <div className="flex items-center">
                    <Repeat className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                    API Integrations
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {renderCapabilityCard(
                      "Jupiter API",
                      capabilities.integrations.jupiterAPI.description,
                      capabilities.integrations.jupiterAPI.features,
                      <Repeat className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-1",
                    )}
                    {renderCapabilityCard(
                      "Jito API",
                      capabilities.integrations.jitoAPI.description,
                      capabilities.integrations.jitoAPI.features,
                      <Repeat className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-2",
                    )}
                    {renderCapabilityCard(
                      "QuickNode API",
                      capabilities.integrations.quickNodeAPI.description,
                      capabilities.integrations.quickNodeAPI.features,
                      <Repeat className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-3",
                    )}
                    {renderCapabilityCard(
                      "Jupiter Perpetuals",
                      capabilities.integrations.jupiterPerpetuals.description,
                      capabilities.integrations.jupiterPerpetuals.features,
                      <Repeat className="h-5 w-5 text-jupiter-space-black" />,
                      "bg-gradient-jupiter-1",
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </PageTemplate>
    </DashboardLayout>
  )
}
