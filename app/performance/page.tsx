"use client"

import DashboardLayout from "../dashboard-layout"
import { PageTemplate } from "../components/page-template"
import { PortfolioHoldings } from "@/components/portfolio-holdings"

export default function PerformancePage() {
  return (
    <DashboardLayout>
      <PageTemplate description="Track and analyze your trading performance metrics and statistics.">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Performance Stats */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-jupiter-charcoal/30 p-4 rounded-md border border-jupiter-gunmetal">
                <h3 className="text-jupiter-nebula-blue font-syne mb-2">Win Rate</h3>
                <div className="text-3xl font-bold text-jupiter-cloud">68%</div>
                <div className="text-xs text-jupiter-steel mt-1">Last 30 days</div>
              </div>

              <div className="bg-jupiter-charcoal/30 p-4 rounded-md border border-jupiter-gunmetal">
                <h3 className="text-jupiter-trifid-teal font-syne mb-2">Profit Factor</h3>
                <div className="text-3xl font-bold text-jupiter-cloud">1.85</div>
                <div className="text-xs text-jupiter-steel mt-1">Last 30 days</div>
              </div>

              <div className="bg-jupiter-charcoal/30 p-4 rounded-md border border-jupiter-gunmetal">
                <h3 className="text-jupiter-helix-cyan font-syne mb-2">Total Profit</h3>
                <div className="text-3xl font-bold text-jupiter-cloud">+$1,245.32</div>
                <div className="text-xs text-jupiter-steel mt-1">Last 30 days</div>
              </div>
            </div>
          </div>

          {/* Portfolio Holdings */}
          <div>
            <PortfolioHoldings />
          </div>
        </div>
      </PageTemplate>
    </DashboardLayout>
  )
}
