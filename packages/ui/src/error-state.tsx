import { Button } from './button';

interface ErrorStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function ErrorState({ title, description, actionLabel, onAction }: ErrorStateProps) {
  return (
    <div className="surface-card flex flex-col items-center gap-4 rounded-[32px] px-6 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 text-xl text-rose-600">
        !
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        <p className="max-w-xl text-sm leading-7 text-slate-600">{description}</p>
      </div>
      {actionLabel && onAction ? <Button onClick={onAction}>{actionLabel}</Button> : null}
    </div>
  );
}
