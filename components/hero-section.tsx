"use client"

import { Button } from "@/components/ui/button"
import { Search, ChefHat, Globe } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-card to-background py-20 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        {/* Hero Content */}
        <div className="space-y-6">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <ChefHat className="h-12 w-12 text-primary" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-balance">
            Welcome to <span className="text-primary">ZaikaRoots</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Discover authentic flavors from around the world. From traditional Indian spices to global cuisines.
          </p>

          <p className="text-lg text-muted-foreground text-pretty max-w-xl mx-auto">
            Explore thousands of recipes, save your favorites, and embark on a culinary journey that connects you to the
            roots of flavor.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button size="lg" asChild className="text-lg px-8">
            <Link href="/categories">
              <Globe className="mr-2 h-5 w-5" />
              Explore Cuisines
            </Link>
          </Button>

          <Button size="lg" variant="outline" asChild className="text-lg px-8 bg-transparent">
            <Link href="/search">
              <Search className="mr-2 h-5 w-5" />
              Search Recipes
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border/50">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">1000+</div>
            <div className="text-muted-foreground">Recipes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-muted-foreground">Cuisines</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-muted-foreground">Available</div>
          </div>
        </div>
      </div>
    </section>
  )
}
