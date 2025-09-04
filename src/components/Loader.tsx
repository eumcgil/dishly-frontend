'use client';

import { motion } from 'framer-motion';
import { ChefHat } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function Loader() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card className="shadow-lg">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
              }}
              className="mx-auto w-16 h-16 flex items-center justify-center"
            >
              <ChefHat className="h-12 w-12 text-primary" />
            </motion.div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Parsing Recipe...</h2>
              <p className="text-muted-foreground">
                Extracting ingredients and instructions
              </p>
            </div>

            {/* Loading skeleton */}
            <div className="space-y-4 max-w-2xl mx-auto">
              {/* Title skeleton */}
              <div className="h-8 bg-muted rounded-lg animate-pulse" />
              
              {/* Meta info skeleton */}
              <div className="flex gap-4 justify-center">
                <div className="h-6 w-24 bg-muted rounded animate-pulse" />
                <div className="h-6 w-20 bg-muted rounded animate-pulse" />
              </div>

              {/* Ingredients skeleton */}
              <div className="space-y-2">
                <div className="h-6 w-32 bg-muted rounded animate-pulse mx-auto" />
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 bg-muted/50 rounded animate-pulse" />
                ))}
              </div>

              {/* Instructions skeleton */}
              <div className="space-y-2 pt-4">
                <div className="h-6 w-32 bg-muted rounded animate-pulse mx-auto" />
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 bg-muted/50 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function RecipeSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Title */}
      <div className="h-8 bg-muted rounded-lg" />
      
      {/* Meta */}
      <div className="flex gap-4">
        <div className="h-6 w-24 bg-muted rounded" />
        <div className="h-6 w-20 bg-muted rounded" />
      </div>

      {/* Ingredients */}
      <div className="space-y-3">
        <div className="h-6 w-32 bg-muted rounded" />
        <div className="space-y-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-muted/50 rounded" />
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="space-y-3">
        <div className="h-6 w-32 bg-muted rounded" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-8 bg-muted rounded" />
              <div className="h-4 bg-muted/50 rounded" />
              <div className="h-4 w-3/4 bg-muted/50 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
