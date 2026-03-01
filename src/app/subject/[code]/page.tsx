import { AppShell } from '@/components/layout/AppShell';
import { subjectRegistry } from '@/data/registry';
import { BookOpen, ArrowLeft, Info, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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
            <Badge variant="outline" className="w-fit border-primary/30 text-primary">
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
            <div className="grid grid-cols-1 gap-medium">
              {subject.units.map((unit, index) => (
                <Card key={index} className="dark-academic-card hover:bg-secondary/20 cursor-default">
                  <CardHeader className="flex flex-row items-center justify-between py-medium">
                    <CardTitle className="text-lg font-headline flex items-center gap-medium">
                      <span className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                        {index + 1}
                      </span>
                      {unit.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                      <HelpCircle className="size-3" />
                      {unit.questions.length} Questions
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
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
