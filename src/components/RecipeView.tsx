'use client';

import { useState, useMemo, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Clock, Users, Printer, ExternalLink, Play, Share2, 
  ChefHat, Timer, Flame, BookOpen, Heart, ShoppingCart,
  Check, Plus, Minus, Star, Bookmark, Download, Copy
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { scaleIngredients } from '@/utils/ingredientScaler';

export interface Recipe {
  id: string;
  title: string;
  description?: string;
  servings?: number;
  cookTime?: string;
  prepTime?: string;
  totalTime?: string;
  ingredients: string[];
  instructions: string[];
  notes?: string;
  nutrition?: {
    calories?: number;
    protein?: string;
    carbs?: string;
    fat?: string;
  };
  sourceUrl?: string;
  sourceName?: string;
  videoUrl?: string;
  hasVideo?: boolean;
  imageUrl?: string;
}

interface RecipeViewProps {
  recipe: Recipe;
  isLoading?: boolean;
}

const RecipeView = memo(function RecipeView({ recipe, isLoading = false }: RecipeViewProps) {
  const [multiplier, setMultiplier] = useState(1);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isSaved, setIsSaved] = useState(false);
  
  const scaledIngredients = useMemo(() => {
    if (!recipe.servings || multiplier === 1) return recipe.ingredients;
    const newServings = Math.round((recipe.servings || 4) * multiplier);
    return scaleIngredients(recipe.ingredients, recipe.servings || 4, newServings);
  }, [recipe.ingredients, recipe.servings, multiplier]);
  
  const toggleIngredient = useCallback((index: number) => {
    setCheckedIngredients(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  const toggleStep = useCallback((index: number) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);
  
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleSave = useCallback(() => {
    setIsSaved(!isSaved);
  }, [isSaved]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Card className="shadow-lg print-recipe">
          <CardContent className="p-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded-lg" />
              <div className="flex gap-4">
                <div className="h-6 w-24 bg-muted rounded" />
                <div className="h-6 w-20 bg-muted rounded" />
              </div>
              <div className="space-y-3">
                <div className="h-6 w-32 bg-muted rounded" />
                <div className="space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-muted/50 rounded" />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {/* Print-optimized version (hidden on screen) */}
      <div className="hidden print:block">
        <div className="print-recipe">
          <h1 className="recipe-title">{recipe.title}</h1>
          
          <div className="recipe-meta">
            {recipe.prepTime && <span>Prep: {recipe.prepTime}</span>}
            {recipe.cookTime && <span> • Cook: {recipe.cookTime}</span>}
            {recipe.totalTime && <span> • Total: {recipe.totalTime}</span>}
            {recipe.servings && <span> • Servings: {recipe.servings}</span>}
          </div>
          
          <div className="print-content">
            <div className="print-ingredients">
              <h2>Ingredients</h2>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            
            <div className="print-instructions">
              <h2>Instructions</h2>
              <ol>
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
          
          {recipe.notes && (
            <div className="print-notes">
              <h3>Notes</h3>
              <p>{recipe.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Screen version */}
      <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/20 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
          {/* Header Section */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl shadow-glow">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
              {/* Recipe Image */}
              {recipe.imageUrl && (
                <div className="flex-shrink-0 w-full lg:w-auto">
                  <div className="w-full h-64 lg:w-80 lg:h-60 rounded-2xl overflow-hidden bg-secondary/20 shadow-lg">
                    <Image
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      width={320}
                      height={240}
                      className="w-full h-full object-cover"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              )}
              
              {/* Recipe Info */}
              <div className="flex-1 min-w-0 w-full space-y-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-3 leading-tight print:text-center print:border-b print:border-black print:pb-2">
                    {recipe.title}
                  </h1>
                  
                  {recipe.sourceName && (
                    <p className="text-lg text-muted-foreground print:text-center print:text-black">
                      from <span className="font-semibold text-primary print:text-black">{recipe.sourceName}</span>
                    </p>
                  )}
                </div>

                {/* Recipe Meta Pills */}
                <div className="flex flex-wrap gap-3 recipe-meta print:justify-center print:border print:border-black print:p-2">
                  {recipe.servings && (
                    <div className="glass-card px-4 py-3 rounded-2xl shadow-sm">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary" />
                        <div className="flex items-center gap-2">
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMultiplier(Math.max(0.25, multiplier - 0.25))}
                            className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-bold flex items-center justify-center transition-all duration-200 touch-manipulation"
                          >
                            −
                          </motion.button>
                          <span className="font-bold text-foreground px-2 text-lg">{Math.round(recipe.servings * multiplier)}</span>
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMultiplier(multiplier + 0.25)}
                            className="w-8 h-8 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-bold flex items-center justify-center transition-all duration-200 touch-manipulation"
                          >
                            +
                          </motion.button>
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">servings</span>
                      </div>
                    </div>
                  )}
                  {recipe.totalTime && (
                    <div className="glass-card px-4 py-3 rounded-2xl shadow-sm">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <span className="font-bold text-foreground text-lg">{recipe.totalTime}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="no-print flex flex-wrap gap-3">
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold touch-manipulation"
                  >
                    <Printer className="h-5 w-5" />
                    Print Recipe
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold touch-manipulation"
                  >
                    <Share2 className="h-5 w-5" />
                    Share
                  </motion.button>
                  {recipe.sourceUrl && (
                    <Link
                      href={recipe.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-2xl hover:shadow-lg transition-all duration-300 font-semibold touch-manipulation"
                      >
                        <ExternalLink className="h-5 w-5" />
                        Original
                      </motion.div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Video Detection Beta Feature */}
          {recipe.hasVideo && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="no-print bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2">
                  <Play className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  <span className="text-xs sm:text-sm font-medium text-blue-900">
                    Video Detected (Beta)
                  </span>
                  <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    BETA
                  </div>
                </div>
                {recipe.videoUrl && (
                  <Link
                    href={recipe.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium touch-manipulation"
                  >
                    <Play className="h-3 w-3" />
                    Watch Video
                  </Link>
                )}
              </div>
              <p className="text-xs text-blue-700 mt-2">
                This recipe may have an associated cooking video. Video detection is in beta.
              </p>
            </motion.div>
          )}

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-12">
            {/* Ingredients Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="xl:col-span-1"
            >
              <div className="glass-card p-6 sm:p-8 rounded-3xl shadow-glow sticky top-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                    <span className="text-lg">🥗</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground">Ingredients</h2>
                </div>
                
                <div className="space-y-3 ingredients-list">
                  {scaledIngredients.map((ingredient, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.03, duration: 0.3 }}
                      className="group flex items-start gap-4 p-3 rounded-2xl hover:bg-secondary/30 cursor-pointer transition-all duration-200 touch-manipulation"
                      onClick={(e) => {
                        const target = e.currentTarget;
                        target.classList.toggle('line-through');
                        target.classList.toggle('opacity-50');
                      }}
                    >
                      <div className="w-3 h-3 rounded-full bg-primary/60 mt-2 flex-shrink-0 group-hover:bg-primary transition-colors duration-200" />
                      <span className="text-foreground text-sm sm:text-base leading-relaxed font-medium group-hover:text-primary/80 transition-colors duration-200">
                        {ingredient}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Directions Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="xl:col-span-2"
            >
              <div className="glass-card p-6 sm:p-8 rounded-3xl shadow-glow">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                    <span className="text-lg">👨‍🍳</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground">Directions</h2>
                </div>
                
                <div className="space-y-6 sm:space-y-8 instructions-list">
                  {recipe.instructions.map((instruction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                      className="group flex gap-4 sm:gap-6"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground rounded-2xl flex items-center justify-center text-lg sm:text-xl font-black shadow-lg group-hover:scale-105 transition-transform duration-200">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <p className="text-foreground text-base sm:text-lg leading-relaxed font-medium">
                          {instruction}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Information */}
          {recipe.notes && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="glass-card p-6 sm:p-8 rounded-3xl shadow-glow recipe-notes">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                    <span className="text-lg">📝</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground">Notes</h2>
                </div>
                <p className="text-foreground text-base sm:text-lg leading-relaxed font-medium">
                  {recipe.notes}
                </p>
              </div>
            </motion.div>
          )}

          {/* Nutrition */}
          {recipe.nutrition && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="glass-card p-6 sm:p-8 rounded-3xl shadow-glow">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                    <span className="text-lg">📊</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground">Nutrition</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  {recipe.nutrition.calories && (
                    <motion.div 
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="text-center p-4 sm:p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="text-2xl sm:text-3xl font-black text-primary mb-1">
                        {recipe.nutrition.calories}
                      </div>
                      <div className="text-sm font-semibold text-muted-foreground">Calories</div>
                    </motion.div>
                  )}
                  {recipe.nutrition.protein && (
                    <motion.div 
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="text-center p-4 sm:p-6 bg-gradient-to-br from-secondary/50 to-secondary/20 rounded-2xl border border-secondary/30 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="text-2xl sm:text-3xl font-black text-foreground mb-1">
                        {recipe.nutrition.protein}
                      </div>
                      <div className="text-sm font-semibold text-muted-foreground">Protein</div>
                    </motion.div>
                  )}
                  {recipe.nutrition.carbs && (
                    <motion.div 
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="text-center p-4 sm:p-6 bg-gradient-to-br from-accent/50 to-accent/20 rounded-2xl border border-accent/30 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="text-2xl sm:text-3xl font-black text-foreground mb-1">
                        {recipe.nutrition.carbs}
                      </div>
                      <div className="text-sm font-semibold text-muted-foreground">Carbs</div>
                    </motion.div>
                  )}
                  {recipe.nutrition.fat && (
                    <motion.div 
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="text-center p-4 sm:p-6 bg-gradient-to-br from-muted/50 to-muted/20 rounded-2xl border border-muted/30 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="text-2xl sm:text-3xl font-black text-foreground mb-1">
                        {recipe.nutrition.fat}
                      </div>
                      <div className="text-sm font-semibold text-muted-foreground">Fat</div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Source */}
          {recipe.sourceName && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="no-print text-center"
            >
              <div className="glass-card p-6 rounded-2xl shadow-sm">
                <p className="text-sm text-muted-foreground">
                  Recipe adapted from{' '}
                  {recipe.sourceUrl ? (
                    <Link
                      href={recipe.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary hover:text-primary/80 transition-colors touch-manipulation underline decoration-primary/30 hover:decoration-primary/60"
                    >
                      {recipe.sourceName}
                    </Link>
                  ) : (
                    <span className="font-semibold text-primary">{recipe.sourceName}</span>
                  )}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
    </>
  );
});

export default RecipeView;
