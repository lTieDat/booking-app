import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const registerFormSchema = loginFormSchema
  .extend({
    fullName: z.string().trim().min(1, 'Full name is required'),
    password: z.string().min(8, 'Use at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm the password'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto extends LoginRequestDto {
  fullName: string;
}

export function toLoginRequestDto(values: LoginFormValues): LoginRequestDto {
  return {
    email: values.email,
    password: values.password,
  };
}

export function toRegisterRequestDto(values: RegisterFormValues): RegisterRequestDto {
  return {
    fullName: values.fullName,
    email: values.email,
    password: values.password,
  };
}
