import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/providers/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NestSenseAI - Your Compassionate Postpartum Guide",
  description:
    "Empowering new mothers with personalized care plans, expert guidance, and a supportive community for a healthier postpartum journey.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gradient-to-br from-amber-50 via-white to-orange-50`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
