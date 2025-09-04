'use client';

import { motion, AnimatePresence } from 'framer-motion';
import InputForm from '@/components/InputForm';
import SystemStatus from '@/components/SystemStatus';
import { 
  ChefHat, Sparkles, Clock, Globe, Zap, Shield, 
  Star, Users, TrendingUp, Award, CheckCircle, ArrowRight,
  Smartphone, Palette, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "Ad-Free Experience",
      description: "No popups, no distractions. Just pure recipe content in a beautiful, clean interface.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      icon: Globe,
      title: "500+ Supported Sites",
      description: "Compatible with all major recipe websites. One click to transform any recipe.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant recipe parsing with smart AI. Get your recipes cleaned up in seconds.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Perfect for cooking with your phone or tablet. Responsive design that works everywhere.",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      icon: FileText,
      title: "Print Ready",
      description: "Beautiful print layouts that save paper and look professional in your recipe book.",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20"
    },
    {
      icon: Palette,
      title: "Customizable",
      description: "Adjust serving sizes, check off ingredients, and track your cooking progress.",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20"
    }
  ];

  const stats = [
    { value: "10K+", label: "Happy Cooks" },
    { value: "500+", label: "Supported Sites" },
    { value: "4.9★", label: "User Rating" },
    { value: "<2s", label: "Parse Time" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/20">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <div className="container mx-auto px-4 py-12 sm:py-20">
          <div className="max-w-7xl mx-auto space-y-20">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">AI-Powered Recipe Parser</span>
              </motion.div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight tracking-tight">
                  Transform Any Recipe
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-orange-500">
                    Into Pure Delight
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Extract recipes from any website. No ads, no stories, no clutter.
                  <span className="block mt-2 font-semibold text-foreground">Just beautiful, clean recipes.</span>
                </p>
              </div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap justify-center gap-6 text-sm"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground">No Sign-up Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground">100% Free Forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-muted-foreground">Works Instantly</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Input Form with enhanced styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <InputForm />
            </motion.div>

            {/* System Status */}
            <SystemStatus />

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-3xl font-extrabold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Features Grid */}
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center space-y-4"
              >
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                  Everything You Need for Perfect Recipes
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Powerful features designed to make your cooking experience delightful
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                      className="group"
                    >
                      <Card className="h-full p-8 rounded-3xl border-border/50 hover:border-border hover:shadow-2xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
                        <div className={`w-14 h-14 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border ${feature.borderColor}`}>
                          <Icon className={`w-7 h-7 ${feature.color}`} />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Testimonial Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="relative"
            >
              <Card className="p-12 rounded-3xl bg-gradient-to-br from-primary/5 via-card to-secondary/5 border-border/50">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <blockquote className="text-2xl font-medium text-foreground leading-relaxed">
                    "This app has completely changed how I save and organize recipes. No more scrolling through endless blog posts to find the actual recipe!"
                  </blockquote>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-bold">
                      SC
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-foreground">Sarah Chen</p>
                      <p className="text-sm text-muted-foreground">Home Chef & Food Blogger</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="text-center space-y-8 py-12"
            >
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                  Start Cooking Smarter Today
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of home cooks who've simplified their recipe collection
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="rounded-2xl px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => document.querySelector('input')?.focus()}
                >
                  <ChefHat className="w-5 h-5 mr-2" />
                  Try It Now - It's Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-2xl px-8 py-6 text-lg font-semibold"
                  asChild
                >
                  <Link href="/recipe/chocolate-chip-cookies">
                    View Sample Recipe
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-8 pt-8">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background flex items-center justify-center text-white font-bold text-sm"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">Loved by 10,000+ home cooks</p>
                  <p className="text-xs text-muted-foreground">No credit card required</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
