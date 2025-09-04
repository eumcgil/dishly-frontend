'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ChefHat, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServingCalculatorProps {
  originalServings: number;
  multiplier: number;
  onMultiplierChange: (newMultiplier: number) => void;
  className?: string;
}

export function ServingCalculator({ 
  originalServings, 
  multiplier, 
  onMultiplierChange,
  className = ""
}: ServingCalculatorProps) {
  // Preset multipliers for clean scaling
  const multipliers = [0.5, 1, 2, 3, 4, 6, 8];
  
  const currentServings = Math.round(originalServings * multiplier);
  const isScaled = Math.abs(multiplier - 1) > 0.01;

  return (
    <Card className={`${className} bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800 shadow-lg`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
            <ChefHat className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          Recipe Scaling
          {isScaled && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full"
            >
              <Sparkles className="h-3 w-3" />
              Active
            </motion.div>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Current Serving Display */}
        <div className="flex items-center justify-between p-3 bg-white/50 dark:bg-black/20 rounded-lg border">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Servings:</span>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {currentServings}
            </div>
            {isScaled && (
              <div className="text-xs text-muted-foreground">
                was {originalServings}
              </div>
            )}
          </div>
        </div>

        {/* Multiplier Buttons */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Choose scaling:</div>
          <div className="grid grid-cols-4 gap-2">
            {multipliers.map((mult) => {
              const servings = Math.round(originalServings * mult);
              const isActive = Math.abs(multiplier - mult) < 0.01;
              const isHalf = mult === 0.5;
              
              return (
                <motion.div
                  key={mult}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => onMultiplierChange(mult)}
                    className={`w-full h-auto p-3 flex flex-col gap-1 ${
                      isActive 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg' 
                        : 'hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300'
                    }`}
                  >
                    <div className="text-sm font-bold">
                      {isHalf ? '½x' : `${mult}x`}
                    </div>
                    <div className="text-xs opacity-75">
                      {servings} serves
                    </div>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Scaling Info */}
        {isScaled && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-blue-100/50 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-700 dark:text-blue-300 font-medium">
                Recipe scaled by {multiplier === 0.5 ? '½' : multiplier}x
              </span>
              <span className="text-blue-600 dark:text-blue-400 text-xs">
                All ingredients adjusted
              </span>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
