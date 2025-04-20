"use client"

import { useState } from "react"
import { Wallet, Copy, Code, Play, Download, Save, RefreshCw, Plus, FileCode, Settings, Terminal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import DashboardLayout from "../dashboard-layout"
import { MatrixRain } from "../../matrix-rain"

// Mock data for wallets
const mockWallets = [
  {
    id: "wallet-1",
    name: "Main Trading Wallet",
    address: "0x1a2b...9s0t",
    balance: 12.45,
    token: "ETH",
    usdValue: 24890.45,
    isDefault: true,
    transactions: [],
    tokens: [
      { symbol: "ETH", name: "Ethereum", balance: 12.45, usdValue: 24890.45, change24h: 2.3 },
      { symbol: "USDT", name: "Tether", balance: 5000, usdValue: 5000, change24h: 0.01 },
      { symbol: "LINK", name: "Chainlink", balance: 150, usdValue: 1875, change24h: -1.2 },
    ],
  },
  {
    id: "wallet-2",
    name: "DeFi Investments",
    address: "0xa1b2...s9t0",
    balance: 5.78,
    token: "ETH",
    usdValue: 11560.78,
    isDefault: false,
    transactions: [],
    tokens: [],
  },
  {
    id: "wallet-3",
    name: "Cold Storage",
    address: "0xq1w2...l9z0",
    balance: 25.0,
    token: "ETH",
    usdValue: 50000.0,
    isDefault: false,
    transactions: [],
    tokens: [],
  },
]

// Mock data for trading scripts
const mockScripts = [
  {
    id: "script-1",
    name: "PERPS With TSL",
    description: "Perpetual Futures Trading with Trailing Stop Loss",
    category: "PERPETUALS",
    lastModified: "just now",
    status: "active",
    code: `// PERPS With TSL - Perpetual Futures Trading with Trailing Stop Loss
// This script implements a strategy for trading perpetual futures with trailing stop losses

import { Connection, Keypair } from '@solana/web3.js';
import { MarketDataService, RiskCalculator, Drainer } from './modules';

type Market = 'SOL' | 'ETH' | 'BTC';
type TimeFrame = '12H' | '24H';
type RiskLevel = 'low' | 'med' | 'high';
type PositionType = 'LONG' | 'SHORT' | 'HEDGE';

interface PositionConfig {
  amount: number;
  leverage: number;
  risk: RiskLevel;
  timeFrame: TimeFrame;
  trailingStop: number;
}

export class TradingEngine {
  private connection: Connection;
  private market: Market;
  private positions: Map<string, PositionConfig>;
  
  constructor(market: Market, keypair: Keypair) {
    this.connection = new Connection('https://api.mainnet-beta.solana.com');
    this.market = market;
    this.positions = new Map();
  }
  
  async openPosition(config: PositionConfig, type: PositionType): Promise<string> {
    // Implementation details
    const positionId = Date.now().toString();
    this.positions.set(positionId, config);
    return positionId;
  }
  
  async closePosition(positionId: string): Promise<boolean> {
    // Implementation details
    return this.positions.delete(positionId);
  }
  
  async updateTrailingStop(positionId: string, newStop: number): Promise<boolean> {
    const position = this.positions.get(positionId);
    if (!position) return false;
    
    position.trailingStop = newStop;
    this.positions.set(positionId, position);
    return true;
  }
}`,
  },
  {
    id: "script-2",
    name: "SOL/USDC Arbitrage",
    description: "Arbitrage between SOL/USDC markets",
    category: "ARBITRAGE",
    lastModified: "2 hours ago",
    status: "active",
    code: "// SOL/USDC Arbitrage\n// Implementation details...",
  },
  {
    id: "script-3",
    name: "JUP Token Accumulator",
    description: "Accumulate JUP tokens over time",
    category: "ACCUMULATION",
    lastModified: "1 day ago",
    status: "inactive",
    code: "// JUP Token Accumulator\n// Implementation details...",
  },
  {
    id: "script-4",
    name: "Market Volatility Trader",
    description: "Trade based on market volatility",
    category: "VOLATILITY",
    lastModified: "3 days ago",
    status: "active",
    code: "// Market Volatility Trader\n// Implementation details...",
  },
  {
    id: "script-5",
    name: "Limit Order Bot",
    description: "Automated limit order placement",
    category: "ORDERS",
    lastModified: "5 days ago",
    status: "active",
    code: "// Limit Order Bot\n// Implementation details...",
  },
  {
    id: "script-6",
    name: "DCA Strategy",
    description: "Dollar Cost Averaging strategy",
    category: "STRATEGY",
    lastModified: "1 week ago",
    status: "inactive",
    code: "// DCA Strategy\n// Implementation details...",
  },
]

export default function TradingWalletPage() {
  const [activeTab, setActiveTab] = useState("wallets")
  const [selectedWallet, setSelectedWallet] = useState(mockWallets[0])
  const [walletTab, setWalletTab] = useState("assets")
  const [isEditingWallet, setIsEditingWallet] = useState(false)
  const [editWalletId, setEditWalletId] = useState("")
  const [editWalletName, setEditWalletName] = useState("")

  // Script state
  const [selectedScript, setSelectedScript] = useState(mockScripts[0])
  const [scriptTab, setScriptTab] = useState("editor")
  const [searchQuery, setSearchQuery] = useState("")
  const [executionLogs, setExecutionLogs] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)

  // Handle editing a wallet
  const handleEditWallet = () => {
    if (!editWalletName) return

    // In a real app, this would update the wallet in the database
    console.log(`Editing wallet ${editWalletId} to name ${editWalletName}`)

    setIsEditingWallet(false)
    setEditWalletId("")
    setEditWalletName("")
  }

  // Handle setting a wallet as default
  const handleSetDefaultWallet = (walletId: string) => {
    // In a real app, this would update the default wallet in the database
    console.log(`Setting wallet ${walletId} as default`)
  }

  // Handle deleting a wallet
  const handleDeleteWallet = (walletId: string) => {
    // In a real app, this would delete the wallet from the database
    console.log(`Deleting wallet ${walletId}`)
  }

  // Handle running a script
  const handleRunScript = () => {
    setIsRunning(true)
    setExecutionLogs([])

    // Simulate script execution
    setTimeout(() => {
      setExecutionLogs([
        "Initializing connection to Solana mainnet...",
        "Connection established",
        "Loading market data for SOL/USDC...",
        "Market data loaded",
        "Analyzing price patterns...",
        "Found potential entry point at $134.85",
        "Calculating position size based on risk parameters...",
        "Recommended position: 2.5 SOL with 3x leverage",
        "Setting trailing stop at 3% below entry",
        "Ready to execute trade",
        "Waiting for confirmation...",
      ])
      setIsRunning(false)
    }, 2000)
  }

  // Filter scripts based on search query
  const filteredScripts = mockScripts.filter(
    (script) =>
      script.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      script.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 relative z-10">
        <div className="flex items-center justify-between mb-6 pt-4">
          {activeTab === "wallets" ? (
            <h1 className="text-2xl font-syne text-jupiter-cloud flex items-center relative z-20">
              <Wallet className="mr-2 h-6 w-6 text-jupiter-nebula-blue" />
              Wallet Manager
            </h1>
          ) : (
            <h1 className="text-2xl font-syne text-jupiter-cloud flex items-center relative z-20">
              <Code className="mr-2 h-6 w-6 text-jupiter-nebula-blue" />
              Strats
            </h1>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="bg-jupiter-charcoal h-8">
              <TabsTrigger value="wallets" className="px-3 py-1 text-xs h-6">
                Wallets
              </TabsTrigger>
              <TabsTrigger value="scripts" className="px-3 py-1 text-xs h-6">
                Scripts
              </TabsTrigger>
              <TabsTrigger value="strategy" className="px-3 py-1 text-xs h-6">
                Strategy Creator
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {activeTab === "wallets" && (
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
                        <span>{selectedWallet.address}</span>
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
                  <Tabs value={walletTab} onValueChange={setWalletTab} className="w-full">
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
                                <span className={`text-xs ${token.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
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
                      <div className="flex flex-col items-center justify-center h-[300px]">
                        <p className="text-jupiter-steel">No transactions found</p>
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
                  <ScrollArea className="h-[500px]">
                    <div className="p-4 space-y-4">
                      {mockWallets.map((wallet) => (
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
                              <div className="text-xs text-jupiter-steel mt-1">{wallet.address}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                {wallet.balance} {wallet.token}
                              </div>
                              <div className="text-xs text-jupiter-steel">${wallet.usdValue.toLocaleString()}</div>
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
                <CardFooter className="border-t border-jupiter-charcoal p-4">
                  <Button className="w-full bg-jupiter-charcoal hover:bg-jupiter-gunmetal text-jupiter-cloud border border-jupiter-gunmetal">
                    <Plus className="mr-2 h-4 w-4" /> Add Wallet
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "scripts" && (
          <div className="grid grid-cols-12 gap-6">
            {/* Script Editor */}
            <div className="col-span-12 lg:col-span-8">
              <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm h-full">
                <CardHeader className="border-b border-jupiter-charcoal">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FileCode className="h-5 w-5 text-jupiter-nebula-blue mr-2" />
                      <CardTitle className="text-jupiter-cloud text-base font-syne">{selectedScript.name}</CardTitle>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">READY</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Tabs value={scriptTab} onValueChange={setScriptTab} className="w-full">
                    <div className="border-b border-jupiter-charcoal">
                      <TabsList className="bg-transparent h-12 p-0 pl-4">
                        <TabsTrigger
                          value="editor"
                          className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-jupiter-nebula-blue data-[state=active]:text-jupiter-nebula-blue rounded-none h-12 text-jupiter-cloud hover:text-jupiter-nebula-blue"
                        >
                          Editor
                        </TabsTrigger>
                        <TabsTrigger
                          value="logs"
                          className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-jupiter-nebula-blue data-[state=active]:text-jupiter-nebula-blue rounded-none h-12 text-jupiter-cloud hover:text-jupiter-nebula-blue"
                        >
                          Execution Logs
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="editor" className="mt-0">
                      <div className="p-0 font-mono text-sm">
                        <pre className="bg-jupiter-space-black p-4 overflow-auto h-[400px] text-jupiter-cloud">
                          <code>{selectedScript.code}</code>
                        </pre>
                      </div>
                      <div className="p-4 border-t border-jupiter-charcoal flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                        >
                          <Settings className="h-4 w-4 mr-1" /> Config
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                        >
                          <Terminal className="h-4 w-4 mr-1" /> Connect
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="logs" className="mt-0">
                      <div className="p-0 font-mono text-sm">
                        <div className="bg-jupiter-space-black p-4 overflow-auto h-[400px] text-jupiter-cloud">
                          {executionLogs.length > 0 ? (
                            <div className="space-y-1">
                              {executionLogs.map((log, index) => (
                                <div key={index} className="text-xs">
                                  <span className="text-jupiter-nebula-blue">[{new Date().toLocaleTimeString()}]</span>{" "}
                                  {log}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-jupiter-steel text-xs italic">
                              No logs yet. Run a test to see execution logs.
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="p-4 border-t border-jupiter-charcoal flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="border-t border-jupiter-charcoal p-4 flex justify-between">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                    >
                      <Copy className="h-4 w-4 mr-1" /> Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                    >
                      <Save className="h-4 w-4 mr-1" /> Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                    >
                      <Download className="h-4 w-4 mr-1" /> Export
                    </Button>
                  </div>
                  <Button
                    className="bg-jupiter-nebula-blue hover:bg-jupiter-nebula-blue/80 text-jupiter-space-black"
                    onClick={handleRunScript}
                    disabled={isRunning}
                  >
                    {isRunning ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Running...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" /> Run Test
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Script Library */}
            <div className="col-span-12 lg:col-span-4">
              <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm h-full">
                <CardHeader className="border-b border-jupiter-charcoal">
                  <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
                    <FileCode className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                    Script Library
                  </CardTitle>
                  <div className="mt-2">
                    <Input
                      placeholder="Search scripts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <div className="p-4 space-y-6">
                      {/* PERPETUALS */}
                      <div>
                        <h3 className="text-xs text-jupiter-steel mb-2 px-2">PERPETUALS</h3>
                        {filteredScripts
                          .filter((script) => script.category === "PERPETUALS")
                          .map((script) => (
                            <div
                              key={script.id}
                              className={`p-3 rounded-lg border ${
                                selectedScript.id === script.id
                                  ? "border-jupiter-nebula-blue/50 bg-jupiter-charcoal/30"
                                  : "border-jupiter-charcoal hover:border-jupiter-nebula-blue/30"
                              } transition-all cursor-pointer mb-2`}
                              onClick={() => setSelectedScript(script)}
                            >
                              <div className="flex items-start">
                                <FileCode className="h-4 w-4 text-jupiter-nebula-blue mt-0.5 mr-2" />
                                <div>
                                  <h4 className="text-sm font-medium text-jupiter-cloud">{script.name}</h4>
                                  <div className="flex items-center mt-1">
                                    <span className="text-xs text-jupiter-steel">Modified {script.lastModified}</span>
                                    <Badge
                                      className={`ml-2 ${
                                        script.status === "active"
                                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                                          : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                                      }`}
                                    >
                                      {script.status}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>

                      {/* ARBITRAGE */}
                      <div>
                        <h3 className="text-xs text-jupiter-steel mb-2 px-2">ARBITRAGE</h3>
                        {filteredScripts
                          .filter((script) => script.category === "ARBITRAGE")
                          .map((script) => (
                            <div
                              key={script.id}
                              className={`p-3 rounded-lg border ${
                                selectedScript.id === script.id
                                  ? "border-jupiter-nebula-blue/50 bg-jupiter-charcoal/30"
                                  : "border-jupiter-charcoal hover:border-jupiter-nebula-blue/30"
                              } transition-all cursor-pointer mb-2`}
                              onClick={() => setSelectedScript(script)}
                            >
                              <div className="flex items-start">
                                <FileCode className="h-4 w-4 text-jupiter-nebula-blue mt-0.5 mr-2" />
                                <div>
                                  <h4 className="text-sm font-medium text-jupiter-cloud">{script.name}</h4>
                                  <div className="flex items-center mt-1">
                                    <span className="text-xs text-jupiter-steel">Modified {script.lastModified}</span>
                                    <Badge
                                      className={`ml-2 ${
                                        script.status === "active"
                                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                                          : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                                      }`}
                                    >
                                      {script.status}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>

                      {/* Other categories */}
                      {["ACCUMULATION", "VOLATILITY", "ORDERS", "STRATEGY"].map((category) => (
                        <div key={category}>
                          <h3 className="text-xs text-jupiter-steel mb-2 px-2">{category}</h3>
                          {filteredScripts
                            .filter((script) => script.category === category)
                            .map((script) => (
                              <div
                                key={script.id}
                                className={`p-3 rounded-lg border ${
                                  selectedScript.id === script.id
                                    ? "border-jupiter-nebula-blue/50 bg-jupiter-charcoal/30"
                                    : "border-jupiter-charcoal hover:border-jupiter-nebula-blue/30"
                                } transition-all cursor-pointer mb-2`}
                                onClick={() => setSelectedScript(script)}
                              >
                                <div className="flex items-start">
                                  <FileCode className="h-4 w-4 text-jupiter-nebula-blue mt-0.5 mr-2" />
                                  <div>
                                    <h4 className="text-sm font-medium text-jupiter-cloud">{script.name}</h4>
                                    <div className="flex items-center mt-1">
                                      <span className="text-xs text-jupiter-steel">Modified {script.lastModified}</span>
                                      <Badge
                                        className={`ml-2 ${
                                          script.status === "active"
                                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                                            : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                                        }`}
                                      >
                                        {script.status}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="border-t border-jupiter-charcoal p-4">
                  <Button className="w-full bg-jupiter-charcoal hover:bg-jupiter-gunmetal text-jupiter-cloud border border-jupiter-gunmetal">
                    <Plus className="mr-2 h-4 w-4" /> New Script
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "strategy" && (
          <div className="flex items-center justify-center h-[600px]">
            <div className="text-center">
              <Code className="h-16 w-16 text-jupiter-nebula-blue mb-4 mx-auto" />
              <h2 className="text-xl font-syne text-jupiter-cloud mb-2">Strategy Creator</h2>
              <p className="text-jupiter-steel max-w-md">
                Create custom trading strategies with our visual strategy builder. Coming soon in the next update.
              </p>
            </div>
          </div>
        )}
      </div>
      <MatrixRain />
    </DashboardLayout>
  )
}
