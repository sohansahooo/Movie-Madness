import { Suspense } from 'react'

import { MovieCard } from '@/components/movie-card'
import { Search } from '@/components/search'
import { ThemeToggle } from '@/components/theme-toggle'
import { CategoryFilter } from '@/components/category-filter'
import { searchMovies, getGenres } from '@/lib/movie-service'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query: string }
}) {
  const data = await searchMovies(searchParams.query)
  const genresData = await getGenres()

  return (
    <main className="container mx-auto py-6 px-4">
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <CategoryFilter genres={genresData?.genres ?? []} />
        </div>
        <Search />
      </div>
      <h1 className="text-2xl font-bold mb-6">
        Search results for: {searchParams.query}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Suspense fallback={<div>Loading...</div>}>
          {data?.results && data.results.length > 0 ? (
            data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-xl font-semibold">No movies found</p>
            </div>
          )}
        </Suspense>
      </div>
    </main>
  )
}

