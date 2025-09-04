'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users } from 'lucide-react';
import Link from 'next/link';
import type { Recipe } from './RecipeView';

interface RecipeCardProps {
  recipe: Partial<Recipe>;
  href: string;
}

export function RecipeCard({ recipe, href }: RecipeCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
        <Link href={href} className="block h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
              {recipe.title || 'Untitled Recipe'}
            </CardTitle>
            {recipe.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {recipe.description}
              </p>
            )}
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {recipe.servings && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{recipe.servings}</span>
                </div>
              )}
              {recipe.totalTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{recipe.totalTime}</span>
                </div>
              )}
            </div>
            
            {recipe.ingredients && recipe.ingredients.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-muted-foreground mb-1">
                  {recipe.ingredients.length} ingredients
                </p>
                <p className="text-sm line-clamp-1">
                  {recipe.ingredients.slice(0, 3).join(', ')}
                  {recipe.ingredients.length > 3 && '...'}
                </p>
              </div>
            )}
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
}
