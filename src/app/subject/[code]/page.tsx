
import { AppShell } from '@/components/layout/AppShell';
import { ACADEMIC_SUBJECTS } from '@/lib/constants';
import { BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function SubjectPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const subject = ACADEMIC_SUBJECTS.find(s => s.code === code);

  return (
    <AppShell>
      <div className="space-y-xlarge py-large animate-in fade-in duration-500">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="flex flex-col items-center justify-center p-xlarge bg-card rounded-lg border border-border shadow-2xl text-center space-y-medium">
          <div className="p-medium bg-primary/10 rounded-full">
            <BookOpen className="size-12 text-primary" />
          </div>
          
          <div className="space-y-small">
            <div className="font-mono text-accent text-lg tracking-widest">{code}</div>
            <h2 className="text-3xl font-bold font-headline">
              {subject ? subject.name : 'Subject Not Found'}
            </h2>
          </div>

          <p className="text-muted-foreground max-w-md">
            Academic content and examination suggestions for this module are currently being prepared for Phase 3.
          </p>

          <div className="w-full max-w-xs h-[1px] bg-border" />
          
          <div className="text-xs text-muted-foreground uppercase tracking-tighter">
            Foundation Ready • Offline Access Pending
          </div>
        </div>
      </div>
    </AppShell>
  );
}
