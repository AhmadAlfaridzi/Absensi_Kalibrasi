'use client'
import Image from 'next/image'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface AlatKalibrasiPhotoModalProps {
  open: boolean
  photoUrl: string
  title: string
  onClose: () => void
}

export function AlatKalibrasiPhotoModal({ 
  open, 
  photoUrl, 
  title, 
  onClose 
}: AlatKalibrasiPhotoModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] border border-[#2e2e2e] rounded-lg p-6 max-w-4xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-100">
            Foto Alat: {title}
          </h3>
          <Button
            variant="ghost"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative aspect-video bg-[#121212] rounded-md overflow-hidden border border-[#2e2e2e]">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={`Foto ${title}`}
              fill
              priority={false} 
              quality={75}
              className="object-contain"
              unoptimized
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Foto tidak tersedia
            </div>
          )}
        </div>
      </div>
    </div>
  )
}