import { CuisineCard } from "@/components/cuisine-card"

const cuisines = [
  {
    name: "Indian",
    slug: "indian",
    description: "Rich spices, aromatic curries, and traditional techniques",
    image: "/indian-curry-spices-traditional-food.jpg",
    color: "from-orange-500 to-red-600",
  },
  {
    name: "Italian",
    slug: "italian",
    description: "Fresh pasta, wood-fired pizzas, and Mediterranean flavors",
    image: "/italian-pasta-pizza-mediterranean-food.jpg",
    color: "from-green-500 to-red-500",
  },
  {
    name: "Chinese",
    slug: "chinese",
    description: "Stir-fries, dumplings, and balanced flavors",
    image: "/chinese-stir-fry-dumplings-wok-cooking.jpg",
    color: "from-red-600 to-yellow-500",
  },
  {
    name: "Mexican",
    slug: "mexican",
    description: "Bold spices, fresh salsas, and vibrant colors",
    image: "/mexican-tacos-salsa-colorful-food.jpg",
    color: "from-green-600 to-red-600",
  },
  {
    name: "Japanese",
    slug: "japanese",
    description: "Fresh sushi, delicate flavors, and artful presentation",
    image: "/japanese-sushi-sashimi-elegant-presentation.jpg",
    color: "from-pink-500 to-red-500",
  },
  {
    name: "French",
    slug: "french",
    description: "Classic techniques, rich sauces, and elegant dishes",
    image: "/french-cuisine-elegant-classic-dishes.jpg",
    color: "from-blue-600 to-purple-600",
  },
  {
    name: "Thai",
    slug: "thai",
    description: "Sweet, sour, salty, and spicy in perfect harmony",
    image: "/thai-pad-thai-curry-coconut-food.jpg",
    color: "from-green-500 to-yellow-500",
  },
  {
    name: "Mediterranean",
    slug: "mediterranean",
    description: "Olive oil, fresh herbs, and healthy ingredients",
    image: "/mediterranean-olive-oil-herbs-healthy-food.jpg",
    color: "from-blue-500 to-green-500",
  },
  {
    name: "Korean",
    slug: "korean",
    description: "Fermented flavors, spicy kimchi, and BBQ",
    image: "/korean-kimchi-bbq-spicy-food.jpg",
    color: "from-red-500 to-orange-500",
  },
  {
    name: "American",
    slug: "american",
    description: "Comfort food, BBQ, and regional specialties",
    image: "/american-bbq-burger-comfort-food.jpg",
    color: "from-blue-600 to-red-600",
  },
  {
    name: "Middle Eastern",
    slug: "middle-eastern",
    description: "Aromatic spices, grilled meats, and ancient grains",
    image: "/middle-eastern-spices-grilled-meat-hummus.jpg",
    color: "from-yellow-600 to-orange-600",
  },
  {
    name: "Spanish",
    slug: "spanish",
    description: "Paella, tapas, and vibrant Mediterranean flavors",
    image: "/spanish-paella-tapas-mediterranean-food.jpg",
    color: "from-yellow-500 to-red-500",
  },
]

export function CuisineGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cuisines.map((cuisine) => (
        <CuisineCard key={cuisine.slug} cuisine={cuisine} />
      ))}
    </div>
  )
}
