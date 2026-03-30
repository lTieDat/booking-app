import type { PropsWithChildren, ReactNode } from 'react';
import { Card } from '../../../shared/ui/card';

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  footer?: ReactNode;
}

export function AuthShell({
  eyebrow,
  title,
  description,
  footer,
  children,
}: PropsWithChildren<AuthShellProps>) {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-700">{eyebrow}</p>
        <h1 className="max-w-xl text-4xl font-semibold tracking-[-0.05em] text-slate-900 md:text-6xl">
          {title}
        </h1>
        <p className="max-w-xl text-base leading-7 text-slate-600">{description}</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ['Fast', 'Cleaner client-side routing and lighter transitions.'],
            ['Clear', 'Type-safe forms and better feature ownership.'],
            ['Responsive', 'Layouts refined for small and large screens.'],
          ].map(([heading, copy]) => (
            <Card key={heading} className="rounded-3xl p-5">
              <p className="text-sm font-semibold text-slate-900">{heading}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
            </Card>
          ))}
        </div>
      </div>
      <Card className="glass-panel rounded-[32px] border-white/70 p-6 md:p-8">
        {children}
        {footer ? <div className="mt-6 border-t border-slate-200 pt-6">{footer}</div> : null}
      </Card>
    </section>
  );
}
