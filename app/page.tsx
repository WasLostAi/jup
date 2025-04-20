"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Dashboard from "./dashboard"
import LoginPage from "./login-page"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem("jupiter-auth-status")
    if (authStatus === "authenticated") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (success: boolean) => {
    if (success) {
      // Store authentication status in localStorage
      localStorage.setItem("jupiter-auth-status", "authenticated")
      setIsAuthenticated(true)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-jupiter-space-black flex items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-jupiter-nebula-blue/30 rounded-full animate-ping"></div>
          <div className="absolute inset-2 border-4 border-t-jupiter-nebula-blue border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-4 border-r-jupiter-trifid-teal border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
          <div className="absolute inset-6 border-4 border-b-jupiter-aurora-green border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
          <div className="absolute inset-8 border-4 border-l-jupiter-cosmic-lime border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return isAuthenticated ? <Dashboard /> : <LoginPage onLogin={handleLogin} />
}
