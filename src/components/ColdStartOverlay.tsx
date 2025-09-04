'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface ColdStartOverlayProps {
  isVisible: boolean;
}

export default function ColdStartOverlay({ isVisible }: ColdStartOverlayProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="text-sm text-muted-foreground">
          Starting backend service...
        </p>
      </div>
    </motion.div>
  );
}
