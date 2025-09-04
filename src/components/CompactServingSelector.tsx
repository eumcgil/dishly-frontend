'use client';

import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface CompactServingSelectorProps {
  originalServings: number;
  multiplier: number;
  onMultiplierChange: (newMultiplier: number) => void;
  className?: string;
}

export function CompactServingSelector({ 
  originalServings, 
  multiplier, 
  onMultiplierChange,
  className = ""
}: CompactServingSelectorProps) {
  // Only 3 clean options: half, original, double
  const options = [
    { multiplier: 1, label: `${originalServings}`, isOriginal: true },
    { multiplier: 2, label: `${originalServings * 2}`, isOriginal: false },
    { multiplier: 4, label: `${originalServings * 4}`, isOriginal: false },
  ];
  
  // const currentServings = Math.round(originalServings * multiplier);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2 text-sm">
        <Users className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Servings:</span>
      </div>
      
      <div className="flex items-center gap-1">
        {options.map((option) => {
          const isActive = Math.abs(multiplier - option.multiplier) < 0.01;
          
          return (
            <motion.div
              key={option.multiplier}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onMultiplierChange(option.multiplier)}
                className={`h-8 px-3 text-sm font-medium ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {option.label}
              </Button>
            </motion.div>
          );
        })}
        
        {multiplier !== 1 && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-2 text-xs text-blue-600 dark:text-blue-400 font-medium"
          >
            ({multiplier}x)
          </motion.span>
        )}
      </div>
    </div>
  );
}
