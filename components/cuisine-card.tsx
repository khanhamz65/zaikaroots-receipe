"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CuisineCardProps {
  cuisine: {
    name: string
    slug: string
    description: string
    image: string
    color: string
  }
}

export function CuisineCard({ cuisine }: CuisineCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={cuisine.image || "/placeholder.svg"}
            alt={`${cuisine.name} cuisine`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${cuisine.color} opacity-20 group-hover:opacity-30 transition-opacity`}
          />
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <h3 className="text-xl font-bold mb-2">{cuisine.name}</h3>
          <p className="text-sm text-white/90 mb-4 line-clamp-2">{cuisine.description}</p>

          <Button asChild size="sm" className="self-start bg-white/20 hover:bg-white/30 text-white border-white/30">
            <Link href={`/categories/${cuisine.slug}`}>
              Explore Recipes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  )
}
