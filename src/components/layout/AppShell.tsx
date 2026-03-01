
import React from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from '@/components/ui/sidebar';
import { BookOpen, Home, MessageSquare, Settings, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { APP_STRINGS, ACADEMIC_SUBJECTS } from '@/lib/constants';
import { Separator } from '@/components/ui/separator';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background font-body">
        <Sidebar className="border-r border-sidebar-border">
          <SidebarHeader className="p-large space-y-1">
            <h1 className="text-xl font-bold text-primary tracking-tight font-headline">
              {APP_STRINGS.HOME_TITLE}
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              {APP_STRINGS.DRAWER_TAGLINE}
            </p>
          </SidebarHeader>
          
          <Separator className="mx-medium w-auto" />

          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu className="px-small gap-small">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Home">
                    <Link href="/">
                      <Home className="size-5" />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Answers">
                    <Link href="/answer">
                      <MessageSquare className="size-5" />
                      <span>Answers</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="px-large font-bold text-accent/80 uppercase tracking-wider text-[10px]">
                {APP_STRINGS.SUBJECTS}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="px-small gap-1">
                  {ACADEMIC_SUBJECTS.map((subject) => (
                    <SidebarMenuItem key={subject.code}>
                      <SidebarMenuButton asChild tooltip={subject.name}>
                        <Link href={`/subject/${subject.code}`}>
                          <BookOpen className="size-4 text-muted-foreground" />
                          <span className="text-sm truncate">
                            <span className="font-mono text-xs text-accent mr-2">{subject.code}</span>
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
        </Sidebar>
        
        <SidebarInset className="flex flex-col flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center border-b border-border bg-background/80 px-large backdrop-blur-sm">
            <SidebarTrigger className="mr-medium" />
            <div className="flex-1" />
            <div className="flex items-center gap-small">
              <span className="hidden md:inline-flex items-center gap-2 text-xs font-medium text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full border border-border">
                <GraduationCap className="size-3" />
                Final Year
              </span>
              <button className="rounded-full p-small hover:bg-secondary transition-colors">
                <Settings className="size-5 text-muted-foreground" />
              </button>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <div className="mx-auto max-w-4xl p-large">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
