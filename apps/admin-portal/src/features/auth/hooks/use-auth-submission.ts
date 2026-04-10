import { startTransition, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { getLoginManagerMutation } from '../api/auth-api';
import { toLoginRequestDto, type LoginFormValues } from '../dto/auth-form.dto';

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export function useManagerLoginSubmission() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const loginManagerMutation = useMutation(getLoginManagerMutation());

  const submit = async (values: LoginFormValues) => {
    setError(null);

    try {
      await loginManagerMutation.mutateAsync(toLoginRequestDto(values));
      startTransition(() => {
        navigate({ to: '/admin/managePage/dashboard' });
      });
    } catch (submissionError) {
      setError(getErrorMessage(submissionError, 'Unable to sign in'));
    }
  };

  return { error, submit };
}
