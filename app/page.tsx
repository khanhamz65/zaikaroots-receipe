import { Suspense } from "react"
import { HeroSection } from "@/components/hero-section"
import { FeaturedRecipes } from "@/components/featured-recipes"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedRecipes />
      </Suspense>
    </div>
  )
}
