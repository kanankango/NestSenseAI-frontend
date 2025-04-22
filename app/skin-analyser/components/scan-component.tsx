"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Camera, Upload, Info, ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"


interface ScanComponentProps {
  onImageCapture: (imageData: string) => void
  onAnalyze: () => void
  scanImage: string | null
  privacyConsent: boolean
  onPrivacyConsentChange: (value: boolean) => void
  onTryDemo: () => void
}

export function ScanComponent({
  onImageCapture,
  onAnalyze,
  scanImage,
  privacyConsent,
  onPrivacyConsentChange,
  onTryDemo,
}: ScanComponentProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "camera">("upload")
  const [isDragging, setIsDragging] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [analysisResult, setAnalysisResult] = useState<any>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      onImageCapture(URL.createObjectURL(file))
      setSelectedFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("image/")) {
        onImageCapture(URL.createObjectURL(file))
        setSelectedFile(file)
      }
    }
  }

  useEffect(() => {
    if (activeTab === "camera" && !cameraActive && !scanImage) {
      startCamera()
    }
    return () => {
      stopCamera()
    }
  }, [activeTab, cameraActive, scanImage])

  const startCamera = async () => {
    try {
      setCameraError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setCameraError("Could not access camera. Please check permissions or try another browser.")
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const tracks = stream.getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
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

        const imageData = canvas.toDataURL("image/png")
        onImageCapture(imageData)

        const byteString = atob(imageData.split(',')[1])
        const mimeString = imageData.split(',')[0].split(':')[1].split(';')[0]
        const ab = new ArrayBuffer(byteString.length)
        const ia = new Uint8Array(ab)
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i)
        }
        const blob = new Blob([ab], { type: mimeString })
        const file = new File([blob], "captured.png", { type: mimeString })
        setSelectedFile(file)
        stopCamera()
      }
    }
  }

  const resetImage = () => {
    onImageCapture("")
    setSelectedFile(null)
    setAnalysisResult(null)
    if (activeTab === "camera") {
      startCamera()
    }
  }

  const handleAnalyzeSkin = async () => {
    if (!selectedFile) return alert("Please select or capture an image first.")

    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const res = await fetch("http://localhost:3000/api/analyze-skin", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      setAnalysisResult(data.analysis)
      onAnalyze()
    } catch (err) {
      console.error("Failed to analyze skin", err)
    }
  }

  const tips = [
    "Ensure good lighting",
    "Remove makeup",
    "Face the camera directly",
    "Keep a neutral expression"
  ]

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="max-w-3xl mx-auto mt-8"
  >
    <div className="mb-8 flex items-center">
      <Button variant="ghost" size="icon" className="mr-2" onClick={() => window.location.reload()}>
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
        Skin Analysis
      </h2>
    </div>
  
    <Card className="bg-white dark:bg-gray-900 shadow-xl border-0 overflow-hidden rounded-2xl">
      <CardContent className="p-0">
        {!scanImage ? (
          <Tabs
            defaultValue="upload"
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "upload" | "camera")}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 bg-gray-50 dark:bg-gray-800/50 p-1 rounded-none">
              {[
                { value: "upload", icon: Upload, label: "Upload Image" },
                { value: "camera", icon: Camera, label: "Use Camera" },
              ].map(({ value, icon: Icon, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="py-3 rounded-xl data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:shadow-sm transition-all duration-200"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
  
            <TabsContent value="upload">
              <div
                className={`h-80 flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl m-6 transition-all duration-300 ${
                  isDragging
                    ? "border-gray-400 bg-gray-50 dark:border-gray-600 dark:bg-gray-800/50 scale-[0.99]"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="w-20 h-20 bg-gradient-to-r from-pink-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800 rounded-full flex items-center justify-center mx-auto shadow-md"
                >
                  <Upload className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                </motion.div>
                <div className="text-center mt-4 space-y-2">
                  <p className="text-gray-700 dark:text-gray-300 font-medium">Drag and drop your photo here</p>
                  <p className="text-gray-500 text-sm">or</p>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-full bg-gradient-to-r from-gray-900 to-gray-800 text-white dark:from-gray-200 dark:to-white dark:text-gray-900 hover:from-gray-800 hover:to-gray-700 dark:hover:from-gray-300 dark:hover:to-gray-100 shadow-md hover:shadow-lg transition-all"
                  >
                    Browse Files
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <p className="text-xs text-gray-500">Supported formats: JPG, PNG, HEIC (max 10MB)</p>
                </div>
              </div>
            </TabsContent>
  
            <TabsContent value="camera">
              <div className="relative h-80 bg-black flex items-center justify-center">
                {cameraError ? (
                  <div className="text-white text-center p-6">
                    <p>{cameraError}</p>
                    <Button onClick={startCamera} variant="outline" className="mt-4 border-white text-white hover:bg-white/10">
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <>
                    <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <motion.div
                        animate={{ scale: [1, 1.03, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-48 h-48 rounded-full border-2 border-white/50 flex items-center justify-center"
                      >
                        <div className="w-44 h-44 rounded-full border border-white/80 flex items-center justify-center">
                          <div className="text-white/90 text-sm font-light">Position your face here</div>
                        </div>
                      </motion.div>
                    </div>
                    <Button
                      onClick={capturePhoto}
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 rounded-full bg-white text-black hover:bg-gray-200 shadow-lg"
                    >
                      Take Photo
                    </Button>
                  </>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="relative h-80">
            <Image src={scanImage || "/placeholder.svg"} alt="Skin scan" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <Button
                onClick={resetImage}
                variant="outline"
                size="sm"
                className="bg-white/80 text-gray-900 shadow-md hover:bg-white hover:shadow-lg"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
  
        <div className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Info className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Tips for clear scan
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-xl border-0">
                  <ul className="py-1 space-y-2 text-sm">
                    {tips.map((tip, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-pink-300 to-cyan-300 dark:from-pink-500 dark:to-cyan-500" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
  
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onTryDemo}
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Try Demo
              </Button>
              <Button
                onClick={onAnalyze}
                disabled={!scanImage || !privacyConsent}
                className="rounded-full bg-gradient-to-r from-gray-900 to-gray-800 text-white dark:from-gray-200 dark:to-white dark:text-gray-900 hover:from-gray-800 hover:to-gray-700 dark:hover:from-gray-300 dark:hover:to-gray-100 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Analyze My Skin
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
  )
}
