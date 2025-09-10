import { ChefHat, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { InstructionSet } from "@/lib/spoonacular"

interface RecipeInstructionsProps {
  instructions: InstructionSet[]
}

export function RecipeInstructions({ instructions }: RecipeInstructionsProps) {
  if (!instructions || instructions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChefHat className="h-5 w-5" />
            Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No cooking instructions available.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="h-5 w-5" />
          Instructions
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {instructions.map((instructionSet, setIndex) => (
          <div key={setIndex}>
            {/* Instruction Set Name */}
            {instructionSet.name && instructionSet.name.trim() && (
              <div className="mb-4">
                <Badge variant="outline" className="text-sm">
                  {instructionSet.name}
                </Badge>
              </div>
            )}

            {/* Steps */}
            <div className="space-y-4">
              {instructionSet.steps.map((step) => (
                <div key={step.number} className="flex gap-4">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {step.number}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 pt-1">
                    <p className="text-foreground leading-relaxed">{step.step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Cooking Tips */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Cooking Tips</span>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Read through all instructions before starting</li>
            <li>• Prepare all ingredients beforehand (mise en place)</li>
            <li>• Taste and adjust seasonings as needed</li>
            <li>• Don't be afraid to make it your own!</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
