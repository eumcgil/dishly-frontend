'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Loader2, ChefHat, ExternalLink, Sparkles, ArrowRight, Check, Link2 as LinkIcon, AlertCircle, CheckCircle 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function InputForm() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [urlStatus, setUrlStatus] = useState<'empty' | 'invalid' | 'valid' | 'loading'>('empty');
  const router = useRouter();

  const validateUrl = (url: string): boolean => {
    if (!url) return false;
    
    try {
      // Add protocol if missing
      let urlToValidate = url;
      if (!url.match(/^https?:\/\//)) {
        urlToValidate = 'https://' + url;
      }
      
      const urlObj = new URL(urlToValidate);
      const isHttp = urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
      const hasValidDomain = urlObj.hostname.includes('.');
      return isHttp && hasValidDomain;
    } catch {
      return false;
    }
  };

  const preprocessUrl = (url: string): string => {
    const trimmed = url.trim();
    if (!trimmed) return '';
    
    // If it doesn't start with http/https, add https://
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      return `https://${trimmed}`;
    }
    return trimmed;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    
    if (error) setError(null);
    
    if (!newUrl.trim()) {
      setUrlStatus('empty');
    } else {
      const processedUrl = preprocessUrl(newUrl);
      if (validateUrl(processedUrl)) {
        setUrlStatus('valid');
      } else {
        setUrlStatus('invalid');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setError('Please enter a recipe URL');
      return;
    }

    const processedUrl = preprocessUrl(url);
    if (!validateUrl(processedUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    setIsLoading(true);
    setError(null);
    setUrlStatus('loading');

    try {
      const response = await fetch('/api/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: processedUrl }),
      });

      const data = await response.json();
      
      if (data.recipe_id) {
        // Navigate to recipe page
        await router.push(`/recipe/${data.recipe_id}`);
        return; // Exit early on success
      } else if (data.error || data.detail) {
        // Handle error from API
        throw new Error(data.error || data.detail || 'Failed to parse recipe');
      } else {
        throw new Error('No recipe ID received from server');
      }
    } catch (error: unknown) {
      console.error('Error parsing recipe:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to parse recipe. Please check the URL and try again.';
      setError(errorMessage);
      setIsLoading(false);
      setUrlStatus('invalid');
      return;
    }
    
    // Only reached on success
    setIsLoading(false);
    setUrlStatus('valid');
  };

  const getStatusColor = () => {
    switch (urlStatus) {
      case 'empty': return 'bg-gray-400';
      case 'invalid': return 'bg-red-500';
      case 'valid': return 'bg-green-500';
      case 'loading': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  const sitePills = [
    { name: 'AllRecipes', icon: '🍳' },
    { name: 'Food Network', icon: '📺' },
    { name: 'BBC Good Food', icon: '🇬🇧' },
    { name: 'Serious Eats', icon: '🔬' },
    { name: '500+ more', icon: '✨' }
  ];

  const exampleUrls = [
    'https://www.allrecipes.com/recipe/10813/best-chocolate-chip-cookies/',
    'https://www.bbcgoodfood.com/recipes/ultimate-chocolate-cake',
    'https://www.seriouseats.com/the-best-chili-recipe'
  ];

  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-4 sm:px-0"
      >
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden border-2 border-border/50 bg-gradient-to-br from-card via-card/95 to-primary/5 backdrop-blur-sm shadow-2xl rounded-3xl">
            {/* Decorative gradient orb */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
            
            <CardContent className="relative p-8 sm:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="text-center space-y-4">
                  <motion.div 
                    className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary via-red-500 to-orange-500 shadow-2xl"
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ChefHat className="w-10 h-10 text-white" />
                  </motion.div>
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
                      Drop Your Recipe URL
                    </h2>
                    <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-lg mx-auto">
                      Transform cluttered recipe pages into clean, beautiful formats in seconds
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-red-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative flex items-center">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                      <Input
                        type="text"
                        placeholder="https://example.com/amazing-recipe"
                        value={url}
                        onChange={handleInputChange}
                        className="text-base sm:text-lg h-16 sm:h-18 pl-14 pr-20 rounded-2xl border-2 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary focus:bg-background focus:shadow-lg transition-all duration-300 placeholder:text-muted-foreground/50 font-medium"
                        disabled={isLoading}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                        {url && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center"
                          >
                            {validateUrl(url) ? (
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="text-sm text-green-500 font-medium hidden sm:inline">
                                  Valid URL
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <AlertCircle className="w-5 h-5 text-amber-500" />
                                <span className="text-sm text-amber-500 font-medium hidden sm:inline">
                                  Invalid URL
                                </span>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl">
                          <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-5 h-5 text-destructive" />
                          </div>
                          <p className="text-sm font-medium text-destructive">{error}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    type="submit"
                    disabled={isLoading || !url.trim() || urlStatus === 'invalid'}
                    className="group w-full h-16 sm:h-18 text-lg font-bold rounded-2xl bg-gradient-to-r from-primary via-red-500 to-orange-500 hover:from-primary/90 hover:via-red-500/90 hover:to-orange-500/90 text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-3" />
                        <span>Extracting Recipe Magic...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Parse Recipe</span>
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </Button>
                </div>

                <div className="space-y-6">
                  {/* Example URLs */}
                  <div className="space-y-3">
                    <p className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Try an example
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {exampleUrls.slice(0, 2).map((exampleUrl, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            setUrl(exampleUrl);
                            setUrlStatus('valid');
                          }}
                          className="px-3 py-1.5 text-xs font-medium bg-muted/50 hover:bg-muted rounded-full transition-colors duration-200"
                        >
                          {exampleUrl.split('/')[2]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Supported Sites */}
                  <div className="space-y-4 pt-4 border-t border-border/50">
                    <p className="text-center text-sm font-medium text-muted-foreground">
                      Works with 500+ recipe sites including
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {sitePills.map((site, index) => (
                        <motion.span
                          key={site.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          whileHover={{ y: -2, scale: 1.05 }}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border/50 rounded-2xl hover:border-primary/50 hover:shadow-md transition-all duration-300 cursor-default"
                        >
                          <span className="text-base">{site.icon}</span>
                          <span className="text-sm font-semibold text-foreground">{site.name}</span>
                        </motion.span>
                      ))}
                    </div>
                    <Link href="/supported-sites" className="block">
                      <Button 
                        variant="ghost" 
                        className="w-full rounded-2xl hover:bg-muted/50 font-semibold group"
                      >
                        <ExternalLink className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                        View All Supported Sites
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>
  );
}