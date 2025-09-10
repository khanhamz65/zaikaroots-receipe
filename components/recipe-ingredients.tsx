"use client"

import { useState } from "react"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { Ingredient } from "@/lib/spoonacular"

interface RecipeIngredientsProps {
  ingredients: Ingredient[]
  servings?: number
}

export function RecipeIngredients({ ingredients, servings = 1 }: RecipeIngredientsProps) {
  const [currentServings, setCurrentServings] = useState(servings)

  const adjustServings = (newServings: number) => {
    if (newServings < 1) return
    setCurrentServings(newServings)
  }

  const getAdjustedAmount = (originalAmount: number) => {
    const multiplier = currentServings / servings
    const adjusted = originalAmount * multiplier
    return adjusted % 1 === 0 ? adjusted.toString() : adjusted.toFixed(2)
  }

  if (!ingredients || ingredients.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Ingredients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No ingredients information available.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="sticky top-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Ingredients
        </CardTitle>

        {/* Servings Adjuster */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-muted-foreground">Servings:</span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-transparent"
              onClick={() => adjustServings(currentServings - 1)}
              disabled={currentServings <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium">{currentServings}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 bg-transparent"
              onClick={() => adjustServings(currentServings + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {ingredients.map((ingredient, index) => (
          <div key={ingredient.id || index}>
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1">
                <div className="font-medium capitalize">{ingredient.name}</div>
                <div className="text-sm text-muted-foreground">
                  {getAdjustedAmount(ingredient.amount)} {ingredient.unit}
                </div>
              </div>
            </div>
            {index < ingredients.length - 1 && <Separator className="mt-3" />}
          </div>
        ))}

        {/* Shopping List Note */}
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Tip: Take a screenshot or bookmark this page to use as your shopping list!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
