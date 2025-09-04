'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestPage() {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testBackend = async () => {
    setLoading(true);
    setResult('Testing...');
    
    try {
      // Test health endpoint first
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
      console.log('Testing backend URL:', backendUrl);
      
      const healthResponse = await fetch(`${backendUrl}/health`);
      if (!healthResponse.ok) {
        throw new Error(`Health check failed: ${healthResponse.status}`);
      }
      
      const healthData = await healthResponse.json();
      setResult(prev => prev + `\n✅ Health check passed: ${JSON.stringify(healthData)}`);
      
      // Test parse endpoint
      const parseResponse = await fetch(`${backendUrl}/parse`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          url: 'https://www.recipetineats.com/thai-cashew-chicken-stir-fry/' 
        }),
      });
      
      if (!parseResponse.ok) {
        const errorData = await parseResponse.json();
        throw new Error(`Parse failed: ${parseResponse.status} - ${errorData.error}`);
      }
      
      const parseData = await parseResponse.json();
      setResult(prev => prev + `\n✅ Parse successful: ${parseData.recipe.title}`);
      setResult(prev => prev + `\n📝 Ingredients: ${parseData.recipe.ingredients.length}`);
      setResult(prev => prev + `\n📋 Instructions: ${parseData.recipe.instructions.length}`);
      
    } catch (error) {
      console.error('Test failed:', error);
      setResult(prev => prev + `\n❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Backend Integration Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={testBackend} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Testing...' : 'Test Backend Connection'}
          </Button>
          
          {result && (
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm whitespace-pre-wrap">{result}</pre>
            </div>
          )}
          
          <div className="text-sm text-muted-foreground">
            <p>Backend URL: {process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'}</p>
            <p>This page tests the connection between frontend and backend.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
