// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// src/setupTests.js

// Mock root element for react-modal
const root = document.createElement('div')
root.setAttribute('id', 'root')
document.body.appendChild(root)

// Mock URL.createObjectURL to prevent maplibre-gl crash
if (!window.URL.createObjectURL) {
  window.URL.createObjectURL = jest.fn()
}
