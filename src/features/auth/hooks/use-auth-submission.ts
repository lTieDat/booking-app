import { startTransition, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { loginManager, loginUser, registerUser } from '../api/auth-api';
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

  const submit = async (values: LoginFormValues) => {
    setError(null);

    try {
      await loginUser(toLoginRequestDto(values));
      startTransition(() => {
        navigate({ to: '/' });
      });
    } catch (submissionError) {
      setError(getErrorMessage(submissionError, 'Unable to sign in'));
    }
  };

  return { error, submit };
}

export function useManagerLoginSubmission() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const submit = async (values: LoginFormValues) => {
    setError(null);

    try {
      await loginManager(toLoginRequestDto(values));
      startTransition(() => {
        navigate({ to: '/admin/managePage/dashboard' });
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

  const submit = async (values: RegisterFormValues) => {
    setError(null);

    try {
      await registerUser(toRegisterRequestDto(values));
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
