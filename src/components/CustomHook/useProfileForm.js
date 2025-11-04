import { useForm } from 'react-hook-form'
import { useFormValidation } from './useFormValidation'
import { useState } from 'react'

/**
 * Custom hook for Profile form management
 * Handles user profile editing with validation
 */
export const useProfileForm = (initialData = {}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      fullName: initialData.fullName || '',
      email: initialData.email || '',
      phone: initialData.phone || '',
      address: initialData.address || '',
      dateOfBirth: initialData.dateOfBirth || '',
      userName: initialData.userName || '',
    },
  })

  const { validateEmail, validateName, validatePhone, validateText } = useFormValidation()
  const [currentField, setCurrentField] = useState('')

  // Register form fields with validation
  const fullNameField = register('fullName', {
    validate: {
      custom: (value) => {
        if (!value) return true // Optional on initial load
        const result = validateName(value, 'Full name')
        return result.isValid || result.error
      },
    },
  })

  const emailField = register('email', {
    validate: {
      custom: (value) => {
        if (!value) return true
        const result = validateEmail(value)
        return result.isValid || result.error
      },
    },
  })

  const phoneField = register('phone', {
    validate: {
      custom: (value) => {
        if (!value) return true // Optional
        const result = validatePhone(value)
        return result.isValid || result.error
      },
    },
  })

  const addressField = register('address', {
    validate: {
      custom: (value) => {
        if (!value) return true // Optional
        const result = validateText(value, {
          required: false,
          maxLength: 200,
          fieldName: 'Address',
        })
        return result.isValid || result.error
      },
    },
  })

  const dateOfBirthField = register('dateOfBirth')

  const userNameField = register('userName', {
    validate: {
      custom: (value) => {
        if (!value) return true
        const result = validateText(value, {
          required: false,
          minLength: 3,
          maxLength: 50,
          fieldName: 'Username',
        })
        return result.isValid || result.error
      },
    },
  })

  return {
    register,
    handleSubmit,
    errors,
    reset,
    getValues,
    setError,
    currentField,
    setCurrentField,
    fields: {
      fullName: fullNameField,
      email: emailField,
      phone: phoneField,
      address: addressField,
      dateOfBirth: dateOfBirthField,
      userName: userNameField,
    },
  }
}

export default useProfileForm
