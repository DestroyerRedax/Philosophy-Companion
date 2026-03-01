'use client';

import { AppShell } from '@/components/layout/AppShell';
import { ConceptClarifier } from '@/components/philosophy/ConceptClarifier';
import { APP_STRINGS } from '@/lib/constants';
import { Typewriter } from '@/components/ui/typewriter';
import { Book, History, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getLastRead } from '@/lib/storage-service';
import { SearchResult } from '@/lib/search-service';
import Link from 'next/link';

/**
 * Home Screen - Premium Polish
 * Features refined typography, fade-in animations, and a centered academic layout.
 */
export default function Home() {
  const [lastRead, setLastRead] = useState<SearchResult | null>(null);

  useEffect(() => {
    setLastRead(getLastRead());
  }, []);

  return (
    <AppShell>
      <div className="space-y-xlarge py-xlarge min-h-[75vh] flex flex-col justify-center max-w-3xl mx-auto">
        <section className="text-center space-y-large animate-in fade-in slide-in-from-top-4 duration-1000 ease-out">
          <div className="flex justify-center mb-medium">
            <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
              <Book className="size-6 text-primary" />
            </div>
          </div>
          
          <div className="space-y-medium">
            <h2 className="text-sm md:text-base font-bold text-muted-foreground tracking-[0.3em] uppercase opacity-80">
              {APP_STRINGS.HOME_HEADLINE}
            </h2>
            
            <div className="h-16 md:h-24 flex items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-foreground text-shadow-sm">
                <Typewriter 
                  text={APP_STRINGS.HOME_ANIMATED_TEXT} 
                  speed={70} 
                  delay={1000} 
                />
              </h1>
            </div>

            <p className="text-muted-foreground/60 text-sm md:text-base italic font-light tracking-wide">
              {APP_STRINGS.HOME_OFFLINE_TAG}
            </p>
          </div>
        </section>

        {lastRead && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 ease-out">
            <Link 
              href={`/answer?sc=${lastRead.subjectCode}&qid=${lastRead.id}`}
              className="flex items-center justify-between p-large rounded-2xl bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-all group"
            >
              <div className="flex items-center gap-medium">
                <div className="p-2 rounded-full bg-primary/10">
                  <History className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Continue Reading</p>
                  <p className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {lastRead.question}
                  </p>
                </div>
              </div>
              <ArrowRight className="size-4 text-primary/40 group-hover:translate-x-1 transition-transform" />
            </Link>
          </section>
        )}

        <section className="w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 ease-out">
          <ConceptClarifier />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-large animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-1000">
          <Link href="/subject" className="dark-academic-card p-large space-y-small group cursor-pointer block hover:bg-primary/5">
            <h3 className="text-lg font-bold font-headline text-accent group-hover:text-primary transition-colors duration-300">
              Syllabus Repository
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Access structured modules and examination insights for the current academic session.
            </p>
          </Link>
          <Link href="/bookmarks" className="dark-academic-card p-large space-y-small group cursor-pointer block hover:bg-primary/5">
            <h3 className="text-lg font-bold font-headline text-accent group-hover:text-primary transition-colors duration-300">
              My Collection
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Review your bookmarked inquiries and logic principles curated for quick reference.
            </p>
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
