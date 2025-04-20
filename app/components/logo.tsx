import Image from "next/image"
import type React from "react"

export const Logo: React.FC<{ className?: string }> = ({ className = "h-10 w-auto" }) => {
  return (
    // Replace the src with your exported Figma logo
    <Image src="/jupiter-logo.png" alt="Jupiter Trading Platform" width={200} height={50} className={className} />
  )
}
