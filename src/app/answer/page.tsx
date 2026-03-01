'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { ArrowLeft, BookOpen, MessageSquare, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';

/**
 * Answer View Component
 * Displays the full philosophical inquiry and its academic response.
 */
function AnswerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const question = searchParams.get('q');
  const answer = searchParams.get('a');

  if (!question || !answer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-medium">
        <MessageSquare className="size-12 text-muted-foreground opacity-20" />
        <h2 className="text-xl font-bold font-headline">Content unavailable</h2>
        <p className="text-muted-foreground text-sm">The requested answer could not be retrieved from the current context.</p>
        <Button variant="ghost" onClick={() => router.back()} className="mt-medium">
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-xlarge py-large animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="space-y-medium">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.back()}
          className="text-muted-foreground hover:text-primary -ml-3 transition-colors"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to Subject
        </Button>
        
        <div className="space-y-small">
          <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-widest">
            <Quote className="size-3" />
            Philosophical Inquiry
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-headline leading-tight text-foreground tracking-tight">
            {question}
          </h2>
        </div>
      </header>

      <Separator className="bg-border/50" />

      <article className="prose prose-invert max-w-none">
        <div className="flex items-start gap-large">
          <div className="hidden md:flex flex-col items-center gap-2 pt-1 opacity-20">
            <div className="w-px h-12 bg-primary" />
            <BookOpen className="size-5" />
            <div className="w-px h-full bg-border" />
          </div>
          <div className="flex-1">
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-body whitespace-pre-wrap selection:bg-primary/30">
              {answer}
            </p>
          </div>
        </div>
      </article>

      <footer className="pt-xlarge border-t border-border/20 text-center">
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] font-medium">
          Academic Archive • Reference Verified
        </p>
      </footer>
    </div>
  );
}

export default function AnswerPage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="p-xlarge text-center text-muted-foreground italic font-headline">Retrieving academic record...</div>}>
        <AnswerContent />
      </Suspense>
    </AppShell>
  );
}
