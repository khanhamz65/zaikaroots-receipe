import Link from "next/link"
import { Heart, Search, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function FavoritesEmpty() {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      {/* Empty State Icon */}
      <div className="flex justify-center mb-8">
        <div className="p-6 bg-muted/50 rounded-full">
          <Heart className="h-16 w-16 text-muted-foreground/50" />
        </div>
      </div>

      {/* Empty State Content */}
      <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">No Favorite Recipes Yet</h1>
      <p className="text-lg text-muted-foreground text-pretty mb-8 max-w-md mx-auto">
        Start building your personal recipe collection by saving dishes you love. Click the heart icon on any recipe to
        add it to your favorites.
      </p>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Search className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Search Recipes</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Find recipes by ingredients, dish names, or cooking methods
            </p>
            <Button asChild size="sm">
              <Link href="/search">Start Searching</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Globe className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Browse Cuisines</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Explore recipes from different cultures and cooking traditions
            </p>
            <Button asChild size="sm" variant="outline">
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* How to Save */}
      <div className="bg-card border rounded-lg p-6">
        <h3 className="font-semibold mb-3">How to Save Recipes</h3>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>1. Find a recipe you like</span>
          </div>
          <div className="hidden sm:block">→</div>
          <div className="flex items-center gap-2">
            <span>2. Click the</span>
            <Heart className="h-4 w-4" />
            <span>icon</span>
          </div>
          <div className="hidden sm:block">→</div>
          <div className="flex items-center gap-2">
            <span>3. Find it here anytime!</span>
          </div>
        </div>
      </div>
    </div>
  )
}
