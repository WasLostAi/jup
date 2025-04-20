"use client"

import { useState } from "react"
import { PageTemplate } from "@/components/page-template"
import { GptFinancialAnalysis } from "@/components/gpt-financial-analysis"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AIAnalysisPage() {
  const [selectedSymbol, setSelectedSymbol] = useState("SOL/USD")

  return (
    <PageTemplate description="AI-powered market insights and trading recommendations">
      <div className="space-y-6">
        <Card className="backdrop-blur-sm bg-black/40 border-purple-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>GPTfin Financial Analysis</CardTitle>
                <CardDescription>AI-powered market insights and trading recommendations</CardDescription>
              </div>
              <Select value={selectedSymbol} onValueChange={setSelectedSymbol}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Symbol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SOL/USD">SOL/USD</SelectItem>
                  <SelectItem value="BTC/USD">BTC/USD</SelectItem>
                  <SelectItem value="ETH/USD">ETH/USD</SelectItem>
                  <SelectItem value="JUP/USD">JUP/USD</SelectItem>
                  <SelectItem value="SPY/USD">SPY/USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="current">
              <TabsList className="mb-4">
                <TabsTrigger value="current">Current Analysis</TabsTrigger>
                <TabsTrigger value="historical">Historical</TabsTrigger>
                <TabsTrigger value="compare">Compare Assets</TabsTrigger>
              </TabsList>

              <TabsContent value="current" className="mt-0">
                <GptFinancialAnalysis symbol={selectedSymbol} />
              </TabsContent>

              <TabsContent value="historical" className="mt-0">
                <div className="flex items-center justify-center h-64 border border-dashed border-gray-700 rounded-lg">
                  <p className="text-gray-400">Historical analysis coming soon</p>
                </div>
              </TabsContent>

              <TabsContent value="compare" className="mt-0">
                <div className="flex items-center justify-center h-64 border border-dashed border-gray-700 rounded-lg">
                  <p className="text-gray-400">Asset comparison coming soon</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  )
}
