"use client"

import { useState } from "react"
import { Code, Plus, FileCode, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { TradingScriptInterface } from "../trading-script-interface"
import DashboardLayout from "./dashboard-layout"

export default function TradingScriptsPage() {
  const [scripts, setScripts] = useState([
    { id: 1, name: "SOL/USDC Arbitrage", lastModified: "2 hours ago", status: "active" },
    { id: 2, name: "JUP Token Accumulator", lastModified: "1 day ago", status: "inactive" },
    { id: 3, name: "Market Volatility Trader", lastModified: "3 days ago", status: "active" },
  ])

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-syne text-jupiter-cloud flex items-center">
            <Code className="mr-2 h-6 w-6 text-jupiter-nebula-blue" />
            Trading Scripts
          </h1>
          <Button className="bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black">
            <Plus className="h-4 w-4 mr-2" /> New Script
          </Button>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Script Library */}
          <div className="col-span-12 lg:col-span-3">
            <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
              <CardHeader className="pb-2 border-b border-jupiter-charcoal">
                <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
                  <FolderOpen className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                  Script Library
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="relative mb-4">
                    <Input
                      placeholder="Search scripts..."
                      className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud pl-8"
                    />
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-jupiter-steel">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {scripts.map((script) => (
                      <div
                        key={script.id}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-jupiter-charcoal cursor-pointer border border-transparent hover:border-jupiter-gunmetal"
                      >
                        <div className="flex items-center">
                          <FileCode className="h-4 w-4 text-jupiter-nebula-blue mr-2" />
                          <div>
                            <div className="text-sm text-jupiter-cloud">{script.name}</div>
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
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Script Editor */}
          <div className="col-span-12 lg:col-span-9">
            <TradingScriptInterface />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
