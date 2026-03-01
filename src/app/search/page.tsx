'use client';

import React, { useState, useMemo } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight, BookOpen, Hash, MessageSquareOff } from 'lucide-react';
import { searchQuestions, SearchResult } from '@/lib/search-service';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

/**
 * Global Search Screen
 * Provides an offline, real-time search interface for the entire philosophy archive.
 */
export default function SearchPage() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    return searchQuestions(query);
  }, [query]);

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-xlarge py-large animate-in fade-in duration-500">
        <header className="space-y-medium text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-medium">
            <Search className="size-3 text-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Global Archive Search</span>
          </div>
          <h2 className="text-3xl font-bold font-headline text-foreground tracking-tight">
            Academic Inquiries
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Search across all subjects, logic principles, and philosophical modules currently indexed.
          </p>
        </header>

        <section className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="size-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type at least 2 characters to search..."
            className="h-16 pl-12 pr-4 bg-secondary/30 border-border/50 text-lg rounded-2xl focus:ring-primary/20 focus:border-primary/40 transition-all shadow-lg"
            autoFocus
          />
        </section>

        <div className="space-y-large">
          {query.length >= 2 ? (
            results.length > 0 ? (
              <div className="grid gap-medium">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.1em] px-1">
                  Found {results.length} relevant record{results.length !== 1 ? 's' : ''}
                </p>
                {results.map((result, index) => (
                  <SearchResultItem key={index} result={result} />
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={MessageSquareOff} 
                title="No Records Found" 
                description={`No inquiries matching "${query}" were found in the current archive.`} 
              />
            )
          ) : (
            <EmptyState 
              icon={Hash} 
              title="Awaiting Input" 
              description="Enter keywords related to philosophical concepts, subject codes, or specific inquiry titles." 
            />
          )}
        </div>
      </div>
    </AppShell>
  );
}

function SearchResultItem({ result }: { result: SearchResult }) {
  const answerUrl = `/answer?q=${encodeURIComponent(result.question)}&a=${encodeURIComponent(result.answer)}&sc=${result.subjectCode}&sn=${encodeURIComponent(result.subjectName)}&ut=${encodeURIComponent(result.unitTitle)}`;

  return (
    <Link 
      href={answerUrl}
      className="dark-academic-card p-large group block hover:bg-primary/5 active:scale-[0.99] transition-all"
    >
      <div className="space-y-medium">
        <div className="flex items-center justify-between gap-small">
          <div className="flex items-center gap-small">
            <Badge variant="outline" className="text-[9px] font-mono border-accent/30 text-accent uppercase tracking-wider">
              {result.subjectCode}
            </Badge>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest truncate max-w-[200px]">
              {result.subjectName}
            </span>
          </div>
          <ArrowRight className="size-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>

        <div className="space-y-small">
          <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">
            {result.question}
          </h4>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium italic">
            <BookOpen className="size-3" />
            {result.unitTitle}
          </div>
        </div>
      </div>
    </Link>
  );
}

function EmptyState({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-xlarge space-y-medium border border-dashed border-border/50 rounded-2xl bg-secondary/10">
      <div className="p-4 rounded-full bg-secondary/30">
        <Icon className="size-8 text-muted-foreground/40" />
      </div>
      <div className="text-center space-y-small px-large">
        <h3 className="text-lg font-bold font-headline text-foreground/80">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
      </div>
    </div>
  );
}
