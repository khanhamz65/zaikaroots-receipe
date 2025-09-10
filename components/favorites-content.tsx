"use client"

import { useState, useMemo } from "react"
import { Heart, Search, Trash2, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RecipeGrid } from "@/components/recipe-grid"
import { FavoritesEmpty } from "@/components/favorites-empty"
import { useFavorites } from "@/hooks/use-favorites"
import { useDebounce } from "@/hooks/use-debounce"

export function FavoritesContent() {
  const { favorites, clearFavorites, isLoaded } = useFavorites()
  const [searchQuery, setSearchQuery] = useState("")
  const [cuisineFilter, setCuisineFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const debouncedSearch = useDebounce(searchQuery, 300)

  // Get unique cuisines from favorites
  const availableCuisines = useMemo(() => {
    const cuisines = new Set<string>()
    favorites.forEach((recipe) => {
      recipe.cuisines?.forEach((cuisine) => cuisines.add(cuisine))
    })
    return Array.from(cuisines).sort()
  }, [favorites])

  // Filter and sort favorites
  const filteredFavorites = useMemo(() => {
    let filtered = favorites

    // Search filter
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase()
      filtered = filtered.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(query) ||
          recipe.summary?.toLowerCase().includes(query) ||
          recipe.cuisines?.some((cuisine) => cuisine.toLowerCase().includes(query)),
      )
    }

    // Cuisine filter
    if (cuisineFilter !== "all") {
      filtered = filtered.filter((recipe) => recipe.cuisines?.includes(cuisineFilter))
    }

    // Sort
    switch (sortBy) {
      case "alphabetical":
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title))
        break
      case "recent":
      default:
        // Keep original order (most recently added first)
        break
    }

    return filtered
  }, [favorites, debouncedSearch, cuisineFilter, sortBy])

  // Loading state
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Empty state
  if (favorites.length === 0) {
    return <FavoritesEmpty />
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <Heart className="h-12 w-12 text-primary" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
          My <span className="text-primary">Favorite Recipes</span>
        </h1>
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          Your personal collection of saved recipes. All the dishes you love, organized in one place.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search your favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="All Cuisines" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cuisines</SelectItem>
                {availableCuisines.map((cuisine) => (
                  <SelectItem key={cuisine} value={cuisine}>
                    {cuisine}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="alphabetical">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              {filteredFavorites.length === favorites.length
                ? `${favorites.length} saved recipe${favorites.length !== 1 ? "s" : ""}`
                : `${filteredFavorites.length} of ${favorites.length} recipe${favorites.length !== 1 ? "s" : ""}`}
            </p>
          </div>

          {favorites.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFavorites}
              className="text-destructive hover:text-destructive bg-transparent"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear All Favorites
            </Button>
          )}
        </div>
      </div>

      {/* Results */}
      {filteredFavorites.length > 0 ? (
        <RecipeGrid recipes={filteredFavorites} />
      ) : (
        <div className="text-center py-16">
          <Search className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Matching Favorites</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            No recipes match your current search and filter criteria. Try adjusting your filters or search terms.
          </p>
          <Button
            onClick={() => {
              setSearchQuery("")
              setCuisineFilter("all")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
