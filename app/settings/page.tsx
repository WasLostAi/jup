"use client"

import { useState } from "react"
import { Save, RefreshCw, Shield, Bell, Moon, Zap, ExternalLink } from "lucide-react"
import DashboardLayout from "../dashboard-layout"
import { PageTemplate } from "../components/page-template"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [autoTrading, setAutoTrading] = useState(false)
  const [highPerformance, setHighPerformance] = useState(true)
  const [apiKey, setApiKey] = useState("jup_dev_1234567890abcdef")
  const [rpcEndpoint, setRpcEndpoint] = useState("https://api.mainnet-beta.solana.com")
  const [tradingViewUsername, setTradingViewUsername] = useState("")
  const [tradingViewPassword, setTradingViewPassword] = useState("")
  const [tradingViewApiKey, setTradingViewApiKey] = useState("")
  const [tradingViewChartSettings, setTradingViewChartSettings] = useState("")

  return (
    <DashboardLayout>
      <PageTemplate description="Configure system preferences, connections, and trading parameters.">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="bg-jupiter-charcoal p-1 mb-4">
            <TabsTrigger
              value="general"
              className="data-[state=active]:bg-jupiter-gunmetal data-[state=active]:text-jupiter-nebula-blue text-jupiter-cloud hover:bg-jupiter-meteorite"
            >
              General
            </TabsTrigger>
            <TabsTrigger
              value="trading"
              className="data-[state=active]:bg-jupiter-gunmetal data-[state=active]:text-jupiter-nebula-blue text-jupiter-cloud hover:bg-jupiter-meteorite"
            >
              Trading
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-jupiter-gunmetal data-[state=active]:text-jupiter-nebula-blue text-jupiter-cloud hover:bg-jupiter-meteorite"
            >
              Security
            </TabsTrigger>
            <TabsTrigger
              value="api"
              className="data-[state=active]:bg-jupiter-gunmetal data-[state=active]:text-jupiter-nebula-blue text-jupiter-cloud hover:bg-jupiter-meteorite"
            >
              API
            </TabsTrigger>
            <TabsTrigger
              value="tradingview"
              className="data-[state=active]:bg-jupiter-gunmetal data-[state=active]:text-jupiter-nebula-blue text-jupiter-cloud hover:bg-jupiter-meteorite"
            >
              TradingView
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-jupiter-nebula-blue font-syne text-lg">Appearance</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Moon className="text-jupiter-nebula-blue mr-2 h-4 w-4" />
                    <Label className="text-sm text-jupiter-cloud">Dark Mode</Label>
                  </div>
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={setIsDarkMode}
                    className="data-[state=checked]:bg-jupiter-trifid-teal"
                  />
                </div>

                <div>
                  <Label htmlFor="theme" className="text-sm text-jupiter-cloud mb-1 block">
                    Color Theme
                  </Label>
                  <Select defaultValue="default">
                    <SelectTrigger
                      id="theme"
                      className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                    >
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="blue">Blue Focus</SelectItem>
                      <SelectItem value="green">Green Focus</SelectItem>
                      <SelectItem value="purple">Purple Focus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="language" className="text-sm text-jupiter-cloud mb-1 block">
                    Language
                  </Label>
                  <Select defaultValue="en">
                    <SelectTrigger
                      id="language"
                      className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                    >
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-jupiter-nebula-blue font-syne text-lg">Notifications</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Bell className="text-jupiter-nebula-blue mr-2 h-4 w-4" />
                    <Label className="text-sm text-jupiter-cloud">Enable Notifications</Label>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                    className="data-[state=checked]:bg-jupiter-trifid-teal"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm text-jupiter-cloud">Trade Execution Alerts</Label>
                  <Switch defaultChecked className="data-[state=checked]:bg-jupiter-trifid-teal" />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm text-jupiter-cloud">Price Movement Alerts</Label>
                  <Switch defaultChecked className="data-[state=checked]:bg-jupiter-trifid-teal" />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm text-jupiter-cloud">Security Alerts</Label>
                  <Switch defaultChecked className="data-[state=checked]:bg-jupiter-trifid-teal" />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm text-jupiter-cloud">System Updates</Label>
                  <Switch defaultChecked className="data-[state=checked]:bg-jupiter-trifid-teal" />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black">
                <Save className="h-4 w-4 mr-1" /> Save Settings
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="trading" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-jupiter-nebula-blue font-syne text-lg">Trading Preferences</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Zap className="text-jupiter-nebula-blue mr-2 h-4 w-4" />
                    <Label className="text-sm text-jupiter-cloud">Auto Trading</Label>
                  </div>
                  <Switch
                    checked={autoTrading}
                    onCheckedChange={setAutoTrading}
                    className="data-[state=checked]:bg-jupiter-trifid-teal"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm text-jupiter-cloud">High Performance Mode</Label>
                  <Switch
                    checked={highPerformance}
                    onCheckedChange={setHighPerformance}
                    className="data-[state=checked]:bg-jupiter-trifid-teal"
                  />
                </div>

                <div>
                  <Label htmlFor="slippage" className="text-sm text-jupiter-cloud mb-1 block">
                    Default Slippage Tolerance
                  </Label>
                  <Select defaultValue="0.5">
                    <SelectTrigger
                      id="slippage"
                      className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                    >
                      <SelectValue placeholder="Select slippage" />
                    </SelectTrigger>
                    <SelectContent className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud">
                      <SelectItem value="0.1">0.1%</SelectItem>
                      <SelectItem value="0.5">0.5%</SelectItem>
                      <SelectItem value="1.0">1.0%</SelectItem>
                      <SelectItem value="2.0">2.0%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="timeout" className="text-sm text-jupiter-cloud mb-1 block">
                    Transaction Timeout (seconds)
                  </Label>
                  <Input
                    id="timeout"
                    type="number"
                    defaultValue={30}
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-jupiter-nebula-blue font-syne text-lg">Risk Management</h3>

                <div>
                  <Label htmlFor="max-trade" className="text-sm text-jupiter-cloud mb-1 block">
                    Maximum Trade Size (SOL)
                  </Label>
                  <Input
                    id="max-trade"
                    type="number"
                    defaultValue={1.0}
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                  />
                </div>

                <div>
                  <Label htmlFor="daily-limit" className="text-sm text-jupiter-cloud mb-1 block">
                    Daily Trading Limit (USD)
                  </Label>
                  <Input
                    id="daily-limit"
                    type="number"
                    defaultValue={1000}
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="risk-level" className="text-sm text-jupiter-cloud">
                      Risk Level
                    </Label>
                    <span className="text-sm text-jupiter-nebula-blue">Medium</span>
                  </div>
                  <Slider defaultValue={[50]} max={100} step={10} className="w-full" />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm text-jupiter-cloud">Stop Loss Protection</Label>
                  <Switch defaultChecked className="data-[state=checked]:bg-jupiter-trifid-teal" />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black">
                <Save className="h-4 w-4 mr-1" /> Save Settings
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-jupiter-nebula-blue font-syne text-lg">Security Settings</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="text-jupiter-nebula-blue mr-2 h-4 w-4" />
                    <Label className="text-sm text-jupiter-cloud">Two-Factor Authentication</Label>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-jupiter-trifid-teal" />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm text-jupiter-cloud">Session Timeout</Label>
                  <Switch defaultChecked className="data-[state=checked]:bg-jupiter-trifid-teal" />
                </div>

                <div>
                  <Label htmlFor="timeout-duration" className="text-sm text-jupiter-cloud mb-1 block">
                    Session Timeout Duration (minutes)
                  </Label>
                  <Input
                    id="timeout-duration"
                    type="number"
                    defaultValue={30}
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm text-jupiter-cloud">IP Whitelisting</Label>
                  <Switch defaultChecked className="data-[state=checked]:bg-jupiter-trifid-teal" />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-jupiter-nebula-blue font-syne text-lg">Access Control</h3>

                <div>
                  <Label htmlFor="current-password" className="text-sm text-jupiter-cloud mb-1 block">
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                  />
                </div>

                <div>
                  <Label htmlFor="new-password" className="text-sm text-jupiter-cloud mb-1 block">
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                  />
                </div>

                <div>
                  <Label htmlFor="confirm-password" className="text-sm text-jupiter-cloud mb-1 block">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                  />
                </div>

                <Button className="w-full bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite">
                  Change Password
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black">
                <Save className="h-4 w-4 mr-1" /> Save Settings
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-jupiter-nebula-blue font-syne text-lg">API Configuration</h3>

                <div>
                  <Label htmlFor="api-key" className="text-sm text-jupiter-cloud mb-1 block">
                    API Key
                  </Label>
                  <div className="flex">
                    <Input
                      id="api-key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud flex-1"
                    />
                    <Button className="ml-2 bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="rpc-endpoint" className="text-sm text-jupiter-cloud mb-1 block">
                    RPC Endpoint
                  </Label>
                  <Input
                    id="rpc-endpoint"
                    value={rpcEndpoint}
                    onChange={(e) => setRpcEndpoint(e.target.value)}
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                  />
                </div>

                <div>
                  <Label htmlFor="network" className="text-sm text-jupiter-cloud mb-1 block">
                    Network
                  </Label>
                  <Select defaultValue="mainnet">
                    <SelectTrigger
                      id="network"
                      className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                    >
                      <SelectValue placeholder="Select network" />
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

              <div className="space-y-4">
                <h3 className="text-jupiter-nebula-blue font-syne text-lg">Rate Limits</h3>

                <div className="bg-jupiter-charcoal/30 p-4 rounded-md border border-jupiter-gunmetal">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-jupiter-cloud">API Requests</div>
                    <div className="text-sm text-jupiter-nebula-blue">120/min</div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-jupiter-cloud">Trades</div>
                    <div className="text-sm text-jupiter-nebula-blue">60/min</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-jupiter-cloud">Data Queries</div>
                    <div className="text-sm text-jupiter-nebula-blue">240/min</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm text-jupiter-cloud">Rate Limit Notifications</Label>
                  <Switch defaultChecked className="data-[state=checked]:bg-jupiter-trifid-teal" />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm text-jupiter-cloud">Auto-throttling</Label>
                  <Switch defaultChecked className="data-[state=checked]:bg-jupiter-trifid-teal" />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black">
                <Save className="h-4 w-4 mr-1" /> Save Settings
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="tradingview" className="space-y-6">
            <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
                  <ExternalLink className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                  TradingView Integration
                </CardTitle>
                <CardDescription className="text-jupiter-steel">
                  Connect your TradingView account to enable advanced charting features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tradingview-username" className="text-sm text-jupiter-cloud mb-1 block">
                        TradingView Username
                      </Label>
                      <Input
                        id="tradingview-username"
                        value={tradingViewUsername}
                        onChange={(e) => setTradingViewUsername(e.target.value)}
                        className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tradingview-password" className="text-sm text-jupiter-cloud mb-1 block">
                        TradingView Password
                      </Label>
                      <Input
                        id="tradingview-password"
                        type="password"
                        value={tradingViewPassword}
                        onChange={(e) => setTradingViewPassword(e.target.value)}
                        className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tradingview-api-key" className="text-sm text-jupiter-cloud mb-1 block">
                        TradingView API Key (if applicable)
                      </Label>
                      <Input
                        id="tradingview-api-key"
                        value={tradingViewApiKey}
                        onChange={(e) => setTradingViewApiKey(e.target.value)}
                        className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tradingview-chart-settings" className="text-sm text-jupiter-cloud mb-1 block">
                        Default Chart Settings (JSON)
                      </Label>
                      <Textarea
                        id="tradingview-chart-settings"
                        value={tradingViewChartSettings}
                        onChange={(e) => setTradingViewChartSettings(e.target.value)}
                        className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud min-h-[150px]"
                        placeholder='{"theme":"dark","studies":["RSI","MACD"],"interval":"60"}'
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-jupiter-cloud">Save Chart Layouts</Label>
                      <Switch defaultChecked className="data-[state=checked]:bg-jupiter-trifid-teal" />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label className="text-sm text-jupiter-cloud">Sync Indicators</Label>
                      <Switch defaultChecked className="data-[state=checked]:bg-jupiter-trifid-teal" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-jupiter-charcoal">
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud hover:bg-jupiter-meteorite"
                    >
                      Test Connection
                    </Button>
                    <Button className="bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black">
                      <Save className="h-4 w-4 mr-1" /> Save TradingView Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </PageTemplate>
    </DashboardLayout>
  )
}
