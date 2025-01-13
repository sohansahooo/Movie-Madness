'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'

export function Search() {
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <div className="relative">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search movies..."
        className="pl-10"
        defaultValue={searchParams.get('query') ?? ''}
        onChange={(e) => {
          const query = e.target.value
          if (query) {
            router.push(`/search?query=${query}`)
          } else {
            router.push('/')
          }
        }}
      />
    </div>
  )
}

