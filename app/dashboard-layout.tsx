"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  Bell,
  Command,
  Globe,
  Settings,
  Shield,
  Code,
  BarChart2,
  TrendingUp,
  Bot,
  LayoutDashboard,
  LineChart,
  Brain,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MatrixRain } from "../matrix-rain"
import Image from "next/image"
import { useDataSource } from "@/contexts/data-source-context"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [systemStatus, setSystemStatus] = useState(85)
  const [securityLevel, setSecurityLevel] = useState(75)
  const [networkStatus, setNetworkStatus] = useState(92)
  const [isLoading, setIsLoading] = useState(false)
  const [walletBalance, setWalletBalance] = useState({
    sol: 12.45,
    usdc: 1024.68,
    jupiter: 500,
  })
  const router = useRouter()
  const pathname = usePathname()
  const { dataSource, setDataSource } = useDataSource()

  // Simulate changing data
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStatus(Math.floor(Math.random() * 15) + 80)
      setSystemStatus(Math.floor(Math.random() * 10) + 80)

      // Simulate small wallet balance changes
      setWalletBalance((prev) => ({
        sol: Number.parseFloat((prev.sol + (Math.random() * 0.02 - 0.01)).toFixed(2)),
        usdc: Number.parseFloat((prev.usdc + (Math.random() * 2 - 1)).toFixed(2)),
        jupiter: prev.jupiter,
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Navigation handler
  const handleNavigation = (path: string) => {
    // Actually navigate to the page
    router.push(path)
  }

  // Update the navigation items to replace Advanced with Danger
  const navigationItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Trading Scripts", path: "/trading-scripts", icon: <Code className="h-5 w-5" /> },
    { name: "Market Data", path: "/market-data", icon: <LineChart className="h-5 w-5" /> },
    { name: "Danger", path: "/danger", icon: <AlertTriangle className="h-5 w-5" /> },
    { name: "Agent", path: "/agent", icon: <Bot className="h-5 w-5" /> },
    { name: "AI Analysis", path: "/ai-analysis", icon: <Brain className="h-5 w-5" /> },
  ]

  // Make sure the isActive function works with the new path
  const isActive = (path: string) => {
    return pathname === path || (path !== "/" && pathname.startsWith(path))
  }

  return (
    <div className="min-h-screen bg-jupiter-space-black text-jupiter-cloud relative overflow-hidden">
      {/* Matrix-style background animation */}
      <MatrixRain />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-jupiter-space-black/90 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-jupiter-nebula-blue/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-jupiter-nebula-blue border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-jupiter-trifid-teal border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-jupiter-aurora-green border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-jupiter-cosmic-lime border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-jupiter-nebula-blue font-mono text-sm tracking-wider">
              LOADING TRADING PLATFORM
            </div>
          </div>
        </div>
      )}

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - Made fully transparent */}
        <div className="w-64 border-r border-jupiter-charcoal bg-transparent backdrop-blur-sm hidden md:block">
          <div className="p-4 border-b border-jupiter-charcoal">
            <div className="flex items-center justify-center">
              <Image
                src="/jupiter-logo.png"
                alt="Professional Trading Platform"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>
          </div>

          <div className="p-4">
            <nav className="space-y-2">
              <NavItem icon={Command} label="Dashboard" active={isActive("/")} onClick={() => handleNavigation("/")} />
              <NavItem
                icon={Code}
                label="Trading Scripts"
                active={isActive("/trading-scripts")}
                onClick={() => handleNavigation("/trading-scripts")}
              />
              <NavItem
                icon={Bot}
                label="Agent"
                active={isActive("/agent")}
                onClick={() => handleNavigation("/agent")}
              />
              <NavItem
                icon={BarChart2}
                label="Market Data"
                active={isActive("/market-data")}
                onClick={() => handleNavigation("/market-data")}
              />
              <NavItem
                icon={TrendingUp}
                label="Performance"
                active={isActive("/performance")}
                onClick={() => handleNavigation("/performance")}
              />
              <NavItem
                icon={Globe}
                label="Network"
                active={isActive("/network")}
                onClick={() => handleNavigation("/network")}
              />
              <NavItem
                icon={Shield}
                label="Security"
                active={isActive("/security")}
                onClick={() => handleNavigation("/security")}
              />
              <NavItem
                icon={AlertTriangle}
                label="Danger"
                active={isActive("/danger")}
                onClick={() => handleNavigation("/danger")}
              />
              <NavItem
                icon={Settings}
                label="Settings"
                active={isActive("/settings")}
                onClick={() => handleNavigation("/settings")}
              />
            </nav>

            <div className="mt-8 pt-6 border-t border-jupiter-charcoal">
              <div className="text-xs text-jupiter-steel mb-2 font-mono">SYSTEM STATUS</div>
              <div className="space-y-3">
                <StatusItem label="API Connection" value={systemStatus} color="nebula-blue" />
                <StatusItem label="Security" value={securityLevel} color="trifid-teal" />
                <StatusItem label="Network" value={networkStatus} color="helix-cyan" />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-jupiter-charcoal">
              <div className="text-xs text-jupiter-steel mb-2 font-mono">WALLET BALANCE</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-jupiter-cloud">SOL</span>
                  <span className="text-jupiter-nebula-blue font-mono">{walletBalance.sol.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-jupiter-cloud">USDC</span>
                  <span className="text-jupiter-trifid-teal font-mono">{walletBalance.usdc.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-jupiter-cloud">JUP</span>
                  <span className="text-jupiter-cosmic-lime font-mono">{walletBalance.jupiter.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-jupiter-cloud">From:Mint</span>
                  <span className="text-jupiter-aurora-green font-mono">0.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header - Made fully transparent */}
          <header className="h-[72px] border-b border-jupiter-charcoal bg-transparent backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-30">
            <div className="flex items-center">
              <Image
                src="/jupiter-logo.png"
                alt="Professional Trading Platform"
                width={120}
                height={40}
                className="h-10 w-auto md:hidden"
              />
              <div className="hidden md:block text-xl font-syne text-jupiter-cloud flex items-center">
                {pathname === "/" ? (
                  <span>
                    <span className="text-jupiter-nebula-blue">Professional</span> Trading Platform
                  </span>
                ) : (
                  <div className="flex items-center">
                    {navigationItems.find((item) => isActive(item.path))?.icon}
                    <span className="ml-2">{navigationItems.find((item) => isActive(item.path))?.name || ""}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-jupiter-charcoal"
                    >
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-jupiter-nebula-blue rounded-full animate-pulse"></span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Data Source Indicators */}
              <div className="flex space-x-3 bg-jupiter-charcoal/50 rounded-full px-3 py-1.5">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button onClick={() => setDataSource("pyth")} className="relative flex items-center">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            dataSource === "pyth"
                              ? "bg-purple-500 shadow-[0_0_6px_1px_rgba(168,85,247,0.7)]"
                              : "bg-gray-600"
                          }`}
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Pyth Network Data</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button onClick={() => setDataSource("jupiter")} className="relative flex items-center">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            dataSource === "jupiter"
                              ? "bg-teal-400 shadow-[0_0_6px_1px_rgba(45,212,191,0.7)]"
                              : "bg-gray-600"
                          }`}
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Jupiter Data</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Avatar className="h-9 w-9">
                <AvatarImage src="/profile-image.png" alt="User" />
                <AvatarFallback className="bg-jupiter-charcoal text-jupiter-nebula-blue">AI</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-auto bg-jupiter-space-black">{children}</main>
        </div>
      </div>
    </div>
  )
}

// NavItem component
function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ElementType
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${
        active
          ? "bg-jupiter-charcoal text-jupiter-nebula-blue"
          : "text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-jupiter-charcoal"
      }`}
      onClick={onClick}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}

// StatusItem component
function StatusItem({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-jupiter-cloud">{label}</span>
      <span className={`text-jupiter-${color} font-mono`}>{value}%</span>
    </div>
  )
}
