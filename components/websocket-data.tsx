"use client"

import { useState, useEffect } from "react"

const WebSocketData = () => {
  const [data, setData] = useState<any>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null) // State to hold error messages

  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:8080" // Use environment variable with a default
    let ws: WebSocket

    const connectWebSocket = () => {
      ws = new WebSocket(wsUrl)

      ws.onopen = () => {
        console.log("WebSocket connected")
        setIsConnected(true)
        setError(null) // Clear any previous errors
      }

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data)
          setData(message)
        } catch (parseError) {
          console.error("Error parsing WebSocket message:", parseError)
          setError("Error parsing WebSocket message. Check server response format.")
        }
      }

      ws.onclose = () => {
        console.log("WebSocket disconnected")
        setIsConnected(false)
        setError("WebSocket disconnected. Reconnecting...")
        // Attempt to reconnect after a delay
        setTimeout(() => {
          connectWebSocket()
        }, 3000)
      }

      ws.onerror = (wsError) => {
        console.error("WebSocket error:", wsError)
        setIsConnected(false)
        setError(`WebSocket error: ${wsError.message || "Unknown error"}. Check URL and server status.`)
      }
    }

    connectWebSocket()

    return () => {
      ws.close()
    }
  }, [])

  return (
    <div>
      <h2>WebSocket Data</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      {isConnected ? (
        data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>Loading data...</p>
        )
      ) : (
        <p>Connecting to WebSocket...</p>
      )}
    </div>
  )
}

export default WebSocketData
