import { spoonacularAPI } from "@/lib/spoonacular"
import { RecipeGrid } from "@/components/recipe-grid"
import { SearchPagination } from "@/components/search-pagination"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Link from "next/link"

interface SearchResultsProps {
  query: string
  cuisine: string
  page: number
}

const RESULTS_PER_PAGE = 20

export async function SearchResults({ query, cuisine, page }: SearchResultsProps) {
  // If no search query or cuisine, show empty state
  if (!query.trim() && !cuisine) {
    return (
      <div className="text-center py-16">
        <Search className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Start Your Recipe Search</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Enter a recipe name, ingredient, or select a cuisine to discover amazing dishes from around the world.
        </p>
        <Button asChild>
          <Link href="/categories">Browse by Cuisine</Link>
        </Button>
      </div>
    )
  }

  try {
    const offset = (page - 1) * RESULTS_PER_PAGE
    const searchCuisine = cuisine && cuisine !== "All Cuisines" ? cuisine : undefined

    const data = await spoonacularAPI.searchRecipes(query.trim(), RESULTS_PER_PAGE, offset, searchCuisine)

    const { results: recipes, totalResults } = data
    const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE)

    // No results found
    if (recipes.length === 0) {
      return (
        <div className="text-center py-16">
          <Search className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Recipes Found</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            We couldn't find any recipes matching your search. Try different keywords or browse our categories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/categories">Browse Categories</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/search">Clear Search</Link>
            </Button>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-8">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">
              {totalResults.toLocaleString()} recipe{totalResults !== 1 ? "s" : ""} found
            </h2>
            <p className="text-muted-foreground">
              {query && `for "${query}"`}
              {query && cuisine && cuisine !== "All Cuisines" && " in "}
              {cuisine && cuisine !== "All Cuisines" && `${cuisine} cuisine`}
            </p>
          </div>

          <div className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </div>
        </div>

        {/* Recipe Grid */}
        <RecipeGrid recipes={recipes} />

        {/* Pagination */}
        {totalPages > 1 && (
          <SearchPagination currentPage={page} totalPages={totalPages} query={query} cuisine={cuisine} />
        )}
      </div>
    )
  } catch (error) {
    console.error("Error searching recipes:", error)

    return (
      <div className="text-center py-16">
        <div className="bg-card border border-destructive/20 rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-2">Search Error</h2>
          <p className="text-muted-foreground mb-4">
            We encountered an error while searching for recipes. Please try again.
          </p>
          <Button asChild>
            <Link href="/search">Try Again</Link>
          </Button>
        </div>
      </div>
    )
  }
}
