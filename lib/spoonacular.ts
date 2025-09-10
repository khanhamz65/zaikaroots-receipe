const SPOONACULAR_API_KEY = "a6b2ef3697184e85add6b56168832d46"
const BASE_URL = "https://api.spoonacular.com"

export interface Recipe {
  id: number
  title: string
  image: string
  summary?: string
  readyInMinutes?: number
  servings?: number
  cuisines?: string[]
  extendedIngredients?: Ingredient[]
  analyzedInstructions?: InstructionSet[]
  spoonacularScore?: number
  healthScore?: number
}

export interface Ingredient {
  id: number
  name: string
  amount: number
  unit: string
  original: string
}

export interface InstructionSet {
  name: string
  steps: InstructionStep[]
}

export interface InstructionStep {
  number: number
  step: string
}

export interface SearchResult {
  results: Recipe[]
  offset: number
  number: number
  totalResults: number
}

class SpoonacularAPI {
  private apiKey: string
  private baseUrl: string

  constructor() {
    this.apiKey = SPOONACULAR_API_KEY
    this.baseUrl = BASE_URL
  }

  private async makeRequest(endpoint: string, params: Record<string, any> = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`)
    url.searchParams.append("apiKey", this.apiKey)

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString())
      }
    })

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`Spoonacular API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getRandomRecipes(number = 12): Promise<{ recipes: Recipe[] }> {
    return this.makeRequest("/recipes/random", { number })
  }

  async searchRecipes(query: string, number = 20, offset = 0, cuisine?: string): Promise<SearchResult> {
    return this.makeRequest("/recipes/complexSearch", {
      query,
      number,
      offset,
      cuisine,
      addRecipeInformation: true,
      fillIngredients: true,
    })
  }

  async getRecipeInformation(id: number): Promise<Recipe> {
    return this.makeRequest(`/recipes/${id}/information`)
  }

  async getRecipesByCuisine(cuisine: string, number = 20, offset = 0): Promise<SearchResult> {
    return this.makeRequest("/recipes/complexSearch", {
      cuisine,
      number,
      offset,
      addRecipeInformation: true,
      fillIngredients: true,
    })
  }
}

export const spoonacularAPI = new SpoonacularAPI()
