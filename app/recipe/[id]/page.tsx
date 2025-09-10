import { Suspense } from "react"
import { notFound } from "next/navigation"
import { spoonacularAPI } from "@/lib/spoonacular"
import { RecipeDetail } from "@/components/recipe-detail"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { Metadata } from "next"

interface RecipePageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  try {
    const recipeId = Number.parseInt(params.id, 10)
    if (Number.isNaN(recipeId)) {
      return {
        title: "Recipe Not Found - ZaikaRoots",
        description: "The requested recipe could not be found.",
      }
    }

    const recipe = await spoonacularAPI.getRecipeInformation(recipeId)

    return {
      title: `${recipe.title} - ZaikaRoots`,
      description: recipe.summary
        ? recipe.summary.replace(/<[^>]*>/g, "").substring(0, 160) + "..."
        : `Learn how to make ${recipe.title} with this detailed recipe from ZaikaRoots.`,
      keywords: [
        recipe.title,
        ...(recipe.cuisines || []),
        "recipe",
        "cooking",
        "food",
        ...(recipe.extendedIngredients?.map((ing) => ing.name) || []).slice(0, 5),
      ],
      openGraph: {
        title: recipe.title,
        description: recipe.summary?.replace(/<[^>]*>/g, "").substring(0, 160),
        images: recipe.image ? [{ url: recipe.image, width: 556, height: 370, alt: recipe.title }] : [],
      },
    }
  } catch (error) {
    return {
      title: "Recipe Not Found - ZaikaRoots",
      description: "The requested recipe could not be found.",
    }
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  const recipeId = Number.parseInt(params.id, 10)

  if (Number.isNaN(recipeId)) {
    notFound()
  }

  try {
    const recipe = await spoonacularAPI.getRecipeInformation(recipeId)

    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Suspense fallback={<LoadingSpinner />}>
            <RecipeDetail recipe={recipe} />
          </Suspense>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching recipe:", error)
    notFound()
  }
}
