"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Recipe } from "@/lib/spoonacular"
import { useFavorites } from "@/hooks/use-favorites"

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [imageError, setImageError] = useState(false)
  const { favorites, addFavorite, removeFavorite } = useFavorites()
  const isFavorite = favorites.some((fav) => fav.id === recipe.id)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isFavorite) {
      removeFavorite(recipe.id)
    } else {
      addFavorite(recipe)
    }
  }

  const imageUrl = imageError
    ? `/placeholder.svg?height=200&width=300&query=delicious ${recipe.title} recipe`
    : recipe.image

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <Link href={`/recipe/${recipe.id}`}>
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={recipe.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          </div>
        </Link>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/80 hover:bg-background"
          onClick={handleFavoriteClick}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
        </Button>

        {/* Recipe Score Badge */}
        {recipe.spoonacularScore && (
          <Badge className="absolute top-2 left-2 bg-primary/90">{Math.round(recipe.spoonacularScore)}% Match</Badge>
        )}
      </div>

      <CardContent className="p-4">
        <Link href={`/recipe/${recipe.id}`}>
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors mb-2">
            {recipe.title}
          </h3>
        </Link>

        {/* Recipe Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          {recipe.readyInMinutes && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.readyInMinutes}m</span>
            </div>
          )}
          {recipe.servings && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} servings</span>
            </div>
          )}
        </div>

        {/* Cuisines */}
        {recipe.cuisines && recipe.cuisines.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {recipe.cuisines.slice(0, 2).map((cuisine) => (
              <Badge key={cuisine} variant="secondary" className="text-xs">
                {cuisine}
              </Badge>
            ))}
            {recipe.cuisines.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{recipe.cuisines.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Summary Preview */}
        {recipe.summary && (
          <p
            className="text-sm text-muted-foreground line-clamp-2"
            dangerouslySetInnerHTML={{
              __html: recipe.summary.replace(/<[^>]*>/g, "").substring(0, 100) + "...",
            }}
          />
        )}
      </CardContent>
    </Card>
  )
}
