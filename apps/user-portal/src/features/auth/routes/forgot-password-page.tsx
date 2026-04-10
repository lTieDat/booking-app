import { Link } from '@tanstack/react-router';
import { AuthShell } from '../components/auth-shell';
import { Button } from '@booking/ui';
import { Field } from '@booking/ui';
import { Input } from '@booking/ui';

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Password recovery"
      title="Reset flows can be added cleanly later"
      description="The UI is now ready for a dedicated forgot-password API without tangling it into the login form."
      footer={
        <div className="text-sm text-slate-600">
          Remembered the password?{' '}
          <Link to="/login" className="font-semibold text-slate-900">
            Back to sign in
          </Link>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          The previous codebase did not expose a dedicated forgot-password endpoint. This screen is scaffolded and ready
          to connect when the backend contract is available.
        </div>

        <Field label="Email address" hint="We will use this once the reset endpoint is connected.">
          <Input type="email" placeholder="guest@example.com" />
        </Field>

        <Button fullWidth disabled>
          Recovery flow pending backend support
        </Button>
      </div>
    </AuthShell>
  );
}
