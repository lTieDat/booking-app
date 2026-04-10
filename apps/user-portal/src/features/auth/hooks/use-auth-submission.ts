import { startTransition, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { getLoginUserMutation, getRegisterUserMutation } from '../api/auth-api';
import {
  toLoginRequestDto,
  toRegisterRequestDto,
  type LoginFormValues,
  type RegisterFormValues,
} from '../dto/auth-form.dto';

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export function useGuestLoginSubmission() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const loginUserMutation = useMutation(getLoginUserMutation());

  const submit = async (values: LoginFormValues) => {
    setError(null);

    try {
      await loginUserMutation.mutateAsync(toLoginRequestDto(values));
      startTransition(() => {
        navigate({ to: '/' });
      });
    } catch (submissionError) {
      setError(getErrorMessage(submissionError, 'Unable to sign in'));
    }
  };

  return { error, submit };
}

export function useRegisterSubmission() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const registerUserMutation = useMutation(getRegisterUserMutation());

  const submit = async (values: RegisterFormValues) => {
    setError(null);

    try {
      await registerUserMutation.mutateAsync(toRegisterRequestDto(values));
      startTransition(() => {
        navigate({
          to: '/verify',
          search: {
            email: values.email,
          },
        });
      });
    } catch (submissionError) {
      setError(getErrorMessage(submissionError, 'Unable to register'));
    }
  };

  return { error, submit };
}
