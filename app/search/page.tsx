import { Suspense } from "react"
import { SearchResults } from "@/components/search-results"
import { SearchHeader } from "@/components/search-header"
import { LoadingSpinner } from "@/components/loading-spinner"

interface SearchPageProps {
  searchParams: {
    q?: string
    cuisine?: string
    page?: string
  }
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const cuisine = searchParams.cuisine || ""

  let title = "Search Recipes - ZaikaRoots"
  if (query) {
    title = `"${query}" - Search Results | ZaikaRoots`
  } else if (cuisine) {
    title = `${cuisine} Recipes | ZaikaRoots`
  }

  return {
    title,
    description: `Find delicious recipes ${query ? `for "${query}"` : cuisine ? `from ${cuisine} cuisine` : "from around the world"} on ZaikaRoots.`,
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""
  const cuisine = searchParams.cuisine || ""
  const page = Number.parseInt(searchParams.page || "1", 10)

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <SearchHeader initialQuery={query} initialCuisine={cuisine} />

        <Suspense fallback={<LoadingSpinner />}>
          <SearchResults query={query} cuisine={cuisine} page={page} />
        </Suspense>
      </div>
    </div>
  )
}
