import { spoonacularAPI } from "@/lib/spoonacular"
import { RecipeGrid } from "@/components/recipe-grid"
import { SearchPagination } from "@/components/search-pagination"
import { Button } from "@/components/ui/button"
import { ChefHat } from "lucide-react"
import Link from "next/link"

interface CuisineRecipesProps {
  cuisine: string
  cuisineName: string
  page: number
}

const RESULTS_PER_PAGE = 20

export async function CuisineRecipes({ cuisine, cuisineName, page }: CuisineRecipesProps) {
  try {
    const offset = (page - 1) * RESULTS_PER_PAGE
    const data = await spoonacularAPI.getRecipesByCuisine(cuisine, RESULTS_PER_PAGE, offset)

    const { results: recipes, totalResults } = data
    const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE)

    return (
      <div className="space-y-8">
        {/* Cuisine Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <ChefHat className="h-12 w-12 text-primary" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
            <span className="text-primary">{cuisineName}</span> Recipes
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto mb-6">
            Discover authentic {cuisineName} recipes with traditional flavors and cooking techniques passed down through
            generations.
          </p>
        </div>

        {/* Results */}
        {recipes.length > 0 ? (
          <>
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">
                  {totalResults.toLocaleString()} {cuisineName} recipe{totalResults !== 1 ? "s" : ""} found
                </h2>
                <p className="text-muted-foreground">Explore the rich culinary traditions of {cuisineName} cuisine</p>
              </div>

              <div className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </div>
            </div>

            {/* Recipe Grid */}
            <RecipeGrid recipes={recipes} />

            {/* Pagination */}
            {totalPages > 1 && (
              <SearchPagination currentPage={page} totalPages={totalPages} query="" cuisine={cuisine} />
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <ChefHat className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No {cuisineName} Recipes Found</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We couldn't find any {cuisineName} recipes at the moment. Try exploring other cuisines or search for
              specific dishes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/categories">Browse Other Cuisines</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/search">Search All Recipes</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error("Error fetching cuisine recipes:", error)

    return (
      <div className="text-center py-16">
        <div className="bg-card border border-destructive/20 rounded-lg p-8 max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-2">Error Loading Recipes</h2>
          <p className="text-muted-foreground mb-4">
            We encountered an error while loading {cuisineName} recipes. Please try again.
          </p>
          <Button asChild>
            <Link href="/categories">Browse Other Cuisines</Link>
          </Button>
        </div>
      </div>
    )
  }
}
