



'use client';

import { motion } from 'framer-motion';
import { ChefHat, Heart, Sparkles, Code, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get clean recipes in seconds, not minutes'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'No tracking, no ads, just recipes'
    },
    {
      icon: Code,
      title: 'Open Source',
      description: 'Built with transparency and community in mind'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-red-500/20 mb-4"
            >
              <ChefHat className="w-10 h-10 text-primary" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-red-500 bg-clip-text text-transparent">
              About Dishly
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A simple, beautiful tool that transforms cluttered recipe pages into clean, 
              distraction-free cooking experiences.
            </p>
          </div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-muted/30 rounded-2xl p-8 border border-border/50"
          >
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-semibold">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We believe cooking should be about the joy of creating delicious meals, not scrolling 
              through endless ads and life stories. This tool was born from the frustration of trying 
              to find the actual recipe on bloated recipe websites. Our goal is simple: give you the 
              recipe, beautifully formatted, without the distractions.
            </p>
          </motion.div>

          {/* Features */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">Why Use Dishly?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-background rounded-xl p-6 border border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <Icon className="w-8 h-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* How it works */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold text-center">How It Works</h2>
            <div className="bg-muted/30 rounded-2xl p-8 border border-border/50 space-y-4">
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 text-primary font-semibold flex items-center justify-center text-sm">1</span>
                  <span className="text-muted-foreground">Paste any recipe URL into the input field</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 text-primary font-semibold flex items-center justify-center text-sm">2</span>
                  <span className="text-muted-foreground">Our system extracts the recipe content</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/20 text-primary font-semibold flex items-center justify-center text-sm">3</span>
                  <span className="text-muted-foreground">Get a beautiful, clean recipe page ready for cooking</span>
                </li>
              </ol>
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold text-center">Built With Modern Tech</h2>
            <div className="bg-muted/30 rounded-2xl p-8 border border-border/50">
              <p className="text-muted-foreground mb-4">
                This project is built with cutting-edge web technologies for the best possible experience:
              </p>
              <div className="flex flex-wrap gap-3">
                {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'FastAPI'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-background rounded-lg border border-border/50 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="text-center space-y-6 pt-8"
          >
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4" />
              <span>100% Free • No Sign-up Required</span>
            </div>
            
            <div>
              <Link href="/">
                <Button 
                  size="lg" 
                  className="rounded-xl bg-gradient-to-r from-primary to-red-500 hover:from-primary/90 hover:to-red-500/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Cleaning Recipes
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
