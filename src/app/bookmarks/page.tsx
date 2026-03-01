'use client';

import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Star, ArrowRight, BookOpen, Trash2 } from 'lucide-react';
import { getBookmarks, toggleBookmark } from '@/lib/storage-service';
import { SearchResult } from '@/lib/search-service';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

/**
 * Bookmarks Screen
 * Displays all questions saved by the user for quick reference.
 */
export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<SearchResult[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  const handleRemove = (e: React.MouseEvent, item: SearchResult) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(item);
    setBookmarks(getBookmarks());
    toast({
      title: "Bookmark Removed",
      description: "The item has been removed from your saved inquiries.",
    });
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-xlarge py-large animate-in fade-in duration-500">
        <header className="space-y-medium">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-medium">
            <Star className="size-3 text-primary fill-primary" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Academic Collection</span>
          </div>
          <h2 className="text-3xl font-bold font-headline text-foreground tracking-tight">
            Saved Inquiries
          </h2>
          <p className="text-muted-foreground text-sm max-w-md">
            Review and reference your curated list of essential philosophical questions and logic principles.
          </p>
        </header>

        <div className="space-y-large">
          {bookmarks.length > 0 ? (
            <div className="grid gap-medium">
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-[0.1em] px-1">
                {bookmarks.length} Saved Record{bookmarks.length !== 1 ? 's' : ''}
              </p>
              {bookmarks.map((item, index) => (
                <BookmarkItem key={index} item={item} onRemove={(e) => handleRemove(e, item)} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-xlarge space-y-medium border border-dashed border-border/50 rounded-2xl bg-secondary/10">
              <div className="p-4 rounded-full bg-secondary/30">
                <Star className="size-8 text-muted-foreground/40" />
              </div>
              <div className="text-center space-y-small px-large">
                <h3 className="text-lg font-bold font-headline text-foreground/80">Collection Empty</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Inquiries you bookmark while studying will appear here for immediate access.
                </p>
                <Button asChild variant="outline" className="mt-medium rounded-full border-primary/30 text-primary">
                  <Link href="/subject">Explore Archive</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function BookmarkItem({ item, onRemove }: { item: SearchResult; onRemove: (e: React.MouseEvent) => void }) {
  const answerUrl = `/answer?q=${encodeURIComponent(item.question)}&a=${encodeURIComponent(item.answer)}&sc=${item.subjectCode}&sn=${encodeURIComponent(item.subjectName)}&ut=${encodeURIComponent(item.unitTitle)}`;

  return (
    <Link 
      href={answerUrl}
      className="dark-academic-card p-large group block hover:bg-primary/5 active:scale-[0.99] transition-all relative"
    >
      <div className="space-y-medium">
        <div className="flex items-center justify-between gap-small">
          <div className="flex items-center gap-small">
            <Badge variant="outline" className="text-[9px] font-mono border-accent/30 text-accent uppercase tracking-wider">
              {item.subjectCode}
            </Badge>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest truncate max-w-[200px]">
              {item.subjectName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="size-8 text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 rounded-full"
              onClick={onRemove}
            >
              <Trash2 className="size-4" />
            </Button>
            <ArrowRight className="size-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        <div className="space-y-small">
          <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight line-clamp-2">
            {item.question}
          </h4>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium italic">
            <BookOpen className="size-3" />
            {item.unitTitle}
          </div>
        </div>
      </div>
    </Link>
  );
}
