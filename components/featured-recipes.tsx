import { spoonacularAPI } from "@/lib/spoonacular"
import { RecipeGrid } from "@/components/recipe-grid"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import Link from "next/link"

export async function FeaturedRecipes() {
  try {
    const data = await spoonacularAPI.getRandomRecipes(12)
    const recipes = data.recipes || []

    return (
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
              Featured <span className="text-primary">Recipes</span>
            </h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto mb-6">
              Discover handpicked recipes from our collection. Each dish tells a story of tradition, flavor, and
              culinary artistry.
            </p>
            <Button variant="outline" asChild>
              <Link href="/search">
                <RefreshCw className="mr-2 h-4 w-4" />
                Discover More Recipes
              </Link>
            </Button>
          </div>

          {/* Recipe Grid */}
          {recipes.length > 0 ? (
            <RecipeGrid recipes={recipes} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No featured recipes available at the moment.</p>
              <Button asChild className="mt-4">
                <Link href="/search">Browse All Recipes</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    )
  } catch (error) {
    console.error("Error fetching featured recipes:", error)

    return (
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-balance mb-4">
            Featured <span className="text-primary">Recipes</span>
          </h2>
          <div className="bg-card border border-destructive/20 rounded-lg p-8 max-w-md mx-auto">
            <p className="text-muted-foreground mb-4">
              Unable to load featured recipes at the moment. Please try again later.
            </p>
            <Button asChild>
              <Link href="/search">Browse Recipes</Link>
            </Button>
          </div>
        </div>
      </section>
    )
  }
}
