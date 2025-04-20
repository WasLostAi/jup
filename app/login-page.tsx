"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Eye, EyeOff, Lock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MatrixRain } from "../matrix-rain"

interface LoginPageProps {
  onLogin: (success: boolean) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [securityLevel, setSecurityLevel] = useState(0)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockTimer, setLockTimer] = useState(0)

  const CORRECT_PASSWORD = "FuckRabbitR1!"
  const MAX_ATTEMPTS = 5
  const LOCK_TIME = 30 // seconds

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isLocked && lockTimer > 0) {
      interval = setInterval(() => {
        setLockTimer((prev) => prev - 1)
      }, 1000)
    }

    if (lockTimer === 0 && isLocked) {
      setIsLocked(false)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isLocked, lockTimer])

  useEffect(() => {
    // Simulate security scan
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setSecurityLevel((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 5
        })
      }, 100)

      return () => clearInterval(interval)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = () => {
    setIsLoading(true)
    setError("")

    // Simulate network delay
    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        onLogin(true)
      } else {
        const newAttempts = loginAttempts + 1
        setLoginAttempts(newAttempts)

        if (newAttempts >= MAX_ATTEMPTS) {
          setIsLocked(true)
          setLockTimer(LOCK_TIME)
          setError(`System locked for ${LOCK_TIME} seconds due to multiple failed attempts`)
        } else {
          setError(`Invalid security credentials. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`)
        }
        setIsLoading(false)
      }
    }, 1500)
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen bg-jupiter-space-black text-jupiter-cloud relative overflow-hidden flex items-center justify-center">
      {/* Matrix-style background animation */}
      <MatrixRain />

      <div className="container max-w-md mx-auto p-4 relative z-10">
        <div className="flex justify-center mb-8">
          <div className="h-16 w-16 bg-gradient-to-br from-jupiter-nebula-blue to-jupiter-trifid-teal rounded-full flex items-center justify-center">
            <Shield className="h-10 w-10 text-jupiter-space-black" />
          </div>
        </div>

        <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm overflow-hidden">
          <CardHeader className="border-b border-jupiter-charcoal pb-3">
            <CardTitle className="text-jupiter-cloud flex items-center justify-center font-syne text-xl">
              <Shield className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
              SECURE ACCESS
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Security Scan</div>
                <div className="text-sm text-jupiter-nebula-blue">{securityLevel}%</div>
              </div>
              <div className="h-2 bg-jupiter-charcoal rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-jupiter-2 rounded-full transition-all duration-300"
                  style={{ width: `${securityLevel}%` }}
                />
              </div>
              <div className="text-xs text-jupiter-steel">
                {securityLevel < 100
                  ? "Scanning environment for security threats..."
                  : "Security scan complete. System secure."}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-jupiter-cloud">
                  Security Credentials
                </Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-jupiter-steel">
                    <Lock className="h-4 w-4" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-jupiter-charcoal border-jupiter-gunmetal text-jupiter-cloud pl-10 pr-10"
                    placeholder="Enter security key"
                    disabled={isLoading || isLocked}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isLoading && !isLocked) {
                        handleLogin()
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-jupiter-steel hover:text-jupiter-nebula-blue"
                    disabled={isLoading || isLocked}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3 flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <div className="text-sm text-red-400">{error}</div>
                </div>
              )}

              {isLocked && (
                <div className="bg-jupiter-charcoal/50 border border-jupiter-gunmetal rounded-md p-3">
                  <div className="text-sm text-jupiter-nebula-blue mb-1">System locked</div>
                  <div className="text-xs text-jupiter-steel">Security lockout will expire in {lockTimer} seconds</div>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="border-t border-jupiter-charcoal pt-4 flex justify-center">
            <Button
              onClick={handleLogin}
              disabled={isLoading || isLocked || !password}
              className={`w-full ${
                isLoading || isLocked || !password
                  ? "bg-jupiter-gunmetal text-jupiter-steel cursor-not-allowed"
                  : "bg-gradient-jupiter-2 hover:bg-gradient-jupiter-3 text-jupiter-space-black font-medium"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-jupiter-space-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Authenticating...
                </>
              ) : (
                "Access System"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
