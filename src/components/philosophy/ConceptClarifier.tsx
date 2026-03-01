"use client";

import React, { useState } from 'react';
import { clarifyConcept } from '@/ai/flows/concept-clarifier-tool';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Sparkles, BookOpen } from 'lucide-react';
import { APP_STRINGS } from '@/lib/constants';

export function ConceptClarifier() {
  const [concept, setConcept] = useState('');
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClarify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!concept.trim()) return;

    setLoading(true);
    try {
      const result = await clarifyConcept({ concept });
      setExplanation(result.explanation);
    } catch (error) {
      console.error('Failed to clarify concept:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-large">
      <Card className="dark-academic-card overflow-hidden">
        <CardHeader className="bg-primary/5 border-b border-border/50">
          <CardTitle className="flex items-center gap-small font-headline text-lg">
            <Sparkles className="size-5 text-accent" />
            AI Concept Clarifier
          </CardTitle>
        </CardHeader>
        <CardContent className="p-large">
          <form onSubmit={handleClarify} className="flex gap-small">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder={APP_STRINGS.SEARCH_PLACEHOLDER}
                className="pl-10 h-12 bg-secondary/50 border-border focus:ring-primary"
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading || !concept.trim()}
              className="h-12 px-large bg-primary hover:bg-primary/90 transition-colors"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Clarify'}
            </Button>
          </form>

          {explanation && (
            <div className="mt-large animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="rounded-lg bg-secondary/30 p-large border border-border">
                <div className="flex items-start gap-medium">
                  <BookOpen className="size-5 text-accent mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-accent mb-small capitalize">{concept}</h4>
                    <p className="text-foreground leading-relaxed text-bodyMedium">
                      {explanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
