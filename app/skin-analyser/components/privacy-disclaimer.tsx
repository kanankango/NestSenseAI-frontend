"use client"

import { Checkbox } from "../components/ui/checkbox"
import { Card, CardContent } from "../components/ui/card"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"

interface PrivacyDisclaimerProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export function PrivacyDisclaimer({ checked, onCheckedChange }: PrivacyDisclaimerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="max-w-3xl mx-auto mt-8"
    >
      <Card className="bg-white dark:bg-gray-900 border-0 shadow-lg rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <Shield className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                We do not store or share your images. All scans are processed securely and your privacy is our priority.
                By proceeding, you agree to our{" "}
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  Privacy Policy
                </a>{" "}
                and
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  {" "}
                  Terms of Service
                </a>
                .
              </p>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="privacy"
                  checked={checked}
                  onCheckedChange={(value) => onCheckedChange(value === true)}
                  className="data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900 dark:data-[state=checked]:bg-white dark:data-[state=checked]:border-white dark:data-[state=checked]:text-gray-900"
                />
                <label
                  htmlFor="privacy"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                >
                  I consent to the processing of my skin data
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
