"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PageTemplateProps {
  title: string
  icon: ReactNode
  description: string
  children?: ReactNode
}

export function PageTemplate({ title, icon, description, children }: PageTemplateProps) {
  return (
    <div className="container mx-auto p-4 relative z-10">
      <div className="flex items-center justify-between mb-6 pt-4">
        <h1 className="text-2xl font-syne flex items-center relative z-20" style={{ color: "#E8F9FF" }}>
          {icon}
          <span className="ml-2">{title}</span>
        </h1>
      </div>

      <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
        <CardHeader className="border-b border-jupiter-charcoal pb-3">
          <CardTitle className="flex items-center font-syne" style={{ color: "#E8F9FF" }}>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="mb-4" style={{ color: "#E8F9FF" }}>
            {description}
          </p>
          {children}
        </CardContent>
      </Card>
    </div>
  )
}

// Also provide a default export to satisfy the requirement
export default PageTemplate
