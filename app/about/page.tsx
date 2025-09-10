import { ChefHat, Globe, Heart, Search, Star, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About ZaikaRoots - Discover Amazing Recipes",
  description:
    "Learn about ZaikaRoots, your gateway to discovering authentic recipes from around the world. Powered by Spoonacular API with thousands of recipes from diverse cuisines.",
  keywords: ["about", "ZaikaRoots", "recipe app", "Spoonacular API", "cooking", "food", "cuisines"],
}

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <ChefHat className="h-12 w-12 text-primary" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-balance mb-4">
            About <span className="text-primary">ZaikaRoots</span>
          </h1>
          <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Connecting you to the roots of flavor through authentic recipes from around the world.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Our Mission</h2>
            <p className="text-lg text-muted-foreground text-center text-pretty leading-relaxed">
              ZaikaRoots is more than just a recipe app – it's your culinary passport to explore the rich tapestry of
              global cuisines. We believe that food connects cultures, tells stories, and brings people together. Our
              mission is to make authentic recipes from around the world accessible to home cooks everywhere, helping
              you discover new flavors and connect with culinary traditions.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">What Makes ZaikaRoots Special</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Search className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Smart Search</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Find recipes by ingredients, dish names, or cooking methods with our intelligent search system.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Global Cuisines</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Explore authentic recipes from over 50 different cuisines and culinary traditions worldwide.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Personal Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Save your favorite recipes and build your personal cookbook for easy access anytime.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Quality Recipes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Every recipe includes detailed instructions, ingredient lists, and nutritional information.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Serving Adjustments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Easily adjust ingredient quantities based on the number of servings you need.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                <ChefHat className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Step-by-Step</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Clear, numbered instructions guide you through each recipe from start to finish.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center">Powered by Quality Technology</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <h3 className="font-semibold mb-3">Recipe Data</h3>
              <p className="text-muted-foreground mb-4">
                ZaikaRoots is powered by the{" "}
                <a
                  href="https://spoonacular.com/food-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  Spoonacular API
                </a>
                , providing access to over 380,000 recipes with detailed nutritional information, ingredient data, and
                cooking instructions.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary">Next.js 14</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Tailwind CSS</Badge>
              <Badge variant="secondary">Spoonacular API</Badge>
              <Badge variant="secondary">Responsive Design</Badge>
              <Badge variant="secondary">Dark Mode</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">380,000+</div>
            <div className="text-muted-foreground">Recipes Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Global Cuisines</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Always Available</div>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Cooking?</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Join thousands of home cooks discovering new flavors and perfecting their favorite dishes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/search">
                  <Search className="mr-2 h-5 w-5" />
                  Start Exploring Recipes
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/categories">
                  <Globe className="mr-2 h-5 w-5" />
                  Browse Cuisines
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
