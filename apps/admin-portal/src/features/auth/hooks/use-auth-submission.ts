import { startTransition, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { getLoginManagerMutation, getLoginReceptionistMutation } from '../api/auth-api';
import { toLoginRequestDto, type LoginFormValues } from '../dto/auth-form.dto';

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export function useManagerLoginSubmission() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const loginManagerMutation = useMutation(getLoginManagerMutation());
  const loginReceptionistMutation = useMutation(getLoginReceptionistMutation());

  const submit = async (values: LoginFormValues, mode: 'manager' | 'receptionist' = 'manager') => {
    setError(null);

    try {
      if (mode === 'receptionist') {
        await loginReceptionistMutation.mutateAsync(toLoginRequestDto(values));
      } else {
        await loginManagerMutation.mutateAsync(toLoginRequestDto(values));
      }
      startTransition(() => {
        navigate({ to: mode === 'receptionist' ? '/admin/managePage/front-desk' : '/admin/managePage/dashboard' });
      });
    } catch (submissionError) {
      setError(getErrorMessage(submissionError, 'Unable to sign in'));
    }
  };

  return { error, submit, isSubmitting: loginManagerMutation.isPending || loginReceptionistMutation.isPending };
}
