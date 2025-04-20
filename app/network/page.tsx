"use client"

import { Wifi, Server, Activity } from "lucide-react"
import DashboardLayout from "../dashboard-layout"
import { PageTemplate } from "../components/page-template"
import { Progress } from "@/components/ui/progress"

export default function NetworkPage() {
  return (
    <DashboardLayout>
      <PageTemplate description="Monitor network connections, latency, and status of trading infrastructure.">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-jupiter-charcoal/30 p-4 rounded-md border border-jupiter-gunmetal">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-jupiter-nebula-blue font-syne flex items-center">
                  <Wifi className="mr-2 h-4 w-4" />
                  Network Status
                </h3>
                <div className="text-jupiter-cosmic-lime text-sm">Online</div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-jupiter-cloud">Latency</div>
                    <div className="text-sm text-jupiter-nebula-blue">42ms</div>
                  </div>
                  <Progress value={80} className="h-2 bg-jupiter-charcoal">
                    <div className="h-full bg-gradient-jupiter-1 rounded-full" style={{ width: "80%" }} />
                  </Progress>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-jupiter-cloud">Bandwidth</div>
                    <div className="text-sm text-jupiter-trifid-teal">12.5 MB/s</div>
                  </div>
                  <Progress value={65} className="h-2 bg-jupiter-charcoal">
                    <div className="h-full bg-gradient-jupiter-2 rounded-full" style={{ width: "65%" }} />
                  </Progress>
                </div>
              </div>
            </div>

            <div className="bg-jupiter-charcoal/30 p-4 rounded-md border border-jupiter-gunmetal">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-jupiter-nebula-blue font-syne flex items-center">
                  <Server className="mr-2 h-4 w-4" />
                  API Status
                </h3>
                <div className="text-jupiter-cosmic-lime text-sm">Operational</div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-jupiter-cloud">Response Time</div>
                    <div className="text-sm text-jupiter-nebula-blue">78ms</div>
                  </div>
                  <Progress value={75} className="h-2 bg-jupiter-charcoal">
                    <div className="h-full bg-gradient-jupiter-1 rounded-full" style={{ width: "75%" }} />
                  </Progress>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-jupiter-cloud">Uptime</div>
                    <div className="text-sm text-jupiter-trifid-teal">99.98%</div>
                  </div>
                  <Progress value={99} className="h-2 bg-jupiter-charcoal">
                    <div className="h-full bg-gradient-jupiter-2 rounded-full" style={{ width: "99%" }} />
                  </Progress>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-jupiter-charcoal/30 p-4 rounded-md border border-jupiter-gunmetal">
            <h3 className="text-jupiter-nebula-blue font-syne mb-3 flex items-center">
              <Activity className="mr-2 h-4 w-4" />
              Connection History
            </h3>
            <div className="space-y-2">
              {[
                { time: "14:32:12", event: "API Connection Established", status: "success" },
                { time: "14:30:45", event: "WebSocket Connection Established", status: "success" },
                { time: "14:28:33", event: "DNS Resolution Completed", status: "success" },
                { time: "14:25:12", event: "Network Interface Initialized", status: "success" },
                { time: "14:22:05", event: "System Startup", status: "info" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-jupiter-space-black/50 rounded-md">
                  <div className="flex items-center">
                    <div
                      className={`h-2 w-2 rounded-full mr-2 ${
                        item.status === "success"
                          ? "bg-jupiter-cosmic-lime"
                          : item.status === "warning"
                            ? "bg-amber-500"
                            : item.status === "error"
                              ? "bg-red-500"
                              : "bg-jupiter-steel"
                      }`}
                    ></div>
                    <span className="text-jupiter-cloud text-sm">{item.event}</span>
                  </div>
                  <span className="text-xs text-jupiter-steel">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageTemplate>
    </DashboardLayout>
  )
}
