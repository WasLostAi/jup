import { PriceStatus, PythHttpClient, getPythProgramKeyForCluster } from "@pythnetwork/client"
import { Connection, PublicKey } from "@solana/web3.js"

// Map of asset symbols to their Pyth price feed IDs
const PRICE_FEED_IDS: Record<string, string> = {
  "SOL/USD": "H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG",
  "BTC/USD": "GVXRSBjFk6e6J3NbVPXohDJetcTjaeeuykUpbQF8UoMU",
  "ETH/USD": "JBu1AL4obBcCMqKBBxhpWCNUt136ijcuMZLFvTP7iWdB",
  "JUP/USD": "7qHxGqMpJfN2qKLUz5rBBqnXdmxmuJaMjQAcCRAtYBPD",
  "SPY/USD": "HoDAYYYhFvCNQNFPui51H8qvpcdz6KuVtq77ZGtHND2T",
  // Add more assets as needed
}

// List of default symbols to display
export const DEFAULT_SYMBOLS = ["SOL/USD", "JUP/USD", "BTC/USD", "ETH/USD", "SPY/USD"]

export class PythDataService {
  private connection: Connection
  private pythClient: PythHttpClient
  private pythProgramKey: PublicKey

  constructor(rpcEndpoint: string = process.env.QUICKNODE_RPC || "https://api.mainnet-beta.solana.com") {
    // Ensure the RPC endpoint has the proper HTTP/HTTPS prefix
    if (rpcEndpoint && !rpcEndpoint.startsWith("http")) {
      rpcEndpoint = `https://${rpcEndpoint}`
    }

    // Use a fallback if the endpoint is empty or undefined
    if (!rpcEndpoint) {
      rpcEndpoint = "https://api.mainnet-beta.solana.com"
    }

    this.connection = new Connection(rpcEndpoint)
    this.pythProgramKey = getPythProgramKeyForCluster("mainnet-beta")
    this.pythClient = new PythHttpClient(this.connection, this.pythProgramKey)
  }

  /**
   * Get the current price for a symbol
   */
  async getCurrentPrice(symbol: string): Promise<number | null> {
    try {
      const feedId = PRICE_FEED_IDS[symbol]
      if (!feedId) {
        console.error(`No Pyth feed ID found for symbol: ${symbol}`)
        return null
      }

      const priceData = await this.pythClient.getPriceNoDataFeed(new PublicKey(feedId))

      if (priceData && priceData.price && priceData.status === PriceStatus.TRADING) {
        return priceData.price
      }

      return null
    } catch (error) {
      console.error("Error fetching price from Pyth:", error)
      return null
    }
  }

  /**
   * Get historical price data for a symbol
   * Note: Pyth doesn't provide historical data directly, so this would need to be
   * combined with a time-series database or another data source for historical data
   */
  async getHistoricalData(symbol: string, timeframe: string, count = 100): Promise<any> {
    // In a real implementation, you would fetch historical data from your database
    // or another provider, and combine it with the latest Pyth data

    // For now, we'll return simulated data based on the current price
    const currentPrice = (await this.getCurrentPrice(symbol)) || 100
    const volatility = currentPrice * 0.02 // 2% volatility

    let lastClose = currentPrice
    const candles = []
    const volumes = []

    // Determine time intervals based on timeframe
    const intervals: Record<string, number> = {
      "5m": 5 * 60 * 1000,
      "15m": 15 * 60 * 1000,
      "1H": 60 * 60 * 1000,
      "4H": 4 * 60 * 60 * 1000,
      "1D": 24 * 60 * 60 * 1000,
      "1W": 7 * 24 * 60 * 60 * 1000,
      "1M": 30 * 24 * 60 * 60 * 1000,
    }

    const interval = intervals[timeframe] || intervals["1D"]
    let currentTime = Date.now() - count * interval

    for (let i = 0; i < count; i++) {
      // Generate realistic price movement
      const open = lastClose
      const high = open + Math.random() * volatility
      const low = open - Math.random() * volatility
      const close = low + Math.random() * (high - low)

      // Generate volume
      const volume = currentPrice * (Math.random() * 1000 + 500)

      candles.push({
        time: Math.floor(currentTime / 1000),
        open,
        high,
        low,
        close,
      })

      volumes.push({
        time: Math.floor(currentTime / 1000),
        value: volume,
        color: close >= open ? "rgba(46, 211, 183, 0.3)" : "rgba(255, 69, 96, 0.3)",
      })

      lastClose = close
      currentTime += interval
    }

    return {
      candles,
      volumes,
      symbol,
      timeframe,
      currentPrice,
    }
  }

  /**
   * Get market data for multiple symbols
   */
  async getMarketData(symbols: string[]): Promise<Record<string, any>> {
    const results: Record<string, any> = {}

    await Promise.all(
      symbols.map(async (symbol) => {
        const price = await this.getCurrentPrice(symbol)
        if (price !== null) {
          // Calculate a simulated previous price within 1%
          const previousPrice = price * (1 + (Math.random() * 0.02 - 0.01))
          const change = price - previousPrice
          const changePercent = (change / previousPrice) * 100

          results[symbol] = {
            symbol,
            price,
            previousPrice,
            change,
            changePercent,
            volume: price * (Math.random() * 100 + 50), // Simulated volume
            timestamp: Date.now(),
          }
        }
      }),
    )

    return results
  }
}

// Export a singleton instance
export const pythDataService = new PythDataService()
