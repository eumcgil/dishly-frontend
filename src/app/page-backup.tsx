'use client';

import { motion } from 'framer-motion';
import InputForm from '@/components/InputForm';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 sm:py-24 max-w-7xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8 mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8, type: "spring", bounce: 0.3 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-primary/10 p-4 rounded-2xl">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🍽️</span>
              </div>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-none"
          >
            <span className="gradient-text block">
              Beautiful
            </span>
            <span className="text-foreground block mt-2">
              Recipe Parser
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Transform any recipe URL into a stunning, distraction-free format.{' '}
            <span className="text-primary font-semibold">No ads, no clutter</span> &mdash; 
            just the recipe you need, beautifully presented.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">500+ Sites Supported</span>
            </div>
            <div className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-foreground/60 rounded-full"></div>
              <span className="text-sm font-medium text-foreground/80">Print Optimized</span>
            </div>
            <div className="flex items-center gap-2 bg-accent/50 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-foreground/60 rounded-full"></div>
              <span className="text-sm font-medium text-foreground/80">Mobile Friendly</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative"
        >
          <InputForm />
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {[
            {
              title: 'Lightning Fast',
              description: 'Extract and parse recipes from any cooking website in under 3 seconds',
              icon: '⚡',
              color: 'from-yellow-400 to-orange-500'
            },
            {
              title: 'Beautifully Clean',
              description: 'Distraction-free layout that focuses on what matters most — the recipe',
              icon: '✨',
              color: 'from-purple-400 to-pink-500'
            },
            {
              title: 'Print Perfect',
              description: 'Optimized formatting for printing, saving, and sharing your favorite recipes',
              icon: '🖨️',
              color: 'from-blue-400 to-cyan-500'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative"
            >
              <div className="glass-card p-8 rounded-2xl shadow-glow hover:shadow-xl transition-all duration-300 h-full">
                <div className="text-center space-y-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  </motion.div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-24 text-center"
        >
          <div className="glass-card p-8 sm:p-12 rounded-3xl shadow-glow max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to transform your cooking?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of home cooks who've simplified their recipe collection with our beautiful parser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full border-2 border-background"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full border-2 border-background"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-background"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white">
                    +
                  </div>
                </div>
                <span>Trusted by 10,000+ cooks</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
