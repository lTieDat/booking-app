// eslint-disable-next-line import/no-anonymous-default-export
export default {
  testEnvironment: 'jsdom', // For React components
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Transform JS/JSX files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)/', // Transform axios for ESM
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Mock SCSS imports
  },
}
