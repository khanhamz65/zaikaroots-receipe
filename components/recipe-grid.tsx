import type { Recipe } from "@/lib/spoonacular"
import { RecipeCard } from "@/components/recipe-card"

interface RecipeGridProps {
  recipes: Recipe[]
  className?: string
}

export function RecipeGrid({ recipes, className = "" }: RecipeGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
