"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Clock, Users, ChefHat, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RecipeIngredients } from "@/components/recipe-ingredients"
import { RecipeInstructions } from "@/components/recipe-instructions"
import { useFavorites } from "@/hooks/use-favorites"
import type { Recipe } from "@/lib/spoonacular"

interface RecipeDetailProps {
  recipe: Recipe
}

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  const [imageError, setImageError] = useState(false)
  const { favorites, addFavorite, removeFavorite } = useFavorites()
  const isFavorite = favorites.some((fav) => fav.id === recipe.id)

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(recipe.id)
    } else {
      addFavorite(recipe)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: `Check out this recipe: ${recipe.title}`,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const imageUrl = imageError
    ? `/placeholder.svg?height=400&width=600&query=delicious ${recipe.title} recipe`
    : recipe.image

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Navigation */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Recipe Header */}
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Recipe Image */}
          <div className="lg:w-1/2">
            <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={recipe.title}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                priority
              />
            </div>
          </div>

          {/* Recipe Info */}
          <div className="lg:w-1/2 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">{recipe.title}</h1>

              {/* Recipe Meta */}
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                {recipe.readyInMinutes && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{recipe.readyInMinutes} minutes</span>
                  </div>
                )}
                {recipe.servings && (
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>{recipe.servings} servings</span>
                  </div>
                )}
                {recipe.spoonacularScore && (
                  <div className="flex items-center gap-2">
                    <ChefHat className="h-5 w-5" />
                    <span>{Math.round(recipe.spoonacularScore)}% match</span>
                  </div>
                )}
              </div>

              {/* Cuisines */}
              {recipe.cuisines && recipe.cuisines.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {recipe.cuisines.map((cuisine) => (
                    <Badge key={cuisine} variant="secondary">
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Health Scores */}
              {(recipe.spoonacularScore || recipe.healthScore) && (
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {recipe.spoonacularScore && (
                    <div className="text-center p-3 bg-card rounded-lg border">
                      <div className="text-2xl font-bold text-primary">{Math.round(recipe.spoonacularScore)}</div>
                      <div className="text-sm text-muted-foreground">Spoonacular Score</div>
                    </div>
                  )}
                  {recipe.healthScore && (
                    <div className="text-center p-3 bg-card rounded-lg border">
                      <div className="text-2xl font-bold text-secondary">{Math.round(recipe.healthScore)}</div>
                      <div className="text-sm text-muted-foreground">Health Score</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleFavoriteClick} variant={isFavorite ? "default" : "outline"} className="flex-1">
                <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                {isFavorite ? "Saved" : "Save Recipe"}
              </Button>
              <Button onClick={handleShare} variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Recipe Summary */}
        {recipe.summary && (
          <Card>
            <CardHeader>
              <CardTitle>About This Recipe</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
              />
            </CardContent>
          </Card>
        )}
      </div>

      <Separator />

      {/* Recipe Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ingredients */}
        <div className="lg:col-span-1">
          <RecipeIngredients ingredients={recipe.extendedIngredients || []} servings={recipe.servings} />
        </div>

        {/* Instructions */}
        <div className="lg:col-span-2">
          <RecipeInstructions instructions={recipe.analyzedInstructions || []} />
        </div>
      </div>
    </div>
  )
}
