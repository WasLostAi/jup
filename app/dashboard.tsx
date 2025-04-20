"use client"

import { useEffect, useState } from "react"
import { Activity, AlertCircle, Check, Info, RefreshCw, Shield, Cpu, HardDrive, Wifi } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RecentTrades } from "../recent-trades"
import DashboardLayout from "./dashboard-layout"
import { TradingViewChart } from "../tradingview-chart"

export default function Dashboard() {
  const [cpuUsage, setCpuUsage] = useState(42)
  const [memoryUsage, setMemoryUsage] = useState(68)
  const [networkStatus, setNetworkStatus] = useState(92)
  const [securityLevel, setSecurityLevel] = useState(75)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Simulate changing data
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 30) + 30)
      setMemoryUsage(Math.floor(Math.random() * 20) + 60)
      setNetworkStatus(Math.floor(Math.random() * 15) + 80)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 relative z-10">
        <div className="grid grid-cols-12 gap-6">
          {/* Main content area */}
          <div className="col-span-12 lg:col-span-9">
            {/* TradingView Chart */}
            <TradingViewChart />

            {/* Recent Trades - Separate component */}
            <div className="mt-6">
              <RecentTrades />
            </div>
          </div>

          {/* Right sidebar with system information */}
          <div className="col-span-12 lg:col-span-3">
            <div className="grid gap-6">
              {/* System time */}
              <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-jupiter-charcoal to-jupiter-space-black p-6 border-b border-jupiter-charcoal">
                    <div className="text-center">
                      <div className="text-xs text-jupiter-steel mb-1 font-mono">SYSTEM TIME</div>
                      <div className="text-3xl font-mono text-jupiter-nebula-blue mb-1">{formatTime(currentTime)}</div>
                      <div className="text-sm text-jupiter-steel">{formatDate(currentTime)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Metrics */}
              <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-base font-syne" style={{ color: "#E8F9FF" }}>
                    <Activity className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
                    System Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center text-sm" style={{ color: "#E8F9FF" }}>
                        <Cpu className="h-4 w-4 mr-2 text-jupiter-nebula-blue" />
                        CPU Usage
                      </div>
                      <div className="text-sm text-jupiter-nebula-blue">{cpuUsage}%</div>
                    </div>
                    <Progress value={cpuUsage} className="h-2 bg-jupiter-charcoal">
                      <div className="h-full bg-gradient-jupiter-1 rounded-full" style={{ width: `${cpuUsage}%` }} />
                    </Progress>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center text-sm" style={{ color: "#E8F9FF" }}>
                        <HardDrive className="h-4 w-4 mr-2 text-jupiter-trifid-teal" />
                        Memory Usage
                      </div>
                      <div className="text-sm text-jupiter-trifid-teal">{memoryUsage}%</div>
                    </div>
                    <Progress value={memoryUsage} className="h-2 bg-jupiter-charcoal">
                      <div className="h-full bg-gradient-jupiter-2 rounded-full" style={{ width: `${memoryUsage}%` }} />
                    </Progress>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center text-sm" style={{ color: "#E8F9FF" }}>
                        <Wifi className="h-4 w-4 mr-2 text-jupiter-helix-cyan" />
                        Network Status
                      </div>
                      <div className="text-sm text-jupiter-helix-cyan">{networkStatus}%</div>
                    </div>
                    <Progress value={networkStatus} className="h-2 bg-jupiter-charcoal">
                      <div
                        className="h-full bg-gradient-jupiter-3 rounded-full"
                        style={{ width: `${networkStatus}%` }}
                      />
                    </Progress>
                  </div>
                </CardContent>
              </Card>

              {/* Security Status */}
              <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-base font-syne" style={{ color: "#E8F9FF" }}>
                    <div className="mr-2 h-5 w-5 bg-gradient-jupiter-2 flex items-center justify-center rounded-sm">
                      <Shield className="h-4 w-4 text-jupiter-space-black" />
                    </div>
                    Security Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-jupiter-steel">Firewall</div>
                      <Badge className="bg-jupiter-trifid-teal/20 text-jupiter-trifid-teal border-jupiter-trifid-teal/50">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-jupiter-steel">Intrusion Detection</div>
                      <Badge className="bg-jupiter-trifid-teal/20 text-jupiter-trifid-teal border-jupiter-trifid-teal/50">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-jupiter-steel">Encryption</div>
                      <Badge className="bg-jupiter-trifid-teal/20 text-jupiter-trifid-teal border-jupiter-trifid-teal/50">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-jupiter-steel">Threat Database</div>
                      <div className="text-sm text-jupiter-nebula-blue">
                        Updated <span className="text-jupiter-steel">12 min ago</span>
                      </div>
                    </div>

                    <div className="pt-2 mt-2 border-t border-jupiter-charcoal">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium">Security Level</div>
                        <div className="text-sm text-jupiter-nebula-blue">{securityLevel}%</div>
                      </div>
                      <Progress value={securityLevel} className="h-2 bg-jupiter-charcoal">
                        <div
                          className="h-full bg-gradient-jupiter-2 rounded-full"
                          style={{ width: `${securityLevel}%` }}
                        />
                      </Progress>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Alerts */}
              <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-base font-syne" style={{ color: "#E8F9FF" }}>
                    <AlertCircle className="mr-2 h-5 w-5 text-jupiter-cosmic-lime" />
                    System Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <AlertItem
                      title="Security Scan Complete"
                      time="14:32:12"
                      description="No threats detected in system scan"
                      type="info"
                    />
                    <AlertItem
                      title="API Rate Limit Warning"
                      time="13:45:06"
                      description="Approaching Jupiter API rate limit"
                      type="warning"
                    />
                    <AlertItem
                      title="System Update Available"
                      time="09:12:45"
                      description="Jupiter Trading SDK v3.2.1 ready to install"
                      type="update"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

// Define AlertItem component
function AlertItem({
  title,
  time,
  description,
  type,
}: { title: string; time: string; description: string; type: string }) {
  let iconColor = "jupiter-nebula-blue"
  if (type === "warning") iconColor = "jupiter-cosmic-lime"
  if (type === "update") iconColor = "jupiter-helix-cyan"
  if (type === "success") iconColor = "jupiter-aurora-green"

  return (
    <div className="flex items-start space-x-3">
      {type === "info" && <Info className="h-4 w-4 text-jupiter-nebula-blue mt-0.5" />}
      {type === "warning" && <AlertCircle className="h-4 w-4 text-jupiter-cosmic-lime mt-0.5" />}
      {type === "update" && <RefreshCw className="h-4 w-4 text-jupiter-helix-cyan mt-0.5" />}
      {type === "success" && <Check className="h-4 w-4 text-jupiter-aurora-green mt-0.5" />}
      <div>
        <div className="text-sm font-medium" style={{ color: "#E8F9FF" }}>
          {title}
        </div>
        <div className="text-xs text-jupiter-steel">{description}</div>
        <div className="text-xs text-jupiter-steel mt-1">
          <span className="opacity-70">Time:</span> {time}
        </div>
      </div>
    </div>
  )
}
