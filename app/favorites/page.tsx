import { FavoritesContent } from "@/components/favorites-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Favorite Recipes - ZaikaRoots",
  description:
    "View and manage your saved favorite recipes. Keep track of all the delicious dishes you want to cook again.",
  keywords: ["favorites", "saved recipes", "bookmarks", "my recipes"],
}

export default function FavoritesPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <FavoritesContent />
      </div>
    </div>
  )
}
