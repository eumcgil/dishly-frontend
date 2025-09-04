'use client';

import { useState, useMemo, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Clock, Users, Printer, ExternalLink, Play, Share2, 
  ChefHat, Timer, Flame, BookOpen, Heart, ShoppingCart,
  Check, Plus, Minus, Star, Bookmark, Download, Copy,
  Calendar, TrendingUp, Award, Info
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { scaleIngredients } from '@/utils/ingredientScaler';

export interface Recipe {
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
  sourceUrl?: string;
  sourceName?: string;
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

interface RecipeViewProps {
  recipe: Recipe;
  isLoading?: boolean;
}

const RecipeViewNew = memo(function RecipeViewNew({ recipe, isLoading = false }: RecipeViewProps) {
  const [multiplier, setMultiplier] = useState(1);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients');
  
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


  const handleShare = useCallback(async () => {
    // Use production domain in production, localhost in development
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://dishly.pro' 
      : window.location.origin;
    const shareUrl = `${baseUrl}${window.location.pathname}${window.location.search}`;
    const shareText = `Check out this recipe: ${recipe.title}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: shareText,
          url: shareUrl
        });
      } catch (err) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareMessage('Link copied to clipboard!');
        setTimeout(() => setShareMessage(null), 3000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  }, [recipe.title]);

  const progress = useMemo(() => {
    const totalSteps = recipe.instructions.length;
    const completedCount = completedSteps.size;
    return totalSteps > 0 ? (completedCount / totalSteps) * 100 : 0;
  }, [completedSteps.size, recipe.instructions.length]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <ChefHat className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-lg font-medium text-muted-foreground">Loading recipe...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      {/* Share Notification Toast */}
      <AnimatePresence>
        {shareMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-primary text-primary-foreground px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span className="font-semibold">{shareMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Recipe Header */}
            <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/50 overflow-hidden">
              <div className="p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Image Section */}
                  {recipe.imageUrl && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="lg:w-2/5"
                    >
                      <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                        <div className="aspect-[4/3] relative">
                          <Image
                            src={recipe.imageUrl}
                            alt={recipe.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        {recipe.hasVideo && (
                          <div className="absolute top-4 right-4">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg cursor-pointer"
                            >
                              <Play className="w-5 h-5 text-primary" />
                            </motion.div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Content Section */}
                  <div className="flex-1 space-y-6">
                    {/* Title & Description */}
                    <div>
                      <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-3"
                      >
                        {recipe.title}
                      </motion.h1>
                      {recipe.description && (
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="text-lg text-muted-foreground leading-relaxed"
                        >
                          {recipe.description}
                        </motion.p>
                      )}
                      {recipe.sourceName && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="mt-3 flex items-center gap-2 text-sm"
                        >
                          <Award className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">Recipe by</span>
                          <span className="font-semibold text-primary">{recipe.sourceName}</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Quick Stats */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex flex-wrap gap-3"
                    >
                      {recipe.totalTime && (
                        <div className="bg-primary/10 rounded-2xl px-5 py-3 flex items-center gap-3">
                          <Clock className="w-5 h-5 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">Total Time</p>
                            <p className="font-bold text-foreground">{recipe.totalTime}</p>
                          </div>
                        </div>
                      )}
                      {recipe.prepTime && (
                        <div className="bg-secondary/50 rounded-2xl px-5 py-3 flex items-center gap-3">
                          <Timer className="w-5 h-5 text-secondary-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Prep</p>
                            <p className="font-bold text-foreground">{recipe.prepTime}</p>
                          </div>
                        </div>
                      )}
                      {recipe.cookTime && (
                        <div className="bg-accent/50 rounded-2xl px-5 py-3 flex items-center gap-3">
                          <Flame className="w-5 h-5 text-accent-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Cook</p>
                            <p className="font-bold text-foreground">{recipe.cookTime}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-wrap gap-3"
                    >
                      <Button
                        onClick={handleShare}
                        size="lg"
                        className="rounded-2xl font-semibold transition-all duration-300 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex items-center gap-2"
                        >
                          <Share2 className="w-5 h-5" />
                          <span>Share Recipe</span>
                        </motion.div>
                      </Button>
                      <Button
                        onClick={handlePrint}
                        size="lg"
                        variant="outline"
                        className="rounded-2xl font-semibold"
                      >
                        <Printer className="w-5 h-5 mr-2" />
                        Print
                      </Button>
                      {recipe.sourceUrl && (
                        <Button
                          asChild
                          size="lg"
                          variant="outline"
                          className="rounded-2xl font-semibold"
                        >
                          <Link href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-5 h-5 mr-2" />
                            Original
                          </Link>
                        </Button>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Serving Adjuster */}
              {recipe.servings && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="border-t border-border/50 bg-muted/30 px-8 py-6"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-foreground">Adjust Servings:</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={() => setMultiplier(Math.max(0.5, multiplier - 0.5))}
                        size="icon"
                        variant="outline"
                        className="rounded-full w-10 h-10"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <div className="text-center min-w-[100px]">
                        <p className="text-2xl font-bold text-primary">{Math.round(recipe.servings * multiplier)}</p>
                        <p className="text-xs text-muted-foreground">servings</p>
                      </div>
                      <Button
                        onClick={() => setMultiplier(multiplier + 0.5)}
                        size="icon"
                        variant="outline"
                        className="rounded-full w-10 h-10"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Progress</span>
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Ingredients */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-20">
              <Card className="rounded-3xl shadow-xl border-border/50 overflow-hidden">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                        <ShoppingCart className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <h2 className="text-2xl font-extrabold text-foreground">Ingredients</h2>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {checkedIngredients.size}/{scaledIngredients.length}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6 max-h-[600px] overflow-y-auto">
                  <div className="space-y-2">
                    {scaledIngredients.map((ingredient, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.05 }}
                      >
                        <label
                          className={`flex items-start gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-muted/50 ${
                            checkedIngredients.has(index) ? 'bg-primary/5' : ''
                          }`}
                        >
                          <div className="mt-1">
                            <motion.div
                              animate={{ scale: checkedIngredients.has(index) ? [1, 1.2, 1] : 1 }}
                              className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-colors duration-200 ${
                                checkedIngredients.has(index)
                                  ? 'bg-primary border-primary'
                                  : 'border-border hover:border-primary/50'
                              }`}
                            >
                              {checkedIngredients.has(index) && (
                                <Check className="w-3 h-3 text-primary-foreground" />
                              )}
                            </motion.div>
                          </div>
                          <span
                            onClick={() => toggleIngredient(index)}
                            className={`flex-1 text-sm leading-relaxed transition-all duration-200 ${
                              checkedIngredients.has(index)
                                ? 'text-muted-foreground line-through'
                                : 'text-foreground'
                            }`}
                          >
                            {ingredient}
                          </span>
                        </label>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Right Content - Instructions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Instructions Card */}
            <Card className="rounded-3xl shadow-xl border-border/50 overflow-hidden">
              <div className="bg-gradient-to-br from-secondary/30 to-secondary/10 p-6 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center shadow-lg">
                    <BookOpen className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-foreground">Instructions</h2>
                </div>
              </div>
              <CardContent className="p-6 lg:p-8">
                <div className="space-y-6">
                  {recipe.instructions.map((instruction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className={`group relative ${
                        completedSteps.has(index) ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <motion.button
                            onClick={() => toggleStep(index)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-12 h-12 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 ${
                              completedSteps.has(index)
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-gradient-to-br from-muted to-muted/50 text-foreground hover:from-primary/20 hover:to-primary/10'
                            }`}
                          >
                            {completedSteps.has(index) ? (
                              <Check className="w-6 h-6 mx-auto" />
                            ) : (
                              index + 1
                            )}
                          </motion.button>
                        </div>
                        <div className="flex-1 pt-2">
                          <p className={`text-base leading-relaxed transition-all duration-200 ${
                            completedSteps.has(index)
                              ? 'text-muted-foreground line-through'
                              : 'text-foreground'
                          }`}>
                            {instruction}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            {recipe.notes && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Card className="rounded-3xl shadow-xl border-border/50 overflow-hidden">
                  <div className="bg-gradient-to-br from-accent/30 to-accent/10 p-6 border-b border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-lg">
                        <Info className="w-6 h-6 text-accent-foreground" />
                      </div>
                      <h2 className="text-2xl font-extrabold text-foreground">Chef's Notes</h2>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-base leading-relaxed text-foreground">
                      {recipe.notes}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Nutrition Section */}
            {recipe.nutrition && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <Card className="rounded-3xl shadow-xl border-border/50 overflow-hidden">
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 border-b border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-extrabold text-foreground">Nutrition Facts</h2>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {recipe.nutrition.calories && (
                        <motion.div
                          whileHover={{ y: -4 }}
                          className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-4 text-center border border-primary/20"
                        >
                          <p className="text-3xl font-extrabold text-primary mb-1">
                            {recipe.nutrition.calories}
                          </p>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Calories
                          </p>
                        </motion.div>
                      )}
                      {recipe.nutrition.protein && (
                        <motion.div
                          whileHover={{ y: -4 }}
                          className="bg-gradient-to-br from-secondary/20 to-secondary/30 rounded-2xl p-4 text-center border border-secondary/30"
                        >
                          <p className="text-3xl font-extrabold text-foreground mb-1">
                            {recipe.nutrition.protein}
                          </p>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Protein
                          </p>
                        </motion.div>
                      )}
                      {recipe.nutrition.carbs && (
                        <motion.div
                          whileHover={{ y: -4 }}
                          className="bg-gradient-to-br from-accent/20 to-accent/30 rounded-2xl p-4 text-center border border-accent/30"
                        >
                          <p className="text-3xl font-extrabold text-foreground mb-1">
                            {recipe.nutrition.carbs}
                          </p>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Carbs
                          </p>
                        </motion.div>
                      )}
                      {recipe.nutrition.fat && (
                        <motion.div
                          whileHover={{ y: -4 }}
                          className="bg-gradient-to-br from-muted to-muted/50 rounded-2xl p-4 text-center border border-border"
                        >
                          <p className="text-3xl font-extrabold text-foreground mb-1">
                            {recipe.nutrition.fat}
                          </p>
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Fat
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
});

export default RecipeViewNew;
