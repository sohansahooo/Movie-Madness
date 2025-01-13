'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface VideoPlayerProps {
  videoKey: string
}

export function VideoPlayer({ videoKey }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (!isPlaying) {
    return (
      <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
        <Button 
          onClick={() => setIsPlaying(true)}
          className="absolute z-10"
          size="lg"
        >
          <Play className="mr-2 h-6 w-6" /> Play Trailer
        </Button>
        <img 
          src={`https://img.youtube.com/vi/${videoKey}/maxresdefault.jpg`} 
          alt="Video thumbnail" 
          className="w-full h-full object-cover opacity-50"
        />
      </div>
    )
  }

  return (
    <div className="aspect-video">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

