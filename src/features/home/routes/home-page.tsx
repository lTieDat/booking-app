import { startTransition } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card } from '../../../shared/ui/card';
import { SearchForm } from '../../search/components/search-form';
import type { BookingSearch } from '../../../shared/types/domain';

export default function HomePage() {
  const navigate = useNavigate();

  const handleSearch = (values: BookingSearch) => {
    startTransition(() => {
      navigate({
        to: '/searchresult',
        search: values,
      });
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-700">Curated stays</p>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-slate-900 md:text-7xl">
            Search, reserve and manage stays with a calmer interface.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            Discover boutique hotels, reserve with confidence, and manage every trip from one calmer travel interface.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['Lazy routes', 'Each major page loads only when needed.'],
              ['Typed forms', 'Booking flows now have predictable form state.'],
              ['Cleaner UI', 'Tailwind-based components reduce styling drift.'],
            ].map(([title, copy]) => (
              <Card key={title} className="rounded-3xl p-5">
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p>
              </Card>
            ))}
          </div>
        </div>

        <Card className="glass-panel rounded-[32px] p-6 md:p-8">
          <div className="mb-5 space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Start a search</p>
            <h2 className="text-2xl font-semibold text-slate-900">Find your next stay faster</h2>
          </div>
          <SearchForm onSubmit={handleSearch} />
        </Card>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-3">
        {[
          {
            title: 'Intentional booking flow',
            copy: 'The search, detail and checkout pages now share the same typed query model.',
          },
          {
            title: 'Performance-first routing',
            copy: 'Pages are split by route and only fetched when the user expresses intent.',
          },
          {
            title: 'Reusable UI system',
            copy: 'Feature pages are built from small field, card, button and shell primitives.',
          },
        ].map((item) => (
          <Card key={item.title} className="rounded-[28px] p-6">
            <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.copy}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
