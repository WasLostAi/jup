import { NextResponse } from "next/server"
import { pythDataService } from "@/lib/pyth-service"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get("symbol") || "SOL/USD"
  const timeframe = searchParams.get("timeframe") || "1D"

  try {
    // Use Pyth data service to get historical data
    const data = await pythDataService.getHistoricalData(symbol, timeframe)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching market data:", error)
    return NextResponse.json({ error: "Failed to fetch market data" }, { status: 500 })
  }
}
