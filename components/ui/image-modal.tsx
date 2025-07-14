"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"

interface ImageModalProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export function ImageModal({ src, alt, width = 60, height = 60, className = "" }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={`cursor-pointer hover:opacity-80 transition-opacity ${className}`}
        onClick={() => setIsOpen(true)}
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <div className="relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              width={800}
              height={600}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
