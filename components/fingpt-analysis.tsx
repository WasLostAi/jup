"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Brain, ChevronDown, ChevronUp, Minus } from "lucide-react"
import { fingptService, type FinGPTAnalysisResult, type NewsItem } from "@/lib/fingpt-service"
import { useDataSource } from "@/contexts/data-source-context"
import { cn } from "@/lib/utils"

interface FinGPTAnalysisProps {
  symbol: string
}

export function FinGPTAnalysis({ symbol }: FinGPTAnalysisProps) {
  const [activeTab, setActiveTab] = useState("sentiment")
  const [analysis, setAnalysis] = useState<FinGPTAnalysisResult | null>(null)
  const [news, setNews] = useState<NewsItem[]>([])
  const [insights, setInsights] = useState<string>("")
  const [loading, setLoading] = useState({
    sentiment: true,
    news: true,
    insights: true,
  })
  const { dataSource } = useDataSource()

  useEffect(() => {
    const fetchData = async () => {
      setLoading({
        sentiment: true,
        news: true,
        insights: true,
      })

      try {
        // Fetch sentiment analysis
        const sentimentData = await fingptService.analyzeMarketSentiment(symbol)
        setAnalysis(sentimentData)
        setLoading((prev) => ({ ...prev, sentiment: false }))

        // Fetch news
        const newsData = await fingptService.getRecentNews(symbol)
        setNews(newsData)
        setLoading((prev) => ({ ...prev, news: false }))

        // Fetch insights
        const insightsData = await fingptService.generateTradingInsights(symbol)
        setInsights(insightsData)
        setLoading((prev) => ({ ...prev, insights: false }))
      } catch (error) {
        console.error("Error fetching FinGPT data:", error)
        setLoading({
          sentiment: false,
          news: false,
          insights: false,
        })
      }
    }

    fetchData()
  }, [symbol, dataSource])

  const getSentimentColor = (sentiment: string) => {
    if (sentiment === "bullish") return "text-green-500"
    if (sentiment === "bearish") return "text-red-500"
    return "text-yellow-500"
  }

  const getSentimentBadge = (sentiment: string) => {
    if (sentiment === "bullish") return "bg-green-500/20 text-green-500 border-green-500/50"
    if (sentiment === "bearish") return "bg-red-500/20 text-red-500 border-red-500/50"
    return "bg-yellow-500/20 text-yellow-500 border-yellow-500/50"
  }

  const getRecommendationIcon = (recommendation?: string) => {
    if (recommendation === "buy") return <ChevronUp className="h-4 w-4 text-green-500" />
    if (recommendation === "sell") return <ChevronDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-yellow-500" />
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-base font-syne" style={{ color: "#E8F9FF" }}>
          <div className="mr-2 h-5 w-5 bg-gradient-jupiter-3 flex items-center justify-center rounded-sm">
            <Brain className="h-4 w-4 text-jupiter-space-black" />
          </div>
          FinGPT Analysis
          <Badge className="ml-auto bg-purple-500/20 text-purple-400 border-purple-500/50 text-xs">AI-Powered</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sentiment" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 bg-jupiter-charcoal">
            <TabsTrigger value="sentiment" className="text-xs">
              Sentiment
            </TabsTrigger>
            <TabsTrigger value="news" className="text-xs">
              News
            </TabsTrigger>
            <TabsTrigger value="insights" className="text-xs">
              Insights
            </TabsTrigger>
          </TabsList>

          {/* Sentiment Analysis Tab */}
          <TabsContent value="sentiment" className="pt-4">
            {loading.sentiment ? (
              <div className="space-y-3">
                <Skeleton className="h-6 w-full bg-jupiter-charcoal" />
                <Skeleton className="h-20 w-full bg-jupiter-charcoal" />
                <div className="grid grid-cols-2 gap-2">
                  <Skeleton className="h-10 w-full bg-jupiter-charcoal" />
                  <Skeleton className="h-10 w-full bg-jupiter-charcoal" />
                </div>
              </div>
            ) : analysis ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium" style={{ color: "#E8F9FF" }}>
                    Market Sentiment
                  </div>
                  <Badge className={getSentimentBadge(analysis.sentiment)}>
                    {analysis.sentiment.toUpperCase()} ({(analysis.confidence * 100).toFixed(0)}%)
                  </Badge>
                </div>

                <div className="text-sm text-jupiter-steel">{analysis.summary}</div>

                <div className="space-y-2">
                  <div className="text-sm font-medium" style={{ color: "#E8F9FF" }}>
                    Key Points
                  </div>
                  <ul className="space-y-1">
                    {analysis.keyPoints.map((point, index) => (
                      <li key={index} className="text-xs text-jupiter-steel flex items-start">
                        <span className="inline-block h-1 w-1 rounded-full bg-jupiter-nebula-blue mt-1.5 mr-2"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {analysis.tradingSignals && (
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-jupiter-charcoal">
                    <div className="space-y-1">
                      <div className="text-xs text-jupiter-steel">Recommendation</div>
                      <div className="flex items-center">
                        {getRecommendationIcon(analysis.tradingSignals.recommendation)}
                        <span
                          className={cn(
                            "text-sm font-medium ml-1",
                            analysis.tradingSignals.recommendation === "buy"
                              ? "text-green-500"
                              : analysis.tradingSignals.recommendation === "sell"
                                ? "text-red-500"
                                : "text-yellow-500",
                          )}
                        >
                          {analysis.tradingSignals.recommendation.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-jupiter-steel">Timeframe</div>
                      <div className="text-sm font-medium" style={{ color: "#E8F9FF" }}>
                        {analysis.tradingSignals.timeframe.toUpperCase()} TERM
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-40">
                <div className="text-sm text-jupiter-steel">Failed to load sentiment analysis</div>
              </div>
            )}
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news" className="pt-4">
            {loading.news ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-5 w-3/4 bg-jupiter-charcoal" />
                    <Skeleton className="h-4 w-1/4 bg-jupiter-charcoal" />
                    <Skeleton className="h-12 w-full bg-jupiter-charcoal" />
                  </div>
                ))}
              </div>
            ) : news.length > 0 ? (
              <div className="space-y-4">
                {news.map((item, index) => (
                  <div key={index} className="space-y-1 pb-3 border-b border-jupiter-charcoal last:border-0">
                    <div className="text-sm font-medium" style={{ color: "#E8F9FF" }}>
                      {item.title}
                    </div>
                    <div className="flex items-center text-xs text-jupiter-steel">
                      <span>{item.source}</span>
                      <span className="mx-1">•</span>
                      <span>{formatDate(item.publishedAt)}</span>
                    </div>
                    <div className="text-xs text-jupiter-steel mt-1">{item.summary}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-40">
                <div className="text-sm text-jupiter-steel">No recent news available</div>
              </div>
            )}
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="pt-4">
            {loading.insights ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full bg-jupiter-charcoal" />
                <Skeleton className="h-4 w-full bg-jupiter-charcoal" />
                <Skeleton className="h-4 w-3/4 bg-jupiter-charcoal" />
                <Skeleton className="h-4 w-full bg-jupiter-charcoal" />
                <Skeleton className="h-4 w-5/6 bg-jupiter-charcoal" />
              </div>
            ) : insights ? (
              <div className="space-y-3 text-sm text-jupiter-steel">
                {insights.split("\n\n").map((insight, index) => (
                  <p key={index}>{insight}</p>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-40">
                <div className="text-sm text-jupiter-steel">Failed to load trading insights</div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
