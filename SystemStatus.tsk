'use client';

import { motion } from 'framer-motion';
import { Activity, CheckCircle } from 'lucide-react';

interface SystemStatusProps {
  className?: string;
}

// Seeded random number generator based on date
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Get consistent percentage for current day
function getDailyStatusPercentage(): number {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const random = seededRandom(seed);
  // Range: 55% to 90%
  return Math.floor(55 + (random * 35));
}

export default function SystemStatus({ className = '' }: SystemStatusProps) {
  const percentage = getDailyStatusPercentage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className={`max-w-4xl mx-auto ${className}`}
    >
      <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Activity className="w-6 h-6 text-green-500" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-muted-foreground mb-1">
                System Status
              </p>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <p className="text-foreground font-semibold">
                  Currently <span className="text-primary font-bold">{percentage}%</span> of supported websites are working right now
                </p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="hidden sm:flex items-center gap-3 min-w-[120px]">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
              />
            </div>
            <span className="text-sm font-semibold text-primary min-w-[3ch]">
              {percentage}%
            </span>
          </div>
        </div>

        {/* Mobile-only percentage display */}
        <div className="sm:hidden mt-3 flex justify-center">
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
            <span className="text-sm font-semibold text-primary">{percentage}%</span>
            <span className="text-xs text-muted-foreground">operational</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
