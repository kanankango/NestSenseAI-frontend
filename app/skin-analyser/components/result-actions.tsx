"use client"

import { Button } from "../components/ui/button"
import { Download, Share2, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"

interface ResultActionsProps {
  onRescan: () => void
}

export function ResultActions({ onRescan }: ResultActionsProps) {
  const handleDownload = () => {
    // In a real app, this would generate a PDF report
    alert("Download functionality would be implemented here")
  }

  const handleShare = () => {
    // In a real app, this would open a share dialog
    alert("Share functionality would be implemented here")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-4xl mx-auto mt-12 mb-16 flex flex-col items-center"
    >
      <div className="flex flex-wrap gap-4 justify-center">
        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Button
            onClick={handleDownload}
            className="rounded-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white dark:from-gray-200 dark:to-white dark:text-gray-900 dark:hover:from-gray-300 dark:hover:to-gray-100 shadow-md hover:shadow-lg transition-all duration-300 px-6"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Button
            onClick={handleShare}
            variant="outline"
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 px-6"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Results
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Button
            onClick={onRescan}
            variant="outline"
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 px-6"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Scan Again
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
