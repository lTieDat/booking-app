import { useForm } from 'react-hook-form'
import { useFormValidation } from './useFormValidation'

/**
 * Custom hook for Login form management
 * Handles form state, validation for login
 */
export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const { validateEmail, validatePassword } = useFormValidation()

  // Register form fields with validation
  const emailField = register('email', {
    required: 'Email is required',
    validate: {
      custom: (value) => {
        const result = validateEmail(value)
        return result.isValid || result.error
      },
    },
  })

  const passwordField = register('password', {
    required: 'Password is required',
    validate: {
      custom: (value) => {
        const result = validatePassword(value)
        return result.isValid || result.error
      },
    },
  })

  const rememberMeField = register('rememberMe')

  return {
    register,
    handleSubmit,
    errors,
    fields: {
      email: emailField,
      password: passwordField,
      rememberMe: rememberMeField,
    },
  }
}

export default useLoginForm
