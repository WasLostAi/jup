"use client"

import { useState } from "react"
import { useGptFinAnalysis, type GptFinResponse } from "@/lib/gptfin-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, TrendingUpIcon, TrendingDownIcon, AlertCircleIcon } from "lucide-react"

interface GptFinancialAnalysisProps {
  symbol: string
  className?: string
}

export function GptFinancialAnalysis({ symbol, className = "" }: GptFinancialAnalysisProps) {
  const { data, loading, error } = useGptFinAnalysis(symbol)
  const [activeTab, setActiveTab] = useState("analysis")

  if (error) {
    return (
      <Card className={`${className} border-red-400 dark:border-red-600`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <AlertCircleIcon className="w-5 h-5 mr-2 text-red-500" />
            Error Loading Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-500">{error.message}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`${className} backdrop-blur-sm bg-black/40 border-purple-500/30`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-purple-400 mr-2">GPTfin</span>
            <span>Analysis: {symbol}</span>
          </div>
          {data && getSentimentBadge(data.analysis.sentiment)}
        </CardTitle>
        <CardDescription>
          {loading ? (
            <Skeleton className="h-4 w-3/4" />
          ) : (
            <span className="text-xs">Updated {new Date(data?.timestamp || "").toLocaleTimeString()}</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="targets">Price Targets</TabsTrigger>
            <TabsTrigger value="indicators">Indicators</TabsTrigger>
          </TabsList>

          <TabsContent value="analysis" className="mt-0">
            {loading ? <AnalysisSkeleton /> : <AnalysisContent data={data!} />}
          </TabsContent>

          <TabsContent value="targets" className="mt-0">
            {loading ? <TargetsSkeleton /> : <TargetsContent data={data!} />}
          </TabsContent>

          <TabsContent value="indicators" className="mt-0">
            {loading ? <IndicatorsSkeleton /> : <IndicatorsContent data={data!} />}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function getSentimentBadge(sentiment: "bullish" | "bearish" | "neutral") {
  switch (sentiment) {
    case "bullish":
      return (
        <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/50">
          <TrendingUpIcon className="w-3 h-3 mr-1" /> Bullish
        </Badge>
      )
    case "bearish":
      return (
        <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50">
          <TrendingDownIcon className="w-3 h-3 mr-1" /> Bearish
        </Badge>
      )
    case "neutral":
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/50">
          <MinusIcon className="w-3 h-3 mr-1" /> Neutral
        </Badge>
      )
  }
}

function AnalysisContent({ data }: { data: GptFinResponse }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-purple-400 mb-1">Summary</h4>
        <p className="text-sm">{data.analysis.summary}</p>
      </div>

      <div>
        <h4 className="text-sm font-medium text-purple-400 mb-1">Key Points</h4>
        <ul className="text-sm space-y-1">
          {data.analysis.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="text-purple-400 mr-2">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-sm font-medium text-purple-400 mb-1">Recommendation</h4>
        <p className="text-sm">{data.analysis.recommendation}</p>
      </div>

      <div className="pt-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">Confidence</span>
          <span className="font-medium">{(data.analysis.confidence * 100).toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
          <div
            className="bg-purple-500 h-1.5 rounded-full"
            style={{ width: `${data.analysis.confidence * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

function TargetsContent({ data }: { data: GptFinResponse }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        <PriceTargetCard label="Short Term" value={data.priceTargets.short} timeframe="1-4 weeks" />
        <PriceTargetCard label="Medium Term" value={data.priceTargets.medium} timeframe="1-3 months" />
        <PriceTargetCard label="Long Term" value={data.priceTargets.long} timeframe="6-12 months" />
      </div>

      <div className="pt-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400">Target Confidence</span>
          <span className="font-medium">{(data.priceTargets.confidence * 100).toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
          <div
            className="bg-purple-500 h-1.5 rounded-full"
            style={{ width: `${data.priceTargets.confidence * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

function PriceTargetCard({ label, value, timeframe }: { label: string; value: number; timeframe: string }) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="text-lg font-bold">
        {value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: value < 10 ? 2 : 0,
          maximumFractionDigits: value < 10 ? 2 : 0,
        })}
      </div>
      <div className="text-xs text-gray-500 mt-1">{timeframe}</div>
    </div>
  )
}

function IndicatorsContent({ data }: { data: GptFinResponse }) {
  return (
    <div className="space-y-2">
      {data.technicalIndicators.map((indicator, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 rounded-lg border border-gray-700 bg-gray-800/30"
        >
          <div>
            <div className="font-medium">{indicator.name}</div>
            <div className="text-xs text-gray-400">Value: {indicator.value}</div>
          </div>
          <SignalBadge signal={indicator.signal} />
        </div>
      ))}
    </div>
  )
}

function SignalBadge({ signal }: { signal: "buy" | "sell" | "hold" }) {
  switch (signal) {
    case "buy":
      return (
        <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/50">
          <ArrowUpIcon className="w-3 h-3 mr-1" /> Buy
        </Badge>
      )
    case "sell":
      return (
        <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/50">
          <ArrowDownIcon className="w-3 h-3 mr-1" /> Sell
        </Badge>
      )
    case "hold":
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/50">
          <MinusIcon className="w-3 h-3 mr-1" /> Hold
        </Badge>
      )
  }
}

// Skeleton loaders
function AnalysisSkeleton() {
  return (
    <div className="space-y-4">
      <div>
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6" />
      </div>

      <div>
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-11/12 mb-1" />
        <Skeleton className="h-4 w-4/5 mb-1" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div>
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>

      <div className="pt-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-2 w-full mt-2" />
      </div>
    </div>
  )
}

function TargetsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
            <Skeleton className="h-3 w-16 mb-2" />
            <Skeleton className="h-6 w-20 mb-2" />
            <Skeleton className="h-3 w-12" />
          </div>
        ))}
      </div>

      <div className="pt-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-2 w-full mt-2" />
      </div>
    </div>
  )
}

function IndicatorsSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center justify-between p-2 rounded-lg border border-gray-700 bg-gray-800/30">
          <div>
            <Skeleton className="h-5 w-16 mb-1" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  )
}
