"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Terminal,
  Play,
  Pause,
  RefreshCw,
  Download,
  Copy,
  Wallet,
  Coins,
  Rocket,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Check,
  ArrowDownRight,
} from "lucide-react"
import DashboardLayout from "../dashboard-layout"
import { PageTemplate } from "../components/page-template"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MatrixRain } from "../../matrix-rain"

export default function ConsolePage() {
  // Console state
  const [logs, setLogs] = useState<Array<{ type: string; message: string; timestamp: string }>>([])
  const [command, setCommand] = useState("")
  const [isRunning, setIsRunning] = useState(true)
  const [activeSection, setActiveSection] = useState("console")
  const [toolkitTab, setToolkitTab] = useState("wallets")

  // Console functionality
  // Simulate logs being added
  useEffect(() => {
    if (!isRunning || activeSection !== "console") return

    const messages = [
      "System initialized",
      "Connected to trading API",
      "Market data stream established",
      "Analyzing price patterns",
      "Detected potential arbitrage opportunity",
      "Calculating optimal trade size",
      "Executing trade strategy",
      "Trade executed: 0.5 SOL → 34.21 USDC",
      "Transaction confirmed on blockchain",
      "Updating portfolio balance",
      "Monitoring market conditions",
      "Waiting for next trading opportunity",
    ]

    const interval = setInterval(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      const randomType =
        Math.random() > 0.8 ? (Math.random() > 0.5 ? "warning" : "error") : Math.random() > 0.5 ? "info" : "success"

      const timestamp = new Date().toLocaleTimeString()

      setLogs((prev) => [...prev.slice(-100), { type: randomType, message: randomMessage, timestamp }])
    }, 3000)

    return () => clearInterval(interval)
  }, [isRunning, activeSection])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!command.trim()) return

    const timestamp = new Date().toLocaleTimeString()
    setLogs((prev) => [...prev, { type: "command", message: `> ${command}`, timestamp }])

    // Simulate response
    setTimeout(() => {
      const timestamp = new Date().toLocaleTimeString()
      setLogs((prev) => [
        ...prev,
        {
          type: "info",
          message: `Command "${command}" executed successfully.`,
          timestamp,
        },
      ])
    }, 500)

    setCommand("")
  }

  const clearLogs = () => {
    setLogs([])
  }

  const toggleRunning = () => {
    setIsRunning(!isRunning)
  }

  // Toolkit functionality
  // Mock data for wallets
  const mockWallets = [
    {
      id: "wallet-1",
      name: "Main Trading Wallet",
      address: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
      balance: 12.45,
      token: "ETH",
      usdValue: 24890.45,
      isDefault: true,
      transactions: [
        {
          id: "tx1",
          type: "send",
          amount: 1.2,
          token: "ETH",
          timestamp: Date.now() - 3600000,
          to: "0xabcd...1234",
          status: "confirmed",
          fee: 0.002,
        },
        {
          id: "tx2",
          type: "receive",
          amount: 5.0,
          token: "ETH",
          timestamp: Date.now() - 86400000,
          from: "0xefgh...5678",
          status: "confirmed",
          fee: 0.001,
        },
        {
          id: "tx3",
          type: "swap",
          amount: 2.5,
          token: "ETH",
          toToken: "USDT",
          toAmount: 5000,
          timestamp: Date.now() - 172800000,
          status: "confirmed",
          fee: 0.003,
        },
      ],
      tokens: [
        { symbol: "ETH", name: "Ethereum", balance: 12.45, usdValue: 24890.45, change24h: 2.3 },
        { symbol: "USDT", name: "Tether", balance: 5000, usdValue: 5000, change24h: 0.01 },
        { symbol: "LINK", name: "Chainlink", balance: 150, usdValue: 1875, change24h: -1.2 },
      ],
    },
    {
      id: "wallet-2",
      name: "DeFi Investments",
      address: "0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
      balance: 5.78,
      token: "ETH",
      usdValue: 11560.78,
      isDefault: false,
      transactions: [
        {
          id: "tx4",
          type: "stake",
          amount: 3.0,
          token: "ETH",
          timestamp: Date.now() - 259200000,
          to: "Lido",
          status: "confirmed",
          fee: 0.002,
        },
        {
          id: "tx5",
          type: "claim",
          amount: 0.2,
          token: "ETH",
          timestamp: Date.now() - 345600000,
          from: "Lido Rewards",
          status: "confirmed",
          fee: 0.001,
        },
      ],
      tokens: [
        { symbol: "ETH", name: "Ethereum", balance: 5.78, usdValue: 11560.78, change24h: 2.3 },
        { symbol: "stETH", name: "Lido Staked ETH", balance: 3.0, usdValue: 6000, change24h: 2.5 },
        { symbol: "UNI", name: "Uniswap", balance: 100, usdValue: 650, change24h: 5.7 },
      ],
    },
  ]

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

  // Wallet state
  const [wallets, setWallets] = useState(mockWallets)
  const [selectedWallet, setSelectedWallet] = useState(mockWallets[0])
  const [newWalletName, setNewWalletName] = useState("")
  const [newWalletAddress, setNewWalletAddress] = useState("")
  const [isAddingWallet, setIsAddingWallet] = useState(false)
  const [isEditingWallet, setIsEditingWallet] = useState(false)
  const [editWalletId, setEditWalletId] = useState("")
  const [editWalletName, setEditWalletName] = useState("")
  const [walletActiveTab, setWalletActiveTab] = useState("assets")

  // Wallet Creator State
  const [walletType, setWalletType] = useState("ethereum")
  const [walletCount, setWalletCount] = useState(1)
  const [walletPrefix, setWalletPrefix] = useState("")
  const [walletPrompt, setWalletPrompt] = useState("")
  const [isGeneratingWallets, setIsGeneratingWallets] = useState(false)
  const [generatedWallets, setGeneratedWallets] = useState<Array<{ address: string; privateKey: string }>>([])
  const [showPrivateKeys, setShowPrivateKeys] = useState(false)

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
  const [tokenActiveSection, setTokenActiveSection] = useState<string | null>("basic")

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

  // Handle adding a new wallet
  const handleAddWallet = () => {
    if (!newWalletName || !newWalletAddress) return

    const newWallet = {
      id: `wallet-${Date.now()}`,
      name: newWalletName,
      address: newWalletAddress,
      balance: 0,
      token: "ETH",
      usdValue: 0,
      isDefault: wallets.length === 0, // Make default if it's the first wallet
      transactions: [],
      tokens: [],
    }

    setWallets([...wallets, newWallet])
    setNewWalletName("")
    setNewWalletAddress("")
    setIsAddingWallet(false)
  }

  // Handle editing a wallet
  const handleEditWallet = () => {
    if (!editWalletName) return

    setWallets(wallets.map((wallet) => (wallet.id === editWalletId ? { ...wallet, name: editWalletName } : wallet)))

    setIsEditingWallet(false)
    setEditWalletId("")
    setEditWalletName("")
  }

  // Handle setting a wallet as default
  const handleSetDefaultWallet = (walletId: string) => {
    setWallets(
      wallets.map((wallet) => ({
        ...wallet,
        isDefault: wallet.id === walletId,
      })),
    )
  }

  // Handle deleting a wallet
  const handleDeleteWallet = (walletId: string) => {
    const updatedWallets = wallets.filter((wallet) => wallet.id !== walletId)

    // If we deleted the default wallet, set a new default
    if (updatedWallets.length > 0 && wallets.find((w) => w.id === walletId)?.isDefault) {
      updatedWallets[0].isDefault = true
    }

    setWallets(updatedWallets)

    // If we deleted the selected wallet, select the first available one
    if (selectedWallet.id === walletId && updatedWallets.length > 0) {
      setSelectedWallet(updatedWallets[0])
    }
  }

  // Generate wallets
  const generateWallets = async () => {
    setIsGeneratingWallets(true)
    setGeneratedWallets([])

    try {
      // Simulate API call to generate wallets
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate mock wallets
      const newWallets = Array.from({ length: walletCount }, (_, i) => {
        const randomAddress = `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`
        const randomPrivateKey = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`

        return {
          address: walletPrefix ? `${walletPrefix}-${i + 1}-${randomAddress.substring(0, 10)}` : randomAddress,
          privateKey: randomPrivateKey,
        }
      })

      setGeneratedWallets(newWallets)
    } catch (error) {
      console.error("Error generating wallets:", error)
    } finally {
      setIsGeneratingWallets(false)
    }
  }

  // Generate wallets from prompt
  const generateWalletsFromPrompt = async () => {
    if (!walletPrompt) return

    setIsGeneratingWallets(true)
    setGeneratedWallets([])

    try {
      // Simulate API call to generate wallets from prompt
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // For demo purposes, we'll generate a random number of wallets between 3 and 10
      const promptGeneratedCount = Math.floor(Math.random() * 8) + 3

      // Generate mock wallets
      const newWallets = Array.from({ length: promptGeneratedCount }, (_, i) => {
        const randomAddress = `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`
        const randomPrivateKey = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`

        return {
          address: randomAddress,
          privateKey: randomPrivateKey,
        }
      })

      setGeneratedWallets(newWallets)
      setWalletCount(promptGeneratedCount)
    } catch (error) {
      console.error("Error generating wallets from prompt:", error)
    } finally {
      setIsGeneratingWallets(false)
    }
  }

  // Download wallets as JSON
  const downloadWalletsAsJson = () => {
    const dataStr = JSON.stringify(generatedWallets, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `wallets-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  // Download wallets as CSV
  const downloadWalletsAsCsv = () => {
    const headers = ["Address", "Private Key"]
    const csvContent = [
      headers.join(","),
      ...generatedWallets.map((wallet) => `${wallet.address},${wallet.privateKey}`),
    ].join("\n")

    const dataUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`

    const exportFileDefaultName = `wallets-${new Date().toISOString().split("T")[0]}.csv`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Format timestamp for display
  const formatTimestamp = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp

    if (diff < 60000) return "Just now"
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
    return `${Math.floor(diff / 86400000)}d ago`
  }

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

  return (
    <DashboardLayout>
      <PageTemplate
        title="Console & Toolkit"
        icon={<Terminal className="mr-2 h-6 w-6 text-jupiter-nebula-blue" />}
        description="System console for monitoring logs and executing commands. Access wallet and token tools."
      >
        <div className="space-y-6">
          {/* Section Tabs */}
          <Tabs defaultValue={activeSection} onValueChange={(value) => setActiveSection(value)} className="w-full">
            <TabsList className="bg-jupiter-charcoal h-10 w-full justify-start">
              <TabsTrigger value="console" className="px-4 py-2 text-sm h-8">
                <Terminal className="mr-2 h-4 w-4" /> Console
              </TabsTrigger>
              <TabsTrigger value="toolkit" className="px-4 py-2 text-sm h-8">
                <Wallet className="mr-2 h-4 w-4" /> Toolkit
              </TabsTrigger>
            </TabsList>

            {/* Console Content */}
            <TabsContent value="console" className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleRunning}
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite"
                  >
                    {isRunning ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                    {isRunning ? "Pause" : "Resume"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearLogs}
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite"
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="font-mono text-sm h-[400px] bg-jupiter-space-black border border-jupiter-charcoal rounded-md p-4 overflow-auto">
                {logs.length === 0 ? (
                  <div className="text-jupiter-steel italic">No logs yet. System console initialized and ready.</div>
                ) : (
                  logs.map((log, index) => (
                    <div
                      key={index}
                      className={`mb-1 ${
                        log.type === "error"
                          ? "text-red-400"
                          : log.type === "warning"
                            ? "text-amber-400"
                            : log.type === "success"
                              ? "text-jupiter-cosmic-lime"
                              : log.type === "command"
                                ? "text-jupiter-nebula-blue"
                                : "text-jupiter-cloud"
                      }`}
                    >
                      [{log.timestamp}] {log.message}
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleCommand} className="flex items-center space-x-2">
                <Input
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="Enter command..."
                  className="flex-1 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                />
                <Button
                  type="submit"
                  className="bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black"
                >
                  Execute
                </Button>
              </form>
            </TabsContent>

            {/* Toolkit Content */}
            <TabsContent value="toolkit" className="mt-4 space-y-4">
              <Tabs defaultValue={toolkitTab} onValueChange={(value) => setToolkitTab(value)} className="w-full">
                <TabsList className="bg-jupiter-charcoal h-8">
                  <TabsTrigger value="wallets" className="px-3 py-1 text-xs h-6">
                    Wallets
                  </TabsTrigger>
                  <TabsTrigger value="create" className="px-3 py-1 text-xs h-6">
                    Create
                  </TabsTrigger>
                  <TabsTrigger value="tokens" className="px-3 py-1 text-xs h-6">
                    Tokens
                  </TabsTrigger>
                </TabsList>

                {/* Wallets Tab */}
                <TabsContent value="wallets" className="mt-4">
                  <div className="grid grid-cols-12 gap-6">
                    {/* Main Wallet Section */}
                    <div className="col-span-12 lg:col-span-8">
                      <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm h-full">
                        <CardHeader className="border-b border-jupiter-charcoal">
                          <div className="flex justify-between items-center">
                            <div>
                              <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
                                {selectedWallet.name}
                              </CardTitle>
                              <CardDescription className="flex items-center space-x-2">
                                <span>{formatAddress(selectedWallet.address)}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => navigator.clipboard.writeText(selectedWallet.address)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </CardDescription>
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold">
                                {selectedWallet.balance} {selectedWallet.token}
                              </div>
                              <div className="text-muted-foreground">${selectedWallet.usdValue.toLocaleString()}</div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          <Tabs
                            defaultValue={walletActiveTab}
                            onValueChange={(value) => setWalletActiveTab(value)}
                            className="w-full"
                          >
                            <div className="border-b border-jupiter-charcoal">
                              <TabsList className="bg-transparent h-12 p-0 pl-4">
                                <TabsTrigger
                                  value="assets"
                                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-jupiter-nebula-blue data-[state=active]:text-jupiter-nebula-blue rounded-none h-12 text-jupiter-cloud hover:text-jupiter-nebula-blue"
                                >
                                  Assets
                                </TabsTrigger>
                                <TabsTrigger
                                  value="transactions"
                                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-jupiter-nebula-blue data-[state=active]:text-jupiter-nebula-blue rounded-none h-12 text-jupiter-cloud hover:text-jupiter-nebula-blue"
                                >
                                  Transactions
                                </TabsTrigger>
                                <TabsTrigger
                                  value="developer"
                                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-jupiter-nebula-blue data-[state=active]:text-jupiter-nebula-blue rounded-none h-12 text-jupiter-cloud hover:text-jupiter-nebula-blue"
                                >
                                  Developer
                                </TabsTrigger>
                              </TabsList>
                            </div>

                            <TabsContent value="assets" className="mt-0 p-4">
                              <div className="space-y-4">
                                {selectedWallet.tokens.map((token) => (
                                  <div
                                    key={token.symbol}
                                    className="flex justify-between items-center p-4 rounded-lg border border-jupiter-charcoal"
                                  >
                                    <div className="flex items-center space-x-3">
                                      <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                                        style={{
                                          backgroundColor:
                                            token.symbol === "ETH"
                                              ? "#627EEA"
                                              : token.symbol === "USDT"
                                                ? "#26A17B"
                                                : token.symbol === "LINK"
                                                  ? "#2A5ADA"
                                                  : token.symbol === "UNI"
                                                    ? "#FF007A"
                                                    : token.symbol === "stETH"
                                                      ? "#00A3FF"
                                                      : token.symbol === "BTC"
                                                        ? "#F7931A"
                                                        : `hsl(${(token.symbol.charCodeAt(0) * 10) % 360}, 70%, 60%)`,
                                          color: "#000",
                                        }}
                                      >
                                        {token.symbol.substring(0, 2)}
                                      </div>
                                      <div>
                                        <div className="font-medium">{token.name}</div>
                                        <div className="text-sm text-muted-foreground">{token.symbol}</div>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="font-medium">
                                        {token.balance} {token.symbol}
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <span className="text-sm text-muted-foreground">
                                          ${token.usdValue.toLocaleString()}
                                        </span>
                                        <span
                                          className={`text-xs ${token.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                                        >
                                          {token.change24h >= 0 ? "+" : ""}
                                          {token.change24h}%
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </TabsContent>

                            <TabsContent value="transactions" className="mt-0 p-4">
                              <div className="space-y-4">
                                {selectedWallet.transactions.length > 0 ? (
                                  selectedWallet.transactions.map((tx) => (
                                    <div
                                      key={tx.id}
                                      className="flex justify-between items-center p-4 rounded-lg border border-jupiter-charcoal"
                                    >
                                      <div className="flex items-center space-x-3">
                                        <div
                                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                            tx.type === "send"
                                              ? "bg-red-500/20"
                                              : tx.type === "receive"
                                                ? "bg-green-500/20"
                                                : tx.type === "swap"
                                                  ? "bg-yellow-500/20"
                                                  : tx.type === "stake"
                                                    ? "bg-blue-500/20"
                                                    : "bg-purple-500/20"
                                          }`}
                                        >
                                          {tx.type === "send" && <ArrowRight className="h-5 w-5 text-red-500" />}
                                          {tx.type === "receive" && (
                                            <ArrowDownRight className="h-5 w-5 text-green-500" />
                                          )}
                                          {tx.type === "swap" && <ArrowRight className="h-5 w-5 text-yellow-500" />}
                                          {tx.type === "stake" && <ArrowRight className="h-5 w-5 text-blue-500" />}
                                          {tx.type === "claim" && (
                                            <ArrowDownRight className="h-5 w-5 text-purple-500" />
                                          )}
                                        </div>
                                        <div>
                                          <div className="font-medium capitalize">{tx.type}</div>
                                          <div className="text-sm text-muted-foreground">
                                            {formatTimestamp(tx.timestamp)}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <div className="font-medium">
                                          {tx.type === "send"
                                            ? "-"
                                            : tx.type === "receive" || tx.type === "claim"
                                              ? "+"
                                              : ""}
                                          {tx.amount} {tx.token}
                                          {tx.type === "swap" && ` → ${tx.toAmount} ${tx.toToken}`}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                          Fee: {tx.fee} {tx.token}
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="text-center py-8">
                                    <p className="text-jupiter-steel">No transactions found</p>
                                  </div>
                                )}
                              </div>
                            </TabsContent>

                            <TabsContent value="developer" className="mt-0 p-4">
                              <div className="space-y-4">
                                <div className="p-4 rounded-lg border border-jupiter-charcoal">
                                  <h3 className="font-medium mb-2">Wallet Address</h3>
                                  <code className="block p-2 bg-jupiter-charcoal rounded text-sm overflow-x-auto">
                                    {selectedWallet.address}
                                  </code>
                                </div>
                                <div className="p-4 rounded-lg border border-jupiter-charcoal">
                                  <h3 className="font-medium mb-2">API Access</h3>
                                  <p className="text-sm text-jupiter-steel mb-4">
                                    Use the following API key to access this wallet programmatically.
                                  </p>
                                  <div className="flex items-center space-x-2">
                                    <code className="block p-2 bg-jupiter-charcoal rounded text-sm flex-1 overflow-x-auto">
                                      {`api_key_${selectedWallet.id}_${Math.random().toString(36).substring(2, 10)}`}
                                    </code>
                                    <Button variant="outline" size="sm">
                                      <Copy className="h-4 w-4 mr-1" /> Copy
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Wallet List */}
                    <div className="col-span-12 lg:col-span-4">
                      <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm h-full">
                        <CardHeader className="border-b border-jupiter-charcoal">
                          <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
                            <Wallet className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                            My Wallets
                          </CardTitle>
                          <CardDescription className="text-jupiter-steel">Manage your crypto wallets</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                          <ScrollArea className="h-[400px]">
                            <div className="p-4 space-y-4">
                              {wallets.map((wallet) => (
                                <div
                                  key={wallet.id}
                                  className={`p-4 rounded-lg border ${
                                    selectedWallet.id === wallet.id
                                      ? "border-jupiter-nebula-blue/50 bg-jupiter-charcoal/30"
                                      : "border-jupiter-charcoal hover:border-jupiter-nebula-blue/30"
                                  } transition-all cursor-pointer`}
                                  onClick={() => setSelectedWallet(wallet)}
                                >
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="font-medium text-jupiter-cloud flex items-center">
                                        {wallet.name}
                                        {wallet.isDefault && (
                                          <Badge className="ml-2 bg-jupiter-nebula-blue/20 text-jupiter-nebula-blue border-jupiter-nebula-blue/50">
                                            Default
                                          </Badge>
                                        )}
                                      </h3>
                                      <div className="text-xs text-jupiter-steel mt-1">
                                        {formatAddress(wallet.address)}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="font-medium">
                                        {wallet.balance} {wallet.token}
                                      </div>
                                      <div className="text-xs text-jupiter-steel">
                                        ${wallet.usdValue.toLocaleString()}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-3 flex justify-end space-x-2">
                                    {!wallet.isDefault && (
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-gunmetal"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleSetDefaultWallet(wallet.id)
                                        }}
                                      >
                                        Set Default
                                      </Button>
                                    )}
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-7 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-gunmetal"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setEditWalletId(wallet.id)
                                        setEditWalletName(wallet.name)
                                        setIsEditingWallet(true)
                                      }}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-7 bg-jupiter-charcoal border-jupiter-gunmetal text-red-400 hover:bg-jupiter-gunmetal hover:text-red-300"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleDeleteWallet(wallet.id)
                                      }}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              ))}

                              <Button
                                className="w-full bg-jupiter-charcoal hover:bg-jupiter-gunmetal text-jupiter-cloud border border-jupiter-gunmetal"
                                onClick={() => setIsAddingWallet(true)}
                              >
                                <Wallet className="mr-2 h-4 w-4" /> Add Wallet
                              </Button>

                              {isAddingWallet && (
                                <div className="p-4 rounded-lg border border-jupiter-charcoal bg-jupiter-charcoal/30">
                                  <h3 className="font-medium text-jupiter-cloud mb-3">Add New Wallet</h3>
                                  <div className="space-y-3">
                                    <div>
                                      <Label htmlFor="wallet-name" className="text-jupiter-cloud">
                                        Wallet Name
                                      </Label>
                                      <Input
                                        id="wallet-name"
                                        value={newWalletName}
                                        onChange={(e) => setNewWalletName(e.target.value)}
                                        className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="wallet-address" className="text-jupiter-cloud">
                                        Wallet Address
                                      </Label>
                                      <Input
                                        id="wallet-address"
                                        value={newWalletAddress}
                                        onChange={(e) => setNewWalletAddress(e.target.value)}
                                        className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                                      />
                                    </div>
                                    <div className="flex justify-end space-x-2 pt-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-gunmetal"
                                        onClick={() => setIsAddingWallet(false)}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        size="sm"
                                        className="bg-jupiter-nebula-blue hover:bg-jupiter-nebula-blue/80 text-jupiter-space-black"
                                        onClick={handleAddWallet}
                                        disabled={!newWalletName || !newWalletAddress}
                                      >
                                        Add Wallet
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {isEditingWallet && (
                                <div className="p-4 rounded-lg border border-jupiter-charcoal bg-jupiter-charcoal/30">
                                  <h3 className="font-medium text-jupiter-cloud mb-3">Edit Wallet</h3>
                                  <div className="space-y-3">
                                    <div>
                                      <Label htmlFor="edit-wallet-name" className="text-jupiter-cloud">
                                        Wallet Name
                                      </Label>
                                      <Input
                                        id="edit-wallet-name"
                                        value={editWalletName}
                                        onChange={(e) => setEditWalletName(e.target.value)}
                                        className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                                      />
                                    </div>
                                    <div className="flex justify-end space-x-2 pt-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-gunmetal"
                                        onClick={() => setIsEditingWallet(false)}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        size="sm"
                                        className="bg-jupiter-nebula-blue hover:bg-jupiter-nebula-blue/80 text-jupiter-space-black"
                                        onClick={handleEditWallet}
                                        disabled={!editWalletName}
                                      >
                                        Save Changes
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </ScrollArea>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* Create Tab */}
                <TabsContent value="create" className="mt-4">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12">
                      <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
                        <CardHeader className="border-b border-jupiter-charcoal">
                          <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
                            <Wallet className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                            Wallet Creator
                          </CardTitle>
                          <CardDescription className="text-jupiter-steel">
                            Generate new wallets for different blockchains
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="p-4 bg-jupiter-charcoal/30 rounded-lg border border-jupiter-charcoal">
                                <h3 className="text-jupiter-cloud font-medium mb-4">Configuration</h3>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="wallet-type" className="text-jupiter-cloud mb-2 block">
                                      Blockchain
                                    </Label>
                                    <select
                                      id="wallet-type"
                                      value={walletType}
                                      onChange={(e) => setWalletType(e.target.value)}
                                      className="w-full bg-jupiter-charcoal border border-jupiter-gunmetal rounded-md p-2 text-jupiter-cloud"
                                    >
                                      <option value="ethereum">Ethereum</option>
                                      <option value="solana">Solana</option>
                                      <option value="bitcoin">Bitcoin</option>
                                      <option value="polygon">Polygon</option>
                                      <option value="avalanche">Avalanche</option>
                                    </select>
                                  </div>
                                  <div>
                                    <Label htmlFor="wallet-count" className="text-jupiter-cloud mb-2 block">
                                      Number of Wallets
                                    </Label>
                                    <Input
                                      id="wallet-count"
                                      type="number"
                                      min="1"
                                      max="100"
                                      value={walletCount}
                                      onChange={(e) => setWalletCount(Number.parseInt(e.target.value))}
                                      className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="wallet-prefix" className="text-jupiter-cloud mb-2 block">
                                      Wallet Prefix (Optional)
                                    </Label>
                                    <Input
                                      id="wallet-prefix"
                                      placeholder="e.g., trading-bot"
                                      value={walletPrefix}
                                      onChange={(e) => setWalletPrefix(e.target.value)}
                                      className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="p-4 bg-jupiter-charcoal/30 rounded-lg border border-jupiter-charcoal">
                                <h3 className="text-jupiter-cloud font-medium mb-4">AI Wallet Generation</h3>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="wallet-prompt" className="text-jupiter-cloud mb-2 block">
                                      Generate from Prompt
                                    </Label>
                                    <Textarea
                                      id="wallet-prompt"
                                      placeholder="Describe the wallets you want to generate (e.g., 'Create 5 Ethereum wallets for a DeFi trading strategy')"
                                      value={walletPrompt}
                                      onChange={(e) => setWalletPrompt(e.target.value)}
                                      className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud min-h-[100px]"
                                    />
                                  </div>
                                  <Button
                                    onClick={generateWalletsFromPrompt}
                                    disabled={isGeneratingWallets || !walletPrompt}
                                    className="w-full bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black font-medium"
                                  >
                                    {isGeneratingWallets ? (
                                      <>
                                        <Sparkles className="mr-2 h-4 w-4 animate-pulse" /> Generating...
                                      </>
                                    ) : (
                                      <>
                                        <Sparkles className="mr-2 h-4 w-4" /> Generate from Prompt
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </div>

                              <Button
                                onClick={generateWallets}
                                disabled={isGeneratingWallets}
                                className="w-full bg-gradient-to-r from-jupiter-nebula-blue to-jupiter-cosmic-lime hover:from-jupiter-cosmic-lime hover:to-jupiter-nebula-blue text-jupiter-space-black font-medium"
                              >
                                {isGeneratingWallets ? (
                                  <>
                                    <Wallet className="mr-2 h-4 w-4 animate-pulse" /> Generating Wallets...
                                  </>
                                ) : (
                                  <>
                                    <Wallet className="mr-2 h-4 w-4" /> Generate Wallets
                                  </>
                                )}
                              </Button>
                            </div>

                            <div className="space-y-4">
                              <div className="p-4 bg-jupiter-charcoal/30 rounded-lg border border-jupiter-charcoal h-full">
                                <div className="flex justify-between items-center mb-4">
                                  <h3 className="text-jupiter-cloud font-medium">Generated Wallets</h3>
                                  {generatedWallets.length > 0 && (
                                    <div className="flex space-x-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-gunmetal"
                                        onClick={downloadWalletsAsJson}
                                      >
                                        Download JSON
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-gunmetal"
                                        onClick={downloadWalletsAsCsv}
                                      >
                                        Download CSV
                                      </Button>
                                    </div>
                                  )}
                                </div>

                                {generatedWallets.length > 0 ? (
                                  <div className="space-y-4">
                                    <div className="flex justify-end">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowPrivateKeys(!showPrivateKeys)}
                                        className="text-jupiter-steel hover:text-jupiter-cloud"
                                      >
                                        {showPrivateKeys ? "Hide Private Keys" : "Show Private Keys"}
                                      </Button>
                                    </div>
                                    <ScrollArea className="h-[300px] pr-4">
                                      <div className="space-y-3">
                                        {generatedWallets.map((wallet, index) => (
                                          <div
                                            key={index}
                                            className="p-3 rounded-lg border border-jupiter-charcoal bg-jupiter-charcoal/50"
                                          >
                                            <div className="flex justify-between items-center mb-2">
                                              <span className="text-jupiter-cloud font-medium">
                                                Wallet #{index + 1}
                                              </span>
                                              <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 text-jupiter-steel hover:text-jupiter-nebula-blue"
                                                onClick={() => navigator.clipboard.writeText(wallet.address)}
                                              >
                                                <Copy className="h-3 w-3" />
                                              </Button>
                                            </div>
                                            <div className="space-y-2">
                                              <div>
                                                <Label className="text-jupiter-steel text-xs">Address</Label>
                                                <code className="block p-1 bg-jupiter-space-black rounded text-xs overflow-x-auto text-jupiter-cloud">
                                                  {wallet.address}
                                                </code>
                                              </div>
                                              {showPrivateKeys && (
                                                <div>
                                                  <Label className="text-jupiter-steel text-xs">Private Key</Label>
                                                  <code className="block p-1 bg-jupiter-space-black rounded text-xs overflow-x-auto text-jupiter-cloud">
                                                    {wallet.privateKey}
                                                  </code>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </ScrollArea>
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center justify-center h-[300px]">
                                    <Wallet className="h-16 w-16 text-jupiter-steel mb-4" />
                                    <p className="text-jupiter-steel text-center">
                                      Configure and generate wallets using the options on the left
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* Tokens Tab */}
                <TabsContent value="tokens" className="mt-4">
                  <div className="grid grid-cols-12 gap-6">
                    {/* Token Creator */}
                    <div className="col-span-12 lg:col-span-8">
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
                              onClick={() => setTokenActiveSection(tokenActiveSection === "basic" ? null : "basic")}
                            >
                              <h3 className="text-jupiter-cloud font-medium">Basic Info</h3>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                {tokenActiveSection === "basic" ? (
                                  <ChevronUp className="h-5 w-5 text-jupiter-cloud" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-jupiter-cloud" />
                                )}
                              </Button>
                            </div>

                            {tokenActiveSection === "basic" && (
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
                              disabled={
                                isCreating || !tokenName || !tokenSymbol || !tokenSupply || remainingAllocation !== 0
                              }
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
                    </div>

                    {/* Token History */}
                    <div className="col-span-12 lg:col-span-4">
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
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </PageTemplate>
      <MatrixRain />
    </DashboardLayout>
  )
}
