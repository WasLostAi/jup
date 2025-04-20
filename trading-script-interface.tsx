"use client"

import type React from "react"

import { useState } from "react"
import { Copy, Play, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface TradingScriptInterfaceProps {
  className?: string
}

export const TradingScriptInterface: React.FC<TradingScriptInterfaceProps> = ({ className = "" }) => {
  const [scriptName, setScriptName] = useState("New Trading Script")
  const [scriptContent, setScriptContent] = useState(`// Jupiter Trading Script Example
// This is a sample script that demonstrates how to interact with Jupiter API

async function executeTradeStrategy() {
  // Connect to Jupiter API
  const jupiterClient = await connectToJupiter();
  
  // Set trading parameters
  const inputToken = "SOL";
  const outputToken = "USDC";
  const amount = 1.0; // Amount to trade
  
  // Get route quotes
  const routes = await jupiterClient.getRoutes({
    inputMint: inputToken,
    outputMint: outputToken,
    amount,
    slippageBps: 50, // 0.5% slippage
  });
  
  // Execute the best route
  if (routes && routes.length > 0) {
    const bestRoute = routes[0];
    const result = await jupiterClient.exchange({
      route: bestRoute,
    });
    
    return {
      success: true,
      txId: result.txid,
      inputAmount: amount,
      outputAmount: bestRoute.outAmount,
    };
  }
  
  return {
    success: false,
    error: "No routes found",
  };
}

// Execute the strategy
executeTradeStrategy()
  .then(result => console.log("Trade result:", result))
  .catch(error => console.error("Trade failed:", error));
`)
  const [isSecureMode, setIsSecureMode] = useState(true)
  const [isTestMode, setIsTestMode] = useState(true)
  const [logs, setLogs] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [scriptStatus, setScriptStatus] = useState<"idle" | "running" | "success" | "error">("idle")

  const runScript = () => {
    if (isRunning) return

    setIsRunning(true)
    setScriptStatus("running")
    setLogs([])

    // Add initial logs
    addLog("Initializing Jupiter Trading Script...")
    addLog(`Secure Mode: ${isSecureMode ? "Enabled" : "Disabled"}`)
    addLog(`Test Mode: ${isTestMode ? "Enabled" : "Disabled"}`)

    // Simulate script execution
    setTimeout(() => {
      addLog("Connecting to Jupiter API...")
    }, 1000)

    setTimeout(() => {
      addLog("Setting up trading parameters...")
    }, 2000)

    setTimeout(() => {
      addLog("Fetching route quotes for SOL → USDC...")
    }, 3000)

    setTimeout(() => {
      if (isTestMode) {
        addLog("TEST MODE: Simulating trade execution...")
        setTimeout(() => {
          addLog("TEST MODE: Trade simulation completed successfully")
          addLog("TEST MODE: Would have traded 1.0 SOL for approximately 68.42 USDC")
          setScriptStatus("success")
          setIsRunning(false)
        }, 2000)
      } else if (isSecureMode) {
        addLog("SECURE MODE: Real trading with safety limits enabled")
        addLog("SECURE MODE: Maximum trade size limited to 0.1 SOL")
        setTimeout(() => {
          const random = Math.random()
          if (random > 0.3) {
            addLog("Trade executed successfully!")
            addLog("Traded 0.1 SOL for 6.84 USDC")
            addLog("Transaction ID: 5KtPn1LGuxhFLF2c7tEcqRfZNHZ7xKKNsZznW9AKRd7vVrw...")
            setScriptStatus("success")
          } else {
            addLog("ERROR: Slippage tolerance exceeded")
            addLog("Trade aborted to protect funds")
            setScriptStatus("error")
          }
          setIsRunning(false)
        }, 3000)
      } else {
        addLog("WARNING: Running in UNSAFE mode with no protections")
        setTimeout(() => {
          const random = Math.random()
          if (random > 0.5) {
            addLog("Trade executed successfully!")
            addLog("Traded 1.0 SOL for 68.42 USDC")
            addLog("Transaction ID: 5KtPn1LGuxhFLF2c7tEcqRfZNHZ7xKKNsZznW9AKRd7vVrw...")
            setScriptStatus("success")
          } else {
            addLog("ERROR: Transaction failed")
            addLog("Possible reasons: insufficient funds, high slippage, or network error")
            setScriptStatus("error")
          }
          setIsRunning(false)
        }, 3000)
      }
    }, 4000)
  }

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`])
  }

  const copyScript = () => {
    navigator.clipboard.writeText(scriptContent)
  }

  const saveScript = () => {
    // In a real app, this would save to a database or file
    addLog(`Script "${scriptName}" saved successfully`)
  }

  return (
    <Card className={`bg-jupiter-meteorite border-jupiter-charcoal ${className}`}>
      <CardHeader className="border-b border-jupiter-charcoal pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-jupiter-cloud flex items-center font-syne">
            <div className="mr-2 h-5 w-5 text-jupiter-nebula-blue">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                <path d="m10 13-2 2 2 2" />
                <path d="m14 17 2-2-2-2" />
              </svg>
            </div>
            Trading Script Editor
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className={`${
                scriptStatus === "idle"
                  ? "bg-jupiter-gunmetal text-jupiter-cloud"
                  : scriptStatus === "running"
                    ? "bg-jupiter-helix-cyan/20 text-jupiter-helix-cyan border-jupiter-helix-cyan/50"
                    : scriptStatus === "success"
                      ? "bg-jupiter-cosmic-lime/20 text-jupiter-cosmic-lime border-jupiter-cosmic-lime/50"
                      : "bg-red-500/20 text-red-400 border-red-500/50"
              } text-xs`}
            >
              <div
                className={`h-1.5 w-1.5 rounded-full mr-1 ${
                  scriptStatus === "idle"
                    ? "bg-jupiter-steel"
                    : scriptStatus === "running"
                      ? "bg-jupiter-helix-cyan animate-pulse"
                      : scriptStatus === "success"
                        ? "bg-jupiter-cosmic-lime"
                        : "bg-red-500"
                }`}
              ></div>
              {scriptStatus === "idle"
                ? "READY"
                : scriptStatus === "running"
                  ? "RUNNING"
                  : scriptStatus === "success"
                    ? "SUCCESS"
                    : "ERROR"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4 flex items-center space-x-4">
          <div className="flex-1">
            <Label htmlFor="script-name" className="text-xs text-jupiter-steel mb-1 block">
              Script Name
            </Label>
            <Input
              id="script-name"
              value={scriptName}
              onChange={(e) => setScriptName(e.target.value)}
              className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="secure-mode"
                checked={isSecureMode}
                onCheckedChange={setIsSecureMode}
                className="data-[state=checked]:bg-jupiter-trifid-teal"
              />
              <Label htmlFor="secure-mode" className="text-sm text-jupiter-cloud">
                Secure Mode
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="test-mode"
                checked={isTestMode}
                onCheckedChange={setIsTestMode}
                className="data-[state=checked]:bg-jupiter-aurora-green"
              />
              <Label htmlFor="test-mode" className="text-sm text-jupiter-cloud">
                Test Mode
              </Label>
            </div>
          </div>
        </div>

        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="bg-jupiter-charcoal p-1 mb-4">
            <TabsTrigger
              value="editor"
              className="data-[state=active]:bg-jupiter-gunmetal data-[state=active]:text-jupiter-nebula-blue text-jupiter-cloud hover:bg-jupiter-meteorite"
            >
              Script Editor
            </TabsTrigger>
            <TabsTrigger
              value="logs"
              className="data-[state=active]:bg-jupiter-gunmetal data-[state=active]:text-jupiter-nebula-blue text-jupiter-cloud hover:bg-jupiter-meteorite"
            >
              Execution Logs
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-jupiter-gunmetal data-[state=active]:text-jupiter-nebula-blue text-jupiter-cloud hover:bg-jupiter-meteorite"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="mt-0">
            <Textarea
              value={scriptContent}
              onChange={(e) => setScriptContent(e.target.value)}
              className="font-mono text-sm h-80 bg-jupiter-space-black border-jupiter-charcoal text-jupiter-cloud"
            />
          </TabsContent>

          <TabsContent value="logs" className="mt-0">
            <div className="font-mono text-sm h-80 bg-jupiter-space-black border border-jupiter-charcoal rounded-md p-4 overflow-auto">
              {logs.length === 0 ? (
                <div className="text-jupiter-steel italic">No logs yet. Run the script to see execution logs.</div>
              ) : (
                logs.map((log, index) => (
                  <div
                    key={index}
                    className={`mb-1 ${
                      log.includes("ERROR")
                        ? "text-red-400"
                        : log.includes("WARNING")
                          ? "text-amber-400"
                          : log.includes("SUCCESS") || log.includes("successfully")
                            ? "text-jupiter-cosmic-lime"
                            : log.includes("TEST MODE")
                              ? "text-jupiter-aurora-green"
                              : log.includes("SECURE MODE")
                                ? "text-jupiter-trifid-teal"
                                : "text-jupiter-cloud"
                    }`}
                  >
                    {log}
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <div className="h-80 bg-jupiter-space-black border border-jupiter-charcoal rounded-md p-4 overflow-auto">
              <h3 className="text-jupiter-nebula-blue font-syne font-bold mb-4">Script Settings</h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="max-trade-size" className="text-sm text-jupiter-cloud mb-1 block">
                    Maximum Trade Size (SOL)
                  </Label>
                  <Input
                    id="max-trade-size"
                    type="number"
                    defaultValue="1.0"
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud w-full md:w-1/3"
                  />
                </div>

                <div>
                  <Label htmlFor="slippage" className="text-sm text-jupiter-cloud mb-1 block">
                    Slippage Tolerance (%)
                  </Label>
                  <Input
                    id="slippage"
                    type="number"
                    defaultValue="0.5"
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud w-full md:w-1/3"
                  />
                </div>

                <div>
                  <Label htmlFor="timeout" className="text-sm text-jupiter-cloud mb-1 block">
                    Transaction Timeout (seconds)
                  </Label>
                  <Input
                    id="timeout"
                    type="number"
                    defaultValue="30"
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud w-full md:w-1/3"
                  />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Switch
                    id="auto-retry"
                    defaultChecked={true}
                    className="data-[state=checked]:bg-jupiter-trifid-teal"
                  />
                  <Label htmlFor="auto-retry" className="text-sm text-jupiter-cloud">
                    Auto-retry failed transactions
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="notifications"
                    defaultChecked={true}
                    className="data-[state=checked]:bg-jupiter-trifid-teal"
                  />
                  <Label htmlFor="notifications" className="text-sm text-jupiter-cloud">
                    Enable notifications
                  </Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
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
        </div>
        <Button
          onClick={runScript}
          disabled={isRunning}
          className={`${
            isRunning
              ? "bg-jupiter-gunmetal text-jupiter-steel cursor-not-allowed"
              : "bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black font-medium"
          }`}
        >
          {isRunning ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-jupiter-cloud"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Running...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-1" /> Run Script
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
