"use client"

import { Lock, AlertTriangle, Check } from "lucide-react"
import DashboardLayout from "../dashboard-layout"
import { PageTemplate } from "../components/page-template"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function SecurityPage() {
  return (
    <DashboardLayout>
      <PageTemplate description="Monitor and manage security settings, threats, and system integrity.">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-jupiter-charcoal/30 p-4 rounded-md border border-jupiter-gunmetal">
              <h3 className="text-jupiter-nebula-blue font-syne mb-3">Security Status</h3>
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
              </div>
            </div>

            <div className="bg-jupiter-charcoal/30 p-4 rounded-md border border-jupiter-gunmetal">
              <h3 className="text-jupiter-nebula-blue font-syne mb-3">Security Level</h3>
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Overall Security</div>
                  <div className="text-sm text-jupiter-nebula-blue">85%</div>
                </div>
                <Progress value={85} className="h-2 bg-jupiter-charcoal">
                  <div className="h-full bg-gradient-jupiter-2 rounded-full" style={{ width: "85%" }} />
                </Progress>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-xs text-jupiter-steel">Authentication</div>
                    <div className="text-sm text-jupiter-trifid-teal">92%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-jupiter-steel">Data Protection</div>
                    <div className="text-sm text-jupiter-trifid-teal">88%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-jupiter-steel">Network</div>
                    <div className="text-sm text-jupiter-trifid-teal">78%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-jupiter-charcoal/30 p-4 rounded-md border border-jupiter-gunmetal">
            <h3 className="text-jupiter-nebula-blue font-syne mb-3">Recent Security Events</h3>
            <div className="space-y-3">
              <SecurityEvent
                title="Security Scan Complete"
                time="14:32:12"
                description="No threats detected in system scan"
                type="info"
              />
              <SecurityEvent
                title="Login Attempt"
                time="13:45:06"
                description="Successful login from recognized IP"
                type="success"
              />
              <SecurityEvent
                title="Unusual API Activity"
                time="09:12:45"
                description="Multiple rapid requests from IP 192.168.1.45"
                type="warning"
              />
              <SecurityEvent
                title="System Update"
                time="04:30:00"
                description="Security patches applied successfully"
                type="success"
              />
            </div>
          </div>
        </div>
      </PageTemplate>
    </DashboardLayout>
  )
}

function SecurityEvent({
  title,
  time,
  description,
  type,
}: { title: string; time: string; description: string; type: string }) {
  return (
    <div className="flex items-start space-x-3">
      {type === "info" && <Lock className="h-4 w-4 text-jupiter-nebula-blue mt-0.5" />}
      {type === "warning" && <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5" />}
      {type === "success" && <Check className="h-4 w-4 text-jupiter-cosmic-lime mt-0.5" />}
      {type === "error" && <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5" />}
      <div>
        <div className="text-sm font-medium text-jupiter-cloud">{title}</div>
        <div className="text-xs text-jupiter-steel">{description}</div>
        <div className="text-xs text-jupiter-steel mt-1">
          <span className="opacity-70">Time:</span> {time}
        </div>
      </div>
    </div>
  )
}
