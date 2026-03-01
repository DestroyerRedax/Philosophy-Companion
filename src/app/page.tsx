
import { AppShell } from '@/components/layout/AppShell';
import { ConceptClarifier } from '@/components/philosophy/ConceptClarifier';
import { APP_STRINGS } from '@/lib/constants';
import { Typewriter } from '@/components/ui/typewriter';

export default function Home() {
  return (
    <AppShell>
      <div className="space-y-xlarge py-xlarge min-h-[70vh] flex flex-col justify-center">
        <section className="text-center space-y-large animate-in fade-in duration-1000">
          <div className="space-y-medium">
            <h2 className="text-lg md:text-xl font-medium text-muted-foreground tracking-[0.2em] uppercase">
              {APP_STRINGS.HOME_HEADLINE}
            </h2>
            
            <div className="h-16 md:h-24 flex items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight text-foreground">
                <Typewriter 
                  text={APP_STRINGS.HOME_ANIMATED_TEXT} 
                  speed={80} 
                  delay={800} 
                />
              </h1>
            </div>

            <p className="text-muted-foreground/70 text-sm md:text-base max-w-lg mx-auto italic">
              {APP_STRINGS.HOME_OFFLINE_TAG}
            </p>
          </div>
        </section>

        <section className="max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <ConceptClarifier />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-large animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-1000">
          <div className="dark-academic-card p-large space-y-small group">
            <h3 className="text-xl font-bold font-headline text-accent group-hover:text-primary transition-colors">Academic Modules</h3>
            <p className="text-muted-foreground text-sm">Access structured syllabus and examination suggestions.</p>
          </div>
          <div className="dark-academic-card p-large space-y-small group">
            <h3 className="text-xl font-bold font-headline text-accent group-hover:text-primary transition-colors">Quick References</h3>
            <p className="text-muted-foreground text-sm">Explore philosophical terminology and logic foundations.</p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
