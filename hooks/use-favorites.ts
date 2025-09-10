"use client"

import { useState, useEffect } from "react"
import type { Recipe } from "@/lib/spoonacular"

const FAVORITES_KEY = "zaikaroots-favorites"

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY)
      if (stored) {
        setFavorites(JSON.parse(stored))
      }
    } catch (error) {
      console.error("Error loading favorites:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
      } catch (error) {
        console.error("Error saving favorites:", error)
      }
    }
  }, [favorites, isLoaded])

  const addFavorite = (recipe: Recipe) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === recipe.id)) {
        return prev // Already exists
      }
      return [...prev, recipe]
    })
  }

  const removeFavorite = (recipeId: number) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== recipeId))
  }

  const isFavorite = (recipeId: number) => {
    return favorites.some((fav) => fav.id === recipeId)
  }

  const clearFavorites = () => {
    setFavorites([])
  }

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
    isLoaded,
  }
}
