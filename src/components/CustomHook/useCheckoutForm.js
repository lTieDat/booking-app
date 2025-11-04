import { useForm, Controller } from 'react-hook-form'
import { useFormValidation } from './useFormValidation'
import { useMemo } from 'react'

/**
 * Custom hook for Checkout form management
 * Handles complex form state with validation for checkout process
 */
export const useCheckoutForm = (prefixes = []) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setError,
    clearErrors,
    formState,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      customerName: '',
      customerEmail: '',
      country: '',
      phoneNo: '',
      phonePrefix: '+84',
      arrivalTime: "I don't know",
      airportShuttle: false,
      rentalCar: false,
      taxiShuttle: false,
      specialRequest: '',
    },
  })

  const { validateEmail, validateName, validatePhone, validateCountry, validateText } = useFormValidation()

  // Watch country field to auto-update phone prefix
  const selectedCountry = watch('country')
  const phonePrefix = watch('phonePrefix')

  // Auto-update phone prefix when country changes
  const handleCountryChange = (value) => {
    if (value) {
      const selectedPrefix = prefixes.find((prefix) => prefix.name === value)
      if (selectedPrefix) {
        // This should be handled by Controller or form state update
      }
    }
  }

  // Register form fields with validation
  const customerNameField = register('customerName', {
    required: 'Customer name is required',
    validate: {
      custom: (value) => {
        const result = validateName(value, 'Customer name')
        return result.isValid || result.error
      },
    },
  })

  const customerEmailField = register('customerEmail', {
    required: 'Email is required',
    validate: {
      custom: (value) => {
        const result = validateEmail(value)
        return result.isValid || result.error
      },
    },
  })

  const countryField = register('country', {
    required: 'Country is required',
    validate: {
      custom: (value) => {
        if (!value) {
          return 'Country is required'
        }
        const selectedPrefix = prefixes.find((prefix) => prefix.name === value)
        if (selectedPrefix && selectedPrefix.dial_code !== phonePrefix) {
          // Uncomment to validate country-prefix correspondence
          // return 'Selected country does not match the phone prefix'
        }
        return true
      },
    },
  })

  const phoneNoField = register('phoneNo', {
    validate: {
      custom: (value) => {
        if (!value) return true // Optional field
        const result = validatePhone(value)
        return result.isValid || result.error
      },
    },
  })

  const phonePrefixField = register('phonePrefix')

  const arrivalTimeField = register('arrivalTime')

  const airportShuttleField = register('airportShuttle')

  const rentalCarField = register('rentalCar')

  const taxiShuttleField = register('taxiShuttle')

  const specialRequestField = register('specialRequest', {
    validate: {
      custom: (value) => {
        const result = validateText(value, {
          required: false,
          maxLength: 500,
          fieldName: 'Special request',
        })
        return result.isValid || result.error
      },
    },
  })

  // Memoize the fields object to prevent unnecessary re-renders
  const fields = useMemo(
    () => ({
      customerName: customerNameField,
      customerEmail: customerEmailField,
      country: countryField,
      phoneNo: phoneNoField,
      phonePrefix: phonePrefixField,
      arrivalTime: arrivalTimeField,
      airportShuttle: airportShuttleField,
      rentalCar: rentalCarField,
      taxiShuttle: taxiShuttleField,
      specialRequest: specialRequestField,
    }),
    [
      customerNameField,
      customerEmailField,
      countryField,
      phoneNoField,
      phonePrefixField,
      arrivalTimeField,
      airportShuttleField,
      rentalCarField,
      taxiShuttleField,
      specialRequestField,
    ]
  )

  return {
    register,
    handleSubmit,
    control,
    watch,
    errors,
    fields,
    clearErrors,
    setError,
    isSubmitting: formState.isSubmitting,
  }
}

export default useCheckoutForm
