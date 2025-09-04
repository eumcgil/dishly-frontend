'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import RecipeViewNew from '@/components/RecipeViewNew';
import { Loader } from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Home, ChefHat } from 'lucide-react';
import Link from 'next/link';

// Mock recipe data for development
const mockRecipes: Record<string, Recipe> = {
  'chocolate-chip-cookies': {
    id: 'chocolate-chip-cookies',
    title: 'Classic Chocolate Chip Cookies',
    description: 'Soft, chewy chocolate chip cookies that are perfect every time. A family favorite recipe that never fails to deliver delicious results.',
    servings: 24,
    prepTime: '15 minutes',
    cookTime: '12 minutes',
    totalTime: '27 minutes',
    ingredients: [
      '2¼ cups all-purpose flour',
      '1 teaspoon baking soda',
      '1 teaspoon salt',
      '1 cup (2 sticks) butter, softened',
      '¾ cup granulated sugar',
      '¾ cup packed brown sugar',
      '2 large eggs',
      '2 teaspoons vanilla extract',
      '2 cups chocolate chips'
    ],
    instructions: [
      'Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.',
      'In a medium bowl, whisk together flour, baking soda, and salt. Set aside.',
      'In a large bowl, cream together the softened butter, granulated sugar, and brown sugar until light and fluffy, about 2-3 minutes.',
      'Beat in eggs one at a time, then stir in the vanilla extract.',
      'Gradually blend in the flour mixture until just combined. Don\'t overmix.',
      'Stir in the chocolate chips until evenly distributed.',
      'Drop rounded tablespoons of dough onto the prepared baking sheets, spacing them about 2 inches apart.',
      'Bake for 9-11 minutes or until golden brown around the edges. Centers may look slightly underbaked.',
      'Cool on baking sheet for 2 minutes, then remove to a wire rack to cool completely.'
    ],
    notes: 'For extra chewy cookies, slightly underbake them. Store in an airtight container for up to one week. Dough can be refrigerated for up to 3 days or frozen for up to 3 months.',
    nutrition: {
      calories: '185',
      protein: '2g',
      carbs: '26g',
      fat: '8g'
    },
    sourceUrl: 'https://example.com/chocolate-chip-cookies',
    sourceName: 'Example Recipe Site',
    author: 'John Doe',
    ratings: 4.5,
    ratingsCount: 100,
    cuisine: 'American',
    category: 'Desserts',
    keywords: ['cookies', 'chocolate chip', 'desserts'],
    language: 'English',
    dietaryRestrictions: ['vegetarian', 'contains gluten']
  }
};

interface Recipe {
  id: string;
  title: string;
  description?: string;
  servings?: number;
  yields?: string;
  cookTime?: string;
  prepTime?: string;
  totalTime?: string;
  ingredients: string[];
  instructions: string[];
  notes?: string;
  nutrition?: {
    calories?: string;
    protein?: string;
    carbs?: string;
    fat?: string;
    sugar?: string;
    sodium?: string;
    fiber?: string;
    cholesterol?: string;
    saturatedFat?: string;
  };
  sourceUrl: string;
  sourceName: string;
  videoUrl?: string;
  hasVideo?: boolean;
  imageUrl?: string;
  author?: string;
  ratings?: number;
  ratingsCount?: number;
  cuisine?: string;
  category?: string;
  keywords?: string[];
  language?: string;
  dietaryRestrictions?: string[];
}

export default function RecipePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const recipeId = params.id as string;
  const sourceUrl = searchParams.get('url');

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch recipe from API route
        const response = await fetch(`/api/recipe/${recipeId}`);
        
        if (response.ok) {
          const backendData = await response.json();
          // Map backend snake_case to frontend camelCase
          const mappedRecipe: Recipe = {
            id: backendData.id,
            title: backendData.title,
            description: backendData.description,
            servings: backendData.servings,
            yields: backendData.yields,
            cookTime: backendData.cook_time,
            prepTime: backendData.prep_time,
            totalTime: backendData.total_time,
            ingredients: backendData.ingredients || [],
            instructions: backendData.instructions || [],
            notes: backendData.notes,
            nutrition: backendData.nutrition,
            sourceUrl: backendData.source_url,
            sourceName: backendData.source_name,
            videoUrl: backendData.video_url,
            hasVideo: backendData.has_video,
            imageUrl: backendData.image_url,
            author: backendData.author,
            ratings: backendData.ratings,
            ratingsCount: backendData.ratings_count,
            cuisine: backendData.cuisine,
            category: backendData.category,
            keywords: backendData.keywords,
            language: backendData.language,
            dietaryRestrictions: backendData.dietary_restrictions
          };
          setRecipe(mappedRecipe);
        } else {
          // Fall back to mock data or create a sample recipe
          if (mockRecipes[recipeId]) {
            setRecipe(mockRecipes[recipeId]);
          } else {
            // Create a sample recipe based on the URL if provided
            const sampleRecipe: Recipe = {
              id: recipeId,
              title: 'Sample Recipe',
              description: 'This is a sample recipe to demonstrate the interface. In production, this would be parsed from the provided URL.',
              servings: 4,
              prepTime: '15 minutes',
              cookTime: '30 minutes',
              totalTime: '45 minutes',
              ingredients: [
                '2 cups sample ingredient',
                '1 tablespoon another ingredient',
                '1/2 cup third ingredient',
                '1 teaspoon seasoning',
                'Salt and pepper to taste'
              ],
              instructions: [
                'Prepare all ingredients according to the recipe requirements.',
                'Follow the cooking method as specified in the original recipe.',
                'Cook until done, checking for doneness indicators.',
                'Season to taste and serve immediately.',
                'Enjoy your delicious meal!'
              ],
              notes: 'This is a placeholder recipe. The actual recipe would be parsed from the URL you provided.',
              sourceUrl: sourceUrl || 'https://example.com',
              sourceName: sourceUrl ? new URL(sourceUrl).hostname.replace('www.', '') : 'Recipe Site'
            };
            setRecipe(sampleRecipe);
          }
        }
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Failed to load recipe. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId, sourceUrl]);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !recipe) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <Card>
          <CardContent className="p-8">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-semibold mb-2">Recipe Not Found</h1>
            <p className="text-muted-foreground mb-6">
              {error || "We couldn't find the recipe you're looking for."}
            </p>
            <Button asChild>
              <Link href="/" className="inline-flex items-center gap-2">
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <RecipeViewNew recipe={recipe} />;
}
