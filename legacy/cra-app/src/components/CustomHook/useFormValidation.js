import { useCallback } from 'react'

/**
 * Custom hook for common form validation rules
 * Provides reusable validation functions for email, password, name, phone, etc.
 */
export const useFormValidation = () => {
  /**
   * Email validation
   * @param {string} email - Email to validate
   * @returns {object} - { isValid, error }
   */
  const validateEmail = useCallback((email) => {
    if (!email) {
      return { isValid: false, error: 'Email is required' }
    }
    if (email.length < 5) {
      return { isValid: false, error: 'Email must be at least 5 characters' }
    }
    if (email.length > 100) {
      return { isValid: false, error: 'Email must not exceed 100 characters' }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Invalid email format' }
    }
    return { isValid: true, error: '' }
  }, [])

  /**
   * Password validation
   * @param {string} password - Password to validate
   * @returns {object} - { isValid, error }
   */
  const validatePassword = useCallback((password) => {
    if (!password) {
      return { isValid: false, error: 'Password is required' }
    }
    if (password.length < 6) {
      return { isValid: false, error: 'Password must be at least 6 characters' }
    }
    if (password.length > 100) {
      return { isValid: false, error: 'Password must not exceed 100 characters' }
    }
    return { isValid: true, error: '' }
  }, [])

  /**
   * Name validation (full name, customer name, etc.)
   * @param {string} name - Name to validate
   * @param {string} fieldName - Field name for error message
   * @returns {object} - { isValid, error }
   */
  const validateName = useCallback((name, fieldName = 'Name') => {
    if (!name) {
      return { isValid: false, error: `${fieldName} is required` }
    }
    if (name.length < 2) {
      return { isValid: false, error: `${fieldName} must be at least 2 characters` }
    }
    if (name.length > 100) {
      return { isValid: false, error: `${fieldName} must not exceed 100 characters` }
    }
    const nameRegex = /^[a-zA-Z\s\-\']+$/
    if (!nameRegex.test(name)) {
      return { isValid: false, error: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` }
    }
    return { isValid: true, error: '' }
  }, [])

  /**
   * Phone number validation
   * @param {string} phoneNo - Phone number to validate
   * @returns {object} - { isValid, error }
   */
  const validatePhone = useCallback((phoneNo) => {
    if (!phoneNo) {
      return { isValid: true, error: '' } // Optional field
    }
    const phoneRegex = /^[0-9\s\-\+\(\)]+$/
    if (!phoneRegex.test(phoneNo)) {
      return { isValid: false, error: 'Invalid phone number format' }
    }
    if (phoneNo.replace(/\D/g, '').length < 7) {
      return { isValid: false, error: 'Phone number must have at least 7 digits' }
    }
    return { isValid: true, error: '' }
  }, [])

  /**
   * Country validation
   * @param {string} country - Country to validate
   * @returns {object} - { isValid, error }
   */
  const validateCountry = useCallback((country) => {
    if (!country) {
      return { isValid: false, error: 'Country is required' }
    }
    if (country.length < 2) {
      return { isValid: false, error: 'Country must be at least 2 characters' }
    }
    if (country.length > 100) {
      return { isValid: false, error: 'Country must not exceed 100 characters' }
    }
    const countryRegex = /^[a-zA-Z\s\-\']+$/
    if (!countryRegex.test(country)) {
      return { isValid: false, error: 'Country can only contain letters, spaces, hyphens, and apostrophes' }
    }
    return { isValid: true, error: '' }
  }, [])

  /**
   * Text validation with min/max length
   * @param {string} text - Text to validate
   * @param {object} options - { required, minLength, maxLength, fieldName }
   * @returns {object} - { isValid, error }
   */
  const validateText = useCallback((text, options = {}) => {
    const { required = true, minLength = 0, maxLength = 1000, fieldName = 'Text' } = options

    if (required && !text) {
      return { isValid: false, error: `${fieldName} is required` }
    }

    if (!required && !text) {
      return { isValid: true, error: '' }
    }

    if (text.length < minLength) {
      return { isValid: false, error: `${fieldName} must be at least ${minLength} characters` }
    }

    if (text.length > maxLength) {
      return { isValid: false, error: `${fieldName} must not exceed ${maxLength} characters` }
    }

    return { isValid: true, error: '' }
  }, [])

  /**
   * Confirm password validation
   * @param {string} password - Original password
   * @param {string} confirmPassword - Confirm password
   * @returns {object} - { isValid, error }
   */
  const validateConfirmPassword = useCallback((password, confirmPassword) => {
    if (!confirmPassword) {
      return { isValid: false, error: 'Please confirm your password' }
    }
    if (password !== confirmPassword) {
      return { isValid: false, error: 'Passwords do not match' }
    }
    return { isValid: true, error: '' }
  }, [])

  return {
    validateEmail,
    validatePassword,
    validateName,
    validatePhone,
    validateCountry,
    validateText,
    validateConfirmPassword,
  }
}

export default useFormValidation
