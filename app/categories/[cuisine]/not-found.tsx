import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <Globe className="mx-auto h-16 w-16 text-muted-foreground/50" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Cuisine Not Found</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the cuisine you're looking for. It might not be available in our collection yet.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/categories">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Browse All Cuisines
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/search">Search Recipes</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
