'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { ArrowLeft, BookOpen, MessageSquare, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Suspense, useEffect, useState } from 'react';
import { setLastRead, isBookmarked, toggleBookmark } from '@/lib/storage-service';
import { SearchResult } from '@/lib/search-service';
import { useToast } from '@/hooks/use-toast';

/**
 * Answer View Component - Premium Polish
 * Provides an optimal reading environment with high line-height and clear hierarchy.
 */
function AnswerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const question = searchParams.get('q');
  const answer = searchParams.get('a');
  const subjectCode = searchParams.get('sc') || 'N/A';
  const subjectName = searchParams.get('sn') || 'General Archive';
  const unitTitle = searchParams.get('ut') || 'Reference Material';

  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (question && answer) {
      const item: SearchResult = {
        question,
        answer,
        subjectCode,
        subjectName,
        unitTitle
      };
      setLastRead(item);
      setBookmarked(isBookmarked(question));
    }
  }, [question, answer, subjectCode, subjectName, unitTitle]);

  const handleToggleBookmark = () => {
    if (!question || !answer) return;
    
    const item: SearchResult = {
      question,
      answer,
      subjectCode,
      subjectName,
      unitTitle
    };
    
    const added = toggleBookmark(item);
    setBookmarked(added);
    
    toast({
      title: added ? "Bookmark Added" : "Bookmark Removed",
      description: added ? "This inquiry has been saved to your collection." : "The inquiry was removed from your collection.",
    });
  };

  if (!question || !answer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-medium animate-in fade-in duration-700">
        <MessageSquare className="size-12 text-muted-foreground/20" />
        <h2 className="text-xl font-bold font-headline text-foreground">Content Unavailable</h2>
        <p className="text-muted-foreground text-sm text-center max-w-xs">The requested academic record could not be retrieved from the local cache.</p>
        <Button 
          variant="outline" 
          onClick={() => router.back()} 
          className="mt-medium rounded-full border-primary/30 text-primary hover:bg-primary/5"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-xlarge py-large animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out">
      <header className="space-y-medium">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()}
            className="text-muted-foreground hover:text-primary -ml-3 transition-all hover:pl-2"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleBookmark}
            className={`rounded-full transition-all ${bookmarked ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
          >
            <Star className={`size-5 ${bookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>
        
        <div className="space-y-small">
          <div className="flex items-center gap-2 text-accent/80 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
            <Quote className="size-3 text-primary" />
            {subjectName} • {unitTitle}
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-headline leading-[1.2] text-foreground tracking-tight selection:bg-primary/40">
            {question}
          </h2>
        </div>
      </header>

      <Separator className="bg-border/30" />

      <article className="prose prose-invert max-w-none">
        <div className="flex items-start gap-xlarge">
          <div className="hidden md:flex flex-col items-center gap-4 pt-2 opacity-20">
            <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
            <BookOpen className="size-5" />
            <div className="w-[1px] h-full bg-border" />
          </div>
          <div className="flex-1">
            <p className="answer-body whitespace-pre-wrap selection:bg-primary/20 transition-all duration-300">
              {answer}
            </p>
          </div>
        </div>
      </article>

      <footer className="pt-xlarge border-t border-border/20 text-center">
        <div className="inline-block px-4 py-1 rounded-full border border-border/40 bg-secondary/10">
          <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-bold opacity-60">
            Academic Archive • Reference Verified
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function AnswerPage() {
  return (
    <AppShell>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center space-y-medium">
            <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto opacity-50" />
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Retrieving Record</p>
          </div>
        </div>
      }>
        <AnswerContent />
      </Suspense>
    </AppShell>
  );
}
