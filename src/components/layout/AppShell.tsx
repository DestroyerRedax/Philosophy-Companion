import React from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { BookOpen, Home, Search, MessageSquare, Settings } from 'lucide-react';
import Link from 'next/link';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background font-body">
        <Sidebar className="border-r border-sidebar-border">
          <SidebarHeader className="p-large">
            <h1 className="text-xl font-bold text-primary tracking-tight font-headline">
              Philosophy <span className="text-foreground">Companion</span>
            </h1>
          </SidebarHeader>
          <SidebarContent>
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
                <SidebarMenuButton asChild tooltip="Subjects">
                  <Link href="/subject">
                    <BookOpen className="size-5" />
                    <span>Subjects</span>
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
          </SidebarContent>
        </Sidebar>
        
        <SidebarInset className="flex flex-col flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center border-b border-border bg-background/80 px-large backdrop-blur-sm">
            <SidebarTrigger className="mr-medium" />
            <div className="flex-1" />
            <button className="rounded-full p-small hover:bg-secondary">
              <Settings className="size-5 text-muted-foreground" />
            </button>
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
