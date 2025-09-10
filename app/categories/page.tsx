import { CuisineGrid } from "@/components/cuisine-grid"
import { Button } from "@/components/ui/button"
import { Globe, Search } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Browse Cuisines - ZaikaRoots",
  description:
    "Explore recipes from cuisines around the world. From Indian spices to Italian pasta, discover authentic flavors from every corner of the globe.",
  keywords: ["cuisines", "international food", "recipes", "cooking", "world food", "ethnic recipes"],
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Globe className="h-12 w-12 text-primary" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
            Explore <span className="text-primary">World Cuisines</span>
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto mb-6">
            Embark on a culinary journey around the world. Discover authentic recipes, traditional techniques, and bold
            flavors from every corner of the globe.
          </p>

          <Button asChild variant="outline">
            <Link href="/search">
              <Search className="mr-2 h-4 w-4" />
              Search All Recipes
            </Link>
          </Button>
        </div>

        {/* Cuisine Grid */}
        <CuisineGrid />
      </div>
    </div>
  )
}
