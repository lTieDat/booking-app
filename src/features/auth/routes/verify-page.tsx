import { useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { AuthShell } from '../components/auth-shell';
import { getVerifyEmailMutation } from '../api/auth-api';
import { Button } from '../../../shared/ui/button';
import { Field } from '../../../shared/ui/field';
import { Input } from '../../../shared/ui/input';

export default function VerifyPage() {
  const search = useSearch({ from: '/verify' }) as { email?: string };
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const verifyMutation = useMutation(getVerifyEmailMutation());

  const email = useMemo(() => search.email ?? '', [search.email]);

  return (
    <AuthShell
      eyebrow="Email verification"
      title="Confirm the account and continue booking"
      description="A dedicated verification step keeps the auth flow predictable and easier to maintain."
    >
      <div className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold text-slate-900">Verify your email</h2>
          <p className="text-sm leading-6 text-slate-600">
            {email ? `We sent a code to ${email}.` : 'Enter the verification code you received by email.'}
          </p>
        </div>

        <Field label="Verification code">
          <Input value={code} onChange={(event) => setCode(event.target.value)} placeholder="Enter OTP code" />
        </Field>

        {status ? <p className="text-sm font-medium text-slate-700">{status}</p> : null}

        <Button
          disabled={verifyMutation.isPending || !email || !code.trim()}
          fullWidth
          onClick={async () => {
            try {
              await verifyMutation.mutateAsync({
                email,
                otp: code.trim(),
              });
              setStatus('Verification successful. Redirecting to sign in...');
              window.setTimeout(() => {
                navigate({ to: '/login' });
              }, 800);
            } catch (error) {
              setStatus(error instanceof Error ? error.message : 'Verification failed');
            }
          }}
        >
          {verifyMutation.isPending ? 'Verifying...' : 'Verify account'}
        </Button>
      </div>
    </AuthShell>
  );
}
