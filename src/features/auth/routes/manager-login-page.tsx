import { Link } from '@tanstack/react-router';
import { useLoginForm } from '../hooks/use-auth-form';
import { useManagerLoginSubmission } from '../hooks/use-auth-submission';
import { AuthShell } from '../components/auth-shell';
import { Button } from '../../../shared/ui/button';
import { Field } from '../../../shared/ui/field';
import { Input } from '../../../shared/ui/input';

export default function ManagerLoginPage() {
  const { error, submit } = useManagerLoginSubmission();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useLoginForm();

  return (
    <AuthShell
      eyebrow="Manager console"
      title="Operate the portfolio from one focused dashboard"
      description="Manager sign-in now routes into the new TanStack Router shell with a cleaner information hierarchy."
      footer={
        <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
          <span>Need the guest experience instead?</span>
          <Link to="/login" className="font-semibold text-slate-900">
            Go to guest sign in
          </Link>
        </div>
      }
    >
      <form
        className="space-y-5"
        onSubmit={handleSubmit(submit)}
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-slate-900">Manager access</h2>
          <p className="text-sm leading-6 text-slate-600">Review reservations, properties and operational signals.</p>
        </div>

        <Field label="Business email" error={errors.email?.message}>
          <Input type="email" placeholder="manager@hotel.com" {...register('email')} />
        </Field>

        <Field label="Password" error={errors.password?.message}>
          <Input type="password" placeholder="Enter your password" {...register('password')} />
        </Field>

        {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}

        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Open dashboard'}
        </Button>
      </form>
    </AuthShell>
  );
}
