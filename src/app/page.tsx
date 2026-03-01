import { AppShell } from '@/components/layout/AppShell';
import { ConceptClarifier } from '@/components/philosophy/ConceptClarifier';
import { APP_STRINGS } from '@/lib/constants';

export default function Home() {
  return (
    <AppShell>
      <div className="space-y-xlarge py-large">
        <section className="text-center space-y-medium animate-in fade-in duration-700">
          <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
            {APP_STRINGS.HOME_TITLE}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {APP_STRINGS.HOME_SUBTITLE}
          </p>
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          <ConceptClarifier />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-large animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <div className="dark-academic-card p-large space-y-small">
            <h3 className="text-xl font-bold font-headline text-accent">Latest Topics</h3>
            <p className="text-muted-foreground">Subject logic will be implemented in Phase 2.</p>
          </div>
          <div className="dark-academic-card p-large space-y-small">
            <h3 className="text-xl font-bold font-headline text-accent">Recent Answers</h3>
            <p className="text-muted-foreground">Answer logic will be implemented in Phase 2.</p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
