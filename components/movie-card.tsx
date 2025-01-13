import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { getImageUrl } from '@/lib/movie-service'
import type { Movie } from '@/types/movie'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const rating = typeof movie.vote_average === 'number' && !isNaN(movie.vote_average)
    ? movie.vote_average.toFixed(1)
    : 'N/A'

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A'

  return (
    <Card className="overflow-hidden bg-white dark:bg-gray-800">
      <Link href={`/movie/${movie.id}`}>
        <div className="aspect-[2/3] relative">
          <Image
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4 text-gray-900 dark:text-gray-100">
          <h2 className="font-semibold line-clamp-1">{movie.title}</h2>
          <p className="text-sm text-muted-foreground line-clamp-2">{movie.overview}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-gray-600 dark:text-gray-400">
          <div className="flex items-center text-sm">
            <Star className="w-4 h-4 mr-1 text-yellow-500" />
            {rating}
          </div>
          <div className="ml-auto text-sm text-muted-foreground">
            {year}
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}

