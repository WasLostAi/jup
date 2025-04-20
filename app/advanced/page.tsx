"use client"

import { useState } from "react"
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
import { MatrixRain } from "../../matrix-rain"

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

export default function AdvancedPage() {
  const [activeTab, setActiveTab] = useState("create")

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
    <div className="container mx-auto p-4 relative z-10">
      <div className="mb-6">
        <p className="text-jupiter-steel">Develop, test, and deploy advanced token features</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto mb-6">
        <TabsList className="bg-jupiter-charcoal h-8">
          <TabsTrigger value="create" className="px-3 py-1 text-xs h-6">
            Create
          </TabsTrigger>
          <TabsTrigger value="tokens" className="px-3 py-1 text-xs h-6">
            Tokens
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {activeTab === "create" && (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
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
          </div>
        </div>
      )}

      {activeTab === "tokens" && (
        <div className="grid grid-cols-12 gap-6">
          {/* Token History */}
          <div className="col-span-12">
            <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm h-full">
              <CardHeader className="border-b border-jupiter-charcoal">
                <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
                  <Coins className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                  Token History
                </CardTitle>
                <CardDescription className="text-jupiter-steel">Previously created tokens</CardDescription>
              </CardHeader>

              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
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
      )}
      <MatrixRain />
    </div>
  )
}
