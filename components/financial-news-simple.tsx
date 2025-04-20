"use client"

import { useState } from "react"
import { RefreshCw, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NewsItem {
  id: string
  title: string
  source: string
  timeAgo: string
  summary: string
  sentiment: "positive" | "negative" | "neutral"
  tags: string[]
}

export function FinancialNewsSimple() {
  const [activeTab, setActiveTab] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  // Sample news data
  const [newsItems, setNewsItems] = useState<NewsItem[]>([
    {
      id: "1",
      title: "Bitcoin Surges Past $70,000 as Institutional Adoption Accelerates",
      source: "CryptoWire",
      timeAgo: "2h ago",
      summary:
        "Bitcoin has reached a new all-time high above $70,000 as major financial institutions continue to increase their cryptocurrency holdings.",
      sentiment: "positive",
      tags: ["BTC", "ETH"],
    },
    {
      id: "2",
      title: "Solana Ecosystem Expands with New DeFi Projects",
      source: "DeFi Pulse",
      timeAgo: "5h ago",
      summary:
        "The Solana blockchain is seeing rapid growth in its DeFi ecosystem with several new high-profile projects launching this month.",
      sentiment: "positive",
      tags: ["SOL", "JUP"],
    },
    {
      id: "3",
      title: "Fed Signals Potential Rate Cut, Markets Rally",
      source: "Financial Times",
      timeAgo: "6h ago",
      summary:
        "Stock markets rallied after the Federal Reserve hinted at potential interest rate cuts in the coming months, citing improving inflation data.",
      sentiment: "positive",
      tags: ["SPY", "QQQ"],
    },
    {
      id: "4",
      title: "Tech Stocks Face Pressure Amid Regulatory Concerns",
      source: "Wall Street Journal",
      timeAgo: "12h ago",
      summary:
        "Major technology stocks are experiencing downward pressure as regulators in the US and EU announce new investigations into market practices.",
      sentiment: "negative",
      tags: ["AAPL", "MSFT", "GOOGL"],
    },
  ])

  // Filter news based on active tab
  const filteredNews = newsItems.filter((item) => {
    if (activeTab === "all") return true
    if (activeTab === "crypto")
      return item.tags.some((tag) => ["BTC", "ETH", "SOL", "JUP", "AVAX", "LINK", "DOGE"].includes(tag))
    if (activeTab === "stocks") return item.tags.some((tag) => ["SPY", "QQQ", "AAPL", "MSFT", "GOOGL"].includes(tag))
    return true
  })

  const refreshNews = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
      <CardHeader className="pb-2 border-b border-jupiter-charcoal">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-syne flex items-center" style={{ color: "#E8F9FF" }}>
            <svg
              className="w-4 h-4 mr-2 text-jupiter-nebula-blue"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
                fill="currentColor"
              />
              <path d="M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="currentColor" />
            </svg>
            Financial News
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={refreshNews}
              disabled={isLoading}
              className="h-7 w-7 text-jupiter-steel hover:text-jupiter-cloud hover:bg-jupiter-charcoal"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-jupiter-steel hover:text-jupiter-cloud hover:bg-jupiter-charcoal"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Tabs defaultValue="all" className="mb-4" onValueChange={setActiveTab}>
          <TabsList className="bg-jupiter-charcoal h-8 w-full grid grid-cols-3">
            <TabsTrigger value="all" className="text-xs">
              All News
            </TabsTrigger>
            <TabsTrigger value="crypto" className="text-xs">
              Crypto
            </TabsTrigger>
            <TabsTrigger value="stocks" className="text-xs">
              Stocks
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {filteredNews.map((item) => (
            <div key={item.id} className="border-b border-jupiter-charcoal pb-4 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-sm font-medium" style={{ color: "#E8F9FF" }}>
                  {item.title}
                </h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ml-2 ${
                    item.sentiment === "positive"
                      ? "bg-green-900/30 text-green-400"
                      : item.sentiment === "negative"
                        ? "bg-red-900/30 text-red-400"
                        : "bg-yellow-900/30 text-yellow-400"
                  }`}
                >
                  {item.sentiment}
                </span>
              </div>
              <div className="flex items-center text-xs text-jupiter-steel mb-2">
                <span>{item.source}</span>
                <span className="mx-1">•</span>
                <span>{item.timeAgo}</span>
              </div>
              <p className="text-xs text-jupiter-cloud mb-2">{item.summary}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-1.5 py-0.5 rounded bg-jupiter-charcoal/50 text-jupiter-nebula-blue"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="#"
                  className="text-xs text-jupiter-nebula-blue hover:text-jupiter-nebula-blue/80 flex items-center"
                >
                  Read more
                  <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
