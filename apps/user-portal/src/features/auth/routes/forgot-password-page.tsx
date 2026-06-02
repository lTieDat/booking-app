import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';
import { AuthShell } from '../components/auth-shell';
import { getRequestPasswordResetMutation, getResetPasswordMutation } from '../api/auth-api';
import { Button, Field, Input } from '@booking/ui';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const requestReset = useMutation(getRequestPasswordResetMutation());
  const resetPassword = useMutation(getResetPasswordMutation());
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [step, setStep] = useState<'request' | 'confirm'>('request');

  return (
    <AuthShell
      eyebrow="Password recovery"
      title="Reset your password with an OTP"
      description="Use the email attached to your booking account and confirm the token issued by the Spring Boot API."
      footer={
        <div className="text-sm text-slate-600">
          Remembered the password?{' '}
          <Link to="/login" className="font-semibold text-slate-900">
            Back to sign in
          </Link>
        </div>
      }
    >
      <form
        className="space-y-5"
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            setStatus(null);
            if (step === 'request') {
              const response = await requestReset.mutateAsync({ email });
              setStatus(response.token ? `Development OTP: ${response.token}` : 'Password reset OTP sent.');
              setStep('confirm');
              return;
            }
            await resetPassword.mutateAsync({ email, token, newPassword });
            setStatus('Password reset successfully. Redirecting to sign in...');
            window.setTimeout(() => navigate({ to: '/login' }), 700);
          } catch (error) {
            setStatus(error instanceof Error ? error.message : 'Unable to reset password');
          }
        }}
      >
        <Field label="Email address">
          <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="guest@example.com" />
        </Field>

        {step === 'confirm' ? (
          <>
            <Field label="OTP token">
              <Input value={token} onChange={(event) => setToken(event.target.value)} placeholder="Enter OTP" />
            </Field>
            <Field label="New password">
              <Input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="Create a new password"
              />
            </Field>
          </>
        ) : null}

        {status ? <p className="text-sm font-medium text-slate-700">{status}</p> : null}

        <Button
          type="submit"
          fullWidth
          disabled={!email || requestReset.isPending || resetPassword.isPending || (step === 'confirm' && (!token || !newPassword))}
        >
          {step === 'request' ? 'Send reset OTP' : 'Reset password'}
        </Button>
      </form>
    </AuthShell>
  );
}
