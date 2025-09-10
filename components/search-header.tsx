"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDebounce } from "@/hooks/use-debounce"

interface SearchHeaderProps {
  initialQuery?: string
  initialCuisine?: string
}

const cuisines = [
  "All Cuisines",
  "African",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
]

export function SearchHeader({ initialQuery = "", initialCuisine = "" }: SearchHeaderProps) {
  const [query, setQuery] = useState(initialQuery)
  const [cuisine, setCuisine] = useState(initialCuisine || "All Cuisines")
  const [isSearching, setIsSearching] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const debouncedQuery = useDebounce(query, 300)

  // Auto-search when debounced query changes
  useEffect(() => {
    if (debouncedQuery !== initialQuery || cuisine !== initialCuisine) {
      handleSearch()
    }
  }, [debouncedQuery, cuisine])

  const handleSearch = () => {
    setIsSearching(true)

    const params = new URLSearchParams()
    if (debouncedQuery.trim()) {
      params.set("q", debouncedQuery.trim())
    }
    if (cuisine && cuisine !== "All Cuisines") {
      params.set("cuisine", cuisine)
    }

    const queryString = params.toString()
    router.push(`/search${queryString ? `?${queryString}` : ""}`)

    // Reset searching state after a short delay
    setTimeout(() => setIsSearching(false), 500)
  }

  const handleClearSearch = () => {
    setQuery("")
    setCuisine("All Cuisines")
    router.push("/search")
  }

  const hasActiveFilters = query.trim() || (cuisine && cuisine !== "All Cuisines")

  return (
    <div className="mb-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-balance mb-2">
          Search <span className="text-primary">Recipes</span>
        </h1>
        <p className="text-muted-foreground text-pretty">Discover your next favorite dish from thousands of recipes</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for recipes, ingredients, or dishes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-12 h-12 text-lg"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              onClick={() => setQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Select value={cuisine} onValueChange={setCuisine}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select cuisine" />
              </SelectTrigger>
              <SelectContent>
                {cuisines.map((cuisineOption) => (
                  <SelectItem key={cuisineOption} value={cuisineOption}>
                    {cuisineOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <Button variant="outline" onClick={handleClearSearch} className="h-12 bg-transparent">
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>

        {/* Search Status */}
        {isSearching && <div className="text-center text-sm text-muted-foreground">Searching for recipes...</div>}
      </div>
    </div>
  )
}
