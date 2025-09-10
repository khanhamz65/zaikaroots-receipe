import { Suspense } from "react"
import { notFound } from "next/navigation"
import { CuisineRecipes } from "@/components/cuisine-recipes"
import { CuisineBreadcrumb } from "@/components/cuisine-breadcrumb"
import { LoadingSpinner } from "@/components/loading-spinner"
import type { Metadata } from "next"

interface CuisinePageProps {
  params: {
    cuisine: string
  }
  searchParams: {
    page?: string
  }
}

const validCuisines = [
  "african",
  "american",
  "british",
  "cajun",
  "caribbean",
  "chinese",
  "eastern-european",
  "european",
  "french",
  "german",
  "greek",
  "indian",
  "irish",
  "italian",
  "japanese",
  "jewish",
  "korean",
  "latin-american",
  "mediterranean",
  "mexican",
  "middle-eastern",
  "nordic",
  "southern",
  "spanish",
  "thai",
  "vietnamese",
]

function formatCuisineName(cuisine: string): string {
  return cuisine
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function formatCuisineForAPI(cuisine: string): string {
  return cuisine.replace("-", " ")
}

export async function generateMetadata({ params }: CuisinePageProps): Promise<Metadata> {
  const cuisine = params.cuisine.toLowerCase()

  if (!validCuisines.includes(cuisine)) {
    return {
      title: "Cuisine Not Found - ZaikaRoots",
      description: "The requested cuisine could not be found.",
    }
  }

  const cuisineName = formatCuisineName(cuisine)

  return {
    title: `${cuisineName} Recipes - ZaikaRoots`,
    description: `Discover authentic ${cuisineName} recipes. Learn traditional cooking techniques and explore the rich flavors of ${cuisineName} cuisine.`,
    keywords: [cuisineName, "recipes", "cooking", "traditional", "authentic", "food"],
  }
}

export default function CuisinePage({ params, searchParams }: CuisinePageProps) {
  const cuisine = params.cuisine.toLowerCase()
  const page = Number.parseInt(searchParams.page || "1", 10)

  if (!validCuisines.includes(cuisine)) {
    notFound()
  }

  const cuisineName = formatCuisineName(cuisine)
  const apiCuisine = formatCuisineForAPI(cuisine)

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <CuisineBreadcrumb cuisineName={cuisineName} />

        <Suspense fallback={<LoadingSpinner />}>
          <CuisineRecipes cuisine={apiCuisine} cuisineName={cuisineName} page={page} />
        </Suspense>
      </div>
    </div>
  )
}
