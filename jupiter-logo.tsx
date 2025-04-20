import type React from "react"

export const JupiterLogo: React.FC<{ className?: string }> = ({ className = "h-8 w-auto" }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-jupiter-1 blur-sm opacity-70"></div>
      <svg viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
        <path
          d="M150 100C150 128.7 126.5 152.2 97.8 152.2C69.1 152.2 45.6 128.7 45.6 100C45.6 71.3 69.1 47.8 97.8 47.8C126.5 47.8 150 71.3 150 100Z"
          fill="url(#paint0_linear)"
        />
        <path
          d="M97.8 180C142.1 180 178 144.1 178 99.8C178 55.5 142.1 19.6 97.8 19.6C53.5 19.6 17.6 55.5 17.6 99.8C17.6 144.1 53.5 180 97.8 180Z"
          stroke="url(#paint1_linear)"
          strokeWidth="8"
        />
        <path d="M250 60H290V140H250V60Z" fill="url(#paint2_linear)" />
        <path d="M320 60H360L400 110V60H440V140H400L360 90V140H320V60Z" fill="url(#paint3_linear)" />
        <path d="M470 60H510V100H550V60H590V140H550V120H510V140H470V60Z" fill="url(#paint4_linear)" />
        <path d="M620 60H660V100H700V60H740V140H700V120H660V140H620V60Z" fill="url(#paint5_linear)" />
        <defs>
          <linearGradient id="paint0_linear" x1="45.6" y1="100" x2="150" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00B6E7" />
            <stop offset="1" stopColor="#A4D756" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="17.6" y1="99.8" x2="178" y2="99.8" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00B6E7" />
            <stop offset="1" stopColor="#A4D756" />
          </linearGradient>
          <linearGradient id="paint2_linear" x1="250" y1="100" x2="290" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00B6E7" />
            <stop offset="0.5" stopColor="#2ED3B7" />
            <stop offset="1" stopColor="#A4D756" />
          </linearGradient>
          <linearGradient id="paint3_linear" x1="320" y1="100" x2="440" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00B6E7" />
            <stop offset="0.5" stopColor="#2ED3B7" />
            <stop offset="1" stopColor="#A4D756" />
          </linearGradient>
          <linearGradient id="paint4_linear" x1="470" y1="100" x2="590" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00B6E7" />
            <stop offset="0.5" stopColor="#2ED3B7" />
            <stop offset="1" stopColor="#A4D756" />
          </linearGradient>
          <linearGradient id="paint5_linear" x1="620" y1="100" x2="740" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00B6E7" />
            <stop offset="0.5" stopColor="#2ED3B7" />
            <stop offset="1" stopColor="#A4D756" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
