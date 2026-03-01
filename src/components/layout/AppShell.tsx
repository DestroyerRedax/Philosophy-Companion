import React from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from '@/components/ui/sidebar';
import { BookOpen, Home, MessageSquare, Settings, GraduationCap, Archive, Search, Star } from 'lucide-react';
import Link from 'next/link';
import { APP_STRINGS, ACADEMIC_SUBJECTS } from '@/lib/constants';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/toaster';

/**
 * AppShell - Premium Navigation
 * Features a clean Sidebar with active states, branding, and academic metadata.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background font-body selection:bg-primary/30">
        <Sidebar className="border-r border-sidebar-border/50 shadow-xl">
          <SidebarHeader className="p-xlarge space-y-2">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                <Archive className="size-4 text-primary" />
              </div>
              <h1 className="text-lg font-bold text-foreground tracking-tight font-headline">
                {APP_STRINGS.HOME_TITLE}
              </h1>
            </div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] px-1">
              {APP_STRINGS.DRAWER_TAGLINE}
            </p>
          </SidebarHeader>
          
          <Separator className="mx-large w-auto opacity-30" />

          <SidebarContent className="px-medium">
            <SidebarGroup>
              <SidebarMenu className="gap-2 pt-large">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Home">
                    <Link href="/" className="hover:bg-primary/10 transition-colors rounded-lg h-11 px-large">
                      <Home className="size-5" />
                      <span className="font-medium">Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Academic Search">
                    <Link href="/search" className="hover:bg-primary/10 transition-colors rounded-lg h-11 px-large">
                      <Search className="size-5" />
                      <span className="font-medium">Search</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="My Collection">
                    <Link href="/bookmarks" className="hover:bg-primary/10 transition-colors rounded-lg h-11 px-large">
                      <Star className="size-5" />
                      <span className="font-medium">Collection</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Academic Archive">
                    <Link href="/subject" className="hover:bg-primary/10 transition-colors rounded-lg h-11 px-large">
                      <MessageSquare className="size-5" />
                      <span className="font-medium">Archive</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup className="mt-large">
              <SidebarGroupLabel className="px-large font-bold text-accent/60 uppercase tracking-[0.2em] text-[9px] mb-small">
                {APP_STRINGS.SUBJECTS}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  {ACADEMIC_SUBJECTS.map((subject) => (
                    <SidebarMenuItem key={subject.code}>
                      <SidebarMenuButton asChild tooltip={subject.name}>
                        <Link 
                          href={`/subject/${subject.code}`} 
                          className="hover:bg-secondary/50 transition-all rounded-lg h-10 px-large group"
                        >
                          <BookOpen className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                          <span className="text-sm truncate">
                            <span className="font-mono text-[10px] text-accent/70 mr-2 font-bold">{subject.code}</span>
                            {subject.name}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <div className="mt-auto p-large border-t border-sidebar-border/30">
            <div className="flex items-center gap-3 p-medium bg-secondary/30 rounded-xl border border-border/50">
              <div className="size-8 rounded-full bg-accent/20 flex items-center justify-center">
                <GraduationCap className="size-4 text-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-foreground/80 uppercase tracking-wider leading-none">Status</span>
                <span className="text-[9px] text-muted-foreground font-medium uppercase tracking-widest mt-0.5">Final Year</span>
              </div>
            </div>
          </div>
        </Sidebar>
        
        <SidebarInset className="flex flex-col flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center border-b border-border/40 bg-background/80 px-large backdrop-blur-md">
            <SidebarTrigger className="mr-medium hover:bg-secondary/50 rounded-full" />
            <div className="flex-1" />
            <div className="flex items-center gap-medium">
              <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-muted-foreground bg-secondary/50 px-4 py-1.5 rounded-full border border-border/50 uppercase tracking-widest">
                <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                Verified Offline
              </div>
              <Link href="/search" className="rounded-full p-2 hover:bg-secondary/50 transition-all border border-transparent hover:border-border/50">
                <Search className="size-4 text-muted-foreground" />
              </Link>
              <button className="rounded-full p-2 hover:bg-secondary/50 transition-all border border-transparent hover:border-border/50">
                <Settings className="size-4 text-muted-foreground" />
              </button>
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden">
            <div className="mx-auto w-full p-large pb-xlarge">
              {children}
            </div>
          </main>
          <Toaster />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
