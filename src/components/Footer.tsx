'use client';

import { motion } from 'framer-motion';
import { 
  ChefHat, Heart, ArrowUp 
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    explore: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Sample Recipe', href: '/recipe/chocolate-chip-cookies' },
    ],
  };

  return (
    <>
      <footer className="relative no-print border-t border-border/50 bg-gradient-to-b from-background via-background/95 to-muted/30 mt-auto overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
            {/* Brand section */}
            <div className="lg:col-span-2 space-y-4">
              <Link href="/" className="group inline-flex items-center space-x-3">
                <motion.div 
                  className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-red-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ scale: 1.05, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ChefHat className="w-6 h-6 text-white" />
                </motion.div>
                <div className="flex flex-col">
                  <span className="text-2xl font-extrabold text-foreground tracking-tight">
                    Dishly
                  </span>
                  <span className="text-xs font-medium text-muted-foreground -mt-1">
                    Clean Recipes, Pure Joy
                  </span>
                </div>
              </Link>
              
              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                Transform any recipe into a beautiful, distraction-free format that&apos;s 
                perfect for cooking. No ads, no life stories, just the recipe.
              </p>

            </div>

            {/* Links section */}
            <div className="lg:col-span-3 flex justify-end">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Explore
                </h3>
                <ul className="space-y-3">
                  {footerLinks.explore.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>


          {/* Bottom section */}
          <div className="border-t border-border/30 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <span>Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                </motion.div>
                <span>for home cooks everywhere</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0
        }}
        transition={{ duration: 0.2 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 p-3 rounded-2xl bg-gradient-to-br from-primary to-red-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </>
  );
}
