import { useForm } from 'react-hook-form'
import { useFormValidation } from './useFormValidation'

/**
 * Custom hook for Register form management
 * Handles form state, validation, and submission logic
 */
export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { validateEmail, validatePassword, validateName, validateConfirmPassword } = useFormValidation()

  const password = watch('password')

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

  const fullNameField = register('fullName', {
    required: 'Full name is required',
    validate: {
      custom: (value) => {
        const result = validateName(value, 'Full name')
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

  const confirmPasswordField = register('confirmPassword', {
    required: 'Please confirm your password',
    validate: {
      custom: (value) => {
        const result = validateConfirmPassword(password, value)
        return result.isValid || result.error
      },
    },
  })

  return {
    register,
    handleSubmit,
    errors,
    fields: {
      email: emailField,
      fullName: fullNameField,
      password: passwordField,
      confirmPassword: confirmPasswordField,
    },
    clearErrors,
    setError,
  }
}

export default useRegisterForm
