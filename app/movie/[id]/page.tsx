import Image from 'next/image'
import { Star } from 'lucide-react'

import { getImageUrl, getMovieDetails, getMovieVideos } from '@/lib/movie-service'
import { VideoPlayer } from '@/components/video-player'

export default async function MoviePage({ params }: { params: { id: string } }) {
  const movie = await getMovieDetails(parseInt(params.id))
  const videos = await getMovieVideos(parseInt(params.id))
  const trailer = videos.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube')

  const rating = typeof movie.vote_average === 'number' && !isNaN(movie.vote_average)
    ? movie.vote_average.toFixed(1)
    : 'N/A'

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A'

  return (
    <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="relative h-[60vh]">
        <Image
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/0" />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <div className="aspect-[2/3] relative">
              <Image
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <div className="flex items-center mb-4">
              <Star className="w-5 h-5 text-yellow-500 mr-1" />
              <span className="font-semibold">{rating}</span>
              <span className="mx-2">•</span>
              <span>{year}</span>
            </div>
            <p className="text-lg mb-6">{movie.overview}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres && movie.genres.map((genre: any) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            {trailer && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">Trailer</h2>
                <VideoPlayer videoKey={trailer.key} />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

