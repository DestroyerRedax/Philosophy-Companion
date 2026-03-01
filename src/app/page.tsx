import { AppShell } from '@/components/layout/AppShell';
import { ConceptClarifier } from '@/components/philosophy/ConceptClarifier';
import { APP_STRINGS } from '@/lib/constants';
import { Typewriter } from '@/components/ui/typewriter';
import { Book } from 'lucide-react';

/**
 * Home Screen - Premium Polish
 * Features refined typography, fade-in animations, and a centered academic layout.
 */
export default function Home() {
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

        <section className="w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 ease-out">
          <ConceptClarifier />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-large animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-1000">
          <div className="dark-academic-card p-large space-y-small group cursor-default">
            <h3 className="text-lg font-bold font-headline text-accent group-hover:text-primary transition-colors duration-300">
              Syllabus Repository
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Access structured modules and examination insights for the current academic session.
            </p>
          </div>
          <div className="dark-academic-card p-large space-y-small group cursor-default">
            <h3 className="text-lg font-bold font-headline text-accent group-hover:text-primary transition-colors duration-300">
              Terminologies
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Explore essential philosophical definitions and logic principles built for quick reference.
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}