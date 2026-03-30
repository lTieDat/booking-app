import { Link } from '@tanstack/react-router';
import { useLoginForm } from '../hooks/use-auth-form';
import { useGuestLoginSubmission } from '../hooks/use-auth-submission';
import { AuthShell } from '../components/auth-shell';
import { Button } from '../../../shared/ui/button';
import { Field } from '../../../shared/ui/field';
import { Input } from '../../../shared/ui/input';

export default function LoginPage() {
  const { error, submit } = useGuestLoginSubmission();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useLoginForm();

  return (
    <AuthShell
      eyebrow="Guest account"
      title="Sign in without losing context"
      description="Continue your booking journey with a cleaner account experience and faster page transitions."
      footer={
        <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
          <span>
            Need an account?{' '}
            <Link to="/register" className="font-semibold text-teal-700">
              Register
            </Link>
          </span>
          <Link to="/forgot-password" className="font-semibold text-slate-900">
            Forgot password
          </Link>
        </div>
      }
    >
      <form
        className="space-y-5"
        onSubmit={handleSubmit(submit)}
      >
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-slate-900">Welcome back</h2>
          <p className="text-sm leading-6 text-slate-600">Use your account to manage stays, reviews and bookings.</p>
        </div>

        <Field label="Email" error={errors.email?.message}>
          <Input type="email" placeholder="guest@example.com" {...register('email')} />
        </Field>

        <Field label="Password" error={errors.password?.message}>
          <Input type="password" placeholder="Enter your password" {...register('password')} />
        </Field>

        {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}

        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>

        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Need manager access?</span>
          <Link to="/loginManager" className="font-semibold text-slate-900">
            Sign in as manager
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
