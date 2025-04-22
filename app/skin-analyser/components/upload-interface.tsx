"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Camera, Upload, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"

interface UploadInterfaceProps {
  onComplete: () => void
}

export function UploadInterface({ onComplete }: UploadInterfaceProps) {
  const [image, setImage] = useState<string | null>(null)
  const [isCamera, setIsCamera] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const startCamera = async () => {
    setIsCamera(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (context) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageDataUrl = canvas.toDataURL("image/png")
        setImage(imageDataUrl)

        // Stop the camera stream
        const stream = video.srcObject as MediaStream
        if (stream) {
          stream.getTracks().forEach((track) => track.stop())
        }
        setIsCamera(false)
      }
    }
  }

  const tips = ["Ensure good lighting", "Remove makeup", "Face the camera directly", "Keep a neutral expression"]

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-3xl mx-auto p-6 md:p-8 bg-white dark:bg-[#1C1C1E]/90 shadow-xl rounded-2xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-2">
            {image ? "Perfect! Ready for Analysis" : "Let's Scan Your Skin"}
          </h2>
          <p className="text-[#1C1C1E]/70 dark:text-[#F3F4F6]/70">
            {image ? "Your image looks great for analysis" : "Upload a photo or use your camera for best results"}
          </p>
        </div>

        <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden bg-[#F3F4F6] dark:bg-black/20 mb-8">
          {image ? (
            <Image src={image || "/placeholder.svg"} alt="Uploaded skin image" fill className="object-cover" />
          ) : isCamera ? (
            <>
              <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 md:w-72 md:h-72 rounded-full border-2 border-[#E6D5C6] flex items-center justify-center">
                  <div className="w-60 h-60 md:w-68 md:h-68 rounded-full border border-[#E6D5C6]/80 flex items-center justify-center">
                    <div className="text-white/90 font-light text-sm">Position your face here</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 md:w-72 md:h-72 rounded-full border-2 border-[#E6D5C6] flex items-center justify-center animate-pulse">
                <div className="w-60 h-60 md:w-68 md:h-68 rounded-full border border-[#E6D5C6]/80 flex items-center justify-center">
                  <div className="text-[#1C1C1E]/50 dark:text-white/50 font-light text-sm">Upload or capture</div>
                </div>
              </div>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          {image ? (
            <>
              <Button
                onClick={() => setImage(null)}
                variant="outline"
                className="rounded-full border-[#E6D5C6] text-[#1C1C1E] dark:text-white"
              >
                Try Again
              </Button>
              <Button
                onClick={onComplete}
                className="rounded-full bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                Analyze My Skin
              </Button>
            </>
          ) : isCamera ? (
            <Button
              onClick={capturePhoto}
              className="rounded-full bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              Take Photo
            </Button>
          ) : (
            <>
              <Button
                onClick={triggerFileInput}
                variant="outline"
                className="rounded-full border-[#E6D5C6] text-[#1C1C1E] dark:text-white"
              >
                <Upload className="w-4 h-4 mr-2" /> Upload Photo
              </Button>
              <Button
                onClick={startCamera}
                className="rounded-full bg-black hover:bg-black/90 text-white dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                <Camera className="w-4 h-4 mr-2" /> Use Camera
              </Button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            </>
          )}
        </div>

        <div className="bg-[#F3F4F6] dark:bg-black/20 rounded-xl p-4">
          <div className="flex items-center mb-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-[#1C1C1E] dark:text-white font-medium">
                    <Info className="w-4 h-4 mr-2 text-[#E6D5C6]" />
                    Tips for clear scan
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Follow these tips for the most accurate results</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <ul className="grid grid-cols-2 gap-2 text-sm text-[#1C1C1E]/70 dark:text-[#F3F4F6]/70">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E6D5C6] mr-2"></div>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  )
}
