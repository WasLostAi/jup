"use client"

import type React from "react"

import { RefreshCw, Terminal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TestingLogsProps {
  logs: Array<{ level: string; message: string; timestamp: string }>
  status: "idle" | "running" | "success" | "warning" | "error"
  onClear: () => void
}

export const TestingLogs: React.FC<TestingLogsProps> = ({ logs, status, onClear }) => {
  return (
    <Card className="bg-jupiter-meteorite border-jupiter-charcoal backdrop-blur-sm">
      <CardHeader className="pb-2 border-b border-jupiter-charcoal">
        <div className="flex items-center justify-between">
          <CardTitle className="text-jupiter-cloud flex items-center text-base font-syne">
            <Terminal className="mr-2 h-5 w-5 text-jupiter-nebula-blue" />
            Testing Logs
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className={`${
                status === "idle"
                  ? "bg-jupiter-gunmetal text-jupiter-cloud"
                  : status === "running"
                    ? "bg-jupiter-helix-cyan/20 text-jupiter-helix-cyan border-jupiter-helix-cyan/50"
                    : status === "success"
                      ? "bg-jupiter-cosmic-lime/20 text-jupiter-cosmic-lime border-jupiter-cosmic-lime/50"
                      : status === "warning"
                        ? "bg-amber-500/20 text-amber-400 border-amber-500/50"
                        : "bg-red-500/20 text-red-400 border-red-500/50"
              } text-xs`}
            >
              <div
                className={`h-1.5 w-1.5 rounded-full mr-1 ${
                  status === "idle"
                    ? "bg-jupiter-steel"
                    : status === "running"
                      ? "bg-jupiter-helix-cyan animate-pulse"
                      : status === "success"
                        ? "bg-jupiter-cosmic-lime"
                        : status === "warning"
                          ? "bg-amber-400"
                          : "bg-red-500"
                }`}
              ></div>
              {status === "idle"
                ? "READY"
                : status === "running"
                  ? "RUNNING"
                  : status === "success"
                    ? "SUCCESS"
                    : status === "warning"
                      ? "WARNING"
                      : "ERROR"}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-jupiter-steel hover:text-jupiter-nebula-blue hover:bg-jupiter-charcoal"
              onClick={onClear}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="font-mono text-sm h-[300px] bg-jupiter-space-black border-t border-jupiter-charcoal p-4 overflow-auto">
          {logs.length === 0 ? (
            <div className="text-jupiter-steel italic">No logs yet. Run a test to see execution logs.</div>
          ) : (
            logs.map((log, index) => (
              <div
                key={index}
                className={`mb-1 ${
                  log.level === "error"
                    ? "text-red-400"
                    : log.level === "warning"
                      ? "text-amber-400"
                      : log.level === "success"
                        ? "text-jupiter-cosmic-lime"
                        : "text-jupiter-cloud"
                }`}
              >
                [{log.timestamp}] {log.message}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
