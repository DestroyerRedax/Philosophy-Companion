import { AppShell } from '@/components/layout/AppShell';
import { subjectRegistry } from '@/data/registry';
import { BookOpen, ArrowLeft, Info, HelpCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default async function SubjectPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const subject = subjectRegistry[code];

  if (!subject) {
    return (
      <AppShell>
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-medium">
          <Info className="size-12 text-muted-foreground" />
          <h2 className="text-2xl font-bold font-headline">Subject Not Found</h2>
          <p className="text-muted-foreground">The requested subject code ({code}) does not exist in our registry.</p>
          <Link href="/" className="text-primary hover:underline">Return to Dashboard</Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-xlarge py-large animate-in fade-in duration-500">
        <header className="space-y-medium">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-medium border-b border-border pb-large">
            <div className="space-y-small">
              <div className="font-mono text-accent text-sm tracking-widest">{subject.code}</div>
              <h2 className="text-4xl font-bold font-headline text-foreground">
                {subject.name}
              </h2>
            </div>
            <Badge variant="outline" className="w-fit border-primary/30 text-primary uppercase tracking-tighter text-[10px]">
              Academic Syllabus 2024-25
            </Badge>
          </div>
        </header>

        <section className="space-y-large">
          <div className="flex items-center gap-small text-muted-foreground">
            <BookOpen className="size-5" />
            <h3 className="text-lg font-bold font-headline uppercase tracking-wider">Curriculum Units</h3>
          </div>

          {subject.units.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-medium">
              {subject.units.map((unit, uIndex) => (
                <AccordionItem 
                  key={uIndex} 
                  value={`unit-${uIndex}`} 
                  className="dark-academic-card border-none overflow-hidden"
                >
                  <AccordionTrigger className="px-large py-large hover:no-underline hover:bg-secondary/10 transition-colors">
                    <div className="flex flex-col items-start text-left gap-1">
                      <span className="text-lg font-headline font-bold text-foreground">{unit.title}</span>
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        {unit.questions.length} Questions Available
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-medium pb-medium pt-0">
                    <div className="space-y-1 mt-small border-t border-border/30 pt-small">
                      {unit.questions.map((q, qIndex) => (
                        <Link 
                          key={qIndex}
                          href={`/answer?q=${encodeURIComponent(q.question)}&a=${encodeURIComponent(q.answer)}`}
                          className="flex items-center justify-between p-medium hover:bg-secondary/40 rounded-md group transition-all duration-200"
                        >
                          <div className="flex items-start gap-medium flex-1 min-w-0">
                            <span className="text-xs font-mono text-accent/60 mt-1 shrink-0">
                              {(qIndex + 1).toString().padStart(2, '0')}
                            </span>
                            <p className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                              {q.question}
                            </p>
                          </div>
                          <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-small" />
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="p-xlarge text-center border-2 border-dashed border-border rounded-lg bg-card/50">
              <p className="text-muted-foreground italic">
                The syllabus for this subject is currently being updated. Please check back later.
              </p>
            </div>
          )}
        </section>

        <footer className="pt-xlarge border-t border-border/50 text-center">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
            Official Department Archive • Verified Offline Data
          </p>
        </footer>
      </div>
    </AppShell>
  );
}
