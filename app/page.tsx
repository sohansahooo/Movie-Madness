import { Suspense } from "react";

import { MovieCard } from "@/components/movie-card";
import { Search } from "@/components/search";
import { getPopularMovies, getGenres } from "@/lib/movie-service";
import { ThemeToggle } from "@/components/theme-toggle";
import { CategoryFilter } from "@/components/category-filter";
import { Movie } from "@/types/movie";

export default async function Home({
  searchParams,
}: {
  searchParams: { genre?: string };
}) {
  const genresData = await getGenres();
  const selectedGenre = searchParams.genre
    ? parseInt(searchParams.genre)
    : undefined;
  const data = await getPopularMovies(1, selectedGenre);

  return (
    <main className="container mx-auto py-6 px-4">
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <CategoryFilter genres={genresData?.genres ?? []} />
        </div>
        <Search />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Suspense fallback={<div>Loading...</div>}>
          {data?.results && data.results.length > 0 ? (
            data.results.map((movie: Movie) => (
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
  );
}
