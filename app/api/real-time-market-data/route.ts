import { NextResponse } from "next/server"
import { pythDataService } from "@/lib/pyth-service"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get("symbol") || "SOL/USD"

  try {
    // Get current price from Pyth
    const price = await pythDataService.getCurrentPrice(symbol)

    if (price === null) {
      return NextResponse.json({ error: "Failed to fetch price data" }, { status: 404 })
    }

    // Calculate a simulated previous price within 1%
    const previousPrice = price * (1 + (Math.random() * 0.02 - 0.01))
    const change = price - previousPrice
    const changePercent = (change / previousPrice) * 100

    const update = {
      symbol,
      price,
      previousPrice,
      change,
      changePercent,
      volume: price * (Math.random() * 100 + 50), // Simulated volume
      timestamp: Date.now(),
      bid: price - price * 0.001,
      ask: price + price * 0.001,
    }

    return NextResponse.json(update)
  } catch (error) {
    console.error("Error fetching real-time market data:", error)
    return NextResponse.json({ error: "Failed to fetch real-time market data" }, { status: 500 })
  }
}
