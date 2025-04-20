"use client"
import DashboardLayout from "../dashboard-layout"
import { PageTemplate } from "../components/page-template"
import { AgentOrderInterface } from "@/components/agent-order-interface"

export default function AgentPage() {
  return (
    <DashboardLayout>
      <PageTemplate description="AI-powered trading agent for natural language order execution.">
        <div className="space-y-6">
          <AgentOrderInterface />
        </div>
      </PageTemplate>
    </DashboardLayout>
  )
}
