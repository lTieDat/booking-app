import { Link } from '@tanstack/react-router';
import { AuthShell } from '../components/auth-shell';
import { useRegisterForm } from '../hooks/use-auth-form';
import { useRegisterSubmission } from '../hooks/use-auth-submission';
import { Button } from '../../../shared/ui/button';
import { Field } from '../../../shared/ui/field';
import { Input } from '../../../shared/ui/input';

export default function RegisterPage() {
  const { error, submit } = useRegisterSubmission();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useRegisterForm();

  return (
    <AuthShell
      eyebrow="Create account"
      title="A smoother booking journey starts here"
      description="The new account flow trims down visual noise and keeps the form logic isolated from page layout."
      footer={
        <div className="text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-slate-900">
            Sign in
          </Link>
        </div>
      }
    >
      <form
        className="space-y-5"
        onSubmit={handleSubmit(submit)}
      >
        <Field label="Full name" error={errors.fullName?.message}>
          <Input placeholder="Taylor Morgan" {...register('fullName')} />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <Input type="email" placeholder="guest@example.com" {...register('email')} />
        </Field>

        <Field label="Password" error={errors.password?.message}>
          <Input type="password" placeholder="Create a password" {...register('password')} />
        </Field>

        <Field label="Confirm password" error={errors.confirmPassword?.message}>
          <Input type="password" placeholder="Repeat your password" {...register('confirmPassword')} />
        </Field>

        {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}

        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Continue to verification'}
        </Button>
      </form>
    </AuthShell>
  );
}
