import { AppShell } from '@/components/layout/AppShell';
import { subjectRegistry } from '@/data/registry';
import { BookOpen, ArrowLeft, Info, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

/**
 * Subject View Screen - Premium Polish
 * Provides a structured, expandable list of units and questions.
 */
export default async function SubjectPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const subject = subjectRegistry[code];

  if (!subject) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-medium animate-in fade-in duration-500">
          <Info className="size-12 text-muted-foreground opacity-30" />
          <h2 className="text-2xl font-bold font-headline text-foreground">Registry Record Not Found</h2>
          <p className="text-muted-foreground max-w-xs text-center">The requested subject code ({code}) is not currently indexed in the academic archive.</p>
          <Link href="/" className="px-6 py-2 rounded-full border border-primary/50 text-primary hover:bg-primary/5 transition-all text-sm font-medium mt-medium">
            Return to Dashboard
          </Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-xlarge py-large animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        <header className="space-y-medium">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="size-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-medium border-b border-border/50 pb-large">
            <div className="space-y-small">
              <div className="font-mono text-accent text-xs tracking-[0.2em] font-bold uppercase">{subject.code}</div>
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground tracking-tight">
                {subject.name}
              </h2>
            </div>
            <Badge variant="outline" className="w-fit border-primary/20 text-primary/80 uppercase tracking-[0.1em] text-[10px] px-3 py-1 font-bold bg-primary/5">
              Syllabus 2024-25
            </Badge>
          </div>
        </header>

        <section className="space-y-large">
          <div className="flex items-center gap-small text-muted-foreground/80">
            <BookOpen className="size-5" />
            <h3 className="text-base font-bold font-headline uppercase tracking-[0.15em]">Curriculum Units</h3>
          </div>

          {subject.units.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-medium">
              {subject.units.map((unit, uIndex) => (
                <AccordionItem 
                  key={uIndex} 
                  value={`unit-${uIndex}`} 
                  className="dark-academic-card border-none overflow-hidden"
                >
                  <AccordionTrigger className="px-large py-6 hover:no-underline hover:bg-secondary/20 transition-all duration-300">
                    <div className="flex flex-col items-start text-left gap-1">
                      <span className="text-lg font-headline font-bold text-foreground group-data-[state=open]:text-primary transition-colors">
                        {unit.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest bg-secondary/50 px-2 py-0.5 rounded">
                        {unit.questions.length} Inquiries
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-medium pb-medium pt-0">
                    <div className="space-y-1 mt-small border-t border-border/20 pt-small">
                      {unit.questions.map((q, qIndex) => (
                        <Link 
                          key={qIndex}
                          href={`/answer?q=${encodeURIComponent(q.question)}&a=${encodeURIComponent(q.answer)}`}
                          className="flex items-center justify-between p-medium hover:bg-primary/10 rounded-lg group transition-all duration-300 active:scale-[0.99]"
                        >
                          <div className="flex items-start gap-medium flex-1 min-w-0">
                            <span className="text-xs font-mono text-accent/50 mt-1 shrink-0 font-bold">
                              {(qIndex + 1).toString().padStart(2, '0')}
                            </span>
                            <p className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors leading-relaxed">
                              {q.question}
                            </p>
                          </div>
                          <ChevronRight className="size-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-small" />
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="p-xlarge text-center border border-dashed border-border/50 rounded-xl bg-card/30">
              <p className="text-muted-foreground italic text-sm">
                The content for this module is currently being verified by the department.
              </p>
            </div>
          )}
        </section>

        <footer className="pt-xlarge border-t border-border/30 text-center opacity-40 hover:opacity-100 transition-opacity duration-500">
          <p className="text-[9px] text-muted-foreground uppercase tracking-[0.5em] font-bold">
            Authorized Academic Archive • Offline Secure
          </p>
        </footer>
      </div>
    </AppShell>
  );
}