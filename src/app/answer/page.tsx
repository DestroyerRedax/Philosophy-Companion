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
import { subjectRegistry } from '@/data/registry';
import { cn } from '@/lib/utils';

/**
 * Helper component to render formatted academic text.
 * Bolds headers like ভূমিকা, উপসংহার, points (১., ২.), and sub-points.
 * Automatically handles tables and structural headers.
 */
function FormattedAnswer({ content }: { content: string }) {
  const lines = content.split('\n');
  
  return (
    <div className="space-y-4">
      {lines.map((line, index) => {
        const trimmed = line.trim();
        
        // Handle Tables (Simple HTML check)
        if (trimmed.startsWith('<table') || trimmed.includes('</table>') || trimmed.startsWith('<tr') || trimmed.startsWith('<td') || trimmed.startsWith('<th')) {
          return <div key={index} dangerouslySetInnerHTML={{ __html: line }} className="overflow-x-auto my-4" />;
        }

        // Regular expression to match numeric points like ১., ২., or sub-points
        const isPoint = /^\d+\./.test(trimmed) || /^[১-৯]+\./.test(trimmed);
        
        // Match standard structural headers common in academic writing
        const structuralKeywords = [
          'ভূমিকা', 'উপসংহার', 'উপস্থাপনা', 'সারসংক্ষেপ', 
          'মূল্যায়ন', 'সমালোচনা', 'আলোচনা', 'স্বরূপ', 
          'বৈশিষ্ট্যসমূহ', 'পার্থক্য', 'উত্তরণ', 'উদ্দেশ্য', 'ব্যাখ্যা', 'লক্ষ্য ও সাফল্য'
        ];
        
        const isStructural = structuralKeywords.some(keyword => 
          trimmed === keyword || 
          trimmed.startsWith(keyword + ':') ||
          (trimmed.length < 50 && trimmed.includes(keyword) && !trimmed.includes(' '))
        );

        const isSubPoint = trimmed.startsWith('উপ-পয়েন্ট') || 
                           trimmed.includes('সাব পয়েন্ট') || 
                           (trimmed.length < 60 && trimmed.endsWith(':'));

        if (isStructural || isPoint || isSubPoint) {
          return (
            <p key={index} className="font-bold text-foreground text-xl md:text-2xl mt-8 mb-4">
              {line}
            </p>
          );
        }

        return (
          <p key={index} className={cn(
            "text-foreground/85 leading-[1.8] text-lg font-body",
            trimmed === "" ? "h-2" : ""
          )}>
            {line}
          </p>
        );
      })}
    </div>
  );
}

function AnswerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  
  const sc = searchParams.get('sc');
  const qid = searchParams.get('qid');

  const [data, setData] = useState<SearchResult | null>(null);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (sc && qid) {
      const subject = subjectRegistry[sc];
      if (subject) {
        let found = false;
        for (const unit of subject.units) {
          const q = unit.questions.find(item => item.id === qid);
          if (q) {
            const item: SearchResult = {
              id: qid,
              question: q.question,
              answer: q.answer,
              subjectCode: subject.code,
              subjectName: subject.name,
              unitTitle: unit.title
            };
            setData(item);
            setLastRead(item);
            setBookmarked(isBookmarked(q.question));
            found = true;
            break;
          }
        }
      }
    }
  }, [sc, qid]);

  const handleToggleBookmark = () => {
    if (!data) return;
    
    const added = toggleBookmark(data);
    setBookmarked(added);
    
    toast({
      title: added ? "Bookmark Added" : "Bookmark Removed",
      description: added ? "This inquiry has been saved to your collection." : "The inquiry was removed from your collection.",
    });
  };

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-medium animate-in fade-in duration-700">
        <MessageSquare className="size-12 text-muted-foreground/20" />
        <h2 className="text-xl font-bold font-headline text-foreground">Content Unavailable</h2>
        <p className="text-muted-foreground text-sm text-center max-w-xs">The requested academic record could not be retrieved from the archive.</p>
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
            {data.subjectName} • {data.unitTitle}
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-headline leading-[1.2] text-foreground tracking-tight selection:bg-primary/40">
            {data.question}
          </h2>
        </div>
      </header>

      <article className="prose prose-invert max-w-none">
        <div className="flex items-start gap-xlarge">
          <div className="hidden md:flex flex-col items-center gap-4 pt-2 opacity-20">
            <div className="w-[1px] h-16 bg-gradient-to-b from-primary to-transparent" />
            <BookOpen className="size-5" />
            <div className="w-[1px] h-full bg-border" />
          </div>
          <div className="flex-1">
            <FormattedAnswer content={data.answer} />
          </div>
        </div>
      </article>

      <footer className="pt-xlarge border-t border-border/20 text-center">
        <div className="inline-block px-4 py-1 rounded-full border border-border/40 bg-secondary/10">
          <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-bold opacity-60">
            Authorized Academic Archive • Reference Verified
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
